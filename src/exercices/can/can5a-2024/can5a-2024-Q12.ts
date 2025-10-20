import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { codageAngleDroit } from '../../../lib/2d/angles'
import { point } from '../../../lib/2d/points'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { polygone } from '../../../lib/2d/polygones'
import { codageSegment } from '../../../lib/2d/codages'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = "Compter le nombre d'axe de symétrie d'une figure"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '7102b'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase

    this.canOfficielle = false
  }

  nouvelleVersion() {
    const A1 = point(0, 0, 'A', 'below')
    const B1 = point(5, 0, 'B', 'below')
    const C1 = point(5, 3, 'C', 'above')
    const D1 = point(0, 3, 'D', 'above')
    const B2 = point(3, 0, 'B', 'below')
    const C2 = point(3, 3, 'C', 'above')
    const D2 = point(0, 3, 'D', 'above')
    const C3 = point(1.5, 2.6, 'C', 'above')
    const P1 = polygone(A1, B1, C1, D1) // rectangle
    const P2 = polygone(A1, B2, C2, D2) // carré
    const P3 = polygone(A1, B2, C3) // triangle équi
    const code1 = codageAngleDroit(A1, B1, C1)
    const code1b = codageAngleDroit(A1, B2, C2)
    const code2 = codageAngleDroit(B1, C1, D1)
    const code2b = codageAngleDroit(B2, C2, D2)
    const code3 = codageAngleDroit(C1, D1, A1)
    const code1c = codageSegment(A1, B2, '||')
    const code2c = codageSegment(C2, B2, '||')
    const code3c = codageSegment(C2, D2, '||')
    const code4c = codageSegment(A1, D2, '||')
    const code3d = codageSegment(B2, C3, '||') // triangle
    const code4d = codageSegment(C3, A1, '||') // triangle
    const xmin = -1.5
    const ymin = -0.2
    const xmax = 5.2
    const ymax = 3.5
    const objets1 = []
    const objets2 = []
    const objets3 = []
    objets1.push(P1, code1, code2, code3)
    objets2.push(P2, code1b, code1c, code2c, code3c, code4c, code2b, code3)
    objets3.push(P3, code1c, code3d, code4d)
    const choix = randint(1, 3)
    if (this.canOfficielle) {
      this.reponse = 2
      this.question = mathalea2d(
        {
          xmin,
          ymin,
          xmax,
          ymax,
          pixelsParCm: 30,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.8,
          style: 'margin: auto',
        },
        objets1,
      )
      this.question += "<br>Le nombre d'axes de symétrie de ce rectangle est : "
      this.correction = `Ce rectangle a $${miseEnEvidence('2')}$ axes de symétrie.<br>
       Ces axes sont les médiatrices des côtés du rectangle `
      this.canEnonce = this.question
      this.canReponseACompleter = '$\\ldots$'
    } else {
      if (choix === 1) {
        this.reponse = 2
        this.question = mathalea2d(
          {
            xmin,
            ymin,
            xmax,
            ymax,
            pixelsParCm: 30,
            mainlevee: false,
            amplitude: 0.5,
            scale: 0.8,
            style: 'margin: auto',
          },
          objets1,
        )
        this.question +=
          "<br>Le nombre d'axes de symétrie de ce rectangle est : "
        this.correction = `Ce rectangle a $${miseEnEvidence('2')}$ axes de symétrie.<br>
      Ces axes sont les médiatrices des côtés du rectangle. `
      }
      if (choix === 2) {
        this.reponse = 4
        this.question = mathalea2d(
          {
            xmin,
            ymin,
            xmax,
            ymax,
            pixelsParCm: 30,
            mainlevee: false,
            amplitude: 0.5,
            scale: 0.8,
            style: 'margin: auto',
          },
          objets2,
        )
        this.question += "<br>Le nombre d'axes de symétrie de ce carré est : "
        this.correction = `Le carré a $${miseEnEvidence('4')}$ axes de symétrie.<br>
      Ces axes sont les médiatrices des côtés du carré et les diagonales. `
        this.canEnonce = this.question
        this.canReponseACompleter = '$\\ldots$'
      }
      if (choix === 3) {
        this.reponse = 3
        this.question = mathalea2d(
          {
            xmin,
            ymin,
            xmax,
            ymax,
            pixelsParCm: 30,
            mainlevee: false,
            amplitude: 0.5,
            scale: 0.8,
            style: 'margin: auto',
          },
          objets3,
        )
        this.question +=
          "<br>Le nombre d'axes de symétrie de ce triangle est : "
        this.correction = `Ce triangle est équilatéral. Il a $${miseEnEvidence('3')}$ axes de symétrie.<br>
      Ces axes sont les médiatrices des côtés du triangle. `
      }
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\ldots$'
    if (!this.interactif) {
      this.question += '$\\ldots$'
    }
  }
}
