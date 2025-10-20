import { courbe } from '../../../lib/2d/courbes'
import { repere } from '../../../lib/2d/reperes'
import { texteParPosition } from '../../../lib/2d/textes'
import { choice } from '../../../lib/outils/arrayOutils'
import Exercice from '../../Exercice'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import { remplisLesBlancs } from '../../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'

import { miseEnEvidence } from '../../../lib/outils/embellissements'
export const titre = 'Lire graphiquement le signe de $b$ dans $ax^2+bx+c$'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '09/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '23/10/2024'
/**
 *
 * @author Gilles Mora

 */
export const uuid = '0f0de'

export const refs = {
  'fr-fr': ['can1F04'],
  'fr-ch': ['1mF3-18'],
}
export default class LectureGraphiqueParaboleB extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let texte, texteCorr, a, alpha, beta, r, F, o
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      switch (
        choice([1, 2, 3, 4, 5, 6]) //
      ) {
        case 1: // cas parabole a>0 et alpha <0 et b>0
          a = randint(0, 1) + randint(5, 9) / 10
          alpha = randint(-4, -2) + randint(4, 9) / 10
          if (choice([true, true, true, false])) {
            beta = randint(-3, 1) + randint(2, 7) / 10
          } else {
            beta = 0
          }
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte =
            'La courbe représente une fonction $f$ définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += 'Donner le signe de $b$.<br>'
          } else {
            texte +=
              'Donner le signe de $b$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += remplisLesBlancs(
              this,
              i,
              'b\\, %{champ1}\\, 0',
              'clavierCompare',
            )
            handleAnswers(
              this,
              i,
              { champ1: { value: '>', options: { texteSansCasse: true } } },
              { formatInteractif: 'fillInTheBlank' },
            )
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$
          r = repere({
            xMin: -6,
            xMax: 3,
            yMin: -4,
            yMax: 4,
            thickHauteur: 0.1,
            xLabelMin: -5,
            xLabelMax: 2,
            yLabelMax: 3,
            yLabelMin: -3,
            axeXStyle: '->',
            axeYStyle: '->',
          })

          F = (x) => a * (x - alpha) ** 2 + beta
          texte +=
            mathalea2d(
              {
                xmin: -6,
                xmax: 3,
                ymin: -4,
                ymax: 4,
                pixelsParCm: 25,
                scale: 0.6,
                style: 'margin: auto',
              },
              r,
              o,
              courbe(F, { repere: r, color: 'blue', epaisseur: 2 }),
            ) + '<br>'

          texteCorr = `L'abscisse du sommet de la parabole est négatif. Celui-ci est donné par : $-\\dfrac{b}{2a}$.<br>
          On en déduit que $\\dfrac{-b}{2a}<0$. <br>
          La parabole a "les bras" tournés vers le haut, donc $a>0$. <br>
      On a donc $-b<0$ soit $b${miseEnEvidence('\\, >\\, ')}0$.`
          break

        case 2: // cas parabole a<0 et alpha <0 et b<0
          a = randint(-1, 0) - randint(5, 9) / 10
          alpha = randint(-4, -2) + randint(4, 9) / 10
          if (choice([true, true, true, false])) {
            beta = randint(-1, 4) - randint(1, 5) / 10
          } else {
            beta = 0
          }
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte =
            'La courbe représente une fonction $f$ définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += 'Donner le signe de $b$.<br>'
          } else {
            texte +=
              'Donner le signe de $b$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += remplisLesBlancs(
              this,
              i,
              'b\\, %{champ1}\\, 0',
              'clavierCompare',
            )
            handleAnswers(
              this,
              i,
              { champ1: { value: '<', options: { texteSansCasse: true } } },
              { formatInteractif: 'fillInTheBlank' },
            )
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$
          r = repere({
            xMin: -6,
            xMax: 3,
            yMin: -4,
            yMax: 4,
            thickHauteur: 0.1,
            xLabelMin: -4,
            xLabelMax: 2,
            yLabelMax: 3,
            yLabelMin: -4,
            axeXStyle: '->',
            axeYStyle: '->',
          })

          F = (x) => a * (x - alpha) ** 2 + beta
          texte +=
            mathalea2d(
              {
                xmin: -6,
                xmax: 3,
                ymin: -4,
                ymax: 4,
                pixelsParCm: 25,
                scale: 0.6,
                style: 'margin: auto',
              },
              r,
              o,
              courbe(F, { repere: r, color: 'blue', epaisseur: 2 }),
            ) + '<br>'

          texteCorr = `L'abscisse du sommet de la parabole est négatif. Celui-ci est donné par : $-\\dfrac{b}{2a}$.<br>
        On en déduit que $\\dfrac{-b}{2a}<0$. <br>
        La parabole a "les bras" tournés vers le bas, donc $a<0$. <br>
    On a donc $-b>0$ soit $b${miseEnEvidence('\\,<\\, ')}0$.`
          break

        case 3: // cas parabole a>0 et alpha >0 et b<0
          a = randint(0, 1) + randint(5, 9) / 10
          alpha = randint(1, 3) + randint(4, 9) / 10
          if (choice([true, true, false])) {
            beta = randint(-3, 1) + randint(2, 7) / 10
          } else {
            beta = 0
          }
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte =
            'La courbe représente une fonction $f$ définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += 'Donner le signe de $b$.<br>'
          } else {
            texte +=
              'Donner le signe de $b$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += remplisLesBlancs(
              this,
              i,
              'b\\, %{champ1}\\, 0',
              'clavierCompare',
            )
            handleAnswers(
              this,
              i,
              { champ1: { value: '<', options: { texteSansCasse: true } } },
              { formatInteractif: 'fillInTheBlank' },
            )
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$
          r = repere({
            xMin: -3,
            xMax: 6,
            yMin: -4,
            yMax: 4,
            thickHauteur: 0.1,
            xLabelMin: -2,
            xLabelMax: 5,
            yLabelMax: 3,
            yLabelMin: -3,
            axeXStyle: '->',
            axeYStyle: '->',
          })

          F = (x) => a * (x - alpha) ** 2 + beta
          texte +=
            mathalea2d(
              {
                xmin: -3,
                xmax: 6,
                ymin: -4,
                ymax: 4,
                pixelsParCm: 25,
                scale: 0.6,
                style: 'margin: auto',
              },
              r,
              o,
              courbe(F, { repere: r, color: 'blue', epaisseur: 2 }),
            ) + '<br>'

          texteCorr = `L'abscisse du sommet de la parabole est positif. Celui-ci est donné par : $-\\dfrac{b}{2a}$.<br>
        On en déduit que $\\dfrac{-b}{2a}>0$. <br>
        La parabole a "les bras" tournés vers le haut, donc $a>0$. <br>
    On a donc $-b>0$ soit $b${miseEnEvidence('\\,<\\, ')}0$.`
          break

        case 4: //  cas parabole a<0 et alpha >0 et b>0
          a = randint(-1, 0) - randint(5, 9) / 10
          alpha = randint(1, 3) + randint(4, 9) / 10
          if (choice([true, true, true, false])) {
            beta = randint(-1, 4) - randint(1, 5) / 10
          } else {
            beta = 0
          }
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte =
            'La courbe représente une fonction $f$ définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += 'Donner le signe de $b$.<br>'
          } else {
            texte +=
              'Donner le signe de $b$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += remplisLesBlancs(
              this,
              i,
              'b\\, %{champ1}\\, 0',
              'clavierCompare',
            )
            handleAnswers(
              this,
              i,
              { champ1: { value: '>', options: { texteSansCasse: true } } },
              { formatInteractif: 'fillInTheBlank' },
            )
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$
          r = repere({
            xMin: -3,
            xMax: 6,
            yMin: -4,
            yMax: 4,
            thickHauteur: 0.1,
            xLabelMin: -2,
            xLabelMax: 5,
            yLabelMax: 3,
            yLabelMin: -3,
            axeXStyle: '->',
            axeYStyle: '->',
          })

          F = (x) => a * (x - alpha) ** 2 + beta
          texte +=
            mathalea2d(
              {
                xmin: -3,
                xmax: 6,
                ymin: -4,
                ymax: 4,
                pixelsParCm: 25,
                scale: 0.6,
                style: 'margin: auto',
              },
              r,
              o,
              courbe(F, { repere: r, color: 'blue', epaisseur: 2 }),
            ) + '<br>'

          texteCorr = `L'abscisse du sommet de la parabole est positif. Celui-ci est donné par : $-\\dfrac{b}{2a}$.<br>
        On en déduit que $\\dfrac{-b}{2a}>0$. <br>
        La parabole a "les bras" tournés vers le bas, donc $a<0$. <br>
    On a donc $-b<0$ soit $b${miseEnEvidence('\\,>\\, ')}0$.`
          break

        case 5: // cas parabole a>0 et b=0
          a = randint(0, 1) + randint(5, 9) / 10
          alpha = 0
          beta = randint(-3, 2) - randint(1, 5) / 10
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte =
            'La courbe représente une fonction $f$ définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += 'Donner le signe de $b$.<br>'
          } else {
            texte +=
              'Donner le signe de $b$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += remplisLesBlancs(
              this,
              i,
              'b\\, %{champ1}\\, 0',
              'clavierCompare',
            )
            handleAnswers(
              this,
              i,
              { champ1: { value: '=', options: { texteSansCasse: true } } },
              { formatInteractif: 'fillInTheBlank' },
            )
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$

          r = repere({
            xMin: -4,
            xMax: 4,
            yMin: -4,
            yMax: 4,
            thickHauteur: 0.1,
            xLabelMin: -3,
            xLabelMax: 3,
            yLabelMax: 3,
            yLabelMin: -3,
            axeXStyle: '->',
            axeYStyle: '->',
          })

          F = (x) => a * (x - alpha) ** 2 + beta
          texte +=
            mathalea2d(
              {
                xmin: -4,
                xmax: 4,
                ymin: -4,
                ymax: 4,
                pixelsParCm: 25,
                scale: 0.6,
                style: 'margin: auto',
              },
              r,
              o,
              courbe(F, { repere: r, color: 'blue', epaisseur: 2 }),
            ) + '<br>'

          texteCorr = `L'abscisse du sommet de la parabole est nul. Celui-ci est donné par : $-\\dfrac{b}{2a}$.<br>
      On en déduit que $\\dfrac{-b}{2a}=0$ soit $b${miseEnEvidence('\\,=\\, ')}0$. `
          break

        case 6: // cas parabole a<0 et b=0
          a = randint(-1, 0) - randint(5, 9) / 10
          alpha = 0
          beta = randint(1, 3) + randint(1, 5) / 10
          o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
          texte =
            'La courbe représente une fonction $f$ définie par $f(x)=ax^2+bx+c$ .<br>'
          if (!this.interactif) {
            texte += 'Donner le signe de $b$.<br>'
          } else {
            texte +=
              'Donner le signe de $b$ (compléter avec $>$, $<$ ou $=$) :<br>'
            texte += remplisLesBlancs(
              this,
              i,
              'b\\, %{champ1}\\, 0',
              'clavierCompare',
            )
            handleAnswers(
              this,
              i,
              { champ1: { value: '=', options: { texteSansCasse: true } } },
              { formatInteractif: 'fillInTheBlank' },
            )
          }
          // $${delta}$ et $${a}(x-${alpha})^2+${beta}$
          r = repere({
            xMin: -4,
            xMax: 4,
            yMin: -4,
            yMax: 4,
            thickHauteur: 0.1,
            xLabelMin: -3,
            xLabelMax: 3,
            yLabelMax: 3,
            yLabelMin: -3,
            axeXStyle: '->',
            axeYStyle: '->',
          })

          F = (x) => a * (x - alpha) ** 2 + beta
          texte +=
            mathalea2d(
              {
                xmin: -4,
                xmax: 4,
                ymin: -4,
                ymax: 4,
                pixelsParCm: 25,
                scale: 0.6,
                style: 'margin: auto',
              },
              r,
              o,
              courbe(F, { repere: r, color: 'blue', epaisseur: 2 }),
            ) + '<br>'

          texteCorr = `L'abscisse du sommet de la parabole est nul. Celui-ci est donné par : $-\\dfrac{b}{2a}$.<br>
      On en déduit que $\\dfrac{-b}{2a}=0$ soit $b${miseEnEvidence('\\,=\\, ')}0$. `

          break
      }

      if (this.questionJamaisPosee(i, a, alpha, beta)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.canEnonce = texte
        this.canReponseACompleter = '$b\\ldots 0$'
        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(this.canReponseACompleter)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
