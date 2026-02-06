import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { CallToAction } from './components/CTA';
import { Footer } from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Parallax values
  const videoParallax = scrollY * 0.4;
  const videoScale = 1 + scrollY * 0.0003;
  const videoOpacity = Math.max(0, 1 - scrollY * 0.001);

  return (
    <AuthProvider>
      <div className="relative w-full flex flex-col overflow-x-hidden">
        {/* Header fixo */}
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        {/* Seção Início - Fullscreen com vídeo */}
        <section ref={heroRef} id="hero" className="relative h-screen w-full overflow-hidden">
          {/* Video Background com parallax */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover animate-fade-in opacity-0"
            style={{
              animationDelay: '0.2s',
              animationFillMode: 'forwards',
              transform: `translateY(${videoParallax}px) scale(${videoScale})`,
              opacity: videoOpacity,
            }}
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>

          {/* Gradiente para conectar as seções */}
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #171b1a 0%, rgba(23, 27, 26, 0.7) 40%, rgba(0, 0, 0, 0) 100%)',
            }}
          ></div>
        </section>

        {/* Conteúdo principal */}
        <main className="relative bg-background-light dark:bg-background-dark">
          {/* Seção Recursos */}
          <section id="features">
            <Features />
          </section>

          {/* Seção Preços */}
          <section id="pricing">
            <Pricing />
          </section>

          {/* Seção Contato */}
          <section id="cta">
            <CallToAction />
          </section>
        </main>

        <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </AuthProvider>
  );
}

export default App;