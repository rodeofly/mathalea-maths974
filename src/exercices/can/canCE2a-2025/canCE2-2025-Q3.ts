import { BoiteBuilder } from '../../../lib/2d/polygones'
import { droiteGraduee } from '../../../lib/2d/reperes'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
import ExerciceCan from '../../ExerciceCan'

export const titre = 'Droite des nombres'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '36cc7'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025NCE2Q3 extends ExerciceCan {
  enonce(a?: number[]) {
    if (a == null) {
      const pas = choice([2, 5, 10, 20])
      const firstNb = pas * randint(25, 40)
      a = [firstNb, firstNb + pas, firstNb + 2 * pas, 0, 0, firstNb + 5 * pas]
    }
    const pas = a[1] - a[0]
    const d = droiteGraduee({
      Min: a[0] - pas / 2,
      Max: a[0] + 5.5 * pas,
      axeStyle: '-',
      step1: 1,
      Unite: 2 / pas,
      thickDistance: pas,
      labelsPrincipaux: false,
      thickEpaisseur: 1,
      labelCustomDistance: 1,
      labelListe: [a[0], a[1], a[2], a[3], a[4], a[5]]
        .filter((e) => e > 0)
        .map((e) => [e, e.toString()]),
    })
    const caseGrise = new BoiteBuilder({
      xMin: 8.1,
      xMax: 10,
      yMin: -1.8,
      yMax: -0.3,
    })
      .addColor({ colorBackground: 'gray' })
      .addTextIn({ textIn: '...', size: 1, color: 'black' })
      .render()
    this.reponse = a[0] + 4 * pas
    this.question =
      'Complète la case grise.' +
      mathalea2d(
        Object.assign({ scale: 0.45 }, fixeBordures([d, caseGrise])),
        d,
        caseGrise,
      )
    this.correction = `D'après les trois premiers nombres, on compte de $${pas}$ en $${pas}$ à partir de $${a[0]}$ :<br>
    $${a[0]}$ ; $${a[1]}$ ; $${a[2]}$ ; $${a[2] + pas}$ ; $${miseEnEvidence(texNombre(this.reponse, 0))}$ ; $${a[2] + 3 * pas}$.`
    if (this.interactif) {
      this.question += 'Le nombre dans la case grise est :'
    }
    this.optionsChampTexte = { texteApres: '.' }
    this.canEnonce = mathalea2d(
      Object.assign({ scale: 0.45 }, fixeBordures([d, caseGrise])),
      d,
      caseGrise,
    )
    this.canReponseACompleter = 'Le nombre dans la case grise est : $\\ldots$'
  }

  nouvelleVersion() {
    this.canOfficielle ? this.enonce([280, 290, 300, 0, 0, 330]) : this.enonce()
  }
}
