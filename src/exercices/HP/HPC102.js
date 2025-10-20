import {
  create,
  erfDependencies,
  expDependencies,
  piDependencies,
  sqrtDependencies,
} from 'mathjs'

import { courbe, integrale } from '../../lib/2d/courbes'
import { repere } from '../../lib/2d/reperes'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { mathalea2d } from '../../modules/2dGeneralites'
import { listeQuestionsToContenu } from '../../modules/outils'
import { aleaVariables } from '../../modules/outilsMathjs'
import Exercice from '../Exercice'

export const interactifReady = true
export const interactifType = 'mathLive'

export const titre = 'Calculer des probabilités avec la loi normale'

const math = create({
  erfDependencies,
  sqrtDependencies,
  piDependencies,
  expDependencies,
})

/**
 * Calculs de probas
 * @author Maxime Nguyen
 */

export const uuid = '89071'

export const refs = {
  'fr-fr': ['HPC102'],
  'fr-ch': [],
}
export default class CalculsLoiNormale extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      2,
      '1 : Loi normale centrée réduite \n2 : Loi normale quelconque',
    ]

    this.consigne =
      "Les évaluations numériques pourront se faire à l'aide d'une table de valeur de la loi normale centrée réduite."
    this.nbQuestions = 4

    this.sup = 1

    this.spacingCorr = 1.5
  }

  nouvelleVersion() {
    this.liste_valeurs = [] // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs
    let listeTypeDeQuestionsDisponibles
    if (this.sup === 1) {
      listeTypeDeQuestionsDisponibles = ['N01']
    } else {
      listeTypeDeQuestionsDisponibles = ['Nmusigma', 'Nmusigmaintervallecentre']
    }

    const listeTypeDeQuestions = combinaisonListes(
      listeTypeDeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (
      let i = 0,
        texte,
        texteCorr,
        variables,
        expression,
        gaussienne,
        r,
        C,
        I,
        graphique,
        resultat,
        resultatA,
        resultatB,
        bornea,
        oppbornea,
        borneb,
        oppborneb,
        mu,
        sigma,
        bornec,
        borned,
        calculstep,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 'N01':
          variables = aleaVariables({
            a: 'pickRandom([-1,1])*round(random(0.1,3),2)',
            b: 'pickRandom([-1,1])*round(random(0.1,3),2)',
            test: 'a<b',
          })
          gaussienne = (x) =>
            (1 / math.sqrt(2 * math.pi)) * math.exp(-(x ** 2) / 2)
          r = repere({
            xMin: -4,
            xMax: 4,
            yMin: -0.1,
            yMax: 0.51,
            xUnite: 2,
            yUnite: 6,
            axesEpaisseur: 1,
            yThickDistance: 0.5,
          })
          C = courbe(gaussienne, { repere: r, step: 0.1 })
          I = integrale(gaussienne, {
            repere: r,
            step: 0.1,
            a: variables.a,
            b: variables.b,
            hachures: 0,
          })
          graphique = mathalea2d(
            {
              xmin: -9,
              xmax: 9,
              ymin: -0.2,
              ymax: 3.5,
              pixelsParCm: 30,
              scale: 0.75,
            },
            r,
            C,
            I,
          )
          bornea = texNombre(variables.a)
          oppbornea = texNombre(-variables.a)
          borneb = texNombre(variables.b)
          oppborneb = texNombre(-variables.b)
          bornec = bornea
          borned = borneb
          resultat =
            0.5 * math.erf(variables.b / math.sqrt(2)) -
            0.5 * math.erf(variables.a / math.sqrt(2))
          expression = `$\\mathrm{P}(${bornea} < X < ${borneb})$`
          calculstep = []
          texte =
            'Soit $X$ une variable aléatoire réelle suivant une loi normale $\\mathcal{N}(0,1)$. <br> Calculer à $10^{-2}$ près la probabilité ' +
            expression

          texteCorr =
            'On décompose pour exprimer la probabilité avec la fonction de répartition $t \\mapsto \\mathrm{P}(X \\leq t)$ en utilisant la tabulation de ses valeurs pour $t \\geq 0$ : <br>'
          calculstep.push(
            `\\mathrm{P}(${bornea} < X < ${borneb}) &=  \\mathrm{P}(X < ${borneb}) - \\mathrm{P}(X \\leq ${bornea}) &&`,
          )
          if (variables.b < 0) {
            resultatB = texNombre(
              0.5 + 0.5 * math.erf(-variables.b / math.sqrt(2)),
              3,
            )
            if (variables.a < 0) {
              resultatA = texNombre(
                0.5 + 0.5 * math.erf(-variables.a / math.sqrt(2)),
                3,
              )
              calculstep.push(
                ` &=  \\mathrm{P}(X > ${oppborneb}) - \\mathrm{P}(X \\geq ${oppbornea}) && (\\text{par symétrie de la loi normale})`,
              )
              calculstep.push(
                ` &=  1 - \\mathrm{P}(X \\leq ${oppborneb}) - (1-\\mathrm{P}(X < ${oppbornea})) && (\\text{par passage au complémentaire})`,
              )
              calculstep.push(
                ` &=  \\mathrm{P}(X < ${oppbornea}) - \\mathrm{P}(X \\leq ${oppborneb}) &&`,
              )
              calculstep.push(` &\\approx ${resultatA} - ${resultatB} &&`)
            } else {
              resultatA = texNombre(
                0.5 + 0.5 * math.erf(variables.a / math.sqrt(2)),
                3,
              )
              calculstep.push(
                ` &=  \\mathrm{P}(X > ${oppborneb}) - \\mathrm{P}(X \\leq ${bornea}) && (\\text{par symétrie de la loi normale})`,
              )
              calculstep.push(
                ` &=  1 - \\mathrm{P}(X \\leq ${oppborneb}) - \\mathrm{P}(X \\leq ${bornea}) && (\\text{par passage au complémentaire})`,
              )
              calculstep.push(` &\\approx 1 - ${resultatB} - ${resultatA} &&`)
            }
          } else if (variables.a < 0) {
            resultatA = texNombre(
              0.5 + 0.5 * math.erf(-variables.a / math.sqrt(2)),
              3,
            )
            resultatB = texNombre(
              0.5 + 0.5 * math.erf(variables.b / math.sqrt(2)),
              3,
            )
            calculstep.push(
              ` &=  \\mathrm{P}(X < ${borneb}) - \\mathrm{P}(X > ${oppbornea}) && (\\text{par symétrie de la loi normale})`,
            )
            calculstep.push(
              ` &=  \\mathrm{P}(X < ${borneb}) - (1 - \\mathrm{P}(X \\leq ${oppbornea})) && (\\text{par passage au complémentaire})`,
            )
            calculstep.push(` &\\approx  ${resultatB} - (1 - ${resultatA}) &&`)
          } else {
            resultatA = texNombre(
              0.5 + 0.5 * math.erf(variables.a / math.sqrt(2)),
              3,
            )
            resultatB = texNombre(
              0.5 + 0.5 * math.erf(variables.b / math.sqrt(2)),
              3,
            )
            calculstep.push(`&\\approx  ${resultatB} - ${resultatA} &&`)
          }
          setReponse(this, i, resultat.toFixed(2))
          break
        case 'Nmusigma':
          variables = aleaVariables({
            a: 'pickRandom([-1,1])*round(random(0.3,2.5),1)',
            b: 'pickRandom([-1,1])*round(random(0.3,2.5),1)',
            mu: 'randomInt(-30, 30)',
            sigma: 'round(random(1,4),0)',
            test: '(a-b)/sigma<-1',
          })
          gaussienne = (x) =>
            (1 / variables.sigma / math.sqrt(2 * math.pi)) *
            math.exp(-((x - variables.mu) ** 2) / 2 / variables.sigma ** 2)
          r = repere({
            axeYisVisible: false,
            xMin: -4 * variables.sigma + variables.mu,
            xMax: 4 * variables.sigma + variables.mu,
            yMin: -1,
            yMax: 3,
            xUnite: 2 / variables.sigma,
            yUnite: 6 * variables.sigma,
            axesEpaisseur: 1,
            xThickListe: [
              variables.a * variables.sigma + variables.mu,
              variables.mu,
              variables.b * variables.sigma + variables.mu,
            ],
            xLabelListe: [
              variables.a * variables.sigma + variables.mu,
              variables.mu,
              variables.b * variables.sigma + variables.mu,
            ],
            yThickDistance: 0.5,
            grilleXMin: variables.mu - 4 * variables.sigma,
            grilleXDistance: variables.sigma,
          })
          C = courbe(gaussienne, { repere: r, step: 0.1 })
          I = integrale(gaussienne, {
            repere: r,
            step: 0.1,
            a: variables.a * variables.sigma + variables.mu,
            b: variables.b * variables.sigma + variables.mu,
            hachures: 0,
          })
          graphique = mathalea2d(
            {
              xmin: (-4 * variables.sigma + variables.mu) * r.xUnite,
              xmax: (4 * variables.sigma + variables.mu) * r.xUnite,
              ymin: -0.8,
              ymax: 2.8,
              pixelsParCm: 30,
              scale: 0.75,
            },
            r,
            C,
            I,
          )
          bornec = texNombre(variables.a * variables.sigma + variables.mu)
          borned = texNombre(variables.b * variables.sigma + variables.mu)
          bornea = texNombre(variables.a)
          oppbornea = texNombre(-variables.a)
          borneb = texNombre(variables.b)
          oppborneb = texNombre(-variables.b)
          mu = texNombre(variables.mu)
          sigma = texNombre(variables.sigma)
          resultat =
            0.5 * math.erf(variables.b / math.sqrt(2)) -
            0.5 * math.erf(variables.a / math.sqrt(2))
          expression = `$\\mathrm{P}(${bornec} < X < ${borned})$`
          calculstep = []
          texte =
            `Soit $X$ une variable aléatoire réelle suivant une loi normale $\\mathcal{N}(\\mu=${mu},\\sigma=${sigma})$. <br> Calculer à $10^{-2}$ près la probabilité ` +
            expression

          if (variables.mu < 0) {
            texteCorr = `On pose $Z = \\frac{X + ${texNombre(-variables.mu)}}{${sigma}}$ `
            calculstep.push(
              `\\mathrm{P}(${bornec} < X < ${borned}) &=  \\mathrm{P}\\left(\\frac{${bornec} + ${texNombre(-variables.mu)}}{${sigma}}   < \\frac{X + ${texNombre(-variables.mu)}}{${sigma}} < \\frac{${borned} + ${texNombre(-variables.mu)}}{${sigma}}  \\right) &&`,
            )
          } else {
            texteCorr = `On pose $Z = \\frac{X - ${mu}}{${sigma}}$ `
            calculstep.push(
              `\\mathrm{P}(${bornec} < X < ${borned}) &=  \\mathrm{P}\\left(\\frac{${bornec} - ${mu}}{${sigma}}   < \\frac{X - ${mu}}{${sigma}} < \\frac{${borned} - ${mu}}{${sigma}}  \\right) &&`,
            )
          }
          texteCorr +=
            ' de telle sorte que $Z$ suive une loi $\\mathcal{N}(0,1)$. <br><br>'
          calculstep.push(
            `&= \\mathrm{P}\\left( ${bornea}   < Z < ${borneb}  \\right)`,
          )
          calculstep.push(
            `&=  \\mathrm{P}(X < ${borneb}) - \\mathrm{P}(X \\leq ${bornea}) &&`,
          )
          if (variables.b < 0) {
            resultatB = texNombre(
              0.5 + 0.5 * math.erf(-variables.b / math.sqrt(2)),
              3,
            )
            if (variables.a < 0) {
              resultatA = texNombre(
                0.5 + 0.5 * math.erf(-variables.a / math.sqrt(2)),
                3,
              )
              calculstep.push(
                ` &=  \\mathrm{P}(X > ${oppborneb}) - \\mathrm{P}(X \\geq ${oppbornea}) && (\\text{par symétrie de la loi normale})`,
              )
              calculstep.push(
                ` &=  1 - \\mathrm{P}(X \\leq ${oppborneb}) - (1-\\mathrm{P}(X < ${oppbornea})) && (\\text{par passage au complémentaire})`,
              )
              calculstep.push(
                ` &=  \\mathrm{P}(X < ${oppbornea}) - \\mathrm{P}(X \\leq ${oppborneb}) &&`,
              )
              calculstep.push(` &\\approx ${resultatA} - ${resultatB} &&`)
            } else {
              resultatA = texNombre(
                0.5 + 0.5 * math.erf(variables.a / math.sqrt(2)),
                3,
              )
              calculstep.push(
                ` &=  \\mathrm{P}(X > ${oppborneb}) - \\mathrm{P}(X \\leq ${bornea}) && (\\text{par symétrie de la loi normale})`,
              )
              calculstep.push(
                ` &=  1 - \\mathrm{P}(X \\leq ${oppborneb}) - \\mathrm{P}(X \\leq ${bornea}) && (\\text{par passage au complémentaire})`,
              )
              calculstep.push(` &\\approx 1 - ${resultatB} - ${resultatA} &&`)
            }
          } else if (variables.a < 0) {
            resultatA = texNombre(
              0.5 + 0.5 * math.erf(-variables.a / math.sqrt(2)),
              3,
            )
            resultatB = texNombre(
              0.5 + 0.5 * math.erf(variables.b / math.sqrt(2)),
              3,
            )
            calculstep.push(
              ` &=  \\mathrm{P}(X < ${borneb}) - \\mathrm{P}(X > ${oppbornea}) && (\\text{par symétrie de la loi normale})`,
            )
            calculstep.push(
              ` &=  \\mathrm{P}(X < ${borneb}) - (1 - \\mathrm{P}(X \\leq ${oppbornea})) && (\\text{par passage au complémentaire})`,
            )
            calculstep.push(` &\\approx  ${resultatB} - (1 - ${resultatA}) &&`)
          } else {
            resultatA = texNombre(
              0.5 + 0.5 * math.erf(variables.a / math.sqrt(2)),
              3,
            )
            resultatB = texNombre(
              0.5 + 0.5 * math.erf(variables.b / math.sqrt(2)),
              3,
            )
            calculstep.push(`&\\approx  ${resultatB} - ${resultatA} &&`)
          }
          setReponse(this, i, resultat.toFixed(2))
          break
        case 'Nmusigmaintervallecentre':
          variables = aleaVariables({
            a: 'round(random(0.6,2.5),1)',
            mu: 'randomInt(-30, 30)',
            sigma: 'round(random(1,4),0)',
          })
          gaussienne = (x) =>
            (1 / variables.sigma / math.sqrt(2 * math.pi)) *
            math.exp(-((x - variables.mu) ** 2) / 2 / variables.sigma ** 2)
          r = repere({
            axeYisVisible: false,
            xMin: -4 * variables.sigma + variables.mu,
            xMax: 4 * variables.sigma + variables.mu,
            yMin: -1,
            yMax: 3,
            xUnite: 2 / variables.sigma,
            yUnite: 6 * variables.sigma,
            axesEpaisseur: 1,
            xThickListe: [
              -variables.a * variables.sigma + variables.mu,
              variables.mu,
              variables.a * variables.sigma + variables.mu,
            ],
            xLabelListe: [
              -variables.a * variables.sigma + variables.mu,
              variables.mu,
              variables.a * variables.sigma + variables.mu,
            ],
            yThickDistance: 0.5,
            grilleXMin: variables.mu - 4 * variables.sigma,
            grilleXDistance: variables.sigma,
          })
          C = courbe(gaussienne, { repere: r, step: 0.1 })
          I = integrale(gaussienne, {
            repere: r,
            step: 0.1,
            a: -variables.a * variables.sigma + variables.mu,
            b: variables.a * variables.sigma + variables.mu,
            hachures: 0,
          })
          graphique = mathalea2d(
            {
              xmin: r.xUnite * (-4 * variables.sigma + variables.mu),
              xmax: (4 * variables.sigma + variables.mu) * r.xUnite,
              ymin: -0.8,
              ymax: 2.8,
              pixelsParCm: 30,
              scale: 0.75,
            },
            r,
            C,
            I,
          )
          bornec = texNombre(-variables.a * variables.sigma + variables.mu)
          borned = texNombre(variables.a * variables.sigma + variables.mu)
          bornea = texNombre(-variables.a)
          borneb = texNombre(variables.a)
          mu = texNombre(variables.mu)
          sigma = texNombre(variables.sigma)
          resultat =
            0.5 * math.erf(variables.a / math.sqrt(2)) -
            0.5 * math.erf(-variables.a / math.sqrt(2))
          expression = `$\\mathrm{P}(${bornec} < X < ${borned})$`
          calculstep = []
          texte =
            `Soit $X$  une variable aléatoire réelle suivant une loi normale $\\mathcal{N}(\\mu=${mu},\\sigma=${sigma})$. <br> Calculer à $10^{-2}$ près la probabilité ` +
            expression

          if (variables.mu < 0) {
            texteCorr = `On pose $Z = \\frac{X + ${texNombre(-variables.mu)}}{${sigma}}$ `
            calculstep.push(
              `\\mathrm{P}(${bornec} < X < ${borned}) &=  \\mathrm{P}\\left(\\frac{${bornec} + ${texNombre(-variables.mu)}}{${sigma}}   < \\frac{X + ${texNombre(-variables.mu)}}{${sigma}} < \\frac{${borned} + ${texNombre(-variables.mu)}}{${sigma}}  \\right) &&`,
            )
          } else {
            texteCorr = `On pose $Z = \\frac{X - ${mu}}{${sigma}}$ `
            calculstep.push(
              `\\mathrm{P}(${bornec} < X < ${borned}) &=  \\mathrm{P}\\left(\\frac{${bornec} - ${mu}}{${sigma}}   < \\frac{X - ${mu}}{${sigma}} < \\frac{${borned} - ${mu}}{${sigma}}  \\right) &&`,
            )
          }
          texteCorr +=
            ' de telle sorte que $Z$ suive une loi $\\mathcal{N}(0,1)$. <br><br>'
          calculstep.push(
            `&= \\mathrm{P}\\left( ${bornea}   < Z < ${borneb}  \\right)`,
          )
          calculstep.push(
            `&=  \\mathrm{P}(X < ${borneb}) - \\mathrm{P}(X \\leq ${bornea}) &&`,
          )
          resultatA = texNombre(
            0.5 + 0.5 * math.erf(variables.a / math.sqrt(2)),
            3,
          )
          calculstep.push(
            ` &=  2\\times\\mathrm{P}(X < ${borneb}) - 1 && (\\text{par symétrie de la loi normale})`,
          )
          calculstep.push(` &\\approx  2\\times ${resultatA} - 1 &&`)
          setReponse(this, i, resultat.toFixed(2))
          break
      }
      texte += '.<br>' + graphique
      calculstep.push(`&\\approx  ${texNombre(resultat, 2)} &&`)
      texteCorr += String.raw`
      $\begin{aligned}
      ${calculstep.join('\\\\')}
      \end{aligned}$ <br>`
      texteCorr += `Et donc la probabilité $\\mathrm{P}(${bornec} < X < ${borned}) \\approx ${miseEnEvidence(texNombre(resultat, 2))}$.` //  ${resultat}$`

      texteCorr = texteCorr.replaceAll('frac', 'dfrac')
      if (this.interactif) {
        texte +=
          '<br><br>' +
          ajouteChampTexteMathLive(this, i, '', {
            texteAvant: `La probabilité est : $\\mathrm{P}(${bornec} < X < ${borned}) \\approx $`,
          })
      }

      if (this.questionJamaisPosee(i, bornea, borneb, bornec, borned)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_valeurs.push(expression)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
