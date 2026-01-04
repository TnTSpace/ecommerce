<script lang="ts">
	import Header from '$lib/components/sections/Header.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	import type { iCampaign, iUser } from '$lib/interface';
	import BottomNav from '$lib/components/widgets/BottomNav.svelte';
	import type { LayoutData } from './$types';
	import { setContext, type Snippet } from 'svelte';
	import { metaStore } from '$lib/stores';
	import Dialogs from '$lib/components/widgets/Dialogs.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	let me = data.me as iUser;

	setContext('me', me);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{$metaStore.title}</title>
	<meta name="title" content={$metaStore.title} />
	<meta name="description" content={$metaStore.description} />
	<meta name="keywords" content={$metaStore.keywords.join(', ')} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$metaStore.link} />
	<meta property="og:title" content={$metaStore.title} />
	<meta property="og:description" content={$metaStore.description} />
	<meta property="og:image" content={$metaStore.ogimage} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$metaStore.link} />
	<meta property="twitter:title" content={$metaStore.title} />
	<meta property="twitter:description" content={$metaStore.description} />
	<meta property="twitter:image" content={$metaStore.ogimage} />
</svelte:head>
<div class="bg-body dark:bg-background">
	<Header />
	<div>
		{@render children()}
	</div>
	<Footer />
</div>
<BottomNav />

{#await data.getCampaigns}
	<!-- promise is pending -->
{:then result}
	{@const campaigns = result.data as iCampaign[]}
	<Dialogs {campaigns} />
{:catch error}
	<!-- promise was rejected -->
{/await}
