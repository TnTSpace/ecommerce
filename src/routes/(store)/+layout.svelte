<script lang="ts">
  import type { LayoutProps } from "./$types";
  import { page } from "$app/state";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import ModeToggle from "$lib/components/widgets/ModeToggle.svelte";
  import {
    Search,
    ShoppingCart,
    Menu,
    User as UserIcon,
    Heart,
    Store,
    Home,
    Package,
    Phone,
    MoreHorizontal,
    SlidersHorizontal,
    Info,
    Database,
  } from "@lucide/svelte";
  import type { User } from "$lib/auth";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { cart } from "$lib/store/cart.svelte";

  let { children, data }: LayoutProps = $props();

  let searchQuery = $state("");
  let mobileMenuOpen = $state(false);
  let drawerOpen = $state(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Categories", href: "/categories", icon: Store },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const user = page.data.user as User;

  const isActive = (href: string) => {
    const pathname = page.url.pathname;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Use real cart store
  const cartCount = $derived(cart.count);
</script>

<div class="min-h-screen bg-background">
  <!-- Header -->
  <header
    class="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm"
  >
    <div class="container mx-auto max-w-7xl px-4">
      <div class="flex h-16 items-center justify-between gap-4">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
          >
            <Store class="h-4 w-4 text-primary-foreground" />
          </div>
          <span class="hidden font-bold text-foreground sm:inline">Store</span>
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden items-center gap-6 lg:flex">
          {#each navLinks as link}
            <a
              href={link.href}
              class="text-sm font-medium transition-colors {isActive(link.href)
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'}"
            >
              {link.name}
            </a>
          {/each}
        </nav>

        <!-- Search -->
        <form onsubmit={handleSearch} class="hidden flex-1 max-w-md lg:flex">
          <div class="relative w-full">
            <Search
              class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search products..."
              class="pl-9"
              bind:value={searchQuery}
            />
          </div>
        </form>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            class="hidden sm:flex"
            href="/wishlist"
          >
            <Heart class="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" class="relative" href="/cart">
            <ShoppingCart class="h-5 w-5" />
            {#if cartCount > 0}
              <span
                class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
              >
                {cartCount}
              </span>
            {/if}
          </Button>

          <ModeToggle />

          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button
                variant="ghost"
                size="icon"
                class="rounded-full overflow-hidden"
              >
                {#if data?.user}
                  <Avatar.Root class="size-7">
                    <Avatar.Image src={user.image} alt={user.name} />
                    <Avatar.Fallback class="text-[10px] font-bold uppercase"
                      >{user.name.slice(0, 2)}</Avatar.Fallback
                    >
                  </Avatar.Root>
                {:else}
                  <UserIcon class="h-5 w-5" />
                {/if}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              {#if data?.user}
                <DropdownMenu.Label class="p-0 font-normal">
                  <div
                    class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"
                  >
                    <Avatar.Root class="size-8 rounded-lg">
                      <Avatar.Image src={user.image} alt={user.name} />
                      <Avatar.Fallback class="rounded-lg uppercase"
                        >{user.name.slice(0, 2)}</Avatar.Fallback
                      >
                    </Avatar.Root>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-medium">{user.name}</span>
                      <span class="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onclick={() => (location.href = "/profile")}>
                  Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onclick={() => (location.href = "/order/history")}
                >
                  My Orders
                </DropdownMenu.Item>
                {#if user.role === "admin"}
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item onclick={() => (location.href = "/admin")}>
                    Admin Dashboard
                  </DropdownMenu.Item>
                {/if}
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  onclick={() => (location.href = "/auth/logout")}
                >
                  Logout
                </DropdownMenu.Item>
              {:else}
                <DropdownMenu.Item onclick={() => (location.href = "/login")}
                  >Login</DropdownMenu.Item
                >
                <DropdownMenu.Item onclick={() => (location.href = "/register")}
                  >Register</DropdownMenu.Item
                >
              {/if}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <!-- Mobile Menu - Hidden as per user request (switched to bottom nav) -->
          <div class="hidden">
            <Sheet.Root bind:open={mobileMenuOpen}>
              <Sheet.Trigger>
                <Button variant="ghost" size="icon" class="lg:hidden">
                  <Menu class="h-5 w-5" />
                </Button>
              </Sheet.Trigger>
              <Sheet.Content side="left">
                <Sheet.Header>
                  <Sheet.Title>Menu</Sheet.Title>
                </Sheet.Header>
                <div class="mt-6 space-y-4">
                  <!-- Mobile Search -->
                  <form onsubmit={handleSearch}>
                    <div class="relative">
                      <Search
                        class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      />
                      <Input
                        type="search"
                        placeholder="Search..."
                        class="pl-9"
                        bind:value={searchQuery}
                      />
                    </div>
                  </form>

                  <!-- Mobile Nav -->
                  <nav class="space-y-1">
                    {#each navLinks as link}
                      <a
                        href={link.href}
                        class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors {isActive(
                          link.href,
                        )
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}"
                        onclick={() => (mobileMenuOpen = false)}
                      >
                        <link.icon class="h-4 w-4" />
                        {link.name}
                      </a>
                    {/each}
                  </nav>
                </div>
              </Sheet.Content>
            </Sheet.Root>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="min-h-[calc(100vh-4rem)] pb-16 lg:pb-0">
    {@render children()}
  </main>

  <!-- Mobile Bottom Navigation -->
  <div
    class="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-card pb-safe lg:hidden"
  >
    <!-- About -->
    <a
      href="/about"
      class="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors {isActive(
        '/about',
      )
        ? 'text-primary'
        : 'text-muted-foreground'}"
    >
      <Home class="h-5 w-5" />
      <span>About</span>
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

    <!-- Filter -->
    <button
      type="button"
      class="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors text-muted-foreground hover:text-foreground"
      onclick={() => {
        if (isActive("/products")) {
          window.dispatchEvent(new CustomEvent("open-filters"));
        } else {
          window.location.href = "/products";
        }
      }}
    >
      <SlidersHorizontal class="h-5 w-5" />
      <span>Filter</span>
    </button>

    <!-- Menu -->
    <button
      type="button"
      class="flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors text-muted-foreground hover:text-foreground"
      onclick={() => (mobileMenuOpen = true)}
    >
      <Menu class="h-5 w-5" />
      <span>Menu</span>
    </button>

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

  <!-- Footer -->
  <footer class="border-t border-border bg-card">
    <div class="container mx-auto max-w-7xl px-4 py-12">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div class="flex items-center gap-2">
            <div
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
            >
              <Store class="h-4 w-4 text-primary-foreground" />
            </div>
            <span class="font-bold text-foreground">Store</span>
          </div>
          <p class="mt-4 text-sm text-muted-foreground">
            Your one-stop shop for quality products at great prices.
          </p>
        </div>
        <div>
          <h4 class="font-medium text-foreground">Shop</h4>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="/products" class="hover:text-foreground">All Products</a>
            </li>
            <li>
              <a href="/categories" class="hover:text-foreground">Categories</a>
            </li>
            <li>
              <a href="/products?featured=true" class="hover:text-foreground"
                >Featured</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium text-foreground">Account</h4>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="/account" class="hover:text-foreground">My Account</a>
            </li>
            <li>
              <a href="/account/orders" class="hover:text-foreground">Orders</a>
            </li>
            <li><a href="/cart" class="hover:text-foreground">Cart</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium text-foreground">Support</h4>
          <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="/contact" class="hover:text-foreground">Contact Us</a>
            </li>
            <li><a href="/faq" class="hover:text-foreground">FAQ</a></li>
            <li>
              <a href="/shipping" class="hover:text-foreground">Shipping Info</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div
        class="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground"
      >
        <p>&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>
