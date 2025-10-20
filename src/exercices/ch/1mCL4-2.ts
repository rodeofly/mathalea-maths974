import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'
import FractionEtendue from '../../modules/FractionEtendue'

import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'

import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { vertMathalea, bleuMathalea } from '../../lib/colors'
import PolynomePlusieursVariables from '../../lib/mathFonctions/PolynomePlusieursVariables'
import MonomePlusieursVariables from '../../lib/mathFonctions/MonomePlusieursVariables'

export const titre = 'Résoudre une équation irrationnelle'
export const dateDePublication = '13/11/2024'
export const interactifReady = false
export const interactifType = 'mathLive'
export const uuid = '5f5fa'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['1mCL4-2'],
}

/**
 * @author Nathan Scheinmann
 */

export default class ExerciceEquationSecondDegre extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Type des solutions',
      '1 : Entières\n2 : Au moins une fractionnaire\n3 : Mélange',
    ]
    this.besoinFormulaire2CaseACocher = ['Coefficient dominant égal à 1', false]
    this.besoinFormulaire3CaseACocher = ['Mélanger les termes', false]
    this.sup = 3
    this.sup2 = false
    this.sup3 = false
    this.nbQuestions = 3
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = true
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 2,
      melange: 3,
      defaut: 3,
      listeOfCase: ['entier', 'fraction'],
      nbQuestions: this.nbQuestions,
      shuffle: true,
    })
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )

    if (this.nbQuestions === 1) {
      this.consigne = "Résoudre dans $\\mathbb{R}$ l'équation suivante."
    } else {
      this.consigne = 'Résoudre $\\mathbb{R}$ les équations suivantes.'
    }
    if (this.interactif) {
      this.consigne +=
        " Entrer l'ensembles des solutions en séparant les éléments par un point-virgule. Si une équation n'a pas de solution entrer l'ensemble vide."
    }
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      let a = new FractionEtendue(1, 1)
      let b = new FractionEtendue(1, 1)
      let c = new FractionEtendue(1, 1)
      let d = new FractionEtendue(1, 1)
      let e = new FractionEtendue(1, 1)
      let f = new FractionEtendue(1, 1)
      do {
        if (listeTypeDeQuestions[i] === 'fraction') {
          // do {
          c = new FractionEtendue(randint(-5, 5, [0]), 1)
          d = new FractionEtendue(randint(-5, 5, [0]), 1)
          e = new FractionEtendue(randint(-5, 5, [0]), 1)
          f = new FractionEtendue(randint(-5, 5, [0]), 1)
          if (this.sup2) {
            c = e
          }
          //  while (d.diviseFraction(c).estEntiere || e.diviseFraction(f).estEntiere)
        }
        if (listeTypeDeQuestions[i] === 'entier') {
          d = new FractionEtendue(randint(-5, 5, [0]), 1)
          f = new FractionEtendue(randint(-5, 5, [0]), 1)
        }
        do {
          a = new FractionEtendue(randint(1, 7, [0]), 1)
          b = new FractionEtendue(randint(-7, 7, [0]), 1)
          if (this.sup2) {
            a = c
          }
        } while (a === b)
      } while (
        f.diviseFraction(e).oppose().texFractionSimplifiee ===
        d.diviseFraction(c).oppose().texFractionSimplifiee
      )
      const axP = PolynomePlusieursVariables.createPolynomeFromMonome(
        new MonomePlusieursVariables(a, { variables: ['x'], exposants: [1] }),
      )
      const bP = PolynomePlusieursVariables.createPolynomeFromMonome(
        new MonomePlusieursVariables(b, { variables: ['x'], exposants: [0] }),
      )
      const cxP = PolynomePlusieursVariables.createPolynomeFromMonome(
        new MonomePlusieursVariables(c, { variables: ['x'], exposants: [1] }),
      )
      const dP = PolynomePlusieursVariables.createPolynomeFromMonome(
        new MonomePlusieursVariables(d, { variables: ['x'], exposants: [0] }),
      )
      const exP = PolynomePlusieursVariables.createPolynomeFromMonome(
        new MonomePlusieursVariables(e, { variables: ['x'], exposants: [1] }),
      )
      const fP = PolynomePlusieursVariables.createPolynomeFromMonome(
        new MonomePlusieursVariables(f, { variables: ['x'], exposants: [0] }),
      )

      // Compute (ax + b)^2
      const axPlusB = axP.somme(bP)
      const squaredTerm = axPlusB.produit(axPlusB)

      // Compute (cx + d)(ex + f)
      const cxPlusD = cxP.somme(dP)
      const exPlusF = exP.somme(fP)
      const productTerm = cxPlusD.produit(exPlusF)
      // Compute the difference: (ax + b)^2 - (cx + d)(ex + f)
      const mdd = squaredTerm.difference(productTerm).reduire()
      let mdg = axPlusB.reduire()
      const mdgInit = axPlusB.reduire()
      const sol2 = f.diviseFraction(e).oppose()
      const sol1 = d.diviseFraction(c).oppose()
      let polySup = new MonomePlusieursVariables(0, {
        variables: ['x'],
        exposants: [2],
      })
      if (this.sup3) {
        const choix = randint(0, 1)
        polySup = new MonomePlusieursVariables(
          mdg.monomes[choix].coefficient,
          mdg.monomes[choix].partieLitterale,
        )
        mdg = mdg.difference(polySup).reduire()
        texte += `$${mdg.toString()}=${polySup.oppose().toString()}+\\sqrt{${mdd.toString()}}$`
      } else {
        texte += `$${mdg.toString()}=\\sqrt{${mdd.toString()}}$`
      }
      const vSubSol1Mdg = mdg.evaluer({ x: sol1 }).texFractionSimplifiee
      // build the FractionEtendue object to get the square root by regexing the tex expression \\dfrac{num}{den}
      const texRacineMdd1 = mdd.evaluer({ x: sol1 }).texRacineCarree()
      const texRacineMdd2 = mdd.evaluer({ x: sol2 }).texRacineCarree()
      // check if texRacineMdd1 is a fraction
      let numDen1 = [1, 1]
      let numDen2 = [1, 1]
      if (!texRacineMdd1.includes('\\dfrac')) {
        numDen1 = [Number(texRacineMdd1), Number('1')]
      } else {
        numDen1 = texRacineMdd1.match(/\\dfrac{(\d+)}{(\d+)}/)?.slice(1)
      }
      if (!texRacineMdd2.includes('\\dfrac')) {
        numDen2 = [Number(texRacineMdd2), Number('1')]
      } else {
        numDen2 = texRacineMdd2.match(/\\dfrac{(\d+)}{(\d+)}/)?.slice(1)
      }
      const vSubSol1Mdd = new FractionEtendue(
        Number(numDen1[0]),
        Number(numDen1[1]),
      ).sommeFraction(
        polySup.oppose().evaluer({ x: sol1 }),
      ).texFractionSimplifiee
      const vSubSol2Mdg = mdg.evaluer({ x: sol2 }).texFractionSimplifiee
      const vSubSol2Mdd = new FractionEtendue(
        Number(numDen2[0]),
        Number(numDen2[1]),
      ).sommeFraction(
        polySup.oppose().evaluer({ x: sol2 }),
      ).texFractionSimplifiee
      let ensembleSol = '\\left\\{'
      // on considère les solutions qui valent pareilles pour les deux membres de l'équation
      if (vSubSol1Mdg === vSubSol1Mdd) {
        ensembleSol += sol1.texFractionSimplifiee
      }
      if (vSubSol2Mdg === vSubSol2Mdd) {
        if (ensembleSol !== '\\left\\{') {
          ensembleSol += ';'
        }
        ensembleSol += sol2.texFractionSimplifiee
      }
      ensembleSol += '\\right\\}'
      if (ensembleSol === '\\left\\{\\right\\}') {
        ensembleSol = '\\emptyset'
      }
      texte +=
        '<br><br>' +
        ajouteChampTexteMathLive(this, 2 * i + 1, 'clavierFullOperations', {
          texteAvant:
            "Donner l'ensemble des solutions en séparant chaque solution par un point-virgule $S=$",
        })
      texteCorr += ' '
      texteCorr += '$\\begin{aligned}'
      if (this.sup3) {
        // mdg = mdg.somme(polySup).reduire()
        texteCorr += `&\\phantom{\\implies} ${mdg.toString()}=${polySup.oppose().toString()}+\\sqrt{${mdd.toString()}}\\\\
      &\\iff ${mdgInit.toString()}=\\sqrt{${mdd.toString()}}\\quad\\text{on a isolé la racine carrée}\\\\`
      } else {
        texteCorr += `&\\phantom{\\implies} ${mdgInit.toString()}=\\sqrt{${mdd.toString()}}\\\\`
      }
      texteCorr += `&\\implies \\left(${mdgInit.toString()}\\right)^2=${mdd.toString()} \\quad\\text{on a élevé au carré}\\\\`
      texteCorr += `&\\implies ${mdgInit.produit(mdgInit).reduire().toString()}=${mdd.toString()}\\quad \\text{on a développé}\\\\`
      texteCorr += `&\\implies ${mdgInit.produit(mdgInit).reduire().difference(mdd).reduire().toString()}=0\\quad \\text{on a comparé à zéro}\\\\`
      texteCorr += `&\\implies \\left (${cxPlusD}\\right)\\left (${exPlusF}\\right)=0\\quad \\text{on résout l'équation (ici par factorisation)}\\\\ `
      texteCorr += `&\\implies ${cxPlusD}=0\\quad \\text{ou} \\quad ${exPlusF}=0\\quad \\text{on a appliqué le théorème du produit nul}\\\\ `
      texteCorr += `&\\implies x=${sol1.texFractionSimplifiee}\\quad \\text{ou} \\quad x=${sol2.texFractionSimplifiee} \\quad \\text{on a résolu les équations}\\\\`
      texteCorr += '\\end{aligned}$'
      texteCorr += '<br>'
      texteCorr += `On vérifie à présent les solutions obtenues.
      <br>
      Pour $x=${sol1.texFractionSimplifiee}$ :<br>
      $${mdg.toStringEvaluate({ x: sol1 })}=${miseEnEvidence(vSubSol1Mdg, bleuMathalea)}$ ${vSubSol1Mdg === vSubSol1Mdd ? 'et' : 'tandis que'} $${this.sup3 ? polySup.oppose().toStringEvaluate({ x: sol1 }) + '+' : ''}\\sqrt{${mdd.toStringEvaluate({ x: sol1 })}}=${miseEnEvidence(vSubSol1Mdd, `${vSubSol1Mdg === vSubSol1Mdd ? bleuMathalea : vertMathalea}`)}$, donc $${sol1.texFractionSimplifiee}$ ${vSubSol1Mdd === vSubSol1Mdg ? 'est' : "n'est pas"} solution de l'équation.<br>
      Pour $x=${sol2.texFractionSimplifiee}$ :<br>
      $${mdg.toStringEvaluate({ x: sol2 })}=${miseEnEvidence(vSubSol2Mdg, bleuMathalea)}$ ${vSubSol2Mdg === vSubSol2Mdd ? 'et' : 'tandis que'} $${this.sup3 ? polySup.oppose().toStringEvaluate({ x: sol2 }) + '+' : ''}\\sqrt{${mdd.toStringEvaluate({ x: sol2 })}}=${miseEnEvidence(vSubSol2Mdd, `${vSubSol2Mdg === vSubSol2Mdd ? bleuMathalea : vertMathalea}`)}$, donc $${sol2.texFractionSimplifiee}$ ${vSubSol2Mdd === vSubSol2Mdg ? 'est' : "n'est pas"} solution de l'équation.<br>
      Ainsi, l'ensemble des solutions de l'équation est $S=${miseEnEvidence(ensembleSol)}$.`

      handleAnswers(this, i, {
        reponse: {
          value: `${ensembleSol}`,
          options: { ensembleDeNombres: true },
        },
      })
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
