import { randint } from '../../../../modules/outils'
import { miseEnEvidence } from '../../../outils/embellissements'
import { texNombre } from '../../../outils/texNombre'
import type Probleme from '../../Probleme'
import ProblemeMultiplicatifParts from './problemesMultiplicatifsPart'
/**
 * @author Jean-Claude Lhote
 */
export function chocolats(decimal = false): Probleme {
  const nbFois = randint(5, 12)
  const quotité = decimal ? randint(3, 9) / 20 : randint(3, 9) * 50
  const total = nbFois * quotité
  const data = { nbFois, quotité }
  const unité = decimal ? 'kg' : 'g'
  const unitéComplète = decimal ? 'kilogrammes' : 'grammes'
  const probleme = new ProblemeMultiplicatifParts('chocolats', data)
  probleme.enonce = `Une boîte contient $${texNombre(total, 2)}$ ${unité} de chocolats. On veut la partager équitablement dans $${texNombre(nbFois, 0)}$ boites. Quelle masse doit-on mettre dans chaque boites ?`
  probleme.correction = `On cherche à répartir $${texNombre(total, 2)}$ ${unité} dans ${nbFois} boites. Donc, il y a $\\dfrac{${texNombre(total, 2)}}{${texNombre(nbFois, 2)}}=${miseEnEvidence(texNombre(total / nbFois, 2))}$ ${unitéComplète} par boite.`
  probleme.schema.topBraces = [
    {
      start: 1,
      end: 15,
      text: `$${texNombre(total, 2)}$ ${unité} de chocolats`,
    },
  ]
  probleme.schema.lignes = [
    {
      barres: [
        {
          content: `$${texNombre(quotité, 2)}\\text{\\,${unité}}$`,
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
          content: `$${texNombre(quotité, 2)}\\text{\\,${unité}}$`,
          length: 3,
          color: 'lightgray',
        },
      ],
    },
  ]
  return probleme
}
