<script lang="ts">
  import type { PageProps } from "./$types";
  import { ProductCard } from "$lib/components/store/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { cart } from "$lib/store/cart.svelte";
  import {
    ArrowRight,
    Sparkles,
    Truck,
    ShieldCheck,
    Clock,
    Store as StoreIcon,
    ChevronRight,
    History,
    Package,
  } from "@lucide/svelte";
  import { navigating } from "$app/stores";
  import { onMount, untrack } from "svelte";
  import { MAX_ITEMS_PER_PAGE } from "$lib/constants";
  import { Loader2 } from "@lucide/svelte";

  let { data }: PageProps = $props();

  const featuredProducts = $derived(data.featuredProducts || []);
  const categories = $derived(data.categories || []);
  const recentlyViewed = $derived(cart.recentlyViewed);

  // New Arrivals Infinite Scroll State
  let allNewArrivals = $state(untrack(() => data.newArrivals || []));
  let currentPage = $state(untrack(() => data.newArrivalsMeta?.page || 1));
  let totalPages = $state(untrack(() => data.newArrivalsMeta?.totalPages || 1));
  let isLoadingMore = $state(false);
  let observerTarget = $state<HTMLElement | null>(null);

  const loadMore = async () => {
    if (isLoadingMore || currentPage >= totalPages) return;

    isLoadingMore = true;
    try {
      const params = new URLSearchParams();
      params.set("page", (currentPage + 1).toString());
      params.set("limit", MAX_ITEMS_PER_PAGE.toString());
      params.set("sort", "newest"); // Force newest for Arrivals

      const res = await fetch(`/api/all-products?${params.toString()}`);
      const result = await res.json();

      if (result.success && result.data) {
        allNewArrivals = [...allNewArrivals, ...result.data];
        currentPage = result.meta.page;
        totalPages = result.meta.totalPages;
      }
    } catch (e) {
      console.error("Failed to load more new arrivals:", e);
    } finally {
      isLoadingMore = false;
    }
  };

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget) observer.observe(observerTarget);

    return () => {
      if (observerTarget) observer.unobserve(observerTarget);
    };
  });
</script>

