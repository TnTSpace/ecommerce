<script lang="ts">
  import { cn } from "$lib/utils.js";
</script>

<div
  class="relative overflow-hidden rounded-xl border-none bg-white/70 shadow-sm backdrop-blur-md dark:bg-white/5 p-4 md:p-6"
>
  <div class="flex flex-col gap-6 md:flex-row">
    <!-- Image Skeleton -->
    <div
      class="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 animate-pulse dark:bg-slate-900 md:h-32 md:w-32"
    ></div>

    <!-- Details Skeleton -->
    <div class="flex flex-1 flex-col justify-between py-1 space-y-4">
      <div class="space-y-2">
        <div class="flex items-start justify-between gap-4">
          <div
            class="h-6 w-2/3 bg-slate-200 animate-pulse rounded dark:bg-slate-800"
          ></div>
          <div
            class="h-6 w-24 bg-slate-200 animate-pulse rounded dark:bg-slate-800"
          ></div>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <div
            class="h-5 w-20 bg-slate-200 animate-pulse rounded dark:bg-slate-800"
          ></div>
          <div
            class="h-5 w-16 bg-slate-200 animate-pulse rounded dark:bg-slate-800"
          ></div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between">
        <!-- Quantity Controls Skeleton -->
        <div
          class="h-10 w-32 bg-slate-100 animate-pulse rounded-full dark:bg-slate-900"
        ></div>

        <!-- Actions Skeleton -->
        <div class="flex items-center gap-6">
          <div
            class="h-10 w-10 bg-slate-100 animate-pulse rounded-full dark:bg-slate-900"
          ></div>
        </div>
      </div>
    </div>
  </div>
</div>
