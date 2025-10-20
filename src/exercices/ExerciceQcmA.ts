import ExerciceQcm from './ExerciceQcm'

// class à utiliser pour fabriquer des Qcm ayant une version aléatoire
export default class ExerciceQcmA extends ExerciceQcm {
  versionAleatoire: () => void = () => {}
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Sujet original', false]
    this.besoinFormulaire4CaseACocher = ['Ajout de « Je ne sais pas »', false]
    this.sup = false
    this.sup4 = false

    this.versionAleatoire()
  }

  aleatoire: () => void = () => {}
}
