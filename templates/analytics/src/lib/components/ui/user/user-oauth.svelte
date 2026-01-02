<script lang="ts">
	import type { iGoogleUser } from "$lib/interface";
	import { cn } from "$lib/utils";

  interface Props {
    class?: string;
    user: iGoogleUser;
    logo: any
  }

  let { class: className, user, logo: Logo }: Props = $props()

  const signOut = () => {
    location.href = "/auth/logout"
  }
</script>

<div
	class={cn("absolute z-[100] flex flex-col items-stretch justify-start overflow-hidden rounded-xl border border-solid border-gray-100 bg-white text-gray-800 shadow-lg outline-none", className)}
	role="dialog"
	aria-label="User button popover"
	id=":r2:"
	tabindex="-1"
>
	<div
		class="relative flex flex-col items-stretch justify-start overflow-hidden rounded-lg border border-solid border-gray-50 bg-white shadow-sm"
		style="z-index: 10;"
	>
		<span class="flex w-full flex-row items-center justify-start gap-4 p-4">
			<span
				class="relative flex h-9 w-9 flex-shrink-0 flex-row items-stretch justify-start overflow-hidden rounded-full bg-gray-600"
			>
				<img
					crossorigin="anonymous"
					src={user.picture}
					class="h-full w-full object-cover"
					title={user.name}
					alt={user.name}
				/>
				<span></span>
			</span>
			<span class="flex min-w-0 flex-col items-stretch justify-center text-left">
				<span class="flex items-center gap-1 text-sm font-medium text-inherit">
					<span
						class="font-inherit overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-normal text-inherit"
						>{user.name}</span
					>
				</span>
				<span
					class="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal leading-normal text-inherit"
					>{user.email}</span
				>
			</span>
		</span>
		<div
			class="flex flex-col items-stretch justify-start border-t border-solid border-gray-100"
			role="menu"
		>
			<button
        onclick={signOut}
				class="relative isolate inline-flex flex-1 items-center justify-start gap-4 border-t border-solid border-gray-100 bg-transparent p-4 text-sm font-medium leading-normal text-black/60 outline-none transition-all duration-100 hover:text-black/70"
				role="menuitem"
				data-variant="ghost"
				data-color="neutral"
			>
				<span
					class="flex flex-shrink-0 flex-row items-center justify-center gap-2"
					style="flex: 0 0 2.25rem;"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						class="h-4 w-4 max-w-full flex-shrink-0"
					>
						<path
							fill="currentColor"
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M2.6 2.604A2.045 2.045 0 0 1 4.052 2h3.417c.544 0 1.066.217 1.45.604.385.387.601.911.601 1.458v.69c0 .413-.334.75-.746.75a.748.748 0 0 1-.745-.75v-.69a.564.564 0 0 0-.56-.562H4.051a.558.558 0 0 0-.56.563v7.875a.564.564 0 0 0 .56.562h3.417a.558.558 0 0 0 .56-.563v-.671c0-.415.333-.75.745-.75s.746.335.746.75v.671c0 .548-.216 1.072-.6 1.459a2.045 2.045 0 0 1-1.45.604H4.05a2.045 2.045 0 0 1-1.45-.604A2.068 2.068 0 0 1 2 11.937V4.064c0-.548.216-1.072.6-1.459Zm8.386 3.116a.743.743 0 0 1 1.055 0l1.74 1.75a.753.753 0 0 1 0 1.06l-1.74 1.75a.743.743 0 0 1-1.055 0 .753.753 0 0 1 0-1.06l.467-.47H5.858A.748.748 0 0 1 5.112 8c0-.414.334-.75.746-.75h5.595l-.467-.47a.753.753 0 0 1 0-1.06Z"
						>
						</path>
					</svg>
				</span>Sign out
			</button>
		</div>
	</div>
	<div
		class="relative z-10 mt-[-0.5rem] flex flex-col items-stretch justify-between bg-gradient-to-t from-gray-50 to-gray-50 pt-2"
	>
		<div class="relative w-full p-4 px-8">
			<div class="relative z-10 mx-auto flex w-full flex-col items-center justify-center gap-2">
				<div class="flex w-full flex-row items-stretch justify-between">
					<div class="flex flex-row items-center justify-center gap-1 text-gray-600">
						<p class="m-0 font-sans text-xs font-medium leading-tight tracking-normal text-inherit">
							Secured by
						</p>
						<a
							aria-label="Clerk logo"
							class="inline-flex cursor-pointer items-center text-sm font-normal leading-normal text-inherit no-underline"
							href="https://group.jumia.com/"
							target="_blank"
							rel="noopener"
						>
              <Logo class="h-3 aspect-auto fill-muted-foreground" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
