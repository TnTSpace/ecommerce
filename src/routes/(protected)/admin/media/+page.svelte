<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import {
    Image,
    FileText,
    Film,
    Search,
    HardDrive,
    Upload,
  } from "@lucide/svelte";
  import * as Table from "$lib/components/ui/table";
  import { Badge } from "$lib/components/ui/badge";
  import { formatDistanceToNow } from "date-fns";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const { files, stats } = $derived(data);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return Image;
    if (mimeType.startsWith("video/")) return Film;
    return FileText;
  };
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Media Library</h1>
      <Button><Upload class="size-4 mr-2" /> Upload Assets</Button>
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
          {#if file.mimeType.startsWith("image/")}
            <img
              src={file.url}
              alt={file.originalName}
              class="h-full w-full object-cover"
            />
          {:else}
            {@const Icon = getFileIcon(file.mimeType)}
            <Icon class="size-10 text-muted-foreground" />
          {/if}
        </div>
        <div class="p-2 border-t">
          <p class="text-xs font-medium truncate" title={file.originalName}>
            {file.originalName}
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
    </div>
  {/if}
</div>
