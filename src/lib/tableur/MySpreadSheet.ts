import jspreadsheet from 'jspreadsheet-ce'
import 'jspreadsheet-ce/dist/jspreadsheet.css'

export class MySpreadsheetElement extends HTMLElement {
  private _spreadsheet: any = null
  private _buttonListener?: EventListener
  private _customListeners: { [eventName: string]: EventListener } = {}

  constructor() {
    super()
    this._spreadsheet = null
  }

  /**
   * Ajoute un listener sur l'élément et le mémorise pour suppression ultérieure
   */
  public addListener(eventName: string, callback: EventListener) {
    this.addEventListener(eventName, callback)
    this._customListeners[eventName] = callback
  }

  /**
   * Méthode statique pour créer et configurer un MySpreadsheetElement
   */
  static create({
    id,
    data = [],
    minDimensions = [5, 5],
    style = {},
    columns = [],
    interactif = false,
  }: {
    id?: string
    data?: (string | number)[][]
    minDimensions?: [number, number]
    style?: any
    columns?: any[]
    interactif?: boolean
  } = {}) {
    const elt = new MySpreadsheetElement()
    if (id) elt.id = id
    elt.setAttribute('data', JSON.stringify(data))
    elt.setAttribute('min-dimensions', JSON.stringify(minDimensions))
    elt.setAttribute('style', JSON.stringify(style))
    elt.setAttribute('columns', JSON.stringify(columns))
    elt.setAttribute('interactif', interactif ? 'true' : 'false')
    return elt
  }

  connectedCallback() {
    this.innerHTML = '<div></div>'
    const container = (this.firstElementChild ??
      document.createElement('div')) as HTMLDivElement

    let data: (number | string)[][] = []
    let minDimensions = [5, 5]
    let style = {}
    let columns = []
    try {
      if (this.getAttribute('data'))
        data = JSON.parse(this.getAttribute('data') ?? '') as (
          | string
          | number
        )[][]
    } catch {}
    try {
      if (this.getAttribute('min-dimensions'))
        minDimensions = JSON.parse(this.getAttribute('min-dimensions') ?? '')
    } catch {}
    try {
      if (this.getAttribute('style'))
        style = JSON.parse(this.getAttribute('style') ?? '')
    } catch {}
    try {
      if (this.getAttribute('columns'))
        columns = JSON.parse(this.getAttribute('columns') ?? '[]')
    } catch {}
    this._spreadsheet = jspreadsheet(container, {
      tabs: false,
      toolbar: false,
      worksheets: [
        {
          data,
          minDimensions,
          tableOverflow: true,
          tableHeight: '300px',
          style,
          columns,
        } as any,
      ],
    })[0]
    let numeroExercice = 0
    let question = 0
    const idMatch = this.id.match(/sheet-Ex(\d+)Q(\d+)$/)
    if (idMatch) {
      numeroExercice = Number(idMatch[1])
      question = Number(idMatch[2])
    }

    const feedBackElt = document.createElement('div')
    feedBackElt.id = 'message-faux'
    container.appendChild(feedBackElt)
    const resultCheck = document.createElement('span')
    resultCheck.id = `resultatCheckEx${numeroExercice}Q${question}`
    container.appendChild(resultCheck)
    const divFeedback = document.createElement('div')
    divFeedback.id = `feedbackEx${numeroExercice}Q${question}`
    divFeedback.className =
      'italic text-coopmaths-warn-darkest dark:text-coopmathsdark-warn-darkest'
    container.appendChild(divFeedback)
    const bouton = document.createElement('button')
    bouton.id = 'runCode'
    bouton.textContent = 'Vérifier'
    bouton.style.boxSizing = 'border-box'
    bouton.style.position = 'relative'
    bouton.style.zIndex = '10'
    bouton.style.marginTop = '10px'
    // Styles personnalisés
    bouton.style.backgroundColor = '#2b6cb0' // Bleu coopmaths
    bouton.style.color = 'white' // Texte blanc
    bouton.style.border = 'none' // Pas de bordure
    bouton.style.borderRadius = '6px' // Bords arrondis
    bouton.style.padding = '8px 20px' // Espacement interne
    bouton.style.fontSize = '1rem' // Taille du texte
    bouton.style.fontWeight = 'bold' // Texte en gras
    bouton.style.cursor = 'pointer' // Curseur main au survol
    bouton.style.boxShadow = '0 2px 6px rgba(0,0,0,0.08)' // Ombre légère

    // Effet au survol
    bouton.onmouseover = () => {
      bouton.style.backgroundColor = '#174ea6'
    }
    bouton.onmouseout = () => {
      bouton.style.backgroundColor = '#2b6cb0'
    }
    bouton.style.display =
      this.getAttribute('interactif') === 'true' ? 'none' : 'block'
    container.appendChild(bouton)
    if (idMatch) {
      const numeroExercice = Number(idMatch[1])
      const question = Number(idMatch[2])
      this._setupButton(bouton, numeroExercice, question)
    }
    this.dispatchEvent(new CustomEvent('spreadsheet-ready'))
  }

