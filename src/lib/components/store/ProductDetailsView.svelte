<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
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
  import { cart } from "$lib/store/cart.svelte";
  import { toast } from "svelte-sonner";

  interface Props {
    product: any;
    reviewStats?: any;
    showTabs?: boolean;
    onAddToCart?: (qty: number) => void;
  }

  let { product, reviewStats, showTabs = true, onAddToCart }: Props = $props();

  const images = $derived(product?.images || []);
  let selectedSize = $state<string | null>(null);
  let currentImageIndex = $state(0);
  let isWishlisted = $state(false);

  const productInCart = $derived(
    cart.items.find((item) => item.product.id === product.id),
  );
  const cartQuantity = $derived(productInCart ? productInCart.quantity : 0);

  const hasDiscount = $derived(
    !!(
      product?.compareAtPrice &&
      parseFloat(product.compareAtPrice) > parseFloat(product.basePrice)
    ),
  );

  const discountPercent = $derived(
    hasDiscount
      ? Math.round(
          ((parseFloat(product.compareAtPrice!) -
            parseFloat(product.basePrice)) /
            parseFloat(product.compareAtPrice!)) *
            100,
        )
      : 0,
  );

  const handleIncrement = () => {
    if (!product) return;
    if (cartQuantity < (product.stockQuantity || 99)) {
      cart.addItem(product);
      if (cartQuantity === 0) {
        toast.success(`${product.name} added to cart`, {
          position: "top-center",
        });
      }
    }
  };

  const handleDecrement = () => {
    if (!product) return;
    if (cartQuantity > 0) {
      cart.updateQuantity(product.id, cartQuantity - 1);
    }
  };

  const nextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  };

  const prevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  };

  const internalAddToCart = () => {
    if (!product) return;
    if (onAddToCart) {
      onAddToCart(1);
    } else {
      handleIncrement();
    }
  };
</script>

