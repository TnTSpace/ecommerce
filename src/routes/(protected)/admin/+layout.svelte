<script lang="ts">
  import type { LayoutProps } from "./$types";
  import { Breadcrumb } from "$lib/components/ui/breadcrumb";

  let { children }: LayoutProps = $props();
</script>

<div class="flex flex-1 flex-col gap-4 p-4 lg:p-8">
  {@render children()}
</div>

<style>
  main {
    padding-bottom: 5rem;
  }
  @media (min-width: 1024px) {
    main {
      padding-bottom: 0;
    }
  }
</style>
