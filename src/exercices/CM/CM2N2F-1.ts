import { droiteGraduee } from '../../lib/2d/reperes'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { remplisLesBlancs } from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { lettreIndiceeDepuisChiffre } from '../../lib/outils/outilString'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { fraction } from '../../modules/fractions'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Lire des abscisses fractionnaires'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDePublication = '14/01/2025'

/**
 *  :
 * Lire des abscisses sous forme de fractions avec possibilté d'avoir des fractions simplifiées
 * @author Olivier Mimeau d'après Jean-Claude Lhote 6N21-2
 */
export const uuid = '0e527'

export const refs = {
  'fr-fr': ['CM2N2F-1'],
  'fr-2016': ['6N21-3'],
  'fr-ch': ['9NO11-10'],
}
export default class LireAbscissesFractionnairesComplexes extends Exercice {
  constructor() {
    super()
    this.sup = 13 // 3
    this.sup2 = false
    this.sup3 = true // avec des fractions simplifiées
    this.sup4 = false // valeurs positives si false sinon valeurs positives et négatives
    this.besoinFormulaireTexte = [
      'Types de questions',
      'Nombres séparés par des tirets  :\n2 : Demis\n3 : Tiers\n4 : Quarts\n5 : Cinquièmes\n6 : Sixièmes\n7 : Septièmes\n8 : Huitièmes\n9 : Neuvièmes\n10: Dixièmes\n11: Onzièmes\n12 : Douzièmes\n13 : Mélange',
    ]
    //   this.besoinFormulaire2CaseACocher = ['Eviter les nombres décimaux (si possible)', false]
    this.besoinFormulaire3CaseACocher = [
      'Avec des fractions simplifiées (le cas échéant)',
      true,
    ]
    this.besoinFormulaire4CaseACocher = ['Avec des valeurs négatives', false]
    this.nbQuestions = 3
  }

