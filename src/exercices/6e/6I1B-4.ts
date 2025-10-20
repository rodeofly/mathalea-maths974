import { point } from '../../lib/2d/points'
import { polygone } from '../../lib/2d/polygones'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { latex2d } from '../../lib/2d/textes'
import { choice, shuffle } from '../../lib/outils/arrayOutils'
import { listeDesDiviseurs } from '../../lib/outils/primalite'
import { texNombre } from '../../lib/outils/texNombre'
import { addSheet, MySpreadsheetElement } from '../../lib/tableur/MySpreadSheet'
import { colorToLatexOrHTML, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'

import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Programmer des calculs sur tableur'
export const dateDePublication = '12/08/2025'

export const interactifReady = true
export const interactifType = 'custom'

/*
 * Programmer des calculs sur tableur : New programme de 6eme 2025
 * @author Mickael Guironnet
 * revisité par Jean-Claude Lhote (intoduction du custom élément sheet-element) et modification de la librairie utilisée.
 */

export const uuid = 'ae07c'

export const refs = {
  'fr-fr': ['6I1B-4'],
  'fr-ch': [],
}
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default class ExerciceTableur extends Exercice {
  destroyers: (() => void)[] = []
  listeSteps: Steps[] = []

  constructor() {
    super()
    this.nbQuestions = 2
    this.besoinFormulaireNumerique = [
      "Nombre d'opérations (entre 2 et 5 ou bien 1 si vous laissez le hasard décider)",
      5,
    ]
    this.besoinFormulaire2Texte = [
      "Type d'opérations",
      [
        'Nombres séparés par des tirets  :',
        '1 : Addition',
        '2 : Soustraction',
        '3 : Multiplication',
        '4 : Division',
        '5 : Mélange',
      ].join('\n'),
    ]
    this.sup = 3
    this.sup2 = 5
    this.listeSteps = []
  }

  destroy() {
    // MGu quan l'exercice est supprimé par svelte : bouton supprimé
    this.destroyers.forEach((destroy) => destroy())
    this.destroyers.length = 0
  }

  static readonly colors = {
    orange: '#e6b457',
    vert: '#7adb7a',
    jaune: '#e6e66a',
    bleu: '#8181e6',
    violet: '#f8a3f8',
    rouge: '#eca2a2',
  }

  static readonly styles = {
    style_id_rouge: {
      fs: 12,
      bg: ExerciceTableur.colors.rouge,
    },
    style_id_bleu: {
      fs: 12,
      bg: ExerciceTableur.colors.bleu,
    },
    style_id_orange: {
      fs: 12,
      bg: ExerciceTableur.colors.orange,
    },
    style_id_violet: {
      fs: 12,
      bg: ExerciceTableur.colors.violet,
    },
    style_id_vert: {
      fs: 12,
      bg: ExerciceTableur.colors.vert,
    },
    style_id_jaune: {
      fs: 12,
      bg: ExerciceTableur.colors.jaune,
    },
  }

  validateFormulas(
    q: number,
    userSheet: MySpreadsheetElement,
  ): { isOk: boolean; messages: string } {
    // 1. Récupère les données de l'utilisateur
    const userData = userSheet.getData()

    const testSheet = MySpreadsheetElement.create({
      data: userData,
      minDimensions: userSheet.getMinDimensions(),
      style: userSheet.getStyle(),
      columns: userSheet.getColumns(),
      interactif: false,
      id: 'testSheet',
    })
    testSheet.style.position = 'absolute'
    testSheet.style.left = '-9999px'
    document.body.appendChild(testSheet)

    const messages: string[][] = []
    for (let n = 0; n < 5; n++) {
      messages[n] = []
      const a1 = randint(1, 10)
      testSheet.setCellValue(0, 0, a1) // A1
      const resultats = [1, 2, 3].map((i) =>
        parseFloat(testSheet.getCellValue(i, 0)),
      )

      // compare les résultats
      for (let i = 1; i < 4; i++) {
        if (typeof resultats[i - 1] !== 'number' || isNaN(resultats[i - 1])) {
          messages[n].push(
            `La cellule ${String.fromCharCode(65 + i)}1 ne contient pas un nombre valide.<br>`,
          )
        }
      }
      for (let i = 1; i < 4; i++) {
        if (
          typeof testSheet.getCellFormula(i, 0) !== 'string' ||
          !testSheet.getCellFormula(i, 0).startsWith('=')
        ) {
          messages[n].push(
            `La cellule ${String.fromCharCode(65 + i)}1 ne contient pas une formule valide.<br>`,
          )
        }
      }
      let result = a1
      for (let i = 1; i < 4; i++) {
        const steps = this.listeSteps[q]
        result = evaluate(result, steps[i - 1].op, steps[i - 1].val)
        const computed = parseFloat(testSheet.getCellValue(i, 0))
        if (Math.abs(computed - result) > 1e-9) {
          messages[n].push(
            `Pour un nombre de départ égal à ${a1}, la cellule ${String.fromCharCode(65 + i)}1 devrait contenir ${texNombre(result, 2)} mais elle contient ${texNombre(computed, 2)}.<br>`,
          )
        }
      }
    }
    const maxMessages = messages.reduce(
      (max, arr) => (arr.length > max.length ? arr : max),
      [],
    )

    document.body.removeChild(testSheet)
    const feedback =
      maxMessages.length === 0
        ? '✅ Toutes les formules sont correctes !'
        : '❌ Des erreurs ont été détéctées.'
    return {
      isOk: maxMessages.length === 0,
      messages: maxMessages.join('') + feedback,
    }
  }

  checkSolution(event?: CustomEvent) {
    // Récupère le nom de l’event
    const eventName = event?.type
    const q = eventName?.match(/Q(\d+)/)?.[1]
    if (!q) {
      console.error('Question number not found in event name:', eventName)
      return
    }
    const id = eventName?.replace('check', 'sheet-') || ''
    const sheetElt = document.getElementById(id) as MySpreadsheetElement
    // Tu peux aussi récupérer le bouton via event.target ou event.detail
    // Exemple :
    // const bouton = event?.detail?.sheet?.querySelector('#runCode')

    if (sheetElt && sheetElt.isMounted()) {
      const { messages } = this.validateFormulas(Number(q), sheetElt)
      const messagesDiv = sheetElt.querySelector(
        '#message-faux',
      ) as HTMLDivElement
      if (messages && messagesDiv) {
        messagesDiv.style.color = 'green'
        messagesDiv.innerHTML = messages
      }
    }
  }

  nouvelleVersion(): void {
    // MGu quand l'exercice est modifié, on détruit les anciens listeners
    this.destroyers.forEach((destroy) => destroy())
    this.destroyers.length = 0

    const nbOperations =
      this.sup === 1 ? randint(2, 5) : Math.min(Math.max(2, this.sup), 5)

    const typesDeOperations = gestionnaireFormulaireTexte({
      saisie: this.sup2,
      min: 1,
      max: 4,
      melange: 5,
      defaut: 5,
      nbQuestions: nbOperations,
    })
    this.listeSteps = []
    const colorsArr = Object.entries(ExerciceTableur.colors)
    for (
      let q = 0, cpt = 0, texte, texteCorr: string;
      q < this.nbQuestions && cpt < 50;
      cpt++
    ) {
      const { steps } = programmeCalcul(typesDeOperations as number[])
      this.listeSteps[q] = steps
      const operStr = transformationsOper(steps)
      const cellDatas: any = {
        0: {
          0: { v: steps[0].oldn, s: 'style_id_orange', t: 2 },
        },
      }
      for (let i = 0; i < steps.length; i++) {
        cellDatas[0][i + 1] = {
          v: '',
          s: `style_id_${colorsArr[(i + 1) % colorsArr.length][0]}`,
        }
      }

      const data: (number | string)[][] = [[]]
      data[0][0] = cellDatas[0][0].v
      for (let i = 0; i < steps.length; i++) {
        data[0][i + 1] = cellDatas[0][i + 1].v
      }

      const rect: Record<string, { bg?: string; v?: string }> = {
        0: { v: steps[0].oldn.toString(), bg: colorsArr[0][1] },
      }
      for (let i = 0, k = 1; i < steps.length; i++, k += 2) {
        rect[`${k}`] = { v: operStr[i] }
        rect[`${k + 1}`] = { bg: colorsArr[(i + 1) % colorsArr.length][1] }
      }

      texte = 'On a créé le programme de calculs suivant :<br>'
      texte += createDigramm(Object.keys(rect).length, rect) + '<br>'

      texte += `On choisit un nombre dans la première case, ici ${steps[0].oldn} et on obtient un nombre à la fin de la chaîne.<br><br>      
      On veut programmer cette suite de calculs dans un tableur. <br>
      Par exemple, la cellule B1 doit contenir la formule du premier calcul.<br>
      Faire de même pour les autres cellules. <br>
      Attention, les formules doivent fonctionner même si le nombre de départ change (Cellule A1).<br>
      `
      // ${JSON.stringify({rowCount:4,columnCount:steps.length + 1,cellData:data,styles:ExerciceTableur.styles})}
      if (context.isHtml) {
        texte += addSheet({
          numeroExercice: this.numeroExercice ?? 0,
          question: q,
          data,
          minDimensions: [4, 4],
          style: {
            A1: `background-color:   ${ExerciceTableur.colors.orange}; font-weight: bold;`,
            B1: `background-color: ${ExerciceTableur.colors.vert};`,
            C1: `background-color: ${ExerciceTableur.colors.jaune};`,
            D1: `background-color: ${ExerciceTableur.colors.bleu};`,
          },
          columns: [{ width: 90 }, { width: 90 }, { width: 90 }, { width: 90 }],
          interactif: this.interactif,
        })
      } else {
        const options: {
          formule?: boolean
          formuleTexte?: string
          formuleCellule?: string
          firstColHeaderWidth?: string
        } = {}
        options.formule = true
        options.formuleTexte = '=?'
        options.formuleCellule = 'B1'

        texte += createTableurLatex(
          2,
          steps.length + 1,
          cellDatas,
          ExerciceTableur.styles,
          options,
        )
      }

      texteCorr = 'Voici les formules à saisir dans le tableur :<br>'
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        texteCorr += `$${step.oldn} ${operStr[i]} = ${step.result}$ devient en cellule ${alphabet[i + 1]}1 la formule suivante : "=${alphabet[i]}1${operStr[i].replace('\\times', '*').replace('\\div', '/')}"<br>`
      }

      const listener = () => {
        const sheets = Array.from(
          document.querySelectorAll('my-spreadsheet'),
        ) as MySpreadsheetElement[]
        for (const sheet of sheets) {
          const q = sheet.id.match(/Q(\d+)$/)?.[1]

          const eventName =
            q !== undefined && this.numeroExercice !== undefined
              ? `checkEx${this.numeroExercice}Q${q}`
              : undefined
          if (sheet && eventName) {
            const listener = (event: Event) => {
              this.checkSolution(event as CustomEvent)
            }
            sheet.addListener(eventName, listener)
          } else {
            console.error(
              `SheetElement not found or eventName invalid for question ${q} in exercice ${this.numeroExercice}`,
            )
          }
        }
        document.removeEventListener('exercicesAffiches', listener)
      }
      document.addEventListener('exercicesAffiches', listener, { once: true })

      /****************************************************/
      if (this.questionJamaisPosee(q, texte)) {
        this.listeQuestions[q] = texte
        this.listeCorrections[q] = texteCorr
        q++
      }
      listeQuestionsToContenu(this)
    }
  }

  correctionInteractive = (i: number) => {
    if (i === undefined) return ''
    if (this.answers === undefined) this.answers = {}
    let result = 'KO'
    const sheetElement = document.getElementById(
      `sheet-Ex${this.numeroExercice}Q${i}`,
    ) as MySpreadsheetElement
    if (!sheetElement) {
      console.error(`sheet-Ex${this.numeroExercice}Q${i} not found`)
      return result
    }
    if (sheetElement && sheetElement.isMounted()) {
      this.answers[`sheet-Ex${this.numeroExercice}Q${i}`] = JSON.stringify(
        sheetElement.getData(),
      )
      const spanResultat = document.querySelector(
        `#resultatCheckEx${this.numeroExercice}Q${i}`,
      )
      const divFeedback = document.querySelector<HTMLElement>(
        `#feedbackEx${this.numeroExercice}Q${i}`,
      )

      const { isOk, messages } = this.validateFormulas(i, sheetElement)
      if (messages.length > 0 && spanResultat && divFeedback) {
        divFeedback.innerHTML = messages
        if (!isOk) {
          if (spanResultat) spanResultat.innerHTML = '☹️'
        } else {
          if (spanResultat) spanResultat.innerHTML = '😊'
          result = 'OK'
        }
      }
    }
    return result
  }
}

