/**
 * Vietnamese text normalization utilities for search functionality
 */

/**
 * Normalizes Vietnamese text by removing diacritics (accents) using Unicode normalization
 * Converts characters like á, à, ả, ã, ạ, ă, â, đ, etc. to their base forms
 * 
 * Uses Unicode NFD (Normalization Form Decomposed) to separate base characters from diacritical marks,
 * then removes the combining diacritical marks using regex.
 * 
 * @param text - The Vietnamese text to normalize
 * @returns Normalized text without diacritics, converted to lowercase
 * 
 * @example
 * normalizeVietnamese("Hà Nội") // returns "ha noi"
 * normalizeVietnamese("Đà Nẵng") // returns "da nang"
 * normalizeVietnamese("Hồ Chí Minh") // returns "ho chi minh"
 */
export function normalizeVietnamese(text: string): string {
    if (!text) return "";

    return text
        .normalize("NFD") // Decompose characters into base + combining marks
        .replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks (accents)
        .replace(/đ/g, "d") // Replace đ with d
        .replace(/Đ/g, "D") // Replace Đ with D
        .toLowerCase(); // Convert to lowercase for case-insensitive search
}

/**
 * Filter function for Command component that supports Vietnamese text search
 * Works with both accented and non-accented Vietnamese characters
 * 
 * This filter normalizes both the search term and the value/keywords before comparison,
 * allowing users to search Vietnamese text without needing to type accents.
 * 
 * @param value - The value from CommandItem
 * @param search - The search term from user input
 * @param keywords - Optional keywords array from CommandItem
 * @returns 1 if match, 0 if no match
 * 
 * @example
 * // All of these will match "Hà Nội":
 * vietnameseFilter("Hà Nội", "ha noi") // returns 1
 * vietnameseFilter("Hà Nội", "hanoi") // returns 1
 * vietnameseFilter("Hà Nội", "Hà Nội") // returns 1
 */
export function vietnameseFilter(
    value: string,
    search: string,
    keywords?: string[]
): number {
    if (!search) return 1;

    // Normalize both search term and value
    const normalizedSearch = normalizeVietnamese(search);

    const normalizedValue = normalizeVietnamese(value);

    // Combine value with keywords if provided
    const extendedValue = keywords
        ? normalizedValue + " " + keywords.map(normalizeVietnamese).join(" ")
        : normalizedValue;

    // Check if normalized search is included in normalized extended value
    if (extendedValue.includes(normalizedSearch)) {
        return 1;
    }

    return 0;
}
