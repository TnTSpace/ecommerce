<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { Trophy, ArrowLeft, Medal, Crown, Loader2 } from "@lucide/svelte";
  import { ScoreTypes, AgeGroups } from "$lib/constants";
  import SelectComponent from "$lib/components/ui/select/select-component.svelte";
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "$lib/components/ui/avatar";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Badge } from "$lib/components/ui/badge";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/ui/table";
  import { Skeleton } from "$lib/components/ui/skeleton";
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Drawer from "$lib/components/ui/drawer";
  import { Separator } from "$lib/components/ui/separator";
  import { Calendar, User, Hash } from "@lucide/svelte";
  import { useInfiniteScroll } from "$lib/hooks/use-infinite-scroll.svelte";
  import { onMount } from "svelte";

  let { data } = $props();
  let selectedType = $state(data.scoreType);
  let selectedAgeGroup = $state(data.ageGroup);

  // Get current year and generate year options
  const currentYear = new Date().getFullYear();
  const startYear = 2020; // Adjust this based on when your system started
  const yearOptions = [
    { label: "All Years", value: "all" },
    ...Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
      const year = currentYear - i;
      return { label: year.toString(), value: year.toString() };
    }),
  ];

  let selectedYear = $state(currentYear.toString()); // Default to current year

  // State
  let leaderboard = $state<any[]>([]);
  let meta = $state({ nextOffset: 0, hasMore: false });
  let loading = $state(false);
  let initialLoading = $state(true);

  // Dialog/Drawer state
  let selectedChild = $state<any>(null);
  let isOpen = $state(false);
  let isDesktop = $state(
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : true,
  );

  // Initialize data from streamed promise
  $effect(() => {
    data.leaderboard.then((result) => {
      leaderboard = result.data?.data || [];
      meta = result.data?.meta || { nextOffset: 0, hasMore: false };
      initialLoading = false;
    });
  });

  // Infinite Scroll
  const loadMore = async () => {
    if (loading || !meta.hasMore) return;
    loading = true;

    const params = new URLSearchParams({
      scoreType: selectedType,
      ageGroup: selectedAgeGroup,
      year: selectedYear,
      limit: "28",
      offset: meta.nextOffset.toString(),
    });

    try {
      const res = await fetch(`/api/scores/leaderboard?${params}`);
      const result = await res.json();
      leaderboard = [...leaderboard, ...(result.data?.data || [])];
      meta = result.data?.meta || meta;
    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
    }
  };

  const { sentinel } = useInfiniteScroll({
    onLoadMore: loadMore,
    disabled: () => !meta.hasMore || loading,
  });

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  const handleTypeChange = async (value: string) => {
    selectedType = value;
    updateUrl();
  };

  const handleAgeGroupChange = async (value: string) => {
    selectedAgeGroup = value;
    updateUrl();
  };

  const handleYearChange = async (value: string) => {
    selectedYear = value;
    updateUrl();
  };

  const updateUrl = async () => {
    const params = new URLSearchParams(window.location.search);
    params.set("scoreType", selectedType);
    params.set("ageGroup", selectedAgeGroup);
    params.set("year", selectedYear);
    await goto(`?${params.toString()}`, { keepFocus: true, noScroll: true });

    // Reset data - await the new promise
    const result = await data.leaderboard;
    leaderboard = result.data?.data || [];
    meta = result.data?.meta || { nextOffset: 0, hasMore: false };
  };

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    selectedType = params.get("scoreType") || "all";
    selectedAgeGroup = params.get("ageGroup") || "all";
    selectedYear = params.get("year") || currentYear.toString();

    const checkDesktop = () => {
      isDesktop = window.innerWidth >= 768;
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return { icon: Crown, color: "text-yellow-500 fill-yellow-500" };
      case 1:
        return { icon: Medal, color: "text-gray-400 fill-gray-400" };
      case 2:
        return { icon: Medal, color: "text-amber-700 fill-amber-700" };
      default:
        return null;
    }
  };

  const handleRowClick = (child: any) => {
    selectedChild = child;
    isOpen = true;
  };

  const getTestLabel = (scoreType: string) => {
    if (
      scoreType === ScoreTypes.BIBLE_WRITING ||
      scoreType === "Bible Writing"
    ) {
      return "Submissions";
    }
    return "Tests Taken";
  };

  // Prepare options for SelectComponent
  const scoreTypeOptions = [
    { label: "All Types", value: "all" },
    ...Object.values(ScoreTypes).map((type) => ({ label: type, value: type })),
  ];

  const ageGroupOptions = [
    { label: "All Ages", value: "all" },
    ...Object.values(AgeGroups).map((group) => ({
      label: group,
      value: group,
    })),
  ];
