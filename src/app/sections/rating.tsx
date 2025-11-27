"use client";

import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";
import React, { useEffect, useState } from "react";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden  bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-gray-900 m-12">
        Avaliações dos Hóspedes
      </h2>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Casa incrível!! Tudo limpinho. Uns 5 minutos de carro até a praia. Anfitrião e caseira super atenciosos. Amamos passar o feriado em família. Com certeza voltaremos mais vezes. Muito obrigada 😍🫰🏻",
    name: "Gabriela Barros",
    rating: 5,
  },
  {
    quote:
      "Casa nova, bem cuidada, com área de piscina e churrasqueira impecáveis. Ambiente privativo, ideal para quem busca conforto e sossego. Vinicius é um excelente anfitrião, sempre disponível para tirar dúvidas. Sem duvidas voltarei mais vezes.",
    name: "Gilmar Monteiro",
    rating: 5,
  },
  {
    quote:
      "Ótima casa, tudo novinho! Voltarei mais vezes, eu e minha família amamos!",
    name: "Ana Maria",
    rating: 5,
  },
  {
    quote:
      "Casa impecável 😍 Atendimento excelente, vale muitooo a pena alugar e aproveitar o lazer dessa casa ❤️ Gratidão ao Vinícius por ser tão atencioso  e prestativo, alugaremos mais vezes sem duvidas!!!",
    name: "Bianca Santps",
    rating: 5,
  },
  {
    quote:
      "Anfitrião excelente, responde imediatamente a qualquer dúvida. A casa é exatamente como descrita, sem dúvidas voltarei mais vezes.",
    name: "Paloma Teles",
    rating: 5,
  },
  {
    quote:
      "Casa nova, tudo limpo e bem cuidado. Igual as fotos e o Vinicius foi prestativo o tempo todo, recomendo!!",
    name: "Leticia Vitoria",
    rating: 5,
  },
  {
    quote:
      "Casa maravilhosa, muito limpa, aconchegante e bem localizada. Espaço perfeito para relaxar e aproveitar a praia. Recomendo demais! 🌊☀️",
    name: "João Cassio ",
    rating: 5,
  },
  {
    quote:
      "A estadia superou minhas expectativas novamente , a limpeza e a organização são impecável , o ambiente super agradável. E não podemos deixa de fora o atendimento que sempre está ali pra ter dá um suporte do começo ao fim , não é minha Primeira e nem a segunda vez , e nem a última, Obrigado por tudo,vocês são 10 ❤️❤️✅✅",
    name: "Thalia Sousa",
    rating: 5,
  },
];
