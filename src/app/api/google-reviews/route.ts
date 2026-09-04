import { NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

const REVALIDATE_TIME = 60 * 60 * 24 * 7;

export async function GET() {
  try {
    if (!GOOGLE_API_KEY) {
      console.error("❌ API key do Google não configurada");

      return NextResponse.json(
        { error: "API key do Google não configurada" },
        { status: 500 },
      );
    }

    if (!GOOGLE_PLACE_ID) {
      console.error("❌ Place ID do Google não configurado");

      return NextResponse.json(
        { error: "Place ID do Google não configurado" },
        { status: 500 },
      );
    }

    console.log("Buscando avaliações do Google...");

    const params = new URLSearchParams({
      place_id: GOOGLE_PLACE_ID,
      fields: "name,rating,user_ratings_total,reviews",
      key: GOOGLE_API_KEY,
      language: "pt-BR",
    });

    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?${params}`;

    const response = await fetch(detailsUrl, {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP ao buscar avaliações: ${response.status}`);
    }

    const data = await response.json();

    console.log("📡 Status:", data.status);

    if (data.status !== "OK") {
      throw new Error(
        `Erro ao buscar detalhes: ${data.status} - ${
          data.error_message || "Sem mensagem"
        }`,
      );
    }

    const placeDetails = data.result;

    const formattedReviews =
      placeDetails.reviews?.map((review: any) => ({
        quote: review.text,
        name: review.author_name,
        rating: review.rating,
        time: review.time,
        profilePhoto: review.profile_photo_url,
      })) || [];

    return NextResponse.json({
      rating: placeDetails.rating || 5.0,
      totalReviews: placeDetails.user_ratings_total || 0,
      reviews: formattedReviews,
    });
  } catch (error) {
    console.error("❌ Erro ao buscar avaliações:", error);

    return NextResponse.json(
      {
        error: "Erro ao buscar avaliações",
        message: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}
