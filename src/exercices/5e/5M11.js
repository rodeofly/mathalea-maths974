import { codageAngleDroit } from '../../lib/2d/angles'
import { afficheLongueurSegment, codageSegments } from '../../lib/2d/codages'
import { point, pointAdistance } from '../../lib/2d/points'
import { polygoneAvecNom } from '../../lib/2d/polygones'
import { vecteur } from '../../lib/2d/segmentsVecteurs'
import { rotation, similitude, translation } from '../../lib/2d/transformations'
import { texteExposant } from '../../lib/outils/ecritures'
import { creerNomDePolygone } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Grandeur from '../../modules/Grandeur'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { arrondi } from '../../lib/outils/nombres'
import { enleveDoublonNum } from '../../lib/outils/arrayOutils'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { mathalea2d } from '../../modules/2dGeneralites'
import { miseEnEvidence } from '../../lib/outils/embellissements'

export const titre = "Calculer l'aire de carré, rectangle ou triangle rectangle"
export const dateDeModifImportante = '24/04/2025'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifType = 'mathLive'
export const interactifReady = true

/**
 * Un carré, un rectangle et un triangle rectangle sont tracés.
 *
 * Il faut calculer les aires
 *
 * @author Rémi Angot

 */
export const uuid = 'eb45a'

