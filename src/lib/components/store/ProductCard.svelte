<script lang="ts">
  import { Heart, Plus, Star, Truck, Store as StoreIcon } from "@lucide/svelte";
  import { formatPrice } from "$lib/fxns";

  interface Props {
    product: {
      id: string;
      name: string;
      basePrice: string;
      compareAtPrice?: string | null;
      stockQuantity: number;
      isFeatured?: boolean;
      images?: { url: string; altText?: string | null }[];
      category?: { name: string } | null;
      averageRating?: number;
      reviewCount?: number;
    };
    dealLabel?: string;
    showOfficialBadge?: boolean;
    showExpressBadge?: boolean;
  }

  let {
    product,
    dealLabel,
    showOfficialBadge = false,
    showExpressBadge = false,
  }: Props = $props();

  let isWishlisted = $state(false);
  let isHovered = $state(false);

  const primaryImage = $derived(
    product.images?.[0]?.url || "/placeholder-product.jpg",
  );
  const hasDiscount = $derived(
    !!(
      product.compareAtPrice &&
      parseFloat(product.compareAtPrice) > parseFloat(product.basePrice)
    ),
  );

  const discountPercent = $derived.by(() => {
    if (!hasDiscount) return 0;
    const original = parseFloat(product.compareAtPrice!);
    const current = parseFloat(product.basePrice);
    return Math.round(((original - current) / original) * 100);
  });

  const toggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isWishlisted = !isWishlisted;
  };

  const addToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Add to cart logic
  };
</script>

<a
  href="/products/{product.id}"
  class="group relative block overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
>
  <!-- Deal Badge -->
  {#if dealLabel}
    <div
      class="absolute left-0 top-3 z-10 rounded-r-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground"
    >
      {dealLabel}
    </div>
  {/if}

  <!-- Wishlist Button -->
  <button
    type="button"
    onclick={toggleWishlist}
    class="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all hover:bg-card {isWishlisted
      ? 'text-red-500'
      : 'text-muted-foreground'}"
  >
    <Heart class="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
  </button>

  <!-- Product Image -->
  <div class="relative aspect-square overflow-hidden bg-muted">
    <img
      src={primaryImage}
      alt={product.images?.[0]?.altText || product.name}
      class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />

    <!-- Out of Stock Overlay -->
    {#if product.stockQuantity === 0}
      <div
        class="absolute inset-0 flex items-center justify-center bg-background/80"
      >
        <span
          class="rounded-md bg-destructive px-2 py-1 text-xs font-medium text-destructive-foreground"
        >
          Out of Stock
        </span>
      </div>
    {/if}
  </div>

  <!-- Product Info -->
  <div class="p-3">
    <!-- Name -->
    <h3 class="line-clamp-2 text-sm font-medium text-foreground">
      {product.name}
    </h3>

    <!-- Price Section -->
    <div class="mt-2 flex items-baseline gap-2">
      <span class="text-base font-bold text-foreground">
        {formatPrice(product.basePrice)}
      </span>
      {#if hasDiscount}
        <span class="text-xs text-muted-foreground line-through">
          {formatPrice(product.compareAtPrice!)}
        </span>
        <span
          class="rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary"
        >
          -{discountPercent}%
        </span>
      {/if}
    </div>

    <!-- Rating -->
    {#if product.averageRating}
      <div class="mt-1.5 flex items-center gap-1">
        <Star class="h-3 w-3 fill-yellow-400 text-yellow-400" />
        <span class="text-xs font-medium text-foreground"
          >{product.averageRating.toFixed(1)}</span
        >
        {#if product.reviewCount}
          <span class="text-xs text-muted-foreground"
            >({product.reviewCount})</span
          >
        {/if}
      </div>
    {/if}

    <!-- Badges -->
    <div class="mt-2 flex flex-wrap gap-1">
      {#if showOfficialBadge}
        <span
          class="inline-flex items-center gap-1 rounded-md border border-primary/30 px-1.5 py-0.5 text-xs text-primary"
        >
          <StoreIcon class="h-3 w-3" />
          Official Store
        </span>
      {/if}
      {#if showExpressBadge}
        <span
          class="inline-flex items-center gap-1 rounded-md bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-500"
        >
          <Truck class="h-3 w-3" />
          Express
        </span>
      {/if}
    </div>
  </div>

  <!-- Add to Cart Button -->
  <button
    type="button"
    onclick={addToCart}
    disabled={product.stockQuantity === 0}
    class="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
  >
    <Plus class="h-4 w-4" />
  </button>
</a>
