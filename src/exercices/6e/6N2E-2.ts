import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { texNombre2 } from '../../lib/outils/texNombre'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { propositionsQcm } from '../../lib/interactif/qcm'
import Exercice from '../Exercice'
import { arrondi } from '../../lib/outils/nombres'

export const amcReady = true
export const amcType = 'qcmMono'
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Effectuer des opérations avec les nombres décimaux'

/**
 * @author Erwan Duplessy
 * 6C30-1
 * Trouver la réposne exacte. 4 cas :
 * - somme de deux entiers
 * - produit de deux entiers
 * - somme de deux décimaux
 * - produit de deux décimaux
 * date : 2021/02/15
 */

export const uuid = '36573'

export const refs = {
  'fr-fr': ['6N2E-2'],
  'fr-2016': ['6C30-3'],
  'fr-ch': ['9NO8-11'],
}
export default class MultiplicationMentalDecimaux extends Exercice {
  constructor() {
    super()
    this.interactif = true // Il n'existe pas de version non QCM
    this.consigne =
      'Trouver la réponse exacte du calcul parmi les réponses proposées.'
    this.nbQuestions = 4 // Ici le nombre de questions
  }

  nouvelleVersion() {
    const typeDeQuestionsDisponibles = ['add', 'mul', 'add_deci', 'mul_deci'] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListes(
      typeDeQuestionsDisponibles,
      this.nbQuestions,
    )
    this.interactif = true // Il n'existe pas de version non QCM
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      let a = 0
      let b = 0 // les deux opérandes

      switch (
        listeTypeDeQuestions[i] // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
      ) {
        case 'add':
          a = 10 * randint(1, 9) + randint(1, 9)
          b = 10 * randint(1, 9) + randint(1, 9)
          texte += `Calcul : $${a} + ${b}$.`
          texteCorr += `$${a} + ${b}=${texNombre2(arrondi(a + b))}$`

          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(arrondi(a + b))}$`,
              statut: true,
            },
            {
              texte: `$${texNombre2(arrondi(a * b))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(arrondi((a + b) / 10))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(arrondi(10 * (a + b)))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(arrondi(a + b + 1))}$`,
              statut: false,
            },
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5,
          }
          break

        case 'mul':
          a = 10 * randint(1, 9) + randint(1, 9)
          b = 10 * randint(1, 9) + randint(1, 9)
          texte += `Calcul : $${a} \\times ${b}$.`
          texteCorr += `$${a} \\times ${b}=${texNombre2(arrondi(a * b))}$`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(a * b)}$`,
              statut: true,
            },
            {
              texte: `$${texNombre2(10 * a * b)}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2((a * b) / 10)}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(a + b)}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(a * b + 1)}$`,
              statut: false,
            },
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5,
          }
          break

        case 'add_deci':
          a =
            1000 * randint(1, 9) +
            100 * randint(0, 9, [3, 4, 5, 6, 7]) +
            10 * randint(0, 9) +
            randint(0, 9)
          b =
            1000 * randint(1, 9) +
            100 * randint(0, 9, [3, 4, 5, 6, 7]) +
            10 * randint(0, 9) +
            randint(0, 9)
          texte += `Calcul : $${texNombre2(a / 100)} + ${texNombre2(b / 100)}$.`
          texteCorr += ` $${texNombre2(a / 100)} + ${texNombre2(b / 100)}=${texNombre2(arrondi(a / 100 + b / 100))}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(arrondi((a + b) / 100))}$`,
              statut: true,
            },
            {
              texte: `$${texNombre2(arrondi((a * b) / 100))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(arrondi((a + b) / 1000))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(arrondi((10 * (a + b)) / 100))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(arrondi((a + b + 1) / 100))}$`,
              statut: false,
            },
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5,
          }
          break

        case 'mul_deci':
          // a et b sont des nombres à 4 chiffres, dont 2 avant la virgule
          // on multiplie par 100 pour travailler avec des nombres entiers. Par ex : 6547 plutôt que 65.47
          a =
            1000 * randint(1, 9) +
            100 * randint(1, 9, [3, 4, 5, 6, 7]) +
            10 * randint(1, 9) +
            randint(0, 9, [2, 5]) // on évite le 2*5 avec les derniers chiffres
          b =
            1000 * randint(1, 9) +
            100 * randint(1, 9, [3, 4, 5, 6, 7]) +
            10 * randint(1, 9) +
            randint(0, 9)
          texte += `Calcul : $${texNombre2(a / 100)} \\times ${texNombre2(b / 100)}$.`
          texteCorr += `$${texNombre2(a / 100)} \\times ${texNombre2(b / 100)}=${texNombre2(arrondi((a * b) / 10000))}$.`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(arrondi((a * b) / 10000))}$`,
              statut: true,
            },
            {
              texte: `$${texNombre2(arrondi((10 * a * b) / 10000))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(arrondi((a * b) / 100000))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(arrondi((a + b) / 100))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(arrondi((a * b + 1) / 10000))}$`,
              statut: false,
            },
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5,
          }
          break
      }
      const props = propositionsQcm(this, i)

      if (this.interactif) {
        texte += '<br>' + props.texte
      }

      if (this.questionJamaisPosee(i, a, b)) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
