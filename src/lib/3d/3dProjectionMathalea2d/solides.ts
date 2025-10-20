import {
  ObjetMathalea2D,
  assombrirOuEclaircir,
  colorToLatexOrHTML,
  vide2d,
} from '../../../modules/2dGeneralites'
import { rotation3d, translation3d, homothetie3d } from './tranformations'
import { context } from '../../../modules/context'
import { droite, distancePointDroite } from '../../2d/droites'
import {
  Point,
  point,
  pointIntersectionDD,
  tracePoint,
  pointSurSegment,
  pointDepuisPointAbstrait,
} from '../../2d/points'
import {
  polygone,
  polyline,
  renommePolygone,
  polygoneAvecNom,
} from '../../2d/polygones'
import { segment, longueur, vecteur, norme } from '../../2d/segmentsVecteurs'
import { labelPoint } from '../../2d/textes'
import { translation } from '../../2d/transformations'
import { choisitLettresDifferentes } from '../../outils/aleatoires'
import { arrondi } from '../../outils/nombres'
import {
  Point3d,
  Vecteur3d,
  droite3d,
  point3d,
  vecteur3d,
  cercle3d,
  polygone3d,
  demicercle3d,
  Polygone3d,
  arete3d,
} from './elements'
import { cross, dot, matrix, multiply, norm } from 'mathjs'

export const math = { matrix, multiply, norm, cross, dot }
/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS COMPLEXES %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * LA SPHERE - ANCIENNE FONCTION
 *
 * @author Jean-Claude Lhote
 * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
 * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
 * @param {Point3d} centre
 * @param {Number} rayon
 * @param {Number} nbParalleles
 * @param {Number} nbMeridiens
 * @param {string} color
 */
/**
 * Classe de la sphère
 * @param {Point3d} centre Centre de la sphère
 * @param {number} rayon Rayon de la sphère
 * @param {string} [colorEquateur = 'red'] Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @param {string} [colorEnveloppe = 'blue'] Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbParalleles = 0]  Le nombre de parallèles au total
 * @param {string} [colorParalleles = 'gray'] Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbMeridiens = 0]  Le nombre de méridiens au total
 * @param {string} [colorMeridiens = 'gray'] Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la sphère.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} inclinaison angle d'inclinaison de l'axe N-S
 * @param {boolean} faceCachee Si false on économise tout ce qui est en pointillé à l'arrière.
 * @property {Point3d} centre Centre de la sphère
 * @property {Vecteur3d} rayon Rayon de la sphère
 * @property {string} colorEquateur Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @property {string} colorEnveloppe Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbParalleles Le nombre de parallèles au total
 * @property {string} colorParalleles Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbMeridiens Le nombre de méridiens au total

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS COMPLEXES %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * LA SPHERE - ANCIENNE FONCTION
 *
 * @author Jean-Claude Lhote
 * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
 * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
 * @param {Point3d} centre
 * @param {Number} rayon
 * @param {Number} nbParalleles
 * @param {Number} nbMeridiens
 * @param {string} color
 */
/**
 * Classe de la sphère
 * @param {Point3d} centre Centre de la sphère
 * @param {number} rayon Rayon de la sphère
 * @param {string} [colorEquateur = 'red'] Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @param {string} [colorEnveloppe = 'blue'] Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbParalleles = 0]  Le nombre de parallèles au total
 * @param {string} [colorParalleles = 'gray'] Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbMeridiens = 0]  Le nombre de méridiens au total
 * @param {string} [colorMeridiens = 'gray'] Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la sphère.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} inclinaison angle d'inclinaison de l'axe N-S
 * @param {boolean} faceCachee Si false on économise tout ce qui est en pointillé à l'arrière.
 * @property {Point3d} centre Centre de la sphère
 * @property {Vecteur3d} rayon Rayon de la sphère
 * @property {string} colorEquateur Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @property {string} colorEnveloppe Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbParalleles Le nombre de parallèles au total
 * @property {string} colorParalleles Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbMeridiens Le nombre de méridiens au total

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS COMPLEXES %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * LA SPHERE - ANCIENNE FONCTION
 *
 * @author Jean-Claude Lhote
 * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
 * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
 * @param {Point3d} centre
 * @param {Number} rayon
 * @param {Number} nbParalleles
 * @param {Number} nbMeridiens
 * @param {string} color
 */
/**
 * Classe de la sphère
 * @param {Point3d} centre Centre de la sphère
 * @param {number} rayon Rayon de la sphère
 * @param {string} [colorEquateur = 'red'] Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @param {string} [colorEnveloppe = 'blue'] Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbParalleles = 0]  Le nombre de parallèles au total
 * @param {string} [colorParalleles = 'gray'] Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbMeridiens = 0]  Le nombre de méridiens au total
 * @param {string} [colorMeridiens = 'gray'] Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la sphère.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} inclinaison angle d'inclinaison de l'axe N-S
 * @param {boolean} faceCachee Si false on économise tout ce qui est en pointillé à l'arrière.
 * @property {Point3d} centre Centre de la sphère
 * @property {Vecteur3d} rayon Rayon de la sphère
 * @property {string} colorEquateur Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @property {string} colorEnveloppe Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbParalleles Le nombre de parallèles au total
 * @property {string} colorParalleles Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbMeridiens Le nombre de méridiens au total

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS COMPLEXES %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * LA SPHERE - ANCIENNE FONCTION
 *
 * @author Jean-Claude Lhote
 * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
 * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
 * @param {Point3d} centre
 * @param {Number} rayon
 * @param {Number} nbParalleles
 * @param {Number} nbMeridiens
 * @param {string} color
 */
/**
 * Classe de la sphère
 * @param {Point3d} centre Centre de la sphère
 * @param {number} rayon Rayon de la sphère
 * @param {string} [colorEquateur = 'red'] Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @param {string} [colorEnveloppe = 'blue'] Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbParalleles = 0]  Le nombre de parallèles au total
 * @param {string} [colorParalleles = 'gray'] Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbMeridiens = 0]  Le nombre de méridiens au total
 * @param {string} [colorMeridiens = 'gray'] Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la sphère.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} inclinaison angle d'inclinaison de l'axe N-S
 * @param {boolean} faceCachee Si false on économise tout ce qui est en pointillé à l'arrière.
 * @property {Point3d} centre Centre de la sphère
 * @property {Vecteur3d} rayon Rayon de la sphère
 * @property {string} colorEquateur Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @property {string} colorEnveloppe Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbParalleles Le nombre de parallèles au total
 * @property {string} colorParalleles Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbMeridiens Le nombre de méridiens au total

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS COMPLEXES %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * LA SPHERE - ANCIENNE FONCTION
 *
 * @author Jean-Claude Lhote
 * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
 * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
 * @param {Point3d} centre
 * @param {Number} rayon
 * @param {Number} nbParalleles
 * @param {Number} nbMeridiens
 * @param {string} color
 */
/**
 * Classe de la sphère
 * @param {Point3d} centre Centre de la sphère
 * @param {number} rayon Rayon de la sphère
 * @param {string} [colorEquateur = 'red'] Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @param {string} [colorEnveloppe = 'blue'] Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbParalleles = 0]  Le nombre de parallèles au total
 * @param {string} [colorParalleles = 'gray'] Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbMeridiens = 0]  Le nombre de méridiens au total
 * @param {string} [colorMeridiens = 'gray'] Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la sphère.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} inclinaison angle d'inclinaison de l'axe N-S
 * @param {boolean} faceCachee Si false on économise tout ce qui est en pointillé à l'arrière.
 * @property {Point3d} centre Centre de la sphère
 * @property {Vecteur3d} rayon Rayon de la sphère
 * @property {string} colorEquateur Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @property {string} colorEnveloppe Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbParalleles Le nombre de parallèles au total
 * @property {string} colorParalleles Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbMeridiens Le nombre de méridiens au total

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS COMPLEXES %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * LA SPHERE - ANCIENNE FONCTION
 *
 * @author Jean-Claude Lhote
 * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
 * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
 * @param {Point3d} centre
 * @param {Number} rayon
 * @param {Number} nbParalleles
 * @param {Number} nbMeridiens
 * @param {string} color
 */
/**
 * Classe de la sphère
 * @param {Point3d} centre Centre de la sphère
 * @param {number} rayon Rayon de la sphère
 * @param {string} [colorEquateur = 'red'] Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @param {string} [colorEnveloppe = 'blue'] Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbParalleles = 0]  Le nombre de parallèles au total
 * @param {string} [colorParalleles = 'gray'] Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbMeridiens = 0]  Le nombre de méridiens au total
 * @param {string} [colorMeridiens = 'gray'] Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la sphère.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} inclinaison angle d'inclinaison de l'axe N-S
 * @param {boolean} faceCachee Si false on économise tout ce qui est en pointillé à l'arrière.
 * @property {Point3d} centre Centre de la sphère
 * @property {Vecteur3d} rayon Rayon de la sphère
 * @property {string} colorEquateur Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @property {string} colorEnveloppe Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbParalleles Le nombre de parallèles au total
 * @property {string} colorParalleles Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbMeridiens Le nombre de méridiens au total

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS COMPLEXES %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * LA SPHERE - ANCIENNE FONCTION
 *
 * @author Jean-Claude Lhote
 * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
 * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
 * @param {Point3d} centre
 * @param {Number} rayon
 * @param {Number} nbParalleles
 * @param {Number} nbMeridiens
 * @param {string} color
 */
/**
 * Classe de la sphère
 * @param {Point3d} centre Centre de la sphère
 * @param {number} rayon Rayon de la sphère
 * @param {string} [colorEquateur = 'red'] Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @param {string} [colorEnveloppe = 'blue'] Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbParalleles = 0]  Le nombre de parallèles au total
 * @param {string} [colorParalleles = 'gray'] Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbMeridiens = 0]  Le nombre de méridiens au total
 * @param {string} [colorMeridiens = 'gray'] Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la sphère.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} inclinaison angle d'inclinaison de l'axe N-S
 * @param {boolean} faceCachee Si false on économise tout ce qui est en pointillé à l'arrière.
 * @property {Point3d} centre Centre de la sphère
 * @property {Vecteur3d} rayon Rayon de la sphère
 * @property {string} colorEquateur Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @property {string} colorEnveloppe Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbParalleles Le nombre de parallèles au total
 * @property {string} colorParalleles Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbMeridiens Le nombre de méridiens au total

/*
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% OBJETS COMPLEXES %%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/
/**
 * LA SPHERE - ANCIENNE FONCTION
 *
 * @author Jean-Claude Lhote
 * Produit une sphère : choisir un nombre de parallèles impair pour avoir l'équateur. normal défini l'axe Nord-Sud.
 * rayon est le rayon de la sphère. l'équateur est dans le plan xy l'axe Nord-Sud est sur z
 * @param {Point3d} centre
 * @param {Number} rayon
 * @param {Number} nbParalleles
 * @param {Number} nbMeridiens
 * @param {string} color
 */
/**
 * Classe de la sphère
 * @param {Point3d} centre Centre de la sphère
 * @param {number} rayon Rayon de la sphère
 * @param {string} [colorEquateur = 'red'] Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @param {string} [colorEnveloppe = 'blue'] Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbParalleles = 0]  Le nombre de parallèles au total
 * @param {string} [colorParalleles = 'gray'] Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbMeridiens = 0]  Le nombre de méridiens au total
 * @param {string} [colorMeridiens = 'gray'] Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la sphère.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} inclinaison angle d'inclinaison de l'axe N-S
 * @param {boolean} faceCachee Si false on économise tout ce qui est en pointillé à l'arrière.
 * @property {Point3d} centre Centre de la sphère
 * @property {Vecteur3d} rayon Rayon de la sphère
 * @property {string} colorEquateur Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @property {string} colorEnveloppe Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbParalleles Le nombre de parallèles au total
 * @property {string} colorParalleles Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @property {number} nbMeridiens Le nombre de méridiens au total
 * @property {string} colorMeridiens Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @property {boolean} affichageAxe Permet (ou pas) l'affichage de l'axe de la sphère.
 * @property {string} colorAxe Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
 * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
 * @class
 */