function transformationsOper(
  steps: {
    oldn: number
    op: number
    val: number
    result: number
  }[],
) {
  function stepsToSymbols(
    steps: {
      oldn: number
      op: number
      val: number
      result: number
    }[],
  ) {
    const mapOps: Record<number, string> = {
      1: '+',
      2: '−', // tiret long pour la soustraction
      3: '\\times',
      4: '\\div',
    }
    return steps.map((step) => (mapOps[step.op] || '?') + step.val)
  }
  return stepsToSymbols(steps)
}

function evaluate(a: number, op: number, b: number) {
  if (op === 1) return a + b
  if (op === 2) return a - b
  if (op === 3) return a * b
  if (op === 4) return a / b
  return NaN
}

/**
 * Génère une suite d'opérations arithmétiques (+, −, ×, ÷) appliquées à un nombre de départ,
 * en s’assurant que chaque opération est valide et que le résultat reste dans des limites acceptables.
 *
 * La fonction mélange aléatoirement l’ordre des opérations et choisit les opérandes de façon à ce que
 * chaque étape soit faisable (par exemple : pas de résultats négatifs, division donnant un entier, etc.).
 * Elle essaie jusqu’à 20 fois de trouver une suite valide.
 *
 * @param operations - Un tableau de nombres représentant les opérations à effectuer :
 *   1 pour addition (+), 2 pour soustraction (−), 3 pour multiplication (×), 4 pour division (÷).
 *   Par défaut : [1, 2, 3, 4].
 *
 * @returns Un objet contenant :
 *   - `ops` : L’ordre final des opérations utilisées.
 *   - `steps` : Un tableau d’objets représentant chaque étape, avec :
 *       - `oldn` : Le nombre avant l’opération.
 *       - `op` : L’opération effectuée.
 *       - `val` : L’opérande utilisée.
 *       - `result` : Le résultat après l’opération.
 *   - `final` : Le résultat final après toutes les opérations, ou `null` si échec.
 * @example
 *
 * const resultat = programmeCalcul([1, 2, 3, 4]);
 *
 *
 * {
 *   ops: [3, 1, 4, 2], // ordre : × puis + puis ÷ puis −
 *   steps: [
 *     { oldn: 5, op: 3, val: 4, result: 20 }, // 5 × 4 = 20
 *     { oldn: 20, op: 1, val: 3, result: 23 }, // 20 + 3 = 23
 *     { oldn: 23, op: 4, val: 1, result: 23 }, // 23 ÷ 1 = 23
 *     { oldn: 23, op: 2, val: 5, result: 18 }  // 23 − 5 = 18
 *   ],
 *   final: 18
 * }
 */

