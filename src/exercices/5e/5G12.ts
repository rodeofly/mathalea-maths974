import { codageMilieu } from '../../lib/2d/codages'
import { Point, TracePoint, tracePoint } from '../../lib/2d/points'
import { segment, vecteur } from '../../lib/2d/segmentsVecteurs'
import { labelPoint, texteParPosition } from '../../lib/2d/textes'
import { rotation, translation } from '../../lib/2d/transformations'
import { choice, shuffle } from '../../lib/outils/arrayOutils'
import { texcolors } from '../../lib/format/style'
import { nombreAvecEspace } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import {
  colorToLatexOrHTML,
  mathalea2d,
  ObjetMathalea2D,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { egal, listeQuestionsToContenu, randint } from '../../modules/outils'
import { rotationAnimee } from '../../modules/2dAnimation'
import { Pavage, pavage } from '../../modules/Pavage'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import type { Polygone } from '../../lib/2d/polygones'

export const titre =
  "Trouver l'image d'une figure par symétrie centrale dans un pavage"
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModifImportante = '23/07/2023'

/**
 * Publié le 14/12/2020
 * Trouver l'image par symétrie centrale d'une figure dans un pavage
 * Version Latex & Html grâce à Mathalea2d
 * @author Jean-Claude Lhote
 * Ref 5G12
 */
export const uuid = '76ea9'

export const refs = {
  'fr-fr': ['5G12'],
  'fr-ch': ['9ES6-21'],
}
export default class PavageEtDemiTour2D extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Taille du pavage (la grande est automatique au-delà de 5 questions)',
      2,
      ' 1 : Taille modeste\n 2 : Grande taille',
    ]
    this.besoinFormulaire2CaseACocher = ['Montrer les centres']
    this.besoinFormulaire3Numerique = [
      'Choix du pavage',
      8,
      "1 : Triangles équilatéraux\n2 : Carrés\n3 : Hexagones réguliers\n4 : Carrés et triangles équilatéraux\n5 : Octogones et carrés\n 6 : Losanges (pavage hexagonal d'écolier)\n7 : Hexagones et triangles équilatéraux\n8 : Un des sept pavages au hasard",
    ]

    this.nbQuestions = 3

    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = true

    this.sup = 1 // 1 pour des pavages modestes, 2 pour des plus grand.
    this.sup2 = false // On cache les barycentres par défaut.
    this.sup3 = 7
    context.isHtml ? (this.spacingCorr = 2.5) : (this.spacingCorr = 1.5)
  }

  nouvelleVersion() {
    this.sup = Number(this.sup)
    this.sup3 = Number(this.sup3)
    const videcouples = function (
      tableau: [number, number][],
    ): [number, number][] {
      for (let k = 0; k < tableau.length; k++) {
        for (let j = k + 1; j < tableau.length; j++) {
          if (tableau[k][1] === tableau[j][0]) {
            tableau.splice(j, 1)
          }
        }
      }
      return tableau
    }
    const videIdentite = function (tableau: number[][]) {
      for (let k = 0; k < tableau.length; k++) {
        if (tableau[k][1] === tableau[k][0]) {
          tableau.splice(k, 1)
        }
      }
      return tableau
    }
    const compare2polys = function (poly1: Polygone, poly2: Polygone) {
      if (comparenbsommets(poly1, poly2)) {
        if (comparesommets(poly1, poly2)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
    const comparenbsommets = function (poly1: Polygone, poly2: Polygone) {
      if (poly1.listePoints.length === poly2.listePoints.length) {
        return true
      } else return false
    }

    const compare2sommets = function (sommet1: Point, sommet2: Point) {
      if (egal(sommet1.x, sommet2.x, 0.1) && egal(sommet1.y, sommet2.y, 0.1)) {
        return true
      } else return false
    }
    const comparesommets = function (poly1: Polygone, poly2: Polygone) {
      let trouve = false
      let trouves = 0
      if (comparenbsommets(poly1, poly2)) {
        for (const P of poly1.listePoints) {
          for (const M of poly2.listePoints) {
            if (compare2sommets(M, P)) {
              trouve = true
            }
            if (trouve) break
          }
          if (trouve) {
            trouves++
            trouve = false
          } else {
            trouves -= 100
          }
          if (trouves < 0) {
            break
          }
        }
      }
      if (trouves === poly1.listePoints.length) {
        return true
      } else return false
    }

    const demitour = function (pavage: Pavage, A: Point, numero: number) {
      // retourne le numero du polygone symétrique ou -1 si il n'existe pas
      const poly = pavage.polygones[numero - 1]
      let pol
      const result = -1
      const sympoly = rotation(poly, A, 180)
      for (let k = 0; k < pavage.polygones.length; k++) {
        pol = pavage.polygones[k]
        if (compare2polys(sympoly, pol)) {
          return k + 1
        }
      }
      return result
    }

    const objets: ObjetMathalea2D[] = []
    const objetsCorrection = []
    let P1
    let P2
    let P3
    let G1
    let G2
    let t
    const codes = ['/', '//', '///', 'o', 'w', 'X', 'U', '*']
    let taillePavage = this.sup
    if (taillePavage < 1 || taillePavage > 2) {
      taillePavage = 1
    }
    if (this.nbQuestions > 5) {
      taillePavage = 2
    }

    let Nx
    let Ny
    let index1
    let A!: Point
    let B!: ObjetMathalea2D[]
    let d!: TracePoint
    let image
    let couples: [number, number][] = []
    let tailles = []
    let monpavage
    let fenetre
    let texte = ''
    let texteCorr = ''
    let typeDePavage = this.sup
    let nombreTentatives
    let nombrePavageTestes = 1
    if (this.sup3 === 8) {
      typeDePavage = randint(1, 7)
    } else {
      typeDePavage = this.sup3
    }
    monpavage = pavage()
    while (couples.length < this.nbQuestions && nombrePavageTestes < 6) {
      nombreTentatives = 0
      monpavage = pavage() // On crée l'objet Pavage qui va s'appeler monpavage
      tailles = [
        [
          [3, 2],
          [3, 2],
          [2, 2],
          [2, 2],
          [2, 2],
          [2, 2],
          [3, 2],
        ],
        [
          [4, 3],
          [4, 3],
          [3, 3],
          [3, 3],
          [3, 3],
          [3, 2],
          [5, 3],
        ],
      ]
      Nx = tailles[taillePavage - 1][typeDePavage - 1][0]
      Ny = tailles[taillePavage - 1][typeDePavage - 1][1]
      monpavage.construit(typeDePavage, Nx, Ny, 3) // On initialise toutes les propriétés de l'objet.
      fenetre = monpavage.fenetre
      context.fenetreMathalea2d = [
        fenetre.xmin,
        fenetre.ymin,
        fenetre.xmax,
        fenetre.ymax,
      ]
      while (couples.length < this.nbQuestions + 2 && nombreTentatives < 3) {
        // On cherche d pour avoir suffisamment de couples
        couples = [] // On vide la liste des couples pour une nouvelle recherche

        index1 = randint(
          Math.floor(monpavage.nb_polygones / 3),
          Math.ceil((monpavage.nb_polygones * 2) / 3),
        ) // On choisit 1 point dans un des polygones
        if (choice([true, false])) {
          A =
            monpavage.polygones[index1].listePoints[
              randint(0, monpavage.polygones[index1].listePoints.length - 1)
            ] // On choisit un sommet
        } else {
          A = monpavage.barycentres[index1] // Ou on choisit un barycentre
        }
        while (
          A.x - 5 < fenetre.xmin ||
          A.x + 5 > fenetre.xmax ||
          A.y - 5 < fenetre.ymin ||
          A.y + 5 > fenetre.ymax
        ) {
          index1 = randint(
            Math.floor(monpavage.nb_polygones / 3),
            Math.ceil((monpavage.nb_polygones * 2) / 3),
          ) // On choisit 1 point dans un des polygones
          if (choice([true, false])) {
            A =
              monpavage.polygones[index1].listePoints[
                randint(0, monpavage.polygones[index1].listePoints.length - 1)
              ] // On choisit un sommet
          } else {
            A = monpavage.barycentres[index1] // Ou on choisit un barycentre
          }
        }
        A.nom = 'A'
        A.positionLabel = 'above left'
        d = tracePoint(A, 'red') // la trace du centre de symétrie sera rouge et grosse
        B = labelPoint(A)
        d.epaisseur = 3
        d.taille = 4
        for (let i = 1; i <= monpavage.nb_polygones; i++) {
          // on crée une liste des couples (antécédents, images)
          image = demitour(monpavage, A, i)
          if (image !== -1) {
            // si l'image du polygone i existe, on ajoute le couple à la liste
            couples.push([i, image])
          }
        }
        videcouples(couples) // supprime tous les couples en double (x,y)=(y,x)
        videIdentite(couples) // supprime tous les couples (x,x)
        nombreTentatives++
      }
      if (couples.length < this.nbQuestions) {
        if (this.sup3 === 7) {
          typeDePavage = ((typeDePavage + 1) % 5) + 1
        }
        nombrePavageTestes++
      }
    }
    if (couples.length < this.nbQuestions) {
      console.error('trop de questions, augmentez la taille du pavage')
      return
    }

    objets.push(d) // le centre est OK on pousse sa trace
    objets.push(...B) // et son label
    couples = shuffle(couples) // on mélange les couples
    for (let i = 0; i < monpavage.nb_polygones; i++) {
      objets.push(
        texteParPosition(
          nombreAvecEspace(i + 1),
          monpavage.barycentres[i].x + 0.5,
          monpavage.barycentres[i].y,
          0,
          'gray',
          1,
          'milieu',
          true,
        ),
      )
    }
    if (this.sup2) {
      // Doit-on montrer les centres des figures ?
      for (let i = 0; i < monpavage.nb_polygones; i++) {
        objets.push(monpavage.tracesCentres[i])
      }
    }
    for (let i = 0; i < monpavage.nb_polygones; i++) {
      // il faut afficher tous les polygones du pavage
      objets.push(monpavage.polygones[i])
    }
    texte = mathalea2d(fenetre, objets) // monpavage.fenetre est calibrée pour faire entrer le pavage dans une feuille A4
    for (let i = 0; i < this.nbQuestions; i++) {
      texte += `Donner le numéro de l'image de la figure $${couples[i][0]}$ dans la symétrie de centre $A$.`
      setReponse(this, i, couples[i][1])
      texte += ajouteChampTexteMathLive(this, i, '') + '<br>'
      texteCorr += `L'image de la figure $${couples[i][0]}$ dans la symétrie de centre $A$ est la figure $${miseEnEvidence(couples[i][1])}$.<br>`
      if (this.correctionDetaillee) {
        t = this.nbQuestions * 3
        G1 = monpavage.barycentres[couples[i][0] - 1]
        G2 = monpavage.barycentres[couples[i][1] - 1]
        P1 = translation(
          monpavage.polygones[couples[i][0] - 1],
          vecteur(0, 0),
        ) as Polygone // il faut créer un nouvel objet sinon on pointe vers le polygone du pavage qui est transparent !
        P1.color = colorToLatexOrHTML(texcolors(i))
        P1.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i))
        P1.opaciteDeRemplissage = 0.5
        P1.epaisseur = 2
        P2 = translation(monpavage.polygones[couples[i][1] - 1], vecteur(0, 0))
        P2.color = colorToLatexOrHTML(texcolors(i))
        P2.couleurDeRemplissage = colorToLatexOrHTML(texcolors(i))
        P2.opaciteDeRemplissage = 0.5
        P2.epaisseur = 2
        if (context.isHtml) {
          P3 = rotationAnimee(
            [P1],
            A,
            180,
            `begin="${i * 3}s;${i * 3 + t}s;${i * 3 + t * 2}s" end="${i * 3 + 2}s;${i * 3 + t + 2}s;${i * 3 + t * 2 + 2}s" dur="2s" repeatCount="indefinite" repeatDur="${9 * this.nbQuestions}s" id="poly-${i}-anim"`,
          )
          P3.color = colorToLatexOrHTML(texcolors(i))
          P3.epaisseur = 2
          objetsCorrection.push(P3)
        }
        objetsCorrection.push(
          tracePoint(G1, G2),
          segment(G1, G2, texcolors(i)),
          codageMilieu(G1, G2, texcolors(i), codes[i], false),
          P1,
          P2,
        )
      }
    }
    if (this.correctionDetaillee) {
      texteCorr += mathalea2d(fenetre, objets, objetsCorrection)
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
