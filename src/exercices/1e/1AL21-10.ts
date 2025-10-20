import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import engine from '../../lib/interactif/comparisonFunctions'
import { Point } from '../../lib/2d/points'
import { numAlpha } from '../../lib/outils/outilString'
import type {
  SemiBoxedExpression,
  BoxedExpression,
} from '@cortex-js/compute-engine'
import { choice } from '../../lib/outils/arrayOutils'

export const titre = 'Interpolation polynomiale'
export const dateDePublication = '10/07/2024'
export const dateDeModifImportante = '08/09/2024'

/**
 * Interpolation polynomiale :
 * - déterminer la fonction polynomiale de degré 2, connaissant ses
 * racines et l'image d'un nombre. On passe par la forme canonique
 * puis on développe.
 * - Déterminer la fonction polynomiale de degré 2 dont la courbe
 * représentative passe par trois points donnés du plan. On réduit
 * ce problème au problème précédent à l'aide d'une fonction auxiliaire.
 * @florianpicard
 */

export const uuid = '9fa71' // exécuter pnpm getNewUuid

export const refs = {
  'fr-fr': ['1AL21-10'],
  'fr-ch': ['1mF3-5'],
}

function pointVersTex(A: Point): string {
  return `${A.nom}\\left(${A.x} ; ${A.y}\\right)`
}

function affineInterpolation(xA: number, yA: number, xB: number, yB: number) {
  // Renvoie l'expression d'une fonction affine dont la courbe représentative
  // passe par les points A(xA, yA), et B(xB, yB).
  const m = engine.parse(`(${yB} - ${yA})/(${xB} - ${xA})`, {
    canonical: false,
  })
  const p = engine.parse(`${yA} - ${m.evaluate()}*${xA}`)
  return engine.box(['Add', ['Multiply', m, 'x'], p]).simplify()
}

function polynomeInterpolation(
  r1: number,
  r2: number,
  x: number,
  fdex: SemiBoxedExpression,
  fname: string = 'f',
) {
  // Renvoie la fonction polynomiale p de degré 2 telle que f(r1) = f(r2) = 0, et f(x) = fdex.
  // fdex est soit un nombre numérique soit une BoxExpression
  // Renvoie également les détails de à la résolution de ce problème.
  fdex =
    typeof fdex === 'number' || typeof fdex === 'string'
      ? engine.box(fdex)
      : (fdex as BoxedExpression).simplify() // fdex est une BoxedExpression
  const a = engine.box(
    ['Rational', fdex, ['Multiply', ['Add', x, -r1], ['Add', x, -r2]]],
    { canonical: false },
  )
  let f = engine.parse(`a(x - ${r1})(x - ${r2})`, { canonical: false }) // on définit f sous forme factorisée
  let details = ''
  details += `Comme $${fname}\\left(${r1}\\right) = 0$ et $${fname}\\left(${r2}\\right) = 0$, $${r1}$ et $${r2}$ sont des racines de $${fname}$. `
  details += `On peut donc écrire $${fname}$ sous forme factorisée.`
  details += `\\[${fname}(x) = ${f.latex}\\]`
  details += `On sait de plus que $${fname}(${x}) = ${fdex.latex}$. Donc : `
  const replacex = f.subs({ x }, { canonical: false }) // On utilise l'information f(x) = fdex
  details += `\\[${fdex.latex} = ${fname}(${x}) = ${replacex.latex} \\]`
  details += `On trouve alors : $a = ${a.latex} = ${a.evaluate().latex}$. La forme factorisée de $${fname}$ est donc :`
  f = f.subs({ a: a.evaluate() })
  details += `\\[${fname}(x) = ${f.latex}\\]`
  details += `On développe et on trouve $${fname}(x) = ${f.evaluate().latex}$`

  return {
    details,
    reponse: f,
  }
}

