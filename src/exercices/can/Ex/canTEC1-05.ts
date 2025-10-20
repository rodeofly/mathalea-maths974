import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import { complex, add, conj } from 'mathjs'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
export const titre = 'Déterminer le conjugué d\'un nombre complexe'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDePublication = '07/092025'

/**
 * Question de can : Partie réelle/imaginaire
 * @author Stéphane Guyon

*/
export const uuid = 'ac62a'

export const refs = {
  'fr-fr': ['canTEC1-05'],
  'fr-ch': [],
}
export default class Conjugue extends ExerciceSimple {
  constructor() {
    super()

    this.nbQuestions = 1
    this.typeExercice = 'simple'
  }

  nouvelleVersion() {
    const ReZ = randint(-5, 5)
    const ImZ = randint(-5, 5)
    const z1 = complex(ReZ, ImZ)
    const z2 = complex(-ReZ, -ImZ)
    const z3 = complex(-ImZ, ReZ)
     const z4 = complex(ReZ, -ImZ)
      const z5 = complex(ImZ, ReZ)
       const z6 = complex(ImZ, -ReZ)
    const scenario = randint(0, 4)
    this.question = `On donne le nombre complexe $z = ${z1.toString()}$.<br>`
    this.correction = 'Par définition, le conjugué d\'un nombre complexe qui s\'écrit sous la forme $z=a+ib$, avec $a$ et $b$ deux réels, est $\\overline{z} =a-ib$.<br>'
    switch (scenario) {
      case 0 :
          this.question +='Déterminer le conjugué de $z$.'
    this.correction += `On a donc ici : $\\overline{z} = ${miseEnEvidence(`${conj(z1).toString()}`)}$.`

    this.reponse = `${ReZ}+${-ImZ}i`
      break;
      case 1 :
          this.question +='Déterminer $\\overline{z}$.'
    this.correction+= `On a donc ici : $\\overline{z} = ${miseEnEvidence(`${conj(z1).toString()}`)}$.`

    this.reponse = `${ReZ}+${-ImZ}i`
      break;
       case 2 :
           this.question +='Déterminer la forme algébrique de $Z=\\overline{-z}$.'
    this.correction += `
    $\\begin{aligned}
    Z&=\\overline{-z}\\\\
     &= \\overline{${z2.toString()}}\\\\
    &=${miseEnEvidence(`${conj(z2).toString()}`)}.
    \\end{aligned}$`

    this.reponse = `${-ReZ}+${ImZ}i`
      break;
       case 3 :
           this.question +='Déterminer la forme algébrique de $Z=\\overline{iz}$.'
    this.correction += `
    $\\begin{aligned}
    Z&=\\overline{iz}\\\\
      &= \\overline{i\\left(${z1.toString()}\\right)}\\\\
      &= \\overline{${z3.toString()}}\\\\
    &=${miseEnEvidence(`${conj(z3).toString()}`)}.
    \\end{aligned}$<br>
    On aurait pu aussi utiliser la propriété  des produits des conjugués :<br>
     $\\begin{aligned}
    Z&=\\overline{iz}\\\\
      &= \\overline{i} \\times \\overline{${z1.toString()}}\\\\
       &= -i \\left({${z4.toString()}}\\right)\\\\
       &=${miseEnEvidence(`${conj(z3).toString()}`)}.
    \\end{aligned}$<br>`

    this.reponse = `${-ReZ}+${-ImZ}i`
      break;
       case 4 :
           this.question +='Déterminer la forme algébrique de $Z=\\overline{-iz}$.'
    this.correction += `
    $\\begin{aligned}
    Z&=\\overline{-iz}\\\\
      &= \\overline{-i\\left(${z1.toString()}\\right)}\\\\
      &= \\overline{${z6.toString()}}\\\\
    &=${miseEnEvidence(`${z5.toString()}`)}.
    \\end{aligned}$<br>
    On aurait pu aussi utiliser la propriété  des produits des conjugués :<br>
     $\\begin{aligned}
    Z&=\\overline{-iz}\\\\
      &= \\overline{-i} \\times \\left(\\overline{${z1.toString()}}\\right)\\\\
       &= i \\left({${conj(z1).toString()}}\\right)\\\\
      &=${miseEnEvidence(`${z5.toString()}`)}.
    \\end{aligned}$<br>`

    this.reponse = `${-ImZ}+${-ReZ}i`
      break;
  }

}}
