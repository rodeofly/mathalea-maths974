import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = 'Calculer un produit astucieusement'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '973bb'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase

    this.optionsChampTexte = { texteApres: 'cm$^2$.' }
    this.canOfficielle = false
  }

  nouvelleVersion() {
    if (this.canOfficielle) {
      this.reponse = '\\pi'
      this.question = "L'aire exacte d'un disque  de diamètre $2$ cm est :"
      this.correction = `L'aire d'un disque de rayon $r$ est $\\pi\\times r^2$. <br>
      Comme $r=1$, l'aire exacte d'un disque  de diamètre $2$ cm est : $${miseEnEvidence('\\pi')}$ cm$^2$.`
    } else {
      if (choice([true, false])) {
        const a = randint(2, 5)
        this.reponse = `${a ** 2}\\times \\pi`
        this.question = `L'aire exacte d'un disque  de rayon $${a}$ cm est :`
        this.correction = `L'aire d'un disque de rayon $r$ est $\\pi\\times r^2$. <br>  
      Comme $r=${a}$, l'aire exacte d'un disque  de rayon $${a}$ cm est : 
      $${miseEnEvidence(this.reponse)}
      $ cm$^2$.`
      } else {
        const a = randint(2, 5)
        this.reponse = `${a ** 2}\\times \\pi`
        this.question = `L'aire exacte d'un disque  de diamètre $${2 * a}$ cm est :`
        this.correction = `L'aire d'un disque de rayon $r$ est $\\pi\\times r^2$. <br>  
       Comme $r=${a}$, l'aire exacte d'un disque  de diamètre $${2 * a}$ cm est : $${miseEnEvidence(this.reponse)}
        $ cm$^2$.`
      }
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots$ cm$^2$'
    if (!this.interactif) {
      this.question += ' $\\ldots$ cm$^2$.'
    }
  }
}