<div class="grid gap-8 lg:grid-cols-2">
  <!-- Image Gallery -->
  <div class="w-full space-y-4 overflow-hidden">
    <div
      class="relative aspect-square w-full font-normal overflow-hidden rounded-xl bg-muted"
    >
      {#if images.length > 0}
        <img
          src={images[currentImageIndex].url}
          alt={images[currentImageIndex].altText || product.name}
          class="h-full w-full object-cover"
        />
        {#if images.length > 1}
          <button
            onclick={prevImage}
            class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-sm shadow-sm"
          >
            <ChevronLeft class="h-5 w-5" />
          </button>
          <button
            onclick={nextImage}
            class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-sm shadow-sm"
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
      <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {#each images as image, i}
          <button
            onclick={() => (currentImageIndex = i)}
            class="h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all {currentImageIndex ===
            i
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-border hover:border-primary/50'}"
          >
            <img src={image.url} alt="" class="h-full w-full object-cover" />
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
    {#if reviewStats}
      <div class="flex items-center gap-2">
        <div class="flex">
          {#each Array(5) as _, i}
            <Star
              class="h-5 w-5 {i < Math.round(reviewStats.averageRating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted'}"
            />
          {/each}
        </div>
        <span class="font-medium">{reviewStats.averageRating.toFixed(1)}</span>
        <span class="text-muted-foreground"
          >({reviewStats.totalReviews} reviews)</span
        >
      </div>
    {/if}

    <!-- Price -->
    <div class="flex flex-col gap-1">
      <span class="text-3xl font-bold text-foreground"
        >{formatPrice(product.basePrice)}</span
      >
      {#if hasDiscount}
        <div class="flex items-center gap-2">
          <span class="text-base text-muted-foreground line-through"
            >{formatPrice(product.compareAtPrice!)}</span
          >
          <Badge
            variant="secondary"
            class="bg-primary/10 text-primary border-none"
          >
            Save {discountPercent}%
          </Badge>
        </div>
      {/if}
    </div>

    <!-- Stock Status -->
    <div>
      {#if product.stockQuantity > 0}
        <span class="text-sm text-foreground font-medium"
          >✓ In Stock ({product.stockQuantity} available)</span
        >
      {:else}
        <span class="text-sm text-destructive font-medium">✗ Out of Stock</span>
      {/if}
    </div>

    <!-- Sizes -->
    {#if product.sizes && product.sizes.length > 0}
      <div>
        <h4 class="mb-2 font-medium text-foreground">Size</h4>
        <div class="flex flex-wrap gap-2">
          {#each product.sizes as ps}
            <button
              onclick={() => (selectedSize = ps.id)}
              disabled={!ps.isAvailable}
              class="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors {selectedSize ===
              ps.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'bg-background hover:border-primary text-foreground'} disabled:opacity-50"
            >
              {ps.size?.name || ps.sizeId}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Actions Toggle -->
    <div class="flex flex-col gap-4">
      {#if cartQuantity > 0}
        <div class="space-y-2">
          <h4 class="text-sm font-medium text-foreground">Quantity</h4>
          <div class="flex items-center gap-3">
            <div
              class="flex items-center rounded-xl border border-border bg-card overflow-hidden shadow-sm"
            >
              <Button
                variant="ghost"
                size="icon"
                onclick={handleDecrement}
                class="rounded-none h-11 w-11"
              >
                <Minus class="h-4 w-4" />
              </Button>
              <span class="w-14 text-center text-lg font-bold text-foreground"
                >{cartQuantity}</span
              >
              <Button
                variant="ghost"
                size="icon"
                onclick={handleIncrement}
                class="rounded-none h-11 w-11"
                disabled={cartQuantity >= product.stockQuantity}
              >
                <Plus class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      {:else}
        <Button
          class="w-full rounded-xl font-bold shadow-lg shadow-primary/20 h-12"
          disabled={product.stockQuantity === 0}
          onclick={internalAddToCart}
        >
          <ShoppingCart class="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      {/if}

      <div class="flex gap-3 mt-2">
        <Button
          variant="outline"
          size="icon"
          class="rounded-xl border-none bg-muted/20 hover:bg-destructive/10 hover:text-destructive"
          onclick={() => (isWishlisted = !isWishlisted)}
        >
          <Heart
            class="h-5 w-5"
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </Button>
        <Button
          variant="outline"
          size="icon"
          class="rounded-xl border-none bg-muted/20 hover:bg-primary/10 hover:text-primary"
        >
          <Share2 class="h-5 w-5" />
        </Button>
      </div>
    </div>

    <!-- Features -->
    <div
      class="grid grid-cols-3 gap-4 rounded-xl border border-border p-4 bg-muted/10 shadow-sm"
    >
      <div class="flex flex-col items-center gap-1 text-center">
        <Truck class="h-5 w-5 text-primary" />
        <span
          class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
          >Free Ship</span
        >
      </div>
      <div class="flex flex-col items-center gap-1 text-center">
        <Shield class="h-5 w-5 text-primary" />
        <span
          class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
          >Secure</span
        >
      </div>
      <div class="flex flex-col items-center gap-1 text-center">
        <RotateCcw class="h-5 w-5 text-primary" />
        <span
          class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
          >Easy Return</span
        >
      </div>
    </div>
  </div>
</div>

{#if showTabs}
  <div class="mt-12">
    <Tabs.Root value="description">
      <Tabs.List
        class="w-full justify-start overflow-x-auto bg-muted/50 p-1 rounded-xl"
      >
        <Tabs.Trigger value="description" class="rounded-lg"
          >Description</Tabs.Trigger
        >
        <Tabs.Trigger value="features" class="rounded-lg">Features</Tabs.Trigger
        >
        <Tabs.Trigger value="specifications" class="rounded-lg"
          >Specifications</Tabs.Trigger
        >
        <Tabs.Trigger value="reviews" class="rounded-lg"
          >Reviews ({reviewStats?.totalReviews || 0})</Tabs.Trigger
        >
      </Tabs.List>
      <Tabs.Content value="description" class="mt-6">
        <div class="text-muted-foreground leading-relaxed">
          {product.shortDescription || "No description available."}
        </div>
      </Tabs.Content>
      <Tabs.Content value="features" class="mt-6">
        {#if product.features && product.features.length > 0}
          <ul class="grid gap-3 sm:grid-cols-2">
            {#each product.features as feature}
              <li
                class="flex items-start gap-3 text-sm text-muted-foreground bg-card p-3 rounded-lg border border-border"
              >
                <Plus class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span
                  ><span class="font-bold text-foreground">{feature.name}:</span
                  >
                  {feature.value}</span
                >
              </li>
            {/each}
          </ul>
        {:else}
          <p class="text-muted-foreground">No features listed.</p>
        {/if}
      </Tabs.Content>
      <Tabs.Content value="specifications" class="mt-6">
        <div class="prose prose-sm max-w-none dark:prose-invert">
          {@html product.description}
        </div>
      </Tabs.Content>
      <Tabs.Content value="reviews" class="mt-6">
        <p class="text-muted-foreground">
          No reviews yet. Be the first to review!
        </p>
      </Tabs.Content>
    </Tabs.Root>
  </div>
{/if}
