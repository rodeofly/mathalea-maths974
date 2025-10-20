import { point } from '../../../lib/2d/points'
import { carre, Polyquad } from '../../../lib/2d/polygones'
import { grille } from '../../../lib/2d/reperes'
import { texteParPosition } from '../../../lib/2d/textes'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import {
  colorToLatexOrHTML,
  fixeBordures,
  mathalea2d,
  type NestedObjetMathalea2dArray,
} from '../../../modules/2dGeneralites'
import { contraindreValeur, randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Mesurer une aire par comptage'
export const dateDePublication = '25/04/2024'
export const dateDeModifImportante = '31/07/2025' // Rajout de différentes unités par Eric Elter
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true

/**
 * @author Jean-Claude Lhote
 */
export const uuid = 'a17c6'

export const refs = {
  'fr-fr': ['can6M14', 'auto6M2C-flash1'],
  'fr-ch': ['9GM1-14'],
}
export default class AireParComptageCan extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1
    this.typeExercice = 'simple'
    this.besoinFormulaireNumerique = [
      'Aire maximale',
      3,
      '1 : Inférieure à 10\n2 : Inférieure à 20\n3 : Inférieure à 30',
    ]
    this.besoinFormulaire2CaseACocher = ['Avec grille', true]
    this.besoinFormulaire3Numerique = ['Unités', 3, '1 : u.a\n2 : cm²\n3 : m²']
    this.sup = 1
    this.sup2 = true
    this.sup3 = 2
    this.spacing = 3
  }

  nouvelleVersion() {
    const unite = ['u.a', 'cm²', 'm²'][
      contraindreValeur(1, 3, this.sup3, 2) - 1
    ]
    const aire =
      this.sup === 1
        ? randint(5, 9)
        : this.sup === 2
          ? randint(10, 19)
          : randint(20, 29)
    const tetris = new Polyquad(aire, 0, 0)
    if (tetris.rectangle.xMax < tetris.rectangle.yMax)
      tetris.rotate(choice([true, false]))
    const xmin = tetris.rectangle.xMin
    const ymin = tetris.rectangle.yMin
    const xmax = tetris.rectangle.xMax + 3
    const ymax = tetris.rectangle.yMax
    const grid = grille(xmin, ymin, xmax, ymax)
    const uniteAire = carre(
      point(xmax - 2, ymax - 1),
      point(xmax - 1, ymax - 1),
    )
    uniteAire.couleurDeRemplissage = colorToLatexOrHTML('gray')
    const texteUniteAire = texteParPosition(
      '1 ' + unite,
      xmax - 1.5,
      ymax - 1.8,
    )
    const objets: NestedObjetMathalea2dArray = [
      tetris.poly,
      uniteAire,
      texteUniteAire,
    ]
    if (this.sup2) objets.push(grid)
    const fig1 = mathalea2d(
      Object.assign(
        { pixelsParCm: 20, scale: 0.5, style: 'display: inline-block' },
        fixeBordures(objets, {
          rxmin: -0.1,
          rymin: -0.1,
          rxmax: 0.1,
          rymax: 0.1,
        }),
      ),
      objets,
    )
    this.question = `${fig1}<br>Quelle est l'aire de la figure ci-dessus ?`
    this.optionsChampTexte = { texteApres: unite }
    this.reponse = aire
    this.correction = `L'aire de cette figure est : $${miseEnEvidence(String(aire))}$ ${unite}.`
  }
}
