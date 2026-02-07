import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface UserData {
    id: string;
    nome: string | null;
    email: string;
    cargo: 'Normal' | 'Assinante' | 'Afiliado' | 'Suporte' | 'Admin';
    ativo: boolean;
    created_at: string;
}

export const Home: React.FC = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            try {
                const { data, error } = await supabase
                    .from('usuarios')
                    .select('*')
                    .eq('auth_id', user.id)
                    .single();

                if (!error && data) {
                    setUserData(data);
                }
            } catch (err) {
                console.error('Erro ao buscar dados do usuário:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const displayName = userData?.nome || user?.email?.split('@')[0] || 'Usuário';

    return (
        <div className="bg-[#0a0c0b] font-sans text-gray-200 h-screen flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 backdrop-blur-xl border-r border-white/5 flex flex-col z-50" style={{ background: 'rgba(31, 46, 41, 0.2)' }}>
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-white">CodeWork</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <a className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl font-medium" href="#">
                        <span className="material-symbols-outlined">dashboard</span>
                        Visão Geral
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-all rounded-xl font-medium group" href="#">
                        <span className="material-symbols-outlined group-hover:text-emerald-400">chat_bubble</span>
                        Conversas
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-all rounded-xl font-medium group" href="#">
                        <span className="material-symbols-outlined group-hover:text-emerald-400">code</span>
                        Snippets
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-all rounded-xl font-medium group" href="#">
                        <span className="material-symbols-outlined group-hover:text-emerald-400">analytics</span>
                        Desempenho
                    </a>
                    <a className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white transition-all rounded-xl font-medium group" href="#">
                        <span className="material-symbols-outlined group-hover:text-emerald-400">settings</span>
                        Configurações
                    </a>
                </nav>

                {/* Plan Status */}
                <div className="p-6 mt-auto">
                    <div className="bg-[#1f2e29]/40 rounded-2xl p-4 border border-emerald-900/30">
                        <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Plano Atual</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-white uppercase tracking-widest">
                                {userData?.cargo || 'Normal'}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${userData?.ativo ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                {userData?.ativo ? 'Ativo' : 'Inativo'}
                            </span>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 mt-6 px-2">
                        <div className="w-10 h-10 rounded-full border border-white/10 bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold">
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-bold text-white leading-tight truncate">{displayName}</span>
                            <span className="text-[10px] text-gray-500 truncate">{user?.email}</span>
                        </div>
                        <button onClick={handleLogout} className="text-gray-500 hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-xl">logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Header */}
                <header className="h-20 flex items-center justify-between px-10 shrink-0">
                    <h1 className="text-sm font-medium text-gray-400">Dashboard / Home</h1>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <input
                                className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                                placeholder="Pesquisar..."
                                type="text"
                            />
                            <span className="material-symbols-outlined absolute left-3 top-2 text-lg text-gray-500">search</span>
                        </div>
                        <button className="relative">
                            <span className="material-symbols-outlined text-gray-400">notifications</span>
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Content */}
                <section className="flex-1 flex items-center justify-center p-10">
                    {/* Welcome Banner */}
                    <div
                        className="relative overflow-hidden bg-[#1f2e29]/20 rounded-3xl p-10 border border-emerald-900/30 max-w-2xl w-full text-center"
                    >
                        <div
                            className="absolute top-[-50%] left-[-20%] w-[140%] h-[200%] pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(46, 74, 65, 0.4) 0%, transparent 70%)' }}
                        ></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-extrabold text-white mb-2">
                                Bem-vindo de volta, {displayName}!
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Sua produtividade subiu <span className="text-emerald-400 font-bold">12%</span> esta semana. Vamos transformar café em código?
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-10 py-6 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest shrink-0">
                    <p>© 2024 CODEWORK AI • SISTEMA OPERACIONAL DE CÓDIGO</p>
                    <div className="flex gap-8">
                        <a className="hover:text-emerald-400 transition-colors" href="#">Documentação</a>
                        <a className="hover:text-emerald-400 transition-colors" href="#">API Status</a>
                        <a className="hover:text-emerald-400 transition-colors" href="#">Suporte</a>
                    </div>
                </footer>
            </main>
        </div>
    );
};
