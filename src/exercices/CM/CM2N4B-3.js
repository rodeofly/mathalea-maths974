import { combinaisonListes, shuffle } from '../../lib/outils/arrayOutils'
import { arrondi, range1 } from '../../lib/outils/nombres'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Jouer au "compte est bon" original'

/**
 * Un "Le compte est bon" avec des solutions "formatées" pour travailler certains incontournables du calcul mental
 *  @author Jean-Claude Lhote

 */
export const uuid = 'bd6ff'

export const refs = {
  'fr-fr': ['CM2N4B-3'],
  'fr-2016': ['CM021'],
  'fr-ch': [],
}
export default class CompteEstBon extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Niveaux de difficultés nombres de 1 à 3 séparés par des tirets :',
      '1: Avec 10 et 100\n2 : Avec 10 et de quoi faire facilement 100\n3 : Avec des calculs imbriqués\n4 : Mélange',
    ] // Texte, tooltip
    this.consigne =
      'Trouver le résultat en utilisant les quatre opérations et les nombres du tirage (une seule fois).'
    this.nbQuestions = 5
    this.nbCols = 2
    this.nbColsCorr = 2
    this.sup = 1 // niveau de calcul souhaité
  }

  nouvelleVersion() {
    let a, b, c, d, cible, tirage
    const typesDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      max: 3,
      defaut: 4,
      melange: 4,
      nbQuestions: this.nbQuestions,
    })
    const choix = combinaisonListes(range1(5), this.nbQuestions)

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (typesDeQuestions[i]) {
        case 1:
          a = randint(2, 9)
          b = randint(2, 8, a)
          c = randint(1, 9, [a, b])
          d = randint(1, 9, [a, b, c])
          switch (choix[i]) {
            case 1:
              cible = arrondi(a * 100 + b * 10 + c + d)
              tirage = shuffle([100, 10, a, b, c, d])
              texteCorr = `Le compte est bon : $${cible}=100\\times${a}+10\\times${b}+${c}+${d}$`
              break
            case 2:
              cible = arrondi(a * 100 + b * 10 + c - d)
              tirage = shuffle([100, 10, a, b, c, d])
              texteCorr = `Le compte est bon : $${cible}=100\\times${a}+10\\times${b}+${c}-${d}$`
              break
            case 3:
              cible = arrondi(a * 100 - b * 10 + c + d)
              tirage = shuffle([100, 10, a, b, c, d])
              texteCorr = `Le compte est bon : $${cible}=100\\times${a}-10\\times${b}+${c}+${d}$`
              break
            case 4:
              cible = arrondi(a * 100 - b * 10 + c - d)
              tirage = shuffle([100, 10, a, b, c, d])
              texteCorr = `Le compte est bon : $${cible}=100\\times${a}-10\\times${b}+${c}-${d}$`
              break
            default:
              cible = arrondi(a * 100 + (b + c) * 10 + d)
              tirage = shuffle([100, 10, a, b, c, d])
              texteCorr = `Le compte est bon : $${cible}=100\\times${a}+10\\times(${b}+${c})+${d}$`
          }
          break

        case 2:
          a = randint(3, 9)
          b = randint(3, 8, a)
          c = randint(3, 9, [a, b])
          switch (choix[i]) {
            case 1:
              cible = arrondi(a * 100 + b * 10 + c)
              tirage = shuffle([50, 50, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=(50+50)\\times${a}+10\\times${b}+${c}$`
              break
            case 2:
              cible = arrondi(a * 100 + b * 10 - c)
              tirage = shuffle([50, 50, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=(50+50)\\times${a}+10\\times${b}-${c}$`
              break
            case 3:
              cible = arrondi(a * 100 - b * 10 + c)
              tirage = shuffle([50, 50, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=(50+50)\\times${a}-10\\times${b}+${c}$`
              break
            case 4:
              cible = arrondi(a * 100 - b * 10 - c)
              tirage = shuffle([50, 2, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=2\\times50\\times${a}-10\\times${b}-${c}$`
              break
            default:
              cible = arrondi(a * 100 + b * 10 - c)
              tirage = shuffle([25, 4, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=4\\times25\\times${a}+10\\times${b}-${c}$`
          }
          break
        case 3:
          a = randint(2, 5)
          b = randint(3, 8, a)
          c = randint(3, 9, [a, b])
          switch (choix[i]) {
            case 1:
              cible = arrondi(a * (100 + b * 10) + c)
              tirage = shuffle([50, 2, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=${a}\\times(50\\times2+10\\times${b})+${c}$`
              break
            case 2:
              cible = arrondi(a * (100 + b * 10) - c)
              tirage = shuffle([50, 2, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=${a}\\times(50\\times2+10\\times${b})-${c}$`
              break
            case 3:
              cible = arrondi(a * (100 + b * 10) + c)
              tirage = shuffle([25, 4, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=${a}\\times(25\\times4+10\\times${b})+${c}$`
              break
            case 4:
              cible = arrondi(a * (100 + b * 10) - c)
              tirage = shuffle([25, 4, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=${a}\\times(25\\times4+10\\times${b})-${c}$`
              break
            default:
              cible = arrondi(a * (100 + b * 10) + c)
              tirage = shuffle([25, 75, 10, a, b, c])
              texteCorr = `Le compte est bon : $${cible}=${a}\\times((25+75)+10\\times${b})+${c}$`
          }
          break
      }
      texte = 'Voici le tirage : '
      for (let i = 0; i < 5; i++) {
        texte += `${tirage[i]} ; `
      }
      texte += `${tirage[5]}.<br>`
      texte += `Et le nombre à trouver est : ${cible}.`

      if (this.questionJamaisPosee(i, choix[i], a, b, c)) {
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
