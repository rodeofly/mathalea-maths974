import { tableauColonneLigne } from '../../lib/2d/tableau'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { AddTabDbleEntryMathlive } from '../../lib/interactif/tableaux/AjouteTableauMathlive'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { arrondi, rangeMinMax } from '../../lib/outils/nombres'
import { sp } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import FractionEtendue from '../../modules/FractionEtendue'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Lier nombre décimal, fraction décimale et pourcentage'
export const dateDePublication = '04/06/2025'
export const interactifType = 'mathLive'
export const interactifReady = true

/**
 * Lier nombre décimal, fraction décimale et pourcentage
 * @author Eric Elter
 */

export const uuid = '2359a'

export const refs = {
  'fr-fr': ['6N1E', '3autoN06-1'],
  'fr-2016': ['6N23-10'],
  'fr-ch': [''],
}
export default class DecimalFractionPourcentage extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Choix du chiffre des centièmes',
      [
        'Nombres séparés par des tirets  :',
        '1 : Avoir un chiffre des centièmes jamais nul',
        '2 : Avoir un chiffre des centièmes toujours nul',
        '3 : Mélange',
      ].join('\n'),
    ]

    this.sup = 1
    this.nbQuestions = 1
    this.consigne =
      'Dans chaque colonne de ce tableau, il y a un unique nombre exprimé sous 3 formes différentes.<br>Compléter ce tableau.'
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions === 1
        ? 'Dans chaque colonne de ce tableau, il y a un unique nombre exprimé sous 3 formes différentes.<br>Compléter ce tableau.'
        : 'Dans chaque colonne de ces tableaux, il y a un unique nombre exprimé sous 3 formes différentes.<br>Compléter les tableaux suivants.'
    const typesDeQuestionsDisponibles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 2,
      melange: 3,
      defaut: 3,
      nbQuestions: 6 * this.nbQuestions,
    })
    const tableauDeDizaines = combinaisonListes(
      [20, 30, 40, 50, 60, 70, 80, 90],
      6,
    )
    const tableauDeNombres = combinaisonListes(
      rangeMinMax(11, 99, tableauDeDizaines),
      6,
    )

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const nbfractionDecimaleEtPourcentage = function (i: number) {
        const numerateur =
          Number(typesDeQuestionsDisponibles[i]) === 1
            ? tableauDeNombres[i]
            : tableauDeDizaines[i]
        return {
          decimal: texNombre(arrondi(numerateur / 100)),
          fractionDecimale: new FractionEtendue(numerateur, 100).texFraction,
          pourcentage: numerateur,
        }
      }

      const nbDecimal = []
      const nbDecimalCorr = []
      const nbDecimalCorrNu = []
      const pourcentage = []
      const pourcentageCorr = []
      const pourcentageCorrNu = []
      const fractionDecimale = []
      const fractionDecimaleCorr = []
      const fractionDecimaleCorrNu = []
      const typeLignes = combinaisonListes([0, 1, 2], 6)
      for (let k = 0; k < 6; k++) {
        const nb = nbfractionDecimaleEtPourcentage(k)
        const lig = typeLignes[k]
        nbDecimalCorrNu.push(nb.decimal)
        pourcentageCorrNu.push(nb.pourcentage + sp() + '\\%')
        fractionDecimaleCorrNu.push(nb.fractionDecimale)
        if (lig === 0) {
          nbDecimal.push(this.interactif ? '' : '\\phantom{rrrrr}')
          nbDecimalCorr.push(miseEnEvidence(nb.decimal))
          pourcentage.push(nb.pourcentage + sp() + '\\%')
          pourcentageCorr.push(nb.pourcentage + sp() + '\\%')
          fractionDecimale.push(this.interactif ? '' : '\\phantom{rrrrr}')
          fractionDecimaleCorr.push(miseEnEvidence(nb.fractionDecimale))
        } else if (lig === 1) {
          nbDecimal.push(nb.decimal)
          nbDecimalCorr.push(nb.decimal)
          pourcentage.push(this.interactif ? '' : '\\phantom{rrrrr}\\%')
          pourcentageCorr.push(miseEnEvidence(nb.pourcentage) + sp() + '\\%')
          fractionDecimale.push(this.interactif ? '' : '\\phantom{rrrrr}')
          fractionDecimaleCorr.push(miseEnEvidence(nb.fractionDecimale))
        } else {
          nbDecimal.push(this.interactif ? '' : '\\phantom{rrrrr}')
          nbDecimalCorr.push(miseEnEvidence(nb.decimal))
          fractionDecimale.push(nb.fractionDecimale)
          fractionDecimaleCorr.push(nb.fractionDecimale)
          pourcentage.push(this.interactif ? '' : '\\phantom{rrrrr}\\%')
          pourcentageCorr.push(miseEnEvidence(nb.pourcentage) + sp() + '\\%')
        }
      }

      const enonces = []
      enonces.push({
        tabEntetesColonnes: [],
        tabEntetesLignes: [
          '\\text{Nombre décimal}',
          '\\text{Fraction décimale}',
          '\\text{Pourcentage}',
        ],
        tabLines: nbDecimal.concat(fractionDecimale).concat(pourcentage),
        tabLinesCorr: nbDecimalCorrNu
          .concat(fractionDecimaleCorrNu)
          .concat(pourcentageCorrNu),
        enonce: `${tableauColonneLigne([], ['\\text{Nombre décimal}', '\\text{Fraction décimale}', '\\text{Pourcentage}'], nbDecimal.concat(fractionDecimale).concat(pourcentage))}`,
        correction: `${tableauColonneLigne([], ['\\text{Nombre décimal}', '\\text{Fraction décimale}', '\\text{Pourcentage}'], nbDecimalCorr.concat(fractionDecimaleCorr).concat(pourcentageCorr))}`,
      })
      let objetReponse = {}
      for (let i = 0; i < enonces[0].tabLines.length; i++) {
        if (enonces[0].tabLines[i] === '') {
          const ligne = Math.floor(i / 6)
          const colonne = i % 6
          const ref = `L${ligne + 1}C${colonne + 1}`
          const valeur = Object.assign(
            {},
            {
              value:
                ligne === 2
                  ? `${enonces[0].tabLinesCorr[i]}`.slice(0, 2)
                  : `${enonces[0].tabLinesCorr[i]}`,
              options:
                ligne === 1
                  ? { fractionDecimale: true }
                  : { nombreDecimalSeulement: true },
            },
          )
          const cellule = Object.fromEntries([[ref, valeur]])
          objetReponse = Object.assign(objetReponse, cellule)
        }
      }

      objetReponse = Object.assign(objetReponse, {
        bareme: (listePoints: number[]) => {
          return [
            Math.floor(listePoints.reduce((a, b) => a + b / 2, 0)),
            listePoints.length / 2,
          ]
        },
      })
      handleAnswers(this, i, objetReponse)

      if (this.interactif) {
        const tableau = AddTabDbleEntryMathlive.convertTclToTableauMathlive(
          enonces[0].tabEntetesColonnes,
          enonces[0].tabEntetesLignes,
          enonces[0].tabLines,
        )
        for (let j = 0; j < tableau.raws[2].length; j++) {
          if (tableau.raws[2][j].texte === '')
            Object.assign(tableau.raws[2][j], {
              options: { texteApres: '$~\\%$' },
            })
        }
        const leTableau = AddTabDbleEntryMathlive.create(
          this.numeroExercice ?? 0,
          i,
          tableau,
          `tableauMathlive ${KeyboardType.clavierDeBaseAvecFraction}`,
          true,
          {},
        )
        texte = leTableau.output
      } else {
        texte = `${enonces[0].enonce}`
      }
      texteCorr = `${enonces[0].correction}`

      if (this.questionJamaisPosee(i, JSON.stringify(objetReponse))) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
