import { point } from '../../lib/2d/points'
import { polygone } from '../../lib/2d/polygones'
import { grille, seyes } from '../../lib/2d/reperes'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { labelPoint } from '../../lib/2d/textes'
import { similitude, translation2Points } from '../../lib/2d/transformations'
import { propositionsQcm } from '../../lib/interactif/qcm'
import {
  choice,
  combinaisonListes,
  enleveDoublonNum,
} from '../../lib/outils/arrayOutils'
import { creerNomDePolygone } from '../../lib/outils/outilString'
import {
  colorToLatexOrHTML,
  mathalea2d,
  vide2d,
} from '../../modules/2dGeneralites'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const dateDeModifImportante = '07/06/2023' // par EE : QCM interactif, nouveau paramètre, couleur appropriée dans la correction, AMC

/**
 * fonction servant à plusieurs exercices autour du cube et du pavé droit
 * @author Jean-Claude Lhote
 */
export default class Solide6e extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
    this.sup = 1
    this.sup2 = 1
    this.sup3 = 5
    this.titre = ''
    this.besoinFormulaireNumerique = [
      'Type de solides',
      3,
      ' 1 : Cubes\n 2 : Pavés droits\n 3 : Mélange',
    ]
    this.besoinFormulaire2Numerique = [
      'Type de cahier',
      3,
      ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche',
    ]
    this.besoinFormulaire3Texte = [
      'Type de questions',
      'Nombres séparés par des tirets :\n1: Arêtes parallèles\n2: Faces parallèles\n3: Arêtes perpendiculaires\n4: Faces perpendiculaires\n5 : Mélange',
    ]
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = this.sup === 3 ? [1, 2] : [this.sup]

    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )

    const listeDeProblemes = gestionnaireFormulaireTexte({
      saisie: this.sup3,
      max: 4,
      melange: 5,
      defaut: 5,
      nbQuestions: this.nbQuestions,
    })

    let Xmin, Xmax, Ymin, Ymax, ppc

    const sc = this.sup2 === 1 ? 0.5 : 0.8

    let A
    let B
    let C
    let D
    let E
    let F
    let G
    let H
    let AB
    let BC
    let CD
    let DA
    let EF
    let FG
    let GH
    let HE
    let AE
    let BF
    let CG
    let DH
    let coeffpersp
    let correction
    let carreaux
    let g
    let objetsEnonce = []
    let objetsCorrection = []
    let p
    let listeDeNomsDePolygones
    for (
      let i = 0, texte, resultatCorrect, resultatFaux, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (i % 2 === 0) listeDeNomsDePolygones = ['PQD']
      const nom = creerNomDePolygone(8, listeDeNomsDePolygones)
      listeDeNomsDePolygones.push(nom)
      const anglepersp = choice([30, 45, -30, -45, 150, 135, -150, -135])
      coeffpersp = anglepersp % 10 === 0 ? 0.6 : 0.4
      objetsCorrection = []
      objetsEnonce = []
      switch (listeTypeDeQuestions[i]) {
        case 1: // cube
          texte = `$${nom}$ est un cube.<br>`
          //  if (context.isHtml) texte += ' Reproduire la figure ci-dessous sur le cahier.<br>'
          // texte += ' Repasse tous les segments de même longueur dans une même couleur.<br>'
          correction = `Le cube ${nom}.<br>`
          break

        case 2:
          texte = `$${nom}$ est un pavé droit.<br>`
          // if (context.isHtml) texte += ' Reproduire la figure ci-dessous sur le cahier.<br>'
          // texte += ' Repasse tous les segments de même longueur dans une même couleur.<br>'
          correction = `Le pavé droit ${nom}.<br>`
          break
      }
      const aretesParalleles = [
        [
          [0, 1],
          [2, 3],
          [4, 5],
          [6, 7],
        ],
        [
          [0, 3],
          [1, 2],
          [4, 7],
          [5, 6],
        ],
        [
          [0, 4],
          [1, 5],
          [2, 6],
          [3, 7],
        ],
      ]
      const facesParalleles = [
        [
          [0, 1, 2, 3],
          [4, 5, 6, 7],
        ],
        [
          [3, 7, 4, 0],
          [1, 5, 6, 2],
        ],
        [
          [0, 1, 5, 4],
          [2, 6, 7, 3],
        ],
      ]
      const aretesPerp = [
        [
          [0, 1],
          [0, 4],
          [0, 3],
          [1, 5],
          [1, 2],
        ],
        [
          [0, 4],
          [0, 1],
          [0, 3],
          [4, 5],
          [4, 7],
        ],
        [
          [0, 3],
          [0, 1],
          [0, 4],
          [2, 3],
          [3, 7],
        ],
        [
          [1, 2],
          [0, 1],
          [1, 5],
          [2, 3],
          [2, 6],
        ],
        [
          [1, 5],
          [0, 1],
          [1, 2],
          [4, 5],
          [5, 6],
        ],
        [
          [4, 5],
          [1, 5],
          [5, 6],
          [0, 4],
          [4, 7],
        ],
        [
          [5, 6],
          [1, 5],
          [4, 5],
          [2, 6],
          [6, 7],
        ],
        [
          [2, 6],
          [6, 5],
          [6, 7],
          [1, 2],
          [2, 3],
        ],
        [
          [2, 3],
          [1, 2],
          [2, 6],
          [0, 3],
          [3, 7],
        ],
        [
          [3, 7],
          [2, 3],
          [0, 3],
          [4, 7],
          [6, 7],
        ],
        [
          [4, 7],
          [0, 4],
          [4, 5],
          [7, 3],
          [6, 7],
        ],
        [
          [6, 7],
          [2, 6],
          [6, 5],
          [7, 3],
          [4, 7],
        ],
      ]
      const facesPerp = [
        [
          [0, 1, 2, 3],
          [1, 5, 6, 2],
          [2, 6, 7, 3],
          [3, 7, 4, 0],
          [0, 1, 5, 4],
        ],
        [
          [1, 5, 6, 2],
          [0, 1, 2, 3],
          [2, 6, 7, 3],
          [4, 5, 6, 7],
          [0, 1, 5, 4],
        ],
        [
          [0, 1, 5, 4],
          [1, 5, 6, 2],
          [4, 5, 6, 7],
          [3, 7, 4, 0],
          [0, 1, 2, 3],
        ],
        [
          [4, 5, 6, 7],
          [0, 1, 5, 4],
          [1, 5, 6, 2],
          [2, 6, 7, 3],
          [3, 7, 4, 0],
        ],
        [
          [3, 7, 4, 0],
          [0, 1, 2, 3],
          [0, 1, 5, 4],
          [4, 5, 6, 7],
          [2, 6, 7, 3],
        ],
        [
          [2, 6, 7, 3],
          [0, 1, 2, 3],
          [1, 5, 6, 2],
          [4, 5, 6, 7],
          [3, 7, 4, 0],
        ],
      ]
      const toutesLesFaces = [
        [0, 1, 2, 3],
        [1, 5, 6, 2],
        [2, 6, 7, 3],
        [3, 7, 4, 0],
        [0, 1, 5, 4],
        [4, 5, 6, 7],
      ]
      let k, l, s
      let nomFace, nomArete

      switch (listeDeProblemes[i]) {
        case 1: // citer les arêtes parallèles à une arête donnée
          ;[k, l, s] = [randint(0, 2), randint(0, 3), randint(0, 1)]
          texte += this.interactif
            ? `Parmi les arêtes proposées, citer toutes celles parallèles à [$${nom[aretesParalleles[k][l][s]] + nom[aretesParalleles[k][l][(s + 1) % 2]]}$].<br>`
            : `Citer toutes les arêtes parallèles à [$${nom[aretesParalleles[k][l][s]] + nom[aretesParalleles[k][l][(s + 1) % 2]]}$].<br>`
          correction = `Les arêtes parallèles à [$${nom[aretesParalleles[k][l][s]] + nom[aretesParalleles[k][l][(s + 1) % 2]]}$] sont [$${nom[aretesParalleles[k][(l + 1) % 4][s]] + nom[aretesParalleles[k][(l + 1) % 4][(s + 1) % 2]]}$], [$${nom[aretesParalleles[k][(l + 2) % 4][s]] + nom[aretesParalleles[k][(l + 2) % 4][(s + 1) % 2]]}$] et [$${nom[aretesParalleles[k][(l + 3) % 4][s]] + nom[aretesParalleles[k][(l + 3) % 4][(s + 1) % 2]]}$].<br>`
          resultatCorrect = [
            `[$${nom[aretesParalleles[k][(l + 1) % 4][s]] + nom[aretesParalleles[k][(l + 1) % 4][(s + 1) % 2]]}$]`,
            `[$${nom[aretesParalleles[k][(l + 2) % 4][s]] + nom[aretesParalleles[k][(l + 2) % 4][(s + 1) % 2]]}$]`,
            `[$${nom[aretesParalleles[k][(l + 3) % 4][s]] + nom[aretesParalleles[k][(l + 3) % 4][(s + 1) % 2]]}$]`,
          ]
          resultatFaux = []
          for (let ee = 0; ee < 3; ee++) {
            if (ee !== k) {
              for (let ff = 0; ff < 4; ff++) {
                resultatFaux.push(
                  `[$${nom[aretesParalleles[ee][ff][s]] + nom[aretesParalleles[ee][ff][(s + 1) % 2]]}$]`,
                )
              }
            }
          }
          break

        case 2: // citer la face parallèle à une face donnée
          ;[k, l, s] = [randint(0, 2), randint(0, 1), randint(0, 3)]
          texte += `Quelle est la face parallèle à $${nom[facesParalleles[k][l][s]] + nom[facesParalleles[k][l][(s + 1) % 4]] + nom[facesParalleles[k][l][(s + 2) % 4]] + nom[facesParalleles[k][l][(s + 3) % 4]]}$ ?<br>`
          correction = `La face parallèle à $${nom[facesParalleles[k][l][s]] + nom[facesParalleles[k][l][(s + 1) % 4]] + nom[facesParalleles[k][l][(s + 2) % 4]] + nom[facesParalleles[k][l][(s + 3) % 4]]}$ est la face $${nom[facesParalleles[k][(l + 1) % 2][s]] + nom[facesParalleles[k][(l + 1) % 2][(s + 1) % 4]] + nom[facesParalleles[k][(l + 1) % 2][(s + 2) % 4]] + nom[facesParalleles[k][(l + 1) % 2][(s + 3) % 4]]}$.<br>`
          resultatCorrect = [
            `$${nom[facesParalleles[k][(l + 1) % 2][s]] + nom[facesParalleles[k][(l + 1) % 2][(s + 1) % 4]] + nom[facesParalleles[k][(l + 1) % 2][(s + 2) % 4]] + nom[facesParalleles[k][(l + 1) % 2][(s + 3) % 4]]}$`,
          ]
          resultatFaux = []
          for (let ee = 0; ee < 3; ee++) {
            if (ee !== k) {
              for (let ff = 0; ff < 2; ff++) {
                resultatFaux.push(
                  `$${nom[facesParalleles[ee][ff][s]] + nom[facesParalleles[ee][ff][(s + 1) % 4]] + nom[facesParalleles[ee][ff][(s + 2) % 4]] + nom[facesParalleles[ee][ff][(s + 3) % 4]]}$`,
                )
              }
            }
          }
          break

        case 3: // citer les arêtes perpendiculaires à une arête donnée
          ;[k, l, s] = [randint(0, 11), 0, randint(0, 1)]
          texte += this.interactif
            ? `Parmi les arêtes proposées, citer toutes celles perpendiculaires à l'arête [$${nom[aretesPerp[k][l][s]] + nom[aretesPerp[k][l][(s + 1) % 2]]}$].<br>`
            : `Quelles sont les arêtes perpendiculaires à l'arête [$${nom[aretesPerp[k][l][s]] + nom[aretesPerp[k][l][(s + 1) % 2]]}$] ?<br>`
          correction = `Les arêtes perpendiculaires à l'arête [$${nom[aretesPerp[k][l][s]] + nom[aretesPerp[k][l][(s + 1) % 2]]}$] sont [$${nom[aretesPerp[k][1][s]] + nom[aretesPerp[k][1][(s + 1) % 2]]}$], [$${nom[aretesPerp[k][2][s]] + nom[aretesPerp[k][2][(s + 1) % 2]]}$], [$${nom[aretesPerp[k][3][s]] + nom[aretesPerp[k][3][(s + 1) % 2]]}$] et [$${nom[aretesPerp[k][4][s]] + nom[aretesPerp[k][4][(s + 1) % 2]]}$].`
          resultatCorrect = [
            `[$${nom[aretesPerp[k][1][s]] + nom[aretesPerp[k][1][(s + 1) % 2]]}$]`,
            `[$${nom[aretesPerp[k][2][s]] + nom[aretesPerp[k][2][(s + 1) % 2]]}$]`,
            `[$${nom[aretesPerp[k][3][s]] + nom[aretesPerp[k][3][(s + 1) % 2]]}$]`,
            `[$${nom[aretesPerp[k][4][s]] + nom[aretesPerp[k][4][(s + 1) % 2]]}$]`,
          ]
          resultatFaux = []
          for (let ee = 0; ee < 3; ee++) {
            if (ee !== k) {
              for (let ff = 1; ff < 5; ff++) {
                nomArete = `[$${nom[aretesPerp[ee][ff][s]] + nom[aretesPerp[ee][ff][(s + 1) % 2]]}$]`
                if (
                  resultatCorrect.indexOf(nomArete) === -1 &&
                  nomArete !==
                    `[$${nom[aretesPerp[k][l][s]] + nom[aretesPerp[k][l][(s + 1) % 2]]}$]`
                )
                  resultatFaux.push(nomArete)
              }
            }
          }
          break

        case 4: // citer les faces perpendiculaires à une face donnée
          ;[k, l, s] = [randint(0, 5), 0, randint(0, 3)]
          texte += `Quelles sont les faces perpendiculaires à la face $${nom[facesPerp[k][l][s]] + nom[facesPerp[k][l][(s + 1) % 4]] + nom[facesPerp[k][l][(s + 2) % 4]] + nom[facesPerp[k][l][(s + 3) % 4]]}$ ?<br>`
          correction = `Les faces perpendiculaires à la face $${nom[facesPerp[k][l][s]] + nom[facesPerp[k][l][(s + 1) % 4]] + nom[facesPerp[k][l][(s + 2) % 4]] + nom[facesPerp[k][l][(s + 3) % 4]]}$ `
          correction += `sont les faces $${nom[facesPerp[k][l + 1][s]] + nom[facesPerp[k][l + 1][(s + 1) % 4]] + nom[facesPerp[k][l + 1][(s + 2) % 4]] + nom[facesPerp[k][l + 1][(s + 3) % 4]]}$, `
          correction += `$${nom[facesPerp[k][l + 2][s]] + nom[facesPerp[k][l + 2][(s + 1) % 4]] + nom[facesPerp[k][l + 2][(s + 2) % 4]] + nom[facesPerp[k][l + 2][(s + 3) % 4]]}$, `
          correction += `$${nom[facesPerp[k][l + 3][s]] + nom[facesPerp[k][l + 3][(s + 1) % 4]] + nom[facesPerp[k][l + 3][(s + 2) % 4]] + nom[facesPerp[k][l + 3][(s + 3) % 4]]}$ et `
          correction += `$${nom[facesPerp[k][l + 4][s]] + nom[facesPerp[k][l + 4][(s + 1) % 4]] + nom[facesPerp[k][l + 4][(s + 2) % 4]] + nom[facesPerp[k][l + 4][(s + 3) % 4]]}$.`
          resultatCorrect = []
          for (let ee = 1; ee < 5; ee++) {
            resultatCorrect.push(
              `$${nom[facesPerp[k][l + ee][s]] + nom[facesPerp[k][l + ee][(s + 1) % 4]] + nom[facesPerp[k][l + ee][(s + 2) % 4]] + nom[facesPerp[k][l + ee][(s + 3) % 4]]}$`,
            )
          }
          resultatFaux = []
          for (let ee = 0; ee < 6; ee++) {
            nomFace = `$${nom[toutesLesFaces[ee][s]] + nom[toutesLesFaces[ee][(s + 1) % 4]] + nom[toutesLesFaces[ee][(s + 2) % 4]] + nom[toutesLesFaces[ee][(s + 3) % 4]]}$`
            if (
              resultatCorrect.indexOf(nomFace) === -1 &&
              nomFace !==
                `$${nom[facesPerp[k][l][s]] + nom[facesPerp[k][l][(s + 1) % 4]] + nom[facesPerp[k][l][(s + 2) % 4]] + nom[facesPerp[k][l][(s + 3) % 4]]}$`
            )
              resultatFaux.push(nomFace)
          }
          break
      }

      switch (listeTypeDeQuestions[i] % 2) {
        case 1:
          A = point(6, 0, nom[0], 'left')
          B = point(11, 0, nom[1], 'right')
          C = point(11, 5, nom[2], 'right')
          D = point(6, 5, nom[3], 'left')
          p = polygone(A, B, C, D)
          E = similitude(B, A, anglepersp, coeffpersp, nom[4], 'left')
          E.x = Math.round(E.x)
          E.y = Math.round(E.y)
          break

        case 0:
          A = point(5, 0, nom[0], 'left')
          B = point(9 + randint(1, 3), 0, nom[1], 'right')
          C = point(B.x, randint(3, 7), nom[2], 'right')
          D = point(A.x, C.y, nom[3], 'left')
          p = polygone(A, B, C, D)
          E = similitude(
            B,
            A,
            anglepersp,
            (coeffpersp * randint(5, 12)) / 10,
            nom[4],
            'left',
          )
          E.x = Math.round(E.x)
          E.y = Math.round(E.y)
          break
      }

      p = polygone(A, B, C, D)
      F = translation2Points(E, A, B, nom[5], 'right')
      G = translation2Points(F, B, C, nom[6], 'right')
      H = translation2Points(G, C, D, nom[7], 'left')
      AB = segment(A, B, 'black')
      BC = segment(B, C, 'black')
      CD = segment(C, D, 'black')
      DA = segment(D, A, 'black')
      EF = segment(E, F, 'black')
      FG = segment(F, G, 'black')
      GH = segment(G, H, 'black')
      HE = segment(H, E, 'black')
      AE = segment(A, E, 'black')
      BF = segment(B, F, 'black')
      CG = segment(C, G, 'black')
      DH = segment(D, H, 'black')
      AB.epaisseur = 2
      BC.epaisseur = 2
      CD.epaisseur = 2
      DA.epaisseur = 2
      EF.epaisseur = 2
      FG.epaisseur = 2
      GH.epaisseur = 2
      HE.epaisseur = 2
      AE.epaisseur = 2
      BF.epaisseur = 2
      CG.epaisseur = 2
      DH.epaisseur = 2
      if (G.y < C.y && G.x < C.x) {
        CG.pointilles = 5
        CG.color = colorToLatexOrHTML('gray')
        CG.opacite = 0.7
        GH.pointilles = 5
        GH.color = colorToLatexOrHTML('gray')
        GH.opacite = 0.7
        FG.pointilles = 5
        FG.color = colorToLatexOrHTML('gray')
        FG.opacite = 0.7
      } else if (E.y > A.y && E.x > A.x) {
        AE.pointilles = 5
        EF.pointilles = 5
        HE.pointilles = 5
        AE.color = colorToLatexOrHTML('gray')
        EF.color = colorToLatexOrHTML('gray')
        HE.color = colorToLatexOrHTML('gray')
        AE.opacite = 0.7
        EF.opacite = 0.7
        HE.opacite = 0.7
      } else if (F.x < B.x && F.y > B.y) {
        BF.pointilles = 5
        FG.pointilles = 5
        EF.pointilles = 5
        BF.color = colorToLatexOrHTML('gray')
        FG.color = colorToLatexOrHTML('gray')
        EF.color = colorToLatexOrHTML('gray')
        BF.opacite = 0.7
        FG.opacite = 0.7
        EF.opacite = 0.7
      } else if (H.x > D.x && H.y < D.y) {
        DH.pointilles = 5
        GH.pointilles = 5
        HE.pointilles = 5
        DH.color = colorToLatexOrHTML('gray')
        GH.color = colorToLatexOrHTML('gray')
        HE.color = colorToLatexOrHTML('gray')
        DH.opacite = 0.7
        GH.opacite = 0.7
        HE.opacite = 0.7
      }
      Xmin = Math.min(A.x, E.x) - 1
      Ymin = Math.min(A.y, E.y) - 1
      Xmax = Math.max(B.x, F.x) + 2
      Ymax = Math.max(D.y, H.y) + 1
      ppc = 20

      g = this.sup2 < 3 ? grille(Xmin, Ymin, Xmax, Ymax, 'gray', 0.7) : vide2d()
      carreaux = this.sup2 === 2 ? seyes(Xmin, Ymin, Xmax, Ymax) : vide2d()

      objetsEnonce.push(
        AB,
        BC,
        CD,
        DA,
        EF,
        FG,
        GH,
        HE,
        AE,
        BF,
        CG,
        DH,
        labelPoint(A, B, C, D, E, F, G, H),
        p,
        g,
        carreaux,
      )

      const params = {
        xmin: Xmin,
        ymin: Ymin,
        xmax: Xmax,
        ymax: Ymax,
        pixelsParCm: ppc,
        scale: sc,
      }
      texte += mathalea2d(params, objetsEnonce)
      switch (listeDeProblemes[i]) {
        case 1:
          switch (k) {
            case 0:
              AB.color =
                l === 0
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              CD.color =
                l === 1
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              EF.color =
                l === 2
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              GH.color =
                l === 3
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              break
            case 1:
              BC.color =
                l === 1
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              DA.color =
                l === 0
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              FG.color =
                l === 3
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              HE.color =
                l === 2
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              break
            case 2:
              BF.color =
                l === 1
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              CG.color =
                l === 2
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              DH.color =
                l === 3
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              AE.color =
                l === 0
                  ? colorToLatexOrHTML('blue')
                  : colorToLatexOrHTML('#f15929')
              break
          }
          break
        case 2:
          switch (k) {
            case 0:
              AB.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              BC.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              CD.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              DA.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              EF.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              FG.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              GH.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              HE.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              break
            case 1:
              DH.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              HE.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              AE.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              DA.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              BF.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              FG.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              CG.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              BC.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              break
            case 2:
              AB.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              BF.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              EF.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              AE.color =
                l !== 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              CG.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              GH.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              DH.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              CD.color =
                l === 0
                  ? colorToLatexOrHTML('#f15929')
                  : colorToLatexOrHTML('blue')
              break
          }
          break
        case 3:
          switch (k) {
            case 0:
              AB.color = colorToLatexOrHTML('blue')
              AE.color = colorToLatexOrHTML('#f15929')
              DA.color = colorToLatexOrHTML('#f15929')
              BF.color = colorToLatexOrHTML('#f15929')
              BC.color = colorToLatexOrHTML('#f15929')
              break
            case 1:
              AE.color = colorToLatexOrHTML('blue')
              AB.color = colorToLatexOrHTML('#f15929')
              DA.color = colorToLatexOrHTML('#f15929')
              EF.color = colorToLatexOrHTML('#f15929')
              HE.color = colorToLatexOrHTML('#f15929')
              break
            case 2:
              DA.color = colorToLatexOrHTML('blue')
              AB.color = colorToLatexOrHTML('#f15929')
              AE.color = colorToLatexOrHTML('#f15929')
              CD.color = colorToLatexOrHTML('#f15929')
              DH.color = colorToLatexOrHTML('#f15929')
              break
            case 3:
              BC.color = colorToLatexOrHTML('blue')
              AB.color = colorToLatexOrHTML('#f15929')
              BF.color = colorToLatexOrHTML('#f15929')
              CD.color = colorToLatexOrHTML('#f15929')
              CG.color = colorToLatexOrHTML('#f15929')
              break
            case 4:
              BF.color = colorToLatexOrHTML('blue')
              AB.color = colorToLatexOrHTML('#f15929')
              BC.color = colorToLatexOrHTML('#f15929')
              EF.color = colorToLatexOrHTML('#f15929')
              FG.color = colorToLatexOrHTML('#f15929')
              break
            case 5:
              EF.color = colorToLatexOrHTML('blue')
              BF.color = colorToLatexOrHTML('#f15929')
              FG.color = colorToLatexOrHTML('#f15929')
              AE.color = colorToLatexOrHTML('#f15929')
              HE.color = colorToLatexOrHTML('#f15929')
              break
            case 6:
              FG.color = colorToLatexOrHTML('blue')
              BF.color = colorToLatexOrHTML('#f15929')
              EF.color = colorToLatexOrHTML('#f15929')
              CG.color = colorToLatexOrHTML('#f15929')
              GH.color = colorToLatexOrHTML('#f15929')
              break
            case 7:
              CG.color = colorToLatexOrHTML('blue')
              FG.color = colorToLatexOrHTML('#f15929')
              GH.color = colorToLatexOrHTML('#f15929')
              BC.color = colorToLatexOrHTML('#f15929')
              CD.color = colorToLatexOrHTML('#f15929')
              break
            case 8:
              CD.color = colorToLatexOrHTML('blue')
              BC.color = colorToLatexOrHTML('#f15929')
              CG.color = colorToLatexOrHTML('#f15929')
              DA.color = colorToLatexOrHTML('#f15929')
              DH.color = colorToLatexOrHTML('#f15929')
              break
            case 9:
              DH.color = colorToLatexOrHTML('blue')
              CD.color = colorToLatexOrHTML('#f15929')
              DA.color = colorToLatexOrHTML('#f15929')
              HE.color = colorToLatexOrHTML('#f15929')
              GH.color = colorToLatexOrHTML('#f15929')
              break
            case 10:
              HE.color = colorToLatexOrHTML('blue')
              AE.color = colorToLatexOrHTML('#f15929')
              EF.color = colorToLatexOrHTML('#f15929')
              DH.color = colorToLatexOrHTML('#f15929')
              GH.color = colorToLatexOrHTML('#f15929')
              break
            case 11:
              GH.color = colorToLatexOrHTML('blue')
              CG.color = colorToLatexOrHTML('#f15929')
              FG.color = colorToLatexOrHTML('#f15929')
              DH.color = colorToLatexOrHTML('#f15929')
              HE.color = colorToLatexOrHTML('#f15929')
              break
          }
          break
        case 4:
          AB.color = colorToLatexOrHTML('#f15929')
          BC.color = colorToLatexOrHTML('#f15929')
          CD.color = colorToLatexOrHTML('#f15929')
          DA.color = colorToLatexOrHTML('#f15929')
          EF.color = colorToLatexOrHTML('#f15929')
          FG.color = colorToLatexOrHTML('#f15929')
          GH.color = colorToLatexOrHTML('#f15929')
          HE.color = colorToLatexOrHTML('#f15929')
          AE.color = colorToLatexOrHTML('#f15929')
          BF.color = colorToLatexOrHTML('#f15929')
          CG.color = colorToLatexOrHTML('#f15929')
          DH.color = colorToLatexOrHTML('#f15929')
          switch (k) {
            case 0:
              AB.color = colorToLatexOrHTML('blue')
              BC.color = colorToLatexOrHTML('blue')
              CD.color = colorToLatexOrHTML('blue')
              DA.color = colorToLatexOrHTML('blue')
              break
            case 1:
              BF.color = colorToLatexOrHTML('blue')
              FG.color = colorToLatexOrHTML('blue')
              CG.color = colorToLatexOrHTML('blue')
              BC.color = colorToLatexOrHTML('blue')
              break
            case 2:
              AB.color = colorToLatexOrHTML('blue')
              BF.color = colorToLatexOrHTML('blue')
              EF.color = colorToLatexOrHTML('blue')
              AE.color = colorToLatexOrHTML('blue')
              break
            case 3:
              EF.color = colorToLatexOrHTML('blue')
              FG.color = colorToLatexOrHTML('blue')
              GH.color = colorToLatexOrHTML('blue')
              HE.color = colorToLatexOrHTML('blue')
              break
            case 4:
              DH.color = colorToLatexOrHTML('blue')
              HE.color = colorToLatexOrHTML('blue')
              AE.color = colorToLatexOrHTML('blue')
              DA.color = colorToLatexOrHTML('blue')
              break
            case 5:
              CG.color = colorToLatexOrHTML('blue')
              GH.color = colorToLatexOrHTML('blue')
              DH.color = colorToLatexOrHTML('blue')
              CD.color = colorToLatexOrHTML('blue')
              break
          }
          break
      }

      objetsCorrection.push(
        AB,
        BC,
        CD,
        DA,
        EF,
        FG,
        GH,
        HE,
        AE,
        BF,
        CG,
        DH,
        labelPoint(A, B, C, D, E, F, G, H),
        g,
        carreaux,
      )

      correction += mathalea2d(params, objetsCorrection)
      resultatCorrect = combinaisonListes(
        resultatCorrect,
        resultatCorrect.length,
      )
      resultatFaux = enleveDoublonNum(resultatFaux)
      resultatFaux = combinaisonListes(resultatFaux, resultatFaux.length)
      this.autoCorrection[i] = {}
      this.autoCorrection[i].enonce = texte
      this.autoCorrection[i].propositions = [
        {
          texte: resultatCorrect[0],
          statut: true,
        },
        {
          texte:
            resultatCorrect.length > 1 ? resultatCorrect[1] : resultatFaux[3],
          statut: resultatCorrect.length > 1,
        },
        {
          texte: resultatFaux[0],
          statut: false,
        },
        {
          texte:
            listeDeProblemes[i] === 4 ? resultatCorrect[2] : resultatFaux[1],
          statut: listeDeProblemes[i] === 4,
        },
        {
          texte:
            listeDeProblemes[i] === 4 ? resultatCorrect[3] : resultatFaux[2],
          statut: listeDeProblemes[i] === 4,
        },
      ]
      const props = propositionsQcm(this, i)
      texte += this.interactif ? props.texte : ''
      if (this.questionJamaisPosee(i, texte, k, l, s)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte + '<br>'
        this.listeCorrections[i] = correction + '<br>'
        i++
      }
      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
