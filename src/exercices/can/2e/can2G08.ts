import { choice } from '../../../lib/outils/arrayOutils'
import { ecritureParentheseSiNegatif } from '../../../lib/outils/ecritures'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'

export const titre = 'Déterminer les coordonnées d’un vecteur (bis)'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '30/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 */
export const uuid = 'eaebb'

export const refs = {
  'fr-fr': ['can2G08'],
  'fr-ch': [],
}
export default class CoordonneesVecteur2 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const a = randint(-6, 6, [0, 1, -1])
    const b = randint(2, 10)
    if (choice([true, false])) {
      this.question = `Dans un repère orthonormé $\\big(O\\,;\\,\\vec \\imath,\\,\\vec \\jmath\\big)$, on a : $\\vec{u}=${a}(\\vec \\imath+${b}\\vec \\jmath\\big)$.<br>
      Quelles sont les coordonnées du vecteur $\\vec{u}$ dans ce repère ?<br><br>`
      this.optionsChampTexte = { texteAvant: '$\\vec{u}$ a pour coordonnées :' }
      this.correction = `$\\vec{u}=${a}(\\vec \\imath+${b}\\vec \\jmath\\big)=${a}\\vec \\imath+${ecritureParentheseSiNegatif(a * b)}\\vec \\jmath$.<br>
      Les coordonnées du vecteur $\\vec{u}$ sont donc $${miseEnEvidence('(')} ${miseEnEvidence(`${a}`)}\\,${miseEnEvidence(';')}\\,${miseEnEvidence(`${a * b}`)} ${miseEnEvidence(')')}$.`
      this.reponse = `(${a};${a * b})`
    } else {
      this.question = `Dans un repère orthonormé $\\big(O\\,;\\,\\vec \\imath,\\,\\vec \\jmath\\big)$, on a : $\\vec{u}=${a}(\\vec \\jmath+${b}\\vec \\imath)$.<br>
      Quelles sont les coordonnées du vecteur $\\vec{u}$ dans ce repère ?<br><br>`
      this.optionsChampTexte = { texteAvant: '$\\vec{u}$ a pour coordonnées :' }
      this.correction = `$\\vec{u}=${a}(\\vec \\jmath+${b}\\vec \\imath)=${a}\\vec \\jmath+${ecritureParentheseSiNegatif(a * b)}\\vec \\imath$.<br>
      Les coordonnées du vecteur $\\vec{u}$ sont donc $${miseEnEvidence('(')} ${miseEnEvidence(`${a * b}`)}\\,${miseEnEvidence(';')}\\,${miseEnEvidence(`${a}`)} ${miseEnEvidence(')')}$.`
      this.reponse = `(${a * b};${a})`
    }

    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
