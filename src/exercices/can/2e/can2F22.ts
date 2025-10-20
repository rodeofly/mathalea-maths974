import { repere } from '../../../lib/2d/reperes'
import { texteParPosition } from '../../../lib/2d/textes'
import { spline } from '../../../lib/mathFonctions/Spline'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'

import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const dateDePublication = '12/09/2024'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Résoudre une inéquation graphiquement'

/**
 * @author Gilles MORA
  *

*/
export const uuid = '61271'

export const refs = {
  'fr-fr': ['can2F22'],
  'fr-ch': ['2mIneq-2'],
}
export default class InequationsGSpline extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1

    this.formatChampTexte = KeyboardType.clavierEnsemble
    this.optionsDeComparaison = { texteSansCasse: true }
  }

  nouvelleVersion() {
    const noeuds1 = [
      { x: -4, y: -3, deriveeGauche: 2, deriveeDroit: 2.5, isVisible: true },
      { x: -2, y: -1, deriveeGauche: 1, deriveeDroit: 0.5, isVisible: true },
      { x: 0, y: 0, deriveeGauche: 1, deriveeDroit: 2, isVisible: true },
      { x: 1, y: 2, deriveeGauche: 1, deriveeDroit: 1, isVisible: true },
      { x: 2, y: 3, deriveeGauche: 1.5, deriveeDroit: 1, isVisible: true },
      { x: 3, y: 4, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
    ]

    const noeuds3 = [
      { x: -4, y: -1, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: -2, y: 0, deriveeGauche: 0.8, deriveeDroit: 1, isVisible: true },
      { x: 0, y: 2, deriveeGauche: 1, deriveeDroit: 1, isVisible: true },
      { x: 1, y: 3, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: 2, y: 2, deriveeGauche: -1, deriveeDroit: -1.5, isVisible: true },
      { x: 3, y: 0, deriveeGauche: -1.5, deriveeDroit: -1, isVisible: true },
      { x: 4, y: -1, deriveeGauche: -1, deriveeDroit: -1, isVisible: true },
      { x: 5, y: -3, deriveeGauche: -1.5, deriveeDroit: -1, isVisible: true },
      { x: 6, y: -4, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
    ]

    const maFonction = choice([noeuds1, noeuds3]) //
    const mesFonctions = [maFonction]
    function aleatoiriseCourbe(listeFonctions) {
      const coeffX = 1 //  // symétries ou pas
      const coeffY = choice([-1, 1]) // choice([-1, 1])
      const deltaX = randint(-3, 3) //  // translations
      const deltaY = randint(-2, 2) // la valeur de y[8] sur le noeud 3 doit rester négative car elle est testée
      const choix = choice(listeFonctions)
      return choix.map((noeud) =>
        Object({
          x: (noeud.x + deltaX) * coeffX,
          y: (noeud.y + deltaY) * coeffY,
          deriveeGauche: noeud.deriveeGauche * coeffX * coeffY,
          deriveeDroit: noeud.deriveeDroit * coeffX * coeffY,
          isVisible: noeud.isVisible,
        }),
      )
    }
    let bornes = {}
    const o = texteParPosition('O', -0.3, -0.3, 'milieu', 'black', 1)
    const nuage = aleatoiriseCourbe(mesFonctions)
    const theSpline = spline(nuage)
    this.spline = theSpline
    bornes = theSpline.trouveMaxes()
    const repere1 = repere({
      xMin: bornes.xMin - 1,
      xMax: bornes.xMax + 1,
      yMin: bornes.yMin - 1,
      yMax: bornes.yMax + 1,
      grilleX: false,
      grilleY: false,
      grilleSecondaire: true,
      grilleSecondaireYDistance: 1,
      grilleSecondaireXDistance: 1,
      grilleSecondaireYMin: bornes.yMin - 1,
      grilleSecondaireYMax: bornes.yMax + 1,
      grilleSecondaireXMin: bornes.xMin - 1,
      grilleSecondaireXMax: bornes.xMax + 1,
    })
    const courbe1 = theSpline.courbe({
      repere: repere1,
      epaisseur: 1.5,
      ajouteNoeuds: true,
      optionsNoeuds: { color: 'blue', taille: 2, style: 'x', epaisseur: 2 },
      color: 'blue',
    })
    const objetsEnonce = [repere1, courbe1]
    const nbAntecedentsEntiersMaximum = theSpline.nombreAntecedentsMaximum(
      bornes.yMin,
      bornes.yMax,
      true,
      true,
    )

    const nombreAntecedentCherches1 = randint(1, nbAntecedentsEntiersMaximum)
    const y1 = theSpline.trouveYPourNAntecedents(
      nombreAntecedentCherches1,
      maFonction === noeuds3 && theSpline.y[8] < 0
        ? bornes.yMin + 1
        : bornes.yMin,
      maFonction === noeuds3 && theSpline.y[8] > 0
        ? bornes.yMax - 1
        : bornes.yMax,
      true,
      true,
    )

    const solutions1 = theSpline.solve(y1)
    const symbole = choice(['<', '\\leqslant', '>', '\\geqslant']) //
    const correction = `Les solutions de l'inéquation $f(x)${symbole}${y1}$ sont les abscisses des points de $\\mathscr{C}_f$ 
qui se situent  ${symbole === '>' || symbole === '<' ? 'strictement' : 'sur ou '} ${symbole === '>' || symbole === '\\geqslant' ? 'au-dessus' : 'en dessous'} de la droite d'équation $y=${y1}$.<br>
On en déduit `
    const correctionBis = `Les solutions de l'inéquation $f(x)${symbole}${y1}$ sont les abscisses des points de $\\mathscr{C}_f$ 
qui se situent  ${symbole === '>' || symbole === '<' ? 'strictement' : 'sur ou '} ${symbole === '>' || symbole === '\\geqslant' ? 'au-dessus' : 'en dessous'} de la droite d'équation $y=${y1}$.<br>
On en déduit `
    this.question =
      `On donne la représentation graphique d'une fonction $f$. <br>
    Résoudre l'inéquation  $f(x)${symbole}${y1}$.<br>` +
      mathalea2d(
        Object.assign(
          { pixelsParCm: 30, scale: 0.65, style: 'margin: auto' },
          {
            xmin: bornes.xMin - 1,
            ymin: bornes.yMin - 1,
            xmax: bornes.xMax + 1,
            ymax: bornes.yMax + 1,
          },
        ),
        objetsEnonce,
        o,
      ) // fixeBordures(objetsEnonce))
    if (this.interactif) {
      this.question += '$S=$ '
    }
    if (maFonction === noeuds3) {
      if (solutions1.length === 1) {
        // Cas 1 solution
        if (y1 === theSpline.y[7]) {
          // Cas solution 8ième valeur
          if (
            (symbole === '<' && theSpline.y[8] < 0) ||
            (symbole === '>' && theSpline.y[8] > 0)
          ) {
            this.reponse = `]${theSpline.x[7]};${theSpline.x[8]}]`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
          if (
            (symbole === '\\leqslant' && theSpline.y[8] < 0) ||
            (symbole === '\\geqslant' && theSpline.y[8] > 0)
          ) {
            this.reponse = `[${theSpline.x[7]};${theSpline.x[8]}]`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
          if (
            (symbole === '>' && theSpline.y[8] < 0) ||
            (symbole === '<' && theSpline.y[8] > 0)
          ) {
            this.reponse = `[${theSpline.x[0]};${theSpline.x[7]}[`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
          if (
            (symbole === '\\geqslant' && theSpline.y[8] < 0) ||
            (symbole === '\\leqslant' && theSpline.y[8] > 0)
          ) {
            this.reponse = `[${theSpline.x[0]};${theSpline.x[7]}]`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
        } else {
          // sol 4ième valeur
          if (
            (symbole === '<' && theSpline.y[8] < 0) ||
            (symbole === '>' && theSpline.y[8] > 0)
          ) {
            this.reponse = {
              reponse: {
                value: [
                  `[${theSpline.x[0]};${theSpline.x[3]}[\\cup]${theSpline.x[3]};${theSpline.x[8]}]`,
                  `]${theSpline.x[3]};${theSpline.x[8]}]\\cup[${theSpline.x[0]};${theSpline.x[3]}[`,
                ],
                options: { intervalle: true },
              },
            }
            this.correction = `${correctionBis}`
            this.correction += `$S=${miseEnEvidence(`[${theSpline.x[0]};${theSpline.x[3]}[\\cup]${theSpline.x[3]};${theSpline.x[8]}]`)}$.`
          }
          if (
            (symbole === '\\leqslant' && theSpline.y[8] < 0) ||
            (symbole === '\\geqslant' && theSpline.y[8] > 0)
          ) {
            this.reponse = `[${theSpline.x[0]};${theSpline.x[8]}]`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
          if (
            (symbole === '>' && theSpline.y[8] < 0) ||
            (symbole === '<' && theSpline.y[8] > 0)
          ) {
            this.reponse = '\\emptyset'
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
          if (
            (symbole === '\\geqslant' && theSpline.y[8] < 0) ||
            (symbole === '\\leqslant' && theSpline.y[8] > 0)
          ) {
            this.reponse = `\\{${theSpline.x[3]}\\}`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
        }
      } else {
        // cas 2  racines
        if (y1 === theSpline.y[0]) {
          if (
            (symbole === '<' && theSpline.y[8] < 0) ||
            (symbole === '>' && theSpline.y[8] > 0)
          ) {
            this.reponse = `]${theSpline.x[6]};${theSpline.x[8]}]`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
          if (
            (symbole === '\\leqslant' && theSpline.y[8] < 0) ||
            (symbole === '\\geqslant' && theSpline.y[8] > 0)
          ) {
            this.reponse = {
              reponse: {
                value: [
                  `\\{${theSpline.x[0]}\\}\\cup[${theSpline.x[6]};${theSpline.x[8]}]`,
                  `[${theSpline.x[6]};${theSpline.x[8]}]\\cup\\{${theSpline.x[0]}\\}`,
                ],
                options: { intervalle: true },
              },
            }
            this.correction = `${correctionBis}`
            this.correction += `$S=${miseEnEvidence(`\\{${theSpline.x[0]}\\}\\cup[${theSpline.x[6]};${theSpline.x[8]}]`)}$.`
          }
          if (
            (symbole === '>' && theSpline.y[8] < 0) ||
            (symbole === '<' && theSpline.y[8] > 0)
          ) {
            this.reponse = `]${theSpline.x[0]};${theSpline.x[6]}[`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
          if (
            (symbole === '\\geqslant' && theSpline.y[8] < 0) ||
            (symbole === '\\leqslant' && theSpline.y[8] > 0)
          ) {
            this.reponse = `[${theSpline.x[0]};${theSpline.x[6]}]`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
        } else {
          if (
            (symbole === '<' && theSpline.y[8] < 0) ||
            (symbole === '>' && theSpline.y[8] > 0)
          ) {
            this.reponse = {
              reponse: {
                value: [
                  `[${theSpline.x[0]};${solutions1[0]}[\\cup]${solutions1[1]};${theSpline.x[8]}]`,
                  `]${solutions1[1]};${theSpline.x[8]}]\\cup [${theSpline.x[0]};${solutions1[0]}[`,
                ],
                options: { intervalle: true },
              },
            }
            this.correction = `${correctionBis}`
            this.correction += `$S=${miseEnEvidence(`[${theSpline.x[0]};${solutions1[0]}[\\cup]${solutions1[1]};${theSpline.x[8]}]`)}$.`
          }
          if (
            (symbole === '\\leqslant' && theSpline.y[8] < 0) ||
            (symbole === '\\geqslant' && theSpline.y[8] > 0)
          ) {
            this.reponse = {
              reponse: {
                value: [
                  `[${theSpline.x[0]};${solutions1[0]}]\\cup[${solutions1[1]};${theSpline.x[8]}]`,
                  `[${solutions1[1]};${theSpline.x[8]}]\\cup[${theSpline.x[0]};${solutions1[0]}]`,
                ],
                options: { intervalle: true },
              },
            }
            this.correction = `${correctionBis}`
            this.correction += `$S=${miseEnEvidence(`[${theSpline.x[0]};${solutions1[0]}]\\cup[${solutions1[1]};${theSpline.x[8]}]`)}$.`
          }
          if (
            (symbole === '>' && theSpline.y[8] < 0) ||
            (symbole === '<' && theSpline.y[8] > 0)
          ) {
            this.reponse = `]${solutions1[0]};${solutions1[1]}[`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
          if (
            (symbole === '\\geqslant' && theSpline.y[8] < 0) ||
            (symbole === '\\leqslant' && theSpline.y[8] > 0)
          ) {
            this.reponse = `[${solutions1[0]};${solutions1[1]}]`
            this.correction = `${correction}`
            this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
          }
        }
      }
    }
    if (maFonction === noeuds1) {
      if (
        (symbole === '<' && theSpline.y[0] < 0) ||
        (symbole === '>' && theSpline.y[0] > 0)
      ) {
        this.reponse =
          y1 === theSpline.y[0]
            ? '\\emptyset'
            : `[${theSpline.x[0]};${solutions1[0]}[`
      }
      if (
        (symbole === '\\leqslant' && theSpline.y[0] < 0) ||
        (symbole === '\\geqslant' && theSpline.y[0] > 0)
      ) {
        this.reponse =
          y1 === theSpline.y[0]
            ? `\\{${theSpline.x[0]}\\}`
            : `[${theSpline.x[0]};${solutions1[0]}]`
      }
      if (
        (symbole === '>' && theSpline.y[0] < 0) ||
        (symbole === '<' && theSpline.y[0] > 0)
      ) {
        this.reponse =
          y1 === theSpline.y[5]
            ? '\\emptyset'
            : `]${solutions1[0]};${theSpline.x[5]}]`
      }
      if (
        (symbole === '\\geqslant' && theSpline.y[0] < 0) ||
        (symbole === '\\leqslant' && theSpline.y[0] > 0)
      ) {
        this.reponse =
          y1 === theSpline.y[5]
            ? `\\{${theSpline.x[5]}\\}`
            : `[${solutions1[0]};${theSpline.x[5]}]`
      }
      this.correction = `${correction}`
      this.correction += `$S=${miseEnEvidence(this.reponse)}$.`
    }

    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
