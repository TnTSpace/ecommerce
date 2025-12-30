<script lang="ts">
  import type { PageProps } from "./$types";
  import ProductCard from "$lib/components/store/ProductCard.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Slider } from "$lib/components/ui/slider/index.js";
  import { Search, SlidersHorizontal, Grid3X3, List, X } from "@lucide/svelte";

  let { data }: PageProps = $props();

  let searchQuery = $state("");
  $effect(() => {
    if (data.searchQuery !== undefined) {
      searchQuery = data.searchQuery || "";
    }
  });
  let sortBy = $state("newest");
  let viewMode = $state<"grid" | "list">("grid");
  let filterOpen = $state(false);
  let selectedCategories = $state<string[]>([]);
  let priceRange = $state([0, 100000]);

  const products = $derived(data.products || []);
  const categories = $derived(data.categories || []);

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    window.location.href = `/products?${params.toString()}`;
  };

  const clearFilters = () => {
    selectedCategories = [];
    priceRange = [0, 100000];
    sortBy = "newest";
  };
</script>

<div class="container mx-auto max-w-7xl px-4 py-6">
  <!-- Page Header -->
  <div
    class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <h1 class="text-2xl font-bold text-foreground">Products</h1>
      <p class="text-sm text-muted-foreground">
        {#if data.searchQuery}
          Results for "{data.searchQuery}" ({data.meta?.total || 0} products)
        {:else}
          Browse our collection ({data.meta?.total || 0} products)
        {/if}
      </p>
    </div>

    <!-- Search Form -->
    <form onsubmit={handleSearch} class="relative w-full sm:max-w-xs">
      <Search
        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        oninput={(e) => (searchQuery = e.currentTarget.value)}
        class="pl-10"
      />
    </form>
  </div>

  <!-- Filter Bar -->
  <div class="mb-6 flex flex-wrap items-center gap-3">
    <!-- Sort Buttons (Mobile Style) -->
    <div class="flex flex-1 gap-2 overflow-x-auto pb-2 sm:pb-0">
      {#each ["Express", "Flash sale", "Up to 50%", "4+ Rating"] as filter}
        <Button variant="outline" size="sm" class="shrink-0">
          {filter}
        </Button>
      {/each}
    </div>

    <!-- View Toggle & Sort -->
    <div class="hidden items-center gap-2 sm:flex">
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="icon"
        onclick={() => (viewMode = "grid")}
      >
        <Grid3X3 class="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="icon"
        onclick={() => (viewMode = "list")}
      >
        <List class="h-4 w-4" />
      </Button>
    </div>

    <!-- Filter Sheet -->
    <Sheet.Root bind:open={filterOpen}>
      <Sheet.Trigger>
        <Button variant="outline">
          <SlidersHorizontal class="mr-2 h-4 w-4" />
          Filters
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="right" class="w-80">
        <Sheet.Header>
          <Sheet.Title>Filters</Sheet.Title>
        </Sheet.Header>
        <div class="mt-6 space-y-6">
          <!-- Categories -->
          <div>
            <h4 class="mb-3 font-medium text-foreground">Categories</h4>
            <div class="space-y-2">
              {#each categories as category}
                <div class="flex items-center gap-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        selectedCategories = [
                          ...selectedCategories,
                          category.id,
                        ];
                      } else {
                        selectedCategories = selectedCategories.filter(
                          (id) => id !== category.id,
                        );
                      }
                    }}
                  />
                  <Label for={category.id} class="text-sm">
                    {category.name}
                  </Label>
                </div>
              {/each}
            </div>
          </div>

          <!-- Price Range -->
          <div>
            <h4 class="mb-3 font-medium text-foreground">Price Range</h4>
            <div class="space-y-4">
              <Slider
                type="multiple"
                bind:value={priceRange}
                max={100000}
                step={1000}
              />
              <div class="flex items-center gap-2 text-sm">
                <span>₦{priceRange[0].toLocaleString()}</span>
                <span class="text-muted-foreground">-</span>
                <span>₦{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <Button variant="outline" class="flex-1" onclick={clearFilters}>
              Clear
            </Button>
            <Button class="flex-1" onclick={() => (filterOpen = false)}>
              Apply
            </Button>
          </div>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  </div>

  <!-- Products Grid -->
  {#if products.length > 0}
    <div
      class={viewMode === "grid"
        ? "grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        : "space-y-4"}
    >
      {#each products as product, i}
        <ProductCard
          {product}
          dealLabel={product.isFeatured ? "Deal of the Week" : undefined}
          showOfficialBadge={i % 3 === 0}
          showExpressBadge={i % 2 === 0}
        />
      {/each}
    </div>

    <!-- Load More / Pagination -->
    {#if data.meta?.hasMore}
      <div class="mt-8 flex justify-center">
        <Button variant="outline" size="lg">Load More Products</Button>
      </div>
    {/if}
  {:else}
    <div class="py-12 text-center">
      <p class="text-lg text-muted-foreground">No products found</p>
      {#if data.searchQuery}
        <p class="mt-2 text-sm text-muted-foreground">
          Try searching for something else
        </p>
      {/if}
      <Button class="mt-4" href="/products">View All Products</Button>
    </div>
  {/if}
</div>

<!-- Mobile Sorting/Filters Bar -->
<div
  class="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-card p-2 lg:hidden"
>
  <Button variant="ghost" class="flex-1" onclick={() => {}}>
    <SlidersHorizontal class="mr-2 h-4 w-4" />
    Sorting
  </Button>
  <Button variant="ghost" class="flex-1" onclick={() => (filterOpen = true)}>
    <SlidersHorizontal class="mr-2 h-4 w-4" />
    Filters
  </Button>
</div>
