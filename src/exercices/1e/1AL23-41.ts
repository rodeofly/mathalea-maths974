import { tableauDeVariation } from '../../lib/mathFonctions/etudeFonction'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
  rienSi1,
} from '../../lib/outils/ecritures'
import { context } from '../../modules/context'
import FractionEtendue from '../../modules/FractionEtendue'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Trinome from '../../modules/Trinome'
import Exercice from '../Exercice'

export const titre = 'Bilan : équations et inéquations du second degré'
export const interactifReady = false

export const dateDePublication = '28/10/2022'
export const dateDeModifImportante = '5/11/2023'

/**
 * Bilan sur les différentes formes d'équations et d'inéquations
 * @author Rémi Angot
 */
export const uuid = 'b9252'

export const refs = {
  'fr-fr': ['1AL23-41'],
  'fr-ch': [],
}
export default class EquationsEtInequations extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 4
  }

  nouvelleVersion() {
    if (context.vue === 'diap' || this.nbQuestions === 1) {
      this.introduction = 'Résoudre dans $\\mathbb{R}$ :'
    } else
      this.introduction =
        'Résoudre dans $\\mathbb{R}$ les équations et inéquations suivantes.'
    let typesDeQuestionsDisponibles = [
      'inequationFormeFactorisee',
      'inequationFormeDevelopeeSansRacine',
      'inequationFormeDevelopeeAvecRacines',
      'inequationFormeDevelopeeSansRacineBis',
      'inequationFormeDevelopeeAvecRacinesBis',
      'ax2=bx',
    ]
    if (this.nbQuestions === 4) {
      typesDeQuestionsDisponibles = ['inequationFormeFactorisee', 'ax2=bx']
      if (randint(1, 2) > 1)
        typesDeQuestionsDisponibles.push(
          'inequationFormeDevelopeeSansRacine',
          'inequationFormeDevelopeeAvecRacinesBis',
        )
      else
        typesDeQuestionsDisponibles.push(
          'inequationFormeDevelopeeAvecRacines',
          'inequationFormeDevelopeeSansRacineBis',
        )
    }
    const listeTypeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    const listeTypeInequation = combinaisonListes(
      ['<', '\\leq', '>', '\\geq'],
      this.nbQuestions,
    )

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      const typeInequation = listeTypeInequation[i]
      if (listeTypeQuestions[i] === 'inequationFormeFactorisee') {
        const a = randint(-5, 5, 0)
        const b = randint(-5, 5, 0)
        const c = randint(-5, 5, [0, a])
        const d = randint(-5, 5, [0, b])
        texte += `$(${b}${ecritureAlgebriqueSauf1(a)}x)(${rienSi1(c)}x${ecritureAlgebrique(d)}) ${typeInequation} 0$`

        let x1 = new FractionEtendue(-b, a)
        let x2 = new FractionEtendue(-d, c)
        texteCorr += "On cherche l'ensemble des $x$ tels que : " + texte + '.'
        texteCorr += `<br><br>$${b}${ecritureAlgebriqueSauf1(a)}x = 0 \\iff x= ${x1.simplifie().texFraction}`
        texteCorr += ` \\qquad \\text{et} \\qquad ${rienSi1(c)}x${ecritureAlgebrique(d)} = 0 \\iff x= ${x2.simplifie().texFraction}$`

        // t pour la ligne pointillée, z pour la ligne pointillée et le zéro
        let ligne1 =
          a > 0
            ? ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 't', 20, '+', 20]
            : ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 't', 20, '-', 20]
        let ligne2 =
          c > 0
            ? ['Line', 30, '', 0, '-', 20, 't', 20, '-', 20, 'z', 20, '+', 20]
            : ['Line', 30, '', 0, '+', 20, 't', 20, '+', 20, 'z', 20, '-', 20]
        if (x1.valeurDecimale > x2.valeurDecimale) {
          ;[x1, x2] = [x2, x1]
          ;[ligne1, ligne2] = [ligne2, ligne1]
        }
        const ligne3 =
          a * c > 0
            ? ['Line', 30, '', 0, '+', 20, 'z', 20, '-', 20, 'z', 20, '+', 20]
            : ['Line', 30, '', 0, '-', 20, 'z', 20, '+', 20, 'z', 20, '-', 20]
        texteCorr +=
          '<br><br>On en déduit le signe du polynôme dans un tableau de signes :'
        texteCorr += tableauDeVariation({
          tabInit: [
            // @ts-expect-error tableau de variation n'est pas typé
            [
              // Première colonne du tableau avec le format [chaine d'entête, hauteur de ligne, nombre de pixels de largeur estimée du texte pour le centrage]
              ['$x$', 3, 30],
              [`$${b}${ecritureAlgebriqueSauf1(a)}x$`, 2, 50],
              [`$${rienSi1(c)}x${ecritureAlgebrique(d)}$`, 2, 50],
              [
                `$(${b}${ecritureAlgebriqueSauf1(a)}x)(${rienSi1(c)}x${ecritureAlgebrique(d)})$`,
                2,
                100,
              ],
            ],
            // Première ligne du tableau avec chaque antécédent suivi de son nombre de pixels de largeur estimée du texte pour le centrage
            // @ts-expect-error tableau de variation n'est pas typé
            [
              '$-\\infty$',
              30,
              `$${x1.simplifie().texFraction}$`,
              20,
              `$${x2.simplifie().texFraction}$`,
              20,
              '$+\\infty$',
              30,
            ],
          ],
          // tabLines ci-dessous contient les autres lignes du tableau.
          // @ts-expect-error tableau de variation n'est pas typé
          tabLines: [ligne1, ligne2, ligne3],
          colorBackground: '',
          espcl: 3.5, // taille en cm entre deux antécédents
          deltacl: 0.8, // distance entre la bordure et les premiers et derniers antécédents
          lgt: 8, // taille de la première colonne en cm
          hauteurLignes: [20, 15, 15, 15],
        })

        texteCorr += '<br> Finalement '

        if (
          (typeInequation === '>' && a * c > 0) ||
          (typeInequation === '<' && a * c < 0)
        ) {
          texteCorr += `$S=\\left]-\\infty;${x1.simplifie().texFraction}\\right[\\cup\\left]${x2.simplifie().texFraction};+\\infty\\right[$.`
        } else if (
          (typeInequation === '<' && a * c > 0) ||
          (typeInequation === '>' && a * c < 0)
        ) {
          texteCorr += `$S=\\left]${x1.simplifie().texFraction};${x2.simplifie().texFraction}\\right[$.`
        } else if (
          (typeInequation === '\\geq' && a * c > 0) ||
          (typeInequation === '\\leq' && a * c < 0)
        ) {
          texteCorr += `$S=\\left]-\\infty;${x1.simplifie().texFraction}\\right]\\cup\\left[${x2.simplifie().texFraction};+\\infty\\right[$.`
        } else {
          texteCorr += `$S=\\left[${x1.simplifie().texFraction};${x2.simplifie().texFraction}\\right]$.`
        }
      } else if (
        listeTypeQuestions[i] === 'inequationFormeDevelopeeSansRacine' ||
        listeTypeQuestions[i] === 'inequationFormeDevelopeeSansRacineBis'
      ) {
        const p = new Trinome(0, 0, 0)
        const a = randint(-3, 3, 0)
        const alpha = randint(-5, 5, 0)
        const beta = a > 0 ? randint(1, 3) : randint(-3, -1)
        p.defFormeCanonique(a, alpha, beta)
        if (listeTypeQuestions[i] === 'inequationFormeDevelopeeSansRacine') {
          texte += `$${p.tex} ${typeInequation} 0$`
        } else {
          texte += `$${rienSi1(p.a.valeurDecimale)}x^2 ${ecritureAlgebriqueSauf1(p.b.valeurDecimale)} x ${typeInequation} ${-p.c.valeurDecimale}$`
        }
        texteCorr +=
          "On cherche l'ensemble des $x$ tels que : " + texte + '.<br><br>'
        if (listeTypeQuestions[i] === 'inequationFormeDevelopeeSansRacineBis') {
          texteCorr = `$${rienSi1(p.a.valeurDecimale)}x^2 ${ecritureAlgebriqueSauf1(p.b.valeurDecimale)} x ${typeInequation} ${-p.c.valeurDecimale} \\iff ${p.tex} ${typeInequation} 0$<br><br>`
        }
        texteCorr +=
          'Calculons le discriminant de ce polynôme du second degré : '
        texteCorr += `$\\Delta = ${p.texCalculDiscriminant}$.`
        texteCorr += `<br><br>Le discriminant est strictement négatif, donc le polynôme est toujours du signe de $a$ donc ici toujours ${p.a.s === 1 ? 'positif' : 'négatif'}.`
        texteCorr += '<br><br>Finalement $S='
        if (
          p.a.valeurDecimale > 0 &&
          (typeInequation === '>' || typeInequation === '\\geq')
        )
          texteCorr += '\\R'
        else if (
          p.a.valeurDecimale < 0 &&
          (typeInequation === '<' || typeInequation === '\\leq')
        )
          texteCorr += '\\R'
        else texteCorr += '\\empty'
        texteCorr += '$.'
      } else if (
        listeTypeQuestions[i] === 'inequationFormeDevelopeeAvecRacines' ||
        listeTypeQuestions[i] === 'inequationFormeDevelopeeAvecRacinesBis'
      ) {
        const p = new Trinome(0, 0, 0)
        const a = randint(-3, 3, 0)
        const alpha = randint(-5, 5, 0)
        let beta = randint(1, 3)
        if (a > 0) beta *= -1
        p.defFormeCanonique(a, alpha, beta)
        if (listeTypeQuestions[i] === 'inequationFormeDevelopeeAvecRacines') {
          texte += `$${p.tex} ${typeInequation} 0$`
        } else {
          texte += `$${rienSi1(p.a.valeurDecimale)}x^2 ${ecritureAlgebriqueSauf1(p.b.valeurDecimale)} x ${typeInequation} ${-p.c.valeurDecimale}$`
        }
        texteCorr +=
          "On cherche l'ensemble des $x$ tels que : " + texte + '.<br><br>'
        if (
          listeTypeQuestions[i] === 'inequationFormeDevelopeeAvecRacinesBis'
        ) {
          texteCorr =
            `$${rienSi1(p.a.valeurDecimale)}x^2 ${ecritureAlgebriqueSauf1(p.b.valeurDecimale)} x ${typeInequation} ${p.c.valeurDecimale} \\iff ${p.tex} ${typeInequation} 0$` +
            '<br></br>'
        }
        texteCorr +=
          'Calculons le discriminant de ce polynôme du second degré : '
        texteCorr += `$\\Delta = ${p.texCalculDiscriminant}$.`
        texteCorr +=
          '<br><br>Le discriminant est strictement positif, donc le polynôme a deux racines.'
        texteCorr += `<br><br>$${p.texCalculRacine1(true)}$`
        texteCorr += `<br><br>$${p.texCalculRacine2(true)}$`
        texteCorr += '<br><br>'
        if (
          (typeInequation === '>' && a > 0) ||
          (typeInequation === '<' && a < 0)
        ) {
          texteCorr +=
            "On sait que le polynôme est du signe de $a$ à l'extérieur de ses racines donc "
          texteCorr += `$S=\\left]-\\infty;${p.texX1}\\right[\\cup\\left]${p.texX2};+\\infty\\right[$.`
        } else if (
          (typeInequation === '<' && a > 0) ||
          (typeInequation === '>' && a < 0)
        ) {
          texteCorr +=
            'On sait que le polynôme est du signe de $-a$ entre ses racines donc '
          texteCorr += `$S=\\left]${p.texX1};${p.texX2}\\right[$.`
        } else if (
          (typeInequation === '\\geq' && a > 0) ||
          (typeInequation === '\\leq' && a < 0)
        ) {
          texteCorr +=
            "On sait que le polynôme est du signe de $a$ à l'extérieur de ses racines donc "
          texteCorr += `$S=\\left]-\\infty;${p.texX1}\\right]\\cup\\left[${p.texX2};+\\infty\\right[$.`
        } else {
          texteCorr +=
            'On sait que le polynôme est du signe de $-a$ entre ses racines donc '
          texteCorr += `$S=\\left[${p.texX1};${p.texX2}\\right]$.`
        }
      } else if (listeTypeQuestions[i] === 'ax2=bx') {
        const a = randint(-5, 5, 0)
        const b = randint(-5, 5, 0)
        texte += `$${rienSi1(a)}x^2 = ${rienSi1(-b)}x$`
        texteCorr += "On cherche l'ensemble des $x$ tels que : " + texte + '.'
        texteCorr += `<br><br>$${rienSi1(a)}x^2 = ${rienSi1(-b)}x \\iff ${rienSi1(a)}x^2  ${ecritureAlgebriqueSauf1(b)}x = 0$`
        texteCorr += `<br><br>$\\phantom{${rienSi1(a)}x^2 = ${rienSi1(-b)}x} \\iff x(${rienSi1(a)}x  ${ecritureAlgebrique(b)})=0$`
        texteCorr += `<br><br>$\\phantom{${rienSi1(a)}x^2 = ${rienSi1(-b)}x} \\iff x = 0 \\text{ \\qquad ou \\qquad }${rienSi1(a)}x  ${ecritureAlgebrique(b)}=0$`
        const x = new FractionEtendue(-b, a)
        texteCorr += `<br><br>Finalement $S=\\left\\{ 0 \\,;\\, ${x.simplifie().texFraction}  \\right\\}$.`
      }

      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
