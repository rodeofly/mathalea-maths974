import { choice } from '../../../lib/outils/arrayOutils'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Calculer l’aire ou un périmètre d’un carré'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * @author Gilles Mora
  * Créé pendant l'été 2021

*/
export const uuid = 'db589'

export const refs = {
  'fr-fr': ['can3M01'],
  'fr-ch': [],
}
export default class CarreAire extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, c
    switch (choice(['a', 'b'])) {
      case 'a':
        a = randint(1, 10)

        this.question = `Quelle est l'aire d'un carré  dont le périmètre est $${4 * a}$ cm ?`
        this.reponse = a * a
        this.correction = `Le côté du carré est $${4 * a}\\div 4=${a}$, donc son aire est : $${a}\\times ${a}=${a ** 2}$ cm$^2$.`
        this.optionsChampTexte = { texteApres: ' cm$^2$' }
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = '$\\ldots$ cm$^2$'
        break
      case 'b':
        a = randint(1, 10)
        c = a * a
        this.question = `Déterminer le périmètre  d'un carré d'aire $${c}$ cm$^2$. `
        this.reponse = 4 * a
        this.correction = `Le côté du carré est $\\sqrt{${c}}=${a}$. Son périmètre est donc $4\\times ${a}=${4 * a}$ cm.`
        this.optionsChampTexte = { texteApres: ' cm' }
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = '$\\ldots$ cm'
        break
    }
  }
}
