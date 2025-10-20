<script lang="ts">
  import ButtonQRCode from '../../../../shared/forms/ButtonQRCode.svelte'
  import ButtonActionInfo from '../../../../shared/forms/ButtonActionInfo.svelte'
  import CheckboxWithLabel from '../../../../shared/forms/CheckboxWithLabel.svelte'

  let isSameData: boolean = false
</script>

<div>
  <div
    class="flex text-lg font-bold pb-2
    text-coopmaths-struct dark:text-coopmathsdark-struct"
  >
    Liens
  </div>
  <div>
    <CheckboxWithLabel
      id="slideshow-links-same-data-checkbox"
      bind:isChecked="{isSameData}"
      label="Mêmes valeurs d'une session à l'autre"
    />
  </div>
  <div class="flex flex-row pl-4 space-x-2 font-normal">
    <ButtonActionInfo
      action="copy"
      icon="{'bx-link text-2xl'}"
      useCurrentUrl="{true}"
      removeSeed="{!isSameData}"
      tooltip="Lien du Diaporama"
      successMessage="Le lien du diaporama est copié dans le presse-papier !"
      errorMessage="Impossible de copier le lien du diaporama dans le presse-papier."
    />
    <ButtonQRCode
      tooltip="{'QR-code du diaporama'}"
      useCurrentUrl="{true}"
      removeSeed="{!isSameData}"
    />
  </div>
</div>
