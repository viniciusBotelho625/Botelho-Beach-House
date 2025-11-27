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