export class Sphere3d extends ObjetMathalea2D {
  constructor(
    centre: Point3d,
    rayon: Vecteur3d,
    colorEquateur = 'red',
    colorEnveloppe = 'blue',
    nbParalleles = 0,
    colorParalleles = 'gray',
    nbMeridiens = 0,
    colorMeridiens = 'gray',
    affichageAxe = false,
    colorAxe = 'black',
    inclinaison = 0,
    faceCachee = true,
  ) {
    super()
    this.centre = centre
    this.rayon = rayon
    this.objets = []
    this.colorEquateur = colorEquateur
    this.colorEnveloppe = colorEnveloppe
    this.nbParalleles = nbParalleles
    this.colorParalleles = colorParalleles
    this.nbMeridiens = nbMeridiens
    this.colorMeridiens = colorMeridiens
    this.affichageAxe = affichageAxe
    this.colorAxe = colorAxe
    const droiteRot = droite3d(
      point3d(this.centre.x, this.centre.y, this.centre.z),
      vecteur3d(0, 1, 0),
    )
    const poleNord = rotation3d(
      point3d(
        this.centre.x,
        this.centre.y,
        this.centre.z + this.rayon,
        true,
        choisitLettresDifferentes(1, 'OQWX' + this.centre.label)[0],
        'left',
      ),
      droiteRot,
      inclinaison,
    )
    const poleSud = rotation3d(
      point3d(
        this.centre.x,
        this.centre.y,
        this.centre.z - this.rayon,
        true,
        choisitLettresDifferentes(
          1,
          'OQWX' + this.centre.label + poleNord.label,
        )[0],
        'left',
      ),
      droiteRot,
      inclinaison,
    )
    const nbParallelesDeConstruction = 36 // Ce nb de paralleles permet de construire l'enveloppe de la sphère (le "cercle" apparent de la sphère)
    const divisionParalleles =
      this.nbParalleles !== 0
        ? Math.round((2 * nbParallelesDeConstruction) / this.nbParalleles)
        : 1
    let unDesParalleles
    let centreParallele
    let rayonDuParallele
    let normal
    const paralleles: {
      listePoints3d: Point3d[][]
      ptCachePremier: Point[]
      indicePtCachePremier: number[]
      ptCacheDernier: Point[]
      indicePtCacheDernier: number[]
    } = {
      listePoints3d: [],
      ptCachePremier: [],
      indicePtCachePremier: [],
      ptCacheDernier: [],
      indicePtCacheDernier: [],
    }
    const enveloppeSphere1: Point[] = []
    let enveloppeSphere2: Point[] = []
    let premierParallele = 100
    let indicePremier = 0
    let indiceDernier = 0
    this.c2d = []

    // Construction de tous les paralleles
    // Construction du parallèle le plus proche du pôle nord
    centreParallele = rotation3d(
      point3d(
        this.centre.x,
        this.centre.y,
        this.centre.z +
          this.rayon *
            Math.sin(
              (((nbParallelesDeConstruction - 1) / nbParallelesDeConstruction) *
                Math.PI) /
                2,
            ),
      ),
      droiteRot,
      inclinaison,
    )
    rayonDuParallele = rotation3d(
      vecteur3d(
        this.rayon *
          Math.cos(
            (((nbParallelesDeConstruction - 1) / nbParallelesDeConstruction) *
              Math.PI) /
              2,
          ),
        0,
        0,
      ),
      droiteRot,
      inclinaison,
    )
    normal = rotation3d(vecteur3d(0, 0, 1), droiteRot, inclinaison)
    unDesParalleles = cercle3d(centreParallele, normal, rayonDuParallele)
    paralleles.listePoints3d.push(unDesParalleles[1])
    paralleles.ptCachePremier.push(point(0, 0))
    paralleles.indicePtCachePremier.push(0)
    paralleles.ptCacheDernier.push(point(0, 0))
    paralleles.indicePtCacheDernier.push(0)

    // Construction de tous les autres parallèles jusqu'au plus proche du pôle sud
    for (
      let k = nbParallelesDeConstruction - 2, poly, j = 1;
      k > -nbParallelesDeConstruction;
      k -= 1
    ) {
      centreParallele = rotation3d(
        point3d(
          this.centre.x,
          this.centre.y,
          this.centre.z +
            this.rayon *
              Math.sin(((k / nbParallelesDeConstruction) * Math.PI) / 2),
        ),
        droiteRot,
        inclinaison,
      )
      rayonDuParallele = rotation3d(
        vecteur3d(
          this.rayon *
            Math.cos(((k / nbParallelesDeConstruction) * Math.PI) / 2),
          0,
          0,
        ),
        droiteRot,
        inclinaison,
      )

      normal = rotation3d(vecteur3d(0, 0, 1), droiteRot, inclinaison)
      poly = polygone(unDesParalleles[2])
      unDesParalleles = cercle3d(
        centreParallele,
        normal,
        rayonDuParallele,
        false,
      )
      paralleles.listePoints3d.push(unDesParalleles[1])
      for (let ee = 0; ee < paralleles.listePoints3d[0].length; ee++) {
        paralleles.listePoints3d[j][ee].isVisible =
          !paralleles.listePoints3d[j][ee].c2d.estDansPolygone(poly)
      }
      paralleles.ptCachePremier.push(point(0, 0))
      paralleles.indicePtCachePremier.push(0)
      paralleles.ptCacheDernier.push(point(0, 0))
      paralleles.indicePtCacheDernier.push(0)

      for (
        let ee = 0, s, s1, d1, d2, jj, pt;
        ee < paralleles.listePoints3d[0].length;
        ee++
      ) {
        s = segment(
          paralleles.listePoints3d[j][ee].c2d,
          paralleles.listePoints3d[j][
            (ee + 1) % paralleles.listePoints3d[0].length
          ].c2d,
        )
        // Recherche du point d'intersection entre le parallèle actuel et le précédent.
        if (
          !paralleles.listePoints3d[j][ee].isVisible &&
          paralleles.listePoints3d[j][
            (ee + 1) % paralleles.listePoints3d[0].length
          ].isVisible
        ) {
          jj = ee - 3
          s1 = droite(
            paralleles.listePoints3d[j - 1][
              (paralleles.listePoints3d[0].length + jj) %
                paralleles.listePoints3d[0].length
            ].c2d,
            paralleles.listePoints3d[j - 1][
              (paralleles.listePoints3d[0].length + jj - 1) %
                paralleles.listePoints3d[0].length
            ].c2d,
          )
          // Le point d'intersection avec ce segment précis du parallèle actuel est avec l'un des 7 (nombre totalement empirique) segments les plus proches du parallèle précédent.
          let cptBoucleInfinie = 0
          while (!s.estSecant(s1) && cptBoucleInfinie < 7) {
            jj++
            s1 = droite(
              paralleles.listePoints3d[j - 1][
                (paralleles.listePoints3d[0].length + jj) %
                  paralleles.listePoints3d[0].length
              ].c2d,
              paralleles.listePoints3d[j - 1][
                (paralleles.listePoints3d[0].length + jj - 1) %
                  paralleles.listePoints3d[0].length
              ].c2d,
            )
            cptBoucleInfinie++
          }
          if (cptBoucleInfinie === 7) {
            // console.info('Boucle infinie')
          } else {
            // s étant secant avec s1, on mène plusieurs actions :
            d1 = droite(
              paralleles.listePoints3d[j][ee].c2d,
              paralleles.listePoints3d[j][
                (ee + 1) % paralleles.listePoints3d[0].length
              ].c2d,
            )
            d2 = droite(
              paralleles.listePoints3d[j - 1][
                (paralleles.listePoints3d[0].length + jj) %
                  paralleles.listePoints3d[0].length
              ].c2d,
              paralleles.listePoints3d[j - 1][
                (paralleles.listePoints3d[0].length + jj - 1) %
                  paralleles.listePoints3d[0].length
              ].c2d,
            )
            pt = pointIntersectionDD(d1, d2) // 1) Tout d'abord, ce point d'intersection est donc la frontière entre le visible et le caché et on l'enregistre comme élément de l'enveloppe de la sphère
            if (!pt) {
              window.notify(
                "Erreur dans le calcul du point d'intersection entre d1 et d2",
                { d1, d2 },
              )
              continue
            }
            enveloppeSphere1.push(pt)
            //  2) Ensuite, si pt est le tout premier point d'intersection trouvé, on enregistre quel est le premier parallèle et quel est son indice
            // Ces informmations serviront pour le tracé de l'enveloppe près du pôle Nord.
            if (premierParallele >= j) {
              premierParallele = j
              indicePremier = jj % paralleles.listePoints3d[0].length
            }
            // 3) On note ce point pour le futur tracé du parallèle, si besoin
            paralleles.ptCachePremier[j] = pt
            paralleles.indicePtCachePremier[j] = ee
          }
        } else if (
          paralleles.listePoints3d[j][ee].isVisible &&
          !paralleles.listePoints3d[j][
            (ee + 1) % paralleles.listePoints3d[0].length
          ].isVisible
        ) {
          // Si le point précédent était l'entrée dans la partie cachée, alors celui-ci sera celui de l'entrée dans la partie visible (ou inversement)
          // car pour chaque parallèle intersecté avec le précédent, il y a "forcément" deux points sauf tangence mais ce n'est pas un pb.
          jj = ee - 3
          s1 = droite(
            paralleles.listePoints3d[j - 1][
              (paralleles.listePoints3d[0].length + jj) %
                paralleles.listePoints3d[0].length
            ].c2d,
            paralleles.listePoints3d[j - 1][
              (paralleles.listePoints3d[0].length + jj - 1) %
                paralleles.listePoints3d[0].length
            ].c2d,
          )
          // On recherche le point d'intersection
          let cptBoucleInfinie = 0
          while (!s.estSecant(s1) && cptBoucleInfinie < 7) {
            jj++
            s1 = droite(
              paralleles.listePoints3d[j - 1][
                (paralleles.listePoints3d[0].length + jj) %
                  paralleles.listePoints3d[0].length
              ].c2d,
              paralleles.listePoints3d[j - 1][
                (paralleles.listePoints3d[0].length + jj - 1) %
                  paralleles.listePoints3d[0].length
              ].c2d,
            )
            cptBoucleInfinie++
          }
          if (cptBoucleInfinie === 7) {
            // console.info('Boucle infinie')
          } else {
            // s étant secant avec s1, on mène plusieurs actions :
            d1 = droite(
              paralleles.listePoints3d[j][ee].c2d,
              paralleles.listePoints3d[j][
                (ee + 1) % paralleles.listePoints3d[0].length
              ].c2d,
            )
            d2 = droite(
              paralleles.listePoints3d[j - 1][
                (paralleles.listePoints3d[0].length + jj) %
                  paralleles.listePoints3d[0].length
              ].c2d,
              paralleles.listePoints3d[j - 1][
                (paralleles.listePoints3d[0].length + jj - 1) %
                  paralleles.listePoints3d[0].length
              ].c2d,
            )
            pt = pointIntersectionDD(d1, d2)
            if (!pt) {
              window.notify(
                "Erreur dans le calcul du point d'intersection entre d1 et d2",
                { d1, d2 },
              )
              continue
            }
            // 1) Tout d'abord, ce point d'intersection est donc la frontière entre le visible et le caché et on l'enregistre comme élément de l'enveloppe de la sphère
            enveloppeSphere2.push(pt)
            // 2) Ensuite, si pt est le tout premier point d'intersection trouvé, on enregistre quel est le premier parallèle et quel est son indice
            // Ces informmations serviront pour le tracé de l'enveloppe près du pôle Sud.
            if (premierParallele >= j) {
              premierParallele = j
              indiceDernier = jj
            }
            // 3) On note ce point pour le futur tracé du parallèle, si besoin
            paralleles.ptCacheDernier[j] = pt
            paralleles.indicePtCacheDernier[j] = ee
          }
        }
      }
      j++
    }

    if (this.nbParalleles !== 0) {
      let t = tracePoint(poleNord.c2d, this.colorParalleles)
      t.style = 'o'
      t.taille = 0.5
      this.c2d.push(t)
      t = tracePoint(
        poleSud.c2d,
        assombrirOuEclaircir(this.colorParalleles, 50),
      )
      t.style = 'o'
      t.taille = 0.5
      this.c2d.push(t)
    }

    // Construction des parallèles demandés
    for (
      let k = nbParallelesDeConstruction, j = -1;
      k > -nbParallelesDeConstruction;
      k -= 1
    ) {
      const polyLineVisible = [] // Contient l'ensemble des points du parallèle contenus dans la partie visible
      let polyLineCachee = [] // Idem pour la partie cachée.
      if (
        (this.nbParalleles !== 0 || k === 0) &&
        k !== nbParallelesDeConstruction &&
        k % divisionParalleles === 0
      ) {
        // k=0 : C'est l'équateur
        for (let ee = 0; ee < paralleles.listePoints3d[0].length; ee++) {
          if (paralleles.indicePtCachePremier[j] === ee) {
            polyLineCachee.push(paralleles.ptCachePremier[j])
          } else if (paralleles.indicePtCacheDernier[j] === ee) {
            polyLineCachee.push(paralleles.ptCacheDernier[j])
          } else {
            // Tracé des pointilles ou pas des parallèles
            if (
              !paralleles.listePoints3d[j][ee].isVisible &&
              !paralleles.listePoints3d[j][
                (ee + 1) % paralleles.listePoints3d[0].length
              ].isVisible
            ) {
              polyLineCachee.push(paralleles.listePoints3d[j][ee].c2d)
            } else {
              polyLineVisible.push(
                paralleles.listePoints3d[j][
                  (ee + 1) % paralleles.listePoints3d[0].length
                ].c2d,
              )
            }
          }
        }
        if (k < 36 && k > -30) {
          // uniquement à bonne distance des pôles pour éviter les points trop proches
          let securite = 0
          if (polyLineCachee.length > 4) {
            // une précaution au cas où la liste de points est courte ça pourrait boucler à l'infini
            while (
              securite < 10 &&
              longueur(
                polyLineCachee[polyLineCachee.length - 1],
                polyLineCachee[0],
              ) < 1
            ) {
              const dernierPoint = polyLineCachee.pop()
              if (dernierPoint)
                polyLineCachee = [
                  point(dernierPoint.x, dernierPoint.y),
                  ...polyLineCachee,
                ]
              securite++
            }
          }
          if (polyLineVisible.length > 4) {
            while (
              securite < 20 &&
              longueur(
                polyLineVisible[polyLineVisible.length - 1],
                polyLineVisible[0],
              ) < 1
            ) {
              const premierPoint = polyLineVisible.shift()
              if (premierPoint)
                polyLineVisible.push(point(premierPoint.x, premierPoint.y))
              securite++
            }
          }
        }
        if (faceCachee) {
          const ligneCachee =
            polyLineCachee.length > 0 ? polyline(...polyLineCachee) : null // parfois, il n'y a rien à cacher près du pôle nord
          if (ligneCachee && k === 0) {
            // là on est certain qu'il y a du monde à cacher
            ligneCachee.color = colorToLatexOrHTML(this.colorEquateur)
            ligneCachee.epaisseur = 1.5
          } else {
            if (ligneCachee)
              ligneCachee.color = colorToLatexOrHTML(this.colorParalleles)
          }
          if (faceCachee && ligneCachee) {
            ligneCachee.pointilles = 4
            ligneCachee.opacite = 0.5
            this.c2d.push(ligneCachee)
          }
        }
        const ligneVisible =
          polyLineVisible.length > 0 ? polyline(...polyLineVisible) : null // et rien non plus à montrer près du pôle sud.
        if (ligneVisible && k === 0) {
          // là on est certain qu'il y a du monde à montrer
          ligneVisible.color = colorToLatexOrHTML(this.colorEquateur)
          ligneVisible.epaisseur = 1.5
        } else {
          if (ligneVisible)
            ligneVisible.color = colorToLatexOrHTML(this.colorParalleles)
        }
        if (ligneVisible) {
          this.c2d.push(ligneVisible)
        }
      }
      j++
    }

    // Construction des méridiens demandés
    if (this.nbMeridiens !== 0) {
      const divisionMeridiens = Math.round(36 / this.nbMeridiens)
      for (let k = 0, s; k < 18; k += divisionMeridiens) {
        const polyLineCachee1 = []
        const polyLineVisible1 = []
        const polyLineCachee2 = []
        const polyLineVisible2 = []

        for (let ee = 1; ee < paralleles.listePoints3d.length - 1; ee++) {
          // Affichage des méridiens sans le dernier segment relié aux pôles
          // s = segment(paralleles.listePoints3d[ee][k].c2d, paralleles.listePoints3d[(ee + 1) % paralleles.listePoints3d.length][k].c2d, this.colorMeridiens)
          if (
            !paralleles.listePoints3d[ee][k].isVisible &&
            !paralleles.listePoints3d[
              (ee + 1) % paralleles.listePoints3d.length
            ][k].isVisible
          ) {
            //  s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient dans les petits cercles
            //  s.opacite = 0.5
            polyLineCachee1.push(paralleles.listePoints3d[ee][k].c2d)
          } else {
            polyLineVisible1.push(paralleles.listePoints3d[ee][k].c2d)
          }
          // this.c2d.push(s)
          // s = segment(paralleles.listePoints3d[ee][k + 18].c2d, paralleles.listePoints3d[(ee + 1) % paralleles.listePoints3d.length][k + 18].c2d, this.colorMeridiens)
          if (
            !paralleles.listePoints3d[ee][k + 18].isVisible &&
            !paralleles.listePoints3d[
              (ee + 1) % paralleles.listePoints3d.length
            ][k + 18].isVisible
          ) {
            //   s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient dans les petits cercles
            //   s.opacite = 0.5
            polyLineCachee2.push(paralleles.listePoints3d[ee][k + 18].c2d)
          } else {
            polyLineVisible2.push(paralleles.listePoints3d[ee][k + 18].c2d)
          }
        }
        // Affichage de la partie reliée au pôle Nord
        s = segment(
          poleNord.c2d,
          paralleles.listePoints3d[1][k].c2d,
          this.colorMeridiens,
        )
        this.c2d.push(s)
        s = segment(
          paralleles.listePoints3d[1][k + 18].c2d,
          poleNord.c2d,
          this.colorMeridiens,
        )
        this.c2d.push(s)
        // Affichage de la partie reliée au pôle Sud
        s = segment(
          poleSud.c2d,
          paralleles.listePoints3d[paralleles.listePoints3d.length - 1][k].c2d,
          this.colorMeridiens,
        )
        if (
          faceCachee &&
          !paralleles.listePoints3d[paralleles.listePoints3d.length - 1][0]
            .isVisible
        ) {
          s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient dans les petits cercles
          s.opacite = 0.5
          this.c2d.push(s)
        } else {
          if (faceCachee) this.c2d.push(s)
        }
        s = segment(
          paralleles.listePoints3d[paralleles.listePoints3d.length - 1][k + 18]
            .c2d,
          poleSud.c2d,
          this.colorMeridiens,
        )
        if (
          faceCachee &&
          !paralleles.listePoints3d[paralleles.listePoints3d.length - 1][k]
            .isVisible
        ) {
          s.pointilles = 4 // Laisser 4 car sinon les pointilles ne se voient dans les petits cercles
          s.opacite = 0.5
          this.c2d.push(s)
        } else {
          if (faceCachee) this.c2d.push(s)
        }

        const ligneVisible1 = polyline(...polyLineVisible1)
        const ligneVisible2 = polyline(...polyLineVisible2)

        if (faceCachee) {
          const ligneCachee1 = polyline(...polyLineCachee1)
          const ligneCachee2 = polyline(...polyLineCachee2)
          ligneCachee1.pointilles = 4
          ligneCachee1.opacite = 0.5
          ligneCachee2.pointilles = 4
          ligneCachee2.opacite = 0.5
          this.c2d.push(ligneCachee1, ligneCachee2)
        }
        this.c2d.push(ligneVisible1, ligneVisible2)
      }
    }

    // L'enveloppe finale contiendra les points de l'enveloppe 1 + les points de l'enveloppe 2 inversée (sinon le polygone serait croisé)
    // A cela, il faut ajouter les points autour des pôles car les premiers parallèles ne s'intersectent pas forcément.
    enveloppeSphere2 = enveloppeSphere2.reverse()
    const enveloppeSphere = [...enveloppeSphere1]

    // Pour trouver les points du cercle apparent près du pôle sud
    // On va prendre les points du premier parallèle intersecté entre l'indice du premier point d'intersection et l'indice du dernier point d'intersection.
    let ii = 1
    while (
      (indiceDernier + paralleles.listePoints3d[0].length / 2 + ii) %
        paralleles.listePoints3d[0].length <
      (indicePremier + paralleles.listePoints3d[0].length / 2) %
        paralleles.listePoints3d[0].length
    ) {
      enveloppeSphere.push(
        paralleles.listePoints3d[
          2 * nbParallelesDeConstruction - 1 - premierParallele
        ][
          (indiceDernier + paralleles.listePoints3d[0].length / 2 + ii) %
            paralleles.listePoints3d[0].length
        ].c2d,
      )
      ii++
    }
    enveloppeSphere.push(...enveloppeSphere2)
    // Pour trouver les points du cercle apparent près du pôle nord
    // On va prendre les points du premier parallèle intersecté entre l'indice du premier point d'intersection et l'indice du dernier point d'intersection.
    // La gestion des indices est plus compliquée car il arrive de repasser de 35 à 0 (36 modulo 36) d'où cette double gestion.
    if (indiceDernier > indicePremier) {
      ii = 1
      while (
        indiceDernier + ii <
        indicePremier + paralleles.listePoints3d[0].length
      ) {
        enveloppeSphere.push(
          paralleles.listePoints3d[premierParallele][
            (indiceDernier + ii) % paralleles.listePoints3d[0].length
          ].c2d,
        )
        ii++
      }
    } else {
      ii = 1
      while (indiceDernier + ii < indicePremier) {
        enveloppeSphere.push(
          paralleles.listePoints3d[premierParallele][indiceDernier + ii].c2d,
        )
        ii++
      }
    }
    const p = polygone(enveloppeSphere, this.colorEnveloppe)
    p.epaisseur = 1.5

    this.c2d.push(p)

    if (this.affichageAxe) {
      const l = longueur(poleNord.c2d, poleSud.c2d)
      let ee = 1
      const poly = polygone(enveloppeSphere)
      // poly.isVisible = false
      while (
        ee < 2 &&
        pointSurSegment(poleNord.c2d, poleSud.c2d, ee * l).estDansPolygone(poly)
      ) {
        ee += 0.01
      }

      let s = segment(
        poleNord.c2d,
        pointSurSegment(poleNord.c2d, poleSud.c2d, Math.max(ee - 0.01, 1) * l),
        this.colorAxe,
      )
      s.pointilles = 2
      this.c2d.push(s)
      s = segment(
        poleSud.c2d,
        pointSurSegment(poleNord.c2d, poleSud.c2d, 1.1 * l),
        this.colorAxe,
      )
      this.c2d.push(s)
      s = segment(
        poleNord.c2d,
        pointSurSegment(poleNord.c2d, poleSud.c2d, -0.1 * l),
        this.colorAxe,
      )
      this.c2d.push(s)
    }
    this.objets = this.c2d
  }
}
/**
 * Crée une sphère
 * @param {Point3d} centre Centre de la sphère
 * @param {Vecteur3d} rayon Vecteur correspondant au rayon de la sphère
 * @param {string} [colorEquateur = 'red'] Couleur de l'équateur : du type 'blue' ou du type '#f15929'
 * @param {string} [colorEnveloppe = 'blue'] Couleur de l'enveloppe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbParalleles = 0]  Le nombre de parallèles au total
 * @param {string} [colorParalleles = 'gray'] Couleur des parallèles de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} [nbMeridiens = 0]  Le nombre de méridiens au total
 * @param {string} [colorMeridiens = 'gray'] Couleur des méridiens de la sphère : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la sphère.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe de la sphère : du type 'blue' ou du type '#f15929'
 * @param {number} inclinaison Angle d'inclinaison de l'axe N-S
 * @example sphere3d(A,v) // Crée une sphère de centre A et dont le rayon correspond au vecteur v, l'équateur rouge et l'enveloppe bleue
 * @example sphere3d(A,v,'green','pink') // Crée une sphère de centre A et dont le rayon correspond au vecteur v, l'équateur vert et l'enveloppe rose
 * @example sphere3d(A,v,'green','pink',18,'red') // Crée une sphère de centre A et dont le rayon correspond au vecteur v, l'équateur vert, l'enveloppe rose, avec 18 parallèles rouges
 * @example sphere3d(A,v,'green','pink',18,'red',36,'blue') // Crée une sphère de centre A et dont le rayon correspond au vecteur v, l'équateur vert, l'enveloppe rose, avec 18 parallèles rouges et 36 méridiens verts
 * @example sphere3d(A,v,'green','pink',18,'red',36,'blue',true,'#f15929') // Crée une sphère de centre A et dont le rayon correspond au vecteur v, l'équateur vert, l'enveloppe rose, avec 18 parallèles rouges, 36 méridiens verts et un axe affiché orange
 * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
 * @return {Sphere3d}
 */

