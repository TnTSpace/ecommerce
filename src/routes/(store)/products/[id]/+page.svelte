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
  import { cart } from "$lib/store/cart.svelte";
  import { toast } from "svelte-sonner";
  import ProductDetailsView from "$lib/components/store/ProductDetailsView.svelte";

  let { data }: PageProps = $props();

  const product = $derived(data.product);
  const images = $derived(product?.images || []);
  const relatedProducts = $derived(data.relatedProducts || []);

  let quantity = $state(1);
  let selectedSize = $state<string | null>(null);
  let currentImageIndex = $state(0);
  let isWishlisted = $state(false);

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

  const addToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      cart.addItem(product);
    }
    toast.success(`${product.name} added to cart`, {
      description: `${quantity} items added. View cart in the header.`,
      position: "top-center",
    });
  };

  // Personalization: Track viewed product
  $effect(() => {
    if (product) {
      cart.addViewed(product);
    }
  });
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
        <a
          href="/category/{product.category.id}"
          class="hover:text-foreground line-clamp-1 max-w-[100px] sm:max-w-none"
          >{product.category.name}</a
        >
      {/if}
      <span>/</span>
      <span class="text-foreground line-clamp-1 max-w-[150px] sm:max-w-none"
        >{product.name}</span
      >
    </nav>

    <ProductDetailsView {product} reviewStats={data.reviewStats} />

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
