<script lang="ts">
	import { cn } from "$lib/utils";


  interface Props {
    class?: string;
    name: string;
  }

  let { class: className, name }: Props = $props()

  const defaultClass = "bg-jumiaglobal text-white dark:bg-white dark:text-jumiaglobal rounded font-medium flex items-center justify-center"

</script>
<div class={cn(defaultClass, className)}>{name}</div>