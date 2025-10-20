import { choice } from '../../../lib/outils/arrayOutils'
import ExerciceSimple from '../../ExerciceSimple'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import {
  ecritureAlgebrique,
  reduireAxPlusB,
  reduirePolynomeDegre3,
  rienSi1,
} from '../../../lib/outils/ecritures'
import { randint } from '../../../modules/outils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
export const titre = 'Calculer $f(x+a)$ avec $f$ affine'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '24/07/2025' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export const uuid = 'f3e87'

export const refs = {
  'fr-fr': ['can2L20'],
  'fr-ch': [],
}
export default class CalculCompose extends ExerciceSimple {
  constructor() {
    super()
    this.versionQcmDisponible = true
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecVariable
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.optionsDeComparaison = { developpementEgal: true }
  }

  nouvelleVersion() {
    const a = randint(-3, 3, [0, 1])
    const b = randint(-10, 10, 0)
    const c = randint(-3, 3, 0)
    const nomF = choice(['f', 'g', 'h', 'u', 'v', 'w', 'p', 'm', 't', 'k'])
    this.question = `Soit $${nomF}$ la fonction définie par : $${nomF}(x)=${reduireAxPlusB(a, b)}$.<br>`
    this.question += this.versionQcm
      ? ` $${nomF}(x${ecritureAlgebrique(c)})$ est égal à : `
      : `Exprimer $${nomF}(x${ecritureAlgebrique(c)})$ sous forme développée. `

    this.reponse = this.versionQcm
      ? `$${reduireAxPlusB(a, a * c + b)}$`
      : `${reduireAxPlusB(a, a * c + b)}`
    this.distracteurs = [
      `$${reduireAxPlusB(a, c + b)}$`,
      `$${reduireAxPlusB(a + 1, c + b)}$`,
      `$${reduirePolynomeDegre3(0, a, b + a * c, b * c)}$`,
    ]
    this.correction = `On remplace $x$ par $x${ecritureAlgebrique(c)}$ dans l'expression de $${nomF}$ :<br>
         $\\begin{aligned}
        ${nomF}(x${ecritureAlgebrique(c)})&=${rienSi1(a)}(x${ecritureAlgebrique(c)})${ecritureAlgebrique(b)} \\\\
        &=${rienSi1(a)}x${ecritureAlgebrique(a * c)}${ecritureAlgebrique(b)}\\\\
        &=${miseEnEvidence(reduireAxPlusB(a, a * c + b))}
        \\end{aligned}$`
    if (this.interactif && !this.versionQcm) {
      this.question += `<br> $${nomF}(x${ecritureAlgebrique(c)})=$`
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
