import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { setAuthenticated } from '../store/slice/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const checkAuthStatus = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/auth/checkAuth', { withCredentials: true });
            dispatch(setAuthenticated(data.isAuthenticated));
        } catch (error) {
            dispatch(setAuthenticated(false));
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const handleLogout = useCallback(async () => {
        try {
            await axios.post('/api/auth/logout', {}, { withCredentials: true });
            dispatch(setAuthenticated(false));
            router.push('/');
        } catch (error) {
            console.error("Logout failed", error);
        }
    }, [dispatch, router]);

    const handleLogin = useCallback(() => {
        router.push('/api/auth/login');
        checkAuthStatus()
    }, [router, checkAuthStatus]);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return {
        isAuthenticated,
        handleLogout,
        handleLogin,
        checkAuthStatus,
        loading,
    };
};