function questionRacine() {
  const a = randint(-5, 5)
  const b = randint(-5, 5, [a])
  const c = randint(-5, 5, [a, b])
  const h = randint(-10, 10, [0])
  let texte = ''
  // texte += `Soient $a = ${a}$, $b = ${b}$, et $c = ${c}$. `
  texte +=
    '$f$ est une fonction polynomiale de degré $2$ définie sur $\\mathbb{R}$.<br> '
  texte += `On suppose que $f(${a}) = f(${b}) = 0$, et que $f(${c}) = ${h}$. <br>`
  texte += 'Déterminer la forme développée de $f$.'

  return [texte, polynomeInterpolation(a, b, c, h).details, a, b, c, h]
}

function questionInterpolation() {
  const ax = randint(-7, -3)
  const ay = randint(-5, 5)
  const A = new Point(ax, ay, 'A')
  const bx = randint(-2, 2, [ax])
  const by = randint(-5, 5, [ay])
  const B = new Point(bx, by, 'B')
  const cx = randint(-2, 7, [ax, bx])
  const cy = randint(-5, 5, [ay, by])
  const C = new Point(cx, cy, 'C')
  let texte = ''
  texte += `Soient les points $${pointVersTex(A)}$, $${pointVersTex(B)}$, et $${pointVersTex(C)}$. <br>`
  texte +=
    'Soit $f$ la fonction polynomiale de degré $2$ définie sur $\\mathbb{R}$ dont la courbe représentative $\\mathcal{C}_f$ passe par les points $A$, $B$ et $C$. <br>'
  const g = affineInterpolation(ax, ay, cx, cy)
  texte += `On note $g$ la fonction définie par : \\[g(x) = ${g.latex}\\]`
  texte +=
    'On note $h$ la fonction polynomiale de degré $2$ définie sur $\\mathbb{R}$ par : $h(x) = f(x) - g(x)$'
  texte += `<br> ${numAlpha(0)} Vérifier que $h(${ax}) = h(${cx}) = 0$. Que vaut $h(${bx})$ ?`
  texte += `<br> ${numAlpha(1)} En déduire la forme développée de $h$, puis la forme développée de $f$. `

  const gax = g.subs({ x: ax }, { canonical: false })
  const gbx = g.subs({ x: bx }, { canonical: false })
  const { details, reponse: h } = polynomeInterpolation(
    ax,
    cx,
    bx,
    engine.parse(`${by} - ${gbx.simplify().latex}`),
    'h',
  )
  const hax = h.subs({ x: ax }, { canonical: false })
  const hbx = h.subs({ x: bx }, { canonical: false })
  const hcx = h.subs({ x: cx }, { canonical: false })
  const f = engine.box(['Add', h, g])

  let texteCorr = `${numAlpha(0)} On a : \\[h(${ax}) = f(${ax}) - g(${ax}) = ${ay} - \\left(${gax.latex}\\right) = ${hax.simplify()}\\]`
  texteCorr += `De même on a $h(${cx}) = ${hcx.simplify().latex}$. `
  texteCorr += `Enfin, on a : \\[h(${bx}) = f(${bx}) - g(${bx}) = ${by} - \\left(${gbx.latex}\\right) = ${hbx.simplify().latex}\\] `
  texteCorr += `<br> ${numAlpha(1)}`
  texteCorr += details
  texteCorr += `<br> Comme $f(x) = h(x) + g(x)$, on trouve $f(x) = ${f.simplify().latex}$`
  return [texte, texteCorr, ax, ay, bx, by]
}

export default class nomExercice extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 2
  }

  nouvelleVersion() {
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const [texte, texteCorr, ax, ay, bx, by] =
        i % 2 === 0
          ? choice([questionRacine(), questionInterpolation()])
          : choice([questionRacine(), questionInterpolation()])
      if (this.questionJamaisPosee(i, ax, ay, bx, by)) {
        this.listeQuestions[i] = String(texte)
        this.listeCorrections[i] = String(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
