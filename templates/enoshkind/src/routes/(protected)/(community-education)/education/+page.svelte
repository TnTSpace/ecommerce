<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import {
		BookOpen,
		PlayCircle,
		FileText,
		TrendingUp,
		Clock,
		ArrowRight,
		Search,
		Bookmark,
		Plus,
		Loader2,
		Settings2,
		Video,
		Share2,
		Sparkles
	} from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import ViewArticleDialog from './components/ViewArticleDialog.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import { cn } from '$lib/utils';
	import { goto } from '$app/navigation';

	let articles = $state<any[]>([]);
	let loading = $state(true);
	let isViewOpen = $state(false);
	let selectedArticle = $state<any | null>(null);

	const isAdmin = $derived(page.data.user?.role === 'admin');

	let searchQuery = $state('');
	let activeCategory = $state('All Topics');

	const filteredArticles = $derived(
		articles.filter((article) => {
			const matchesSearch =
				article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				article.content?.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory =
				activeCategory === 'All Topics' || article.category === activeCategory;
			return matchesSearch && matchesCategory;
		})
	);

	const categories = [
		'All Topics',
		'Nutrition',
		'Diabetes',
		'Hypertension',
		'Cancers',
		'Mental Health',
		'Fitness',
		'Genetics'
	];

	async function fetchArticles() {
		try {
			const res = await fetch('/api/education');
			if (res.ok) {
				const result = await res.json();
				articles = result.data;
			}
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	}

	function handleEdit(id: string) {
		goto(`/education/manage/${id}`);
	}

	function handleView(article: any) {
		selectedArticle = article;
		isViewOpen = true;
	}

	function triggerAdd() {
		goto('/education/manage');
	}

	onMount(fetchArticles);
</script>

<div class="space-y-10 w-full box-border pb-12 max-w-7xl mx-auto overflow-x-hidden">
	<!-- Header Section -->
	<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4">
		<div class="space-y-2">
			<h1 class="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
				Health Hub
			</h1>
			<p class="text-muted-foreground text-sm md:text-lg font-medium max-w-xl leading-relaxed">
				Explore expert-curated health education and professional medical insights tailored for your
				wellness journey.
			</p>
		</div>

		<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
			<div class="relative flex-1 lg:w-72">
				<Search class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
				<Input
					placeholder="Search masterclasses..."
					class="pl-12 h-12 rounded-[1.25rem] bg-card/50 border-border/40 focus:ring-primary/20 transition-all font-medium"
					bind:value={searchQuery}
				/>
			</div>
			{#if isAdmin}
				<Button
					class="h-12 px-6 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-[1.25rem] font-bold transition-all active:scale-[0.98]"
					onclick={triggerAdd}
				>
					<Plus class="w-5 h-5 mr-2" />
					New Content
				</Button>
			{/if}
		</div>
	</div>

	<!-- Premium Categories Bar -->
	<div class="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
		{#each categories as category}
			<button
				class={cn(
					buttonVariants({ variant: category === activeCategory ? 'default' : 'ghost' }),
					'px-6 py-2.5 font-bold capitalize text-sm tracking-widest transition-all duration-300 border-none outline-none focus:ring-2 focus:ring-primary/20',
					category === activeCategory
						? 'shadow-lg shadow-primary/30 scale-105'
						: 'bg-card/40 border-border/40 hover:bg-primary/5 hover:border-primary/20 text-muted-foreground hover:text-primary'
				)}
				onclick={() => (activeCategory = category)}
			>
				{category}
			</button>
		{/each}
	</div>

	<!-- Main Grid -->
	<div class="space-y-8">
		<div class="flex items-center justify-between px-1">
			<h3 class="text-2xl font-bold flex items-center gap-3">
				<FileText class="w-6 h-6 text-primary" />
				Expert Publications
			</h3>
			<p class="text-xs font-bold text-muted-foreground capitalize tracking-widest hidden sm:block">
				Showing {filteredArticles.length} Results
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredArticles as article}
				<Card.Root
					class="group hover:bg-card/80 transition-all border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden flex flex-col rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 duration-500 relative"
				>
					<button
						class="aspect-video bg-muted/30 flex items-center justify-center relative overflow-hidden w-full p-0 border-none group/thumb"
						onclick={() => handleView(article)}
					>
						<div
							class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
						>
							<div
								class="p-4 bg-white/20 backdrop-blur-md rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"
							>
								{#if article.videoUrl}
									<Video class="w-8 h-8 text-white fill-white" />
								{:else}
									<ArrowRight class="w-8 h-8 text-white" />
								{/if}
							</div>
						</div>

						<div
							class="text-6xl font-bold text-muted-foreground/5 capitalize tracking-tighter select-none group-hover:scale-110 transition-transform duration-700"
						>
							{article.image || article.category.substring(0, 3)}
						</div>

						{#if article.premium}
							<Badge
								class="absolute top-5 left-5 bg-amber-500/90 text-white border-none font-bold text-[9px] capitalize tracking-widest shadow-lg shadow-amber-500/30 backdrop-blur-sm px-3 py-1 z-20"
								>Premium Content</Badge
							>
						{/if}

						{#if article.videoUrl}
							<div
								class="absolute bottom-5 right-5 z-20 p-2 bg-primary text-white rounded-xl shadow-lg animate-pulse"
							>
								<Video class="w-4 h-4" />
							</div>
						{/if}
					</button>

					<Card.Content class="p-7 flex-1 flex flex-col gap-5">
						<div class="flex items-center justify-between">
							<Badge
								variant="secondary"
								class="bg-primary/5 text-primary border-none text-[9px] capitalize font-bold tracking-widest px-3"
								>{article.category}</Badge
							>
							<div
								class="flex items-center gap-2 text-sm text-muted-foreground font-bold capitalize tracking-widest"
							>
								<Clock class="w-3.5 h-3.5" />
								{article.duration} min read
							</div>
						</div>

						<div class="flex-1 space-y-2">
							<button
								class="font-bold tracking-tight leading-tight group-hover:text-primary transition-colors text-xl md:text-2xl line-clamp-2 text-left w-full p-0 border-none hover:bg-transparent"
								onclick={() => handleView(article)}
							>
								{article.title}
							</button>
							<p class="text-sm text-muted-foreground/70 font-medium line-clamp-2 italic">
								Professional analysis on {article.category.toLowerCase()} and modern healthcare protocols.
							</p>
						</div>

						<div class="pt-5 flex items-center justify-between border-t border-border/20">
							<div class="flex items-center gap-2">
								<Button
									variant="ghost"
									size="sm"
									class="text-primary font-bold capitalize text-sm tracking-widest p-0 h-auto hover:bg-transparent group/btn flex items-center gap-2 transition-all active:translate-x-1"
									onclick={() => handleView(article)}
								>
									Full Access <ArrowRight
										class="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
									/>
								</Button>
							</div>
							<div class="flex items-center gap-1">
								{#if isAdmin}
									<Button
										variant="ghost"
										size="icon"
										class="h-9 w-9 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
										onclick={() => handleEdit(article.id)}
									>
										<Settings2 class="w-4 h-4" />
									</Button>
								{/if}
								<Button
									variant="ghost"
									size="icon"
									class="h-9 w-9 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-xl transition-all"
								>
									<Share2 class="w-4 h-4" />
								</Button>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			{:else}
				<div
					class="col-span-full py-32 text-center border-2 border-dashed border-border/20 rounded-[3rem] bg-card/20 space-y-6"
				>
					<div
						class="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto shadow-inner"
					>
						<BookOpen class="w-10 h-10 text-muted-foreground/30" />
					</div>
					<div class="space-y-2">
						<p class="text-xl font-bold text-muted-foreground">Expert series coming soon</p>
						<p class="text-sm text-muted-foreground/60 font-medium">
							We are currently curating the latest medical research for this category.
						</p>
					</div>
					<Button
						variant="outline"
						class="rounded-[1.25rem] font-bold px-8 h-12"
						onclick={() => (activeCategory = 'All Topics')}
					>
						Reset Filter
					</Button>
				</div>
			{/each}
		</div>
	</div>

	<!-- Premium Education Newsletter -->
	<Card.Root
		class="bg-primary/5 border border-primary/10 rounded-[2.5rem] overflow-hidden relative border-2 mt-12"
	>
		<div
			class="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none"
		></div>
		<Card.Content
			class="p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10"
		>
			<div class="space-y-3 text-center lg:text-left max-w-xl">
				<Badge
					variant="outline"
					class="border-primary/30 text-primary font-bold capitalize text-[9px] tracking-widest px-3"
					>Weekly Digest</Badge
				>
				<h3 class="text-3xl font-bold tracking-tight">Professional Wellness Intelligence</h3>
				<p class="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
					Join 15,000+ members receiving clinical health updates, nutrition protocols, and
					expert-reviewed wellness strategies every Sunday.
				</p>
			</div>
			<div class="flex flex-col sm:flex-row w-full lg:w-auto gap-3 items-center">
				<Input
					placeholder="Enter your business email"
					class="h-14 bg-background border-border/40 rounded-[1.25rem] min-w-[300px] font-medium px-6"
				/>
				<Button
					class="h-14 px-10 font-bold rounded-[1.25rem] bg-primary text-white shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
					onclick={() =>
						toast.success('Subscription Confirmed', {
							description: 'Welcome to Enoshkind Intelligence.'
						})}>Secure Access</Button
				>
			</div>
		</Card.Content>
	</Card.Root>

	<ViewArticleDialog bind:open={isViewOpen} article={selectedArticle} />
</div>

<style>
	:global(.no-scrollbar::-webkit-scrollbar) {
		display: none;
	}
	:global(.no-scrollbar) {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
