import { codageAngleDroit } from '../../lib/2d/angles'
import { afficheMesureAngle, texteSurSegment } from '../../lib/2d/codages'
import { droite } from '../../lib/2d/droites'
import { point, pointSurSegment } from '../../lib/2d/points'
import { nommePolygone, polygone } from '../../lib/2d/polygones'
import { longueur, segment } from '../../lib/2d/segmentsVecteurs'
import { texteParPoint } from '../../lib/2d/textes'
import {
  projectionOrtho,
  rotation,
  similitude,
} from '../../lib/2d/transformations'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { remplisLesBlancs } from '../../lib/interactif/questionMathLive'
import { enleveDoublonNum, shuffleLettres } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { creerNomDePolygone, numAlpha } from '../../lib/outils/outilString'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre =
  "Exprimer le cosinus, le sinus ou la tangente d'un angle en fonction des côtés du triangle"
export const amcReady = true
export const amcType = 'AMCHybride'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '16/01/2021'
export const dateDeModifImportante = '03/03/2025'
/**
 * @author Rémi Angot
 * Donner un rapport trigonométrique en fonction des longueurs des côtés (pas de valeurs numériques)
 * * Donner les 3 rapports d'un angle
 * * Un triangle est donné, on demande les 6 rapports
 * * Un triangle rectangle et une hauteur, il faut exprimer un rapport de deux manières différentes
 * Rendu interactif et AMC par EE (Mars 2022)
 * Passage en remplisLesBlancs par EE (Mars 2025)
 */
export const uuid = '0d1f7'

