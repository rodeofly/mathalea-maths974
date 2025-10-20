import { glisseNombre } from '../../lib/2d/GlisseNombre'
import { lampeMessage } from '../../lib/format/message'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  miseEnCouleur,
  miseEnEvidence,
  texteEnCouleur,
} from '../../lib/outils/embellissements'
import { range, rangeMinMax } from '../../lib/outils/nombres'
import { texNombre } from '../../lib/outils/texNombre'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre =
  'Multiplier un décimal par 10, 100, 1000, 0,1, 0,01, 0,001...'

// Gestion de la date de publication initiale
export const dateDePublication = '08/05/2025'

/**
 * Presentation didactique : Multiplier un décimal par 10, 100, 1000, 0,1, 0,01, 0,001...
 * Référence 6C30-6b
 * @author Mireille Gain (inspirée par 6C30-6)
 */
export const uuid = 'db71b'

export const refs = {
  'fr-fr': ['6N2B-3'],
  'fr-2016': ['6C30-6b'],
  'fr-ch': ['9NO8-21'],
}
export default class MultiplierUnDecimalParPuissanceDeDix extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = [
      'Les nombres à multiplier sont entiers',
      false,
    ]
    this.besoinFormulaire2Numerique = [
      'Type de questions',
      3,
      ' 1 : Dizaines, centaines, milliers\n 2 : Dixièmes, centièmes, millièmes\n 3 : Mélange',
    ]
    this.besoinFormulaire3CaseACocher = [
      'Avec le glisse-nombre pour la correction',
    ]
    this.besoinFormulaire4CaseACocher = ['Afficher un rappel de méthode']

    this.nbQuestions = 6 // Ici le nombre de questions

    this.sup = false
    this.sup2 = 3
    this.sup3 = false
    this.sup4 = false
  }

  nouvelleVersion() {
    const choixUnites = [
      'millièmes',
      'centièmes',
      'dixièmes',
      '',
      'dizaines',
      'centaines',
      'milliers',
    ]
    let listeChoixAlea = range(6, [3])
    let reponse
    this.nbQuestions = Math.min(this.nbQuestions, 6)
    if (parseInt(this.sup2) === 1) {
      listeChoixAlea = rangeMinMax(4, 6)
    }
    if (parseInt(this.sup2) === 2) {
      listeChoixAlea = range(2)
      this.nbQuestions = Math.min(this.nbQuestions, 3)
    }
    this.consigne = ''
    if (!context.isDiaporama && this.sup4) {
      this.consigne = lampeMessage({
        titre: '',
        texte: `1${texteEnCouleur('4', 'green')},5 $\\times$ ${texteEnCouleur('10', 'blue')} = 1${texteEnCouleur('4', 'green')},5  ${texteEnCouleur('dizaines', 'blue')} = 1${texteEnCouleur('4', 'green')}5. <br>
    En effet, le chiffre des unités ($${miseEnEvidence('4', 'green')}$) est devenu celui des ${texteEnCouleur('dizaines', 'blue')}.`,
        couleur: 'nombres',
      })
    }
    if (!context.isDiaporama) {
      this.consigne += 'Calculer.'
    }

    listeChoixAlea = combinaisonListes(listeChoixAlea, this.nbQuestions)
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const choixAlea = listeChoixAlea[0]
      listeChoixAlea.splice(0, 1)
      const centaine = randint(0, 1) === 0 ? choice(rangeMinMax(0, 9)) : 0
      const dizaine = choice(rangeMinMax(0, 9), [centaine])
      const unite = choice(rangeMinMax(0, 9), [centaine, dizaine])
      const dixieme = this.sup
        ? 0
        : choice(rangeMinMax(0, 9), [centaine, dizaine, unite])
      const centieme =
        randint(0, 1) !== 0 || this.sup
          ? 0
          : choice(rangeMinMax(0, 9), [centaine, dizaine, unite, dixieme])
      const exemple =
        centaine * 100 + dizaine * 10 + unite + dixieme / 10 + centieme / 100

      texte = `$${texNombre(exemple, 2)} \\times ${texNombre(10 ** (choixAlea - 3), 3)} =$`
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(
          this,
          i,
          'inline largeur01 college6eme',
        )
      }
      texteCorr = `$${texNombre(exemple, 2)} \\times ${miseEnCouleur(texNombre(10 ** (choixAlea - 3), 3), 'blue')} = $  `
      texteCorr += `$${texNombre(exemple, 2)}$ ${texteEnCouleur(choixUnites[choixAlea], 'blue')} = $${miseEnEvidence(texNombre(exemple * 10 ** (choixAlea - 3), 5))}.$<br>`
      texteCorr += `En effet, le chiffre des unités ( ${texteEnCouleur(unite, 'green')} ) est devenu celui des ${texteEnCouleur(choixUnites[choixAlea], 'blue')}. <br> `
      reponse = texNombre(exemple * 10 ** (choixAlea - 3))
      handleAnswers(this, i, { reponse: { value: reponse } })
      if (this.html) {
        if (this.sup3) {
          texteCorr += mathalea2d(
            { xmin: 2.5, xmax: 27.5, ymin: -5, ymax: 5.5 },
            glisseNombre(exemple, choixAlea - 3),
          )
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
