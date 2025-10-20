import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { prenomM } from '../../lib/outils/Personne'
import { texNombre } from '../../lib/outils/texNombre'
import FractionEtendue from '../../modules/FractionEtendue'
import { randint } from '../../modules/outils'
// import ExerciceQcmA from '../../ExerciceQcmA'
import ExerciceQcmA from '../ExerciceQcmA'

export const uuid = 'cc63e'
export const refs = {
  'fr-fr': ['1A-R6'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer une proportion de proportion (1)'
export const dateDePublication = '16/07/2025'
// Ceci est un exemple de QCM avec version originale et version aléatoire
/**
 *
 * @author Gilles Mora
 *
 */
export default class ProportionDeProportion extends ExerciceQcmA {
  // S'occupe de passser les données originales à la fonction appliquerLesValeurs

  versionOriginale: () => void = () => {
    const table = [
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
      'dimanche',
    ]
    const jour = randint(0, 6)
    const P = prenomM()
    this.enonce = `Jean consacre $25\\,\\%$ de sa journée de ${table[jour]} à faire ses devoirs. <br>
     $80\\,\\%$ du temps consacré aux devoirs est consacré à faire un exposé.  <br>
    Le pourcentage du temps consacré à l’exposé par rapport à la journée de ${table[jour]} est égal à :`
    this.correction = `Le pourcentage du temps consacré à l’exposé par rapport à la journée de ${table[jour]} est égal à $25\\,\\%$ de $80\\,\\%$, soit $${miseEnEvidence('\\dfrac{1}{4}\\times 80\\,\\%')}$.`
    this.reponses = [
      '$\\dfrac{1}{4}\\times 80\\,\\%$',
      '$80\\,\\%-25\\,\\%$',
      '$0,08\\times 25\\,\\%$',
      `Cela dépend de la durée de la journée de ${table[jour]}. `,
    ]
  }

  versionAleatoire: () => void = () => {
    switch (choice([1, 2])) {
      case 1:
        {
          const table = [
            'lundi',
            'mardi',
            'mercredi',
            'jeudi',
            'vendredi',
            'samedi',
            'dimanche',
          ]
          const jour = randint(0, 6)
          const proportions = choice([
            [25, 4 * randint(7, 15)],
            [20, 5 * randint(5, 15)],
            [50, 2 * randint(26, 40)],
          ])
          const prop1 = proportions[0]
          const prop2 = proportions[1]
          const P = prenomM()
          const bonneReponse1 = `${texNombre(prop1 / 100, 2)}\\times ${texNombre(prop2, 2)}\\,\\%`
          const bonneReponse2 = `${texNombre(prop2 / 100, 2)}\\times ${texNombre(prop1, 2)}\\,\\%`
          const bonneReponse3 = `${texNombre((prop2 * prop1) / 100, 2)}\\,\\%`
          const bonneReponseRetenue = choice([
            bonneReponse1,
            bonneReponse2,
            bonneReponse3,
          ])
          this.enonce = `${P} consacre $${prop1}\\,\\%$ de sa journée de ${table[jour]} à faire ses devoirs. <br>
     $${prop2}\\,\\%$ du temps consacré aux devoirs est consacré à faire un exposé.  <br>
    Le pourcentage du temps consacré à l’exposé par rapport à la journée de ${table[jour]} est égal à :`
          this.correction = `Le temps consacré à l’exposé par rapport à la journée de ${table[jour]} est égal à $${prop1}\\,\\%$ de $${prop2}\\,\\%$,  soit $${prop1}\\,\\%\\times ${prop2}\\,\\%$, ou encore $${miseEnEvidence(`${bonneReponseRetenue}`)}$.`
          this.reponses = [
            `$${bonneReponseRetenue}$`,
            `$${prop2}\\,\\%-${prop1}\\,\\%$`,
            `$${prop2}\\,\\%\\times${texNombre(prop1 / 100, 2)}\\,\\%$`,
            `$${texNombre(prop1 / 100, 2)}\\times${texNombre(prop2 / 100, 2)}\\,\\%$`,
          ]
        }
        break

      case 2:
      default:
        {
          const table = [
            'lundi',
            'mardi',
            'mercredi',
            'jeudi',
            'vendredi',
            'samedi',
            'dimanche',
          ]
          const jour = randint(0, 6)
          const proportions = choice([
            [25, 4 * randint(5, 15)],
            [20, 5 * randint(5, 15)],
            [50, 2 * randint(28, 40)],
          ])
          const prop1 = proportions[0]
          const prop2 = proportions[1]
          const P = prenomM()
          const bonneReponse1 = `${texNombre(prop1 / 100, 2)}\\times ${texNombre(prop2, 2)}\\,\\%`
          const bonneReponse2 = `${texNombre(prop1 / 100, 2)}\\times ${texNombre(prop2 / 100, 2)}`
          const bonneReponse3 = `${texNombre(prop1 / 100, 2)}\\times ${new FractionEtendue(prop2, 100).texFractionSimplifiee}`
          const bonneReponse4 = `${new FractionEtendue(prop1, 100).texFractionSimplifiee}\\times ${texNombre(prop2 / 100, 2)}`

          const bonneReponseRetenue = choice([
            bonneReponse1,
            bonneReponse2,
            bonneReponse3,
            bonneReponse4,
          ])

          this.enonce = `${P} consacre $${prop1}\\,\\%$ de sa journée de ${table[jour]} à faire ses devoirs. <br>
     $${prop2}\\,\\%$ du temps consacré aux devoirs est consacré à faire un exposé.  <br>
    La proportion du temps consacré à l’exposé par rapport à la journée de ${table[jour]} est égale à :`
          this.correction = `Le temps consacré à l’exposé par rapport à la journée de ${table[jour]} est égal à $${prop1}\\,\\%$ de $${prop2}\\,\\%$,  soit $${prop1}\\,\\%\\times ${prop2}\\,\\%$, ou encore $${miseEnEvidence(`${bonneReponseRetenue}`)}$.`
          this.reponses = [
            `$${bonneReponseRetenue}$`,
            `$${prop2}\\,\\%-${prop1}\\,\\%$`,
            `$${new FractionEtendue(prop1, 100).texFractionSimplifiee}\\times ${texNombre(prop2, 2)}$`,
            `$${prop1}\\times ${texNombre(prop2 / 100, 2)}$`,
          ]
        }
        break
    }
  }

  // Ici il n'y a rien à faire, on appelle juste la version aleatoire (pour un qcm aleatoirisé, c'est le fonctionnement par défaut)
  constructor() {
    super()
    // this.options = { vertical: true, ordered: false }
    this.versionAleatoire()
  }
}
