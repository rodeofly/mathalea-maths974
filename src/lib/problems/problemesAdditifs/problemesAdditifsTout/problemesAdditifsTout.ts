import { randint } from '../../../../modules/outils'
import { miseEnEvidence } from '../../../outils/embellissements'
import SchemaEnBoite from '../../../outils/SchemaEnBoite'
import { texNombre } from '../../../outils/texNombre'
import Probleme from '../../Probleme'
import { coureur2 } from './coureur'
import { courses1 } from './courses'
import { lecture } from './lecture'
import { nageur } from './nageur'
import { plantation } from './plantation'
import { recette1 } from './recette'
import { soif } from './soif'
import { sportif } from './sportif'
import { transports } from './transports'
/**
 * @author Jean-Claude Lhote
 */
export default class ProblemeAdditif extends Probleme {
  constructor(name: string = '', data?: { nb1: number; nb2: number }) {
    data = data == null ? { nb1: randint(2, 25), nb2: randint(2, 25) } : data
    super(name, data)
    this.schema = new SchemaEnBoite({
      topBraces: [
        {
          start: 1,
          end: 11,
          text: 'Total',
        },
      ],
      bottomBraces: [],
      rightBraces: [],
      lignes: [
        {
          barres: [
            {
              content: `$${miseEnEvidence(texNombre(data.nb1 + data.nb2, 2))}$`,
              length: 10,
              color: 'lightgray',
            },
          ],
        },
        {
          barres: [
            {
              content: `$${texNombre(data.nb1, 2)}$`,
              length: 5,
              color: 'lightgray',
            },
            {
              content: `$${texNombre(data.nb2, 2)}$`,
              length: 5,
              color: 'lightgray',
            },
          ],
        },
      ],
    })
    this.enonce = `On achète deux produits : un à $${data.nb1}$ € et un autre à $${data.nb2}$ €.
Combien cela coûte-t-il au total ?`
    this.correction = `Le coût total est de $${miseEnEvidence(data.nb1 + data.nb2)}$ €.`
    this.reponse = texNombre(data.nb1 + data.nb2, 2)
  }
}
export const listeDeProblemesAdditifsTout = [
  courses1,
  coureur2,
  recette1,
  soif,
  nageur,
  transports,
  plantation,
  sportif,
  lecture,
]
