<script lang="ts">
  import PdfTextIcon from '../../../../../../../components/shared/icons/PdfTextIcon.svelte'
  import AmcIcon from '../../../../../../../components/shared/icons/AmcIcon.svelte'
  import AnkiIcon from '../../../../../../../components/shared/icons/AnkiIcon.svelte'
  import MoodleIcon from '../../../../../../../components/shared/icons/MoodleIcon.svelte'
  import type { VueType } from '../../../../../../../lib/types'
  import ButtonActionInfo from '../../../../../../shared/forms/ButtonActionInfo.svelte'
  import ButtonIconTooltip from '../../../../../../shared/forms/ButtonIconTooltip.svelte'
  import QcmCamIcon from '../../../../../../shared/icons/QcmCamIcon.svelte'

  export let handleExport: (vue: VueType) => void
  export let exportQcmCam: () => Promise<void>
</script>

<ButtonIconTooltip
  icon="bx-slideshow text-3xl"
  tooltip="Diaporama"
  on:click="{() => handleExport('diaporama')}"
/>
<ButtonIconTooltip
  icon="{'bx-link text-3xl'}"
  cornerIcon="bxs-graduation"
  cornerIconClass="text-coopmaths-action dark:text-coopmathsdark-action"
  tooltip="Lien pour les élèves"
  on:click="{() => handleExport('confeleve')}"
/>
<button
  class="tooltip tooltip-bottom tooltip-neutral"
  data-tip="LaTeX"
  on:click="{() => handleExport('latex')}"
>
  <PdfTextIcon
    class="w-7 h-7 hover:fill-coopmaths-action-lightest fill-coopmaths-action dark:fill-coopmathsdark-action dark:hover:fill-coopmathsdark-action-lightest"
  />
</button>
<button
  class="tooltip tooltip-bottom tooltip-neutral"
  data-tip="AMC"
  on:click="{() => handleExport('amc')}"
>
  <AmcIcon
    class="w-7 h-7 hover:text-coopmaths-action-lightest text-coopmaths-action dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest"
  />
</button>
<button
  class="tooltip tooltip-bottom tooltip-neutral"
  data-tip="Anki"
  on:click="{() => handleExport('anki')}"
>
  <AnkiIcon
    class="w-7 h-7 hover:text-coopmaths-action-lightest text-coopmaths-action dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest"
  />
</button>
<button
  class="tooltip tooltip-bottom tooltip-neutral"
  data-tip="Moodle"
  on:click="{() => handleExport('moodle')}"
>
  <MoodleIcon
    class="w-7 h-7 hover:text-coopmaths-action-lightest text-coopmaths-action dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest"
  />
</button>
<button
  class="tooltip tooltip-bottom tooltip-neutral"
  data-tip="QCM Cam"
  on:click="{exportQcmCam}"
>
  <QcmCamIcon
    class="w-7 h-7 hover:text-coopmaths-action-lightest text-coopmaths-action dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest"
  />
</button>
<ButtonActionInfo
  action="download"
  useCurrentUrl="{true}"
  fileName="mathAlea"
  successMessage="Téléchargement en cours"
  errorMessage="Erreur lors du téléchargement"
  icon="bxs-file-export text-2xl"
  tooltip="Fichier de redirection"
/>
