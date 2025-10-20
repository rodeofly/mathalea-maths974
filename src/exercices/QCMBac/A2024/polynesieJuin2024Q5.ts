// import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { createList } from '../../../lib/format/lists'
import { randint } from '../../../modules/outils'
import { nombreElementsDifferents } from '../../ExerciceQcm'
import ExerciceQcmA from '../../ExerciceQcmA'

export const uuid = 'c83a0'
export const refs = {
  'fr-fr': ['TSG1-QCM06'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Polynésie 06/2024 : combinatoire'
export const dateDePublication = '20/04/2025'
// Ceci est un exemple de QCM avec version originale et version aléatoire
/**
 *
 * @author Stéphane Guyon
 *
 */
export default class MetropoleJuin24Exo4Q2 extends ExerciceQcmA {
  // Ceci est la fonction qui s'occupe d'écrire l'énoncé, la correction et les réponses
  // Elle factorise le code qui serait dupliqué dans versionAleatoire et versionOriginale

  private appliquerLesValeurs(
    nn: number,
    k: number,
    p: number,
    pc: number,
    ses: number,
  ): void {
    this.reponses = [
      `$\\dbinom{${ses}}{${p}} \\times \\dbinom{${nn - ses}}{${k - p}} $`,
      `$\\dbinom{${ses}}{${p}} + \\dbinom{${nn - ses}}{${k - p}} $`,
      `$\\dbinom{${ses}}{${p}} $`,
      `$${ses}^{${p}} \\times ${nn - ses}^{${k - p}}$`,
    ]
    let eleve = ''
    if (nn - pc - ses > 1) {
      eleve = 'élèves ont'
    } else {
      eleve = 'élève a'
    }
    const list = createList({
      items: [
        `${pc} élèves ont choisi la spécialité physique-chimie`,
        `${ses} élèves ont choisi la spécialité SES`,
        `${nn - pc - ses} ${eleve} choisi la spécialité LLCE espagnol.`,
      ],
      style: 'fleches',
    })
    this.enonce = `Une professeure de terminale Spé Maths s'intéresse à l'autre spécialité des ${nn} élèves de son groupe :
   ${list}
    Elle veut former un groupe de ${k} élèves comportant exactement ${p} élèves ayant choisi la
        spécialité SES.<br>De combien de façons différentes peut-elle former un tel groupe ?`
    this.correction = `Elle choisit ${p} élèves parmi les ${ses} faisant SES : elle a $\\displaystyle\\binom{${ses}}{${p}}$ possibilités.<br>`
    this.correction += `Ensuite dans chacun de ces cas elle choisit ${k - p} élèves parmi les $${nn} - ${ses} = ${nn - ses}$ élèves qui ne font pas SES,<br>`
    this.correction += `ce qui fait $\\dbinom{${ses}}{${p}} \\times \\dbinom{${nn - ses}}{${k - p}} $ possibilités.`
  }

  // S'occupe de passser les données originales à la fonction appliquerLesValeurs
  versionOriginale: () => void = () => {
    this.appliquerLesValeurs(31, 5, 3, 10, 20) // valeurs originales pour f(x) = {a=3}x-{b=2} avec x={c=-4}
  }

  // s'occupe d'aléatoiriser les valeurs à passer à la fonction appliquerLesValeurs en vérifiant qu'on a bien 3 réponses différentes
  // Pour un qcm à n réponses, il faudrait vérifier que nombreElementsDifferents(this.reponses) < n
  versionAleatoire: () => void = () => {
    const n = 4 // nombre de réponses différentes voulues (on rappelle que la première réponse est la bonne)
    do {
      const nn = randint(28, 35) // nombre d'élèves au total
      const k = randint(5, 10) // effectif du groupe à choisir

      const pc = randint(12, 18) // nombre d'élèves en PC à choisir
      const ses = randint(6, nn - pc - 3) // nombre d'élèves en SES à choisir
      const p = randint(2, k - 2) // effectif du groupe à choisir
      this.appliquerLesValeurs(nn, k, p, pc, ses)
    } while (nombreElementsDifferents(this.reponses) < n)
  }

  // Ici il n'y a rien à faire, on appelle juste la version aleatoire (pour un qcm aleatoirisé, c'est le fonctionnement par défaut)
  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionAleatoire()

    this.sup3 = true
  }
}
