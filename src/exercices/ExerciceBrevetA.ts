import ExerciceBrevet from './ExerciceBrevet'

// class à utiliser pour fabriquer des Qcm ayant une version aléatoire
export default class ExerciceBrevetA extends ExerciceBrevet {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Sujet original', false]
    this.sup = false

    this.versionAleatoire(0)
  }

  versionAleatoire: (i: number) => void = () => {}
}
