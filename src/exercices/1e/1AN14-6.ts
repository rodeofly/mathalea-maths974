import engine, {
  functionCompare,
} from '../../lib/interactif/comparisonFunctions'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { Polynome } from '../../lib/mathFonctions/Polynome'
import { ecritureAlgebrique } from '../../lib/outils/ecritures'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import FractionEtendue from '../../modules/FractionEtendue'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Trinome from '../../modules/Trinome'
import Exercice from '../Exercice'

export const titre = 'Dériver $\\dfrac{u}{v}$'
export const dateDePublication = '22/01/2022'
export const dateDeModifImportante = '07/05/2024'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Calculer la dérivée d'un quotient
 * @author Jean-Léon Henry
 * Finalisé par Jean-Claude Lhote

 */

export const uuid = 'b32f2'
export const refs = {
  'fr-fr': ['1AN14-6'],
  'fr-ch': [],
}

type TypeDeQuotient =
  | 'poly1a/poly1'
  | 'mon/poly1'
  | 'poly/poly1'
  | 'mon/poly2centre'
  | 'exp/poly1'
type TypeDeFonction =
  | 'mon'
  | 'racine'
  | 'poly1'
  | 'poly2centre'
  | 'poly'
  | 'exp'

export default class DeriveeQuotient extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Types de fonctions : ',
      'Nombres séparés par des tirets :\n1 : (ax+b)/(cx+d)\n2 : ax^n/(cx+d)\n3 : (ax²+bx+c)/(ex+f)\n4 ax^n/(ax²+bx+c)\n5 : Mélange',
    ]
    this.besoinFormulaire2CaseACocher = [
      'Montrer que... (non interactif)',
      false,
    ]
    // this.consigne = "Pour chacune des fonctions suivantes, dire sur quel ensemble elle est dérivable, puis déterminer l'expression de sa fonction dérivée."
    this.consigne =
      "Pour chacune des fonctions suivantes, déterminer l'expression de sa fonction dérivée."
    this.nbQuestions = 5
    // Sortie LaTeX
    this.nbCols = 2 // Nombre de colonnes
    this.nbColsCorr = 2 // Nombre de colonnes dans la correction
    this.sup = '5'
    this.sup2 = false
  }

  nouvelleVersion() {
    const listeValeurs: string[] = [] // Les questions sont différentes du fait du nom de la fonction, donc on stocke les valeurs
    if (this.sup2) {
      this.interactifReady = false
    } else {
      this.interactifReady = true
    }
    // Types d'énoncés
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      nbQuestions: this.nbQuestions,
      listeOfCase: [
        'poly1a/poly1',
        'mon/poly1',
        'poly/poly1',
        'mon/poly2centre',
      ],
      min: 1,
      max: 4,
      melange: 5,
      defaut: 1,
    }).map(String) as TypeDeQuotient[]
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      let expression = ''
      let maReponse = ''

      // On créé les coefficients d'un monome x^m qu'ont va générer
      const coeffs = new Array(randint(2, 9)) // Au moins 2 coeffs, i.e. deg >= 1
      coeffs.fill(0)
      coeffs.push(1) // on ajoute un coeff donc deg >= 2
      // On génère des fonctions qui pourrait servir
      const dictFonctions = {
        exp: 'e^x',
        mon: new Polynome({ coeffs }),
        poly1: new Polynome({ rand: true, deg: 1 }),
        poly1a: new Polynome({ rand: true, deg: 1 }),
        poly2centre: new Polynome({
          rand: true,
          coeffs: [[10, true], 0, [10, true]],
        }),
        poly: new Polynome({ rand: true, deg: 2 }),
        monome2: new Polynome({ rand: true, coeffs: [0, 0, [10, true]] }),
        racine: 'sqrt(x)',
      }
      const listeTypeFonctions = listeTypeDeQuestions[i].split(
        '/',
      ) as TypeDeFonction[]
      const typeNum = listeTypeFonctions[0]
      const typeDen = listeTypeFonctions[1]
      // Extraction des fonctions
      const fNum = dictFonctions[typeNum]
      const fDen = dictFonctions[typeDen]
      const termeNum = engine.parse(
        ['pol', 'mon'].includes(typeNum.substr(0, 3))
          ? (fNum as Polynome).toMathExpr()
          : (fNum as string),
      )
      const termeDen = engine.parse(
        ['pol', 'mon'].includes(typeDen.substr(0, 3))
          ? (fDen as Polynome).toMathExpr()
          : (fDen as string),
      )
      expression = `(${termeNum.latex})/(${termeDen.latex})`

      // Énoncé
      const nameF = [
        'f',
        'g',
        'h',
        'l',
        'm',
        'p',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'b',
        'c',
        'd',
        'e',
      ][i % 16]
      texte = ''
      texte += `$${nameF}(x)=${engine.parse(expression).simplify().latex}$`
      // Correction
      const derNum = engine.box(['D', termeNum, 'x']).evaluate()
      const derDen = engine.box(['D', termeDen, 'x']).evaluate()
      texteCorr = ''
      // texteCorr = `$${nameF}$ est dérivable sur $${ensembleDerivation}$. Soit $x\\in${ensembleDerivation}$.<br>`
      texteCorr +=
        "On rappelle le cours : si $u,v$ sont  deux fonctions dérivables sur un même intervalle $I$, et que $v$ ne s'annule pas sur $I$ alors leur quotient est dérivable sur $I$ et on a la formule : "
      texteCorr +=
        "\\[\\left(\\frac{u}{v}\\right)'=\\frac{u'\\times v-u\\times v'}{v^2}.\\]"
      texteCorr += `Ici $${nameF}=\\frac{u}{v}$ avec : `
      texteCorr += `\\[\\begin{aligned}u(x)&=${termeNum.latex},\\ u'(x)=${derNum.latex}\\\\ v(x)&=${termeDen.latex},\\ v'(x)=${derDen.latex}.\\end{aligned}\\]`
      let df = ''
      switch (listeTypeDeQuestions[i]) {
        case 'poly1a/poly1':
        case 'poly/poly1': {
          // fDen = cx+d
          const c = (fDen as Polynome).monomes[1]
          const d = (fDen as Polynome).monomes[0]
          const valI = new FractionEtendue(-d, Number(c))
          if (valI == null) {
            window.notify(
              "Erreur dans la détermination de l'ensemble de dérivation",
              { c, d },
            )
          }
          df = `\\R\\backslash\\{${valI.texFractionSimplifiee}\\}`
          texteCorr += `Ici la formule ci-dessus est applicable pour tout $x$ tel que $${termeDen.latex}\\neq 0$. C'est-à-dire $x\\neq${valI.texFractionSimplifiee}$.<br>`
          texteCorr += 'On obtient alors : '
          if (Number((fNum as Polynome).deg) === 1) {
            // fNum = ax+b
            const a = (fNum as Polynome).monomes[1]
            const b = (fNum as Polynome).monomes[0]
            texteCorr += `\\[${nameF}'(x)=\\frac{${a}(${termeDen.latex})-(${termeNum.latex})\\times${Number(c) < 0 ? `(${c})` : c}}{(${termeDen.latex})^2}.\\]`
            texteCorr += "D'où, en développant le numérateur : "
            texteCorr += `\\[${nameF}'(x)=\\frac{${(fDen as Polynome).multiply(a)}-(${(fNum as Polynome).multiply(c)})}{(${termeDen.latex})^2}.\\]`
            texteCorr += 'Les termes en $x$ se compensent et on obtient : '
            texteCorr += `\\[${nameF}'(x)=\\frac{${Number(a) * Number(d)}${ecritureAlgebrique(-c * Number(b))}}{(${termeDen.latex})^2}.\\]`
            texteCorr += "C'est-à-dire : "
            texteCorr += `$${miseEnEvidence(`${nameF}'(x)=\\frac{${Number(a) * Number(d) - Number(c) * Number(b)}}{(${termeDen.latex})^2}`)}$.`
            maReponse = `\\frac{${Number(a) * Number(d) - Number(c) * Number(b)}}{(${termeDen.latex})^2}`
          } else if ((fNum as Polynome).deg === 2) {
            texteCorr += `\\[${nameF}'(x)=\\frac{(${(fNum as Polynome).derivee()})(${termeDen.latex})-(${termeNum.latex})\\times${Number(c) < 0 ? `(${c})` : c}}{(${termeDen.latex})^2}.\\]`
            texteCorr += "D'où, en développant le numérateur : "
            const polyInterm = (fNum as Polynome)
              .derivee()
              .multiply(fDen as Polynome)
            texteCorr += `\\[${nameF}'(x)=\\frac{${polyInterm}-(${(fNum as Polynome).multiply(c)})}{(${termeDen.latex})^2}.\\]`
            texteCorr += 'On réduit le numérateur pour obtenir : '
            maReponse = `\\frac{${polyInterm.add((fNum as Polynome).multiply(-c))}}{(${termeDen.latex})^2}`
            texteCorr += `$${miseEnEvidence(`${nameF}'(x)=${maReponse}`)}$.<br>`
            texteCorr += `${texteEnCouleurEtGras('Remarque :', 'black')} la plupart du temps, on veut le signe de la dérivée. Il serait donc plus logique de factoriser le numérateur si possible, mais cela sort du cadre de cet exercice.`
          }
          break
        }
        case 'mon/poly2centre':
          {
            const c = (fDen as Polynome).monomes[2]
            const d = (fDen as Polynome).monomes[0]
            df = '\\R'
            const fDenDer = (fDen as Polynome).derivee().toLatex()
            if (Number(c) * Number(d) > 0) {
              texteCorr += `Ici la formule ci-dessus est applicable pour tout $x$ car $${termeDen.latex}${Number(c) < 0 ? '<0' : '>0'}$ pour tout $x$.<br>`
            } else {
              const trinom = new Trinome(Number(c), 0, Number(d))
              const [racine1, racine2] = [trinom.texX1, trinom.texX2]
              df = `\\R\\backslash\\{${racine1};${racine2}\\}`
              const valeurInterdite1 = racine1
              const valeurInterdite2 = racine2
              texteCorr += `Ici la formule ci-dessus est applicable pour tout $x$ tel que $${termeDen.latex}\\neq 0$. C'est-à-dire $x\\neq${valeurInterdite1}$ et $x\\neq${valeurInterdite2}$.<br>`
            }
            texteCorr += 'On obtient alors : '
            texteCorr += `\\[${nameF}'(x)=\\frac{${(fNum as Polynome).derivee()}(${fDen})-${fNum}\\times${fDenDer.startsWith('-') ? `(${fDenDer})` : `${fDenDer}`}}{(${termeDen.latex})^2}.\\]`
            texteCorr += "D'où, en développant le numérateur : "
            texteCorr += `\\[${nameF}'(x)=\\frac{${(fNum as Polynome).derivee().multiply(fDen as Polynome)}${(fNum as Polynome).multiply((fDen as Polynome).derivee().multiply(-1)).toMathExpr(true)}}{(${termeDen.latex})^2}.\\]`
            texteCorr += 'On simplifie pour obtenir :'
            maReponse = `\\frac{${(fNum as Polynome)
              .derivee()
              .multiply(fDen as Polynome)
              .add(
                (fNum as Polynome).multiply(
                  (fDen as Polynome).derivee().multiply(-1),
                ),
              )}}{(${termeDen.latex})^2}`
            texteCorr += `$${miseEnEvidence(`${nameF}'(x)=${maReponse}.`)}$.<br>`
            texteCorr += `${texteEnCouleurEtGras('Remarque :', 'black')} la plupart du temps, on veut le signe de la dérivée. Il serait donc plus logique de factoriser le numérateur, mais cela sort du cadre de cet exercice.`
          }
          break
        case 'mon/poly1': {
          // fDen = cx+d
          const c = (fDen as Polynome).monomes[1]
          const d = (fDen as Polynome).monomes[0]
          const valI = new FractionEtendue(-d, Number(c))
          df = `\\R\\backslash\\{${valI.texFractionSimplifiee}\\}`
          texteCorr += `Ici la formule ci-dessus est applicable pour tout $x$ tel que $${termeDen.latex}\\neq 0$. C'est-à-dire $x\\neq${valI.texFractionSimplifiee}$.<br>`
          texteCorr += 'On obtient alors : '
          texteCorr += `\\[${nameF}'(x)=\\frac{${(fNum as Polynome).derivee()}(${fDen})-${fNum}\\times${Number(c) < 0 ? `(${c})` : c}}{(${termeDen.latex})^2}.\\]`
          texteCorr += "D'où, en développant le numérateur : "
          texteCorr += `\\[${nameF}'(x)=\\frac{${(fNum as Polynome).derivee().multiply(fDen as Polynome)}${(fNum as Polynome).multiply(-c).toMathExpr(true)}}{(${termeDen.latex})^2}.\\]`
          texteCorr += 'On simplifie pour obtenir :'
          maReponse = `\\frac{${(fNum as Polynome)
            .derivee()
            .multiply(fDen as Polynome)
            .add((fNum as Polynome).multiply(-c))}}{(${termeDen.latex})^2}`
          texteCorr += `$${miseEnEvidence(`${nameF}'(x)=${maReponse}`)}$.<br>`
          texteCorr += `${texteEnCouleurEtGras('Remarque :', 'black')} la plupart du temps, on veut le signe de la dérivée. Il serait donc plus logique de factoriser le numérateur, mais cela sort du cadre de cet exercice.`
          break
        }
        case 'exp/poly1': {
          // fDen = cx+d
          const c = (fDen as Polynome).monomes[1]
          const d = (fDen as Polynome).monomes[0]
          const valI = new FractionEtendue(-d, Number(c))
          df = `\\R\\backslash\\{${valI.texFractionSimplifiee}\\}`
          texteCorr += `Ici la formule ci-dessus est applicable pour tout $x$ tel que $${termeDen.latex}\\neq 0$. C'est-à-dire $x\\neq${valI.texFractionSimplifiee}$.<br>`
          texteCorr += 'On obtient alors : '
          texteCorr += `\\[${nameF}'(x)=\\frac{${fNum}(${fDen})-${fNum}\\times${Number(c) < 0 ? `(${c})` : c}}{(${termeDen.latex})^2}.\\]`
          texteCorr += 'On factorise par $e^x$, et on obtient : '
          texteCorr += `\\[${nameF}'(x)=\\frac{${fNum}(${fDen}${ecritureAlgebrique(-c)})}{(${termeDen.latex})^2},\\]`
          texteCorr += 'ce qui donne, après réduction : '
          maReponse = `\\frac{${fNum}(${Polynome.print([Number(d) - Number(c), Number(c)])})}{(${termeDen.latex})^2}`
          texteCorr += `$${miseEnEvidence(`${nameF}'(x)=${maReponse}`, 'black')}$.`
          break
        }
        default:
          texteCorr += 'TODO'
          df = '\\R'
          break
      }
      texte = texte.replaceAll('\\frac', '\\dfrac')
      if (this.sup2) {
        texte += `<br>Montrer que $${nameF}^\\prime(x)=${maReponse.replaceAll('\\frac', '\\dfrac')}$`
      } else {
        texte =
          `Donner l'expression de la dérivée de $${nameF}$ définie pour tout $x\\in${df}$ par : ` +
          texte
      }
      texteCorr = texteCorr.replaceAll('\\frac', '\\dfrac')
      if (this.interactif && !this.sup2) {
        texte +=
          '<br><br>' +
          ajouteChampTexteMathLive(this, i, '', {
            texteAvant: `$${nameF}'(x)=$`,
          })
      }
      if (listeValeurs.indexOf(expression) === -1) {
        listeValeurs.push(expression)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        handleAnswers(this, i, {
          reponse: { value: maReponse, compare: functionCompare },
        })
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
