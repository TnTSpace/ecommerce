<!--
	Installed from github/TnTSpace/registry
-->

<script lang="ts">
	import { onMount } from 'svelte';
	import './reveal-presentation.css';
	import RevealPresentation from './reveal-presentation.svelte';
	import type { iPresentation } from './types';
	import Reveal from 'reveal.js';

	interface Props {
		presentations: iPresentation[];
	}

	let { presentations }: Props = $props();

	onMount(() => {
		let deck: Reveal.Api = new Reveal();

		deck.initialize({
			autoAnimateEasing: 'ease',
			autoAnimateDuration: 0.2,
			autoAnimateUnmatched: true,
			hash: true,
			controls: true,
			progress: true,
			embedded: true,
			// @ts-ignore
			scrollActivationWidth: null,
			loop: true,
			autoSlide: 5000
		});

		deck.on('ready', (event) => {
			console.log('sliders are ready');
		});
	});
</script>

<div class="reveal aspect-video overflow-hidden md:aspect-[16/6] md:rounded-lg">
	<div class="slides">
		<RevealPresentation {presentations} />
	</div>
</div>
