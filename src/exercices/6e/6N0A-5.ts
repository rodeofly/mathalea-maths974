import { texteGras } from '../../lib/format/style'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = "Déterminer le dernier chiffre d'un calcul"
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'

/**
 * Trouver le dernier chiffre d'un calcul (somme, produit, différence)
 * @author Erwan DUPLESSY
 * 6C34
 */

export const uuid = 'b3843'

export const refs = {
  'fr-fr': ['6N0A-5'],
  'fr-2016': ['6C34'],
  'fr-ch': [],
}
export default class DernierChiffre extends Exercice {
  version: number
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      3,
      '1 : Sommes\n2 : Sommes et produits\n3 : Sommes, produits et différences',
    ]
    this.sup = 3
    this.consigne =
      'Pour chaque calcul, déterminer le dernier chiffre du résultat.'
    this.nbQuestions = 4 // Ici le nombre de questions

    this.nbCols = 2 // Le nombre de colonnes dans l'énoncé LaTeX
    this.nbColsCorr = 2 // Le nombre de colonne pour la correction LaTeX

    this.correctionDetailleeDisponible = true
    this.sup = 1 // A décommenter : valeur par défaut d'un premier paramètre
    this.version = 1
  }

  nouvelleVersion() {
    if (this.version === 2) {
      this.sup = 2
    }
    let typeDeQuestionsDisponibles: string[] = []
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['somme']
    }
    if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['somme', 'produit']
    }
    if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['somme', 'produit', 'difference']
    }
    const listeTypeDeQuestions = combinaisonListes(
      typeDeQuestionsDisponibles,
      this.nbQuestions,
    )

    for (
      let i = 0, a = 0, b = 0, texte = '', texteCorr = '', cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 'somme':
          a = randint(11, 999)
          b = randint(11, 999)
          texte = `$ ${a} + ${b}$`
          texteCorr = ''
          if (this.correctionDetaillee) {
            texteCorr += `Le dernier chiffre de $${a} + ${b}$ est le dernier chiffre de $${a % 10} + ${b % 10}$. `
            texteCorr += `Or : $${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)} $<br>`
          }
          texteCorr += texteGras(
            `Le dernier chiffre de $${a} + ${b}$ est : $${(b + a) % 10}$.`,
          )
          setReponse(this, i, (b + a) % 10)

          break
        case 'produit':
          a = randint(11, 999)
          b = randint(11, 999)
          texte = `$${a} \\times ${b}$`
          texteCorr = ''
          if (this.correctionDetaillee) {
            texteCorr += `Le dernier chiffre de $${a} \\times ${b}$ est le dernier chiffre de $${a % 10} \\times ${b % 10}$. `
            texteCorr += `Or : $${a % 10} \\times ${b % 10} = ${(a % 10) * (b % 10)} $<br>`
          }
          texteCorr += texteGras(
            `Le dernier chiffre de $${a} \\times ${b}$ est : $${(b * a) % 10}$.`,
          )
          setReponse(this, i, (b * a) % 10)
          break

        case 'difference':
          b = randint(11, 999)
          a = randint(b + 1, b + 999)
          texte = `$ ${a} - ${b}$`
          texteCorr = ''
          if (this.correctionDetaillee) {
            if ((a % 10) - (b % 10) >= 0) {
              texteCorr += `Le dernier chiffre de $${a} - ${b}$ est égal à : $${a % 10} - ${b % 10} = ${(a % 10) - (b % 10)}$. <br>`
            } else {
              texteCorr += `Comme  $${a % 10} < ${b % 10}$, on doit faire la soustraction : $${(a % 10) + 10} - ${b % 10} = ${(a % 10) + 10 - (b % 10)}$. <br>`
            }
          }
          texteCorr += texteGras(
            `Le dernier chiffre de $${a} - ${b}$ est : $${(a - b) % 10}$.`,
          )
          setReponse(this, i, (a - b) % 10)
          break
      }

      if (context.isHtml && this.interactif)
        texte +=
          '<br>Le chiffre des unités est : ' +
          ajouteChampTexteMathLive(this, i, '')
      if (context.isAmc) {
        this.autoCorrection[i].enonce =
          texte.substring(0, texte.length - 1) +
          '~=$<br>Le chiffre des unités est : '
        this.autoCorrection[i].propositions = [{ texte: texteCorr }]
        // @ts-expect-error trop compliqué à typer
        this.autoCorrection[i].reponse.param.digits = 1
        // @ts-expect-error trop compliqué à typer
        this.autoCorrection[i].reponse.param.decimals = 0
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
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
