import { propositionsQcm } from '../../../lib/interactif/qcm'
import { choice } from '../../../lib/outils/arrayOutils'
import { texteExposant } from '../../../lib/outils/ecritures'
import { texteEnCouleurEtGras } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { context } from '../../../modules/context'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Comparer des aires (V/F)'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021

 */
export const uuid = 'bae27'

export const refs = {
  'fr-fr': ['can6M08', '6M2C-flash1'],
  'fr-ch': [],
}
export default class QuestionDAires extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const a = randint(2, 9)
      const b = randint(2, 9, a)
      const c = randint(1, 3)
      let VF
      let texte
      if (choice([true, false])) {
        texte = `Un carré de côté $${a}$ cm et un rectangle de largeur $${Math.min(a, b)}$ cm et de longueur $${Math.max(a, b)}$ cm ont une aire qui diffère de $${Math.max(a * a, a * b) - Math.min(a * a, a * b)}$ cm${texteExposant(2)}.`
        this.canEnonce = texte
        VF = 'V'
      } else {
        VF = 'F'
        texte = `Un carré de côté $${a}$ cm et un rectangle de largeur $${Math.min(a, b)}$ cm et de longueur $${Math.max(a, b)}$ cm ont une aire qui diffère de $${Math.max(a * a, a * b) - Math.min(a * a, a * b) + c}$ cm${texteExposant(2)}.`
        this.canEnonce = texte
      }
      this.autoCorrection[i] = {
        enonce: texte,
        propositions: [
          {
            texte: 'Vrai',
            statut: VF === 'V',
          },
          {
            texte: 'Faux',
            statut: VF === 'F',
          },
        ],
        options: { ordered: true, radio: true },
      }
      const monQcm = propositionsQcm(this, i)
      if (!context.isAmc) {
        texte += monQcm.texte
      }
      let texteCorr = texteEnCouleurEtGras(VF === 'V' ? 'Vrai' : 'Faux')
      texteCorr += `<br> $\\bullet$  Le carré a une aire de $${a}\\times ${a}=${a * a}$ cm${texteExposant(2)}.<br>
    $\\bullet$  Le rectangle a une aire de $${a}\\times ${b}=${a * b}$ cm${texteExposant(2)}.`
      texteCorr += `<br>Ce qui fait ${VF === 'V' ? 'bien ' : ''} une différence de $${Math.max(a * a, a * b)} - ${Math.min(a * a, a * b)}=${Math.max(a * a, a * b) - Math.min(a * a, a * b)}$ cm${texteExposant(2)} ${VF === 'F' ? ' et non pas de ' + texNombre(Math.max(a * a, a * b) - Math.min(a * a, a * b) + c) + ' cm' + texteExposant(2) + '.' : '.'}`
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(monQcm.texte)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
