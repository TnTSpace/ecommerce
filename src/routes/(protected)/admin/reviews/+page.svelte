<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Star, MessageSquare, CheckCircle2, XCircle } from "@lucide/svelte";
  import * as Table from "$lib/components/ui/table";
  import { format } from "date-fns";
  import { Badge } from "$lib/components/ui/badge";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const { reviews} = $derived(data);
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h1 class="text-3xl font-bold tracking-tight">Reviews</h1>
    <p class="text-muted-foreground">
      Monitor customer feedback and moderate product reviews.
    </p>
  </div>

  <div class="rounded-md border bg-card overflow-hidden">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Product</Table.Head>
          <Table.Head>Customer</Table.Head>
          <Table.Head>Rating</Table.Head>
          <Table.Head>Comment</Table.Head>
          <Table.Head>Status</Table.Head>
          <Table.Head class="text-right">Actions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each reviews as item}
          <Table.Row>
            <Table.Cell class="font-medium max-w-[200px] truncate">
              {item.productName}
            </Table.Cell>
            <Table.Cell>{item.userName}</Table.Cell>
            <Table.Cell>
              <div class="flex items-center gap-1">
                <Star class="size-3.5 fill-yellow-400 text-yellow-400" />
                <span>{item.review.rating}</span>
              </div>
            </Table.Cell>
            <Table.Cell class="max-w-[300px] truncate">
              {item.review.comment}
            </Table.Cell>
            <Table.Cell>
              {#if item.review.isApproved}
                <Badge variant="outline" class="text-green-600 border-green-600"
                  >Approved</Badge
                >
              {:else}
                <Badge
                  variant="outline"
                  class="text-yellow-600 border-yellow-600">Pending</Badge
                >
              {/if}
            </Table.Cell>
            <Table.Cell class="text-right">
              <div class="flex justify-end gap-2">
                {#if !item.review.isApproved}
                  <Button
                    variant="ghost"
                    size="sm"
                    class="text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <CheckCircle2 class="size-4 mr-1" /> Approve
                  </Button>
                {:else}
                  <Button
                    variant="ghost"
                    size="sm"
                    class="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <XCircle class="size-4 mr-1" /> Reject
                  </Button>
                {/if}
              </div>
            </Table.Cell>
          </Table.Row>
        {/each}
        {#if reviews.length === 0}
          <Table.Row>
            <Table.Cell colspan={6} class="h-24 text-center">
              No reviews found.
            </Table.Cell>
          </Table.Row>
        {/if}
      </Table.Body>
    </Table.Root>
  </div>
</div>
