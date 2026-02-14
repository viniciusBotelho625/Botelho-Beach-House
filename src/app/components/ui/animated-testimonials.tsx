"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const DRAG_THRESHOLD = 50;
  const VELOCITY_THRESHOLD = 200;

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
      const { offset, velocity } = info;
      if (offset.x < -DRAG_THRESHOLD || velocity.x < -VELOCITY_THRESHOLD) {
        handleNext();
      } else if (offset.x > DRAG_THRESHOLD || velocity.x > VELOCITY_THRESHOLD) {
        handlePrev();
      }
    },
    [handleNext, handlePrev],
  );

  // Valores determinísticos por índice para evitar hydration mismatch (Math.random difere no server vs client)
  const rotations = useMemo(
    () => {
      const SEED = [-8, 5, -3, 7, -5, 2, -7, 4, -2, 6, -10, 1];
      return testimonials.map((_, i) => SEED[i % SEED.length]);
    },
    [testimonials.length],
  );

  return (
    <div className="mx-auto w-full px-4 font-sans antialiased sm:max-w-xl md:max-w-6xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 items-center">
        <div className="flex justify-center md:block">
          <motion.div
            className="relative h-[290px] w-[290px] min-[400px]:h-[300px] min-[400px]:w-[300px] sm:h-[380px] sm:w-[380px] md:h-[400px] md:w-[400px] lg:h-[550px] lg:w-[550px] cursor-grab active:cursor-grabbing touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index] ?? 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : (rotations[index] ?? 0),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotations[index] ?? 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    fetchPriority={index < 2 ? "high" : "low"}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-2xl"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="flex flex-col justify-between py-4 px-0 md:px-20">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {testimonials[active].name}
            </h3>
            <p className="text-md text-primary font-medium mt-2">
              {testimonials[active].designation}
            </p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-4 text-[16px] text-gray-600 leading-relaxed md:mt-6 md:text-base"
            >
              {testimonials[active].quote}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-8 md:pt-4">
            <button
              onClick={handlePrev}
              className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 cursor-pointer hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label={t("gallery.prev")}
            >
              <IconArrowLeft className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:-translate-x-1" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 cursor-pointer hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label={t("gallery.next")}
            >
              <IconArrowRight className="h-5 w-5 text-white transition-transform duration-300 group-hover/button:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
