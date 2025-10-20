import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

import Decimal from 'decimal.js'
import { choice } from '../../../lib/outils/arrayOutils'
export const titre = 'Convertir m$^3$ et Litres'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a8e1d'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter+  Gilles Mora
 */
export default class Convertir extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    let a, b
    switch (choice(['b', 'b'])) {
      case 'a':
        b = 2025
        a = choice([
          new Decimal(b).div(10),
          new Decimal(b).div(10000),
          new Decimal(b).div(100),
          new Decimal(b).div(1000),
        ])
        this.reponse = texNombre(new Decimal(a).mul(1000), 4)
        this.question = ` $${texNombre(a)}$ m$^3 =$ `
        if (!this.interactif) {
          this.question += '$ ....$ L'
        }
        this.optionsChampTexte = { texteApres: ' L' }
        this.correction = `Comme $1$ m$^3=${texNombre(1000, 0)}$ L, alors $${texNombre(a, 0)}$ m$^3 =${texNombre(a)}\\times ${texNombre(1000, 0)}$ L $ = ${miseEnEvidence(this.reponse)}$ L.`

        this.canEnonce = 'Compléter.'
        this.canReponseACompleter = `$${texNombre(a)}$ m$^3 = \\dots$ L`
        break
      case 'b':
        b = 2025
        a = choice([
          new Decimal(b),
          new Decimal(b).mul(10),
          new Decimal(b).mul(100),
          new Decimal(b).div(10),
        ])
        this.reponse = texNombre(new Decimal(a).div(1000), 4)
        this.question = `$${texNombre(a)}$  L $=$ `
        if (!this.interactif) {
          this.question += ' .... m$^3$ '
        }

        this.optionsChampTexte = { texteApres: ' m$^3$' }
        this.canEnonce = 'Compléter.'
        this.canReponseACompleter = `$${texNombre(a)}$ L $ = \\dots$ m$^3$`
        this.correction = `Comme $1$ L $=0,001$ m$^3$, alors $${texNombre(a)}$ L $=${texNombre(a)}\\times 0,001$ m$^3 = ${miseEnEvidence(this.reponse)}$ m$^3$.`

        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
