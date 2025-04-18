"use client";
import { LoginForm } from "@/components/login-form"
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";

export default function Page() {
    const { user, loading } = useAuth();
    const router = useRouter();


    async function loginUser(userData: { email: string; password: string }) {
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });
    
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Erro ao efetuar login");
        }
    
        const data = await res.text();
        return data;
    }

    if(!loading && user){
        router.push('/home');
    }

    if(loading) {
        return <div>Carregando...</div>
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm onLogin={loginUser} />
            </div>
        </div>
    )
}
