<script lang="ts">
  interface Props {
    content: string;
  }

  let { content }: Props = $props()
</script>

<div class="prose dark:prose-invert">
  {@html content}
</div>