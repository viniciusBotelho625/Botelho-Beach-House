import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { airbnbReviews } from "@/data/airbnbReviews";

export interface Review {
  quote: string;
  name: string;
  rating: number;
  time?: number;
  profilePhoto?: string;
  source?: "google" | "airbnb";
  date?: string;
}

interface GoogleReviewsData {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

const testimonials: Review[] = [
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

export function useGoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5.0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [googleRating, setGoogleRating] = useState(0);
  const [googleTotal, setGoogleTotal] = useState(0);
  const [airbnbRating, setAirbnbRating] = useState(5.0);
  const [airbnbTotal, setAirbnbTotal] = useState(airbnbReviews.length);

  // Busca as avaliações do Google
  const { data, isLoading, error } = useQuery<GoogleReviewsData>({
    queryKey: ["google-reviews"],
    queryFn: async () => {
      const response = await fetch("/api/google-reviews");
      if (!response.ok) {
        throw new Error("Erro ao buscar avaliações");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hora
    refetchOnWindowFocus: false,
  });

  // Combina avaliações do Google e Airbnb
  useEffect(() => {
    // Converte avaliações do Airbnb para o formato padrão
    const airbnbFormatted: Review[] = airbnbReviews.map((review) => ({
      quote: review.quote,
      name: review.name,
      rating: review.rating,
      source: "airbnb" as const,
      date: review.date,
    }));

    // Calcula rating médio do Airbnb
    const airbnbAvg =
      airbnbReviews.reduce((acc, r) => acc + r.rating, 0) /
      airbnbReviews.length;
    setAirbnbRating(airbnbAvg);
    setAirbnbTotal(airbnbReviews.length);

    if (data && data.reviews && data.reviews.length > 0) {
      // Marca avaliações do Google com a source
      const googleFormatted: Review[] = data.reviews.map((review) => ({
        ...review,
        source: "google" as const,
      }));

      // Combina avaliações do Google + Airbnb
      const allReviews = [...googleFormatted, ...airbnbFormatted];

      // Embaralha as avaliações para misturar as fontes
      const shuffled = allReviews.sort(() => Math.random() - 0.5);

      setReviews(shuffled);
      setGoogleRating(data.rating);
      setGoogleTotal(data.totalReviews);

      // Calcula rating médio geral (ponderado)
      const totalCount = data.totalReviews + airbnbReviews.length;
      const weightedRating =
        (data.rating * data.totalReviews + airbnbAvg * airbnbReviews.length) /
        totalCount;

      setRating(weightedRating);
      setTotalReviews(totalCount);
    } else if (error) {
      // Fallback: usa apenas avaliações locais (testimonials) se Google falhar
      console.warn("Usando avaliações locais como fallback");
      const localFormatted: Review[] = testimonials.map((review) => ({
        ...review,
        source: "airbnb" as const,
      }));
      setReviews(localFormatted);
      setRating(5.0);
      setTotalReviews(testimonials.length);
    } else {
      // Enquanto carrega Google, mostra apenas Airbnb
      setReviews(airbnbFormatted);
      setRating(airbnbAvg);
      setTotalReviews(airbnbReviews.length);
    }
  }, [data, error]);

  return {
    reviews,
    rating,
    totalReviews,
    googleRating,
    googleTotal,
    airbnbRating,
    airbnbTotal,
    isLoading,
    error,
  };
}
