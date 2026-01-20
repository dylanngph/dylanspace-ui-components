"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVNAddress } from "./vn-address-provider";
import provincesData from "../assets/provinces.json";
import type { Province } from "../lib/vn-address";
import { vietnameseFilter } from "../lib/vn-search";

const PROVINCES = provincesData as Province[];

export interface VNAddressProvinceSelectorProps {
  /**
   * Label for province selection
   * @default "Tỉnh/Thành phố"
   */
  label?: string;
  /**
   * Show label
   * @default true
   */
  showLabel?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
}

export function VNAddressProvinceSelector({
  label = "Tỉnh/Thành phố",
  showLabel = true,
  className,
  placeholder,
}: VNAddressProvinceSelectorProps) {
  const { selectedProvinceCode, selectedProvince, setSelectedProvinceCode } =
    useVNAddress();
  const [open, setOpen] = React.useState(false);

  const handleSelect = (provinceCode: string) => {
    setSelectedProvinceCode(provinceCode);
    setOpen(false);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <Label className="text-sm font-medium">{label}</Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-10"
          >
            <span className="truncate text-left flex-1">
              {selectedProvince
                ? selectedProvince.name
                : placeholder || `Chọn ${label.toLowerCase()}...`}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) sm:max-w-none p-0"
          align="start"
          side="bottom"
          sideOffset={4}
        >
          <Command filter={vietnameseFilter}>
            <CommandInput placeholder={`Tìm ${label.toLowerCase()}...`} />
            <CommandList className="max-h-72">
              <CommandEmpty>Không tìm thấy.</CommandEmpty>
              <CommandGroup>
                {PROVINCES.map((province) => (
                  <CommandItem
                    key={province.province_code}
                    value={`${province.name} ${province.province_code}`}
                    onSelect={() => handleSelect(province.province_code)}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedProvinceCode === province.province_code
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {province.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
