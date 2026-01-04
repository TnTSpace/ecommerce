<script lang="ts">
	import type { ReferralInterface, iRefereeData, RefereeInterface } from '$lib/interface'; 
	import RefereeListItemAction from './RefereeListItemAction.svelte';
	import Flag from '$lib/components/ui/country-selector/country-flag.svelte';
	import { normalizedCountries } from 'svelte-tel-input';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import { getRefereeData } from '$lib/fxns';

	interface Props {
		index: number;
		referee: RefereeInterface;
		referral?: ReferralInterface
	}

	let { referee, index, referral }: Props = $props();

	let open = $state(false);

	const { name, data } = referee;
	const refereeData = getRefereeData(data as string);
	const { courseName, course, country } = refereeData;

	let selectedCountry = $derived(normalizedCountries.find((a) => a.iso2 == country));

  $effect(() => console.log({ selectedCountry, country, refereeData }))
</script>

<div class={cn(buttonVariants({ variant: "outline" }), "grid grid-cols-1 md:grid-cols-[40px_1fr_1fr_1fr_40px] justify-start items-center gap-4 border-b w-full md:px-0 h-auto")}>
	<p class="size-10 flex items-center justify-center">{index}</p>
	<p class="line-clamp-1">{name}</p>
	<div class="items-center gap-1 flex">
		<Flag country={selectedCountry} />
		<span class="text-muted-foreground">{selectedCountry?.name}</span>
	</div>
	<div class="flex items-baseline gap-1">
		<span class="text-muted-foreground">{course}</span>
		<p>{courseName}</p>
	</div>
	<RefereeListItemAction {referee} {referral} class="md:ml-auto" />
</div>
