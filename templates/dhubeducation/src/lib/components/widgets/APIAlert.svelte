<script lang="ts">
	import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
  import { ServerIcon, CopyIcon } from 'lucide-svelte'
	import { Badge, type BadgeVariant } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button"; 
  import { onCopy } from "@toolsntuts/utils";

  interface Props {
    title: string;
    description: string;
    variant: "public" | "admin"
  }

  let { title, description, variant = "public" }: Props = $props()

  const textMap: Record<Props['variant'], string> = {
    public: "Public",
    admin: "Admin"
  }

  const variantMap: Record<Props['variant'], BadgeVariant> = {
    public: "secondary",
    admin: "destructive"
  }

</script>

<Alert>
  <ServerIcon class="size-4" />
  <AlertTitle class="flex items-center gap-x-2">
    {title}
    <Badge variant={variantMap[variant]}>
      {textMap[variant]}
    </Badge>
  </AlertTitle>
  <AlertDescription class="mt-2 items-center justify-between grid grid-cols-[1fr_40px] gap-4">
    <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold w-full line-clamp-1">
      {description}
    </code>
    <Button size="icon" variant="outline" onclick={() => onCopy(description)}>
      <CopyIcon class="size-4" />
    </Button>
  </AlertDescription>
</Alert>