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
    LayoutDashboard,
    History,
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

  const toggleSort = () => {
    window.dispatchEvent(new CustomEvent("open-sort"));
  };

  const toggleFilters = () => {
    window.dispatchEvent(new CustomEvent("open-filters"));
  };
</script>

<div
  class="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-2 border-t border-border bg-card pb-safe lg:hidden"
>
  <!-- Home -->
  <a
    href="/"
    class="flex flex-1 flex-col items-center gap-1 py-1 text-[10px] font-medium transition-colors {isActive(
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
    class="flex flex-1 flex-col items-center gap-1 py-1 text-[10px] font-bold transition-colors {isActive(
      '/products',
    )
      ? 'text-primary'
      : 'text-muted-foreground'}"
  >
    <Package class="h-5 w-5" />
    <span>Products</span>
  </a>

  <!-- Sort (Products Page only) -->
  {#if isProductsPage}
    <button
      onclick={toggleSort}
      class="flex flex-1 flex-col items-center gap-1 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors"
    >
      <ArrowUpDown class="h-5 w-5" />
      <span>Sort</span>
    </button>
  {/if}

  <!-- Filter (Products Page only) -->
  {#if isProductsPage}
    <button
      onclick={toggleFilters}
      class="flex flex-1 flex-col items-center gap-1 py-1 text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors"
    >
      <SlidersHorizontal class="h-5 w-5" />
      <span>Filter</span>
    </button>
  {/if}

  <!-- More Drawer -->
  <div class="flex flex-1 justify-center">
    <Drawer.Root bind:open={drawerOpen}>
      <Drawer.Trigger
        class="flex flex-col items-center gap-1 py-1 text-[10px] font-medium text-muted-foreground hover:text-foreground"
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

            {#if page.data.user?.role === "admin"}
              <a
                href="/admin"
                onclick={() => (drawerOpen = false)}
                class="flex flex-col items-center gap-2 rounded-xl border border-border p-4 transition-colors hover:bg-accent"
              >
                <LayoutDashboard class="h-6 w-6 text-primary" />
                <span class="text-sm font-medium text-primary font-bold"
                  >Admin</span
                >
              </a>
            {/if}

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
            <a
              href="/orders"
              onclick={() => (drawerOpen = false)}
              class="flex flex-col items-center gap-2 rounded-xl border border-border p-4 transition-colors hover:bg-accent"
            >
              <History class="h-6 w-6 text-primary" />
              <span class="text-sm font-medium">Orders</span>
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
</div>
