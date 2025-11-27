import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery = ({ items }: GalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;
      const newIndex = Math.round(scrollPosition / windowHeight);
      setActiveIndex(Math.min(Math.max(0, newIndex), items.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[hsl(var(--background))] text-foreground">
      {/* 🔮 Fundo com gradiente principal */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--primary)/.2),hsl(var(--accent)/.2))] pointer-events-none" />

      {/* 🌈 Efeito glow de fundo suave */}
      <div className="absolute -inset-[20%] bg-[radial-gradient(circle_at_center,hsl(var(--accent)/.15),transparent_70%)] blur-3xl pointer-events-none" />

      {/* Scroll indicator */}
      {/* <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const container = containerRef.current;
              if (container) {
                container.scrollTo({
                  top: index * window.innerHeight,
                  behavior: "smooth",
                });
              }
            }}
            className={cn(
              "h-3 rounded-full transition-all duration-300",
              index === activeIndex
                ? "w-3 bg-[hsl(var(--primary))] shadow-[0_0_10px_hsl(var(--primary)/0.6)]"
                : "w-2 bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted-foreground))]"
            )}
          />
        ))}
      </div> */}

      {/* Conteúdo scrollável */}
      <div
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative h-screen w-full snap-start snap-always flex items-center justify-center px-4 md:px-12"
          >
            <div className="w-full max-w-7xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 1 }}
                className="grid gap-8 md:grid-cols-2 items-center"
              >
                {/* 📝 Texto */}
                <div className="space-y-6 order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: false }}
                    className="inline-block rounded-full bg-[hsl(var(--primary)/.2)] px-4 py-1.5 text-sm font-medium text-[hsl(var(--primary))]"
                  >
                    {index + 1} / {items.length}
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: false }}
                    className="text-4xl md:text-6xl font-bold text-foreground"
                  >
                    {item.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: false }}
                    className="text-lg text-muted-foreground leading-relaxed"
                  >
                    {item.description}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: false }}
                  className="relative order-1 md:order-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[hsl(var(--border)/.5)] bg-[hsl(var(--card)/.8)] shadow-2xl">
                    {/* Glow em volta da imagem */}
                    <div className="absolute -inset-0.5 bg-[linear-gradient(90deg,hsl(var(--primary)),hsl(var(--accent)))] opacity-40 blur-lg" />

                    <img
                      src={item.image}
                      alt={item.title}
                      className="relative h-full w-full object-cover rounded-3xl"
                    />

                    {/* Overlay interno sutil */}
                    <div className="absolute inset-0 bg-[linear-gradient(to-br,hsl(var(--background)/.5),transparent)]" />
                  </div>

                  {/* Efeito flutuante ao fundo */}
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120%] w-[120%] bg-[radial-gradient(circle_at_center,hsl(var(--primary)/.2),hsl(var(--accent)/.2),transparent_70%)] blur-3xl rounded-full" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicador de rolagem */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeIndex === 0 ? 1 : 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-sm text-muted-foreground flex flex-col items-center gap-2"
      >
        <span>Role para baixo</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-[hsl(var(--primary))]"
        >
          ↓
        </motion.div>
      </motion.div> */}
    </div>
  );
};
