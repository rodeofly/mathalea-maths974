import { choice } from '../../lib/outils/arrayOutils'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'

import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
export const titre = 'Écrire correctement les grands nombres entiers'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'

/**
 * Supprimer les zéros inutiles, séparer les classes d'un nombre entier.
 * @author Jean-Claude Lhote
 * 6N10-4
 * Relecture : Novembre 2021 par EE
 */
export const uuid = 'dc348'

export const refs = {
  'fr-fr': ['6N1C'],
  'fr-2016': ['6N10-4'],
  'fr-ch': ['9NO1-5'],
}
export default class ÉcrireNombresEntiersFormates extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 5
  }

  nouvelleVersion() {
    this.consigne =
      'Écrire les nombres en chiffres en supprimant les zéros inutiles et en séparant les classes.'
    function zeroSuperflus(n: number) {
      const nzero = randint(0, 2)
      let nombrestring = n.toString()
      for (let k = 0; k < nzero; k++) nombrestring = '0' + nombrestring
      return nombrestring
    }
    for (
      let i = 0,
        texte,
        texteCorr,
        a,
        b,
        c,
        nombre,
        tranche,
        nombrestring,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      nombre = 0
      tranche = []
      while (nombre === 0) {
        tranche.splice(0)
        for (let j = 0; j < 3; j++) {
          a = randint(1, 9)
          b = randint(1, 9)
          c = randint(1, 9)
          tranche.push(
            choice([
              0,
              100,
              20,
              80,
              a,
              a * 100,
              a * 100 + b * 10 + c,
              a * 100 + 80 + b,
              a * 10,
              a * 100 + b * 10 + 1,
            ]),
          )
        }
        for (let j = 0; j < 3; j++) {
          nombre += tranche[j] * 10 ** (j * 3)
        }
        if (tranche[2] === 0) nombre = 0
      }
      nombrestring = zeroSuperflus(nombre)
      texte =
        `$${nombrestring}$` +
        ajouteChampTexteMathLive(this, i, KeyboardType.numbersSpace, {
          espace: true,
          texteAvant: '$=$',
        })
      if (context.vue !== 'diap')
        texteCorr = `$${nombrestring}$ s'écrit plus lisiblement $${texNombre(nombre, 0)}$.`
      else texteCorr = `${texNombre(nombre, 0)}`
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: texte + '<br>',
          propositions: [
            {
              texte: texteCorr,
              statut: 1, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
              sanscadre: true,
            },
          ],
        }
      } else {
        handleAnswers(this, i, {
          reponse: {
            value: texNombre(nombre, 0),
            options: { nombreAvecEspace: true },
          },
        })
      }

      if (this.questionJamaisPosee(i, nombre)) {
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
