import { bleuMathalea } from '../../../lib/colors'
import { choice } from '../../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../../lib/outils/embellissements'
import { sp } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const dateDePublication = '27/07/2025'
export const titre = 'Convertir des unités de longueur'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Eric Elter (d'après can6M04 de Jean-Claude Lhote & Gilles Mora)

 */
export const uuid = '616e6'

export const refs = {
  'fr-fr': ['can6M18', 'auto6M1C-flash1'],
  'fr-ch': [],
}
export default class ConversionEnTousSensLongueur extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, resultat
    switch (choice(['b', 'd'])) {
      case 'b':
        if (choice([true, false])) {
          a = randint(1, 13) * 5
          resultat = a * 100
          this.question = `$${texNombre(a)}$ m  =`
          if (!this.interactif) {
            this.question += ' ..... cm'
          }

          this.optionsChampTexte = { texteApres: ' cm' }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${texNombre(a)}$ m $=$ $\\dots$ cm`
          this.correction = `$${texNombre(a)}$ m $=${miseEnEvidence(texNombre(a * 100))}$ cm`
          this.correction += texteEnCouleur(
            `<br> Mentalement : <br>
          Comme $1$ m $=100$ cm,  pour convertir des «${sp()}m ${sp()}» au «${sp()}cm ${sp()}», on multiplie par $100$.<br>
            Comme : $${texNombre(a)}\\times 100 =${texNombre(a * 100)}$, alors $${texNombre(a)}$ m$=${texNombre(a * 100)}$ cm.  `,
            bleuMathalea,
          )
        } else {
          a = randint(1, 12) * 10
          resultat = a / 100
          this.question = `$${texNombre(a)}$ cm  =`
          if (!this.interactif) {
            this.question += '..... m'
          }

          this.optionsChampTexte = { texteApres: ' m' }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${texNombre(a)}$ cm $= \\dots$ m`
          this.correction = `$${texNombre(a)}$ cm$=${miseEnEvidence(texNombre(a / 100))}$ m.`
          this.correction += texteEnCouleur(
            `<br> Mentalement : <br>
          Comme $1$ m $=100$ cm, alors $1$ cm $=0,01$ m.<br>
          Ainsi pour convertir des «${sp()}cm ${sp()}» au «${sp()}m ${sp()}», on divise par $100$.<br>
            Comme  $${texNombre(a)}\\div 100 =${texNombre(a / 100)}$, alors $${texNombre(a)}$ cm$=${texNombre(a / 100)}$ m.  `,
            bleuMathalea,
          )
        }
        break
      case 'd':
        if (choice([true, false])) {
          a = randint(1, 20) * 10
          resultat = a / 1000
          this.question = `$${texNombre(a)}$ m  $=$ `
          if (!this.interactif) {
            this.question += ' .... km'
          }

          this.optionsChampTexte = { texteApres: ' km' }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${texNombre(a)}$ m $= \\dots$ km`
          this.correction = `$${texNombre(a)}$ m $=${miseEnEvidence(texNombre(a / 1000))}$ km`
          this.correction += texteEnCouleur(
            `<br> Mentalement : <br>
          Comme $1$ km $=${texNombre(1000)}$ m, alors $1$ m $=0,001$ km.<br>
          Ainsi pour convertir des «${sp()}m ${sp()}» au «${sp()}km ${sp()}», on divise par $${texNombre(1000)}$.<br>
            Comme  $${texNombre(a)}\\div ${texNombre(1000)} =${texNombre(a / 1000)}$, alors $${texNombre(a)}$ m$=${texNombre(a / 1000)}$ km.`,
            bleuMathalea,
          )
        } else {
          a = randint(1, 35) / 100
          resultat = a * 1000
          this.question = `$${texNombre(a)}$ km $=$`
          if (!this.interactif) {
            this.question += ' .... m'
          }

          this.optionsChampTexte = { texteApres: ' m' }
          this.canEnonce = 'Compléter.'
          this.canReponseACompleter = `$${texNombre(a)}$ km $= \\dots$ m`
          this.correction = `$${texNombre(a)}$ km$=${miseEnEvidence(texNombre(a * 1000))}$ m`
          this.correction += texteEnCouleur(
            `<br> Mentalement : <br>
          Comme $1$ km $=${texNombre(1000)}$ m,  pour convertir des «${sp()}km ${sp()}» au «${sp()}m ${sp()}», on multiplie par $${texNombre(1000)}$.<br>
            Comme  $${texNombre(a)}\\times ${texNombre(1000)} =${texNombre(a * 1000)}$, alors $${texNombre(a)}$ km$=${texNombre(a * 1000)}$ m.`,
            bleuMathalea,
          )
        }
        break
    }
    this.reponse = resultat
  }
}
