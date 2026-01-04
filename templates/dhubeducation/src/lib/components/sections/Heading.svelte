<script lang="ts">
	import { cn } from "$lib/utils";

  interface Props {
    title: string;
    description: string;
    class?: string
  }

  let { title, description, class: className }: Props = $props()
</script>

<div class={cn("text-center sm:text-start", className)}>
  <h2 class="text-2xl font-medium">{title}</h2>
  <p class="text-sm text-muted-foreground">{description}</p>
</div>