<script lang="ts">
  import type { PageProps } from "./$types";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import {
    Package,
    ShoppingCart,
    Users,
    DollarSign,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Star,
    ArrowRight,
  } from "@lucide/svelte";
  import { formatPrice } from "$lib/fxns";

  let { data }: PageProps = $props();

  // Mock stats - will be replaced with real data
  const stats = [
    {
      title: "Total Revenue",
      value: formatPrice(125430),
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: "892",
      change: "+15.3%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Products",
      value: "156",
      change: "-2.1%",
      trend: "down",
      icon: Package,
    },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", total: 12500, status: "pending" },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      total: 8900,
      status: "processing",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      total: 45000,
      status: "shipped",
    },
    {
      id: "ORD-004",
      customer: "Sarah Williams",
      total: 3200,
      status: "delivered",
    },
  ];

  const lowStockProducts = [
    { name: "Nike Air Max 90", stock: 3, threshold: 10 },
    { name: "Adidas Ultraboost", stock: 5, threshold: 10 },
    { name: "Puma RS-X", stock: 2, threshold: 10 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500";
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
</script>

<div class="space-y-6">
  <!-- Page Header -->
  <div
    class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <h1 class="text-2xl font-bold text-foreground">Dashboard</h1>
      <p class="text-sm text-muted-foreground">
        Welcome back! Here's what's happening with your store.
      </p>
    </div>
    <div class="flex gap-2">
      <Button variant="outline" href="/admin/products/create"
        >Add Product</Button
      >
      <Button href="/admin/orders">View Orders</Button>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {#each stats as stat}
      <Card>
        <CardContent class="p-4">
          <div class="flex items-center justify-between">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"
            >
              <stat.icon class="h-5 w-5 text-primary" />
            </div>
            <div
              class="flex items-center gap-1 text-xs font-medium {stat.trend ===
              'up'
                ? 'text-green-600'
                : 'text-red-600'}"
            >
              {#if stat.trend === "up"}
                <TrendingUp class="h-3 w-3" />
              {:else}
                <TrendingDown class="h-3 w-3" />
              {/if}
              {stat.change}
            </div>
          </div>
          <div class="mt-3">
            <p class="text-2xl font-bold text-foreground">{stat.value}</p>
            <p class="text-xs text-muted-foreground">{stat.title}</p>
          </div>
        </CardContent>
      </Card>
    {/each}
  </div>

  <div class="grid gap-6 lg:grid-cols-2">
    <!-- Recent Orders -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2">
        <CardTitle class="text-base font-medium">Recent Orders</CardTitle>
        <Button variant="ghost" size="sm" href="/admin/orders">
          View all
          <ArrowRight class="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          {#each recentOrders as order}
            <div
              class="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div>
                <p class="font-medium text-foreground">{order.id}</p>
                <p class="text-sm text-muted-foreground">{order.customer}</p>
              </div>
              <div class="text-right">
                <p class="font-medium text-foreground">
                  {formatPrice(order.total)}
                </p>
                <span
                  class="inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize {getStatusColor(
                    order.status,
                  )}"
                >
                  {order.status}
                </span>
              </div>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>

    <!-- Low Stock Alert -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2">
        <div class="flex items-center gap-2">
          <AlertTriangle class="h-4 w-4 text-orange-500" />
          <CardTitle class="text-base font-medium">Low Stock Alert</CardTitle>
        </div>
        <Button variant="ghost" size="sm" href="/admin/inventory">
          Manage
          <ArrowRight class="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          {#each lowStockProducts as product}
            <div
              class="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div>
                <p class="font-medium text-foreground">{product.name}</p>
                <p class="text-sm text-muted-foreground">
                  Threshold: {product.threshold}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <span
                  class="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-500"
                >
                  {product.stock} left
                </span>
              </div>
            </div>
          {/each}
          {#if lowStockProducts.length === 0}
            <p class="py-4 text-center text-sm text-muted-foreground">
              All products are well stocked!
            </p>
          {/if}
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Pending Reviews -->
  <Card>
    <CardHeader class="flex flex-row items-center justify-between pb-2">
      <div class="flex items-center gap-2">
        <Star class="h-4 w-4 text-yellow-500" />
        <CardTitle class="text-base font-medium">Pending Reviews</CardTitle>
      </div>
      <Button variant="ghost" size="sm" href="/admin/reviews">
        Moderate
        <ArrowRight class="ml-1 h-4 w-4" />
      </Button>
    </CardHeader>
    <CardContent>
      <p class="py-4 text-center text-sm text-muted-foreground">
        No pending reviews at the moment.
      </p>
    </CardContent>
  </Card>
</div>
