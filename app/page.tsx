"use client";

import { Button } from "@/components/ui/button";
import {
  VNAddressSelector,
  VNAddressProvider,
  VNAddressSystemToggle,
  VNAddressProvinceSelector,
  VNAddressDistrictSelector,
  VNAddressWardSelector,
  useVNAddress,
} from "@/registry/vn-province-selectors/components/vn-address-selector";

const INSTALL_CMD =
  "npx shadcn@latest add https://ui.dylanspace.com/r/vn-province-selectors.json";

function Hero() {
  return (
    <section className="rounded-2xl border bg-linear-to-br from-background via-background to-muted/40 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Ready for shadcn registry
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Vietnamese Address Selector
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
              Cascading comboboxes with old/new system toggle. Drop-in ready for shadcn installs, hardcoded data, and flexible composition.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="px-5"
            >
              <a href="https://ui.dylanspace.com/r/vn-province-selectors.json">
                View registry manifest
              </a>
            </Button>
            <Button variant="outline" className="px-5" onClick={() => navigator.clipboard.writeText(INSTALL_CMD)}>
              Copy install command
            </Button>
          </div>
        </div>
        <div className="w-full max-w-xl rounded-xl border bg-card p-4 text-sm font-mono text-muted-foreground shadow-inner">
          <div className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
            Install via shadcn
          </div>
          <div className="rounded-md bg-muted px-3 py-2 text-foreground">
            <code className="break-all">{INSTALL_CMD}</code>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border p-4 sm:p-5 bg-card shadow-sm">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function Features() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Why this selector</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          title="Drop-in install"
          description="Ready for shadcn registry with correct targets and hardcoded data. One command to add everything."
        />
        <FeatureCard
          title="Composable building blocks"
          description="System toggle, province, district, and ward selectors, plus a provider and all-in-one wrapper."
        />
        <FeatureCard
          title="Old ↔ New systems"
          description="Switch between legacy districts and 2025 wards. Data sourced from bundled JSON assets."
        />
      </div>
    </section>
  );
}

function DemoAllInOne() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold">Interactive demo</h2>
          <p className="text-muted-foreground text-sm">
            All-in-one component with callbacks
          </p>
        </div>
      </div>
      <div className="rounded-xl border p-4 sm:p-6 bg-card shadow-sm">
        <VNAddressSelector
          onSelectionChange={(selection) => {
            console.log("Selection:", selection);
          }}
        />
      </div>
    </section>
  );
}

function DemoComposed() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-xl font-semibold">Compose your own</h2>
        <p className="text-muted-foreground text-sm">
          Use the provider and individual selectors in any layout.
        </p>
      </div>
      <div className="rounded-xl border p-4 sm:p-6 bg-card shadow-sm">
        <VNAddressProvider>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VNAddressSystemToggle />
            <VNAddressProvinceSelector />
            <VNAddressDistrictSelector />
            <VNAddressWardSelector />
          </div>
        </VNAddressProvider>
      </div>
    </section>
  );
}

function DemoHook() {
  const { selection } = useVNAddress();

  return (
    <div className="space-y-4">
      <VNAddressSystemToggle />
      <VNAddressProvinceSelector />
      <VNAddressDistrictSelector />
      <VNAddressWardSelector />

      {selection.province && (
        <div className="mt-4 rounded-lg border bg-muted/50 p-4">
          <h3 className="font-semibold mb-2">Selected Address</h3>
          <p className="text-sm text-muted-foreground">
            {selection.ward?.name && `${selection.ward.name}, `}
            {selection.district && `${selection.district}, `}
            {selection.province.name}
          </p>
        </div>
      )}
    </div>
  );
}

function DemoHookContainer() {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-xl font-semibold">Use the hook</h2>
        <p className="text-muted-foreground text-sm">
          Access selection state directly from context.
        </p>
      </div>
      <div className="rounded-xl border p-4 sm:p-6 bg-card shadow-sm">
        <VNAddressProvider>
          <DemoHook />
        </VNAddressProvider>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-10">
      <div className="space-y-10 lg:space-y-14">
        <Hero />
        <Features />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          <DemoAllInOne />
          <DemoComposed />
        </div>
        <DemoHookContainer />
      </div>
    </main>
  );
}