export function sphere3d(
  centre: Point3d,
  rayon: Vecteur3d,
  colorEquateur = 'red',
  colorEnveloppe = 'blue',
  nbParalleles = 0,
  colorParalleles = 'gray',
  nbMeridiens = 0,
  colorMeridiens = 'black',
  affichageAxe = false,
  colorAxe = 'black',
  inclinaison = 0,
  faceCachee = true,
) {
  return new Sphere3d(
    centre,
    rayon,
    colorEquateur,
    colorEnveloppe,
    nbParalleles,
    colorParalleles,
    nbMeridiens,
    colorMeridiens,
    affichageAxe,
    colorAxe,
    inclinaison,
    faceCachee,
  )
}
/**
 * Classe du cône
 * @param {Point3d} centre Centre de la base du cône
 * @param {Point3d} sommet Sommet du cône
 * @param {Vecteur3d} rayon Rayon de la base du cône
 * @param {string} [color = 'black'] Couleur des génératrices visibles et de la base du cône : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = true] Permet (ou pas) l'affichage de l'axe du cône.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe et du centre de la base du cône : du type 'blue' ou du type '#f15929'
 * @param {string} [colorCone = 'gray'] Couleur du cône : du type 'blue' ou du type '#f15929'
 * @param {boolean} affichageCentre Affiche ou pas le centre du cône.
 * @property {Point3d} centre centre de la base du cône
 * @property {Point3d} sommet Sommet du cône
 * @property {Vecteur3d} rayon Rayon de la base du cône
 * @property {string} color Couleur des génératrices visibles et de la base du cône : du type 'blue' ou du type '#f15929'
 * @property {boolean} affichageAxe Permet (ou pas) l'affichage de l'axe du cône.
 * @property {string} colorAxe Couleur de l'axe et du centre de la base du cône : du type 'blue' ou du type '#f15929'
 * @property {string} colorCone Couleur du cône : du type 'blue' ou du type '#f15929'
 * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
 * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
 * @class
 */

