import { milieu, point, tracePoint } from '../../lib/2d/points'
import { cone as cone2d, sphere2d } from '../../lib/2d/projections3d'
import { Segment, segment } from '../../lib/2d/segmentsVecteurs'
import type { Latex2d } from '../../lib/2d/textes'
import { homothetie } from '../../lib/2d/transformations'
import {
  arc3d,
  arete3d,
  droite3d,
  Point3d,
  point3d,
  polygone3d,
  vecteur3d,
} from '../../lib/3d/3dProjectionMathalea2d/elements'
import {
  cone3d,
  cylindre3d,
  prisme3d,
  pyramide3d,
} from '../../lib/3d/3dProjectionMathalea2d/solides'
import { rotation3d } from '../../lib/3d/3dProjectionMathalea2d/tranformations'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { propositionsQcm } from '../../lib/interactif/qcm'
import { ajouteChampTexte } from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { premiereLettreEnMajuscule } from '../../lib/outils/outilString'
import {
  fixeBordures,
  mathalea2d,
  ObjetMathalea2D,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Reconnaitre des solides'
export const dateDePublication = '24/09/2022'
export const dateDeModifImportante = '08/05/2023'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
export const amcReady = true
export const amcType = 'qcmMono'

/**
 * @author Mickael Guironnet (Adapté par Eric Elter pour que les nouvelles fonctions 3d soient bien utilisées)
 * Créé le 24/09/2022
 */

export const refs = {
  'fr-fr': ['auto6G8A', '3AutoG07-1'],
  'fr-2016': ['6G44-1'],
  'fr-ch': ['9ES7-8', '10ES1-1', '11ES1-1'],
}
export const uuid = '051aa'
export default class ReconnaitreDesSolides extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 5
    this.nbCols = 4

    this.sup = '8' // Type de question
    this.sup2 = false // qcm
    this.besoinFormulaireTexte = [
      'Type de solides',
      [
        'Nombres séparés par des tirets  :',
        '1 : Prisme',
        '2 : Pyramide',
        '3 : Cône',
        '4 : Cylindre',
        '5 : Pavé',
        '6 : Cube',
        '7 : Sphère',
        '8 : Mélange',
      ].join('\n'),
    ]
    this.besoinFormulaire2CaseACocher = ['QCM']
  }

  nouvelleVersion() {
    const maxTentativesParQuestion = 50
    const solides = [
      'prisme',
      'pyramide',
      'cône',
      'cylindre',
      'pavé droit',
      'cube',
      'sphère',
    ]
    this.interactifType = this.sup2 ? 'qcm' : 'mathLive'

    this.consigne =
      this.nbQuestions === 1 || context.vue === 'diap'
        ? 'Donner le nom de ce solide.'
        : 'Donner le nom de chacun des solides.'

    const typeDeQuestion = gestionnaireFormulaireTexte({
      max: 7,
      defaut: 8,
      nbQuestions: this.nbQuestions * maxTentativesParQuestion,
      melange: 8,
      saisie: this.sup,
    }).map((e) => Number(e))

    for (let j = 0, k = 0; j < this.nbQuestions && k < 50; k++) {
      const choix = typeDeQuestion[k]
      context.anglePerspective = 30
      const objets: (ObjetMathalea2D | Latex2d)[] = []
      let reponseQcm

      let axe =
        choix === 1
          ? randint(1, 2)
          : choix > 1 && choix <= 5
            ? randint(1, 3)
            : 0

      // nombre de sommets de la base.
      const n = choix < 3 ? randint(3, 8) : choix === 5 || choix === 6 ? 4 : 0

      let prisme, pyra, cone, cylindre, pave, sphere
      let texteCorrection = ''
      let reponse = '' as string | string[]
      const solide = solides[choix - 1]
      switch (solide) {
        case 'prisme': // Prisme  ?
        case 'pyramide': // Pyramides  ?
          {
            const points3XY = []
            const points3XZ = []
            const points3YZ = []
            const rayon = 2
            const alpha = (Math.PI * 2) / n
            for (let i = 0; i < n; i++) {
              points3XY.push(
                point3d(
                  rayon * Math.cos(alpha * i),
                  rayon * Math.sin(alpha * i),
                  0,
                ),
              )
              points3XZ.push(
                point3d(
                  rayon * Math.cos(alpha * i),
                  5,
                  rayon * Math.sin(alpha * i),
                  true,
                ),
              )
              points3YZ.push(
                point3d(
                  -1,
                  rayon * Math.cos(alpha * i),
                  rayon * Math.sin(alpha * i),
                ),
              )
            }
            let base, k3, p3
            if (axe === 2) {
              // base sur le plan YZ
              if (n === 4) {
                const points3DRota = []
                for (let i = 0; i < points3YZ.length; i++) {
                  points3DRota.push(
                    rotation3d(
                      points3YZ[i],
                      droite3d(point3d(0, 0, 0), vecteur3d(1, 0, 0)),
                      0 + (i === 0 ? 30 : i === 1 ? -30 : 0),
                      'red',
                    ),
                  )
                }
                points3YZ.length = 0
                points3YZ.push(...points3DRota)
              }
              base = polygone3d(...points3YZ)
              k3 = vecteur3d(3, 0, 0)
              p3 = point3d(3, 0, 0)
            } else {
              // base sur le plan XY
              if (n === 4) {
                const points3DRota = []
                for (let i = 0; i < points3XY.length; i++) {
                  points3DRota.push(
                    rotation3d(
                      points3XY[i],
                      droite3d(point3d(0, 0, 0), vecteur3d(0, 0, 1)),
                      0 + (i === 0 ? 30 : i === 1 ? -30 : 0),
                      'red',
                    ),
                  )
                }
                points3XY.length = 0
                points3XY.push(...points3DRota)
              }
              base = polygone3d(...points3XY)
              k3 = vecteur3d(0, 0, 3)
              p3 = point3d(0, 0, 3)
            }

            if (solide === 'prisme') {
              prisme = prisme3d(base, k3)
              objets.push(...prisme.c2d)
              texteCorrection = `Prisme droit avec une base ayant $${prisme.base1.listePoints.length}$ sommets.`
            } else {
              pyra = pyramide3d(base, p3)
              const objs = pyra.c2d
              objets.push(...(objs as (ObjetMathalea2D | Latex2d)[]))
              texteCorrection = `Pyramide avec une base ayant $${pyra.base.listePoints.length}$ sommets.` // et selon l'axe=$${axe}$`
            }
          }
          reponse =
            solide === 'prisme' ? ['prisme', 'prisme droit'] : 'pyramide'

          break
        case 'cône': {
          // cone  ?
          if (axe === 3) {
            cone = cone3d(
              point3d(0, 0, 0),
              point3d(0, -7, 0),
              vecteur3d(
                Math.cos((30 * Math.PI) / 180.0),
                0,
                Math.sin((30 * Math.PI) / 180.0),
              ),
              'black',
              true,
              'black',
              'white',
            )
            /* for (let kk = 15; kk < 25; kk++) {
              cone.c2d[kk].isVisible = (kk % 2)
            } */
            objets.push(...(cone.c2d as (ObjetMathalea2D | Latex2d)[]))
          } else if (axe === 2) {
            cone = cone3d(
              point3d(0, 0, 0),
              point3d(3, 0, 0),
              vecteur3d(
                0,
                Math.cos((60 * Math.PI) / 180.0),
                Math.sin((60 * Math.PI) / 180.0),
              ),
              'black',
              true,
              'black',
              'white',
            )
            /* for (let kk = 3; kk < 3 + 17; kk++) {
              cone.c2d[kk].isVisible = (kk % 2)
            } */
            objets.push(...(cone.c2d as (ObjetMathalea2D | Latex2d)[]))
          } else {
            cone = cone2d({
              centre: point(0, 0),
              rx: randint(15, 30) / 10,
              hauteur: choice([3, 4, 5]),
            })
            const t = tracePoint(cone.centre)
            const g = homothetie(
              segment(cone.centre, cone.sommet),
              milieu(cone.centre, cone.sommet),
              1.5,
            ) as Segment
            g.pointilles = 2
            objets.push(cone, g, t)
          }
          reponse = ['cône', 'cone', 'cône de révolution', 'cone de révolution']
          texteCorrection = 'Cône de révolution' // suivant l'axe=$${axe}$`
          break
        }
        case 'cylindre': // cylindre
          if (axe === 3) {
            cylindre = cylindre3d(
              point3d(0, 0, 2),
              point3d(0, -3, 2),
              vecteur3d(1, 0, 0),
              vecteur3d(1, 0, 0),
            )
            const c1 = arc3d(
              point3d(0, 3, 1),
              vecteur3d(0, -1, 0),
              vecteur3d(1, 0, 0),
              'caché',
              'black',
              110,
              280,
            )
            const c2 = arc3d(
              point3d(0, 3, 1),
              vecteur3d(0, -1, 0),
              vecteur3d(1, 0, 0),
              'visible',
              'black',
              280,
              360 + 110,
            )
            const c3 = arc3d(
              point3d(0, -0.5, 1),
              vecteur3d(0, -1, 0),
              vecteur3d(1, 0, 0),
              'caché',
              'black',
              110,
              280,
            )
            const c4 = arc3d(
              point3d(0, -0.5, 1),
              vecteur3d(0, -1, 0),
              vecteur3d(1, 0, 0),
              'visible',
              'black',
              280,
              360 + 110,
            )
            // generatrice
            const g = []
            for (let i = 0; i < c1.listePoints.length; i += 2) {
              const s = segment(c3.listePoints[i], c1.listePoints[i])
              s.pointilles = 2
              s.opacite = 0.3
              g.push(s)
            }
            for (let i = 0; i < c2.listePoints.length; i += 2) {
              const s = segment(c4.listePoints[i], c2.listePoints[i])
              s.opacite = 0.6
              g.push(s)
            }
            c3.pointilles = 0
            c3.opacite = 1
            cylindre.c2d = []
            cylindre.c2d.push(
              c1,
              c2,
              c3,
              c4,
              ...g,
              arete3d(point3d(0, 4, 1), point3d(0, -4, 1), 'red', false).c2d,
            )
          } else if (axe === 2) {
            // base sur le plan YZ
            cylindre = cylindre3d(
              point3d(0, 0, 0),
              point3d(3, 0, 0),
              vecteur3d(0, 1, 0),
              vecteur3d(0, 1, 0),
            )
            /* c1 = demicercle3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'caché', 'red', 0)
                        c2 = demicercle3d(point3d(0, 0, 0), point3d(0, -1, 0), vecteur3d(1, 0, 0), 'visible', 'blue', 0) */
            const c1 = arc3d(
              point3d(0, 0, 1),
              vecteur3d(1, 0, 0),
              vecteur3d(0, 1, 0),
              'visible',
              'black',
              90,
              270,
            )
            const c2 = arc3d(
              point3d(0, 0, 1),
              vecteur3d(1, 0, 0),
              vecteur3d(0, 1, 0),
              'caché',
              'black',
              270,
              360 + 90,
            )
            const c3 = arc3d(
              point3d(3, 0, 1),
              vecteur3d(1, 0, 0),
              vecteur3d(0, 1, 0),
              'visible',
              'black',
              90,
              270,
            )
            const c4 = arc3d(
              point3d(3, 0, 1),
              vecteur3d(1, 0, 0),
              vecteur3d(0, 1, 0),
              'caché',
              'black',
              270,
              360 + 90,
            )
            // generatrice
            const g = []
            for (let i = 0; i < c1.listePoints.length; i += 2) {
              const s = segment(c3.listePoints[i], c1.listePoints[i])
              s.opacite = 0.6
              g.push(s)
            }
            for (let i = 0; i < c2.listePoints.length; i += 2) {
              const s = segment(c4.listePoints[i], c2.listePoints[i])
              s.pointilles = 2
              s.opacite = 0.3
              g.push(s)
            }
            c4.pointilles = 0
            c4.opacite = 1
            cylindre.c2d = []
            cylindre.c2d.push(
              c1,
              c2,
              c3,
              c4,
              ...g,
              arete3d(point3d(-1, 0, 1), point3d(4, 0, 1), 'red', false).c2d,
            )
          } else {
            cylindre = cylindre3d(
              point3d(0, 0, 0),
              point3d(0, 0, 3),
              vecteur3d(2, 0, 0),
              vecteur3d(2, 0, 0),
            )
          }
          objets.push(...cylindre.c2d)
          reponse = ['cylindre', 'cylindre de révolution']
          texteCorrection =
            premiereLettreEnMajuscule(solide) + ' de révolution.'

          break
        case 'pavé droit': // pavé droit
        case 'cube': {
          // cube
          if (solide === 'cube') {
            axe = 2 // cube quel que soit l'axe
          }
          const points3XY: Point3d[] = []
          const points3XZ: Point3d[] = []
          const points3YZ: Point3d[] = []
          const rayon = 2
          const alpha = (Math.PI * 2) / n
          for (let i = 0; i < n; i++) {
            points3XY.push(
              point3d(
                rayon * Math.cos(alpha * i),
                rayon * Math.sin(alpha * i),
                0,
                !(i > 0 && i <= n / 2 - 0.1),
              ),
            )
            points3XZ.push(
              point3d(
                rayon * Math.cos(alpha * i),
                5,
                rayon * Math.sin(alpha * i),
                true,
              ),
            )
            points3YZ.push(
              point3d(
                -1,
                rayon * Math.cos(alpha * i),
                rayon * Math.sin(alpha * i),
                !(
                  i === 0 ||
                  (n > 6 && i === n - 1) ||
                  (n > 6 && i === 1) ||
                  (n === 6 && i === 5)
                ),
              ),
            )
          }
          if (axe === 3) {
            // base sur le plan YZ
            const points3DRota = []
            for (let i = 0; i < points3XY.length; i++) {
              points3DRota.push(
                rotation3d(
                  points3XZ[i],
                  droite3d(point3d(0, 0, 0), vecteur3d(0, 1, 0)),
                  -45,
                  'red',
                ),
              )
            }
            points3XZ.length = 0
            points3XZ.push(...points3DRota)

            const base = polygone3d(...points3XZ)
            const k2 = vecteur3d(0, -6, 0)
            pave = prisme3d(base, k2)
          } else if (axe === 2) {
            // base sur le plan YZ
            const points3DRota = []
            for (let i = 0; i < points3YZ.length; i++) {
              points3DRota.push(
                rotation3d(
                  points3YZ[i],
                  droite3d(point3d(0, 0, 0), vecteur3d(1, 0, 0)),
                  -45,
                  'red',
                ),
              )
            }
            points3YZ.length = 0
            points3YZ.push(...points3DRota)

            const base = polygone3d(...points3YZ)
            if (solide === 'cube') {
              const k1 = vecteur3d(3, 0, 0)
              pave = prisme3d(base, k1)
            } else {
              pave = prisme3d(base, vecteur3d(5, 0, 0))
            }
          } else {
            // base sur le plan XY
            const points3DRota = []
            for (let i = 0; i < points3XY.length; i++) {
              points3DRota.push(
                rotation3d(
                  points3XY[i],
                  droite3d(point3d(0, 0, 0), vecteur3d(0, 0, 1)),
                  0,
                  'red',
                ),
              )
            }
            points3XY.length = 0
            points3XY.push(...points3DRota)
            const base = polygone3d(...points3XY)
            const k3 = vecteur3d(0, 0, 3)
            pave = prisme3d(base, k3)
          }
          objets.push(...pave.c2d)
          reponse = solide
          reponseQcm = solide
          texteCorrection = premiereLettreEnMajuscule(solide) + '.'

          break
        }
        case 'sphère': // sphère
          sphere = sphere2d({ centre: point(0, 0), rx: 2, color: 'black' })
          objets.push(sphere)
          reponse = solide
          texteCorrection = premiereLettreEnMajuscule(solide) + '.'

          break
      }
      if (this.questionJamaisPosee(j, choix, n, axe)) {
        reponseQcm = solide
        if (this.sup2) reponse = solide // on remplace les éventuelles réponses multiples par l'unique réponse du QCM

        this.question = mathalea2d(
          Object.assign({}, fixeBordures(objets), {
            scale: 0.5,
            style: 'margin: auto',
          }),
          ...objets.flat(),
        )

        this.autoCorrection[j] = {}
        this.autoCorrection[j].options = {}
        this.autoCorrection[j].enonce = `${this.question}\n`
        this.autoCorrection[j].propositions = [
          {
            texte: 'Prisme',
            statut: reponseQcm === 'prisme',
          },
          {
            texte: 'Pyramide',
            statut: reponseQcm === 'pyramide',
          },
          {
            texte: 'Cône',
            statut: reponseQcm === 'cône',
          },
          {
            texte: 'Cylindre',
            statut: reponseQcm === 'cylindre',
          },
          {
            texte: 'Pavé',
            statut: reponseQcm === 'pavé droit',
          },
          {
            texte: 'Cube',
            statut: reponseQcm === 'cube',
          },
          {
            texte: 'Sphère',
            statut: reponseQcm === 'sphère',
          },
        ]
        if (this.sup2) {
          this.question += propositionsQcm(this, j).texte
        } else {
          setReponse(this, j, reponse, { formatInteractif: 'ignorerCasse' })
          this.question += '<br>' + ajouteChampTexte(this, j)
        }
        this.listeQuestions[j] = this.question
        this.listeCorrections[j] = texteCorrection
        j++
      }
    }
    listeQuestionsToContenu(this)
  }
}
