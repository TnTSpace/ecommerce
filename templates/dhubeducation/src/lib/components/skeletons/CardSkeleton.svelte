<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Card } from '$lib/components/ui/card';
	import { cn } from '$lib/utils';

  interface Props {
    class?: string
  }

  let { class: className }: Props = $props()
</script>
<div class={cn("grid grid-cols-1 gap-4 text-center md:grid-cols-2 lg:grid-cols-3 w-full", className)}>
  {#each [1,2,3] as _, i}
  <Card class="flex flex-col gap-2 items-stretch rounded-lg dark:bg-secondary w-full">
    <Skeleton class="aspect-video rounded-l-lg" />
    <div class="flex flex-col items-start justify-between p-2 w-full">
      <div class="space-y-2 text-start">
        <Skeleton class="h-4 w-3/4" />
        <div class="flex flex-col gap-1">
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-4 w-3/4" />
        </div>
      </div>
      <Skeleton class="h-4 w-[120px] self-end" />
    </div>
  </Card>
  {/each}
</div>