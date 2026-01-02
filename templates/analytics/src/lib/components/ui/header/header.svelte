<script lang="ts">
	import ModeToggle from '../mode-toggle/mode-toggle.svelte';
	import Navigation from '../navigation/navigation.svelte';
	import User from '../user/user.svelte';
	import Wrap from '../wrap/wrap.svelte';

	interface Props {
		logo: any;
	}
	let { logo: Brand }: Props = $props();
</script>

<Wrap class="sticky left-0 top-0 z-[50] bg-white shadow-lg dark:bg-secondary">
	<div class="relative flex h-14 items-center justify-between">
		<Brand />
		<div class="flex items-center gap-2">
			<Navigation class="hidden md:flex" />
			<div class="flex items-center gap-2 space-x-1">
				<ModeToggle />
				<User />
			</div>
		</div>
	</div>
</Wrap>
