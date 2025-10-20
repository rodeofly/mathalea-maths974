import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
  rienSi1,
} from '../../lib/outils/ecritures'
import { pgcd } from '../../lib/outils/primalite'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import { abs, signe } from '../../lib/outils/nombres'

import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import FractionEtendue from '../../modules/FractionEtendue'
import { sp } from '../../lib/outils/outilString'

export const titre = 'Résoudre une équation du premier degré'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModifImportante = '02/04/2024'
/**
 * Équation du premier degré
 * @author Rémi Angot
 */
export const uuid = '799c4'

export const refs = {
  'fr-fr': ['4L20', 'BP2RES8'],
  'fr-ch': ['10FA3-7'],
}

function gestionEspaceMiseEnEvidence(texte: string) {
  // EE : Pour améliorer la gestion des espaces annulée par la fonction miseEnEvidence()
  const texteSepare = texte.split(texte[0])
  return sp(2) + texte[0] + sp(2) + texteSepare[1]
}

export default class ExerciceEquation1 extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Avec des nombres relatifs']
    this.besoinFormulaire2Texte = [
      "Type d'équations",
      [
        'Nombres séparés par des tirets  :',
        '1 : ax+b=0',
        '2 : ax+b=c',
        '3 : ax=b',
        '4 : x+b=c',
        '5 : ax+b=cx+d',
        '6 : x/a=b',
        '7 : ax/b=c',
        '8 : Mélange',
      ].join('\n'),
    ]
    this.besoinFormulaire3CaseACocher = ['Avec uniquement la lettre $x$']
    this.spacing = 2
    context.isHtml ? (this.spacingCorr = 3) : (this.spacingCorr = 2)
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = context.isHtml
    this.sup = true // Avec des nombres relatifs
    this.sup2 = '1-2-3-4-5' // Choix du type d'équation
    this.sup3 = true
    this.nbQuestions = 6
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions === 1
        ? "Résoudre l'équation suivante."
        : 'Résoudre les équations suivantes.'
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup2,
      min: 1,
      max: 7,
      melange: 8,
      defaut: 8,
      nbQuestions: this.nbQuestions,
      listeOfCase: [
        'ax+b=0',
        'ax+b=c',
        'ax=b',
        'x+b=c',
        'ax+b=cx+d',
        'x/a=b',
        'ax/b=c',
      ],
    })

    for (
      let i = 0, a, b, c, d, texte, texteCorr, reponse, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const inconnue = this.sup3
        ? 'x'
        : choice(['x', 'y', 'z', 'm', 't', 'a', 'b', 'c'])
      switch (listeTypeDeQuestions[i]) {
        case 'ax+b=0':
        case 'ax+b=c':
          c = listeTypeDeQuestions[i] === 'ax+b=0' ? 0 : randint(1, 13)
          do {
            a = randint(2, 13)
            b = randint(1, 13)
          } while (Math.abs(c - b) % a === 0)
          if (this.sup) {
            a *= choice([-1, 1])
            b *= choice([-1, 1])
            c *= choice([-1, 1])
          }
          if (!this.sup && c < b) {
            // Si c-b < 0 et que l'on ne veut pas de relatif, on échange c et b.
            if (c === 0) {
              // si c=0, on change le signe de b, pour garder c=0
              b *= -1
            } else {
              d = b
              b = c
              c = d
            }
          }

          texte = `$${a}${inconnue}${ecritureAlgebrique(b)}=${c}$`
          texteCorr = texte + '<br>'

          if (this.correctionDetaillee) {
            if (b > 0) {
              texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
            } else {
              texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
            }
          }
          texteCorr += `$${a}${inconnue}${ecritureAlgebrique(b)}${miseEnEvidence(
            gestionEspaceMiseEnEvidence(ecritureAlgebrique(-1 * b)),
            'blue',
          )}=${c}${miseEnEvidence(gestionEspaceMiseEnEvidence(ecritureAlgebrique(-1 * b)), 'blue')}$<br>`
          texteCorr += `$${a}${inconnue}=${c - b}$<br>`
          if (this.correctionDetaillee) {
            texteCorr += `On divise les deux membres par $${a}$.<br>`
          }
          texteCorr += `$${a}${inconnue}${miseEnEvidence(
            sp() + '\\div' + sp() + ecritureParentheseSiNegatif(a),
            'blue',
          )}=${c - b + miseEnEvidence(sp() + '\\div' + sp() + ecritureParentheseSiNegatif(a), 'blue')}$<br>`
          texteCorr += `$${inconnue}=${new FractionEtendue(c - b, a).texFSD}$`
          reponse = new FractionEtendue(c - b, a).simplifie()
          if (pgcd(Math.abs(a), Math.abs(c - b)) > 1) {
            texteCorr += `<br>$${inconnue}=${reponse.texFSD}$`
          }
          break
        case 'x+b=c':
          a = 1 // c'est pour éviter un warning
          b = randint(1, 13)
          c = randint(1, 13)
          if (!this.sup && c < b) {
            b = randint(-9, 9, [0]) // b peut être négatif, ça sera une équation du type ${inconnue}-b=c
            c = Math.abs(randint(b, 15)) // c sera plus grand que b pour que c-b>0
          }
          texte = `$${inconnue}${ecritureAlgebrique(b)}=${c}$`
          texteCorr = texte + '<br>'

          if (this.correctionDetaillee) {
            if (b > 0) {
              texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
            } else {
              texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
            }
          }
          texteCorr += `$${inconnue}${ecritureAlgebrique(b)}${miseEnEvidence(
            gestionEspaceMiseEnEvidence(ecritureAlgebrique(-1 * b)),
            'blue',
          )}=${c}${miseEnEvidence(gestionEspaceMiseEnEvidence(ecritureAlgebrique(-1 * b)), 'blue')}$<br>`
          texteCorr += `$${inconnue}=${c - b}$`
          reponse = new FractionEtendue(c - b, 1)
          break
        case 'ax=b':
          c = 1 // c'est pour éviter un warning
          do {
            a = randint(2, 13)
            b = randint(1, 13)
          } while (b % a === 0)
          if (this.sup) {
            a *= choice([-1, 1])
            b *= choice([-1, 1])
          }
          texte = `$${a}${inconnue}=${b}$`
          texteCorr = texte + '<br>'

          if (this.correctionDetaillee) {
            texteCorr += `On divise les deux membres par $${a}$.<br>`
          }
          texteCorr += `$${a}${inconnue}${miseEnEvidence(
            sp() + '\\div' + sp() + ecritureParentheseSiNegatif(a),
            'blue',
          )}=${b + miseEnEvidence(sp() + '\\div' + sp() + ecritureParentheseSiNegatif(a), 'blue')}$<br>`
          texteCorr += `$${inconnue}=${new FractionEtendue(b, a).texFSD}$`
          reponse = new FractionEtendue(b, a).simplifie()
          // if (pgcd(abs(a), abs(b)) > 1 || a < 0) {
          if (pgcd(Math.abs(a), Math.abs(b)) > 1) {
            texteCorr += `<br>$${inconnue}=${reponse.texFSD}$`
          }
          break
        case 'ax+b=cx+d':
          do {
            a = randint(2, 13)
            b = randint(1, 13)
            c = randint(1, 13)
            d = randint(1, 13)
            if (this.sup) {
              a *= choice([-1, 1])
              b *= choice([-1, 1])
              c *= choice([-1, 1])
              d *= choice([-1, 1])
            }
            if (c === a) {
              c = randint(-13, 13, [a, 0])
            } // sinon on arrive à une division par 0
            if (!this.sup && a < c) {
              c = randint(1, 9)
              a = randint(c + 1, 15) // a sera plus grand que c pour que a-c>0
            }
            if (!this.sup && d < b) {
              b = randint(1, 9)
              d = randint(b + 1, 15) // d sera plus grand que b pour que d-b>0
            }
          } while ((d - b) % (a - c) === 0)
          texte = `$${rienSi1(a)}${inconnue}${ecritureAlgebrique(b)}=${rienSi1(
            c,
          )}${inconnue}${ecritureAlgebrique(d)}$`
          texteCorr = texte + '<br>'

          if (this.correctionDetaillee) {
            if (c > 0) {
              texteCorr += `On soustrait $${rienSi1(
                c,
              )}${inconnue}$ aux deux membres.<br>`
            } else {
              texteCorr += `On ajoute $${rienSi1(
                -1 * c,
              )}${inconnue}$ aux deux membres.<br>`
            }
          }
          texteCorr += `$${rienSi1(a)}${inconnue}${ecritureAlgebrique(
            b,
          )}${miseEnEvidence(
            gestionEspaceMiseEnEvidence(
              signe(-1 * c) + rienSi1(abs(c)) + inconnue,
            ),
            'blue',
          )}=${c}${inconnue}${ecritureAlgebrique(d)}${miseEnEvidence(
            gestionEspaceMiseEnEvidence(
              signe(-1 * c) + rienSi1(abs(c)) + inconnue,
            ),
            'blue',
          )}$<br>`
          texteCorr += `$${rienSi1(a - c)}${inconnue}${ecritureAlgebrique(
            b,
          )}=${d}$<br>`
          if (this.correctionDetaillee) {
            if (b > 0) {
              texteCorr += `On soustrait $${b}$ aux deux membres.<br>`
            } else {
              texteCorr += `On ajoute $${-1 * b}$ aux deux membres.<br>`
            }
          }
          texteCorr += `$${rienSi1(a - c)}${inconnue}${ecritureAlgebrique(
            b,
          )}${miseEnEvidence(
            gestionEspaceMiseEnEvidence(ecritureAlgebrique(-1 * b)),
            'blue',
          )}=${d}${miseEnEvidence(gestionEspaceMiseEnEvidence(ecritureAlgebrique(-1 * b)), 'blue')}$<br>`
          texteCorr += `$${rienSi1(a - c)}${inconnue}=${d - b}$<br>`

          if (this.correctionDetaillee) {
            texteCorr += `On divise les deux membres par $${a - c}$.<br>`
          }
          texteCorr += `$${rienSi1(a - c)}${inconnue}${miseEnEvidence(
            sp() + '\\div' + sp() + ecritureParentheseSiNegatif(a - c),
            'blue',
          )}=${
            d -
            b +
            miseEnEvidence(
              sp() + '\\div' + sp() + ecritureParentheseSiNegatif(a - c),
              'blue',
            )
          }$<br>`
          texteCorr += `$${inconnue}=${new FractionEtendue(d - b, a - c).texFSD}$`
          // if (pgcd(abs(d - b), abs(a - c)) > 1 || a - c < 0) {
          reponse = new FractionEtendue(d - b, a - c).simplifie()
          if (pgcd(Math.abs(d - b), Math.abs(a - c)) > 1) {
            texteCorr += `<br>$${inconnue}=${reponse.texFSD}$`
          }
          break
        case 'x/a=b':
          c = 1 // c'est pour éviter un warning
          do {
            a = randint(2, 13)
            b = randint(1, 13)
          } while (b % a === 0)
          if (this.sup) {
            a *= choice([-1, 1])
            b *= choice([-1, 1])
          }
          texte = `$\\dfrac{${inconnue}}{${a}}=${b}$`
          texteCorr = texte + '<br>'

          if (this.correctionDetaillee) {
            texteCorr += `On multiplie les deux membres par $${a}$.<br>`
          }
          texteCorr += `$\\dfrac{${inconnue}}{${a}}${miseEnEvidence(
            '\\times' + sp() + ecritureParentheseSiNegatif(a),
            'blue',
          )}=${b + miseEnEvidence('\\times' + sp() + ecritureParentheseSiNegatif(a), 'blue')}$`
          texteCorr += `<br>$${inconnue}=${b * a}$`
          reponse = new FractionEtendue(a * b, 1)
          break
        case 'ax/b=c':
        default:
          do {
            a = randint(2, 5)
            b = randint(5, 9)
            c = randint(2, 5)
          } while (pgcd(a, b) !== 1)
          if (this.sup) {
            a *= choice([-1, 1])
            b *= choice([-1, 1])
            c *= choice([-1, 1])
          }
          texte = `$\\dfrac{${a}${inconnue}}{${b}}=${c}$`
          texteCorr = texte + '<br>'

          if (this.correctionDetaillee) {
            texteCorr += `On multiplie les deux membres par $\\dfrac{${a < 0 ? -b : b}}{${Math.abs(a)}}$.<br>`
          }
          texteCorr += `$\\dfrac{${a}${inconnue}}{${b}}${miseEnEvidence(
            sp() +
              '\\times' +
              sp() +
              `\\dfrac{${a < 0 ? -b : b}}{${Math.abs(a)}}`,
            'blue',
          )}=${c + miseEnEvidence(sp() + '\\times' + sp() + `\\dfrac{${a < 0 ? -b : b}}{${Math.abs(a)}}`, 'blue')}$`
          texteCorr += `<br>$${inconnue}=\\dfrac{${c * b * (a < 0 ? -1 : 1)}}{${Math.abs(a)}}$`
          reponse = new FractionEtendue(c * b, a).simplifie()
          if (pgcd(c * b, a) !== 1) {
            texteCorr += `<br>$${inconnue}=${reponse.texFSD}$`
          }
          break
      }
      texteCorr += `<br> La solution de l'équation ${texte} est $${miseEnEvidence(reponse.texFSD)}$.`
      texte += ajouteChampTexteMathLive(
        this,
        i,
        '  clavierDeBaseAvecFraction',
        { texteAvant: `<br>$ ${inconnue} = $ ` },
      )
      handleAnswers(this, i, { reponse: { value: reponse.texFSD } })

      if (this.questionJamaisPosee(i, a, b, c, listeTypeDeQuestions[i])) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: '', // `Résoudre ${texte} et donner la solution sous la forme d'une fraction irréductible`,
            propositions: [
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: texteCorr,
                    statut: '',
                    reponse: {
                      texte:
                        listeTypeDeQuestions[i] === `${inconnue}+b=c`
                          ? `Résoudre ${texte}.`
                          : `Résoudre ${texte} et donner la solution sous la forme d'une fraction irréductible.`,
                      valeur: [reponse],
                      param: {
                        signe: this.sup,
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
    listeQuestionsToContenu(this)
  }
}
