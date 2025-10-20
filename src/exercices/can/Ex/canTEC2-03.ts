import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
} from '../../../lib/outils/ecritures'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = "Résoudre |z-z'|=r"

export const dateDePublication = '4/5/2024'

export const uuid = '16c5e'
export const refs = {
  'fr-fr': ['canTEC2-03'],
  'fr-ch': ['3mNC-2'],
}

/**
 * @author Stéphane Guyon
 */
export default class NomExercice extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 4
  }

  nouvelleVersion() {
    const a = randint(-7, 7, 0)
    const b = randint(-7, 7, 0)
    const r = randint(1, 10)

    this.question = 'Soit $z\\in\\mathbb{C}$. <br>'
    this.question += `Déterminer l'ensemble des points $M$ du plan complexe, d'affixe $z$, qui vérifient $\\vert z${ecritureAlgebrique(-a)}${ecritureAlgebriqueSauf1(-b)}\\text{i}\\vert=${r}\\quad (1)$`
    this.correction = `Soit $A$ le point du plan complexe d'affixe $z_A=${a}${ecritureAlgebriqueSauf1(b)}\\text{i}$.`
    this.correction += `<br>On sait que $AM=\\vert z-z_A\\vert=\\vert z${ecritureAlgebrique(-a)}${ecritureAlgebriqueSauf1(-b)}\\text{i}\\vert$.<br>`
    this.correction += `<br>On montre donc que  $(1) \\iff AM=${r}$.`
    this.correction += `<br>Les points $M$ solutions correspondent donc à l'ensemble des points du plan complexe,<br> situés à une distance de ${r} unités du point $A$.<br>`
    this.correction += `C'est donc le cercle de centre $A$ et de rayon ${r}.`
    this.correction += `<br>$S=${miseEnEvidence(`\\mathcal{C}\\big(A, ${texNombre(r, 0)}\\big)`)}$.`
    this.reponse = `\\mathcal{C}\\big(A, ${texNombre(r, 0)}\\big)`
  }
}
