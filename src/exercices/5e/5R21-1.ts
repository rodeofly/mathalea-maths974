import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  ecritureNombreRelatif,
  ecritureParentheseSiNegatif,
} from '../../lib/outils/ecritures'
import { context } from '../../modules/context'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { remplisLesBlancs } from '../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { sp } from '../../lib/outils/outilString'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'

export const titre = 'Transformer une soustraction en addition puis calculer'
export const dateDePublication = '13/11/2023'
export const dateDeModifImportante = '13/03/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * Transformer une soustraction en addition puis calculer
 * @author Rémi Angot ; Olivier Mimeau (ajout Decimaux et Modification de l'interactivité)
 */
export const uuid = 'f2db1'

export const refs = {
  'fr-fr': ['5R21-1'],
  'fr-ch': ['9NO9-14'],
}

type TypeQuestionsDisponibles = '+-' | '--' | '-+'

export default class SoustractionRelatifs extends Exercice {
  listeA: number[] = []
  listeB: number[] = []
  typeQuestionsDisponibles = ['+-', '--', '-+'] as TypeQuestionsDisponibles[]
  constructor() {
    super()
    this.nbQuestions = 5
    this.sup = 20
    this.sup2 = false
    this.sup3 = false
    this.besoinFormulaireNumerique = ['Valeur maximale', 99999]
    this.besoinFormulaire2CaseACocher = [
      'Seul le 2e terme négatif est entre parenthèses',
    ]
    this.besoinFormulaire3CaseACocher = ['Avec des nombres décimaux']
  }

  nouvelleVersion() {
    const listeTypeQuestions = combinaisonListes(
      this.typeQuestionsDisponibles,
      this.nbQuestions,
    ) as TypeQuestionsDisponibles[]
    this.consigne =
      this.nbQuestions > 1
        ? 'Transformer chaque soustraction en une addition puis calculer.'
        : 'Transformer la soustraction en une addition puis calculer.'

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      const CoefDecimales = this.sup3 ? 10 : 1
      let a = randint(1, this.sup * CoefDecimales) / CoefDecimales
      let b = randint(1, this.sup * CoefDecimales) / CoefDecimales
      switch (listeTypeQuestions[i]) {
        case '+-':
          b *= -1
          break
        case '--':
          a *= -1
          b *= -1
          break
        case '-+':
          a *= -1
          break
      }
      this.listeA[i] = a
      this.listeB[i] = b
      const textea = this.sup2 ? texNombre(a, 1) : ecritureNombreRelatif(a)
      const texteb = this.sup2
        ? ecritureParentheseSiNegatif(b)
        : ecritureNombreRelatif(b)
      const texteReponse = this.sup2
        ? texNombre(a - b, 1)
        : ecritureNombreRelatif(a - b)
      texte = `$${textea} - ${texteb}=$`
      texteCorr = `$${textea} - ${texteb} = ${miseEnEvidence(textea)} + ${miseEnEvidence(ecritureNombreRelatif(-b))} = ${miseEnEvidence(texteReponse)}$`

      if (this.interactif) {
        const texteRemplisLesBlancs = this.sup2
          ? ` ${sp(1)}%{champ1}${sp(1)} + (%{champ2}) = ${sp(1)}%{champ3}${sp(1)}`
          : ' (%{champ1}) + (%{champ2}) = (%{champ3})'
        texte += remplisLesBlancs(
          this,
          i,
          texteRemplisLesBlancs,
          ` ${KeyboardType.clavierDeBase}`,
          '',
        )

        handleAnswers(this, i, {
          bareme: (listePoints) => [
            Math.min(listePoints[0], listePoints[1]) + listePoints[2],
            2,
          ],
          champ1: { value: textea },
          champ2: { value: ecritureNombreRelatif(-b) },
          champ3: { value: texteReponse },
        })
      } else {
        texte +=
          ' $\\ldots\\ldots\\ldots + \\ldots\\ldots\\ldots = \\ldots\\ldots\\ldots$'
      }

      if (this.questionJamaisPosee(i, a, b, listeTypeQuestions[i])) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: '',
            enonceAvant: false,
            propositions: [
              {
                type: 'AMCOpen',
                propositions: [
                  {
                    enonce: this.titre + ' : ' + texte,
                    texte: texteCorr,
                    statut: 1,
                    pointilles: false,
                  },
                ],
              },
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: '',
                    statut: '',
                    reponse: {
                      texte: 'Résultat du calcul : ',
                      valeur: [b - a],
                      param: {
                        digits: 2,
                        decimals: 0,
                        signe: true,
                        approx: 0,
                      },
                    },
                  },
                ],
              },
            ],
          }
        }
        i++
      }
      cpt++
    }
  }
}
