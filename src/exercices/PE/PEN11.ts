import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import FractionEtendue from '../../modules/FractionEtendue'
import {
  obtenirListeFacteursPremiers,
  texFactorisation,
} from '../../lib/outils/primalite'
import { texNombre } from '../../lib/outils/texNombre'
import Decimal from 'decimal.js'
export const titre = 'Déterminer si un nombre rationnel est décimal'
export const uuid = 'b2f0c'
export const dateDePublication = '2/1/2025'
export const refs = {
  'fr-fr': ['PEN11'],
  'fr-ch': [],
}
/**
 *
 * @author Rémi Angot
 */
export default class IsDecimal extends Exercice {
  typeQuestionsDisponibles = [
    'decimalEstRationnel',
    'num/2^m5^n',
    'num/2^m5^nX',
    'numX/2^m5^nX',
  ]
  constructor() {
    super()
    this.typeQuestionsDisponibles = [
      'num/2^m5^n',
      'num/2^m5^nX',
      'numX/2^m5^nX',
    ]
    this.nbQuestions = 3
  }

  nouvelleVersion() {
    const listeTypeQuestions = combinaisonListes(
      this.typeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      const typeQuestion = listeTypeQuestions[i]
      switch (typeQuestion) {
        case 'decimalEstRationnel': {
          const nombreDeDecimales = randint(1, 3)
          let n = new Decimal(randint(1, 10 ** nombreDeDecimales - 1)).div(
            10 ** nombreDeDecimales,
          )
          if (Math.random() < 0.5) {
            n = n.add(randint(1, 20))
          }
          texte = `Le nombre $${texNombre(n)}$ est-il rationnel ?`
          if (n.mul(10).mod(1).eq(0)) {
            texteCorr = `$${texNombre(n)} = \\dfrac{${texNombre(n.mul(10))}}{10}$`
          } else if (n.mul(100).mod(1).eq(0)) {
            texteCorr = `$${texNombre(n)} = \\dfrac{${texNombre(n.mul(100))}}{100}$`
          } else {
            texteCorr = `$${texNombre(n)} = \\dfrac{${texNombre(n.mul(1000))}}{1\\,000}$`
          }
          texteCorr +=
            "<br><br>Ce nombre peut s'écrire sous forme de fraction donc il est rationnel."
          break
        }
        case 'num/2^m5^n': {
          const n = randint(2, 6)
          const m = randint(2, 4, [n])
          const num = randint(50, 200)
          const den = 2 ** n * 5 ** m
          const f = new FractionEtendue(num, den)
          texte = `Le nombre $${f.texFraction}$ est-il décimal ?`
          texteCorr =
            'Décomposons en produit de facteurs premiers le numérateur et le dénominateur de la fraction.'
          texteCorr += `<br><br>$${f.texFraction} = \\dfrac{${texFactorisation(num)}}{2^{${n}}\\times5^{${m}}}$`
          texteCorr +=
            "<br><br>Ce nombre peut s'écrire sous la forme $\\dfrac{k}{2^n \\times 5^m}$, avec $k$ un entier naturel, il est donc décimal."
          break
        }
        case 'num/2^m5^nX': {
          let num = 1
          let den = 2
          let f = new FractionEtendue(num, den)
          let cpt = 0
          while (!isDecimal(f) && cpt < 10) {
            const n = randint(2, 6)
            const m = randint(2, 4, [n])
            let x = choice([3, 7, 11, 13])
            const situation = randint(1, 3)
            if (situation === 1) {
              x = x ** randint(2, 3)
            } else if (situation === 2) {
              x = x * choice([3, 7, 11, 13], [x]) ** randint(1, 3)
            }
            num = randint(50, 200)
            den = 2 ** n * 5 ** m * x
            f = new FractionEtendue(num, den)
            cpt++
          }
          if (cpt === 10) {
            console.error('Problème de génération de la question')
          }
          texte = `Le nombre $${f.texFraction}$ est-il décimal ?`
          texteCorr =
            'Décomposons en produit de facteurs premiers le numérateur et le dénominateur de la fraction.'
          texteCorr += `<br><br>$${f.texFraction} = \\dfrac{${texFactorisation(num)}}{${texFactorisation(den)}}`
          if (f.estIrreductible) {
            texteCorr += '$'
          } else {
            texteCorr += `=\\dfrac{${texFactorisation(f.numIrred)}}{${texFactorisation(f.denIrred)}}$`
          }
          texteCorr +=
            "<br><br>Ce nombre peut s'écrire sous la forme d'une  fraction irréductible qui a un facteur différent de 2 et 5 au dénominateur, il n'est donc pas décimal."
          break
        }
        case 'numX/2^m5^nX': {
          const n = randint(2, 6)
          const m = randint(2, 4, [n])
          let x = choice([3, 7, 11, 13])
          const situation = randint(1, 3)
          if (situation === 1) {
            x = x ** randint(2, 3)
          } else if (situation === 2) {
            x = x * choice([3, 7, 11, 13], [x]) ** randint(1, 3)
          }
          const num = randint(50, 200) * x
          const den = 2 ** n * 5 ** m * x
          const f = new FractionEtendue(num, den)
          texte = `Le nombre $${f.texFraction}$ est-il décimal ?`
          texteCorr =
            'Décomposons en produit de facteurs premiers le numérateur et le dénominateur de la fraction.'
          texteCorr += `<br><br>$${f.texFraction} = \\dfrac{${texFactorisation(num)}}{${texFactorisation(den)}}`
          if (f.estIrreductible) {
            texteCorr += '$'
          } else {
            texteCorr += `=\\dfrac{${texFactorisation(f.numIrred)}}{${texFactorisation(f.denIrred)}}$`
          }
          texteCorr +=
            "<br><br>Ce nombre peut s'écrire sous la forme $\\dfrac{k}{2^n \\times 5^m}$, il est donc décimal."
          break
        }
      }

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

function isDecimal(f: FractionEtendue): boolean {
  const liste = obtenirListeFacteursPremiers(f.denIrred)
  return liste.some((e) => e !== 2 && e !== 5)
}
