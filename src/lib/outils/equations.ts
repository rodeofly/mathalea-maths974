import Decimal from 'decimal.js'
import { randint } from '../../modules/outils'
import { texFractionFromString } from './deprecatedFractions'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
  rienSi1,
} from './ecritures'
import { miseEnEvidence } from './embellissements'
import { abs, signe } from './nombres'
import { texNombre } from './texNombre'

export const equation1erDegre1Inconnue = (
  options: {
    valeursRelatives?: boolean
    divisiblePar?: number
    type?: 'x+b=d' | 'ax=d' | 'ax+b=0' | 'ax+b=d' | 'ax+b=cx+d'
  } = { valeursRelatives: false, divisiblePar: 1, type: 'ax+b=cx+d' },
) => {
  let a: Decimal, b: Decimal, c: Decimal, d: Decimal, reponse: Decimal
  switch (options.type) {
    case 'x+b=d':
      a = new Decimal(1)
      c = new Decimal(0)
      b = new Decimal(randint(-9, 9, [0])).times(options.divisiblePar ?? 1)
      d = new Decimal(randint(-16, 15, 0)).times(options.divisiblePar ?? 1)
      if (!options.valeursRelatives) {
        d = d.abs()
      }
      reponse = d.minus(b)
      break
    case 'ax=d':
      b = new Decimal(0)
      c = new Decimal(0)
      if (options.valeursRelatives) {
        a = new Decimal(randint(-9, 9, [0, -1, 1]))
        reponse = new Decimal(randint(-9, 9, [-1, 0, 1]))
      } else {
        a = new Decimal(randint(2, 15))
        reponse = new Decimal(randint(2, 9))
      }
      d = a.times(reponse)
      break
    case 'ax+b=0':
    case 'ax+b=d':
      do {
        c = new Decimal(0)
        if (options.type === 'ax+b=0') {
          d = new Decimal(0)
        } else {
          d = new Decimal(randint(-9, 9, [0])).times(options.divisiblePar ?? 1)
        }
        reponse = new Decimal(randint(-5, 5, [0, -1, 1]))
        a = new Decimal(randint(-5, 5, [-1, 0, 1])).times(
          options.divisiblePar ?? 1,
        )
        if (!options.valeursRelatives) {
          reponse = reponse.abs()
          a = a.abs()
          d = d.abs()
        }
        b = d.minus(a.times(reponse))
      } while (b.equals(0))
      break
    case 'ax+b=cx+d':
    default:
      d = new Decimal(randint(-15, 15, 0)).times(options.divisiblePar ?? 1)
      c = new Decimal(randint(-5, 5, [-1, 0, 1])).times(
        options.divisiblePar ?? 1,
      )
      if (!options.valeursRelatives) {
        c = c.abs()
        a = new Decimal(randint(2, 5)).times(options.divisiblePar ?? 1).plus(c)
        reponse = new Decimal(
          randint(-9, 9, [0, -1, 1, -d.div(c.minus(a))]),
        ).abs()
      } else {
        a = new Decimal(randint(-5, 5, [-c, -c + 1, -c - 1, 0]))
          .times(options.divisiblePar ?? 1)
          .plus(c)
        reponse = new Decimal(randint(-9, 9, [0, -1, 1, -d.div(c.minus(a))]))
      }
      b = c.minus(a).times(reponse).plus(d)
      break
  }
  const membreDeGauche = a.equals(0)
    ? b
    : `${rienSi1(a)}x${b.equals(0) ? '' : ecritureAlgebrique(b)}`
  const membreDeDroite = c.equals(0)
    ? d
    : `${rienSi1(c)}x${d.equals(0) ? '' : ecritureAlgebrique(d)}`
  const egalite = `${membreDeGauche}=${membreDeDroite}`
  let correction = ''
  let correctionDetaillee = ''
  if (!c.equals(0)) {
    if (c.greaterThan(0)) {
      correctionDetaillee += `On soustrait $${rienSi1(c)}x$ aux deux membres.<br>`
    } else {
      correctionDetaillee += `On ajoute $${rienSi1(-c)}x$ aux deux membres.<br>`
    }
    const soustraireCx = `$${rienSi1(a)}x${ecritureAlgebrique(b)}${miseEnEvidence(signe(-c) + rienSi1(abs(c)) + 'x')}=${texNombre(c)}x${ecritureAlgebrique(d)}${miseEnEvidence(signe(-c) + rienSi1(abs(c)) + 'x')}$<br>
      $${rienSi1(a.minus(c))}x${ecritureAlgebrique(b)}=${texNombre(d)}$<br>`
    correction += soustraireCx
    correctionDetaillee += soustraireCx
  }
  if (!b.equals(0)) {
    if (b.greaterThan(0)) {
      correctionDetaillee += `On soustrait $${b}$ aux deux membres.<br>`
    } else {
      correctionDetaillee += `On ajoute $${texNombre(-b)}$ aux deux membres.<br>`
    }
    const soustraireB = `$${rienSi1(a.minus(c))}x${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-b))}=${texNombre(d)}${miseEnEvidence(ecritureAlgebrique(-b))}$<br>
      $${rienSi1(a.minus(c))}x=${texNombre(d.minus(b))}$<br>`
    correction += soustraireB
    correctionDetaillee += soustraireB
  }
  if (!a.minus(c).equals(1)) {
    correctionDetaillee += `On divise les deux membres par $${texNombre(a.minus(c))}$.<br>`
    const diviserParA = `$${rienSi1(a.minus(c))}x${miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a.minus(c)))}=${texNombre(d.minus(b)) + miseEnEvidence('\\div' + ecritureParentheseSiNegatif(a.minus(c)))}$<br>
      $x=${texFractionFromString(texNombre(d.minus(b)), texNombre(a.minus(c)))}=${reponse}$<br>`
    correction += diviserParA
    correctionDetaillee += diviserParA
  }
  const conclusion = `La solution est $${miseEnEvidence(texNombre(reponse))}$.`
  correction += conclusion
  correctionDetaillee += conclusion
  return {
    membreDeGauche: String(membreDeGauche),
    membreDeDroite: String(membreDeDroite),
    egalite,
    reponse: reponse.toNumber(),
    reponseDecimale: reponse,
    correction,
    correctionDetaillee,
    a: a.toNumber(),
    aDecimal: a,
    b: b.toNumber(),
    bDecimal: b,
    c: c.toNumber(),
    cDecimal: c,
    d: d.toNumber(),
    dDecimal: d,
  }
}
