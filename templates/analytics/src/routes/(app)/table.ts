import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from 'svelte'
import { renderComponent, renderSnippet } from '$lib/components/ui/data-table'
import DataTableActions, { type iDataTableActions } from "$lib/components/ui/data-table/data-table-actions.svelte";
import DataTableSortButton from "$lib/components/ui/data-table/data-table-sort-button.svelte";
import { Checkbox } from "$lib/components/ui/checkbox";
import { onCopy } from "@toolsntuts/utils";
import { CopyIcon, EyeIcon, PencilLineIcon, Trash2Icon } from "lucide-svelte";

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed',
  email: string;
}

const actions: iDataTableActions[] = [
  {
    name: "Copy ID",
    action: onCopy,
    icon: CopyIcon
  },
  {
    name: "View Row",
    action: () => {},
    icon: EyeIcon
  },
  {
    name: "Edit Row",
    className: "text-blue-500",
    action: () => {},
    icon: PencilLineIcon
  },
  {
    name: "Delete Row",
    className: "text-red-500",
    action: () => {},
    icon: Trash2Icon
  }
]

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => renderComponent(Checkbox, {
      checked: table.getIsAllRowsSelected(),
      indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllRowsSelected(),
      onCheckedChange: (value) => table.toggleAllRowsSelected(!!value),
      'aria-label': "Select all"
    }),
    cell: ({ row }) => renderComponent(Checkbox, {
      checked: row.getIsSelected(),
      onCheckedChange: (value) => row.toggleSelected(!!value),
      'aria-label': 'Select row'
    }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'email',
    header: ({ column }) => renderComponent(DataTableSortButton, {
      onclick: column.getToggleSortingHandler(),
      title: "Email"
    })
  },
  {
    accessorKey: 'amount',
    header: () => {
      const amountHeaderSnippet = createRawSnippet(() => ({
        render: () => `<div class="text-right">Amount</div>`
      }))
      return renderSnippet(amountHeaderSnippet, "")
    },
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      })

      const amountCellSnippet = createRawSnippet<[string]>((getAmount) => {
        const amount = getAmount()

        return {
          render: () => `<div class="text-right font-medium">${amount}</div>`
        }
      })

      return renderSnippet(
        amountCellSnippet,
        formatter.format(parseFloat(row.getValue("amount")))
      )
    }
  },
  {
    id: 'actions',
    header: "Actions",
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { id: row.original.id, actions })
    }
  }
]

export const data: Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  { id: "489e1d42", amount: 125, status: "processing", email: "example@gmail.com" },
  { id: "a1b2c3d4", amount: 200, status: "completed", email: "alice@example.com" },
  { id: "e5f6g7h8", amount: 75, status: "pending", email: "bob@example.com" },
  { id: "i9j0k1l2", amount: 300, status: "failed", email: "carol@example.com" },
  { id: "m3n4o5p6", amount: 50, status: "pending", email: "dave@example.com" },
  { id: "q7r8s9t0", amount: 120, status: "completed", email: "eve@example.com" },
  { id: "u1v2w3x4", amount: 180, status: "processing", email: "frank@example.com" },
  { id: "y5z6a7b8", amount: 95, status: "completed", email: "grace@example.com" },
  { id: "c9d0e1f2", amount: 110, status: "failed", email: "heidi@example.com" },
  { id: "g3h4i5j6", amount: 215, status: "completed", email: "ivan@example.com" },
  { id: "k7l8m9n0", amount: 130, status: "pending", email: "judy@example.com" },
  { id: "o1p2q3r4", amount: 145, status: "processing", email: "kate@example.com" },
  { id: "s5t6u7v8", amount: 160, status: "completed", email: "leo@example.com" },
  { id: "w9x0y1z2", amount: 175, status: "failed", email: "maya@example.com" },
  { id: "a3b4c5d6", amount: 85, status: "pending", email: "nick@example.com" },
  { id: "e7f8g9h0", amount: 210, status: "completed", email: "olivia@example.com" },
  { id: "i1j2k3l4", amount: 190, status: "processing", email: "peter@example.com" },
  { id: "m5n6o7p8", amount: 100, status: "completed", email: "quinn@example.com" },
  { id: "q9r0s1t2", amount: 155, status: "pending", email: "rachel@example.com" },
  { id: "u3v4w5x6", amount: 140, status: "completed", email: "sam@example.com" },
  { id: "y7z8a9b0", amount: 165, status: "failed", email: "tina@example.com" },
  { id: "c1d2e3f4", amount: 185, status: "processing", email: "ursula@example.com" },
  { id: "g5h6i7j8", amount: 105, status: "completed", email: "victor@example.com" },
  { id: "k9l0m1n2", amount: 90, status: "pending", email: "wendy@example.com" },
]
