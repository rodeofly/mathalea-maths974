import Exercice from '../Exercice'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { listeQuestionsToContenu } from '../../modules/outils'
import Pyramide from '../../modules/pyramide'
export const titre = 'Générateur de pyramides'

export const refs = {
  'fr-fr': ['P018'],
  'fr-ch': [],
}
export const uuid = '75f89'

export default class Pyramides extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1 // Ici le nombre de questions (une seule pour cet exercice non modifiable)
    this.nbQuestionsModifiable = false // désactive le formulaire nombre de questions
    this.besoinFormulaireNumerique = [
      'Type de pyramide',
      2,
      '1 : Pyramide additive\n 2 : Pyramide multiplicative',
    ]
    this.besoinFormulaire2Texte = ['Valeur minimale de base', '']
    this.besoinFormulaire3Texte = ['Valeur maximale de base', '']
    this.besoinFormulaire4Numerique = ["Nombre d'étages", 8]
    this.sup4 = 3
    this.sup3 = 10
    this.sup2 = 1
    this.sup = '+'
  }

  nouvelleVersion() {
    let operation: '*' | '+' = '+'
    const taille = this.sup4
    let texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
    let texteCorr = '' // Idem pour le texte de la correction.
    switch (this.sup) {
      case 2:
        operation = '*'
        break
      case 1:
      default:
        operation = '+'
        break
    }

    const Pyr = new Pyramide({
      operation,
      nombreEtages: taille,
      rangeData: [parseInt(this.sup2), parseInt(this.sup3)],
      exclusions: [0],
      fractionOn: false,
    })
    Pyr.aleatoirise()
    const mesObjets = Pyr.representeMoi(0, 0)
    for (let y = taille; y > 0; y--) {
      for (let x = 0; x < y; x++) {
        Pyr.isVisible[y - 1][x] = true
      }
    }
    const mesObjetsCorr = Pyr.representeMoi(0, 0)
    // paramètres de la fenêtre Mathalea2d pour l'énoncé normal

    const paramsEnonce = Object.assign({}, fixeBordures(mesObjets), {
      pixelsParCm: 20,
      scale: 1,
      mainlevee: false,
    })
    const paramsCorrection = Object.assign({}, fixeBordures(mesObjetsCorr), {
      pixelsParCm: 20,
      scale: 1,
      mainlevee: false,
    })

    // paramètres de la fenêtre Mathalea2d pour la correction
    // On ajoute au texte de l'énoncé, la figure à main levée et la figure de l'enoncé.
    texte += mathalea2d(paramsEnonce, mesObjets)
    texteCorr += mathalea2d(paramsCorrection, mesObjetsCorr)
    // On ajoute au texte de la correction, la figure de la correction
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
