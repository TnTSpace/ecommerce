<script lang="ts">
	import { cn } from "$lib/utils";

  interface Props {
    class?: string
  }

  let { class: className }: Props = $props()
</script>

<svg class={cn("size-10", className)} id="flag-icons-ma" viewBox="0 0 640 480"><path fill="#c1272d" d="M640 0H0v480h640z"/><path fill="none" stroke="#006233" stroke-width="11.7" d="M320 179.4 284.4 289l93.2-67.6H262.4l93.2 67.6z"/></svg>