import { codageSegments } from '../../lib/2d/codages'
import { Point, point, tracePoint } from '../../lib/2d/points'
import { repere } from '../../lib/2d/reperes'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { labelPoint } from '../../lib/2d/textes'
import {
  handleAnswers,
  setReponse,
} from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { numAlpha } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { imagePointParTransformation } from '../../modules/imagePointParTransformation'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre =
  "Trouver les coordonnées de l'image d'un point par une symétrie centrale (quart de plan)"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeCreation = '26/09/2025'

/**
 * Trouver les coordonnées d'un point transformé d'un autre par une des transformations du plan
 * @author Jean-Claude Lhote
 */
export const uuid = 'd4089'

export const refs = {
  'fr-fr': ['5G11-41'],
  'fr-ch': [],
}
export default class DemiTourEtCoordonnees extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const k: number[] = []
    // On initialise les Point pour éviter les erreurs typescript type undefined.
    let A: Point = point(0, 0)
    let B: Point = point(0, 0)
    let C: Point = point(0, 0)
    let Aprime: Point = point(0, 0)
    let Bprime: Point = point(0, 0)
    let Cprime: Point = point(0, 0)
    const lettre1 = ['A', 'B', 'C']
    const punto: number[][] = [[]]
    const couleurs = ['brown', 'green', 'blue']
    for (
      let ee = 0,
        texte,
        texteCorr,
        xA = 0,
        yA = 0,
        xB = 0,
        yB = 0,
        xC = 0,
        yC = 0,
        objetsEnonce,
        objetsCorrection,
        cpt = 0;
      ee < this.nbQuestions && cpt < 50;

    ) {
      let enonceAmc = ''
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      objetsCorrection = []

      const xO = randint(8, 12) // Point O' (origine du repère dans lequel les transformations sont simples (centre des rotations et punto d'intersection des axes))
      const yO = randint(8, 12)

      const O = point(xO, yO, 'O', 'above left') // on crée le point O'

      let trouve = false
      let compteur = 0
      while (!trouve) {
        xA = randint(1, 19) // Point A
        yA = randint(1, 19)
        if (xA === xO && yA === yO) xA = randint(1, 19, [0, xO])
        punto[0] = imagePointParTransformation(
          7,
          [xA, yA],
          [xO, yO],
          [xO, yO],
          1,
        )
        punto[0] = punto[0].map((e) => Number(e)) // supprime les fractions étendues, on revient à la notation décimale
        compteur = 0
        while (
          (punto[0][0] < 1 ||
            punto[0][0] > 19 ||
            punto[0][1] < 1 ||
            punto[0][1] > 19) &&
          compteur < 20
        ) {
          // on teste si A est dans la fenêtre sinon on en choisit un autre
          xA = randint(1, 19, [xO, xO - 1]) // Point A
          yA = randint(1, 19, [yO, yO - 1])
          punto[0] = imagePointParTransformation(
            7,
            [xA, yA],
            [xO, yO],
            [xO, yO],
            k[0],
          )
          punto[0] = punto[0].map((e) => Number(e)) // supprime les fractions étendues, on revient à la notation décimale
          compteur++
        }
        A = point(xA, yA, 'A')
        Aprime = point(punto[0][0], punto[0][1], "A'")

        // xB = randint(-7, 7, [xA, 0]) // Point B
        xB = randint(1, 19, [xA, xO, xO - 1, punto[0][0]]) // Point B
        yB = randint(1, 19, [yA, yO, yO - 1])
        punto[1] = imagePointParTransformation(
          7,
          [xB, yB],
          [xO, yO],
          [xO, yO],
          1,
        )
        punto[1] = punto[1].map((e) => Number(e)) // supprime les fractions étendues, on revient à la notation décimale
        compteur = 0
        while (
          (punto[1][0] < 1 ||
            punto[1][0] > 19 ||
            punto[1][1] < 1 ||
            punto[1][1] > 19) &&
          compteur < 20
        ) {
          // on teste si on est dans les clous, sinon on choisit un autre punto B
          xB = randint(1, 19, [xA, xO, xO - 1, punto[0][0]]) // Point B
          yB = randint(1, 19, [yA, yO, yO - 1])
          punto[1] = imagePointParTransformation(
            7,
            [xB, yB],
            [xO, yO],
            [xO, yO],
            1,
          )
          punto[1] = punto[1].map((e) => Number(e)) // supprime les fractions étendues, on revient à la notation décimale
          compteur++
        }

        B = point(xB, yB, 'B')
        Bprime = point(punto[1][0], punto[1][1], "B'")

        // xC = randint(-7, 7, 0) // Point C
        xC = randint(1, 19, [xA, xB, xO, xO - 1, punto[0][0], punto[1][0]]) // Point C
        yC = randint(1, 19, [yA, yB, yO, yO - 1])
        punto[2] = imagePointParTransformation(
          7,
          [xC, yC],
          [xO, yO],
          [xO, yO],
          1,
        )
        punto[2] = punto[2].map((e) => Number(e)) // supprime les fractions étendues, on revient à la notation décimale
        compteur = 0
        while (
          (punto[2][0] < 1 ||
            punto[2][0] > 19 ||
            punto[2][1] < 1 ||
            punto[2][1] > 19) &&
          compteur < 20
        ) {
          // on vérifie que C est dans le repère sinon on change le punto C.
          xC = randint(1, 19, [xA, xB, xO, xO - 1, punto[0][0], punto[1][0]]) // Point C
          yC = randint(1, 19, [yA, yB, yO, yO - 1])
          punto[2] = imagePointParTransformation(
            7,
            [xC, yC],
            [xO, yO],
            [xO, yO],
            1,
          )
          punto[2] = punto[2].map((e) => Number(e)) // supprime les fractions étendues, on revient à la notation décimale
          compteur++
        }
        if (compteur < 20) {
          trouve = true
        } else {
          continue
        }
        C = point(xC, yC, 'C')
        Cprime = point(punto[2][0], punto[2][1], "C'")
      }
      const antecedents = [A, B, C]
      const images = [Aprime, Bprime, Cprime]
      objetsEnonce.push(
        tracePoint(...antecedents, O),
        labelPoint(...antecedents, O),
      )
      objetsCorrection.push(
        tracePoint(...antecedents, O),
        tracePoint(...images, '#f15929'),
        labelPoint(...antecedents, O),
        labelPoint(...images, '#f15929'),
      )

      for (let i = 0; i < 3; i++) {
        objetsCorrection.push(
          segment(antecedents[i], images[i], couleurs[i]),
          codageSegments('//', couleurs[i], O, antecedents[i], O, images[i]),
        )
        texte +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
          ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la symétrie de centre $O$.`
        if (context.isAmc) {
          enonceAmc +=
            (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
            ` Donner les coordonnées de l'image de $${lettre1[i]}$ par la symétrie de centre $O$.`
        }
        texteCorr +=
          (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
          ` $${lettre1[i]}'$, l'image de $${lettre1[i]}$ par la symétrie de centre $O$ a pour coordonnées $${miseEnEvidence(`(${texNombre(punto[i][0])};${texNombre(punto[i][1])})`)}$.<br>`
        texte += ajouteChampTexteMathLive(this, i, '')
        texte += '<br>'
        if (context.isAmc)
          setReponse(this, i, [
            `${punto[i][0]};${punto[i][1]}`,
            `(${punto[i][0]};${punto[i][1]})`,
          ])
        handleAnswers(this, i, {
          reponse: {
            value: [
              `${punto[i][0]};${punto[i][1]}`,
              `(${punto[i][0]};${punto[i][1]})`,
            ],
            options: { texteAvecCasse: true },
          },
        })

        if (context.isAmc) {
          enonceAmc += '<br>'
        }
      }
      objetsEnonce.push(
        repere({
          xMin: 0,
          yMin: 0,
          xMax: 20,
          yMax: 20,
          grilleOpacite: 0.2,
        }),
      )
      objetsCorrection.push(
        repere({
          xMin: 0,
          yMin: 0,
          xMax: 20,
          yMax: 20,
          grilleOpacite: 0.2,
        }),
      )
      if (context.isAmc) {
        this.autoCorrection.push({
          enonce:
            '\\begin{center}' +
            mathalea2d(
              Object.assign(
                {
                  pixelsParCm: 20,
                  scale: 0.45,
                  mainlevee: false,
                },
                fixeBordures(objetsEnonce),
              ),
              objetsEnonce,
            ) +
            '\\\\' +
            '\\end{center}' +
            enonceAmc,
          enonceAvant: false,
          enonceApresNumQuestion: true,
          options: { barreseparation: false },
          propositions: [
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: '',
                  statut: '',
                  multicolsBegin: true,
                  reponse: {
                    texte: numAlpha(0) + " Abscisse de l'image de A",
                    valeur: punto[0][0],
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0,
                    },
                  },
                },
              ],
            },
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: `A(${punto[0][0]};${punto[0][1]})`,
                  statut: '',
                  multicolsEnd: true,
                  reponse: {
                    texte: "Ordonnée de l'image de A",
                    valeur: punto[0][1],
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0,
                    },
                  },
                },
              ],
            },
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: '',
                  statut: '',
                  multicolsBegin: true,
                  reponse: {
                    texte: numAlpha(1) + " Abscisse de l'image de B",
                    valeur: punto[1][0],
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0,
                    },
                  },
                },
              ],
            },
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: `B(${punto[1][0]};${punto[1][1]})`,
                  statut: '',
                  multicolsEnd: true,
                  reponse: {
                    texte: "Ordonnée de l'image de B",
                    valeur: punto[1][1],
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0,
                    },
                  },
                },
              ],
            },
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: '',
                  statut: '',
                  multicolsBegin: true,
                  reponse: {
                    texte: numAlpha(2) + " Abscisse de l'image de C",
                    valeur: punto[2][0],
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0,
                    },
                  },
                },
              ],
            },
            {
              type: 'AMCNum',
              propositions: [
                {
                  texte: `C(${punto[2][0]};${punto[2][1]})`,
                  statut: '',
                  multicolsEnd: true,
                  reponse: {
                    texte: "Ordonnée de l'image de C",
                    valeur: punto[2][1],
                    param: {
                      digits: 1,
                      decimals: 0,
                      signe: true,
                      approx: 0,
                    },
                  },
                },
              ],
            },
          ],
        })
      }
      if (this.questionJamaisPosee(ee, xA, yA, xB, yB, xC, yC)) {
        this.listeQuestions[ee] =
          texte +
          '<br>' +
          mathalea2d(
            Object.assign(
              {
                pixelsParCm: 20,
                scale: 0.45,
                mainlevee: false,
              },
              fixeBordures(objetsEnonce),
            ),
            objetsEnonce,
          )
        this.listeCorrections[ee] =
          texteCorr +
          '<br>' +
          mathalea2d(
            Object.assign(
              {
                pixelsParCm: 20,
                scale: 0.45,
                mainlevee: false,
              },
              fixeBordures(objetsCorrection),
            ),
            objetsCorrection,
          )
        ee++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