type Step = {
  oldn: number
  op: number
  val: number
  result: number
}
type Steps = Step[]
type ProgrammeCalculResult = {
  ops: number[]
  steps: Steps
  final: number | null
}
function programmeCalcul(
  operations: number[] = [1, 2, 3, 4],
): ProgrammeCalculResult {
  let steps: {
    oldn: number
    op: number
    val: number
    result: number
  }[] = []
  let final = null
  let ops: number[] = operations

  let k = 0
  let success = false
  while (!success && k < 20) {
    ops = shuffle(ops) // ordre aléatoire des opérations
    let n = randint(5, 20) // nombre de départ
    steps = [] // les étapes de calcul
    success = true
    for (let ind = 0, tt = 0; ind < ops.length && tt < 4; ) {
      if (tt > 0) {
        // tt : le nombre de tentatives
        // on change l'ordre des opérations si ça bloque
        const firstPart = ops.slice(0, ind)
        const shuffledPart = shuffle(ops.slice(ind))
        ops = [...firstPart, ...shuffledPart]
      }
      const op = ops[ind]
      const oldn = n
      let val: number = 1
      const oldval: number = ind > 0 ? steps[ind - 1].val : 1
      if (op === 1) {
        // +
        if (50 - n < 2 || (50 - n === 2 && oldval === 2)) {
          tt++
          continue
        } else {
          val = randint(2, 50 - n, [oldval])
          n += val
          ind++
          tt = 0
        }
      } else if (op === 2) {
        // -
        if (n < 2 || (n === 2 && oldval === 2)) {
          tt++
          continue
        } else {
          val = randint(2, n, [oldval])
          n -= val
          ind++
          tt = 0
        }
      } else if (op === 3) {
        // ×
        const maxMult = n < 1 ? 5 : Math.floor(50 / n)
        if (maxMult < 2 || (maxMult === 2 && oldval === 2)) {
          tt++
          continue
        } else {
          val = randint(2, maxMult, [oldval])
          n *= val
          ind++
          tt = 0
        }
      } else if (op === 4) {
        // ÷
        const divs = listeDesDiviseurs(n).filter((d) => d > 1 && d < n)
        if (divs.length === 0 || (divs.length === 1 && divs[0] === oldval)) {
          tt++
          continue
        } else {
          val = choice<number>(divs, [oldval])
          n /= val
          ind++
          tt = 0
        }
      }

      // sécurité bornes
      if (n < 0 || n > 50 || !Number.isInteger(n)) {
        tt += 10 // on devrait jamais être ici! donc on sort
        continue
      }
      steps.push({ oldn, op, val, result: n })
    }
    if (steps.length !== ops.length) {
      success = false
    }
    if (success) final = n
    k++
  }

  return { ops, steps, final }
}

