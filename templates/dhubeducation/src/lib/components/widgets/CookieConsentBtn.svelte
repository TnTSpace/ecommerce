<script lang="ts">
	// import { config, run, showPreferences } from "$lib/common/cookieconsent-config";
	import * as CookieConsent from 'vanilla-cookieconsent';

	import { onMount } from "svelte";
  import 'vanilla-cookieconsent/dist/cookieconsent.css'
	import Cookie from "$lib/components/icons/Cookie.svelte";
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import config from '$lib/common/cookieconsent-config';

  interface Props {
    class?: string;
  }

  let { class: className }: Props = $props()

	onMount(() => {
		CookieConsent.run(config);
	});

</script>


<Button aria-label="Cookie Consent Button" class={cn("fixed right-2 bottom-28 lg:bottom-14", className)} onclick={CookieConsent.showPreferences} size="icon">
  <Cookie />
</Button>