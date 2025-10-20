import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import { choice } from '../../../lib/outils/arrayOutils'
import { ecritureAlgebrique } from '../../../lib/outils/ecritures'
export const titre = 'Résoudre une équation du type $(x+a)^2=k$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '02/05/2024'
export const uuid = '74715'
export const refs = {
  'fr-fr': ['can2L14'],
  'fr-ch': ['1mCL4-4'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora ia (Claude) pour les distracteurs

*/
export default class EquationsCarree extends ExerciceSimple {
  constructor() {
    super()

    this.canOfficielle = false
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierEnsemble
    this.versionQcmDisponible = true
    this.optionsDeComparaison = { ensembleDeNombres: true }
  }

  nouvelleVersion() {
    switch (
      choice([1, 2, 3]) // 1, 1, 2, 2, 3
    ) {
      case 1: // (x+a)^2=k k est un carré
        {
          const a = randint(-10, 10, 0)
          const k1 = randint(1, 10)
          const k = k1 ** 2
          const sol1 = -k1 - a
          const sol2 = k1 - a
          this.reponse = this.versionQcm
            ? `$\\{${sol1}\\,;\\,${sol2}\\}$`
            : `\\{${sol1};${sol2}\\}`
          this.question = this.versionQcm
            ? `L'ensemble $S$ des solutions de l'équation  $(x${ecritureAlgebrique(a)})^2=${k}$ est :`
            : `Donner l'ensemble $S$ des solutions de l'équation  $(x${ecritureAlgebrique(a)})^2=${k}$.`

          this.correction = `L'équation est de la forme $X^2=k$ avec $X=(x${ecritureAlgebrique(a)})$ et $k=${k}$.<br>
          Comme $k>0$, les solutions de $(x${ecritureAlgebrique(a)})^2=${k}$ sont données par les solutions de chacune des équations :           $x${ecritureAlgebrique(a)}=-\\sqrt{${k}}$ et $x${ecritureAlgebrique(a)}=\\sqrt{${k}}$.<br>
          $x${ecritureAlgebrique(a)}=${-k1}$ a pour solution $${sol1}$ et $x${ecritureAlgebrique(a)}=${k1}$ a pour solution $${sol2}$.<br>
          Ainsi, l'ensemble des solutions de l'équation est $S=${miseEnEvidence(`\\{${sol1}\\,;\\,${sol2}\\}`)}$.
           `
          this.distracteurs = [
            // Erreur : oubli du changement de signe pour une des solutions
            `$S=\\{${sol1};${-sol2}\\}$`,

            // Erreur : oubli de soustraire 'a' (garde juste ±√k)
            `$S=\\{${-k1}\\,;\\,${k1}\\}$`,

            // Erreur : addition de 'a' au lieu de soustraction
            `$S=\\{${-k1 + a}\\,;\\,${k1 + a}\\}$`,

            // Erreur : une seule solution (oubli que x² = k a deux solutions)
            `$S=\\{${sol2}\\}$`,
          ]
        }
        break
      case 2: // (x+a)^2=k k non carré
        {
          const a = randint(-10, 10, 0)
          const k = choice([2, 3, 5, 6, 7, 10, 11, 13, 15, 21])
          this.reponse = this.versionQcm
            ? `$\\{-\\sqrt{${k}}${ecritureAlgebrique(-a)}\\,;\\,\\sqrt{${k}}${ecritureAlgebrique(-a)}\\}$`
            : `\\{-\\sqrt{${k}}${ecritureAlgebrique(-a)};\\sqrt{${k}}${ecritureAlgebrique(-a)}\\}`
          this.question = this.versionQcm
            ? `L'ensemble $S$ des solutions de l'équation  $(x${ecritureAlgebrique(a)})^2=${k}$ est :`
            : `Donner l'ensemble $S$ des solutions de l'équation  $(x${ecritureAlgebrique(a)})^2=${k}$.`
          this.correction = `L'équation est de la forme $X^2=k$ avec $X=(x${ecritureAlgebrique(a)})$ et $k=${k}$.<br>
        Comme $k>0$, les solutions de $(x${ecritureAlgebrique(a)})^2=${k}$ sont données par les solutions de chacune des équations :         $x${ecritureAlgebrique(a)}=-\\sqrt{${k}}$ et $x${ecritureAlgebrique(a)}=\\sqrt{${k}}$.<br>
        $x${ecritureAlgebrique(a)}=-\\sqrt{${k}}$ a pour solution $-\\sqrt{${k}}${ecritureAlgebrique(-a)}$ et 
        $x${ecritureAlgebrique(a)}=\\sqrt{${k}}$ a pour solution $\\sqrt{${k}}${ecritureAlgebrique(-a)}$.<br>
        Ainsi, l'ensemble des solutions de l'équation est $S=${miseEnEvidence(`\\{-\\sqrt{${k}}${ecritureAlgebrique(-a)}\\,;\\,\\sqrt{${k}}${ecritureAlgebrique(-a)}\\}`)}$.
         `
          this.distracteurs = [
            // Erreur : oubli du changement de signe pour une des racines
            `$S=\\{-\\sqrt{${k}}${ecritureAlgebrique(-a)};-\\sqrt{${k}}${ecritureAlgebrique(-a)}\\}$`,

            // Erreur : oubli de soustraire 'a' (garde juste ±√k)
            `$S=\\{-\\sqrt{${k}}\\,;\\,\\sqrt{${k}}\\}$`,

            // Erreur : addition de 'a' au lieu de soustraction
            `$S=\\{-\\sqrt{${k}}${ecritureAlgebrique(a)};\\sqrt{${k}}${ecritureAlgebrique(a)}\\}$`,

            // Erreur : confusion entre √k et k
            `$S=\\{${-k - a}\\,;\\,${k - a}\\}$`,
          ]
        }
        break
      case 3: // (x+a)^2=k k négatif
        {
          const a = randint(-10, 10, 0)
          const k = randint(-10, -1)
          this.reponse = this.versionQcm ? '$\\emptyset$' : '\\emptyset'
          this.question = this.versionQcm
            ? `L'ensemble $S$ des solutions de l'équation  $(x${ecritureAlgebrique(a)})^2=${k}$ est :`
            : `Donner l'ensemble $S$ des solutions de l'équation  $(x${ecritureAlgebrique(a)})^2=${k}$.`

          this.correction = `L'équation est de la forme $X^2=k$ avec $X=(x${ecritureAlgebrique(a)})$ et $k=${k}$.<br>
        Comme $k<0$, l'équation n'a pas de solution.<br>
        Ainsi, l'ensemble des solutions de l'équation est $S=${miseEnEvidence('\\emptyset')}$.
         `
          this.distracteurs = [
            // Erreur : comme si k était positif avec √|k|
            `$S=\\{-\\sqrt{${-k}}${ecritureAlgebrique(-a)}\\,;\\,\\sqrt{${-k}}${ecritureAlgebrique(-a)}\\}$`,

            // Erreur : pense qu'il y a une solution x = -a
            `$S=\\{${-a}\\}$`,

            // Erreur : ensemble avec zéro
            '$S=\\{0\\}$',

            // Erreur : utilise directement les valeurs ±√|k|
            `$S=\\{-\\sqrt{${-k}}\\,;\\,\\sqrt{${-k}}\\}$`,
          ]
        }
        break
    }
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = '\\hspace{-2.5cm}$S=\\ldots$'
    if (this.interactif && !this.versionQcm) {
      this.question += `<br>
          Respecter les notations pour écrire les solutions.<br>$S=$`
    }
  }
}
