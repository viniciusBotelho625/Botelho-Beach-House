import { Photos } from "./sections/photos";
import { Places } from "./sections/places";
import { Rating } from "./sections/rating";
import { Footer } from "./sections/footer";
import { Amenities } from "./sections/amenities";
import { Hero } from "./sections/hero";
import { Reserve } from "./sections/reserve";

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
