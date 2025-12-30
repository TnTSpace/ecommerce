<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Boxes, Package, AlertTriangle, Search } from "@lucide/svelte";
  import * as Table from "$lib/components/ui/table";
  import { Badge } from "$lib/components/ui/badge";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const { products, search } = $derived(data);

  const getStockBadge = (quantity: number, threshold: number) => {
    if (quantity <= 0)
      return { label: "Out of Stock", variant: "destructive" as const };
    if (quantity <= threshold)
      return { label: "Low Stock", variant: "destructive" as const }; // Use destructive for low stock too or outline
    return { label: "In Stock", variant: "outline" as const };
  };
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold tracking-tight">Inventory</h1>
    <p class="text-muted-foreground">
      Monitor stock levels, set alerts, and manage product availability.
    </p>
  </div>

  <div class="flex items-center gap-4">
    <form class="relative flex-1 max-w-sm">
      <Input
        name="search"
        value={search}
        placeholder="Search products or SKU..."
        class="pl-10"
      />
      <Search
        class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
      />
    </form>
  </div>

  <div class="rounded-md border bg-card overflow-hidden">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Product</Table.Head>
          <Table.Head>SKU</Table.Head>
          <Table.Head>Stock Quantity</Table.Head>
          <Table.Head>Threshold</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head class="text-right">Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each products as product}
          {@const stock = getStockBadge(
            product.stockQuantity,
            product.lowStockThreshold,
          )}
          <Table.Row>
            <Table.Cell class="font-medium">{product.name}</Table.Cell>
            <Table.Cell
              ><code class="text-xs bg-muted px-1.5 py-0.5 rounded"
                >{product.sku}</code
              ></Table.Cell
            >
            <Table.Cell>
              <div class="flex items-center gap-2">
                <span
                  class={product.stockQuantity <= product.lowStockThreshold
                    ? "text-destructive font-bold"
                    : ""}
                >
                  {product.stockQuantity}
                </span>
                {#if product.stockQuantity <= product.lowStockThreshold}
                  <AlertTriangle class="size-3.5 text-destructive" />
                {/if}
              </div>
            </Table.Cell>
            <Table.Cell class="text-muted-foreground"
              >{product.lowStockThreshold}</Table.Cell
            >
            <Table.Cell>
              <Badge
                variant={stock.variant}
                class={stock.label === "In Stock"
                  ? "text-green-600 border-green-600"
                  : ""}
              >
                {stock.label}
              </Badge>
            </Table.Cell>
            <Table.Cell class="text-right">
              <Button variant="ghost" size="sm">Update Stock</Button>
            </Table.Cell>
          </Table.Row>
        {/each}
        {#if products.length === 0}
          <Table.Row>
            <Table.Cell colspan={6} class="h-24 text-center">
              No products found.
            </Table.Cell>
          </Table.Row>
        {/if}
      </Table.Body>
    </Table.Root>
  </div>
</div>
