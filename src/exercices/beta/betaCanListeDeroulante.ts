import { propositionsQcm } from '../../lib/interactif/qcm'
import {
  choixDeroulant,
  listeDeroulanteToQcm,
} from '../../lib/interactif/questionListeDeroulante'
import { sp } from '../../lib/outils/outilString'
import { randint } from '../../modules/outils'
import ExerciceSimple from '../ExerciceSimple'

export const titre = 'Un test exo simple + liste déroulante'
export const uuid = '12321'
export const interactifReady = true
export const interactifType = 'listeDeroulante'

export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}
export default class TestListDeroulante extends ExerciceSimple {
  constructor() {
    super()
    this.formatInteractif = 'listeDeroulante'
    this.typeExercice = 'simple'
    this.interactif = true
    this.nbQuestions = 3
  }

  nouvelleVersion(): void {
    const n = randint(10, 100)
    const choix = [
      { label: 'Choisissez bien !', value: '' },
      { label: `${n}`, value: `${n}` },
      { label: `${n + 1}`, value: `${n + 1}` },
      { label: `${n - 1}`, value: `${n - 1}` },
      { label: `${n + 10}`, value: `${n + 10}` },
    ]
    if (!this.interactif) {
      listeDeroulanteToQcm(this, 0, choix, `${n + 10}`, {
        vertical: false,
        ordered: false,
      })
      this.formatInteractif = 'qcm'
    } else {
      this.formatInteractif = 'listeDeroulante'
    }
    this.question = this.interactif
      ? `On propose ci-après une liste déroulante de nombres dont il faut déterminer le plus grand :<br><br>
        ${sp(30)}${choixDeroulant(this, 0, choix)}<br><br>`
      : `On propose ci-après une liste de nombres dont il faut déterminer le plus grand :<br><br>
        ${sp(30)}${propositionsQcm(this, 0).texte}<br><br>`

    this.reponse = `${n + 10}`
    this.correction = `La bonne réponse est ${n + 10}`
    this.optionsChampTexte = { formatInteractif: 'listeDeroulante' }
  }
}
