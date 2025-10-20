import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { listeDeNotes, unMoisDeTemperature } from '../../lib/outils/aleatoires'
import Exercice from '../Exercice'
import { OutilsStats } from '../../modules/outilsStat'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { context } from '../../modules/context'

export const titre = 'Calculer des étendues'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDeModifImportante = '31/08/2022'

/**
 * Calculer des étendues de séries statistiques
 * @author Jean-Claude Lhote
 * Ajout d'un paramètre "Mélange" par Guillaume Valmont le 31/08/2022
 * 12/01/2023 Mickael Guironnet Refactoring
 */
export const uuid = '36e68'

export const refs = {
  'fr-fr': ['3S15'],
  'fr-ch': ['11NO2-12'],
}
export default class CalculerEtendues extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Type de séries',
      3,
      '1 : Série de notes\n2 : Série de températures\n3 : Mélange',
    ]

    this.nbQuestions = 1

    this.sup = 1
  }

  nouvelleVersion() {
    let typeQuestionsDisponibles = ['notes', 'températures']
    if (this.sup === 1) typeQuestionsDisponibles = ['notes']
    if (this.sup === 2) typeQuestionsDisponibles = ['températures']
    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    )

    for (
      let i = 0,
        nombreNotes,
        notes,
        min,
        max,
        temperatures,
        texte,
        texteCorr,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeQuestions[i]) {
        case 'notes':
          nombreNotes = randint(8, 12)
          notes = listeDeNotes(nombreNotes, randint(0, 7), randint(13, 20)) // on récupère une série de notes (série brute)
          texte = OutilsStats.texteNotes(notes)
          texte += "<br>Calculer l'étendue de ces notes."
          ;[min, max] = OutilsStats.computeEtendue(notes)
          texteCorr = OutilsStats.texteCorrEtendueNotes(min, max)
          break
        case 'températures':
        default: {
          const mois = randint(1, 12)
          const annee = randint(1980, 2019)
          const temperaturesDeBase = [
            3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5,
          ]
          temperatures = unMoisDeTemperature(
            temperaturesDeBase[mois - 1],
            mois,
            annee,
          ) // série brute de un mois de température
          texte = OutilsStats.texteTemperatures(annee, mois, temperatures)
          texte += "<br>Calculer l'étendue des températures."
          ;[min, max] = OutilsStats.computeEtendue(temperatures)
          texteCorr =
            (context.isHtml ? '<br>' : '') +
            '' +
            OutilsStats.texteCorrEtendueNotes(min, max, 'température')
          texteCorr = OutilsStats.texteCorrEtendueNotes(min, max, 'température')
          break
        }
      }
      setReponse(this, i, max - min)
      texte += ajouteChampTexteMathLive(this, i)
      if (this.questionJamaisPosee(i, min, max)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
