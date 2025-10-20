import GlisseNombreElement from 'glisse-nombre'
import { choice } from '../../lib/outils/arrayOutils'
import { texFractionFromString } from '../../lib/outils/deprecatedFractions'
import { texNombre } from '../../lib/outils/texNombre'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

/**
 * Définit le customElement glisse-nombre
 */
if (customElements.get('glisse-nombre') === undefined) {
  customElements.define('glisse-nombre', GlisseNombreElement)
}

export const titre =
  'Multiplier ou diviser un nombre entier par 10, 100 ou 1 000'

/**
 * Multiplier ou diviser un nombre entier par 10, 100 ou 1 000
 *
 * Le nombre entier est de la forme X, XX, X0X, X00X ou XXX
 * @author Rémi Angot
 * 6N24-1
 */
export const uuid = 'ec005'

export const refs = {
  'fr-fr': ['CM1C1E-1'],
  'fr-2016': ['6N24-1'],
  'fr-ch': ['9NO10-5'],
}
export default class ExerciceMultiplierOuDiviserUnNombreEntierPar101001000 extends Exercice {
  constructor() {
    super()
    this.consigne = "Donner l'écriture décimale."
    this.spacing = 2
    this.spacingCorr = 2
  }

  nouvelleVersion() {
    for (
      let i = 0, a, b, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      a = choice(
        [
          randint(2, 9),
          randint(11, 99),
          randint(1, 9) * 100 + randint(1, 9),
          randint(1, 9) * 1000 + randint(1, 9),
        ],
        randint(101, 999),
      )
      // X, XX, X0X, X00X,XXX
      b = choice([10, 100, 1000])
      if (choice([true, false])) {
        texte =
          '$ ' + texFractionFromString(texNombre(a), texNombre(b)) + ' =  $'
        texteCorr =
          '$ ' +
          texFractionFromString(texNombre(a), texNombre(b)) +
          ' = ' +
          texNombre(a / b) +
          ' $'
        if (context.isHtml && i === 0) {
          this.introduction = `<glisse-nombre number="${texNombre(a / b)}"/>`
        }
      } else {
        texte = '$ ' + texNombre(a) + '\\times' + texNombre(b) + ' =  $'
        texteCorr =
          '$ ' +
          texNombre(a) +
          '\\times' +
          texNombre(b) +
          ' = ' +
          texNombre(a * b) +
          ' $'
        if (context.isHtml && i === 0) {
          this.introduction = `<glisse-nombre number="${a}"/>`
        }
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
