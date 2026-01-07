<script lang="ts">
  import { cn } from "$lib/utils.js";

  interface Props {
    viewMode?: "grid" | "list" | "box";
  }

  let { viewMode = "grid" }: Props = $props();
</script>

<div
  class={cn(
    "relative overflow-hidden bg-card rounded-xl border border-border flex flex-col",
    viewMode === "list" ? "h-auto" : "h-full",
  )}
>
  <div
    class={cn(
      "flex",
      viewMode === "list" ? "flex-row border-b border-border/50" : "flex-col",
    )}
  >
    <!-- Image Skeleton -->
    <div
      class={cn(
        "bg-muted animate-pulse",
        viewMode === "list"
          ? "w-32 sm:w-40 aspect-square"
          : "aspect-square w-full",
      )}
    ></div>

    <!-- Info Skeleton -->
    <div class="flex flex-col flex-1 p-3 sm:p-4 gap-2">
      <div class="h-4 w-1/3 bg-muted animate-pulse rounded"></div>
      <div class="h-5 w-3/4 bg-muted animate-pulse rounded mt-1"></div>
      <div class="h-6 w-1/2 bg-muted animate-pulse rounded mt-1"></div>
    </div>
  </div>
  <!-- Bottom Skeleton -->
  <div class="p-3 mt-auto">
    <div class="h-10 w-full bg-muted animate-pulse rounded-xl"></div>
  </div>
</div>