export const refs = {
  'fr-fr': ['3G30-1'],
  'fr-ch': ['1mT-12'],
}
export default class ExprimerCosSinTan extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Type de questions',
      3,
      '1 : Donner jusque 3 rapports trigonométriques\n2 : Donner jusque 6 rapports trigonométriques\n3 : Deux triangles imbriqués, donner un rapport de deux manières différentes',
    ]
    this.besoinFormulaire2Texte = [
      'Rapports trigonométriques',
      'Nombres séparés par des tirets : \n1 : Cosinus\n2 : Sinus\n3 : Tangente\n4 : Les trois',
    ]

    this.nbQuestions = 1

    this.sup = 1
    this.sup2 = '4'
    if (context.isHtml) {
      this.spacing = 3
      this.spacingCorr = 3
    } else {
      this.spacing = 2
      this.spacingCorr = 2
    }
  }

  nouvelleVersion() {
    let fonctionsTrigonometriques = gestionnaireFormulaireTexte({
      saisie: this.sup2,
      min: 1,
      max: 3,
      defaut: 4,
      melange: 4,
      nbQuestions: 3,
    }).map(Number)

    fonctionsTrigonometriques = enleveDoublonNum(fonctionsTrigonometriques)
    const nomFonctionsTrigonometriques = ['', '\\cos', '\\sin', '\\tan']
    for (let i = 0; i < this.nbQuestions; i++) {
      let texte = ''
      let texteCorr = ''
      const objetsEnonce = []
      const objetsCorrection = []
      const propositionsAMC = []
      let texteInit
      const a = point(0, 0)
      let b = point(0, 0)
      let c = point(0, 0)
      while (longueur(a, b) < 4.3 || longueur(a, c) < 4.3) {
        // Pour éviter que la zone de texte sur les segments dans la correction superposent des points
        b = point(randint(3, 7), 0)
        c = similitude(b, a, 90, randint(3, 7) / longueur(a, b))
      }
      const angleRot = randint(0, 360)
      const p1 = polygone(a, b, c)
      const p2 = rotation(p1, a, angleRot)
      const A = p2.listePoints[0]
      const B = p2.listePoints[1]
      const C = p2.listePoints[2]
      const codage = codageAngleDroit(B, A, C)
      let nom = creerNomDePolygone(4, ['DQJ']) // J est enlevé car à côté du I, difficile de faire la différence
      nom = shuffleLettres(nom)

      // const nom = ['A', 'B', 'C', 'H'] // Pratique pour le débuggage
      A.nom = nom[0]
      B.nom = nom[1]
      C.nom = nom[2]
      const nomme = nommePolygone(p2, nom)
      const t1 = texteSurSegment('hypoténuse', C, B)
      let t2, t3, t22, t32, codageAngle, codageAngle2
      if (context.isHtml) {
        t2 = texteSurSegment('adjacent à ⍺', B, A)
        t3 = texteSurSegment('opposé à ⍺', A, C)
        t22 = texteSurSegment('opposé à 𝛽', B, A)
        t32 = texteSurSegment('adjacent à 𝛽', A, C)
        codageAngle = afficheMesureAngle(A, B, C, 'red', 1.5, '\\alpha')
        codageAngle2 = afficheMesureAngle(A, C, B, 'red', 1.5, '\\beta')
      } else {
        t2 = texteSurSegment('adjacent à $\\alpha$', B, A)
        t3 = texteSurSegment('opposé à $\\alpha$', A, C)
        t22 = texteSurSegment('opposé à $\\beta$', B, A)
        t32 = texteSurSegment('adjacent à $\\beta$', A, C)
        codageAngle = afficheMesureAngle(A, B, C, 'red', 1.5, '\\alpha')
        codageAngle2 = afficheMesureAngle(A, C, B, 'red', 1.5, '\\beta')
      }
      const hypo = segment(C, B, 'blue')
      hypo.epaisseur = 2
      codageAngle.epaisseur = 3
      codageAngle2.epaisseur = 3
      const d = droite(B, C)
      d.isVisible = false
      const H = projectionOrtho(A, d)
      const pointNomH = pointSurSegment(H, A, -0.5)
      const codage2 = codageAngleDroit(A, H, B)
      H.nom = nom[3]
      // const t4 = texteParPoint(`$${H.nom}$`, pointNomH, 1, 'milieu', true)
      const t4 = texteParPoint(
        `$${H.nom}$`,
        pointNomH,
        0,
        'black',
        1,
        'milieu',
        true,
      )
      const sAH = segment(A, H)
      const t13 = texteSurSegment('hypoténuse', B, A)
      let t23
      let t33
      if (context.isHtml) {
        t23 = texteSurSegment('opposé à ⍺', A, H)
        t33 = texteSurSegment('adjacent à ⍺', H, B)
      } else {
        t23 = texteSurSegment('opposé à $\\alpha$', A, H)
        t33 = texteSurSegment('adjacent à $\\alpha$', H, B)
      }
      const hypo3 = segment(A, B, 'blue')
      hypo3.epaisseur = 2

      objetsEnonce.push(p2, codage, nomme)
      objetsCorrection.push(p2, codage, nomme, t1, t2, t3, hypo, codageAngle)

      if (this.sup === 3) {
        objetsEnonce.push(sAH, t4, codage2)
      }

      const paramsEnonce = Object.assign(
        {},
        fixeBordures([A, B, C], {
          rxmin: -1,
          rxmax: 1,
          rymin: -1,
          rymax: 1,
        }),
        { scale: 0.5, pixelsParCm: 20, mainlevee: false },
      )
      const paramsCorrection = Object.assign(
        {},
        fixeBordures([A, B, C], {
          rxmin: -1,
          rxmax: 1,
          rymin: -1,
          rymax: 1,
        }),
        {
          scale: 0.5,
          pixelsParCm: 20,
          mainlevee: false,
        },
      )
      if (!context.isHtml && !context.isAmc) {
        texte += '\\begin{minipage}{.4\\linewidth}\n'
      }
      texte += mathalea2d(paramsEnonce, objetsEnonce) + '<br>'
      if (!context.isHtml && !context.isAmc) {
        texte += '\n\\end{minipage}\n'
        texte += '\\begin{minipage}{.6\\linewidth}\n'
      }
      const correctionTrigoRLB = [
        [], // RLB pour Remplis les Blancs
        [
          // cosinus angle et sinus de son complémentaire
          [`${A.nom + B.nom}`, `${B.nom + A.nom}`],
          [`${C.nom + B.nom}`, `${B.nom + C.nom}`],
        ],
        [
          // sinus angle et cosinus de son complémentaire
          [`${A.nom + C.nom}`, `${C.nom + A.nom}`],
          [`${C.nom + B.nom}`, `${B.nom + C.nom}`],
        ],
        [
          // tangente angle
          [`${A.nom + C.nom}`, `${C.nom + A.nom}`],
          [`${A.nom + B.nom}`, `${B.nom + A.nom}`],
        ],
        [
          // tangente angle complémentaire
          [`${A.nom + B.nom}`, `${B.nom + A.nom}`],
          [`${C.nom + A.nom}`, `${A.nom + C.nom}`],
        ],
      ]

      const correctionTrigo = [
        [],
        [
          // cosinus angle et sinus de son complémentaire
          `\\dfrac{${A.nom + B.nom}}{${B.nom + C.nom}}`,
          `\\dfrac{${B.nom + A.nom}}{${B.nom + C.nom}}`,
          `\\dfrac{${A.nom + B.nom}}{${C.nom + B.nom}}`,
          `\\dfrac{${B.nom + A.nom}}{${C.nom + B.nom}}`,
        ],
        [
          // sinus angle et cosinus de son complémentaire
          `\\dfrac{${A.nom + C.nom}}{${B.nom + C.nom}}`,
          `\\dfrac{${C.nom + A.nom}}{${B.nom + C.nom}}`,
          `\\dfrac{${A.nom + C.nom}}{${C.nom + B.nom}}`,
          `\\dfrac{${C.nom + A.nom}}{${C.nom + B.nom}}`,
        ],
        [
          // tangente angle
          `\\dfrac{${A.nom + C.nom}}{${A.nom + B.nom}}`,
          `\\dfrac{${A.nom + C.nom}}{${B.nom + A.nom}}`,
          `\\dfrac{${C.nom + A.nom}}{${A.nom + B.nom}}`,
          `\\dfrac{${C.nom + A.nom}}{${B.nom + A.nom}}`,
        ],
        [
          // tangente angle complémentaire
          `\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}`,
          `\\dfrac{${B.nom + A.nom}}{${A.nom + C.nom}}`,
          `\\dfrac{${A.nom + B.nom}}{${C.nom + A.nom}}`,
          `\\dfrac{${B.nom + A.nom}}{${C.nom + A.nom}}`,
        ],
      ]

      const correctionTrigoPointH = [
        [],
        [
          // cosinus angle et sinus de son complémentaire
          `\\dfrac{${B.nom + H.nom}}{${A.nom + B.nom}}`,
          `\\dfrac{${B.nom + H.nom}}{${B.nom + A.nom}}`,
          `\\dfrac{${H.nom + B.nom}}{${A.nom + B.nom}}`,
          `\\dfrac{${H.nom + B.nom}}{${B.nom + A.nom}}`,
        ],
        [
          // sinus angle et cosinus de son complémentaire
          `\\dfrac{${A.nom + H.nom}}{${A.nom + B.nom}}`,
          `\\dfrac{${A.nom + H.nom}}{${B.nom + A.nom}}`,
          `\\dfrac{${H.nom + A.nom}}{${A.nom + B.nom}}`,
          `\\dfrac{${H.nom + A.nom}}{${B.nom + A.nom}}`,
        ],
        [
          // tangente angle
          `\\dfrac{${A.nom + H.nom}}{${H.nom + B.nom}}`,
          `\\dfrac{${A.nom + H.nom}}{${B.nom + H.nom}}`,
          `\\dfrac{${H.nom + A.nom}}{${H.nom + B.nom}}`,
          `\\dfrac{${H.nom + A.nom}}{${B.nom + H.nom}}`,
        ],
        [
          // tangente angle complémentaire
          `\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}`,
          `\\dfrac{${B.nom + A.nom}}{${A.nom + C.nom}}`,
          `\\dfrac{${A.nom + B.nom}}{${C.nom + A.nom}}`,
          `\\dfrac{${B.nom + A.nom}}{${C.nom + A.nom}}`,
        ],
      ]

      const correctionTrigoPointHRLB = [
        [], // RLB pour Remplis les Blancs
        [
          // cosinus angle et sinus de son complémentaire
          [`${H.nom + B.nom}`, `${B.nom + H.nom}`],
          [`${A.nom + B.nom}`, `${B.nom + A.nom}`],
        ],
        [
          // sinus angle et cosinus de son complémentaire
          [`${H.nom + A.nom}`, `${A.nom + H.nom}`],
          [`${A.nom + B.nom}`, `${B.nom + A.nom}`],
        ],
        [
          // tangente angle
          [`${H.nom + A.nom}`, `${A.nom + H.nom}`],
          [`${H.nom + B.nom}`, `${B.nom + H.nom}`],
        ],
        [
          // tangente angle complémentaire
          [`${A.nom + B.nom}`, `${B.nom + A.nom}`],
          [`${A.nom + C.nom}`, `${C.nom + A.nom}`],
        ],
      ]
      const propositionsAMCTrigo = [
        [],
        [
          // cosinus angle et sinus de son complémentaire
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${B.nom + C.nom}}$`,
            statut: true,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + C.nom}}{${B.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + C.nom}}{${A.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + C.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + C.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
        ],
        [
          // sinus angle et cosinus de son complémentaire
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${B.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + C.nom}}{${B.nom + C.nom}}$`,
            statut: true,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + C.nom}}{${A.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + C.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + C.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
        ],
        [
          // tangente angle
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${B.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + C.nom}}{${B.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + C.nom}}{${A.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + C.nom}}{${A.nom + B.nom}}$`,
            statut: true,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + C.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
        ],
        [
          // tangente complémentaire de l'angle
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${B.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + C.nom}}{${B.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${A.nom + C.nom}}$`,
            statut: true,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + C.nom}}{${A.nom + C.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + C.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + C.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
        ],
      ]
      const propositionsAMCTrigoPointH = [
        [],
        [
          // cosinus angle et sinus de son complémentaire
          {
            texte: `$\\dfrac{${A.nom + H.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + H.nom}}{${A.nom + B.nom}}$`,
            statut: true,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${A.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + H.nom}}{${A.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${B.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + H.nom}}{${B.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
        ],
        [
          // sinus angle et cosinus de son complémentaire
          {
            texte: `$\\dfrac{${A.nom + H.nom}}{${A.nom + B.nom}}$`,
            statut: true,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + H.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${A.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + H.nom}}{${A.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${B.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + H.nom}}{${B.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
        ],
        [
          // tangente angle
          {
            texte: `$\\dfrac{${A.nom + H.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + H.nom}}{${A.nom + B.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${A.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${B.nom + H.nom}}{${A.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + B.nom}}{${B.nom + H.nom}}$`,
            statut: false,
            feedback: '',
          },
          {
            texte: `$\\dfrac{${A.nom + H.nom}}{${B.nom + H.nom}}$`,
            statut: true,
            feedback: '',
          },
        ],
      ]
      if (this.sup === 1) {
        texteInit = texte
        texteInit += `Dans le triangle rectangle $${A.nom + B.nom + C.nom}$ et à l'aide des longueurs $${A.nom + B.nom}$, $${A.nom + C.nom}$ et $${B.nom + C.nom}$ :`
        texte += `Compléter à l'aide des longueurs $${A.nom + B.nom}$, $${A.nom + C.nom}$ et $${B.nom + C.nom}$ : `
        for (let ee = 0; ee < fonctionsTrigonometriques.length; ee++) {
          texte += `<br>$${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=$`
          if (!context.isAmc) {
            texte += remplisLesBlancs(
              this,
              fonctionsTrigonometriques.length * i + ee,
              '\\dfrac{%{champ1}}{%{champ2}}',
              KeyboardType.alphanumeric,
              '\\ldots',
            )
            handleAnswers(this, fonctionsTrigonometriques.length * i + ee, {
              champ1: {
                value: correctionTrigoRLB[fonctionsTrigonometriques[ee]][0],
                options: { texteAvecCasse: true },
              },
              champ2: {
                value: correctionTrigoRLB[fonctionsTrigonometriques[ee]][1],
                options: { texteAvecCasse: true },
              },
            })
          } else {
            propositionsAMC[ee] = {
              type: 'qcmMono',
              enonce: `${numAlpha(ee)} Exprimer $${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right).$<br>`,
              propositions: propositionsAMCTrigo[fonctionsTrigonometriques[ee]],
            }
          }
        }
      } else if (this.sup === 2) {
        texteInit =
          'Exprimer les rapports trigonométriques pour ' +
          (this.nbQuestions === 1 ? 'ce' : 'chaque') +
          ' triangle rectangle, en fonction des longueurs respectives de ses côtés.'
        texte += `Compléter à l'aide des longueurs $${A.nom + B.nom}$, $${A.nom + C.nom}$ et $${B.nom + C.nom}$ : `
        for (let ee = 0; ee < fonctionsTrigonometriques.length; ee++) {
          if (!context.isAmc) {
            texte += `<br>$${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=$`
            texte += remplisLesBlancs(
              this,
              2 * (fonctionsTrigonometriques.length * i + ee),
              '\\dfrac{%{champ1}}{%{champ2}}',
              KeyboardType.alphanumeric,
              '\\ldots',
            )
            handleAnswers(
              this,
              2 * (fonctionsTrigonometriques.length * i + ee),
              {
                bareme: (listePoints) => [listePoints[0] * listePoints[1], 2],
                champ1: {
                  value: correctionTrigoRLB[fonctionsTrigonometriques[ee]][0],
                  options: { texteAvecCasse: true },
                },
                champ2: {
                  value: correctionTrigoRLB[fonctionsTrigonometriques[ee]][1],
                  options: { texteAvecCasse: true },
                },
              },
            )

            texte += `<br>$${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + C.nom + B.nom}}\\right)=$`
            texte += remplisLesBlancs(
              this,
              2 * (fonctionsTrigonometriques.length * i + ee) + 1,
              '\\dfrac{%{champ1}}{%{champ2}}',
              KeyboardType.alphanumeric,
              '\\ldots',
            )
            handleAnswers(
              this,
              2 * (fonctionsTrigonometriques.length * i + ee) + 1,
              {
                champ1: {
                  value:
                    correctionTrigoRLB[
                      fonctionsTrigonometriques[ee] === 3
                        ? 4
                        : fonctionsTrigonometriques[ee] === 1
                          ? 2
                          : 1
                    ][0],
                  options: { texteAvecCasse: true },
                },
                champ2: {
                  value:
                    correctionTrigoRLB[
                      fonctionsTrigonometriques[ee] === 3
                        ? 4
                        : fonctionsTrigonometriques[ee] === 1
                          ? 2
                          : 1
                    ][1],
                  options: { texteAvecCasse: true },
                },
              },
            )
          } else {
            propositionsAMC[ee * 2] = {
              type: 'qcmMono',
              enonce: `${numAlpha(ee * 2)} Exprimer $${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right).$<br>`,
              propositions: propositionsAMCTrigo[fonctionsTrigonometriques[ee]],
            }
            propositionsAMC[ee * 2 + 1] = {
              type: 'qcmMono',
              enonce: `${numAlpha(ee * 2 + 1)} Exprimer $${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + C.nom + B.nom}}\\right).$<br>`,
              propositions:
                propositionsAMCTrigo[
                  fonctionsTrigonometriques[ee] === 3
                    ? 4
                    : fonctionsTrigonometriques[ee] === 1
                      ? 2
                      : 1
                ],
            }
          }
        }
      } else {
        texteInit = texte
        for (let ee = 0; ee < fonctionsTrigonometriques.length; ee++) {
          texte += ee > 0 ? '<br>' : ''
          texte += `Exprimer $${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}(\\widehat{${A.nom + B.nom + C.nom}})$ de deux manières différentes.`
          if (!context.isAmc) {
            texte += `<br>Parmi deux triangles, dans le triangle rectangle le plus grand, $${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=$`
            texte += remplisLesBlancs(
              this,
              fonctionsTrigonometriques.length * i + 2 * ee,
              '\\dfrac{%{champ1}}{%{champ2}}',
              KeyboardType.alphanumeric,
              '\\ldots',
            )
            handleAnswers(this, fonctionsTrigonometriques.length * i + 2 * ee, {
              champ1: {
                value: correctionTrigoRLB[fonctionsTrigonometriques[ee]][0],
                options: { texteAvecCasse: true },
              },
              champ2: {
                value: correctionTrigoRLB[fonctionsTrigonometriques[ee]][1],
                options: { texteAvecCasse: true },
              },
            })

            texte += `<br>Parmi deux triangles, dans le triangle rectangle le plus petit, $${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=$`
            texte += remplisLesBlancs(
              this,
              fonctionsTrigonometriques.length * i + 2 * ee + 1,
              '\\dfrac{%{champ1}}{%{champ2}}',
              KeyboardType.alphanumeric,
              '\\ldots',
            )
            handleAnswers(
              this,
              fonctionsTrigonometriques.length * i + 2 * ee + 1,
              {
                champ1: {
                  value:
                    correctionTrigoPointHRLB[fonctionsTrigonometriques[ee]][0],
                  options: { texteAvecCasse: true },
                },
                champ2: {
                  value:
                    correctionTrigoPointHRLB[fonctionsTrigonometriques[ee]][1],
                  options: { texteAvecCasse: true },
                },
              },
            )
            texte += '<br>'
          } else {
            propositionsAMC[ee * 2] = {
              type: 'qcmMono',
              enonce: `${numAlpha(ee * 2)} Exprimer $${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right) dans le triangle rectangle $${A.nom + B.nom + C.nom}.$<br>`,
              propositions: propositionsAMCTrigo[fonctionsTrigonometriques[ee]],
            }
            propositionsAMC[ee * 2 + 1] = {
              type: 'qcmMono',
              enonce: `${numAlpha(ee * 2 + 1)} Exprimer $${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right). dans le triangle rectangle $${A.nom + H.nom + B.nom}$<br>`,
              propositions:
                propositionsAMCTrigoPointH[fonctionsTrigonometriques[ee]],
            }
          }
        }
      }

      if (!context.isHtml && !context.isAmc) {
        texte += '\n\\end{minipage}\n'
      }
      if (this.sup === 1 || this.sup === 2 || this.sup === 3) {
        texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
      }
      if (this.sup === 2) {
        const objetsCorrection2 = [
          p2,
          codage,
          nomme,
          t1,
          t22,
          t32,
          hypo,
          codageAngle2,
        ]
        texteCorr += mathalea2d(paramsCorrection, objetsCorrection2)
      }
      if (this.sup === 3) {
        const objetsCorrection3 = [
          p2,
          codage2,
          nomme,
          t13,
          t23,
          t33,
          t4,
          hypo3,
          codageAngle,
          sAH,
        ]
        texteCorr += mathalea2d(paramsCorrection, objetsCorrection3)
      }

      if (this.sup === 1 || this.sup === 2)
        texteCorr += `<br>$${A.nom + B.nom + C.nom}$ est rectangle en $${A.nom}$ donc :`

      if (this.sup === 1) {
        for (let ee = 0; ee < fonctionsTrigonometriques.length; ee++) {
          texteCorr += `<br>$${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=${miseEnEvidence(correctionTrigo[fonctionsTrigonometriques[ee]][0])}$`
          // texteCorr += ee === fonctionsTrigonometriques.length - 1 ? '.' : ''
        }
      } else if (this.sup === 2) {
        for (let ee = 0; ee < fonctionsTrigonometriques.length; ee++) {
          texteCorr += `<br>$${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=${miseEnEvidence(correctionTrigo[fonctionsTrigonometriques[ee]][0])}$ ;`
          texteCorr += `<br>$${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + C.nom + B.nom}}\\right)=${miseEnEvidence(correctionTrigo[fonctionsTrigonometriques[ee] === 3 ? 4 : fonctionsTrigonometriques[ee] === 1 ? 2 : 1][0])}$`
          // texteCorr += ee === fonctionsTrigonometriques.length - 1 ? '.' : ''
        }
      } else if (this.sup === 3) {
        for (let ee = 0; ee < fonctionsTrigonometriques.length; ee++) {
          texteCorr += `<br>$${A.nom + B.nom + C.nom}$ est rectangle en $${A.nom}$ donc `
          texteCorr += `$${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=${miseEnEvidence(correctionTrigo[fonctionsTrigonometriques[ee]][0])}$.`
          texteCorr += `<br>$${A.nom + B.nom + H.nom}$ est rectangle en $${H.nom}$ donc `
          texteCorr += `$${nomFonctionsTrigonometriques[fonctionsTrigonometriques[ee]]}\\left(\\widehat{${A.nom + B.nom + C.nom}}\\right)=${miseEnEvidence(correctionTrigoPointH[fonctionsTrigonometriques[ee]][0])}$.`
        }
      }

      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: texteInit + '\\\\\n',
          enonceAvant: true,
          options: {
            multicols: false,
            barreseparation: true,
            multicolsAll: true,
            numerotationEnonce: true,
          },
          propositions: propositionsAMC,
        }
      }
      if (this.questionJamaisPosee(i, nom)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
      }
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
