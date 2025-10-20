import { texteGras } from '../../lib/format/style'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import { eclatePuissance, simpNotPuissance } from '../../lib/outils/puissance'
import { context } from '../../modules/context'

import {
  handleAnswers,
  setReponse,
} from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { ecritureParentheseSiNegatif } from '../../lib/outils/ecritures'

export const titre = 'Effectuer des calculs avec des puissances'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDeModifImportante = '09/05/2025'
/**
 * Puissances d'un relatif (1)
 * * L\'objectif est de travailler le sens des règles de calcul sur les puissances plutôt que les formules magiques
 *
 * Paramétrages possibles :
 * * 1 : produit de puissances de même base
 * * 2 : quotient de puissances de même base
 * * 3 : puissance de puissance
 * * 4 : produit de puissances de même exposant
 * * 5 : quotient de puissances de même exposant
 * * 6 : mélange des quatre autres niveaux
 * @author Sébastien Lozano (Rajout du paramètre 5 par Eric Elter)
 */
export const uuid = 'bae57'

export const refs = {
  'fr-fr': ['4C33-1'],
  'fr-ch': ['10NO2-11'],
}
// une fonction pour des infos supp sur les exposants
function remarquesPuissances(
  base: number,
  baseUtile: number | string,
  exposant: number,
) {
  let sortie = ''
  if (base < 0 && exposant % 2 === 0) {
    sortie += '<br>'
    sortie += `${texteGras('Remarque : ')} Dans ce cas, comme les puissances d'exposant pair de deux nombres opposés sont égales, on peut écrire $${simpNotPuissance(base, exposant)}$ à la place de $${baseUtile}^{${exposant}}$.`
  }
  if (base < 0 && exposant % 2 === 1) {
    sortie += '<br>'
    sortie += `${texteGras('Remarque : ')} Dans ce cas, comme les puissances d'exposant impair de deux nombres négatifs sont opposées, on pourrait écrire $${simpNotPuissance(base, exposant)}$  à la place de $${baseUtile}^{${exposant}}$.`
  }

  return sortie
}
/**
 * Fonction pour écrire avec deux couleurs la forme éclatée d'un produit de puissances de même exposant
 * @param b1 base1
 * @param b2 base2
 * @param e exposant
 * @param couleur1
 * @param couleur2
 */
export function reorganiseProduitPuissance(
  b1: number | string,
  b2: number | string,
  e: number,
  couleur1: string,
  couleur2: string,
) {
  let str
  switch (e) {
    case 0:
      return '1'
    case 1:
      return `\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}`
    default:
      str = `\\mathbf{(\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}}) `
      for (let i = 1; i < e; i++) {
        str =
          str +
          `\\times (\\mathbf{\\color{${couleur1}}{${b1}}} \\times \\mathbf{\\color{${couleur2}}{${b2}}})`
      }
      return str
  }
}

