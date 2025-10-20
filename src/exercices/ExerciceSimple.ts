import Exercice from './Exercice'

export default class ExerciceSimple extends Exercice {
  distracteurs: (string | number)[]
  typeExercice: 'simple'
  versionQcmDisponible?: boolean // Pour les exercices de type simple, si des distracteurs sont définis, on peut proposer une version QCM
  versionQcm?: boolean // Seulement pour les exercices de type simple, version QCM activée si 'true'
  constructor() {
    super()
    this.distracteurs = []
    this.typeExercice = 'simple'
  }
}
