"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface GalleryImage {
  id: number;
  src: string;
}

const images: GalleryImage[] = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1788565831/89294BBE-8A73-4359-82B6-3DCD819BB47B_efz5ee.png",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1788565831/8310F6A6-92EB-4BA6-84BC-739081618566_je5qqc.png",
  },
  {
    id: 3,
    src: " https://res.cloudinary.com/dmeglebnu/image/upload/v1788565830/IMG_8907_jwpcjw.jpg",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1788566596/b4bb867c-9718-4177-bd85-14812e8d1cd2_gjes6x.jpg",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1788565831/IMG_8928_k9xfx9.jpg",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1788565831/88B18493-53BB-43C8-9CA3-82AE3B263968_iwrvdl.png",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216810/IMG_3338_erzmzi.jpg",
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737501/WhatsApp_Image_2026-02-10_at_12.27.21_4_qjxejo.jpg",
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216810/IMG_3345_1_z1p1ir.jpg",
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216813/IMG_0245_mmrvik.jpg",
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1788565831/IMG_8933_e4so4t.jpg",
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_0663_gtlseo.jpg",
  },
  {
    id: 13,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737502/WhatsApp_Image_2026-02-10_at_12.27.20_2_fvvmqe.jpg",
  },
  {
    id: 14,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1788566596/IMG_8937_fwhzzd.jpg",
  },
  {
    id: 15,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216811/IMG_0292_u4fshf.jpg",
  },
  {
    id: 16,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216810/acf4fe13-0181-4af3-8516-c9f4f1ab50d2_dauwgl.jpg",
  },
  {
    id: 17,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_3195_xaddl9.jpg",
  },
  {
    id: 18,
    src: "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737501/WhatsApp_Image_2026-02-10_at_12.27.21_jbuqbs.jpg",
  },
];

export function Photos() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleImages = showAll ? images : images.slice(0, 8);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1,
      );
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === images.length - 1 ? 0 : selectedImage + 1,
      );
    }
  };

  return (
    <section id="galeria" className="py-20 bg-foam bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            {t("photos.title")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-foreground mb-4">
            {t("photos.subtitle")}
            <span className="text-transparent bg-clip-text bg-gradient-ocean">
              {t("photos.subtitle2")}
            </span>
          </h2>
          <p className="text-gray-600 not-odd:text-text-lg max-w-2xl mx-auto">
            {t("photos.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleImages.map((image, index) => {
            const title = t(`photos.images.${image.id}.title`);
            const alt = t(`photos.images.${image.id}.alt`);

            return (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square bg-card"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-semibold text-lg">
                    {title}
                  </h3>
                  <p className="text-foam text-sm">{alt}</p>
                </div>
              </div> */}
                <div className="absolute inset-0 ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-300 rounded-lg" />
              </div>
            );
          })}
        </div>

        {images.length > 8 && (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              variant="default"
              onClick={() => setShowAll((prev) => !prev)}
              className="bg-gradient-ocean text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacit cursor-pointer"
            >
              {showAll ? t("photos.showMore") : t("photos.showLess")}
            </Button>
          </div>
        )}

        <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-5xl w-full p-0 bg-background/95 backdrop-blur-lg border-primary/20">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background text-black rounded-full"
                onClick={closeLightbox}
              >
                <X className="h-5 w-5" />
              </Button>

              {selectedImage !== null && (
                <>
                  {(() => {
                    const current = images[selectedImage];
                    const currentTitle = t(`photos.images.${current.id}.title`);
                    const currentAlt = t(`photos.images.${current.id}.alt`);

                    return (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background text-black rounded-full"
                          onClick={goToPrevious}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background text-black rounded-full"
                          onClick={goToNext}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>

                        <div className="p-8">
                          <img
                            src={current.src}
                            alt={currentAlt}
                            className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                          />
                          <div className="mt-6 text-center">
                            {/* <h3 className="text-2xl font-semibold text-foreground mb-2">
                        {currentTitle}
                      </h3>
                      <p className="text-muted-foreground">
                        {currentAlt}
                      </p> */}
                            <p className="text-sm text-muted-foreground mt-2">
                              {selectedImage + 1} / {images.length}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

// "use client";
// import { LayoutGrid } from "../components/ui/layout-grid";

// export function Photos() {
//   return (
//     <div className="h-screen py-20 w-full bg-gray-100">
//       <LayoutGrid cards={cards} />
//     </div>
//   );
// }

// const SkeletonOne = () => {
//   return (
//     <div>
//       <p className="font-bold md:text-4xl text-xl text-white">
//         House in the woods
//       </p>
//       <p className="font-normal text-base text-white"></p>
//       <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//         A serene and tranquil retreat, this house in the woods offers a peaceful
//         escape from the hustle and bustle of city life.
//       </p>
//     </div>
//   );
// };

// const SkeletonTwo = () => {
//   return (
//     <div>
//       <p className="font-bold md:text-4xl text-xl text-white">
//         House above the clouds
//       </p>
//       <p className="font-normal text-base text-white"></p>
//       <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//         Perched high above the world, this house offers breathtaking views and a
//         unique living experience. It&apos;s a place where the sky meets home,
//         and tranquility is a way of life.
//       </p>
//     </div>
//   );
// };
// const SkeletonThree = () => {
//   return (
//     <div>
//       <p className="font-bold md:text-4xl text-xl text-white">
//         Greens all over
//       </p>
//       <p className="font-normal text-base text-white"></p>
//       <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//         A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
//         perfect place to relax, unwind, and enjoy life.
//       </p>
//     </div>
//   );
// };
// const SkeletonFour = () => {
//   return (
//     <div>
//       <p className="font-bold md:text-4xl text-xl text-white">
//         Rivers are serene
//       </p>
//       <p className="font-normal text-base text-white"></p>
//       <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
//         A house by the river is a place of peace and tranquility. It&apos;s the
//         perfect place to relax, unwind, and enjoy life.
//       </p>
//     </div>
//   );
// };

// const cards = [
//   {
//     id: 1,
//     content: <SkeletonOne />,
//     className: "",
//     thumbnail:
//       "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216812/IMG_1612_1_qhprv6.jpg",
//   },
//   {
//     id: 2,
//     content: <SkeletonTwo />,
//     className: "col-span-1",
//     thumbnail:
//       "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216809/IMG_5910_gpu4ha.jpg",
//   },
//   {
//     id: 3,
//     content: <SkeletonThree />,
//     className: "col-span-1",
//     thumbnail:
//       "https://res.cloudinary.com/dmeglebnu/image/upload/v1769216809/7c7435c9-20a5-40ac-8ad4-e28a775b1954_jh50v7.jpg",
//   },
//   {
//     id: 4,
//     content: <SkeletonFour />,
//     className: "md:col-span-2",
//     thumbnail:
//       "https://res.cloudinary.com/dmeglebnu/image/upload/v1770737504/WhatsApp_Image_2026-02-10_at_12.27.20_1_enf3co.jpg",
//   },
// ];
