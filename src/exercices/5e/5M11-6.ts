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
  "Calculer l'aire de carrés, rectangles, triangles et disques (calcul mental)"
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '13/12/2024'
export const dateDeModifImportante = '03/04/2025'

export const uuid = '9e8f9'
export const refs = {
  'fr-fr': ['BP2AutoV8', '5M11-6', '3AutoG09-1'],
  'fr-2016': ['6M25-2', 'BP2AutoV8'],
  'fr-ch': ['9GM1-19'],
}
/**
 * Les longueurs sont choisies de telle sorte que le calcul mental soit possible.
 * @author Rémi Angot
 */
export default class AiresCalculMental extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 5
    this.spacingCorr = 2
    this.besoinFormulaireTexte = [
      'Type de figures',
      [
        'Nombres séparés par des tirets  :',
        '1 : Carré',
        '2 : Rectangle',
        '3 : Triangle',
        '4 : Disque avec rayon',
        '5 : Disque avec diamètre',
        '6 : Mélange',
      ].join('\n'),
    ]
    this.sup = 6

    // this.besoinFormulaireCaseACocher = ['Tracer les figures', false]
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions === 1
        ? "Calculer l'aire exacte de la figure suivante."
        : "Calculer l'aire exacte des figures suivantes."

    const listeTypeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      nbQuestions: this.nbQuestions,
      listeOfCase: [
        'carré',
        'rectangle',
        'triangle',
        'disqueRayon',
        'disqueDiametre',
      ],
      min: 1,
      max: 5,
      melange: 6,
      defaut: 6,
    }).map(String)

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      let texteInteractif = ''
      switch (listeTypeQuestions[i]) {
        case 'carré':
          {
            const c = randint(2, 10)
            texte = `Carré de côté $${texNombre(c)}$ cm`
            texteCorr = '$\\mathcal{A}_\\text{carré} = c \\times c$'
            texteCorr += `<br>$\\mathcal{A}_\\text{carré} = ${texNombre(c)}~\\text{cm}  \\times ${texNombre(c)}~\\text{cm}$`
            texteCorr += `<br>$\\mathcal{A}_\\text{carré} = ${miseEnEvidence(texNombre(c * c))}~\\text{cm}^2$`
            texteInteractif += ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.college6eme,
              {
                texteAvant: '$\\mathcal{A}_\\text{carré} =$',
                texteApres: '$~\\text{cm}^2$',
              },
            )
            handleAnswers(this, i, { reponse: { value: texNombre(c * c) } })
          }
          break
        case 'rectangle':
          {
            const l = randint(1, 3) + randint(2, 9) / 10
            const L = randint(5, 9)
            texte = `Rectangle de longueur $${texNombre(L)}$ cm et de largeur $${texNombre(l)}$ cm`
            texteCorr = '$\\mathcal{A}_\\text{rectangle} = L \\times l$'
            texteCorr += `<br>$\\mathcal{A}_\\text{rectangle} = ${texNombre(L)}~\\text{cm} \\times ${texNombre(l)}~\\text{cm}$`
            texteCorr += `<br>$\\mathcal{A}_\\text{rectangle} = ${miseEnEvidence(texNombre(L * l))}~\\text{cm}^2$`
            texteInteractif += ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.college6eme,
              {
                texteAvant: '$\\mathcal{A}_\\text{rectangle} =$',
                texteApres: '$~\\text{cm}^2$',
              },
            )
            handleAnswers(this, i, { reponse: { value: texNombre(L * l) } })
          }
          break
        case 'triangle':
          {
            const b = randint(2, 9)
            const h = randint(2, 9)
            texte = `Triangle de base $${texNombre(b)}$ cm et de hauteur $${texNombre(h)}$ cm`
            texteCorr =
              '$\\mathcal{A}_\\text{triangle} = (b \\times h) \\div 2$'
            texteCorr += `<br>$\\mathcal{A}_\\text{triangle} = (${texNombre(b)}~\\text{cm} \\times ${texNombre(h)}~\\text{cm}) \\div 2$`
            texteCorr += `<br>$\\mathcal{A}_\\text{triangle} = ${texNombre(b * h)}~\\text{cm}^2 \\div 2$`
            texteCorr += `<br>$\\mathcal{A}_\\text{triangle} = ${miseEnEvidence(texNombre((b * h) / 2))}~\\text{cm}^2$`
            texteInteractif += ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.college6eme,
              {
                texteAvant: '$\\mathcal{A}_\\text{triangle} =$',
                texteApres: '$~\\text{cm}^2$',
              },
            )
            handleAnswers(this, i, {
              reponse: { value: texNombre((b * h) / 2) },
            })
          }
          break
        case 'disqueRayon':
          {
            const r = randint(2, 9)
            texte = `Disque de rayon $${texNombre(r)}$ cm`
            texteCorr =
              '$\\mathcal{A}_\\text{disque} = r \\times r \\times \\pi$'
            texteCorr += `<br>$\\mathcal{A}_\\text{disque} = ${texNombre(r)}~\\text{cm} \\times ${texNombre(r)}~\\text{cm} \\times \\pi$`
            texteCorr += `<br>$\\mathcal{A}_\\text{disque} = ${miseEnEvidence(`${texNombre(r * r)}\\pi`)}~\\text{cm}^2$`
            texteInteractif += ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.college6eme,
              {
                texteAvant: '$\\mathcal{A}_\\text{disque} =$',
                texteApres: '$~\\text{cm}^2$',
              },
            )
            handleAnswers(this, i, {
              reponse: {
                value: `${r * r}\\pi`,
                options: { exclusifFactorisation: true },
              },
            })
          }
          break
        case 'disqueDiametre': {
          const r = randint(2, 9)
          texte = `Disque de diamètre $${texNombre(2 * r)}$ cm`
          texteCorr = '$\\mathcal{A}_\\text{disque} = r \\times r \\times \\pi$'
          texteCorr += `<br>$\\mathcal{A}_\\text{disque} = ${texNombre(r)}~\\text{cm} \\times ${texNombre(r)}~\\text{cm} $`
          texteCorr += `<br>$\\mathcal{A}_\\text{disque} = ${miseEnEvidence(`${texNombre(r * r)}\\pi`)}~\\text{cm}^2$`
          texteInteractif += ajouteChampTexteMathLive(
            this,
            i,
            KeyboardType.college6eme,
            {
              texteAvant: '$\\mathcal{A}_\\text{disque} =$',
              texteApres: '$~\\text{cm}^2$',
            },
          )
          handleAnswers(this, i, {
            reponse: {
              value: `${r * r}\\pi`,
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
