import { cibleCouronne } from '../../lib/2d/cibles'
import { afficheMesureAngle } from '../../lib/2d/codages'
import { point } from '../../lib/2d/points'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { texteParPoint } from '../../lib/2d/textes'
import {
  homothetie,
  rotation,
  sensDeRotation,
  similitude,
} from '../../lib/2d/transformations'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'

export const titre = 'Construire un angle de mesure donnée'
export const amcReady = true
export const amcType = 'AMCOpen'

/**
 * Construire un angle
 * @author Jean-Claude Lhote
 */
export const uuid = '34e3c'

export const refs = {
  'fr-fr': ['6G4C'],
  'fr-2016': ['6G23'],
  'fr-ch': ['9ES5-3'],
}
export default class ConstruireUnAngle extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 2
    this.besoinFormulaireNumerique = [
      "Précision de l'angle",
      4,
      '1 : Angle à 10°\n2 : Angle à 5°\n3 : Angle à 1°\n4 : Mélange',
    ]

    this.sup = 1
    this.video = 'cU80v1p6mMI'
  }

  nouvelleVersion() {
    let typeDeQuestions
    if (this.sup < 4) typeDeQuestions = [this.sup]
    else typeDeQuestions = [1, 2, 3]
    const listeTypeDeQuestion = combinaisonListes(
      typeDeQuestions,
      this.nbQuestions,
    )
    let angle = 0
    let anglerot
    let Apos
    let Bpos
    let Cpos
    let fleche
    const signe = []
    let p
    let texte
    let texteCorr
    let A
    let B
    let s
    let C
    let s2
    let secteur, cible, xMin, xMax, yMin, yMax, objetsEnonce, objetsCorrection
    signe[0] = randint(-1, 1, 0)
    for (let i = 1; i < this.nbQuestions; i++) {
      signe.push(-1 * signe[i - 1])
    }
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      switch (listeTypeDeQuestion[i]) {
        case 1:
          angle = randint(1, 17, 9) * 10
          break
        case 2:
          angle = randint(1, 8) * 10 + randint(0, 1) * 90 + 5
          break
        case 3:
          angle = randint(1, 16) * 10 + randint(1, 9)
          break
      }
      angle = angle * signe[i]
      anglerot = randint(-50, 50)
      p = ['x', lettreDepuisChiffre(19 + i), 'y']
      texte = `Construire l'angle $\\widehat{${p[0] + p[1] + p[2]}}$ de mesure $${texNombre(Math.abs(angle))}^\\circ$ en tournant dans le sens `
      if (angle < 0) {
        texte += "des aiguilles d'une montre.<br>"
      } else {
        texte += "inverse des aiguilles d'une montre.<br>"
      }
      A = point(0, 0)
      B = point(5, 0)
      B = rotation(B, A, anglerot)
      Apos = texteParPoint(
        p[1],
        similitude(B, A, -90, 0.1),
        0,
        'black',
        1,
        'milieu',
        true,
      )
      Bpos = texteParPoint(
        p[0],
        similitude(A, homothetie(B, A, 0.9), signe[i] * 90, 0.1),
        0,
        'black',
        1,
        'milieu',
        true,
      )

      s = segment(A, B)
      s.styleExtremites = '|-'
      s.epaisseur = 2
      s.tailleExtremites = 1.5
      C = rotation(B, A, angle)
      Cpos = texteParPoint(
        p[2],
        similitude(A, homothetie(C, A, 0.9), -signe[i] * 90, 0.1),
        0,
        'black',
        1,
        'milieu',
        true,
      )
      fleche = sensDeRotation(B, A, signe[i])
      s2 = segment(A, C)
      s2.styleExtremites = '|-'
      s2.tailleExtremites = 1.5
      secteur = afficheMesureAngle(B, A, C)
      texteCorr = ''
      cible = cibleCouronne({ x: 0, y: 0, taille: 3 })
      xMin = Math.min(A.x - 4, C.x)
      xMax = Math.max(B.x, C.x) + 0.5
      yMin = Math.min(A.y - 4, C.y) - 0.5
      yMax = Math.max(A.y + 4, C.y) + 0.5
      context.fenetreMathalea2d = [xMin, yMin, xMax, yMax]
      objetsEnonce = [s, cible, Apos, Bpos, fleche]
      const bordure = fixeBordures(objetsEnonce, { rxmax: 1.5 })
      objetsCorrection = [s, secteur, cible, s2, Apos, Bpos, Cpos, fleche]
      texte += mathalea2d(
        Object.assign({}, bordure, { pixelsParCm: 20, scale: 0.65 }),
        objetsEnonce,
      )
      // if ((!context.isHtml) && ((i + 1) % 2 === 0 && !(i + 1) % 4 === 0)) texte += '\\columnbreak '
      if (!context.isHtml && (i + 1) % 4 === 0) texte += '\\newpage '
      texteCorr = mathalea2d(
        Object.assign({}, fixeBordures(objetsCorrection), {
          pixelsParCm: 20,
          scale: 0.6,
        }),
        objetsCorrection,
      )
      if (this.questionJamaisPosee(i, angle, signe[i])) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                texte: texteCorr,
                statut: 0,
                sanscadre: true,
              },
            ],
          }
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
