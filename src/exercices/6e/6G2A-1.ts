import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { creerNomDePolygone } from '../../lib/outils/outilString'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Trouver la longueur d\'un segment quand on connaît sa moitié (rayon, diamètre, milieu), et inversement'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const dateDePublication = '08/10/2025'

/**
 * Calculer un rayon quand on connaît un diamètre, et inversement
 * @author Mireille Gain
 */
export const uuid = '4d9ca'

export const refs = {
  'fr-fr': ['6G2A-1'],
  'fr-ch': [],
}
export default class RayonDiametreMilieu extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 4
    this.besoinFormulaireTexte = [
      'Type de questions',
      '1: Avec rayon et diamètre\n2: Avec un milieu\n3: Mélange',
    ]
    this.sup = 1
  }

  nouvelleVersion() {
    let typesDeQuestionsDisponibles 
    if (this.sup === '1') {typesDeQuestionsDisponibles = [1, 2]}
    else if (this.sup === '2') {typesDeQuestionsDisponibles = [3, 4]}
    else {typesDeQuestionsDisponibles = [1, 2, 3, 4]}
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let longueurSegment: number
      let reponse: number
      let texte=''
      let texteCorr=''
      const [lettre1,lettre2,lettre3] = Array.from(creerNomDePolygone(3))
      longueurSegment = randint(11, 49)
      switch (listeTypeDeQuestions[i]) {
        case 1: // Diamètre        
          texte = `Si le rayon d'un cercle mesure $${longueurSegment}$ cm, alors son diamètre mesure`
          texteCorr = `Si le rayon d'un cercle mesure $${longueurSegment}$ cm alors son diamètre mesure $${longueurSegment * 2}$ cm.`
          reponse = longueurSegment * 2
          break
          default: // case 2 Rayon
          texte = `Si le diamètre d'un cercle mesure $${longueurSegment * 2}$ cm, alors son rayon mesure`
          texteCorr = `Si le diamètre d'un cercle mesure $${longueurSegment * 2}$ cm, alors son rayon mesure $${longueurSegment}$ cm.`
          reponse = longueurSegment
          break
          case 3 : // La moitié à partir du segment
            texte = `Si $${lettre1}$ est le milieu de $[${lettre2}${lettre3}]$ et $${lettre2}${lettre3}=${longueurSegment * 2}$ cm, alors  $[${lettre2}${lettre1}]$ mesure`
            texteCorr = `Si $${lettre1}$ est le milieu de $[${lettre2}${lettre3}]$ et $${lettre2}${lettre3}=${longueurSegment * 2}$ cm, alors  $[${lettre2}${lettre1}]$ mesure $${longueurSegment}$ cm.`
            reponse = longueurSegment
            break
          case 4 : // Le segment à partir de sa moitié
            texte = `$${lettre1}$ est le milieu de $[${lettre2}${lettre3}]$ et $${lettre2}${lettre1}=${longueurSegment}$ cm, alors $[${lettre2}${lettre3}]$ mesure`
            reponse = longueurSegment * 2
            texteCorr = `$${lettre1}$ est le milieu de $[${lettre2}${lettre3}]$ et $${lettre2}${lettre1}=${longueurSegment}$ cm, alors $[${lettre2}${lettre3}]$ mesure $${longueurSegment * 2}$ cm.`
            break
        }
if (!this.interactif) {
  texte += ' ... '
}
      if (this.interactif) {
        handleAnswers(this, i, {reponse: { value: reponse }})
        texte += ajouteChampTexteMathLive(this, i, KeyboardType.clavierDeBase, {texteApres: ' cm'})
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
