import { choice } from '../../lib/outils/arrayOutils'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'

import {
  barre3d,
  cube3d,
  paveLPH3d,
  plaque3d,
} from '../../lib/3d/3dProjectionMathalea2d/solides'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { arrondi } from '../../lib/outils/nombres'

export const titre =
  'Recomposer un nombre décimal représenté par des fractions du cube unité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const dateDeModifImportante = '13/12/2023'

export const uuid = '63f03'

export const refs = {
  'fr-fr': ['auto6N2B-2'],
  'fr-2016': ['6N23-7'],
  'fr-ch': ['9NO10-8'],
}
export default class RecompositionDecimale extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1 // Ici le nombre de questions
    this.spacingCorr = 3
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = true
  }

  nouvelleVersion() {
    context.anglePerspective = 30
    context.coeffPerspective = 0.5
    const cubeUnite = paveLPH3d(0, 0, 0, 0.6, 10, 10, 10, 'black')
    const reponses = []
    this.consigne =
      'Voici un cube représentant une unité, une plaque représentant $\\dfrac{1}{10}$, une barre représentant $\\dfrac{1}{100}$ et un petit cube représentant $\\dfrac{1}{1000}$.<br>'
    let objets = []
    objets.push(
      ...cubeUnite.c2d,
      ...plaque3d(9, 0, 0, 0.5, 10, 10).c2d,
      ...barre3d(9, 0, 3, 0.5, 10).c2d,
      ...cube3d(12, 0, 5, 0.5).c2d,
    )
    this.introduction = mathalea2d(
      Object.assign({ scale: 0.5 }, fixeBordures(objets)),
      objets,
    )
    for (
      let q = 0, cpt = 0, e, d, c, m, texte, texteCorr, xDecal;
      q < this.nbQuestions && cpt < 50;

    ) {
      e = choice([0, 1])
      d = choice([0, randint(0, 5), randint(0, 7)])
      c = choice([0, randint(0, 5), randint(5, 9)])
      m = randint(0, 9)
      xDecal = 0

      texteCorr = ''
      texte =
        'Quel est le nombre décimal représenté par cet ensemble de solides ?<br>'
      objets = []
      if (e === 1) {
        objets.push(...cubeUnite.c2d)
        xDecal += 7
      }
      if (d !== 0) {
        for (let i = 0; i < d; i++) {
          objets.push(...plaque3d(xDecal, 0, i * 0.6, 0.5, 10, 10, 'black').c2d)
        }
        xDecal += 6.5
      }
      if (c !== 0) {
        for (let i = c - 1; i >= 0; i--) {
          objets.push(...barre3d(xDecal, i * 0.75, 0, 0.5, 10, 'black').c2d)
        }
        xDecal += 6 + c * 0.2
      }
      if (m !== 0) {
        for (let i = 0; i < m; i++) {
          objets.push(...cube3d(xDecal + i * 0.8, 0, 0, 0.5, 'black').c2d)
        }
      }
      xDecal += m * 0.8
      texte += mathalea2d(
        Object.assign({ scale: 0.5 }, fixeBordures(objets)),
        objets,
      )
      if (!context.isAmc) texte += ajouteChampTexteMathLive(this, q, '')

      if (this.correctionDetaillee) {
        if (e === 1) texteCorr += 'Il y a 1 cube unité.<br>'
        if (d !== 0) {
          if (d === 1)
            texteCorr += 'Il y a 1 plaque représentant $\\dfrac{1}{10}$.<br>'
          else
            texteCorr += `Il y a ${d} plaques représentant chacune $\\dfrac{1}{10}$, soit $\\dfrac{${d}}{10}$.<br>`
        }
        if (c !== 0) {
          if (c === 1)
            texteCorr += 'Il y a 1 barre représentant $\\dfrac{1}{100}$.<br>'
          else
            texteCorr += `Il y a ${c} barres représentant chacune $\\dfrac{1}{100}$, soit $\\dfrac{${c}}{100}$.<br>`
        }
        if (m !== 0) {
          if (m === 1)
            texteCorr +=
              'Il y a 1 petit cube représentant $\\dfrac{1}{1000}$.<br>'
          else
            texteCorr += `Il y a ${m} cubes représentant chacun $\\dfrac{1}{1000}$, soit $\\dfrac{${m}}{1000}$.<br>`
        }
        texteCorr += `Le nombre représenté ci-dessus est donc : $${texNombre(e + d / 10 + c / 100 + m / 1000)}$.`
      } else {
        texteCorr += 'On compte '
        if (e === 1) texteCorr += '1 unité, '
        texteCorr += `$\\dfrac{${d}}{10}$, `
        texteCorr += `$\\dfrac{${c}}{100}$ et `
        texteCorr += `$\\dfrac{${m}}{1000}$.<br>Le nombre décimal représenté ci-dessus est le nombre $${texNombre(e + d / 10 + c / 100 + m / 1000)}$.`
      }
      // if (reponses.indexOf(e + d / 10 + c / 100 + m / 1000) === -1) {
      if (this.questionJamaisPosee(q, e, d, c, m)) {
        // Si la question n'a jamais été posée, on en crée une autre
        reponses[q] = arrondi(e + d / 10 + c / 100 + m / 1000, 3)
        this.listeQuestions[q] = texte
        this.listeCorrections[q] = texteCorr

        setReponse(this, q, reponses[q], { digits: 4, decimals: 3 })
        q++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
