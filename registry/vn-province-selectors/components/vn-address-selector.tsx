"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { VNAddressProvider, type VNAddressSelection } from "./vn-address-provider";
import { VNAddressSystemToggle } from "./vn-address-system-toggle";
import { VNAddressProvinceSelector } from "./vn-address-province-selector";
import { VNAddressDistrictSelector } from "./vn-address-district-selector";
import { VNAddressWardSelector } from "./vn-address-ward-selector";

export interface VNAddressSelectorProps {
  /**
   * Callback when address selection changes
   */
  onSelectionChange?: (selection: VNAddressSelection) => void;
  /**
   * Initial selected system
   * @default "new"
   */
  defaultSystem?: "old" | "new";
  /**
   * Initial selected province code
   */
  defaultProvinceCode?: string;
  /**
   * Initial selected district name (old system only)
   */
  defaultDistrict?: string;
  /**
   * Initial selected ward code
   */
  defaultWardCode?: string;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Label for system selection
   * @default "Hệ thống"
   */
  systemLabel?: string;
  /**
   * Label for province selection
   * @default "Tỉnh/Thành phố"
   */
  provinceLabel?: string;
  /**
   * Label for district selection (old system)
   * @default "Quận/Huyện"
   */
  districtLabel?: string;
  /**
   * Label for ward selection
   * @default "Phường/Xã"
   */
  wardLabel?: string;
  /**
   * Show labels
   * @default true
   */
  showLabels?: boolean;
  /**
   * Custom children - allows composition of individual components
   */
  children?: React.ReactNode;
}

/**
 * Main Vietnamese Address Selector component
 * Wraps all sub-components with VNAddressProvider
 */
export function VNAddressSelector({
  onSelectionChange,
  defaultSystem = "new",
  defaultProvinceCode,
  defaultDistrict,
  defaultWardCode,
  className,
  systemLabel = "Hệ thống",
  provinceLabel = "Tỉnh/Thành phố",
  districtLabel = "Quận/Huyện",
  wardLabel = "Phường/Xã",
  showLabels = true,
  children,
}: VNAddressSelectorProps) {
  // If children provided, use composition pattern
  if (children) {
    return (
      <VNAddressProvider
        onSelectionChange={onSelectionChange}
        defaultSystem={defaultSystem}
        defaultProvinceCode={defaultProvinceCode}
        defaultDistrict={defaultDistrict}
        defaultWardCode={defaultWardCode}
      >
        {children}
      </VNAddressProvider>
    );
  }

  // Default: render all components in order
  return (
    <VNAddressProvider
      onSelectionChange={onSelectionChange}
      defaultSystem={defaultSystem}
      defaultProvinceCode={defaultProvinceCode}
      defaultDistrict={defaultDistrict}
      defaultWardCode={defaultWardCode}
    >
      <div className={cn("space-y-4 sm:space-y-6", className)}>
        <VNAddressSystemToggle label={systemLabel} showLabel={showLabels} />
        <VNAddressProvinceSelector label={provinceLabel} showLabel={showLabels} />
        <VNAddressDistrictSelector label={districtLabel} showLabel={showLabels} />
        <VNAddressWardSelector label={wardLabel} showLabel={showLabels} />
      </div>
    </VNAddressProvider>
  );
}

// Re-export all components for convenience
export { VNAddressProvider, useVNAddress } from "./vn-address-provider";
export { VNAddressSystemToggle } from "./vn-address-system-toggle";
export { VNAddressProvinceSelector } from "./vn-address-province-selector";
export { VNAddressDistrictSelector } from "./vn-address-district-selector";
export { VNAddressWardSelector } from "./vn-address-ward-selector";
export type { VNAddressSelection } from "./vn-address-provider";
