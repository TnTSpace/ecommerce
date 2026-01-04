<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Stethoscope,
		FileText,
		ExternalLink,
		Check,
		X,
		User,
		Mail,
		Calendar,
		ShieldCheck,
		Loader2
	} from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let {
		open = $bindable(false),
		data,
		onApprove,
		onReject,
		loading = false,
		processingId = ''
	} = $props<{
		open: boolean;
		data: any;
		onApprove: (id: string) => void;
		onReject: (id: string) => void;
		loading?: boolean;
		processingId?: string;
	}>();

	let isMobile = $state(false);

	$effect(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	const { doctor: d, user: u } = $derived(data || { doctor: {}, user: {} });
</script>

{#if data}
	{#if isMobile}
		<Drawer.Root bind:open>
			<Drawer.Content class="rounded-t-3xl border-t border-border/40 bg-card/60 backdrop-blur-2xl">
				<div class="mx-auto w-12 h-1.5 bg-muted rounded-full mt-3"></div>
				<div class="p-6 space-y-8 pb-10">
					<div class="space-y-4">
						<div class="flex items-center gap-4">
							<div class="relative">
								{#if d.image || u?.image}
									<img
										src={d.image || u?.image}
										alt={d.name}
										class="w-20 h-20 rounded-2xl object-cover border-4 border-background shadow-xl"
									/>
								{:else}
									<div
										class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20 shadow-xl"
									>
										<User class="w-10 h-10" />
									</div>
								{/if}
								<div
									class="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 border-4 border-background rounded-full"
								></div>
							</div>
							<div>
								<h2 class="text-2xl font-bold tracking-tight">{d.name}</h2>
								<div class="flex items-center gap-2 text-primary font-bold text-sm capitalize">
									<Stethoscope class="w-4 h-4" />
									{d.specialty}
								</div>
							</div>
						</div>

						<div class="grid grid-cols-1 gap-4">
							<div class="p-4 rounded-xl bg-muted/30 border border-border/20 space-y-1">
								<p
									class="text-sm font-bold text-muted-foreground capitalize tracking-widest flex items-center gap-1"
								>
									<Mail class="w-3 h-3" /> Email Address
								</p>
								<p class="font-bold text-sm break-all">{u?.email || 'N/A'}</p>
							</div>
							<div class="p-4 rounded-xl bg-muted/30 border border-border/20 space-y-1">
								<p
									class="text-sm font-bold text-muted-foreground capitalize tracking-widest flex items-center gap-1"
								>
									<Calendar class="w-3 h-3" /> Date Joined
								</p>
								<p class="font-bold text-sm">
									{new Date(d.createdAt).toLocaleDateString(undefined, {
										month: 'long',
										day: 'numeric',
										year: 'numeric'
									})}
								</p>
							</div>
						</div>

						<div class="space-y-3">
							<p class="text-sm font-bold text-muted-foreground capitalize tracking-widest">
								Professional License
							</p>
							{#if d.licenseUrl}
								<a
									href={d.licenseUrl}
									target="_blank"
									class="flex items-center justify-between p-4 rounded-xl bg-primary/5 border-2 border-dashed border-primary/30 hover:bg-primary/10 hover:border-primary transition-all group"
								>
									<div class="flex items-center gap-3">
										<div
											class="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border/40 shadow-sm"
										>
											<FileText class="w-5 h-5 text-primary" />
										</div>
										<span class="font-bold text-sm">View Uploaded License</span>
									</div>
									<ExternalLink
										class="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
									/>
								</a>
							{:else}
								<div
									class="p-4 rounded-xl bg-red-500/5 border-2 border-dashed border-red-500/30 text-center"
								>
									<p class="text-sm font-bold text-red-500">No license document provided</p>
								</div>
							{/if}
						</div>
					</div>

					<div class="flex flex-col gap-3 pt-4">
						<Button
							class="bg-green-600 hover:bg-green-700 text-white font-bold  gap-2 shadow-xl shadow-green-500/20"
							onclick={() => handleStatusUpdate('approved')}
							disabled={updating}
						>
							{#if updating}
								<Loader2 class="w-5 h-5 animate-spin" />
							{:else}
								<Check class="w-6 h-6" />
							{/if}
							Approve Practitioner
						</Button>
						<Button
							variant="outline"
							class="border-destructive/20 text-destructive hover:bg-destructive/5 font-bold  gap-2"
							onclick={() => handleStatusUpdate('rejected')}
							disabled={updating}
						>
							<X class="w-6 h-6" />
							Reject Application
						</Button>
					</div>
				</div>
			</Drawer.Content>
		</Drawer.Root>
	{:else}
		<Dialog.Root bind:open>
			<Dialog.Content
				class="sm:max-w-[700px] p-0 rounded-3xl overflow-hidden border-border/40 bg-card/60 backdrop-blur-2xl shadow-2xl"
			>
				<div class="flex h-[500px]">
					<!-- Left Sidebar: Profile Summary -->
					<div
						class="w-72 bg-muted/30 border-r border-border/40 p-8 flex flex-col items-center text-center space-y-6"
					>
						<div class="relative">
							{#if d.image || u?.image}
								<img
									src={d.image || u?.image}
									alt={d.name}
									class="w-32 h-32 rounded-3xl object-cover border-4 border-background shadow-2xl"
								/>
							{:else}
								<div
									class="w-32 h-32 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20 shadow-2xl"
								>
									<User class="w-16 h-16" />
								</div>
							{/if}
							<div
								class="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 border-4 border-background rounded-full"
							></div>
						</div>

						<div class="space-y-1">
							<h2 class="text-2xl font-bold tracking-tight">{d.name}</h2>
							<Badge
								variant="secondary"
								class="bg-primary/10 text-primary font-bold border-none px-4"
							>
								{d.specialty}
							</Badge>
						</div>

						<div class="w-full pt-6 space-y-4 text-left">
							<div class="space-y-1">
								<p class="text-sm font-bold text-muted-foreground capitalize tracking-widest">
									Email
								</p>
								<p class="text-sm font-bold truncate">{u?.email || 'N/A'}</p>
							</div>
							<div class="space-y-1">
								<p class="text-sm font-bold text-muted-foreground capitalize tracking-widest">
									Member Since
								</p>
								<p class="text-sm font-bold">
									{new Date(d.createdAt).toLocaleDateString(undefined, {
										month: 'short',
										day: 'numeric',
										year: 'numeric'
									})}
								</p>
							</div>
						</div>
					</div>

					<!-- Right Side: Details & Actions -->
					<div class="flex-1 p-10 flex flex-col justify-between">
						<div class="space-y-8">
							<div class="space-y-4">
								<div class="flex items-center gap-3">
									<div
										class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20"
									>
										<ShieldCheck class="w-6 h-6" />
									</div>
									<h3 class="text-xl font-bold">Registration Verification</h3>
								</div>
								<p class="text-muted-foreground text-sm leading-relaxed">
									Please review the practitioners medical license provided below to verify their
									identity and legal standing to practice.
								</p>
							</div>

							<div class="space-y-4">
								<p class="text-sm font-bold text-muted-foreground capitalize tracking-widest">
									Verification Document
								</p>
								{#if d.licenseUrl}
									<a
										href={d.licenseUrl}
										target="_blank"
										class="flex items-center justify-between p-6 rounded-2xl bg-primary/5 border-2 border-dashed border-primary/30 hover:bg-primary/10 hover:border-primary transition-all group"
									>
										<div class="flex items-center gap-4">
											<div
												class="w-12 h-12 rounded-xl bg-background flex items-center justify-center border border-border/40 shadow-sm"
											>
												<FileText class="w-6 h-6 text-primary" />
											</div>
											<div class="text-left">
												<p class="font-bold text-sm">Medical Practice License</p>
												<p class="text-xs text-muted-foreground">PDF/Image Document</p>
											</div>
										</div>
										<ExternalLink
											class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
										/>
									</a>
								{:else}
									<div
										class="p-8 rounded-2xl bg-red-500/5 border-2 border-dashed border-red-500/30 text-center space-y-2"
									>
										<p class="font-bold text-red-600">No Document Uploaded</p>
										<p class="text-xs text-red-500/70">
											The practitioner has not provided a license.
										</p>
									</div>
								{/if}
							</div>
						</div>

						<div class="flex gap-3 pt-6 border-t border-border/40">
							<Button
								variant="outline"
								class="flex-1 h-12 border-destructive/20 text-destructive hover:bg-destructive/10 font-bold gap-2"
								onclick={() => onReject(d.id)}
								disabled={loading && processingId === d.id}
							>
								<X class="w-4 h-4" />
								Reject
							</Button>
							<Button
								class="flex-[2] h-12 bg-green-600 hover:bg-green-700 text-white font-bold gap-2 shadow-lg shadow-green-500/20"
								onclick={() => onApprove(d.id)}
								disabled={loading && processingId === d.id}
							>
								{#if loading && processingId === d.id}
									<Loader2 class="w-4 h-4 animate-spin" />
								{:else}
									<Check class="w-5 h-5" />
								{/if}
								Approve Doctor
							</Button>
						</div>
					</div>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	{/if}
{/if}
