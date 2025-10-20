import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { choice } from '../../../lib/outils/arrayOutils'
import { context } from '../../../modules/context'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { milieu, point } from '../../../lib/2d/points'
import FractionEtendue from '../../../modules/FractionEtendue'
import { texteParPosition } from '../../../lib/2d/textes'
import { grille } from '../../../lib/2d/reperes'
import {
  segment,
  segmentAvecExtremites,
} from '../../../lib/2d/segmentsVecteurs'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const titre = "Déterminer la longueur d'une ligne brisée"
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'd0a64'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora
 */
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()

    this.canOfficielle = false
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
  }

  nouvelleVersion() {
    let A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      J,
      K,
      a,
      b,
      s1,
      s2,
      s3,
      s4,
      s5,
      s6,
      s7,
      s8,
      xmin,
      xmax,
      ymin,
      ymax,
      objets
    const choix = choice(['a', 'b', 'd', 'e']) //
    if (this.canOfficielle) {
      this.question =
        'Quelle est la longueur de la ligne brisée en unité de longueur (u.l.) ? <br>'
      a = grille(-1, 0, 7, 4, 'gray', 1, 1)
      b = choice([3, 4, 5, 6])
      A = point(1, 1, 'A', 'below')
      B = point(1, 3, 'B', 'below')
      C = point(3, 1, 'C', 'above')
      D = point(3, 2, 'D', 'above')
      E = point(5, 2, 'C', 'above')
      F = point(5, 1, 'D', 'above')
      J = point(6, 1, 'C', 'above')
      K = point(6, 2, 'D', 'above')
      G = point(0, 4, 'C', 'above') // unite
      H = point(4, 4, 'D', 'above') // unite
      s1 = segmentAvecExtremites(G, H)
      s1.epaisseur = 3
      s2 = segment(A, B, 'blue')
      s2.epaisseur = 3
      s3 = segment(C, A, 'blue')
      s3.epaisseur = 3
      s4 = segment(C, D, 'blue')
      s4.epaisseur = 3
      s5 = segment(D, E, 'blue')
      s5.epaisseur = 3
      s6 = segment(E, F, 'blue')
      s6.epaisseur = 3
      s7 = segment(F, J, 'blue')
      s7.epaisseur = 3
      s8 = segment(J, K, 'blue')
      s8.epaisseur = 3
      xmin = -1
      ymin = 0
      xmax = 7
      ymax = 5
      const objets = []
      objets.push(
        texteParPosition(
          '1 u.l.',
          milieu(G, H).x,
          milieu(G, H).y + 0.7,
          0,
          'black',
          context.isHtml ? 1 : 0.7,
        ),
        a,
        s1,
        s2,
        s3,
        s4,
        s5,
        s6,
        s7,
        s8,
      )
      this.reponse = new FractionEtendue(10, 4).texFraction
      this.question +=
        mathalea2d(
          {
            xmin,
            ymin,
            xmax,
            ymax,
            pixelsParCm: 20,
            mainlevee: false,
            amplitude: 0.5,
            scale: 0.5,
            style: 'margin: auto',
          },
          objets,
        ) + '<br>'
      this.optionsChampTexte = { texteApres: 'u.l.' }
      this.correction = `Une unité correspond à $4$ carreaux, la ligne brisée mesure $10$ carreaux, soit $\\dfrac{${miseEnEvidence('10')}}{${miseEnEvidence('4')}}$ u.l. ou
       plus simplement $\\dfrac{${miseEnEvidence('5')}}{${miseEnEvidence('2')}}$ u.l. `

      this.canEnonce = mathalea2d(
        {
          xmin,
          ymin,
          xmax,
          ymax,
          pixelsParCm: 20,
          mainlevee: false,
          amplitude: 0.5,
          scale: 0.5,
          style: 'margin: auto',
        },
        objets,
      )
      this.canReponseACompleter =
        'Longueur de la ligne brisée en unité de longueur (u.l.) : <br> $\\ldots$ u.l.'
    } else {
      this.question =
        'Quelle est la longueur de la ligne brisée en unité de longueur (u.l.) ? <br>'
      if (choix === 'a') {
        a = grille(-2, -2, 7, 4, 'gray', 1, 1)
        b = choice([3, 4, 5, 6])
        A = point(0, 2, 'A', 'below')
        B = point(1, 2, 'B', 'below')
        C = point(1, 0, 'C', 'above')
        D = point(2, 0, 'D', 'above')
        E = point(2, 2, 'C', 'above')
        F = point(3, 2, 'D', 'above')
        G = point(0, 4, 'C', 'above')
        H = point(b, 4, 'D', 'above')
        s1 = segmentAvecExtremites(G, H)
        s1.epaisseur = 2
        s2 = segment(A, B)
        s2.epaisseur = 2
        s3 = segment(C, B)
        s3.epaisseur = 2
        s4 = segment(C, D)
        s4.epaisseur = 2
        s5 = segment(D, E)
        s5.epaisseur = 2
        s6 = segment(E, F)
        s6.epaisseur = 2
        xmin = -1
        ymin = -2
        xmax = 7
        ymax = 5
        const objets = []
        objets.push(
          texteParPosition(
            '1 u.l.',
            milieu(G, H).x,
            milieu(G, H).y + 0.7,
            0,
            'black',
            context.isHtml ? 1 : 0.7,
          ),
          a,
          s1,
          s2,
          s3,
          s4,
          s5,
          s6,
        )
        this.reponse = new FractionEtendue(7, b).texFraction
        this.question +=
          mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              mainlevee: false,
              amplitude: 0.5,
              scale: 0.5,
              style: 'margin: auto',
            },
            objets,
          ) + '<br>'
        this.correction = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $7$ carreaux, soit $\\dfrac{${miseEnEvidence(7)}}{${miseEnEvidence(b)}}$ u.l. `
      }
      if (choix === 'b') {
        a = grille(-2, -1, 7, 4, 'gray', 1, 1)
        b = choice([3, 4, 5, 6])
        A = point(0, 2, 'A', 'below')
        B = point(1, 2, 'B', 'below')
        C = point(1, 0, 'C', 'above')
        D = point(4, 0, 'D', 'above')
        E = point(4, 1, 'C', 'above')
        G = point(0, 4, 'C', 'above')
        H = point(b, 4, 'D', 'above')
        s1 = segmentAvecExtremites(G, H)
        s1.epaisseur = 2
        s2 = segment(A, B)
        s2.epaisseur = 2
        s3 = segment(C, B)
        s3.epaisseur = 2
        s4 = segment(C, D)
        s4.epaisseur = 2
        s5 = segment(D, E)
        s5.epaisseur = 2

        xmin = -1
        ymin = -1
        xmax = 7
        ymax = 5
        objets = []
        objets.push(
          texteParPosition(
            '1 u.l.',
            milieu(G, H).x,
            milieu(G, H).y + 0.7,
            0,
            'black',
            context.isHtml ? 1 : 0.7,
          ),
          a,
          s1,
          s2,
          s3,
          s4,
          s5,
        )
        this.reponse = new FractionEtendue(7, b).texFraction
        this.question +=
          mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              mainlevee: false,
              amplitude: 0.5,
              scale: 0.5,
              style: 'margin: auto',
            },
            objets,
          ) + '<br>'
        this.correction = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $7$ carreaux, soit $\\dfrac{${miseEnEvidence(7)}}{${miseEnEvidence(b)}}$ u.l. `
      }
      if (choix === 'c') {
        a = grille(-2, -1, 7, 4, 'gray', 1, 1)
        b = choice([3, 4, 5, 6])
        A = point(0, 2, 'A', 'below')
        B = point(1, 2, 'B', 'below')
        C = point(1, 0, 'C', 'above')
        D = point(3, 0, 'D', 'above')
        E = point(3, 2, 'C', 'above')
        G = point(0, 4, 'C', 'above')
        H = point(b, 4, 'D', 'above')
        s1 = segmentAvecExtremites(G, H)
        s1.epaisseur = 2
        s2 = segment(A, B)
        s2.epaisseur = 2
        s3 = segment(C, B)
        s3.epaisseur = 2
        s4 = segment(C, D)
        s4.epaisseur = 2
        s5 = segment(D, E)
        s5.epaisseur = 2

        xmin = -1
        ymin = -1
        xmax = 7
        ymax = 5
        objets = []
        objets.push(
          texteParPosition(
            '1 u.l.',
            milieu(G, H).x,
            milieu(G, H).y + 0.7,
            0,
            'black',
            context.isHtml ? 1 : 0.7,
          ),
          a,
          s1,
          s2,
          s3,
          s4,
          s5,
        )
        this.reponse = new FractionEtendue(7, b).texFraction
        this.question +=
          mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              mainlevee: false,
              amplitude: 0.5,
              scale: 0.5,
              style: 'margin: auto',
            },
            objets,
          ) + '<br>'
        this.correction = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $7$ carreaux, soit $\\dfrac{${miseEnEvidence(7)}}{${miseEnEvidence(b)}}$ u.l. `
      }
      if (choix === 'd') {
        a = grille(-2, -1, 7, 4, 'gray', 1, 1)
        b = choice([3, 4, 6])
        A = point(0, 2, 'A', 'below')
        B = point(1, 2, 'B', 'below')
        C = point(1, 1, 'C', 'above')
        D = point(3, 1, 'D', 'above')
        E = point(3, 2, 'C', 'above')
        G = point(0, 4, 'C', 'above')
        H = point(b, 4, 'D', 'above')
        s1 = segmentAvecExtremites(G, H)
        s1.epaisseur = 2
        s2 = segment(A, B)
        s2.epaisseur = 2
        s3 = segment(C, B)
        s3.epaisseur = 2
        s4 = segment(C, D)
        s4.epaisseur = 2
        s5 = segment(D, E)
        s5.epaisseur = 2

        xmin = -1
        ymin = -1
        xmax = 7
        ymax = 5
        objets = []
        objets.push(
          texteParPosition(
            '1 u.l.',
            milieu(G, H).x,
            milieu(G, H).y + 0.7,
            0,
            'black',
            context.isHtml ? 1 : 0.7,
          ),
          a,
          s1,
          s2,
          s3,
          s4,
          s5,
        )
        this.reponse = new FractionEtendue(5, b).texFraction
        this.question +=
          mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              mainlevee: false,
              amplitude: 0.5,
              scale: 0.5,
              style: 'margin: auto',
            },
            objets,
          ) + '<br>'
        this.correction = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $5$ carreaux, soit $\\dfrac{${miseEnEvidence(5)}}{${miseEnEvidence(b)}}$ u.l. `
      }
      if (choix === 'e') {
        a = grille(-2, -1, 7, 4, 'gray', 1, 1)
        b = choice([3, 4, 6])
        A = point(0, 2, 'A', 'below')
        B = point(1, 2, 'B', 'below')
        C = point(2, 2, 'C', 'above')
        D = point(2, 1, 'D', 'above')
        E = point(4, 1, 'C', 'above')
        G = point(0, 4, 'C', 'above')
        H = point(b, 4, 'D', 'above')
        s1 = segmentAvecExtremites(G, H)
        s1.epaisseur = 2
        s2 = segment(A, B)
        s2.epaisseur = 2
        s3 = segment(C, B)
        s3.epaisseur = 2
        s4 = segment(C, D)
        s4.epaisseur = 2
        s5 = segment(D, E)
        s5.epaisseur = 2

        xmin = -1
        ymin = -1
        xmax = 7
        ymax = 5
        objets = []
        objets.push(
          texteParPosition(
            '1 u.l.',
            milieu(G, H).x,
            milieu(G, H).y + 0.7,
            0,
            'black',
            context.isHtml ? 1 : 0.7,
          ),
          a,
          s1,
          s2,
          s3,
          s4,
          s5,
        )
        this.reponse = new FractionEtendue(5, b).texFraction
        this.question +=
          mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              mainlevee: false,
              amplitude: 0.5,
              scale: 0.5,
              style: 'margin: auto',
            },
            objets,
          ) + '<br>'
        this.correction = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $5$ carreaux, soit $\\dfrac{${miseEnEvidence(5)}}{${miseEnEvidence(b)}}$ u.l. `
      }
      this.optionsChampTexte = { texteApres: 'u.l.' }
      this.canEnonce = this.question
      this.canReponseACompleter = '$\\ldots$ u.l.'
    }
  }
}
