import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { choixDeroulant } from '../../lib/interactif/questionListeDeroulante'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { choice } from '../../lib/outils/arrayOutils'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'

export const dateDePublication = '02/08/2025'
export const titre = 'Choisir les bonnes unités de mesure de durées courtes'
export const interactifReady = true
export const interactifType = 'listeDeroulante'

/**
 * Choisir les bonnes unités de mesure de durées courtes
 * @author Eric Elter
 */
export const uuid = 'd040a'

export const refs = {
  'fr-fr': ['auto6M4C'],
  'fr-2016': ['6D10-1'],
  'fr-ch': [''],
}

export default class AutoChoisirDureeMinutes extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const durees = [
        ['jour', 'heures', 24, 'j', 'h'],
        ['heure', 'minutes', 60, 'h', 'min'],
        ['minute', 'secondes', 60, 'min', 's'],
      ]
      const choix = randint(0, 2)
      const unite1ATrouver = choice([true, false])
      if (this.questionJamaisPosee(i, choix, unite1ATrouver ? 0 : 1)) {
        const reponse = unite1ATrouver ? durees[choix][3] : durees[choix][4]
        const choixListeDeroulante = unite1ATrouver
          ? [
              { label: 'Choisir une proposition', value: '' },
              { label: 'jour', value: 'j' },
              { label: 'heure', value: 'h' },
              { label: 'minute', value: 'min' },
              { label: 'seconde', value: 's' },
            ]
          : [
              { label: 'Choisir une proposition', value: '' },
              { label: 'jours', value: 'j' },
              { label: 'heures', value: 'h' },
              { label: 'minutes', value: 'min' },
              { label: 'secondes', value: 's' },
            ]
        const texte = unite1ATrouver
          ? '$1$ ' +
            (this.interactif
              ? choixDeroulant(this, i, choixListeDeroulante)
              : '$\\ldots\\ldots\\ldots\\ldots$') +
            ` = $${durees[choix][2]}$ ${durees[choix][1]}`
          : `$1$ ${durees[choix][0]} = $${durees[choix][2]}$ ` +
            (this.interactif
              ? choixDeroulant(this, i, choixListeDeroulante)
              : '$\\ldots\\ldots\\ldots\\ldots$')

        const texteCorr = unite1ATrouver
          ? `$1$ ${texteEnCouleurEtGras(durees[choix][0])} = $${durees[choix][2]}$ ${durees[choix][1]}`
          : `$1$ ${durees[choix][0]} = $${durees[choix][2]}$ ${texteEnCouleurEtGras(durees[choix][1])}`

        handleAnswers(
          this,
          i,
          { reponse: { value: reponse, options: { texteSansCasse: true } } },
          { formatInteractif: 'listeDeroulante' },
        ) // rep doit avoir l'une des values : 'Uni', 'Auc', 'Inf'

        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
