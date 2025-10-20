import { choice } from '../../../lib/outils/arrayOutils'
import { sp } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'
import Decimal from 'decimal.js'
import { randint } from '../../../modules/outils'
import FractionEtendue from '../../../modules/FractionEtendue'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
export const titre = 'Écrire sous la forme d’un pourcentage'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '19/12/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '07/02/2024'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export const uuid = '802cc'

export const refs = {
  'fr-fr': ['can5P06'],
  'fr-ch': [],
}
export default class ÉcrirePourcentage extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const listeFractions1 = [
      [1, 2],
      [1, 4],
      [3, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [1, 10],
      [3, 10],
      [7, 10],
      [9, 10],
      [3, 25],
      [9, 25],
      [13, 25],
      [9, 50],
      [17, 50],
      [9, 20],
      [3, 20],
      [17, 20],
    ]
    switch (
      choice(['a', 'b', 'c', 'd']) //
    ) {
      case 'a':
        {
          const a = randint(10, 99) / 100
          this.question = `Compléter :<br> $${texNombre(a)}=$`
          if (this.interactif) {
            this.optionsChampTexte = { texteApres: ' $\\%$' }
          } else {
            this.question += `${sp(1)} $\\ldots${sp(1)}\\%$`
          }
          this.correction = `$${texNombre(a)}=\\dfrac{${texNombre(a * 100, 0)}}{100}=${miseEnEvidence(texNombre(a * 100))} ${sp()}\\%$`
          this.reponse = (a * 100).toFixed(0)
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${texNombre(a)}=.... ${sp()}\\%$`
        }
        break
      case 'b':
        {
          const a = randint(1, 99)
          const dec = new Decimal(a).div(1000)
          const pourc = new Decimal(a).div(10)
          this.question = `Compléter :<br> $${texNombre(dec, 3)}=$`
          if (this.interactif) {
            this.optionsChampTexte = { texteApres: ' $\\%$' }
          } else {
            this.question += `${sp(1)} $\\ldots${sp(1)}\\%$`
          }
          this.correction = `$${texNombre(dec, 3)}=\\dfrac{${texNombre(pourc, 2)}}{100}=${miseEnEvidence(texNombre(pourc, 2))} ${sp()}\\%$`
          this.reponse = pourc
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${texNombre(dec, 3)}=.... ${sp()}\\%$`
        }
        break

      case 'c':
        {
          const a = randint(1, 99)
          const dec = new Decimal(a).div(10000)
          const pourc = new Decimal(a).div(100)
          this.question = `Compléter :<br> $${texNombre(dec, 4)}=$`
          if (this.interactif) {
            this.optionsChampTexte = { texteApres: ' $\\%$' }
          } else {
            this.question += `${sp(1)} $\\ldots${sp(1)}\\%$`
          }
          this.correction = `$${texNombre(dec, 4)}=\\dfrac{${texNombre(pourc, 3)}}{100}=${miseEnEvidence(texNombre(pourc, 3))} ${sp()}\\%$`
          this.reponse = pourc
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${texNombre(dec, 4)}=.... ${sp()}\\%$`
        }
        break
      case 'd':
      default:
        {
          const fraction = choice(listeFractions1)
          const n = fraction[0]
          const d = fraction[1]
          const frac = new FractionEtendue(n, d)

          this.question = `Compléter :<br> $${frac.texFraction}=$`
          if (this.interactif) {
            this.optionsChampTexte = { texteApres: ' $\\%$' }
          } else {
            this.question += `${sp(1)} $\\ldots${sp(1)}\\%$`
          }
          this.correction = `$${frac.texFraction}=\\dfrac{${texNombre(n)}\\times ${texNombre(100 / d, 0)}}{${texNombre(d)}\\times ${texNombre(100 / d, 0)}}=
        \\dfrac{${texNombre((n * 100) / d, 0)}}{100}=${miseEnEvidence(texNombre((n * 100) / d, 0))} ${sp()}\\%$`
          this.reponse = (n * 100) / d
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${frac.texFraction}=.... ${sp()}\\%$`
        }
        break
    }
  }
}
