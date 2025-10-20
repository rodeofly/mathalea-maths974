import { codageAngleDroit } from '../../lib/2d/angles'
import { cercle, traceCompas } from '../../lib/2d/cercle'
import {
  codageMediatrice,
  codageSegments,
  placeLatexSurSegment,
} from '../../lib/2d/codages'
import { mediatrice } from '../../lib/2d/droites'
import {
  Point,
  point,
  pointIntersectionCC,
  pointIntersectionDD,
} from '../../lib/2d/points'
import { polygoneAvecNom } from '../../lib/2d/polygones'
import { demiDroite, longueur } from '../../lib/2d/segmentsVecteurs'
import { shuffle } from '../../lib/outils/arrayOutils'
import { creerNomDePolygone } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import {
  fixeBordures,
  mathalea2d,
  type NestedObjetMathalea2dArray,
} from '../../modules/2dGeneralites'
import Alea2iep from '../../modules/Alea2iep'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre =
  'Construire un triangle particulier et son cercle circonscrit'
export const dateDePublication = '01/09/2025'

/**
 * Publié le 27/08/2025
 * @author Jean-Claude Lhote
 */
export const uuid = 'e0bcb'

export const refs = {
  'fr-fr': ['6G6F-1'],
  'fr-2016': [],
  'fr-ch': [],
}
export default class ConstruireUnTriangleParticulierEtSonCercleCirconscrit extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 3
    this.besoinFormulaireTexte = [
      'types de triangles',
      '1 : Isocèle\n2 : Équilatéral\n3 : Rectangle\n4 : Mélange',
    ]
    this.sup = '4'
    this.besoinFormulaire2CaseACocher = ['Ne pas montrer de schéma', true]
    this.sup2 = false
    this.besoinFormulaire3CaseACocher = ['longueurs entières', true]
    this.sup3 = true
    this.consigne =
      'Tracer les triangles suivants, puis construire leur cercle circonscrit.'
  }

  nouvelleVersion() {
    let listeDeNomsDePolygones: string[] = []
    const typeDeTriangles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      nbQuestions: this.nbQuestions,
      min: 1,
      max: 3,
      melange: 4,
      defaut: 4,
      shuffle: false,
    }).map(Number)
    for (let i = 0, verif, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      if (i % 5 === 0) listeDeNomsDePolygones = ['PQD']
      const IEP = new Alea2iep()
      const objetsEnonce = []
      const objetsCorrection = []

      texteCorr = "Voici la construction qu'il fallait réaliser.<br>"
      // On initialise les noms des sommets et du centre (elles seront mélangées voir remplacées plus tard)
      const nom = creerNomDePolygone(4, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(nom)
      let sommets: string[] = []
      for (let i = 0; i < 3; i++) sommets.push(nom[i])
      let codages: NestedObjetMathalea2dArray = []
      const A = point(0, 0, 'A', 'left')

      let B: Point
      let C: Point
      let lAB: number
      let lBC: number
      let lAC: number

      switch (typeDeTriangles[i]) {
        case 1: // isocèle
          {
            const ab =
              this.seed === 'myriade'
                ? 5
                : this.sup3
                  ? randint(3, 6)
                  : randint(30, 60) / 10
            const ac =
              this.seed === 'myriade'
                ? 3
                : this.sup3
                  ? randint(2, Math.max(2, Math.floor(2 * ab - 1)))
                  : randint(20, Math.max(20, Math.floor(2 * ab - 1) * 10)) / 10
            sommets =
              this.seed === 'myriade' ? ['A', 'B', 'C'] : shuffle(sommets)
            C = point(ac, 0, sommets[2], 'right')
            const cA = cercle(A, ab)
            const cC = cercle(C, ab)
            B = pointIntersectionCC(cA, cC, sommets[1], 1) as Point
            B.positionLabel = 'above'
            ;[A, B, C].forEach(
              (p: Point, index: number) => (p.nom = sommets[index]),
            )
            codages.push(
              codageSegments('||', 'black', A, B, C, B),
              placeLatexSurSegment(`${texNombre(ab, 1)}\\text{ cm}`, A, B, {
                letterSize: 'scriptsize',
              }),
              placeLatexSurSegment(`${texNombre(ac, 1)}\\text{ cm}`, C, A, {
                letterSize: 'scriptsize',
              }),
            )
            texte += `Le triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ isocèle en ${sommets[1]} tel que $${sommets[0]}${sommets[1]}=${texNombre(ab, 1)}\\text{ cm}$ et $${sommets[0]}${sommets[2]}=${texNombre(ac, 1)}\\text{ cm}$.<br>`
            lAB = ab
            lAC = ac
            lBC = ab
            texteCorr +=
              'Pour cette construction, nous avons utilisé la règle graduée et le compas.<br>'
            const [aIEP, bIEP, cIEP] =
              this.seed === 'myriade'
                ? IEP.triangleIsocele2Longueurs('ABC', lAB, lAC)
                : IEP.triangleIsocele2Longueurs(
                    `${sommets[0]}${sommets[2]}${sommets[1]}`,
                    lAB,
                    lAC,
                  )
            IEP.cercleCirconscrit(aIEP, bIEP, cIEP)
            verif = ''
            const T = polygoneAvecNom(A, B, C)
            const TT = polygoneAvecNom(A, B, C)
            objetsEnonce.push(TT[0], TT[1], codages)
            objetsCorrection.push(
              T[0],
              T[1],
              codages,
              traceCompas(A, B, 20, 'green'),
              traceCompas(C, B, 20, 'green'),
            )
            const paramsEnonce = {
              xmin: Math.min(A.x - 1, B.x - 1),
              ymin: Math.min(A.y - 1, B.y - 1),
              xmax: Math.max(A.x + 1, B.x + 1),
              ymax: Math.max(A.y + 1, B.y + 1),
              pixelsParCm: 30,
              scale: 0.6,
              mainlevee: true,
              amplitude: 0.2,
            }
          }
          break
        case 2: // équilatéral
          {
            const ab =
              this.seed === 'myriade'
                ? 5
                : this.sup3
                  ? randint(3, 7)
                  : randint(30, 70) / 10

            sommets =
              this.seed === 'myriade' ? ['D', 'E', 'F'] : shuffle(sommets)
            C = point(ab, 0, sommets[2], 'right')
            const cA = cercle(A, ab)
            const cC = cercle(C, ab)
            B = pointIntersectionCC(cA, cC, sommets[1], 1) as Point
            B.positionLabel = 'above'
            ;[A, B, C].forEach(
              (p: Point, index: number) => (p.nom = sommets[index]),
            )
            codages.push(
              codageSegments('||', 'black', A, B, C, B, A, C),
              placeLatexSurSegment(`${texNombre(ab, 1)}\\text{ cm}`, A, B, {
                letterSize: 'scriptsize',
              }),
            )
            texte += `Le triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ équilatéral et tel que $${sommets[0]}${sommets[1]}=${texNombre(ab, 1)}\\text{ cm}$.<br>`
            lAB = ab
            lAC = ab
            lBC = ab
            texteCorr +=
              'Pour cette construction, nous avons utilisé la règle graduée et le compas.<br>'
            const [aIEP, bIEP, cIEP] =
              this.seed === 'myriade'
                ? IEP.triangleEquilateral('DEF', lAB)
                : IEP.triangleEquilateral(
                    `${sommets[0]}${sommets[1]}${sommets[2]}`,
                    lAB,
                  )
            IEP.cercleCirconscrit(aIEP, bIEP, cIEP)
            verif = ''
            const T = polygoneAvecNom(A, B, C)
            const TT = polygoneAvecNom(A, B, C)
            objetsEnonce.push(TT[0], TT[1], codages)
            objetsCorrection.push(
              T[0],
              T[1],
              codages,
              traceCompas(A, B, 20, 'green'),
              traceCompas(C, B, 20, 'green'),
            )
            const paramsEnonce = {
              xmin: Math.min(A.x - 1, B.x - 1),
              ymin: Math.min(A.y - 1, B.y - 1),
              xmax: Math.max(A.x + 1, B.x + 1),
              ymax: Math.max(A.y + 1, B.y + 1),
              pixelsParCm: 30,
              scale: 0.6,
              mainlevee: true,
              amplitude: 0.2,
            }
          }
          break
        case 3: // rectangle

        default:
          {
            {
              const ab =
                this.seed === 'myriade'
                  ? 4
                  : this.sup3
                    ? randint(3, 6)
                    : randint(30, 60) / 10
              const bc =
                this.seed === 'myriade'
                  ? 6
                  : this.sup3
                    ? randint(ab + 1, 8)
                    : randint((ab + 1) * 10, 80) / 10
              const ac = Math.sqrt(bc ** 2 - ab ** 2)
              sommets =
                this.seed === 'myriade' ? ['I', 'J', 'K'] : shuffle(sommets)
              B = point(-ab, 0, sommets[1], 'right')
              const cA = cercle(A, ac)
              const cB = cercle(B, bc)
              C = pointIntersectionCC(cA, cB, sommets[1], 1) as Point
              C.positionLabel = 'above'
              ;[A, B, C].forEach(
                (p: Point, index: number) => (p.nom = sommets[index]),
              )
              codages.push(
                codageAngleDroit(C, A, B),
                placeLatexSurSegment(`${texNombre(ab, 1)}\\text{ cm}`, A, B, {
                  letterSize: 'scriptsize',
                }),
                placeLatexSurSegment(`${texNombre(bc, 1)}\\text{ cm}`, B, C, {
                  letterSize: 'scriptsize',
                }),
              )
              texte += `Le triangle $${sommets[0]}${sommets[1]}${sommets[2]}$ rectangle en ${sommets[0]} tel que $${sommets[0]}${sommets[1]}=${texNombre(ab, 1)}\\text{ cm}$ et $${sommets[1]}${sommets[2]}=${texNombre(bc, 1)}\\text{ cm}$.<br>`
              lAB = ab
              lAC = ac
              lBC = bc
              texteCorr +=
                "Pour cette construction, nous avons utilisé la règle graduée, le compas et l'équerre."
              const [aIEP, bIEP, cIEP] =
                this.seed === 'myriade'
                  ? (IEP.triangleRectangleCoteHypotenuse(
                      'JIK',
                      ab,
                      bc,
                    ) as Point[])
                  : (IEP.triangleRectangleCoteHypotenuse(
                      `${sommets[1]}${sommets[0]}${sommets[2]}`,
                      ab,
                      bc,
                    ) as Point[])
              IEP.cercleCirconscrit(aIEP, bIEP, cIEP)
              verif = ''
              const T = polygoneAvecNom(A, B, C)
              const CC = point(
                C.x + randint(-3, 3) / 10,
                C.y + randint(-3, 3) / 10,
                C.nom,
                C.positionLabel,
              )
              const TT = polygoneAvecNom(A, B, CC)
              objetsEnonce.push(TT[0], TT[1], codages)
              objetsCorrection.push(
                demiDroite(A, C),
                T[0],
                T[1],
                codages,
                traceCompas(B, C, 20, 'green'),
              )
              const paramsEnonce = {
                xmin: Math.min(A.x - 1, B.x - 1),
                ymin: Math.min(A.y - 1, B.y - 1),
                xmax: Math.max(A.x + 1, B.x + 1),
                ymax: Math.max(A.y + 1, B.y + 1),
                pixelsParCm: 30,
                scale: 0.6,
                mainlevee: true,
                amplitude: 0.2,
              }
            }
          }
          break
      }
      sommets.push(nom[3]) // milieu
      const med1 = codageMediatrice(A, B, 'red', 'o')
      const med2 = codageMediatrice(B, C, 'blue', 'x')
      const med3 = codageMediatrice(C, A, 'green', '//')
      const d1 = mediatrice(A, B, '', 'red')
      const d2 = mediatrice(B, C, '', 'blue')
      const d3 = mediatrice(C, A, '', 'green')
      const O = pointIntersectionDD(d1, d2) as Point
      const c0 = cercle(O, longueur(A, O), 'orange')
      objetsCorrection.push(med1, med2, med3, d1, d2, d3, c0)

      const paramsCorrection = {
        xmin: Math.min(A.x - 1, B.x - 1, C.x - 2),
        ymin: Math.min(A.y - 1, B.y - 1, C.y - 2),
        xmax: Math.max(A.x + 1, B.x + 1, C.x + 2),
        ymax: Math.max(A.y + 1, B.y + 1, C.y + 2),
        pixelsParCm: 30,
        scale: 1,
      }
      if (!this.sup2) {
        texte += 'Le triangle ci-dessous a été réalisé à main levée.<br>'
      }
      if (!this.sup2) {
        texte +=
          (context.vue === 'diap' ? '<center>' : '') +
          mathalea2d(
            Object.assign(
              { mainlevee: true, amplitude: 0.3, scale: 0.6, pixelsParCm: 30 },
              fixeBordures(objetsEnonce, {
                rymin: 0,
                rymax: 0,
                rxmin: -0.5,
                rxmax: 0.5,
              }),
            ),
            objetsEnonce,
          ) +
          (context.vue === 'diap' ? '</center>' : '')
      }
      texteCorr +=
        (context.vue === 'diap' ? '<center>' : '') +
        mathalea2d(
          Object.assign({ pixelsParCm: 30 }, fixeBordures(objetsCorrection)),
          objetsCorrection,
        ) +
        (context.vue === 'diap' ? '</center>' : '')
      texteCorr += verif
      texteCorr += IEP.htmlBouton(this.numeroExercice ?? 0, i)

      if (this.questionJamaisPosee(i, lAB, String(lBC), lAC)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
