<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
  import { cn } from "$lib/utils.js";

  let { class: className = "" } = $props();
</script>

<aside class={cn("flex flex-col gap-8", className)}>
  <div class="flex items-center justify-between">
    <Skeleton class="h-8 w-24" />
  </div>

  <!-- Category Filter Skeleton -->
  <div class="flex flex-col gap-3">
    <Skeleton class="h-4 w-20" />
    <Skeleton class="h-11 w-full rounded-xl" />
  </div>

  <!-- Tag Filter Skeleton -->
  <div class="flex flex-col gap-3">
    <Skeleton class="h-4 w-12" />
    <Skeleton class="h-11 w-full rounded-xl" />
  </div>

  <!-- Brand Filter Skeleton -->
  <div class="flex flex-col gap-3">
    <Skeleton class="h-4 w-16" />
    <Skeleton class="h-11 w-full rounded-xl" />
  </div>

  <!-- Price Slider Skeleton -->
  <div class="flex flex-col gap-5">
    <Skeleton class="h-4 w-24" />
    <div class="px-2">
      <Skeleton class="h-2 w-full rounded-full py-2" />
    </div>
    <div class="flex items-center gap-2">
      <Skeleton class="h-10 flex-1 rounded-xl" />
      <Skeleton class="h-px w-2" />
      <Skeleton class="h-10 flex-1 rounded-xl" />
    </div>
  </div>

  <!-- Rating Radio Skeleton -->
  <div class="flex flex-col gap-4">
    <Skeleton class="h-4 w-16" />
    <div class="space-y-3">
      {#each Array(4) as _}
        <div class="flex items-center gap-2">
          <Skeleton class="h-4 w-4 rounded-full" />
          <Skeleton class="h-4 w-32" />
        </div>
      {/each}
    </div>
  </div>

  <!-- Express Toggle Skeleton -->
  <div class="flex flex-col gap-4">
    <Skeleton class="h-4 w-32" />
    <Skeleton class="h-12 w-full rounded-xl" />
  </div>
</aside>
