import { randint } from '../../../../modules/outils'
import { miseEnEvidence } from '../../../outils/embellissements'
import { prenomPronom } from '../../../outils/Personne'
import { texNombre } from '../../../outils/texNombre'
import type Probleme from '../../Probleme'
import ProblemeMultiplicatifParts from './problemesMultiplicatifsPart'
/**
 * @author Jean-Claude Lhote
 */
export function tempsEcran(decimal = false): Probleme {
  const quidam = prenomPronom()
  const pronom = quidam.pronom
  const prenom = quidam.prenom
  const nbFois = randint(3, 7)
  const quotité = decimal ? randint(2, 15) / 10 : randint(2, 15) * 10
  const total = nbFois * quotité
  const data = { nbFois, quotité }
  const unité = decimal ? 'h' : 'min'
  const unitéComplète = decimal ? 'heures' : 'minutes'
  const probleme = new ProblemeMultiplicatifParts('tempsEcran', data)
  probleme.enonce = `Les parents de ${prenom} veulent limiter le temps d’écran par semaine à $${texNombre(total, 2)}$ ${unité}. Il est réparti équitablement entre $${texNombre(nbFois, 0)}$ jours. Combien ${decimal ? "d'heures" : 'de minutes'} par jour ${prenom} peut-${pronom} s'exposer à un écran ?`
  probleme.correction = `On répartit $${texNombre(total, 2)}$ ${unité} d’écran sur $${texNombre(nbFois, 0)}$ jours. Chaque jour, cela représente $\\dfrac{${texNombre(total, 2)}}{${texNombre(nbFois, 0)}} = ${miseEnEvidence(texNombre(total / nbFois, 2))}$ ${unitéComplète}.`
  probleme.schema.topBraces = [
    {
      start: 1,
      end: 15,
      text: `$${texNombre(total, 2)}$ ${unité}`,
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
