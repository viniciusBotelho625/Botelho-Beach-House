import { NextResponse } from 'next/server';

// Coordenadas do Botelho Beach House
const LAT = -24.1381194;
const LNG = -46.7235046;
const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET() {
  try {
    console.log('🔍 Iniciando busca de avaliações do Google...');
    console.log(`📍 Coordenadas: ${LAT}, ${LNG}`);
    console.log('🔑 API Key configurada:', !!GOOGLE_API_KEY);
    
    if (!GOOGLE_API_KEY) {
      console.error('❌ API key do Google não configurada');
      return NextResponse.json(
        { error: 'API key do Google não configurada' },
        { status: 500 }
      );
    }

    // Primeiro, busca o place_id usando Nearby Search
    const searchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${LAT},${LNG}&radius=50&keyword=Botelho+Beach+House&key=${GOOGLE_API_KEY}&language=pt-BR`;
    console.log('🌐 Buscando place_id...');

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    console.log('📡 Status da busca:', searchData.status);

    if (searchData.status !== 'OK' || !searchData.results || searchData.results.length === 0) {
      throw new Error(`Erro ao buscar local: ${searchData.status} - ${searchData.error_message || 'Local não encontrado'}`);
    }

    const place = searchData.results[0];
    const placeId = place.place_id;
    
    console.log('✅ Place ID encontrado:', placeId);
    console.log('📍 Nome:', place.name);

    // Agora busca os detalhes com as avaliações
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${GOOGLE_API_KEY}&language=pt-BR`;
    console.log('🌐 Buscando detalhes e avaliações...');

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    console.log('📡 Status dos detalhes:', detailsData.status);

    if (detailsData.status !== 'OK') {
      throw new Error(`Erro ao buscar detalhes: ${detailsData.status} - ${detailsData.error_message || 'Sem mensagem'}`);
    }

    const placeDetails = detailsData.result;

    // Formata as avaliações para o formato esperado pelo componente
    const formattedReviews = placeDetails.reviews?.map((review: any) => ({
      quote: review.text,
      name: review.author_name,
      rating: review.rating,
      time: review.time,
      profilePhoto: review.profile_photo_url,
    })) || [];

    console.log('✅ Avaliações formatadas:', formattedReviews.length);

    return NextResponse.json({
      rating: placeDetails.rating || 5.0,
      totalReviews: placeDetails.user_ratings_total || 0,
      reviews: formattedReviews,
    });
  } catch (error) {
    console.error('❌ Erro ao buscar avaliações:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar avaliações',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
