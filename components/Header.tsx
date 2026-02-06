import React from 'react';
import { NAV_ITEMS } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full px-6 py-4 md:px-20">
      <nav className="mx-auto max-w-7xl glass-effect bg-white/60 dark:bg-primary/30 rounded-full px-8 py-3 flex items-center justify-between shadow-sm transition-all duration-300">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="material-symbols-outlined text-primary dark:text-white text-3xl">ac_unit</span>
          <span className="text-xl font-bold tracking-tight text-primary dark:text-white">CodeWork</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label}
              href={item.href}
              className="text-sm font-medium hover:opacity-70 transition-opacity text-primary dark:text-gray-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-bold px-4 py-2 hover:opacity-70 transition-opacity text-primary dark:text-white">
            Login
          </button>
          <button className="bg-primary dark:bg-white dark:text-primary text-white text-sm font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary/10 dark:shadow-none">
            Começar
          </button>
        </div>
      </nav>
    </header>
  );
};