import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import { choice } from '../../../lib/outils/arrayOutils'
import { ecritureAlgebrique } from '../../../lib/outils/ecritures'
export const titre = 'Résoudre une inéquation'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '9e17a'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora+Eric Elter

*/
export default class inequationAResoudre extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierEnsemble
  }

  nouvelleVersion() {
    let solution1
    const a = choice([-2025, 2025])
    const b = choice([-2025, 2025])
    const inégalité = choice(['>', '\\geqslant', '<', '\\leqslant'])
    this.question = `Donner l'ensemble $S$ des solutions dans $\\mathbb R$ de l'inéquation
          $${texNombre(a, 0)}(x${ecritureAlgebrique(-b)})^2 ${inégalité} 0$.`

    if (a > 0) {
      this.correction = `Pour tout réel $x$, $${texNombre(a, 0)}(x${ecritureAlgebrique(-b)})^2$ est positif et s'annule en $${texNombre(b)}$.<br>
            Ainsi, l'ensemble $S$ des solutions de l'inéquation est `
    } else {
      this.correction = `Pour tout réel $x$, $${texNombre(a, 0)}(x${ecritureAlgebrique(-b)})^2$ est négatif et s'annule en $${texNombre(b)}$.<br>
            Ainsi, l'ensemble $S$ des solutions de l'inéquation est `
    }
    if ((inégalité === '>' && a > 0) || (inégalité === '<' && a < 0)) {
      solution1 = [
        `$\\mathbb{R}\\\\{${b}\\}$`,
        `]-\\infty;${a}[ \\cup ]${a};+\\infty[`,
      ]
      this.correction += ` $${miseEnEvidence(`\\mathbb{R}\\smallsetminus\\{${texNombre(b)}\\}`)}$.`
    } else if (
      (inégalité === '\\geqslant' && a > 0) ||
      (inégalité === '\\leqslant' && a < 0)
    ) {
      solution1 = ['$\\mathbb{R}$', ']-\\infty;+\\infty[']
      this.correction += ` $${miseEnEvidence('\\mathbb{R}')}$.`
    } else if ((inégalité === '<' && a > 0) || (inégalité === '>' && a < 0)) {
      solution1 = '$\\emptyset$'
      this.correction += ` $${miseEnEvidence('\\emptyset')}$.`
    } else if (
      (inégalité === '\\leqslant' && a > 0) ||
      (inégalité === '\\geqslant' && a < 0)
    ) {
      solution1 = `$\\left\\lbrace${b}\\right\\rbrace$`
      this.correction += ` $${miseEnEvidence(`\\{${texNombre(b)}\\}`)}$.`
    }
    this.reponse = solution1
    if (this.interactif) {
      this.question += '<br>$S=$'
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
