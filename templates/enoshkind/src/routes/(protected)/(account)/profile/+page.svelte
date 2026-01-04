<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import type { User } from '$lib/auth';
	import { page } from '$app/state';
	import EditProfileDialog from './EditProfileDialog.svelte';
	import { invalidateAll } from '$app/navigation';
	import { Edit, User as UserIcon, Mail, Shield, Calendar } from '@lucide/svelte';

	let currentUser = $state(page.data.user as User);
	let isEditOpen = $state(false);

	async function reloadProfile() {
		// In SvelteKit, invalidateAll will re-run the layout/page load functions
		await invalidateAll();
		currentUser = page.data.user as User;
	}
</script>

<div class="max-w-4xl mx-auto space-y-8 w-full box-border pb-12">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">Profile</h1>
			<p class="text-muted-foreground">Manage your account settings and preferences</p>
		</div>
		<Button variant="outline" onclick={() => (isEditOpen = true)}>
			<Edit class="mr-2 h-4 w-4" />
			Edit Profile
		</Button>
	</div>

	<Card>
		<CardHeader>
			<CardTitle class="flex items-center">
				<UserIcon class="mr-2 h-5 w-5 text-primary" />
				Account Information
			</CardTitle>
			<CardDescription>Your personal account details</CardDescription>
		</CardHeader>
		<CardContent class="space-y-6">
			<div class="grid grid-cols-[80px_1fr] items-center gap-2">
				<div
					class="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center overflow-hidden border-2 border-primary/20"
				>
					{#if currentUser?.image}
						<img
							src={currentUser.image}
							alt={currentUser.name}
							class="w-full h-full object-cover"
						/>
					{:else}
						<span class="text-3xl text-white font-bold">{currentUser?.name?.charAt(0) || 'U'}</span>
					{/if}
				</div>
				<div>
					<h3 class="text-xl font-semibold">{currentUser?.name || 'User'}</h3>
					<p class="text-muted-foreground">{currentUser?.role || 'Member'}</p>
				</div>
			</div>

			{#if currentUser?.bio}
				<div class="p-4 rounded-xl bg-primary/5 border border-primary/10">
					<p class="text-xs font-bold capitalize text-primary tracking-widest mb-1">Bio</p>
					<p class="text-sm text-muted-foreground leading-relaxed italic">{currentUser.bio}</p>
				</div>
			{/if}

			<div class="grid gap-4 md:grid-cols-2">
				<div class="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 overflow-hidden">
					<Mail class="h-5 w-5 text-muted-foreground shrink-0" />
					<div class="min-w-0 flex-1">
						<p class="text-sm text-muted-foreground">Email</p>
						<p class="font-medium truncate" title={currentUser?.email}>
							{currentUser?.email || 'Not set'}
						</p>
					</div>
				</div>

				<div class="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
					<Shield class="h-5 w-5 text-muted-foreground" />
					<div>
						<p class="text-sm text-muted-foreground">Email Verified</p>
						<p class="font-medium">{currentUser?.emailVerified ? 'Yes' : 'No'}</p>
					</div>
				</div>

				<div class="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
					<Calendar class="h-5 w-5 text-muted-foreground" />
					<div>
						<p class="text-sm text-muted-foreground">Member Since</p>
						<p class="font-medium">
							{currentUser?.createdAt
								? new Date(currentUser.createdAt).toLocaleDateString()
								: 'Unknown'}
						</p>
					</div>
				</div>

				<div class="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
					<UserIcon class="h-5 w-5 text-muted-foreground" />
					<div>
						<p class="text-sm text-muted-foreground">Role</p>
						<p class="font-medium capitalize">{currentUser?.role || 'User'}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>

	<EditProfileDialog bind:open={isEditOpen} user={currentUser} onUpdated={reloadProfile} />
</div>
