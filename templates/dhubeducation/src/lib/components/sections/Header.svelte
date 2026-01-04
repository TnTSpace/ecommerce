<script lang="ts">
	import ModeToggle from '$lib/components/widgets/ModeToggle.svelte';
	import Brand from '$lib/components/sections/Brand.svelte';
	import ContactTop from '$lib/components/sections/ContactTop.svelte';
	import Navigation from '$lib/components/sections/Navigation.svelte';
	import User from '../widgets/User.svelte';
</script>

<div class="sticky left-0 top-0 z-[49] bg-white dark:bg-secondary">
	<ContactTop />
	<div class="relative flex items-center justify-between center">
		<Brand />
		<div class="flex items-center gap-4">
			<Navigation />
			<div class="space-x-1 flex items-center gap-2">
				<ModeToggle />
				<User />
			</div>
		</div>
	</div>
</div>
