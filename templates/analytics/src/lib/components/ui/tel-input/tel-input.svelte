<script lang="ts">
	import type { CountryCode } from 'svelte-tel-input/types';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { normalizedCountries, TelInput } from 'svelte-tel-input';
	import 'svelte-tel-input/styles/flags.css';
	import CountrySelector from '../phone-input/country-selector.svelte';
	import { defaultOptions, type Props } from '../phone-input';
	import { cn } from '../../../utils/index';

	let {
		class: className = undefined,
		defaultCountry = null,
		country = $bindable(defaultCountry),
		onValueChange,
		options = defaultOptions,
		placeholder = $bindable(undefined),
		readonly = $bindable(false),
		disabled = $bindable(false),
		value = $bindable(null),
		valid = $bindable(false),
		detailedValue = $bindable(),
		order = undefined,
		name = undefined,
		...rest
	}: Props = $props();

	let selectedCountry = $state<CountryCode | null>(null);
	// let value = $state<E164Number | null>(null);

	let el: HTMLInputElement | undefined = $state();

	export const focus = () => {
		// sort of an after update kinda thing
		setTimeout(() => {
			el?.focus();
		}, 0);
	};

	const countries = normalizedCountries;

	$effect(() => {
		onValueChange?.(value as string);
		console.log({ value });
	});
</script>

<div class="flex rounded-lg shadow-sm shadow-black/[.04]">
	<CountrySelector {order} {countries} bind:selected={country} onselect={focus} />
	<TelInput
		bind:el
		required
		placeholder="Enter phone number"
		class={cn(
			'-ml-px flex h-10 w-full rounded-lg rounded-l-none border border-input bg-background px-3 py-2 text-sm text-foreground shadow-none shadow-black/[.04] ring-offset-background transition-shadow placeholder:text-muted-foreground/70 focus-visible:z-10 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		bind:country={selectedCountry}
		bind:value
		options={{
			format: 'international'
		}}
	/>
</div>
