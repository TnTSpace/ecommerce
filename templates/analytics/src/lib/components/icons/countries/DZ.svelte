<script lang="ts">
	import { cn } from "$lib/utils";

  interface Props {
    class?: string
  }

  let { class: className }: Props = $props()
</script>

<svg class={cn("size-10", className)} id="flag-icons-dz" viewBox="0 0 640 480"><path fill="#fff" d="M320 0h320v480H320z"/><path fill="#006233" d="M0 0h320v480H0z"/><path fill="#d21034" d="M424 180a120 120 0 1 0 0 120 96 96 0 1 1 0-120m4 60-108-35.2 67.2 92V183.2l-67.2 92z"/></svg>