  disconnectedCallback() {
    if (this._spreadsheet) {
      this._spreadsheet = null
    }
    // Retire le listener personnalisé
    const bouton = this.querySelector('#runCode')
    if (bouton && this._buttonListener) {
      bouton.removeEventListener('click', this._buttonListener)
    }
    // Retire tous les listeners ajoutés via addListener
    Object.entries(this._customListeners).forEach(([eventName, callback]) => {
      this.removeEventListener(eventName, callback)
    })
    this._customListeners = {}
  }

  _setupButton(
    bouton: HTMLButtonElement,
    numeroExercice: number,
    question: number,
  ) {
    const eventName = `checkEx${numeroExercice}Q${question}`
    this._buttonListener = () => {
      this.dispatchEvent(
        new CustomEvent(eventName, { detail: { sheet: this } }),
      )
    }
    bouton.addEventListener('click', this._buttonListener)
  }

  getCellValue(column: number, row: number) {
    return this._spreadsheet.getValueFromCoords(column, row, true)
  }

  getCellFormula(column: number, row: number) {
    return this._spreadsheet.getValueFromCoords(column, row, false)
  }

  getData() {
    // Retourne les données de la première worksheet
    return this._spreadsheet.getData() ?? []
  }

  setCellValue(column: number, row: number, value: string | number) {
    this._spreadsheet.setValueFromCoords(column, row, value, true)
  }

  setCellFormula(column: number, row: number, formula: string) {
    if (!formula.startsWith('=')) formula = '=' + formula
    this._spreadsheet.setValueFromCoords(column, row, formula, true)
  }

  setData(data: any[]) {
    this._spreadsheet.setData(data)
  }

  isMounted() {
    return this._spreadsheet !== null
  }

  getMinDimensions() {
    return this._spreadsheet.minDimensions ?? [5, 5]
  }

  getStyle() {
    return this._spreadsheet.style ?? {}
  }

  getColumns() {
    return this._spreadsheet.columns ?? []
  }
}

customElements.define('my-spreadsheet', MySpreadsheetElement)

export function addSheet({
  numeroExercice,
  question,
  data,
  minDimensions,
  style,
  columns,
  interactif,
}: {
  numeroExercice: number
  question: number
  data: any[][]
  minDimensions: [number, number]
  style: any
  columns: any[]
  interactif: boolean
}): string {
  return (
    `<my-spreadsheet
  id="sheet-Ex${numeroExercice}Q${question}"
  data='${JSON.stringify(data)}'
  min-dimensions='${JSON.stringify(minDimensions)}'
  style='${JSON.stringify(style)}'
  columns='${JSON.stringify(columns)}'
  interactif='${interactif}'
>` +
    (interactif
      ? `<div class="ml-2 py-2" id="resultatCheckEx${numeroExercice}Q${question}"></div>
<div class ="ml-2 py-2 italic text-coopmaths-warn-darkest dark:text-coopmathsdark-warn-darkest" id="feedbackEx${numeroExercice}Q${question}"}></div>`
      : '') +
    '</my-spreadsheet>'
  )
}
