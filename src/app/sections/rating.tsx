"use client";

import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";
import { Star, ExternalLink } from "lucide-react";
import CountUp from "@/app/components/ui/count-up";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/Botelho+Beach+House/@-24.1381194,-46.7260795,17z/data=!4m8!3m7!1s0x94ce2900572eff73:0x6602e03209e3f4ff!8m2!3d-24.1381194!4d-46.7235046!9m1!1b1!16s%2Fg%2F11m75w7jmy?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D";

export default function InfiniteMovingCardsDemo() {
  const { reviews, rating, totalReviews, isLoading, error } =
    useGoogleReviews();

  return (
    <div className="min-h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
        <div className="text-center mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-blue-600 font-medium">
            DEPOIMENTOS
          </p>
        </div>

        <div className="text-center mb-3 sm:mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
            <span className="text-gray-900">O Que Nossos</span>
            <span className="text-blue-600"> Hóspedes Dizem</span>
          </h2>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Mais de{" "}
            <span className="font-bold">
              <CountUp end={100} duration={2} />
            </span>{" "}
            hospedagens concluídas com sucesso. Um histórico que transmite
            segurança, credibilidade e excelência em cada estadia.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 max-w-xs mx-auto">
          <div className="bg-white rounded-2xl shadow-xl px-2 py-4 w-full border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400 stroke-amber-400"
                />
              ))}
            </div>

            <div className="flex items-baseline gap-2 justify-center mb-2">
              <span className="text-5xl font-bold text-gray-900">
                {rating.toFixed(1).replace(".", ",")}
              </span>
              <span className="text-2xl text-gray-500">/ 5.0</span>
            </div>

            <p className="text-sm text-gray-600 text-center mb-6">
              Baseado em {totalReviews} avaliações
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <svg
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="#4285F4"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Avaliações verificadas no Google
              </span>
            </div>
          </div>
          {/* Botão para ver todas as avaliações */}
          {/* <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Ver Todas as Avaliações</span>
            <ExternalLink className="w-5 h-5" />
          </a> */}

          {/* Mensagens de status */}
          {error && (
            <div className="text-center text-xs text-amber-600 mt-4">
              ⚠️ Avaliações em modo offline
            </div>
          )}

          {isLoading && reviews.length === 0 && (
            <div className="text-center text-sm text-gray-500 mt-4">
              Carregando avaliações do Google...
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <InfiniteMovingCards
          items={reviews}
          direction="right"
          speed="fast"
          pauseOnHover={true}
        />
      </div>
    </div>
  );
}
