import { choice } from '../../../lib/outils/arrayOutils'
import { texFractionReduite } from '../../../lib/outils/deprecatedFractions'
import { sp } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'

import Hms from '../../../modules/Hms'
import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
import {
  handleAnswers,
  setReponse,
} from '../../../lib/interactif/gestionInteractif'

import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre =
  'Convertir des heures décimales en heures/minutes et inversement'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '08/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/**
 * @author Jean-Claude Lhote & Gilles Mora
 * Créé pendant l'été 2021
 */
export const uuid = 'd8797'

export const refs = {
  'fr-fr': ['can5D01'],
  'fr-ch': [],
}
export default class ConversionHeuresDecimalesMinutes extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, b, d, texte, texteCorr
    for (
      let i = 0, index = 0, nbChamps = 0, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (
        choice([1, 2]) //, 'b'
      ) {
        case 1:
          a = randint(1, 5)
          b = choice([0.25, 0.5, 0.75])
          d = b * 60
          if (!this.interactif) {
            texte = `Convertir en heures/minutes : <br>$${texNombre(a + b)}$ h $=$ ..... h ..... min`
            texteCorr = `$${texNombre(a + b)}$ h $ = ${a}$ h $ +$ $ ${texNombre(b)} \\times 60  = ${a}$ h $${d}$ min`
          } else {
            texte = `Convertir en heures/minutes : <br>$${texNombre(a + b)}$ h $=$`
            texte += ajouteChampTexteMathLive(this, i, KeyboardType.clavierHms)
            handleAnswers(this, i, {
              reponse: {
                value: new Hms({ hour: a, minute: d }).toString(),
                options: { HMS: true },
              },
            })
            texteCorr = `$${texNombre(a + b)}$ h $ = ${a}$ h $ +$ $ ${texNombre(b)} \\times 60$ min $  = ${a}$ h $${d}$ min`
            nbChamps = 2
          }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${texNombre(a + b)}$ h = $\\ldots$ h $\\ldots$ min`
          break

        case 2:
        default:
          a = randint(1, 5)
          b = choice([0.25, 0.5, 0.75])
          d = b * 60
          if (!this.interactif) {
            texte = `Compléter par un nombre décimal : <br>$${texNombre(a)}$ h $${texNombre(b * 60)}$ min  $=$ ..... h`
            texteCorr = `$${texNombre(b * 60)}$ min  $=   \\dfrac{${texNombre(b * 60)}}{60}$ h $=${texFractionReduite(b * 60, 60)}$ h $=   ${texNombre(b)}$ h. <br>
          Ainsi, $${texNombre(a)}$ h $${texNombre(b * 60)}$ min  $=$ $${texNombre(a + b)}$ h.`
          } else {
            texte = `Compléter par un nombre décimal : <br>$${texNombre(a)}$ h $${texNombre(b * 60)}$ min  $=$`
            texte += ajouteChampTexteMathLive(this, index, '', {
              texteApres: sp(5) + 'h',
            })
            texteCorr = `$${texNombre(b * 60)}$ min  $=   \\dfrac{${texNombre(b * 60)}}{60}$ h $=${texFractionReduite(b * 60, 60)}$ h $=   ${texNombre(b)}$ h. <br>
          Ainsi, $${texNombre(a)}$ h $${texNombre(b * 60)}$ min  $=$ $${texNombre(a + b)}$ h.`
            setReponse(this, index, a + b)
            nbChamps = 1
          }
          this.canEnonce = 'Compléter par un nombre décimal.'
          this.canReponseACompleter = `$${texNombre(a)}$ h $${texNombre(b * 60)}$ min  $= \\ldots\\ldots$ h`
          break
      }
      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(this.canReponseACompleter)
        i++
        index += nbChamps
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
