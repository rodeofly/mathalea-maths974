import {
  ecritureAlgebrique,
  reduireAxPlusB,
} from '../../../lib/outils/ecritures'
import { texteCentre } from '../../../lib/format/miseEnPage'
import Exercice from '../../Exercice'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import { remplisLesBlancs } from '../../../lib/interactif/questionMathLive'

import { handleAnswers } from '../../../lib/interactif/gestionInteractif'

export const titre =
  "Déterminer les coordonnées du sommet d'une parabole à partir de la forme canonique"
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '1/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Trouver les coordonnées du sommet d'une parabole donnée par sa forme canonique.
 * @author Gilles Mora

 */
export const uuid = 'f2035'

export const refs = {
  'fr-fr': ['can1F01'],
  'fr-ch': [],
}
export default class CoordonneesSommetParabole extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let texte, texteCorr, a, b, c
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      a = randint(-10, 10, [0, -1, 1])
      b = randint(-5, 5, 0)
      c = randint(-5, 5)
      const mathfield = remplisLesBlancs(
        this,
        i,
        '\\Bigg(~~%{champ1}~~;~~%{champ2}~~\\Bigg)',
      )
      const statique = '$\\Bigg(~~~~~;~~~~~\\Bigg)$'
      if (c === 0) {
        texte = `Les coordonnées du sommet de la parabole représentant
    la fonction $f$ définie sur $\\mathbb{R}$
    par $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2$ sont  :
    ${texteCentre(this.interactif ? mathfield : statique)}`
        if (b > 0) {
          texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
        ${texteCentre('$f(x)=a(x-\\alpha)^2+\\beta$')}Sous cette forme les coordonnées du sommet de la parabole qui représente la fonction $f$ sont :
    $(\\alpha;\\beta)$.
    ${texteCentre(` $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2=${reduireAxPlusB(0, a)}(x-(\\underbrace{-${b}}_{\\alpha}))^2+0$`)}.
     Ainsi, $\\alpha=-${b}$ et $\\beta=${c}$ et on en déduit que les coordonnées du sommet de la parabole sont : $(-${b};${c})$.`
        } else {
          texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
        ${texteCentre('$f(x)=a(x-\\alpha)^2+\\beta$')} Sous cette forme les coordonnées du sommet de la parabole qui représente la fonction $f$ sont :
  $(\\alpha;\\beta)$.
  ${texteCentre(`$f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2$`)}
     Puisque $\\alpha=${-b}$ et $\\beta=${c}$, on en déduit que les coordonnées du sommet de la parabole sont : $(${-b};${c})$.`
        }
        this.canEnonce = `Déterminer les coordonnées du sommet de la parabole représentant
        la fonction $f$ définie sur $\\mathbb{R}$
        par $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2$.`
        this.canReponseACompleter = ''
      } else {
        texte = `Les coordonnées du sommet de la parabole représentant
    la fonction $f$ définie sur $\\mathbb{R}$
    par     $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$ sont  :
     ${texteCentre(this.interactif ? mathfield : statique)}`
        if (b > 0) {
          texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
        ${texteCentre('$f(x)=a(x-\\alpha)^2+\\beta$')} Sous cette forme les coordonnées du sommet de la parabole qui représente la fonction $f$ sont :
        $(\\alpha;\\beta)$.
        ${texteCentre(`$f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}
        =${reduireAxPlusB(0, a)}(x-(\\underbrace{-${b}}_{\\alpha}))^2${ecritureAlgebrique(c)}$`)}
        Ainsi, $\\alpha=-${b}$ et $\\beta=${c}$ et on en déduit que les coordonnées du sommet de la parabole sont : $(${-b};${c})$.`
        } else {
          texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
        ${texteCentre('$f(x)=a(x-\\alpha)^2+\\beta$')}  Sous cette forme les coordonnées du sommet de la parabole qui représente la fonction $f$ sont :
        $(\\alpha;\\beta)$.
        ${texteCentre(`$f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$`)}
         Puisque $\\alpha=${-b}$ et $\\beta=${c}$, on en déduit que les coordonnées du sommet de la parabole sont : $(${-b};${c})$.`
        }
        this.canEnonce = `Déterminer les coordonnées du sommet de la parabole représentant
        la fonction $f$ définie sur $\\mathbb{R}$
        par  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$.`
        this.canReponseACompleter = ''
      }
      handleAnswers(this, i, {
        champ1: { value: String(-b) },
        champ2: { value: String(c) },
      })

      if (this.questionJamaisPosee(i, a, b, c)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(this.canReponseACompleter)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
