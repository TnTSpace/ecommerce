<script lang="ts">
  import type { PageProps } from "./$types";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { formatPrice } from "$lib/fxns";
  import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "@lucide/svelte";

  let { data }: PageProps = $props();

  const cart = data.cart;
  const items = cart?.items || [];

  const updateQuantity = async (itemId: string, quantity: number) => {
    // TODO: Implement cart update
  };

  const removeItem = async (itemId: string) => {
    // TODO: Implement cart remove
  };

  const subtotal = items.reduce((sum: number, item: any) => {
    return sum + parseFloat(item.priceAtAdd) * item.quantity;
  }, 0);

  const shipping = 0; // Free shipping for now
  const total = subtotal + shipping;
</script>

<div class="container mx-auto max-w-7xl px-4 py-6">
  <h1 class="mb-6 text-2xl font-bold text-foreground">Shopping Cart</h1>

  {#if items.length > 0}
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <Card>
          <CardContent class="divide-y divide-border p-0">
            {#each items as item}
              <div class="flex gap-4 p-4">
                <!-- Image -->
                <div
                  class="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted"
                >
                  {#if item.product?.images?.[0]?.url}
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      class="h-full w-full object-cover"
                    />
                  {:else}
                    <div
                      class="flex h-full items-center justify-center text-muted-foreground"
                    >
                      <ShoppingBag class="h-8 w-8" />
                    </div>
                  {/if}
                </div>

                <!-- Details -->
                <div class="flex flex-1 flex-col">
                  <div class="flex justify-between">
                    <div>
                      <h3 class="font-medium text-foreground">
                        {item.product?.name || "Product"}
                      </h3>
                      {#if item.productSize}
                        <p class="text-sm text-muted-foreground">
                          Size: {item.productSize.size?.name}
                        </p>
                      {/if}
                    </div>
                    <p class="font-medium text-foreground">
                      {formatPrice(parseFloat(item.priceAtAdd) * item.quantity)}
                    </p>
                  </div>

                  <div class="mt-auto flex items-center justify-between pt-2">
                    <!-- Quantity -->
                    <div
                      class="flex items-center rounded-lg border border-border"
                    >
                      <button
                        onclick={() =>
                          updateQuantity(item.id, item.quantity - 1)}
                        class="p-1.5 hover:bg-muted"
                      >
                        <Minus class="h-4 w-4" />
                      </button>
                      <span class="w-8 text-center text-sm"
                        >{item.quantity}</span
                      >
                      <button
                        onclick={() =>
                          updateQuantity(item.id, item.quantity + 1)}
                        class="p-1.5 hover:bg-muted"
                      >
                        <Plus class="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onclick={() => removeItem(item.id)}
                      class="text-sm text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            {/each}
          </CardContent>
        </Card>
      </div>

      <!-- Order Summary -->
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground"
                >Subtotal ({items.length} items)</span
              >
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-muted-foreground">Shipping</span>
              <span class="text-green-600"
                >{shipping === 0 ? "Free" : formatPrice(shipping)}</span
              >
            </div>
            <Separator />
            <div class="flex justify-between font-medium">
              <span>Total</span>
              <span class="text-lg">{formatPrice(total)}</span>
            </div>

            <!-- Promo Code -->
            <div class="flex gap-2">
              <Input placeholder="Promo code" class="flex-1" />
              <Button variant="outline">Apply</Button>
            </div>

            <Button class="w-full" size="lg" href="/checkout">
              Proceed to Checkout
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>

            <p class="text-center text-xs text-muted-foreground">
              Secure checkout powered by Paystack
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  {:else}
    <Card>
      <CardContent class="py-12 text-center">
        <ShoppingBag class="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 class="mt-4 text-lg font-medium text-foreground">
          Your cart is empty
        </h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Looks like you haven't added any items yet
        </p>
        <Button class="mt-6" href="/products">Continue Shopping</Button>
      </CardContent>
    </Card>
  {/if}
</div>
