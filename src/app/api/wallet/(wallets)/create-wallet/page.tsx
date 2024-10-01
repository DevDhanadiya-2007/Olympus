"use client";

import { useState, useCallback, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Eye, EyeOff, RefreshCw, Copy, Check, AlertTriangle, X, Key, ArrowRight, Wallet } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import { MnemonicResponse } from "@/types";

const StarField = () => {
    return (
        <div className="fixed inset-0 z-0">
            {[...Array(100)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                />
            ))}
        </div>
    );
};

export default function Page() {
    const [mnemonic, setMnemonic] = useState<string>("");
    const [isRevealed, setIsRevealed] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [isLoadingMnemonic, setIsLoadingMnemonic] = useState<boolean>(false);
    const [hasGenerated, setHasGenerated] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        if (isLoadingMnemonic) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 100);
            return () => clearInterval(interval);
        }
    }, [isLoadingMnemonic]);

    const handleGenerate = useCallback(async () => {
        if (hasGenerated) return;
        setIsLoadingMnemonic(true);
        setProgress(0);

        try {
            const response: AxiosResponse<MnemonicResponse> = await axios.post('/api/wallet/generate-mnemonic');
            setMnemonic(response.data.mnemonic);
            setIsRevealed(false);
            setIsCopied(false);
            setHasGenerated(true);

            toast.success("Mnemonic generated successfully! 🎉", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error: unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            const errorMessage = axiosError.response?.data?.message || "Failed to generate mnemonic";

            toast.error(errorMessage, {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } finally {
            setIsLoadingMnemonic(false);
            setProgress(100);
        }
    }, [hasGenerated]);

    const toggleReveal = useCallback(() => {
        setIsRevealed((prev) => !prev);
    }, []);

    const handleCopy = useCallback(() => {
        if (mnemonic) {
            navigator.clipboard.writeText(mnemonic);
            setIsCopied(true);
            toast.success("Mnemonic phrase copied to clipboard! 📋", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [mnemonic]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a2e] to-[#1a1a4f] flex items-center justify-center p-4 overflow-hidden">
            <StarField />
            <ToastContainer theme="dark" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-2xl"
            >
                <Card className="bg-[#2a2a5f] text-white shadow-lg backdrop-blur-sm bg-opacity-30">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold flex items-center justify-center">
                            <Wallet className="mr-2" /> Mnemonic Phrase Generator
                        </CardTitle>
                        <CardDescription className="text-center text-gray-300">
                            Generate and securely store your wallet's mnemonic phrase
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Button
                            onClick={handleGenerate}
                            className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                            disabled={isLoadingMnemonic || hasGenerated}
                        >
                            {isLoadingMnemonic ? (
                                <>
                                    <RefreshCw className="animate-spin mr-2" size={24} />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <Key size={24} />
                                    <span>{hasGenerated ? 'Mnemonic Generated 🔑' : 'Generate New Mnemonic'}</span>
                                </>
                            )}
                        </Button>

                        {isLoadingMnemonic && (
                            <Progress value={progress} className="w-full" />
                        )}

                        <AnimatePresence>
                            {mnemonic && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative"
                                >
                                    <div
                                        className={`p-6 pr-16 bg-[#3a3a7f] rounded-xl transition-all duration-300 ease-in-out ${isRevealed ? '' : 'blur-lg'}`}
                                        aria-hidden={!isRevealed}
                                    >
                                        <p className="font-mono text-lg break-words leading-relaxed">{mnemonic}</p>
                                    </div>
                                    <div className="absolute top-2 right-2 flex flex-col space-y-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <motion.button
                                                        onClick={toggleReveal}
                                                        className="p-2 text-white rounded-full transition-all duration-300 ease-in-out"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        {isRevealed ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </motion.button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{isRevealed ? "Hide" : "Reveal"} mnemonic phrase</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <motion.button
                                                        onClick={handleCopy}
                                                        className="p-2 text-white rounded-full transition-all duration-300 ease-in-out"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        disabled={!isRevealed}
                                                    >
                                                        {isCopied ? <Check size={20} /> : <Copy size={20} />}
                                                    </motion.button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Copy to clipboard</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {hasGenerated && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Checkbox
                                            id="terms"
                                            checked={isChecked}
                                            onCheckedChange={(checked) => setIsChecked(checked as boolean)}
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            I understand the importance of securely storing my mnemonic phrase
                                        </label>
                                    </div>

                                    <div className="mt-6 flex items-start space-x-2 bg-indigo-900 bg-opacity-50 p-4 rounded-xl">
                                        <AlertTriangle size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                                        <p className="text-sm">
                                            <span className="font-semibold">Security Warning:</span> Your mnemonic phrase is the master key to your wallet. Store it securely offline and never share it. Losing this phrase means permanent loss of access to your funds.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                    {hasGenerated && (
                        <CardFooter>
                            <Button
                                className="w-full py-6 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                                disabled={!isChecked}
                            >
                                <span>Proceed to Wallet</span>
                                <ArrowRight size={24} />
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </motion.div>
        </div>
    );
}
