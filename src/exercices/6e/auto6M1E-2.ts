import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { texNombre } from '../../lib/outils/texNombre'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

import { miseEnEvidence } from '../../lib/outils/embellissements'

export const titre =
  'Calculer mentalement le périmètre de carrés, rectangles et cercles'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '13/12/2024'
export const dateDeModifImportante = '03/04/2025'

export const uuid = 'e9252'
export const refs = {
  'fr-fr': ['auto6M1E-2', '3AutoG08-1'],
  'fr-2016': ['6M25-1'],
  'fr-ch': ['9GM1-18'],
}
/**
 * Les longueurs sont choisies de telle sorte que le calcul mental soit possible.
 * @author Rémi Angot
 */
export default class PerimetresCalculMental extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 4
    this.spacingCorr = 2
    this.besoinFormulaireTexte = [
      'Type de figures',
      [
        'Nombres séparés par des tirets  :',
        '1 : Carré',
        '2 : Rectangle',
        '3 : Cercle avec rayon',
        '4 : Cercle avec diamètre',
        '5 : Mélange',
      ].join('\n'),
    ]
    this.sup = 5
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions === 1
        ? 'Calculer le périmètre exact de la figure suivante.'
        : 'Calculer le périmètre exact des figures suivantes.'

    const listeTypeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      nbQuestions: this.nbQuestions,
      listeOfCase: ['carré', 'rectangle', 'cercleRayon', 'cercleDiametre'],
      min: 1,
      max: 4,
      melange: 5,
      defaut: 5,
    }).map(String)

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      let texteInteractif = ''
      switch (listeTypeQuestions[i]) {
        case 'carré':
          {
            const c = randint(2, 11) + randint(2, 9) / 10
            texte = `Carré de côté $${texNombre(c)}$ cm`
            texteCorr = '$\\mathcal{P}_\\text{carré} = 4 \\times c$'
            texteCorr += `<br>$\\mathcal{P}_\\text{carré} = 4 \\times ${texNombre(c)}~\\text{cm}$`
            texteCorr += `<br>$\\mathcal{P}_\\text{carré} = ${miseEnEvidence(texNombre(4 * c))}~\\text{cm}$`
            texteInteractif += ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.college6eme,
              {
                texteAvant: '$\\mathcal{P}_\\text{carré} =$',
                texteApres: '$~\\text{cm}$',
              },
            )
            handleAnswers(this, i, { reponse: { value: texNombre(4 * c) } })
          }
          break
        case 'rectangle':
          {
            const l = randint(1, 3) + randint(1, 4) / 10
            const L = randint(5, 9) + randint(1, 4) / 10
            texte = `Rectangle de longueur $${texNombre(L)}$ cm et de largeur $${texNombre(l)}$ cm`
            texteCorr = '$\\mathcal{P}_\\text{rectangle} = 2 \\times (L + l)$'
            texteCorr += `<br>$\\mathcal{P}_\\text{rectangle} = 2 \\times (${texNombre(L)} + ${texNombre(l)})~\\text{cm}$`
            texteCorr += `<br>$\\mathcal{P}_\\text{rectangle} = 2 \\times ${texNombre(L + l)}~\\text{cm}$`
            texteCorr += `<br>$\\mathcal{P}_\\text{rectangle} = ${miseEnEvidence(texNombre(2 * (L + l)))}~\\text{cm}$`
            texteInteractif += ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.college6eme,
              {
                texteAvant: '$\\mathcal{P}_\\text{rectangle} =$',
                texteApres: '$~\\text{cm}$',
              },
            )
            handleAnswers(this, i, {
              reponse: { value: texNombre(2 * L + 2 * l) },
            })
          }
          break
        case 'cercleRayon':
          {
            const r = randint(2, 9)
            texte = `Cercle de rayon $${texNombre(r)}$ cm`
            texteCorr =
              '$\\mathcal{P}_\\text{cercle} = 2 \\times r \\times \\pi$'
            texteCorr += `<br>$\\mathcal{P}_\\text{cercle} = 2 \\times ${texNombre(r)}~\\text{cm} \\times \\pi$`
            texteCorr += `<br>$\\mathcal{P}_\\text{cercle} = ${miseEnEvidence(`${texNombre(2 * r)}\\pi`)}~\\text{cm}$`
            texteInteractif += ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.college6eme,
              {
                texteAvant: '$\\mathcal{P}_\\text{cercle} =$',
                texteApres: '$~\\text{cm}$',
              },
            )
            handleAnswers(this, i, {
              reponse: {
                value: `${2 * r}\\pi`,
                options: { exclusifFactorisation: true },
              },
            })
          }
          break
        case 'cercleDiametre': {
          const d = randint(2, 9)
          texte = `Cercle de diamètre $${texNombre(d)}$ cm`
          texteCorr = '$\\mathcal{P}_\\text{cercle} = d \\times \\pi$'
          texteCorr += `<br>$\\mathcal{P}_\\text{cercle} = ${miseEnEvidence(`${texNombre(d)}\\pi`)}~\\text{cm}$`
          texteInteractif += ajouteChampTexteMathLive(
            this,
            i,
            KeyboardType.college6eme,
            {
              texteAvant: '$\\mathcal{P}_\\text{cercle} =$',
              texteApres: '$~\\text{cm}$',
            },
          )
          handleAnswers(this, i, {
            reponse: {
              value: `${d}\\pi`,
              options: { exclusifFactorisation: true },
            },
          })
        }
      }
      if (this.questionJamaisPosee(i, texte)) {
        if (this.interactif) {
          texte += '.<br>' + texteInteractif
        }
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
