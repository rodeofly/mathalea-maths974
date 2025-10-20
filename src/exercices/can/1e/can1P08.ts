import { choice } from '../../../lib/outils/arrayOutils'
import { sp } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'
import Exercice from '../../Exercice'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import FractionEtendue from '../../../modules/FractionEtendue'
import Decimal from 'decimal.js'
import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'

import { setReponse } from '../../../lib/interactif/gestionInteractif'
import { tableauColonneLigne } from '../../../lib/2d/tableau'

export const titre =
  'Compléter le tableau d’une loi de probabilité d’une variable aléatoire'
export const dateDePublication = '08/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora

 */
export const uuid = '0f776'

export const refs = {
  'fr-fr': ['can1P08'],
  'fr-ch': ['3mP1-7'],
}
export default class ProbaLoiVA extends Exercice {
  constructor() {
    super()

    this.sup = true
    this.keyboard = [
      'numbers',
      'fullOperations',
      'variables',
      'trigo',
      'advanced',
    ]

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const listeFractions = [
      [1, 5, 1, 3],
      [1, 5, 2, 3],
      [1, 5, 1, 4],
      [1, 5, 3, 4],
      [1, 5, 1, 2],
      [2, 5, 1, 2],
      [1, 6, 1, 2],
      [1, 3, 1, 2],
      [1, 3, 1, 5],
      [1, 10, 1, 5],
      [3, 10, 1, 5],
      [3, 10, 1, 6],
      [7, 10, 1, 5],
      [1, 9, 1, 2],
      [2, 9, 1, 5],
      [3, 7, 1, 5],
      [2, 9, 1, 4],
      [1, 4, 1, 6],
      [1, 4, 1, 3],
      [1, 8, 1, 2],
      [3, 8, 1, 4],
      [5, 8, 1, 5],
      [3, 7, 1, 4],
    ]
    for (
      let i = 0,
        cpt = 0,
        fraction = [],
        f1,
        f2,
        f3,
        reponse,
        tableau1,
        tableau2,
        tableau3,
        tableau,
        a,
        b,
        c,
        p1,
        p2,
        p3,
        texte,
        texteCorr;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (
        choice([1, 2]) //
      ) {
        case 1: // val décimale
          a = randint(-3, 2)
          b = randint(3, 6)
          c = randint(7, 10)
          p1 = new Decimal(randint(1, 30)).div(100)
          p2 = new Decimal(randint(31, 60)).div(100)
          p3 = new Decimal(p1).plus(p2).mul(-1).plus(1)
          tableau1 = tableauColonneLigne(
            ['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            [`${texNombre(p1, 2)}`, `${texNombre(p2, 2)}`, 'a'],
          )
          tableau2 = tableauColonneLigne(
            ['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            [`${texNombre(p1, 2)}`, 'a', `${texNombre(p2, 2)}`],
          )
          tableau3 = tableauColonneLigne(
            ['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            ['a', `${texNombre(p2, 2)}`, `${texNombre(p1, 2)}`],
          )

          tableau = choice([tableau1, tableau2, tableau3])
          texte =
            'Ce tableau  donne la loi de probabilité d’une variable aléatoire $X$.<br>'
          texte += `${tableau}<br>`
          texte += `Quelle est la valeur de $a$ ?${sp(5)}`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i, ' lycee')
          }

          texteCorr = ` La somme des probabilités est égale à $1$.<br>
          Ainsi, $a=1-${texNombre(p1, 2)}-${texNombre(p2, 2)}=${texNombre(p3, 2)}$.
      `
          reponse = p3
          setReponse(this, i, reponse)
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter.push('$a=\\ldots$')

          break

        case 2: // fraction
          a = randint(-3, 2)
          b = randint(3, 6)
          c = randint(7, 10)

          fraction = choice(listeFractions)
          f1 = new FractionEtendue(fraction[0], fraction[1])
          f2 = new FractionEtendue(fraction[2], fraction[3])
          f3 = new FractionEtendue(
            fraction[1] * fraction[3] -
              fraction[0] * fraction[3] -
              fraction[2] * fraction[1],
            fraction[1] * fraction[3],
          )
          p1 = new Decimal(randint(1, 30)).div(100)
          p2 = new Decimal(randint(31, 60)).div(100)
          p3 = new Decimal(1 - p1 - p2)
          tableau1 = tableauColonneLigne(
            ['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            [`${f1.texFraction}`, `${f2.texFraction}`, 'a'],
          )
          tableau2 = tableauColonneLigne(
            ['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            [`${f1.texFraction}`, 'a', `${f2.texFraction}`],
          )
          tableau3 = tableauColonneLigne(
            ['x_i', `${a}`, `${b}`, `${sp(4)}${c}${sp(4)}`],
            ['P(X=x_i)'],
            ['a', `${f1.texFraction}`, `${f2.texFraction}`],
          )

          tableau = choice([tableau1, tableau2, tableau3]) //, tableau2, tableau3
          texte =
            'Ce tableau donne la loi de probabilité d’une variable aléatoire $X$.<br>'
          texte += `${tableau}<br>`
          texte += `Quelle est la valeur de $a$ ?${sp(5)}`
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i, ' lycee')
          }
          texteCorr = ` La somme des probabilités est égale à $1$.<br>
          Ainsi, $a=1-${f1.texFraction}-${f2.texFraction}=\\dfrac{${fraction[1] * fraction[3]}}{${fraction[1] * fraction[3]}}-\\dfrac{${fraction[0] * fraction[3]}}{${fraction[1] * fraction[3]}}-\\dfrac{${fraction[2] * fraction[1]}}{${fraction[1] * fraction[3]}}=${f3.texFraction}${f3.texSimplificationAvecEtapes()}$.
      `
          reponse = f3
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce = texte
          this.canReponseACompleter = '$a=\\ldots$'
          break
      }
      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
