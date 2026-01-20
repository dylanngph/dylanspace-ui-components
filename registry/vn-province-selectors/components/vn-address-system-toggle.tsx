"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useVNAddress } from "./vn-address-provider";
import { cn } from "@/lib/utils";

export interface VNAddressSystemToggleProps {
  /**
   * Label for system selection
   * @default "Hệ thống"
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
}

export function VNAddressSystemToggle({
  label = "Hệ thống",
  showLabel = true,
  className,
}: VNAddressSystemToggleProps) {
  const { system, setSystem } = useVNAddress();

  return (
    <div className={cn("space-y-3", className)}>
      {showLabel && (
        <Label className="text-sm font-medium">{label}</Label>
      )}
      <RadioGroup
        value={system}
        onValueChange={(value) => setSystem(value as "old" | "new")}
        className="flex flex-col sm:flex-row gap-4 sm:gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="old" id="system-old" />
          <Label htmlFor="system-old" className="text-sm font-normal cursor-pointer">
            Hệ thống cũ (Có Quận/Huyện)
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="system-new" />
          <Label htmlFor="system-new" className="text-sm font-normal cursor-pointer">
            Hệ thống mới (2025)
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
