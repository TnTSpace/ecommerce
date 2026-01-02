<script lang="ts">
	import { cn } from "$lib/utils";

  interface Props {
    class?: string
  }

  let { class: className }: Props = $props()
</script>

<svg class={cn("size-10", className)} id="flag-icons-ng" viewBox="0 0 640 480"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#008753" d="M426.6 0H640v480H426.6zM0 0h213.3v480H0z"/></g></svg>