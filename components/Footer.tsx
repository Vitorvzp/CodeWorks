import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <footer className="border-t border-primary/5 dark:border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-white">ac_unit</span>
            <span className="font-bold tracking-tight text-primary dark:text-white">CodeWork</span>
          </div>
          <p className="text-sm text-primary/50 dark:text-gray-500">
            O futuro da programação assistida por IA. Design Igloo, performance brutal.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary dark:text-white">Produto</h4>
          <ul className="flex flex-col gap-4 text-sm text-primary/60 dark:text-gray-400">
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Recursos</a></li>
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Integrações</a></li>
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Preços</a></li>
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Roadmap</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary dark:text-white">Comunidade</h4>
          <ul className="flex flex-col gap-4 text-sm text-primary/60 dark:text-gray-400">
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Discord</a></li>
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">GitHub</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary dark:text-white">Legal</h4>
          <ul className="flex flex-col gap-4 text-sm text-primary/60 dark:text-gray-400">
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Privacidade</a></li>
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Termos</a></li>
            <li><a href="#" className="hover:text-primary dark:hover:text-white transition-colors">Segurança</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-20 pt-12 mt-12 border-t border-primary/5 dark:border-white/5 flex flex-col md:flex-row justify-between gap-6">
        <p className="text-xs text-primary/40 dark:text-gray-600">© 2024 CodeWork AI. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <button className="flex items-center gap-1 group">
             <span className="material-symbols-outlined text-primary/30 dark:text-white/20 cursor-pointer group-hover:text-primary dark:group-hover:text-white transition-colors">language</span>
          </button>
          
          <button 
            onClick={toggleTheme} 
            className="flex items-center gap-1 group"
            aria-label="Toggle dark mode"
          >
            <span className="material-symbols-outlined text-primary/30 dark:text-white/20 cursor-pointer group-hover:text-primary dark:group-hover:text-white transition-colors">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};