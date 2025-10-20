import { ajouteQuestionMathlive } from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { context } from '../../modules/context'
import { gestionnaireFormulaireTexte, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const uuid = 'd1861'
export const titre = 'Multiplier en utilisant la distributivité'
export const refs = {
  'fr-fr': ['5C12-6'],
  'fr-ch': ['1mCL1-14', '10FA2-5', '11FA2-21'],
}
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '09/12/2024'
export const dateDeModifImportante = '03/04/2025'

/**
 * @author Jean-Claude LHOTE
 * Un exercice pour travailler la distributivité de la multiplication sur l'addition ou la soustraction de façon simple
 */
export default class MultiplierEnDistribuant extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 5
    this.besoinFormulaireTexte = [
      'Type de question',
      [
        'Nombres séparés par des tirets  :',
        '1 : avec des sommes',
        '2 : avec des différences',
        '3 : avec des sommes et des différences',
      ].join('\n'),
    ]
    this.sup = '3'
    this.besoinFormulaire2Texte = [
      'Sens de la distributivité',
      [
        'Nombres séparés par des tirets  :',
        '1 : développer',
        '2 : factoriser',
        '3 : Mélange',
      ].join('\n'),
    ]
    this.sup2 = '3'
    this.comment = `Pour le développement, il y a un parti pris de choisir l'addition pour les nombres se finissant par 1, 2, 3 et la soustraction pour les nombres se finissant par 8 ou 9.<br>
  N'hésitez pas à me faire part de vos remarques et suggestions.`
  }

  nouvelleVersion(): void {
    if (context.isDiaporama) this.consigne = 'Calculer mentalement'
    else {
      this.consigne =
        this.nbQuestions > 1
          ? "Calculer les produits suivants en utilisant la distributivité de la multiplication sur l'addition ou la soustraction."
          : "Calculer le produit suivant en utilisant la distributivité de la multiplication sur l'addition ou la soustraction."
    }
    if (this.interactif)
      this.consigne +=
        "<br>Écrire seulement le résultat sous forme d'un nombre entier."

    const listeTypesDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      nbQuestions: this.nbQuestions,
      min: 1,
      max: 2,
      melange: 3,
      defaut: 3,
    })
    const sensDesQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup2,
      nbQuestions: this.nbQuestions,
      min: 1,
      max: 2,
      melange: 3,
      defaut: 3,
    })
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const a = randint(3, 9) * 10
      let b: number
      let texte: string
      let texteCorr: string
      let dizaineSupOuInf: number
      let reponse: string
      switch (sensDesQuestions[i]) {
        case 1:
          switch (listeTypesDeQuestions[i]) {
            case 1:
              b = randint(1, 3) + randint(2, 3) * 10
              dizaineSupOuInf = Math.floor(b / 10) * 10
              texte = `$${a} \\times ${b}$`
              texteCorr = `$\\begin{aligned}${a} \\times ${b}
              &=${a}\\times (${dizaineSupOuInf} + ${b % 10})\\\\
              &= ${a}\\times ${dizaineSupOuInf} + ${a}\\times ${b % 10}\\\\
              &= ${a * dizaineSupOuInf}+${a * (b % 10)}\\\\
              &=${a * b}
              \\end{aligned}$`
              break
            default:
              b = randint(2, 3) * 10 - choice([1, 2])
              dizaineSupOuInf = Math.ceil(b / 10) * 10
              texte = `$${a} \\times ${b}$`
              texteCorr = `$\\begin{aligned}${a} \\times ${b}
              &=  ${a}\\times (${dizaineSupOuInf} - ${dizaineSupOuInf - b})\\\\
              &= ${a}\\times ${dizaineSupOuInf} - ${a}\\times ${dizaineSupOuInf - b}\\\\
              &= ${a * dizaineSupOuInf}-${a * (dizaineSupOuInf - b)}\\\\
              &=${a * b}
              \\end{aligned}$`
              break
          }
          reponse = String(a * b)
          break
        default: {
          let c: number
          switch (listeTypesDeQuestions[i]) {
            case 1:
              b = randint(1, 3) + randint(1, 3) * 10
              c = 10 - (b % 10) + randint(1, 6) * 10
              texte = `$${a} \\times ${b}+${a} \\times ${c}$`
              texteCorr = `$\\begin{aligned}${a} \\times ${b}+${a} \\times ${c} &= ${a}\\times (${b} + ${c})\\\\ &= ${a} \\times ${b + c}\\\\ &=${a * (b + c)}\\end{aligned}$`
              break
            default:
              b = randint(6, 9) * 10 - choice([1, 2])
              c = b - randint(2, 5) * 10
              texte = `$${a} \\times ${b}-${a} \\times ${c}$`
              texteCorr = `$\\begin{aligned}${a} \\times ${b}-${a} \\times ${c} &= ${a}\\times (${b} - ${c})\\\\ &= ${a} \\times ${b - c}\\\\ &=${a * (b - c)}\\end{aligned}$`
              break
          }
          reponse = String(a * (b - c))
          break
        }
      }
      texte += ajouteQuestionMathlive({
        exercice: this,
        question: i,
        objetReponse: {
          reponse: {
            value: reponse,
            options: { nombreDecimalSeulement: true },
          },
        },
        typeInteractivite: 'mathlive',
        texteAvant: ' $=$ ',
      })
      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
  }
}
