import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { premierMultipleSuperieur } from '../../../lib/outils/primalite'
import { randint } from '../../../modules/outils'
import ExerciceCan from '../../ExerciceCan'

export const titre = 'Ordre de grandeur'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'e9cf0'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

const objets: Record<
  string,
  {
    min: number
    max: number
    multiplicateur: number
    billet: number
    valeurExclue: number[]
  }
>[] = [
  {
    'Une paire de baskets': {
      min: 7,
      max: 12,
      multiplicateur: 10,
      billet: 50,
      valeurExclue: [10],
    },
  },
  {
    'Un T-shirt': {
      min: 1,
      max: 3,
      multiplicateur: 5,
      billet: 20,
      valeurExclue: [2],
    },
  },
  {
    'Un sac à dos': {
      min: 3,
      max: 7,
      multiplicateur: 10,
      billet: 50,
      valeurExclue: [5],
    },
  },
  {
    'Un pantalon': {
      min: 3,
      max: 8,
      multiplicateur: 10,
      billet: 50,
      valeurExclue: [5],
    },
  },
  {
    'Un livre': {
      min: 1,
      max: 3,
      multiplicateur: 5,
      billet: 20,
      valeurExclue: [2],
    },
  },
  {
    'Un Jeu vidéo': {
      min: 5,
      max: 10,
      multiplicateur: 10,
      billet: 50,
      valeurExclue: [10],
    },
  },
  {
    'Un mini-robot': {
      min: 6,
      max: 12,
      multiplicateur: 10,
      billet: 50,
      valeurExclue: [10],
    },
  },
  {
    'Un drone': {
      min: 7,
      max: 15,
      multiplicateur: 5,
      billet: 50,
      valeurExclue: [10],
    },
  },
]

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025CE2Q13 extends ExerciceCan {
  enonce(prix?: number, nbBillets?: number, billet?: number, objet?: string) {
    let min = 2
    let max = 12
    let multiplicateur = 10
    let valeurExclue = [5]
    billet = 50
    if (prix == null || nbBillets == null || billet == null || objet == null) {
      const obj = choice(objets)
      let value: {
        min: number
        max: number
        multiplicateur: number
        billet: number
        valeurExclue: number[]
      }
      ;[objet, value] = Object.entries(obj)[0]
      min = value.min
      max = value.max
      multiplicateur = value.multiplicateur
      billet = value.billet
      valeurExclue = value.valeurExclue
      prix = randint(min, max, valeurExclue) * multiplicateur
      const somme = premierMultipleSuperieur(billet, prix)
      nbBillets = somme / billet
    }
    this.question = `${objet} coûte ${prix} €.<br>Je paye avec ${nbBillets} billet${nbBillets > 1 ? 's' : ''} de ${billet} €.<br>Combien doit-on me rendre ?`
    this.reponse = nbBillets * billet - prix // C'est juste pour pas faire planter mathaleaHandleExerciceSimple, cette réponse ne sera pas utilisée.
    this.canEnonce = this.question
    this.correction = `J'ai donné $${nbBillets}$ billets de $${billet}$ €, soit  la somme de $${nbBillets * billet}$ €.<br>
    $${nbBillets * billet}$ € - $${prix}$ € $ = ${nbBillets * billet - prix}$ €<br>
    On doit me rendre $${miseEnEvidence(nbBillets * billet - prix)}$ €.`
    this.canReponseACompleter = 'On doit me rendre $\\ldots\\ldots$ €.'
    this.optionsChampTexte = { texteApres: ' €' }
  }

  nouvelleVersion() {
    this.canOfficielle
      ? this.enonce(70, 2, 50, 'Une paire de baskets')
      : this.enonce()
  }
}
