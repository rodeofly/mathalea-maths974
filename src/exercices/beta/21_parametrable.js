import Exercice from '../Exercice'
import { randint, listeQuestionsToContenu } from '../../modules/outils'
export const titre = "Nom de l'exercice"

export const dateDePublication = '4/5/2024' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = 'f9261'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 *
 * @author

*/
export default class nomExercice extends Exercice {
  constructor() {
    super()
    this.consigne = 'Calcule'

    this.besoinFormulaireNumerique = [
      'Difficulté',
      3,
      '1 : Facile\n2 : Moyen\n3 : Difficile',
    ] // le paramètre sera numérique de valeur max 3 (le 3 en vert)
    this.sup = 2 // Valeur du paramètre par défaut
    // Remarques : le paramètre peut aussi être un texte avec : this.besoinFormulaireTexte = [texte, tooltip]
    //              il peut aussi être une case à cocher avec : this.besoinFormulaireCaseACocher = [texte] (dans ce cas, this.sup = true ou this.sup = false)
  }

  nouvelleVersion() {
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const a = randint(1, 12) // Comme la valeur ne sera pas modifiée, on la déclare avec const
      let NombreAAjouter // Comme la valeur sera modifiée, on la déclare avec let
      if (this.sup === 1) {
        NombreAAjouter = 1
      } else if (this.sup === 2) {
        NombreAAjouter = 5
      } else {
        NombreAAjouter = 100
      }
      texte = `$${a} + ${NombreAAjouter} $`
      texteCorr = `$${a} + ${NombreAAjouter} = ${a + NombreAAjouter}$`

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, a, NombreAAjouter)) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
