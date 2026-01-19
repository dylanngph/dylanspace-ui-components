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

export interface VNAddressDistrictSelectorProps {
  /**
   * Label for district selection
   * @default "Quận/Huyện"
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

export function VNAddressDistrictSelector({
  label = "Quận/Huyện",
  showLabel = true,
  className,
  placeholder,
}: VNAddressDistrictSelectorProps) {
  const {
    system,
    selectedDistrict,
    availableDistricts,
    setSelectedDistrict,
  } = useVNAddress();
  const [open, setOpen] = React.useState(false);

  // Only show for old system
  if (system !== "old" || !availableDistricts.length) {
    return null;
  }

  const handleSelect = (district: string) => {
    setSelectedDistrict(district);
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
              {selectedDistrict
                ? selectedDistrict
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
          <Command>
            <CommandInput placeholder={`Tìm ${label.toLowerCase()}...`} />
            <CommandList className="max-h-72">
              <CommandEmpty>Không tìm thấy.</CommandEmpty>
              <CommandGroup>
                {availableDistricts.map((district) => (
                  <CommandItem
                    key={district}
                    value={district}
                    onSelect={() => handleSelect(district)}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedDistrict === district
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {district}
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
