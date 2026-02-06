import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();

    // Bloquear scroll quando modal está aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await signIn(email, password);
            if (error) {
                setError(error.message);
            } else {
                onClose();
                setEmail('');
                setPassword('');
            }
        } catch (err) {
            setError('Ocorreu um erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

            {/* Modal */}
            <div
                className="relative w-full max-w-md rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* GIF Background */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/gif.gif)',
                        backgroundSize: '150%',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Glass Liquid Overlay */}
                <div
                    className="absolute inset-0 z-[1]"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                />

                {/* Content */}
                <div
                    className="relative z-[2] px-10 py-14"
                    style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <img
                            src="/logo.png"
                            alt="CodeWork"
                            className="w-10 h-10 object-contain drop-shadow-lg"
                        />
                        <span
                            className="text-2xl font-bold text-white"
                            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
                        >
                            CodeWork
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-lg font-medium text-white/90 mb-6">
                        Entrar na sua conta
                    </h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-white/30"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                }}
                                placeholder="seu@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-white/30"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                }}
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>

                        {/* Error message */}
                        {error && (
                            <div
                                className="px-4 py-3 rounded-xl text-sm text-red-200"
                                style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                color: 'white',
                                textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                            }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                    Carregando...
                                </span>
                            ) : (
                                'Entrar'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