export class Cone3d extends ObjetMathalea2D {
  constructor(
    centre: Point3d,
    sommet: Point3d,
    rayon: Vecteur3d,
    color: string = 'black',
    affichageAxe = true,
    colorAxe = 'black',
    colorCone = 'gray',
    affichageCentre = true,
    affichageBase = true,
  ) {
    super()
    this.centre = centre
    this.sommet = sommet
    this.rayon = rayon
    this.color = colorToLatexOrHTML(color)
    this.colorAxe = colorAxe
    this.colorCone = colorCone

    const pt1 = translation3d(this.centre, this.rayon)
    const ptsBase = [pt1]
    const nbSommets = 36
    for (let ee = 1; ee < nbSommets; ee++) {
      ptsBase.push(
        rotation3d(
          pt1,
          droite3d(this.centre, vecteur3d(this.sommet, this.centre)),
          (ee * 360) / nbSommets,
        ),
      )
    }
    const p = polygone3d(ptsBase, this.color[0])
    // this.c2d = pyramide3d(p, this.sommet, this.color, this.centre, affichageAxe, this.colorAxe, false, true, this.colorCone).c2d
    this.c2d = pyramide3d(
      p,
      this.sommet,
      this.color[0],
      affichageCentre ? this.centre : undefined,
      affichageAxe,
      this.colorAxe,
      false,
      true,
      this.colorCone,
      affichageBase,
    ).c2d
  }
}
/**
 * Crée un cône
 * @param {Point3d} centre centre de la base du cône
 * @param {Point3d} sommet Sommet du cône
 * @param {Vecteur3d} rayon Rayon de la base du cône
 * @param {string} [color = 'black'] Couleur des génératrices visibles et de la base du cône : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageAxe = true] Permet (ou pas) l'affichage de l'axe du cône.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe et du centre de la base du cône : du type 'blue' ou du type '#f15929'
 * @param {string} [colorCone = 'gray'] Couleur du cône : du type 'blue' ou du type '#f15929'
 * @param {boolean} affichageCentre Affiche ou pas le centre du cône.
 * @example cone3d(A,B,v) // Créé un cône de centre A, de sommet B et dont le rayon correspond au vecteur v
 * @example cone3d(A,B,v,'red') // Créé un cône de centre A, de sommet B et dont le rayon correspond au vecteur v, la couleur du cône en fil de fer est rouge
 * @example cone3d(A,B,v,'red',true,'green') // Créé un cône de centre A, de sommet B et dont le rayon correspond au vecteur v, la couleur du cône en fil de fer est rouge, l'axe est affiché en vert
 * @example cone3d(A,B,v,'red',true,'green','blue') // Créé un cône de centre A, de sommet B et dont le rayon correspond au vecteur v, la couleur du cône en fil de fer est rouge, l'axe est affiché en vert et la face externe du cône est bleue
 * @author Eric Elter
 * @return {Cone3d}
 */

export function cone3d(
  centre: Point3d,
  sommet: Point3d,
  rayon: Vecteur3d,
  color: string = 'black',
  affichageAxe = false,
  colorAxe = 'black',
  colorCone = 'gray',
  affichageCentre = true,
  affichageBase = true,
) {
  return new Cone3d(
    centre,
    sommet,
    rayon,
    color,
    affichageAxe,
    colorAxe,
    colorCone,
    affichageCentre,
    affichageBase,
  )
}
/**
 * Classe du cylindre : un cylindre de révolution défini par les centres de ses 2 bases
 * Permet en faisant varier les rayons des deux bases de créer des troncs de cônes (A VERIFIER)
 * @param {Point3d} centrebase1 Centre de la première base
 * @param {Point3d} centrebase2 Centre de la seconde base
 * @param {Vecteur3d} rayon1 Vecteur correspondant au rayon de la première base
 * @param {Vecteur3d} rayon2 Vecteur correspondant au rayon de la seconde base
 * @param {string} [color = 'black'] Couleur des "bords" du cylindre : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageGeneratrices = true] Permet (ou pas) l'affichage de génératrices du cylindre
 * @param {boolean} [affichageCentreBases = false] Permet (ou pas) l'affichage des centres respectifs de chaque base
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe du cylindre
 * @param {string} [colorAxe = 'black'] Couleur de l'axe et des centres respectifs de chaque base du cylindre : du type 'blue' ou du type '#f15929'
 * @param {boolean} [cylindreColore = false] Permet (ou pas) de colorier le cylindre
 * @param {string} [colorCylindre = 'lightgray'] Couleur du cylindre (avec gestion intégrée de la nuance de couleurs): du type 'blue' ou du type '#f15929'
 * @param {boolean} [avecFaceHaut = true] Permet (ou pas) d'afficher la face haut du cylindre
 * @property {Point3d} centrebase1 Centre de la première base
 * @property {Point3d} centrebase2 Centre de la seconde base
 * @property {Vecteur3d} rayon1 Vecteur correspondant au rayon de la première base
 * @property {Vecteur3d} rayon2 Vecteur correspondant au rayon de la seconde base
 * @property {string} color Couleur des "bords" du cylindre : du type 'blue' ou du type '#f15929'
 * @property {boolean} affichageGeneratrices Permet (ou pas) l'affichage de génératrices du cylindre
 * @property {boolean} affichageCentreBases Permet (ou pas) l'affichage des centres respectifs de chaque base
 * @property {boolean} affichageAxe Permet (ou pas) l'affichage de l'axe du cylindre
 * @property {string} colorAxe Couleur de l'axe et des centres respectifs de chaque base du cylindre : du type 'blue' ou du type '#f15929'
 * @property {boolean} cylindreColore Permet (ou pas) de colorier le cylindre
 * @property {string} colorCylindre Couleur du cylindre (avec gestion intégrée de la nuance de couleurs): du type 'blue' ou du type '#f15929'
 * @property {number} angleDepart Angle de rotation à partir duquel les demis-cercles formant la base sont tracés
 * @property {Points[]} pointsBase1 Liste des points formant la ligne de la base 1
 * @property {Points[]} pointsBase2 Liste des points formant la ligne de la base 2
 * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
 * @author Jean-Claude Lhote (optimisé par Eric Elter)
 * @class
 */

