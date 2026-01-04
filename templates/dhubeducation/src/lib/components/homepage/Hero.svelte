<script lang="ts">
	import { imageSrcSet } from '$lib/constants';
	import { Button } from '../ui/button';
	import type { iCampaign, iFile } from '$lib/interface';

	interface Props {
		campaigns: iCampaign[];
	}

	let { campaigns }: Props = $props();

	let isComing = $derived(Date.now() < +new Date(campaigns[0].startDate));

	const firstCampaign = campaigns[0];

	const href = firstCampaign
		? `/campaigns/${firstCampaign.xata_id}`
		: '/campaigns/rec_cvr7r14ejr3f39cfqc90';
	const src =
		firstCampaign && firstCampaign.file
			? (firstCampaign.file as iFile).url + imageSrcSet
			: `https://ik.imagekit.io/7wgh8xbqy/study-abroad-connect_1920x1080_HH1qes_R6.webp${imageSrcSet}`;
</script>

<div class="md:!py-0 md:center">
	<div class="relative hidden grid-cols-2 gap-4 overflow-hidden md:grid">
		<Button
			href="/about"
			variant="ghost"
			class="relative aspect-video h-auto w-full hover:bg-transparent"
		>
			<img
				src="/uploads/slides/homepage/dhub_1600x900.webp{imageSrcSet}"
				alt="DHUB Education"
				loading="eager"
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
			/>
		</Button>
		{#if isComing}
			<Button
				{href}
				variant="ghost"
				class="relative aspect-video h-auto w-full hover:bg-transparent"
			>
				<img
					{src}
					alt={firstCampaign.title}
					loading="eager"
					class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
				/>
			</Button>
		{:else}
			<iframe
				class="aspect-video w-full rounded-lg"
				src="https://firebasestorage.googleapis.com/v0/b/dhub-education.appspot.com/o/DhubEducation.mp4?alt=media&token=ec9f0bf7-f970-4d2d-b74a-1dc2882c0d63"
				frameborder="0"
				title="dhub"
			></iframe>
		{/if}
	</div>

	{#if isComing}
		<Button
			{href}
			variant="ghost"
			class="relative !mt-0 aspect-video h-auto w-full rounded-none p-0 hover:bg-transparent md:hidden md:rounded-md"
		>
			<img
				{src}
				alt={firstCampaign.title}
				loading="eager"
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
			/>
		</Button>
	{:else}
		<iframe
			class="aspect-video w-full md:hidden"
			src="https://firebasestorage.googleapis.com/v0/b/dhub-education.appspot.com/o/DhubEducation.mp4?alt=media&token=ec9f0bf7-f970-4d2d-b74a-1dc2882c0d63"
			frameborder="0"
			title="dhub"
		></iframe>
	{/if}
</div>
