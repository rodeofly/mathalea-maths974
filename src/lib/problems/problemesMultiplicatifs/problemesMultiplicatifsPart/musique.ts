import { randint } from '../../../../modules/outils'
import { miseEnEvidence } from '../../../outils/embellissements'
import { texNombre } from '../../../outils/texNombre'
import type Probleme from '../../Probleme'
import ProblemeMultiplicatifParts from './problemesMultiplicatifsPart'
/**
 * @author Jean-Claude Lhote
 */
export function musique(decimal = false): Probleme {
  const nbFois = randint(3, 7)
  const quotité = decimal ? randint(21, 55, [30, 40, 50]) / 10 : randint(2, 6)
  const total = nbFois * quotité
  const data = { nbFois, quotité }
  const probleme = new ProblemeMultiplicatifParts('musique', data)
  probleme.enonce = `Un morceau de musique dure $${texNombre(total, 2)}$ minutes. Il est divisé en $${texNombre(nbFois, 0)}$ parties égales. Quelle est la durée d'une partie ?`
  probleme.correction = `On divise $${texNombre(total, 2)}$ minutes en $${texNombre(nbFois, 0)}$ parties. Chaque partie dure $\\dfrac{${texNombre(total, 2)}}{${texNombre(nbFois, 0)}} = ${miseEnEvidence(texNombre(total / nbFois, 2))}$ minutes.`
  probleme.schema.topBraces = [
    {
      start: 1,
      end: 15,
      text: `$${texNombre(total, 2)}$ minutes`,
    },
  ]
  probleme.schema.lignes = [
    {
      barres: [
        {
          content: `$${texNombre(quotité, 2)}\\text{\\,min}$`,
          length: 3,
          color: 'lightgray',
        },
        {
          content: '\\ldots',
          length: 8,
          color: 'white',
          options: {
            justify: 'start',
          },
        },
        {
          content: `$${texNombre(quotité, 2)}\\text{\\,min}$`,
          length: 3,
          color: 'lightgray',
        },
      ],
    },
  ]
  probleme.schema.bottomBraces = [
    {
      start: 1,
      end: 15,
      text: `${nbFois} jours`,
      type: 'flèche',
    },
  ]
  return probleme
}
