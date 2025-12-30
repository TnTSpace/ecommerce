<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Ruler, Plus } from "@lucide/svelte";
  import * as Table from "$lib/components/ui/table";
  import { Badge } from "$lib/components/ui/badge";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const { sizes } = $derived(data);
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Sizes</h1>
      <Button><Plus class="size-4 mr-2" /> Create Size</Button>
    </div>
    <p class="text-muted-foreground">
      Manage product size variations and sorting order.
    </p>
  </div>

  <div class="rounded-md border bg-card overflow-hidden">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Label</Table.Head>
          <Table.Head>Usage</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head class="text-right">Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each sizes as size}
          <Table.Row>
            <Table.Cell class="font-medium">{size.name}</Table.Cell>
            <Table.Cell
              ><code class="text-xs bg-muted px-1.5 py-0.5 rounded"
                >{size.name}</code
              ></Table.Cell
            >
            <Table.Cell>
              <span class="text-sm">{size.productCount} products</span>
            </Table.Cell>
            <Table.Cell>
              {#if size.isActive}
                <Badge variant="outline" class="text-green-600 border-green-600"
                  >Active</Badge
                >
              {:else}
                <Badge variant="secondary">Inactive</Badge>
              {/if}
            </Table.Cell>
            <Table.Cell class="text-right">
              <Button variant="ghost" size="sm">Edit</Button>
            </Table.Cell>
          </Table.Row>
        {/each}
        {#if sizes.length === 0}
          <Table.Row>
            <Table.Cell colspan={5} class="h-24 text-center">
              No sizes found.
            </Table.Cell>
          </Table.Row>
        {/if}
      </Table.Body>
    </Table.Root>
  </div>
</div>
