"use client";

import Image from "next/image";
import heroImage from "../../../public/hero-beach-house.jpg";
import BookingWidget from "../components/BookingWidget";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Casa de praia ao pôr do sol"
          fill
          priority
          className="object-cover object-center"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      <div className="relative z-10 text-center px-8 py-20 flex flex-col items-center justify-center min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-light italic leading-tight max-w-5xl">
            Explore Sua Casa
            <br />
            de Praia dos Sonhos
          </h2>
        </div>

        <div className="w-full pb-12">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
};

export default Hero;