export default class PuissancesDunRelatif1 extends Exercice {
  classe = 4

  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Règle à travailler',
      'Nombres séparés par des tirets :\n1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissances\n4 : Produit de puissances positives de même exposant\n5 : Quotient de puissances de même exposant\n6 : Mélange',
    ]
    this.besoinFormulaire2Numerique = [
      'Signe de la mantisse',
      3,
      '1 : Positif\n2 : Négatif\n3 : Mélange',
    ]
    this.consigne = 'Écrire sous la forme $a^n$.'
    context.isHtml ? (this.spacing = 3) : (this.spacing = 2)
    context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
    this.nbQuestions = 5
    this.correctionDetailleeDisponible = true
    this.sup = '1-2-3-4'
    this.sup2 = 1
    this.classe = 4
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 5, // Changé de 4 à 5 pour inclure le nouveau type d'exercice
      melange: 6, // Changé de 5 à 6 pour correspondre à la nouvelle option de mélange
      defaut: 6,
      nbQuestions: this.nbQuestions,
      shuffle: true,
    })
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )

    // pour pouvoir adapter les couleurs en cas de besoin
    const coul0 = 'green'
    const coul1 = 'blue'

    for (
      let i = 0,
        base0,
        base1,
        base,
        baseUtile,
        baseUtileBisAMC,
        exp0,
        exp1,
        exp,
        couleurExp0,
        couleurExp1,
        lettre,
        texte,
        texteCorr,
        reponseInteractive,
        exposantInteractif,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      base = randint(2, 9)
      base =
        base * (this.sup2 === 1 ? 1 : this.sup2 === 2 ? -1 : choice([-1, 1])) // on choisit une base sauf 1 ... penser à gérer le cas des bases qui sont des puissances
      exp0 = randint(3, 5)
      exp1 = this.classe === 4 ? randint(2, exp0 - 1) : randint(2, 5, exp0)
      exp = [exp0, exp1] // on choisit deux exposants différents c'est mieux
      lettre = lettreDepuisChiffre(i + 1) // on utilise des lettres pour les calculs

      if (base < 0) {
        baseUtile = '(' + base + ')' // on définit une base avec des parenthèses pour l'affichage du cas negatif
      } else {
        baseUtile = base
      }

      texteCorr = ''

      switch (listeTypeDeQuestions[i]) {
        case 1: // produit de puissances de même base
          texte = `$${lettre}=${baseUtile}^{${exp[0]}}\\times ${baseUtile}^{${exp[1]}}$`

          // texteCorr += `$${lettre}=${baseUtile}^${exp[0]}\\times ${baseUtile}^${exp[1]}$`
          if (this.correctionDetaillee) {
            texteCorr += `$${lettre}=${eclatePuissance(
              baseUtile,
              exp[0],
              coul0,
            )} \\times ${eclatePuissance(baseUtile, exp[1], coul1)}$`
            texteCorr += '<br>'
            texteCorr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[0]}}~\\color{black}{+}~\\color{${coul1}}{${exp[1]}}}$ facteurs tous égaux à $${baseUtile}$.`
            texteCorr += '<br>'
          }
          if (base < 0 && (exp[1] + exp[0]) % 2 === 0) {
            texteCorr += `$${lettre}=${baseUtile}^{${exp[0]}+${exp[1]}} = ${baseUtile}^{${exp[0] + exp[1]}}=${miseEnEvidence(simpNotPuissance(base, exp[1] + exp[0]))}$`
          } else {
            texteCorr += `$${lettre}=${baseUtile}^{${exp[0]}+${exp[1]}} = ${miseEnEvidence(`${baseUtile}^{${exp[0] + exp[1]}}`)}$`
          }
          texteCorr += remarquesPuissances(base, baseUtile, exp[1] + exp[0])
          if (base < 0 && (exp[0] + exp[1]) % 2 === 0) {
            reponseInteractive = [
              `${baseUtile}^{${exp[1] + exp[0]}}`,
              `${-base}^{${exp[1] + exp[0]}}`,
            ]
            baseUtileBisAMC = -base
          } else {
            reponseInteractive = `${baseUtile}^{${exp[1] + exp[0]}}`
          }
          exposantInteractif = exp[1] + exp[0]
          break
        case 2: // quotient de puissances de même base
          // Pour que la couleur de la base associée à l'exposant max soit toujours rouge.
          if (Math.max(exp[0], exp[1]) === exp[0]) {
            couleurExp0 = coul0
            couleurExp1 = coul1
          } else {
            couleurExp0 = coul1
            couleurExp1 = coul0
          }

          texte = `$${lettre}=\\dfrac{${baseUtile}^{${exp[0]}}}{${baseUtile}^{${exp[1]}}}$`

          if (this.correctionDetaillee) {
            texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(baseUtile, exp[0], couleurExp0)}}{${eclatePuissance(baseUtile, exp[1], couleurExp1)}}$`
            texteCorr += '<br>'
            texteCorr += `Il y a donc $\\mathbf{\\color{${coul1}}{${Math.min(exp[0], exp[1])}}}$ simplification${Math.min(exp[0], exp[1]) === 1 ? '' : 's'} par $${baseUtile}$ possibles.`
            texteCorr += '<br>'
          }
          if (exp[0] - exp[1] === 0) {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[0],
                couleurExp0,
              )}}{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[0],
                couleurExp1,
              )}}$`
              texteCorr += '<br>'
            }
            texteCorr += `$${lettre}=1$`
          } else if (exp[0] - exp[1] < 0) {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[0],
                couleurExp0,
              )}}{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[0],
                couleurExp1,
              )}\\times${eclatePuissance(
                baseUtile,
                exp[1] - exp[0],
                couleurExp1,
              )}}$`
              texteCorr += '<br>'
            }
            texteCorr += `$${lettre}=\\dfrac{1}{${baseUtile}^{${exp[1]}-${exp[0]}}}=\\dfrac{1}{${baseUtile}^{${exp[1] - exp[0]}}}`
            if (base < 0 && (exp[1] - exp[0]) % 2 === 0) {
              texteCorr += `=\\dfrac{1}{${simpNotPuissance(
                base,
                exp[1] - exp[0],
              )}}=${miseEnEvidence(`${simpNotPuissance(base, exp[0] - exp[1])}`)}$`
            } else {
              texteCorr += `=${miseEnEvidence(`${baseUtile}^{${exp[0] - exp[1]}}`)}$`
            }
          } else {
            if (this.correctionDetaillee) {
              texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[1],
                couleurExp0,
              )}\\times${eclatePuissance(
                baseUtile,
                exp[0] - exp[1],
                couleurExp0,
              )}}{${eclatePuissance(
                `\\cancel{${baseUtile}}`,
                exp[1],
                couleurExp1,
              )}}$`
              texteCorr += '<br>'
            }
            texteCorr += `$${lettre}=${baseUtile}^{${exp[0]}-${exp[1]}}`
            if (base < 0 && (exp[0] - exp[1]) % 2 === 0) {
              texteCorr += `=${baseUtile}^{${exp[0] - exp[1]}}=${miseEnEvidence(simpNotPuissance(base, exp[0] - exp[1]))}$`
            } else {
              texteCorr += `=${miseEnEvidence(`${baseUtile}^{${exp[0] - exp[1]}}`)}$`
            }
          }
          texteCorr += remarquesPuissances(base, baseUtile, exp[0] - exp[1])
          if (base < 0 && (exp[0] - exp[1]) % 2 === 0) {
            reponseInteractive = [
              `${baseUtile}^{${exp[0] - exp[1]}}`,
              `${-base}^{${exp[0] - exp[1]}}`,
            ]
            baseUtileBisAMC = -base
          } else {
            reponseInteractive = `${baseUtile}^{${exp[0] - exp[1]}}`
          }
          exposantInteractif = exp[0] - exp[1]
          break
        case 3: // exponentiation
          exp = [randint(2, 4), randint(2, 4)] // on redéfinit les deux exposants pour ne pas avoir d'écritures trop longues et pour éviter 1
          texte = `$${lettre}=(${baseUtile}^{${exp[0]}})^{${exp[1]}}$`

          if (this.correctionDetaillee) {
            texteCorr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(${baseUtile}^{${exp[0]}})`,
              exp[1],
              coul0,
            )}}_{${exp[1]}\\thickspace\\text{facteurs}}}$`
            texteCorr += '<br>'
            texteCorr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(
              `(\\color{${coul1}}{\\underbrace{${eclatePuissance(
                baseUtile,
                exp[0],
                coul1,
              )}}_{${exp[0]}\\thickspace\\text{facteurs}}}\\color{${coul0}})`,
              exp[1],
              coul0,
            )}}_{${exp[1]}\\times\\color{${coul1}}{${
              exp[0]
            }}\\thickspace\\color{black}{\\text{facteurs}}}}$`
            texteCorr += '<br>'
          }
          texteCorr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[1]}}~\\color{black}{\\times}~\\color{${coul1}}{${exp[0]}}}$ facteurs tous égaux à $${baseUtile}$.`
          texteCorr += '<br>'
          texteCorr += `$${lettre}=${baseUtile}^{${exp[0]}\\times${exp[1]}} `
          if (base < 0 && (exp[1] * exp[0]) % 2 === 0) {
            texteCorr += `= ${baseUtile}^{${exp[0] * exp[1]}} = ${miseEnEvidence(simpNotPuissance(base, exp[0] * exp[1]))}$`
          } else {
            texteCorr += `= ${miseEnEvidence(`${baseUtile}^{${exp[0] * exp[1]}}`)}$`
          }
          texteCorr += remarquesPuissances(base, baseUtile, exp[0] * exp[1])
          if (base < 0 && (exp[0] * exp[1]) % 2 === 0) {
            reponseInteractive = [
              `${baseUtile}^{${exp[0] * exp[1]}}`,
              `${-base}^{${exp[0] * exp[1]}}`,
            ]
            baseUtileBisAMC = -base
          } else {
            reponseInteractive = `${baseUtile}^{${exp[0] * exp[1]}}`
          }
          exposantInteractif = exp[0] * exp[1]
          break
        case 4: // produit de puissances de même exposant
          base0 = randint(2, 8, [4, 6])
          base1 = randint(2, 8, [4, 6, base0])
          base0 =
            base0 *
            (this.sup2 === 1 ? 1 : this.sup2 === 2 ? -1 : choice([-1, 1])) // on choisit une base sauf 1 ... penser à gérer le cas des bases qui sont des puissances
          base1 =
            base1 *
            (this.sup2 === 1 ? 1 : this.sup2 === 2 ? -1 : choice([-1, 1])) // on choisit une base sauf 1 ... penser à gérer le cas des bases qui sont des puissances

          base = [base0, base1] // on choisit 2 bases différentes c'est mieux
          exp = randint(2, 5, 6) // on choisit un exposant
          texte = `$${lettre}=${ecritureParentheseSiNegatif(base0)}^{${exp}}\\times ${ecritureParentheseSiNegatif(base1)}^{${exp}}$`
          texteCorr += texte

          if (this.correctionDetaillee) {
            texteCorr += '<br>'
            texteCorr += `$${lettre}=${eclatePuissance(
              ecritureParentheseSiNegatif(base0),
              exp,
              coul0,
            )} \\times ${eclatePuissance(ecritureParentheseSiNegatif(base1), exp, coul1)}$`
            texteCorr += '<br>'
            texteCorr += `$${lettre}=${reorganiseProduitPuissance(
              ecritureParentheseSiNegatif(base0),
              ecritureParentheseSiNegatif(base1),
              exp,
              coul0,
              coul1,
            )}$`
          }
          texteCorr += '<br>'
          texteCorr += `$${lettre}= (${miseEnEvidence(ecritureParentheseSiNegatif(base0), coul0)} \\times ${miseEnEvidence(ecritureParentheseSiNegatif(base1), coul1)})^{${exp}}=${miseEnEvidence(`(${base0 * base1})^{${exp}}`)}$`

          reponseInteractive =
            base0 * base1 > 0
              ? `${base0 * base1}^{${exp}}`
              : `(${base0 * base1})^{${exp}}`
          baseUtile = base0 * base1
          baseUtileBisAMC = base[0] * base1 // juste pour ne pas avoir à ajouter une batterie de lignes spécifiques pour ce cas, je mets deux fois la même chose
          base = baseUtile
          exposantInteractif = exp
          break
        case 5: // quotient de puissances de même exposant (a^n/b^n = (a/b)^n)
        default:
          base0 = randint(2, 8, [4, 6])
          base1 = randint(2, 8, [4, 6, base0]) // on choisit 2 bases différentes pour le numérateur et dénominateur
          exp = randint(2, 5, 6) // on choisit un exposant

          // On s'assure que base0 > base1 pour avoir un quotient positif et entier
          if (base0 < base1) {
            ;[base0, base1] = [base1, base0]
          }

          // On vérifie que le quotient est un entier pour simplifier les calculs
          if (base0 % base1 !== 0) {
            base0 = base1 * randint(2, 4)
          }
          base0 =
            base0 *
            (this.sup2 === 1 ? 1 : this.sup2 === 2 ? -1 : choice([-1, 1])) // on choisit une base sauf 1 ... penser à gérer le cas des bases qui sont des puissances
          base1 =
            base1 *
            (this.sup2 === 1 ? 1 : this.sup2 === 2 ? -1 : choice([-1, 1])) // on choisit une base sauf 1 ... penser à gérer le cas des bases qui sont des puissances

          texte = `$${lettre}=\\dfrac{${ecritureParentheseSiNegatif(base0)}^{${exp}}}{${ecritureParentheseSiNegatif(base1)}^{${exp}}}$`
          texteCorr += texte

          if (this.correctionDetaillee) {
            texteCorr += '<br>'
            texteCorr += `$${lettre}=\\dfrac{${eclatePuissance(ecritureParentheseSiNegatif(base0), exp, coul0)}}{${eclatePuissance(ecritureParentheseSiNegatif(base1), exp, coul1)}}$`
            texteCorr += '<br>'

            // Explication de la réorganisation des termes
            const fractions = []
            for (let i = 0; i < exp; i++) {
              fractions.push(
                `\\dfrac{\\color{${coul0}}{${base0}}}{\\color{${coul1}}{${base1}}}`,
              )
            }
            texteCorr += `$${lettre}=${fractions.join(' \\times ')}$`
          }

          texteCorr += '<br>'
          texteCorr += `$${lettre}= \\left(\\dfrac{\\color{${coul0}}{${base0}}}{\\color{${coul1}}{${base1}}}\\right)^{${exp}}=${miseEnEvidence(`${ecritureParentheseSiNegatif(base0 / base1)}^{${exp}}`)}$`

          reponseInteractive =
            base0 / base1 > 0
              ? `${base0 / base1}^{${exp}}`
              : `(${base0 / base1})^{${exp}}`
          baseUtile = base0 / base1
          baseUtileBisAMC = base0 / base1
          base = baseUtile
          exposantInteractif = exp
          break
      }

      if (this.interactif && !context.isAmc) {
        handleAnswers(this, i, {
          reponse: { value: reponseInteractive, options: { puissance: true } },
        })
        texte += ajouteChampTexteMathLive(
          this,
          i,
          KeyboardType.clavierFullOperations,
          { texteAvant: ' $=$' },
        )
      }
      if (context.isAmc) {
        setReponse(this, i, reponseInteractive, {
          formatInteractif: 'puissance',
          basePuissance: base,
          exposantPuissance: exposantInteractif,
          exposantNbChiffres: 2,
          signe: true,
          aussiCorrect: baseUtileBisAMC,
        })
      }
      if (
        this.questionJamaisPosee(i, base, exp0, exp1, listeTypeDeQuestions[i])
      ) {
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