</script>

<div class="flex flex-col gap-6 max-w-7xl">
  <!-- Header -->
  <div
    class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
  >
    <div class="space-y-1">
      <div class="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          href="/scores"
          class="h-8 w-8 -ml-2"
        >
          <ArrowLeft class="h-4 w-4" />
        </Button>
        <h1 class="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Trophy class="h-8 w-8 text-primary" />
          Leaderboard
        </h1>
      </div>
      <p class="text-muted-foreground ml-8">
        Leaders ranked by normalized scores across all tests.
      </p>
    </div>

    <!-- Filters -->
    <div
      class="flex flex-col gap-2 w-full md:w-auto sticky top-0 z-20 bg-background py-2"
    >
      <!-- Mobile Filters (SelectComponent) -->
      <div class="flex md:hidden flex-col gap-2">
        <SelectComponent
          options={scoreTypeOptions}
          bind:value={selectedType}
          name="scoreType"
          placeholder="Select score type"
          class="w-full"
          onValueChange={handleTypeChange}
        />
        <SelectComponent
          options={ageGroupOptions}
          bind:value={selectedAgeGroup}
          name="ageGroup"
          placeholder="Select age group"
          class="w-full"
          onValueChange={handleAgeGroupChange}
        />
        <SelectComponent
          options={yearOptions}
          bind:value={selectedYear}
          name="year"
          placeholder="Select year"
          class="w-full"
          onValueChange={handleYearChange}
        />
      </div>

      <!-- Desktop Filters (SelectComponent) -->
      <div class="hidden md:flex gap-3 items-center">
        <SelectComponent
          options={scoreTypeOptions}
          bind:value={selectedType}
          name="scoreType"
          placeholder="Score Type"
          class="w-[200px]"
          onValueChange={handleTypeChange}
        />

        <SelectComponent
          options={ageGroupOptions}
          bind:value={selectedAgeGroup}
          name="ageGroup"
          placeholder="Age Group"
          class="w-[160px]"
          onValueChange={handleAgeGroupChange}
        />

        <SelectComponent
          options={yearOptions}
          bind:value={selectedYear}
          name="year"
          placeholder="Year"
          class="w-[140px]"
          onValueChange={handleYearChange}
        />
      </div>
    </div>
  </div>

  {#if initialLoading}
    <div class="rounded-md border bg-card overflow-hidden">
      <div class="overflow-x-auto max-w-[calc(100vw-2rem)] md:max-w-full">
        <Table>
          <TableHeader class="sticky top-0 z-10 bg-card shadow-sm">
            <TableRow>
              <TableHead class="w-[60px] md:w-[80px] text-center"
                >Rank</TableHead
              >
              <TableHead class="min-w-[180px]">Child</TableHead>
              <TableHead class="hidden md:table-cell">Age Group</TableHead>
              <TableHead class="text-center hidden sm:table-cell"
                >Tests Taken</TableHead
              >
              <TableHead class="text-right whitespace-nowrap"
                >Total Score</TableHead
              >
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each Array(10) as _, i}
              <TableRow class="group hover:bg-muted/50">
                <TableCell class="text-center font-medium">
                  <div class="flex items-center justify-center">
                    <Skeleton class="h-5 w-5 rounded" />
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-3">
                    <Skeleton class="h-9 w-9 rounded-full" />
                    <div class="flex flex-col gap-2">
                      <Skeleton class="h-4 w-32" />
                      <Skeleton class="h-3 w-24 md:hidden" />
                    </div>
                  </div>
                </TableCell>
                <TableCell class="hidden md:table-cell">
                  <Skeleton class="h-6 w-20" />
                </TableCell>
                <TableCell class="text-center hidden sm:table-cell">
                  <Skeleton class="h-4 w-8 mx-auto" />
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex flex-col items-end gap-1">
                    <Skeleton class="h-6 w-16" />
                    <Skeleton class="h-3 w-12" />
                  </div>
                </TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </div>
    </div>
  {/if}

  {#if !initialLoading && leaderboard.length > 0}
    <div class="rounded-md border bg-card overflow-hidden">
      <div class="overflow-x-auto max-w-[calc(100vw-2rem)] md:max-w-full">
        <Table>
          <TableHeader class="sticky top-0 z-10 bg-card shadow-sm">
            <TableRow>
              <TableHead class="w-[60px] md:w-[80px] text-center"
                >Rank</TableHead
              >
              <TableHead class="min-w-[180px]">Child</TableHead>
              <TableHead class="hidden md:table-cell">Age Group</TableHead>
              <TableHead class="text-center hidden sm:table-cell"
                >Tests Taken</TableHead
              >
              <TableHead class="text-right whitespace-nowrap"
                >Total Score</TableHead
              >
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each leaderboard as child, i}
              {@const rankIcon = getRankIcon(i)}
              <TableRow
                class="group hover:bg-muted/50 cursor-pointer transition-colors"
                onclick={() => handleRowClick(child)}
              >
                <TableCell class="text-center font-medium">
                  <div class="flex items-center justify-center">
                    {#if rankIcon}
                      <rankIcon.icon class={`h-5 w-5 ${rankIcon.color}`} />
                    {:else}
                      <span class="text-muted-foreground">#{i + 1}</span>
                    {/if}
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-3">
                    <Avatar class="h-9 w-9 border border-border">
                      <AvatarImage
                        src={child.childImage}
                        alt={child.childName}
                      />
                      <AvatarFallback
                        class="text-xs bg-primary/10 text-primary font-medium"
                      >
                        {getInitials(child.childName)}
                      </AvatarFallback>
                    </Avatar>
                    <div class="flex flex-col">
                      <span
                        class="font-medium group-hover:text-primary transition-colors truncate max-w-[150px] md:max-w-none"
                      >
                        {child.childName}
                      </span>
                      <span class="text-xs text-muted-foreground md:hidden">
                        {child.childAgeGroup} • {child.scoreCount} tests
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell class="hidden md:table-cell text-muted-foreground">
                  <Badge variant="outline" class="font-normal">
                    {child.childAgeGroup}
                  </Badge>
                </TableCell>
                <TableCell
                  class="text-center text-muted-foreground hidden sm:table-cell"
                >
                  {child.scoreCount}
                </TableCell>
                <TableCell class="text-right">
                  <div class="flex flex-col items-end">
                    <span class="font-bold tabular-nums text-lg">
                      {child.totalScore.toFixed(2)}
                    </span>
                    <span
                      class="text-[10px] text-muted-foreground uppercase tracking-wider font-medium"
                    >
                      Points
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </div>
    </div>

    <!-- Infinite Scroll Sentinel -->
    <div use:sentinel class="flex justify-center py-4">
      {#if loading}
        <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
      {:else if !meta.hasMore}
        <p class="text-sm text-muted-foreground">No more results to load</p>
      {/if}
    </div>
  {/if}

  {#if !initialLoading && leaderboard.length === 0}
    <div
      class="flex flex-col items-center justify-center min-h-[400px] text-center p-8 border-2 border-dashed rounded-xl bg-muted/30"
    >
      <div class="bg-muted p-4 rounded-full mb-4">
        <Trophy class="h-8 w-8 text-muted-foreground opacity-50" />
      </div>
      <h3 class="text-lg font-semibold">No Leaderboard Data</h3>
      <p class="text-muted-foreground max-w-sm mt-2">
        Start recording scores to see the leaderboard rankings.
      </p>
      <Button href="/scores/new" variant="outline" class="mt-6">
        Record First Score
      </Button>
    </div>
  {/if}

  <!-- Child Details Dialog (Desktop) / Drawer (Mobile) -->
  {#if isDesktop}
    <Dialog.Root bind:open={isOpen}>
      <Dialog.Content class="max-w-2xl">
        <Dialog.Header>
          <Dialog.Title class="flex items-center gap-2">
            <Trophy class="h-5 w-5 text-primary" />
            Leaderboard Details
          </Dialog.Title>
          <Dialog.Description>
            Performance breakdown for {selectedChild?.childName}
          </Dialog.Description>
        </Dialog.Header>

        {#if selectedChild}
          <div class="space-y-6 py-4">
            <!-- Child Info -->
            <div class="flex items-center gap-4">
              <Avatar class="h-16 w-16 border-2 border-primary">
                <AvatarImage
                  src={selectedChild.childImage}
                  alt={selectedChild.childName}
                />
                <AvatarFallback class="text-lg bg-primary/10 text-primary">
                  {getInitials(selectedChild.childName)}
                </AvatarFallback>
              </Avatar>
              <div class="flex-1">
                <h3 class="text-xl font-semibold">{selectedChild.childName}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{selectedChild.childAgeGroup}</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <!-- Score Breakdown -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <div
                  class="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Trophy class="h-4 w-4" />
                  <span>Total Score</span>
                </div>
                <p class="text-3xl font-bold text-primary">
                  {selectedChild.totalScore.toFixed(2)}
                </p>
                <p class="text-xs text-muted-foreground">Normalized points</p>
              </div>

              <div class="space-y-1">
                <div
                  class="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Hash class="h-4 w-4" />
                  <span>{getTestLabel(selectedType)}</span>
                </div>
                <p class="text-3xl font-bold">{selectedChild.scoreCount}</p>
                <p class="text-xs text-muted-foreground">
                  {selectedType === "all" ? "All score types" : selectedType}
                </p>
              </div>
            </div>

            <Separator />

            <!-- Additional Info -->
            <div class="space-y-3">
              <h4 class="font-semibold text-sm">Score Calculation</h4>
              <div class="bg-muted/50 rounded-lg p-4 space-y-2">
                <p class="text-sm text-muted-foreground">
                  The total score is calculated by summing all normalized
                  scores.
                </p>
                <p class="text-sm text-muted-foreground">
                  <strong>Normalized Score</strong> = Points ÷ Age at Submission
                </p>
                <p class="text-sm text-muted-foreground">
                  This ensures fair comparison across different age groups.
                </p>
              </div>
            </div>
          </div>
        {/if}
      </Dialog.Content>
    </Dialog.Root>
  {:else}
    <Drawer.Root bind:open={isOpen}>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title class="flex items-center gap-2">
            <Trophy class="h-5 w-5 text-primary" />
            Leaderboard Details
          </Drawer.Title>
          <Drawer.Description>
            Performance breakdown for {selectedChild?.childName}
          </Drawer.Description>
        </Drawer.Header>

        {#if selectedChild}
          <div class="space-y-6 px-4 pb-8">
            <!-- Child Info -->
            <div class="flex items-center gap-4">
              <Avatar class="h-16 w-16 border-2 border-primary">
                <AvatarImage
                  src={selectedChild.childImage}
                  alt={selectedChild.childName}
                />
                <AvatarFallback class="text-lg bg-primary/10 text-primary">
                  {getInitials(selectedChild.childName)}
                </AvatarFallback>
              </Avatar>
              <div class="flex-1">
                <h3 class="text-xl font-semibold">{selectedChild.childName}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{selectedChild.childAgeGroup}</Badge>
                </div>
              </div>
            </div>

            <Separator />

            <!-- Score Breakdown -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <div
                  class="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Trophy class="h-4 w-4" />
                  <span>Total Score</span>
                </div>
                <p class="text-3xl font-bold text-primary">
                  {selectedChild.totalScore.toFixed(2)}
                </p>
                <p class="text-xs text-muted-foreground">Normalized points</p>
              </div>

              <div class="space-y-1">
                <div
                  class="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Hash class="h-4 w-4" />
                  <span>{getTestLabel(selectedType)}</span>
                </div>
                <p class="text-3xl font-bold">{selectedChild.scoreCount}</p>
                <p class="text-xs text-muted-foreground">
                  {selectedType === "all" ? "All score types" : selectedType}
                </p>
              </div>
            </div>

            <Separator />

            <!-- Additional Info -->
            <div class="space-y-3">
              <h4 class="font-semibold text-sm">Score Calculation</h4>
              <div class="bg-muted/50 rounded-lg p-4 space-y-2">
                <p class="text-sm text-muted-foreground">
                  The total score is calculated by summing all normalized
                  scores.
                </p>
                <p class="text-sm text-muted-foreground">
                  <strong>Normalized Score</strong> = Points ÷ Age at Submission
                </p>
                <p class="text-sm text-muted-foreground">
                  This ensures fair comparison across different age groups.
                </p>
              </div>
            </div>
          </div>
        {/if}
      </Drawer.Content>
    </Drawer.Root>
  {/if}
</div>
