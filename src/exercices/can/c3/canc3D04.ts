import Horloge from '../../../lib/2d/horloge'
import handleInteractiveClock from '../../../lib/InteractiveClock'
import { formatMinute } from '../../../lib/outils/texNombre'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { context } from '../../../modules/context'
import Hms from '../../../modules/Hms'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = "Indiquer l'heure sur une horloge"
export const interactifReady = true
export const interactifType = 'custom'

export const dateDePublication = '21/2/2025'

export const uuid = '51242'
export const refs = {
  'fr-fr': ['canc3D04', 'auto6M4B-flash1'],
  'fr-ch': ['PR-5'],
}

/**
 * @author Rémi Angot

*/
export default class ExerciceInteractiveClock extends Exercice {
  goodAnswers: { hour: string; minute: string }[] = []
  constructor() {
    super()
    this.nbQuestions = 1
    this.interactifType = interactifType // MGu obligatoire car chargé en statique avec la CAN2025
    handleInteractiveClock() // Obligatoire pour la gestion de l'élément custom <interactive-clock>
  }

  nouvelleVersion(numeroExercice: number, numeroQuestion?: number) {
    for (
      let i = numeroQuestion ?? 0, cpt = 0;
      i < (numeroQuestion ? numeroQuestion + 1 : this.nbQuestions) && cpt < 50;

    ) {
      let hour = randint(1, 12)
      let minute = randint(1, 11) * 5
      if (this.canOfficielle) {
        hour = 13
        minute = 30
      }
      let enonce = `Placer correctement les aiguilles pour indiquer ${hour} h ${formatMinute(minute)}.`
      if (context.isHtml) {
        enonce += `<br><br><interactive-clock id="clockEx${this.numeroExercice}Q${i}" isDynamic="${this.interactif}" showHands="${this.interactif}"/>`
      } else {
        const horloge = new Horloge(0, 0, 2)
        enonce += mathalea2d(
          {
            xmin: -3,
            ymin: -3,
            xmax: 3,
            ymax: 3,
            scale: 0.6,
            style: 'margin: auto',
          },
          horloge,
        )
      }
      let correction = ''
      if (context.isHtml) {
        correction = `<interactive-clock hour="${hour}" minute="${minute}" isDynamic="false"/>`
      } else {
        const horloge = new Horloge(0, 0, 2, new Hms({ hour, minute }))
        correction = mathalea2d(
          {
            xmin: -3,
            ymin: -3,
            xmax: 3,
            ymax: 3,
            scale: 0.6,
            style: 'margin: auto',
          },
          horloge,
        )
      }
      if (this.questionJamaisPosee(i, hour, minute)) {
        this.listeQuestions[i] = enonce
        this.listeCorrections[i] = correction
        this.goodAnswers[i] = {
          hour: hour.toString(),
          minute: minute.toString(),
        }
        this.autoCorrection[i] = {
          reponse: {
            valeur: {
              reponse: { value: hour.toString() + 'h' + minute.toString() },
            },
            param: { formatInteractif: 'custom' },
          },
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  correctionInteractive = (i: number) => {
    const id = `clockEx${this.numeroExercice}Q${i}`
    const clock = document.querySelector(`#${id}`) as any
    if (clock == null) {
      return 'KO'
    }
    clock.isDynamic = false
    const hour: string = clock.getAttribute('hour')
    const minute: string = clock.getAttribute('minute')
    if (this.answers == null) this.answers = {}
    // Sauvegarde de la réponse pour Capytale
    this.answers[id] = `${hour}h${minute.toString().padStart(2, '0')}`
    if (
      hour === formatHour012(this.goodAnswers[i].hour) &&
      minute === this.goodAnswers[i].minute
    ) {
      const divFeedback = document.createElement('div')
      divFeedback.innerHTML = '😎'
      clock.parentElement?.appendChild(divFeedback)
      return 'OK'
    } else {
      const divFeedback = document.createElement('div')
      divFeedback.innerHTML = `☹️ Les aiguilles indiquent ${clock.getAttribute('hour')} h ${formatMinute(clock.getAttribute('minute'))}.`
      clock.parentElement?.appendChild(divFeedback)
      return 'KO'
    }
  }
}

function formatHour012(hour: string): string {
  const hourNumber = parseInt(hour)
  if (hourNumber > 12) {
    return (hourNumber - 12).toString()
  } else {
    return hourNumber.toString()
  }
}
