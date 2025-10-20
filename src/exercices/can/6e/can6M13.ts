import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Manipuler les conversions'
export const dateDePublication = '11/10/2023'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true

/**
 * @author Gilles Mora
 * Créé le 05/10/2023

 */
export const uuid = '59144'

export const refs = {
  'fr-fr': ['can6M13', 'auto6M1A-flash2'],
  'fr-ch': ['NR'],
}
export default class CombienDeFois extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1

    this.typeExercice = 'simple'
  }

  nouvelleVersion() {
    const unite = choice(['g', 'm', 'L'])
    const choix = choice([true, false])
    this.optionsChampTexte = { texteApres: 'fois' }
    this.canReponseACompleter =
      'La réponse correcte à cette question est : <br>$\\ldots$'
    let Choixprefixes: [number, string][]
    let prefixes: [number, string] = [10, 'h']
    switch (choice([1, 1, 2, 2, 3, 3, 4])) {
      case 0:
        Choixprefixes = [
          [10, 'h'],
          [100, 'da'],
          [1000, ''],
          [10000, 'd'],
        ]
        prefixes = choice(Choixprefixes)

        this.question = `Le professeur demande à un élève : <br>
      ${choix ? `« $1$ k${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? »` : `« $1$ ${prefixes[1]}${unite} c'est combien de fois plus petit que $1$ k${unite} ? »`}<br>
        La réponse correcte à cette question est : ${this.interactif ? '' : '$\\ldots$'}`

        this.correction = ` $1$ k${unite}  $= ${texNombre(prefixes[0])}$ ${prefixes[1]}${unite}`
        this.canEnonce = `Le professeur demande à un élève :<br> 
        « $1$ k${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? » `
        break

      case 1:
        Choixprefixes = [
          [10, 'da'],
          [100, ''],
          [1000, 'd'],
          [10000, 'c'],
        ]
        prefixes = choice(Choixprefixes)

        this.question = `Le professeur demande à un élève : <br>
          ${choix ? `« $1$ h${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? »` : `« $1$ ${prefixes[1]}${unite} c'est combien de fois plus petit que $1$ h${unite} ? »`}<br>
            La réponse correcte à cette question est : ${this.interactif ? '' : '$\\ldots$'}`

        this.correction = ` $1$ h${unite}  $= ${texNombre(prefixes[0])}$ ${prefixes[1]}${unite}`
        this.canEnonce = `Le professeur demande à un élève :<br> 
            « $1$ h${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? » `

        break
      case 2:
        Choixprefixes = [
          [10, ''],
          [100, 'd'],
          [1000, 'c'],
          [10000, 'm'],
        ]
        prefixes = choice(Choixprefixes)

        this.question = `Le professeur demande à un élève : <br>
              ${choix ? `« $1$ da${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? »` : `« $1$ ${prefixes[1]}${unite} c'est combien de fois plus petit que $1$ da${unite} ? »`}<br>
                La réponse correcte à cette question est : ${this.interactif ? '' : '$\\ldots$'}`

        this.correction = ` $1$ da${unite}  $= ${texNombre(prefixes[0])}$ ${prefixes[1]}${unite}`
        this.canEnonce = `Le professeur demande à un élève : <br>
                « $1$ da${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? » `

        break

      case 3:
        Choixprefixes = [
          [10, 'd'],
          [100, 'c'],
          [1000, 'm'],
        ]
        prefixes = choice(Choixprefixes)

        this.question = `Le professeur demande à un élève : <br>
                  ${choix ? `« $1$ ${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? »` : `« $1$ ${prefixes[1]}${unite} c'est combien de fois plus petit que $1$ ${unite} ? »`}<br>
                    La réponse correcte à cette question est : ${this.interactif ? '' : '$\\ldots$'}`

        this.correction = ` $1$ ${unite}  $= ${texNombre(prefixes[0])}$ ${prefixes[1]}${unite}`
        this.canEnonce = `Le professeur demande à un élève : <br>
                    « $1$ ${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? » `

        break

      case 4:
        Choixprefixes = [
          [10, 'c'],
          [100, 'm'],
        ]
        prefixes = choice(Choixprefixes)

        this.question = `Le professeur demande à un élève :<br> 
                      ${choix ? `« $1$ d${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? »` : `« $1$ ${prefixes[1]}${unite} c'est combien de fois plus petit que $1$ d${unite} ? »`}<br>
                        La réponse correcte à cette question est : ${this.interactif ? '' : '$\\ldots$'}`

        this.correction = ` $1$ d${unite}  $= ${texNombre(prefixes[0])}$ ${prefixes[1]}${unite}`
        this.canEnonce = `Le professeur demande à un élève : <br>
                        « $1$ d${unite} c'est combien de fois plus grand que $1$ ${prefixes[1]}${unite} ? » `

        break
    }
    this.reponse = prefixes[0]
  }
}
