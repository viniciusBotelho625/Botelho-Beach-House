import { Photos } from "./sections/photos";
import { Places } from "./sections/places";
import { Rating } from "./sections/rating";
import { Footer } from "./sections/footer";
import { Amenities } from "./sections/amenitiesname";
import { Hero } from "./sections/heroname";
import { Reservation } from "./sections/reservation";

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
        <Reservation />
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
