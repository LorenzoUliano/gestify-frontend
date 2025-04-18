"use client"


import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";

interface PrivateLayoutProps {
    children: ReactNode
}

export default function Layout({children}: PrivateLayoutProps) {

    const {user, loading} = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        if(!loading) {
            if(user.userRole === 'ADMIN') {
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        }
    }, [user, loading, router])

    
    if(loading || isAuthorized === null) {
        return <div>Carregando...</div>
    }

    if(!isAuthorized) return null;

    return (
        <>{children}</>
    )
}