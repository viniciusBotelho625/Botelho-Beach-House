import {
  Calendar,
  Users,
  Home,
  ChevronRight,
  ChevronUpIcon,
  ChevronDownIcon,
  Plus,
  Minus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { ButtonRounded } from "./ButtonRounded";

const BookingWidget = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState({
    adultos: 0,
    criancas: 0,
    bebes: 0,
  });
  const [animals, setAnimals] = useState(0);
  const [guestsPopoverOpen, setGuestsPopoverOpen] = useState(false);
  const totalGuests = guests.adultos + guests.criancas + guests.bebes;

  return (
    <div className="w-full max-w-7xl mx-auto px-8">
      <div className="bg-[hsl(var(--glass-bg))]/80 backdrop-blur-md rounded-lg p-8 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="flex gap-4 ">
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="date-picker"
                className="px-1 text-white/70 text-md uppercase tracking-widest font-light"
              >
                Data check-in
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal bg-transparent border-white/20 text-white/70"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronUpIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="time-picker"
                className="px-1 text-white/70 text-md uppercase tracking-widest font-light"
              >
                Horário
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="bg-transparent border-white/20 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none text-white/70"
              />
            </div>
          </div>
          <div className="flex gap-4 ">
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="date-picker"
                className="px-1 text-white/70 text-md uppercase tracking-widest font-light"
              >
                Data check-out
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-32 justify-between font-normal bg-transparent border-white/20 text-white/70"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-3">
              <Label
                htmlFor="time-picker"
                className="px-1 text-white/70 text-md uppercase tracking-widest font-light"
              >
                Horário
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="bg-transparent border-white/20 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none text-white/70"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white/70 text-md uppercase tracking-widest font-light">
              Hóspedes
            </Label>

            <Popover
              open={guestsPopoverOpen}
              onOpenChange={setGuestsPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal bg-transparent border-white/20 text-white/70 hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {guests.adultos + guests.criancas === 0
                        ? "Selecionar hóspedes"
                        : `${guests.adultos + guests.criancas} hóspede${guests.adultos + guests.criancas > 1 ? "s" : ""}`}
                    </span>
                  </div>
                  <ChevronUpIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-[#03303E]/70 backdrop-blur-xl border-white/30 !rounded-2xl shadow-2xl">
                <div className="space-y-5">
                  <div className="space-y-5">
                    {/* Adultos */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          Adultos
                        </Label>
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
                          disabled={totalGuests > 9}
                        />
                      </div>
                    </div>

                    {/* Crianças */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          Crianças
                        </Label>
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
                          disabled={totalGuests > 9}
                        />
                      </div>
                    </div>

                    {/* Bebês */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          Bebês
                        </Label>
                        <span className="text-white/80 text-xs">
                          0 a 2 anos
                        </span>
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
                            setGuests((prev) => ({
                              ...prev,
                              bebes: prev.bebes + 1,
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/* Animais de estimação */}
                    <div className="flex items-center justify-between py-1">
                      <div className="flex flex-col gap-0.5">
                        <Label className="text-white font-semibold text-base">
                          Animais de estimação
                        </Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <ButtonRounded
                          icon={<Minus className="h-4 w-4" />}
                          onClick={() =>
                            setAnimals((prev) => Math.max(0, prev - 1))
                          }
                          disabled={animals === 0}
                        />
                        <span className="w-10 text-center text-white font-semibold text-lg">
                          {animals}
                        </span>
                        <ButtonRounded
                          icon={<Plus className="h-4 w-4" />}
                          onClick={() => setAnimals((prev) => prev + 1)}
                          disabled={animals > 2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 h-[1px] w-full" />
                  <Button className="w-full bg-transparent text-white border-0 hover:bg-white/90 h-11 hover:text-black font-light tracking-wider uppercase text-sm cursor-pointer">
                    Confirmar
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button className="bg-transparent text-white border-0 hover:bg-white/90 h-11 hover:text-black font-light tracking-wider uppercase text-sm cursor-pointer">
            Reserva
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
