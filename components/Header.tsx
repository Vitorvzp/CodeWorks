import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

const NAV_SECTIONS = [
  { label: 'Início', href: '#hero' },
  { label: 'Explicação', href: '#features' },
  { label: 'Preços', href: '#pricing' },
  { label: 'Contato', href: '#cta' },
];

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    // Delay inicial para animação de entrada
    const timer = setTimeout(() => setIsVisible(true), 500);

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const currentScrollY = window.scrollY;

      // Mostra apenas na seção hero
      if (currentScrollY < heroHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Offset para compensar espaçamento
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return '?';
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full px-4 py-3 md:px-8 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
      >
        <nav
          className="mx-auto max-w-4xl rounded-[28px] px-6 py-2.5 flex items-center justify-between transition-all duration-500"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, '#hero')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="CodeWork"
              className="w-8 h-8 object-contain transition-transform group-hover:scale-110 drop-shadow-lg"
            />
            <span
              className="text-lg font-semibold tracking-tight text-white"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            >
              CodeWork
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_SECTIONS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm font-medium px-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle & Auth Section */}
          <div className="flex items-center gap-3">
            {/* Animated Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden"
              aria-label="Toggle theme"
            >
              {/* Sun Icon */}
              <span
                className={`material-symbols-outlined absolute text-xl transition-all duration-500 ${isDarkMode
                  ? 'opacity-0 rotate-90 scale-0'
                  : 'opacity-100 rotate-0 scale-100 text-yellow-300'
                  }`}
                style={{ textShadow: isDarkMode ? 'none' : '0 0 10px rgba(253, 224, 71, 0.8)' }}
              >
                light_mode
              </span>
              {/* Moon Icon */}
              <span
                className={`material-symbols-outlined absolute text-xl transition-all duration-500 ${isDarkMode
                  ? 'opacity-100 rotate-0 scale-100 text-blue-200'
                  : 'opacity-0 -rotate-90 scale-0'
                  }`}
                style={{ textShadow: isDarkMode ? '0 0 10px rgba(191, 219, 254, 0.8)' : 'none' }}
              >
                dark_mode
              </span>
            </button>
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
            ) : user ? (
              /* Logged in state */
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/20"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
                    }}
                  >
                    {getUserInitials()}
                  </div>
                  <span
                    className="material-symbols-outlined text-white/80 text-lg transition-transform duration-300"
                    style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                  >
                    expand_more
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(40px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-sm font-medium text-white truncate">{user.email}</p>
                      <p className="text-xs text-white/50">Conta ativa</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged out state */
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                }}
              >
                Começar
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};