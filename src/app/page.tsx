import Amenities from "./sections/amenities";
import Hero from "./sections/hero";
import Photos from "./sections/photos";
import Rating from "./sections/rating";
import Reserve from "./sections/reserve";

export default function Home() {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section className="">
        <div className="h-40 bg-[linear-gradient(to_top,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_100%)]" />

        <Photos />
      </section>
      {/* <section className="w-full bg-gray-100">
        <Reserve />
      </section> */}
      <section>
        <Amenities />
      </section>
      <section>
        <Rating />
      </section>
    </>
  );
}
