<script lang="ts">
  import type { PageProps } from "./$types";
  import type { Settings as SettingsType } from "$lib/db/schema";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
  } from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import {
    Save,
    Settings,
    Store,
    Truck,
    CreditCard,
    MessageSquare,
    Globe,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Loader2,
  } from "@lucide/svelte";

  import { toast } from "svelte-sonner";

  let { data }: PageProps = $props();
  const settings = $derived(data.settings || ({} as Partial<SettingsType>));

  let isSaving = $state(false);

  // Form State (synced from data via $effect)
  let storeName = $state("");
  let storeEmail = $state("");
  let storePhone = $state("");
  let storeAddress = $state("");
  let currency = $state("NGN");
  let taxRate = $state("0");
  let maintenanceMode = $state(false);
  let facebookUrl = $state("");
  let twitterUrl = $state("");
  let instagramUrl = $state("");

  $effect(() => {
    if (data.settings) {
      storeName = data.settings.storeName || "";
      storeEmail = data.settings.storeEmail || "";
      storePhone = data.settings.storePhone || "";
      storeAddress = data.settings.storeAddress?.addressLine1 || "";
      currency = data.settings.currency || "NGN";
      taxRate = data.settings.taxRate || "0";
      maintenanceMode = data.settings.maintenanceMode || false;
      facebookUrl = data.settings.socialLinks?.facebook || "";
      twitterUrl = data.settings.socialLinks?.twitter || "";
      instagramUrl = data.settings.socialLinks?.instagram || "";
    }
  });
</script>

<div class="space-y-6">
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <h1 class="text-2xl font-bold text-foreground">Store Settings</h1>
      <p class="text-sm text-muted-foreground">
        Manage your store's global configuration
      </p>
    </div>
  </div>

  <form
    method="POST"
    use:enhance={() => {
      isSaving = true;
      return async ({ result }) => {
        isSaving = false;
        if (result.type === "success") {
          toast.success("Settings updated successfully");
          await invalidateAll();
        } else {
          toast.error("Failed to save settings");
        }
      };
    }}
    class="grid gap-6 lg:grid-cols-3"
  >
    <!-- Main Content -->
    <div class="space-y-6 lg:col-span-2">
      <!-- General Info -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Store class="h-5 w-5" />
            General Information
          </CardTitle>
          <CardDescription
            >Basic store details visible to customers</CardDescription
          >
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="storeName">Store Name</Label>
            <Input id="storeName" name="storeName" bind:value={storeName} />
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="storeEmail">Contact Email</Label>
              <Input
                id="storeEmail"
                name="storeEmail"
                type="email"
                bind:value={storeEmail}
              />
            </div>
            <div class="space-y-2">
              <Label for="storePhone">Contact Phone</Label>
              <Input
                id="storePhone"
                name="storePhone"
                bind:value={storePhone}
              />
            </div>
          </div>
          <div class="space-y-2">
            <Label for="storeAddress">Physical Address</Label>
            <Textarea
              id="storeAddress"
              name="storeAddress"
              bind:value={storeAddress}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <!-- Financials -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <CreditCard class="h-5 w-5" />
            Financials & Tax
          </CardTitle>
          <CardDescription>Currency and tax configuration</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="currency">Default Currency</Label>
              <Input
                id="currency"
                name="currency"
                bind:value={currency}
                readonly
              />
            </div>
            <div class="space-y-2">
              <Label for="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                name="taxRate"
                type="number"
                step="0.01"
                bind:value={taxRate}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Social Links -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Globe class="h-5 w-5" />
            Social Presence
          </CardTitle>
          <CardDescription>Links to your social media profiles</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Facebook class="h-5 w-5 text-muted-foreground" />
              <Input
                name="facebookUrl"
                bind:value={facebookUrl}
                placeholder="Facebook URL"
              />
            </div>
            <div class="flex items-center gap-3">
              <Twitter class="h-5 w-5 text-muted-foreground" />
              <Input
                name="twitterUrl"
                bind:value={twitterUrl}
                placeholder="Twitter / X URL"
              />
            </div>
            <div class="flex items-center gap-3">
              <Instagram class="h-5 w-5 text-muted-foreground" />
              <Input
                name="instagramUrl"
                bind:value={instagramUrl}
                placeholder="Instagram URL"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Maintenance Mode -->
      <Card>
        <CardHeader>
          <CardTitle>Maintenance</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label for="maintenanceMode">Maintenance Mode</Label>
              <p class="text-xs text-muted-foreground">Stop public access</p>
            </div>
            <Switch
              id="maintenanceMode"
              name="maintenanceMode"
              bind:checked={maintenanceMode}
            />
          </div>
        </CardContent>
      </Card>

      <!-- Actions -->
      <Card>
        <CardContent class="pt-6">
          <Button type="submit" class="w-full" disabled={isSaving}>
            {#if isSaving}
              <Loader2 class="mr-2 h-4 w-4 animate-spin" />
              Saving...
            {:else}
              <Save class="mr-2 h-4 w-4" />
              Save Settings
            {/if}
          </Button>
        </CardContent>
      </Card>
    </div>
  </form>
</div>
