import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { nombreElementsDifferents } from '../../ExerciceQcm'
import ExerciceQcmA from '../../ExerciceQcmA'
import { prisme3d } from '../../../lib/3d/3dProjectionMathalea2d/solides'
import {
  point3d,
  polygone3d,
  vecteur3d,
} from '../../../lib/3d/3dProjectionMathalea2d/elements'
import { randint } from '../../../modules/outils'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { codageAngleDroit } from '../../../lib/2d/angles'
import { afficheCoteSegment } from '../../../lib/2d/codages'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { texNombre } from '../../../lib/outils/texNombre'
export const uuid = '279da'
export const refs = {
  'fr-fr': ['5M2QCM-1'],
  'fr-ch': ['10GM2-3'],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Volume de prisme droit (Juin 2022 Amérique du nord)'
export const dateDePublication = '08/11/2024'

/**
 *
 * @author Jean-Claude LHOTE
 * jean-claude.lhote@ac-nancy-metz.fr
 */
export default class AmeriqueNordJuin22Ex1Q5 extends ExerciceQcmA {
  private appliquerLesValeurs(l: number, h: number, p: number): void {
    const basePoints = [
      point3d(0, 0, 0, true, 'A', 'below left'),
      point3d(5, 0, 0, true, 'B', 'below left'),
      point3d(0, 0, 3, true, 'F', 'below left'),
    ]
    const base = polygone3d(...basePoints)
    for (const arete of base.aretes) {
      arete.isVisible = true
    }
    const a1 = codageAngleDroit(
      basePoints[1].c2d,
      basePoints[0].c2d,
      basePoints[2].c2d,
    )
    const vecteurExtrusion = vecteur3d(0, 8, 0)
    const lePrisme = prisme3d(base, vecteurExtrusion, 'black', false, 'DCG', [
      'above right',
      'below right',
      'above right',
      'above left',
    ])
    const base2 = lePrisme.base2.listePoints
    const a2 = codageAngleDroit(base2[1].c2d, base2[0].c2d, base2[2].c2d)
    const largeur = afficheCoteSegment(
      segment(basePoints[1].c2d, basePoints[0].c2d),
      `${l}cm`,
    )
    const hauteur = afficheCoteSegment(
      segment(basePoints[0].c2d, basePoints[2].c2d),
      `${h}cm`,
    )
    const profondeur = afficheCoteSegment(
      segment(base2[1].c2d, basePoints[1].c2d),
      `${p}cm`,
    )
    const volume = texNombre((l * h * p) / 2, 1)
    this.reponses = [
      `$${volume}\\text{ cm}^3$`,
      `$${l * p}\\text{ cm}^3$`,
      `$${l * p * h}\\text{ cm}^3$`,
      `$${(l + h) * p}\\text{ cm}^3$`,
    ]
    const objets = [lePrisme.c2d, a1, a2, largeur, hauteur, profondeur]
    this.enonce = mathalea2d(
      Object.assign({ remToPixels: 30, scale: 1 }, fixeBordures(objets)),
      objets,
    )
    this.enonce += '<br>Le volume de ce prisme droit est :'
    this.correction = `La base de ce prisme est un triangle rectangle de $${l}$ cm et $${h}$ cm de côté.<br>
    Son aire est : $\\dfrac{${l}\\times ${h}}{2}=\\dfrac{${l * h}}{2}=${texNombre((l * h) / 2, 1)}\\text{ cm}^2$.<br>
    Le volume du prisme est le produit de l'aire de la base par la hauteur, soit :<br>
    $${texNombre((l * h) / 2, 1)}\\times ${p}=${miseEnEvidence(`${volume}\\text{ cm}^3`)}$<br>
    Nous aurions pu considérer ce prisme comme étant la moitié d'un pavé droit de dimensions : $${l}\\text{cm}\\times ${h}\\text{cm}\\times ${p}\\text{cm}$.<br>
    On obtient le même résultat avec : $\\dfrac{${l}\\times ${h}\\times ${p}}{2}=\\dfrac{${l * p * h}}{2}$`
  }

  versionOriginale: () => void = () => {
    this.appliquerLesValeurs(5, 3, 8)
  }

  versionAleatoire: () => void = () => {
    const n = 4

    do {
      const l = randint(4, 7)
      const h = randint(2, l, [l])
      const p = randint(l + 1, 10)
      this.appliquerLesValeurs(l, h, p)
    } while (nombreElementsDifferents(this.reponses) < n)
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
