<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { StreamState, type StreamConfig } from '../stream.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		Video,
		VideoOff,
		Mic,
		MicOff,
		MonitorUp,
		PhoneOff,
		Maximize,
		Minimize,
		Users,
		Clock,
		AlertCircle
	} from '@lucide/svelte';
	import type { StreamTimer } from '../stream-timer.svelte';
	import type { iConsultation } from '$lib/interface';
	import type { User } from 'better-auth';

	interface Props {
		streamConfig: StreamConfig;
		consultationDuration: number;
		consultation: iConsultation;
		user: User;
		timer: StreamTimer;
	}

	let { streamConfig, consultationDuration, consultation, user, timer }: Props = $props();

	let stream: StreamState | null = $state(null);
	let participantsContainer: HTMLDivElement | undefined = $state();

	// Format time
	const formatTime = (remaining: { hours: number; minutes: number; seconds: number }) => {
		const totalMinutes = remaining.hours * 60 + remaining.minutes;
		return `${totalMinutes.toString().padStart(2, '0')}:${remaining.seconds.toString().padStart(2, '0')}`;
	};

	onMount(async () => {
		stream = new StreamState(streamConfig);

		if (participantsContainer) {
			stream.setParticipantsContainer(participantsContainer);
		}

		await stream.initialize();
	});

	onDestroy(() => {
		stream?.destroy();
	});

	const handleLeave = async () => {
		await stream?.leaveCall();
		window.location.href = '/telemedicine';
	};
	const remaining = $derived(timer.timeRemainingInSession);
	const totalMinutes = $derived(remaining.hours * 60 + remaining.minutes);
	const isLowTime = $derived(totalMinutes < 5);
</script>

<svelte:head>
	<title>Video Consultation | Telemedicine</title>
</svelte:head>

