"use client";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const getDaysInMonth = (month: number, year: number) => {
  const isLeapYear = year % 4 === 0;
  const monthDays = month !== 13 ? 30 : isLeapYear ? 6 : 5;

  return monthDays;
};
const Days = Array.from({ length: 42 }, (_, i) => i).map(
  (day) => (day % 30) + 1,
);

const EthioMonths = [
  "Meskerem",
  "Ṭəqəmt",
  "Hidar",
  "Tahsas",
  "Ṭərr",
  "Yäkatit",
  "Mäggabit",
  "Miyazya",
  "Génbot",
  "Säne",
  "Hamle",
  "Nähase",
  "Pagumē",
];

const EthioDays = [
  { amharic: "እሑድ", english: "Ehud" },
  { amharic: "ሰኞ", english: "Säñño" },
  { amharic: "ማክሰኞ", english: "Mäksäñño" },
  { amharic: "ረቡዕ", english: "Räbu" },
  { amharic: "ሐሙስ", english: "Hamus" },
  { amharic: "ዓርብ", english: "Arb" },
  { amharic: "ቅዳሜ", english: "Kidame" },
];

const gregorianToEthiopian = (date: Date) => {
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();

  const gregorianStartYear = gregorianYear - 8;
  const ethYear = gregorianStartYear + Math.floor((gregorianMonth + 9) / 12);

  const startMonth = ((gregorianMonth + 8) % 12) + 1;
  const ethMonth = startMonth > 4 ? startMonth - 4 : startMonth + 8;

  const startDay = new Date(gregorianYear, gregorianMonth - 1, 1);
  const dayOfYear =
    Math.floor((date.getTime() - startDay.getTime()) / (24 * 60 * 60 * 1000)) +
    1;
  const newYearDay = Math.floor(((gregorianStartYear % 4) + 3) / 4);
  const ethDay = ((dayOfYear - newYearDay) % 30) + 1;

  return { year: ethYear, month: ethMonth, day: ethDay };
};

const getStartingDayOfMonth = (month: number, year: number) => {
  const totalDays =
    (year - 1) * 365 +
    Math.floor((year - 1) / 4) +
    (month - 1) * 30 +
    (month > 13 ? 6 : 0);

  return totalDays % 7;
};

const CustomDatePicker = (props: Props) => {
  const [date, setDate] = useState(gregorianToEthiopian(new Date()));

  const daysInMonth = getDaysInMonth(date.month, date.year);
  const startingDay = getStartingDayOfMonth(date.month, date.year);

  const daysArray = Array.from({ length: 42 }, (_, i) => {
    const day = i - startingDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const handleDaySelection = (day: number) => {
    setDate((prev) => ({ ...prev, day }));
  };

  const handleMonthIncrement = () => {
    setDate((prev) => {
      return {
        ...prev,
        month: (prev.month % 13) + 1,
        year: prev.month === 13 ? prev.year + 1 : prev.year,
      };
    });
  };

  const handleMonthDecrement = () => {
    setDate((prev) => {
      return {
        ...prev,
        month: prev.month === 1 ? 13 : prev.month - 1,
        year: prev.month === 1 ? prev.year - 1 : prev.year,
      };
    });
  };
  return (
    <main>
      <section className="mt-4 flex h-[60vh] justify-center text-black">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[290px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                `${date.day}/${date.month}/${date.year}`
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="grid text-sm">
            <section className="mb-4 flex items-center justify-between">
              <Button
                size="icon"
                className="size-7"
                variant="outline"
                onClick={handleMonthDecrement}
              >
                <ChevronLeft className="size-4 cursor-pointer select-none opacity-50 transition hover:bg-zinc-100" />
              </Button>
              <span className="text-base font-medium text-zinc-800">
                {`${EthioMonths[date.month - 1]} ${date.year}`}
              </span>

              <Button
                size="icon"
                className="size-7"
                variant="outline"
                onClick={handleMonthIncrement}
              >
                <ChevronRight className="size-4 cursor-pointer opacity-50 transition hover:bg-zinc-100" />
              </Button>
            </section>
            <section className="mb-2 grid grid-cols-7 gap-1">
              {EthioDays.map((day) => (
                <span
                  key={day.english}
                  className="px-1 text-center capitalize text-zinc-600"
                >
                  {day.english.substring(0, 2)}
                </span>
              ))}
            </section>

            <section className="grid grid-cols-7">
              {daysArray.map((day, index) => (
                <span
                  key={index}
                  className={cn(
                    "cursor-pointer rounded-[2px] px-1 py-1.5 text-center font-medium text-zinc-700 transition hover:bg-zinc-100",
                    {
                      "bg-primary text-white hover:bg-primary":
                        day === date.day,
                      "cursor-not-allowed text-gray-400": day === null,
                    },
                  )}
                  onClick={() => day !== null && handleDaySelection(day)}
                >
                  {day || ""}
                </span>
              ))}
            </section>
          </PopoverContent>
        </Popover>
      </section>
    </main>
  );
};

export default CustomDatePicker;