  nouvelleVersion() {
    //    let typeDeQuestions: number[]
    const typeDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 2,
      max: 12,
      defaut: 13,
      melange: 13,
      nbQuestions: this.nbQuestions,
    })
    const data: Record<
      number,
      { id: number; den: number[]; max: number; min: number }
    > = {
      2: { id: 2, den: [2], max: !this.sup4 ? 8 : 4, min: !this.sup4 ? 0 : -4 },
      3: { id: 3, den: [3], max: !this.sup4 ? 8 : 4, min: !this.sup4 ? 0 : -4 },
      4: {
        id: 4,
        den: [2, 4],
        max: !this.sup4 ? 8 : 4,
        min: !this.sup4 ? 0 : -4,
      },
      5: { id: 5, den: [5], max: !this.sup4 ? 8 : 4, min: !this.sup4 ? 0 : -4 },
      6: {
        id: 6,
        den: [2, 3, 6],
        max: !this.sup4 ? 6 : 3,
        min: !this.sup4 ? 0 : -3,
      },
      7: { id: 7, den: [7], max: !this.sup4 ? 4 : 2, min: !this.sup4 ? 0 : -2 },
      8: {
        id: 8,
        den: [2, 4, 8],
        max: !this.sup4 ? 4 : 2,
        min: !this.sup4 ? 0 : -2,
      },
      9: {
        id: 9,
        den: [3, 9],
        max: !this.sup4 ? 4 : 2,
        min: !this.sup4 ? 0 : -2,
      },
      10: {
        id: 10,
        den: [2, 5, 10],
        max: !this.sup4 ? 4 : 2,
        min: !this.sup4 ? 0 : -2,
      },
      11: {
        id: 11,
        den: [11],
        max: !this.sup4 ? 3 : 2,
        min: !this.sup4 ? 0 : -1,
      },
      12: {
        id: 12,
        den: [2, 3, 4, 6, 12],
        max: !this.sup4 ? 3 : 2,
        min: !this.sup4 ? 0 : -1,
      },
    }

    for (let i = 0, texte, cpt = 0; i < this.nbQuestions && cpt < 50; cpt++) {
      texte = ''
      const tab = Number(typeDeQuestions[i])
      const origine = data[tab].min

      const den1 =
        !this.sup3 || data[tab].den.length === 1
          ? data[tab].id
          : choice(data[tab].den)
      const tab1 = data[tab].id / den1

      const num1 = trouveNumerateur(den1, origine, data[tab].max)
      const den2 =
        !this.sup3 || data[tab].den.length === 1
          ? data[tab].id
          : choice(data[tab].den, den1)
      const tab2 = data[tab].id / den2
      const num2 = trouveNumerateur(den2, origine, data[tab].max, [
        { num: num1, den: den1 },
      ])
      const den3 =
        !this.sup3 || data[tab].den.length === 1
          ? data[tab].id
          : choice(
              data[tab].den,
              data[tab].den.length > 2 ? [den1, den2] : [den1],
            )
      const tab3 = data[tab].id / den3
      const num3 = trouveNumerateur(den3, origine, data[tab].max, [
        { num: num1, den: den1 },
        { num: num2, den: den2 },
      ])

      texte +=
        'Donner les abscisses des points ' +
        remplisLesBlancs(
          this,
          i,
          `\\quad ${lettreIndiceeDepuisChiffre(i * 3 + 1)}\\; %{champ1} \\quad ${lettreIndiceeDepuisChiffre(i * 3 + 2)} \\; %{champ2} \\quad ${lettreIndiceeDepuisChiffre(i * 3 + 3)} \\;  %{champ3}`,
          'clavierDeBaseAvecFraction',
          '\\ldots',
        )
      handleAnswers(
        this,
        i,
        {
          bareme: (listePoints) => [
            listePoints[0] + listePoints[1] + listePoints[2],
            3,
          ],
          champ1: { value: fraction(num1, den1).reduire(tab1).texFraction },
          champ2: { value: fraction(num2, den2).reduire(tab2).texFraction },
          champ3: { value: fraction(num3, den3).reduire(tab3).texFraction },
        },
        { formatInteractif: 'fillInTheBlank' },
      )

      const tailleUnite = 20 / (data[tab].max - origine)
      const d = droiteGraduee({
        Min: origine,
        Max: data[tab].max,
        Unite: tailleUnite,
        thickSec: true,
        thickSecDist: 1 / data[tab].id,
        thickEpaisseur: 3,
        pointListe: [
          [num1 / den1, lettreIndiceeDepuisChiffre(i * 3 + 1)],
          [num2 / den2, lettreIndiceeDepuisChiffre(i * 3 + 2)],
          [num3 / den3, lettreIndiceeDepuisChiffre(i * 3 + 3)],
        ],
      })

      texte +=
        '<br>' +
        mathalea2d(
          {
            xmin: -0.2,
            xmax: (data[tab].max - origine) * tailleUnite + 1,
            ymin: -1,
            ymax: 1,
            style: 'margin-top:10px ',
            scale: 0.6,
          },
          d,
        )
      const dCorr = droiteGraduee({
        Min: origine,
        Max: data[tab].max,
        Unite: tailleUnite,
        thickSec: true,
        thickSecDist: 1 / data[tab].id,
        thickEpaisseur: 3,
        pointListe: [
          [num1 / den1, lettreIndiceeDepuisChiffre(i * 3 + 1)],
          [num2 / den2, lettreIndiceeDepuisChiffre(i * 3 + 2)],
          [num3 / den3, lettreIndiceeDepuisChiffre(i * 3 + 3)],
        ],
        labelListe: [
          [num1 / den1, textFractionCorr(num1, den1, this.sup3)],
          [num2 / den2, textFractionCorr(num2, den2, this.sup3)],
          [num3 / den3, textFractionCorr(num3, den3, this.sup3)],
        ],
        labelDistance: 0.8,
        labelCustomDistance: 1.7,
      })

      const texteCorr = mathalea2d(
        {
          xmin: -0.2,
          xmax: (data[tab].max - origine) * tailleUnite + 1,
          ymin: -2.5,
          ymax: 1,
          style: 'margin-top:10px ',
          scale: 0.6,
        },
        dCorr,
      )
      if (this.questionJamaisPosee(i, den1, num1, num2, num3)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte + '\n',
            propositions: [
              {
                texte: texteCorr,
                statut: 5,
                sanscadre: true,
                pointilles: true,
                feedback: '',
              },
            ],
          }
        }
        i++
      }
    }
    listeQuestionsToContenu(this)
  }
}

function trouveNumerateur(
  den: number,
  min: number,
  max: number,
  fractionsAEviter: { num: number; den: number }[] = [],
) {
  const isNombreEntier = function (nu: number, de: number) {
    if (nu % de === 0) return true
    return false
  }

  let trouve = false
  let num = 0
  let i = 0
  while (!trouve && i < 10) {
    num = randint(min * den, den * max)

    // on veut éviter l'entier
    let k = 0
    while (isNombreEntier(num, den) && k < 5) {
      num = randint(min * den, den * max)
      k++
    }

    // on veut éviter d'être trop proche d'un autre point
    trouve = true
    for (const fraction of fractionsAEviter) {
      if (Math.abs(fraction.num / fraction.den - num / den) < 2 / den) {
        trouve = false
        break
      }
    }
    i++
  }
  return num
}

function textFractionCorr(
  num: number,
  den: number,
  simplifier: boolean,
): string {
  return simplifier
    ? fraction(num, den).texFractionSimplifiee
    : fraction(num, den).texFraction
}
