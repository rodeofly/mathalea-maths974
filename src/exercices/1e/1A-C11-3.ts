import { ecritureAlgebrique, reduireAxPlusB } from '../../lib/outils/ecritures'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '09/09/2025'
export const uuid = '7f02a'

export const refs = {
  'fr-fr': ['1A-C11-3'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Résoudre une équation $ax+b=c$'
export default class Auto1AC11c extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce = "La solution de l'équation  $-53x+72=-137$ est : "
    this.correction = ` On obtient $x$ en retranchant $72$, puis en divisant le résultat par $-53$.<br>
    Ainsi, $x=\\dfrac{-137-72}{-53}$, soit  $${miseEnEvidence('x=\\dfrac{137+72}{53}')}$.`

    this.reponses = [
      '$x=\\dfrac{137+72}{53}$',
      '$x=\\dfrac{137-72}{53}$',
      '$x=\\dfrac{72-137}{53}$',
      '$x=\\dfrac{72+137}{-53}$',
    ]
  }

  versionAleatoire = () => {
    switch (randint(1, 3)) {
      case 1: //a>0, b<0 et c<0
        {
          const a = randint(71, 99, [80, 90])
          const b = randint(-49, -29)
          const c = randint(-149, -119)

          this.enonce = `La solution de l'équation  $${reduireAxPlusB(a, b)}=${c}$ est : `
          this.correction = ` On obtient $x$ en ajoutant $${-b}$, puis en divisant le résultat par $${a}$.<br>
    Ainsi, $x=\\dfrac{${c}${ecritureAlgebrique(-b)}}{${a}}$, soit  $${miseEnEvidence(`x=\\dfrac{${-b}${ecritureAlgebrique(c)}}{${a}}`)}$.`

          this.reponses = [
            `$x=\\dfrac{${-b}${ecritureAlgebrique(c)}}{${a}}$`,
            `$x=\\dfrac{${c}${ecritureAlgebrique(b)}}{${a}}$`,
            `$x=\\dfrac{${-c}${ecritureAlgebrique(b)}}{${a}}$`,
            `$x=\\dfrac{${c}${ecritureAlgebrique(-a)}}{${-b}}$`,
          ]
        }
        break
      case 2: //a<0, b<0 et c<0
        {
          const a = randint(-99, -34)
          const b = randint(-49, -29)
          const c = randint(-149, -119)

          this.enonce = `La solution de l'équation  $${reduireAxPlusB(a, b)}=${c}$ est : `
          this.correction = ` On obtient $x$ en ajoutant $${-b}$, puis en divisant le résultat par $${a}$.<br>
    Ainsi, $x=\\dfrac{${c}${ecritureAlgebrique(-b)}}{${a}}$, soit  $${miseEnEvidence(`x=\\dfrac{${-c}${ecritureAlgebrique(b)}}{${-a}}`)}$.`

          this.reponses = [
            `$x=\\dfrac{${-c}${ecritureAlgebrique(b)}}{${-a}}$`,
            `$x=\\dfrac{${-c}${ecritureAlgebrique(-b)}}{${-a}}$`,
            `$x=\\dfrac{${-c}${ecritureAlgebrique(-b)}}{${a}}$`,
            `$x=\\dfrac{${c}${ecritureAlgebrique(-a)}}{${-b}}$`,
          ]
        }
        break

      case 3: //a<0, b>0 et c<0
      default:
        {
          const a = randint(-99, -34)
          const b = randint(29, 49)
          const c = randint(-149, -119)

          this.enonce = `La solution de l'équation  $${reduireAxPlusB(a, b)}=${c}$ est : `
          this.correction = ` On obtient $x$ en retranchant $${b}$, puis en divisant le résultat par $${a}$.<br>
    Ainsi, $x=\\dfrac{${c}-${b}}{${a}}$, soit  $${miseEnEvidence(`x=\\dfrac{${-c}${ecritureAlgebrique(b)}}{${-a}}`)}$.`

          this.reponses = [
            `$x=\\dfrac{${-c}${ecritureAlgebrique(b)}}{${-a}}$`,
            `$x=\\dfrac{${-c}${ecritureAlgebrique(-b)}}{${a}}$`,
            `$x=\\dfrac{${c}${ecritureAlgebrique(b)}}{${-a}}$`,
            `$x=\\dfrac{${c}${ecritureAlgebrique(-a)}}{${-b}}$`,
          ]
        }
        break
    }
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