export class Cylindre3d extends ObjetMathalea2D {
  constructor(
    centrebase1: Point3d,
    centrebase2: Point3d,
    rayon1: Vecteur3d,
    rayon2: Vecteur3d,
    color: string = 'black',
    affichageGeneratrices = true,
    affichageCentreBases = false,
    affichageAxe = false,
    colorAxe = 'black',
    cylindreColore = false,
    colorCylindre = 'lightgray',
    avecFaceHaut = true,
  ) {
    super()
    this.centrebase1 = centrebase1
    this.centrebase2 = centrebase2
    this.rayon1 = rayon1
    this.rayon2 = rayon2
    this.color = colorToLatexOrHTML(color)
    this.affichageGeneratrices = affichageGeneratrices
    this.affichageCentreBases = affichageCentreBases
    this.affichageAxe = affichageAxe
    this.colorAxe = colorAxe
    this.cylindreColore = cylindreColore
    this.colorCylindre = colorCylindre
    this.c2d = []
    let s
    this.normal = vecteur3d(this.centrebase1, this.centrebase2)
    const prodvec = vecteur3d(
      math.cross(this.normal.matrice, this.rayon1.matrice),
    )
    const prodscal = math.dot(prodvec.matrice, vecteur3d(0, 1, 0).matrice)
    let cote1, cote2
    const centre1PlusBasQueCentre2 =
      this.centrebase1.c2d.y !== this.centrebase2.c2d.y
        ? this.centrebase1.c2d.y < this.centrebase2.c2d.y
        : context.anglePerspective > 0
    if (prodscal * context.anglePerspective > 0) {
      cote1 = centre1PlusBasQueCentre2 ? 'direct' : 'indirect'
      cote2 = centre1PlusBasQueCentre2 ? 'indirect' : 'direct'
    } else {
      cote2 = centre1PlusBasQueCentre2 ? 'direct' : 'indirect'
      cote1 = centre1PlusBasQueCentre2 ? 'indirect' : 'direct'
    }
    cote2 = this.rayon1.x === 0 && this.rayon1.y === 0 ? 'indirect' : cote2
    cote1 = this.rayon1.x === 0 && this.rayon1.y === 0 ? 'direct' : cote1
    // Cette partie permet de chercher le bon angle de départ pour le tracé des demi-bases
    // Recherche du premier point visible sur la demi-base visible
    let angleDepart = 0
    let distanceMax = 0
    const d = droite3d(this.centrebase1, this.normal)
    let ptReference = rotation3d(
      translation3d(this.centrebase1, this.rayon1),
      d,
      angleDepart,
    )
    const secondPt = rotation3d(
      translation3d(this.centrebase1, this.rayon1),
      d,
      angleDepart + 1,
    )
    const sensRecherche =
      distancePointDroite(ptReference.c2d, d.c2d) <
      distancePointDroite(secondPt.c2d, d.c2d)
        ? 1
        : -1
    while (distancePointDroite(ptReference.c2d, d.c2d) > distanceMax) {
      distanceMax = distancePointDroite(ptReference.c2d, d.c2d)
      angleDepart = angleDepart + sensRecherche
      ptReference = rotation3d(
        translation3d(this.centrebase1, this.rayon1),
        d,
        angleDepart,
      )
    }
    angleDepart = angleDepart - sensRecherche
    // angleDepart est donc l'angle qui permet d'avoir un tracé de demicercle3d idéal
    this.angleDepart = angleDepart
    // Description de chaque demi-base en position verticale
    // c1 : cercle bas derrière
    const c1 = demicercle3d(
      this.centrebase1,
      this.normal,
      this.rayon1,
      cote1,
      true,
      this.color[0],
      angleDepart,
    )
    // c3 : cercle haut derrière
    const c3 = demicercle3d(
      this.centrebase2,
      this.normal,
      this.rayon2,
      cote1,
      false,
      this.color[0],
      angleDepart,
    )
    // c2 : cercle bas devant
    const c2 = demicercle3d(
      this.centrebase1,
      this.normal,
      this.rayon1,
      cote2,
      false,
      this.color[0],
      angleDepart,
    )
    // c4 : cercle haut devant
    const c4 = demicercle3d(
      this.centrebase2,
      this.normal,
      this.rayon2,
      cote2,
      false,
      this.color[0],
      angleDepart,
    )
    this.pointsBase1 = [...c1.listePoints, ...c2.listePoints]
    this.pointsBase2 = [...c3.listePoints, ...c4.listePoints]
    if (this.cylindreColore) {
      let polygon = [...c4.listePoints]
      for (let i = c2.listePoints.length - 1; i >= 0; i--) {
        polygon.push(c2.listePoints[i])
      }
      const faceColoree = polygone(polygon, 'white')
      faceColoree.couleurDeRemplissage = colorToLatexOrHTML(this.colorCylindre)
      this.c2d.push(faceColoree)

      polygon = [...c3.listePoints]
      for (let i = c4.listePoints.length - 1; i >= 0; i--) {
        polygon.push(c4.listePoints[i])
      }
      const baseColoree = polygone(polygon, 'white')
      baseColoree.couleurDeRemplissage = colorToLatexOrHTML(
        assombrirOuEclaircir(this.colorCylindre, 25),
      )
      this.c2d.push(baseColoree)
    }

    if (this.affichageGeneratrices) {
      for (let i = 1; i < c1.listePoints.length - 1; i += 2) {
        s = segment(c3.listePoints[i], c1.listePoints[i], this.color[0])
        s.pointilles = 2
        s.opacite = 0.3
        this.c2d.push(s)
      }
    }

    s = segment(c4.listePoints[0], c2.listePoints[0], this.color[0])
    this.c2d.push(s)

    if (this.affichageGeneratrices) {
      for (let i = 1; i < c2.listePoints.length - 1; i++) {
        s = segment(c4.listePoints[i], c2.listePoints[i], this.color[0])
        this.c2d.push(s)
      }
    }

    s = segment(
      c4.listePoints[c2.listePoints.length - 1],
      c2.listePoints[c2.listePoints.length - 1],
      this.color[0],
    )
    this.c2d.push(s)

    this.c2d.push(c1, c2)
    if (avecFaceHaut) this.c2d.push(c3, c4)

    if (this.affichageCentreBases) {
      this.c2d.push(
        tracePoint(this.centrebase1.c2d, this.centrebase2.c2d, this.colorAxe),
      )
    }

    if (this.affichageAxe) {
      let distanceMin = 9999
      const pt = c2.listePoints
      let i = 0
      const axeCylindre = droite(this.centrebase2.c2d, this.centrebase1.c2d)
      while (distancePointDroite(pt[i], axeCylindre) < distanceMin) {
        distanceMin = distancePointDroite(pt[i], d.c2d)
        i++
      }
      s = segment(this.centrebase2.c2d, this.centrebase1.c2d, this.colorAxe)
      s.pointilles = 2
      s.opacite = 0.7
      this.c2d.push(s)

      // Construction de l'extension de l'axe
      s = droite(pt[i], pt[i - 1])
      const ptAxe1 = pointIntersectionDD(s, axeCylindre)
      if (!ptAxe1) {
        window.notify('Axe du cylindre non défini correctement', {
          s,
          axeCylindre,
        })
        return
      }
      s = segment(this.centrebase1.c2d, ptAxe1, this.colorAxe)
      s.pointilles = 2
      s.opacite = 0.7
      this.c2d.push(s)
      s = segment(
        translation(ptAxe1, vecteur(this.centrebase1.c2d, ptAxe1)),
        ptAxe1,
        this.colorAxe,
      )
      s.opacite = 0.7
      this.c2d.push(s)

      const ptAxe2 = translation(
        this.centrebase2.c2d,
        vecteur(
          translation(ptAxe1, vecteur(this.centrebase1.c2d, ptAxe1)),
          this.centrebase1.c2d,
        ),
      )
      s = segment(ptAxe2, this.centrebase2.c2d)
      s.opacite = 0.7
      this.c2d.push(s)
    }
  }
}
/**
 * Crée un cylindre de révolution défini par les centres de ses 2 bases
 * Permet en faisant varier les rayons des deux bases de créer des troncs de cônes (A VERIFIER)
 * @param {Point3d} centrebase1 Centre de la première base
 * @param {Point3d} centrebase2 Centre de la seconde base
 * @param {Vecteur3d} rayon1 Vecteur correspondant au rayon de la première base
 * @param {Vecteur3d} rayon2 Vecteur correspondant au rayon de la seconde base
 * @param {string} [color = 'black'] Couleur des "bords" du cylindre : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageGeneratrices = true] Permet (ou pas) l'affichage de génératrices du cylindre
 * @param {boolean} [affichageCentreBases = false] Permet (ou pas) l'affichage des centres respectifs de chaque base
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe du cylindre
 * @param {string} [colorAxe = 'black'] Couleur de l'axe et des centres respectifs de chaque base du cylindre : du type 'blue' ou du type '#f15929'
 * @param {boolean} [cylindreColore = false] Permet (ou pas) de colorier le cylindre
 * @param {string} [colorCylindre = 'lightgray'] Couleur du cylindre (avec gestion intégrée de la nuance de couleurs): du type 'blue' ou du type '#f15929'
 * @param {boolean} [avecFaceHaut = true] Permet (ou pas) d'afficher la face haut du cylindre
 * @example cylindre3d(A, B, v, v, 'blue')
 * // Retourne un cylindre à bords bleus dont les bases ont pour centre respectif A et B et le rayon est donné par le vecteur v.
 * @example cylindre3d(A, B, v, v, 'green', false, true, true, 'red', true, 'lightblue')
 * // Retourne un cylindre à bords verts dont les bases ont pour centre respectif A et B et le rayon est donné par le vecteur v.
 * // Les génératrices sont invisibles, les centres et axe sont visibles et rouges, le cylindre est coloré en bleu.
 * @author Jean-Claude Lhote (optimisé par Eric Elter)
 * @return {Cylindre3d}
 */
export function cylindre3d(
  centrebase1: Point3d,
  centrebase2: Point3d,
  rayon: Vecteur3d,
  rayon2: Vecteur3d,
  color: string = 'black',
  affichageGeneratrices = true,
  affichageCentreBases = false,
  affichageAxe = false,
  colorAxe = 'black',
  cylindreColore = false,
  colorCylindre = 'lightgray',
  avecFaceHaut = true,
) {
  return new Cylindre3d(
    centrebase1,
    centrebase2,
    rayon,
    rayon2,
    color,
    affichageGeneratrices,
    affichageCentreBases,
    affichageAxe,
    colorAxe,
    cylindreColore,
    colorCylindre,
    avecFaceHaut,
  )
}
/**
 * Classe du prisme droit
 * Ce prisme droit est optimisé dans son tracé des arêtes cachées pour des bases dans le plan (xOy) et son vecteur normal selon (Oz)
 * Pour d'autres usages, il faut approfondir la fonction mais laissé en l'état car justement pas d'autre usage demandé.
 * @param {Polygone3d} base Une des deux bases du prisme droit
 * @param {Vecteur3d} vecteur Vecteur normal à la base dont la norme indique la hauteur du prisme droit.
 * @param {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets du prisme.
 * @property {Polygone3d} base1 La base entièrement visible du prisme droit
 * @property {Vecteur3d} vecteur Vecteur normal à la base dont la norme indique la hauteur du prisme droit.
 * @property {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
 * @property {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets du prisme.
 * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
 * @property {string} nom Nom du prisme
 * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
 * @class
 */

export class Prisme3d extends ObjetMathalea2D {
  constructor(
    base: Polygone3d,
    vecteur: Vecteur3d,
    color: string = 'black',
    affichageNom = false,
    nomBase2?: string,
    positionLabels2?: string[],
  ) {
    super()
    this.affichageNom = affichageNom
    this.color = colorToLatexOrHTML(color)
    base.color = this.color[0]
    this.vecteur = vecteur
    if (this.vecteur.y === 0 && this.vecteur.x === 0) {
      this.base1 =
        this.vecteur.z >= 1
          ? base
          : translation3d(
              base,
              vecteur3d(this.vecteur.x, this.vecteur.y, -this.vecteur.z),
            )
      this.base2 = this.vecteur.z < 1 ? base : translation3d(base, this.vecteur)
    } else {
      this.base1 = base
      this.base2 = translation3d(base, vecteur)
    }
    this.base2.color = this.base1.color
    this.c2d = []
    let s
    // On trace this.base1 (toujours visible)
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      this.c2d.push(this.base1.c2d[i])
    }
    // On cherche les sommets cachés de this.base2
    let toutesLesAretesSontVisibles = true
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      const areteVisibleOuPas = pointSurSegment(
        this.base1.listePoints[i].c2d,
        this.base2.listePoints[i].c2d,
        longueur(this.base1.listePoints[i].c2d, this.base2.listePoints[i].c2d) /
          50,
      ).estDansPolygone(polygone(this.base1.listePoints2d))
      this.base2.listePoints[i].isVisible = !areteVisibleOuPas
      toutesLesAretesSontVisibles =
        !areteVisibleOuPas && toutesLesAretesSontVisibles
    }
    // On trace les arêtes de this.base2
    for (let i = 0; i < this.base2.listePoints.length; i++) {
      s = arete3d(
        this.base2.listePoints[i],
        this.base2.listePoints[
          i + 1 === this.base2.listePoints.length ? 0 : i + 1
        ],
        this.color[0],
      )
      if (toutesLesAretesSontVisibles) {
        // Cas particulier où aucun sommet de this.base2 n'est caché (cas de certains tétraèdres)
        let areteVisibleOuPas = true
        for (let ee = 0; ee < this.base1.listePoints.length; ee++) {
          const areteLiaison = segment(
            this.base1.listePoints[ee].c2d,
            this.base2.listePoints[ee].c2d,
          )
          areteVisibleOuPas =
            areteVisibleOuPas && !!areteLiaison.estSecant(s.c2d)
        }
        s = arete3d(
          this.base2.listePoints[i],
          this.base2.listePoints[
            i + 1 === this.base2.listePoints.length ? 0 : i + 1
          ],
          this.color[0],
          !areteVisibleOuPas,
        )
      }
      this.c2d.push(s.c2d)
    }
    // On trace les arêtes de liaison entre les bases
    for (let i = 0; i < this.base1.listePoints.length; i++) {
      s = arete3d(
        this.base1.listePoints[i],
        this.base2.listePoints[i],
        this.color[0],
      )
      this.c2d.push(s.c2d)
    }

    if (this.affichageNom) {
      let p = polygone(this.base1.listePoints2d)
      const listeLettres = choisitLettresDifferentes(
        this.base1.listePoints.length,
        'OQWX',
      )
      const nomBase1 = base.listePoints2d.map(
        (el, index) => el.nom ?? listeLettres[index],
      )

      renommePolygone(p, nomBase1)
      for (let ee = 0; ee < this.base1.listePoints2d.length; ee++) {
        this.base1.listePoints2d[ee].positionLabel =
          base.listePoints2d[ee].positionLabel ?? 'above'
      }
      this.c2d.push(
        labelPoint(
          ...p.listePoints.map((point) => pointDepuisPointAbstrait(point)),
        ),
      )
      p = polygone(this.base2.listePoints2d)
      const listeDeLettres2 = choisitLettresDifferentes(
        this.base1.listePoints.length,
        'OQWX' + nomBase1,
      )
      renommePolygone(p, nomBase2 ?? listeDeLettres2)
      for (let ee = 0; ee < this.base2.listePoints2d.length; ee++) {
        this.base2.listePoints2d[ee].positionLabel =
          positionLabels2?.[ee] ?? 'below'
      }
      this.c2d.push(
        labelPoint(
          ...p.listePoints.map((point) => pointDepuisPointAbstrait(point)),
        ),
      )
      this.nom = nomBase1 + (nomBase2 ?? '')
    }
  }
}
/**
 * Crée un prisme droit
 * Ce prisme droit est optimisé dans son tracé des arêtes cachées pour des bases dans le plan (xOy) et son vecteur normal selon (Oz)
 * Pour d'autres usages, il faut approfondir la fonction mais laissé en l'état car justement pas d'autre usage demandé.
 * @param {Polygone3d} base Une des deux bases du prisme droit
 * @param {Vecteur3d} vecteur Vecteur normal à la base dont la norme indique la hauteur du prisme droit.
 * @param {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets du prisme.
 * @param {string} [nomBase2] Nom de la base 2
 * @param {string[]} [positionLabels2] Position des labels de la base 2
 * @example prisme3d(p, v)
 * // Retourne un prisme droit de base p dont un vecteur normal à la base est v.
 * @example prisme3d(p, v, 'blue', true)
 * // Retourne un prisme droit de base p dont un vecteur normal à la base est v, de couleur V et dont les sommets sont nommés
 * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
 * @return {Prisme3d}
 */

