# DylanSpace UI Components

A collection of high-quality, accessible UI components built with React, TypeScript, and shadcn/ui. Components are designed to be composable, customizable, and ready for production use.

## Overview

This repository hosts a curated set of UI components that extend the shadcn/ui ecosystem. All components follow shadcn's design principles:

- 🎨 **Copy and paste** - Components are yours to own and modify
- 🧩 **Composable** - Built with composition in mind
- ♿ **Accessible** - Built on Radix UI primitives
- 🎯 **Type-safe** - Full TypeScript support
- 🎨 **Customizable** - Styled with Tailwind CSS

## Installation

### Prerequisites

- React 18+ or Next.js 13+ (App Router)
- Tailwind CSS configured
- shadcn/ui base components installed

### Installing Components

Components can be installed via the shadcn CLI using their registry URLs:

```bash
# Install a component
npx shadcn@latest add https://ui.dylanspace.com/r/[component-name].json
```

Each component has its own registry manifest that includes all necessary files, dependencies, and instructions.

## Available Components

### [Vietnamese Address Selector](./docs/vn-address-selector.md)

A modular, composable component for selecting Vietnamese addresses with cascading combobox selectors and system toggle (old vs new administrative systems).

**Install:**
```bash
npx shadcn@latest add https://ui.dylanspace.com/r/vn-province-selectors.json
```

**Features:**
- System toggle between old (with districts) and new (2025, wards only) systems
- Searchable comboboxes for all selectors
- Cascading selection logic
- React Context for flexible composition
- Fully customizable labels and behavior

[View full documentation →](./docs/vn-address-selector.md)

---

_More components coming soon!_

## Project Structure

```
ui-components/
├── app/                    # Next.js app directory (demo site)
├── components/
│   └── ui/                 # Base shadcn/ui components
├── registry/
│   ├── components/         # Component source files
│   ├── lib/                # Shared utilities and types
│   └── assets/             # Static assets (JSON data, etc.)
├── public/
│   └── r/                  # Registry manifests (JSON files)
├── registry.json           # Main registry index
└── components.json         # shadcn/ui configuration
```

## Development

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-org/ui-components.git
cd ui-components
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Build the registry:
```bash
pnpm registry:build
```

### Adding a New Component

1. Create component files in `registry/components/`
2. Add shared utilities to `registry/lib/` if needed
3. Add assets to `registry/assets/` if required
4. Create a registry manifest in `public/r/[component-name].json`
5. Add the component entry to `registry.json`
6. Create component-specific documentation in `docs/[component-name].md`
7. Update this README with the new component

### Component Structure

Each component should follow this structure:

```
registry/
├── components/
│   └── [component-name]/
│       ├── [component-name].tsx        # Main component
│       ├── [component-name]-provider.tsx # Context provider (if needed)
│       └── [component-name]-[sub].tsx  # Sub-components
├── lib/
│   └── [component-name].ts             # Utilities and types
└── assets/
    └── [component-name]-data.json      # Static data (if needed)
```

### Registry Manifest

Each component needs a registry manifest JSON file in `public/r/` that follows the shadcn registry schema:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "component-name",
  "type": "registry:ui",
  "title": "Component Title",
  "description": "Component description",
  "registryDependencies": ["button", "input"],
  "dependencies": ["@radix-ui/react-dialog"],
  "files": [
    {
      "path": "registry/components/component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

## Documentation

- **General documentation**: This README
- **Component-specific docs**: See `docs/` directory
  - [Vietnamese Address Selector](./docs/vn-address-selector.md)

## Requirements

- **React**: 18+
- **Next.js**: 13+ (App Router) or React with proper path aliases
- **TypeScript**: 5+
- **Tailwind CSS**: 4+
- **shadcn/ui**: Base components installed

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component system

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Follow the existing component structure and patterns
2. Ensure all components are accessible and type-safe
3. Include comprehensive documentation
4. Add examples and demos in the app directory
5. Update the registry manifest and this README

## License

MIT

## Links

- **Homepage**: [https://ui.dylanspace.com](https://ui.dylanspace.com)
- **Registry**: [https://ui.dylanspace.com/r/registry.json](https://ui.dylanspace.com/r/registry.json)
