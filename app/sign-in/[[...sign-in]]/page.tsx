"use client"

import { useEffect, useState } from 'react';
import Layout from "@/components/layout";
import { SignIn } from "@clerk/nextjs";

function useLocalStorage(key: any, defaultValue: any) {
    return useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key) || defaultValue;
        }
        return defaultValue;
    });
}

export default function Page() {
    const [redirectURL] = useLocalStorage('redirectURL', '/default-page');
    console.log(redirectURL, "redirectURL")
    return (
        <Layout >
            <div className="flex justify-center items-center h-screen">
                <SignIn redirectUrl={redirectURL} afterSignInUrl={redirectURL} />
            </div>
        </Layout>
    )
}