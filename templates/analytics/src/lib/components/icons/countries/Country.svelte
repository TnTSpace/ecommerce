<script lang="ts">
  import Ci from "./CI.svelte";
  import Dz from "./DZ.svelte";
  import Eg from "./EG.svelte";
  import Gh from "./GH.svelte";
  import Ke from "./KE.svelte";
  import Ma from "./MA.svelte";
  import Ng from "./NG.svelte";
  import Sn from "./SN.svelte";
  import Ug from "./UG.svelte";

  import { skuStore, cleanupStore } from "$lib/stores";
	import type { TCountryCode } from "$lib/interface";
	import { cn } from "$lib/utils";
	import type { Snippet } from "svelte";
	import { page } from "$app/state";

  interface Props {
    children: Snippet
  }

  let { children }: Props = $props()

  const getStore = () => {
    const pathname = page.url.pathname
    switch (pathname) {
      case '/product-cleanup':
        return cleanupStore
      default:
        return skuStore
    }
  }

  const store = $state(getStore())

  interface iFlag {Logo: any, code: TCountryCode}
  let flags = $state<iFlag[]>([
    { Logo: Ci, code: 'ci' },
    { Logo: Dz, code: 'dz' },
    { Logo: Eg, code: 'eg' },
    { Logo: Gh, code: 'gh' },
    { Logo: Ke, code: 'ke' },
    { Logo: Ma, code: 'ma' },
    { Logo: Ng, code: 'ng' },
    { Logo: Sn, code: 'sn' },
    { Logo: Ug, code: 'ug' }
  ])

  const isActive = (code: TCountryCode) => $store.country.code === code

</script>

{#each flags as { Logo, code }, i}
  <div class={cn(isActive(code) ? 'flex items-center gap-2' : 'hidden')}>
    <Logo class="h-10" />
   <div class="flex flex-col text-sm">
     <span class="capitalize">{$store.country.name}</span>
     {@render children()}
   </div>
  </div>
{/each}