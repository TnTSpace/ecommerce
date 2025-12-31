<script lang="ts">
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { ChevronLeft, Loader2 } from "@lucide/svelte";
  import { toast } from "svelte-sonner";

  let { data }: PageProps = $props();

  let isSubmitting = $state(false);
  let name = $state("");
  let description = $state("");
  let parentId = $state("");
  let isActive = $state(true);

  const categories = data.categories || [];
</script>

<div class="space-y-6">
  <div class="flex items-center gap-4">
    <Button
      variant="ghost"
      size="icon"
      onclick={() => goto("/admin/categories")}
    >
      <ChevronLeft class="h-4 w-4" />
    </Button>
    <div>
      <h1 class="text-2xl font-bold text-foreground">Add Category</h1>
      <p class="text-sm text-muted-foreground">Create a new product category</p>
    </div>
  </div>

  <form
    method="POST"
    use:enhance={() => {
      isSubmitting = true;
      return async ({ result }) => {
        isSubmitting = false;
        if (result.type === "redirect") {
          toast.success("Category created successfully");
          goto(result.location);
        } else if (result.type === "failure") {
          toast.error(
            (result as any).data?.error || "Failed to create category",
          );
        }
      };
    }}
    class="grid gap-6 lg:grid-cols-3"
  >
    <div class="space-y-6 lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="name">Category Name *</Label>
            <Input
              id="name"
              name="name"
              bind:value={name}
              required
              placeholder="Electronics, Fashion..."
            />
          </div>
          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              bind:value={description}
              rows={4}
              placeholder="What's in this category?"
            />
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <Label for="isActive">Active</Label>
            <Switch id="isActive" name="isActive" bind:checked={isActive} />
            <input type="hidden" name="isActive" value={isActive} />
          </div>
          <div class="space-y-2">
            <Label>Parent Category</Label>
            <Select.Root type="single" name="parentId" bind:value={parentId}>
              <Select.Trigger>
                <span
                  >{categories.find((c) => c.id === parentId)?.name ||
                    "None (Root)"}</span
                >
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="">None (Root)</Select.Item>
                {#each categories as cat}
                  <Select.Item value={cat.id}>{cat.name}</Select.Item>
                {/each}
              </Select.Content>
            </Select.Root>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="space-y-2 pt-6">
          <Button type="submit" class="w-full" disabled={isSubmitting}>
            {#if isSubmitting}
              <Loader2 class="mr-2 h-4 w-4 animate-spin" />
              Saving...
            {:else}
              Create Category
            {/if}
          </Button>
          <Button
            type="button"
            variant="outline"
            class="w-full"
            onclick={() => goto("/admin/categories")}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  </form>
</div>
