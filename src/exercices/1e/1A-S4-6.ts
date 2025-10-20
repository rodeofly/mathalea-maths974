import { shuffle } from '../../lib/outils/arrayOutils'
import { texteGras } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import FractionEtendue from '../../modules/FractionEtendue'
import { randint } from '../../modules/outils'
// import ExerciceQcmA from '../../ExerciceQcmA'
import ExerciceQcmA from '../ExerciceQcmA'

export const uuid = 'd2879'
export const refs = {
  'fr-fr': ['1A-S4-6'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre =
  'Comparer médianes et moyennes de deux séries à faible effectifs.'
export const dateDePublication = '01/08/2025'
// Ceci est un exemple de QCM avec version originale et version aléatoire
/**
 *
 * @author Stéphane Guyon
 *
 */

export default class MedianeMoyenneQCM extends ExerciceQcmA {
  // Ceci est la fonction qui s'occupe d'écrire l'énoncé, la correction et les réponses
  // Elle factorise le code qui serait dupliqué dans versionAleatoire et versionOriginale

  private appliquerLesValeurs(): void {
    const alea = randint(1, 4) // Pour choisir entre deux versions de l'énoncé
    const a1 = randint(1, 5)
    const a2 = randint(a1 + 1, a1 + 8)
    const b1 = randint(1, 5, a1) + randint(-1, 1) / 2
    const a3 = randint(a2 + 1, a2 + 8)
    const moyenneA = (a1 + a2 + a3) / 3
    let moyenneB = (b1 + a2 + a3) / 3 // b2 et b3 seront calculées plus tard
    let A = []
    let B = []
    let b2 = a2

    let b3 = a1 + a2 + a3 - b1 - b2

    let medianeA = 0
    let medianeB = 0
    if (alea === 1) {
      b2 = a2

      b3 = moyenneA * 3 - b1 - b2
      medianeA = a2
      medianeB = medianeA
      this.reponses = [
        'Les deux séries ont la même moyenne et la même médiane.',
        'Les deux séries ont la même médiane mais pas la même moyenne.',
        'Les deux séries ont la même moyenne mais pas la même médiane.',
        "Les deux séries n'ont ni la même moyenne, ni la même médiane.",
      ]
    }
    if (alea === 2) {
      // même médiane mais moyennes différentes
      b2 = a2

      b3 = moyenneA * 3 - b1 - b2 + 1

      if (b3 === a3) {
        b3 += 1 // On s'assure que b3 est différent de a3
      }
      medianeA = a2
      medianeB = medianeA

      this.reponses = [
        'Les deux séries ont la même médiane mais pas la même moyenne.',
        'Les deux séries ont la même moyenne et la même médiane.',
        'Les deux séries ont la même moyenne mais pas la même médiane.',
        "Les deux séries n'ont ni la même moyenne, ni la même médiane.",
      ]
    }
    if (alea === 3) {
      //  moyennes et médianes différentes
      b2 = randint(Math.floor(b1 + 1), Math.floor(b1 + 4), a2)

      b3 = moyenneA * 3 - b1 - b2 + 1

      medianeA = a2
      medianeB = b2
      this.reponses = [
        "Les deux séries n'ont ni la même moyenne, ni la même médiane.",
        'Les deux séries ont la même médiane mais pas la même moyenne.',
        'Les deux séries ont la même moyenne et la même médiane.',
        'Les deux séries ont la même moyenne mais pas la même médiane.',
      ]
    }
    if (alea === 4) {
      // même moyenne mais médianes différentes
      b2 = randint(Math.floor(b1 + 1), Math.floor(b1 + 5), a2)
      medianeB = b2

      b3 = moyenneA * 3 - b1 - b2

      medianeA = a2

      this.reponses = [
        'Les deux séries ont la même moyenne mais pas la même médiane.',
        "Les deux séries n'ont ni la même moyenne, ni la même médiane.",

        'Les deux séries ont la même médiane mais pas la même moyenne.',
        'Les deux séries ont la même moyenne et la même médiane.',
      ]
    }
    A = shuffle([a1, a2, a3])
    B = shuffle([b1, b2, b3])

    this.enonce = `Voici deux séries de valeurs :<br>
${texteGras('série A :')} $~~${A[0]}~~; ~~${A[1]}~~; ~~${A[2]}~~$.<br>
${texteGras('série B :')} $~~${texNombre(B[0])}~~; ~~${texNombre(B[1])}~~; ~~${texNombre(B[2])}~~$.<br>
Laquelle des ces 4 propositions est vraie ?`
    const moyA = new FractionEtendue(a1 + a2 + a3, 3)
    const moyB = new FractionEtendue(b1 + b2 + b3, 3)
    moyenneB = (b1 + b2 + b3) / 3
    this.correction = `On calcule la moyenne de la série A :
    $\\overline{x}_A=\\dfrac{${a1} + ${a2} + ${texNombre(a3)}}{3} = ${moyA.texFraction}$`
    if (Number.isInteger(moyenneA)) {
      this.correction += ` $= ${moyA.texFractionSimplifiee}$`
    }
    this.correction += `<br>et sa médiane, qui est la valeur centrale de la série classée : $\\mathrm{m_A}=${medianeA}$ .<br>
    On calcule la moyenne de la série B :`

    this.correction += `$\\overline{x}_B=\\dfrac{${texNombre(b1)} + ${texNombre(b2)} + ${texNombre(Number(b3))}}{3} = ${moyB.texFraction} $`
    if (Number.isInteger(moyenneB)) {
      this.correction += ` $= ${moyB.texFractionSimplifiee}$`
    }
    this.correction += `<br>et sa médiane, qui est aussi la valeur centrale de la série classée : $\\mathrm{m_B}=${medianeB}$ .`
    if (alea === 1) {
      this.correction +=
        '<br>On constate que les deux séries ont la même moyenne et la même médiane. '
    }
    if (alea === 2) {
      this.correction +=
        '<br>On constate que les deux séries ont la même médiane mais pas la même moyenne. '
    }
    if (alea === 4) {
      this.correction +=
        '<br>On constate que les deux séries ont la même moyenne mais pas la même médiane. '
    }
    if (alea === 3) {
      this.correction +=
        "<br>On constate que les deux séries n'ont ni la même moyenne, ni la même médiane. "
    }
  }

  // S'occupe de passser les données originales à la fonction appliquerLesValeurs

  // s'occupe d'aléatoiriser les valeurs à passer à la fonction appliquerLesValeurs en vérifiant qu'on a bien 3 réponses différentes
  // Pour un qcm à n réponses, il faudrait vérifier que nombreElementsDifferents(this.reponses) < n
  versionAleatoire: () => void = () => {
    this.appliquerLesValeurs()
  }

  // Ici il n'y a rien à faire, on appelle juste la version aleatoire (pour un qcm aleatoirisé, c'est le fonctionnement par défaut)
  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionAleatoire()
  }
}
