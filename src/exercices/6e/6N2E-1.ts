import { grille, seyes } from '../../lib/2d/reperes'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { texNombre } from '../../lib/outils/texNombre'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Operation from '../../modules/operations'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { mathalea2d, vide2d } from '../../modules/2dGeneralites'
import {
  handleAnswers,
  setReponse,
} from '../../lib/interactif/gestionInteractif'
import Exercice from '../Exercice'
import Decimal from 'decimal.js'

export const dateDeModifImportante = '07/01/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Poser des multiplications de nombres décimaux'

/**
 * Multiplication de deux nombres décimaux
 *
 * * xxx * xx,x chiffres inférieurs à 5
 * * xx,x * x,x
 * * x,xx * x0x
 * * 0,xx * x,x
 * @author Rémi Angot

 */
export const uuid = '52939'

export const refs = {
  'fr-fr': ['6N2E-1'],
  'fr-2016': ['6C30'],
  'fr-ch': ['9NO8-8'],
}
export default class MultiplierDecimaux extends Exercice {
  constructor() {
    super()
    this.consigne = 'Poser et effectuer les calculs suivants.'
    this.spacing = 2

    this.nbQuestions = 4
    this.sup = false
    this.sup2 = 3
    this.besoinFormulaire2Numerique = [
      'Type de cahier',
      3,
      ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche',
    ]
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = [1, 2, 3, 4]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    let grilletxt
    if (this.sup2 < 3) {
      const g = this.sup2 < 3 ? grille(0, 0, 5, 8, 'gray', 0.7) : vide2d()
      const carreaux = this.sup2 === 2 ? seyes(0, 0, 5, 8) : vide2d()
      const sc = this.sup2 === 2 ? 0.8 : 0.5
      const params = {
        xmin: 0,
        ymin: 0,
        xmax: 5,
        ymax: 8,
        pixelsParCm: 20,
        scale: sc,
      }
      grilletxt = '<br>' + mathalea2d(params, g, carreaux)
    } else {
      grilletxt = ''
    }

    let typesDeQuestions, reponse
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, c;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      switch (typesDeQuestions) {
        case 1: // xxx * xx,x chiffres inférieurs à 5
          a = new Decimal(
            randint(2, 5) * 100 + randint(2, 5) * 10 + randint(2, 5),
          )
          c = new Decimal(randint(2, 5)).div(10)
          b = new Decimal(randint(2, 5)).add(c)
          break
        case 2: // xx,x * x,x
          c = new Decimal(randint(2, 9)).div(10)
          a = new Decimal(randint(2, 9) * 10 + randint(2, 9)).add(c)
          c = new Decimal(randint(6, 9)).div(10)
          b = new Decimal(randint(6, 9)).add(c)
          break
        case 3: // x,xx * x0x
          c = new Decimal(randint(2, 9))
            .div(10)
            .add(new Decimal(randint(2, 9)).div(100))
          a = new Decimal(randint(2, 9)).add(c).add(c)
          b = new Decimal(randint(2, 9) * 100 + randint(2, 9))
          break
        case 4: // 0,xx * x,x
        default:
          c = new Decimal(randint(2, 9)).div(10)
          a = new Decimal(randint(2, 9)).div(100).add(c)
          c = new Decimal(randint(2, 9)).div(10)
          b = new Decimal(randint(2, 9)).add(c)
          break
      }

      texte = `$${texNombre(a)}\\times${texNombre(b)}$`
      texte += grilletxt
      reponse = new Decimal(a).mul(b)
      texteCorr = Operation({
        operande1: a.toNumber(),
        operande2: b.toNumber(),
        type: 'multiplication',
        style: 'display: inline',
      })
      texteCorr += context.isHtml ? '' : '\\hspace*{30mm}'
      texteCorr += Operation({
        operande1: b.toNumber(),
        operande2: a.toNumber(),
        type: 'multiplication',
        style: 'display: inline',
      })
      texte += ajouteChampTexteMathLive(this, i, '', { texteAvant: '$~=$' })
      if (context.isAmc) setReponse(this, i, reponse)
      else handleAnswers(this, i, { reponse: { value: reponse } })
      this.autoCorrection[i].options = {
        digits: 0,
        decimals: 0,
        signe: false,
        exposantNbChiffres: 0,
        exposantSigne: false,
        approx: 0,
      }

      if (this.questionJamaisPosee(i, a, b)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
