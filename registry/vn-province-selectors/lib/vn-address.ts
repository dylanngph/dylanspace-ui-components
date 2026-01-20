/**
 * Utility functions for Vietnamese address data processing
 */

export interface Province {
  id: number;
  province_code: string;
  name: string;
  short_name: string;
  code: string;
  place_type: string;
  country_code: string;
}

export interface Ward {
  id: number;
  ward_code: string;
  name: string;
  province_code: string;
}

export interface WardMapping {
  id: number;
  old_ward_code: string | null;
  old_ward_name: string | null;
  old_district_name: string | null;
  old_province_name: string | null;
  new_ward_code: string | null;
  new_ward_name: string | null;
  new_province_name: string | null;
  created_at: string | null;
  updated_at: string | null;
}

/**
 * Get unique districts for a province from mappings
 */
export function getDistrictsForProvince(
  mappings: WardMapping[],
  provinceName: string
): string[] {
  const districts = new Set<string>();
  mappings.forEach((mapping) => {
    if (
      mapping.old_province_name === provinceName &&
      mapping.old_district_name
    ) {
      districts.add(mapping.old_district_name);
    }
  });
  return Array.from(districts).sort();
}

/**
 * Get mappings for a specific district
 */
export function getMappingsForDistrict(
  mappings: WardMapping[],
  provinceName: string,
  districtName: string
): WardMapping[] {
  return mappings.filter(
    (mapping) =>
      mapping.old_province_name === provinceName &&
      mapping.old_district_name === districtName
  );
}

/**
 * Get wards for a province
 */
export function getWardsForProvince(
  wards: Ward[],
  provinceCode: string
): Ward[] {
  return wards.filter((ward) => ward.province_code === provinceCode);
}

/**
 * Get old wards for a specific district
 */
export function getOldWardsForDistrict(
  mappings: WardMapping[],
  provinceName: string,
  districtName: string
): Array<{ code: string; name: string }> {
  const wardMap = new Map<string, string>();
  mappings.forEach((mapping) => {
    if (
      mapping.old_province_name === provinceName &&
      mapping.old_district_name === districtName &&
      mapping.old_ward_code &&
      mapping.old_ward_name
    ) {
      wardMap.set(mapping.old_ward_code, mapping.old_ward_name);
    }
  });
  return Array.from(wardMap.entries())
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get unique new wards from mappings for a district
 */
export function getNewWardsFromMappings(
  mappings: WardMapping[]
): Array<{ code: string; name: string }> {
  const wardMap = new Map<string, string>();
  mappings.forEach((mapping) => {
    if (mapping.new_ward_code && mapping.new_ward_name) {
      wardMap.set(mapping.new_ward_code, mapping.new_ward_name);
    }
  });
  return Array.from(wardMap.entries())
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Format address string
 */
export function formatAddress(
  province?: string,
  district?: string,
  ward?: string
): string {
  const parts: string[] = [];
  if (ward) parts.push(ward);
  if (district) parts.push(district);
  if (province) parts.push(province);
  return parts.join(", ") || "";
}
