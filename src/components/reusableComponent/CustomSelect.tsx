"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";

type SelectTypes = {
  value: string;
  label: string;
};

export default function CustomSelect({
  control,
  name,
  placeholder,
  label,
  options,
  className,
  disabled,
  hasValue = false,
  isLoading = false,
}: {
  control?: any;
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  options: SelectTypes[];
  disabled?: boolean;
  hasValue?: boolean;
  isLoading?: boolean;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          value={field.value}
          disabled={disabled}
        >
          <div className="flex flex-col gap-[2px]">
            {label && (
              <label className="flex text-[14px] font-[300] text-white mb-2">
                {label}
              </label>
            )}
            <SelectTrigger
              className={`w-full py-[30px] border-none bg-[#FFFFFF1A] rounded-[12px] transition-colors duration-300 ${
                className ? className : ""
              } ${
                hasValue
                  ? "text-[#CAB16C] bg-white hover:text-[#CAB16C] hover:bg-white"
                  : "text-white hover:text-[#CAB16C] hover:bg-white"
              } ${isLoading ? "cursor-not-allowed" : ""}`}
            >
              <SelectValue
                placeholder={placeholder ? placeholder : "select.."}
                className="placeholder:text-white"
              />
            </SelectTrigger>
          </div>

          {/* هنا التعديل المهم */}
          <SelectContent
            className="bg-[#00000026] backdrop-blur-lg border-0 mt-2"
            position="popper"
          >
            <SelectGroup className="bg-[#00000026]">
              {options?.map((option) => (
                <SelectItem
                  className="bg-[#00000026] cursor-pointer border-b border-white/20 hover:bg-[#FFFFFF12] hover:text-white rounded-none py-3 text-white transition-colors duration-200"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
