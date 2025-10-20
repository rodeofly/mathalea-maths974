import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
  rienSi1,
} from '../../../lib/outils/ecritures'
import { texteCentre } from '../../../lib/format/miseEnPage'
import { sp } from '../../../lib/outils/outilString'
import Exercice from '../../Exercice'
import { egal, listeQuestionsToContenu, randint } from '../../../modules/outils'
import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'

import { setReponse } from '../../../lib/interactif/gestionInteractif'

export const titre =
  'Déterminer un vecteur normal avec une équation cartésienne'
export const interactifReady = true
export const interactifType = 'custom'
export const dateDePublication = '08/07/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora avec Jean-Claude pour la partie interactive

 *
 */
export const uuid = 'e7919'

export const refs = {
  'fr-fr': ['can1G08'],
  'fr-ch': [],
}
export default class VecteurNormEqCart extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let texte
    let texteCorr

    for (let i = 0, a, b, c, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      a = randint(-9, 9, 0)
      b = randint(-9, 9, 0)
      c = randint(-5, 5, 0)

      texte = ` Dans un repère orthonormé $\\big(O ; \\vec \\imath,\\vec \\jmath\\big)$, la droite $d$ a pour équation :
    ${texteCentre(`$${rienSi1(a)}x${ecritureAlgebriqueSauf1(b)}y${ecritureAlgebrique(c)}=0$`)}
 Donner les coordonnées d'un vecteur normal $\\vec{u}$ de la droite $d$.<br>`

      if (this.interactif) {
        texte += '$\\Bigg($' + ajouteChampTexteMathLive(this, 2 * i, '')
        texte += ` ${sp(1)} ;  `
        texte += ajouteChampTexteMathLive(this, 2 * i + 1, '') + '$\\Bigg)$'

        setReponse(this, 2 * i, a)
        setReponse(this, 2 * i + 1, b)
      }
      texteCorr = `Si l'équation est de la forme $ax+by+c=0$, on sait d'après le cours, qu'un vecteur normal $\\vec{u}$ a pour coordonnées $(a;b)$.<br>
    On en déduit qu'un vecteur normal de $d$ est $\\vec{u}(${a};${b})$.<br>
     Tout vecteur colinéaire à $\\vec{u}$ est aussi un vecteur normal de $d$.`

      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
    this.canEnonce = texte
    this.canReponseACompleter = ''
  }

  correctionInteractive = (i) => {
    const champTexte1 = document.getElementById(
      `champTexteEx${this.numeroExercice}Q${2 * i}`,
    )
    const champTexte2 = document.getElementById(
      `champTexteEx${this.numeroExercice}Q${2 * i + 1}`,
    )
    const spanResultat1 = document.querySelector(
      `#resultatCheckEx${this.numeroExercice}Q${2 * i}`,
    )
    const spanResultat2 = document.querySelector(
      `#resultatCheckEx${this.numeroExercice}Q${2 * i + 1}`,
    )
    let saisie1 = champTexte1.value.replace(',', '.')
    let saisie2 = champTexte2.value.replace(',', '.')
    saisie1 = saisie1.replace(/\((\+?-?\d+)\)/, '$1') // Pour les nombres négatifs, supprime les parenthèses
    saisie2 = saisie2.replace(/\((\+?-?\d+)\)/, '$1') // Pour les nombres négatifs, supprime les parenthèses
    const x0 = this.autoCorrection[2 * i].reponse.valeur.reponse.value
    const y0 = this.autoCorrection[2 * i + 1].reponse.valeur.reponse.value
    const x = Number(saisie1)
    const y = Number(saisie2)
    let resultat
    if (egal(x / x0, y / y0) && !(x === 0 && y === 0)) {
      spanResultat1.innerHTML = '😎'
      spanResultat2.innerHTML = '😎'
      resultat = 'OK'
    } else {
      spanResultat1.innerHTML = '☹️'
      spanResultat2.innerHTML = '☹️'
      resultat = 'KO'
    }
    return resultat
  }
}
