<script lang="ts">
  import type { PageProps } from "./$types";
  import ProductCard from "$lib/components/store/ProductCard.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "$lib/components/ui/drawer/index.js";
  import {
    ToggleGroup,
    ToggleGroupItem,
  } from "$lib/components/ui/toggle-group/index.js";
  import {
    Search,
    SlidersHorizontal,
    Grid3X3,
    List,
    X,
    Copy,
    Download,
    RotateCcw,
    Sparkles,
  } from "@lucide/svelte";
  import { goto } from "$app/navigation";
  import { toast } from "svelte-sonner";
  import FilterSidebar from "$lib/components/store/FilterSidebar.svelte";
  import { cn } from "$lib/utils.js";

  import { untrack } from "svelte";

  let { data }: PageProps = $props();

  // Initialize state with untrack to avoid reactivity warnings
  let searchQuery = $state(untrack(() => data.searchQuery || ""));
  let sortBy = $state(untrack(() => data.filters?.sort || "newest"));
  let viewMode = $state<"grid" | "list">("grid");
  let filterOpen = $state(false);

  // Expanded Filter State
  let selectedCategory = $state(untrack(() => data.filters?.categoryId || ""));
  let selectedTag = $state("");
  let selectedBrand = $state("");
  let priceRange = $state(
    untrack(() => [
      data.filters?.minPrice || 0,
      data.filters?.maxPrice || 100000,
    ]),
  );
  let rating = $state("0-5");
  let expressDelivery = $state(false);
  let discountRange = $state("0-100");

  // Sync prop changes (e.g. from navigation) back to local state
  $effect(() => {
    searchQuery = data.searchQuery || "";
    sortBy = data.filters?.sort || "newest";
    selectedCategory = data.filters?.categoryId || "";
    priceRange = [
      data.filters?.minPrice || 0,
      data.filters?.maxPrice || 100000,
    ];
  });

  let isDesktop = $state(false);

  $effect(() => {
    const mql = window.matchMedia("(min-width: 1280px)");
    isDesktop = mql.matches;
    const handler = (e: MediaQueryListEvent) => (isDesktop = e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  });

  const products = $derived(data.products || []);
  const categories = $derived(data.categories || []);

  const updateFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy !== "newest") params.set("sort", sortBy);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedTag) params.set("tag", selectedTag);
    if (selectedBrand) params.set("brand", selectedBrand);
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 100000)
      params.set("maxPrice", priceRange[1].toString());
    if (rating !== "0-5") params.set("rating", rating);
    if (expressDelivery) params.set("express", "true");
    if (discountRange !== "0-100") params.set("discount", discountRange);

    const url = `/products?${params.toString()}`;
    if (window.location.search !== `?${params.toString()}`) {
      goto(url, {
        replaceState: true,
        keepFocus: true,
        noScroll: true,
      });
    }
  };

  // Reactively update URL when filters change
  $effect(() => {
    // Track dependencies
    const s = sortBy;
    const cat = selectedCategory;
    const tag = selectedTag;
    const br = selectedBrand;
    const p = priceRange;
    const r = rating;
    const e = expressDelivery;
    const d = discountRange;

    updateFilters();
  });

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();
    updateFilters();
  };

  const clearFilters = () => {
    selectedCategory = "";
    selectedTag = "";
    selectedBrand = "";
    priceRange = [0, 100000];
    rating = "0-5";
    expressDelivery = false;
    discountRange = "0-100";
    sortBy = "newest";
    searchQuery = "";
  };

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Catalog link copied", {
      description: "Current selection has been copied to clipboard.",
    });
  };

  const handleDownload = () => {
    toast.info("Preparing download...", {
      description: "Generating catalog data export.",
    });
  };

  import SelectComponent from "$lib/components/ui/select/select-component.svelte";

  const sortOptions = [
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  // Listen for filter open from layout (mobile only)
  $effect(() => {
    const handleOpenFilters = () => {
      if (!isDesktop) filterOpen = true;
    };
    window.addEventListener("open-filters", handleOpenFilters);
    return () => window.removeEventListener("open-filters", handleOpenFilters);
  });
</script>

<div class="bg-muted/30 min-h-screen">
  <div class="container mx-auto max-w-[1440px] px-4 py-8 lg:px-6">
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]">
      <!-- Desktop Sidebar -->
      {#if isDesktop}
        <div class="space-y-6">
          <FilterSidebar
            class="sticky top-24 h-fit rounded-xl border border-border bg-card p-6 shadow-sm"
            {categories}
            bind:selectedCategory
            bind:selectedTag
            bind:selectedBrand
            bind:priceRange
            bind:rating
            bind:expressDelivery
            bind:discountRange
            onClear={clearFilters}
          />
        </div>
      {/if}

      <main class="flex flex-col gap-6">
        <!-- Products Header & Toolbar -->
        <div
          class="sticky top-20 z-30 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg overflow-hidden"
        >
          <!-- Desktop Toolbar Header (Hidden on Mobile) -->
          <div
            class="hidden lg:flex items-center justify-between border-b border-border p-4 px-6 bg-muted/5"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm text-primary-foreground"
              >
                <Sparkles class="h-5 w-5" />
              </div>
              <div>
                <h1 class="text-lg font-bold text-foreground leading-none">
                  Products
                </h1>
                <p
                  class="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1"
                >
                  {data.meta?.total || 0} ITEMS FOUND
                </p>
              </div>
            </div>

            <div class="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                class="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                onclick={handleCopy}
                title="Copy Link"
              >
                <Copy class="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                onclick={clearFilters}
                title="Reset Filters"
              >
                <RotateCcw class="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                onclick={handleDownload}
                title="Export Products"
              >
                <Download class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Toolbar Line 1 (Mobile Only): Count and Sort -->
          <div
            class="flex lg:hidden items-center justify-between gap-3 p-3 pb-0 border-b border-white/5"
          >
            <div
              class="h-10 flex items-center px-4 rounded-xl bg-primary/10 border border-primary/20"
            >
              <span
                class="text-[10px] font-black text-primary uppercase tracking-widest whitespace-nowrap"
              >
                {data.meta?.total || 0} ITEMS
              </span>
            </div>
            <SelectComponent
              name="sort-mobile"
              placeholder="Sort By"
              options={sortOptions}
              bind:value={sortBy}
              class="h-10 flex-1 min-w-0 rounded-xl border-none bg-muted/50 font-bold text-[10px] uppercase tracking-widest px-4"
            />
          </div>

          <!-- Toolbar Line 2: Search & View Toggle -->
          <div class="flex items-center gap-3 p-3 sm:p-4">
            <div class="relative flex-1 group">
              <Search
                class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                oninput={(e) => (searchQuery = e.currentTarget.value)}
                class="h-11 pl-10 bg-muted/30 border-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-xl text-sm font-medium transition-all"
              />
            </div>

            <div
              class="flex items-center p-1 rounded-xl bg-muted/50 border border-border"
            >
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(v) => v && (viewMode = v as any)}
                class="gap-1"
              >
                <ToggleGroupItem
                  value="grid"
                  aria-label="Grid view"
                  class="rounded-lg h-8 w-8 p-0 data-[state=on]:bg-background data-[state=on]:shadow-sm"
                >
                  <Grid3X3 class="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="list"
                  aria-label="List view"
                  class="rounded-lg h-8 w-8 p-0 data-[state=on]:bg-background data-[state=on]:shadow-sm"
                >
                  <List class="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <!-- Desktop Specific Sort -->
            <SelectComponent
              name="sort"
              placeholder="Sort By"
              options={sortOptions}
              bind:value={sortBy}
              class="hidden lg:flex h-11 min-w-[200px] rounded-xl border-none bg-muted/50 font-bold text-xs uppercase tracking-widest px-4"
            />
          </div>
        </div>

        <!-- Products List -->
        {#if products.length > 0}
          <div
            class={cn(
              "grid gap-4 md:gap-6 pb-20",
              viewMode === "grid"
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
            )}
          >
            {#each products as product, i}
              <ProductCard
                {product}
                {viewMode}
                dealLabel={product.isFeatured ? "Hot" : undefined}
                showOfficialBadge={i % 4 === 0}
                showExpressBadge={i % 3 === 0}
              />
            {/each}
          </div>

          <!-- Pagination -->
          {#if data.meta?.hasMore}
            <div class="pb-20 flex justify-center">
              <Button
                variant="outline"
                class="rounded-xl px-8 h-12 font-bold shadow-sm"
              >
                Load More Products
              </Button>
            </div>
          {/if}
        {:else}
          <div
            class="rounded-2xl border border-dashed border-border py-32 text-center bg-card shadow-sm"
          >
            <div
              class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 text-muted-foreground"
            >
              <Search class="h-10 w-10" />
            </div>
            <h3 class="mt-6 text-2xl font-bold text-foreground">
              No results found
            </h3>
            <p class="mt-3 text-muted-foreground max-w-xs mx-auto">
              We couldn't find any products matching your current filters. Try
              resetting or adjusting them.
            </p>
            <Button
              class="mt-8 px-8 rounded-xl font-bold shadow-lg shadow-primary/20"
              onclick={clearFilters}
            >
              Reset All Filters
            </Button>
          </div>
        {/if}
      </main>
    </div>
  </div>
</div>

<!-- Mobile Filter Drawer -->
{#if !isDesktop}
  <Drawer bind:open={filterOpen}>
    <DrawerContent>
      <div class="mx-auto w-full max-w-lg px-6 pb-12 pt-4">
        <DrawerHeader class="px-0">
          <DrawerTitle class="text-2xl font-bold">Filter Products</DrawerTitle>
          <DrawerDescription>Refine your search results.</DrawerDescription>
        </DrawerHeader>

        <div class="mt-6 h-[60vh] overflow-y-auto pr-2">
          <FilterSidebar
            {categories}
            bind:selectedCategory
            bind:selectedTag
            bind:selectedBrand
            bind:priceRange
            bind:rating
            bind:expressDelivery
            bind:discountRange
            onClear={clearFilters}
          />
        </div>

        <DrawerFooter
          class="mt-8 flex-row gap-3 px-0 border-t border-border pt-6"
        >
          <Button
            variant="ghost"
            class="flex-1 font-bold h-12 rounded-xl"
            onclick={clearFilters}>Reset</Button
          >
          <Button
            class="flex-1 font-bold h-12 rounded-xl shadow-lg shadow-primary/20"
            onclick={() => (filterOpen = false)}>Apply Results</Button
          >
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
{/if}