<div class="space-y-8 pb-8">
  <!-- Modern Store Hero Section -->
  <section class="relative overflow-hidden bg-background pt-8">
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#ff80b5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      ></div>
    </div>

    <div class="center mx-auto px-2">
      <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div
          class="max-w-2xl space-y-8 animate-in slide-in-from-left-10 duration-700"
        >
          <Badge
            variant="outline"
            class="border-primary/20 bg-primary/5 text-primary px-4 py-1.5 rounded-full font-bold"
          >
            <Sparkles class="mr-2 h-3.5 w-3.5" />
            Summer Collection 2026
          </Badge>
          <h1
            class="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
          >
            Shop the Best <span
              class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              >Tools & Electronics</span
            >
          </h1>
          <p class="text-xl text-muted-foreground leading-relaxed">
            Experience premium shopping with our curated collection of
            high-performance products designed for modern life.
          </p>
          <div class="flex flex-wrap gap-4">
            <Button
              href="/products"
              class="rounded-xl px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              Shop Now
              <ArrowRight class="ml-2 h-5 w-5" />
            </Button>
            <Button
              href="/categories"
              variant="outline"
              class="rounded-xl px-8 font-bold backdrop-blur-sm transition-all hover:bg-accent"
            >
              Browse Categories
            </Button>
          </div>
        </div>

        <div
          class="relative lg:ml-auto animate-in fade-in zoom-in duration-1000"
        >
          <div
            class="relative aspect-square w-full max-w-[500px] mx-auto lg:max-w-none"
          >
            <!-- Decorative circle -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse"
            ></div>
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"
              alt="Featured Sneaker"
              class="relative z-10 h-full w-full object-contain drop-shadow-lg transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Icons -->
  <section class="center mx-auto px-2">
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-xl border border-border bg-card p-8 shadow-sm"
    >
      <div class="flex flex-col items-center text-center space-y-2">
        <div
          class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
        >
          <Truck class="h-6 w-6" />
        </div>
        <h3 class="font-bold text-sm">Free Shipping</h3>
        <p class="text-xs text-muted-foreground">On all orders over ₦50,000</p>
      </div>
      <div class="flex flex-col items-center text-center space-y-2">
        <div
          class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
        >
          <ShieldCheck class="h-6 w-6" />
        </div>
        <h3 class="font-bold text-sm">Secure Payment</h3>
        <p class="text-xs text-muted-foreground">100% secure checkout</p>
      </div>
      <div class="flex flex-col items-center text-center space-y-2">
        <div
          class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
        >
          <Clock class="h-6 w-6" />
        </div>
        <h3 class="font-bold text-sm">Fast Delivery</h3>
        <p class="text-xs text-muted-foreground">Delivery within 24-48 hours</p>
      </div>
      <div class="flex flex-col items-center text-center space-y-2">
        <div
          class="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
        >
          <StoreIcon class="h-6 w-6" />
        </div>
        <h3 class="font-bold text-sm">Official Store</h3>
        <p class="text-xs text-muted-foreground">Genuine certified products</p>
      </div>
    </div>
  </section>

  <!-- Categories Highlights -->
  <section class="center mx-auto px-2">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-bold">
          Featured <span class="text-primary">Categories</span>
        </h2>
        <p class="text-muted-foreground mt-1">
          Explore our most popular departments
        </p>
      </div>
      <Button href="/categories" variant="ghost" size="sm" class="font-bold">
        View All <ChevronRight class="ml-1 h-4 w-4" />
      </Button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      {#each categories as category}
        <a href="/products?category={category.id}" class="group space-y-1">
          <div
            class="relative aspect-square overflow-hidden rounded-xl bg-muted border border-border group-hover:border-primary transition-all flex items-center justify-center"
          >
            {#if category.imageFile?.url}
              <img
                src={category.imageFile.url}
                alt={category.name}
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            {:else}
              <div
                class="flex flex-col items-center gap-2 text-muted-foreground/40 group-hover:text-primary/40 transition-colors"
              >
                <Package class="h-12 w-12" />
              </div>
            {/if}
          </div>
          <p
            class="text-center font-bold text-sm group-hover:text-primary transition-colors"
          >
            {category.name}
          </p>
        </a>
      {/each}
    </div>
  </section>

  <!-- Personalization: Recently Viewed -->
  {#if recentlyViewed.length > 0}
    <section class="bg-muted/30 py-16">
      <div class="center mx-auto px-2">
        <div class="flex items-center gap-3 mb-8">
          <div
            class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
          >
            <History class="h-5 w-5" />
          </div>
          <div>
            <h2 class="text-2xl font-bold">
              Recently <span class="text-primary">Viewed</span>
            </h2>
            <p class="text-xs text-muted-foreground">
              Pick up where you left off
            </p>
          </div>
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2"
        >
          {#if $navigating}
            {#each Array(recentlyViewed.slice(0, 6).length || 6) as _}
              <ProductCard.Skeleton />
            {/each}
          {:else}
            {#each recentlyViewed.slice(0, 6) as product}
              <ProductCard {product} />
            {/each}
          {/if}
        </div>
      </div>
    </section>
  {/if}

  <!-- Featured Products -->
  <section class="center mx-auto px-2">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-3xl font-bold">
          Trending <span class="text-primary">Now</span>
        </h2>
        <p class="text-muted-foreground mt-1">
          Our best-selling and featured items
        </p>
      </div>
      <Button href="/products" variant="outline" class="rounded-xl font-bold">
        View All Products
      </Button>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2"
    >
      {#if $navigating}
        {#each Array(featuredProducts.length || 6) as _}
          <ProductCard.Skeleton />
        {/each}
      {:else}
        {#each featuredProducts as product}
          <ProductCard {product} dealLabel="Trending" />
        {/each}
      {/if}
    </div>
  </section>

  <!-- Brand Banner -->
  <section class="center mx-auto px-2">
    <div
      class="relative overflow-hidden rounded-xl bg-primary px-8 py-12 md:py-16 text-primary-foreground shadow-lg"
    >
      <div
        class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10"
      >
        <StoreIcon class="size-96" />
      </div>
      <div class="relative z-10 max-w-2xl space-y-6">
        <h2 class="text-3xl md:text-5xl font-bold leading-tight">
          Elevate Your Everyday with Professional Tools
        </h2>
        <p class="text-lg opacity-90">
          Join 50,000+ happy customers who trust our quality and service for
          their workspace and lifestyle needs.
        </p>
        <div class="flex pt-4">
          <Button
            href="/register"
            variant="secondary"
            class="rounded-xl font-bold px-10 shadow-lg transition-all hover:-translate-y-1"
          >
            Get Exclusive Access
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- New Arrivals -->
  <section class="center mx-auto px-2">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-3xl font-bold">
          New <span class="text-primary">Arrivals</span>
        </h2>
        <p class="text-muted-foreground mt-1">Fresh from the warehouse</p>
      </div>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2"
    >
      {#if $navigating}
        {#each Array(allNewArrivals.length || 6) as _}
          <ProductCard.Skeleton />
        {/each}
      {:else}
        {#each allNewArrivals as product}
          <ProductCard {product} />
        {/each}
      {/if}
    </div>

    <!-- Infinite Scroll Loader -->
    {#if currentPage < totalPages}
      <div
        bind:this={observerTarget}
        class="py-20 flex flex-col items-center justify-center gap-4"
      >
        <div
          class="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary animate-spin"
        >
          <Loader2 class="h-6 w-6" />
        </div>
        <p
          class="text-xs font-bold text-muted-foreground uppercase tracking-widest"
        >
          Fresh arrivals incoming...
        </p>
      </div>
    {/if}

    <div class="pb-20"></div>
  </section>
</div>
