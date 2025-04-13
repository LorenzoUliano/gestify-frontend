"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
  user: any;
  loading: boolean;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Hook que facilita o uso do nosso contexto.
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

// O Provider que engloba sua aplicação e carrega a lógica de buscar a sessão, armazenar user, etc.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function refreshSession() {
    setLoading(true);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/isAuthenticated`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        });
        
        if (res.status === 401) {
            setUser(null);
            return;
        }
        
        const data = await res.json();
        setUser(data);
    } catch (error) {
        console.error("Erro ao buscar sessão:", error);
        setUser(null);
    } finally {
        setLoading(false);
    }
}

  useEffect(() => {
    refreshSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}
