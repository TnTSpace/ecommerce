
<script lang="ts">
	import Flag from "$lib/components/ui/phone-input/flag.svelte";
	import { normalizedCountries } from "svelte-tel-input";

  interface Props {
    referee: any
  }

  let { referee }: Props = $props()
	const { country } = referee;

	let selectedCountry = $derived(normalizedCountries.find((a) => a.iso2 == country));
	</script>

<div class="items-center gap-1 flex">
  <Flag country={selectedCountry} />
  <span class="text-muted-foreground">{selectedCountry?.name}</span>
</div>