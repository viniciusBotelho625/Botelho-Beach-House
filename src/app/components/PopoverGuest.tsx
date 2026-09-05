"use client";

import { Users, ChevronDownIcon, Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ButtonRounded } from "./ButtonRounded";
import { cn } from "@/lib/utils";

interface Guests {
  adultos: number;
  criancas: number;
  bebes: number;
}

interface GuestsPickerProps {
  guests: Guests;
  setGuests: React.Dispatch<React.SetStateAction<Guests>>;
  animals: number;
  setAnimals: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  divClassName?: string;
  background?: string;
  bgIcon?: string;
}

export const PopoverGuest = ({
  guests,
  setGuests,
  animals,
  setAnimals,
  open,
  onOpenChange,
  className,
  divClassName,
  background,
  bgIcon,
}: GuestsPickerProps) => {
  const { t } = useTranslation();
  const totalGuests = guests.adultos + guests.criancas;

  return (
    <div className="w-full md:w-auto">
      <div
        className={cn(
          "flex flex-col gap-2 border-b border-white/20 pb-3",
          divClassName,
        )}
      >
        <Label className="text-white/70 text-xs sm:text-sm md:text-md uppercase tracking-widest font-light">
          {t("hero.guestsLabel")}
        </Label>
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                className,
                "w-full md:w-60 justify-between font-normal border-none shadow-none text-white/70 cursor-pointer  bg-transparent hover:bg-transparent hover:text-white/50 text-xs sm:text-sm h-auto",
              )}
            >
              <div className="flex items-center gap-2">
                <Users className={cn(bgIcon, "h-4 w-4 shrink-0")} />
                <span className="truncate">
                  {totalGuests === 0
                    ? t("hero.guests")
                    : `${totalGuests} ${
                        totalGuests > 1
                          ? t("hero.guest_plural")
                          : t("hero.guest_singular")
                      }`}
                </span>
              </div>
              <ChevronDownIcon className="h-4 w-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn(
              background,
              "w-[calc(100vw-2rem)] sm:w-80 bg-[#03303E]/70 backdrop-blur-xl border-none rounded-lg shadow-2xl",
            )}
          >
            <div className="space-y-4">
              {/* Adultos */}
              <div className="flex items-center justify-between py-1">
                <div className="flex flex-col">
                  <Label className="text-white font-semibold text-base">
                    {t("hero.adults")}
                  </Label>
                  <p className="text-xs text-gray-300">13 anos ou mais</p>
                </div>
                <div className="flex items-center gap-3">
                  <ButtonRounded
                    icon={<Minus className="h-4 w-4" />}
                    onClick={() =>
                      setGuests((prev) => ({
                        ...prev,
                        adultos: Math.max(0, prev.adultos - 1),
                      }))
                    }
                    disabled={guests.adultos === 0}
                  />
                  <span className="w-10 text-center text-white font-semibold text-lg">
                    {guests.adultos}
                  </span>
                  <ButtonRounded
                    icon={<Plus className="h-4 w-4" />}
                    onClick={() =>
                      setGuests((prev) => ({
                        ...prev,
                        adultos: prev.adultos + 1,
                      }))
                    }
                    disabled={totalGuests >= 10}
                  />
                </div>
              </div>

              {/* Crianças */}
              <div className="flex items-center justify-between py-1">
                <div className="flex flex-col">
                  <Label className="text-white font-semibold text-base">
                    {t("hero.children")}
                  </Label>
                  <p className="text-xs text-gray-300">De 2 a 12 anos</p>
                </div>
                <div className="flex items-center gap-3">
                  <ButtonRounded
                    icon={<Minus className="h-4 w-4" />}
                    onClick={() =>
                      setGuests((prev) => ({
                        ...prev,
                        criancas: Math.max(0, prev.criancas - 1),
                      }))
                    }
                    disabled={guests.criancas === 0}
                  />
                  <span className="w-10 text-center text-white font-semibold text-lg">
                    {guests.criancas}
                  </span>
                  <ButtonRounded
                    icon={<Plus className="h-4 w-4" />}
                    onClick={() =>
                      setGuests((prev) => ({
                        ...prev,
                        criancas: prev.criancas + 1,
                      }))
                    }
                    disabled={totalGuests >= 10}
                  />
                </div>
              </div>

              {/* Bebês */}
              <div className="flex items-center justify-between py-1">
                <div className="flex flex-col">
                  <Label className="text-white font-semibold text-base">
                    {t("hero.babies")}
                  </Label>
                  <p className="text-xs text-gray-300">Menor de 2</p>
                </div>
                <div className="flex items-center gap-3">
                  <ButtonRounded
                    icon={<Minus className="h-4 w-4" />}
                    onClick={() =>
                      setGuests((prev) => ({
                        ...prev,
                        bebes: Math.max(0, prev.bebes - 1),
                      }))
                    }
                    disabled={guests.bebes === 0}
                  />
                  <span className="w-10 text-center text-white font-semibold text-lg">
                    {guests.bebes}
                  </span>
                  <ButtonRounded
                    icon={<Plus className="h-4 w-4" />}
                    onClick={() =>
                      setGuests((prev) => ({ ...prev, bebes: prev.bebes + 1 }))
                    }
                  />
                </div>
              </div>

              {/* Animais */}
              <div className="flex items-center justify-between py-1">
                <Label className="text-white font-semibold text-base">
                  {t("hero.animals")}
                </Label>
                <div className="flex items-center gap-3">
                  <ButtonRounded
                    icon={<Minus className="h-4 w-4" />}
                    onClick={() => setAnimals((prev) => Math.max(0, prev - 1))}
                    disabled={animals === 0}
                  />
                  <span className="w-10 text-center text-white font-semibold text-lg">
                    {animals}
                  </span>
                  <ButtonRounded
                    icon={<Plus className="h-4 w-4" />}
                    onClick={() => setAnimals((prev) => prev + 1)}
                    disabled={animals >= 1}
                  />
                </div>
              </div>

              <div className="bg-white/10 h-px w-full" />
              <Button
                className="w-full text-black border-0 bg-white/90 h-10 sm:h-11 hover:text-black hover:bg-white/50 font-light tracking-wider uppercase text-xs sm:text-sm cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                {t("hero.confirm")}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