<div class="relative h-[100dvh] w-full bg-gradient-to-b from-gray-900 to-black overflow-hidden">
	<!-- Header - Absolute positioned -->
	<div class="absolute top-0 left-0 right-0 z-20 p-2 sm:p-4">
		<div
			class="bg-gray-800/50 border-gray-700 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4"
		>
			<div class="flex items-center justify-between gap-2 flex-wrap">
				<div class="flex items-center gap-2 sm:gap-4 min-w-0">
					<div
						class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0"
					>
						<Video class="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
					</div>
					<div class="min-w-0">
						<h1 class="text-base sm:text-xl font-bold text-white truncate">Video Consultation</h1>
						<p class="text-xs sm:text-sm text-gray-400 truncate">
							{consultation.type || 'Consultation'}
						</p>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<!-- Timer -->
					<div
						class="flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full {isLowTime
							? 'bg-red-500/20 border-red-500/50'
							: 'bg-gray-700/50 border-gray-600'} border"
					>
						<Clock class="w-3 h-3 sm:w-4 sm:h-4 {isLowTime ? 'text-red-400' : 'text-amber-400'}" />
						<span
							class="font-mono text-sm sm: font-bold {isLowTime ? 'text-red-400' : 'text-white'}"
						>
							{formatTime(remaining)}
						</span>
					</div>

					<!-- Participants count -->
					{#if stream}
						<div
							class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-gray-700/50 border border-gray-600"
						>
							<Users class="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
							<span class="text-white text-sm font-medium">{stream.participants.length}</span>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Video Grid - Main content area -->
	<div class="absolute inset-0 pt-20 sm:pt-24 pb-24 sm:pb-28 px-2 sm:px-4">
		{#if stream?.error}
			<div class="bg-red-500/10 border border-red-500/30 rounded-xl p-4 sm:p-6">
				<div class="flex items-center gap-4">
					<AlertCircle class="w-6 h-6 sm:w-8 sm:h-8 text-red-400 shrink-0" />
					<div class="min-w-0">
						<h3 class="font-bold text-red-400">Connection Error</h3>
						<p class="text-red-300 text-sm truncate">{stream.error}</p>
					</div>
				</div>
			</div>
		{:else if stream?.connectionStatus === 'connecting'}
			<div class="flex items-center justify-center h-full">
				<div class="text-center">
					<div
						class="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
					></div>
					<p class="text-white text-base sm:">Connecting to video call...</p>
				</div>
			</div>
		{:else}
			<!-- Participants Grid -->
			<div
				bind:this={participantsContainer}
				class="grid gap-2 sm:gap-4 h-full w-full"
				style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));"
			>
				{#if stream}
					{#each stream.participants as participant (participant.sessionId)}
						<div
							id="participant-{participant.sessionId}"
							class="relative aspect-video bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
						>
							<!-- Participant name overlay -->
							<div
								class="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/80 to-transparent z-10"
							>
								<div class="flex items-center gap-2">
									<div
										class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0"
									>
										{stream.getParticipantName(participant).charAt(0).toUpperCase()}
									</div>
									<span class="text-white font-medium text-xs sm:text-sm truncate">
										{stream.getParticipantName(participant)}
										{#if participant.isLocalParticipant}
											<span class="text-sm sm:text-xs text-gray-400">(You)</span>
										{/if}
									</span>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>

	<!-- Controls - Absolute positioned at bottom -->
	<div class="absolute bottom-0 left-0 right-0 z-20 p-2 sm:p-4">
		<div class="flex justify-center">
			<div
				class="bg-gray-800/80 border border-gray-700 backdrop-blur-xl rounded-full px-3 sm:px-4 py-2 sm:py-3"
			>
				<div class="flex items-center gap-2 sm:gap-3">
					<!-- Video Toggle -->
					<Button
						variant={stream?.isVideoEnabled ? 'secondary' : 'destructive'}
						size="icon"
						class="rounded-full w-10 h-10 sm:w-12 sm:h-12"
						onclick={() => stream?.toggleVideo()}
					>
						{#if stream?.isVideoEnabled}
							<Video class="w-4 h-4 sm:w-5 sm:h-5" />
						{:else}
							<VideoOff class="w-4 h-4 sm:w-5 sm:h-5" />
						{/if}
					</Button>

					<!-- Audio Toggle -->
					<Button
						variant={stream?.isAudioEnabled ? 'secondary' : 'destructive'}
						size="icon"
						class="rounded-full w-10 h-10 sm:w-12 sm:h-12"
						onclick={() => stream?.toggleAudio()}
					>
						{#if stream?.isAudioEnabled}
							<Mic class="w-4 h-4 sm:w-5 sm:h-5" />
						{:else}
							<MicOff class="w-4 h-4 sm:w-5 sm:h-5" />
						{/if}
					</Button>

					<!-- Screen Share -->
					<Button
						variant={stream?.isScreenSharing ? 'default' : 'secondary'}
						size="icon"
						class="rounded-full w-10 h-10 sm:w-12 sm:h-12"
						onclick={() => stream?.toggleScreenShare()}
					>
						<MonitorUp class="w-4 h-4 sm:w-5 sm:h-5" />
					</Button>

					<!-- Fullscreen -->
					<Button
						variant="secondary"
						size="icon"
						class="rounded-full w-10 h-10 sm:w-12 sm:h-12"
						onclick={() => stream?.toggleFullscreen()}
					>
						{#if stream?.isFullscreen}
							<Minimize class="w-4 h-4 sm:w-5 sm:h-5" />
						{:else}
							<Maximize class="w-4 h-4 sm:w-5 sm:h-5" />
						{/if}
					</Button>

					<div class="w-px h-8 sm:h-10 bg-gray-600"></div>

					<!-- End Call -->
					<Button
						variant="destructive"
						size="icon"
						class="rounded-full w-10 h-10 sm:w-12 sm:h-12"
						onclick={handleLeave}
					>
						<PhoneOff class="w-4 h-4 sm:w-5 sm:h-5" />
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
