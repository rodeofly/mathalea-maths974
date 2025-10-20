import Decimal from 'decimal.js'
import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { randint } from '../../modules/outils'
// import ExerciceQcmA from '../../ExerciceQcmA'
import ExerciceQcmA from '../ExerciceQcmA'
import FractionEtendue from '../../modules/FractionEtendue'

export const uuid = '344f3'
export const refs = {
  'fr-fr': ['1A-C19-3'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Résoudre un problème de partage'
export const dateDePublication = '23/09/2025'
// Ceci est un exemple de QCM avec version originale et version aléatoire
/**
 *
 * @author Gilles Mora
 *
 */
export default class Auto1C19c extends ExerciceQcmA {
  // S'occupe de passser les données originales à la fonction appliquerLesValeurs

  versionOriginale: () => void = () => {
    this.enonce = `Deux amis, Alice et Louis, décident d'offrir un voyage d'anniversaire à leur ami Charles. <br>
    Ils organisent les dépenses de la façon suivante :<br>

$\\bullet$ Alice règle les billets de train ; <br>
$\\bullet$
Louis règle l'hébergement.<br>

Une fois le voyage terminé, ils souhaitent répartir équitablement toutes les dépenses entre eux deux, c'est-à-dire que chacun doit finalement payer la même somme.
<br>Les billets de train représentent $\\dfrac{1}{6}$ de la dépense totale et l'hébergement représente le reste.<br>  
Quelle fraction de la dépense totale Alice doit-elle donner à Louis pour que leurs contributions finales soient parfaitement équilibrées ?
 `

    this.correction = `En notant $D$ la dépense totale, Alice a dépensé $\\dfrac{1}{6}D$ et Louis, $\\dfrac{5}{6}D$.<br>
Leur participation équilibrée doit être de $\\dfrac{1}{2}D$ chacun.<br>
Alice doit donc donner à Louis la somme de $\\dfrac{1}{2}D - \\dfrac{1}{6}D = \\dfrac{1}{3}D$.<br>
La fraction de la dépense totale que Alice doit donner à Louis est donc $${miseEnEvidence(`\\dfrac{1}{3}`)}$.`
                   

    this.reponses = [
      '$\\dfrac{1}{3}$',
      '$\\dfrac{5}{6}$',
      '$\\dfrac{2}{3}$',
      '$\\dfrac{1}{12}$',
    ]
  }

  versionAleatoire: () => void = () => {
   const listeFractions = [
          [1, 9],
          [1,5],
          [1, 4],
          [1, 10],
          [1, 7],
          [2, 7],
          [3, 7],
          [3, 10],
          [2, 5],
          [2, 9]
        ]
        const frac = choice(listeFractions)
        const f = new FractionEtendue(frac[0], frac[1])
        const d= new FractionEtendue(1,2)
    this.enonce = `Deux amis, Alice et Louis, décident d'offrir un voyage d'anniversaire à leur ami Charles. <br>
    Ils organisent les dépenses de la façon suivante :<br>

$\\bullet$ Alice règle les billets de train ; <br>
$\\bullet$
Louis règle l'hébergement.<br>

Une fois le voyage terminé, ils souhaitent répartir équitablement toutes les dépenses entre eux deux, c'est-à-dire que chacun doit finalement payer la même somme.
<br>Les billets de train représentent $${f.texFraction}$ de la dépense totale et l'hébergement représente le reste.<br>  
Quelle fraction de la dépense totale Alice doit-elle donner à Louis pour que leurs contributions finales soient parfaitement équilibrées ?
 `

    this.correction = `En notant $D$ la dépense totale, Alice a dépensé $${f.texFraction}D$ et Louis, $${f.oppose().ajouteEntier(1).texFraction}D$.<br>
Leur participation équilibrée doit être de $\\dfrac{1}{2}D$ chacun.<br>
Alice doit donc donner à Louis la somme de $\\dfrac{1}{2}D - ${f.texFraction}D = ${f.oppose().sommeFraction(d).texFraction}D$.<br>
La fraction de la dépense totale que Alice doit donner à Louis est donc $${miseEnEvidence(`${f.oppose().sommeFraction(d).texFraction}`)}$.`
                   

    this.reponses = [
      `$${f.oppose().sommeFraction(d).texFraction}$`,
      `$${f.oppose().ajouteEntier(1).texFraction}$`,
      `$${f.oppose().ajouteEntier(1).sommeFraction(f.oppose()).texFraction}$`,
     `$${f.produitFraction(d).texFraction}$`,
    ]
  }

  // Ici il n'y a rien à faire, on appelle juste la version aleatoire (pour un qcm aleatoirisé, c'est le fonctionnement par défaut)
  constructor() {
    super()
    // this.options = { vertical: true, ordered: false }
    this.versionAleatoire()
    this.spacing = 1.5
  }
}
