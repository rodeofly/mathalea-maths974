import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { simplificationDeFractionAvecEtapes } from '../../lib/outils/deprecatedFractions'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
  reduireAxPlusB,
  reduirePolynomeDegre3,
  rienSi1,
} from '../../lib/outils/ecritures'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { texteCentre } from '../../lib/format/miseEnPage'
import { sp } from '../../lib/outils/outilString'
import { pgcd } from '../../lib/outils/primalite'
import Exercice from '../Exercice'
import FractionEtendue from '../../modules/FractionEtendue'
import {
  fraction,
  obtenirListeFractionsIrreductibles,
  obtenirListeFractionsIrreductiblesFaciles,
} from '../../modules/fractions'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
export const titre =
  "Calculer des coordonnées de points appartenant à une courbe connaissant l'abscisse ou l'ordonnée"
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '24/09/2022'
export const dateDeModifImportante = '07/11/2023'
/**
 * Répondre à des questions sur les fonctions.
 * @author Gilles Mora
 */

export const uuid = 'ec059'

export const refs = {
  'fr-fr': ['2F20-2'],
  'fr-ch': ['11FA9-2'],
}
export default class CalculPointSurCourbe extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Choix des questions',
      4,
      '1 : Fonction affine\n2 : Polynôme de degré 2 \n3 : Fonction a/x+b \n4 : Mélange',
    ]
    this.besoinFormulaire2Numerique = [
      'Choix des questions',
      3,
      '1 : Valeurs entières\n2 : Valeurs fractionnaire\n3 : Mélange',
    ]
    this.sup = 1
    this.sup2 = 1

    this.nbQuestions = 2
  }

  nouvelleVersion() {
    let typesDeQuestionsDisponibles
    switch (this.sup) {
      case 1:
        typesDeQuestionsDisponibles = ['affine']
        break
      case 2:
        typesDeQuestionsDisponibles = ['polynôme']
        break
      case 3:
        typesDeQuestionsDisponibles = ['a/x+b']
        break
      case 4:
      default:
        typesDeQuestionsDisponibles = ['affine', 'polynôme', 'a/x+b']
        break

      //
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    let sousChoix
    if (this.sup2 === 1) {
      sousChoix = combinaisonListes([0], this.nbQuestions) // pour choisir aléatoirement des questions dans chaque catégorie
    } else if (this.sup2 === 2) {
      sousChoix = combinaisonListes([1], this.nbQuestions)
    } else {
      sousChoix = combinaisonListes([0, 1], this.nbQuestions)
    }

    const nomF = [['f'], ['g'], ['h'], ['u'], ['v'], ['w']]
    const pointM = [['M'], ['N'], ['P'], ['R'], ['S'], ['T']]
    for (
      let i = 0,
        texte,
        texteCorr,
        nom,
        point,
        x,
        y,
        a,
        b,
        c,
        abs,
        f,
        ord,
        f1,
        fa,
        fb,
        fractionA,
        fractionB,
        fractionC,
        fractionb,
        fractionb2,
        fractionc,
        enonce,
        correction,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // on ne choisit que des nombres compris entre 1 et 20
      x = randint(-9, 9, [0, 1, -1])
      y = randint(-9, 9, [x, 0])
      switch (listeTypeDeQuestions[i]) {
        case 'affine':
          switch (
            sousChoix[i] // sousChoix[i]
          ) {
            case 0:
              a = randint(-12, 12, [0, 1])
              b = randint(-12, 12, 0)
              abs = randint(-12, 12, 0)
              ord = a * abs + b
              nom = choice(nomF)
              point = choice(pointM)
              if (choice([true, false])) {
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduireAxPlusB(a, b)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
             $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$. <br>Quelle est son ordonnée ?`
                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
              $${nom}(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}${ecritureAlgebrique(b)}=${ord}$.<br>
              L'ordonnée du point $${point}$ est $${miseEnEvidence(ord)}$.`
                handleAnswers(this, i, { reponse: { value: ord } })
              } else {
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduireAxPlusB(a, b)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
             $${point}$ est le point de $\\mathscr{C}$ d'ordonnée $${ord}$.<br>
              Quelle est son abscisse ?`
                correction = `$${nom}$ est une fonction affine (non constante), donc il existe un unique point dont l'ordonnée est $${ord}$.<br>
                Puisque le point $${point}$ appartient à $\\mathscr{C}$, son abscisse est l'antécédent de son ordonnée.<br>
              On cherche donc $x$ tel que $${nom}(x)=${ord}$, c'est-à-dire $${reduireAxPlusB(a, b)}=${ord}$.<br>`
                if (b < 0) {
                  correction += `
              $\\begin{aligned}
              ${reduireAxPlusB(a, b)}&=${ord}\\\\
              ${reduireAxPlusB(a, b)}+${miseEnEvidence(-b)}&=${ord}+${miseEnEvidence(-b)}\\\\
              ${a}x&=${ord - b}   \\\\
              x&=\\dfrac{${ord - b}}{${a}}   \\\\
              x&=${abs}
                                          \\end{aligned}$<br>`
                } else {
                  correction += `
                                          $\\begin{aligned}
                                          ${reduireAxPlusB(a, b)}&=${ord}\\\\
                                          ${reduireAxPlusB(a, b)}-${miseEnEvidence(b)}&=${ord}-${miseEnEvidence(b)}\\\\
                                          ${a}x&=${ord - b}   \\\\
                                          x&=\\dfrac{${ord - b}}{${a}}   \\\\
                                          x&=${abs}
                                                                      \\end{aligned}$<br>`
                }
                correction += `L'abscisse du point $${point}$ est $${miseEnEvidence(abs)}$.`
                handleAnswers(this, i, { reponse: { value: abs } })
              }

              break
            case 1:
            default:
              a = randint(-10, 10, [0, 1])
              b = randint(-10, 10, 0)
              f = choice(obtenirListeFractionsIrreductibles())
              f1 = new FractionEtendue(a * f.n + b * f.d, f.d) // ordonnée du point
              fractionb = new FractionEtendue(b * f1.d, f1.d)
              fractionA = new FractionEtendue(f.n - b * f.d, f.d)
              fractionB = new FractionEtendue(b * f.d, f.d)
              fractionC = new FractionEtendue(f.n - b * f.d, a * f.d) // abscisse du point
              nom = choice(nomF)
              point = choice(pointM)
              if (choice([true, false])) {
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduireAxPlusB(a, b)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
              $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${f.texFraction}$.<br>
               Quelle est son ordonnée ?
              `
                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est l'image de son abscisse.<br>
                $${nom}\\left(${f.texFraction}\\right)=$`
                if (a === -1 || a === 1) {
                  correction += `$${rienSi1(a)}${f.texFraction}${ecritureAlgebrique(b)}=
                  ${rienSi1(a)}${f.texFraction}${fractionb.ecritureAlgebrique} =
                  \\dfrac{${rienSi1(a)}${f.n}${ecritureAlgebrique(b * f.d)}}{${f.d}}=
               ${f1.texFraction}${simplificationDeFractionAvecEtapes(a * f.n + b * f.d, f.d)}$.<br>`
                } else {
                  correction += `$${a}\\times ${f.texFraction}${ecritureAlgebrique(b)}=
                  ${a}\\times${f.texFraction}${fractionb.ecritureAlgebrique} =
                  \\dfrac{${a}\\times${f.n}${ecritureAlgebrique(b * f.d)}}{${f.d}}=
               ${f1.texFraction}${simplificationDeFractionAvecEtapes(a * f.n + b * f.d, f.d)}$.<br>`
                }
                correction += `L'ordonnée du point $${point}$ est $${miseEnEvidence(f1.texFractionSimplifiee)}$.`
                handleAnswers(this, i, { reponse: { value: f1 } })
              } else {
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
               ${texteCentre(`$${nom}(x)=${reduireAxPlusB(a, b)}$`)}
               On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
               $${point}$ est le point de $\\mathscr{C}$ d'ordonnée $${f.texFraction}$. <br>
               Quelle est son abscisse ?
               `

                correction = `$${nom}$ est une fonction affine (non constante), donc il existe un unique point dont l'ordonnée est $${f.texFraction}$.<br>
                 Puisque le point $${point}$ appartient à $\\mathscr{C}$, son abscisse est l'antécédent de son ordonnée.<br>
               On cherche donc $x$ tel que $${nom}(x)=${f.texFraction}$, c'est-à-dire $${reduireAxPlusB(a, b)}=${f.texFraction}$.<br>
                `
                if (b < 0) {
                  correction += `
                    $\\begin{aligned}
                    ${reduireAxPlusB(a, b)}&=${f.texFraction}\\\\
                    ${reduireAxPlusB(a, b)}+${miseEnEvidence(-b)}&=${f.texFraction}+${miseEnEvidence(-b)}\\\\
                    ${a}x&=${f.texFraction}+${fractionB.oppose().texFraction}   \\\\
                    ${a}x&=${fractionA.texFraction}\\\\
                    ${a}x\\div${miseEnEvidence(ecritureParentheseSiNegatif(a))} &=${fractionA.texFraction}\\div${miseEnEvidence(ecritureParentheseSiNegatif(a))} \\\\
                    x&=${fractionC.texFraction}${fractionC.texSimplificationAvecEtapes()}
                                                \\end{aligned}$<br>`
                } else {
                  correction += `
                    $\\begin{aligned}
                    ${reduireAxPlusB(a, b)}&=${f.texFraction}\\\\
                    ${reduireAxPlusB(a, b)}-${miseEnEvidence(b)}&=${f.texFraction}-${miseEnEvidence(b)}\\\\
                    ${a}x&=${f.texFraction}-${fractionB.texFraction}   \\\\
                    ${a}x&=${fractionA.texFraction}\\\\
                    ${a}x\\div${miseEnEvidence(ecritureParentheseSiNegatif(a))} &=${fractionA.texFraction}\\div${miseEnEvidence(ecritureParentheseSiNegatif(a))} \\\\
                    x&=${fractionC.texFraction}${fractionC.texSimplificationAvecEtapes()}
                                                \\end{aligned}$<br>`
                }
                correction += `L'abscisse du point $${point}$ est $${miseEnEvidence(fractionC.texFractionSimplifiee)}$.`
                handleAnswers(this, i, { reponse: { value: fractionC } })
              }

              break
          }

          break
        case 'polynôme':
          switch (
            sousChoix[i] // ax^2+bx+c
          ) {
            case 0:
              if (choice([true, false])) {
                a = randint(-10, 10, 0)
                b = randint(-10, 10, 0)
                c = randint(-10, 10)
                abs = randint(-9, 9)
                ord = a * abs ** 2 + b * abs + c
                nom = choice(nomF)
                point = choice(pointM)
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduirePolynomeDegre3(0, a, b, c)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
              $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$. <br>
              Quelle est son ordonnée ?`

                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br> `
                if (a !== 1) {
                  correction += `$${nom}(${abs})=${a}\\times ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}
                =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}=${ord}$.<br>`
                } else {
                  correction += `$${nom}(${abs})= ${ecritureParentheseSiNegatif(abs)}^2${ecritureAlgebrique(b)}\\times${ecritureParentheseSiNegatif(abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}
                =${a * abs ** 2}${ecritureAlgebrique(b * abs)}${c === 0 ? '' : `${ecritureAlgebrique(c)}`}=${ord}$.<br>`
                }
                correction += `L'ordonnée du point $${point}$ est $${miseEnEvidence(ord)}$.`
                handleAnswers(this, i, { reponse: { value: ord } })
              } else {
                a = randint(-10, 10, 0)
                b = randint(-10, 10, 0)
                c = randint(-10, 10, 0)
                abs = randint(-9, 16)
                ord = a * abs + c
                nom = choice(nomF)
                point = choice(pointM)
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
                ${texteCentre(`$${nom}(x)=${reduirePolynomeDegre3(0, a, 0, c)}$`)}
                On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${ord}$ ? <br>
                Si oui, quelles sont les abscisses possibles de ces points ?`
                if (this.interactif) {
                  enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
${texteCentre(`$${nom}(x)=${reduirePolynomeDegre3(0, a, 0, c)}$`)}
On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${ord}$ ? <br>
Si oui, quelles sont les abscisses possibles de ces points ?<br>
Écrire les valeurs séparées par un point-virgule ou $\\emptyset$ s'il n'y en a pas.`
                }

                correction = ` Si un point de $\\mathscr{C}$ a pour ordonnée $${ord}$, son abscisse est un antécédent de $${ord}$.<br> `

                correction += ` On cherche donc $x$ tel que $${nom}(x)=${ord}$, c'est-à-dire $${reduirePolynomeDegre3(0, a, 0, c)}=${ord}$.<br>
                  On résout cette équation en isolant le carré, c'est-à-dire en l'écrivant $x^2=${abs}$. <br>`
                if (abs === 0) {
                  correction += ` Cette équation n'a qu'une seule solution : $0$.<br>
 On en déduit qu'il existe un unique point de $\\mathscr{C}$ ayant pour ordonnée $${ord}$ : son abscisse est $${miseEnEvidence(0)}$. `
                  handleAnswers(this, i, { reponse: { value: 0 } })
                } else if (abs < 0) {
                  correction += ` Cette équation n'a pas de solution.<br>
 On en déduit qu'il n'existe pas de point de $\\mathscr{C}$ ayant pour ordonnée $${ord}$. `
                  handleAnswers(this, i, {
                    reponse: {
                      value: '\\emptyset',
                      options: { ensembleDeNombres: true },
                    },
                  })
                } else {
                  if (abs === 1 || abs === 4 || abs === 9 || abs === 16) {
                    correction += ` Cette équation a deux solutions : $-\\sqrt{${abs}}=-${Math.sqrt(abs)}$ et $\\sqrt{${abs}}=${Math.sqrt(abs)}$.<br>
                On en déduit qu'il existe deux points de $\\mathscr{C}$ ayant pour ordonnée $${ord}$.<br>
                Les  abscisses de ces points sont : $${miseEnEvidence(`-${Math.sqrt(abs)}`)}$ et $${miseEnEvidence(Math.sqrt(abs))}$. `
                    handleAnswers(this, i, {
                      reponse: {
                        value: `-${Math.sqrt(abs)};${Math.sqrt(abs)}`,
                        options: { suiteDeNombres: true },
                      },
                    })
                  } else {
                    correction += ` Cette équation a deux solutions : $-\\sqrt{${abs}}$ et $\\sqrt{${abs}}$.<br>
On en déduit qu'il existe deux points de $\\mathscr{C}$ ayant pour ordonnée $${ord}$.<br>
Les  abscisses de ces points sont : $${miseEnEvidence(`-\\sqrt{${abs}}`)}$ et $${miseEnEvidence(`\\sqrt{${abs}}`)}$. `
                    handleAnswers(this, i, {
                      reponse: {
                        value: `-\\sqrt{${abs}};\\sqrt{${abs}}`,
                        options: { suiteDeNombres: true },
                      },
                    })
                  }
                }
              }

              break

            case 1: // ax^2+bx+c
            default:
              a = randint(-2, 2, 0)
              b = randint(-3, 3)
              c = randint(-2, 2, 0)
              f = choice(obtenirListeFractionsIrreductiblesFaciles())
              f1 = fraction(
                a * f.n ** 2 + b * f.n * f.d + c * f.d ** 2,
                f.d ** 2,
              ) // ordonnée de A
              nom = choice(nomF)
              point = choice(pointM)
              fractionb = new FractionEtendue(b * f.n, f.d)
              fractionb2 = new FractionEtendue(b * f.n * f.d, f.d ** 2)
              fractionc = new FractionEtendue(c * f.d ** 2, f.d ** 2)
              enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}$ par :
              ${texteCentre(`$${nom}(x)=${reduirePolynomeDegre3(0, a, b, c)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
              $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${f.texFraction}$. <br>
              Quelle est son ordonnée ?`
              correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>`
              if (a !== 1) {
                if (b === 0) {
                  correction += `
                    $${nom}\\left(${f.texFraction}\\right)=${a}\\times \\left(${f.texFraction}\\right)^2${ecritureAlgebrique(c)}
                =\\dfrac{${a}\\times ${f.n ** 2}}{${f.d ** 2}}${ecritureAlgebrique(c)}
                =\\dfrac{${a * f.n ** 2}}{${f.d ** 2}}${fractionc.ecritureAlgebrique}
               = ${f1.texFractionSimplifiee}$`
                } else {
                  correction += `
                    $${nom}\\left(${f.texFraction}\\right)=${a}\\times \\left(${f.texFraction}\\right)^2${ecritureAlgebrique(b)}\\times${f.texFraction}${ecritureAlgebrique(c)}
                  =\\dfrac{${a}\\times ${f.n ** 2}}{${f.d ** 2}}${fractionb.ecritureAlgebrique}${ecritureAlgebrique(c)}
                  =\\dfrac{${a * f.n ** 2}}{${f.d ** 2}}${fractionb2.ecritureAlgebrique}${fractionc.ecritureAlgebrique}
                  =${f1.texFractionSimplifiee}$`
                }
              } else {
                if (b === 0) {
                  correction += `$${nom}\\left(${f.texFraction}\\right)=\\left(${f.texFraction}\\right)^2${ecritureAlgebrique(c)}
                =\\dfrac{${f.n ** 2}}{${f.d ** 2}}${ecritureAlgebrique(c)}
                =\\dfrac{${f.n ** 2}}{${f.d ** 2}}${fractionc.ecritureAlgebrique}
                =${f1.texFractionSimplifiee}$`
                } else {
                  correction += `$${nom}\\left(${f.texFraction}\\right)=\\left(${f.texFraction}\\right)^2${ecritureAlgebrique(b)}\\times${f.texFraction}${ecritureAlgebrique(c)}
                =\\dfrac{ ${f.n ** 2}}{${f.d ** 2}}${fractionb.ecritureAlgebrique}${ecritureAlgebrique(c)}
                =\\dfrac{${a * f.n ** 2}}{${f.d ** 2}}${fractionb2.ecritureAlgebrique}${fractionc.ecritureAlgebrique}
                =${f1.texFractionSimplifiee}$
                `
                }
              }
              correction += `<br> L'ordonnée du point $${point}$ est $${miseEnEvidence(f1.texFractionSimplifiee)}$.`
              handleAnswers(this, i, { reponse: { value: f1 } })
              break
          }

          break

        case 'a/x+b':
        default:
          switch (
            sousChoix[i] // sousChoix[i] = randint(0, 5)
          ) {
            case 0:
              if (choice([true, false])) {
                a = randint(-9, 9, 0)
                b = randint(-9, 9, 0)
                abs = randint(-9, 9, [0, 1, -1])
                nom = choice(nomF)
                point = choice(pointM)
                while (pgcd(a, abs) !== 1) {
                  a = randint(-9, 9, 0)
                }
                f1 = new FractionEtendue(a + b * abs, abs) // ordonnée de A
                fa = new FractionEtendue(a, abs)
                fb = new FractionEtendue(b * abs, abs)

                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}^*$ par :
                ${texteCentre(`$${nom}(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}
                On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs}$. <br>
                Quelle est son ordonnée ?`

                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est l'image de son abscisse.<br>
                                $${nom}(${abs})=\\dfrac{${a}}{${abs}}${ecritureAlgebrique(b)}
                =${fa.texFractionSimplifiee}${ecritureAlgebrique(b)}
                =${fa.texFractionSimplifiee}${fb.ecritureAlgebrique}=${f1.texFractionSimplifiee}$<br>`
                correction += `L'ordonnée du point $${point}$ est $${miseEnEvidence(f1.texFractionSimplifiee)}$.`
                handleAnswers(this, i, { reponse: { value: f1 } })
              } else {
                a = randint(-10, 10, 0)
                b = randint(-9, 9, 0)
                ord = randint(-9, 9, [0, 1, -1, b])
                nom = choice(nomF)
                point = choice(pointM)
                f1 = new FractionEtendue(a, ord - b)

                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}^*$ par :
                    ${texteCentre(`$${nom}(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}
                    On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                    Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${ord}$ ? <br>
                    Si oui, quelles sont les abscisses possibles de ces points ?`

                correction = ` Si un point de $\\mathscr{C}$ a pour ordonnée $${ord}$, son abscisse est un antécédent de $${ord}$.<br> `

                correction += ` On cherche donc $x$ tel que $${nom}(x)=${ord}$, c'est-à-dire $\\dfrac{${a}}{x}${ecritureAlgebrique(b)}=${ord}$.<br> `

                correction += `Pour $x\\neq 0$, <br>
                      $\\begin{aligned}
                      \\dfrac{${a}}{x}${ecritureAlgebrique(b)}&=${ord}\\\\
                      \\dfrac{${a}}{x}${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-b))}&=${ord}${miseEnEvidence(ecritureAlgebrique(-b))}\\\\
                      \\dfrac{${a}}{x}&=${ord - b}\\\\
                      x\\times${ecritureParentheseSiNegatif(ord - b)} &=${a} ${sp(4)}{\\text{(Produit en croix)}}\\\\
                      x&=${f1.texFraction}${f1.texSimplificationAvecEtapes()}\\\\
                                                \\end{aligned}$<br>
                                                Un seul point de $\\mathscr{C}$ a pour ordonnée $${ord}$. `
                correction += `Son abcsisse est $${miseEnEvidence(f1.texFractionSimplifiee)}$.`
                handleAnswers(this, i, { reponse: { value: f1 } })
              }

              break

            case 1:
            default:
              if (choice([true, false])) {
                a = randint(-9, 9, 0)
                b = randint(-9, 9, 0)
                abs = choice(obtenirListeFractionsIrreductiblesFaciles())

                f1 = new FractionEtendue(a * abs.d + b * abs.n, abs.n) // ordonnée de A
                fa = new FractionEtendue(a * abs.d, abs.n)
                fb = new FractionEtendue(b * abs.n, abs.n)

                nom = choice(nomF)
                point = choice(pointM)
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}^*$ par :
              ${texteCentre(`$${nom}(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}
             On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                $${point}$ est le point de $\\mathscr{C}$ d'abscisse $${abs.texFraction}$.<br>
                Quelle est son ordonnée ?`

                correction = `Puisque le point $${point}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
              $${nom}\\left(${abs.texFraction}\\right)
              =\\dfrac{${a}}{${abs.texFraction}}${ecritureAlgebrique(b)}
              =${a}\\times \\dfrac{${abs.d}}{${abs.n}}${ecritureAlgebrique(b)}=
              ${fa.texFractionSimplifiee}${ecritureAlgebrique(b)}
              =${f1.texFractionSimplifiee}
              $<br>`
                correction += `L'ordonnée du point $${point}$ est $${miseEnEvidence(f1.texFractionSimplifiee)}$.`
                handleAnswers(this, i, { reponse: { value: f1 } })
              } else {
                a = randint(-9, 9, 0)
                b = randint(-9, 9, 0)
                ord = choice(obtenirListeFractionsIrreductiblesFaciles())
                fa = fraction(ord.n - b * ord.d, ord.d)
                f1 = fraction(a * ord.d, ord.n - b * ord.d)
                nom = choice(nomF)
                point = choice(pointM)
                enonce = `Soit $${nom}$ la fonction définie sur $\\mathbb{R}^*$ par :
                ${texteCentre(`$${nom}(x)=\\dfrac{${a}}{x}${ecritureAlgebrique(b)}$`)}
                On note $\\mathscr{C}$ la courbe représentative de la fonction $${nom}$ dans un repère.<br>
                Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${ord.texFraction}$ ? <br>
                Si oui, quelles sont les abscisses possibles de ces points ?`

                correction = ` Si un point de $\\mathscr{C}$ a pour ordonnée $${ord.texFraction}$, son abscisse est un antécédent de $${ord.texFraction}$.<br> `

                correction += ` On cherche donc $x$ tel que $${nom}(x)=${ord.texFraction}$, c'est-à-dire $\\dfrac{${a}}{x}${ecritureAlgebrique(b)}=${ord.texFraction}$.<br> `

                correction += `Pour $x\\neq 0$, <br>
                      $\\begin{aligned}
                      \\dfrac{${a}}{x}${ecritureAlgebrique(b)}&=${ord.texFraction}\\\\
                      \\dfrac{${a}}{x}${ecritureAlgebrique(b)}${miseEnEvidence(ecritureAlgebrique(-b))}&=${ord.texFraction}${miseEnEvidence(ecritureAlgebrique(-b))}\\\\
                      \\dfrac{${a}}{x}&=${fa.texFraction}\\\\
                      x\\times${ecritureParentheseSiNegatif(ord.n - b * ord.d)} &=${a}\\times ${ord.d} ${sp(4)}{\\text{(Produit en croix)}}\\\\
                      x&=${f1.texFraction}${f1.texSimplificationAvecEtapes()}
                                                \\end{aligned}$<br>
                                                Un seul point de $\\mathscr{C}$ a pour ordonnée $${ord.texFraction}$. `
                correction += `Son abcsisse est $${miseEnEvidence(f1.texFractionSimplifiee)}$.`
                handleAnswers(this, i, { reponse: { value: f1 } })
              }

              break
          }
          break
      }

      texte = enonce
      texte +=
        ' ' + ajouteChampTexteMathLive(this, i, KeyboardType.clavierEnsemble)
      texteCorr = correction

      if (
        this.questionJamaisPosee(i, listeTypeDeQuestions[i], x, y, sousChoix[i])
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
