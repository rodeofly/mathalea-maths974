import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { lettreDepuisChiffre, sp } from '../../lib/outils/outilString'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'
import choisirExpressionNumerique from './_choisirExpressionNumerique'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const titre = 'Calculer en respectant les priorités opératoires'

/**
 * @author Jean-Claude Lhote
 */
export const uuid = 'e61fc'

export const refs = {
  'fr-fr': ['5C12'],
  'fr-ch': ['9NO6-2'],
}
export default class CalculerUneExpressionNumerique extends Exercice {
  version: number
  constructor() {
    super()
    this.nbQuestions = 4

    this.sup = 3
    this.sup2 = false // si false alors utilisation de nombres entiers (calcul mental), si true alors utilisation de nombres à un chiffre après la virgule.
    this.sup3 = true
    this.sup4 = true
    this.besoinFormulaireTexte = [
      'Choix des expressions',
      'Nombres séparés par des tirets :\n2 : Expressions à deux opérations\n3 : Expressions à 3 opérations\n4 : Expressions à 4 opérations\n5 : Expressions complexes',
    ] // Texte, tooltip - il faut au moins deux opérations
    this.besoinFormulaire2CaseACocher = [
      'Utilisation de décimaux (pas de calcul mental)',
      false,
    ]
    this.besoinFormulaire3CaseACocher = [
      'Avec le signe × devant les parenthèses',
      true,
    ]
    this.besoinFormulaire4CaseACocher = [
      'Calculs nommés avec des lettres',
      false,
    ]
    this.version = 5
  }

  nouvelleVersion() {
    this.listeAvecNumerotation = !this.sup4
    let reponse
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      min: 2,
      max: 5,
      defaut: randint(2, 5),
      nbQuestions: this.nbQuestions,
      saisie: this.sup,
      melange: 0,
    }).map(Number)

    let expf
    let expn
    let expc
    let decimal
    let nbOperations
    let resultats
    if (this.sup2) {
      decimal = 10
    } else {
      decimal = 1
    }

    for (
      let i = 0, texte: string, texteCorr: string, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      this.autoCorrection[i] = {}
      nbOperations = listeTypeDeQuestions[i]
      if (this.version > 2 && nbOperations === 1) nbOperations++
      resultats = choisirExpressionNumerique(
        nbOperations,
        decimal,
        this.sup3,
        !this.sup2,
        null,
      )
      expf = resultats[0]
      expn = resultats[1] as string
      expc = resultats[2] as string
      if (expn.indexOf('ou') > 0) expn = expn.substring(0, expn.indexOf('ou')) // on supprime la deuxième expression fractionnaire
      this.consigne = 'Calculer en respectant les priorités opératoires'
      this.consigne += this.interactif ? '.' : ' et en détaillant.'
      if (!this.sup4) {
        texte = `${expn}`
      } else {
        texte = addLetterInExpression(expn, i + 1)
      }
      texteCorr = ''
      if (!this.sup4) {
        expc = expc.substring(1, expc.length - 1).split(' = ')
        for (let ee = 0; ee < expc.length - 1; ee++) {
          texteCorr += `$${expc[ee]}  = $` + sp()
        }
        texteCorr += `$${miseEnEvidence(expc[expc.length - 1])}$`
      } else {
        // On découpe
        const etapes = expc.split('=')
        let nbEtapes = 0
        etapes.forEach(function (etape) {
          nbEtapes++
          etape = etape.replace('$', '')
          if (context.isHtml) {
            texteCorr += '<br>'
          }
          texteCorr += `$${lettreDepuisChiffre(i + 1)} = `
          texteCorr +=
            nbEtapes === etapes.length
              ? `${miseEnEvidence(etape)}$ <br>`
              : `${etape}$ <br>`
        })
      }
      reponse = resultats[4]
      if (this.questionJamaisPosee(i, expn, expf)) {
        // Si la question n'a jamais été posée, on en créé une autre
        if (this.interactif) {
          texte += ajouteChampTexteMathLive(this, i, ' ', { texteAvant: '$=$' })
          setReponse(this, i, reponse)
        } else if (context.isAmc) {
          texte +=
            '<br>Détailler les calculs dans le cadre et coder le résultat.<br>'
          this.autoCorrection[i] = {
            enonce: '',
            enonceAvant: false,
            propositions: [
              {
                type: 'AMCOpen',
                // @ts-expect-error
                propositions: [
                  {
                    enonce: texte,
                    texte: texteCorr,
                    statut: 3,
                    pointilles: false,
                  },
                ],
              },
              {
                type: 'AMCNum',
                // @ts-expect-error
                propositions: [
                  {
                    texte: '',
                    statut: '',
                    reponse: {
                      texte: 'Résultat de cet enchaînement de calculs : ',
                      valeur: [reponse],
                      param: {
                        digits: 2,
                        decimals: 0,
                        signe: false,
                        approx: 0,
                      },
                    },
                  },
                ],
              },
            ],
          }
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

function addLetterInExpression(expression: string, i: number) {
  const letter = lettreDepuisChiffre(i) + ' = '
  const index = expression.indexOf('$') + 1
  return expression.slice(0, index) + letter + expression.slice(index)
}
