import { Checkbox } from "$lib/components/ui/checkbox";
import { renderComponent } from "$lib/components/ui/data-table";
import type { iDataTableActions } from "$lib/components/ui/data-table/data-table-actions.svelte";
import type { iFlattenedSKU, iModal, iSKU, iSKUStore } from "$lib/interface";
import type { ColumnDef } from "@tanstack/table-core";
import { onCopy } from "@toolsntuts/utils";
import { CopyIcon, EyeIcon, PackageOpenIcon, PencilLineIcon, Trash2Icon } from "lucide-svelte";
import ProductImage from "./components/product-image.svelte";
import DataTableActions from "$lib/components/ui/data-table/data-table-actions.svelte";
import ProductPrice from "./components/product-price.svelte";
import ProductActions from "./components/product-actions.svelte";
import ProductCategory from "./components/product-category.svelte";
import ProductName from "./components/product-name.svelte";
import DataTableSortButton from "$lib/components/ui/data-table/data-table-sort-button.svelte";
import { get, type Writable } from "svelte/store";
import ProductCompetition from "./components/product-competition.svelte";
import { Finder } from "$lib/hooks/finder.svelte";

export const getColumns = (modalStore: Writable<iModal>, skuStore: Writable<iSKUStore>) => {


  const actions: iDataTableActions[] = [
    {
      name: "Copy SKU",
      action: onCopy,
      icon: CopyIcon
    },
    {
      name: "Open PDP",
      action: (id: string) => {
        const store = get(skuStore)
        const product = store.jumia[id] 
        const href = Finder.getUrl(store.country.locale, product.url)
        window.open(href, '_blank');
      },
      icon: PackageOpenIcon
    },
    {
      name: "View Product",
      action: (id: string) => {
        const products = get(skuStore)
        const product = products.jumia[id]
        modalStore.update(existing => ({
          ...existing,
          type: "view-product",
          title: product?.brand as string,
          description: product?.displayName as string,
          open: true,
          data: product
        }))
      },
      icon: EyeIcon
    },
    {
      name: "Delete Product",
      action: (id: string) => {
        skuStore.update(existing => {

          delete existing.jumia[id]

          return existing
        })
      },
      icon: Trash2Icon
    }
  ]

  const columns: ColumnDef<iFlattenedSKU>[] = [
    {
      id: 'select',
      header: ({ table }) =>
        renderComponent(Checkbox, {
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
          onCheckedChange: (value) => table.toggleAllRowsSelected(!!value),
          'aria-label': 'Select all'
        }),
      cell: ({ row }) =>
        renderComponent(Checkbox, {
          checked: row.getIsSelected(),
          onCheckedChange: (value) => row.toggleSelected(!!value),
          'aria-label': 'Select row'
        }),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) => {
        return renderComponent(ProductImage, { sku: row.original })
      }
    },
    {
      accessorKey: 'name',
      header: ({ column }) =>
        renderComponent(DataTableSortButton, {
          onclick: column.getToggleSortingHandler(),
          title: 'Name'
        }),
      cell: ({ row }) => {
        return renderComponent(ProductName, { sku: row.original })
      }
    },
    {
      accessorKey: 'brand',
      header: ({ column }) =>
        renderComponent(DataTableSortButton, {
          onclick: column.getToggleSortingHandler(),
          title: 'Brand'
        }),
    },
    {
      accessorKey: 'category',
      header: ({ column }) =>
        renderComponent(DataTableSortButton, {
          onclick: column.getToggleSortingHandler(),
          title: 'Category'
        }),
      cell: ({ row }) => {
        return renderComponent(ProductCategory, { sku: row.original })
      }
    },
    {
      accessorKey: 'price',
      header: ({ column }) =>
        renderComponent(DataTableSortButton, {
          onclick: column.getToggleSortingHandler(),
          title: 'Price'
        }),
      cell: ({ row }) => {
        return renderComponent(ProductPrice, { sku: row.original })
      }
    },
    {
      header: 'Competitors',
      cell: ({ row }) => {
        return renderComponent(ProductCompetition, { product: row.original })
      }
    },
    {
      id: 'actions',
      header: ({ column }) =>
        renderComponent(ProductActions, {}),
      cell: ({ row }) => {
        return renderComponent(DataTableActions, { id: row.original.sku, actions, row: row.original })
      }
    }
  ]

  return { columns }
}