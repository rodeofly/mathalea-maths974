import { choice } from '../../../lib/outils/arrayOutils'
import { texFractionReduite } from '../../../lib/outils/deprecatedFractions'
import { sp } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'

import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'
import { listeQuestionsToContenu } from '../../../modules/outils'
import Exercice from '../../Exercice'
import { setReponse } from '../../../lib/interactif/gestionInteractif'

export const titre =
  'Convertir des fractions d’heures en minutes et inversement'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '08/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/**
 * @author Gilles Mora
 */
export const uuid = '5430f'

export const refs = {
  'fr-fr': ['can5D03'],
  'fr-ch': [],
}
export default class HeuresFractionHeuresMinutes2 extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, b, d, texte, texteCorr, mafraction
    const listeFractions1 = [
      [1, 3],
      [1, 4],
      [1, 2],
      [1, 5],
      [1, 6],
      [1, 10],
      [1, 12],
      [1, 15],
      [2, 3],
      [3, 4],
      [2, 5],
      [3, 5],
      [4, 5],
      [5, 6],
      [7, 12],
      [5, 12],
      [11, 12],
    ]
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      switch (
        choice([1, 2]) //, 'b'
      ) {
        case 1:
          mafraction = choice(listeFractions1)

          a = mafraction[0]
          b = mafraction[1]

          if (!this.interactif) {
            texte = `Compléter : <br>$\\dfrac{${a}}{${b}}$ h $=$ ..... min`
          } else {
            texte = `Compléter : <br>$\\dfrac{${a}}{${b}}$ h $=$`
            texte += ajouteChampTexteMathLive(this, i, '', {
              texteApres: sp(5) + 'min',
            })
            texteCorr = `$${texNombre(a + b)}$h$ = ${a}$ h $ + ${texNombre(b)} \\times 60  = ${a}$ h $${d}$ min`
            setReponse(this, i, (a * 60) / b)
          }
          texteCorr = `$\\dfrac{${a}}{${b}}$ h $= \\dfrac{${a}}{${b}}\\times 60$ min  $= ${a}\\times \\dfrac{60}{${b}}$ min $= ${a}\\times ${texNombre(60 / b)}$ min$=${texNombre((a * 60) / b)}$ min`
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$\\dfrac{${a}}{${b}}$ h $=\\ldots$ min`
          break

        case 2:
        default:
          a = choice([
            1, 2, 3, 5, 6, 7, 10, 11, 12, 13, 15, 20, 30, 35, 45, 25, 40, 50,
            55,
          ])
          b = 0 // pour this.questionJamaisPosee
          if (!this.interactif) {
            texte = `Compléter par une fraction irréductible : <br>$${a}$ min  $=$ ..... h`
          } else {
            texte = `Compléter par une fraction irréductible : <br>$${a}$ min  $=$ `
            texte += ajouteChampTexteMathLive(this, i, '', {
              texteApres: sp(5) + 'h',
            })
            setReponse(this, i, [`${texFractionReduite(a, 60)}`])
          }
          texteCorr = `$${a}$ min  $= \\dfrac{${a}}{60}$ h$=${texFractionReduite(a, 60)}$ h`
          this.canEnonce = 'Compléter par une fraction irréductible.'
          this.canReponseACompleter = `$${a}$ min  $= \\ldots$ h`
          break
      }
      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(this.canReponseACompleter)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
