"use client";

import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import { cloudinaryOptimize } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type CardKey = keyof typeof CARD_KEYS_MAP;

const CARD_KEYS_MAP = {
  pool: true,
  decoration: true,
  external: true,
  lateral: true,
  garage: true,
  living: true,
  gourmet: true,
  kitchen: true,
  bathroom: true,
  room1: true,
  room2: true,
} as const;

const allCards: { id: number; cardKey: CardKey; thumbnail: string }[] = [
  {
    id: 1,
    cardKey: "pool",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_1612_1_qhprv6.jpg",
  },
  {
    id: 2,
    cardKey: "decoration",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216809/IMG_5910_gpu4ha.jpg",
  },
  {
    id: 3,
    cardKey: "external",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216809/7c7435c9-20a5-40ac-8ad4-e28a775b1954_jh50v7.jpg",
  },
  {
    id: 4,
    cardKey: "external",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737504/WhatsApp_Image_2026-02-10_at_12.27.20_1_enf3co.jpg",
  },
  {
    id: 5,
    cardKey: "lateral",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216811/IMG_7277_gtecis.jpg",
  },
  {
    id: 6,
    cardKey: "lateral",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737502/WhatsApp_Image_2026-02-10_at_12.27.21_3_kigjuv.jpg",
  },
  {
    id: 7,
    cardKey: "garage",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216810/IMG_3338_erzmzi.jpg",
  },
  {
    id: 8,
    cardKey: "garage",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737501/WhatsApp_Image_2026-02-10_at_12.27.21_4_qjxejo.jpg",
  },
  {
    id: 9,
    cardKey: "living",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216810/IMG_3345_1_z1p1ir.jpg",
  },
  {
    id: 10,
    cardKey: "gourmet",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216813/IMG_0245_mmrvik.jpg",
  },
  {
    id: 11,
    cardKey: "gourmet",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737506/WhatsApp_Image_2026-02-10_at_12.27.21_2_zrcyfh.jpg",
  },
  {
    id: 12,
    cardKey: "kitchen",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_0663_gtlseo.jpg",
  },
  {
    id: 13,
    cardKey: "kitchen",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737502/WhatsApp_Image_2026-02-10_at_12.27.20_2_fvvmqe.jpg",
  },
  {
    id: 14,
    cardKey: "kitchen",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737502/WhatsApp_Image_2026-02-10_at_12.27.20_nzdnge.jpg",
  },
  {
    id: 15,
    cardKey: "bathroom",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216811/IMG_0292_u4fshf.jpg",
  },
  {
    id: 16,
    cardKey: "bathroom",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216810/acf4fe13-0181-4af3-8516-c9f4f1ab50d2_dauwgl.jpg",
  },
  {
    id: 17,
    cardKey: "room1",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_3195_xaddl9.jpg",
  },
  {
    id: 18,
    cardKey: "room2",
    thumbnail:
      "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737501/WhatsApp_Image_2026-02-10_at_12.27.21_jbuqbs.jpg",
  },
];

export function Photos() {
  const { t } = useTranslation();

  const testimonials = allCards.map((card) => ({
    id: card.id,
    name: t(`photos.cards.${card.cardKey}.title`),
    designation: "Botelho Beach House",
    quote: t(`photos.cards.${card.cardKey}.desc`),
    src: cloudinaryOptimize(card.thumbnail),
  }));

  return (
    <div className="min-h-screen py-20 w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-primary font-medium mb-4">
            {t("photos.galleryLabel")}
          </p>
          <h2 className="text-4xl md:text-5xl sm:text-2xl font-bold mb-4">
            <span className="text-gray-900">{t("photos.sectionTitle")}</span>{" "}
            <span className="text-primary">
              {t("photos.sectionTitleHighlight")}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("photos.sectionDescription")}
          </p>
        </div>

        <div>
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </div>
    </div>
  );
}
