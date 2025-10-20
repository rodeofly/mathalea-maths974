import ExerciceSimple from '../ExerciceSimple'
import { randint } from '../../modules/outils'
import { texNombre } from '../../lib/outils/texNombre'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { choice } from '../../lib/outils/arrayOutils'
export const titre = 'Dénombrement.'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '20/4/2025'

export const uuid = '7ccc5'
export const refs = {
  'fr-fr': ['TSG1-02'],
  'fr-ch': [],
}
function factorielle(num: number): number {
  if (num === 0 || num === 1) return 1
  return num * factorielle(num - 1)
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Stéphane Guyon

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const n = randint(3, 10)
    let kuplet = ''
    if (n === 2) {
      kuplet = 'couples'
    }
    if (n === 3) {
      kuplet = 'triplets'
    }
    if (n === 4) {
      kuplet = 'quadruplets'
    }
    if (n === 5) {
      kuplet = 'quintuplets'
    }
    if (n >= 6) {
      kuplet = `${n}-uplets`
    }
    const factorielleN = factorielle(n)
    const prenom = choice([
      'Raoul',
      'Simone',
      'Lucien',
      'Bernadette',
      'Lucienne',
      'Edmond',
      'Roger',
      'Cunégonde',
    ])
    const objet = choice([
      'livres',
      'timbres',
      'cartes',
      'cahiers',
      'carnets',
      'CD',
      'boîtes',
    ])
    this.question = `${prenom} classe ses ${n} ${objet} et souhaite les ranger sur la même étagère.<br> Quel est le nombre de rangements possibles ?`
    this.correction = `Le problème de ${prenom} revient à déterminer le nombre de permutations d'un  ${kuplet} .<br> On sait que le nombre de permutation d'un  $k$-uplet est $k~!$. <br>On calcule donc $${n}~!=${texNombre(factorielleN)}$<br> Donc le nombre de rangements possibles des ${n} ${objet} est égal à $${miseEnEvidence(texNombre(factorielle(n)))}$.`
    this.reponse = factorielleN
  }
}
