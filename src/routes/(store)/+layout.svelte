<script lang="ts">
  import type { LayoutProps } from "./$types";
  import BrandLink from "$lib/components/widgets/BrandLink.svelte";
  import Header from "$lib/components/sections/header.svelte";

  import BottomNav from "$lib/components/widgets/BottomNav.svelte";

  let { children, data }: LayoutProps = $props();

  let searchQuery = $state("");

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };
</script>

<div class="min-h-screen bg-background text-foreground">
  <Header />

  <!-- Main Content -->
  <main class="min-h-[calc(100vh-4rem)] pb-16 lg:pb-0">
    {@render children()}
  </main>

  <BottomNav />

  <!-- Footer -->
  <footer class="border-t border-border bg-card">
    <div class="center mx-auto max-w-7xl px-4 py-12">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <BrandLink />
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
