import { codageSegments } from '../../../lib/2d/codages'
import { courbeInterpolee } from '../../../lib/2d/courbes'
import { droite } from '../../../lib/2d/droites'
import { milieu, point, tracePoint } from '../../../lib/2d/points'
import { grille, repere } from '../../../lib/2d/reperes'
import {
  demiDroite,
  segment,
  segmentAvecExtremites,
} from '../../../lib/2d/segmentsVecteurs'
import { labelPoint, texteParPosition } from '../../../lib/2d/textes'
import { texPrix } from '../../../lib/format/style'
import { choice, shuffle } from '../../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
} from '../../../lib/outils/ecritures'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../../lib/outils/embellissements'
import { abs, arrondi, range1 } from '../../../lib/outils/nombres'
import { sp } from '../../../lib/outils/outilString'

import { stringNombre, texNombre } from '../../../lib/outils/texNombre'
import {
  mathalea2d,
  type NestedObjetMathalea2dArray,
} from '../../../modules/2dGeneralites'
import FractionEtendue from '../../../modules/FractionEtendue'
import { context } from '../../../modules/context'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'

import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'

export const titre = 'CAN Seconde sujet 2023'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '03/04/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const uuid = '9bc44'

export const refs = {
  'fr-fr': ['can2a-2023'],
  'fr-ch': [],
}

/**
 * Aléatoirisation du sujet 2023 de CAN seconde
 * Gilles Mora

 */

function compareNombres(a: number, b: number) {
  return a - b
}

