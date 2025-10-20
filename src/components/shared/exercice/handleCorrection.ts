// Ajouté le 15/07/2025 par JC-Lhote pour peermettre à des listeners de savoir que la correction est affichée

import { tick } from 'svelte'

// Peut-être est à déplacer dans un fichier de fonctions utilitaires ?
export function handleCorrectionAffichee() {
  tick().then(() => {
    if (document.querySelector('[id^="correction-exo"]')) {
      document.dispatchEvent(
        new window.Event('correctionsAffichees', { bubbles: true }),
      )
      return
    }
    // Sinon, observe le DOM jusqu'à ce que l'élément apparaisse
    const observer = new MutationObserver(() => {
      if (document.querySelector('[id^="correction-exo"]')) {
        document.dispatchEvent(
          new window.Event('correctionsAffichees', { bubbles: true }),
        )
        observer.disconnect()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
  })
}
