<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import {
    Image,
    FileText,
    Film,
    Search,
    HardDrive,
    Upload,
    Trash2,
    Loader2,
    X,
  } from "@lucide/svelte";
  import * as Table from "$lib/components/ui/table";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Badge } from "$lib/components/ui/badge";
  import { formatDistanceToNow } from "date-fns";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { toast } from "svelte-sonner";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const { files, stats } = $derived(data);

  let isUploadDialogOpen = $state(false);
  let isUploading = $state(false);
  let isDeleting = $state<string | null>(null);
  let selectedFiles = $state<FileList | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (url: string) => {
    const ext = url.split(".").pop()?.toLowerCase();
    if (ext && ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext))
      return Image;
    if (ext && ["mp4", "webm", "ogg"].includes(ext)) return Film;
    return FileText;
  };

  function handleFileChange(e: Event) {
    const target = e.target as HTMLInputElement;
    selectedFiles = target.files;
  }
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Media Library</h1>
      <Button onclick={() => (isUploadDialogOpen = true)}
        ><Upload class="size-4 mr-2" /> Upload Assets</Button
      >
    </div>
    <p class="text-muted-foreground">
      Manage your store's images, videos, and documents.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="rounded-xl border bg-card p-4 flex items-center gap-4">
      <div
        class="size-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center"
      >
        <HardDrive class="size-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p class="text-sm text-muted-foreground">Total Storage</p>
        <p class="text-xl font-bold">{formatSize(stats?.totalSize || 0)}</p>
      </div>
    </div>
    <div class="rounded-xl border bg-card p-4 flex items-center gap-4">
      <div
        class="size-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center"
      >
        <Image class="size-5 text-purple-600 dark:text-purple-400" />
      </div>
      <div>
        <p class="text-sm text-muted-foreground">Total Assets</p>
        <p class="text-xl font-bold">{stats?.totalFiles || 0}</p>
      </div>
    </div>
  </div>

  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
  >
    {#each files as file}
      <div
        class="group relative rounded-lg border bg-card overflow-hidden transition-all hover:ring-2 hover:ring-primary"
      >
        <div class="aspect-square flex items-center justify-center bg-muted">
          {#if file.url.match(/\.(jpg|jpeg|png|gif|webp|svg)/i)}
            <img
              src={file.url}
              alt={file.remoteId}
              class="h-full w-full object-cover"
            />
          {:else}
            {@const Icon = getFileIcon(file.url)}
            <Icon class="size-10 text-muted-foreground" />
          {/if}

          <div
            class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <form
              method="POST"
              action="?/delete"
              use:enhance={() => {
                isDeleting = file.id;
                return async ({ result }) => {
                  isDeleting = null;
                  if (result.type === "success") {
                    toast.success("File deleted successfully");
                    await invalidateAll();
                  } else {
                    toast.error("Failed to delete file");
                  }
                };
              }}
            >
              <input type="hidden" name="id" value={file.id} />
              <Button
                variant="destructive"
                size="icon"
                class="size-7 rounded-sm shadow-lg"
                type="submit"
                disabled={isDeleting === file.id}
              >
                {#if isDeleting === file.id}
                  <Loader2 class="size-3.5 animate-spin" />
                {:else}
                  <Trash2 class="size-3.5" />
                {/if}
              </Button>
            </form>
          </div>
        </div>
        <div class="p-2 border-t">
          <p class="text-xs font-medium truncate" title={file.remoteId}>
            {file.remoteId}
          </p>
          <p class="text-[10px] text-muted-foreground">
            {formatSize(file.size)}
          </p>
        </div>
      </div>
    {/each}
  </div>

  {#if files.length === 0}
    <div
      class="rounded-lg border border-dashed p-12 flex flex-col items-center justify-center text-center"
    >
      <Image class="size-12 text-muted-foreground mb-4" />
      <h3 class="text-lg font-semibold">No media found</h3>
      <p class="text-muted-foreground max-w-sm">
        Start by uploading some images or files to your library.
      </p>
      <Button
        variant="outline"
        class="mt-4"
        onclick={() => (isUploadDialogOpen = true)}
      >
        <Upload class="size-4 mr-2" /> Upload your first asset
      </Button>
    </div>
  {/if}
</div>

<Dialog.Root bind:open={isUploadDialogOpen}>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Upload Media</Dialog.Title>
    </Dialog.Header>
    <form
      method="POST"
      action="?/upload"
      enctype="multipart/form-data"
      use:enhance={() => {
        isUploading = true;
        return async ({ result }) => {
          isUploading = false;
          if (result.type === "success") {
            isUploadDialogOpen = false;
            toast.success("Files uploaded successfully");
            selectedFiles = null;
            await invalidateAll();
          } else {
            toast.error("Failed to upload files");
          }
        };
      }}
      class="space-y-4 pt-4"
    >
      <div class="space-y-2">
        <Label for="files">Select Files</Label>
        <div
          class="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 hover:bg-muted/50 transition-colors cursor-pointer relative"
        >
          <input
            id="files"
            name="files"
            type="file"
            multiple
            class="absolute inset-0 opacity-0 cursor-pointer"
            onchange={handleFileChange}
            required
          />
          <Upload class="size-8 text-muted-foreground mb-2" />
          <p class="text-sm font-medium">Click to browse or drag and drop</p>
          <p class="text-xs text-muted-foreground mt-1">Images, videos, docs</p>
        </div>

        {#if selectedFiles && selectedFiles.length > 0}
          <div class="mt-4 space-y-2 max-h-40 overflow-y-auto pr-2">
            {#each Array.from(selectedFiles) as file}
              <div
                class="flex items-center justify-between text-xs p-2 bg-muted rounded-md"
              >
                <span class="truncate pr-4">{file.name}</span>
                <span class="text-muted-foreground flex-shrink-0"
                  >{formatSize(file.size)}</span
                >
              </div>
            {/each}
          </div>
        {/if}
      </div>

      <div class="space-y-2">
        <Label for="category">Category</Label>
        <select
          id="category"
          name="category"
          class="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="general">General</option>
          <option value="products">Products</option>
          <option value="banners">Banners</option>
          <option value="blog">Blog</option>
        </select>
      </div>

      <Dialog.Footer>
        <Button
          type="button"
          variant="outline"
          onclick={() => (isUploadDialogOpen = false)}>Cancel</Button
        >
        <Button
          type="submit"
          disabled={isUploading || !selectedFiles || selectedFiles.length === 0}
        >
          {#if isUploading}
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          {:else}
            Upload {selectedFiles ? `(${selectedFiles.length})` : ""}
          {/if}
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
