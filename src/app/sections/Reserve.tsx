"use client";

import * as React from "react";
import { Calendar } from "@/app/components/ui/calendar";
import { Card } from "@/app/components/ui/card";
import { useEffect, useState } from "react";
import { CalendarIcon, Users } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface Guest {
  id: number;
  name: string;
}

export default function Reserve() {
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(
    new Date("2025-06-01")
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date("2025-06-05")
  );
  const [month, setMonth] = useState<Date | undefined>(checkInDate);
  const [checkInValue, setCheckInValue] = useState(formatDate(checkInDate));
  const [checkOutValue, setCheckOutValue] = useState(formatDate(checkOutDate));
  const [guests, setGuests] = useState<Guest[]>([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/airbnb-calendar")
      .then((res) => res.json())
      .then(setBookings)
      .catch(() => {});
  }, []);

  function formatDate(date: Date | undefined) {
    if (!date) {
      return "";
    }
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function isValidDate(date: Date | undefined) {
    if (!date) {
      return false;
    }
    return !isNaN(date.getTime());
  }

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setGuests(data.guests))
      .catch(() => {});
  }, []);

  return (
    <section className="w-full py-24 px-4 bg-gradient-to-br from-background via-secondary/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Faça sua Reserva
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha as datas perfeitas para sua estadia e garanta sua
            experiência inesquecível
          </p>
        </div>

        <Card
          className="max-w-5xl mx-auto bg-card border-0 overflow-hidden"
          style={{ boxShadow: "var(--shadow-large)" }}
        >
          <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80">
                  <CalendarIcon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Selecione as Datas
                </h3>
              </div>
              <div className="bg-secondary/50 rounded-2xl p-4">
                <Calendar
                  mode="single"
                  defaultMonth={checkInDate}
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  modifiersClassNames={{
                    booked: "[&>button]:line-through opacity-100",
                  }}
                  className="rounded-xl shadow-sm mx-auto"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded-xl p-4">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span>Datas disponíveis em destaque</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-accent/80">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Detalhes da Reserva
                </h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="checkin"
                    className="text-base font-medium text-foreground flex items-center gap-2"
                  >
                    Check-in
                  </Label>
                  <div className="relative">
                    <Input
                      id="checkin"
                      value={checkInValue}
                      placeholder="Selecione a data"
                      className="pr-10 h-12 bg-background border-border focus:border-primary transition-all"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setCheckInValue(e.target.value);
                        if (isValidDate(date)) {
                          setCheckInDate(date);
                          setMonth(date);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenCheckIn(true);
                        }
                      }}
                    />
                    <Popover open={openCheckIn} onOpenChange={setOpenCheckIn}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span className="sr-only">Selecionar data</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          captionLayout="dropdown"
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setCheckInDate(date);
                            setCheckInValue(formatDate(date));
                            setOpenCheckIn(false);
                          }}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="checkout"
                    className="text-base font-medium text-foreground flex items-center gap-2"
                  >
                    Check-out
                  </Label>
                  <div className="relative">
                    <Input
                      id="checkout"
                      value={checkOutValue}
                      placeholder="Selecione a data"
                      className="pr-10 h-12 bg-background border-border focus:border-primary transition-all"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setCheckOutValue(e.target.value);
                        if (isValidDate(date)) {
                          setCheckOutDate(date);
                          setMonth(date);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenCheckOut(true);
                        }
                      }}
                    />
                    <Popover open={openCheckOut} onOpenChange={setOpenCheckOut}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span className="sr-only">Selecionar data</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          captionLayout="dropdown"
                          month={month}
                          onMonthChange={setMonth}
                          onSelect={(date) => {
                            setCheckOutDate(date);
                            setCheckOutValue(formatDate(date));
                            setOpenCheckOut(false);
                          }}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="guests"
                    className="text-base font-medium text-foreground"
                  >
                    Número de Hóspedes
                  </Label>
                  <Select>
                    <SelectTrigger
                      id="guests"
                      className="h-12 bg-background border-border focus:border-primary"
                    >
                      <SelectValue placeholder="Selecione a quantidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Hóspedes</SelectLabel>
                        {guests.map((guest) => (
                          <SelectItem
                            key={guest.id}
                            value={guest.id.toString()}
                          >
                            {guest.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full h-14 text-lg font-semibold mt-8 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300">
                  Confirmar Reserva
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
