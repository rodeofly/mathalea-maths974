import { arcPointPointAngle } from '../../lib/2d/cercle'
import { cibleCarree, dansLaCibleCarree } from '../../lib/2d/cibles'
import { point, tracePoint } from '../../lib/2d/points'
import { longueur } from '../../lib/2d/segmentsVecteurs'
import { labelPoint } from '../../lib/2d/textes'
import { rotation } from '../../lib/2d/transformations'
import { choisitLettresDifferentes } from '../../lib/outils/aleatoires'
import { arcenciel } from '../../lib/format/style'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import Exercice from '../Exercice'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
export const titre =
  "Construire l'image d'un point par une rotation avec cible auto-corrective"

/**
 * Construction d'images par rotation avec dispositif d'auto-correction aléatoire
 * Ref 3G10-3
 * @author Jean-Claude Lhote
 * Publié le 30/11/2020
 */
export const uuid = '19ce6'

export const refs = {
  'fr-fr': ['3G10-3'],
  'fr-ch': ['10ES2-8'],
}
export default class ConstruireRotationPoint3e extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = ['Nombre de points (1 à 5)', 5]
    // this.besoinFormulaire2CaseACocher = ["Avec des points de part et d'autre"];

    this.nbQuestions = 1
    this.nbQuestionsModifiable = false

    this.sup = 3
  }

  nouvelleVersion() {
    let nontrouve, assezloin, cible
    const angle = randint(-8, 8, 0) * 10
    let result = [0, 0]
    let texteCorr = ''
    const nbpoints = parseInt(this.sup)
    const celluleAlea = function (rang) {
      const lettre = lettreDepuisChiffre(randint(1, rang))
      const chiffre = Number(randint(1, rang)).toString()
      return lettre + chiffre
    }
    // On prépare la figure...
    const O = point(0, 0, 'O')
    const noms = choisitLettresDifferentes(nbpoints, 'QO', true)
    this.consigne = `Construire l'image des points $${noms[0]}$`
    for (let i = 1; i < nbpoints - 1; i++) {
      this.consigne += `, $${noms[i]}$`
    }
    this.consigne += ` et $${noms[nbpoints - 1]}$ par la rotation de centre $O$`
    this.consigne += ` et d'angle $${Math.abs(angle)}^\\circ$`
    if (angle < 0) {
      this.consigne += " dans le sens des aiguilles d'une montre."
    } else {
      this.consigne += " dans le sens contraire des aiguilles d'une montre."
    }
    const cibles = []
    const M = []
    const N = []
    const objetsEnonce = []
    const objetsCorrection = [] // cibles, M point marqués, N symétrique de M
    const cellules = []
    let xMin, yMin, xMax, yMax
    ;[xMin, yMin, xMax, yMax] = [0, 0, 0, 0]
    for (let i = 0; i < nbpoints; i++) {
      // On place les cibles.
      N.push(
        point(
          randint(-80, 80, 0) / 10,
          randint(-80, 80, 0) / 10,
          noms[i] + "'",
        ),
      )
      nontrouve = true
      while (longueur(N[i], O) < 3 || nontrouve) {
        nontrouve = true
        if (longueur(N[i], O) < 3) {
          N[i].x = randint(-80, 80, 0) / 10
          N[i].y = randint(-80, 80, 0) / 10
        } else {
          assezloin = true
          for (let j = 0; j < i; j++) {
            if (longueur(N[i], N[j]) < 4.5) {
              assezloin = false
            }
          }
          if (assezloin === false) {
            // éloigner les points donc les grilles
            N[i].x = randint(-80, 80, 0) / 10
            N[i].y = randint(-80, 80, 0) / 10
          } else {
            nontrouve = false
          }
        }
      }
    }

    objetsEnonce.push(tracePoint(O), labelPoint(O))
    objetsCorrection.push(tracePoint(O), labelPoint(O))

    for (let i = 0; i < nbpoints; i++) {
      cellules.push(celluleAlea(4))
      result = dansLaCibleCarree(N[i].x, N[i].y, 4, 0.6, cellules[i])
      cible = cibleCarree({
        x: result[0],
        y: result[1],
        rang: 4,
        num: i + 1,
        taille: 0.6,
        color: '#f15929',
      })
      cible.opacite = 0.7
      cibles.push(cible)
    }
    for (let i = 0; i < nbpoints; i++) {
      M.push(rotation(N[i], O, -angle, noms[i]))
      objetsEnonce.push(tracePoint(M[i]), labelPoint(M[i]), cibles[i])
      objetsCorrection.push(
        tracePoint(M[i], N[i]),
        labelPoint(M[i], N[i]),
        cibles[i],
      )
      objetsCorrection.push(
        arcPointPointAngle(M[i], N[i], angle, true, arcenciel(i), 'gray', 0.2),
      )
      texteCorr += `$${noms[i]}'$, l'image du point $${noms[i]}$ est dans la case ${cellules[i]} de la grille ${i + 1}.<br>`
    }

    for (let i = 0; i < nbpoints; i++) {
      xMin = Math.min(xMin, N[i].x - 2, M[i].x - 2)
      yMin = Math.min(yMin, N[i].y - 2, M[i].y - 2)
      xMax = Math.max(xMax, N[i].x + 2, M[i].x + 2)
      yMax = Math.max(yMax, N[i].y + 2, M[i].y + 2)
    }

    context.fenetreMathalea2d = [xMin, yMin, xMax, yMax]

    this.listeQuestions.push(
      mathalea2d(
        {
          xmin: xMin,
          ymin: yMin,
          xmax: xMax,
          ymax: yMax,
          pixelsParCm: 20,
          scale: 18 / Math.max(xMax - xMin, yMax - yMin),
        },
        objetsEnonce,
      ),
    )
    this.listeCorrections.push(
      texteCorr +
        mathalea2d(
          {
            xmin: xMin,
            ymin: yMin,
            xmax: xMax,
            ymax: yMax,
            pixelsParCm: 20,
            scale: 18 / Math.max(xMax - xMin, yMax - yMin),
          },
          objetsCorrection,
        ),
    )
    listeQuestionsToContenu(this)

    //  let nonchoisi,coords=[],x,y,objetsEnonce=[],objetsCorrection=[],nomd,label_pos
  }
}
