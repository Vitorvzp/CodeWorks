import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    // Mostra loading enquanto verifica autenticação
    if (loading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-white/60">Carregando...</p>
                </div>
            </div>
        );
    }

    // Se não estiver logado, redireciona para landing page
    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
