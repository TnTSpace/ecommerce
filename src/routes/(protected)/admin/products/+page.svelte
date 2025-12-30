<script lang="ts">
  import type { PageProps } from "./$types";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Eye,
    Copy,
    Filter,
  } from "@lucide/svelte";
  import { formatPrice } from "$lib/fxns";

  let { data }: PageProps = $props();
  let searchQuery = $state("");

  const products = $derived(data.products || []);

  const filteredProducts = $derived(
    products.filter(
      (p: any) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0)
      return {
        label: "Out of Stock",
        class: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500",
      };
    if (stock <= threshold)
      return {
        label: "Low Stock",
        class:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-500",
      };
    return {
      label: "In Stock",
      class:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500",
    };
  };
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <h1 class="text-2xl font-bold text-foreground">Products</h1>
      <p class="text-sm text-muted-foreground">Manage your product catalog</p>
    </div>
    <Button href="/admin/products/create">
      <Plus class="mr-2 h-4 w-4" />
      Add Product
    </Button>
  </div>

  <!-- Filters -->
  <Card>
    <CardContent class="p-4">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div class="relative flex-1">
          <Search
            class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search products..."
            class="pl-9"
            bind:value={searchQuery}
          />
        </div>
        <Button variant="outline">
          <Filter class="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
    </CardContent>
  </Card>

  <!-- Products Table -->
  <Card>
    <CardContent class="p-0">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-16">Image</Table.Head>
            <Table.Head>Product</Table.Head>
            <Table.Head class="hidden md:table-cell">SKU</Table.Head>
            <Table.Head class="hidden sm:table-cell">Category</Table.Head>
            <Table.Head>Price</Table.Head>
            <Table.Head class="hidden lg:table-cell">Stock</Table.Head>
            <Table.Head class="hidden md:table-cell">Status</Table.Head>
            <Table.Head class="w-12"></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each filteredProducts as product}
            <Table.Row>
              <Table.Cell>
                <div class="h-12 w-12 overflow-hidden rounded-lg bg-muted">
                  {#if product.images?.[0]?.url}
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      class="h-full w-full object-cover"
                    />
                  {:else}
                    <div
                      class="flex h-full w-full items-center justify-center text-muted-foreground"
                    >
                      <Eye class="h-4 w-4" />
                    </div>
                  {/if}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div>
                  <p class="font-medium text-foreground">{product.name}</p>
                  <p class="text-xs text-muted-foreground line-clamp-1">
                    {product.shortDescription || ""}
                  </p>
                </div>
              </Table.Cell>
              <Table.Cell class="hidden md:table-cell">
                <code class="rounded bg-muted px-1.5 py-0.5 text-xs"
                  >{product.sku}</code
                >
              </Table.Cell>
              <Table.Cell class="hidden sm:table-cell">
                <span class="text-sm text-muted-foreground"
                  >{product.category?.name || "—"}</span
                >
              </Table.Cell>
              <Table.Cell>
                <div>
                  <p class="font-medium">{formatPrice(product.basePrice)}</p>
                  {#if product.compareAtPrice}
                    <p class="text-xs text-muted-foreground line-through">
                      {formatPrice(product.compareAtPrice)}
                    </p>
                  {/if}
                </div>
              </Table.Cell>
              <Table.Cell class="hidden lg:table-cell">
                {@const status = getStockStatus(
                  product.stockQuantity,
                  product.lowStockThreshold,
                )}
                <Badge variant="secondary" class={status.class}>
                  {product.stockQuantity} ({status.label})
                </Badge>
              </Table.Cell>
              <Table.Cell class="hidden md:table-cell">
                <Badge variant={product.isActive ? "default" : "secondary"}>
                  {product.isActive ? "Active" : "Draft"}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal class="h-4 w-4" />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end">
                    <DropdownMenu.Item>
                      <a
                        href={`/admin/products/${product.id}/edit`}
                        class="flex w-full items-center"
                      >
                        <Pencil class="mr-2 h-4 w-4" />
                        Edit
                      </a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <a
                        href={`/product/${product.id}`}
                        class="flex w-full items-center"
                      >
                        <Eye class="mr-2 h-4 w-4" />
                        View
                      </a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item>
                      <Copy class="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item class="text-destructive">
                      <Trash2 class="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.Row>
          {:else}
            <Table.Row>
              <Table.Cell colspan={8} class="py-8 text-center">
                <p class="text-muted-foreground">No products found</p>
                <Button
                  variant="outline"
                  class="mt-4"
                  href="/admin/products/create"
                >
                  <Plus class="mr-2 h-4 w-4" />
                  Add your first product
                </Button>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </CardContent>
  </Card>

  <!-- Pagination -->
  {#if data.meta}
    <div class="flex items-center justify-between">
      <p class="text-sm text-muted-foreground">
        Showing {filteredProducts.length} of {data.meta.total} products
      </p>
      <div class="flex gap-2">
        <Button variant="outline" size="sm" disabled={data.meta.page <= 1}>
          Previous
        </Button>
        <Button variant="outline" size="sm" disabled={!data.meta.hasMore}>
          Next
        </Button>
      </div>
    </div>
  {/if}
</div>
