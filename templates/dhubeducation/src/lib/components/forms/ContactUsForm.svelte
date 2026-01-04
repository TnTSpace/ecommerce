<script lang="ts">
  import { Input } from "../ui/input";
  import { Button } from "../ui/button";
  import { Textarea } from "../ui/textarea";
  import { toast } from "svelte-sonner";
  import { cn } from "$lib/utils";
	import { removeRingClasses, type iResult } from "@toolsntuts/utils";
	import SpinLoader from "../widgets/SpinLoader.svelte";

  let className: string = '';

  export { className as class };

  $: loading = false;

  const onSubmit = async (evt: SubmitEvent) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries()) as Record<
      string,
      any
    >;
    entries.timestamp = Date.now();

    const url = "/api/contact";
    const options: RequestInit = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entries),
    };

    loading = true;
    try {
      const response = await fetch(url, options);
      const { message, status } = (await response.json()) as iResult;
      status === "error" ? toast.error(message) : toast.success(message);
      loading = false;
      form.reset();
    } catch (error: any) {
      loading = false;
      toast.error(error.message);
    }
  };
</script>

<form on:submit={onSubmit} class={cn("flex flex-col gap-4 w-full", className)}>
  <Input
    type="text"
    name="name"
    placeholder="Your Name"
    required
    class={removeRingClasses()}
  />
  <Input
    type="email"
    name="email"
    placeholder="Your Email"
    required
    class={removeRingClasses()}
  />
  <Input
    type="text"
    name="subject"
    placeholder="Subject"
    required
    class={removeRingClasses()}
  />

  <Textarea
    id="message"
    name="message"
    rows={6}
    required
    class={cn("resize-none", removeRingClasses())}
  ></Textarea>
  {#if loading}
    <Button>
      <SpinLoader />
    </Button>
  {:else}
    <Button type="submit" class="w-fit">Send Message</Button>
  {/if}
</form>
