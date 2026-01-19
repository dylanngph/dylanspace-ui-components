# Vietnamese Address Selector

A modular, composable shadcn/ui-style component for selecting Vietnamese addresses with cascading combobox selectors and system toggle (old vs new). Built with React Context for flexible composition, similar to shadcn's sidebar pattern.

## Installation

### Via shadcn CLI

```bash
npx shadcn@latest add https://ui.dylanspace.com/r/vn-province-selectors.json
```

### Manual Installation

1. Copy all component files to your project:
   ```bash
   cp registry/components/vn-address-*.tsx components/ui/
   cp registry/lib/vn-address.ts lib/
   cp registry/assets/*.json public/data/  # or your preferred location
   ```

2. Install dependencies:
   ```bash
   npm install @radix-ui/react-radio-group @radix-ui/react-popover cmdk lucide-react
   ```

3. Update import paths in the component files to match your project structure.

## Features

- 🔄 **System Toggle**: Radio group to switch between old system (with districts) and new system (2025, wards only)
- 🔍 **Searchable Comboboxes**: All selectors support search functionality
- 🧩 **Modular Components**: Composable components that can be used independently
- 🗺️ **Cascading Selection**: 
  - Old System: Province → District → Ward
  - New System: Province → Ward
- 📦 **React Context**: Shared state management via `VNAddressProvider`
- 🎨 **Fully Customizable**: Dynamic props for all labels and behavior

## Component Structure

The component is split into modular, composable pieces:

- **`VNAddressProvider`** - Context provider that manages all state
- **`VNAddressSystemToggle`** - Radio group for system selection
- **`VNAddressProvinceSelector`** - Combobox for province selection
- **`VNAddressDistrictSelector`** - Combobox for district selection (old system only)
- **`VNAddressWardSelector`** - Combobox for ward selection
- **`VNAddressSelector`** - All-in-one wrapper component (for convenience)
- **`useVNAddress`** - Hook to access context state

## Usage

### All-in-One Component (Simplest)

```tsx
import { VNAddressSelector } from "@/components/ui/vn-address-selector";

export default function AddressForm() {
  return (
    <VNAddressSelector
      onSelectionChange={(selection) => {
        console.log("System:", selection.system);
        console.log("Province:", selection.province?.name);
        console.log("District:", selection.district);
        console.log("Ward:", selection.ward);
      }}
    />
  );
}
```

### Composition Pattern (Like shadcn Sidebar)

```tsx
import {
  VNAddressProvider,
  VNAddressSystemToggle,
  VNAddressProvinceSelector,
  VNAddressDistrictSelector,
  VNAddressWardSelector,
} from "@/components/ui/vn-address-selector";

export default function AddressForm() {
  return (
    <VNAddressProvider
      onSelectionChange={(selection) => {
        console.log(selection);
      }}
    >
      <div className="space-y-6">
        <VNAddressSystemToggle />
        <VNAddressProvinceSelector />
        <VNAddressDistrictSelector />
        <VNAddressWardSelector />
      </div>
    </VNAddressProvider>
  );
}
```

### Custom Layout

```tsx
import {
  VNAddressProvider,
  VNAddressSystemToggle,
  VNAddressProvinceSelector,
  VNAddressDistrictSelector,
  VNAddressWardSelector,
} from "@/components/ui/vn-address-selector";

export default function CustomLayout() {
  return (
    <VNAddressProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VNAddressSystemToggle />
        <VNAddressProvinceSelector />
        <VNAddressDistrictSelector />
        <VNAddressWardSelector />
      </div>
    </VNAddressProvider>
  );
}
```

### Using the Hook

```tsx
import {
  VNAddressProvider,
  useVNAddress,
  VNAddressProvinceSelector,
  VNAddressWardSelector,
} from "@/components/ui/vn-address-selector";

function AddressDisplay() {
  const { selection } = useVNAddress();
  
  return (
    <div>
      <VNAddressProvinceSelector />
      <VNAddressWardSelector />
      
      {selection.province && (
        <div>
          Selected: {selection.province.name}
          {selection.district && `, ${selection.district}`}
          {selection.ward && `, ${selection.ward.name}`}
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <VNAddressProvider>
      <AddressDisplay />
    </VNAddressProvider>
  );
}
```