export function prisme3d(
  base: Polygone3d,
  vecteur: Vecteur3d,
  color: string = 'black',
  affichageNom = false,
  nomBase2?: string,
  positionLabels2?: string[],
) {
  return new Prisme3d(
    base,
    vecteur,
    color,
    affichageNom,
    nomBase2,
    positionLabels2,
  )
}
/**
 * Classe de la pyramide
 * (optimisée au niveau des pointillés pour une base sur le plan xOy et un sommet plus haut ou plus bas que la base)
 * @param {Polygone3d} base Base de la pyramide
 * @param {Point3d} sommet Sommet de la pyramide
 * @param {string} [color = 'black'] Couleur des arêtes du prisme droit : du type 'blue' ou du type '#f15929'
 * @param {Point3d} [centre] Centre de la pyramide... Entraine l'affichage de ce centre
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la pyramide. Ne fonctionne que si centre est défini.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe et du centre de la base de la pyramide : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets de la pyramide.
 * @param {boolean} [estCone = false] Permet (ou pas) de considérer la pyramide comme un cône... dans le cas où la base est un disque.
 * @param {string} [colorCone = 'gray'] Couleur du cône : du type 'blue' ou du type '#f15929'
 * @property {Polygone3d} base Base de la pyramide
 * @property {Point3d} sommet Sommet de la pyramide
 * @property {string} color Couleur des arêtes de la pyramide : du type 'blue' ou du type '#f15929'
 * @property {Point3d} centre Centre de la pyramide... Entraine l'affichage de ce centre
 * @property {boolean} affichageAxe Permet (ou pas) l'affichage de l'axe de la pyramide. Ne fonctionne que si centre est défini.
 * @property {string} colorAxe Couleur de l'axe et du centre de la base de la pyramide : du type 'blue' ou du type '#f15929'
 * @property {boolean} affichageNom Permet (ou pas) l'affichage du nom des sommets de la pyramide.
 * @property {string} nom Nom de la pyramide (si affichageNom = true)
 * @property {string} colorCone Couleur du cône : du type 'blue' ou du type '#f15929'
 * @property {arete3d[]} aretesSommet Ce tableau contient les arêtes liant le sommet de la pyramide aux sommets de la base
 * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
 * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
 * @class
 */

export class Pyramide3d extends ObjetMathalea2D {
  constructor(
    base: Polygone3d,
    sommet: Point3d,
    color: string = 'black',
    centre?: Point3d,
    affichageAxe = false,
    colorAxe = 'black',
    affichageNom = false,
    estCone = false,
    colorCone = 'gray',
    affichageBase = true,
  ) {
    super()
    base.color = color
    this.base = base
    this.sommet = sommet
    this.color = colorToLatexOrHTML(color)
    this.centre = centre
    this.affichageAxe = affichageAxe
    this.colorAxe = colorAxe
    this.affichageNom = affichageNom
    this.estCone = estCone
    this.colorCone = colorCone
    this.c2d = []
    this.nom = ''
    let s

    // Stockage de toutes les arêtes issues du sommet
    this.aretesSommet = []

    for (let i = 0; i < this.base.listePoints.length; i++) {
      s = arete3d(this.base.listePoints[i], this.sommet, color, true)
      // s.c2d.isVisible = false
      this.aretesSommet.push(s)
    }

    // Stockage de toutes les arêtes de la base
    const aretesBase = []
    for (let i = 0; i < this.base.listePoints.length; i++) {
      s = arete3d(
        this.base.listePoints[i],
        this.base.listePoints[(i + 1) % this.base.listePoints.length],
        color,
        true,
      )
      aretesBase.push(s)
    }

    // Recherche des sommets arrières (donc toutes les arêtes issues de ce point sont cachées)
    let sommetCache = false
    let sommetCacheAvant
    const angleReference = [0, 0]
    const sommetGeneratriceCone = []

    for (let i = 0; i < this.base.listePoints.length; i++) {
      sommetCacheAvant = sommetCache
      sommetCache = false
      for (let j = 1; j < this.base.listePoints.length - 1; j++) {
        const poly = polygone([
          this.sommet.c2d,
          this.base.listePoints[(i + j) % this.base.listePoints.length].c2d,
          this.base.listePoints[(i + j + 1) % this.base.listePoints.length].c2d,
        ])
        poly.isVisible = false
        sommetCache =
          sommetCache || this.base.listePoints[i].c2d.estDansPolygone(poly)
      }
      if (this.estCone && sommetCacheAvant !== sommetCache && i !== 0) {
        if (sommetCache)
          sommetGeneratriceCone.push(
            this.aretesSommet[
              (this.aretesSommet.length + i - 1) % this.aretesSommet.length
            ],
          )
        else sommetGeneratriceCone.push(this.aretesSommet[i])
        if (sommetCache) angleReference[1] = i
        else angleReference[0] = i
      }
      if (sommetCache) {
        if (sommet.z > this.base.listePoints[0].z) {
          // Si le sommet est au-dessus de la base
          this.aretesSommet[i].isVisible = false
          this.aretesSommet[i].c2d.pointilles = 2
          aretesBase[i].c2d.pointilles = 2
          aretesBase[
            (this.base.listePoints.length + i - 1) %
              this.base.listePoints.length
          ].c2d.pointilles = 2
        }
      }
    }

    if (this.estCone && angleReference[1] <= angleReference[0]) {
      angleReference[1] += this.base.listePoints.length
    }

    if (this.estCone && sommetGeneratriceCone.length === 1) {
      sommetGeneratriceCone.push(
        this.aretesSommet[this.aretesSommet.length - 1],
      )
      angleReference[1] = this.aretesSommet.length - 1
    }
    if (this.estCone) {
      const premierPlan = [this.sommet.c2d]
      for (let i = angleReference[0]; i < angleReference[1]; i++) {
        premierPlan.push(
          this.base.listePoints[i % this.base.listePoints.length].c2d,
        )
        // ok
      }
      const faceAv = polygone(premierPlan, this.colorCone)
      faceAv.couleurDeRemplissage = colorToLatexOrHTML(this.colorCone)
      this.c2d.push(faceAv)
    }

    if (!this.estCone) {
      let longueurSegment
      if (this.sommet.z > this.base.listePoints[0].z) {
        // Si le sommet est au-dessus de la base
        // Recherche de l'arête cachée possible issue de deux sommets non cachés.
        for (let i = 0; i < this.base.listePoints.length; i++) {
          sommetCache = false
          longueurSegment = longueur(
            this.base.listePoints[i].c2d,
            this.base.listePoints[(i + 1) % this.base.listePoints.length].c2d,
          )
          s = segment(
            pointSurSegment(
              this.base.listePoints[i].c2d,
              this.base.listePoints[(i + 1) % this.base.listePoints.length].c2d,
              longueurSegment / 20,
            ),
            pointSurSegment(
              this.base.listePoints[i].c2d,
              this.base.listePoints[(i + 1) % this.base.listePoints.length].c2d,
              (19 * longueurSegment) / 20,
            ),
          )
          s.isVisible = false
          for (let j = 0; j < this.aretesSommet.length; j++) {
            sommetCache = sommetCache || !!s.estSecant(this.aretesSommet[j].c2d)
          }
          if (sommetCache) aretesBase[i].c2d.pointilles = 2
        }
      } else {
        // Si le sommet est en-dessous de la base
        for (let i = 0; i < this.base.listePoints.length; i++) {
          longueurSegment = longueur(
            this.base.listePoints[i].c2d,
            this.sommet.c2d,
          )
          s = segment(
            pointSurSegment(
              this.base.listePoints[i].c2d,
              this.sommet.c2d,
              longueurSegment / 20,
            ),
            this.sommet.c2d,
          )
          s.isVisible = false
          let j = 0
          while (j < aretesBase.length && !s.estSecant(aretesBase[j].c2d)) {
            j++
          }
          if (j < aretesBase.length) this.aretesSommet[i].c2d.pointilles = 2
        }
      }
      for (let i = 0; i < this.base.listePoints.length; i++) {
        this.c2d.push(this.aretesSommet[i].c2d)
      }
    } else {
      for (let i = 0; i < sommetGeneratriceCone.length; i++) {
        this.c2d.push(sommetGeneratriceCone[i].c2d)
      }
    }

    if (affichageBase) {
      for (let i = 0; i < this.base.listePoints.length; i++) {
        this.c2d.push(aretesBase[i].c2d)
      }
    }

    if (this.centre !== undefined && this.centre.constructor === Point3d) {
      this.c2d.push(tracePoint(this.centre.c2d, this.colorAxe))
      if (this.centre.label === '')
        this.centre.label = choisitLettresDifferentes(1, 'OQWX')[0]
      this.c2d.push(...labelPoint(this.centre.c2d))

      if (this.affichageAxe) {
        // Axe affiché que si centre précisé
        if (this.sommet.z > 0) {
          let intersectionTrouvee = false
          let ee = 0
          // Recherche du point d'intersection visuelle entre l'axe et une arête visible de la base
          while (!intersectionTrouvee && ee < aretesBase.length) {
            s = aretesBase[ee].c2d
            if (s.pointilles !== 2) {
              // L'arête coupée doit être visible
              const d1 = droite(this.centre.c2d, this.sommet.c2d)
              d1.isVisible = false
              intersectionTrouvee = !!s.estSecant(d1)
            }
            ee++
          }
          if (intersectionTrouvee) {
            ee--
            const d1 = droite(
              this.base.listePoints[ee].c2d,
              this.base.listePoints[(ee + 1) % this.base.listePoints.length]
                .c2d,
            )
            d1.isVisible = false
            const d2 = droite(this.centre.c2d, this.sommet.c2d)
            d2.isVisible = false
            const ptBase = pointIntersectionDD(d1, d2)
            if (!ptBase) {
              window.notify('Axe de la pyramide non défini correctement', {
                d1,
                d2,
              })
              return
            }
            s = segment(ptBase, this.sommet.c2d, this.colorAxe)
            s.pointilles = 2
            this.c2d.push(s)
            s = segment(
              ptBase,
              translation(ptBase, vecteur(this.centre.c2d, ptBase)),
              this.colorAxe,
            )
            this.c2d.push(s)
            s = segment(
              this.sommet.c2d,
              translation(this.sommet.c2d, vecteur(ptBase, this.centre.c2d)),
              this.colorAxe,
            )
            this.c2d.push(s)
          }
        } else {
          s = segment(this.centre.c2d, this.sommet.c2d, this.colorAxe)
          s.pointilles = 2
          this.c2d.push(s)
          const v = vecteur(this.centre.c2d, this.sommet.c2d)
          const L = longueur(this.base.listePoints[0].c2d, this.centre.c2d)
          const h = 2 * norme(v)
          s = segment(
            this.sommet.c2d,
            translation(this.sommet.c2d, vecteur((L * v.x) / h, (L * v.y) / h)),
            this.colorAxe,
          )
          this.c2d.push(s)
          s = segment(
            this.centre.c2d,
            translation(
              this.centre.c2d,
              vecteur((-L * v.x) / h, (-L * v.y) / h),
            ),
            this.colorAxe,
          )
          this.c2d.push(s)
        }
      }
    }

    if (this.affichageNom) {
      const p = polygone(this.base.listePoints2d)
      p.isVisible = false
      if (this.centre.label === '' || this.centre.label === this.sommet.label)
        this.sommet.label = choisitLettresDifferentes(1, 'OQWX')[0]
      const nomBase = choisitLettresDifferentes(
        this.base.listePoints.length,
        'OQWX' + this.sommet.label + this.centre.label,
      )
      renommePolygone(p, nomBase)
      for (let ee = 0; ee < this.base.listePoints2d.length; ee++) {
        this.base.listePoints2d[ee].positionLabel =
          this.sommet.z > 0 ? 'below' : 'above'
      }
      this.c2d.push(
        labelPoint(
          ...p.listePoints.map((point) => pointDepuisPointAbstrait(point)),
        ),
      )
      this.c2d.push(labelPoint(this.sommet))
      this.nom = nomBase.join('') + this.sommet.label
    }
  }
}
/**
 * Crée une pyramide
 * @param {Polygone3d} base Base de la pyramide
 * @param {Point3d} sommet Sommet de la pyramide
 * @param {string} [color = 'black'] Couleur des arêtes de la pyramide : du type 'blue' ou du type '#f15929'
 * @param {Point3d} [centre] Centre de la pyramide... Entraine l'affichage de ce centre
 * @param {boolean} [affichageAxe = false] Permet (ou pas) l'affichage de l'axe de la pyramide. Ne fonctionne que si centre est défini.
 * @param {string} [colorAxe = 'black'] Couleur de l'axe et du centre de la base de la pyramide : du type 'blue' ou du type '#f15929'
 * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets de la pyramide.
 * @param {boolean} [estCone = false] Permet (ou pas) de considérer la pyramide comme un cône
 * @param {string} [colorCone = 'gray'] Couleur du cône : du type 'blue' ou du type '#f15929'
 * @author Eric Elter (d'après version précédente de Jean-Claude Lhote)
 * @example pyramide3d(p,A) // Créé une pyramide de base p et de sommet A
 * @example pyramide3d(p,A,'red') // Créé une pyramide de base p et de sommet A et dont les arêtes sont rouges
 * @example pyramide3d(p,A,'red',B) // Créé une pyramide de base p et de sommet A et dont les arêtes sont rouges, le centre affiché est B
 * @example pyramide3d(p,A,'red',B,true,'green') // Créé une pyramide de base p et de sommet A et dont les arêtes sont rouges, le centre affiché est B, l'axe affiché est vert
 * @example pyramide3d(p,A,'red',B,true,'green',true) // Créé une pyramide de base p et de sommet A et dont les arêtes sont rouges, le centre affiché est B, l'axe affiché est vert, les sommets sont nommés
 * @example pyramide3d(c,A,'red',B,true,'green',false,true) // Créé un CONE de cercle c et de sommet A et dont les "arêtes" sont rouges, le centre affiché est B, l'axe affiché est vert
 * @example pyramide3d(c,A,'red',B,true,'green',false,true,'blue') // Créé un CONE de cercle c et de sommet A et dont les "arêtes" sont rouges, le centre affiché est B, l'axe affiché est vert et le cône est peint en vert
 * @return {Pyramide3d}
 */

