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
  } from "@lucide/svelte";
    import type { User } from "$lib/auth";

  let { children, data }: LayoutProps = $props();

  let searchQuery = $state("");
  let mobileMenuOpen = $state(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package },
    { name: "Categories", href: "/categories", icon: Store },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const user = page.data.user as User

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

  // Mock cart count - will be replaced with real data
  const cartCount = 0;
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
              <Button variant="ghost" size="icon">
                <UserIcon class="h-5 w-5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              {#if data?.user}
              
                <DropdownMenu.Label class="p-0 font-normal">
                  <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar.Root class="size-8 rounded-lg">
                      <Avatar.Image src={user.image} alt={user.name} />
                      <Avatar.Fallback class="rounded-lg uppercase">{user.name.slice(0, 2)}</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                      <span class="truncate font-medium">{user.name}</span>
                      <span class="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onclick={() => location.href="/account"}>My Account</DropdownMenu.Item
                >
                <DropdownMenu.Item onclick={() => location.href="/account/orders"}
                  >Orders</DropdownMenu.Item
                >
                <DropdownMenu.Separator />
                <DropdownMenu.Item onclick={() => location.href="/auth/logout"}>Logout</DropdownMenu.Item
                >
              {:else}
                <DropdownMenu.Item onclick={() => location.href="/auth/login"}>Login</DropdownMenu.Item>
                <DropdownMenu.Item onclick={() => location.href="/auth/register"}
                  >Register</DropdownMenu.Item
                >
              {/if}
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          <!-- Mobile Menu -->
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
  </header>

  <!-- Main Content -->
  <main class="min-h-[calc(100vh-4rem)]">
    {@render children()}
  </main>

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
