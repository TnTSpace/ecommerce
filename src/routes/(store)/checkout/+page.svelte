<script lang="ts">
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { formatPrice } from "$lib/fxns";
  import { Loader2, Lock, CreditCard, ShieldCheck } from "@lucide/svelte";

  let { data }: PageProps = $props();

  let isSubmitting = $state(false);
  let email = $state(data.user?.email || "");
  let sameAsBilling = $state(true);

  // Shipping address
  let shippingFullName = $state(data.user?.name || "");
  let shippingAddressLine1 = $state("");
  let shippingAddressLine2 = $state("");
  let shippingCity = $state("");
  let shippingState = $state("");
  let shippingPostalCode = $state("");
  let shippingPhone = $state("");

  const cart = data.cart;
  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const shipping = 0;
  const total = subtotal + shipping;
</script>

<div class="center mx-auto max-w-7xl px-4 py-6">
  <h1 class="mb-6 text-2xl font-bold text-foreground">Checkout</h1>

  <form
    method="POST"
    use:enhance={() => {
      isSubmitting = true;
      return async ({ result }) => {
        isSubmitting = false;
        if (result.type === "redirect") {
          // Redirect to Paystack
          window.location.href = result.location;
        }
      };
    }}
  >
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Checkout Form -->
      <div class="space-y-6 lg:col-span-2">
        <!-- Contact -->
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <Label for="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                bind:value={email}
                required
                placeholder="your@email.com"
              />
              <p class="text-xs text-muted-foreground">
                We'll send order confirmation here
              </p>
            </div>
          </CardContent>
        </Card>

        <!-- Shipping Address -->
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="shippingFullName"
                bind:value={shippingFullName}
                required
                placeholder="John Doe"
              />
            </div>
            <div class="space-y-2">
              <Label for="addressLine1">Address *</Label>
              <Input
                id="addressLine1"
                name="shippingAddressLine1"
                bind:value={shippingAddressLine1}
                required
                placeholder="123 Main Street"
              />
            </div>
            <div class="space-y-2">
              <Input
                name="shippingAddressLine2"
                bind:value={shippingAddressLine2}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <Label for="city">City *</Label>
                <Input
                  id="city"
                  name="shippingCity"
                  bind:value={shippingCity}
                  required
                  placeholder="Lagos"
                />
              </div>
              <div class="space-y-2">
                <Label for="state">State *</Label>
                <Input
                  id="state"
                  name="shippingState"
                  bind:value={shippingState}
                  required
                  placeholder="Lagos"
                />
              </div>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <Label for="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="shippingPostalCode"
                  bind:value={shippingPostalCode}
                  placeholder="100001"
                />
              </div>
              <div class="space-y-2">
                <Label for="phone">Phone *</Label>
                <Input
                  id="phone"
                  name="shippingPhone"
                  bind:value={shippingPhone}
                  required
                  placeholder="+234"
                />
              </div>
            </div>

            <div class="flex items-center gap-2 pt-2">
              <Checkbox id="sameAsBilling" bind:checked={sameAsBilling} />
              <Label for="sameAsBilling" class="text-sm"
                >Billing address same as shipping</Label
              >
            </div>
          </CardContent>
        </Card>

        <!-- Payment -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <CreditCard class="h-5 w-5" />
              Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="rounded-lg border border-border bg-muted/50 p-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"
                >
                  <Lock class="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p class="font-medium text-foreground">
                    Secure Payment via Paystack
                  </p>
                  <p class="text-sm text-muted-foreground">
                    You'll be redirected to complete payment
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Order Summary -->
      <div>
        <Card class="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <!-- Items -->
            <div class="max-h-60 space-y-3 overflow-y-auto">
              {#each items as item}
                <div class="flex gap-3">
                  <div
                    class="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted"
                  >
                    {#if item.product?.images?.[0]?.url}
                      <img
                        src={item.product.images[0].url}
                        alt=""
                        class="h-full w-full object-cover"
                      />
                    {/if}
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium line-clamp-1">
                      {item.product?.name}
                    </p>
                    <p class="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p class="text-sm font-medium">
                    {formatPrice(parseFloat(item.priceAtAdd) * item.quantity)}
                  </p>
                </div>
              {/each}
            </div>

            <Separator />

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Shipping</span>
                <span class="text-green-600"
                  >{shipping === 0 ? "Free" : formatPrice(shipping)}</span
                >
              </div>
            </div>

            <Separator />

            <div class="flex justify-between font-medium">
              <span>Total</span>
              <span class="text-lg">{formatPrice(total)}</span>
            </div>

            <Button
              type="submit"
              class="w-full"
              disabled={isSubmitting || items.length === 0}
            >
              {#if isSubmitting}
                <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                Processing...
              {:else}
                Pay {formatPrice(total)}
              {/if}
            </Button>

            <div
              class="flex items-center justify-center gap-2 text-xs text-muted-foreground"
            >
              <ShieldCheck class="h-4 w-4" />
              <span>Secure checkout</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </form>
</div>
