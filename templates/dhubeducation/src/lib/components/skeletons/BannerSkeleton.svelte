<script lang="ts">
	import { Skeleton } from "../ui/skeleton";


</script>

<div class="md:!py-0 md:center">
	<div class="relative hidden grid-cols-2 gap-4 overflow-hidden md:grid">
    <Skeleton class="w-full aspect-video" />
    <Skeleton class="w-full aspect-video" />
	</div>

  <Skeleton class="w-full aspect-video md:hidden" />
</div>