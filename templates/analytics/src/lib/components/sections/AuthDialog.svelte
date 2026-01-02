<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import type { TransitionConfig } from 'svelte/transition';
	import UserOauth from '../ui/user/user-oauth.svelte';
	import { Button } from '../ui/button';
	import { UserIcon } from 'lucide-svelte';
	import LogoIconNormal from '../icons/LogoIconMuted.svelte';
	import type { iGoogleUser } from '$lib/interface';

	interface Props {
		user: iGoogleUser | undefined
	}

	let { user }: Props = $props()

	let open = $state(false);

	const toggle = () => (open = !open)

	// Custom Svelte 5 action to detect clicks outside the node
	export function clickOutside(node: HTMLElement) {
		const handle = (e: MouseEvent) => {
			if (!node.contains(e.target as Node)) {
				open = false;
			}
		};
		document.addEventListener('click', handle, true);
		return {
			destroy() {
				document.removeEventListener('click', handle, true);
			}
		};
	}

	// Combine fly + fade into one reusable transition
	function flyFade(
		node: Element,
		params: { x?: number; y?: number; duration?: number }
	): TransitionConfig {
		const f = fly(node, params);
		const fd = fade(node, params);
		const dur = f.duration ?? fd.duration;

		return {
			...f,
			duration: dur,
			css: (t, u) => {
				const a = f.css?.(t, u) ?? '';
				const b = fd.css?.(t, u) ?? '';
				return `${a}; ${b}`;
			}
		};
	}
</script>

<Button onclick={toggle} variant="outline" class="relative rounded-full p-0" size="icon">
	{#if user}
		<img src={user.picture} alt={user.name} class="size-full rounded-full" />
	{:else}
		<UserIcon class="size-4" />
	{/if}

	{#if open && user}
		<div
			class="absolute top-0 right-0 z-[100] size-full"
			use:clickOutside
			in:flyFade={{ y: -10, duration: 150 }}
			out:flyFade={{ y: -10, duration: 150 }}>
			<UserOauth logo={LogoIconNormal} {user} class="right-0 top-[calc(100%+16px)]" />
		</div>
	{/if}
</Button>
