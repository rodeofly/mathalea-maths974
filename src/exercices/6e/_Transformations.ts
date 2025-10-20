import { codageAngleDroit } from '../../lib/2d/angles'
import { afficheMesureAngle, codageSegments } from '../../lib/2d/codages'
import {
  droiteHorizontaleParPoint,
  droiteParPointEtPente,
  droiteVerticaleParPoint,
} from '../../lib/2d/droites'
import { milieu, point, pointSurDroite, tracePoint } from '../../lib/2d/points'
import { segment, vecteur } from '../../lib/2d/segmentsVecteurs'
import {
  labelLatexPoint,
  latexParCoordonnees,
  texteParPositionEchelle,
} from '../../lib/2d/textes'
import { translation } from '../../lib/2d/transformations'
import {
  choice,
  combinaisonListes,
  compteOccurences,
  enleveElementBis,
  enleveElementNo,
} from '../../lib/outils/arrayOutils'
import { miseEnCouleur, miseEnEvidence } from '../../lib/outils/embellissements'
import { texFractionReduite } from '../../lib/outils/deprecatedFractions'
import { arrondi, rangeMinMax } from '../../lib/outils/nombres'
import { lettreDepuisChiffre, numAlpha } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import {
  imagePointParTransformation,
  type TransformationsIndex,
} from '../../modules/imagePointParTransformation'
import {
  assombrirOuEclaircir,
  colorToLatexOrHTML,
  mathalea2d,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import {
  egal,
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import Exercice from '../Exercice'

export const dateDeModifImportante = '11/04/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Transformations : trouver un point numéroté par une des transformations du plan. Fonction générale utilisée sur tous les niveaux
 * @author Jean-Claude Lhote
 */
export default class Transformations extends Exercice {
  can: boolean
  constructor() {
    super()
    this.can = false
    this.nbQuestions = 1
    this.besoinFormulaireTexte = [
      'Choix des transformations',
      'Choisir 3 nombres maximum, séparés par des tirets : \n 1 & 2 : Symétries obliques\n 3 & 4 : Symétries horizontales ou verticales\n 5 & 6 : Rotations de 90°\n 7 : Symétrie centrale\n 8 : Translation\n 9 : Homothéties k>1\n 10 : Homothéties k<1',
    ]
    this.sup = 1
  }

  nouvelleVersion() {
    const nbImages = this.can ? 1 : 3

    const choixTransformation = gestionnaireFormulaireTexte({
      max: 10,
      defaut: randint(1, 10),
      nbQuestions: this.nbQuestions * nbImages,
      saisie: this.sup,
      melange: 11,
    }).map(Number) as TransformationsIndex[]

    const O = point(0, 0, 'O', 'above right')
    const d1 = droiteParPointEtPente(O, 1)
    const d3 = droiteHorizontaleParPoint(O)
    const d2 = droiteParPointEtPente(O, -1)
    const d4 = droiteVerticaleParPoint(O)
    d1.epaisseur = 2
    d2.epaisseur = 2
    d3.epaisseur = 2
    d4.epaisseur = 2
    d1.opacite = 0.5
    d2.opacite = 0.5
    d3.opacite = 0.5
    d4.opacite = 0.5
    const couleurs = ['brown', 'green', 'blue', 'purple']

    const xO = 4
    const yO = 4
    const xuPossibles = combinaisonListes(rangeMinMax(-3, 3), 1)
    const yuPossibles = combinaisonListes(rangeMinMax(-3, 3), 1)

    for (
      let indiceQuestion = 0,
        texte,
        texteCorr,
        xu,
        yu,
        pointMLettre,
        pointM,
        pointN,
        numPointN,
        croix,
        aEviter,
        mauvaisAntecedents,
        longueurBoucle,
        objetsEnonce,
        objetsCorrection,
        cpt = 0;
      indiceQuestion < this.nbQuestions && cpt < 50;

    ) {
      texte = ''
      texteCorr = ''
      objetsEnonce = []
      objetsCorrection = []
      const antecedents = [0, 0, 0]
      const images = [0, 0, 0]
      const k = [1, 1, 1]
      const punto: number[][] = [[]]
      const n = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
      const M = []
      const N = []
      // Ci-dessous, on évite le point $O$ comme point et comme nom de point.
      const nomPointsTranslationDejaUtilises = [15]
      const pointsDejaUtilises = [44]
      aEviter = [44]
      mauvaisAntecedents = []
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          croix = tracePoint(point(j - 4, i - 4), 'gray')
          croix.taille = 2
          croix.style = 'x'
          croix.opacite = 1
          objetsEnonce.push(croix)
          objetsCorrection.push(
            tracePoint(point(j - 4, i - 4), assombrirOuEclaircir('gray', 50)),
          )
          objetsEnonce.push(
            texteParPositionEchelle(
              Number(j + 10 * i).toString(),
              j - 4.2,
              i - 4.2,
              0,
              'black',
              0.8,
              'milieu',
              false,
              0.8,
            ),
          )
          objetsCorrection.push(
            texteParPositionEchelle(
              Number(j + 10 * i).toString(),
              j - 4.2,
              i - 4.2,
              0,
              assombrirOuEclaircir('gray', 50),
              0.8,
              'milieu',
              false,
              0.8,
            ),
          )
        }
      }
      let puntoReseau // k : rapports d'homothéties, (xO,yO) point de rencontre des droites et centre, les composantes du vecteur de translation : (xu,yu)
      for (let j = 0; j < nbImages; j++) {
        xu = xuPossibles[j]
        if (xu === 0) {
          if (yuPossibles[j] === 0) {
            enleveElementNo(yuPossibles, j)
          }
        }
        yu = yuPossibles[j]
        if (choixTransformation[j] === 10) {
          k[j] = choice([2, 3, 4]) * randint(-1, 1, [0]) // rapport d'homothétie < 1 ( 0.5 ou 0.25 )
        } else if (choixTransformation[j] === 9) {
          k[j] = choice([1, 1.5, 2, 2.5, 3, 4, 5]) * randint(-1, 1, [0]) // rapport d'homothétie >=1 (1,2 ou 3)
        }
        mauvaisAntecedents = []
        antecedents[j] = randint(0, 99, pointsDejaUtilises)
        punto[j] = imagePointParTransformation(
          choixTransformation[j] as TransformationsIndex,
          [antecedents[j] % 10, Math.floor(antecedents[j] / 10)],
          [xO, yO],
          [xu, yu],
          k[j],
        )
        images[j] = punto[j][0] + punto[j][1] * 10
        // Limitation des points invariants
        if (choixTransformation[j] === 1 && images[j] % 11 === 0) {
          punto[j][0] = -1
        } // Point impossible sur (d1) pour sa symétrie
        if (choixTransformation[j] === 3 && Math.floor(images[j] / 10) === 4) {
          punto[j][0] = -1
        } // Point impossible sur (d3) pour sa symétrie
        if (choixTransformation[j] === 4 && images[j] % 10 === 4) {
          punto[j][0] = -1
        } // Point impossible sur (d4) pour sa symétrie

        // pour éviter les points en dehors des clous dans homothétie de rapport 1/k
        puntoReseau =
          egal(punto[j][0], Math.floor(punto[j][0]), 0.001) &&
          egal(punto[j][1], Math.floor(punto[j][1]), 0.001)
        // On vérifie que l'image est bien un point du réseau sinon, on change.
        mauvaisAntecedents = combinaisonListes(pointsDejaUtilises, 1)
        while (
          punto[j][0] < 0 ||
          punto[j][0] > 9 ||
          punto[j][1] < 0 ||
          punto[j][1] > 9 ||
          puntoReseau === false
        ) {
          mauvaisAntecedents.push(antecedents[j])
          antecedents[j] = randint(0, 99, mauvaisAntecedents)
          punto[j] = imagePointParTransformation(
            choixTransformation[j] as TransformationsIndex,
            [antecedents[j] % 10, Math.floor(antecedents[j] / 10)],
            [xO, yO],
            [xu, yu],
            k[j],
          )
          images[j] = arrondi(punto[j][0] + punto[j][1] * 10, 0)
          // Limitation des points invariants
          if (choixTransformation[j] === 1 && images[j] % 11 === 0) {
            punto[j][0] = -1
          } // Point impossible sur (d1) pour sa symétrie
          if (
            choixTransformation[j] === 3 &&
            Math.floor(images[j] / 10) === 4
          ) {
            punto[j][0] = -1
          } // Point impossible sur (d3) pour sa symétrie
          if (choixTransformation[j] === 4 && images[j] % 10 === 4) {
            punto[j][0] = -1
          } // Point impossible sur  (d4) pour sa symétrie

          // pour éviter les points en dehors des clous dans homothétie de rapport 1/k
          if (
            egal(punto[j][0], Math.floor(punto[j][0]), 0.001) &&
            egal(punto[j][1], Math.floor(punto[j][1]), 0.001)
          ) {
            puntoReseau = true
          } else {
            puntoReseau = false
          }
        }
        N[j] = point(
          arrondi(punto[j][0] - 4, 0),
          arrondi(punto[j][1] - 4, 0),
          'above left',
        )
        M[j] = point(
          (antecedents[j] % 10) - 4,
          Math.floor(antecedents[j] / 10 - 4),
          'above left',
        )
        pointsDejaUtilises.push(antecedents[j])
        pointsDejaUtilises.push(arrondi(punto[j][0] + 10 * punto[j][1], 0))
      }
      // n[i] est un tableau contenant -1 pour la transformation d'indice i si elle n'est pas utilisée, et contenant le numéro du point concerné si la transformation i est utilisée pour ce point.
      // Je l'utilise pour faire apparaître la correction liée au point et à la transformation.
      for (let j = 0; j < nbImages; j++) {
        n[choixTransformation[j] - 1] = antecedents[j]
      }
      const questionsAMC = ['', '', '']

      for (
        let i = 0, labO, labM, labN, traceAnt, traceIm, traceO, traceM, traceN;
        i < nbImages;
        i++
      ) {
        xu = xuPossibles[i]
        yu = yuPossibles[i]
        traceAnt = tracePoint(M[i])
        traceIm = tracePoint(N[i])
        traceAnt.epaisseur = 2
        traceAnt.opacite = 1
        traceIm.opacite = 1
        traceIm.epaisseur = 2
        traceIm.color = colorToLatexOrHTML('#f15929')
        traceO = tracePoint(O)
        traceO.epaisseur = 2
        traceO.opacite = 1
        labO = labelLatexPoint({
          points: [O],
          color: 'red',
          taille: 10,
          couleurDeRemplissage: 'none',
        })
        switch (choixTransformation[i]) {
          case 1:
            d1.color = colorToLatexOrHTML(
              context.isHtml ? couleurs[i] : 'black',
            )
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro du symétrique du point $${antecedents[i]}$ par rapport à la droite $(d_1)$.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro du symétrique du point $${antecedents[i]}$ par rapport à la droite $${miseEnCouleur('(d_1)', couleurs[i])}$.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Le symétrique du point $${antecedents[i]}$ par rapport à $${miseEnCouleur('(d_1)', couleurs[i])}$ est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(
              d1,
              traceAnt,
              latexParCoordonnees(
                '(d_1)',
                4.8,
                4.2,
                couleurs[i],
                20,
                10,
                '',
                12,
              ),
            )

            objetsCorrection.push(
              d1,
              traceAnt,
              traceIm,
              latexParCoordonnees(
                '(d_1)',
                4.8,
                4.2,
                couleurs[i],
                20,
                10,
                '',
                12,
              ),
              segment(M[i], N[i], couleurs[i]),
              codageSegments(
                'O',
                couleurs[i],
                M[i],
                milieu(M[i], N[i]),
                milieu(M[i], N[i]),
                N[i],
              ),
              codageAngleDroit(
                M[i],
                milieu(M[i], N[i]),
                pointSurDroite(d1, 1, ''),
                couleurs[i],
                0.4,
                1,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 2:
            d2.color = colorToLatexOrHTML(
              context.isHtml ? couleurs[i] : 'black',
            )
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro du symétrique du point $${antecedents[i]}$ par rapport à la droite $(d_2)$.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro du symétrique du point $${antecedents[i]}$ par rapport à la droite $${miseEnCouleur('(d_2)', couleurs[i])}$.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Le symétrique du point $${antecedents[i]}$ par rapport à $${miseEnCouleur('(d_2)', couleurs[i])}$ est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(
              d2,
              traceAnt,
              latexParCoordonnees(
                '(d_2)',
                4.3,
                -3.7,
                couleurs[i],
                20,
                10,
                '',
                12,
              ),
            )
            objetsCorrection.push(
              d2,
              traceAnt,
              traceIm,
              latexParCoordonnees(
                '(d_2)',
                4.3,
                -3.7,
                couleurs[i],
                15,
                10,
                '',
                12,
              ),
              segment(M[i], N[i], couleurs[i]),
              codageSegments(
                '||',
                couleurs[i],
                M[i],
                milieu(M[i], N[i]),
                milieu(M[i], N[i]),
                N[i],
              ),
              codageAngleDroit(
                M[i],
                milieu(M[i], N[i]),
                pointSurDroite(d2, 1, ''),
                couleurs[i],
                0.4,
                1,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 3:
            d3.color = colorToLatexOrHTML(
              context.isHtml ? couleurs[i] : 'black',
            )
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro du symétrique du point $${antecedents[i]}$ par rapport à la droite $(d_3)$.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro du symétrique du point $${antecedents[i]}$ par rapport à la droite $${miseEnCouleur('(d_3)', couleurs[i])}$.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Le symétrique du point $${antecedents[i]}$ par rapport à $${miseEnCouleur('(d_3)', couleurs[i])}$ est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(
              d3,
              traceAnt,
              latexParCoordonnees(
                '(d_3)',
                -4.2,
                0.3,
                couleurs[i],
                20,
                10,
                '',
                12,
              ),
            )
            objetsCorrection.push(
              d3,
              traceAnt,
              traceIm,
              latexParCoordonnees(
                '(d_3)',
                -4.2,
                0.3,
                couleurs[i],
                15,
                10,
                '',
                12,
              ),
              segment(M[i], N[i], couleurs[i]),
              codageSegments(
                '///',
                couleurs[i],
                M[i],
                milieu(M[i], N[i]),
                milieu(M[i], N[i]),
                N[i],
              ),
              codageAngleDroit(
                M[i],
                milieu(M[i], N[i]),
                pointSurDroite(d3, 1, ''),
                couleurs[i],
                0.4,
                1,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 4:
            d4.color = colorToLatexOrHTML(
              context.isHtml ? couleurs[i] : 'black',
            )
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro du symétrique du point $${antecedents[i]}$ par rapport à la droite $(d_4)$.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro du symétrique du point $${antecedents[i]}$ par rapport à la droite $${miseEnCouleur('(d_4)', couleurs[i])}$.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Le symétrique du point $${antecedents[i]}$ par rapport à $${miseEnCouleur('(d_4)', couleurs[i])}$ est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(
              d4,
              traceAnt,
              latexParCoordonnees(
                '(d_4)',
                0.2,
                4.5,
                couleurs[i],
                15,
                10,
                '',
                12,
              ),
            )
            objetsCorrection.push(
              d4,
              traceAnt,
              traceIm,
              latexParCoordonnees(
                '(d_4)',
                0.2,
                4.5,
                couleurs[i],
                20,
                10,
                '',
                12,
              ),
              segment(M[i], N[i], couleurs[i]),
              codageSegments(
                'OO',
                couleurs[i],
                M[i],
                milieu(M[i], N[i]),
                milieu(M[i], N[i]),
                N[i],
              ),
              codageAngleDroit(
                M[i],
                milieu(M[i], N[i]),
                pointSurDroite(d4, 1, ''),
                '#f15929',
                0.4,
                1,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 5:
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de  l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 90° dans le sens anti-horaire.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de  l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 90° dans le sens anti-horaire.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 90° dans le sens anti-horaire est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(traceAnt, traceO, labO)
            objetsCorrection.push(
              traceAnt,
              traceIm,
              traceO,
              labO,
              segment(M[i], O, couleurs[i]),
              segment(N[i], O, couleurs[i]),
              codageSegments('|||', couleurs[i], M[i], O, O, N[i]),
              afficheMesureAngle(M[i], O, N[i]),
              codageAngleDroit(M[i], O, N[i], couleurs[i], 0.4, 1),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 6:
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de  l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 90° dans le sens horaire.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de  l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 90° dans le sens horaire.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 90° dans le sens horaire est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(traceAnt, traceO, labO)
            objetsCorrection.push(
              traceAnt,
              traceIm,
              traceO,
              labO,
              segment(M[i], O, couleurs[i]),
              segment(N[i], O, couleurs[i]),
              codageSegments('////', 'red', M[i], O, O, N[i]),
              afficheMesureAngle(M[i], O, N[i]),
              codageAngleDroit(M[i], O, N[i], couleurs[i], 0.8, 1),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 7:
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par la symétrie de centre O.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par la symétrie de centre O.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par la symétrie de centre $O$ est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(traceAnt, traceO, labO)
            objetsCorrection.push(
              traceAnt,
              traceIm,
              traceO,
              labO,
              segment(M[i], O, couleurs[i]),
              segment(N[i], O, couleurs[i]),
              codageSegments('OOO', couleurs[i], M[i], O, O, N[i]),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 8:
            pointMLettre = randint(1, 26, nomPointsTranslationDejaUtilises)
            nomPointsTranslationDejaUtilises.push(pointMLettre)
            numPointN = randint(1, 26, nomPointsTranslationDejaUtilises)
            nomPointsTranslationDejaUtilises.push(numPointN)
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par la translation qui transforme ${lettreDepuisChiffre(pointMLettre)} en ${lettreDepuisChiffre(numPointN)}.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par la translation qui transforme ${lettreDepuisChiffre(pointMLettre)} en ${lettreDepuisChiffre(numPointN)}.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par la translation qui transforme ${lettreDepuisChiffre(pointMLettre)} en ${lettreDepuisChiffre(numPointN)} est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            aEviter = enleveElementBis(pointsDejaUtilises)
            longueurBoucle = pointsDejaUtilises.length
            for (let kk = 0; kk < longueurBoucle; kk++) {
              aEviter.push(pointsDejaUtilises[kk] - xu - 10 * yu)
            }
            pointM = point(
              randint(-1, 2, [M[i].x, 0]),
              randint(-1, 2, [M[i].y, 0]),
              lettreDepuisChiffre(pointMLettre),
              'above right',
            )
            while (
              compteOccurences(aEviter, 44 + pointM.x + 10 * pointM.y) !== 0
            ) {
              pointM = point(
                randint(-1, 2, [M[i].x, 0]),
                randint(-1, 2, [M[i].y, 0]),
                lettreDepuisChiffre(pointMLettre),
                'above right',
              )
            }
            pointN = translation(
              pointM,
              vecteur(xu, yu),
              lettreDepuisChiffre(numPointN),
              'above right',
            )
            traceM = tracePoint(pointM)
            traceN = tracePoint(pointN)
            traceM.epaisseur = 1
            traceN.epaisseur = 1
            labM = labelLatexPoint({
              points: [pointM],
              color: couleurs[i],
              taille: 8,
              couleurDeRemplissage: 'none',
            })
            labN = labelLatexPoint({
              points: [pointN],
              color: couleurs[i],
              taille: 8,
              couleurDeRemplissage: 'none',
            })
            pointsDejaUtilises.push(44 + pointM.x + 10 * pointM.y)
            pointsDejaUtilises.push(44 + pointN.x + 10 * pointN.y)
            objetsEnonce.push(traceAnt, traceM, traceN, labM, labN)
            objetsCorrection.push(
              vecteur(M[i], N[i]).representant(M[i], couleurs[i]),
              vecteur(M[i], N[i]).representant(pointM, couleurs[i]),
              traceAnt,
              traceIm,
              traceM,
              traceN,
              labM,
              labN,
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 9:
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par l'homothétie de centre $O$ et de rapport $${texNombre(k[i])}$.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par l'homothétie de centre $O$ et de rapport $${texNombre(k[i])}$.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par l'homothétie de centre $O$ et de rapport $${texNombre(k[i])}$ est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(traceAnt, traceO, labO)
            objetsCorrection.push(
              traceAnt,
              traceIm,
              traceO,
              labO,
              segment(M[i], O, couleurs[i]),
              segment(N[i], O, couleurs[i]),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 10:
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par l'homothétie de centre $O$ et de rapport $${texFractionReduite(
                1,
                k[i],
              )}$.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par l'homothétie de centre $O$ et de rapport $${texFractionReduite(
                1,
                k[i],
              )}$.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par l'homothétie de centre $O$ et de rapport $${texFractionReduite(
                1,
                k[i],
              )}$ est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(traceAnt, traceO, labO)
            objetsCorrection.push(
              traceAnt,
              traceIm,
              traceO,
              labO,
              segment(M[i], O, couleurs[i]),
              segment(N[i], O, couleurs[i]),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                Number(punto[i][0] + 10 * punto[i][1]).toString(),
                punto[i][0] - 4.2,
                punto[i][1] - 4.2,
                0,
                '#f15929',
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            objetsCorrection.push(
              texteParPositionEchelle(
                antecedents[i].toString(),
                (antecedents[i] % 10) - 4.2,
                Math.floor(antecedents[i] / 10) - 4.2,
                0,
                couleurs[i],
                1,
                'milieu',
                false,
                0.8,
              ),
            )
            break

          case 11:
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de  l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 60° dans le sens anti-horaire.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 60° dans le sens anti-horaire.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 60° dans le sens anti-horaire est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(traceAnt, traceO, labO)
            objetsCorrection.push(
              traceAnt,
              traceIm,
              traceO,
              labO,
              segment(M[i], O, 'blue'),
              segment(N[i], O, 'blue'),
              codageSegments('||', 'red', M[i], O, O, N[i]),
              afficheMesureAngle(M[i], O, N[i]),
            )
            break

          case 12:
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de  l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 60° dans le sens horaire.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 60° dans le sens horaire.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 60° dans le sens horaire est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(traceAnt, traceO, labO)
            objetsCorrection.push(
              traceAnt,
              traceIm,
              traceO,
              labO,
              segment(M[i], O, 'blue'),
              segment(N[i], O, 'blue'),
              codageSegments('||', 'red', M[i], O, O, N[i]),
              afficheMesureAngle(M[i], O, N[i]),
            )
            break

          case 13:
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de  l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 120° dans le sens anti-horaire.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 120° dans le sens anti-horaire.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 120° dans le sens anti-horaire est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(traceAnt, traceO, labO)
            objetsCorrection.push(
              traceAnt,
              traceIm,
              traceO,
              labO,
              segment(M[i], O, 'blue'),
              segment(N[i], O, 'blue'),
              codageSegments('||', 'red', M[i], O, O, N[i]),
              afficheMesureAngle(M[i], O, N[i]),
            )
            break

          case 14:
            questionsAMC[i] =
              numAlpha(i) +
              ` Donner le numéro de  l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 120° dans le sens horaire.`
            texte +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` Donner le numéro de l'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 120° dans le sens horaire.<br>`
            texteCorr +=
              (i === 0 ? numAlpha(i) : '<br>' + numAlpha(i)) +
              ` L'image du point $${antecedents[i]}$ par la rotation de centre $O$ et d'angle 120° dans le sens horaire est le point $${miseEnEvidence(String(images[i]))}$.<br>`
            objetsEnonce.push(traceAnt, traceO, labO)
            objetsCorrection.push(
              traceAnt,
              traceIm,
              traceO,
              labO,
              segment(M[i], O, 'blue'),
              segment(N[i], O, 'blue'),
              codageSegments('||', 'red', M[i], O, O, N[i]),
              afficheMesureAngle(M[i], O, N[i]),
            )
            break
        }
        if (this.can) {
          texte = texte.replaceAll(numAlpha(0), '')
          texteCorr = texteCorr.replaceAll(numAlpha(0), '')
        }

        handleAnswers(this, indiceQuestion * nbImages + i, {
          reponse: { value: String(images[i]) },
        })
        texte += ajouteChampTexteMathLive(
          this,
          indiceQuestion * nbImages + i,
          '',
        )
      }
      const graphique = mathalea2d(
        {
          xmin: -4.5,
          ymin: -4.5,
          xmax: 5.8,
          ymax: 5.3,
          pixelsParCm: 40,
          scale: 0.8,
          optionsTikz: ['every node/.style={scale=0.6}'],
          mainlevee: false,
        },
        objetsEnonce,
      )
      texte += '<br>' + graphique
      texteCorr +=
        '<br>' +
        mathalea2d(
          {
            xmin: -4.5,
            ymin: -4.5,
            xmax: 5.8,
            ymax: 5.3,
            pixelsParCm: 40,
            scale: 0.8,
            optionsTikz: ['every node/.style={scale=0.6}'],
            mainlevee: false,
          },
          objetsCorrection,
        )

      if (context.isAmc) {
        if (this.can) {
          this.autoCorrection[0] = {
            enonce: texte,
            enonceAGauche: [0.5, 0.5],
            propositions: [
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: texteCorr,
                    statut: '',
                    reponse: {
                      texte: numAlpha(0),
                      valeur: images[0],
                      param: {
                        digits: 2,
                        decimals: 0,
                        signe: false,
                        approx: 0,
                      },
                    },
                  },
                ],
              },
            ],
          }
        } else {
          this.autoCorrection[0] = {
            enonce: '<br>\\begin{center}' + graphique + '\\end{center}',
            enonceAvant: false,
            enonceApresNumQuestion: true,
            options: { barreseparation: true },
            propositions: [
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: texteCorr,
                    statut: '',
                    multicolsBegin: true,
                    reponse: {
                      texte: questionsAMC[0],
                      valeur: images[0],
                      alignement: 'center',
                      param: {
                        digits: 2,
                        decimals: 0,
                        signe: false,
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
                    reponse: {
                      texte: questionsAMC[1],
                      valeur: images[1],
                      alignement: 'center',
                      param: {
                        digits: 2,
                        decimals: 0,
                        signe: false,
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
                    multicolsEnd: true,
                    reponse: {
                      texte: questionsAMC[2],
                      valeur: images[2],
                      alignement: 'center',
                      param: {
                        digits: 2,
                        decimals: 0,
                        signe: false,
                        approx: 0,
                      },
                    },
                  },
                ],
              },
            ],
          }
        }
      }

      if (
        this.questionJamaisPosee(
          indiceQuestion,
          antecedents.map(String).join(''),
        )
      ) {
        this.listeQuestions[indiceQuestion] = texte
        this.listeCorrections[indiceQuestion] = texteCorr

        if (!context.isHtml) {
          this.canEnonce = this.listeQuestions[0]
          this.correction = this.listeCorrections[0]
          this.canReponseACompleter = ''
        }
        indiceQuestion++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
