<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';

  const getBreadcrumbs = (url: URL) => {
    const segments = url.pathname.split('/').filter(Boolean); // Split and filter empty segments
    return segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      return { name: segment, path };
    })
  }

  let breadcrumbs = $state(getBreadcrumbs($page.url))

</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    {#each breadcrumbs as { name, path }, i}
      <Breadcrumb.Item class={i < breadcrumbs.length - 1 ? 'hidden md:block' : ''}>
        <Breadcrumb.Link href={path} class="capitalize">{name.replace(/-/g, ' ')}</Breadcrumb.Link>
      </Breadcrumb.Item>
      {#if i < breadcrumbs.length - 1}
        <Breadcrumb.Separator class="hidden md:block" />
      {/if}
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>
