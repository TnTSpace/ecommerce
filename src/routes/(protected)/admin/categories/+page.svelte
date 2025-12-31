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
  import { Badge } from "$lib/components/ui/badge";
  import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    FolderTree,
    Loader2,
  } from "@lucide/svelte";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { toast } from "svelte-sonner";

  let { data }: PageProps = $props();
  let searchQuery = $state("");
  let isDeleting = $state<string | null>(null);

  const categories = $derived(data.categories || []);

  const filteredCategories = $derived(
    categories.filter((c: any) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );
</script>

<div class="space-y-6">
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <h1 class="text-2xl font-bold text-foreground">Categories</h1>
      <p class="text-sm text-muted-foreground">Organize your products</p>
    </div>
    <Button href="/admin/categories/create">
      <Plus class="mr-2 h-4 w-4" />
      Add Category
    </Button>
  </div>

  <Card>
    <CardContent class="p-4">
      <div class="relative">
        <Search
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search categories..."
          class="pl-9"
          bind:value={searchQuery}
        />
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent class="p-0">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head class="hidden sm:table-cell">ID</Table.Head>
            <Table.Head class="hidden md:table-cell">Usage</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head class="w-12"></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each filteredCategories as category}
            <Table.Row>
              <Table.Cell>
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"
                  >
                    <FolderTree class="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium text-foreground">{category.name}</p>
                    {#if category.description}
                      <p class="text-xs text-muted-foreground line-clamp-1">
                        {category.description}
                      </p>
                    {/if}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell class="hidden sm:table-cell">
                <code class="rounded bg-muted px-1.5 py-0.5 text-xs"
                  >{category.id}</code
                >
              </Table.Cell>
              <Table.Cell class="hidden md:table-cell">
                <span class="text-muted-foreground"
                  >{category.productCount || 0} products</span
                >
              </Table.Cell>
              <Table.Cell>
                <Badge variant={category.isActive ? "default" : "secondary"}>
                  {category.isActive ? "Active" : "Inactive"}
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
                        href={`/admin/categories/${category.id}/edit`}
                        class="flex w-full items-center"
                      >
                        <Pencil class="mr-2 h-4 w-4" />
                        Edit
                      </a>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>
                      <form
                        method="POST"
                        action="?/delete"
                        use:enhance={() => {
                          isDeleting = category.id;
                          return async ({ result }) => {
                            isDeleting = null;
                            if (result.type === "success") {
                              toast.success("Category deleted successfully");
                              await invalidateAll();
                            } else {
                              toast.error("Failed to delete category");
                            }
                          };
                        }}
                        class="flex w-full"
                      >
                        <input type="hidden" name="id" value={category.id} />
                        <button
                          type="submit"
                          class="flex w-full items-center text-destructive"
                          disabled={isDeleting === category.id}
                        >
                          {#if isDeleting === category.id}
                            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          {:else}
                            <Trash2 class="mr-2 h-4 w-4" />
                            Delete
                          {/if}
                        </button>
                      </form>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </Table.Cell>
            </Table.Row>
          {:else}
            <Table.Row>
              <Table.Cell colspan={5} class="py-8 text-center">
                <p class="text-muted-foreground">No categories found</p>
                <Button
                  variant="outline"
                  class="mt-4"
                  href="/admin/categories/create"
                >
                  <Plus class="mr-2 h-4 w-4" />
                  Add your first category
                </Button>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    </CardContent>
  </Card>
</div>
