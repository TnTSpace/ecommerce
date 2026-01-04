<!--
	Installed from github/ieedan/shadcn-svelte-extras
-->

<script lang="ts">
	import * as Popover from '../popover';
	import { Button } from '../button';
	import * as Command from '../command';
	import { ScrollArea } from '../scroll-area';
	import { Check, ChevronsUpDown } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import Flag from './country-flag.svelte';
	import type { Country, CountryCode } from 'svelte-tel-input/types';
	import { normalizedCountries } from 'svelte-tel-input';

	interface Props {
		/** List of countries */
		disabled?: boolean;
		selected?: CountryCode | null | string;
		onselect?: (val: CountryCode | null | string) => void;
		/** Default ordering is alphabetical by country name supply this function to customize the sorting behavior  */
		order?: (a: Country, b: Country) => number;
	}

	let {
		disabled = false,
		selected = $bindable(null),
		onselect = undefined,
		order = (a, b) => {
			return a.name.localeCompare(b.name);
		}
	}: Props = $props();

	let selectedCountry = $derived(normalizedCountries.find((a) => a.iso2 == selected));

	let open = $state(false);

	const selectCountry = (country: Country) => {
		selected = country.iso2;
		open = false;
		onselect?.(selected);
	};
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				type="button"
				variant="outline"
				class={cn('flex shrink-0 gap-1 rounded-s-lg px-3 w-full')}
				{disabled}
				{...props}
			>
				<Flag country={selectedCountry} />
				{selectedCountry?.name ?? 'Select Country'}
				<ChevronsUpDown
					class={cn('-mr-2 h-4 w-4 opacity-50', disabled ? 'hidden' : 'opacity-100')}
				/>
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[300px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search country..." />
			<Command.List>
				<ScrollArea class="h-72">
					<Command.Empty>No country found.</Command.Empty>
					<Command.Group>
						{#each normalizedCountries.sort(order) as country (country.id)}
							<Command.Item
								class="gap-2"
								value={country.name}
								onSelect={() => selectCountry(country)}
							>
								<Flag {country} />
								<span class="flex-1 text-sm">{country.name}</span>
								<span class="text-sm text-foreground/50">
									+{country.dialCode}
								</span>
								<div class="w-4">
									{#if country.iso2 == selected}
										<Check class="size-4" />
									{/if}
								</div>
							</Command.Item>
						{/each}
					</Command.Group>
				</ScrollArea>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
