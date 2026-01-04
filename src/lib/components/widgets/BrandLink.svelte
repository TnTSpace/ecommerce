<script lang="ts">
  import Logo from "$lib/components/icons/logo.svelte";
  import { Constants } from "$lib/constants/index";
</script>

<a href="/" rel="prefetch" aria-label="logo" class="flex items-center gap-2">
  <Logo class="size-8" />
  <div class="mt-2">
    <span class="font-bold text-lg block leading-[1] capitalize -mb-2"
      >{Constants.BRANDNAME}</span
    >
    <span
      class="text-[10px] text-muted-foreground leading-[1] uppercase font-bold"
      >{Constants.TAGLINE}</span
    >
  </div>
</a>
