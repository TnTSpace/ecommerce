<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import { toast } from "svelte-sonner";
  import { Zap, Loader2 } from "@lucide/svelte";

  interface Props {
    open: boolean;
    product: any;
    onClose: () => void;
  }

  let { open = $bindable(), product, onClose }: Props = $props();

  let isMobile = $state(false);
  let isLoading = $state(false);

  // User session
  const user = $derived(page.data.user);
  const isLoggedIn = $derived(!!user);

  // Form State
  let email = $state("");
  let fullName = $state("");
  let phone = $state("");

  // Populate from session if logged in
  $effect(() => {
    if (user) {
      email = user.email || "";
      fullName = user.name || "";
      // phone is not typically in the core user object from better-auth unless added
      // We'll see if we can get it or just leave it for them to fill once if missing
    }
  });

  $effect(() => {
    if (browser) {
      const checkMobile = () => {
        isMobile = window.innerWidth < 1024;
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose();
    }
    open = newOpen;
  };

  const handlePurchase = async (e: Event) => {
    e.preventDefault();
    if (!email || !fullName || !phone) {
      toast.error("Please fill in all details");
      return;
    }

    isLoading = true;
    try {
      const response = await fetch("/api/checkout/quick", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          email,
          fullName,
          phone,
          amount: parseFloat(product.basePrice),
          userId: user?.id || null,
        }),
      });

      const result = await response.json();
      if (result.success && result.authorization_url) {
        window.location.href = result.authorization_url;
      } else {
        toast.error(result.error || "Failed to initialize payment");
        isLoading = false;
      }
    } catch (err) {
      console.error("Purchase error:", err);
      toast.error("An error occurred. Please try again.");
      isLoading = false;
    }
  };
</script>

{#snippet purchaseForm(isMobile: boolean)}
  <form onsubmit={handlePurchase} class="space-y-4">
    {#if !isLoggedIn}
      <div class="space-y-2">
        <Label for={isMobile ? "fullName-m" : "fullName"}>Full Name</Label>
        <Input
          id={isMobile ? "fullName-m" : "fullName"}
          bind:value={fullName}
          placeholder="John Doe"
          class="rounded-xl"
          required
        />
      </div>
      <div class="space-y-2">
        <Label for={isMobile ? "email-m" : "email"}>Email Address</Label>
        <Input
          id={isMobile ? "email-m" : "email"}
          type="email"
          bind:value={email}
          placeholder="john@example.com"
          class="rounded-xl"
          required
        />
      </div>
    {:else}
      <div class="rounded-xl bg-muted/30 p-4 border border-border/50">
        <div class="flex flex-col gap-1">
          <span
            class="text-xs text-muted-foreground font-medium uppercase tracking-wider"
            >Account</span
          >
          <span class="font-bold text-foreground">{user.name}</span>
          <span class="text-xs text-muted-foreground">{user.email}</span>
        </div>
      </div>
    {/if}

    <div class="space-y-2">
      <Label for={isMobile ? "phone-m" : "phone"}>Phone Number</Label>
      <Input
        id={isMobile ? "phone-m" : "phone"}
        type="tel"
        bind:value={phone}
        placeholder="08012345678"
        class="rounded-xl"
        required
      />
    </div>

    <div class="pt-4">
      <Button
        type="submit"
        class="w-full rounded-xl font-bold bg-primary shadow-lg shadow-primary/20"
        disabled={isLoading}
      >
        {#if isLoading}
          <Loader2 class="mr-2 h-5 w-5 animate-spin" />
          {isMobile ? "Processing..." : "Initializing..."}
        {:else}
          <Zap class="mr-2 h-5 w-5 fill-current" />
          {isLoggedIn
            ? "Place Order Now"
            : isMobile
              ? "Confirm & Checkout"
              : "Buy Now"}
        {/if}
      </Button>
      <p
        class="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest font-bold"
      >
        Secure Payment via Paystack
      </p>
    </div>
  </form>
{/snippet}

{#if product}
  {#if !isMobile}
    <Dialog.Root {open} onOpenChange={handleOpenChange}>
      <Dialog.Content
        class="sm:max-w-[425px] p-0 overflow-hidden rounded-xl border-none shadow-lg bg-card"
      >
        <div class="p-8">
          <div class="flex items-center gap-4 mb-8">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
            >
              <Zap class="h-6 w-6 fill-current" />
            </div>
            <div>
              <h2 class="text-xl font-bold">Quick Purchase</h2>
              <p class="text-sm text-muted-foreground line-clamp-1">
                {product.name}
              </p>
            </div>
          </div>

          {@render purchaseForm(false)}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  {:else}
    <Drawer.Root {open} onOpenChange={handleOpenChange}>
      <Drawer.Content>
        <Drawer.Header class="text-left px-6 pt-6">
          <Drawer.Title class="text-xl font-bold">Quick Purchase</Drawer.Title>
          <Drawer.Description class="line-clamp-1">
            {product.name}
          </Drawer.Description>
        </Drawer.Header>
        <div class="px-6 pb-12 mt-4">
          {@render purchaseForm(true)}
        </div>
      </Drawer.Content>
    </Drawer.Root>
  {/if}
{/if}
