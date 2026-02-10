"use client";
import { useState } from "react";
import { Home, Calendar, Camera, Star } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface LinkItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const FloatingDock = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const links: LinkItem[] = [
    { title: t("dock.home"), icon: <Home className="h-5 w-5" />, href: "#" },
    { title: t("dock.calendar"), icon: <Calendar className="h-5 w-5" />, href: "#" },
    { title: t("dock.photos"), icon: <Camera className="h-5 w-5" />, href: "#" },
    { title: t("dock.reviews"), icon: <Star className="h-5 w-5" />, href: "#" },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, type: "spring", damping: 20 }}
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-end gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
        {links.map((link, index) => (
          <motion.a
            key={link.title}
            href={link.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "group relative flex flex-col items-center justify-center rounded-xl p-3 transition-all duration-300",
              hoveredIndex === index ? "bg-primary/20" : "hover:bg-white/10"
            )}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Icon */}
            <div className="relative text-white transition-colors duration-300 group-hover:text-ocean-light">
              {link.icon}
            </div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
                y: hoveredIndex === index ? -45 : 10,
                scale: hoveredIndex === index ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute -top-12 whitespace-nowrap rounded-lg border border-white/20 bg-ocean-deep/95 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm"
            >
              {link.title}
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/20 bg-ocean-deep/95" />
            </motion.div>

            {/* Active indicator */}
            {hoveredIndex === index && (
              <motion.div
                layoutId="dock-indicator"
                className="absolute -bottom-1 h-1 w-8 rounded-full bg-gradient-sunset"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingDock;
