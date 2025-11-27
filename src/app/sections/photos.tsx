"use client";

import { Gallery } from "../components/ui/gallery";

export default function Photos() {
  const galleryItems = [
    {
      id: 1,
      title: "Piscina Principal",
      description:
        "Uma piscina moderna de 5 metros, perfeita para momentos de lazer e tranquilidade. Design contemporâneo com acabamento premium e iluminação LED ambiente.",
      image:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 2,
      title: "Área Gourmet",
      description:
        "Espaço completo para entretenimento com churrasqueira, forno a lenha e área de convivência. Ideal para reunir família e amigos em um ambiente sofisticado.",
      image:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 3,
      title: "Jardim Zen",
      description:
        "Um refúgio de paz e harmonia com paisagismo cuidadosamente planejado. Vegetação tropical e iluminação estratégica criam uma atmosfera única de bem-estar.",
      image:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 4,
      title: "Piscina Principal",
      description:
        "Uma piscina moderna de 5 metros, perfeita para momentos de lazer e tranquilidade. Design contemporâneo com acabamento premium e iluminação LED ambiente.",
      image:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 5,
      title: "Exterior da casa",
      description:
        "Casa de esquina com 125m², perfeita para momentos de lazer e tranquilidade. Design contemporâneo com acabamento premium e iluminação LED ambiente.",
      image:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
    {
      id: 6,
      title: "Garagem",
      description: "Garagem com espaço para 3 veículos.",
      image:
        "https://i.postimg.cc/j5PdzP4W/Chat-GPT-Image-3-de-out-de-2025-23-43-23.png",
    },
  ];

  return <Gallery items={galleryItems} />;
}
