<script lang="ts">
	import { cn } from "$lib/utils.js";

  interface Props {
    class?: string
  }

  let { class: className }: Props = $props()
</script>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class={cn("size-4", className)}><path d="M13 20H11V13H4V20H2V4H4V11H11V4H13V20ZM21.0005 8V20H19.0005L19 10.204L17 10.74V8.67L19.5005 8H21.0005Z"></path></svg>