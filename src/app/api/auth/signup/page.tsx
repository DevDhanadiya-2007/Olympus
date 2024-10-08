"use client";

import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import Link from 'next/link';
import { Eye, EyeOff, X, Rocket, Mail, Lock, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '@/store/slice/authSlice';

const emailSchema = z.string().email('Invalid email address');
const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character');

export default function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch()

    useEffect(() => {
        if (email) {
            setEmailError(emailSchema.safeParse(email).success ? '' : 'Invalid email address');
        }
    }, [email]);

    useEffect(() => {
        if (password) {
            const result = passwordSchema.safeParse(password);
            setPasswordError(result.success ? '' : result.error.errors[0].message);
        }
    }, [password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (emailError || passwordError) return;

        try {
            const response = await axios.post(`/api/auth/signup`, { email, password });
            if (response.status === 201) {
                toast.success("Signup Successful! 🎉", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: ({ closeToast }) => (
                        <button onClick={closeToast}>
                            <X size={18} />
                        </button>
                    )
                });
                setTimeout(() => {
                    router.push("/api/auth/login");
                }, 2000);
            }
        } catch (error) {
            toast.error("User already exists! 🚫", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                closeButton: ({ closeToast }) => (
                    <button onClick={closeToast}>
                        <X size={18} />
                    </button>
                )
            });
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    const googleHandle = () => {
        const width = 500;
        const height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2.5;
        const url = "/api/auth/google"

        const popup = window.open(
            url,
            'GoogleSignIn',
            `width=${width},height=${height},left=${left},top=${top}`
        );

        window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin) return;

            if (event.data.type === 'GOOGLE_SIGN_IN_SUCCESS') {
                if (popup) popup.close();
                dispatch(setAuthenticated(true));
                toast.success("Google Sign-In Successful! 🚀", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                router.push("/");
            }
        });
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0f1f] relative">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>
            <ToastContainer theme="dark" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 rounded-lg bg-[#1a2233] bg-opacity-90 relative z-10"
                style={{
                    boxShadow: '0 0 30px rgba(0, 150, 255, 0.3)',
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold mt-4 text-white">Sign Up</h1>
                </motion.div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0aec0]" size={20} />
                            <motion.input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#2d3748] text-white border border-[#4a5568] focus:outline-none focus:border-[#00c8ff] placeholder-[#a0aec0] transition duration-300"
                                aria-invalid={!!emailError}
                                aria-describedby="email-error"
                                whileFocus={{ scale: 1.02 }}
                            />
                        </div>
                        <AnimatePresence>
                            {emailError && (
                                <motion.p
                                    id="email-error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-[#ff6b6b] text-sm mt-1"
                                >
                                    {emailError}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a0aec0]" size={20} />
                        <motion.input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#2d3748] text-white border border-[#4a5568] focus:outline-none focus:border-[#00c8ff] placeholder-[#a0aec0] transition duration-300"
                            aria-invalid={!!passwordError}
                            aria-describedby="password-error"
                            whileFocus={{ scale: 1.02 }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a0aec0] hover:text-[#00c8ff] transition duration-300"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <AnimatePresence>
                        {passwordError && (
                            <motion.p
                                id="password-error"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-[#ff6b6b] text-sm mt-1"
                            >
                                {passwordError}
                            </motion.p>
                        )}
                    </AnimatePresence>
                    <motion.button
                        type="submit"
                        className="w-full bg-[#00c8ff] text-[#0a0f1f] py-3 rounded-lg hover:bg-[#00a0e6] transition duration-300 font-semibold flex items-center justify-center"
                        disabled={!!emailError || !!passwordError}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Rocket size={20} className="mr-2" />
                        Launch Your Account
                    </motion.button>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6"
                    >
                        <button
                            type="button"
                            onClick={googleHandle}
                            className="w-full bg-[#4285F4] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#3367D6] focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-opacity-50 transition duration-300 flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                                <path fill="none" d="M1 1h22v22H1z" />
                            </svg>
                            Continue with Google
                        </button>
                    </motion.div>
                </form>
                <motion.p
                    className="mt-6 text-center text-[#a0aec0]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Already have an account?{' '}
                    <Link href="/api/auth/login" className="text-[#00c8ff] hover:text-[#00a0e6] transition duration-300 flex items-center justify-center mt-2">
                        <LogIn size={20} className="mr-2" />
                        Log In
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
}