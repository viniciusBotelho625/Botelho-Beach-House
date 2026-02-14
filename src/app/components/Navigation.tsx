"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const Navigation = () => {
  const [hasBackground, setHasBackground] = useState(false);
  const [currentLang, setCurrentLang] = useState('pt');
  const { i18n, t } = useTranslation();

  useEffect(() => {
    let ticking = false;

    const updateBackground = () => {
      const scrollPosition = window.scrollY;
      // Ativa o background após 50px de scroll para uma transição mais rápida
      setHasBackground(scrollPosition > 50);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateBackground);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateBackground();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ... (manter lógica de idioma conforme original) ...
  useEffect(() => {
    setCurrentLang(i18n.language || 'pt');
    const handleLanguageChange = (lng: string) => setCurrentLang(lng);
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      setCurrentLang(lng);
    });
  };

  const currentLanguage = currentLang;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-500 ${hasBackground
        ? "bg-[#002b36]/90 backdrop-blur-lg shadow-2xl "
        : "bg-transparent "
        }`}
      aria-label="Navegação principal"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">

          <div className="flex items-center gap-3 sm:gap-6 text-white/80 text-xs sm:text-sm font-light" aria-label="Seleção de idioma">
            <button
              type="button"
              onClick={() => changeLanguage('pt')}
              aria-pressed={currentLanguage === 'pt'}
              className={`hover:text-white transition-all duration-300 relative ${currentLanguage === 'pt' ? 'text-white' : 'text-white/50'
                }`}
            >
              PT
              {currentLanguage === 'pt' && (
                <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full" />
              )}
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => changeLanguage('en')}
              aria-pressed={currentLanguage === 'en'}
              className={`hover:text-white transition-all duration-300 relative ${currentLanguage === 'en' ? 'text-white' : 'text-white/50'
                }`}
            >
              EN
              {currentLanguage === 'en' && (
                <motion.div layoutId="underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full" />
              )}
            </button>
          </div>
        </div>

        <motion.h1
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-lg lg:text-2xl font-light tracking-[0.2em] sm:tracking-[0.3em] italic hidden sm:block"
        >
          Botelho Beach House
        </motion.h1>

        <div className="flex items-center gap-4 sm:gap-8">
          <a
            href="#reservation"
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 backdrop-blur-sm"
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
