'use client';
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import LoadingScreen from "@/components/loading-screen";

interface PrivateLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: PrivateLayoutProps) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        if (!loading) {
            if (user) {
                setIsAuthorized(true);
            } else {
                router.replace('/login');
                setIsAuthorized(false)
            }
        }
    }, [user, loading, router]);

    if (loading || isAuthorized === null) {
        return <LoadingScreen isOpen={loading} />;
    }

    if (!isAuthorized) {
        return null;
    }

    return (
        <>
            <div className={"flex flex-col justify-between w-full"}>
                {children}
            </div>
        </>
    );
}
