import { combinaisonListes, choice } from '../../lib/outils/arrayOutils'
import { numAlpha } from '../../lib/outils/outilString'
import Exercice from '../Exercice'
import {
  randint,
  listeQuestionsToContenuSansNumero,
} from '../../modules/outils'
import { context } from '../../modules/context'
import { tableauColonneLigne } from '../../lib/2d/tableau'
import { AddTabDbleEntryMathlive } from '../../lib/interactif/tableaux/AjouteTableauMathlive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'

import { texNombre } from '../../lib/outils/texNombre'
import FractionEtendue from '../../modules/FractionEtendue'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { arrondi } from '../../lib/outils/nombres'
export const titre = "Compléter et utiliser un tableau d'effectif"
export const dateDePublication = '08/01/2024'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Compléter ou utiliser un tableau
 * @author Gilles Mora +Jean-Claude Lhote pour l'interactif

 */
export const uuid = '3f39d'
// Je déréférence temporairement pour éviter que cet exo non finalisé apparaîsse dans le menu.

// export const refs = {
//  'fr-fr': ['2S10-4'],
//   'fr-ch': []
//  }

export default class TableauProportion extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      3,
      ' 1 : Tableau à compléter\n 2 : Utiliser un tableau\n 3 : Mélange',
    ]

    this.spacing = context.isHtml ? 1.5 : 2
    this.spacingCorr = context.isHtml ? 1 : 2
    this.nbQuestions = 1
    this.sup = 2

    this.listeAvecNumerotation = false
    this.exoCustomResultat = true
    this.nbQuestionsModifiable = false
  }

  nouvelleVersion() {
    this.answers = {}

    let typesDeQuestionsDisponibles = [1]
    if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2]
    } else {
      typesDeQuestionsDisponibles = [1, 2]
    }
    const toutPourUn: (l: number[]) => [number, number] = (
      listePoints: number[],
    ) => [Math.min(...listePoints), 1]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )

    let index = 0
    let increment = 1
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const typesDeQuestions = listeTypeDeQuestions[i]
      const total = choice([100, 150, 200, 250, 300, 350]) //
      const totalGA = (randint(4, 6) * total) / 10
      const totalG = (randint(5, 6) * total) / 10
      const totalF = total - totalGA
      const totalT = total - totalG
      const GAetG = (choice([26, 28]) * total) / 100
      const FetG = totalG - GAetG
      const GAetT = totalGA - GAetG
      const FetT = totalF - FetG
      const pourcGA = (totalGA * 100) / total
      const pourcG = (totalG * 100) / total
      const pourcGAetG = (GAetG * 100) / total
      const pourcF = (totalF * 100) / total
      const pourcT = (totalT * 100) / total
      const choix = choice([true, false])
      let texte = ''
      let texteCorr = ''

      const choixEnonce = choice([
        [
          `Dans un lycée, on compte $${total}$ élèves en classe de première dont $${texNombre(pourcGA, 0)} \\,\\%$ sont des garçons et $${texNombre(pourcG, 0)} \\,\\%$ sont dans une filière générale. <br>
      De plus, $${texNombre(pourcGAetG, 0)} \\,\\%$ des élèves sont des garçons en première générale.`,
          `$\\bullet$ $${texNombre(pourcGA, 0)} \\,\\%$ de $${total}=${texNombre(pourcGA / 100, 2)}\\times ${total}=${totalGA}$<br>
      $${totalGA}$ élèves sont des garçons.<br><br>
      $\\bullet$ $${texNombre(pourcG, 0)} \\,\\%$ de $${total}=${texNombre(pourcG / 100, 2)}\\times ${total}=${totalG}$<br>
      $${totalG}$ élèves sont en filière génarale.<br><br>
      $\\bullet$ $${texNombre(pourcGAetG, 0)} \\,\\%$ de $${total}=${texNombre(pourcGAetG / 100, 2)}\\times ${total}=${GAetG}$<br>
      $${GAetG}$ élèves sont des garçons en filière générale.<br><br>`,
        ],
        [
          `Dans un lycée, on compte $${total}$ élèves en classe de première dont $${texNombre(pourcF, 0)} \\,\\%$ sont des filles et $${texNombre(pourcT, 0)} \\,\\%$ sont dans une filière technologique. <br>
      De plus, $${texNombre(pourcGAetG, 0)} \\,\\%$ des élèves sont des garçons en première générale.`,
          `$\\bullet$ $${texNombre(pourcF, 0)} \\,\\%$ de $${total}=${texNombre(pourcF / 100, 2)}\\times ${total}=${totalF}$<br>
      $${totalF}$ élèves sont des filles.<br><br>
      $\\bullet$ $${texNombre(pourcT, 0)} \\,\\%$ de $${total}=${texNombre(pourcT / 100, 2)}\\times ${total}=${totalT}$<br>
      $${totalT}$ élèves sont en filière technologique.<br><br>
      $\\bullet$ $${texNombre(pourcGAetG, 0)} \\,\\%$ de $${total}=${texNombre(pourcGAetG / 100, 2)}\\times ${total}=${GAetG}$<br>
      $${GAetG}$ élèves sont des garçons en filière générale.<br><br>`,
        ],
      ])
      const entetesCol = [
        '~',
        '\\text{Garçons}',
        '\\text{Filles}',
        '\\text{Total}',
      ]
      const entetesLgn = [
        '\\text{Première générale}',
        '\\text{Première technologique}',
        '\\text{Total}',
      ]
      const contenu = ['', '', '', '', '', '', '', '', '']
      switch (typesDeQuestions) {
        case 1: // tableau à compléter
          texte = `${choixEnonce[0]}`
          texte += '<br> Compléter le tableau suivant :<br><br>'
          if (this.interactif) {
            const tableauVide =
              AddTabDbleEntryMathlive.convertTclToTableauMathlive(
                entetesCol,
                entetesLgn,
                ['', '', '', '', '', '', '', '', ''],
              )
            const tabMathlive = AddTabDbleEntryMathlive.create(
              this.numeroExercice ?? 0,
              index,
              tableauVide,
              ' ',
              this.interactif,
              {},
            )
            texte += tabMathlive.output
          } else {
            texte += tableauColonneLigne(
              entetesCol,
              entetesLgn,
              contenu,
              1,
              true,
              this.numeroExercice,
              i,
            )
          }
          texteCorr = `${choixEnonce[1]}`
          texteCorr += 'On en déduit le tableau suivant : <br> <br>'
          texteCorr += tableauColonneLigne(
            ['~', '\\text{Garçons}', '\\text{Filles}', '\\text{Total}'],
            [
              '\\text{Première générale}',
              '\\text{Première technologique}',
              '\\text{Total}',
            ],
            [
              `${miseEnEvidence(GAetG)}`,
              `${miseEnEvidence(FetG)}`,
              `${miseEnEvidence(totalG)}`,
              `${miseEnEvidence(GAetT)}`,
              `${miseEnEvidence(FetT)}`,
              `${miseEnEvidence(totalT)}`,
              `${miseEnEvidence(totalGA)}`,
              `${miseEnEvidence(totalF)}`,
              `${miseEnEvidence(total)}`,
            ],
            1,
            true,
            this.numeroExercice,
            i,
          )
          handleAnswers(this, index, {
            bareme: toutPourUn,
            L1C1: { value: GAetG },
            L1C2: { value: FetG },
            L1C3: { value: totalG },
            L2C1: { value: GAetT },
            L2C2: { value: FetT },
            L2C3: { value: totalT },
            L3C1: { value: totalGA },
            L3C2: { value: totalF },
            L3C3: { value: total },
          })
          increment = 1
          break
        case 2: // tableau à utiliser
          texte = `Dans un lycée, on compte $${total}$ élèves en classe de première.<br>
        Ils sont répartis selon le tableau suivant :<br><br> `
          texte += tableauColonneLigne(
            ['~', '\\text{Garçons}', '\\text{Filles}', '\\text{Total}'],
            [
              '\\text{Filière générale}',
              '\\text{Filière technologique}',
              '\\text{Total}',
            ],
            [
              `${GAetG}`,
              `${FetG}`,
              `${totalG}`,
              `${GAetT}`,
              `${FetT}`,
              `${totalT}`,
              `${totalGA}`,
              `${totalF}`,
              `${total}`,
            ],
          )

          texte += `<br><br>${numAlpha(0)}  Quelle est la proportion de ${choix ? 'filles' : 'garçons'} en première technologique parmi les élèves de ce lycée ?<br>`
          handleAnswers(this, index, {
            reponse: {
              value: choix
                ? new FractionEtendue(FetT, total).texFraction
                : new FractionEtendue(GAetT, total).texFraction,
            },
          })
          texte += `Sous la forme d'une fraction : ${this.interactif ? '' : '$\\ldots$'}`
          texte += ajouteChampTexteMathLive(this, index, '')
          handleAnswers(this, index + 1, {
            reponse: {
              value: choix
                ? texNombre((FetT * 100) / total, 0)
                : texNombre((GAetT * 100) / total, 0),
            },
          })
          texte += `<br>Sous la forme d'un pourcentage (arrondir à l'unité si besoin) : ${this.interactif ? '' : '$\\ldots\\,\\%$'}`
          texte += ajouteChampTexteMathLive(this, index + 1, '', {
            texteApres: '%',
          })

          texte += `<br><br>${numAlpha(1)} Quelle est la proportion de ${choix ? 'filles' : 'garçons'} en première technologique parmi les élèves en première technologique ?<br>`
          handleAnswers(this, index + 2, {
            reponse: {
              value: choix
                ? new FractionEtendue(FetT, totalT).texFraction
                : new FractionEtendue(GAetT, totalT).texFraction,
            },
          })
          texte += `Sous la forme d'une fraction : ${this.interactif ? '' : '$\\ldots$'}`
          texte += ajouteChampTexteMathLive(this, index + 2, '')
          handleAnswers(this, index + 3, {
            reponse: {
              value: choix
                ? arrondi((FetT * 100) / totalT, 0)
                : arrondi((GAetT * 100) / totalT, 0),
            },
          })
          texte += `<br>Sous la forme d'un pourcentage (arrondir à l'unité si besoin) : ${this.interactif ? '' : '$\\ldots\\,\\%$'}`
          texte += ajouteChampTexteMathLive(this, index + 3, '', {
            texteApres: '%',
          })

          texte += `<br><br>${numAlpha(2)}  Quelle est la proportion de ${choix ? 'filles' : 'garçons'} en première technologique parmi les ${choix ? 'filles' : 'garçons'} ?<br>`
          handleAnswers(this, index + 4, {
            reponse: {
              value: choix
                ? new FractionEtendue(FetT, totalF).texFraction
                : new FractionEtendue(GAetT, totalGA).texFraction,
            },
          })
          texte += `Sous la forme d'une fraction : ${this.interactif ? '' : '$\\ldots$'}`
          texte += ajouteChampTexteMathLive(this, index + 4, '')
          handleAnswers(this, index + 5, {
            reponse: {
              value: choix
                ? arrondi((FetT * 100) / totalF, 0)
                : arrondi((GAetT * 100) / totalGA, 0),
            },
          })
          texte += `<br>Sous la forme d'un pourcentage (arrondir à l'unité si besoin) : ${this.interactif ? '' : '$\\ldots\\,\\%$'}`
          texte += ajouteChampTexteMathLive(this, index + 5, '', {
            texteApres: '%',
          })

          texteCorr = `${numAlpha(0)} La proportion de ${choix ? 'filles' : 'garçons'} en première technologique parmi les élèves de ce lycée est donnée par le quotient : 
          ${choix ? ` $${miseEnEvidence(`\\dfrac{${FetT}}{${total}}`)}$.` : ` $${miseEnEvidence(`\\dfrac{${GAetT}}{${total}}`)}$.`} <br>
         Sous la forme d'un pourcentage, on obtient :  ${choix ? ` $${miseEnEvidence(`${miseEnEvidence((FetT * 100) / total)} \\,\\%`)}$.` : ` $${miseEnEvidence(`${miseEnEvidence((GAetT * 100) / total)} \\,\\%`)}$.`}<br>`

          texteCorr += `${numAlpha(1)} La proportion de ${choix ? 'filles' : 'garçons'} en première technologique parmi parmi les élèves en première technologique est donnée par le quotient : 
          ${choix ? ` $${miseEnEvidence(`\\dfrac{${FetT}}{${totalT}}`)}$.` : ` $${miseEnEvidence(`\\dfrac{${GAetT}}{${totalT}}`)}$.`} <br>
         Sous la forme d'un pourcentage, on obtient :  ${choix ? ` $${miseEnEvidence(`${miseEnEvidence(arrondi((FetT * 100) / totalT, 0))} \\,\\%`)}$.` : ` $${miseEnEvidence(`${miseEnEvidence(arrondi((GAetT * 100) / totalT, 0))} \\,\\%`)}$.`}<br>`

          texteCorr += `${numAlpha(2)} La proportion de ${choix ? 'filles' : 'garçons'} en première technologique parmi les ${choix ? 'filles' : 'garçons'}  est donnée par le quotient : 
         ${choix ? ` $${miseEnEvidence(`\\dfrac{${FetT}}{${totalF}}`)}$.` : ` $${miseEnEvidence(`\\dfrac{${GAetT}}{${totalGA}}`)}$.`} <br>
        Sous la forme d'un pourcentage, on obtient :  ${choix ? ` $${miseEnEvidence(`${miseEnEvidence(arrondi((FetT * 100) / totalF, 0))} \\,\\%`)}$.` : ` $${miseEnEvidence(`${miseEnEvidence(arrondi((GAetT * 100) / totalGA, 0))} \\,\\%`)}$.`}`

          increment = 6
          break
      }

      if (this.questionJamaisPosee(i, total, typesDeQuestions)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
        index += increment
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
