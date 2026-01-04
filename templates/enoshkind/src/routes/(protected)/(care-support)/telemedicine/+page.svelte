<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Tabs from '$lib/components/ui/tabs';
	import {
		Video,
		Calendar as CalendarIcon,
		ArrowRight,
		Phone,
		Search,
		Activity,
		Stethoscope,
		Beaker,
		Pill,
		Bell,
		FileText,
		TrendingUp,
		Truck,
		ClipboardCheck,
		Plus,
		LayoutDashboard,
		Rocket
	} from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';
	import * as ScrollArea from '$lib/components/ui/scroll-area';
	import SelectComponent from '$lib/components/ui/select/select-component.svelte';
	import AppointmentsDialog from './components/AppointmentsDialog.svelte';
	import BookingDialog from './components/BookingDialog.svelte';
	import LabOrderDialog from './components/LabOrderDialog.svelte';
	import PrescriptionOrderDialog from './components/PrescriptionOrderDialog.svelte';
	import OrderListRow from './components/OrderListRow.svelte';
	import AddDoctorDialog from './components/AddDoctorDialog.svelte';
	import PharmacyNetwork from './components/PharmacyNetwork.svelte';
	import ViewDetailsDialog from './components/ViewDetailsDialog.svelte';
	import {
		Table,
		TableBody,
		TableHeader,
		TableHead,
		TableRow,
		TableCell
	} from '$lib/components/ui/table';
	import SpecialistCard from './components/SpecialistCard.svelte';
	import SpecialistTable from './components/SpecialistTable.svelte';
	import { Loader2 } from '@lucide/svelte';
	import { Debounced } from 'runed';
	import { infiniteScroll } from '$lib/hooks/use-infinite-scroll.svelte';
	import type { iDoctor } from '$lib/interface';
	import { toast } from 'svelte-sonner';

	let doctors = $state<iDoctor[]>([]);
	let consultations = $state<any[]>([]);
	let labOrders = $state<any[]>([]);
	let pharmacyOrders = $state<any[]>([]);
	let prescriptions = $state<any[]>([]);
	let loading = $state(true);
	let selectedDoctor = $state<iDoctor | null>(null);
	let selectedPrescription = $state<any | null>(null);
	let selectedItem = $state<any | null>(null);
	let selectedType = $state<'consultation' | 'lab' | 'pharmacy'>('consultation');

	// Dialog States
	let isBookingOpen = $state(false);
	let isLabOpen = $state(false);
	let isPharmacyOpen = $state(false);
	let isAppointmentsOpen = $state(false);
	let isAddDoctorOpen = $state(false);
	let isDetailsOpen = $state(false);

	let isAdmin = $derived(page.data.user?.role === 'admin');

	// Filter States
	let searchQuery = $state('');
	const debouncedSearch = new Debounced(() => searchQuery, 500);
	let selectedSpecialty = $state('All');

	const getDoctorParams = () => ({
		host: page.url.origin,
		search: debouncedSearch.current,
		field: 'doctors',
		specialty: selectedSpecialty !== 'All' ? selectedSpecialty : undefined
	});

	const doctorsQuery = $derived(infiniteScroll.listQueryAlternate<iDoctor>(getDoctorParams()));

	let specialtyOptions = $derived(
		[{ label: 'All Specialties', value: 'All' }, ...new Set(doctors.map((d) => d.specialty))].map(
			(s) => (typeof s === 'string' ? { label: s, value: s } : s)
		)
	);

	const isDoctor = $derived(page.data.isDoctor);

	function openBooking(doctor: iDoctor) {
		selectedDoctor = doctor;
		isBookingOpen = true;
	}

	function openPharmacy(p: any) {
		selectedPrescription = p;
		isPharmacyOpen = true;
	}

	function handleViewDetails(item: any, type: any) {
		selectedItem = item;
		selectedType = type;
		isDetailsOpen = true;
	}

	async function refreshData() {
		try {
			const [docRes, preRes, conRes, labRes, pharmRes] = await Promise.all([
				fetch('/api/doctors'),
				fetch('/api/prescriptions'),
				fetch('/api/consultations'),
				fetch('/api/lab-orders'),
				fetch('/api/pharmacy-orders')
			]);

			const results = await Promise.all([
				docRes.ok ? docRes.json() : Promise.resolve({ success: false, data: [] }),
				preRes.ok ? preRes.json() : Promise.resolve({ success: false, data: [] }),
				conRes.ok ? conRes.json() : Promise.resolve({ success: false, data: [] }),
				labRes.ok ? labRes.json() : Promise.resolve({ success: false, data: [] }),
				pharmRes.ok ? pharmRes.json() : Promise.resolve({ success: false, data: [] })
			]);

			const [docResult, preResult, conResult, labResult, pharmResult] = results;

			if (docResult.success) doctors = docResult.data;
			if (preResult.success) prescriptions = preResult.data;
			if (conResult.success) consultations = conResult.data;
			if (labResult.success) labOrders = labResult.data;
			if (pharmResult.success) pharmacyOrders = pharmResult.data;

			// Invalidate infinite query for doctors
			infiniteScroll.queryClient.invalidateQueries({ queryKey: ['doctors'] });
		} catch (e) {
			console.error('Data refresh failed:', e);
		}
	}

	onMount(async () => {
		loading = true;
		await refreshData();
		loading = false;
	});

	interface LabStep {
		label: string;
		time: string;
		status: 'completed' | 'active' | 'pending';
	}

	const labSteps: LabStep[] = [
		{ label: 'Order Placed', time: 'Yesterday 2:30 PM', status: 'completed' },
		{ label: 'Kit Prepared', time: 'Yesterday 4:45 PM', status: 'completed' },
		{ label: 'Out for Delivery', time: 'Today 8:00 AM', status: 'active' },
		{ label: 'Kit Delivered', time: 'Estimated 11:00 AM', status: 'pending' },
		{ label: 'Sample Collection', time: 'Tomorrow 7:00 AM', status: 'pending' }
	];
