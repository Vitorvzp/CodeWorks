import React from 'react';
import { AVATARS } from '../constants';

const ChatInterface: React.FC = () => {
  return (
    <div className="relative">
      {/* Glow effects */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-200 dark:bg-emerald-900/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[100px] -z-10"></div>
      
      {/* Chat Container */}
      <div className="glass-effect bg-white/40 dark:bg-primary/40 rounded-2xl shadow-2xl overflow-hidden p-1 border-white/20">
        <div className="bg-primary/95 dark:bg-[#0a0c0b] rounded-xl overflow-hidden aspect-[4/3] flex flex-col">
          
          {/* Window Controls */}
          <div className="p-4 border-b border-white/10 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
            <div className="ml-4 px-3 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono">codework-ai-chat.v1</div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
            {/* User Message */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-white/20 shrink-0">
                <span className="material-symbols-outlined text-white text-xs">person</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-sm text-white/80 max-w-[80%]">
                Como posso otimizar este loop em Rust para melhor performance?
              </div>
            </div>

            {/* AI Response */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-xs">bolt</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white/90 w-full">
                <p className="mb-3 font-semibold text-emerald-400">CodeWork AI:</p>
                <div className="bg-black/40 rounded p-3 font-mono text-xs text-emerald-300 overflow-x-auto">
                  <span className="text-purple-400">fn</span> <span className="text-blue-400">optimized_sum</span>(arr: &amp;[<span className="text-yellow-400">i32</span>]) -&gt; <span className="text-yellow-400">i32</span> {'{'}<br/>
                  &nbsp;&nbsp;arr.iter().<span className="text-blue-300">fold</span>(0, |acc, &amp;x| acc + x)<br/>
                  {'}'}
                </div>
                <p className="mt-3 text-xs text-white/50 leading-relaxed">Utilizando o iterador fold para garantir vetorização pelo compilador LLVM...</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/5 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 placeholder-white/20"
                placeholder="Digite sua dúvida de código..." 
              />
              <button className="absolute right-2 top-2 w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center hover:bg-emerald-400 transition-colors">
                <span className="material-symbols-outlined text-white text-lg">arrow_upward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-10">
      <div className="flex flex-col gap-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-white/10 w-fit px-4 py-1 rounded-full border border-primary/5 dark:border-white/5">
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          <span className="text-xs font-bold uppercase tracking-widest">IA Generativa de Código</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-primary dark:text-white">
          Converse com o <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-800 to-primary dark:from-emerald-400 dark:to-white">Futuro</span> do Código
        </h1>
        
        <p className="text-lg text-primary/70 dark:text-gray-400 leading-relaxed max-w-xl">
          Uma plataforma de conversas com IA inspirada no design Igloo, unindo minimalismo extremo e performance para desenvolvedores que buscam o estado de flow.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary dark:bg-white dark:text-primary text-white h-14 px-10 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center gap-2">
            <span>Começar Agora</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button className="glass-effect bg-white/30 dark:bg-white/5 h-14 px-8 rounded-xl font-bold text-lg border border-primary/10 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10 transition-all text-primary dark:text-white">
            Ver Demo
          </button>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <div className="flex -space-x-3">
            {AVATARS.map((src, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-200 overflow-hidden">
                <img src={src} alt={`Dev ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-sm font-medium text-primary/60 dark:text-gray-500 italic">Junte-se a +10k desenvolvedores</p>
        </div>
      </div>

      <ChatInterface />
    </section>
  );
};