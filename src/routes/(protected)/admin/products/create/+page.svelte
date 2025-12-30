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
  import { ChevronLeft, Upload, X, Loader2 } from "@lucide/svelte";
  import { slugify } from "$lib/fxns";

  let { data }: PageProps = $props();

  let isSubmitting = $state(false);
  let name = $state("");
  let slug = $state("");
  let description = $state("");
  let shortDescription = $state("");
  let sku = $state("");
  let barcode = $state("");
  let basePrice = $state("");
  let compareAtPrice = $state("");
  let stockQuantity = $state("0");
  let lowStockThreshold = $state("10");
  let categoryId = $state("");
  let isActive = $state(true);
  let isFeatured = $state(false);
  let metaTitle = $state("");
  let metaDescription = $state("");
  let images: File[] = $state([]);
  let imagePreviews: string[] = $state([]);

  // Auto-generate slug from name
  $effect(() => {
    if (name && !slug) {
      slug = slugify(name);
    }
  });

  const handleImageUpload = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      images = [...images, ...newFiles];
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreviews = [...imagePreviews, e.target?.result as string];
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    images = images.filter((_, i) => i !== index);
    imagePreviews = imagePreviews.filter((_, i) => i !== index);
  };

  const categories = data.categories || [];
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center gap-4">
    <Button variant="ghost" size="icon" onclick={() => goto("/admin/products")}>
      <ChevronLeft class="h-4 w-4" />
    </Button>
    <div>
      <h1 class="text-2xl font-bold text-foreground">Add Product</h1>
      <p class="text-sm text-muted-foreground">
        Create a new product for your store
      </p>
    </div>
  </div>

  <form
    method="POST"
    enctype="multipart/form-data"
    use:enhance={() => {
      isSubmitting = true;
      return async ({ result }) => {
        isSubmitting = false;
        if (result.type === "redirect") {
          goto(result.location);
        }
      };
    }}
    class="grid gap-6 lg:grid-cols-3"
  >
    <!-- Main Content -->
    <div class="space-y-6 lg:col-span-2">
      <!-- Basic Info -->
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                bind:value={name}
                required
                placeholder="Enter product name"
              />
            </div>
            <div class="space-y-2">
              <Label for="slug">Slug *</Label>
              <Input
                id="slug"
                name="slug"
                bind:value={slug}
                required
                placeholder="product-slug"
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              bind:value={shortDescription}
              placeholder="Brief product summary"
            />
          </div>
          <div class="space-y-2">
            <Label for="description">Full Description *</Label>
            <Textarea
              id="description"
              name="description"
              bind:value={description}
              required
              rows={6}
              placeholder="Detailed product description"
            />
          </div>
        </CardContent>
      </Card>

      <!-- Images -->
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4 sm:grid-cols-4">
            {#each imagePreviews as preview, i}
              <div
                class="group relative aspect-square overflow-hidden rounded-lg border border-border"
              >
                <img
                  src={preview}
                  alt="Preview"
                  class="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onclick={() => removeImage(i)}
                  class="absolute right-1 top-1 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X class="h-3 w-3" />
                </button>
              </div>
            {/each}
            <label
              class="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary"
            >
              <Upload class="h-8 w-8 text-muted-foreground" />
              <span class="mt-2 text-xs text-muted-foreground">Upload</span>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                class="hidden"
                onchange={handleImageUpload}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <!-- Pricing -->
      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="basePrice">Base Price (₦) *</Label>
              <Input
                id="basePrice"
                name="basePrice"
                type="number"
                step="0.01"
                bind:value={basePrice}
                required
                placeholder="0.00"
              />
            </div>
            <div class="space-y-2">
              <Label for="compareAtPrice">Compare at Price (₦)</Label>
              <Input
                id="compareAtPrice"
                name="compareAtPrice"
                type="number"
                step="0.01"
                bind:value={compareAtPrice}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Inventory -->
      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="space-y-2">
              <Label for="sku">SKU *</Label>
              <Input
                id="sku"
                name="sku"
                bind:value={sku}
                required
                placeholder="SKU-001"
              />
            </div>
            <div class="space-y-2">
              <Label for="barcode">Barcode</Label>
              <Input
                id="barcode"
                name="barcode"
                bind:value={barcode}
                placeholder="Optional"
              />
            </div>
            <div class="space-y-2">
              <Label for="stockQuantity">Stock Quantity *</Label>
              <Input
                id="stockQuantity"
                name="stockQuantity"
                type="number"
                bind:value={stockQuantity}
                required
              />
            </div>
            <div class="space-y-2">
              <Label for="lowStockThreshold">Low Stock Alert</Label>
              <Input
                id="lowStockThreshold"
                name="lowStockThreshold"
                type="number"
                bind:value={lowStockThreshold}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- SEO -->
      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              name="metaTitle"
              bind:value={metaTitle}
              placeholder="SEO title"
            />
          </div>
          <div class="space-y-2">
            <Label for="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              name="metaDescription"
              bind:value={metaDescription}
              rows={3}
              placeholder="SEO description"
            />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Status -->
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <Label for="isActive">Active</Label>
            <Switch id="isActive" name="isActive" bind:checked={isActive} />
          </div>
          <div class="flex items-center justify-between">
            <Label for="isFeatured">Featured</Label>
            <Switch
              id="isFeatured"
              name="isFeatured"
              bind:checked={isFeatured}
            />
          </div>
        </CardContent>
      </Card>

      <!-- Category -->
      <Card>
        <CardHeader>
          <CardTitle>Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Select.Root type="single" name="categoryId" bind:value={categoryId}>
            <Select.Trigger>
              <span
                >{categories.find((c: any) => c.id === categoryId)?.name ||
                  "Select category"}</span
              >
            </Select.Trigger>
            <Select.Content>
              {#each categories as cat}
                <Select.Item value={cat.id}>{cat.name}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </CardContent>
      </Card>

      <!-- Actions -->
      <Card>
        <CardContent class="space-y-2 pt-6">
          <Button type="submit" class="w-full" disabled={isSubmitting}>
            {#if isSubmitting}
              <Loader2 class="mr-2 h-4 w-4 animate-spin" />
              Saving...
            {:else}
              Create Product
            {/if}
          </Button>
          <Button
            type="button"
            variant="outline"
            class="w-full"
            onclick={() => goto("/admin/products")}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  </form>
</div>
