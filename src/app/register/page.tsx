"use client"

import { useState } from "react"
import { RegisterForm } from "@/components/register-form"

export default function Page() {

    async function registerUser(userData: {
        name: string
        email: string
        password: string
    }) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Erro ao registrar usuário");
        }

        const data = await res.text();
        return data;
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RegisterForm onRegister={registerUser} />
            </div>
        </div>
    )
}
