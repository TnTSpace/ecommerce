<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Tag, Plus, Search } from "@lucide/svelte";
  import * as Table from "$lib/components/ui/table";
  import { Badge } from "$lib/components/ui/badge";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const { tags } = $derived(data);
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Product Tags</h1>
      <Button><Plus class="size-4 mr-2" /> Create Tag</Button>
    </div>
    <p class="text-muted-foreground">
      Manage product labels and categorization tags.
    </p>
  </div>

  <div class="rounded-md border bg-card overflow-hidden">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Slug</Table.Head>
          <Table.Head>Type</Table.Head>
          <Table.Head>Usage</Table.Head>
          <Table.Head class="text-right">Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each tags as tag}
          <Table.Row>
            <Table.Cell class="font-medium">
              <div class="flex items-center gap-2">
                <div
                  class="size-3 rounded-full"
                  style="background-color: {tag.color || '#ccc'}"
                ></div>
                {tag.name}
              </div>
            </Table.Cell>
            <Table.Cell
              ><code class="text-xs bg-muted px-1.5 py-0.5 rounded"
                >{tag.id}</code
              ></Table.Cell
            >
            <Table.Cell>
              <Badge variant="secondary" class="capitalize">{tag.type}</Badge>
            </Table.Cell>
            <Table.Cell>
              <span class="text-sm">{tag.productCount} products</span>
            </Table.Cell>
            <Table.Cell class="text-right">
              <Button variant="ghost" size="sm">Edit</Button>
            </Table.Cell>
          </Table.Row>
        {/each}
        {#if tags.length === 0}
          <Table.Row>
            <Table.Cell colspan={5} class="h-24 text-center">
              No tags found.
            </Table.Cell>
          </Table.Row>
        {/if}
      </Table.Body>
    </Table.Root>
  </div>
</div>
