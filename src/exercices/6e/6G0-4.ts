import { droite } from '../../lib/2d/droites'
import { point } from '../../lib/2d/points'
import {
  demiDroite,
  segmentAvecExtremites,
} from '../../lib/2d/segmentsVecteurs'
import { labelPoint } from '../../lib/2d/textes'
import {
  combinaisonListes,
  enleveElement,
  shuffle,
} from '../../lib/outils/arrayOutils'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import Exercice from '../Exercice'
import { mathalea2d, vide2d } from '../../modules/2dGeneralites'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { context } from '../../modules/context'
import { setCliqueFigure } from '../../lib/interactif/gestionInteractif'
export const titre = 'Choisir la bonne figure'
export const amcReady = true
export const amcType = 'qcmMono'
export const interactifReady = true
export const interactifType = 'cliqueFigure'

/**
 * Plusieurs éléments sont proposés, il faut choisir le bon (par clic si interactif, par case à cocher par AMC)
 * @author ANGOT Rémi (Ajout AMC par Eric Elter)

*/
export const uuid = '83763'

export const refs = {
  'fr-fr': ['6G0-4'],
  'fr-2016': ['6G10-3'],
  'fr-ch': ['9ES1-8'],
}
export default class CliqueFigure extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 3
  }

  nouvelleVersion() {
    this.figures = [[], [], [], []]
    this.consigne = this.interactif
      ? 'Cliquer sur la bonne figure.'
      : context.vue !== 'diap' && !context.isAmc
        ? 'Entourer la bonne figure.'
        : 'Choisir la bonne figure représentant : ' /// Penser ici à AMC aussi.
    const typesDeQuestions = combinaisonListes(
      ['segment', 'droite', 'demidroite', 'demidroite2'],
      this.nbQuestions,
    )
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const numeroLettre = randint(1, 20)
      const A = point(0, 0)
      const B = point(4, randint(-1, 3, 0))
      A.nom = lettreDepuisChiffre(numeroLettre)
      B.nom = lettreDepuisChiffre(numeroLettre + 1)
      // context.pixelsParCm = 10
      context.pixelsParCm = 20
      const labels = labelPoint(A, B)
      this.figures[i] = [
        { id: `cliquefigure0Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `cliquefigure1Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `cliquefigure2Ex${this.numeroExercice}Q${i}`, solution: false },
        { id: `cliquefigure3Ex${this.numeroExercice}Q${i}`, solution: false },
      ]
      const figSegment = mathalea2d(
        {
          style: 'display: inline-block',
          xmin: -2,
          xmax: 6,
          ymin: -2,
          scale: 0.4,
          id: `cliquefigure0Ex${this.numeroExercice}Q${i}`,
        },
        labels,
        segmentAvecExtremites(A, B),
      )
      const figDroite = mathalea2d(
        {
          style: 'display: inline-block',
          xmin: -2,
          xmax: 6,
          ymin: -2,
          scale: 0.4,
          id: `cliquefigure1Ex${this.numeroExercice}Q${i}`,
        },
        labels,
        segmentAvecExtremites(A, B),
        droite(A, B),
      )
      const figDemiDroite = mathalea2d(
        {
          style: 'display: inline-block',
          xmin: -2,
          xmax: 6,
          ymin: -2,
          scale: 0.4,
          id: `cliquefigure2Ex${this.numeroExercice}Q${i}`,
        },
        labels,
        segmentAvecExtremites(A, B),
        demiDroite(A, B),
      )
      const figDemiDroite2 = mathalea2d(
        {
          style: 'display: inline-block',
          xmin: -2,
          xmax: 6,
          ymin: -2,
          scale: 0.4,
          id: `cliquefigure3Ex${this.numeroExercice}Q${i}`,
        },
        labels,
        segmentAvecExtremites(A, B),
        demiDroite(B, A),
      )
      const figSegmentAMC = mathalea2d(
        {
          style: 'display: inline-block',
          xmin: -2,
          xmax: 6,
          ymin: -2,
          scale: 0.3,
          id: `cliquefigure0Ex${this.numeroExercice}Q${i}`,
        },
        labels,
        segmentAvecExtremites(A, B),
      )
      const figDroiteAMC = mathalea2d(
        {
          style: 'display: inline-block',
          xmin: -2,
          xmax: 6,
          ymin: -2,
          scale: 0.3,
          id: `cliquefigure1Ex${this.numeroExercice}Q${i}`,
        },
        labels,
        segmentAvecExtremites(A, B),
        droite(A, B),
      )
      const figDemiDroiteAMC = mathalea2d(
        {
          style: 'display: inline-block',
          xmin: -2,
          xmax: 6,
          ymin: -2,
          scale: 0.3,
          id: `cliquefigure2Ex${this.numeroExercice}Q${i}`,
        },
        labels,
        segmentAvecExtremites(A, B),
        demiDroite(A, B),
      )
      const figDemiDroite2AMC = mathalea2d(
        {
          style: 'display: inline-block',
          xmin: -2,
          xmax: 6,
          ymin: -2,
          scale: 0.3,
          id: `cliquefigure3Ex${this.numeroExercice}Q${i}`,
        },
        labels,
        segmentAvecExtremites(A, B),
        demiDroite(B, A),
      )
      let figCorr
      let figCorrecteAMC
      const figIncorrectAMC = [
        figSegmentAMC,
        figDroiteAMC,
        figDemiDroiteAMC,
        figDemiDroite2AMC,
      ]
      switch (typesDeQuestions[i]) {
        case 'segment':
          texte = `Le segment d'extrémités $${A.nom}$ et $${B.nom}$.`
          this.figures[i][0].solution = true
          figCorr = vide2d()
          figCorrecteAMC = figSegmentAMC
          break
        case 'droite':
          texte = `La droite passant par les points $${A.nom}$ et $${B.nom}$.`
          this.figures[i][1].solution = true
          figCorr = droite(A, B)
          figCorrecteAMC = figDroiteAMC
          break
        case 'demidroite':
          texte = `La demi-droite d'origine $${A.nom}$ passant par $${B.nom}$.`
          this.figures[i][2].solution = true
          figCorr = demiDroite(A, B)
          figCorrecteAMC = figDemiDroiteAMC
          break
        case 'demidroite2':
        default:
          texte = `La demi-droite d'origine $${B.nom}$ passant par $${A.nom}$.`
          this.figures[i][3].solution = true
          figCorr = demiDroite(B, A)
          figCorrecteAMC = figDemiDroite2AMC
          break
      }

      // PROPRE A AMC
      enleveElement(figIncorrectAMC, figCorrecteAMC)
      this.autoCorrection[i] = {}
      setCliqueFigure(this.autoCorrection[i])
      this.autoCorrection[i].enonce = this.consigne + texte
      this.autoCorrection[i].propositions = [
        {
          texte: figCorrecteAMC,
          statut: true,
        },
        {
          texte: figIncorrectAMC[0],
          statut: false,
        },
        {
          texte: figIncorrectAMC[1],
          statut: false,
        },
        {
          texte: figIncorrectAMC[2],
          statut: false,
        },
      ]
      this.autoCorrection[i].options = {
        ordered: false,
        lastChoice: 4,
      }
      // FIN DE AMC

      if (!context.isAmc) {
        texte += '<br>'
        texteCorr =
          texte +
          mathalea2d(
            {
              xmin: -4,
              xmax: 6,
              ymin: -2,
              style: '',
              scale: 0.4,
              id: `figure3Ex${this.numeroExercice}Q${i}`,
            },
            labels,
            segmentAvecExtremites(A, B),
            figCorr,
          )
        const figures = shuffle([
          figSegment,
          figDroite,
          figDemiDroite,
          figDemiDroite2,
        ])
        texte += figures.join('')
        if (this.interactif && context.isHtml) {
          texte += `<span id="resultatCheckEx${this.numeroExercice}Q${i}"></span>`
        }
      }

      if (this.questionJamaisPosee(i, texte)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr ?? ''
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
