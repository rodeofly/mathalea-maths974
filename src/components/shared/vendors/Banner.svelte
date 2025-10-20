<script lang="ts">
  import { mathaleaGoToView } from '../../../lib/mathalea'
  import ButtonIconTooltip from '../forms/ButtonIconTooltip.svelte'

  export let brandImagePath: string | null = null
  export let productImagePath: string | null =
    'assets/images/vendors/bordas/myriade-bordas-logo.png'
  export let icon: string = 'bxs-cog'

  function goToVueProf() {
    window.history.replaceState({}, '', window.location.href)
    mathaleaGoToView('')
    window.history.replaceState({}, '', window.location.href)
  }
</script>

<div
  id="vendor-banner"
  class="flex flex-col items-center justify-center w-full px-2 lg:px-8 bg-coopmaths-canvas"
>
  <div class="flex items-center justify-between w-full p-4">
    <img
      src="assets/svg/logo_mathalea.svg"
      alt="Dé MathALÉA"
      class="h-7 lg:h-9"
    />
    <div class="flex flex-row m-0 p-0 items-center justify-center space-x-3">
      <img class="h-6 lg:h-8" src="{productImagePath}" alt="Manual" />
      {#if brandImagePath}
        <img class="h-6 lg:h-8" src="{brandImagePath}" alt="Brand" />
      {/if}
    </div>
    <ButtonIconTooltip
      {icon}
      tooltip="Accéder aux réglages"
      class="hidden lg:block text-3xl"
      on:click="{goToVueProf}"
    />
  </div>
  <ButtonIconTooltip
    {icon}
    tooltip="Accéder aux réglages"
    class="block lg:hidden text-3xl"
    on:click="{goToVueProf}"
  />
</div>
