import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
  ecritureParentheseSiNegatif,
  reduireAxPlusByPlusC,
} from '../../lib/outils/ecritures'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import engine from '../../lib/interactif/comparisonFunctions'
import type { MathfieldElement } from 'mathlive'
import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { getLang } from '../../lib/stores/languagesStore'
import FractionEtendue from '../../modules/FractionEtendue'
export const titre =
  'Déterminer une équation cartésienne avec un point et un vecteur normal'
export const dateDePublication = '04/07/2024'
export const dateDeModifImportante = '03/03/2025'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 *
 * @author Gilles Mora+Jean Claude Lhote interactif
 */
export const uuid = '816d5'

export const refs = {
  'fr-fr': ['1G13'],
  'fr-ch': [],
}

class EqCartDroite extends Exercice {
  version: number
  constructor() {
    super()
    this.nbQuestions = 1

    this.version = 1
  }

  nouvelleVersion(): void {
    // Lettre entre A et W mais pas L, M, N ou O pour ne pas avoir O dans les 4 points
    const lang = getLang()
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let xA, yA, xB, yB, xn, yn, constante, xu, yu, m
      let texte = ''
      let texteCorr = ''
      switch (this.version) {
        case 4: // 2G30-5 Point et pente
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          m = randint(1, 5) * choice([-1, 1])
          xn = m
          yn = -1
          constante = -m * xA + yA
          texte = `Dans un repère orthonormé du plan, on considère le point $A(${xA}\\,;\\,${yA})$.`
          texte += `<br>Déterminer une équation cartésienne de la droite $(d)$ passant par le point $A$ et ayant ${lang === 'fr-CH' ? 'une pente égale à' : 'pour coefficent directeur'} $${m}$`
          texteCorr = ''
          if (lang === 'fr-CH') {
            texteCorr =
              "On sait que si une droite $(d)$ possède une pente égale à un réel $m$, alors elle peut s'écrire sous la forme $y=mx+p$. On veut écrire cette équation sous la forme $ax+by+c=0$."
          } else {
            texteCorr =
              'On sait que si une droite $(d)$ possède une pente égale à un réel $m$, alors elle admet $\\vec u \\begin{pmatrix}1\\\\m\\end{pmatrix}$ comme vecteur directeur.'
            texteCorr += `<br>Cela signifie que la droite $(d)$ dont nous cherchons une équation cartésienne, admet comme vecteur directeur $\\vec u \\begin{pmatrix}1\\\\${m}\\end{pmatrix}$.`
            texteCorr +=
              "<br>On sait d'autre part qu'une droite portée par un vecteur directeur de coordonnées $\\vec u \\begin{pmatrix}-b\\\\a\\end{pmatrix}$, avec $(-b\\,;\\,a)\\neq (0\\,;\\,0)$, admet une équation cartesienne de la forme $ax+by+c=0$."
          }
          texteCorr += `<br>Ce qui signifie que : $-b=1$ (soit $b=-1$) et $a=${m}$ (on écrit la droite sous la forme $0=ax+by+c$, ce qui revient au même).`
          texteCorr += `<br>On en déduit que la droite $(d)$ admet une équation cartésienne de la forme $${m}x-y+c=0.$`
          texteCorr += `<br>Pour déterminer la valeur de $c$, on utilise le fait que $A$ appartient à la droite $(d)$, donc ses coordonnées $(${xA};${yA})$ vérifient l'équation : `
          texteCorr += `$${m} x-y+c=0$`
          texteCorr += `<br>Ce qui implique que  $${m}\\times ${ecritureParentheseSiNegatif(xA)}-${ecritureParentheseSiNegatif(yA)}+c=0$`
          texteCorr += `, d'où $c=${-m * xA + yA}$.`

          break
        case 3: // 2G30-4 Point et vecteur directeur
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          do {
            xu = randint(-5, 5)
            yu = randint(-5, 5)
          } while (xu === 0 && yu === 0) // EE : Pour éviter le cas du vecteur nul
          xn = yu
          yn = -xu
          constante = -xA * yu + yA * xu
          texte = `Dans un repère orthonormé du plan, on considère la droite $(d)$ qui passe par le point $A$ de coordonnées $(${xA}\\,;\\,${yA})$ et qui a le vecteur $\\vec u \\begin{pmatrix}${xu}\\\\${yu}\\end{pmatrix}$ comme vecteur directeur.<br>
    Déterminer une équation cartésienne de la droite $(d)$`
          if (this.sup === 1) {
            texte +=
              '<br><i>On demande une rédaction utilisant un résultat de cours.</i>'
            texteCorr =
              "On sait, d'après le cours, que si une droite $(d)$ admet un vecteur directeur de coordonnées :"
            texteCorr +=
              ' $\\vec {u} \\begin{pmatrix}-b\\\\a\\end{pmatrix}$, alors une équation cartésienne de la droite $(d)$ est de la forme $ax+by+c=0$. '
            texteCorr += `<br>Avec les données de l'énoncé, $\\vec u \\begin{pmatrix}${xu}\\\\${yu}\\end{pmatrix}$, on en déduit donc que : $-b = ${xu}$ (soit $b=${-xu}$) et $a=${yu}$.`
            texteCorr += ` <br>L'équation cartésienne est donc de la forme : $ ${yu} x ${ecritureAlgebriqueSauf1(-xu)} y + c=0$. `
            texteCorr += `<br>Comme $A\\in (d)$, ses coordonnées $(${xA}\\,;\\,${yA})$ vérifient l'équation de la droite $(d)$. `
            texteCorr += ` <br>$\\begin{aligned}
       ${yu} \\times ${ecritureParentheseSiNegatif(xA)} ${ecritureAlgebrique(-xu)} \\times ${ecritureParentheseSiNegatif(yA)}+ c&=0\\\\
        ${yu * xA} ${ecritureAlgebrique(-xu * yA)} + c&=0\\\\
        c&= ${-xA * yu + yA * xu}
        \\end{aligned}$`
          } else {
            texte +=
              "<br><i>On demande une démonstration n'utilisant pas de résultat de cours.</i>"
            texteCorr = 'Soit $M(x;y)$ un point du plan distinct de $A$.'
            texteCorr += '<br>$M(x;y) \\in (d)$'
            texteCorr +=
              ' <br>$\\iff \\overrightarrow {AM}$ est un vecteur directeur de la droite $(d)$. '
            texteCorr +=
              ' <br>$\\iff \\overrightarrow {AM}$ et $\\vec u$ sont donc des vecteurs colinéaires. '
            texteCorr +=
              ' <br>$\\iff Det\\big(\\overrightarrow {AM};\\vec u\\big)=0$ <br>'
            texteCorr +=
              ' <br>$\\iff \\begin{vmatrix}x-x_A&x_u\\\\y-y_A&y_u\\end{vmatrix}=0$ <br>'
            texteCorr += `<br>$\\iff \\begin{vmatrix}x-${ecritureParentheseSiNegatif(xA)}&${xu}\\\\y-${ecritureParentheseSiNegatif(yA)}&${yu}\\end{vmatrix}=0$<br>`
            texteCorr += `<br>$\\iff (x-${ecritureParentheseSiNegatif(xA)})\\times ${yu}-( y-${ecritureParentheseSiNegatif(yA)}) \\times ${ecritureParentheseSiNegatif(xu)}=0$`
            texteCorr += `<br>$\\iff ${yu} x ${ecritureAlgebriqueSauf1(-xu)} y -${ecritureParentheseSiNegatif(xA)} \\times ${yu} ${ecritureAlgebrique(yA)} \\times ${ecritureParentheseSiNegatif(xu)}=0$`
          }
          texteCorr +=
            this.sup === 2 ? ' <br>Après réduction, une ' : ' <br>Une '

          break
        case 2: // 2G30-3 Deux points
          xA = randint(-5, 5)
          yA = randint(-5, 5)
          xB = randint(-5, 5)
          yB = randint(-5, 5)
          xn = yB - yA
          yn = xA - xB
          constante = -xA * yA + xB * yA - yB * xA + yA * xA
          if (xA === xB && yA === yB) {
            xB = xB + randint(1, 2)
            yB = yB - randint(1, 2)
          }
          if (this.nbQuestions === 1) {
            texte = `Dans un repère orthonormé du plan, on considère les points $A$ et $B$ de coordonnées respectives $(${xA}\\,;\\,${yA})$ et $(${xB}\\,;\\,${yB})$.<br>
      Déterminer une équation cartésienne de la droite $(AB)$`
            this.consigne = ''
          } else {
            this.consigne = `Dans un repère orthonormé du plan, on considère les points $A$ et $B$.<br>
      Déterminer une équation cartésienne de la droite $(AB)$ dans chacun des cas suivants.`
            texte = `Avec $A(${xA}\\,;\\,${yA})$ et $B(${xB}\\,;\\,${yB})$.`
          }
          texteCorr =
            "On sait qu'une équation cartésienne de la droite $(AB)$ est de la forme :"
          texteCorr += ' $ax+by+c=0$, avec $(a;b)\\neq (0\\,;\\,0)$.'
          if (lang === 'fr-CH') {
            const pente = new FractionEtendue(yB - yA, xB - xA)
            const oo = new FractionEtendue(yA, 1)
              .sommeFraction(
                pente.produitFraction(new FractionEtendue(xA, 1).oppose()),
              )
              .simplifie()
            texteCorr += `<br>On sait que la pente de la droite $(AB)$ est donnée par : $m=\\dfrac{y_B-y_A}{x_B-x_A}=\\dfrac{${yB}-${ecritureParentheseSiNegatif(yA)}}{${xB}-${ecritureParentheseSiNegatif(xA)}}$. On réduit cette fraction pour obtenir $m=${pente.texFractionSimplifiee}$.`
            texteCorr += `<br>On en déduit que l'équation réduite de la droite $(AB)$ est de la forme : \\[y=${pente.texFractionSimplifiee}x+p.\\]
            <br>On détermine la valeur de $p$ en utilisant que $A\\in (AB)$. Ainsi, 
            \\[${yA}=${pente.texFractionSimplifiee}\\cdot ${ecritureParentheseSiNegatif(xA)}+p\\] et donc $p=${yA}${pente.simplifie().oppose().texFractionSignee}\\cdot ${ecritureParentheseSiNegatif(xA)}=${oo.texFractionSimplifiee}$.
            <br>On en déduit que l'équation réduite de la droite $(AB)$ est : $y=${pente.texFractionSimplifiee}x${oo.texFractionSignee}$.`
          } else {
            texteCorr +=
              '<br>On sait aussi que dans ces conditions, un vecteur directeur de cette droite a pour coordonnées :'
            texteCorr += ' $\\vec {u} \\begin{pmatrix}-b\\\\a\\end{pmatrix}$'
            texteCorr +=
              ' <br>Il suffit donc de trouver un vecteur directeur à cette droite pour déterminer une valeur possible pour les coefficients $a$ et $b$. <br>Or le vecteur $\\overrightarrow{AB}$ est un vecteur  directeur de la droite, dont on peut calculer les coordonnées :'
            texteCorr +=
              ' <br>$\\overrightarrow{AB}  \\begin{pmatrix}x_B-x_A\\\\y_B-y_A\\end{pmatrix}$'
            texteCorr += ` $\\iff\\overrightarrow{AB}  \\begin{pmatrix} ${xB}-${ecritureParentheseSiNegatif(xA)}\\\\${yB}-${ecritureParentheseSiNegatif(yA)}\\end{pmatrix}$`
            texteCorr += ` $\\iff\\overrightarrow{AB}  \\begin{pmatrix} ${xB - xA}\\\\${yB - yA}\\end{pmatrix}$`
            texteCorr += ` <br>On en déduit $-b = ${xB - xA}$ (soit $b=${xA - xB}$) et $a=${yB - yA}$.`
            texteCorr += ` <br>L'équation cartésienne de la droite $(AB)$ est donc de la forme : $ ${yB - yA} x ${ecritureAlgebriqueSauf1(xA - xB)} y + c=0$ `
            texteCorr += `<br>Comme $A\\in (AB)$, ses coordonnées $(${xA}\\,;\\,${yA})$ vérifient l'équation de la droite $(AB)$. `
            texteCorr += ` <br>$\\begin{aligned}
       ${yB - yA} \\times ${ecritureParentheseSiNegatif(xA)} ${ecritureAlgebriqueSauf1(xA - xB)} \\times ${ecritureParentheseSiNegatif(yA)}+ c&=0\\\\
       ${yB * xA - yA * xA} ${ecritureAlgebrique(xA * yA - xB * yA)} + c&=0\\\\
       c&= ${-xA * yA + xB * yA - yB * xA + yA * xA}
       \\end{aligned}$`
          }

          break
        default: // 1G13 Point et vecteur normal
          xA = randint(-5, 5, 0)
          yA = randint(-5, 5, 0)
          xn = randint(-5, 5, 0)
          yn = randint(-5, 5, 0)
          constante = -xA * xn - yA * yn
          texte = `La droite $(d)$ passe par le point $A$ de coordonnées $(${xA}\\,;\\,${yA})$ et a le vecteur $\\vec n \\begin{pmatrix}${xn}\\\\${yn}\\end{pmatrix}$ comme vecteur normal.<br>
          Déterminer une équation cartésienne de $(d)$`
          texteCorr =
            "On sait, d'après le cours, que si une droite $(d)$ admet un vecteur normal de coordonnées :"
          texteCorr += ' $\\vec {n} \\begin{pmatrix}a\\\\b\\end{pmatrix}$, '
          texteCorr +=
            'alors une équation cartésienne de la droite $(d)$ est de la forme $ax+by+c=0$. '
          texteCorr += `<br>Avec les données de l'énoncé, $\\vec n \\begin{pmatrix}${xn}\\\\${yn}\\end{pmatrix}$,`
          texteCorr += ` on en déduit  que $a = ${xn}$ et $b=${yn}$.`
          texteCorr += ` <br>L'équation cartésienne est donc de la forme : $ ${xn} x ${ecritureAlgebriqueSauf1(yn)} y + c=0$. `
          texteCorr += `<br>On cherche maintenant la valeur correspondante de $c$. <br>On utilise pour cela que $A(${xA}\\,;\\,${yA}) \\in(d)$. `
          texteCorr += ` <br>En remplaçant $x$ et $y$ par les coordonnées de $A$, on obtient : $${xn} \\times ${ecritureParentheseSiNegatif(xA)} ${ecritureAlgebrique(yn)} \\times ${ecritureParentheseSiNegatif(yA)}+ c=0$, 
          soit $ c= ${-xA * xn - yA * yn}$ `

          break
      }
      const reponse = `${reduireAxPlusByPlusC(xn, yn, constante)}=0`

      const callback = (exercice: Exercice, question: number) => {
        const spanReponseLigne = document.querySelector(
          `#resultatCheckEx${exercice.numeroExercice}Q${question}`,
        )
        let resultat
        const feedback: string = ''
        const mfe = document.querySelector(
          `#champTexteEx${exercice.numeroExercice}Q${question}`,
        ) as MathfieldElement
        const equation = mfe.value.split('=')
        if (equation.length !== 2) {
          resultat = {
            isOk: false,
            feedback: 'Il faut saisir une équation',
            score: { nbBonnesReponses: 0, nbReponses: 1 },
          }
        } else if (Number(equation[1]) !== 0) {
          resultat = {
            isOk: false,
            feedback: "L'équation n'a pas la forme demandée",
            score: { nbBonnesReponses: 0, nbReponses: 1 },
          }
        } else {
          const fxy = engine
            .box([
              'Divide',
              engine.parse(equation[0]).json,
              engine.parse(reduireAxPlusByPlusC(xn, yn, constante)).json,
            ])
            .compile()
          if (fxy == null) {
            resultat = {
              isOk: false,
              feedback: "La saisie n'est pas conforme",
              score: { nbBonnesReponses: 0, nbReponses: 1 },
            }
          } else {
            const valAlea = () => -5 + 10 * Math.random()
            const [aa, bb, cc] = [valAlea(), valAlea(), valAlea()]
            const [A, B, C] = [valAlea(), valAlea(), valAlea()]
            const results: number[] = []
            for (const x of [aa, bb, cc]) {
              for (const y of [A, B, C]) {
                const vars = Object.fromEntries([
                  ['x', x],
                  ['y', y],
                ])
                results.push(Number(fxy(vars)))
              }
            }
            let isOk = true
            for (let k = 0; k < 8; k++) {
              if (isNaN(Math.abs(results[k]))) {
                // Cela peut arriver si un des termes de l'équation de droite est une lettre autre que x et y
                isOk = false
                break
              }
              if (Math.abs(results[k] - results[k + 1]) > 1e-8) {
                isOk = false
                break
              }
            }
            resultat = {
              isOk,
              feedback:
                isOk === true
                  ? ''
                  : "L'équation n'est pas celle de la droite $(d)$.",
              score: {
                nbBonnesReponses: isOk ? 1 : 0,
                nbReponses: 1,
              },
            }
          }
        }
        // on met le smiley
        if (spanReponseLigne != null) {
          spanReponseLigne.innerHTML = resultat.isOk ? '😎' : '☹️'
        }
        const spanFeedback = document.querySelector(
          `#feedbackEx${exercice.numeroExercice}Q${question}`,
        )
        // on met le feedback
        if (feedback != null && spanFeedback != null && feedback.length > 0) {
          spanFeedback.innerHTML = '💡 ' + feedback
          spanFeedback.classList.add(
            'py-2',
            'italic',
            'text-coopmaths-warn-darkest',
            'dark:text-coopmathsdark-warn-darkest',
          )
        }
        return resultat
      }
      if (this.version === 4) {
        texteCorr += `<br>On en déduit qu'une équation cartésienne de ${lang === 'fr-CH' ? '$(AB)$' : '$(d)$'} est : $${miseEnEvidence(reponse)}$.`
        if (m != null) {
          if (m < 0 && -m * xA + yA < 0) {
            texteCorr += `<br>Cette équation peut s'écrire plus simplement :  $${-m} x+y${ecritureAlgebrique(m * xA - yA)}=0$.`
          }
        }
      } else if (this.version === 3) {
        texteCorr +=
          'équation cartésienne de la droite $(d)$ est donc de la forme : '
        texteCorr += `$${miseEnEvidence(reponse)}$.`
      } else {
        texteCorr += `<br>Une équation cartésienne de la droite ${this.version === 2 ? '$(AB)$' : '$(d)$'} est donc de la forme : `
        texteCorr += `$${miseEnEvidence(reponse)}$.`
      }

      texte += ajouteChampTexteMathLive(this, i, ' ', {
        texteAvant:
          this.nbQuestions > 1
            ? ` Équation cartésienne de la droite ${this.version === 2 ? '$(AB)$' : '$(d)$'} : `
            : ' : ',
      })
      texte += '.'
      handleAnswers(this, i, { reponse: { value: reponse }, callback })
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}

export default EqCartDroite
