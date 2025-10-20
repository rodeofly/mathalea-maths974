import {
  colorToLatexOrHTML,
  fixeBordures,
  ObjetMathalea2D,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { arrondi, rangeMinMax } from '../outils/nombres'
import { nombreAvecEspace, stringNombre } from '../outils/texNombre'
import { Plot, plot, point, tracePoint } from './points'
import { segment } from './segmentsVecteurs'
import {
  latex2d,
  latexParCoordonnees,
  texteParPoint,
  texteParPosition,
} from './textes'

/**  Trace un axe gradué
 * @param {Object} parametres À saisir entre accolades
 * @param {number?} [parametres.Unite = 10] Nombre de cm par unité
 * @param {number?} [parametres.Min = 10] Valeur minimum labelisée sur l'axe (les graduations commencent un peu avant)
 * @param {number?} [parametres.Max = 10] Valeur maximum labelisée sur l'axe (les graduations finissent un peu après)
 * @param {number?} [parametres.x = 0] Abscisse du point de départ du tracé
 * @param {number?} [parametres.y = 0] Ordonnée du point de départ du tracé
 * @param {number?} [parametres.axeEpaisseur = 2] Épaisseur de l'axe gradué
 * @param {string?} [parametres.axeCouleur = 'black'] Couleur de l'axe gradué : du type 'blue' ou du type '#f15929'
 * @param {string?} [parametres.axeStyle = "->"] Style final de l'axe gradué
 * @param {number?} [parametres.axeHauteur = 4] Définit la "largeur" de l'axe, celle des graduations et du style final
 * @param {string?} [parametres.axePosition = 'H'] Position de l'axe : 'H' pour horizontal, 'V' pour vertical
 * @param {number?} [parametres.thickEpaisseur = 2] Épaisseur des graduations
 * @param {string?} [parametres.thickCouleur = axeCouleur] Couleur des graduations : du type 'blue' ou du type '#f15929'
 * @param {number?} [parametres.thickDistance = 1] Distance entre deux graduations principales
 * @param {number?} [parametres.thickOffset = 0] Décalage de toutes les graduations sur l'axe (pour, par exemple, faire coïncider le début de l'axe avec une graduation)
 * @param {boolean?} [parametres.thickSec = false] Affichage (ou pas) des graduations secondaires
 * @param {number?} [parametres.thickSecDist = 0.1] Distance entre deux graduations secondaires
 * @param {boolean?} [parametres.thickTer = false] Affichage (ou pas) des graduations secondaires
 * @param {number?} [parametres.thickTerDist = 0.1] Distance entre deux graduations tertiaires, false sinon
 * @param {[number, string][]} [parametres.pointListe = []] Liste de points à mettre sur l'axe comme, par exemple, [[3.4,'A'],[3.8,'B']]. Les noms se placent au-dessus de l'axe.
 * @param {number?} [parametres.labelPointTaille = 10] Taille (hauteur) de la police des points (de la liste des points pointListe) utilisée de 5 = \small à 20=\huge...
 * @param {number?} [parametres.labelPointLargeur = 20] Largeur de la boîte où sont affichés les points (de la liste des points pointListe) utilisée de 5 = \small à 20=\huge...
 * @param {string?} [parametres.pointCouleur = 'blue'] Couleur des points de la liste pointListe : du type 'blue' ou du type '#f15929'
 * @param {number?} [parametres.pointTaille = 4] Taille en pixels des points de la liste  pointListe
 * @param {string?} [parametres.pointStyle = '+'] Style des points de la liste pointListe
 * @param {number?} [parametres.pointOpacite = 0.8] Opacité des points de la liste pointListe
 * @param {number?} [parametres.pointEpaisseur = 2] Épaisseur des points de la liste pointListe
 * @param {boolean?} [parametres.labelsPrincipaux = true] Présence (ou non) des labels numériques principaux
 * @param {boolean?} [parametres.labelsSecondaires = false] Présence (ou non) des labels numériques secondaires
 * @param {number?} [parametres.step1 = 1] Pas des labels numériques principaux
 * @param {number?} [parametres.step2 = 1] Pas des labels numériques secondaires
 * @param {number?} [parametres.labelDistance = (axeHauteur + 10) / context.pixelsParCm] Distance entre les labels et l'axe
 * @param {number?} [parametres.labelCustomDistance = (axeHauteur + 10) / context.pixelsParCm] Distance entre les labels et l'axe
 * @param {array?} [parametres.labelListe = []] Liste de labels à mettre sous l'axe comme, par exemple, [[2.8,'x'],[3.1,'y']]. Les noms se placent en-dessous de l'axe.
 * @param {string?} [parametres.labelColor = 'black'] Couleur des labels de la liste labelListe : du type 'blue' ou du type '#f15929'
 * @param {number?} [parametres.labelScale = 1] Echelle des labels
 * @param {string?} [parametres.Legende = ''] Légende de l'axe
 * @param {number?} [parametres.LegendePosition] Position de la légende
 * @property {number?} Unite Nombre de cm par unité
 * @property {number?} Min Valeur minimum labelisée sur l'axe (les graduations commencent un peu avant)
 * @property {number?} Max Valeur maximum labelisée sur l'axe (les graduations finissent un peu après)
 * @author Jean-Claude Lhote
 * @return {array} Liste d'objets MathAlea2D
 */
// JSDOC Validee par EE Aout 2022
export class DroiteGraduee extends ObjetMathalea2D {
  Unite: number
  Min: number
  Max: number
  constructor({
    Unite = 10,
    Min = 0,
    Max = 2,
    x = 0,
    y = 0,
    axeEpaisseur = 2,
    axeCouleur = 'black',
    axeStyle = '->',
    axeHauteur = 4,
    axePosition = 'H',
    thickEpaisseur = 2,
    thickCouleur = axeCouleur,
    thickDistance = 1,
    thickOffset = 0,
    thickSecDist = 0.1,
    thickSec = false,
    thickTerDist = 0.01,
    thickTer = false,
    pointListe = [],
    labelPointTaille = 10,
    labelPointLargeur = 20,
    pointCouleur = 'blue',
    pointTaille = 4,
    pointStyle = '+',
    pointOpacite = 0.8,
    pointEpaisseur = 2,
    labelsPrincipaux = true,
    labelsSecondaires = false,
    labelColor = 'black',
    step1 = 1,
    step2 = 1,
    labelCustomDistance = (axeHauteur + 10) / context.pixelsParCm,
    labelDistance = (axeHauteur + 10) / context.pixelsParCm,
    labelListe = [],
    // labelColor = 'black',
    // labelScale = 1,
    Legende = '',
    LegendePosition = (Max - Min) * Unite + 1.5,
  }: {
    Unite?: number
    Min?: number
    Max?: number
    x?: number
    y?: number
    axeEpaisseur?: number
    axeCouleur?: string
    axeStyle?: string
    axeHauteur?: number
    axePosition?: string
    thickEpaisseur?: number
    thickCouleur?: string
    thickDistance?: number
    thickOffset?: number
    thickSecDist?: number
    thickSec?: boolean
    thickTerDist?: number
    thickTer?: boolean
    pointListe?: [number, string][]
    labelPointTaille?: number
    labelPointLargeur?: number
    pointCouleur?: string
    pointTaille?: number
    pointStyle?: string
    pointOpacite?: number
    pointEpaisseur?: number
    labelsPrincipaux?: boolean
    labelsSecondaires?: boolean
    step1?: number
    step2?: number
    labelCustomDistance?: number
    labelDistance?: number
    labelListe?: [number, string][]
    labelColor?: string
    Legende?: string
    LegendePosition?: number
  }) {
    super()
    // correctif Jean-Claude Lhote 15/08/2023
    // Les propriétés exportables
    this.Unite = Unite
    this.Min = Min
    this.Max = Max
    this.objets = []
    let S
    let T
    let P
    let i
    let longueurTotale = (Max - Min) * Unite + 0.5 // la longueur totale de l'axe flèche comprise
    let absord = [1, 0] // Constantes pour gérer la verticalité ou l'horizontalité de l'axe
    if (axePosition !== 'H') absord = [0, 1]
    // dessin de l'axe
    if (axeStyle === '->') {
      longueurTotale += 0.2
      S = segment(
        point(x - 0.2 * absord[0], y - 0.2 * absord[1]),
        point(x + longueurTotale * absord[0], y + longueurTotale * absord[1]),
        axeCouleur,
      )
      S.styleExtremites = '->'
      S.tailleExtremites = axeHauteur
      S.epaisseur = axeEpaisseur
    } else {
      S = segment(
        point(x, y),
        point(x + longueurTotale * absord[0], y + longueurTotale * absord[1]),
        axeCouleur,
      )
      S.styleExtremites = axeStyle || '|->'
      S.epaisseur = axeEpaisseur
      S.tailleExtremites = axeHauteur
    }
    this.objets.push(S)
    let factor
    const r = 10 / context.pixelsParCm
    if (thickTer) factor = 1 / thickTerDist
    else if (thickSec) factor = 1 / thickSecDist
    else factor = 1 / thickDistance

    const Min2 = Math.ceil((Min + thickOffset) * factor) // début des graduations (ne coïncide pas nécéssairement avec le début de la droite)
    const Max2 = Math.floor((Max - thickOffset) * factor) // fin des graduations
    const pas1 = Math.round(thickDistance * factor)
    const pas2 = Math.round(thickSecDist * factor)
    for (let j = Min2; j <= Max2; j++) {
      i = (j - Min * factor) / factor
      if (j % pas1 === 0) {
        // Graduation principale
        S = segment(
          point(
            x + i * Unite * absord[0] - (axeHauteur / 8) * r * absord[1],
            y - (axeHauteur / 8) * r * absord[0] + i * Unite * absord[1],
          ),
          point(
            x + i * Unite * absord[0] + (axeHauteur / 8) * r * absord[1],
            y + (axeHauteur / 8) * r * absord[0] + i * Unite * absord[1],
          ),
          thickCouleur,
        )
        S.epaisseur = thickEpaisseur
        this.objets.push(S)
      } else if (j % pas2 === 0 && thickSec) {
        // Graduation secondaire
        S = segment(
          point(
            x + i * Unite * absord[0] - (axeHauteur / 12) * r * absord[1],
            y - (axeHauteur / 12) * r * absord[0] + i * Unite * absord[1],
          ),
          point(
            x + i * Unite * absord[0] + (axeHauteur / 12) * r * absord[1],
            y + (axeHauteur / 12) * r * absord[0] + i * Unite * absord[1],
          ),
          thickCouleur,
        )
        S.epaisseur = thickEpaisseur / 2
        S.opacite = 0.8
        this.objets.push(S)
      } else if (thickTer) {
        // Graduation tertiaire
        S = segment(
          point(
            x + i * Unite * absord[0] - (axeHauteur / 16) * r * absord[1],
            y - (axeHauteur / 16) * r * absord[0] + i * Unite * absord[1],
          ),
          point(
            x + i * Unite * absord[0] + (axeHauteur / 16) * r * absord[1],
            y + (axeHauteur / 16) * r * absord[0] + i * Unite * absord[1],
          ),
          thickCouleur,
        )
        S.epaisseur = thickEpaisseur / 4
        S.opacite = 0.6
        this.objets.push(S)
      }
    }
    // Les labels principaux
    if (labelsPrincipaux) {
      for (let j = Min2; j <= Max2; j++) {
        if (j % (step1 * pas1) === 0) {
          i = (j - Min * factor) / factor
          T = latexParCoordonnees(
            `${nombreAvecEspace(arrondi(Min + i, 3))}`,
            x + i * Unite * absord[0] - labelDistance * absord[1],
            y + i * Unite * absord[1] - labelDistance * absord[0],
            'black',
            0,
            0,
            '',
            8,
          )
          this.objets.push(T)
        }
      }
    }
    if (labelsSecondaires) {
      for (let j = Min2; j <= Max2; j++) {
        if (j % (step2 * pas2) === 0 && j % (step1 * pas1) !== 0) {
          i = (j - Min * factor) / factor
          T = latexParCoordonnees(
            `${nombreAvecEspace(arrondi(Min + i, 3))}`,
            x + i * Unite * absord[0] - labelDistance * absord[1],
            y + i * Unite * absord[1] - labelDistance * absord[0],
            'black',
            0,
            0,
            '',
            8,
          )
          this.objets.push(T)
        }
      }
    }
    // Les labels facultatifs
    let t
    if (labelListe.length !== 0) {
      for (const p of labelListe) {
        t = latex2d(
          p[1],
          x -
            labelCustomDistance * absord[1] +
            (p[0] - Min) * absord[0] * Unite,
          y -
            labelCustomDistance * absord[0] +
            (p[0] - Min) * absord[1] * Unite,
          { letterSize: 'normalsize', color: labelColor },
        )
        this.objets.push(t)
      }
    }
    if (Legende !== '') {
      this.objets.push(
        texteParPosition(
          Legende,
          x + LegendePosition * absord[0],
          y + LegendePosition * absord[1],
        ),
      )
    }
    if (pointListe.length !== 0) {
      let lab
      for (const p of pointListe) {
        P = point(
          x + (p[0] - Min) * absord[0] * Unite,
          y + (p[0] - Min) * absord[1] * Unite,
          p[1],
        )
        T = tracePoint(P, pointCouleur)
        T.taille = pointTaille
        T.tailleTikz = Math.max(T.taille / 30, 0.3)
        T.opacite = pointOpacite
        T.style = pointStyle
        T.epaisseur = pointEpaisseur
        lab = latex2d(
          p[1],
          x - 0.8 * absord[1] + (p[0] - Min) * absord[0] * Unite,
          y + 0.8 * absord[0] + (p[0] - Min) * absord[1] * Unite,
          { color: pointCouleur },
        )

        this.objets.push(T, lab)
      }
    }
    const bordures = fixeBordures(this.objets, {
      rxmin: 0,
      rxmax: 0,
      rymin: 0,
      rymax: 0,
    })
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
  }
}

/**  Trace un axe gradué
 * @param {Object} parametres À saisir entre accolades
 * @param {number} [parametres.Unite = 10] Nombre de cm par unité
 * @param {number} [parametres.Min = 10] Valeur minimum labelisée sur l'axe (les graduations commencent un peu avant)
 * @param {number} [parametres.Max = 10] Valeur maximum labelisée sur l'axe (les graduations finissent un peu après)
 * @param {number} [parametres.x = 0] Abscisse du point de départ du tracé
 * @param {number} [parametres.y = 0] Ordonnée du point de départ du tracé
 * @param {number} [parametres.axeEpaisseur = 2] Épaisseur de l'axe gradué
 * @param {string} [parametres.axeCouleur = 'black'] Couleur de l'axe gradué : du type 'blue' ou du type '#f15929'
 * @param {string} [parametres.axeStyle = '->'] Style final de l'axe gradué
 * @param {number} [parametres.axeHauteur = 4] Définit la "largeur" de l'axe, celle des graduations et du style final
 * @param {string} [parametres.axePosition = 'H'] Position de l'axe : 'H' pour horizontal, 'V' pour vertical
 * @param {number} [parametres.thickEpaisseur = 2] Épaisseur des graduations
 * @param {string} [parametres.thickCouleur = axeCouleur] Couleur des graduations : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.thickDistance = 1] Distance entre deux graduations principales
 * @param {number} [parametres.thickOffset = 0] Décalage de toutes les graduations sur l'axe (pour, par exemple, faire coïncider le début de l'axe avec une graduation)
 * @param {boolean?} [parametres.thickSec = false] Affichage (ou pas) des graduations secondaires
 * @param {number} [parametres.thickSecDist = 0.1] Distance entre deux graduations secondaires
 * @param {boolean?} [parametres.thickTer = false] Affichage (ou pas) des graduations secondaires
 * @param {number} [parametres.thickTerDist = 0.1] Distance entre deux graduations tertiaires, false sinon
 * @param {array?} [parametres.pointListe = []] Liste de points à mettre sur l'axe comme, par exemple, [[3.4,'A'],[3.8,'B']]. Les noms se placent au-dessus de l'axe.
 * @param {number} [parametres.labelPointTaille = 10] Taille (hauteur) de la police des points (de la liste des points pointListe) utilisée de 5 = \small à 20=\huge...
 * @param {number} [parametres.labelPointLargeur = 20] Largeur de la boîte où sont affichés les points (de la liste des points pointListe) utilisée de 5 = \small à 20=\huge...
 * @param {string} [parametres.pointCouleur = 'blue'] Couleur des points de la liste pointListe : du type 'blue' ou du type '#f15929'
 * @param {number} [parametres.pointTaille = 4] Taille en pixels des points de la liste  pointListe
 * @param {string} [parametres.pointStyle = '+'] Style des points de la liste pointListe
 * @param {number} [parametres.pointOpacite = 0.8] Opacité des points de la liste pointListe
 * @param {number} [parametres.pointEpaisseur = 2] Épaisseur des points de la liste pointListe
 * @param {boolean?} [parametres.labelsPrincipaux = true] Présence (ou non) des labels numériques principaux
 * @param {boolean?} [parametres.labelsSecondaires = false] Présence (ou non) des labels numériques secondaires
 * @param {array?} [parametres.labelListe = []] Liste de labels à mettre sous l'axe comme, par exemple, [[2.8,'x'],[3.1,'y']]. Les noms se placent en-dessous de l'axe. * @param {number} [parametres.step1 = 1] Pas des labels numériques principaux
 * @param {number} [parametres.step2 = 1] Pas des labels numériques secondaires
 * @param {number} [parametres.labelDistance = (axeHauteur + 10) / context.pixelsParCm] Distance entre les labels et l'axe
 * @param {number} [parametres.labelCustomDistance = (axeHauteur + 10) / context.pixelsParCm] Distance entre les labels de labelListe et l'axe
 * @param {string?} [parametres.labelColor = 'black'] Couleur des labels de la liste labelListe : du type 'blue' ou du type '#f15929'
 * @param {number?} [parametres.labelScale = 1] Echelle des labels
 * @param {string} [parametres.Legende = ''] Légende de l'axe
 * @param {number} [parametres.LegendePosition] Position de la légende
 * @example droiteGraduee({
        x: 0,
        y: 3,
        Min: -2.7,
        Max: 12 + 0.2,
        thickSec: true,
        Unite: 3,
        thickCouleur: 'red',
        axeCouleur: 'blue',
        axeHauteur: 4,
        labelsPrincipaux: false,
        labelListe: [[0, 'O'], [1, 'I']],
        pointListe: [[-1, 'A'], [5, 'B'], [7.2, 'C']],
        pointTaille: 6,
        pointCouleur: 'gray',
        pointStyle: '|',
        pointEpaisseur: 3
      })
 // Trace une droite graduée avec différentes options
 * @author Jean-Claude Lhote
 * @return {DroiteGraduee}
 */
// JSDOC Validee par EE Aout 2022
export function droiteGraduee({
  Unite = 10,
  Min = 0,
  Max = 2,
  x = 0,
  y = 0,
  axeEpaisseur = 2,
  axeCouleur = 'black',
  axeStyle = '->',
  axeHauteur = 4,
  axePosition = 'H',
  thickEpaisseur = 2,
  thickCouleur = axeCouleur,
  thickDistance = 1,
  thickOffset = 0,
  thickSecDist = 0.1,
  thickSec = false,
  thickTerDist = 0.01,
  thickTer = false,
  pointListe = [],
  labelPointTaille = 10,
  labelPointLargeur = 20,
  pointCouleur = 'blue',
  pointTaille = 4,
  pointStyle = '+',
  pointOpacite = 0.8,
  pointEpaisseur = 2,
  labelsPrincipaux = true,
  labelsSecondaires = false,
  labelColor = 'black',
  step1 = 1,
  step2 = 1,
  labelCustomDistance = (axeHauteur + 10) / context.pixelsParCm,
  labelDistance = (axeHauteur + 10) / context.pixelsParCm,
  labelListe = [],
  // labelColor = 'black',
  // labelScale = 1,
  Legende = '',
  LegendePosition = (Max - Min) * Unite + 1.5,
}: {
  Unite?: number
  Min?: number
  Max?: number
  x?: number
  y?: number
  axeEpaisseur?: number
  axeCouleur?: string
  axeStyle?: string
  axeHauteur?: number
  axePosition?: string
  thickEpaisseur?: number
  thickCouleur?: string
  thickDistance?: number
  thickOffset?: number
  thickSecDist?: number
  thickSec?: boolean
  thickTerDist?: number
  thickTer?: boolean
  pointListe?: [number, string][]
  labelPointTaille?: number
  labelPointLargeur?: number
  pointCouleur?: string
  pointTaille?: number
  pointStyle?: string
  pointOpacite?: number
  pointEpaisseur?: number
  labelsPrincipaux?: boolean
  labelsSecondaires?: boolean
  step1?: number
  step2?: number
  labelCustomDistance?: number
  labelDistance?: number
  labelListe?: [number, string][]
  labelColor?: string
  Legende?: string
  LegendePosition?: number
}) {
  return new DroiteGraduee({
    Unite,
    Min,
    Max,
    x,
    y,
    axeEpaisseur,
    axeCouleur,
    axeStyle,
    axeHauteur,
    axePosition,
    thickEpaisseur,
    thickCouleur,
    thickDistance,
    thickOffset,
    thickSecDist,
    thickSec,
    thickTerDist,
    thickTer,
    pointListe,
    labelPointTaille,
    labelPointLargeur,
    pointCouleur,
    pointTaille,
    pointStyle,
    pointOpacite,
    pointEpaisseur,
    labelsPrincipaux,
    labelsSecondaires,
    step1,
    step2,
    labelDistance,
    labelCustomDistance,
    labelListe,
    labelColor,
    Legende,
    LegendePosition,
  })
}

/**
 * Trace un repère orthonormé
 * @param {number} [xmin=-30] Valeur minimale sur l'axe des abscisses
 * @param {number} [ymin=-30] Valeur minimale sur l'axe des ordonnées
 * @param {number} [xmax=30] Valeur maximale sur l'axe des abscisses
 * @param {number} [ymax=30] Valeur maximale sur l'axe des ordonnées
 * @param {number} [thick=0.2] Demi-longueur des tirets de chaque graduation
 * @param {number} [xstep=1] Pas sur l'axe des abscisses
 * @param {number} [ystep=1] Pas sur l'axe des ordonnées
 * @param {number} [epaisseur=2] Epaisseur des deux axes
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {number} [tailleExtremites=4] Taille des flèches à l'extrémité des axes.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class Axes extends ObjetMathalea2D {
  constructor(
    xmin = -30,
    ymin = -30,
    xmax = 30,
    ymax = 30,
    thick = 0.2,
    xstep = 1,
    ystep = 1,
    epaisseur = 2,
    color = 'black',
    tailleExtremites = 4,
  ) {
    super()
    this.objets = []
    let yabscisse
    ymin > 0 ? (yabscisse = ymin) : (yabscisse = 0)
    let xordonnee
    xmin > 0 ? (xordonnee = xmin) : (xordonnee = 0)
    const abscisse = segment(xmin, yabscisse, xmax, yabscisse, color)
    abscisse.styleExtremites = '->'
    abscisse.tailleExtremites = tailleExtremites
    abscisse.epaisseur = epaisseur
    const ordonnee = segment(xordonnee, ymin, xordonnee, ymax, color)
    ordonnee.styleExtremites = '->'
    ordonnee.epaisseur = epaisseur
    ordonnee.tailleExtremites = tailleExtremites
    this.objets.push(abscisse, ordonnee)
    for (let x = xmin; x < xmax; x = x + xstep) {
      const s = segment(x, yabscisse - thick, x, yabscisse + thick, color)
      s.epaisseur = epaisseur
      this.objets.push(s)
    }
    for (let y = ymin; y < ymax; y = y + ystep) {
      const s = segment(xordonnee - thick, y, xordonnee + thick, y, color)
      s.epaisseur = epaisseur
      this.objets.push(s)
    }
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
  // this.commentaire = `Axes(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, thick = ${thick})`
}

/**
 * Trace un repère orthonormé
 * @param {number} [xmin=-30] Valeur minimale sur l'axe des abscisses
 * @param {number} [ymin=-30] Valeur minimale sur l'axe des ordonnées
 * @param {number} [xmax=30] Valeur maximale sur l'axe des abscisses
 * @param {number} [ymax=30] Valeur maximale sur l'axe des ordonnées
 * @param {number} [thick=0.2] Demi-longueur des tirets de chaque graduation
 * @param {number} [xstep=1] Pas sur l'axe des abscisses
 * @param {number} [ystep=1] Pas sur l'axe des ordonnées
 * @param {number} [epaisseur=2] Epaisseur des deux axes
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @example axes()
 * // Trace un repère orthonormé dont les axes des abscisses et des ordonnées ont pour minimum -30, maximum -30, épaisseur 2, avec un pas de 1 et de couleur noire. Le tiret de chaque graduation mesure 0,4.
 * @example axes(-10,-5,20,3,0.25,2,0.5,1,'red')
 * // Trace un repère orthonormé rouge dont les axes des abscisses et des ordonnées ont pour épaisseur 1 et dont le tiret de chaque graduation mesure 0,5.
 * // L'axe des abscisses va de -10 à 20 avec un pas de 2. L'axe des ordonnées va de -5 à 3 avec un pas de 0,5.
 * @return {Axes}
 * @author Rémi Angot
 */
// JSDOC Validee par EE Juin 2022
export function axes(
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  thick = 0.2,
  xstep = 1,
  ystep = 1,
  epaisseur = 2,
  color = 'black',
) {
  return new Axes(xmin, ymin, xmax, ymax, thick, xstep, ystep, epaisseur, color)
}

/**
 * Trace une droite verticale graduée
 * @param {number} [ymin=-2] Valeur minimale sur l'axe vertical
 * @param {number} [ymax=5] Valeur maximale sur l'axe vertical
 * @param {number} [thick=0.2] Largeur des tirets de chaque graduation principale
 * @param {number} [ystep=1] Pas sur l'axe des ordonnées
 * @param {number} [epaisseur=2] Epaisseur des deux axes
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {number} [ytick=2] Nombre de partage entre deux graduations principales
 * @param {string} [titre=''] Titre de l'axe
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {number[]} bordures Coordonnées de la fenêtre d'affichage du genre [-2,-2,5,5]
 * @author Frédéric Piou
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class AxeY extends ObjetMathalea2D {
  constructor(
    ymin = -2,
    ymax = 5,
    thick = 0.2,
    ystep = 1,
    epaisseur = 2,
    color = 'black',
    ytick = 2,
    titre = '',
  ) {
    super()
    this.objets = []
    if (titre !== '') {
      this.objets.push(
        texteParPoint(
          titre,
          point(-1 - thick - 0.1, ymax),
          0,
          color,
          1,
          'milieu',
          false,
          1,
        ),
      )
    }
    const ordonnee = segment(-1, ymin.valueOf(), -1, ymax.valueOf(), color)
    ordonnee.styleExtremites = '->'
    ordonnee.epaisseur = epaisseur
    this.objets.push(ordonnee)
    for (let y = ymin; y < ymax; y = y + ystep) {
      const s = segment(-1 - thick, y.valueOf(), -1, y.valueOf(), color)
      s.epaisseur = epaisseur
      this.objets.push(s)
    }
    for (let y = ymin; y < ymax; y = y + ystep / ytick) {
      const s = segment(-1 - thick / 2, y.valueOf(), -1, y.valueOf(), color)
      s.epaisseur = epaisseur
      this.objets.push(s)
    }
    this.bordures = [1000, 1000, -1000, -1000]
    for (const objet of this.objets) {
      if (objet.bordures !== undefined) {
        this.bordures = [
          Math.min(this.bordures[0], objet.bordures[0]),
          Math.min(this.bordures[1], objet.bordures[1]),
          Math.max(this.bordures[2], objet.bordures[2]),
          Math.max(this.bordures[3], objet.bordures[3]),
        ]
      }
    }
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
 * Trace une droite verticale graduée
 * @param {number} [ymin=-2] Valeur minimale sur l'axe vertical
 * @param {number} [ymax=5] Valeur maximale sur l'axe vertical
 * @param {number} [thick=0.2] Largeur des tirets de chaque graduation principale
 * @param {number} [ystep=1] Pas sur l'axe des ordonnées
 * @param {number} [epaisseur=2] Epaisseur des deux axes
 * @param {string} [color='black'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {number} [ytick=2] Nombre de partage entre deux graduations principales
 * @param {string} [titre=''] Titre de l'axe
 * @example axeY()
 * // Trace un axe noir vertical gradué de -2 à 5, de 1 en 1, avec une petite graduation entre deux graduations principales (de longueur 0.2 et d'épaisseur 2), et sans titre
 * @example axeY(0,10,0.25,2,1,'red',5,'titre')
 * // Trace un axe rouge vertical gradué de 0 à 10, de 2 en 2, avec quatre petites graduations entre deux graduations principales (de longueur 0.25 et d'épaisseur 1), et avec comme titre de l'axe : titre
 * @author Frédéric Piou
 * @return {AxeY}
 */
// JSDOC Validee par EE Juin 2022
export function axeY(
  ymin = -2,
  ymax = 5,
  thick = 0.2,
  ystep = 1,
  epaisseur = 2,
  color = 'black',
  ytick = 2,
  titre = '',
) {
  return new AxeY(ymin, ymax, thick, ystep, epaisseur, color, ytick, titre)
}

/**  Place des labels sur un axe vertical précédemment
 * @param  {number} [ymin = 1] Ordonnée minimale sur l'axe
 * @param  {number} [ymax = 20] Ordonnée maximale sur l'axe
 * @param  {number} [step = 1] Pas entre chaque label
 * @param {string} [color = 'black'] Couleur des labels : du type 'blue' ou du type '#f15929'
 * @param  {number} [pos = -0.6] Décalage entre les labels et l'axe vertical
 * @param  {number} [coeff = 1] Coefficient multiplicatif sur chaque label
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @author Rémi Angot modifié par Frédéric Piou
 * @class
 */
// JSDOC Validee par EE Septembre 2022
export class LabelY extends ObjetMathalea2D {
  constructor(
    ymin = 1,
    ymax = 20,
    step = 1,
    color = 'black',
    pos = -0.6,
    coeff = 1,
  ) {
    super()
    this.objets = []
    for (let y = Math.ceil(ymin / coeff); y * coeff <= ymax; y = y + step) {
      this.objets.push(
        texteParPoint(
          stringNombre(y * coeff, 3),
          point(pos, y),
          0,
          color,
          1,
          'gauche',
          true,
        ),
      )
    }
    const bordures = fixeBordures(this.objets, {
      rxmin: 0,
      rxmax: 0,
      rymin: 0,
      rymax: 0,
    })
    this.bordures = [bordures.xmin, bordures.ymin, bordures.xmax, bordures.ymax]
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**  Place des labels sur un axe vertical précédemment
 * @param  {number} [ymin = 1] Ordonnée minimale sur l'axe
 * @param  {number} [ymax = 20] Ordonnée maximale sur l'axe
 * @param  {number} [step = 1] Pas entre chaque label
 * @param {string} [color = 'black'] Couleur des labels : du type 'blue' ou du type '#f15929'
 * @param  {number} [pos = -0.6] Décalage entre les labels et l'axe vertical
 * @param  {number} [coeff = 1] Coefficient multiplicatif sur chaque label
 * @example labelY()
 * // Note, sur un axe (prédéfini de 1 en 1), des labels noirs, de 0 à 20, de 2 en 2, avec un décalage de -0,6 par rapport à l'axe
 * @example labelY(0, 160, 2, 'red', -2, 20)
 * // Note, sur un axe (prédéfini de 1 en 1), des labels rouges, de 0 à 160, de 40 (2*20) en 40, avec un décalage de -2 par rapport à l'axe.
 * @author Rémi Angot modifié par Frédéric Piou
 * @return {LabelY}
 */
// JSDOC Validee par EE Septembre 2022
export function labelY(
  ymin = 1,
  ymax = 20,
  step = 1,
  color = 'black',
  pos = -0.6,
  coeff = 1,
) {
  return new LabelY(ymin, ymax, step, color, pos, coeff)
}

/**  Trace une grille quadrillée dont le coin en bas à gauche est (xmin, ymin) et celui à droite est au maximum (xmax, ymax), de couleur et opacité choisie, avec un pas choisi et avec ou sans pointillés
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de la grille
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de la grille
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de la grille
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de la grille
 * @param {string} [color = 'gray'] Couleur de la grille : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de la grille : entre 0 et 1
 * @param {number} [step = 1] Pas de la grille
 * @param {number} [pointilles = 0] Style des pointillés de la grille (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de la grille. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opacite Opacité de la grille : entre 0 et 1
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
export class Grille extends ObjetMathalea2D {
  constructor(
    xmin = -30,
    ymin = -30,
    xmax = 30,
    ymax = 30,
    color = 'gray',
    opacite = 0.4,
    step = 1,
    pointilles = 0,
  ) {
    super()
    this.color = colorToLatexOrHTML(color)
    this.opacite = opacite
    this.objets = []
    let x = xmin
    let nbStep = Math.round((xmax - xmin) / step)
    for (let i = 0; i <= nbStep; i++) {
      const s = segment(x, ymin, x, ymax, color)
      x += step
      s.opacite = this.opacite
      if (pointilles) {
        s.pointilles = 5
      }
      this.objets.push(s)
    }
    let y = ymin
    nbStep = Math.round((ymax - ymin) / step)
    for (let i = 0; i <= nbStep; i++) {
      const s = segment(xmin, y, xmax, y, color)
      y += step
      s.opacite = this.opacite
      if (pointilles) {
        s.pointilles = 5
      }
      this.objets.push(s)
    }
    this.bordures = [xmin, ymin, xmax, ymax]
  }

  // this.commentaire = `Grille(xmin = ${xmin}, ymin = ${ymin}, xmax = ${xmax}, ymax = ${ymax}, color = ${this.color}, opacite = ${this.opacite}, pas = ${step})`
  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }

  svgml(coeff: number, amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (objet.svgml) {
        code += '\n\t' + objet.svgml(coeff, amp)
      } else {
        code += '\n\t' + objet.svg(coeff)
      }
    }
    return code
  }

  tikzml(amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (typeof objet.tikzml === 'undefined') {
        code += '\n\t' + objet.tikz()
      } else {
        code += '\n\t' + objet.tikzml(amp)
      }
    }
    return code
  }
}

/**  Trace une grille quadrillée dont le coin en bas à gauche est (xmin, ymin) et celui à droite est au maximum (xmax, ymax), de couleur et opacité choisie, avec un pas choisi et avec ou sans pointillés
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de la grille
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de la grille
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de la grille
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de la grille
 * @param {string} [color = 'gray'] Couleur de la grille : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de la grille : entre 0 et 1
 * @param {number} [step = 1] Pas de la grille
 * @param {number} [pointilles = 0] Style des pointillés de la grille (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @example grid = grille() // Trace une grille avec toutes les options par défaut
 * @example grid = grille(-3, -3, 27, 18, 'red', 0.2, 0.5, true) // Trace une grille avec toutes les options différentes de celles par défaut
 * @author Rémi Angot
 * @return {Grille}
 */
// JSDOC Validee par EE Aout 2022
export function grille(
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = 'gray',
  opacite = 0.4,
  step = 1,
  pointilles = 0,
) {
  return new Grille(xmin, ymin, xmax, ymax, color, opacite, step, pointilles)
}

/**  Trace des parallèles à l'axe des abscisses
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
 * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
 * @param {number} [step = 1] Pas de ces parallèles
 * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de ces parallèles. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opacite Opacité de ces parallèles : entre 0 et 1
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
export class LignesHorizontales extends ObjetMathalea2D {
  constructor(
    xmin = -30,
    ymin = -30,
    xmax = 30,
    ymax = 30,
    color = 'gray',
    opacite = 0.4,
    step = 1,
    pointilles = '',
  ) {
    super()
    this.color = colorToLatexOrHTML(color)
    this.opacite = opacite
    this.objets = []
    for (let i = ymin; i <= ymax; i += step) {
      const s = segment(xmin, i, xmax, i, color)
      s.opacite = this.opacite
      if (pointilles) {
        s.pointilles = 5
      }
      this.objets.push(s)
    }
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**  Trace des parallèles à l'axe des abscisses
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
 * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
 * @param {number} [step = 1] Pas de ces parallèles
 * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @example grid = lignesHorizontales() // Trace des parallèles à l'axe des abscisses avec toutes les options par défaut
 * @example grid = lignesHorizontales(-3, -3, 27, 18, 'red', 0.2, 0.5, true) // Trace des parallèles à l'axe des abscisses avec toutes les options différentes de celles par défaut
 * @author Rémi Angot
 * @return {LignesHorizontales}
 */
// JSDOC Validee par EE Aout 2022
export function lignesHorizontales(
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = 'gray',
  opacite = 0.4,
  step = 1,
  pointilles = '',
) {
  return new LignesHorizontales(
    xmin,
    ymin,
    xmax,
    ymax,
    color,
    opacite,
    step,
    pointilles,
  )
}

/**  Trace des verticales à l'axe des ordonnées
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
 * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
 * @param {number} [step = 1] Pas de ces parallèles
 * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur de ces parallèles. À associer obligatoirement à colorToLatexOrHTML().
 * @property {number} opacite Opacité de ces parallèles : entre 0 et 1
 * @author Rémi Angot
 * @class
 */
// JSDOC Validee par EE Aout 2022
export class LignesVerticales extends ObjetMathalea2D {
  constructor(
    xmin = -30,
    ymin = -30,
    xmax = 30,
    ymax = 30,
    color = 'gray',
    opacite = 0.4,
    step = 1,
    pointilles = '',
  ) {
    super()
    this.color = colorToLatexOrHTML(color)
    this.opacite = opacite
    this.objets = []
    for (let i = xmin; i <= xmax; i = i + step) {
      const s = segment(i, ymin, i, ymax, color)
      s.opacite = this.opacite
      if (pointilles) {
        s.pointilles = 5
      }
      this.objets.push(s)
    }
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
 * LignesVerticales(xmin,ymin,xmax,ymax,color,opacite,pas)
 *
 * @author Rémi Angot
 */
/**  Trace des parallèles à l'axe des ordonnées
 * @param {number} [xmin = -30] Abscisse du coin en bas à gauche de ces parallèles
 * @param {number} [ymin = -30] Ordonnée du coin en bas à gauche de ces parallèles
 * @param {number} [xmax = 30] Abscisse du coin en haut à droite de ces parallèles
 * @param {number} [ymax = 30] Ordonnée du coin en haut à droite de ces parallèles
 * @param {string} [color = 'gray'] Couleur de ces parallèles : du type 'blue' ou du type '#f15929'
 * @param {number} [opacite = 0.4] Opacité de ces parallèles : entre 0 et 1
 * @param {number} [step = 1] Pas de ces parallèles
 * @param {number} [pointilles = 0] Style des pointillés de ces parallèles (entier entre 1 et 5). Si autre chose, pas de pointillés.
 * @example grid = lignesHorizontales() // Trace des parallèles à l'axe des ordonnées avec toutes les options par défaut
 * @example grid = lignesHorizontales(-3, -3, 27, 18, 'red', 0.2, 0.5, true) // Trace des parallèles à l'axe des ordonnées avec toutes les options différentes de celles par défaut
 * @author Rémi Angot
 * @return {LignesVerticales}
 */
// JSDOC Validee par EE Aout 2022
export function lignesVerticales(
  xmin = -30,
  ymin = -30,
  xmax = 30,
  ymax = 30,
  color = 'gray',
  opacite = 0.4,
  step = 1,
  pointilles = '',
) {
  return new LignesVerticales(
    xmin,
    ymin,
    xmax,
    ymax,
    color,
    opacite,
    step,
    pointilles,
  )
}

export class Seyes extends ObjetMathalea2D {
  constructor(
    xmin = 0,
    ymin = 0,
    xmax = 15,
    ymax = 15,
    opacite1 = 0.5,
    opacite2 = 0.2,
  ) {
    super()
    this.objets = []
    for (let y = ymin; y <= ymax; y = y + 0.25) {
      if (y % 1 !== 0) {
        const d = segment(xmin, y, xmax, y, 'red')
        d.opacite = opacite2
        this.objets.push(d)
      }
    }
    this.objets.push(grille(xmin, ymin, xmax, ymax, 'blue', opacite1, 1))
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
 * Fais un quadrillage avec des grands carreaux.
 *
 * Pour une sortie LaTeX, il faut penser à ajouter scale = .8
 *
 * @param {number} xmin
 * @param {number} ymin
 * @param {number} xmax
 * @param {number} ymax
 * @param {number?} opacite1=0.5
 * @param {number?} opacite2=0.2
 * @author Rémi Angot
 */
export function seyes(
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
  opacite1 = 0.5,
  opacite2 = 0.2,
) {
  return new Seyes(xmin, ymin, xmax, ymax, opacite1, opacite2)
}

/**
 * @param {number?} xmin=-10
 * @param {number?} ymin=10
 * @param {number?} xmax=-10
 * @param {number?} ymax=10
 * @param {number?} xstep=1
 * @param {number?} ystep=1
 * @param {'quad'|'hexa'|'equi'?} type='quad'
 * @param {string?} pointColor='black'
 * @param {number?} pointRayon=0.05
 * @param {number?} opacite=1
 * @param {number?} opaciteDeRemplissage=1
 * @constructor
 * @author Jean-Claude Lhote
 */
export class PapierPointe extends ObjetMathalea2D {
  plots: Plot[]
  listeCoords: [number, number][]
  constructor({
    xmin = -10,
    xmax = 10,
    ymin = -10,
    ymax = 10,
    xstep = 1,
    ystep = 1,
    type = 'quad',
    pointColor = 'black',
    pointRayon = 0.05,
    opacite = 1,
    opaciteDeRemplissage = 1,
  }) {
    super()
    this.listeCoords = []
    this.plots = []
    let xstep1, xstep2, ystep1, stepper
    switch (type) {
      case 'quad':
        for (let x = xmin; x <= xmax; x += xstep) {
          for (let y = ymin; y <= ymax; y += ystep) {
            this.plots.push(
              plot(x, y, {
                rayon: pointRayon,
                couleur: pointColor,
                opacite,
                couleurDeRemplissage: 'black',
                opaciteDeRemplissage,
              }),
            )
            this.listeCoords.push([x, y])
          }
        }
        break
      case 'hexa':
        stepper = false
        ystep1 = Math.min(xstep, ystep)
        xstep1 = 0.866 * ystep1
        xstep2 = 1.732 * ystep1
        for (let x = xmin; x <= xmax; x += xstep2) {
          for (let y = ymin; y <= ymax; y += 1.5 * ystep1) {
            stepper = !stepper
            if (stepper) {
              this.plots.push(
                plot(x, y, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.plots.push(
                plot(x + xstep1, y + ystep1 / 2, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.plots.push(
                plot(x + xstep1, y + ystep1 * 1.5, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.listeCoords.push(
                [x, y],
                [x + xstep1, y + ystep1 / 2],
                [x + xstep1, y + ystep1 * 1.5],
              )
            } else {
              this.plots.push(
                plot(x, y + ystep1 / 2, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.listeCoords.push([x, y + ystep1 / 2])
            }
          }
          stepper = !stepper
        }
        break
      case 'equi':
        stepper = false
        ystep1 = Math.min(xstep, ystep)
        xstep1 = 0.866 * ystep1
        xstep2 = 1.732 * ystep1
        for (let x = xmin; x <= xmax; x = x + xstep2) {
          for (let y = ymin; y <= ymax; y = y + 1.5 * ystep1) {
            stepper = !stepper
            if (stepper) {
              this.plots.push(
                plot(x, y, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.plots.push(
                plot(x, y + ystep1, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.plots.push(
                plot(x + xstep1, y + ystep1 / 2, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.plots.push(
                plot(x + xstep1, y + ystep1 * 1.5, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.listeCoords.push(
                [x, y],
                [x, y + ystep1],
                [x + xstep1, y + ystep1 / 2],
                [x + xstep1, y + ystep1 * 1.5],
              )
            } else {
              this.plots.push(
                plot(x + xstep1, y + ystep1, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.plots.push(
                plot(x, y + ystep1 / 2, {
                  rayon: pointRayon,
                  couleur: pointColor,
                  opacite,
                  couleurDeRemplissage: context.isHtml ? 'none' : '',
                  opaciteDeRemplissage,
                }),
              )
              this.listeCoords.push(
                [x + xstep1, y + ystep1],
                [x, y + ystep1 / 2],
              )
            }
          }
          stepper = !stepper
        }
        break
    }
  }

  svg(coeff: number) {
    let code = ''
    for (const objet of this.plots) {
      code += objet.svg(coeff)
    }
    return code
  }

  tikz = () => {
    let code = ''
    for (const objet of this.plots) {
      code += objet.tikz()
    }
    return code
  }
}

export function papierPointe({
  xmin = -10,
  xmax = 10,
  ymin = -10,
  ymax = 10,
  xstep = 1,
  ystep = 1,
  type = 'quad',
  pointColor = 'black',
  pointRayon = 0.05,
  opacite = 0.4,
  opaciteDeRemplissage = 0.4,
}) {
  return new PapierPointe({
    xmin,
    xmax,
    ymin,
    ymax,
    xstep,
    ystep,
    type,
    pointColor,
    pointRayon,
    opacite,
    opaciteDeRemplissage,
  })
}

/**
 * repere({xUnite, yUnite, xMin, xMax, yMin, yMax, axeX, axeY, axesEpaisseur, axesCouleur, axeXStyle, axeYStyle, thickEpaisseur,
 * thickHauteur, thickCouleur, xThickDistance, xThickListe, xThickMin, xThickMax, yThickDistance, yThickListe,
 * yThickMin, yThickMax, xLabelDistance, xLabelListe, xLabelMin, xLabelMax, yLabelDistance, yLabelListe,
 * yLabelMin, yLabelMax, xLegende,xLegendePosition, yLegende, yLegendePosition, grille, grilleDistance,
 * grilleCouleur,grilleOpacite, grilleEpaisseur, grilleSecondaire, grilleSecondaireDistance, grilleSecondaireCouleur,
 * grilleSecondaireOpacite, grilleSecondaireEpaisseur, grilleX, grilleXListe, grilleXDistance, grilleXMin, grilleXMax,
 * grilleXCouleur, grilleXOpacite, grilleY, grilleYListe, grilleYDistance, grilleYMin, grilleYMax, grilleYCouleur,
 * grilleYOpacite, grilleSecondaireX, grilleSecondaireXListe, grilleSecondaireXDistance, grilleSecondaireXMin, grilleSecondaireXMax,
 * grilleSecondaireXCouleur, grilleSecondaireXOpacite, grilleSecondaireY, grilleSecondaireYListe, grilleSecondaireYDistance,
 * grilleSecondaireYMin, grilleSecondaireYMax, grilleSecondaireYCouleur, grilleSecondaireYOpacite})
 *
 * repere() trace un repère classique. De nombreux paramètres permettent d'en modifier l'aspect
 *
 * @author Rémi Angot
 * @param {object} options
 * @param {number}  options.xUnite = 1,
 * @param {number}  options.yUnite = 1,
 * @param {number}  options.xMin = -10,
 * @param {number}  options.xMax = 10,
 * @param {number}  options.yMin = -10,
 * @param {number}  options.yMax = 10,
 * @param {boolean?}  options.axeXisVisible = true,
 * @param {boolean?}  options.axeYisVisible = true,
 * @param {number}  options.axesEpaisseur = 2,
 * @param {string}  options.axesCouleur = 'black',
 * @param {string}  options.axeXStyle = '->',
 * @param {string}  options.axeYStyle = '->',
 * @param {number}  options.thickEpaisseur = 2,
 * @param {number}  options.thickHauteur = 0.2,
 * @param {string}  options.thickCouleur = axesCouleur,
 * @param {number}  options.xThickDistance = 1,
 * @param {number[]}  options.xThickListe = false,
 * @param {number}  options.xThickMin = xMin + xThickDistance,
 * @param {number}  options.xThickMax = xMax - xThickDistance,
 * @param {number}  options.yThickDistance = 1,
 * @param {number[]}  options.yThickListe = false,
 * @param {number}  options.yThickMin = yMin + yThickDistance,
 * @param {number}  options.yThickMax = yMax - yThickDistance,
 * @param {number}  options.xLabelDistance = xThickDistance,
 * @param {number[]}  options.xLabelListe = false,
 * @param {number}  options.xLabelMin = xThickMin,
 * @param {number}  options.xLabelMax = xThickMax,
 * @param {number}  options.yLabelDistance = yThickDistance,
 * @param {number[]}  options.yLabelListe = false,
 * @param {number}  options.yLabelMin = yThickMin,
 * @param {number}  options.yLabelMax = yThickMax,
 * @param {number}  options.precisionLabelX = 1,
 * @param {number}  options.precisionLabelY = 1,
 * @param {number}  options.xLabelEcart = 0.5,
 * @param {number}  options.yLabelEcart = 0.5,
 * @param {string}  options.xLegende = '',
 * @param {number}  options.xLegendePosition = [],
 * @param {string}  options.yLegende = '',
 * @param {number}  options.yLegendePosition = [],
 * @param {boolean?}  options.grille = true,
 * @param {number}  options.grilleDistance = false,
 * @param {string}  options.grilleCouleur = 'black',
 * @param {number}  options.grilleOpacite = 0.5,
 * @param {number}  options.grilleEpaisseur = 1,
 * @param {boolean?}  options.grilleSecondaire = false,
 * @param {number}  options.grilleSecondaireDistance = false,
 * @param {string}  options.grilleSecondaireCouleur = 'gray',
 * @param {number}  options.grilleSecondaireOpacite = 0.3,
 * @param {number}  options.grilleSecondaireEpaisseur = 1,
 * @param {boolean?}  options.grilleX = grille,
 * @param {number[]}  options.grilleXListe = false,
 * @param {number}  options.grilleXDistance = grilleDistance,
 * @param {number}  options.grilleXMin = false,
 * @param {number}  options.grilleXMax = false,
 * @param {string}  options.grilleXCouleur = grilleCouleur,
 * @param {number}  options.grilleXOpacite = grilleOpacite,
 * @param {boolean?}  options.grilleY = grille,
 * @param {number[]}  options.grilleYListe = false,
 * @param {number}  options.grilleYDistance = grilleDistance,
 * @param {number}  options.grilleYMin = false,
 * @param {number}  options.grilleYMax = false,
 * @param {string}  options.grilleYCouleur = grilleCouleur,
 * @param {number}  options.grilleYOpacite = grilleOpacite,
 * @param {boolean?}  options.grilleSecondaireX = grilleSecondaire,
 * @param {number[]}  options.grilleSecondaireXListe = false,
 * @param {number}  options.grilleSecondaireXDistance = grilleSecondaireDistance,
 * @param {number}  options.grilleSecondaireXMin = false,
 * @param {number}  options.grilleSecondaireXMax = false,
 * @param {string}  options.grilleSecondaireXCouleur = grilleSecondaireCouleur,
 * @param {number}  options.grilleSecondaireXOpacite = grilleSecondaireOpacite,
 * @param {boolean?}  options.grilleSecondaireY = grilleSecondaire,
 * @param {number[]}  options.grilleSecondaireYListe = false,
 * @param {number}  options.grilleSecondaireYDistance = grilleSecondaireDistance,
 * @param {number}  options.grilleSecondaireYMin = false,
 * @param {number}  options.grilleSecondaireYMax = false,
 * @param {string}  options.grilleSecondaireYCouleur = grilleSecondaireCouleur,
 * @param {number}  options.grilleSecondaireYOpacite = grilleSecondaireOpacite
 */
export class Repere extends ObjetMathalea2D {
  xUnite: number
  yUnite: number
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  grilleXMin: number
  grilleXMax: number
  grilleYMin: number
  grilleYMax: number
  objets: ObjetMathalea2D[]

  constructor({
    xUnite = 1,
    yUnite = 1,
    xMin = -10,
    xMax = 10,
    yMin = -10,
    yMax = 10,
    axeXisVisible = true,
    axeYisVisible = true,
    axesEpaisseur = 1.2,
    axesCouleur = 'black',
    axeXStyle = '->',
    axeYStyle = '->',
    thickEpaisseur = 1.2,
    thickHauteur = 0.13,
    thickCouleur = axesCouleur,
    xThickDistance = 1,
    xThickListe = [],
    xThickMin = xMin + xThickDistance,
    xThickMax = xMax - xThickDistance,
    yThickDistance = 1,
    yThickListe = [],
    yThickMin = yMin + yThickDistance,
    yThickMax = yMax - yThickDistance,
    xLabelDistance = xThickDistance,
    xLabelListe = [],
    xLabelMin = xThickMin,
    xLabelMax = xThickMax,
    yLabelDistance = yThickDistance,
    yLabelListe = [],
    yLabelMin = yThickMin,
    yLabelMax = yThickMax,
    precisionLabelX = 1,
    precisionLabelY = 1,
    xLabelEcart = 0.5,
    yLabelEcart = 0.5,
    xLegende = '',
    xLegendePosition = [],
    yLegende = '',
    yLegendePosition = [],
    grille = true,
    grilleDistance = 1,
    grilleCouleur = 'black',
    grilleOpacite = 0.4,
    grilleEpaisseur = 1,
    grilleSecondaire = false,
    grilleSecondaireDistance = 1,
    grilleSecondaireCouleur = 'gray',
    grilleSecondaireOpacite = 0.3,
    grilleSecondaireEpaisseur = 1,
    grilleX = grille,
    grilleXListe = [],
    grilleXDistance = grilleDistance,
    grilleXMin = xMin,
    grilleXMax = xMax,
    grilleXCouleur = grilleCouleur,
    grilleXOpacite = grilleOpacite,
    grilleY = grille,
    grilleYListe = [],
    grilleYDistance = grilleDistance,
    grilleYMin = yMin,
    grilleYMax = yMax,
    grilleYCouleur = grilleCouleur,
    grilleYOpacite = grilleOpacite,
    grilleSecondaireX = grilleSecondaire,
    grilleSecondaireXListe = [],
    grilleSecondaireXDistance = grilleSecondaireDistance,
    grilleSecondaireXMin = xMin,
    grilleSecondaireXMax = xMax,
    grilleSecondaireXCouleur = grilleSecondaireCouleur,
    grilleSecondaireXOpacite = grilleSecondaireOpacite,
    grilleSecondaireY = grilleSecondaire,
    grilleSecondaireYListe = [],
    grilleSecondaireYDistance = grilleSecondaireDistance,
    grilleSecondaireYMin = yMin,
    grilleSecondaireYMax = yMax,
    grilleSecondaireYCouleur = grilleSecondaireCouleur,
    grilleSecondaireYOpacite = grilleSecondaireOpacite,
  }: {
    xUnite?: number
    yUnite?: number
    xMin?: number
    xMax?: number
    yMin?: number
    yMax?: number
    axeXisVisible?: boolean
    axeYisVisible?: boolean
    axesEpaisseur?: number
    axesCouleur?: string
    axeXStyle?: string
    axeYStyle?: string
    thickEpaisseur?: number
    thickHauteur?: number
    thickCouleur?: string
    xThickDistance?: number
    xThickListe?: number[] | boolean
    xThickMin?: number
    xThickMax?: number
    yThickDistance?: number
    yThickListe?: number[] | boolean
    yThickMin?: number
    yThickMax?: number
    xLabelDistance?: number
    xLabelListe?: boolean | (number | { valeur: number; texte: string })[]
    xLabelMin?: number
    xLabelMax?: number
    yLabelDistance?: number
    yLabelListe?: boolean | (number | { valeur: number; texte: string })[]
    yLabelMin?: number
    yLabelMax?: number
    precisionLabelX?: number
    precisionLabelY?: number
    xLabelEcart?: number
    yLabelEcart?: number
    xLegende?: string
    xLegendePosition?: number[]
    yLegende?: string
    yLegendePosition?: number[]
    grille?: boolean | 'pointilles'
    grilleDistance?: number
    grilleCouleur?: string
    grilleOpacite?: number
    grilleEpaisseur?: number
    grilleSecondaire?: boolean
    grilleSecondaireDistance?: number
    grilleSecondaireCouleur?: string
    grilleSecondaireOpacite?: number
    grilleSecondaireEpaisseur?: number
    grilleX?: boolean | 'pointilles'
    grilleXListe?: number[]
    grilleXDistance?: number
    grilleXMin?: number
    grilleXMax?: number
    grilleXCouleur?: string
    grilleXOpacite?: number
    grilleY?: boolean | 'pointilles'
    grilleYListe?: number[]
    grilleYDistance?: number
    grilleYMin?: number
    grilleYMax?: number
    grilleYCouleur?: string
    grilleYOpacite?: number
    grilleSecondaireX?: boolean | 'pointilles'
    grilleSecondaireXListe?: number[]
    grilleSecondaireXDistance?: number
    grilleSecondaireXMin?: number
    grilleSecondaireXMax?: number
    grilleSecondaireXCouleur?: string
    grilleSecondaireXOpacite?: number
    grilleSecondaireY?: boolean | 'pointilles'
    grilleSecondaireYListe?: number[]
    grilleSecondaireYDistance?: number
    grilleSecondaireYMin?: number
    grilleSecondaireYMax?: number
    grilleSecondaireYCouleur?: string
    grilleSecondaireYOpacite?: number
  }) {
    super()

    // Les propriétés exportables
    this.xUnite = xUnite
    this.yUnite = yUnite
    this.xMin = xMin
    this.xMax = xMax
    this.yMin = yMin
    this.yMax = yMax
    this.grilleXMin = grilleXMin ?? xMin
    this.grilleXMax = grilleXMax ?? xMax
    this.grilleYMin = grilleYMin ?? yMin
    this.grilleYMax = grilleYMax ?? yMax

    if (thickHauteur === 0) {
      xThickListe = false
      yThickListe = false
    }
    this.objets = []
    // LES AXES
    const ordonneeAxe = Math.max(0, yMin)
    if (xLegendePosition.length === 0) {
      xLegendePosition = [xMax * xUnite + 0.5, 0.5 + ordonneeAxe]
    }
    const axeX = segment(
      xMin * xUnite,
      ordonneeAxe * yUnite,
      xMax * xUnite,
      ordonneeAxe * yUnite,
      axesCouleur,
    )
    axeX.epaisseur = axesEpaisseur
    axeX.styleExtremites = axeXStyle
    const abscisseAxe = Math.max(0, xMin)
    if (yLegendePosition.length === 0) {
      yLegendePosition = [0.5 + abscisseAxe, yMax * yUnite + 0.5]
    }
    const axeY = segment(
      abscisseAxe * xUnite,
      yMin * yUnite,
      abscisseAxe * xUnite,
      yMax * yUnite,
      axesCouleur,
    )
    axeY.epaisseur = axesEpaisseur
    axeY.styleExtremites = axeYStyle
    if (axeXisVisible) this.objets.push(axeX)
    if (axeYisVisible) this.objets.push(axeY)
    // Cache les objets intermédiaires pour ne pas les afficher en double dans mathalea2d.html
    // axeX.isVisible = false
    // axeY.isVisible = false
    // GRILLE PRINCIPALE

    // Les traits horizontaux
    if (grilleY) {
      if (grilleYListe.length === 0) {
        // Ceux qui ne sont pas définis reprennent les valeurs de thick
        if (typeof grilleYMin !== 'number') {
          grilleYMin = yThickMin
        }
        if (typeof grilleYMax !== 'number') {
          grilleYMax = yThickMax
        }
        if (!grilleYDistance) {
          grilleYDistance = yThickDistance
        }
        // On créé la liste avec ces valeurs
        grilleYListe = []
        if (grilleYMin < 0 && grilleYMax > 0) {
          grilleYListe.push(0)
          for (
            let y = grilleYDistance / yUnite;
            y < Math.max(-grilleYMin, grilleYMax);
            y += grilleYDistance / yUnite
          ) {
            if (y <= grilleYMax) grilleYListe.push(y)
            if (y <= -grilleYMin) grilleYListe.push(-y)
          }
        } else if (grilleYMin >= 0 && grilleYMax > 0) {
          for (
            let y = grilleYMin;
            y <= grilleYMax;
            y += grilleYDistance / yUnite
          ) {
            grilleYListe.push(y)
          }
        } else if (grilleYMin < 0 && grilleYMax <= 0) {
          for (
            let y = grilleYMax;
            y >= grilleYMin;
            y -= grilleYDistance / yUnite
          ) {
            grilleYListe.push(y)
          }
        }
      }
      for (const y of grilleYListe) {
        if (y !== 0 || !axeXisVisible) {
          const traitH = segment(
            xMin * xUnite,
            y * yUnite,
            xMax * xUnite,
            y * yUnite,
            grilleYCouleur,
          )
          //  traitH.isVisible = false // Pourquoi demander la création de ces traits si c'est pour les rendre invisibles ?
          traitH.opacite = grilleYOpacite
          traitH.epaisseur = grilleEpaisseur
          if (grilleY === 'pointilles') {
            traitH.pointilles = 5
          }
          this.objets.push(traitH)
        }
      }
    }
    // Les traits verticaux
    if (grilleX) {
      if (grilleXListe.length === 0) {
        // Ceux qui ne sont pas définis reprennent les valeurs de thick
        if (typeof grilleXMin !== 'number') {
          grilleXMin = xThickMin
        }
        if (typeof grilleXMax !== 'number') {
          grilleXMax = xThickMax
        }
        if (typeof grilleXDistance !== 'number') {
          grilleXDistance = xThickDistance
        }
        // On créé la liste avec ces valeurs
        grilleXListe = []
        if (grilleXMin < 0 && grilleXMax > 0) {
          grilleXListe.push(0)
          for (
            let x = grilleXDistance / xUnite;
            x < Math.max(-grilleXMin, grilleXMax);
            x += grilleXDistance / xUnite
          ) {
            if (x <= grilleXMax) grilleXListe.push(x)
            if (x <= -grilleXMin) grilleXListe.push(-x)
          }
        } else if (grilleXMin >= 0 && grilleXMax > 0) {
          for (
            let x = grilleXMin;
            x <= grilleXMax;
            x += grilleXDistance / xUnite
          ) {
            grilleXListe.push(x)
          }
        } else if (grilleXMin < 0 && grilleXMax <= 0) {
          for (
            let x = grilleXMax;
            x >= grilleXMin;
            x -= grilleXDistance / xUnite
          ) {
            grilleXListe.push(x)
          }
        }
      }
      for (const x of grilleXListe) {
        if (x !== 0 || !axeYisVisible) {
          const traitV = segment(
            x * xUnite,
            (this.grilleYMin ? this.grilleYMin : yMin) * yUnite,
            x * xUnite,
            (this.grilleYMax ? this.grilleYMax : yMax) * yUnite,
            grilleXCouleur,
          )
          //  traitV.isVisible = false
          traitV.opacite = grilleXOpacite
          traitV.epaisseur = grilleEpaisseur
          if (grilleX === 'pointilles') {
            traitV.pointilles = 5
          }
          this.objets.push(traitV)
        }
      }
    }

    // GRILLE SECONDAIRE

    // Les traits horizontaux
    if (grilleSecondaireY) {
      if (grilleSecondaireYListe.length === 0) {
        // Ceux qui ne sont pas définis reprennent les valeurs de thick
        if (typeof grilleSecondaireYMin !== 'number') {
          grilleSecondaireYMin = yThickMin
        }
        if (typeof grilleSecondaireYMax !== 'number') {
          grilleSecondaireYMax = yThickMax
        }
        if (typeof grilleSecondaireYDistance !== 'number') {
          grilleSecondaireYDistance = yThickDistance / 2
        }
        // On créé la liste avec ces valeurs
        grilleSecondaireYListe = []
        if (grilleSecondaireYMin < 0 && grilleSecondaireYMax > 0) {
          grilleSecondaireYListe.push(0)
          for (
            let y = grilleSecondaireYDistance / yUnite;
            y < Math.max(-grilleSecondaireYMin, grilleSecondaireYMax);
            y += grilleSecondaireYDistance / yUnite
          ) {
            if (y <= grilleSecondaireYMax) grilleSecondaireYListe.push(y)
            if (y <= -grilleSecondaireYMin) grilleSecondaireYListe.push(-y)
          }
        } else if (grilleSecondaireYMin >= 0 && grilleSecondaireYMax > 0) {
          for (
            let y = grilleSecondaireYMin;
            y <= grilleSecondaireYMax;
            y += grilleSecondaireYDistance / yUnite
          ) {
            grilleSecondaireYListe.push(y)
          }
        } else if (grilleSecondaireYMin < 0 && grilleSecondaireYMax <= 0) {
          for (
            let y = grilleSecondaireYMax;
            y >= grilleSecondaireYMin;
            y -= grilleSecondaireYDistance / yUnite
          ) {
            grilleSecondaireYListe.push(y)
          }
        }
      }
      for (const y of grilleSecondaireYListe) {
        const traitH = segment(
          (grilleSecondaireXMin || xMin) * xUnite,
          y * yUnite,
          (grilleSecondaireXMax || xMax) * xUnite,
          y * yUnite,
          grilleSecondaireYCouleur,
        )
        // traitH.isVisible = false
        traitH.opacite = grilleSecondaireYOpacite
        traitH.epaisseur = grilleSecondaireEpaisseur
        if (grilleSecondaireY === 'pointilles') {
          traitH.pointilles = 5
        }
        this.objets.push(traitH)
      }
    }
    // Les traits verticaux
    if (grilleSecondaireX) {
      if (grilleSecondaireXListe.length === 0) {
        // Ceux qui ne sont pas définis reprennent les valeurs de thick
        if (typeof grilleSecondaireXMin !== 'number') {
          grilleSecondaireXMin = xThickMin
        }
        if (typeof grilleSecondaireXMax !== 'number') {
          grilleSecondaireXMax = xThickMax
        }
        if (typeof grilleSecondaireXDistance !== 'number') {
          grilleSecondaireXDistance = xThickDistance / 2
        }
        // On créé la liste avec ces valeurs
        grilleSecondaireXListe = []
        if (grilleSecondaireXMin < 0 && grilleSecondaireXMax > 0) {
          grilleSecondaireXListe.push(0)
          for (
            let x = grilleSecondaireXDistance / xUnite;
            x < Math.max(-grilleSecondaireXMin, grilleSecondaireXMax);
            x += grilleSecondaireXDistance / xUnite
          ) {
            if (x <= grilleSecondaireXMax) grilleSecondaireXListe.push(x)
            if (x <= -grilleSecondaireXMin) grilleSecondaireXListe.push(-x)
          }
        } else if (grilleSecondaireXMin >= 0 && grilleSecondaireXMax > 0) {
          for (
            let x = grilleSecondaireXMin;
            x <= grilleSecondaireXMax;
            x += grilleSecondaireXDistance / xUnite
          ) {
            grilleSecondaireXListe.push(x)
          }
        } else if (grilleSecondaireXMin < 0 && grilleSecondaireXMax <= 0) {
          for (
            let x = grilleSecondaireXMax;
            x >= grilleSecondaireXMin;
            x -= grilleSecondaireXDistance / xUnite
          ) {
            grilleSecondaireXListe.push(x)
          }
        }
      }
      for (const x of grilleSecondaireXListe) {
        const traitV = segment(
          x * xUnite,
          (grilleSecondaireYMin || yMin) * yUnite,
          x * xUnite,
          (grilleSecondaireYMax || yMax) * yUnite,
          grilleSecondaireXCouleur,
        )
        //  traitV.isVisible = false
        traitV.opacite = grilleSecondaireXOpacite
        traitV.epaisseur = grilleSecondaireEpaisseur
        if (grilleSecondaireX === 'pointilles') {
          traitV.pointilles = 5
        }
        this.objets.push(traitV)
      }
    }
    // LES THICKS
    if (axeXisVisible) {
      if (
        (typeof xThickListe === 'boolean' && xThickListe) ||
        (Array.isArray(xThickListe) && xThickListe.length === 0)
      ) {
        xThickListe = []
        if (xThickMin < 0 && xThickMax > 0) {
          xThickListe.push(0)
          for (
            let x = xThickDistance;
            x < Math.max(-xThickMin, xThickMax);
            x += xThickDistance
          ) {
            if (x <= xThickMax) xThickListe.push(x)
            if (x <= -xThickMin) xThickListe.push(-x)
          }
        } else if (xThickMin >= 0 && xThickMax > 0) {
          for (let x = xThickMin; x <= xThickMax; x += xThickDistance) {
            xThickListe.push(x)
          }
        } else if (xThickMin < 0 && xThickMax <= 0) {
          for (let x = xThickMax; x >= xThickMin; x -= xThickDistance) {
            xThickListe.push(x)
          }
        }
      } else if (typeof xThickListe === 'boolean') xThickListe = []

      for (const x of xThickListe) {
        const thick = segment(
          x * xUnite,
          ordonneeAxe * yUnite - thickHauteur,
          x * xUnite,
          ordonneeAxe * yUnite + thickHauteur,
          thickCouleur,
        )
        // thick.isVisible = false
        thick.epaisseur = thickEpaisseur
        this.objets.push(thick)
      }
    }
    if (axeYisVisible) {
      if (
        (typeof yThickListe === 'boolean' && yThickListe) ||
        (Array.isArray(yThickListe) && yThickListe.length === 0)
      ) {
        yThickListe = []
        if (yThickMin < 0 && yThickMax > 0) {
          yThickListe.push(0)
          for (
            let y = yThickDistance;
            y < Math.max(-yThickMin, yThickMax);
            y += yThickDistance
          ) {
            if (y <= yThickMax) yThickListe.push(y)
            if (y <= -yThickMin) yThickListe.push(-y)
          }
        } else if (yThickMin >= 0 && yThickMax > 0) {
          for (let y = yThickMin; y <= yThickMax; y += yThickDistance) {
            yThickListe.push(y)
          }
        } else if (yThickMin < 0 && yThickMax <= 0) {
          for (let y = yThickMax; y >= yThickMin; y -= yThickDistance) {
            yThickListe.push(y)
          }
        }
      } else if (typeof yThickListe === 'boolean') yThickListe = []
      for (const y of yThickListe) {
        const thick = segment(
          abscisseAxe * xUnite - thickHauteur,
          y * yUnite,
          abscisseAxe * xUnite + thickHauteur,
          y * yUnite,
          thickCouleur,
        )
        // thick.isVisible = false
        thick.epaisseur = thickEpaisseur
        this.objets.push(thick)
      }
    }
    // LES LABELS
    if (axeXisVisible) {
      if (
        (typeof xLabelListe === 'boolean' && xLabelListe) ||
        (Array.isArray(xLabelListe) && xLabelListe.length === 0)
      ) {
        xLabelListe = rangeMinMax(0, xLabelMax, [0], xLabelDistance).concat(
          rangeMinMax(0, -xLabelMin, [0], xLabelDistance).map((el) => -el),
        )
      } else if (typeof xLabelListe === 'boolean') xLabelListe = []
      for (const x of xLabelListe) {
        let l
        if (typeof x === 'number') {
          if (x >= xMin && x <= xMax) {
            l = latex2d(
              `${stringNombre(x, precisionLabelX)}`,
              x * xUnite,
              ordonneeAxe * yUnite - xLabelEcart + 0.1,
              // { letterSize: 'scriptsize', opacity: 0.8, color: 'black' }, // EE : Commenté car sinon taille abscisse !== taille ordonnée
              { letterSize: 'scriptsize', opacity: 0.8, color: 'black' },
            )
            //   l.isVisible = false
            this.objets.push(l)
          }
        } else {
          if (x.valeur <= xMax && x.valeur >= xMin) {
            l = latex2d(
              x.texte,
              x.valeur * xUnite,
              ordonneeAxe * yUnite - xLabelEcart + 0.1,
              // { letterSize: 'footnotesize', color: 'black', opacity: 0.8 },  // EE : Commenté car sinon taille abscisse !== taille ordonnée
              { letterSize: 'scriptsize', color: 'black', opacity: 0.8 },
            )
            //  l.isVisible = false
            this.objets.push(l)
          }
        }
      }
    }
    if (axeYisVisible) {
      if (
        (typeof yLabelListe === 'boolean' && yLabelListe) ||
        (Array.isArray(yLabelListe) && yLabelListe.length === 0)
      ) {
        yLabelListe = rangeMinMax(0, yLabelMax, [0], yLabelDistance).concat(
          rangeMinMax(0, -yLabelMin, [0], yLabelDistance).map((el) => -el),
        )
      } else if (typeof yLabelListe === 'boolean') yLabelListe = []
      for (const y of yLabelListe) {
        let l
        if (typeof y === 'number') {
          if (y >= yMin && y <= yMax) {
            l = latex2d(
              `${stringNombre(y, precisionLabelY)}`,
              abscisseAxe * xUnite - yLabelEcart,
              y * yUnite + 0.1,
              // { letterSize: 'small', opacity: 0.8, color: 'black' },
              { letterSize: 'scriptsize', opacity: 0.8, color: 'black' },
            )
            //  l.isVisible = false
            this.objets.push(l)
          }
        } else {
          if (y.valeur >= yMin && y.valeur <= yMax) {
            l = latex2d(
              y.texte,
              abscisseAxe * xUnite - yLabelEcart,
              y.valeur * yUnite + 0.1,
              /// { letterSize: 'small', opacity: 0.8, color: 'black' },
              { letterSize: 'scriptsize', opacity: 0.8, color: 'black' },
            )
            //     l.isVisible = false
            this.objets.push(l)
          }
        }
      }
    }
    // LES LÉGENDES
    if (xLegende.length > 0) {
      this.objets.push(
        texteParPosition(
          xLegende,
          xLegendePosition[0],
          xLegendePosition[1],
          0,
          'black',
          1,
          'droite',
        ),
      )
    }
    if (yLegende.length > 0) {
      this.objets.push(
        texteParPosition(
          yLegende,
          yLegendePosition[0],
          yLegendePosition[1],
          0,
          'black',
          1,
          'droite',
        ),
      )
    }
    const bords = fixeBordures(this.objets, {
      rxmin: 0,
      rxmax: 0,
      rymin: 0,
      rymax: 0,
    })
    this.bordures = [bords.xmin, bords.ymin, bords.xmax, bords.ymax]
    // pour pouvoir ajouter des objets à ce Repere après l'avoir créé.
  }

  addObjet(objet: ObjetMathalea2D) {
    if (!(objet instanceof ObjetMathalea2D)) return
    this.objets?.concat(objet)
  }

  // Une méthode pour passer ce qu'il fait à mathalea2d()
  trace() {
    return this.objets
  }

  // LES SORTIES TiKZ et SVG
  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }

  svgml(coeff: number, amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (typeof objet.svgml === 'undefined') code += '\n\t' + objet.svg(coeff)
      else code += '\n\t' + objet.svgml(coeff, amp)
    }
    return code
  }

  tikzml(amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (typeof objet.tikzml === 'undefined') code += '\n\t' + objet.tikz()
      else code += '\n\t' + objet.tikzml(amp)
    }
    return code
  }
}

/**
 *
 * @param {object} params
 * @return {Repere}
 * @author Rémi Angot
 */
export function repere({
  xUnite = 1,
  yUnite = 1,
  xMin = -10,
  xMax = 10,
  yMin = -10,
  yMax = 10,
  axeXisVisible = true,
  axeYisVisible = true,
  axesEpaisseur = 1.2,
  axesCouleur = 'black',
  axeXStyle = '->',
  axeYStyle = '->',
  thickEpaisseur = 1.2,
  thickHauteur = 0.13,
  thickCouleur = axesCouleur,
  xThickDistance = 1,
  xThickListe = [],
  xThickMin = xMin + xThickDistance,
  xThickMax = xMax - xThickDistance,
  yThickDistance = 1,
  yThickListe = [],
  yThickMin = yMin + yThickDistance,
  yThickMax = yMax - yThickDistance,
  xLabelDistance = xThickDistance,
  xLabelListe = [],
  xLabelMin = xThickMin,
  xLabelMax = xThickMax,
  yLabelDistance = yThickDistance,
  yLabelListe = [],
  yLabelMin = yThickMin,
  yLabelMax = yThickMax,
  precisionLabelX = 1,
  precisionLabelY = 1,
  xLabelEcart = 0.5,
  yLabelEcart = 0.5,
  xLegende = '',
  xLegendePosition = [],
  yLegende = '',
  yLegendePosition = [],
  grille = true,
  grilleDistance = 1,
  grilleCouleur = 'black',
  grilleOpacite = 0.4,
  grilleEpaisseur = 1,
  grilleSecondaire = false,
  grilleSecondaireDistance = 1,
  grilleSecondaireCouleur = 'gray',
  grilleSecondaireOpacite = 0.3,
  grilleSecondaireEpaisseur = 1,
  grilleX = grille,
  grilleXListe = [],
  grilleXDistance = grilleDistance,
  grilleXMin = xMin,
  grilleXMax = xMax,
  grilleXCouleur = grilleCouleur,
  grilleXOpacite = grilleOpacite,
  grilleY = grille,
  grilleYListe = [],
  grilleYDistance = grilleDistance,
  grilleYMin = yMin,
  grilleYMax = yMax,
  grilleYCouleur = grilleCouleur,
  grilleYOpacite = grilleOpacite,
  grilleSecondaireX = grilleSecondaire,
  grilleSecondaireXListe = [],
  grilleSecondaireXDistance = grilleSecondaireDistance,
  grilleSecondaireXMin = xMin,
  grilleSecondaireXMax = xMax,
  grilleSecondaireXCouleur = grilleSecondaireCouleur,
  grilleSecondaireXOpacite = grilleSecondaireOpacite,
  grilleSecondaireY = grilleSecondaire,
  grilleSecondaireYListe = [],
  grilleSecondaireYDistance = grilleSecondaireDistance,
  grilleSecondaireYMin = yMin,
  grilleSecondaireYMax = yMax,
  grilleSecondaireYCouleur = grilleSecondaireCouleur,
  grilleSecondaireYOpacite = grilleSecondaireOpacite,
}: {
  xUnite?: number
  yUnite?: number
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  axeXisVisible?: boolean
  axeYisVisible?: boolean
  axesEpaisseur?: number
  axesCouleur?: string
  axeXStyle?: string
  axeYStyle?: string
  thickEpaisseur?: number
  thickHauteur?: number
  thickCouleur?: string
  xThickDistance?: number
  xThickListe?: number[] | boolean
  xThickMin?: number
  xThickMax?: number
  yThickDistance?: number
  yThickListe?: number[] | boolean
  yThickMin?: number
  yThickMax?: number
  xLabelDistance?: number
  xLabelListe?: boolean | (number | { valeur: number; texte: string })[]
  xLabelMin?: number
  xLabelMax?: number
  yLabelDistance?: number
  yLabelListe?: boolean | (number | { valeur: number; texte: string })[]
  yLabelMin?: number
  yLabelMax?: number
  precisionLabelX?: number
  precisionLabelY?: number
  xLabelEcart?: number
  yLabelEcart?: number
  xLegende?: string
  xLegendePosition?: number[]
  yLegende?: string
  yLegendePosition?: number[]
  grille?: boolean | 'pointilles'
  grilleDistance?: number
  grilleCouleur?: string
  grilleOpacite?: number
  grilleEpaisseur?: number
  grilleSecondaire?: boolean
  grilleSecondaireDistance?: number
  grilleSecondaireCouleur?: string
  grilleSecondaireOpacite?: number
  grilleSecondaireEpaisseur?: number
  grilleX?: boolean | 'pointilles'
  grilleXListe?: number[]
  grilleXDistance?: number
  grilleXMin?: number
  grilleXMax?: number
  grilleXCouleur?: string
  grilleXOpacite?: number
  grilleY?: boolean | 'pointilles'
  grilleYListe?: number[]
  grilleYDistance?: number
  grilleYMin?: number
  grilleYMax?: number
  grilleYCouleur?: string
  grilleYOpacite?: number
  grilleSecondaireX?: boolean | 'pointilles'
  grilleSecondaireXListe?: number[]
  grilleSecondaireXDistance?: number
  grilleSecondaireXMin?: number
  grilleSecondaireXMax?: number
  grilleSecondaireXCouleur?: string
  grilleSecondaireXOpacite?: number
  grilleSecondaireY?: boolean | 'pointilles'
  grilleSecondaireYListe?: number[]
  grilleSecondaireYDistance?: number
  grilleSecondaireYMin?: number
  grilleSecondaireYMax?: number
  grilleSecondaireYCouleur?: string
  grilleSecondaireYOpacite?: number
}) {
  return new Repere({
    xUnite,
    yUnite,
    xMin,
    xMax,
    yMin,
    yMax,
    axeXisVisible,
    axeYisVisible,
    axesEpaisseur,
    axesCouleur,
    axeXStyle,
    axeYStyle,
    thickEpaisseur,
    thickHauteur,
    thickCouleur,
    xThickDistance,
    xThickListe,
    xThickMin,
    xThickMax,
    yThickDistance,
    yThickListe,
    yThickMin,
    yThickMax,
    xLabelDistance,
    xLabelListe,
    xLabelMin,
    xLabelMax,
    yLabelDistance,
    yLabelListe,
    yLabelMin,
    yLabelMax,
    precisionLabelX,
    precisionLabelY,
    xLabelEcart,
    yLabelEcart,
    xLegende,
    xLegendePosition,
    yLegende,
    yLegendePosition,
    grille,
    grilleDistance,
    grilleCouleur,
    grilleOpacite,
    grilleEpaisseur,
    grilleSecondaire,
    grilleSecondaireDistance,
    grilleSecondaireCouleur,
    grilleSecondaireOpacite,
    grilleSecondaireEpaisseur,
    grilleX,
    grilleXListe,
    grilleXDistance,
    grilleXMin,
    grilleXMax,
    grilleXCouleur,
    grilleXOpacite,
    grilleY,
    grilleYListe,
    grilleYDistance,
    grilleYMin,
    grilleYMax,
    grilleYCouleur,
    grilleYOpacite,
    grilleSecondaireX,
    grilleSecondaireXListe,
    grilleSecondaireXDistance,
    grilleSecondaireXMin,
    grilleSecondaireXMax,
    grilleSecondaireXCouleur,
    grilleSecondaireXOpacite,
    grilleSecondaireY,
    grilleSecondaireYListe,
    grilleSecondaireYDistance,
    grilleSecondaireYMin,
    grilleSecondaireYMax,
    grilleSecondaireYCouleur,
    grilleSecondaireYOpacite,
  })
}

/**
 * Place un point dans un repère (en récupérant xUnite et yUnite d'un objet repère)
 *
 *
 * @param {number} x
 * @param {number} y
 * @param {object} repere
 * @author Rémi Angot
 */
export function pointDansRepere(
  x: number,
  y: number,
  repere = { xUnite: 1, yUnite: 1 },
) {
  return point(x * repere.xUnite, y * repere.yUnite)
}
