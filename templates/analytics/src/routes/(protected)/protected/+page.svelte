<script lang="ts">
  import { page } from '$app/state';
  const user = page.data.user;
</script>

{#if user}
  <h1>Welcome, {user.name}!</h1>
  <img src={user.picture} alt="Profile" />
{:else}
  <h1>Access Denied</h1>
  <a href="/auth/login">Login with Google</a>
{/if}
