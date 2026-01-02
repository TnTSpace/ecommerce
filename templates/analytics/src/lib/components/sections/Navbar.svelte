<script lang="ts">
	import type { iGoogleUser } from '$lib/interface';
	import Logo from '../icons/Logo.svelte';
	import ModeToggle from '../ui/mode-toggle/mode-toggle.svelte';
	import AuthDialog from './AuthDialog.svelte';
	import Navigation from './Navigation.svelte';

	interface Props {
		user?: iGoogleUser;
	}

	let { user }: Props = $props();

	const navIcons = [
		{
			Icon: ModeToggle
		}
	];
</script>

<header class="sticky left-0 top-8 z-[2] w-full bg-white shadow-jumia dark:bg-secondary">
	<nav class="flex h-14 w-full items-center justify-between p-4 md:center md:px-0">
		<Logo />
		<div class="flex items-center gap-4">
			<Navigation class="hidden md:flex" />
			<div class="flex items-center gap-2">
				{#each navIcons as { Icon }, i}
					<Icon />
				{/each}
				<AuthDialog {user} />
			</div>
		</div>
	</nav>
</header>
