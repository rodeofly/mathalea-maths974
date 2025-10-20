import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { fonctionComparaison } from '../../lib/interactif/comparisonFunctions'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { ecritureAlgebrique, reduireAxPlusB } from '../../lib/outils/ecritures'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Factoriser avec les identités remarquables (niveau II)'
export const interactifReady = true
export const interactifType = 'mathLive'
/**
 * Factoriser avec a²-b² avec a ou b expression algébrique 1er degré
 * @author Stéphane Guyon
 */
export const uuid = '874e8'
export const refs = {
  'fr-fr': [''],
  'fr-ch': ['11FA3-6'],
}
export default class FactoriserIdentitesremarquables2 extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 3
    this.sup = '1'
    this.besoinFormulaireTexte = [
      "Type d'expression (numéros séparés par des tirets)",
      '1 :forme (ax+b)²-c²\n2 : forme c²-(ax+b)²\n3 : (ax+b)²-(cx+d)²\n4 : a²(bx+c)²-d²(ex+f)²\n5 : Mélange des cas précédents',
    ]
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions === 1
        ? "Factoriser l'expression suivante."
        : 'Factoriser les expressions suivantes.'
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      nbQuestions: this.nbQuestions,
      min: 1,
      max: 4,
      melange: 5,
      defaut: 1,
    })
    for (
      let i = 0, texte, texteCorr, cpt = 0, a, b, c, d, k, typesDeQuestions;
      i < this.nbQuestions && cpt < 50;

    ) {
      do {
        a = randint(2, 9) * choice([-1, 1])
        b = randint(1, 9) * choice([-1, 1])
        c = randint(2, 9)
        d = randint(1, 9) * choice([-1, 1])
      } while (
        (a === c && b === d) ||
        (a === -c && b === -d) ||
        [a, b].filter((el) => el < 0).length === 2 ||
        [c, d].filter((el) => el < 0).length === 2
      )
      switch (listeTypeDeQuestions[i]) {
        case 1:
          texte = `$(${a}x${ecritureAlgebrique(b)})^2-${c * c}$` // (ax+b)²-c²

          texteCorr =
            // `$(${a}x${ecritureAlgebrique(b)})^2-${c * c}=(${a}x${ecritureAlgebrique(b)})^2-${c}^2$<br>
            `On reconnaît l'identité remarquable $a^2-b^2=(\\color{green}a\\color{black}-\\color{blue}b)(\\color{green}a\\color{black}+\\color{blue}b)$, avec $a=\\color{green}${a}x${ecritureAlgebrique(b)}$ et $b=\\color{blue}${c}$.<br><br>
                    $(${a}x${ecritureAlgebrique(b)})^2-${c * c}= (\\color{green} ${a}x${ecritureAlgebrique(b)}\\color{black})^2-\\color{blue}${c}\\color{black}^2 $ <br>
                    $\\phantom{(${a}x${ecritureAlgebrique(b)})^2-${c * c}}=\\left[\\color{green} (${a}x${ecritureAlgebrique(b)})\\color{black}-\\color{blue} ${c}\\right] \\left[ \\color{green}(${a}x${ecritureAlgebrique(b)})\\color{black}+\\color{blue}${c}\\right] $<br>
                    $\\phantom{(${a}x${ecritureAlgebrique(b)})^2-${c * c}}= (${reduireAxPlusB(a, b - c)}) (${reduireAxPlusB(a, b + c)})$`
          handleAnswers(this, i, {
            reponse: {
              value: `(${reduireAxPlusB(a, b - c)})(${reduireAxPlusB(a, b + c)})`,
              compare: fonctionComparaison,
              options: { factorisation: true },
            },
          })
          break
        case 2:
          texte = `$${c * c}-(${a}x${ecritureAlgebrique(b)})^2$` // c²-(ax+b)²
          texteCorr =
            // `$${c * c}-(${a}x${ecritureAlgebrique(b)})^2=${c}^2-(${a}x${ecritureAlgebrique(b)})^2$<br>
            `On reconnaît l'identité remarquable $a^2-b^2=(\\color{green}a\\color{black}-\\color{blue}b)(\\color{green}a\\color{black}+\\color{blue}b)$, avec $a=\\color{green}${c}$ et $b=\\color{blue}${a}x${ecritureAlgebrique(b)}$. <br><br>
                    $${c * c}-(${a}x${ecritureAlgebrique(b)})^2= \\color{green}${c}\\color{black}^2-(\\color{blue}${a}x${ecritureAlgebrique(b)}\\color{black})^2 $<br>
                    $\\phantom{${c * c}-(${a}x${ecritureAlgebrique(b)})^2}=\\left[ \\color{green}${c}\\color{black}-(\\color{blue}${a}x${ecritureAlgebrique(b)}\\color{black}) \\right] \\left[ \\color{green}${c}\\color{black}+(\\color{blue}${a}x${ecritureAlgebrique(b)}\\color{black}) \\right] $<br>
                    $\\phantom{${c * c}-(${a}x${ecritureAlgebrique(b)})^2}=(${c}${ecritureAlgebrique(-a)}x${ecritureAlgebrique(-b)}) (${c}${ecritureAlgebrique(a)}x${ecritureAlgebrique(b)})$<br>
                    $\\phantom{${c * c}-(${a}x${ecritureAlgebrique(b)})^2}=(${reduireAxPlusB(-a, c - b)}) (${reduireAxPlusB(a, b + c)})$`
          handleAnswers(this, i, {
            reponse: {
              value: `(${reduireAxPlusB(-a, c - b)})(${reduireAxPlusB(a, b + c)})`,
              compare: fonctionComparaison,
              options: { factorisation: true },
            },
          })
          break
        case 3:
          {
            texte = `$(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2$` // (ax+b)²-(cx+d)²
            // $(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2=a^2-b^2$<br>
            texteCorr = `On reconnaît l'identité remarquable $a^2-b^2=(\\color{green}a\\color{black}-\\color{blue}b\\color{black})(\\color{green}a\\color{black}+\\color{blue}b\\color{black})$, avec $a=\\color{green}${a}x${ecritureAlgebrique(b)}$ et $b=\\color{blue}${c}x${ecritureAlgebrique(d)}$. <br><br>
                    $(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2=
                    \\left[ (\\color{green}${a}x${ecritureAlgebrique(b)}\\color{black})-
                    (\\color{blue}${c}x${ecritureAlgebrique(d)}\\color{black})\\right]
                    \\left[ (\\color{green}${a}x${ecritureAlgebrique(b)}\\color{black})+
                    (\\color{blue}${c}x${ecritureAlgebrique(d)}\\color{black})\\right]$<br>
                    $\\phantom{(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2}=
                    (${a}x${ecritureAlgebrique(b)}${ecritureAlgebrique(-c)}x${ecritureAlgebrique(-d)})
                    (${a}x${ecritureAlgebrique(b)}${ecritureAlgebrique(c)}x${ecritureAlgebrique(d)})$<br>`

            texteCorr += `$\\phantom{(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2}=`
            const facteur1 = reduireAxPlusB(a - c, b - d)
            const facteur2 = reduireAxPlusB(a + c, b + d)
            const facteurConstant = [facteur1, facteur2].filter(
              (el) => !el.includes('x'),
            )
            if (facteurConstant.length === 0) {
              texteCorr += `(${facteur1})(${facteur2})$`
            } else {
              if (facteur1.includes('x')) {
                texteCorr += `${facteur2}(${facteur1})$`
              } else {
                texteCorr += `${facteur1}(${facteur2})$`
              }
            }
            handleAnswers(this, i, {
              reponse: {
                value: `(${facteur1})(${facteur2})`,
                compare: fonctionComparaison,
                options: { factorisation: true },
              },
            })
          }
          break
        case 4:
          {
            // e²(ax+b)²-f²(cx+d)²
            const e = randint(2, 6, [a, b])
            const f = randint(2, 6, [c, d, e])
            texte = `$${e ** 2}(${a}x${ecritureAlgebrique(b)})^2-${f ** 2}(${c}x${ecritureAlgebrique(d)})^2$` // (ax+b)²-(cx+d)²
            // $(${a}x${ecritureAlgebrique(b)})^2-(${c}x${ecritureAlgebrique(d)})^2=a^2-b^2$<br>
            texteCorr = `On reconnaît l'identité remarquable $a^2-b^2=(\\color{green}a\\color{black}-\\color{blue}b\\color{black})(\\color{green}a\\color{black}+\\color{blue}b\\color{black})$
, avec $a=\\color{green}${e}(${a}x${ecritureAlgebrique(b)})$ et $b=\\color{blue}${f}(${c}x${ecritureAlgebrique(d)})$.<br><br>`
            texteCorr += `
$\\begin{aligned}${e ** 2}(${a}x${ecritureAlgebrique(b)})^2-${f ** 2}(${c}x${ecritureAlgebrique(d)})^2
 &= \\left[(\\color{green}${e}\\times ${a}x${ecritureAlgebrique(b)}\\times ${e}\\color{black})-(\\color{blue}${f}\\times ${c}x${ecritureAlgebrique(d)}\\times ${f}\\color{black})\\right]
\\left[ (\\color{green}${e}\\times ${a}x${ecritureAlgebrique(b)}\\times ${e}\\color{black})+(\\color{blue}${f}\\times ${c}x${ecritureAlgebrique(d)}\\times ${f}\\color{black})\\right]
 \\\\&= (${a * e}x${ecritureAlgebrique(b * e)}${ecritureAlgebrique(-c * f)}x${ecritureAlgebrique(-d * f)})(${a * e}x${ecritureAlgebrique(b * e)}${ecritureAlgebrique(c * f)}x${ecritureAlgebrique(d * f)})\\\\`
            const facteur1 = reduireAxPlusB(e * a - c * f, b * e - d * f)
            const facteur2 = reduireAxPlusB(a * e + c * f, b * e + d * f)
            const facteurConstant = [facteur1, facteur2].filter(
              (el) => !el.includes('x'),
            )
            if (facteurConstant.length === 0 || !facteur1.includes('x')) {
              texteCorr += ` &= ${miseEnEvidence(`(${facteur1})(${facteur2})`)}\\end{aligned}$`
            } else {
              texteCorr += ` &= ${miseEnEvidence(`(${facteur2})(${facteur1})`)}\\end{aligned}$`
            }
            handleAnswers(this, i, {
              reponse: {
                value: `(${facteur1})(${facteur2})`,
                compare: fonctionComparaison,
                options: { factorisation: true },
              },
            })
          }
          break
      }
      if (listeTypeDeQuestions[i] < 4) {
        texte += ajouteChampTexteMathLive(
          this,
          i,
          KeyboardType.clavierDeBaseAvecVariable,
          { texteAvant: ' $=$' },
        )
        // Uniformisation : Mise en place de la réponse attendue en interactif en orange et gras
        const textCorrSplit = texteCorr.split('=')
        let aRemplacer = textCorrSplit[textCorrSplit.length - 1]
        aRemplacer = aRemplacer.replace('$', '')

        texteCorr = ''
        for (let ee = 0; ee < textCorrSplit.length - 1; ee++) {
          texteCorr += textCorrSplit[ee] + '='
        }
        texteCorr += `$ $${miseEnEvidence(aRemplacer)}$`
        // Fin de cette uniformisation
      }
      if (this.questionJamaisPosee(i, a, b, c, d, k, typesDeQuestions)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
