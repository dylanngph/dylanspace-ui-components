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
import type { Ward } from "../lib/vn-address";
import { vietnameseFilter } from "../lib/vn-search";

export interface VNAddressWardSelectorProps {
  /**
   * Label for ward selection
   * @default "Phường/Xã"
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

export function VNAddressWardSelector({
  label = "Phường/Xã",
  showLabel = true,
  className,
  placeholder,
}: VNAddressWardSelectorProps) {
  const {
    system,
    selectedWardCode,
    selectedWard,
    oldWardsForDistrict,
    newWardsForProvince,
    setSelectedWardCode,
  } = useVNAddress();
  const [open, setOpen] = React.useState(false);

  // Get available wards based on system
  const availableWards =
    system === "old" ? oldWardsForDistrict : newWardsForProvince;

  // Don't show if no wards available
  if (!availableWards.length) {
    return null;
  }

  const handleSelect = (wardCode: string) => {
    setSelectedWardCode(wardCode);
    setOpen(false);
  };

  const getWardName = (ward: Ward | { code: string; name: string }) => {
    return system === "old"
      ? (ward as { code: string; name: string }).name
      : (ward as Ward).name;
  };

  const getWardCode = (ward: Ward | { code: string; name: string }) => {
    return system === "old"
      ? (ward as { code: string; name: string }).code
      : (ward as Ward).ward_code;
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
              {selectedWard
                ? getWardName(selectedWard)
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
                {availableWards.map((ward) => {
                  const code = getWardCode(ward);
                  const name = getWardName(ward);
                  return (
                    <CommandItem
                      key={code}
                      value={name}
                      onSelect={() => handleSelect(code)}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedWardCode === code ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
