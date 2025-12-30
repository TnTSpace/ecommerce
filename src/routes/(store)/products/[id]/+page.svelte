<script lang="ts">
  import type { PageProps } from "./$types";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import ProductCard from "$lib/components/store/ProductCard.svelte";
  import { formatPrice } from "$lib/fxns";
  import {
    Heart,
    Share2,
    ShoppingCart,
    Minus,
    Plus,
    Star,
    Truck,
    Shield,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
  } from "@lucide/svelte";

  let { data }: PageProps = $props();

  const product = $derived(data.product);
  const images = $derived(product?.images || []);
  const relatedProducts = $derived(data.relatedProducts || []);

  let quantity = $state(1);
  let selectedSize = $state<string | null>(null);
  let currentImageIndex = $state(0);
  let isWishlisted = $state(false);

  const hasDiscount =
    product?.compareAtPrice &&
    parseFloat(product.compareAtPrice) > parseFloat(product.basePrice);
  const discountPercent = hasDiscount
    ? Math.round(
        ((parseFloat(product.compareAtPrice!) - parseFloat(product.basePrice)) /
          parseFloat(product.compareAtPrice!)) *
          100,
      )
    : 0;

  const incrementQuantity = () => {
    if (quantity < (product?.stockQuantity || 10)) quantity++;
  };

  const decrementQuantity = () => {
    if (quantity > 1) quantity--;
  };

  const nextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  };

  const prevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  };
</script>

