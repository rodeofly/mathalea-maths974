import { codageAngle } from '../../lib/2d/angles'
import { codageSegment } from '../../lib/2d/codages'
import { milieu, point } from '../../lib/2d/points'
import { nommePolygone, polygone } from '../../lib/2d/polygones'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { latexParPoint } from '../../lib/2d/textes'
import { propositionsQcm } from '../../lib/interactif/qcm'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import { creerNomDePolygone } from '../../lib/outils/outilString'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { listeQuestionsToContenu } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre =
  "Reconnaitre un parallélogramme à partir du codage d'une figure"
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'
export const dateDePublication = '05/04/2021'
export const dateDeModifImportante = '18/04/2024'
/**
 * On doit justifier qu'un quadrilatère est un parallélogramme en citant la bonne propriété
 * @author Rémi Angot
 * Ajout de la possibilité de choisir le nombre de questions par Guillaume Valmont le 08/05/2022
 */
export const uuid = '588fe'

export const refs = {
  'fr-fr': ['5G40-2', '3AutoG02-2'],
  'fr-ch': ['9ES2-2'],
}
export default class ParallelogrammeAPartirDUneFigure extends Exercice {
  constructor() {
    super()

    this.nbCols = 2 // Uniquement pour la sortie LaTeX

    this.nbQuestions = 4
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions === 1
        ? 'Pour la figure suivante, tracée '
        : 'Pour chacune des figures suivantes, tracées '
    this.consigne += "à main levée, préciser s'il s'agit d'un parallélogramme."
    const A = point(0, 0)
    const B = point(5, 0)
    const C = point(6.5, -3)
    const D = point(1.5, -3)
    const O = milieu(A, C)
    O.nom = 'O'
    const p = polygone(A, B, C, D)
    const sAC = segment(A, C)
    sAC.pointilles = 5
    const sBD = segment(B, D)
    sBD.pointilles = 5
    const sABcodage = codageSegment(A, B, 'X', 'blue', 1.5)
    const sCDcodage = codageSegment(C, D, 'X', 'blue', 1.5)
    const sADcodage = codageSegment(A, D, 'O', 'blue', 1.5)
    const sBCcodage = codageSegment(B, C, 'O', 'blue', 1.5)
    const sAOcodage = codageSegment(A, O, '|', 'blue', 1.5)
    const sCOcodage = codageSegment(O, C, '|', 'blue', 1.5)
    const sBOcodage = codageSegment(B, O, '||', 'blue', 1.5)
    const sDOcodage = codageSegment(O, D, '||', 'blue', 1.5)
    const aDABcodage = codageAngle(D, A, B, 0.8, '|', 'black', 1, 1)
    aDABcodage.echelleMark = 5
    const aBCDcodage = codageAngle(B, C, D, 0.8, '|', 'black', 1, 1)
    const aABCcodage = codageAngle(A, B, C, 0.8, '|||', 'black', 1, 1)
    const aCDAcodage = codageAngle(C, D, A, 0.8, '|||', 'black', 1, 1)
    const sAB = segment(A, B, 'blue')
    const sBC = segment(B, C, 'green')
    const sCD = segment(C, D, 'blue')
    const sAD = segment(A, D, 'green')
    sAB.epaisseur = 3
    sCD.epaisseur = 3
    sBC.epaisseur = 3
    sAD.epaisseur = 3

    let M1, N1, O1, P1, p1, s1, s2, s3, s4

    const paramsEnonce = {
      xmin: -1,
      ymin: -4,
      xmax: 7.5,
      ymax: 0.8,
      pixelsParCm: 20,
      scale: 0.5,
      mainlevee: true,
      amplitude: 0.5,
    }

    let nomsDejaUtilises: string[]
    let nom
    function gestionNom(i: number) {
      if (i % 4 === 0) nomsDejaUtilises = ['OQD']
      nom = creerNomDePolygone(4, nomsDejaUtilises)
      nomsDejaUtilises.push(nom)
      A.nom = nom[0]
      B.nom = nom[1]
      C.nom = nom[2]
      D.nom = nom[3]
      return nom
    }

    const typeQuestionsDisponibles = [
      'cotesOpposesMemeLongueur',
      'cotesConsecutifsMemeLongueur',
      'diagonalesMemeLongueur',
      '2cotesOpposesMemeLongueur',
      '2cotesOpposesMemeLongueurv2',
      '2cotesOpposesMemeLongueurEtParallele',
      '2cotesOpposesMemeLongueurEtParallelev2',
      '2cotesOpposesEtParalleles',
      'anglesOpposesEgaux',
    ] // On créé 3 types de questions
    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // Boucle principale où i+1 correspond au numéro de la question
      let estUnParallegramme = false
      estUnParallegramme ||=
        listeTypeQuestions[i] === 'cotesOpposesMemeLongueur'
      estUnParallegramme ||= listeTypeQuestions[i] === 'diagonalesMemeLongueur'
      estUnParallegramme ||=
        listeTypeQuestions[i] === '2cotesOpposesMemeLongueurEtParallele'
      estUnParallegramme ||=
        listeTypeQuestions[i] === '2cotesOpposesMemeLongueurEtParallelev2'
      estUnParallegramme ||= listeTypeQuestions[i] === 'anglesOpposesEgaux'
      switch (
        listeTypeQuestions[i] // Suivant le type de question, le contenu sera différent
      ) {
        case 'cotesOpposesMemeLongueur':
          nom = gestionNom(i)
          texte = mathalea2d(paramsEnonce, [
            p,
            sABcodage,
            sBCcodage,
            sCDcodage,
            sADcodage,
            nommePolygone(p, nom),
          ])
          texteCorr = `On sait que $${A.nom + B.nom} = ${C.nom + D.nom}$ et $${B.nom + C.nom} = ${D.nom + A.nom}$.`
          texteCorr +=
            "<br>Or, « si un quadrilatère a ses côtés opposés de même longueur, alors c'est un parallélogramme »."
          texteCorr += `<br>Donc $${miseEnEvidence(nom)}$ ${texteEnCouleurEtGras('est un parallélogramme')}.`
          break
        case 'cotesConsecutifsMemeLongueur':
          nom = gestionNom(i)
          texte = mathalea2d(paramsEnonce, [
            p,
            codageSegment(A, B, 'X', 'blue'),
            codageSegment(B, C, 'X', 'blue'),
            codageSegment(C, D, '||', 'blue'),
            codageSegment(D, A, '||', 'blue'),
            nommePolygone(p, nom),
          ])
          texteCorr = `Les côtés consécutifs de $${nom}$ sont de même longueur deux par deux, $${miseEnEvidence(nom)}$ ${texteEnCouleurEtGras("n'est donc pas forcément un parallélogramme")} comme le montre le contre-exemple suivant (il s'agit d'un cerf-volant).`
          // Cerf-volant
          M1 = point(0, 0)
          N1 = point(-1, -2)
          O1 = point(0, -6)
          P1 = point(1, -2)
          p1 = polygone(M1, N1, O1, P1)
          s1 = codageSegment(M1, N1, 'X', 'blue')
          s2 = codageSegment(M1, P1, 'X', 'blue')
          s3 = codageSegment(O1, P1, 'O', 'blue')
          s4 = codageSegment(O1, N1, 'O', 'blue')
          texteCorr +=
            '<br>' +
            mathalea2d(
              {
                xmin: -1.5,
                ymin: -6.5,
                xmax: 1.5,
                ymax: 0.5,
                pixelsParCm: 20,
                scale: 1,
              },
              [nommePolygone(p1, nom), p1, s1, s2, s3, s4],
            )
          break
        case 'diagonalesMemeLongueur':
          nom = gestionNom(i)
          texte = mathalea2d(paramsEnonce, [
            p,
            sAOcodage,
            sBOcodage,
            sCOcodage,
            sDOcodage,
            sAC,
            sBD,
            nommePolygone(p, nom),
            latexParPoint('O', O, 'black', 200, 12, ''),
          ])
          texteCorr = `On sait que $${A.nom + 'O'} = ${'O' + C.nom}$ et $${B.nom + 'O'} = ${'O' + D.nom}$.`
          texteCorr +=
            "<br>Or, « si un quadrilatère a ses diagonales qui se coupent en leur milieu, alors c'est un parallélogramme »."
          texteCorr += `<br>Donc $${miseEnEvidence(nom)}$ ${texteEnCouleurEtGras('est un parallélogramme')}.`
          break
        case '2cotesOpposesMemeLongueur':
          nom = gestionNom(i)
          texte = mathalea2d(paramsEnonce, [
            p,
            sABcodage,
            sCDcodage,
            nommePolygone(p, nom),
          ])
          // Contre-Exemple
          M1 = point(0, 0)
          N1 = point(5, 0)
          O1 = point(-1, -6)
          P1 = point(-1, -1)
          p1 = polygone(M1, N1, O1, P1)
          s1 = codageSegment(M1, N1, 'X', 'blue')
          s2 = codageSegment(O1, P1, 'X', 'blue')
          texteCorr = `Seulement deux côtés opposés sont de même longueur, $${miseEnEvidence(nom)}$ ${texteEnCouleurEtGras("n'est donc pas forcément un parallélogramme")} comme le montre le contre-exemple suivant.`
          // texteCorr += '<br>' + mathalea2d({ xmin: -1.5, ymin: -6.5, xmax: 1.5, ymax: 0.5, pixelsParCm: 20, scale: 1 }, [p1, s1, s2, s3, s4])
          texteCorr +=
            '<br>' +
            mathalea2d(
              Object.assign(fixeBordures([nommePolygone(p1, nom), p1, s1, s2])),
              [nommePolygone(p1, nom), p1, s1, s2],
            )
          break
        case '2cotesOpposesMemeLongueurv2':
          nom = gestionNom(i)
          texte = mathalea2d(paramsEnonce, [
            p,
            sBCcodage,
            sADcodage,
            nommePolygone(p, nom),
          ])
          // Contre-Exemple
          M1 = point(0, 0)
          N1 = point(5, 0)
          O1 = point(6, -4)
          P1 = point(-1, -4)
          p1 = polygone(M1, N1, O1, P1)
          s1 = codageSegment(O1, N1, 'O', 'blue')
          s2 = codageSegment(M1, P1, 'O', 'blue')
          texteCorr = `Seulement deux côtés opposés sont de même longueur, $${miseEnEvidence(nom)}$ ${texteEnCouleurEtGras("n'est donc pas forcément un parallélogramme")} comme le montre le contre-exemple suivant.`
          texteCorr +=
            '<br>' +
            mathalea2d(
              Object.assign(fixeBordures([nommePolygone(p1, nom), p1, s1, s2])),
              [nommePolygone(p1, nom), p1, s1, s2],
            )
          break
        case '2cotesOpposesMemeLongueurEtParallele':
          nom = gestionNom(i)
          texte =
            mathalea2d(paramsEnonce, [
              p,
              sAB,
              sCD,
              sABcodage,
              sCDcodage,
              nommePolygone(p, nom),
            ]) + `$(${A.nom + B.nom}) // (${C.nom + D.nom})$`
          texteCorr = `On sait que $${A.nom + B.nom} = ${C.nom + D.nom}$ et $(${A.nom + B.nom}) // (${C.nom + D.nom})$.`
          texteCorr +=
            "<br>Or, « si un quadrilatère a deux côtés opposés parallèles et de même longueur, alors c'est un parallélogramme »."
          texteCorr += `<br>Donc $${miseEnEvidence(nom)}$ ${texteEnCouleurEtGras('est un parallélogramme')}.`
          break
        case '2cotesOpposesMemeLongueurEtParallelev2':
          nom = gestionNom(i)
          texte =
            mathalea2d(paramsEnonce, [
              p,
              sBC,
              sAD,
              sBCcodage,
              sADcodage,
              nommePolygone(p, nom),
            ]) + `$(${B.nom + C.nom}) // (${A.nom + D.nom})$`
          texteCorr = `On sait que $${B.nom + C.nom} = ${A.nom + D.nom}$ et $(${B.nom + C.nom}) // (${A.nom + D.nom})$.`
          texteCorr +=
            "<br>Or, « si un quadrilatère a deux côtés opposés parallèles et de même longueur, alors c'est un parallélogramme »."
          texteCorr += `<br>Donc $${miseEnEvidence(nom)}$ ${texteEnCouleurEtGras('est un parallélogramme')}.`
          break
        case '2cotesOpposesEtParalleles':
          nom = gestionNom(i)
          texte =
            mathalea2d(paramsEnonce, [p, sAB, sCD, nommePolygone(p, nom)]) +
            `$(${A.nom + B.nom}) // (${C.nom + D.nom})$`
          // Contre-Exemple
          M1 = point(0, 0)
          N1 = point(5, 0)
          O1 = point(8, -4)
          P1 = point(-1, -4)
          p1 = polygone(M1, N1, O1, P1)
          s1 = segment(O1, P1, 'blue')
          s2 = segment(M1, N1, 'blue')
          s1.epaisseur = 3
          s2.epaisseur = 3
          texteCorr = `$${nom}$ a deux côtés opposés parallèles, $${miseEnEvidence(nom)}$ ${texteEnCouleurEtGras("n'est donc pas forcément un parallélogramme")} comme le montre le contre-exemple suivant (il s'agit d'un trapèze).`
          texteCorr +=
            '<br>' +
            mathalea2d(
              Object.assign(fixeBordures([nommePolygone(p1, nom), p1, s1, s2])),
              [nommePolygone(p1, nom), p1, s1, s2],
            )
          break
        case 'anglesOpposesEgaux':
        default:
          nom = gestionNom(i)
          texte = mathalea2d(paramsEnonce, [
            p,
            nommePolygone(p, nom),
            aABCcodage,
            aBCDcodage,
            aCDAcodage,
            aDABcodage,
          ])
          texteCorr = `On sait que $\\widehat{${A.nom + B.nom + C.nom}} = \\widehat{${C.nom + D.nom + A.nom}}$ et $\\widehat{${B.nom + C.nom + D.nom}} = \\widehat{${D.nom + A.nom + B.nom}}$.`
          texteCorr +=
            "<br>Or, « si un quadrilatère a ses angles opposés égaux, alors c'est un parallélogramme »."
          texteCorr += `<br>Donc $${miseEnEvidence(nom)}$ ${texteEnCouleurEtGras('est un parallélogramme')}.`
          break
      }
      this.autoCorrection[i] = {}
      this.autoCorrection[i].options = { ordered: true }
      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: "Il s'agit d'un parallélogramme",
          statut: estUnParallegramme,
        },
        {
          texte: "Il ne s'agit pas d'un parallélogramme",
          statut: !estUnParallegramme,
        },
      ]
      const props = propositionsQcm(this, i)
      if (this.interactif) {
        texte += props.texte
      }
      if (this.questionJamaisPosee(i, texteCorr)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté', 2,'1 : Facile\n2 : Difficile'];
}
