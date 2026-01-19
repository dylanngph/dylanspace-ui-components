"use client";

import * as React from "react";
import type {
  Province,
  Ward,
  WardMapping,
} from "@/registry/lib/vn-address";
import {
  getDistrictsForProvince,
  getMappingsForDistrict,
  getWardsForProvince,
  getOldWardsForDistrict,
} from "@/registry/lib/vn-address";

// Load data directly from assets
import provincesData from "@/registry/assets/provinces.json";
import wardsData from "@/registry/assets/wards.json";
import mappingsData from "@/registry/assets/ward_mappings.json";

const PROVINCES = provincesData as Province[];
const WARDS = wardsData as Ward[];
const MAPPINGS = mappingsData as WardMapping[];

export interface VNAddressSelection {
  system: "old" | "new";
  province: Province | null;
  district: string | null;
  ward: Ward | { code: string; name: string } | null;
  mappings?: WardMapping[];
}

interface VNAddressContextValue {
  system: "old" | "new";
  selectedProvinceCode: string | null;
  selectedDistrict: string | null;
  selectedWardCode: string | null;
  selectedProvince: Province | null;
  availableDistricts: string[];
  oldWardsForDistrict: Array<{ code: string; name: string }>;
  newWardsForProvince: Ward[];
  selectedWard: Ward | { code: string; name: string } | null;
  districtMappings: WardMapping[];
  selection: VNAddressSelection;
  setSystem: (system: "old" | "new") => void;
  setSelectedProvinceCode: (code: string | null) => void;
  setSelectedDistrict: (district: string | null) => void;
  setSelectedWardCode: (code: string | null) => void;
}

const VNAddressContext = React.createContext<VNAddressContextValue | undefined>(
  undefined
);

export interface VNAddressProviderProps {
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
   * Children components
   */
  children: React.ReactNode;
}

export function VNAddressProvider({
  children,
  onSelectionChange,
  defaultSystem = "new",
  defaultProvinceCode,
  defaultDistrict,
  defaultWardCode,
}: VNAddressProviderProps) {
  const [system, setSystem] = React.useState<"old" | "new">(defaultSystem);
  const [selectedProvinceCode, setSelectedProvinceCode] = React.useState<
    string | null
  >(defaultProvinceCode || null);
  const [selectedDistrict, setSelectedDistrict] = React.useState<string | null>(
    defaultDistrict || null
  );
  const [selectedWardCode, setSelectedWardCode] = React.useState<string | null>(
    defaultWardCode || null
  );

  // Compute derived state
  const selectedProvince = React.useMemo(
    () => PROVINCES.find((p) => p.province_code === selectedProvinceCode) || null,
    [selectedProvinceCode]
  );

  // Old system: Get districts for selected province
  const availableDistricts = React.useMemo(() => {
    if (!selectedProvince || system !== "old") return [];
    return getDistrictsForProvince(MAPPINGS, selectedProvince.name);
  }, [selectedProvince, system]);

  // Old system: Get old wards for selected district
  const oldWardsForDistrict = React.useMemo(() => {
    if (!selectedProvince || !selectedDistrict || system !== "old") return [];
    return getOldWardsForDistrict(MAPPINGS, selectedProvince.name, selectedDistrict);
  }, [selectedProvince, selectedDistrict, system]);

  // New system: Get new wards for selected province
  const newWardsForProvince = React.useMemo(() => {
    if (!selectedProvinceCode || system !== "new") return [];
    return getWardsForProvince(WARDS, selectedProvinceCode);
  }, [selectedProvinceCode, system]);

  // Selected ward (works for both systems)
  const selectedWard = React.useMemo(() => {
    if (system === "old") {
      return oldWardsForDistrict.find((w) => w.code === selectedWardCode) || null;
    } else {
      return newWardsForProvince.find((w) => w.ward_code === selectedWardCode) || null;
    }
  }, [system, oldWardsForDistrict, newWardsForProvince, selectedWardCode]);

  // Get mappings for old system
  const districtMappings = React.useMemo(() => {
    if (!selectedProvince || !selectedDistrict || system !== "old") return [];
    return getMappingsForDistrict(MAPPINGS, selectedProvince.name, selectedDistrict);
  }, [selectedProvince, selectedDistrict, system]);

  // Build selection object
  const selection = React.useMemo<VNAddressSelection>(
    () => ({
      system,
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      mappings: system === "old" ? districtMappings : undefined,
    }),
    [system, selectedProvince, selectedDistrict, selectedWard, districtMappings]
  );

  // Notify on selection change (only when selection actually changes)
  const prevSelectionRef = React.useRef<VNAddressSelection | null>(null);
  React.useEffect(() => {
    if (onSelectionChange && prevSelectionRef.current !== selection) {
      prevSelectionRef.current = selection;
      onSelectionChange(selection);
    }
  }, [selection, onSelectionChange]);

  // Handle system change - clear dependent selections
  const handleSetSystem = React.useCallback((newSystem: "old" | "new") => {
    setSystem(newSystem);
    setSelectedDistrict(null);
    setSelectedWardCode(null);
  }, []);

  // Handle province change - clear dependent selections
  const handleSetProvinceCode = React.useCallback((code: string | null) => {
    setSelectedProvinceCode(code);
    setSelectedDistrict(null);
    setSelectedWardCode(null);
  }, []);

  // Handle district change - clear ward
  const handleSetDistrict = React.useCallback((district: string | null) => {
    setSelectedDistrict(district);
    setSelectedWardCode(null);
  }, []);

  const value: VNAddressContextValue = React.useMemo(
    () => ({
      system,
      selectedProvinceCode,
      selectedDistrict,
      selectedWardCode,
      selectedProvince,
      availableDistricts,
      oldWardsForDistrict,
      newWardsForProvince,
      selectedWard,
      districtMappings,
      selection,
      setSystem: handleSetSystem,
      setSelectedProvinceCode: handleSetProvinceCode,
      setSelectedDistrict: handleSetDistrict,
      setSelectedWardCode,
    }),
    [
      system,
      selectedProvinceCode,
      selectedDistrict,
      selectedWardCode,
      selectedProvince,
      availableDistricts,
      oldWardsForDistrict,
      newWardsForProvince,
      selectedWard,
      districtMappings,
      selection,
      handleSetSystem,
      handleSetProvinceCode,
      handleSetDistrict,
    ]
  );

  return (
    <VNAddressContext.Provider value={value}>
      {children}
    </VNAddressContext.Provider>
  );
}

export function useVNAddress() {
  const context = React.useContext(VNAddressContext);
  if (context === undefined) {
    throw new Error("useVNAddress must be used within a VNAddressProvider");
  }
  return context;
}