function createDigramm(
  nbre: number,
  rects: Record<string, { bg?: string; v?: string }>,
) {
  const longueur = 1.8
  const largeur = 1.5
  const gap = 0.8
  const objets = []
  for (let i = 0; i < nbre; i++) {
    const A = point(i * longueur + i * gap, 0)
    const B = point(A.x + longueur, 0)
    const C = point(B.x, largeur)
    const D = point(A.x, largeur)
    const rect = rects[i]
    const rectangle = polygone(A, B, C, D)
    if (rect && rect.bg) {
      rectangle.couleurDeRemplissage = colorToLatexOrHTML(rect.bg)
      rectangle.opaciteDeRemplissage = 1
    }
    objets.push(rectangle)
    if (rect && rect.v) {
      const tex = latex2d(`${rect.v}`, (A.x + B.x) / 2, (A.y + D.y) / 2, {
        color: 'red',
        backgroundColor: 'none',
        letterSize: context.isHtml ? 'small' : 'normalsize',
        orientation: 0,
        opacity: 1,
      })
      objets.push(tex)
    }
    if (i > 0) {
      const seg = segment(A.x - gap, largeur / 2, A.x, largeur / 2, '#f15929')
      seg.styleExtremites = '->'
      objets.push(seg)
    }
  }
  const xmin = -0.5
  const ymin = -0.5
  const xmax = +longueur * nbre + gap * (nbre - 1) + 0.5
  const ymax = largeur + 0.5

  return mathalea2d(
    {
      xmin,
      ymin,
      xmax,
      ymax,
      mainlevee: false,
      scale: context.isHtml ? 1 : 0.5,
      style: 'margin: auto',
      optionsTikz: ['baseline=(current bounding box.north)'],
    },
    objets,
  )
}