{#if product}
  <div class="container mx-auto max-w-7xl px-4 py-6">
    <!-- Breadcrumb -->
    <nav class="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
      <a href="/" class="hover:text-foreground">Home</a>
      <span>/</span>
      <a href="/products" class="hover:text-foreground">Products</a>
      {#if product.category}
        <span>/</span>
        <a href="/category/{product.category.id}" class="hover:text-foreground"
          >{product.category.name}</a
        >
      {/if}
      <span>/</span>
      <span class="text-foreground">{product.name}</span>
    </nav>

    <div class="grid gap-8 lg:grid-cols-2">
      <!-- Image Gallery -->
      <div class="space-y-4">
        <div class="relative aspect-square overflow-hidden rounded-xl bg-muted">
          {#if images.length > 0}
            <img
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].altText || product.name}
              class="h-full w-full object-cover"
            />
            {#if images.length > 1}
              <button
                onclick={prevImage}
                class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-sm"
              >
                <ChevronLeft class="h-5 w-5" />
              </button>
              <button
                onclick={nextImage}
                class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-sm"
              >
                <ChevronRight class="h-5 w-5" />
              </button>
            {/if}
          {:else}
            <div
              class="flex h-full items-center justify-center text-muted-foreground"
            >
              No image available
            </div>
          {/if}

          {#if hasDiscount}
            <Badge class="absolute left-4 top-4 bg-primary"
              >-{discountPercent}%</Badge
            >
          {/if}
        </div>

        <!-- Thumbnails -->
        {#if images.length > 1}
          <div class="flex gap-2 overflow-x-auto">
            {#each images as image, i}
              <button
                onclick={() => (currentImageIndex = i)}
                class="h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 {currentImageIndex ===
                i
                  ? 'border-primary'
                  : 'border-border'}"
              >
                <img
                  src={image.url}
                  alt=""
                  class="h-full w-full object-cover"
                />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-foreground lg:text-3xl">
            {product.name}
          </h1>
          <p class="mt-1 text-sm text-muted-foreground">SKU: {product.sku}</p>
        </div>

        <!-- Rating -->
        {#if data.reviewStats}
          <div class="flex items-center gap-2">
            <div class="flex">
              {#each Array(5) as _, i}
                <Star
                  class="h-5 w-5 {i < Math.round(data.reviewStats.averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted'}"
                />
              {/each}
            </div>
            <span class="font-medium"
              >{data.reviewStats.averageRating.toFixed(1)}</span
            >
            <span class="text-muted-foreground"
              >({data.reviewStats.totalReviews} reviews)</span
            >
          </div>
        {/if}

        <!-- Price -->
        <div class="flex items-baseline gap-3">
          <span class="text-3xl font-bold text-foreground"
            >{formatPrice(product.basePrice)}</span
          >
          {#if hasDiscount}
            <span class="text-lg text-muted-foreground line-through"
              >{formatPrice(product.compareAtPrice!)}</span
            >
            <Badge
              variant="secondary"
              class="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
            >
              Save {discountPercent}%
            </Badge>
          {/if}
        </div>

        <!-- Stock Status -->
        <div>
          {#if product.stockQuantity > 0}
            <span class="text-sm text-green-600"
              >✓ In Stock ({product.stockQuantity} available)</span
            >
          {:else}
            <span class="text-sm text-red-600">✗ Out of Stock</span>
          {/if}
        </div>

        <!-- Sizes -->
        {#if product.sizes && product.sizes.length > 0}
          <div>
            <h4 class="mb-2 font-medium">Size</h4>
            <div class="flex flex-wrap gap-2">
              {#each product.sizes as ps}
                <button
                  onclick={() => (selectedSize = ps.id)}
                  disabled={!ps.isAvailable}
                  class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors {selectedSize ===
                  ps.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary'} disabled:opacity-50"
                >
                  {ps.size?.name || ps.sizeId}
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Quantity -->
        <div>
          <h4 class="mb-2 font-medium">Quantity</h4>
          <div class="flex items-center gap-3">
            <div class="flex items-center rounded-lg border border-border">
              <button
                onclick={decrementQuantity}
                class="p-2 hover:bg-muted"
                disabled={quantity <= 1}
              >
                <Minus class="h-4 w-4" />
              </button>
              <span class="w-12 text-center font-medium">{quantity}</span>
              <button
                onclick={incrementQuantity}
                class="p-2 hover:bg-muted"
                disabled={quantity >= product.stockQuantity}
              >
                <Plus class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <Button
            class="flex-1"
            size="lg"
            disabled={product.stockQuantity === 0}
          >
            <ShoppingCart class="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="lg"
            onclick={() => (isWishlisted = !isWishlisted)}
          >
            <Heart
              class="h-5 w-5"
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </Button>
          <Button variant="outline" size="lg">
            <Share2 class="h-5 w-5" />
          </Button>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-3 gap-4 rounded-xl border border-border p-4">
          <div class="flex flex-col items-center gap-2 text-center">
            <Truck class="h-6 w-6 text-primary" />
            <span class="text-xs text-muted-foreground">Free Shipping</span>
          </div>
          <div class="flex flex-col items-center gap-2 text-center">
            <Shield class="h-6 w-6 text-primary" />
            <span class="text-xs text-muted-foreground">Secure Payment</span>
          </div>
          <div class="flex flex-col items-center gap-2 text-center">
            <RotateCcw class="h-6 w-6 text-primary" />
            <span class="text-xs text-muted-foreground">Easy Returns</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Tabs -->
    <div class="mt-12">
      <Tabs.Root value="description">
        <Tabs.List>
          <Tabs.Trigger value="description">Description</Tabs.Trigger>
          <Tabs.Trigger value="specifications">Specifications</Tabs.Trigger>
          <Tabs.Trigger value="reviews"
            >Reviews ({data.reviewStats?.totalReviews || 0})</Tabs.Trigger
          >
        </Tabs.List>
        <Tabs.Content value="description" class="mt-4">
          <div class="prose prose-sm max-w-none dark:prose-invert">
            {product.description}
          </div>
        </Tabs.Content>
        <Tabs.Content value="specifications" class="mt-4">
          <p class="text-muted-foreground">No specifications available.</p>
        </Tabs.Content>
        <Tabs.Content value="reviews" class="mt-4">
          <p class="text-muted-foreground">
            No reviews yet. Be the first to review!
          </p>
        </Tabs.Content>
      </Tabs.Root>
    </div>

    <!-- Related Products -->
    {#if relatedProducts.length > 0}
      <div class="mt-12">
        <h2 class="mb-6 text-xl font-bold text-foreground">Related Products</h2>
        <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {#each relatedProducts.slice(0, 4) as related}
            <ProductCard product={related} />
          {/each}
        </div>
      </div>
    {/if}
  </div>
{:else}
  <div class="container mx-auto max-w-7xl px-4 py-12 text-center">
    <p class="text-lg text-muted-foreground">Product not found</p>
    <Button class="mt-4" href="/products">Browse Products</Button>
  </div>
{/if}
