import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { CallToAction } from './components/CTA';
import { Footer } from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 pt-32 pb-20">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;