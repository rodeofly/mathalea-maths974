import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { range1 } from '../../lib/outils/nombres'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Effectuer les quatre opérations'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

/**
 * Mélange équitable d'additions, de soustractions, de multiplications et de divisions
 *
 * * Niveau 1 Addition 2 chiffres + 1 chiffre, soustraction 2 chiffres - 1 chiffre, tables de 2 à 5
 * * Niveau 2 Addition 2 chiffres + 2 chiffres ne dépassant pas 100, soustraction dont le résultat est entre 11 et 19, tables de 6 à 9
 * * Niveau 3 Addition 2 chiffre + 2 chiffres dépassant 100, soustraction dont le résultat est entre 21 et 39, table de 7, 8, 11 ou 12,
 * @author Rémi Angot

 */
export const uuid = 'ac900'

export const refs = {
  'fr-fr': ['CM2N3A-11'],
  'fr-2016': ['CM004'],
  'fr-ch': [],
}
export default class QuatreOperations extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = ['Niveau de difficulté', 3]

    this.consigne = 'Calculer.'

    this.nbCols = 2
    this.nbColsCorr = 2
    this.sup = 1 // niveau de difficulté
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = range1(4)
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // addition
          if (this.sup === 1) {
            a = randint(11, 89)
            b = randint(2, 9)
          }
          if (this.sup === 2) {
            a = randint(11, 69)
            b = randint(11, 29)
          }
          if (this.sup === 3) {
            a = randint(11, 89)
            b = randint(110 - a, 110 - a + 50)
          }
          texte = `$${a}+${b} = $`
          texteCorr = `$${a}+${b}=${a + b}$`
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          setReponse(this, i, a + b)
          break
        case 2: // soustraction
          if (this.sup === 1) {
            a = randint(11, 89)
            b = randint(2, 9)
          }
          if (this.sup === 2) {
            a = randint(20, 89)
            b = randint(a - 19, a - 11)
          }
          if (this.sup === 3) {
            a = randint(40, 89)
            b = randint(a - 39, a - 21)
          }
          texte = `$${a}-${b}=$`
          texteCorr = `$${a}-${b}=${a - b}$`
          setReponse(this, i, a - b)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          break
        case 3: // multiplication
          if (this.sup === 1) {
            a = randint(2, 5)
            b = randint(2, 9)
          }
          if (this.sup === 2) {
            a = randint(6, 9)
            b = randint(6, 9)
          }
          if (this.sup === 3) {
            a = choice([7, 8, 11, 12])
            b = randint(2, 9)
          }
          texte = `$${a}\\times${b}=$`
          texteCorr = `$${a}\\times${b}=${a * b}$`
          setReponse(this, i, a * b)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          break
        case 4: // division
          if (this.sup === 1) {
            a = randint(2, 5)
            b = randint(2, 9)
          }
          if (this.sup === 2) {
            a = randint(6, 9)
            b = randint(6, 9)
          }
          if (this.sup === 3) {
            a = choice([7, 8, 11, 12])
            b = randint(2, 9)
          }
          texte = `$${a * b}\\div${a}=$`
          texteCorr = `$${a * b}\\div${a}=${b}$`
          setReponse(this, i, b)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
