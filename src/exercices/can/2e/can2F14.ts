import { choice } from '../../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
  reduireAxPlusB,
  reduirePolynomeDegre3,
} from '../../../lib/outils/ecritures'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
export const titre = 'Calculer une ordonnée à partir de l’abscisse d’un point'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '27/09/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication
*/

export const uuid = '1d7cc'

export const refs = {
  'fr-fr': ['can2F14'],
  'fr-ch': ['NR'],
}
export default class CalculOrdonneePoint extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    const nomF = [['f'], ['g'], ['h'], ['u'], ['v'], ['w']]
    const pointM = [['M'], ['N'], ['P'], ['R'], ['S'], ['T']]
    let a, b, c, abs, ord, nom, point
    switch (
      choice([1, 2]) //, , 'b', 'c', 'd'
    ) {
      case 1:
        a = randint(-10, 10, [0, 1])
        b = randint(-9, 9, 0)
        abs = randint(-10, 10, 0)
        ord = a * abs + b
        nom = choice(nomF)
        point = choice(pointM)
        this.question = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par : $${nom}(x)=${reduireAxPlusB(a, b)}$<br>
        On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
        $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$.<br>
        Quelle est son ordonnée ?`

        this.correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
          $${nom}(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(b)}=${ord}$.<br>
          L'ordonnée du point $${point}$ est $${miseEnEvidence(ord)}$.`
        this.reponse = ord
        break
      case 2:
        a = randint(-2, 2, 0)
        b = randint(-3, 3, 0)
        c = randint(-10, 10)
        abs = randint(-5, 5)
        ord = a * abs ** 2 + b * abs + c
        nom = choice(nomF)
        point = choice(pointM)
        this.question = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par : $${nom}(x)=${reduirePolynomeDegre3(0, a, b, c)}$<br>
        On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
        $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$.<br>
        Quelle est son ordonnée ?`

        this.correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br> `
        if (a !== 1) {
          this.correction += `$${nom}(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}
  =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}=${ord}$.<br>
  L'ordonnée du point $${point}$ est $${miseEnEvidence(ord)}$.`
        } else {
          this.correction += `$${nom}(${abs})= ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}
  =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}=${ord}$.<br>
  L'ordonnée du point $${point}$ est $${miseEnEvidence(ord)}$.`
        }
        this.reponse = ord

        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
