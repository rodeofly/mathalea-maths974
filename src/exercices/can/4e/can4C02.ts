import { choice } from '../../../lib/outils/arrayOutils'
import {
  fraction,
  obtenirListeFractionsIrreductibles,
} from '../../../modules/fractions'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Trouver l’opposé ou l’inverse d’une fraction'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '05/12/2021'
/**
 * @author Jean-Claude Lhote
 * Créé pendant l'été 2021

 */
export const uuid = '87d2f'

export const refs = {
  'fr-fr': ['can4C02'],
  'fr-ch': [],
}
export default class OpposeDeFraction extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const a = choice(obtenirListeFractionsIrreductibles())
    const c = a.d
    let b, d, e

    switch (
      choice(['a', 'b', 'c', 'd', 'e']) //
    ) {
      case 'a':
        b = a.n
        d = fraction(b, c)
        this.question = `Quel est l'opposé de $\\dfrac{${b}}{${c}}$ ? `
        this.correction = `Deux nombres sont opposés lorsque leur somme est nulle.<br>
        Ainsi, l'opposé de $\\dfrac{${b}}{${c}}$ est $-${d.texFraction}$ car $\\dfrac{${b}}{${c}}+\\left(-${d.texFraction}\\right)=0$.`
        this.reponse = d.oppose()
        break
      case 'b':
        b = a.n * -1
        d = fraction(b, c)
        this.question = `Quel est l'opposé de $\\dfrac{${b}}{${c}}$ ? `
        this.correction = `Deux nombres sont opposés lorsque leur somme est nulle.<br>
        Ainsi, l'opposé de $\\dfrac{${b}}{${c}}$ est $\\dfrac{${-b}}{${c}}$ car $\\dfrac{${b}}{${c}}+\\dfrac{${-b}}{${c}}=0$.`
        this.reponse = d.oppose()
        break

      case 'c':
        b = a.n
        d = fraction(b, c)
        this.question = `Quel est l'opposé de $-\\dfrac{${b}}{${c}}$ ?`
        this.correction = `Deux nombres sont opposés lorsque leur somme est nulle.<br>
        Ainsi, l'opposé de $-\\dfrac{${b}}{${c}}$ est $${d.texFraction}$ car $-\\dfrac{${b}}{${c}}+${d.texFraction}=0$.`
        this.reponse = d
        break
      case 'd':
        b = a.n
        d = fraction(b, c)
        e = fraction(c, b)
        this.question = `Quel est l'inverse de $${d.texFraction}$ ?`
        this.correction = `Deux nombres sont inverses l'un de l'autre lorsque leur produit vaut $1$.<br>
        Ainsi, l'inverse de $\\dfrac{${b}}{${c}}$ est $${e.texFraction}$ car $${d.texFraction}\\times ${e.texFraction}=1$.`
        this.reponse = e
        break
      case 'e':
        b = a.n
        d = fraction(b, c)
        e = fraction(c, b)
        this.question = `Quel est l'inverse de $-\\dfrac{${b}}{${c}}$ ?`
        this.correction = `Deux nombres sont inverses l'un de l'autre lorsque leur produit vaut $1$.<br>
        Ainsi, l'inverse de $-\\dfrac{${b}}{${c}}$ est $-${e.texFraction}$ car $-${d.texFraction}\\times \\left(-${e.texFraction}\\right)=1$ .`
        this.reponse = e.oppose()
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
