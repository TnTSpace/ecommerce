/*
	Installed from github/TnTSpace/registry
*/

import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table';
import DataTableActions, { type iDataTableActions } from '$lib/components/ui/data-table/data-table-actions.svelte';
import DataTableSortButton from '$lib/components/ui/data-table/data-table-sort-button.svelte';
import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
import RefereeCountry from './components/referee-country.svelte';
import RefereeCourse from './components/referee-course.svelte';
import { CopyIcon, PencilLineIcon, Trash2Icon } from "lucide-svelte";
import { onCopy } from '@toolsntuts/utils';
import { get, type Writable } from 'svelte/store';
import type { ReferralInterface, iModal } from '$lib/interface';
import { refereesStore } from '$lib/stores';

export type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'completed' | 'failed';
	email: string;
};

export const getColumns = (modalStore: Writable<iModal>, referral?: ReferralInterface) => {

	const actions: iDataTableActions[] = [
		{
			name: "Copy ID",
			action: onCopy,
			icon: CopyIcon
		},
		{
			name: "Edit Row",
			className: "text-blue-500",
			action: (id: string) => {
				const referees = get(refereesStore)
				const referee = referees.find(ref => ref.xata_id === id)
				modalStore.update(existing => ({
					...existing,
					open: true,
					data: { referral, referee },
					title: 'Update Referee',
					description: 'Fill the form below to update referee',
					type: 'referee'
				}))
			},
			icon: PencilLineIcon
		},
		{
			name: "Delete Row",
			className: "text-red-500",
			action: async (id: string) => {
				const referees = get(refereesStore)
				const referee = referees.find(ref => ref.xata_id === id)
				modalStore.update(existing => ({
					...existing,
					open: true,
					data: { referral, referee },
					title: 'Delete Referee',
					description: `This action cannot be undone. This will permanently delete ${referee?.name} and remove it's data from our servers.`,
					type: 'deleteReferee'
				}))
			},
			icon: Trash2Icon
		}
	]

	const columns: ColumnDef<any>[] = [
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
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
			accessorKey: 'name',
			header: 'Name'
		},
		{
			accessorKey: 'country',
			header: ({ column }) =>
				renderComponent(DataTableSortButton, {
					onclick: column.getToggleSortingHandler(),
					title: 'Country'
				}),
			cell: ({ row }) => {
				return renderComponent(RefereeCountry, { referee: row.original });
			}
		},
		{
			accessorKey: 'courseName',
			header: ({ column }) =>
				renderComponent(DataTableSortButton, {
					onclick: column.getToggleSortingHandler(),
					title: 'Course'
				}),
			cell: ({ row }) => {
				return renderComponent(RefereeCourse, { referee: row.original });
			}
		},
		{
			accessorKey: 'email',
			header: 'Email'
		},
		{
			accessorKey: 'phone',
			header: 'Phone'
		},
		{
			accessorKey: 'referral',
			header: 'Referrer'
		},
		{
			id: 'actions',
			header: 'Actions',
			cell: ({ row }) => {
				return renderComponent(DataTableActions, { id: row.original.xata_id, actions, row: row.original });
			}
		}
	];

	return columns
}