</script>

<div class="min-h-screen bg-transparent space-y-6 md:space-y-8 mx-auto w-full overflow-hidden">
	<!-- Top Branding Header -->
	<div
		class="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card/40 backdrop-blur-xl border border-border/50 p-6 rounded-xl shadow-2xl relative overflow-hidden"
	>
		<div
			class="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"
		></div>
		<div class="relative z-10">
			<h1
				class="text-2xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
			>
				Telemedicine Hub
			</h1>
			<p class="text-muted-foreground mt-2 font-medium">
				Connect with certified Nigerian healthcare providers online
			</p>
		</div>
		<div
			class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative z-10 w-full md:w-auto"
		>
			{#if isDoctor}
				<Button
					variant="outline"
					href="/telemedicine/doctor"
					class="rounded-xl border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all font-bold text-emerald-600 w-full sm:w-auto overflow-hidden whitespace-nowrap"
				>
					<LayoutDashboard class="mr-2 h-4 w-4 shrink-0" />
					Practitioner Portal
				</Button>
			{:else}
				<Button
					variant="outline"
					href="/telemedicine/onboarding"
					class="rounded-xl border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all font-bold w-full sm:w-auto overflow-hidden whitespace-nowrap"
				>
					<Rocket class="mr-2 h-4 w-4 text-primary shrink-0" />
					Become a Practitioner
				</Button>
			{/if}
			<Button
				variant="outline"
				class="rounded-xl border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all font-bold w-full sm:w-auto overflow-hidden whitespace-nowrap"
				onclick={() => (isAppointmentsOpen = true)}
			>
				<CalendarIcon class="mr-2 h-4 w-4 text-primary shrink-0" />
				My Activity Center
			</Button>
			<div class="flex items-center gap-2 justify-end sm:justify-start">
				<Button
					variant="outline"
					size="icon"
					class="rounded-xl border-primary/20 bg-primary/5 hover:bg-primary/10 relative shrink-0"
					onclick={() => toast.info('No new notifications')}
				>
					<Bell class="h-4 w-4 text-primary" />
					<span
						class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"
					></span>
				</Button>
			</div>
		</div>
	</div>

	<Tabs.Root value="virtual" class="w-full space-y-6">
		<ScrollArea.Root class="w-full">
			<Tabs.List
				class="inline-flex w-fit bg-card/60 backdrop-blur-md p-1.5 rounded-xl border border-border/40 shadow-lg h-auto"
			>
				<Tabs.Trigger
					value="virtual"
					class="rounded-xl px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all font-semibold"
				>
					<Video class="w-4 h-4 mr-2" />
					Virtual Consults
				</Tabs.Trigger>
				<Tabs.Trigger
					value="labs"
					class="rounded-xl px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all font-semibold"
				>
					<Beaker class="w-4 h-4 mr-2" />
					Home Testing
				</Tabs.Trigger>
				<Tabs.Trigger
					value="pharmacy"
					class="rounded-xl px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all font-semibold"
				>
					<Pill class="w-4 h-4 mr-2" />
					Pharmacy
				</Tabs.Trigger>
			</Tabs.List>
			<ScrollArea.Scrollbar orientation="horizontal" class="h-1" />
		</ScrollArea.Root>

		<!-- CONTENT: Virtual Consultations -->
		<Tabs.Content
			value="virtual"
			class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
		>
			<!-- Quick Info Bar: Benefits + Emergency -->
			<div
				class="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-6 p-4 md:p-5 bg-card/40 backdrop-blur-xl border border-border/50 rounded-xl shadow-lg"
			>
				<div class="flex flex-wrap items-center gap-3 md:gap-6 flex-1">
					{#each [{ icon: Phone, title: 'Instant Access', color: 'primary' }, { icon: Video, title: 'HD Video', color: 'primary' }, { icon: FileText, title: 'E-Prescriptions', color: 'primary' }] as perk}
						<div
							class="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors cursor-default group"
							title={perk.title}
						>
							<perk.icon class="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
							<span class="text-xs font-bold text-foreground/80 hidden sm:inline">{perk.title}</span
							>
						</div>
					{/each}
				</div>
				<div class="flex items-center gap-2">
					<a
						href="tel:+2347035278240"
						class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs transition-all"
					>
						<Activity class="w-4 h-4" />
						<span class="hidden sm:inline">Emergency</span>
						<span class="sm:hidden">+234 703 527 8240</span>
					</a>
				</div>
			</div>

			<!-- Search & Filter Bar -->
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div class="md:col-span-3 relative">
					<Search class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
					<Input
						bind:value={searchQuery}
						placeholder="Search specialist, symptom or condition..."
						class="pl-12 rounded-xl bg-card/40 border-border/50 text-base shadow-lg focus:ring-primary/20"
					/>
				</div>
				<SelectComponent
					options={specialtyOptions}
					bind:value={selectedSpecialty}
					placeholder="All Specialties"
					name="specialty-filter"
					class="w-full h-9 rounded-xl border-border/50 bg-card/40 backdrop-blur-md text-base font-bold shadow-lg"
				/>
			</div>

			<!-- Specialists Section Header -->
			<div class="flex items-center justify-between">
				<h2 class=" md:text-2xl font-bold flex items-center gap-3 truncate">
					<Stethoscope class="w-6 h-6 md:w-7 md:h-7 text-primary" />
					Recommended Specialists
				</h2>
				<div class="flex items-center gap-2">
					{#if isAdmin}
						<Button
							variant="outline"
							class="rounded-xl border-primary/20 bg-primary/5 hover:bg-primary/10 font-bold h-10 px-4"
							onclick={() => (isAddDoctorOpen = true)}
						>
							<Plus class="w-4 h-4 mr-2" />
							<span class="hidden sm:inline">Add Specialist</span>
							<span class="sm:hidden">Add</span>
						</Button>
					{/if}
				</div>
			</div>

			<!-- Desktop Table View (Full Width) -->
			<div class="hidden lg:block">
				{#if $doctorsQuery.isSuccess}
					<SpecialistTable doctors={$doctorsQuery.data.results} onBook={openBooking} />
				{:else if $doctorsQuery.isPending}
					<div
						class="h-64 flex items-center justify-center bg-card/40 rounded-[2rem] border border-border/50"
					>
						<Loader2 class="w-10 h-10 animate-spin text-primary" />
					</div>
				{/if}
			</div>

			<!-- Mobile/Tablet Card View -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
				{#if $doctorsQuery.isSuccess}
					{#each $doctorsQuery.data.results as doctor}
						<SpecialistCard {doctor} onBook={openBooking} />
					{/each}
					{#if $doctorsQuery.data.results.length === 0}
						<div
							class="col-span-full bg-card/40 border border-border/50 rounded-xl p-8 text-center text-muted-foreground font-medium"
						>
							No specialists found matching your search.
						</div>
					{/if}
				{:else if $doctorsQuery.isPending}
					{#each Array(4) as _}
						<div class="h-48 animate-pulse bg-card/40 rounded-[2rem] border border-border/50"></div>
					{/each}
				{/if}
			</div>

			<!-- Load More Button -->
			{#if $doctorsQuery.isSuccess && ($doctorsQuery.hasNextPage || $doctorsQuery.isFetchingNextPage)}
				<div class="flex justify-center mt-6">
					<Button
						variant="outline"
						class="rounded-xl px-8 py-6 font-bold border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary"
						disabled={$doctorsQuery.isFetchingNextPage}
						onclick={() => $doctorsQuery.fetchNextPage()}
					>
						{#if $doctorsQuery.isFetchingNextPage}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Loading specialists...
						{:else}
							Load More Specialists
						{/if}
					</Button>
				</div>
			{/if}
		</Tabs.Content>

		<!-- CONTENT: Home Testing -->
		<Tabs.Content
			value="labs"
			class="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500"
		>
			<!-- Special Offer Banner -->
			<div
				class="bg-gradient-to-r from-emerald-600 to-emerald-500 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl"
			>
				<div
					class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
				></div>
				<div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
					<div class="text-white max-w-xl">
						<Badge
							class="bg-white/20 hover:bg-white/30 text-white border-none font-bold px-4 py-1.5 rounded-full mb-4"
							>🏠 LAB-TO-HOME NIGERIA</Badge
						>
						<h2 class="text-4xl font-bold leading-tight">
							Professional health testing from the comfort of your home
						</h2>
						<div class="flex flex-wrap gap-4 mt-6">
							{#each ['Nationwide Delivery', 'Results in 24-48 Hours', 'Certified Labs'] as tag}
								<div
									class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md"
								>
									<ClipboardCheck class="w-4 h-4" />
									{tag}
								</div>
							{/each}
						</div>
					</div>
					<Button
						class="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-8 rounded-[2rem] font-bold  shadow-xl shrink-0 group"
						onclick={() => (isLabOpen = true)}
					>
						Book a Home Test
						<ArrowRight class="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
					</Button>
				</div>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- MY LAB TESTS LIST -->
				<div class="lg:col-span-2 space-y-6">
					<div class="flex items-center justify-between">
						<h2 class=" md:text-2xl font-bold flex items-center gap-3">
							<Beaker class="w-7 h-7 text-primary" />
							My Home Tests
						</h2>
					</div>

					<div
						class="hidden md:block bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2rem] overflow-hidden shadow-xl"
					>
						<Table>
							<TableHeader class="bg-muted/50">
								<TableRow>
									<TableHead class="font-bold text-sm capitalize tracking-widest text-primary"
										>Test Type</TableHead
									>
									<TableHead class="font-bold text-sm capitalize tracking-widest text-primary"
										>Collection Date</TableHead
									>
									<TableHead class="font-bold text-sm capitalize tracking-widest text-primary"
										>Status</TableHead
									>
									<TableHead class="font-bold text-sm capitalize tracking-widest text-primary"
										>Payment</TableHead
									>
									<TableHead
										class="text-right font-bold text-sm capitalize tracking-widest text-primary"
										>Actions</TableHead
									>
								</TableRow>
							</TableHeader>
							<TableBody>
								{#if labOrders.length === 0}
									<TableRow>
										<TableCell
											colspan={5}
											class="h-32 text-center text-muted-foreground font-medium"
										>
											No tests ordered yet. Book a home test above!
										</TableCell>
									</TableRow>
								{:else}
									{#each labOrders as item}
										<OrderListRow
											type="lab"
											{item}
											screen="desktop"
											onViewDetails={handleViewDetails}
										/>
									{/each}
								{/if}
							</TableBody>
						</Table>
					</div>

					<div class="grid grid-cols-1 gap-4 md:hidden">
						{#if labOrders.length === 0}
							<div
								class="bg-card/40 border border-border/50 rounded-xl p-8 text-center text-muted-foreground font-medium"
							>
								No lab orders found.
							</div>
						{:else}
							{#each labOrders as item}
								<OrderListRow type="lab" {item} screen="mobile" onViewDetails={handleViewDetails} />
							{/each}
						{/if}
						<div class="grid grid-cols-1 gap-8">
							<div class="space-y-6">
								<PharmacyNetwork />
							</div>

							<!-- Lab Results Preview (Full Width) -->
							<Card.Root
								class="bg-card/40 border-border/50 rounded-[2rem] shadow-xl border-accent border-2 relative overflow-hidden"
							>
								<div class="absolute top-4 right-4 md:top-8 md:right-8">
									<div
										class="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-emerald-500/20 flex items-center justify-center font-bold text-xl md:text-2xl text-emerald-500 bg-emerald-500/5 backdrop-blur-sm"
									>
										87
									</div>
								</div>
								<Card.Header class="p-6 md:p-10">
									<Card.Title class="text-2xl md:text-3xl font-bold flex items-center gap-3">
										<TrendingUp class="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
										Your Health Score
									</Card.Title>
									<Card.Description class="text-base font-medium">
										Your overall health status based on recent diagnostic assessments.
									</Card.Description>
								</Card.Header>
								<Card.Content class="p-6 md:p-10 pt-0 md:pt-0 space-y-6 md:space-y-10">
									<div class="bg-emerald-500/10 p-6 rounded-xl border border-emerald-500/10">
										<p class=" md:text-xl font-bold text-emerald-700">Excellent Score!</p>
										<p
											class="text-sm md:text-base text-emerald-600 font-medium mt-2 leading-relaxed"
										>
											Consistency is key. 8 of your 10 tracked health metrics are currently within
											the optimal range. Keep up your routine!
										</p>
									</div>
									<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
										{#each [{ n: 'Vitamin D', v: '18 ng/mL', s: 'Borderline', c: 'amber', icon: Beaker }, { n: 'Testosterone', v: '320 ng/dL', s: 'Normal Low', c: 'emerald', icon: Activity }] as test}
											<div
												class="flex items-center justify-between p-6 bg-background/40 backdrop-blur-md rounded-xl border border-border/30 shadow-sm"
											>
												<div class="flex items-center gap-4">
													<div
														class="w-12 h-12 rounded-xl bg-{test.c}-500/10 flex items-center justify-center"
													>
														<test.icon class="w-6 h-6 text-{test.c}-500" />
													</div>
													<div>
														<p class="font-bold text-base md:">{test.n}</p>
														<p
															class="text-sm md:text-xs text-{test.c}-500 font-bold capitalize tracking-widest"
														>
															{test.s}
														</p>
													</div>
												</div>
												<div class="text-xl md:text-2xl font-bold">{test.v}</div>
											</div>
										{/each}
									</div>
									<Button
										class="w-full py-8 md:py-10 rounded-xl md:rounded-[2rem] bg-emerald-500 hover:bg-emerald-600 font-bold  md:text-xl shadow-2xl shadow-emerald-500/30 transition-all hover:scale-[1.01]"
										variant="default"
									>
										Go to Results Center
										<ArrowRight class="ml-3 w-6 h-6" />
									</Button>
								</Card.Content>
							</Card.Root>
						</div>
					</div>
				</div>
			</div></Tabs.Content
		>

		<Tabs.Content
			value="pharmacy"
			class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500"
		>
			<PharmacyNetwork />
		</Tabs.Content>
	</Tabs.Root>

	<BookingDialog bind:open={isBookingOpen} doctor={selectedDoctor} />
	<LabOrderDialog bind:open={isLabOpen} />
	<PrescriptionOrderDialog bind:open={isPharmacyOpen} prescription={selectedPrescription} />
	<AppointmentsDialog bind:open={isAppointmentsOpen} onViewDetails={handleViewDetails} />
	<AddDoctorDialog bind:open={isAddDoctorOpen} onAdded={refreshData} />
	<ViewDetailsDialog bind:open={isDetailsOpen} item={selectedItem} type={selectedType} />
</div>

<style>
	:global(.animate-in) {
		animation: slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
