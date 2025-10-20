import { randint } from '../../../../modules/outils'
import { miseEnEvidence } from '../../../outils/embellissements'
import SchemaEnBoite from '../../../outils/SchemaEnBoite'
import { texNombre } from '../../../outils/texNombre'
import Probleme from '../../Probleme'
import { chocolats2 } from './chocolats'
/**
 * @author Jean-Claude Lhote
 */
export default class ProblemeMultiplicatifNbParts extends Probleme {
  constructor(name: string = '', data?: { nbFois: number; quotité: number }) {
    const nbFois = data?.nbFois ?? randint(5, 12)
    const quotité = data?.quotité ?? randint(10, 40)
    const total = nbFois * quotité
    data = data == null ? { nbFois, quotité: randint(5, 10) } : data
    super(name, data)
    this.schema = new SchemaEnBoite({
      topBraces: [
        {
          start: 1,
          end: 15,
          text: `$${texNombre(total, 2)}$ feutres`,
        },
      ],
      lignes: [
        {
          barres: [
            {
              content: `$${texNombre(quotité, 2)}\\text{\\,feutres}$`,
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
              content: `$${texNombre(quotité, 2)}\\text{\\,feutres}$`,
              length: 3,
              color: 'lightgray',
            },
          ],
        },
      ],
      bottomBraces: [
        {
          start: 1,
          end: 15,
          text: `$${miseEnEvidence(nbFois.toString())}$ boites`,
          type: 'flèche',
        },
      ],
    })
    this.enonce = `Un centre de loisirs a acheté $${texNombre(total, 2)}$ feutres. Ils veulent les répartir dans ${nbFois} boites? Combien de feutres y a-t-il par boites ?`
    this.correction = `On cherche à répartir $${texNombre(total, 2)}$ feutres dans ${nbFois} boites. Donc, il y a $\\dfrac{${texNombre(total, 2)}}{${texNombre(nbFois, 2)}}=${miseEnEvidence(texNombre(total / nbFois, 2))}$ feutres par boite.`
    this.reponse = texNombre(total / nbFois, 2)
  }
}

export const listeDeProblemesMultiplicatifsNbParts = [chocolats2]
