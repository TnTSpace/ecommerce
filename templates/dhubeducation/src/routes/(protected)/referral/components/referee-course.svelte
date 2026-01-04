
<script lang="ts">
  interface Props {
    referee: any
  }

  let { referee }: Props = $props()
	const { course, courseName } = referee;

</script>

<div class="gap-0.5 flex flex-col">
  <span class="text-muted-foreground text-xs">{course}</span>
  <p>{courseName}</p>
</div>