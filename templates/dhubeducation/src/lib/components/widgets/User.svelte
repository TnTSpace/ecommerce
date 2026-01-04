<script lang="ts">
	import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "svelte-clerk";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import { Button } from "$lib/components/ui/button";
	import { UserIcon } from "lucide-svelte";


</script>


<ClerkLoading>
  <Skeleton class="size-10 rounded-full" />
</ClerkLoading>
<ClerkLoaded>
  <SignedIn>
    <UserButton
      appearance={{
        elements: {
          avatarBox: 'size-10'
        }
      }}
    />
  </SignedIn>

  <SignedOut>
    <Button aria-label="User Sign In Button" href="/sign-in" class="rounded-full" variant="outline" size="icon">
      <UserIcon class="size-4" />
    </Button>
  </SignedOut>
</ClerkLoaded>