<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Modal from '$lib/components/widgets/Modal.svelte';
	import { Toaster } from 'svelte-sonner';
	import Navbar from '$lib/components/sections/Navbar.svelte';
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import BottomNav from '$lib/components/widgets/BottomNav.svelte';
	import StatusBar from '$lib/components/widgets/StatusBar.svelte';

	let { children, data }: { data: LayoutData; children: Snippet } = $props();

</script>

<main class="max-w-10xl mx-auto flex flex-col pb-16">
	<StatusBar />
	<Navbar user={data.user} />
	{@render children()}
</main>

<ModeWatcher />
<Modal />
<Toaster richColors position="top-center" />
<BottomNav />
