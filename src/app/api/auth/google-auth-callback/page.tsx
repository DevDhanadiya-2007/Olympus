"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleAuthCallback() {
    const router = useRouter();

    useEffect(() => {
        window.opener.postMessage({ type: 'GOOGLE_SIGN_IN_SUCCESS' }, window.location.origin);
        window.close();
    }, []);

    return <div>Authenticating...</div>;
}