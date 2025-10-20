import { choice } from '../../../lib/outils/arrayOutils'
import {
  texteEnCouleur,
  miseEnEvidence,
} from '../../../lib/outils/embellissements'
import { ecritureParentheseSiNegatif } from '../../../lib/outils/ecritures'
import { creerNomDePolygone } from '../../../lib/outils/outilString'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
export const titre = 'Calculer une distance avec les coordonnées'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication sptembre 2021
*/
export const uuid = 'b0d98'

export const refs = {
  'fr-fr': ['can2G05'],
  'fr-ch': [],
}
export default class DistanceRepere extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, b, c, d
    const nom = creerNomDePolygone(2, 'OPQD')
    switch (choice(['a', 'a', 'b'])) {
      case 'a':
        a = randint(1, 6)
        b = randint(1, 6, a)
        c = randint(1, 6)
        d = randint(1, 6, b)
        if (
          (c - a) ** 2 + (d - b) ** 2 === 1 ||
          (c - a) ** 2 + (d - b) ** 2 === 4 ||
          (c - a) ** 2 + (d - b) ** 2 === 9 ||
          (c - a) ** 2 + (d - b) ** 2 === 16 ||
          (c - a) ** 2 + (d - b) ** 2 === 25 ||
          (c - a) ** 2 + (d - b) ** 2 === 36
        ) {
          this.question = `Dans un repère du plan d'origine $O$, on donne $${nom[0]}(${a}\\,;\\,${b})$ et $${nom[1]}(${c}\\,;\\,${d})$.<br>
        Déterminer la longueur du segment $[${nom[0]}${nom[1]}]$.`
          this.correction = `$${nom[0]}${nom[1]}=\\sqrt{(x_${nom[1]}-x_${nom[0]})^2+(y_${nom[1]}-y_${nom[0]})^2}=
          \\sqrt{(${c}-${ecritureParentheseSiNegatif(a)})^2+(${d}-${ecritureParentheseSiNegatif(b)})^2}=
          \\sqrt{${(c - a) ** 2}+${(d - b) ** 2}}=\\sqrt{${(c - a) ** 2 + (d - b) ** 2}}=
          ${miseEnEvidence(`${Math.sqrt((c - a) ** 2 + (d - b) ** 2)}`)}$<br><br>`
          this.correction += texteEnCouleur(
            ` Mentalement : <br>
          On calcule  $(${c}-${a})^2$ et $(${d}-${b})^2$, ce qui donne $${(c - a) ** 2}$ et $${(d - b) ** 2}$. <br>
          Puis on calcule la somme de ces nombres soit $${(c - a) ** 2}+${(d - b) ** 2}=${(c - a) ** 2 + (d - b) ** 2}$.<br>
           Enfin, on en prend la racine carrée.`,
            'blue',
          )
          this.reponse = Math.sqrt((c - a) ** 2 + (d - b) ** 2)
        } else {
          this.question = `Dans un repère du plan d'origine $O$, on donne $${nom[0]}(${a}\\,;\\,${b})$ et $${nom[1]}(${c}\\,;\\,${d})$.<br>
        Déterminer la longueur du segment $[${nom[0]}${nom[1]}]$.`

          this.correction = `$${nom[0]}${nom[1]}=
          \\sqrt{(x_${nom[1]}-x_${nom[0]})^2+(y_${nom[1]}-y_${nom[0]})^2}=
          \\sqrt{(${c}-${ecritureParentheseSiNegatif(a)})^2+(${d}-${ecritureParentheseSiNegatif(b)})^2}=
          \\sqrt{${(c - a) ** 2}+${(d - b) ** 2}}=${miseEnEvidence(`\\sqrt{${(c - a) ** 2 + (d - b) ** 2}}`)}$<br><br>`
          this.correction += texteEnCouleur(
            ` Mentalement : <br>
          On calcule  $(${c}-${a})^2$ et $(${d}-${b})^2$, ce qui donne $${(c - a) ** 2}$ et $${(d - b) ** 2}$. <br>
          Puis on calcule la somme de ces nombres soit $${(c - a) ** 2}+${(d - b) ** 2}=${(c - a) ** 2 + (d - b) ** 2}$.<br>
           Enfin, on en prend la racine carrée.<br>
            Comme $${(c - a) ** 2 + (d - b) ** 2}$ n'est pas un carré parfait, on ne simplifie pas (la réponse doit être sous la forme $\\sqrt{a}$ ou d'un entier).
           `,
            'blue',
          )
          this.reponse = [
            `\\sqrt{${(c - a) ** 2 + (d - b) ** 2}}`,
            `${Math.sqrt((c - a) ** 2 + (d - b) ** 2)}`,
          ]
        }
        if (this.interactif) {
          this.question += `<br>$${nom[0]}${nom[1]}=$`
        }
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = `$${nom[0]}${nom[1]}=\\ldots$`
        break
      case 'b':
        a = randint(-5, 5, 0)
        b = randint(-5, 5, 0)
        if (a ** 2 + b ** 2 === 25) {
          this.question = `Dans un repère du plan d'origine $O$, on donne $${nom[0]}(${a}\\,;\\,${b})$.<br>
        Déterminer la longueur du segment $[O${nom[0]}]$. `
          this.correction = `$O${nom[0]}=\\sqrt{x_${nom[0]}^2+y_${nom[0]}^2}=
          \\sqrt{${ecritureParentheseSiNegatif(a)}^2+${ecritureParentheseSiNegatif(b)}^2}
          =\\sqrt{${a ** 2}+${b ** 2}}
          =\\sqrt{${a ** 2 + b ** 2}}=${miseEnEvidence(`${Math.sqrt(a ** 2 + b ** 2)}`)}$<br><br>`
          this.correction += texteEnCouleur(
            ` Mentalement : <br>
        On calcule  $${ecritureParentheseSiNegatif(a)}^2$ et $${ecritureParentheseSiNegatif(b)}^2$, ce qui donne $${a ** 2}$ et $${b ** 2}$. <br>
        Puis on calcule la somme de ces nombres soit $${a ** 2}+${b ** 2}=${a ** 2 + b ** 2}$.<br>
         Enfin, on en prend la racine carrée.<br>
          Comme $25$ est pas un carré parfait, on  simplifie.
         `,
            'blue',
          )
          this.reponse = Math.sqrt(a ** 2 + b ** 2)
        } else {
          this.question = `Dans un repère du plan d'origine $O$, on donne $${nom[0]}(${a}\\,;\\,${b})$.<br>
        Déterminer la longueur du segment $[O${nom[0]}]$.`
          this.correction = `$O${nom[0]}=\\sqrt{x_${nom[0]}^2+y_${nom[0]}^2}
          =\\sqrt{${ecritureParentheseSiNegatif(a)}^2+${ecritureParentheseSiNegatif(b)}^2}
          =\\sqrt{${a ** 2}+${b ** 2}}=${miseEnEvidence(`\\sqrt{${a ** 2 + b ** 2}}`)}$<br><br>`
          this.correction += texteEnCouleur(
            ` Mentalement : <br>
        On calcule  $${ecritureParentheseSiNegatif(a)}^2$ et $${ecritureParentheseSiNegatif(b)}^2$, ce qui donne $${a ** 2}$ et $${b ** 2}$. <br>
        Puis on calcule la somme de ces nombres soit $${a ** 2}+${b ** 2}=${a ** 2 + b ** 2}$.<br>
         Enfin, on en prend la racine carrée.         
         `,
            'blue',
          )
          this.reponse = `\\sqrt{${a ** 2 + b ** 2}}`
          if (this.interactif) {
            this.question += `<br>$O${nom[0]}=$`
          }
        }

        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = `$O${nom[0]}=\\ldots$`
        break
    }
  }
}