export const refs = {
  'fr-fr': ['BP2AutoV3', '5M11'],
  'fr-2016': ['6M11', 'BP2AutoV3'],
  'fr-ch': ['9GM1-2'],
}
export default class AireCarresRectanglesTriangles extends Exercice {
  constructor() {
    super()

    this.amcReady = amcReady
    this.amcType = amcType
    this.interactif = false

    this.spacing = 2

    context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
    this.nbQuestions = 1
    this.nbQuestionsModifiable = false
    this.besoinFormulaireTexte = [
      'Type de figures',
      [
        'Nombres séparés par des tirets  :',
        '1 : Carré',
        '2 : Rectangle',
        '3 : Triangle',
        '4 : Mélange',
      ].join('\n'),
    ]
    this.sup = 4
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 3,
      melange: 4,
      defaut: 4,
      shuffle: false,
      nbQuestions: 50,
    })
    enleveDoublonNum(typesDeQuestionsDisponibles)

    let texte = ''
    let texteCorr = ''
    const nom = creerNomDePolygone(11, 'QD')

    const c = randint(2, 6)
    const L = randint(2, 5)
    const l = randint(2, 5, L)
    const a = randint(2, 5)
    const b = randint(2, 5)
    const A = point(0, 0, nom[0])
    const B = rotation(point(c, 0), A, randint(-15, 15), nom[1])
    const C = rotation(A, B, -90, nom[2])
    const D = rotation(B, A, 90, nom[3])
    const carre = polygoneAvecNom(A, B, C, D)
    const E = point(8, 0, nom[4])
    const F = pointAdistance(E, L, randint(-15, 15), nom[5])
    const G = similitude(E, F, -90, l / L, nom[6])
    const H = translation(G, vecteur(F, E), nom[7])
    const rectangle = polygoneAvecNom(E, F, G, H)
    const I = point(15, 0, nom[8])
    const J = pointAdistance(I, a, randint(-25, 25), nom[9])
    const K = similitude(I, J, -90, b / a, nom[10])
    const triangle = polygoneAvecNom(I, J, K)
    const objets = []

    for (let i = 0; i < typesDeQuestionsDisponibles.length; i++) {
      texte = ''
      texteCorr = ''
      switch (typesDeQuestionsDisponibles[i] - 1) {
        case 0:
          objets.push(
            carre,
            codageAngleDroit(A, B, C),
            codageAngleDroit(A, D, C),
            codageAngleDroit(D, C, B),
            codageAngleDroit(B, A, D),
            codageSegments('//', 'blue', [A, B, C, D]),
            afficheLongueurSegment(B, A),
          )
          // texte = `Calculer l'aire du carré en cm${texteExposant(2)}.`
          texte = "Calculer l'aire du carré."

          texteCorr += `$\\mathcal{A}_{${nom[0] + nom[1] + nom[2] + nom[3]}}=${c}~\\text{cm}\\times${c}~\\text{cm}=${miseEnEvidence(c * c)}~\\text{cm}^2$`
          setReponse(this, i, new Grandeur(c * c, 'cm^2'), {
            formatInteractif: 'unites',
          })
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Calculer l'aire du carré de côté ${c}cm en cm${texteExposant(2)}`,
              propositions: [{ texte: texteCorr, statut: 0 }],
              reponse: {
                texte: 'Aire en cm\\up{2}',
                valeur: c * c,
                param: {
                  digits: 2,
                  decimals: 0,
                  signe: false,
                  exposantNbChiffres: 0,
                  exposantSigne: false,
                  approx: 0,
                },
              },
            }
          }
          break
        case 1:
          objets.push(
            rectangle,
            codageAngleDroit(E, F, G),
            codageAngleDroit(F, G, H),
            codageAngleDroit(G, H, E),
            codageAngleDroit(H, E, F),
            codageSegments('/', 'red', E, F, G, H),
            codageSegments('||', 'blue', F, G, H, E),
            afficheLongueurSegment(F, E),
            afficheLongueurSegment(G, F),
          )
          // texte = `Calculer l'aire du rectangle en cm${texteExposant(2)}.`
          texte = "Calculer l'aire du rectangle."
          texteCorr += `$\\mathcal{A}_{${nom[4] + nom[5] + nom[6] + nom[7]}}=${L}~\\text{cm}\\times${l}~\\text{cm}=${miseEnEvidence(L * l)}~\\text{cm}^2$`
          setReponse(this, i, new Grandeur(L * l, 'cm^2'), {
            formatInteractif: 'unites',
          })
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Calculer l'aire du rectangle de longueur ${L}cm et de largeur ${l}cm en cm${texteExposant(2)}`,
              propositions: [{ texte: texteCorr, statut: 0 }],
              reponse: {
                texte: 'Aire en cm\\up{2}',
                valeur: L * l,
                param: {
                  digits: 2,
                  decimals: 0,
                  signe: false,
                  exposantNbChiffres: 0,
                  exposantSigne: false,
                  approx: 0,
                },
              },
            }
          }
          break
        case 2:
          objets.push(
            triangle,
            codageAngleDroit(I, J, K),
            afficheLongueurSegment(J, I),
            afficheLongueurSegment(K, J),
            afficheLongueurSegment(I, K),
          )
          texte = "Calculer l'aire du triangle rectangle."
          texteCorr += `$\\mathcal{A}_{${nom[8] + nom[9] + nom[10]}}=${a}~\\text{cm}\\times${b}~\\text{cm}\\div2=${miseEnEvidence(texNombre((a * b) / 2))}~\\text{cm}^2$`
          setReponse(this, i, new Grandeur(arrondi((a * b) / 2), 'cm^2'), {
            formatInteractif: 'unites',
          })
          if (context.isAmc) {
            this.autoCorrection[i] = {
              enonce: `Calculer l'aire du triangle rectangle dont les côtés de l'angle droit mesurent ${a}cm et ${b}cm en cm${texteExposant(2)}`,
              propositions: [{ texte: texteCorr, statut: 0 }],
              reponse: {
                texte: 'Aire en cm\\up{2}',
                valeur: arrondi((a * b) / 2),
                param: {
                  digits: 2,
                  decimals: 0,
                  signe: false,
                  exposantNbChiffres: 0,
                  exposantSigne: false,
                  approx: 0,
                },
              },
            }
          }
          break
      }
      texte += ajouteChampTexteMathLive(this, i, KeyboardType.aire, {
        texteApres: '<em class="ml-2">(Une unité d\'aire est attendue.)</em>',
      })
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
    }
    this.consigne = mathalea2d(
      {
        xmin: -2,
        xmax: 22,
        ymin: -3,
        ymax: 7,
        pixelsParCm: 20,
        scale: 0.75,
        mainlevee: false,
      },
      [...objets],
    )

    listeQuestionsToContenu(this)
  }
}
