<script lang="ts">
	import WhatsApp from "$lib/components/icons/WhatsApp.svelte";
  import { Button } from "$lib/components/ui/button";
	import { createWhatsAppUrl } from "$lib/fxns";

  const href = createWhatsAppUrl('Hello')

</script>

<Button aria-label="WhatsApp Contact Button" variant="ghost" size="icon" {href} class="fixed bottom-16 lg:bottom-2 right-2 hover:bg-transparent !p-0">
  <WhatsApp class="!size-10" />
</Button>