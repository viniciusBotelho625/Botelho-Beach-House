import dynamic from "next/dynamic";
import Hero from "./sections/hero";

const Photos = dynamic(
  () => import("./sections/photos").then((m) => ({ default: m.Photos })),
  {
    ssr: true,
    loading: () => (
      <section className="min-h-[600px] bg-gray-100 animate-pulse" />
    ),
  }
);

const Amenities = dynamic(
  () => import("./sections/amenities").then((m) => ({ default: m.Amenities })),
  {
    ssr: true,
    loading: () => (
      <section className="min-h-[400px] bg-gray-50 animate-pulse" />
    ),
  }
);

const Places = dynamic(
  () => import("./sections/places").then((m) => ({ default: m.Places })),
  {
    ssr: true,
    loading: () => (
      <section className="min-h-[500px] bg-gray-50 animate-pulse" />
    ),
  }
);

const Reserve = dynamic(
  () => import("./sections/reserve").then((m) => ({ default: m.Reserve })),
  {
    ssr: true,
    loading: () => (
      <section className="min-h-[400px] bg-gray-50 animate-pulse" />
    ),
  }
);

const Rating = dynamic(
  () => import("./sections/rating").then((m) => ({ default: m.Rating })),
  {
    ssr: true,
    loading: () => (
      <section className="min-h-[400px] bg-gray-100 animate-pulse" />
    ),
  }
);

const Footer = dynamic(() => import("./sections/footer"), {
  ssr: true,
  loading: () => (
    <footer className="min-h-[200px] bg-[#105c74] animate-pulse" />
  ),
});

export default function Home() {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <Photos />
      </section>
      <section>
        <Amenities />
      </section>
      <section>
        <Places />
      </section>
      <section>
        <Reserve />
      </section>
      <section>
        <Rating />
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}
