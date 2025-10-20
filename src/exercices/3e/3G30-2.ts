import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import Decimal from 'decimal.js'
import { stringNombre } from '../../lib/outils/texNombre'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { sp } from '../../lib/outils/outilString'

export const titre = 'Résoudre une équation trigonométrique'
export const dateDePublication = '20/11/2023'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '20/02/2024'

/**
 * Résoudre une équation trigonométrique
 * @author Rémi Angot
 */
export const uuid = 'f13e3'

export const refs = {
  'fr-fr': ['3G30-2'],
  'fr-ch': ['1mT-4'],
}

class EquationTrigo extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 3
    this.spacingCorr = 3
    this.sup = 3
    this.besoinFormulaireNumerique = [
      'Type des questions',
      3,
      "1 : Calculs de longueurs\n2 : Calculs de mesures d'angles\n3 : Calculs de longueurs et de mesures d'angles",
    ]
  }

  nouvelleVersion(): void {
    type TypeQuestionsDisponibles = 'num' | 'den' | 'angle'
    type Trigo = 'cos' | 'sin' | 'tan'
    let typeQuestionsDisponibles: TypeQuestionsDisponibles[]
    if (this.sup === 1) {
      typeQuestionsDisponibles = ['num', 'den']
    } else if (this.sup === 2) {
      typeQuestionsDisponibles = ['angle']
    } else {
      typeQuestionsDisponibles = ['num', 'den', 'angle']
    }
    const typeFormuleTrigo = ['cos', 'sin', 'tan'] as Trigo[]

    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    ) as TypeQuestionsDisponibles[]
    const listeFonctions = combinaisonListes(
      typeFormuleTrigo,
      this.nbQuestions,
    ) as Trigo[]
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      // Lettre entre A et X
      const indicFirstLetter = 65 + Math.floor(Math.random() * 24)
      const nomA = String.fromCharCode(indicFirstLetter)
      const nomB = String.fromCharCode(indicFirstLetter + 1)
      const nomC = String.fromCharCode(indicFirstLetter + 2)
      let texte = `Dans le triangle rectangle $${nomA}${nomB}${nomC}$, on a : `
      const lAB = new Decimal(randint(30, 90)).div(10)
      let lBC: Decimal
      let reponse: number
      const angle = randint(25, 75)
      const cosSinTan = listeFonctions[i]
      let texteCorr = ''

      switch (listeTypeQuestions[i]) {
        case 'den':
          texte += `$\\${cosSinTan}\\left( ${angle} ^\\circ \\right) = \\dfrac{${stringNombre(lAB, 1)}}{${nomA}${nomC}}$.<br>`
          switch (cosSinTan) {
            case 'cos':
              reponse = lAB
                .div(new Decimal(Math.cos((angle * Math.PI) / 180)))
                .times(10)
                .round()
                .div(10)
                .toNumber()
              break
            case 'sin':
              reponse = lAB
                .div(new Decimal(Math.sin((angle * Math.PI) / 180)))
                .times(10)
                .round()
                .div(10)
                .toNumber()
              break
            case 'tan':
              reponse = lAB
                .div(new Decimal(Math.tan((angle * Math.PI) / 180)))
                .times(10)
                .round()
                .div(10)
                .toNumber()
              break
          }
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i, '', {
              texteAvant: `$${nomA}${nomC} \\approx$`,
              texteApres: sp(10) + ' (valeur approchée au dixième près)',
            })
          } else {
            texte += `Calculer la longueur $${nomA}${nomC}$ (au dixième près).`
          }
          texteCorr = `$\\${cosSinTan}\\left( ${angle} ^\\circ \\right) = \\dfrac{${stringNombre(lAB, 1)}}{${nomA}${nomC}}$<br>
          $${nomA}${nomC} = \\dfrac{${stringNombre(lAB, 1)}}{\\${cosSinTan}\\left( ${angle} ^\\circ \\right)}$<br>
          $${nomA}${nomC} \\approx ${miseEnEvidence(stringNombre(reponse, 1))}$`
          break
        case 'num':
          texte += `$\\${cosSinTan}\\left( ${angle} ^\\circ \\right) = \\dfrac{${nomA}${nomC}}{${stringNombre(lAB, 1)}}$.<br>`
          switch (cosSinTan) {
            case 'cos':
              reponse = lAB
                .times(new Decimal(Math.cos((angle * Math.PI) / 180)))
                .times(10)
                .round()
                .div(10)
                .toNumber()
              break
            case 'sin':
              reponse = lAB
                .times(new Decimal(Math.sin((angle * Math.PI) / 180)))
                .times(10)
                .round()
                .div(10)
                .toNumber()
              break
            case 'tan':
              reponse = lAB
                .times(new Decimal(Math.tan((angle * Math.PI) / 180)))
                .times(10)
                .round()
                .div(10)
                .toNumber()
              break
          }
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i, '', {
              texteAvant: `$${nomA}${nomC} \\approx$`,
              texteApres: sp(10) + ' (valeur approchée au dixième près)',
            })
          } else {
            texte += `Calculer la longueur $${nomA}${nomC}$ (au dixième près).`
          }
          texteCorr = `$\\${cosSinTan}\\left( ${angle} ^\\circ \\right) = \\dfrac{${nomA}${nomC}}{${stringNombre(lAB, 1)}}$<br>
          $${nomA}${nomC} = ${stringNombre(lAB, 1)} \\times \\${cosSinTan}\\left( ${angle} ^\\circ \\right) $<br>
          $${nomA}${nomC} \\approx ${miseEnEvidence(stringNombre(reponse, 1))}$`
          break
        case 'angle':
          lBC = new Decimal(randint(lAB.times(10).toNumber(), 120)).div(10)
          texte += `$\\${cosSinTan}\\left( \\widehat{${nomA}${nomB}${nomC}} \\right) = \\dfrac{${stringNombre(lAB, 1)}}{${stringNombre(lBC, 1)}}$.<br>`
          switch (cosSinTan) {
            case 'cos':
              reponse = Math.round(
                (Math.acos(lAB.div(lBC).toNumber()) * 180) / Math.PI,
              )
              break
            case 'sin':
              reponse = Math.round(
                (Math.asin(lAB.div(lBC).toNumber()) * 180) / Math.PI,
              )
              break
            case 'tan':
              reponse = Math.round(
                (Math.atan(lAB.div(lBC).toNumber()) * 180) / Math.PI,
              )
              break
          }
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, i, '', {
              texteAvant: `$\\widehat{${nomA}${nomB}${nomC}}\\approx$`,
              texteApres: '°' + sp(10) + ' (valeur approchée au degré près)',
            })
          } else {
            texte += `Calculer la mesure l'angle $\\widehat{${nomA}${nomB}${nomC}}$ (au degré près).`
          }
          texteCorr = `$\\${cosSinTan}\\left( \\widehat{${nomA}${nomB}${nomC}} \\right) = \\dfrac{${stringNombre(lAB, 1)}}{${stringNombre(lBC, 1)}}$<br>
          $\\widehat{${nomA}${nomB}${nomC}} = \\arc${cosSinTan} \\left( \\dfrac{${stringNombre(lAB, 1)}}{${stringNombre(lBC, 1)}} \\right)$<br>
          $\\widehat{${nomA}${nomB}${nomC}} \\approx ${miseEnEvidence(stringNombre(reponse, 0))}^\\circ$`
          break
      }
      setReponse(this, i, reponse)
      if (this.questionJamaisPosee(i, cosSinTan, angle, lAB.toFixed(1))) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
  }
}

export default EquationTrigo