export function pyramide3d(
  base: Polygone3d,
  sommet: Point3d,
  color = 'black',
  centre?: Point3d,
  affichageAxe = false,
  colorAxe = 'black',
  affichageNom = false,
  estCone = false,
  colorCone = 'gray',
  affichageBase = true,
) {
  return new Pyramide3d(
    base,
    sommet,
    color,
    centre,
    affichageAxe,
    colorAxe,
    affichageNom,
    estCone,
    colorCone,
    affichageBase,
  )
}
/**
 * La pyramide tronquée
 *
 * @author Jean-Claude Lhote
 * Crée une pyramide à partir d'une base Polygone3d d'un sommet et d'un coefficient compris entre 0 et 1
 * un coefficient de 0.5 coupera la pyramide à mi-hauteur (valeur par défaut).
 */

export class PyramideTronquee3d extends ObjetMathalea2D {
  constructor(base: Polygone3d, sommet: Point3d, coeff = 0.5, color = 'black') {
    super()
    this.color = colorToLatexOrHTML(color)
    base.color = color
    this.base = base
    this.coeff = coeff
    this.aretes = []
    this.sommet = sommet
    this.c2d = []
    const sommetsBase2 = []
    for (let i = 0, pointSection; i < this.base.listePoints.length; i++) {
      pointSection = homothetie3d(sommet, base.listePoints[i], coeff)
      pointSection.isVisible = true
      sommetsBase2.push(pointSection)
    }
    this.base2 = polygone3d(...sommetsBase2)
    this.c2d.push(...this.base.c2d)
    for (let i = 0; i < base.listePoints.length; i++) {
      this.aretes.push(
        arete3d(
          base.listePoints[i],
          this.base2.listePoints[i],
          color,
          base.listePoints[i].isVisible,
        ),
      )
      this.c2d.push(this.aretes[i].c2d)
    }
    this.c2d.push(...this.base2.c2d)
  }
}

export function pyramideTronquee3d(
  base: Polygone3d,
  sommet: Point3d,
  coeff = 0.5,
  color = 'black',
) {
  return new PyramideTronquee3d(base, sommet, coeff, color)
}
/**
 * Classe du cube : construit le cube d'arète c dont le sommet en bas à gauche a les coordonnées x,y,z
 * (la face avant est dans le plan xz, la face de droite est toujours visible, la face de haut ou du bas est visible selon context.anglePerspective)
 * @param {number} x Abscisse du sommet du cube en bas à gauche
 * @param {number} y Ordonnée du sommet du cube en bas à gauche
 * @param {number} x Altitude du sommet du cube en bas à gauche
 * @param {number} c Longueur de l'arête du cube
 * @param {string} [color = 'black'] Couleur des arêtes du cube : du type 'blue' ou du type '#f15929'
 * @param {string} [colorAV = 'lightgray'] Couleur de la face avant du cube : du type 'blue' ou du type '#f15929'
 * @param {string} [colorHautouBas = 'white'] Couleur de la face visible du dessus (ou du dessous) du cube : du type 'blue' ou du type '#f15929'
 * @param {string} [colorDr = 'darkgray'] Couleur de la face de droite (toujours visible) du cube : du type 'blue' ou du type '#f15929'
 * @param {boolean} [aretesCachee = true] Si true, les arêtes cachées sont visibles.
 * @param {boolean} [affichageNom = false] Si true, le nom des sommets est affiché
 * @param {string[]} [nom = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']] Nom du cube
 * @property {boolean} affichageNom Si true, le nom des sommets est affiché
 * @property {Point3d[]} sommets Tableau contenant les sommets du cube
 * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
 * @author Jean-Claude Lhote (Amendée par Eric Elter)
 * @class
 */

export class Cube3d extends ObjetMathalea2D {
  constructor(
    x: number,
    y: number,
    z: number,
    c: number,
    color = 'black',
    colorAV = 'lightgray',
    colorHautouBas = 'white',
    colorDr = 'darkgray',
    aretesCachee = true,
    affichageNom = false,
    nom = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  ) {
    super()
    this.affichageNom = affichageNom
    const A = point3d(x, y, z)
    A.c2d.nom = nom[0]
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)
    const B = translation3d(A, vx)
    B.c2d.nom = nom[1]
    const C = translation3d(B, vz)
    C.c2d.nom = nom[2]
    const D = translation3d(A, vz)
    D.c2d.nom = nom[3]
    let pointsFace = [A.c2d, B.c2d, C.c2d, D.c2d]
    const faceAV = this.affichageNom
      ? polygoneAvecNom(...pointsFace)
      : polygone(pointsFace, color)
    if (this.affichageNom) faceAV[0].color = colorToLatexOrHTML(color)
    const E = translation3d(A, vy)
    E.c2d.nom = nom[4]
    const F = translation3d(E, vx)
    F.c2d.nom = nom[5]
    const G = translation3d(F, vz)
    G.c2d.nom = nom[6]
    const H = translation3d(D, vy)
    H.c2d.nom = nom[7]
    pointsFace = [E.c2d, F.c2d, G.c2d, H.c2d]
    const faceArr = this.affichageNom
      ? polygoneAvecNom(...pointsFace)
      : vide2d()

    const faceDr = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
    let faceVisibleHautOuBas, areteCachee3, areteCachee2, areteCachee1
    if (context.anglePerspective > 0) {
      faceVisibleHautOuBas = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color) // Cette face est en fonction de context.anglePerspective
      areteCachee1 = segment(E.c2d, H.c2d, color)
      areteCachee2 = segment(E.c2d, F.c2d, color)
      areteCachee3 = segment(E.c2d, A.c2d, color)
    } else {
      faceVisibleHautOuBas = polygone([A.c2d, B.c2d, F.c2d, E.c2d], color)
      areteCachee1 = segment(E.c2d, H.c2d, color)
      areteCachee2 = segment(D.c2d, H.c2d, color)
      areteCachee3 = segment(G.c2d, H.c2d, color)
    }
    areteCachee1.pointilles = 2
    areteCachee2.pointilles = 2
    areteCachee3.pointilles = 2

    this.sommets = [A, B, C, D, E, F, G, H]
    // Les 8 sommets sont indispensables pour pouvoir les utiliser ensuite.
    if (aretesCachee) {
      if (Array.isArray(faceAV)) {
        faceAV[0].couleurDeRemplissage = colorToLatexOrHTML(colorAV)
      } else {
        faceAV.couleurDeRemplissage = colorToLatexOrHTML(colorAV)
      }
      faceVisibleHautOuBas.couleurDeRemplissage =
        colorToLatexOrHTML(colorHautouBas)
      faceDr.couleurDeRemplissage = colorToLatexOrHTML(colorDr)
      this.c2d = [
        faceAV.length === 2 ? faceAV[0] : faceAV,
        faceAV.length === 2 ? faceAV[1] : vide2d(),
        faceDr,
        faceVisibleHautOuBas,
      ]
    } else {
      this.c2d = [
        faceAV.length === 2 ? faceAV[0] : faceAV,
        faceAV.length === 2 ? faceAV[1] : vide2d(),
        faceDr,
        faceVisibleHautOuBas,
        faceArr.length === 2 ? faceArr[1] : vide2d(),
        areteCachee1,
        areteCachee2,
        areteCachee3,
      ]
    }
  }
}
/**
 * Crée un cube d'arète c dont le sommet en bas à gauche a les coordonnées x,y,z
 * (la face avant est dans le plan xz, la face de droite est toujours visible, la face de haut ou du bas est visible selon context.anglePerspective)
 * @param {number} x Abscisse du sommet du cube en bas à gauche
 * @param {number} y Ordonnée du sommet du cube en bas à gauche
 * @param {number} x Altitude du sommet du cube en bas à gauche
 * @param {number} c Longueur de l'arête du cube
 * @param {string} [color = 'black'] Couleur des arêtes du cube : du type 'blue' ou du type '#f15929'
 * @param {string} [colorAV = 'lightgray'] Couleur de la face avant du cube : du type 'blue' ou du type '#f15929'
 * @param {string} [colorHautouBas = 'white'] Couleur de la face visible du dessus (ou du dessous) du cube : du type 'blue' ou du type '#f15929'
 * @param {string} [colorDr = 'darkgray'] Couleur de la face de droite (toujours visible) du cube : du type 'blue' ou du type '#f15929'
 * @param {boolean} [aretesCachee = true] Si true, les arêtes cachées sont visibles.
 * @param {boolean} [affichageNom = false] Si true, le nom des sommets est affiché
 * @param {string[]} [nom = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']] Nom du cube
 * @example cube(0,0,0,10)
 * // Construit un cube noir d'arête 10 dont le sommet en bas à gauche est l'origine du repère et dont les faces visibles sont colorées aux couleurs par défaut.
 * // Les arêtes cachées sont visibles et le cube ne porte pas de nom.
 * @example cube(0,0,0,10,'red','','','',false)
 * // Construit un cube rouge d'arête 10 dont le sommet en bas à gauche est l'origine du repère et dont aucune face n'est coloriée.
 * // Les arêtes cachées sont invisibles et le cube ne porte pas de nom.
 * @example cube(0,0,0,10,'#f15929','','','',trie,true)
 * // Construit un cube orange d'arête 10 dont le sommet en bas à gauche est l'origine du repère et dont aucune face n'est coloriée.
 * // Les arêtes cachées sont visibles et le cube s'appelle ABCDEFGH.
 * @author Jean-Claude Lhote (Amendée par Eric Elter)
 * @return {Cube3d}
 */

