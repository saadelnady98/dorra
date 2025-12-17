"use client";

import * as React from "react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import calendar2 from "@/public/calendar.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ChevronDown } from "lucide-react"; // السهم

import type { DateRange } from "react-day-picker";

interface DatePickerWithRangeProps {
  watch?: any;
  control?: any;
  lang: string;
  className?: string;
  value?: DateRange;
  onChange?: (value: DateRange) => void;
}

export function DatePickerWithRange({
  watch,
  control,
  lang,
  className,
  value,
  onChange,
}: DatePickerWithRangeProps) {
  const t = useTranslations("filter");
  const today = new Date();

  const initialRange: DateRange = watch?.("date") || value || {};
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(initialRange);

  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    if (watch) setSelectedRange(watch("date") || {});
    else if (value) setSelectedRange(value || {});
  }, [watch, value]);

  const { from, to } = selectedRange || {};
  const hasValue = from && to;

  const dateFormat = lang === "ar" ? "dd LLL" : "LLL dd";

  const displayText = React.useMemo(() => {
    if (from) {
      if (to) return `${format(from, dateFormat)} - ${format(to, dateFormat)}`;
      return format(from, dateFormat);
    }
    return t("select_date");
  }, [from, to, dateFormat, t]);

  return (
    <div className={cn("grid gap-2 w-full m-auto", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            aria-label={t("select_date")}
            className={cn(
              "w-full justify-start py-[30px] rounded-[12px] border-0  text-left font-normal transition-colors duration-300 flex items-center gap-3 group",
              hasValue
                ? "text-[#CAB16C] bg-white hover:bg-white hover:text-[#CAB16C]"
                : "text-white bg-[#FFFFFF1A] hover:bg-white hover:text-[#CAB16C]"
            )}
          >
            <Image
              src={calendar2}
              alt="calendar"
              className="w-5 h-5 flex-shrink-0"
            />

            <span
              className={`flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}
            >
              {displayText}
            </span>

            <ChevronDown className="w-5 h-5 transition-transform duration-300" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-full p-0 mt-2 bg-[#00000025] backdrop-blur-lg text-white z-[9999] border-0"
          align="start"
        >
          {control ? (
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Calendar
                  initialFocus
                  mode="range"
                  dir="ltr"
                  locale={lang === "ar" ? ar : enUS}
                  defaultMonth={today}
                  selected={selectedRange}
                  numberOfMonths={2}
                  disabled={{ before: today }}
                  className="text-white w-full bg-transparent"
                  onSelect={(range) => {
                    setSelectedRange(range);
                    field.onChange(range);
                    if (range) {
                      onChange?.(range);
                    }
                  }}
                  onDayMouseEnter={(day: Date) => setHoverDate(day)}
                  onDayMouseLeave={() => setHoverDate(null)}
                  // hoverRange={
                  //   from && !to && hoverDate
                  //     ? { from, to: hoverDate }
                  //     : undefined
                  // }
                  modifiersClassNames={{
                    hoverRange: "bg-accent text-accent-foreground",
                  }}
                />
              )}
            />
          ) : (
            <Calendar
              initialFocus
              mode="range"
              dir="ltr"
              locale={lang === "ar" ? ar : enUS}
              defaultMonth={today}
              selected={selectedRange}
              numberOfMonths={2}
              disabled={{ before: today }}
              className="text-white w-full bg-transparent"
              onSelect={(range) => {
                setSelectedRange(range);
                if (range) {
                  onChange?.(range);
                }
              }}
              onDayMouseEnter={(day: Date) => setHoverDate(day)}
              onDayMouseLeave={() => setHoverDate(null)}
              // hoverRange={
              //   from && !to && hoverDate ? { from, to: hoverDate } : undefined
              // }
              modifiersClassNames={{
                hoverRange: "bg-accent text-accent-foreground",
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
