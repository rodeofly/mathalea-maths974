import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { tableauSignesFonction } from '../../../lib/mathFonctions/etudeFonction'
import { choice } from '../../../lib/outils/arrayOutils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import Trinome from '../../../modules/Trinome'
export const titre = "Résoudre une inéquation à partir d'un tableau de signes"
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '08/09/2024'
export const uuid = '572af'
export const refs = {
  'fr-fr': ['can2L17'],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class InequationTableau extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierEnsemble
    this.optionsDeComparaison = { texteSansCasse: true }
  }

  nouvelleVersion() {
    const m = randint(-10, 10, 0)
    const rac = randint(-10, 10)
    const a = randint(-10, 10, 0)
    const p = m * -rac
    const signe = choice(['<', '\\leqslant', '>', '\\geqslant'])
    const fonctionAffine = (x: number) => m * x + p
    const rac1 = randint(-5, 5, 0)
    const rac2 = rac1 + 2 * randint(1, 4)
    const q = new Trinome(a, a * (-rac1 - rac2), a * (rac1 * rac2))
    q.defFormeFactorisee(a, rac1, rac2)
    const fonctionTrinome = (x: number) => a * (x - rac1) * (x - rac2) // Forme factorisée
    switch (
      choice([1, 2]) //
    ) {
      case 1:
        if (m > 0 && signe === '>') {
          this.reponse = `]${rac};+\\infty[`
        }
        if (m > 0 && signe === '\\geqslant') {
          this.reponse = `[${rac};+\\infty[`
        }
        if (m > 0 && signe === '<') {
          this.reponse = `]-\\infty;${rac}[`
        }
        if (m > 0 && signe === '\\leqslant') {
          this.reponse = `]-\\infty;${rac}]`
        }
        if (m < 0 && signe === '>') {
          this.reponse = `]-\\infty;${rac}[`
        }
        if (m < 0 && signe === '\\geqslant') {
          this.reponse = `]-\\infty;${rac}]`
        }
        if (m < 0 && signe === '<') {
          this.reponse = `]${rac};+\\infty[`
        }
        if (m < 0 && signe === '\\leqslant') {
          this.reponse = `[${rac};+\\infty[`
        }
        this.question =
          `On donne le tableau de signes d'une fonction $f$  :
  <br><br>` +
          tableauSignesFonction(fonctionAffine, -100, 100, {
            step: 0.1,
            tolerance: 0.001,
            substituts: [
              {
                antVal: -100,
                antTex: '$-\\infty$',
                imgVal: fonctionAffine(-100),
                imgTex: '',
              },
              {
                antVal: 100,
                antTex: '$+\\infty$',
                imgVal: fonctionAffine(100),
                imgTex: '',
              },
            ],
          })
        this.question += `<br>Donner l'ensemble $S$ des solutions de l'inéquation $f(x) ${signe} 0$.`
        this.correction = `Les solutions sont  les antécédents ($x$) dont les images ($f(x)$) sont 
        ${signe === '>' || signe === '<' ? 'strictement' : ''} ${signe === '>' || signe === '\\geqslant' ? 'positives (signe $+$ dans le tableau de signes)' : 'négatives (signe $-$ dans le tableau de signes)'}.<br>
            Ainsi,   $S=${miseEnEvidence(`${this.reponse}`)}$`
        this.canEnonce = this.question
        this.canReponseACompleter = '$S=\\ldots$'
        if (this.interactif) {
          this.question += '<br>$S=$'
        }
        break

      case 2:
        if (a > 0 && signe === '>') {
          this.reponse = `]-\\infty;${rac1}[\\cup]${rac2};+\\infty[`
        }
        if (a > 0 && signe === '\\geqslant') {
          this.reponse = `]-\\infty;${rac1}]\\cup[${rac2};+\\infty[`
        }
        if (a > 0 && signe === '<') {
          this.reponse = `]${rac1}\\,;\\,${rac2}[`
        }
        if (a > 0 && signe === '\\leqslant') {
          this.reponse = `[${rac1};${rac2}]`
        }
        if (a < 0 && signe === '>') {
          this.reponse = `]${rac1};${rac2}[`
        }
        if (a < 0 && signe === '\\geqslant') {
          this.reponse = `[${rac1};${rac2}]`
        }
        if (a < 0 && signe === '<') {
          this.reponse = `]-\\infty;${rac1}[\\cup]${rac2};+\\infty[`
        }
        if (a < 0 && signe === '\\leqslant') {
          this.reponse = `]-\\infty;${rac1}]\\cup[${rac2};+\\infty[`
        }
        this.question =
          `On donne le tableau de signes d'une fonction $f$ :
<br><br>` +
          tableauSignesFonction(fonctionTrinome, -100, 100, {
            step: 0.1,
            tolerance: 0.001,
            substituts: [
              {
                antVal: -100,
                antTex: '$-\\infty$',
                imgVal: fonctionAffine(-100),
                imgTex: '',
              },
              {
                antVal: 100,
                antTex: '$+\\infty$',
                imgVal: fonctionAffine(100),
                imgTex: '',
              },
            ],
          })
        this.question += `<br>Donner l'ensemble $S$ des solutions de l'inéquation $f(x) ${signe} 0$.`
        this.correction = `Les solutions sont  les antécédents ($x$) dont les images ($f(x)$) sont ${signe === '>' || signe === '<' ? 'strictement' : ''} 
      ${signe === '>' || signe === '\\geqslant' ? 'positives (signe $+$ dans le tableau de signes)' : 'négatives (signe $-$ dans le tableau de signes)'}.<br>
          Ainsi,   $S=${miseEnEvidence(`${this.reponse}`)}$`
        this.canEnonce = this.question
        this.canReponseACompleter = '$S=\\ldots$'
        if (this.interactif) {
          this.question += '<br>$S=$'
        }
        break
    }
  }
}
