import { choice, shuffle } from '../../lib/outils/arrayOutils'
import { numAlpha, sp } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { randint, listeQuestionsToContenu } from '../../modules/outils'
import Operation from '../../modules/operations'
import Decimal from 'decimal.js'
export const titre = 'Produit et somme ou différence de décimaux'

export const dateDePublication = '20/12/2022'

/**
 * Exercice pour pour tenter d'en remettre une couche sur :
 * on pose pas les additions de décimaux et les multiplications de décimaux de la même manière (dans le premier cas, il est impératif d'aligner les chiffres des unités les uns en dessous des autres, dans le deuxième on aligne les chiffres à droite indépendamment de la virgule)
 $ quand on a effectué une multiplication de deux nombres, on n'a pas besoin de poser à nouveau la multiplication si les chiffres significatifs des deux nombres sont les mêmes mais que seule la virgule n'est pas au même endroit.
 * @author Guillaume Valmont
 * idée originale de Mireille Gain
*/
export const uuid = 'c6836'

export const refs = {
  'fr-fr': ['6N2E-3'],
  'fr-2016': ['6C30-9'],
  'fr-ch': ['9NO8-17'],
}
export default class ProduitEtSommeOuDifferenceDeDecimaux extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 4
    this.spacing = 2
    this.besoinFormulaireNumerique = [
      'Nombre de calculs par exercice',
      3,
      '1\n2\n3',
    ] // le paramètre sera numérique de valeur max 3 (le 3 en vert)
    this.sup = 3
    this.besoinFormulaire2CaseACocher = ['Mélanger additions et soustractions']
    this.sup2 = false
  }

  nouvelleVersion() {
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const A = new Decimal(
        choice([randint(10, 99), randint(100, 999)]) * 10 + randint(1, 9),
      )
      const B = new Decimal(
        choice([randint(1, 9), randint(10, 99)]) * 10 + randint(1, 9),
      )
      const diviseursPossibles = [10, 100, 1000]
      const operandes1 = [A]
      const operandes2 = [B]
      for (const diviseurPossible of diviseursPossibles) {
        operandes1.push(A.div(diviseurPossible))
        operandes2.push(B.div(diviseurPossible))
      }
      const couplesPossibles = []
      for (const operande1 of operandes1) {
        for (const operande2 of operandes2) {
          couplesPossibles.push({ A: operande1, B: operande2 })
        }
      }
      const couples = shuffle(couplesPossibles).slice(0, this.sup)
      texte = 'Calculer.'
      texteCorr =
        Operation({
          operande1: A.toNumber(),
          operande2: B.toNumber(),
          type: 'multiplication',
          style: 'display: inline',
          options: { solution: true, colore: '' },
        }) + '<br>'
      let indice = 0
      for (const couple of couples) {
        const addition = this.sup2 ? choice([true, false]) : true
        texte += `<br>${numAlpha(indice)}$${texNombre(couple.A)} ${addition ? '+' : '-'} ${texNombre(couple.B)}$ ${sp()} ${sp()} ${sp()} et ${sp()} ${sp()} ${sp()} $${texNombre(couple.A)} \\times ${texNombre(couple.B)}$.`
        texteCorr += `<br>${numAlpha(indice)}<br>`
        texteCorr += Operation({
          operande1: couple.A.toNumber(),
          operande2: couple.B.toNumber(),
          type: addition ? 'addition' : 'soustraction',
          style: 'display: inline',
          methodeParCompensation: addition,
        })

        texteCorr += `<br> Je sais que $${texNombre(A)}\\times${texNombre(B)}=${texNombre(B.mul(A))}$.`
        texteCorr += '<br>'
        texteCorr += `<br> J'en déduis que $${texNombre(couple.A)}\\times${texNombre(couple.B)}=${texNombre(couple.B.mul(couple.A))}$.`
        texteCorr += '<br>'
        indice++
      }
      // on retire le dernier <br>
      texteCorr = texteCorr.slice(0, texteCorr.length - 4)
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
