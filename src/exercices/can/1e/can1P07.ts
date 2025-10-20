import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import Exercice from '../../Exercice'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import FractionEtendue from '../../../modules/FractionEtendue'
import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'

import { setReponse } from '../../../lib/interactif/gestionInteractif'
import { tableauColonneLigne } from '../../../lib/2d/tableau'

export const titre = 'Déterminer une probabilité dans un tableau d’effectifs'
export const dateDePublication = '06/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora

 */
export const uuid = '1b057'

export const refs = {
  'fr-fr': ['can1P07'],
  'fr-ch': ['3mP1-12'],
}
export default class CalculProbaTableauEff extends Exercice {
  constructor() {
    super()

    this.sup = true
    this.keyboard = [
      'numbers',
      'fullOperations',
      'variables',
      'trigo',
      'advanced',
    ]

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    for (
      let i = 0,
        cpt = 0,
        reponse,
        tableau,
        choix,
        F,
        V,
        T,
        FinterV,
        texte,
        texteCorr;
      i < this.nbQuestions && cpt < 50;

    ) {
      // On choisit les probas de l'arbre
      F = randint(27, 80)
      V = randint(41, 70)
      FinterV = randint(5, 20)
      T = randint(160, 180)
      choix = choice([true, false])
      tableau = tableauColonneLigne(
        ['', 'F', '\\overline{F}', '\\text{Total}'],
        ['V', '\\overline{V}', '\\text{Total}'],
        [
          `${texNombre(FinterV, 2)}`,
          `${texNombre(V - FinterV, 2)}`,
          `${texNombre(V, 2)}`,
          `${texNombre(F - FinterV)}`,
          `${texNombre(T - F - V + FinterV)}`,
          `${texNombre(T - V)}`,
          `${texNombre(F)}`,
          `${texNombre(T - F)}`,
          `${texNombre(T)}`,
        ],
      )
      texte = `Dans ce tableau, on note  :<br>
      $F$ : « La personne est une fille » et $V$ : « La personne a plus de $20$ ans ».<br>
      On choisit une personne au hasard.<br>`
      this.canEnonce = texte
      switch (choice([1, 2, 3, 4, 5, 6, 7, 8])) {
        case 1: // p(F)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br>$P(F)=$ '
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte += '<br>Déterminer $P(F)$.'
            }
          } else {
            if (this.interactif) {
              texte += '<br>Quelle est la probabilité de choisir une fille ?'
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte +=
                '<br>Quelle est la probabilité de choisir une fille ?<br>'
            }
          }
          texteCorr = ` $P(F)=\\dfrac{\\text{Nombre de filles}}{\\text{Nombre  de personnes au total}}=\\dfrac{${texNombre(F)}}{${texNombre(T)}}$
      `
          reponse = new FractionEtendue(F, T)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          this.canEnonce += `${tableau}<br>
          Quelle est la probabilité de choisir une fille ?`
          this.canReponseACompleter = ''
          break

        case 2: // p(FinterV)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P(F\\cap V)=$ '
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte += '<br> Déterminer $P(F\\cap V)$.'
              this.canEnonce += `${tableau}<br>`
              this.canReponseACompleter = '$P(F\\cap V)=\\ldots$'
            }
          } else {
            if (this.interactif) {
              texte +=
                '<br>Quelle est la probabilité de choisir une fille qui a plus de $20$ ans ?'
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte +=
                '<br> Quelle est la probabilité de choisir une fille de plus de $20$ ans ?<br>'
              this.canEnonce += `${tableau}<br>
            Quelle est la probabilité de choisir une fille de plus de $20$ ans ?`
              this.canReponseACompleter = ''
            }
          }
          texteCorr = ` La probabilité est donnée par : <br>
          $P(F\\cap V)=\\dfrac{\\text{Nombre de filles de plus de 20 ans}}{\\text{Nombre  de personnes au total}}=\\dfrac{${texNombre(F)}}{${texNombre(T)}}$
      `
          reponse = new FractionEtendue(FinterV, T)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          break

        case 3: // p_V(F)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P_V(F)=$ '
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte += '<br>Déterminer $P_V(F)$. '
              this.canEnonce += `${tableau}<br>`
              this.canReponseACompleter = '$P_V(F)=\\ldots$'
            }
          } else {
            texte += `${
              choix
                ? '<br>Quelle est la probabilité de choisir une fille sachant qu’elle a plus de $20$ ans ?'
                : '<br>La personne choisie a plus de $20$ ans. Quelle est la probabilité que ce soit une fille ?'
            }`
            texte += ajouteChampTexteMathLive(this, i, ' lycee')
            this.canEnonce += `${tableau}<br>
            ${
              choix
                ? 'Quelle est la probabilité de choisir une fille sachant qu’elle a plus de $20$ ans ?'
                : 'La personne choisie a plus de $20$ ans. Quelle est la probabilité que ce soit une fille ?'
            }`
            this.canReponseACompleter = ''
          }
          texteCorr = `La probabilité est donnée par : <br>
          $P_V(F)=\\dfrac{\\text{Nombre de filles de plus de 20 ans}}{\\text{Nombre  de personnes de plus de 20 ans}}=\\dfrac{${texNombre(FinterV)}}{${texNombre(V)}}$
      `
          reponse = new FractionEtendue(FinterV, V)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          break

        case 4: // p(FinterVbarre))
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P(F\\cap\\overline{V})=$ '
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte += '<br>Déterminer $P(F\\cap\\overline{V})$. '
              this.canEnonce += `${tableau}<br>`
              this.canReponseACompleter = '$P(F\\cap\\overline{V})=\\ldots$'
            }
          } else {
            if (this.interactif) {
              texte +=
                '<br>Quelle est la probabilité de choisir une fille de moins de $20$ ans ?'
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte +=
                '<br>Quelle est la probabilité de choisir une fille de moins de $20$ ans ?<br>'
              this.canEnonce += `${tableau}<br>
              Quelle est la probabilité de choisir une fille de moins de $20$ ans ?`
              this.canReponseACompleter = ''
            }
          }
          texteCorr = `La probabilité est donnée par : <br>
          $P(F\\cap\\overline{V})=\\dfrac{\\text{Nombre de filles de moins de 20 ans}}{\\text{Nombre  total de personnes}}=\\dfrac{${texNombre(F - FinterV)}}{${texNombre(T)}}$
      `
          reponse = new FractionEtendue(F - FinterV, T)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })

          break

        case 5: // p_Vbarre(Fbarre)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P_{\\overline{V}}(\\overline{F})=$ '
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte += `<br>
            Déterminer $P_{\\overline{V}}(\\overline{F})$. `
              this.canEnonce += `${tableau}<br>`
              this.canReponseACompleter =
                '$P_{\\overline{V}}(\\overline{F})=\\ldots$'
            }
          } else {
            texte += `${
              choix
                ? '<br>Quelle est la probabilité de choisir un garçon sachant qu’il a moins de $20$ ans ?'
                : '<br> La personne choisie a moins de $20$ ans. Quelle est la probabilité que ce soit un garçon ?'
            }`
            texte += ajouteChampTexteMathLive(this, i, ' lycee')
            this.canEnonce += `${tableau}<br>
            ${
              choix
                ? 'Quelle est la probabilité de choisir un garçon sachant qu’il a moins de $20$ ans ?'
                : ' La personne choisie a moins de $20$ ans. Quelle est la probabilité que ce soit un garçon ?'
            }`
            this.canReponseACompleter = ''
          }
          texteCorr = `La probabilité est donnée par : <br>
          $P_{\\overline{V}}(\\overline{F})=\\dfrac{\\text{Nombre de garçons de moins de 20 ans}}{\\text{Nombre  de personnes de moins de 20 ans}}=\\dfrac{${texNombre(T - F - V + FinterV)}}{${texNombre(T - V)}}$
      `
          reponse = new FractionEtendue(T - F - V + FinterV, T - V)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })
          break

        case 6: // p_F(V)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P_{F}(V)=$ '
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte += '<br>Déterminer $P_{F}(V)$. '
              this.canEnonce += `${tableau}<br>`
              this.canReponseACompleter = '$P_{F}(V)=\\ldots$'
            }
          } else {
            texte += `${
              choix
                ? '<br> Quelle est la probabilité de choisir une personne de plus de $20$ ans sachant que c’est une fille ?'
                : '<br> La personne choisie est une fille. Quelle est la probabilité qu’elle ait plus de $20$ ans  ?'
            }`
            texte += ajouteChampTexteMathLive(this, i, ' lycee')
            this.canEnonce += `${tableau}<br>
            ${
              choix
                ? ' Quelle est la probabilité de choisir une personne de plus de $20$ ans sachant que c’est une fille ?'
                : 'La personne choisie est une fille. Quelle est la probabilité qu’elle ait plus de $20$ ans  ?'
            }`
            this.canReponseACompleter = ''
          }
          texteCorr = `La probabilité est donnée par : <br>
          $P_{F}(V)=\\dfrac{\\text{Nombre de filles de plus de 20 ans}}{\\text{Nombre  de filles}}=\\dfrac{${texNombre(FinterV)}}{${texNombre(F)}}$
      `
          reponse = new FractionEtendue(FinterV, F)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })

          break

        case 7: // p_Farre(V)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P_{\\overline{F}}(V)=$ '
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte += '<br> Déterminer $P_{\\overline{F}}(V)$. '
              this.canEnonce += `${tableau}<br>`
              this.canReponseACompleter = '$P_{\\overline{F}}(V)=\\ldots$'
            }
          } else {
            texte += `${
              choix
                ? '<br>Quelle est la probabilité de choisir une personne de plus de $20$ ans sachant que c’est un garçon ?'
                : '<br>La personne choisie est un garçon. Quelle est la probabilité qu’il ait plus de $20$ ans  ?'
            }`
            texte += ajouteChampTexteMathLive(this, i, ' lycee')
            this.canEnonce += `${tableau}<br>
            ${
              choix
                ? 'Quelle est la probabilité de choisir une personne de plus de $20$ ans sachant que c’est un garçon ?'
                : 'La personne choisie est un garçon. Quelle est la probabilité qu’il ait plus de $20$ ans  ?'
            }`
            this.canReponseACompleter = ''
          }

          texteCorr = `La probabilité est donnée par : <br>
          $P_{\\overline{F}}(V)=\\dfrac{\\text{Nombre de garçons de plus de 20 ans}}{\\text{Nombre  de garçons}}=\\dfrac{${texNombre(V - FinterV)}}{${texNombre(T - F)}}$
      `
          reponse = new FractionEtendue(V - FinterV, T - F)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })

          break

        case 8: // p(Vbarre)
          texte += `${tableau}`
          if (choice([true, false])) {
            if (this.interactif) {
              texte += '<br> $P(\\overline{V})=$ '
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte += '<br>Déterminer $P(\\overline{V})$. '
              this.canEnonce += `${tableau}<br>`
              this.canReponseACompleter = '$P(\\overline{V})=\\ldots$'
            }
          } else {
            if (this.interactif) {
              texte +=
                '<br>Quelle est la probabilité de choisir une personne de moins de $20$ ans ?'
              texte += ajouteChampTexteMathLive(this, i, ' lycee')
            } else {
              texte +=
                '<br>  Quelle est la probabilité de choisir une personne de moins de $20$ ans ?'
              this.canEnonce += `${tableau}<br>
              Quelle est la probabilité de choisir une personne de moins de $20$ ans ?`
              this.canReponseACompleter = ''
            }
          }
          texteCorr = ` $P(\\overline{V})=\\dfrac{\\text{Nombre de personnes de moins de 20 ans}}{\\text{Nombre  de personnes au total}}=\\dfrac{${texNombre(T - V)}}{${texNombre(T)}}$
      `
          reponse = new FractionEtendue(T - V, T)
          setReponse(this, i, reponse, { formatInteractif: 'fractionEgale' })

          break
      }
      if (this.questionJamaisPosee(i, F, V)) {
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
