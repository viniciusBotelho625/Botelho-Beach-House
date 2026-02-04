"use client";

import CircularGallery from "../components/CircularGallery";
import { cloudinaryOptimize } from "@/lib/utils";

const PLACES_RAW = [
  { image: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770213287/Cama_de_Anchieta_-_Itanha%C3%A9m_-_SP_jqeegq.jpg", text: "Cama de Anchieta" },
  { image: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770217378/WhatsApp_Image_2026-02-04_at_12.01.51_twqkqc.jpg", text: "Passarela de Anchieta" },
  { image: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770213939/Itanha%C3%A9m_vxhgyn.jpg", text: "Praia Cibratel" },
  { image: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770216030/unnamed_zgoims.webp", text: "Morro do Paranambuco" },
  { image: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770216216/unnamed_1_h8szat.jpg", text: "Estátua Mulheres de Areia" },
  { image: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770216829/unnamed_2_tskt2g.webp", text: "Centrinho da Cidade" },
  { image: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770217160/Praia-do-Suarao-Itanhaem-Praiao-SP_q17x4r.jpg", text: "Praia do Suarão" },
  { image: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770217379/WhatsApp_Image_2026-02-04_at_12.01.51_1_blwj9d.jpg", text: "Praia do Sonho" },
];

export function Places() {
  const places = PLACES_RAW.map((p) => ({ ...p, image: cloudinaryOptimize(p.image) }));

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-primary font-medium mb-3">
            EXPLORE
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
            <span className="text-gray-900">Descubra</span>{" "}
            <span className="text-primary">Pontos Turísticos</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Praias paradisíacas, natureza exuberante e cultura rica a poucos minutos da casa
          </p>
        </div>

        {/* Gallery */}
          <CircularGallery
            items={places}
            bend={0.5}
            textColor="#000000"
            borderRadius={0.05}
            scrollEase={0.05}
            font=" 14px Inter, system-ui, -apple-system, sans-serif"
            scrollSpeed={1.8}
          />

        {/* Info text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Arraste para explorar os pontos turísticos da região
          </p>
        </div>
      </div>
    </section>
  );
}
