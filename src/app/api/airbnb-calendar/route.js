export async function GET() {
  const ical = (await import("ical")).default;

  const url = process.env.URL_SECRET_ICS;
  const AIRBNB_ICAL_URL = url;

  try {
    console.log("🔍 Buscando calendário Airbnb...");
    const response = await fetch(AIRBNB_ICAL_URL);

    if (!response.ok) {
      const text = await response.text();
      console.error("❌ Erro na resposta Airbnb:", response.status, text.slice(0, 200));
      return new Response(
        JSON.stringify({
          error: `Erro ${response.status} ao buscar o calendário Airbnb`,
          details: text.slice(0, 200),
        }),
        { status: 500 }
      );
    }

    const icsText = await response.text();
    const events = ical.parseICS(icsText);

    const reservas = Object.values(events)
      .filter((e) => e.type === "VEVENT")
      .map((e) => ({
        start: e.start,
        end: e.end,
        summary: e.summary,
      }));

    return new Response(JSON.stringify(reservas), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("💥 Erro completo:", error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
}
