import { randint } from '../../../../modules/outils'
import { miseEnEvidence } from '../../../outils/embellissements'
import SchemaEnBoite from '../../../outils/SchemaEnBoite'
import { texNombre } from '../../../outils/texNombre'
import Probleme from '../../Probleme'
import { centreLoisir } from './centreLoisir'
import { chocolats } from './chocolats'
import { heritage } from './heritage'
import { musique } from './musique'
import { tempsEcran } from './tempsEcran'
/**
 * @author Jean-Claude Lhote
 */
export default class ProblemeMultiplicatifParts extends Probleme {
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
          text: `${nbFois} boites`,
          type: 'flèche',
        },
      ],
    })
    this.enonce = `Un centre de loisirs a acheté $${texNombre(total, 2)}$ feutres. Ils veulent les répartir dans ${nbFois} boites? Combien de feutres y a-t-il par boites ?`
    this.correction = `On cherche à répartir $${texNombre(total, 2)}$ feutres dans ${nbFois} boites. Donc, il y a $\\dfrac{${texNombre(total, 2)}}{${texNombre(nbFois, 2)}}=${miseEnEvidence(texNombre(total / nbFois, 2))}$ feutres par boite.`
    this.reponse = texNombre(total / nbFois, 2)
  }
}

export const listeDeProblemesMultiplicatifsParts = [
  centreLoisir,
  chocolats,
  tempsEcran,
  heritage,
  musique,
]
/*
[
  {
    "enonce": "Une boîte contient $${texNombre(total,2)}$ kg de chocolats. On veut la partager équitablement entre $${texNombre(nbFois,0)}$ personnes. Quelle quantité chacun recevra-t-il ?",
    "correction": "On cherche à partager $${texNombre(total,2)}$ kg de chocolats entre $${texNombre(nbFois,0)}$ personnes. Donc, chaque personne reçoit $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ kg de chocolats."
  },
  {
    "enonce": "Le temps d’écran disponible est de $${texNombre(total,2)}$ heures pour toute la semaine. Il est réparti équitablement entre $${texNombre(nbFois,0)}$ jours. Combien d’heures par jour cela représente-t-il ?",
    "correction": "On répartit $${texNombre(total,2)}$ heures d’écran sur $${texNombre(nbFois,0)}$ jours. Chaque jour, cela représente $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ heures."
  },
  {
    "enonce": "Une école reçoit $${texNombre(total,2)}$ stylos et souhaite les répartir équitablement entre $${texNombre(nbFois,0)}$ élèves. Combien de stylos aura chaque élève ?",
    "correction": "On répartit $${texNombre(total,2)}$ stylos entre $${texNombre(nbFois,0)}$ élèves. Chaque élève aura donc $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ stylos."
  },
  {
    "enonce": "Une association plante $${texNombre(total,2)}$ arbres et les répartit de manière égale dans $${texNombre(nbFois,0)}$ quartiers. Combien d’arbres seront plantés dans chaque quartier ?",
    "correction": "On partage $${texNombre(total,2)}$ arbres entre $${texNombre(nbFois,0)}$ quartiers. Chaque quartier aura $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ arbres."
  },
  {
    "enonce": "Une somme de $${texNombre(total,2)}$ euros est partagée équitablement entre $${texNombre(nbFois,0)}$ personnes. Combien chacun recevra-t-il ?",
    "correction": "On partage $${texNombre(total,2)}$ euros entre $${texNombre(nbFois,0)}$ personnes. Chacun recevra $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ euros."
  },
  {
    "enonce": "Un paquet contient $${texNombre(total,2)}$ cartes. Il est partagé équitablement entre $${texNombre(nbFois,0)}$ joueurs. Combien de cartes chaque joueur reçoit-il ?",
    "correction": "On répartit $${texNombre(total,2)}$ cartes entre $${texNombre(nbFois,0)}$ joueurs. Chaque joueur recevra $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ cartes."
  },
  {
    "enonce": "Une classe dispose de $${texNombre(total,2)}$ livres et souhaite les répartir entre $${texNombre(nbFois,0)}$ groupes de travail. Combien de livres par groupe ?",
    "correction": "On répartit $${texNombre(total,2)}$ livres entre $${texNombre(nbFois,0)}$ groupes. Chaque groupe reçoit $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ livres."
  },
  {
    "enonce": "Lors d’une collecte, $${texNombre(total,2)}$ sacs de déchets sont triés équitablement entre $${texNombre(nbFois,0)}$ points de collecte. Combien de sacs par point ?",
    "correction": "On répartit $${texNombre(total,2)}$ sacs entre $${texNombre(nbFois,0)}$ points. Chaque point reçoit $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ sacs."
  },
  {
    "enonce": "Une réserve de $${texNombre(total,2)}$ litres d’eau est répartie équitablement dans $${texNombre(nbFois,0)}$ bouteilles. Quelle est la contenance de chaque bouteille ?",
    "correction": "On répartit $${texNombre(total,2)}$ litres d’eau dans $${texNombre(nbFois,0)}$ bouteilles. Chaque bouteille contient $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ litres."
  },
  {
    "enonce": "Un morceau de musique dure $${texNombre(total,2)}$ minutes. Il est divisé en $${texNombre(nbFois,0)}$ parties égales. Quelle est la durée d’une partie ?",
    "correction": "On divise $${texNombre(total,2)}$ minutes en $${texNombre(nbFois,0)}$ parties. Chaque partie dure $\\dfrac{${texNombre(total,2)}}{${texNombre(nbFois,0)}} = ${texNombre(total / nbFois,2)}$ minutes."
  }
] */
