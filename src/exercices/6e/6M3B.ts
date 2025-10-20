import {
  canvasEnonceCorrection,
  empilementCubes,
} from '../../lib/3d/3d_dynamique/empilementsCube'
import {
  createCubesProjections,
  projectionCubesIso2d,
} from '../../lib/3d/3dProjectionMathalea2d/CubeIso'
import { choice } from '../../lib/outils/arrayOutils'
import { listeDesDiviseurs } from '../../lib/outils/primalite'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const dateDePublication = '08/08/2025'
export const titre = 'Comparer les volumes de deux empilements de cubes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const amcReady = true

/**
 * Comparer des volumes d'empilements de cubes
 * @author Jean-Claude Lhote
 */

export const uuid = '5f117'

export const refs = {
  'fr-fr': ['6M3B'],
  'fr-2016': ['6G43-1'],
  'fr-ch': [],
}

function trouvePave(volume: number): [number, number, number] {
  // Trouve un pavé dont le volume est proche de volume
  let divisors: number[] = []
  let volumeCible = 0
  let divisorsSurface: number[] = []
  let hauteur = 0
  let surface = 0
  do {
    // On choisit un volume aléatoire proche de volume
    volumeCible = randint(volume - 5, volume + 5, divisors)
    divisors = listeDesDiviseurs(volumeCible)
    divisors = divisors.filter((div) => div > 1 && div < volumeCible) // On enlève 1 et le volume lui-même
    if (divisors.length < 3) continue
    hauteur = choice(divisors)
    surface = volumeCible / hauteur
    divisorsSurface = listeDesDiviseurs(surface).filter(
      (div) => div > 1 && div < surface,
    ) // On enlève 1 et la surface elle-même
  } while (divisorsSurface.length < 2)
  const larg = choice(divisorsSurface)
  const long = surface / larg
  return [larg, long, hauteur]
}

export default class DenombrerCubes extends Exercice {
  constructor() {
    super()
    this.besoinFormulaire2Numerique = [
      "Taille de l'empilement",
      3,
      'De taille 3\nDe taille 4\nDe taille 5',
    ]
    this.besoinFormulaire3CaseACocher = ['3D dynamique', false]
    this.sup3 = false
    this.nbQuestions = 3 // Ici le nombre de questions
    this.sup2 = 1 // A décommenter : valeur par défaut d'un deuxième paramètre
    // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  }

  nouvelleVersion() {
    const longueur = 2 + parseInt(this.sup2) // longueur de l'empilement
    const largeur = longueur // largeur de l'empilement
    const hauteur = Math.min(longueur, 4) // hauteur de l'empilement

    for (
      let q = 0, texte, texteCorr, cpt = 0;
      q < this.nbQuestions && cpt < 50;

    ) {
      const L1 = empilementCubes(longueur, largeur, hauteur) as [
        number,
        number,
        number,
      ][] // crée un empilement aléatoire
      const volume1 = L1.length
      const [larg, long, haut] = trouvePave(volume1)
      const L2: [number, number, number][] = []
      texte = ''
      texteCorr = ''
      for (let i = larg - 1; i > -1; i--) {
        for (let j = long - 1; j > -1; j--) {
          for (let k = 0; k < haut; k++) {
            L2.push([i, j, k])
          }
        }
      }

      if (this.sup3 && context.isHtml) {
        // 3d dynamique avec Canvas3DElement
        texte +=
          'Un empilement de cubes et un pavé droit sont représentés ci-dessous.<br>' // Nous utilisons souvent cette variable pour construire le texte de la question.
        const { canvasEnonce, canvasCorrection } = canvasEnonceCorrection(
          L1,
          `scene3dEx${this.numeroExercice}Q${q}-1`,
        )
        const {
          canvasEnonce: canvasEnonce2,
          canvasCorrection: canvasCorrection2,
        } = canvasEnonceCorrection(L2, `scene3dEx${this.numeroExercice}Q${q}-2`)
        texte += canvasEnonce
        texte += canvasEnonce2
        texteCorr += canvasCorrection
        texteCorr += canvasCorrection2
      } else {
        // 3d Iso avec Mathalea2d
        texte +=
          'Ci-dessous, un empilement de cubes est représenté sous deux angles différents et un pavé droit est représenté à côté.<br>'
        const { figure, figureCorrection } = createCubesProjections(
          L1,
          largeur,
          longueur,
          hauteur,
        )
        const { objets: pave, params } = projectionCubesIso2d(
          L2,
          35,
          -20,
          false,
        )
        const { objets: objets2, params: params2 } = projectionCubesIso2d(
          L2,
          35,
          -20,
          true,
        )
        params.xmin -= 2
        params2.xmin -= 2
        texte += figure + mathalea2d(params, pave)
        texteCorr += figureCorrection + mathalea2d(params2, objets2)
      }

      texte +=
        '<br>Quel est celui qui a le plus petit volume (en nombre de cubes identiques) ?'
      if (context.isHtml && this.sup3) {
        texte +=
          "<br>Les petits cubes sont tous identiques. Le zoom peut changer d'un solide à l'autre."
      }
      texteCorr += `<br>Le premier solide est un empilement de ${volume1} cubes.<br>`
      texteCorr += `Le deuxième solide est un pavé droit de dimensions $${larg} \\times ${long} \\times ${haut}$, son volume est de $${larg * long * haut}$.<br>`

      if (
        this.questionJamaisPosee(q, JSON.stringify(L1) + JSON.stringify(L2))
      ) {
        this.listeQuestions[q] = texte
        this.listeCorrections[q] = texteCorr
        q++
      }

      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
