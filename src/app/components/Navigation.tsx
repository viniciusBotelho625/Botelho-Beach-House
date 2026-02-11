"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const [hasBackground, setHasBackground] = useState(false);
  const [currentLang, setCurrentLang] = useState('pt');
  const { i18n, t } = useTranslation();

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;

    const updateBackground = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      setHasBackground(scrollPosition > heroHeight * 0.8);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      lastScrollY = window.scrollY;
      requestAnimationFrame(updateBackground);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Atualiza o idioma atual quando mudar
  useEffect(() => {
    setCurrentLang(i18n.language || 'pt');
    
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Função para trocar o idioma
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      setCurrentLang(lng);
    });
  };

  // Verifica qual é o idioma atual
  const currentLanguage = currentLang;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 transition-all duration-300 ${
        hasBackground
          ? "bg-[#002b36]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      aria-label="Navegação principal"
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
         
          <Separator className="h-4 sm:h-5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-3 sm:gap-6 text-white/80 text-xs sm:text-sm font-light" aria-label="Seleção de idioma">
            <button
              type="button"
              onClick={() => changeLanguage('pt')}
              aria-pressed={currentLanguage === 'pt'}
              aria-label="Alternar idioma para português"
              className={`hover:text-white transition-colors ${
                currentLanguage === 'pt' ? 'text-white font-semibold underline underline-offset-4' : ''
              }`}
            >
              PT
            </button>
            <span className="text-white/40">|</span>
            <button
              type="button"
              onClick={() => changeLanguage('en')}
              aria-pressed={currentLanguage === 'en'}
              aria-label="Switch language to English"
              className={`hover:text-white transition-colors ${
                currentLanguage === 'en' ? 'text-white font-semibold underline underline-offset-4' : ''
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-lg lg:text-2xl font-light tracking-[0.2em] sm:tracking-[0.3em] italic hidden sm:block">
          Botelho Beach House
        </h1>

        <div className="flex items-center gap-4 sm:gap-8">
          <a
            href="#reservation"
            className="text-white/90 hover:text-white text-xs sm:text-sm font-light tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
