<script lang="ts">
  export let text: string
  export let title: string = ''
  export let disabled: boolean = false
  export let icon: string = ''
  export let iconFirst: boolean = true
</script>

<button
  type="button"
  {title}
  id="{$$props.id}"
  class="{$$props.class || 'rounded-lg py-1 px-2'}"
  {disabled}
  on:click
>
  {#if iconFirst}
    {#if icon !== ''}
      <i class="bx {icon} pr-1"></i>
    {/if}
    {text}
  {:else}
    {text}
    {#if icon !== ''}
      <i class="bx {icon} pl-1"></i>
    {/if}
  {/if}
</button>
