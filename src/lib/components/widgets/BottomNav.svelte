<script lang="ts">
  import { page } from "$app/state";
  import {
    Home,
    Package,
    SlidersHorizontal,
    MoreHorizontal,
    ShoppingCart,
    User as UserIcon,
    Store,
    Phone,
    ArrowUpDown,
  } from "@lucide/svelte";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let drawerOpen = $state(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Categories", href: "/categories", icon: Store },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const isActive = (href: string) => {
    const pathname = page.url.pathname;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isProductsPage = $derived(page.url.pathname.startsWith("/products"));
</script>

<div
  class="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-card pb-safe lg:hidden"
>
  <!-- Home -->
  <a
    href="/"
    class="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors {isActive(
      '/',
    )
      ? 'text-primary'
      : 'text-muted-foreground'}"
  >
    <Home class="h-5 w-5" />
    <span>Home</span>
  </a>

  <!-- Products -->
  <a
    href="/products"
    class="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-bold transition-colors {isActive(
      '/products',
    )
      ? 'text-primary'
      : 'text-muted-foreground'}"
  >
    <Package class="h-5 w-5" />
    <span>Products</span>
  </a>

  <!-- Products Page Contextual Actions -->
  {#if isProductsPage}
    <div
      class="flex items-center justify-around flex-1 border-x border-border/50"
    >
      <button
        type="button"
        class="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors text-muted-foreground hover:text-foreground"
        onclick={() => {
          window.dispatchEvent(new CustomEvent("open-sort"));
        }}
      >
        <ArrowUpDown class="h-5 w-5" />
        <span>Sort</span>
      </button>

      <button
        type="button"
        class="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors text-muted-foreground hover:text-foreground"
        onclick={() => {
          window.dispatchEvent(new CustomEvent("open-filters"));
        }}
      >
        <SlidersHorizontal class="h-5 w-5" />
        <span>Filter</span>
      </button>
    </div>
  {/if}

  <!-- More Drawer -->
  <Drawer.Root bind:open={drawerOpen}>
    <Drawer.Trigger
      class="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium text-muted-foreground hover:text-foreground"
    >
      <MoreHorizontal class="h-5 w-5" />
      <span>More</span>
    </Drawer.Trigger>
    <Drawer.Content>
      <div class="mx-auto w-full max-w-sm px-6 py-8">
        <Drawer.Header class="px-0 pt-0">
          <Drawer.Title>Navigation</Drawer.Title>
          <Drawer.Description>Quick access to other pages</Drawer.Description>
        </Drawer.Header>
        <div class="grid grid-cols-2 gap-4 py-6">
          {#each navLinks as link}
            <a
              href={link.href}
              onclick={() => (drawerOpen = false)}
              class="flex flex-col items-center gap-2 rounded-xl border border-border p-4 transition-colors hover:bg-accent"
            >
              <link.icon class="h-6 w-6 text-primary" />
              <span class="text-sm font-medium">{link.name}</span>
            </a>
          {/each}
          <a
            href="/account"
            onclick={() => (drawerOpen = false)}
            class="flex flex-col items-center gap-2 rounded-xl border border-border p-4 transition-colors hover:bg-accent"
          >
            <UserIcon class="h-6 w-6 text-primary" />
            <span class="text-sm font-medium">Account</span>
          </a>
          <a
            href="/cart"
            onclick={() => (drawerOpen = false)}
            class="flex flex-col items-center gap-2 rounded-xl border border-border p-4 transition-colors hover:bg-accent"
          >
            <ShoppingCart class="h-6 w-6 text-primary" />
            <span class="text-sm font-medium">Cart</span>
          </a>
        </div>
        <Drawer.Footer class="px-0 pb-0 pt-4">
          <Button variant="outline" onclick={() => (drawerOpen = false)}
            >Close</Button
          >
        </Drawer.Footer>
      </div>
    </Drawer.Content>
  </Drawer.Root>
</div>