export default class SujetCAN2023Seconde extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 30

    this.comment = `Cet exercice fait partie des annales des Courses Aux Nombres.<br>
  Il est composé de 30 questions réparties de la façon suivante :<br>
  Les 10 premières questions, parfois communes à plusieurs niveaux, font appel à des questions élémentaires et les 20 suivantes (qui ne sont pas rangées dans un ordre de difficulté) sont un peu plus « coûteuses » cognitivement.<br>
  Par défaut, les questions sont rangées dans le même ordre que le sujet officiel avec des données aléatoires. Ainsi, en cliquant sur « Nouvelles données », on obtient une nouvelle Course Aux Nombres avec des données différentes.
  En choisissant un nombre de questions inférieur à 30, on fabrique une « mini » Course Aux Nombres qui respecte la proportion de nombre de questions élémentaires par rapport aux autres.
  Par exemple, en choisissant 20 questions, la course aux nombres sera composée de 7 ou 8 questions élémentaires choisies aléatoirement dans les 10 premières questions du sujet officiel puis de 12 ou 13 autres questions choisies aléatoirement parmi les 20 autres questions du sujet officiel.`
  }

  nouvelleVersion() {
    let typeQuestionsDisponibles = []
    if (this.nbQuestions === 30) {
      typeQuestionsDisponibles = range1(30)
    } else {
      const nbQ1 = Math.min(arrondi((this.nbQuestions * 10) / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 10 possibles.
      const nbQ2 = Math.min(this.nbQuestions - nbQ1, 20)
      const typeQuestionsDisponiblesNiv1 = shuffle([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ])
        .slice(-nbQ1)
        .sort(compareNombres) // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      const typeQuestionsDisponiblesNiv2 = shuffle([
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29,
        30,
      ])
        .slice(-nbQ2)
        .sort(compareNombres) // 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30
      typeQuestionsDisponibles = typeQuestionsDisponiblesNiv1.concat(
        typeQuestionsDisponiblesNiv2,
      )
      if (typeQuestionsDisponibles.includes(26) && choice([true, false])) {
        // Si Q26 choisie, alors on insère (ou pas) Q27 à sa suite
        if (
          typeQuestionsDisponibles.indexOf(26) !==
          typeQuestionsDisponibles.length - 1
        )
          typeQuestionsDisponibles.fill(
            27,
            typeQuestionsDisponibles.indexOf(26) + 1,
            typeQuestionsDisponibles.indexOf(26) + 2,
          )
        else {
          typeQuestionsDisponibles.fill(
            27,
            typeQuestionsDisponibles.length - 1,
            typeQuestionsDisponibles.length,
          )
          typeQuestionsDisponibles.fill(
            26,
            typeQuestionsDisponibles.length - 2,
            typeQuestionsDisponibles.length - 1,
          )
        }
      }
    }
    const xA26 = randint(2, 6)
    const yA26 = randint(2, 4)
    const yB26 = randint(0, 1)
    const A26 = point(xA26, yA26)
    const B26 = point(0, yB26)
    const x0 = randint(-6, -4)
    const y0 = randint(3, 5)
    const x1 = randint(-2, 1)
    const y1 = y0 - randint(5, 8)
    const x2 = randint(3, 4)
    const y2 = y1 + randint(2, 7)
    const x3 = randint(5, 6)
    const y3 = y2 - randint(1, 4)
    for (let i = 0, index = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let a = 0
      let b = 0
      let c = 0
      let d = 0
      let n = 0
      let m = 0
      let k = 1
      let reponse: any = 0
      let texte = ''
      let texteCorr = ''
      let nbChamps = 1
      let choix = 'a'
      switch (typeQuestionsDisponibles[i]) {
        case 1:
          a = randint(3, 9)
          b = randint(4, 9) / 10
          reponse = a * b
          texte = `$${a} \\times ${texNombre(b, 1)}$ `
          texteCorr = `$${a} \\times ${texNombre(b, 1)}=${miseEnEvidence(texNombre(reponse, 1))}$`
          handleAnswers(this, index, { reponse: { value: reponse.toFixed(1) } })
          if (this.interactif) {
            texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
          }
          this.canEnonce = `$${a} \\times ${texNombre(b, 1)}$`
          this.canReponseACompleter = ''
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1

          break
        case 2:
          c = choice([10, 100])
          if (c === 10) {
            b = randint(1, 9)
          } else {
            b = randint(21, 59, [30, 40, 50])
          }
          d = b / c
          reponse = 1 - d

          texte = `Écriture décimale de $1-\\dfrac{${b}}{${c}}$`
          texteCorr = `$1-\\dfrac{${b}}{${c}}=1-${texNombre(b / c, 2)}=${miseEnEvidence(texNombre(reponse, 2))}$`
          this.canEnonce = texte
          this.canReponseACompleter = ''

          handleAnswers(this, index, { reponse: { value: reponse.toFixed(2) } })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }

          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 3:
          {
            const couplenm = choice([
              [2, 3],
              [3, 4],
              [2, 5],
              [3, 5],
              [4, 5],
              [5, 6],
              [2, 7],
              [3, 7],
              [4, 7],
              [5, 7],
              [6, 7],
              [3, 8],
              [5, 8],
              [7, 8],
              [2, 9],
              [4, 9],
              [5, 9],
              [7, 9],
              [8, 9],
              [3, 10],
              [7, 10],
              [9, 10],
            ]) // n et m sont premiers entre eux
            n = couplenm[0]
            m = couplenm[1] * choice([-1, 1])
            const f = choice(['a', 'b', 'y', 'x'])
            handleAnswers(this, index, {
              reponse: { value: `${f}(${n}${ecritureAlgebrique(m)}${f})` },
            })
            if (choice([true, false])) {
              texte = ` Factoriser $${n}${f}${ecritureAlgebrique(m)}${f}^2$`
              texteCorr = `$${f}$ est un facteur commun aux deux termes : $${n}${f}$ et $${abs(m)}${f}^2$.<br>
          En effet :<br>
          $${n}${f}${ecritureAlgebrique(m)}${f}^2=\\underbrace{${f}\\times ${n}}_{${n}${f}} ${m < 0 ? '-' : '+'}\\underbrace{${f}\\times ${ecritureParentheseSiNegatif(m)}${f}}_{${m}${f}^2}=${f}(${n}${ecritureAlgebrique(m)}${f})$`
            } else {
              texte = ` Factoriser $${m}${f}^2+${n}${f}$`
              texteCorr = `$${f}$ est un facteur commun aux deux termes : $${n}${f}$ et $${abs(m)}${f}^2$.<br>
          En effet :<br>
          $${m}${f}^2+${n}${f}=\\underbrace{${f}\\times ${ecritureParentheseSiNegatif(m)}${f}}_{${m}${f}^2}+\\underbrace{${f}\\times ${n}}_{${n}${f}} =${f}(${m}${f}+${n})$`
            }

            this.canEnonce = texte
            this.canReponseACompleter = ''
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '')
              //  handleAnswers(this, index, {reponse:{value: reponse}, { formatInteractif: 'calcul' })
            }
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 4:
          a = randint(2, 9)
          b = randint(11, 13, 12)
          k = randint(1, 5)
          c = choice([b * k, b * k - 1, b * k + 1])

          texte = `Vrai/Faux<br>
          $\\dfrac{${a}}{${b}}\\times ${c}$ est un entier.`
          if (c === b * k) {
            texteCorr = `${texteEnCouleurEtGras('Vrai')}<br>$\\dfrac{${a}}{${b}}\\times ${c}=\\dfrac{${a}\\times${b}\\times${k}}{${b}}=${a * k}$ qui est un entier.`
            reponse = 'V'
          } else {
            texteCorr = `${texteEnCouleurEtGras('Faux')}<br>$${c}$ n'est pas divisible par $${b}$, donc ce n'est pas un entier.`
            reponse = 'F'
          }

          handleAnswers(this, index, {
            reponse: { value: reponse, options: { texteSansCasse: true } },
          })
          if (this.interactif) {
            texte += '<br>Écrire V pour Vrai et F pour Faux.'
            texte += ajouteChampTexteMathLive(this, index, KeyboardType.vFON)
          }
          this.canEnonce = `$\\dfrac{${a}}{${b}}\\times ${c}$ est un entier.`
          this.canReponseACompleter = `Entoure la bonne réponse : <br>
         Vrai ${sp(4)}Faux `
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break

        case 5:
          a = randint(10, 15)
          b = randint(2, 6)
          c = randint(8, 10)
          reponse = a - b * c
          texte = `$${a} -${b}\\times ${c}$ `
          texteCorr = `$${a} -${b}\\times ${c}=${a}-${b * c}=${miseEnEvidence(reponse)}$`
          handleAnswers(this, index, { reponse: { value: reponse } })
          if (this.interactif) {
            texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
          }
          this.canEnonce = texte
          this.canReponseACompleter = ''
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1

          break
        case 6:
          {
            a = randint(6, 15) * 4
            b = randint(6, 15) * 3
            const m = choice(['trois quarts', 'deux tiers'])

            if (m === 'trois quarts') {
              reponse = Math.round((3 * a) / 4)
              texte = `Les  ${m} de $${a}$`
              texteCorr = `Prendre les ${m} d'un nombre revient à le diviser par $4$ puis multiplier le résulat par $3$.<br>
                Ainsi les ${m}  de $${a}$ sont : $(${a}\\div 4)\\times 3  =${miseEnEvidence(reponse)}$.`
            }
            if (m === 'deux tiers') {
              reponse = Math.round((2 * b) / 3)
              texte = `Les ${m} de $${b}$ `
              texteCorr = `Prendre les ${m} d'un nombre revient à le diviser par $3$ puis multiplier le résultat par $2$.<br>
                Ainsi les ${m} de $${b}$ sont : $(${b}\\div 3)\\times 2 =${miseEnEvidence(reponse)}$.`
            }

            handleAnswers(this, index, { reponse: { value: reponse } })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '')
            }
            this.canEnonce = texte
            this.canReponseACompleter = ''
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 7:
          {
            a = choice([2, 4, 6, 8])
            const prix1 = randint(11, 15) / 10
            k = randint(3, 4)
            const nbre = choice([(3 * a) / 2, a + 1, a - 1, a / 2, k * a])

            reponse = nbre * prix1
            texte = `$${a}$ m de ruban  coûtent $${texPrix(prix1 * a)}$ €, combien coûtent $${nbre}$ m de ruban ? `

            texteCorr = `$${a}$ m de ruban  coûtent $${texPrix(prix1 * a)}$ €, donc $1$ m coûte $${texPrix(prix1)}$ €. <br>
            Ainsi, $${nbre}$ m de ruban ${nbre === 1 ? 'coûte' : 'coûtent'} $${miseEnEvidence(texPrix(reponse))}$ €.`

            handleAnswers(this, index, {
              reponse: { value: reponse.toFixed(2) },
            })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '') + '€'
            }
            this.canEnonce = texte
            this.canReponseACompleter = '$\\ldots$ €'
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 8:
          {
            a = randint(11, 29, 20)
            const p = randint(2, 4) * 10
            reponse = (a * p) / 100
            texte = `$${p}\\,\\%$ de $${a}$`
            texteCorr = ` Prendre $${p}\\,\\%$  de $${a}$ revient à prendre $${p / 10}\\times 10\\,\\%$  de $${a}$.<br>
          Comme $10\\,\\%$  de $${a}$ vaut $${texNombre(a / 10, 1)}$ (pour prendre $10\\,\\%$  d'une quantité, on la divise par $10$), alors
          $${p}\\,\\%$ de $${a}=${p / 10}\\times ${texNombre(a / 10, 1)}=${miseEnEvidence(texNombre(reponse, 1))}$.
         `
            handleAnswers(this, index, {
              reponse: { value: reponse.toFixed(2) },
            })
            if (this.interactif) {
              texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
            }
            this.canEnonce = texte
            this.canReponseACompleter = ''
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 9:
          {
            const n1 = randint(2, 4)
            const n2 = randint(-3, 0)
            reponse = arrondi(10 ** n1 + 10 ** n2, 3)
            texte = `$10^{${n1}}+10^{${n2}}$`
            texteCorr = `$10^{${n1}}+10^{${n2}}=${texNombre(10 ** n1)} +${texNombre(10 ** n2, 3)}=${miseEnEvidence(texNombre(reponse, 3))}$`

            handleAnswers(this, index, {
              reponse: { value: reponse.toFixed(3) },
            })
            if (this.interactif) {
              texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
            }
            this.canEnonce = texte
            this.canReponseACompleter = ''
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 10:
          if (choice([true, false])) {
            b = randint(10, 15)
            a = randint(2, 9)

            texte = 'Soit le script python : <br>'
            if (context.isHtml) {
              texte += '$\\begin{array}{|l|}\n'
              texte += '\\hline\n'
              texte += '\\\n \\texttt{def calcul(a) :}  \\\n '
              texte += `\\\\\n${sp(9)} \\texttt{return a*a-${b}} \\\\\n`
              texte += '\\hline\n'
              texte += '\\end{array}\n$'
            } else {
              texte += '\\medskip'
              texte += '\\fbox{'
              texte += '\\parbox{0.5\\linewidth}{'
              texte += '\\setlength{\\parskip}{.5cm}'
              texte += ' \\texttt{def calcul(a) :}\\newline'
              texte += ` \\hspace*{7mm}\\texttt{return a*a-${b}}`
              texte += '}'
              texte += '}\\newline'
              texte += '\\medskip'
            }
            if (context.isHtml) {
              texte += `<br> Que renvoie  $\\texttt{calcul(${a})}$ ?`
            }
            reponse = a * a - b
            texteCorr = ` L'algorithme retourne $${a}\\times${a}-${b}=${miseEnEvidence(reponse)}$. `
            this.canEnonce = texte
            this.canReponseACompleter = `Que renvoie  $\\texttt{calcul(${a})}$ ?<br>
            $\\ldots$`
          } else {
            b = randint(2, 9)
            a = randint(2, 9)
            c = randint(2, 9)
            texte = 'Soit le script python : <br>'
            if (context.isHtml) {
              texte += '$\\begin{array}{|l|}\n'
              texte += '\\hline\n'
              texte += '\\\n \\texttt{def calcul(a,b) :}  \\\n '
              texte += `\\\\\n${sp(9)} \\texttt{return a*b-${c}} \\\\\n`
              texte += '\\hline\n'
              texte += '\\end{array}\n$'
            } else {
              texte += '\\medskip'
              texte += '\\fbox{'
              texte += '\\parbox{0.5\\linewidth}{'
              texte += '\\setlength{\\parskip}{.5cm}'
              texte += ' \\texttt{def calcul(a,b) :}\\newline'
              texte += ` \\hspace*{7mm}\\texttt{return a*b-${c}}`
              texte += '}'
              texte += '}\\newline'
              texte += '\\medskip'
            }
            if (context.isHtml) {
              texte += `<br> Que renvoie  $\\texttt{calcul(${a},${b})}$ ?`
            }
            reponse = a * b - c
            texteCorr = ` L'algorithme retourne $${a}\\times${b}-${c}=${miseEnEvidence(reponse)}$. `
            this.canEnonce = texte
            this.canReponseACompleter = `Que renvoie  $\\texttt{calcul(${a},${b})}$ ?<br>
            $\\ldots$`
          }

          handleAnswers(this, index, { reponse: { value: reponse } })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 11:
          a = randint(-5, 5, [0, -1, 1])
          reponse = randint(-9, 9, [-1, 0, 1])
          c = randint(-9, 9, [0])
          b = c - a * reponse
          texte = `Solution de l'équation  <br>$${a}x${ecritureAlgebrique(b)}=${c}$`
          texteCorr = `On procède par étapes successives :<br>
          On commence par isoler $${a}x$ dans le membre de gauche en ajoutant
          $${ecritureAlgebrique(-b)}$ dans chacun des membres, puis on divise
          par $${a}$ pour obtenir la solution : <br>
           $\\begin{aligned}
           ${a}x${ecritureAlgebrique(b)}&=${c}\\\\
          ${a}x&=${c}${ecritureAlgebrique(-b)}\\\\
          ${a}x&=${c - b}\\\\
          x&=\\dfrac{${c - b}}{${a}}\\\\
          x&=${reponse}
          \\end{aligned}$<br>
          La solution de l'équation est : $${miseEnEvidence(reponse)}$.
          `
          handleAnswers(this, index, { reponse: { value: reponse } })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          this.canEnonce = texte
          this.canReponseACompleter = ''
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break

        case 12:
          a = randint(21, 46, [30, 40]) * 2
          reponse = a / 2
          texte = `$${a} \\times 0,5$ `
          texteCorr = `Multiplier par $0,5$ revient à diviser par $2$. <br>
          Ainsi, $${a} \\times 0,5=${miseEnEvidence(texNombre(reponse, 0))}$.`
          handleAnswers(this, index, { reponse: { value: reponse } })
          if (this.interactif) {
            texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
          }
          this.canEnonce = `$${a} \\times 0,5$ `
          this.canReponseACompleter = ''
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break

        case 13:
          {
            a = randint(-12, -2)
            b = randint(3, 12)
            const A = point(0, 0, '1', 'below')
            const B = point(4, 0, 'M', 'below')
            const C = point(8, 0)
            const D = point(9, 0)
            const s = segment(C, D)
            s.styleExtremites = '->'
            const objets: NestedObjetMathalea2dArray = []
            objets.push(
              segmentAvecExtremites(A, B),
              segmentAvecExtremites(B, C),
              s,
              codageSegments('||', 'blue', A, B, B, C),
            )
            objets.push(
              texteParPosition(
                `${stringNombre(a)}`,
                0,
                -0.7,
                0,
                'black',
                context.isHtml ? 1.5 : 0.7,
              ),
            )
            objets.push(
              texteParPosition(
                'A',
                4,
                -0.7,
                0,
                'black',
                context.isHtml ? 1.5 : 0.7,
              ),
            )
            objets.push(
              texteParPosition(
                `${stringNombre(b)}`,
                8,
                -0.7,
                0,
                'black',
                context.isHtml ? 1.5 : 0.7,
              ),
            )
            texte = "Donner l'abscisse du point $A$.<br>"
            texte += mathalea2d(
              {
                xmin: -1,
                ymin: -1,
                xmax: 10,
                ymax: 1,
                pixelsParCm: 30,
                mainlevee: false,
                amplitude: 0.5,
                scale: 0.6,
                style: 'margin: auto',
              },
              objets,
            )
            texte += '<br>'
            texteCorr = `On calcule la moyenne de $${texNombre(a)}$ et $${texNombre(b)}$ :<br>
          $x_A=\\dfrac{${texNombre(a)}+${texNombre(b)}}{2}=
          \\dfrac{${texNombre(a + b)}}{2}=${miseEnEvidence(texNombre((a + b) / 2, 1))}$`

            reponse = (a + b) / 2
            handleAnswers(this, index, {
              reponse: { value: reponse.toFixed(1) },
            })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '')
            }
            this.canEnonce = texte // 'Compléter'
            this.canReponseACompleter = `Abscisse de $A$ : <br>
          $\\ldots$`
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 14:
          a = randint(2, 15, 10) * 4
          reponse = a / 4
          texte = `$0,25\\times ${a}$ `
          texteCorr = `Multiplier par $0,25$ revient à diviser par $4$. <br>
          Ainsi, $${a} \\times 0,5=${miseEnEvidence(texNombre(reponse, 0))}$.`
          handleAnswers(this, index, { reponse: { value: reponse } })
          if (this.interactif) {
            texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
          }
          this.canEnonce = texte
          this.canReponseACompleter = ''
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break

        case 15:
          {
            b = randint(6, 10)
            const bases = [2, 3, 5]
            d = randint(0, 2)
            a = bases[d]
            const c = [
              ['e double', 'a moitié'],
              ['e triple', 'e tiers'],
              ['e quintuple', 'e cinquième'],
            ]
            if (choice([true, false])) {
              texte = `L${c[d][0]} de  $${a}^{${b}}$ `
              handleAnswers(this, index, {
                reponse: { value: `${a}^{${b + 1}}` },
              })
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, index, '')
              }
              texteCorr = `L${c[d][0]} de $${a}^{${b}}$ se calcule  par
           : <br>
           $${a}\\times ${a}^{${b}}=${a}^{${b} + 1}=${miseEnEvidence(a)}^{${miseEnEvidence(b + 1)}}$`
            } else {
              texte = `L${c[d][1]} de $${a}^{${b}}$ `

              handleAnswers(this, index, {
                reponse: { value: `${a}^{${b - 1}}` },
              })
              if (this.interactif) {
                texte += ajouteChampTexteMathLive(this, index, '')
              }
              texteCorr = `L${c[d][1]} de $${a}^{${b}}$ se calcule  par
       : <br>
       $ ${a}^{${b}}\\div ${a}=\\dfrac{${a}^{${b}}}{${a}}=${a}^{${b} - 1}=${miseEnEvidence(a)}^{${miseEnEvidence(b - 1)}}$`
            }

            this.canEnonce = texte
            this.canReponseACompleter = ''
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 16:
          if (choice([true, false])) {
            a = (randint(1, 12) * 10 + randint(1, 9)) / 10
            reponse = a * 1000
            texte = ` $${texNombre(a, 1)}$ m$^3$`
            texteCorr = `Comme $1$ m$^3$= $1000$ L, $${texNombre(a, 1)}$ m$^3=${miseEnEvidence(texNombre(reponse, 0))}$ L.`
            handleAnswers(this, index, { reponse: { value: reponse } })
            if (this.interactif) {
              texte += '$=$' + ajouteChampTexteMathLive(this, index, '') + 'L'
            } else {
              texte += ' $=\\ldots$ L'
            }
            this.canEnonce = ` $${texNombre(a, 1)}$ m$^3$`
            this.canReponseACompleter = '$\\ldots\\ldots$ L'
          } else {
            a = (randint(1, 12) * 10 + randint(1, 9)) / 10
            reponse = a / 1000
            texte = ` $${texNombre(a, 1)}$ L`
            texteCorr = `Comme $1$ L = $0,001$ m$^3$, $${texNombre(a, 1)}$ L $=${miseEnEvidence(texNombre(reponse, 4))}$  m$^3$.`
            handleAnswers(this, index, {
              reponse: { value: reponse.toFixed(4) },
            })
            if (this.interactif) {
              texte +=
                ' $=$' + ajouteChampTexteMathLive(this, index, '') + ' m$^3$'
            } else {
              texte += ' $=\\ldots$ m$^3$'
            }
            this.canEnonce = ` $${texNombre(a, 1)}$ L`
            this.canReponseACompleter = '$\\ldots\\ldots$ m$^3$'
          }

          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 17:
          choix = choice(['a', 'b', 'c']) //
          if (choix === 'a') {
            a = randint(11, 39, [10, 20, 30]) / 1000
            const truc = a * 100
            reponse = `${texNombre(truc)}\\times 10^{-2}`
            texte = `Écriture  scientifique de $${texNombre(a, 3)}$`

            texteCorr = `La notation scientifique est de la forme $a\\times 10^{n}$ avec $1\\leqslant a <10$ et $n$ un entier relatif.<br>
            Ici : $${texNombre(a, 3)}=\\underbrace{${texNombre(truc, 3)}}_{1\\leqslant ${texNombre(truc, 3)} <10}\\times 10^{-2}$. `
          } else if (choix === 'b') {
            a = randint(111, 399, [200, 300]) / 100000
            const truc = a * 1000
            reponse = `${texNombre(truc)}\\times 10^{-3}`
            texte = `Écriture  scientifique de $${texNombre(a, 5)}$`

            texteCorr = `La notation scientifique est de la forme $a\\times 10^{n}$ avec $1\\leqslant a <10$ et $n$ un entier relatif.<br>
              Ici : $${texNombre(a, 5)}=\\underbrace{${miseEnEvidence(texNombre(truc, 5))}}_{1\\leqslant ${texNombre(truc, 5)} <10}\\times 10^{-3}$. `
          } else {
            a = randint(111, 399, [200, 300]) / 1000000
            const truc = a * 10000
            reponse = `${texNombre(truc)}\\times 10^{-4}`
            texte = `Écriture  scientifique de $${texNombre(a, 6)}$`

            texteCorr = `La notation scientifique est de la forme $a\\times 10^{n}$ avec $1\\leqslant a <10$ et $n$ un entier relatif.<br>
                Ici : $${texNombre(a, 6)}=\\underbrace{${texNombre(truc, 6)}}_{1\\leqslant ${texNombre(truc, 6)} <10}\\times 10^{-4}$. `
          }
          handleAnswers(this, index, {
            reponse: {
              value: reponse,
              options: { ecritureScientifique: true },
            },
          })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          this.canEnonce = texte
          this.canReponseACompleter = ''
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 18:
          a = randint(1, 10)

          if (choice([true, false])) {
            texte = `Développer  $(x+${a})^2$`
            texteCorr = `On utilise l'égalité remarquable $(a+b)^2=a^2+2ab+b^2$ avec $a=x$ et $b=${a}$.<br>
            $(x+${a})^2=x^2+2 \\times x \\times ${a} + ${a}^2=x^2+${2 * a}x+${a * a}$`
            reponse = `x^2+${2 * a}x+${a * a}`
          } else {
            texte = `Développer et réduire $(x-${a})(x+${a})$`
            texteCorr = `On utilise l'égalité remarquable $(a+b)(a-b)=a^2-b^2$ avec $a=x$ et $b=${a}$.<br>
          $(x-${a})(x+${a})=x^2- ${a}^2=x^2-${a * a}$`
            reponse = `x^2-${a * a}`
          }
          handleAnswers(this, index, {
            reponse: {
              value: reponse,
              options: { expressionsForcementReduites: true },
            },
          })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          this.canEnonce = texte
          this.canReponseACompleter = ''
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1

          break
        case 19:
          a = randint(3, 9) * 10
          b = choice([10, 20, 30, 40])
          d = b / 100
          reponse = a - a * d

          texte = `Un jeu vidéo coûte  $${a}$ €. Son prix baisse de $${b}$ $\\%$.<br>
          Quel est son nouveau prix ?
          `
          texteCorr = ` $${b}$ $\\%$ de $${a}=${texNombre(d, 1)}\\times ${a}= ${texNombre(a * d, 0)}$.<br>
          Le prix du jeu viéo après la réduction est donc : $${a}-${texNombre(a * d, 0)}=${miseEnEvidence(texNombre(reponse, 0))}$ €. `

          handleAnswers(this, index, { reponse: { value: reponse.toFixed(0) } })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '') + '€'
          }
          this.canEnonce = texte
          this.canReponseACompleter = '$\\ldots$ €'
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break

        case 20:
          a = randint(2, 9)
          if (choice([true, false])) {
            reponse = a * 8

            texte = `On double les longueurs des côtés d'un cube de volume $${a}$ m$^3$.<br>
          Quel est le volume du cube agrandi ?
          `
            texteCorr = `Si les longueurs sont multipliées par $2$, le volume est multiplié par $2^3=8$.<br>
          Ainsi, le cube agrandit a un volume de $${miseEnEvidence(texNombre(reponse))}$ m$^3$. `
            this.canEnonce = texte
            this.canReponseACompleter = '$\\ldots$ m$^3$'
          } else {
            reponse = a * 4

            texte = `On double les longueurs des côtés d'un carré d'aire $${a}$ m$^2$.<br>
            Quelle est l'aire du carré agrandi ?
            `
            texteCorr = `Si les longueurs sont multipliées par $2$, l'aire  est multipliée par $2^2=4$.<br>
            Ainsi, le carré agrandit a une aire de $${miseEnEvidence(texNombre(reponse))}$ m$^2$. `
            this.canEnonce = texte
            this.canReponseACompleter = '$\\ldots$ m$^2$'
          }
          handleAnswers(this, index, { reponse: { value: reponse } })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '') + 'm$^2$'
          }

          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 21:
          if (choice([true, false])) {
            a = randint(1, 9) // longueur BE
            k = randint(2, 4)
            b = k * a // longueur DC
            c = a + 1 // longueur AE
            d = k * c // longueur AD
            const A = point(0, 0, 'A', 'below')
            const B = point(2, -0.4, 'B', 'below')
            const C = point(5, -1, 'C', 'below')
            const D = point(4, 2, 'D', 'above')
            const E = point(1.6, 0.8, 'E', 'above')
            const xmin = -1
            const ymin = -2
            const xmax = 6
            const ymax = 4.5
            const sCote1 = segment(
              point(A.x - 0.3, A.y + 0.5),
              point(E.x - 0.2, E.y + 0.5),
            )
            const sCote2 = segment(
              point(A.x - 0.8, A.y + 1.3),
              point(D.x - 0.8, D.y + 1.3),
            )
            sCote1.styleExtremites = '<->'
            sCote2.styleExtremites = '<->'
            const objets = []
            objets.push(
              texteParPosition(
                `${stringNombre(a)} `,
                milieu(B, E).x + 0.4,
                milieu(B, E).y,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                '?',
                milieu(A, E).x - 0.4,
                milieu(A, E).y + 0.7,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                `${stringNombre(b)} `,
                milieu(D, C).x + 0.5,
                milieu(D, C).y,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                `${stringNombre(d)} `,
                milieu(A, D).x - 1,
                milieu(A, D).y + 1.5,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              demiDroite(A, C),
              demiDroite(A, D),
              labelPoint(A, B, C, D, E),
              segment(A, D),
              segment(A, C),
              segment(B, E),
              segment(D, C),
              sCote1,
              sCote2,
            )
            reponse = c
            texte = '$(BE)//(DC)$.  Détermine la longueur $AE$.<br>'
            texte += mathalea2d(
              {
                xmin,
                ymin,
                xmax,
                ymax,
                pixelsParCm: 30,
                mainlevee: false,
                amplitude: 0.5,
                scale: 0.6,
                style: 'margin: auto',
              },
              objets,
            )
            texteCorr = `Le triangle $ADC$ est un agrandissement du triangle $ABE$. Le coefficient d'agrandissement est donné par : $\\dfrac{${b}}{${a}}=${texNombre(b / a)}$.<br>
            On obtient donc la longueur $AE$ en divisant par $${k}$ la longueur $AD$.<br>
            $AE=\\dfrac{${d}}{${k}}=${miseEnEvidence(c)}$.<br>`
            handleAnswers(this, index, { reponse: { value: reponse } })
            if (this.interactif) {
              texte += '<br>$AE=$'
              texte += ajouteChampTexteMathLive(this, index, '')
            }
            this.canEnonce =
              '$(BE)$ et $(DC)$ sont parallèles.<br>' +
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 30,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.6,
                  style: 'margin: auto',
                },
                objets,
              )
            this.canReponseACompleter = '$AE=\\ldots$'
          } else {
            a = randint(1, 4) // AB
            k = randint(2, 3) // coeff
            b = k * a // BE
            c = randint(b, 22) // DC
            d = k * c // AD
            const A = point(6, 0, 'A', 'below right')
            const D = point(0.46, 2.92, 'D', 'above left')
            const E = point(4, 1, 'E', 'below')
            const B = point(6.22, 2, 'B', 'above right')
            const C = point(0, -1, 'C', 'left')
            const xmin = -1
            const ymin = -1.5
            const xmax = 7.5
            const ymax = 4
            const objets = []
            objets.push(
              texteParPosition(
                `${a}`,
                milieu(A, B).x + 0.3,
                milieu(A, B).y - 0.2,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                '?',
                milieu(C, E).x,
                milieu(C, E).y - 0.5,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                `${b}`,
                milieu(B, E).x,
                milieu(B, E).y + 0.2,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                `${c}`,
                milieu(D, C).x - 0.3,
                milieu(C, B).y + 0.5,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              labelPoint(A, B, C, D, E),
              droite(B, C),
              droite(D, A),
              droite(C, D),
              droite(A, B),
            )
            reponse = k * c
            texte = `$(AB)//(CD)$. Détermine la longueur $CE$.<br><br>
          `
            texte += mathalea2d(
              {
                xmin,
                ymin,
                xmax,
                ymax,
                pixelsParCm: 25,
                mainlevee: false,
                amplitude: 0.5,
                scale: 0.6,
                style: 'margin: auto',
              },
              objets,
            )
            texteCorr = `Le triangle $ECD$ est un agrandissement du triangle $EAB$. La longueur $BE$ est $${k}$ fois plus grande que la longueur $AB$.
          On en déduit que la longueur $EC$ est $${k}$ fois plus grande que la longueur $CD$.<br>
          Ainsi, $CE=${k}\\times ${c}=${miseEnEvidence(reponse)}$.`
            handleAnswers(this, index, { reponse: { value: reponse } })
            if (this.interactif) {
              texte += '<br>$CE=$'
              texte += ajouteChampTexteMathLive(this, index, '')
            }
            this.canEnonce =
              '$(AB)$ et $(DC)$ sont parallèles.<br>' +
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 25,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.6,
                  style: 'margin: auto',
                },
                objets,
              )
            this.canReponseACompleter = '$CE=\\ldots$'
          }
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 22:
          if (choice([true, false])) {
            a = randint(1, 4) * -1
            b = randint(1, 4)
            c = randint(-99, -41, [-80, -70, -6, -50, -90]) / 10
            d = c + randint(2, 4)
            const e = randint(-8, -1)
            const N = choice(['a', 'b', 'c', 'd']) //,
            if (N === 'a') {
              texte = `Plus petit entier de l'intervalle $\\bigg]${a}  ${sp(1)} ; ${sp(1)} ${b}\\bigg[$ `
              texteCorr = `C'est le plus petit entier strictement supérieur à  $${a}$ : il s'agit de $${miseEnEvidence(a + 1)}$.`
              reponse = a + 1
            } else if (N === 'b') {
              texte = `Plus petit entier de l'intervalle $\\bigg]${texNombre(c, 1)}  ${sp(1)} ; ${sp(1)} ${b}\\bigg[$ `
              texteCorr = `C'est le plus petit entier strictement supérieur à  $${texNombre(c, 1)}$ : il s'agit de $${miseEnEvidence(Math.trunc(c))}$.`
              reponse = Math.trunc(c)
            } else if (N === 'c') {
              texte = `Plus grand entier de l'intervalle $\\bigg]${texNombre(c, 1)}  ${sp(1)} ; ${sp(1)} ${texNombre(d, 1)}\\bigg[$ `
              texteCorr = `C'est le plus grand entier strictement inférieur à  $${texNombre(d, 1)}$ : il s'agit de $${miseEnEvidence(Math.trunc(d) - 1)}$.`
              reponse = Math.trunc(d) - 1
            } else {
              texte = `Plus grand entier de l'intervalle $\\bigg]${texNombre(e - 4, 1)}  ${sp(1)} ; ${sp(1)} ${texNombre(e, 1)}\\bigg[$ `
              texteCorr = `C'est le plus grand entier strictement inférieur à  $${texNombre(e, 1)}$ : il s'agit de $${miseEnEvidence(e - 1)}$.`
              reponse = e - 1
            }
          } else {
            a = randint(3, 7)
            k = randint(2, 7)

            texte = `Plus grand entier de l'intervalle $\\bigg]1  ${sp(1)} ; ${sp(1)} \\dfrac{${k * a + 1}}{${a}}\\bigg[$ `
            texteCorr = `C'est le plus grand entier strictement inférieur à  $\\dfrac{${k * a + 1}}{${a}}$ : il s'agit de $${miseEnEvidence(k)}$.`
            reponse = k
          }

          handleAnswers(this, index, { reponse: { value: reponse } })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          this.canEnonce = texte
          this.canReponseACompleter = ''
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break

        case 23:
          a = randint(1, 9)

          b = a / 10
          reponse = a * 6

          texte = `$${texNombre(b, 1)}\\text{ h}$`
          texteCorr = ` $${texNombre(b)}\\text{ h }=${texNombre(b)} \\times 60 \\text{ min } =${miseEnEvidence(texNombre(reponse, 0))}\\text{ min}$. `

          handleAnswers(this, index, { reponse: { value: reponse } })
          if (this.interactif) {
            texte += '$=$' + ajouteChampTexteMathLive(this, index, '') + 'min'
          } else {
            texte += '$=\\ldots$ min'
          }
          this.canEnonce = `$${texNombre(b, 1)}$ h`
          this.canReponseACompleter = '$\\ldots$ min'
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 24:
          choix = choice(['a', 'b', 'd', 'e']) //
          texte =
            'Quelle est la longueur de la ligne brisée en unité de longueur (u.l.) ? <br>'
          if (choix === 'a') {
            const a = grille(-2, -2, 7, 4, 'gray', 1, 1)
            b = choice([3, 4, 5, 6])
            const A = point(0, 2, 'A', 'below')
            const B = point(1, 2, 'B', 'below')
            const C = point(1, 0, 'C', 'above')
            const D = point(2, 0, 'D', 'above')
            const E = point(2, 2, 'C', 'above')
            const F = point(3, 2, 'D', 'above')
            const G = point(0, 4, 'C', 'above')
            const H = point(b, 4, 'D', 'above')
            const s1 = segmentAvecExtremites(G, H)
            s1.epaisseur = 2
            const s2 = segment(A, B)
            s2.epaisseur = 2
            const s3 = segment(C, B)
            s3.epaisseur = 2
            const s4 = segment(C, D)
            s4.epaisseur = 2
            const s5 = segment(D, E)
            s5.epaisseur = 2
            const s6 = segment(E, F)
            s6.epaisseur = 2
            const xmin = -1
            const ymin = -2
            const xmax = 7
            const ymax = 5
            const objets = []
            objets.push(
              texteParPosition(
                '1 u.l.',
                milieu(G, H).x,
                milieu(G, H).y + 0.7,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              a,
              s1,
              s2,
              s3,
              s4,
              s5,
              s6,
            )
            reponse = new FractionEtendue(7, b)
            texte +=
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 20,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.5,
                  style: 'margin: auto',
                },
                objets,
              ) + '<br>'
            texteCorr = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $7$ carreaux, soit $\\dfrac{${miseEnEvidence(7)}}{${miseEnEvidence(b)}}$ u.l. `
          } else if (choix === 'b') {
            const a = grille(-2, -1, 7, 4, 'gray', 1, 1)
            b = choice([3, 4, 5, 6])
            const A = point(0, 2, 'A', 'below')
            const B = point(1, 2, 'B', 'below')
            const C = point(1, 0, 'C', 'above')
            const D = point(4, 0, 'D', 'above')
            const E = point(4, 1, 'C', 'above')
            const G = point(0, 4, 'C', 'above')
            const H = point(b, 4, 'D', 'above')
            const s1 = segmentAvecExtremites(G, H)
            s1.epaisseur = 2
            const s2 = segment(A, B)
            s2.epaisseur = 2
            const s3 = segment(C, B)
            s3.epaisseur = 2
            const s4 = segment(C, D)
            s4.epaisseur = 2
            const s5 = segment(D, E)
            s5.epaisseur = 2

            const xmin = -1
            const ymin = -1
            const xmax = 7
            const ymax = 5
            const objets = []
            objets.push(
              texteParPosition(
                '1 u.l.',
                milieu(G, H).x,
                milieu(G, H).y + 0.7,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              a,
              s1,
              s2,
              s3,
              s4,
              s5,
            )
            reponse = new FractionEtendue(7, b)
            texte +=
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 20,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.5,
                  style: 'margin: auto',
                },
                objets,
              ) + '<br>'
            texteCorr = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $7$ carreaux, soit $\\dfrac{${miseEnEvidence(7)}}{${miseEnEvidence(b)}}$ u.l. `
          } else if (choix === 'c') {
            const a = grille(-2, -1, 7, 4, 'gray', 1, 1)
            b = choice([3, 4, 5, 6])
            const A = point(0, 2, 'A', 'below')
            const B = point(1, 2, 'B', 'below')
            const C = point(1, 0, 'C', 'above')
            const D = point(3, 0, 'D', 'above')
            const E = point(3, 2, 'C', 'above')
            const G = point(0, 4, 'C', 'above')
            const H = point(b, 4, 'D', 'above')
            const s1 = segmentAvecExtremites(G, H)
            s1.epaisseur = 2
            const s2 = segment(A, B)
            s2.epaisseur = 2
            const s3 = segment(C, B)
            s3.epaisseur = 2
            const s4 = segment(C, D)
            s4.epaisseur = 2
            const s5 = segment(D, E)
            s5.epaisseur = 2

            const xmin = -1
            const ymin = -1
            const xmax = 7
            const ymax = 5
            const objets = []
            objets.push(
              texteParPosition(
                '1 u.l.',
                milieu(G, H).x,
                milieu(G, H).y + 0.7,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              a,
              s1,
              s2,
              s3,
              s4,
              s5,
            )
            reponse = new FractionEtendue(7, b)
            texte +=
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 20,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.5,
                  style: 'margin: auto',
                },
                objets,
              ) + '<br>'
            texteCorr = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $7$ carreaux, soit $\\dfrac{${miseEnEvidence(7)}}{${miseEnEvidence(b)}}$ u.l. `
          } else if (choix === 'd') {
            const a = grille(-2, -1, 7, 4, 'gray', 1, 1)
            b = choice([3, 4, 6])
            const A = point(0, 2, 'A', 'below')
            const B = point(1, 2, 'B', 'below')
            const C = point(1, 1, 'C', 'above')
            const D = point(3, 1, 'D', 'above')
            const E = point(3, 2, 'C', 'above')
            const G = point(0, 4, 'C', 'above')
            const H = point(b, 4, 'D', 'above')
            const s1 = segmentAvecExtremites(G, H)
            s1.epaisseur = 2
            const s2 = segment(A, B)
            s2.epaisseur = 2
            const s3 = segment(C, B)
            s3.epaisseur = 2
            const s4 = segment(C, D)
            s4.epaisseur = 2
            const s5 = segment(D, E)
            s5.epaisseur = 2

            const xmin = -1
            const ymin = -1
            const xmax = 7
            const ymax = 5
            const objets = []
            objets.push(
              texteParPosition(
                '1 u.l.',
                milieu(G, H).x,
                milieu(G, H).y + 0.7,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              a,
              s1,
              s2,
              s3,
              s4,
              s5,
            )
            reponse = new FractionEtendue(5, b)
            texte +=
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 20,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.5,
                  style: 'margin: auto',
                },
                objets,
              ) + '<br>'
            texteCorr = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $5$ carreaux, soit $\\dfrac{${miseEnEvidence(5)}}{${miseEnEvidence(b)}}$ u.l. `
          } else {
            const a = grille(-2, -1, 7, 4, 'gray', 1, 1)
            b = choice([3, 4, 6])
            const A = point(0, 2, 'A', 'below')
            const B = point(1, 2, 'B', 'below')
            const C = point(2, 2, 'C', 'above')
            const D = point(2, 1, 'D', 'above')
            const E = point(4, 1, 'C', 'above')
            const G = point(0, 4, 'C', 'above')
            const H = point(b, 4, 'D', 'above')
            const s1 = segmentAvecExtremites(G, H)
            s1.epaisseur = 2
            const s2 = segment(A, B)
            s2.epaisseur = 2
            const s3 = segment(C, B)
            s3.epaisseur = 2
            const s4 = segment(C, D)
            s4.epaisseur = 2
            const s5 = segment(D, E)
            s5.epaisseur = 2

            const xmin = -1
            const ymin = -1
            const xmax = 7
            const ymax = 5
            const objets = []
            objets.push(
              texteParPosition(
                '1 u.l.',
                milieu(G, H).x,
                milieu(G, H).y + 0.7,
                0,
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              a,
              s1,
              s2,
              s3,
              s4,
              s5,
            )
            reponse = new FractionEtendue(5, b)
            texte +=
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 20,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.5,
                  style: 'margin: auto',
                },
                objets,
              ) + '<br>'
            texteCorr = `Une unité correspond à $${b}$ carreaux, la ligne brisée mesure $5$ carreaux, soit $\\dfrac{${miseEnEvidence(5)}}{${miseEnEvidence(b)}}$ u.l. `
          }
          this.canEnonce = texte
          this.canReponseACompleter = '$\\ldots$ u.l.'
          handleAnswers(this, index, {
            reponse: {
              value: reponse.texFraction,
              options: { fractionEgale: true },
            },
          })
          if (this.interactif) {
            texte += '<br>' + ajouteChampTexteMathLive(this, index, '') + 'u.l.'
          }

          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 25:
          a = randint(5, 10)
          b = randint(1, 8) * 3
          reponse = (a * b) / 3
          texte = `Volume d'une pyramide dont la base a une aire de $${a}$ cm$^2$ et de hauteur $${b}$ cm`

          texteCorr = ` Le volume d'une pyramide est $\\dfrac{1}{3}\\times \\text{aire de la base} \\times \\text{hauteur}$.<br>
          Le volume de cette pyramide est donc : $\\dfrac{${a}\\times ${b}}{3}=${miseEnEvidence(texNombre(reponse, 0))}$ cm$^3$.`
          handleAnswers(this, index, { reponse: { value: reponse } })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '') + 'cm$^3$'
          }
          this.canEnonce = texte
          this.canReponseACompleter = '$\\ldots$ cm$^3$'
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 26:
          {
            const A0 = point(xA26, 0)
            const A1 = point(0, yA26)
            const s26 = segment(A26, A0)
            const s26B = segment(A26, A1)
            s26.epaisseur = 1.5
            s26.pointilles = 5
            s26B.epaisseur = 1.5
            s26B.pointilles = 5
            const o = texteParPosition('O', -0.3, -0.3, 0, 'black', 1)

            const m = new FractionEtendue(yB26 - yA26, -xA26)

            const lA = texteParPosition('A', xA26, yA26 + 0.5, 0, 'black', 1.5)
            const traceA = tracePoint(A26, 'black') // Variable qui trace les points avec une croix
            const d = droite(A26, B26, '', 'blue')
            d.epaisseur = 2
            traceA.taille = 3
            traceA.epaisseur = 2
            const xmin = -2
            const ymin = -1
            const xmax = 8
            const ymax = 5

            const r = repere({
              xMin: xmin,
              xMax: xmax,
              xUnite: 1,
              yMin: ymin,
              yMax: ymax,
              grille: false,
              yUnite: 1,
              thickHauteur: 0,
              axeXStyle: '->',
              axeYStyle: '->',
              xLabelListe: [xA26],
              yLabelListe: yB26 === 0 ? [yA26] : [yA26, 1],
            })

            const fig = mathalea2d(
              {
                xmin,
                xmax,
                ymin,
                ymax: ymax + 0.25,
                pixelsParCm: 30,
                scale: 0.75,
                style: 'margin: auto',
              },
              d,
              r,
              o,
              lA,
              traceA,
              s26,
              s26B,
            )

            texte = 'Donner le coefficient directeur $m$ de la droite.<br>'
            texte += `${fig}`
            texteCorr = `En partant de l'ordonnée à l'origine de la droite pour aller jusqu'au point $A$, on se décale de $${xA26}$ unités vers la droite et on monte de $${yA26 - yB26}$ unités vers le haut. <br>
            Ainsi, le coefficient directeur de la droite est $\\dfrac{${yA26 - yB26}}{${xA26}}${m.texSimplificationAvecEtapes()}$.`

            reponse = m
            handleAnswers(this, index, {
              reponse: { value: reponse, options: { fractionEgale: true } },
            })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '')
            }
            this.canEnonce = mathalea2d(
              {
                xmin,
                xmax,
                ymin,
                ymax: ymax + 0.25,
                pixelsParCm: 30,
                scale: 0.75,
                style: 'margin: auto',
              },
              d,
              r,
              o,
              lA,
              s26,
              s26B,
              traceA,
            )
            this.canReponseACompleter =
              'Quel est le coefficient directeur de cette droite (d) ?<br>$\\ldots$'
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 27:
          a = xA26 * 2
          b = 2 * (yA26 - yB26) + randint(0, 1)
          reponse = 'V'
          texte = `Vrai/Faux<br>
          Sur le graphique de la question précédente, $M(${a};${b})$ est un point de la droite.`

          if (yB26 === 0) {
            if (b === 2 * (yA26 - yB26)) {
              texteCorr = `${texteEnCouleurEtGras('Vrai')}<br>La droite passe par l'origine du repère, elle traduit donc une situation de proportionnalité.<br>
          L'abscisse du point $M$ est deux fois plus grande que celle du point $A$. Son ordonnée est aussi deux plus grande que celle du point $A$,
          donc le point $M$ est bien sur la droite.`
              reponse = 'V'
            } else {
              texteCorr = `${texteEnCouleurEtGras('Faux')}<br>La droite passe par l'origine du repère, elle traduit donc une situation de proportionnalité.<br>
        L'abscisse du point $M$ est deux fois plus grande que celle du point $A$. Son ordonnée n'est pas  deux plus grande que celle du point $A$,
        donc le point $M$ n'est pas sur la droite.`
              reponse = 'F'
            }
          } else {
            if (b === 2 * (yA26 - yB26) + yB26) {
              texteCorr = `${texteEnCouleurEtGras('Vrai')}<br>Le point $A$ a pour abscisse $${xA26}$. En se décalant de $${xA26}$ unités sur la droite, la droite monte de $${yA26 - yB26}$ unités.<br>
            Ainsi l'ordonnée du point de la droite d'abscisse $${2 * xA26}$ est $${2 * (yA26 - yB26) + yB26}$. Donc le point $M$ est sur la droite.`
              reponse = 'V'
            } else {
              texteCorr = `${texteEnCouleurEtGras('Faux')}<br>
           En se décalant de $${xA26}$ unités sur la droite, la droite monte de $${yA26 - yB26}$ unités.<br>
           Le point $A$ a pour abscisse $${xA26}$. En partant de ce point, en se décalant de $${xA26}$ unités, il faut monter de $${yA26 - yB26}$ unités pour obtenir un nouveau point de la droite.<br>
            Ainsi l'ordonnée du point de la droite d'abscisse $${2 * xA26}$ est $${2 * (yA26 - yB26) + yB26}$. Donc le point $M$ n'est pas sur la droite.`
              reponse = 'F'
            }
          }
          handleAnswers(this, index, {
            reponse: { value: reponse, options: { texteSansCasse: true } },
          })
          if (this.interactif) {
            texte += '<br>Écrire V pour Vrai et F pour Faux.<br>'
            texte += ajouteChampTexteMathLive(this, index, KeyboardType.vFON)
          }
          this.canEnonce = `Cette question utilise le graphique de la question précédente.<br>
           Le point $M$ a pour coordonnées $(${a};${b})$.`
          this.canReponseACompleter = `Complète avec $\\in$ ou $\\notin$.<br>
          $M \\ldots (d)$`
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          nbChamps = 1
          break
        case 28:
          {
            const A0 = point(x0, y0)
            const A1 = point(x1, y1)
            const A2 = point(x2, y2)
            const A3 = point(x3, y3)
            const listeB = choice([
              [x0, y0],
              [x1, y1],
              [x2, y2],
            ])
            reponse = listeB[1]
            const Tk = tracePoint(A0, A1, A2, A3)
            Tk.epaisseur = 2
            const o = texteParPosition('O', -0.3, -0.3, 0, 'black', 1)
            const r1 = repere({
              xMin: x0 - 1,
              yMin: Math.min(y1 - 1, y3 - 1),
              yMax: Math.max(y2 + 1, y0 + 1),
              xMax: 7,
              xUnite: 1,
              yUnite: 1,
              xThickDistance: 1,
              yThickDistance: 1,
              xLabelMin: x0,
              yLabelMin: y1 - 1,
              yLabelEcart: 0.6,
              grilleXDistance: 1,
              grilleYDistance: 1,
              grilleXMin: x0 - 1,
              grilleYMin: Math.min(y1 - 1, y3 - 1),
              grilleXMax: 7,
              grilleYMax: Math.max(y2 + 1, y0 + 1),
            })
            const gr = courbeInterpolee(
              [
                [x0, y0],
                [x1, y1],
                [x2, y2],
                [x3, y3],
              ],
              {
                color: 'blue',
                epaisseur: 2,
                repere: r1,
                xMin: x0 - 1,
                xMax: 6,
              },
            )
            const graphique = mathalea2d(
              {
                xmin: x0 - 1,
                xmax: 7,
                ymin: Math.min(y1 - 2, y3 - 2),
                ymax: Math.max(y2 + 1, y0 + 1),
                pixelsParCm: 30,
                scale: 0.55,
                style: 'margin: auto',
              },
              r1,
              o,
              gr,
              Tk,
            )
            texte = "Voici la courbe  d'une fonction $f$.<br>"
            texte += `${graphique}<br>`

            texteCorr = `L'ordonnée du point $B$ est $${miseEnEvidence(listeB[1])}$.`

            handleAnswers(this, index, { reponse: { value: reponse } })
            if (this.interactif) {
              texte += '$B$ est un point de la courbe. Compléter : <br>'
              texte +=
                `$B(${listeB[0]}\\,;$` +
                ajouteChampTexteMathLive(this, index, ' ') +
                '$)$'
            } else {
              texte += `$B$ est un point de la courbe. <br>
          Compléter : $B(${listeB[0]}\\,;\\, \\ldots)$`
            }
            this.canEnonce = `  Voici la courbe d'une fonction $f$.<br>
          ${graphique}`
            this.canReponseACompleter = `$B$ est un point de la courbe.<br>
          Compléter : $B( ${listeB[0]}\\,;\\, \\ldots)$`
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 29:
          {
            a = choice([-1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3, 3.5])
            const o = texteParPosition('O', -0.3, -0.3, 0, 'black', 1)
            const r1 = repere({
              xMin: -6,
              yMin: -4,
              yMax: 4,
              xMax: 7,
              xUnite: 1,
              yUnite: 1,
              xThickDistance: 1,
              yThickDistance: 1,
              yLabelEcart: 0.6,
              grilleXDistance: 1,
              grilleYDistance: 1,
              grilleXMin: -6,
              grilleYMin: -3,
              grilleXMax: 7,
              grilleYMax: 4,
              xLabelListe: [1],
              yLabelListe: [1],
              thickHauteur: 0,
            })
            const gr = courbeInterpolee(
              [
                [-5, 0],
                [-3, 3],
                [0, 2],
                [2, 3],
                [6, -2],
              ],
              {
                color: 'blue',
                epaisseur: 2,
                repere: r1,
                xMin: -6,
                xMax: 7,
              },
            )
            const graphique = mathalea2d(
              {
                xmin: x0 - 1,
                xmax: 7,
                ymin: -3,
                ymax: 4,
                pixelsParCm: 30,
                scale: 0.55,
                style: 'margin: auto',
              },
              r1,
              o,
              gr,
            )
            texte = "  Voici la courbe  d'une fonction $f$.<br>"
            texte += `${graphique}<br>`
            texte += `Quel est le nombre d'antécédents de $${texNombre(a, 1)}$ par la fonction $f$ ?`
            if (a < 0) {
              texteCorr = `La droite horizontale d'équation $y=${texNombre(a, 1)}$  coupe la courbe en un point. <br>
          $${a}$ a donc $${miseEnEvidence(1)}$ antécédent par $f$.`
              reponse = 1
            }
            if (a > 0 && a < 2) {
              texteCorr = `La droite horizontale d'équation $y=${texNombre(a, 1)}$  coupe la courbe en deux points. <br>
          $${a}$ a donc $${miseEnEvidence(2)}$ antécédents par $f$.`
              reponse = 2
            }
            if (a === 3) {
              texteCorr = `La droite horizontale d'équation $y=${texNombre(a, 1)}$  coupe la courbe en deux points. <br>
          $${a}$ a donc $${miseEnEvidence(2)}$ antécédents par $f$.`
              reponse = 2
            }
            if (a === 2) {
              texteCorr = `La droite horizontale d'équation $y=${texNombre(a, 1)}$  coupe la courbe en trois points. <br>
          $${a}$ a donc $${miseEnEvidence(3)}$ antécédents par $f$.`
              reponse = 3
            }
            if (a > 2 && a < 3) {
              texteCorr = `La droite horizontale d'équation $y=${texNombre(a, 1)}$  coupe la courbe en quatre points. <br>
          $${a}$ a donc $${miseEnEvidence(4)}$ antécédents par $f$.`
              reponse = 4
            }
            if (a > 3) {
              texteCorr = `La droite horizontale d'équation $y=${texNombre(a, 1)}$ ne coupe pas la courbe. <br>
          $${a}$ a donc $${miseEnEvidence(0)}$ antécédent par $f$.`
              reponse = 0
            }
            handleAnswers(this, index, { reponse: { value: reponse } })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, ' ')
            }
            this.canEnonce = texte
            this.canReponseACompleter = ''
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break

        case 30:
          {
            a = randint(3, 8)
            b = randint(-15, -10)
            c = randint(10, 20)
            d = randint(5, 10)
            const e = choice([30, 35, 40, 45, 50, 55]) - a - b - c - d

            const moy = (a + b + c + d + e) / 5
            reponse = c
            texte = `La moyenne des cinq nombres suivants est $${moy}$.<br>
          $${a}${sp(2)};${sp(2)}${b}${sp(2)};${sp(2)}n${sp(2)};${sp(2)}${d}${sp(2)};${sp(2)}${e}$`
            texteCorr = `Puisque la moyenne de ces cinq nombres est $${moy}$, la somme de ces cinq nombres est $5\\times ${moy}=${5 * moy}$.<br>
          La valeur de $n$ est donnée par :  $${5 * moy}-${a}-(${b})-${c}-${d}=${miseEnEvidence(reponse)}$.`

            handleAnswers(this, index, { reponse: { value: reponse } })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '')
            }
            this.canEnonce = texte
            this.canReponseACompleter = '$n=\\ldots$'
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
            nbChamps = 1
          }

          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
        index += nbChamps
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