## Component Props

### VNAddressProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelectionChange` | `function` | - | Callback when selection changes |
| `defaultSystem` | `"old" \| "new"` | `"new"` | Initial system selection |
| `defaultProvinceCode` | `string` | - | Initial province code |
| `defaultDistrict` | `string` | - | Initial district name |
| `defaultWardCode` | `string` | - | Initial ward code |
| `children` | `ReactNode` | - | Child components |

### VNAddressSystemToggle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Hệ thống"` | Label text |
| `showLabel` | `boolean` | `true` | Show label |
| `className` | `string` | - | Custom className |

### VNAddressProvinceSelector

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Tỉnh/Thành phố"` | Label text |
| `showLabel` | `boolean` | `true` | Show label |
| `className` | `string` | - | Custom className |
| `placeholder` | `string` | - | Placeholder text |

### VNAddressDistrictSelector

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Quận/Huyện"` | Label text |
| `showLabel` | `boolean` | `true` | Show label |
| `className` | `string` | - | Custom className |
| `placeholder` | `string` | - | Placeholder text |

**Note**: Only renders when old system is selected and province is chosen.

### VNAddressWardSelector

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Phường/Xã"` | Label text |
| `showLabel` | `boolean` | `true` | Show label |
| `className` | `string` | - | Custom className |
| `placeholder` | `string` | - | Placeholder text |

### VNAddressSelector (All-in-One)

All props from `VNAddressProvider` plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `systemLabel` | `string` | `"Hệ thống"` | System toggle label |
| `provinceLabel` | `string` | `"Tỉnh/Thành phố"` | Province label |
| `districtLabel` | `string` | `"Quận/Huyện"` | District label |
| `wardLabel` | `string` | `"Phường/Xã"` | Ward label |
| `showLabels` | `boolean` | `true` | Show all labels |
| `children` | `ReactNode` | - | Custom children (uses composition) |

## useVNAddress Hook

Access the context state and methods:

```tsx
const {
  system,                    // "old" | "new"
  selectedProvinceCode,       // string | null
  selectedDistrict,           // string | null
  selectedWardCode,           // string | null
  selectedProvince,           // Province | null
  availableDistricts,         // string[]
  oldWardsForDistrict,        // Array<{ code, name }>
  newWardsForProvince,        // Ward[]
  selectedWard,               // Ward | { code, name } | null
  districtMappings,           // WardMapping[]
  selection,                  // Complete selection object
  setSystem,                  // (system) => void
  setSelectedProvinceCode,    // (code) => void
  setSelectedDistrict,        // (district) => void
  setSelectedWardCode,        // (code) => void
} = useVNAddress();
```

## Selection Object

The `onSelectionChange` callback receives:

```typescript
{
  system: "old" | "new";
  province: Province | null;
  district: string | null; // old system only
  ward: Ward | { code: string; name: string } | null;
  mappings?: WardMapping[]; // old system only
}
```

## System Modes

### Old System (Hệ thống cũ)
- **Flow**: Province → District → Ward
- Shows districts from the old administrative system
- Shows old wards for selected district
- Provides mappings data in callback

### New System (Hệ thống mới - 2025)
- **Flow**: Province → Ward
- Uses the new 2025 administrative system
- No districts, only provinces and wards
- Direct ward selection

## Data Structure

All data is hardcoded in the components and loaded from the `registry/` folder:
- `registry/lib/vn-address.ts` - Utility functions and type definitions
- `registry/assets/provinces.json` - All provinces
- `registry/assets/wards.json` - All wards (new system)
- `registry/assets/ward_mappings.json` - Mappings between old and new systems

## Type Definitions

```typescript
interface Province {
  id: number;
  province_code: string;
  name: string;
  short_name: string;
  code: string;
  place_type: string;
  country_code: string;
}

interface Ward {
  id: number;
  ward_code: string;
  name: string;
  province_code: string;
}

interface WardMapping {
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
```

## Requirements

- React 18+
- Next.js 13+ (App Router) or React with proper path aliases
- shadcn/ui components: `radio-group`, `popover`, `command`, `button`, `label`
- Tailwind CSS

## Examples

See the [demo page](https://ui.dylanspace.com) for interactive examples and usage patterns.
