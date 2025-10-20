import { combinaisonListes } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import { listeQuestionsToContenu } from '../../modules/outils'
import { context } from '../../modules/context'
import { setReponse } from '../../lib/interactif/gestionInteractif'

import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
export const titre =
  "Déterminer la racine carrée d'un carré parfait (calcul mental)"
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifType = 'mathLive'
export const interactifReady = true

/**
 * Déterminer la racine carrée d'un carré parfait compris entre 1 et 256
 * @author Stéphane Guyon et Guillaume Valmont

 * Mis à jour le 08/08/2021
 */
export const uuid = 'f5cbd'

export const refs = {
  'fr-fr': ['4G20-2'],
  'fr-ch': ['10NO3-1'],
}
export default class RacineCareeDeCarresParfaits extends Exercice {
  constructor() {
    super()

    this.amcReady = amcReady
    this.amcType = amcType

    this.nbQuestions = 4
    this.nbCols = 2
    this.nbColsCorr = 2
    this.besoinFormulaireNumerique = [
      'Formulation de la question',
      3,
      '1 : Calculer la racine de ...\n2 : Trouver le nombre positif dont le carré est ...\n3 : Mélange',
    ]
    this.besoinFormulaire2Numerique = ['Entier maximum', 2, '1 : 144\n2 : 256']
    this.sup = 1
    this.sup2 = 2
  }

  nouvelleVersion() {
    let listeRacines = []
    let listeQuestions: number[] = []

    this.sup2 = parseInt(this.sup2)
    if (this.sup === 1) {
      listeQuestions = [1]
    } else if (this.sup === 2) {
      listeQuestions = [2]
    } else if (this.sup === 3) {
      listeQuestions = [1, 2]
    }
    listeQuestions = combinaisonListes(listeQuestions, this.nbQuestions) // pour varier les questions
    if (this.sup2 === 1) {
      listeRacines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    } else {
      listeRacines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    }
    listeRacines = combinaisonListes(listeRacines, this.nbQuestions) // pour avoir une meilleure randomisation que randint
    for (
      let i = 0, texte, texteCorr, a, c, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = listeRacines[i]
      c = a * a
      if (listeQuestions[i] === 1) {
        texte =
          `Calculer de tête $\\sqrt{${c}}=$` + ajouteChampTexteMathLive(this, i)
      } else {
        texte =
          `Quel est le nombre positif dont le carré est $${c}$ ?` +
          ajouteChampTexteMathLive(this, i)
      }
      texteCorr = `$\\sqrt{${c}}=${a}$`
      setReponse(this, i, a)

      if (this.questionJamaisPosee(i, a)) {
        if (context.isAmc) {
          if (listeQuestions[i] === 1) {
            this.autoCorrection[i].enonce = `$\\sqrt{${c}}=\\dots$`
            this.autoCorrection[i].propositions = [
              { texte: `$\\sqrt{${c}}=${a}$`, statut: false },
            ]
          } else {
            this.autoCorrection[i].enonce = `$${c} = \\dots^2$`
            this.autoCorrection[i].propositions = [
              { texte: `$${c}=${a}^2$`, statut: false },
            ]
          }
          this.autoCorrection[i].reponse!.param = {
            digits: 2,
            decimals: 0,
            exposantNbChiffres: 0,
            exposantSigne: false,
            signe: false,
          }
        }
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
