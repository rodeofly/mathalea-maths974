import { choice } from '../../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
  reduireAxPlusB,
  reduirePolynomeDegre3,
} from '../../../lib/outils/ecritures'
import { sp } from '../../../lib/outils/outilString'
import Exercice from '../../Exercice'
import { fraction } from '../../../modules/fractions'
import { randint, listeQuestionsToContenu } from '../../../modules/outils'
import { propositionsQcm } from '../../../lib/interactif/qcm'
export const titre =
  'Déterminer le sens de variation d’un pôlynome du second degré'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '1/11/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '10/06/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * étude de variation d'une fonction du 2nd degré.
 * @author Gilles Mora

*/
export const uuid = 'cc460'

export const refs = {
  'fr-fr': ['can1F02'],
  'fr-ch': [],
}
export default class SecondDegreVariations extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let texte, texteCorr, a, b, maFraction, c, maFractionN, props
    for (let i = 0; i < this.nbQuestions; i++) {
      switch (
        choice([1, 2, 3, 4, 5, 6]) //
      ) {
        case 1: // croissante forme développée
          a = randint(-5, 5, 0)
          b = randint(-9, 9)
          c = randint(-9, 9, 0)
          maFraction = fraction(-b, 2 * a)
          maFractionN = fraction(b, 2 * a)
          texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${reduirePolynomeDegre3(0, a, b, c)}$.<br>
  
              Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`
          if (b === 0) {
            this.autoCorrection[i] = {
              enonce: texte,
              options: { vertical: false },
              propositions: [
                {
                  texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                  statut: a > 0,
                },
                {
                  texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$ `,
                  statut: a < 0,
                },
                {
                  texte: `$\\bigg[${a}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                  statut: a === 0,
                },
                {
                  texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${a} \\bigg]$ `,
                  statut: a === 0,
                },
              ],
            }
          } else {
            this.autoCorrection[i] = {
              enonce: texte,
              options: { vertical: false },
              propositions: [
                {
                  texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                  statut: a > 0,
                },
                {
                  texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$ `,
                  statut: a < 0,
                },
                {
                  texte: `$\\bigg[${maFractionN.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                  statut: a === 0,
                },
                {
                  texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${maFractionN.texFractionSimplifiee} \\bigg]$ `,
                  statut: a === 0,
                },
              ],
            }
          }
          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          if (a > 0) {
            texteCorr = `Comme le coefficient $${a}$ devant $x^2$ est strictement positif, la fonction est d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
            <br> $-\\dfrac{b}{2a}=-\\dfrac{${b}}{2\\times ${ecritureParentheseSiNegatif(a)}}=${maFraction.texFractionSimplifiee}$.
            <br>Ainsi, $f$ est croissante sur $\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$.    `
          } else {
            texteCorr = `Comme le coefficient $${a}$ devant $x^2$ est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
            <br>$-\\dfrac{b}{2a}=-\\dfrac{${b}}{2\\times ${ecritureParentheseSiNegatif(a)}}=${maFraction.texFractionSimplifiee}$.
            <br>Ainsi, $f$ est croissante sur $\\bigg]-\\infty${sp(1)} ;${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$.    `
          }
          break

        case 2: // croissante forme canonique
          a = randint(-10, 10, 0)
          b = randint(-5, 5, 0)
          c = randint(-9, 9, 0)

          if (a === 1) {
            texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$.
            <br>
            
            Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`
          } else {
            if (a === -1) {
              texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=-(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$.
              <br>   Le plus grand intervalle sur lequel la fonction $f$ est croissante est :`
            } else {
              texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$.
              <br>
              
              Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`
            }
          }
          this.autoCorrection[i] = {
            enonce: texte,
            options: { vertical: false },
            propositions: [
              {
                texte: `$\\bigg[${-b}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: a > 0,
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)}${-b} \\bigg]$ `,
                statut: a < 0,
              },
              {
                texte: `$\\bigg[${b}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: a === 0,
              },
              {
                texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${b} \\bigg]$ `,
                statut: a === 0,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          if (a > 0) {
            if (b > 0) {
              texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>  $f(x)=a(x-\\alpha)^2+\\beta$
          <br>    Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
          <br>  Ici,  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}=
         ${reduireAxPlusB(0, a)}(x-(\\underbrace{-${b}}_{\\alpha}))^2${ecritureAlgebrique(c)}$, d'où $\\alpha=-${b}$.
         <br> Le coefficient $${a}$ devant la parenthèse est strictement positif, la fonction est donc
         d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
         <br>  Ainsi, $f$ est croissante sur $\\bigg[-${b} ${sp(1)} ;${sp(1)} +\\infty\\bigg[$.    `
            } else {
              texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>$f(x)=a(x-\\alpha)^2+\\beta$
           <br> Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
           <br>
           Ici,  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$, d'où $\\alpha=${-b}$.
           <br>  Le coefficient $${a}$ devant la parenthèse est strictement positif, la fonction est donc
          d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
          <br>  Ainsi, $f$ est croissante sur $\\bigg[${-b} ${sp(1)} ;${sp(1)} +\\infty\\bigg[$.    `
            }
          }
          if (a < 0) {
            if (b > 0) {
              texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>$f(x)=a(x-\\alpha)^2+\\beta$<br>
          Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
          <br> Ici,  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}=
         ${reduireAxPlusB(0, a)}(x-(\\underbrace{-${b}}_{\\alpha}))^2${ecritureAlgebrique(c)}$, d'où $\\alpha=-${b}$.
         <br> Comme le coefficient $${a}$ devant la parenthèse est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
         <br>    Ainsi, $f$ est croissante sur $\\bigg]-\\infty ${sp(1)} ;${sp(1)} -${b}  \\bigg]$.    `
            } else {
              texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>  $f(x)=a(x-\\alpha)^2+\\beta$
              <br> Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
           <br> Ici,  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$, d'où $\\alpha=${-b}$.
           <br> Comme le coefficient $${a}$ devant la parenthèse est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
           Ainsi, $f$ est croissante sur $\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${-b}  \\bigg]$.    `
            }
          }
          break
        case 3: // croissante forme factorisée
          a = randint(-5, 5, 0)
          b = randint(-9, 9)
          c = randint(-9, 9, 0)
          maFractionN = fraction(b + c, 2)
          maFraction = fraction(-(b + c), 2)
          if (a === 1) {
            texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=(${reduireAxPlusB(1, b)})(${reduireAxPlusB(1, c)})$.
            <br>
            
            Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`
          } else {
            if (a === -1) {
              texte =
                texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=-(${reduireAxPlusB(1, b)})(${reduireAxPlusB(1, c)})$.
              <br>
              
              Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`
            } else {
              texte =
                texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${a}(${reduireAxPlusB(1, b)})(${reduireAxPlusB(1, c)})$.
              <br>
              
              Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`
            }
          }
          this.autoCorrection[i] = {
            enonce: texte,
            options: { vertical: false },
            propositions: [
              {
                texte: `$\\bigg[${maFraction.texFractionSimplifiee} ${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: a > 0,
              },
              {
                texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${maFraction.texFractionSimplifiee} \\bigg]$ `,
                statut: a < 0,
              },
              {
                texte: `$\\bigg[${maFractionN.texFractionSimplifiee} ${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: a === 0,
              },
              {
                texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${maFractionN.texFractionSimplifiee} \\bigg]$ `,
                statut: a === 0,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          if (a < 0) {
            texteCorr = `On reconnaît une forme factorisée d'une fonction polynôme du second degré :
            <br>       $f(x)=a(x-x_1)(x-x_2)$ où $x_1$ et $x_2$ sont les racines du polynôme.
            <br>         L'abscisse du sommet de la parabole est donné par la moyenne des racines soit par : $\\dfrac{x_1+x_2}{2}=\\dfrac{${-b}+${ecritureParentheseSiNegatif(-c)}}{2}= ${maFraction.texFractionSimplifiee}$.
            <br>           Comme le coefficient $${a}$ devant les parenthèses est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
                <br>           Ainsi, $f$ est croissante sur $\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${maFraction.texFractionSimplifiee}  \\bigg]$.    `
          } else {
            texteCorr = `On reconnaît une forme factorisée d'une fonction polynôme du second degré :
            <br>      $f(x)=a(x-x_1)(x-x_2)$ où $x_1$ et $x_2$ sont les racines du polynôme.
            <br>    L'abscisse du sommet de la parabole est donné par la moyenne des racines soit par : $\\dfrac{x_1+x_2}{2}=\\dfrac{${-b}+${ecritureParentheseSiNegatif(-c)}}{2}= ${maFraction.texFractionSimplifiee}$.
            <br>            Comme le coefficient $${a}$ devant les parenthèses est strictement positif, la fonction est d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
              <br>     Ainsi, $f$ est croissante sur $\\bigg[${maFraction.texFractionSimplifiee} ${sp(1)} ;${sp(1)} +\\infty\\bigg[$.    `
          }
          break

        case 4: // décroissante forme développée
          a = randint(-5, 5, 0)
          b = randint(-9, 9)
          c = randint(-9, 9, 0)
          maFraction = fraction(-b, 2 * a)
          maFractionN = fraction(b, 2 * a)
          texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${reduirePolynomeDegre3(0, a, b, c)}$.
          <br>
          
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`
          if (b === 0) {
            this.autoCorrection[i] = {
              enonce: texte,
              options: { vertical: false },
              propositions: [
                {
                  texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                  statut: a < 0,
                },
                {
                  texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$ `,
                  statut: a > 0,
                },
                {
                  texte: `$\\bigg[${a}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                  statut: a === 0,
                },
                {
                  texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${a} \\bigg]$ `,
                  statut: a === 0,
                },
              ],
            }
          } else {
            this.autoCorrection[i] = {
              enonce: texte,
              options: { vertical: false },
              propositions: [
                {
                  texte: `$\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                  statut: a < 0,
                },
                {
                  texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$ `,
                  statut: a > 0,
                },
                {
                  texte: `$\\bigg[${maFractionN.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                  statut: a === 0,
                },
                {
                  texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${maFractionN.texFractionSimplifiee} \\bigg]$ `,
                  statut: a === 0,
                },
              ],
            }
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          if (a > 0) {
            texteCorr = `Comme le coefficient $${a}$ devant $x^2$ est strictement positif, la fonction est d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
            <br>         $-\\dfrac{b}{2a}=-\\dfrac{${b}}{2\\times ${ecritureParentheseSiNegatif(a)}}=${maFraction.texFractionSimplifiee}$.
           <br>          Ainsi, $f$ est décroissante sur $\\bigg]-\\infty${sp(1)} ;${sp(1)}${maFraction.texFractionSimplifiee} \\bigg]$.    `
          } else {
            texteCorr = `Comme le coefficient $${a}$ devant $x^2$ est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
            <br>  $-\\dfrac{b}{2a}=-\\dfrac{${b}}{2\\times ${ecritureParentheseSiNegatif(a)}}=${maFraction.texFractionSimplifiee}$.
    <br>   Ainsi, $f$ est décroissante sur $\\bigg[${maFraction.texFractionSimplifiee}${sp(1)} ;${sp(1)} +\\infty\\bigg[$.    `
          }
          break

        case 5: // décroissante forme canonique
          a = randint(-10, 10, 0)
          b = randint(-5, 5, 0)
          c = randint(-9, 9, 0)

          if (a === 1) {
            texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$.
            <br>
  
            Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`
          } else {
            if (a === -1) {
              texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=-(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$.
              <br>
  
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`
            } else {
              texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$.
              <br>
  
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`
            }
          }
          this.autoCorrection[i] = {
            enonce: texte,
            options: { vertical: false },
            propositions: [
              {
                texte: `$\\bigg[${-b}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: a < 0,
              },
              {
                texte: `$\\bigg]-\\infty${sp(1)} ;${sp(1)}${-b} \\bigg]$ `,
                statut: a > 0,
              },
              {
                texte: `$\\bigg[${b}${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: a === 0,
              },
              {
                texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${b} \\bigg]$ `,
                statut: a === 0,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          if (a > 0) {
            if (b > 0) {
              texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>        $f(x)=a(x-\\alpha)^2+\\beta$<br>
          Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
          <br>       Ici,  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}=
         ${reduireAxPlusB(0, a)}(x-(\\underbrace{-${b}}_{\\alpha}))^2${ecritureAlgebrique(c)}$, d'où $\\alpha=-${b}$.
         <br>       Le coefficient $${a}$ devant la parenthèse est strictement positif, la fonction est donc
         d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
         <br>    Ainsi, $f$ est décroissante sur $\\bigg]-\\infty${sp(1)} ;${sp(1)}${-b} \\bigg]$.    `
            } else {
              texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>         $f(x)=a(x-\\alpha)^2+\\beta$
              <br>         Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
              <br>         Ici,  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$, d'où $\\alpha=${-b}$.
              <br>        Le coefficient $${a}$ devant la parenthèse est strictement positif, la fonction est donc
          d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
          <br>           Ainsi, $f$ est décroissante sur $\\bigg]-\\infty${sp(1)} ;${sp(1)}${-b} \\bigg]$.    `
            }
          }
          if (a < 0) {
            if (b > 0) {
              texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>        $f(x)=a(x-\\alpha)^2+\\beta$
          <br>        Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
          <br>       Ici,  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}=
         ${reduireAxPlusB(0, a)}(x-(\\underbrace{-${b}}_{\\alpha}))^2${ecritureAlgebrique(c)}$, d'où $\\alpha=-${b}$.
         <br>       Comme le coefficient $${a}$ devant la parenthèse est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
         <br>         Ainsi, $f$ est décroissante sur $\\bigg[${-b}${sp(1)} ;${sp(1)} +\\infty\\bigg[$.    `
            } else {
              texteCorr = `On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>         $f(x)=a(x-\\alpha)^2+\\beta$
           <br>         Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
           <br>         Ici,  $f(x)=${reduireAxPlusB(0, a)}(${reduireAxPlusB(1, b)})^2${ecritureAlgebrique(c)}$, d'où $\\alpha=${-b}$.
           <br>         Comme le coefficient $${a}$ devant la parenthèse est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
           <br>         Ainsi, $f$ est décroissante sur $\\bigg[${-b}${sp(1)} ;${sp(1)} +\\infty\\bigg[$.    `
            }
          }
          break

        case 6: // décroissante forme factorisée
          a = randint(-5, 5, 0)
          b = randint(-9, 9)
          c = randint(-9, 9, 0)
          maFractionN = fraction(b + c, 2)
          maFraction = fraction(-(b + c), 2)
          if (a === 1) {
            texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=(${reduireAxPlusB(1, b)})(${reduireAxPlusB(1, c)})$.
            <br>
  
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`
          } else {
            if (a === -1) {
              texte =
                texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par $f(x)=-(${reduireAxPlusB(1, b)})(${reduireAxPlusB(1, c)})$.
              <br>                           Le plus grand intervalle sur lequel la fonction $f$ est décroissante est :`
            } else {
              texte =
                texte = `Soit $f$ la fonction définie sur $\\mathbb{R}$ par : $f(x)=${a}(${reduireAxPlusB(1, b)})(${reduireAxPlusB(1, c)})$.
              <br>
              
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`
            }
          }
          this.autoCorrection[i] = {
            enonce: texte,
            options: { vertical: false },
            propositions: [
              {
                texte: `$\\bigg[${maFraction.texFractionSimplifiee} ${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: a < 0,
              },
              {
                texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${maFraction.texFractionSimplifiee} \\bigg]$ `,
                statut: a > 0,
              },
              {
                texte: `$\\bigg[${maFractionN.texFractionSimplifiee} ${sp(1)} ;${sp(1)} +\\infty\\bigg[$ `,
                statut: a === 0,
              },
              {
                texte: `$\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${maFractionN.texFractionSimplifiee} \\bigg]$ `,
                statut: a === 0,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          if (a < 0) {
            texteCorr = `On reconnaît une forme factorisée d'une fonction polynôme du second degré :
            <br>              $f(x)=a(x-x_1)(x-x_2)$ où $x_1$ et $x_2$ sont les racines du polynôme.
            <br>              L'abscisse du sommet de la parabole est donné par la moyenne des racines soit par : $\\dfrac{x_1+x_2}{2}=\\dfrac{${-b}+${ecritureParentheseSiNegatif(-c)}}{2}= ${maFraction.texFractionSimplifiee}$.
                <br>              Comme le coefficient $${a}$ devant les parenthèses est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
                <br>              Ainsi, $f$ est décroissante sur $\\bigg[${maFraction.texFractionSimplifiee} ${sp(1)} ;${sp(1)} +\\infty\\bigg[$.    `
          } else {
            texteCorr = `On reconnaît une forme factorisée d'une fonction polynôme du second degré :
            <br>            $f(x)=a(x-x_1)(x-x_2)$ où $x_1$ et $x_2$ sont les racines du polynôme.
            <br> L'abscisse du sommet de la parabole est donné par la moyenne des racines soit par : $\\dfrac{x_1+x_2}{2}=\\dfrac{${-b}+${ecritureParentheseSiNegatif(-c)}}{2}= ${maFraction.texFractionSimplifiee}$.
              <br>            Comme le coefficient $${a}$ devant les parenthèses est strictement positif, la fonction est d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
              <br> Ainsi, $f$ est croissante sur $\\bigg]-\\infty ${sp(1)} ;${sp(1)} ${maFraction.texFractionSimplifiee} \\bigg]$.    `
          }
          break
      }
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      listeQuestionsToContenu(this)
      this.canEnonce = texte
      this.canReponseACompleter = ''
    }
  }
}
