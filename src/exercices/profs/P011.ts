import { codageAngleDroit } from '../../lib/2d/angles'
import {
  afficheLongueurSegment,
  afficheMesureAngle,
  codageSegments,
} from '../../lib/2d/codages'
import { polygoneAvecNom } from '../../lib/2d/polygones'
import { Triangle } from '../../modules/Triangle'
import Exercice from '../Exercice'
import { mathalea2d } from '../../modules/2dGeneralites'
import Alea2iep from '../../modules/Alea2iep'
import { contraindreValeur } from '../../modules/outils'
import type { PointAbstrait } from '../../lib/2d/points-abstraits'

export const titre = "Construction animée d'un triangle"

export const refs = {
  'fr-fr': ['P011'],
  'fr-ch': [],
}
export const uuid = '697a7'

function aLeMinDArguments(params: any[], nombre: number) {
  if (params.length >= nombre) {
    return true
  } else {
    return false
  }
}
export default class ConstruisMonTriangle extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Type de triangle',
      6,
      "1 : Triangle par 3 longueurs\n 2 : Triangle par 1 longueur et 2 angles\n 3 : Triangle rectangle 2 côtés angle droit\n 4 : Triangle rectangle 1 coté et l'hypoténuse\n 5 : Triangle équilatéral\n 6 : Triangle 2 longueurs et l'angle entre ces côtés",
    ]
    this.besoinFormulaire2Texte = ['Nom du triangle', 'ABC par exemple']
    this.besoinFormulaire3Texte = [
      'Longueurs ou angles séparés par des espaces',
      '3 4 5',
    ]

    this.nbQuestions = 1 // Ici le nombre de questions
    this.nbQuestionsModifiable = false // Active le formulaire nombre de questions
    this.pasDeVersionLatex = true // mettre à true si on ne veut pas de l'exercice dans le générateur LaTeX
    this.sup = 1
    this.sup2 = 'ABC'
    this.sup3 = '3 4 5'
  }

  nouvelleVersion() {
    let triangle: PointAbstrait[] = []
    let defaut = [3, 4, 5]
    const type = contraindreValeur(1, 6, this.sup, 1)
    let params = this.sup3.toString()
    if (params.indexOf(' ') === -1) {
      params = [parseFloat(this.sup3)]
      if (isNaN(params[0])) params = defaut
    } else {
      params = this.sup3.split(' ')
      for (let i = 0; i < params.length; i++) {
        params[i] = parseFloat(params[i])
        if (isNaN(params[i])) {
          params = defaut
          break
        }
      }
    }
    const nom = this.sup2.slice(0, 3)
    const anim = new Alea2iep()
    const objetsEnonceml = []
    switch (
      type // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
    ) {
      case 1:
        defaut = [3, 4, 5]
        if (aLeMinDArguments(params, 3)) {
          const triang = new Triangle()
          triang.l1 = params[0]
          triang.l2 = params[1]
          triang.l3 = params[2]
          if (triang.isTrueTriangleLongueurs()) {
            triangle = anim.triangle3longueurs(
              nom,
              params[0],
              params[1],
              params[2],
              { description: true },
            )
          } else {
            triangle = anim.triangle3longueurs(
              nom,
              defaut[0],
              defaut[1],
              defaut[2],
              { description: true },
            )
          }
        } else {
          triangle = anim.triangle3longueurs(
            nom,
            defaut[0],
            defaut[1],
            defaut[2],
            { description: true },
          )
        }
        objetsEnonceml.push(
          afficheLongueurSegment(triangle[1], triangle[0]),
          afficheLongueurSegment(triangle[2], triangle[1]),
          afficheLongueurSegment(triangle[0], triangle[2]),
        )
        break

      case 2:
        defaut = [3, 40, 50]
        if (aLeMinDArguments(params, 3)) {
          triangle = anim.triangle1longueur2angles(
            nom,
            params[0],
            params[1],
            params[2],
            { description: true },
          )
        } else {
          triangle = anim.triangle1longueur2angles(
            nom,
            defaut[0],
            defaut[1],
            defaut[2],
            { description: true },
          )
        }
        objetsEnonceml.push(
          afficheLongueurSegment(triangle[1], triangle[0]),
          afficheMesureAngle(triangle[2], triangle[0], triangle[1]),
          afficheMesureAngle(triangle[0], triangle[1], triangle[2]),
        )
        break

      case 3:
        defaut = [3, 4]
        if (aLeMinDArguments(params, 2)) {
          triangle = anim.triangleRectangle2Cotes(nom, params[0], params[1], {
            description: true,
          })
        } else {
          triangle = anim.triangleRectangle2Cotes(nom, defaut[0], defaut[1], {
            description: true,
          })
        }
        objetsEnonceml.push(
          afficheLongueurSegment(triangle[1], triangle[0]),
          afficheLongueurSegment(triangle[2], triangle[1]),
          codageAngleDroit(triangle[0], triangle[1], triangle[2]),
        )
        break

      case 4:
        defaut = [3, 5]
        if (aLeMinDArguments(params, 2)) {
          const cote = Math.min(params[0], params[1])
          const hypothenuse = Math.max(params[0], params[1])
          triangle = anim.triangleRectangleCoteHypotenuse(
            nom,
            cote,
            hypothenuse,
            { description: true },
          )
        } else {
          triangle = anim.triangleRectangleCoteHypotenuse(
            nom,
            defaut[0],
            defaut[1],
            { description: true },
          )
        }
        objetsEnonceml.push(
          afficheLongueurSegment(triangle[1], triangle[0]),
          afficheLongueurSegment(triangle[0], triangle[2]),
          codageAngleDroit(triangle[0], triangle[1], triangle[2]),
        )
        break

      case 5:
        defaut = [4]
        if (aLeMinDArguments(params, 1)) {
          triangle = anim.triangleEquilateral(nom, params[0])
        } else {
          triangle = anim.triangleEquilateral(nom, defaut[0])
        }
        objetsEnonceml.push(
          afficheLongueurSegment(triangle[1], triangle[0]),
          codageSegments(
            '||',
            'red',
            triangle[0],
            triangle[1],
            triangle[2],
            triangle[0],
            triangle[1],
            triangle[2],
          ),
        )
        break

      case 6:
        defaut = [3, 4, 70]
        if (aLeMinDArguments(params, 3)) {
          triangle = anim.triangle2longueurs1angle(
            nom,
            params[0],
            params[1],
            params[2],
          )
        } else {
          triangle = anim.triangle2longueurs1angle(
            nom,
            defaut[0],
            defaut[1],
            defaut[2],
          )
        }
        objetsEnonceml.push(
          afficheLongueurSegment(triangle[0], triangle[1]),
          afficheLongueurSegment(triangle[0], triangle[2]),
          afficheMesureAngle(triangle[1], triangle[0], triangle[2]),
        )
        break
    }
    const poly = polygoneAvecNom(...triangle)
    objetsEnonceml.push(poly[0], poly[1])
    const paramsEnonce = {
      xmin: Math.min(triangle[0].x - 1, triangle[1].x - 1, triangle[2].x - 1),
      ymin: Math.min(triangle[0].y - 1, triangle[1].y - 1, triangle[2].y - 1),
      xmax: Math.max(triangle[0].x + 1, triangle[1].x + 1, triangle[2].x + 1),
      ymax: Math.max(triangle[0].y + 1, triangle[1].y + 1, triangle[2].y + 1),
      pixelsParCm: 20,
      scale: 1,
      mainlevee: true,
      amplitude: 0.5,
    }
    const texte =
      mathalea2d(paramsEnonce, objetsEnonceml) +
      '<br>' +
      anim.htmlBouton(this.numeroExercice ?? 0, 0)
    this.contenu = texte
    this.listeQuestions[0] = this.contenu
  }
} // Fin de l'exercice.
