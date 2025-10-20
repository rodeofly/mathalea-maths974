import ExerciceSimple from '../../ExerciceSimple'
import { texteEnCouleurEtGras } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Déterminer une lettre dans une suite répétitive'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '14/04/2024'
export const uuid = '00f4a'
export const refs = {
  'fr-fr': ['canc3N08'],
  'fr-ch': ['autres-4'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class SuitesRep extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatInteractif = 'texte'
    this.formatChampTexte = KeyboardType.alphanumeric
  }

  nouvelleVersion() {
    switch (
      choice([1, 2]) //, 2, 3
    ) {
      case 1:
        {
          const n = randint(6, 19)
          const choix = choice([2 * n, 2 * n + 1])
          this.reponse = choix === 2 * n ? 'B' : 'A'
          this.question = `Dans la suite répétitive « ABABAB$\\ldots$ », quelle est la $${choix}^{\\text{e}}$ lettre ?`

          this.canEnonce = this.question
          this.canReponseACompleter = ''
          this.correction = `Pour les rangs pairs, la lettre est 'B' et pour les rangs impairs, la lettre est 'A'.<br>
    Comme ${choix === 2 * n ? `$${choix}$ est pair alors la $${choix}^{\\text{e}}$ lettre est '${texteEnCouleurEtGras('B')}'.` : `$${choix}$ est impair alors la $${choix}^{\\text{e}}$ lettre est '${texteEnCouleurEtGras('A')}'.`}`
        }
        break
      case 2:
        {
          const n = randint(6, 20)
          const choix = choice([3 * n, 3 * n + 1, 3 * n + 2])
          if (choix === 3 * n) {
            this.reponse = 'C'
          }
          if (choix === 3 * n + 1) {
            this.reponse = 'A'
          }
          if (choix === 3 * n + 2) {
            this.reponse = 'B'
          }
          this.question = `Dans la suite répétitive « ABCABCABC$\\ldots$ », quelle est la $${choix}^{\\text{e}}$ lettre ?`

          this.canEnonce = this.question
          this.canReponseACompleter = ''
          this.correction = `Quand le rang de la lettre est un multiple de $3$, la lettre est C.<br>
  Comme `
          if (choix === 3 * n) {
            this.correction += `$${choix}=3\\times ${n}$ alors la $${choix}^{\\text{e}}$ lettre est '${texteEnCouleurEtGras('C')}'.`
          }
          if (choix === 3 * n + 1) {
            this.correction += `$${choix}=3\\times ${n}+1$ alors la $${choix}^{\\text{e}}$ lettre est '${texteEnCouleurEtGras('A')}'.`
          }
          if (choix === 3 * n + 2) {
            this.correction += `$${choix}=3\\times ${n}+2$ alors la $${choix}^{\\text{e}}$ lettre est '${texteEnCouleurEtGras('B')}'.`
          }
        }
        break
    }
  }
}
