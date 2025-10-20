import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
export const titre = "Proportion d'une sous-population"

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/06/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 *
 * @author Stéphane Guyon

*/
export const uuid = '86f71'

export const refs = {
  'fr-fr': ['techno1P2-2'],
  'fr-ch': [],
}
export default class nomExercice extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  }

  nouvelleVersion() {
    const typeQuestionsDisponibles = ['Basket', 'STMG'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      // Boucle principale où i+1 correspond au numéro de la question
      let N: number
      let n: number
      let texte = ''
      let texteCorr = ''
      switch (
        listeTypeQuestions[i] // Suivant le type de question, le contenu sera différent
      ) {
        case 'Basket':
          N = randint(200, 1500) * 2
          n = randint(50, N / 2)
          texte = `Parmi les $${N}$ spectateurs d’un match de basket-ball, $${n}$ ont moins de $20$ ans. Calculer la valeur approchée, arrondie au centième, de la proportion de spectateurs
          ayant moins de $20$ ans.` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `La population de référence est celle des spectateurs du match.<br>
           On note $N=${N}$ son effectif.<br>
          La sous-population étudiée est celle des spectateurs de moins de $20$ ans.<br>
           On note $n=${n}$ son effectif.<br>
          D'après le cours, on sait que la proportion d'une sous-population dans une population est :<br>
          <br>$p=\\dfrac{\\text{Effectif de la sous population}}{\\text{Effectif de la population de référence}}=\\dfrac{n}{N}=\\dfrac{${n}}{${N}}\\approx${texNombre(n / N, 2)}$<br>
          <br>La proportion de moins de $20$ ans parmi les spectateurs est environ de $p=${texNombre(n / N, 2)}$ ou encore $p=${texNombre((n * 100) / N, 0)}\\%$`
          break
        case 'STMG':
        default:
          N = randint(12, 18) * 2
          n = randint(18, N / 2)
          texte = `L’an passé, parmi les $${N}$ élèves de terminale STMG, $${n}$ ont obtenu une place en BTS ou en IUT.<br>
            Calculer la valeur approchée, arrondie au centième, de la proportion d'élèves de cette classe qui ont obtenu une place en BTS ou en IUT.
            ` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `La population de référence est celle des élèves de Terminale STMG.<br>
             On note $N=${N}$ son effectif.<br>
            La sous-population étudiée est celle des bacheliers de cette classe qui ont obtenu une place en BTS ou en IUT.<br>
             On note $n=${n}$ son effectif.<br>
            D'après le cours, on sait que la proportion d'une sous-population dans une population est :<br>
            <br>$p=\\dfrac{\\text{Effectif de la sous population}}{\\text{Effectif de la population de référence}}=\\dfrac{n}{N}=\\dfrac{${n}}{${N}}\\approx${texNombre(n / N, 2)}$<br>
            <br>La proportion d'élèves qui ont obtenu une place en BTS ou en IUT dans cette classe est environ de $p=${texNombre(n / N, 2)}$ ou encore $p=${texNombre((n * 100) / N, 0)}\\%$`
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, N, n)) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