export function cube3d(
  x: number,
  y: number,
  z: number,
  c: number,
  color = 'black',
  colorAV = 'lightgray',
  colorHautouBas = 'white',
  colorDr = 'darkgray',
  aretesCachee = true,
  affichageNom = false,
  nom = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
) {
  return new Cube3d(
    x,
    y,
    z,
    c,
    color,
    colorAV,
    colorHautouBas,
    colorDr,
    aretesCachee,
    affichageNom,
    nom,
  )
}
/**
 * @author Jean-Claude Lhote
 * Créer une barre de l cubes de c de côté à partir du point (x,y,z)
 * La barre est positionnée suivant l'axe x
 */

export class Barre3d extends ObjetMathalea2D {
  constructor(
    x: number,
    y: number,
    z: number,
    c: number,
    l: number,
    color = 'black',
  ) {
    super()
    let faceAv, faceTop
    this.c2d = []
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)
    let A = point3d(x, y, z)
    let B = A
    let C = A
    let D = A
    let E = A
    let F = A
    let G = A
    let H = A
    for (let i = 0; i < l; i++) {
      B = translation3d(A, vx)
      C = translation3d(B, vz)
      D = translation3d(A, vz)
      E = translation3d(A, vy)
      F = translation3d(E, vx)
      G = translation3d(F, vz)
      H = translation3d(D, vy)
      faceAv = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
      faceTop = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
      faceAv.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
      faceTop.couleurDeRemplissage = colorToLatexOrHTML('white')
      this.c2d.push(faceAv, faceTop)
      A = translation3d(A, vx)
    }
    const faceD = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
    faceD.couleurDeRemplissage = colorToLatexOrHTML('darkgray')
    this.c2d.push(faceD)
  }
}

export function barre3d(
  x: number,
  y: number,
  z: number,
  c: number,
  l: number,
  color = 'black',
) {
  return new Barre3d(x, y, z, c, l, color)
}
/**
 * @author Jean-Claude Lhote
 * Crée une plaque de cubes de côtés c de dimensions l suivant x et p suivant y
 */

export class Plaque3d extends ObjetMathalea2D {
  constructor(
    x: number,
    y: number,
    z: number,
    c: number,
    l: number,
    p: number,
    color = 'black',
  ) {
    super()
    let A, B, C, D, F, G, H, faceAv, faceTop, faceD
    this.c2d = []
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)

    for (let i = 0; i < l; i++) {
      for (let j = 0; j < p; j++) {
        A = point3d(x + i * c, y + j * c, z)
        B = translation3d(A, vx)
        C = translation3d(B, vz)
        D = translation3d(A, vz)
        F = translation3d(B, vy)
        G = translation3d(F, vz)
        H = translation3d(D, vy)
        if (j === 0) {
          faceAv = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
          faceAv.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
          this.c2d.push(faceAv)
        }
        if (i === l - 1) {
          faceD = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
          faceD.couleurDeRemplissage = colorToLatexOrHTML('darkgray')
          this.c2d.push(faceD)
        }
        faceTop = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
        faceTop.couleurDeRemplissage = colorToLatexOrHTML('white')
        this.c2d.push(faceTop)
      }
    }
  }
}

export function plaque3d(
  x: number,
  y: number,
  z: number,
  c: number,
  l: number,
  p: number,
  color = 'black',
) {
  return new Plaque3d(x, y, z, c, l, p, color)
}

export class PaveLPH3d extends ObjetMathalea2D {
  constructor(
    x: number,
    y: number,
    z: number,
    c: number,
    l: number,
    p: number,
    h: number,
    color = 'black',
  ) {
    super()
    let A, B, C, D, F, G, H, faceAv, faceTop, faceD
    this.c2d = []
    const vx = vecteur3d(c, 0, 0)
    const vy = vecteur3d(0, c, 0)
    const vz = vecteur3d(0, 0, c)

    for (let i = 0; i < l; i++) {
      for (let j = 0; j < p; j++) {
        for (let k = 0; k < h; k++) {
          A = point3d(x + i * c, y + j * c, z + k * c)
          B = translation3d(A, vx)
          C = translation3d(B, vz)
          D = translation3d(A, vz)
          F = translation3d(B, vy)
          G = translation3d(F, vz)
          H = translation3d(D, vy)
          if (j === 0) {
            faceAv = polygone([A.c2d, B.c2d, C.c2d, D.c2d], color)
            faceAv.couleurDeRemplissage = colorToLatexOrHTML('lightgray')
            this.c2d.push(faceAv)
          }
          if (i === l - 1) {
            faceD = polygone([B.c2d, F.c2d, G.c2d, C.c2d], color)
            faceD.couleurDeRemplissage = colorToLatexOrHTML('darkgray')
            this.c2d.push(faceD)
          }
          if (k === h - 1) {
            faceTop = polygone([D.c2d, C.c2d, G.c2d, H.c2d], color)
            faceTop.couleurDeRemplissage = colorToLatexOrHTML('white')
            this.c2d.push(faceTop)
          }
        }
      }
    }
  }
}
/**
 *
 * @param {number} x coordonnées du sommet en bas à gauche
 * @param {number} y
 * @param {number} z
 * @param {number} c longueur de l'unité
 * @param {number} p profondeur
 * @param {number} l longueur
 * @param {number} h hauteur
 * @param {*} color couleur
 * @returns {PaveLPH3d}
 */

export function paveLPH3d(
  x: number,
  y: number,
  z: number,
  c: number,
  l: number,
  p: number,
  h: number,
  color = 'black',
) {
  return new PaveLPH3d(x, y, z, c, l, p, h, color)
}
/**
 * Classe du pavé : construit le pavé ABCDEFGH dont les arêtes [AB],[AD] et [AE] délimitent 3 faces adjacentes.
 * La gestion des arêtes cachées est prise en compte et n'est pas forcément E.
 * En travaillant sur le signe de context.anglePerspective et sur celui de la hauteur (B.z), on peut avoir une vision de haut, de bas, de gauche, de droite comme dans l'exercice....
 * @param {Point3d} A Sommet du pavé droit
 * @param {Point3d} B Sommet du pavé droit
 * @param {Point3d} D Sommet du pavé droit
 * @param {Point3d} E Sommet du pavé droit
 * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets du pavé droit.
 * @param {string} [nom = 'ABCDEFGH'] Nom du pavé droit
 * @property {Point3d[]} sommets Tableau contenant les sommets du pavé droit
 * @property {string} color Couleur des arêtes du pavé droit : du type 'blue' ou du type '#f15929'
 * @property {Polygone3d} base Base ABFE du pavé droit
 * @property {Vecteur3d} hauteur Vecteur AD
 * @property {Arete3d} aretes Tableau contenant les arêtes du pavé droit
 * @property {Array} c2d Contient les commandes à tracer en 2d de cette fonction
 * @author Jean-Claude Lhote (optimisé par Eric Elter)
 * @class
 */

export class Pave3d extends ObjetMathalea2D {
  constructor(
    A: Point3d,
    B: Point3d,
    D: Point3d,
    E: Point3d,
    color = 'black',
    affichageNom = false,
    nom = 'ABCDEFGH',
  ) {
    super()
    this.affichageNom = affichageNom
    const v1 = vecteur3d(A, B)
    const v2 = vecteur3d(A, E)
    const C = translation3d(D, v1)
    const H = translation3d(D, v2)
    const G = translation3d(C, v2)
    const F = translation3d(B, v2)

    // Determination du point caché
    function distanceMoyenne4points(pt: Point3d) {
      const dist1 = longueur(pt.c2d, A.c2d, 5)
      const dist2 = longueur(pt.c2d, B.c2d, 5)
      const dist3 = longueur(pt.c2d, C.c2d, 5)
      const dist4 = longueur(pt.c2d, D.c2d, 5)
      return arrondi((dist1 + dist2 + dist3 + dist4) / 4, 5)
    }

    E.isVisible = !E.c2d.estDansQuadrilatere(A.c2d, B.c2d, C.c2d, D.c2d)
    F.isVisible = !F.c2d.estDansQuadrilatere(A.c2d, B.c2d, C.c2d, D.c2d)
    G.isVisible = !G.c2d.estDansQuadrilatere(A.c2d, B.c2d, C.c2d, D.c2d)
    H.isVisible = !H.c2d.estDansQuadrilatere(A.c2d, B.c2d, C.c2d, D.c2d)
    if (E.isVisible && F.isVisible && G.isVisible && H.isVisible) {
      const minimum = Math.min(
        distanceMoyenne4points(E),
        distanceMoyenne4points(F),
        distanceMoyenne4points(G),
        distanceMoyenne4points(H),
      )
      E.isVisible = minimum !== distanceMoyenne4points(E)
      F.isVisible = minimum !== distanceMoyenne4points(F)
      G.isVisible = minimum !== distanceMoyenne4points(G)
      H.isVisible = minimum !== distanceMoyenne4points(H)
    }
    // Fin de determination du point caché
    this.sommets = [A, B, C, D, E, F, G, H]
    this.color = colorToLatexOrHTML(color)
    this.base = polygone3d(A, B, F, E)
    this.hauteur = vecteur3d(A, D)
    this.c2d = []
    this.aretes = [
      arete3d(A, B, color),
      arete3d(A, D, color),
      arete3d(A, E, color),
      arete3d(C, B, color),
      arete3d(F, B, color),
      arete3d(C, D, color),
      arete3d(C, G, color),
      arete3d(F, G, color),
      arete3d(F, E, color),
      arete3d(H, G, color),
      arete3d(H, E, color),
      arete3d(H, D, color),
    ]
    for (const arete of this.aretes) {
      this.c2d.push(arete.c2d)
    }
    if (this.affichageNom) {
      let pointsFace = [A.c2d, B.c2d, C.c2d, D.c2d]
      A.c2d.nom = nom[0]
      B.c2d.nom = nom[1]
      C.c2d.nom = nom[2]
      D.c2d.nom = nom[3]
      E.c2d.nom = nom[4]
      F.c2d.nom = nom[5]
      G.c2d.nom = nom[6]
      H.c2d.nom = nom[7]

      const faceAV = polygoneAvecNom(...pointsFace, context.isHtml ? 0.5 : 1.5)
      pointsFace = [E.c2d, F.c2d, G.c2d, H.c2d]
      const faceArr = polygoneAvecNom(...pointsFace, context.isHtml ? 0.5 : 1.5)
      this.c2d.push(faceAV[1], faceArr[1])
    }
  }
}
/**
 * Construit le pavé ABCDEFGH dont les arêtes [AB],[AD] et [AE] délimitent 3 faces adjacentes.
 * La gestion des arêtes cachées est prise en compte et n'est pas forcément E.
 * En travaillant sur le signe de context.anglePerspective et sur celui de la hauteur (B.z), on peut avoir une vision de haut, de bas, de gauche, de droite comme dans l'exercice....
 * @param {Point3d} A Sommet du pavé droit
 * @param {Point3d} B Sommet du pavé droit
 * @param {Point3d} D Sommet du pavé droit
 * @param {Point3d} E Sommet du pavé droit
 * @param {boolean} [affichageNom = false] Permet (ou pas) l'affichage du nom des sommets du pavé droit.
 * @param {string} [nom = 'ABCDEFGH'] Nom du pavé droit
 * @example pave(A,B,D,E) // Créé un pavé noir sans nom
 * @example pave(A,B,D,E,'blue') // Créé un pavé bleu sans nom
 * @example pave(A,B,D,E,'red',true,'MNOPQRST') // Créé un pavé rouge dont les sommets sont nommés M, N, O, P, Q, R, S et T
 * @author Jean-Claude Lhote (optimisé par Eric Elter)
 * @return {Pave3d}
 */

export function pave3d(
  A: Point3d,
  B: Point3d,
  D: Point3d,
  E: Point3d,
  color = 'black',
  affichageNom = false,
  nom = 'ABCDEFGH',
) {
  return new Pave3d(A, B, D, E, color, affichageNom, nom)
}
