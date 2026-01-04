<script lang="ts">
  import type { LayoutProps } from "./$types";
  import BrandLink from "$lib/components/widgets/BrandLink.svelte";
  import Header from "$lib/components/sections/header.svelte";
  import Footer from "$lib/components/sections/footer.svelte";

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

  <Footer />
</div>