function createTableurLatex(
  rowNbr: number,
  colNbr: number,
  data: any,
  styles: any,
  options: {
    formule?: boolean
    formuleTexte?: string
    formuleCellule?: string
    firstColHeaderWidth?: string
  } = {},
) {
  let output = `\\begin{tabularx}{0.9\\linewidth}
  {|>{\\cellcolor{lightgray}}c|
  ${options.firstColHeaderWidth ? `>{\\centering \\arraybackslash}p{${options.firstColHeaderWidth}}|` : '>{\\centering \\arraybackslash}X|'}
  *{${colNbr - 1}}{>{\\centering \\arraybackslash}X|}}\\hline\n`

  if (options.formule) {
    output += `\\multicolumn{1}{|l}{${options.formuleCellule}}&\\multicolumn{1}{r|}{▼}&\\multicolumn{${colNbr - 1}}{l|}{${options.formuleTexte}}\\\\ \\hline\n`
  }
  // en-tête
  output += '\\rowcolor{lightgray} &'
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let colIndex = 0; colIndex < colNbr - 1; colIndex++) {
    output += `\\textbf{\\sffamily ${alphabet[colIndex]}}  & `
  }
  output += `\\textbf{\\sffamily ${alphabet[colNbr - 1]}} \\\\ \\hline\n`

  for (let rowIndex = 0; rowIndex < rowNbr; rowIndex++) {
    const rowData = data[rowIndex] || {}
    output += `\\textbf{\\sffamily ${rowIndex + 1}} &`
    for (let colIndex = 0; colIndex < colNbr; colIndex++) {
      const cell = rowData[colIndex] || {}
      const styleCell = styles[cell.s ?? ''] || {}
      let color = ''
      if (styleCell.bg?.startsWith('#')) {
        color = `\\cellcolor[HTML]{${styleCell.bg.replace('#', '')}}`
      } else if (styleCell.bg) {
        color = `\\cellcolor{${styleCell.bg}}`
      }
      if (cell?.t === 1) {
        // texte
        output += `\\raggedright ${color} ${cell.v || ''}  &`
      } else if (cell?.t === 2) {
        // number
        output += `\\raggedleft ${color} ${cell.v || ''}  &`
      } else if (cell?.t === 3) {
        // boolean
        output += `\\centering ${color} ${cell.v ? 'VRAI' : 'FAUX'}  &`
      } else {
        output += `${color} ${cell.v || ''}  &`
      }
    }
    output = output.slice(0, -1) // enlever le dernier &
    output += '\\\\ \\hline\n'
  }
  output += '\\end{tabularx}\n'
  return output
}
