import { UniverSheetElement } from 'univer-sheets-vite'

export class SheetElement extends UniverSheetElement {
  private button: HTMLButtonElement | null = null
  private messageDiv: HTMLDivElement | null = null

  connectedCallback() {
    this.render()
    this.initListener()
    setTimeout(() => this.customizeSheet(), 0)
  }

  private render() {
    let rawData = ''
    if (this.hasAttribute('data')) {
      rawData = this.getAttribute('data')!
      // Nettoie les guillemets HTML si besoin
      rawData = rawData.replace(/&quot;/g, '"')
    }
    this.innerHTML = `
      <div>
        <div style="flex:1;width:${this.getAttribute('width') || '100%'};height:${this.getAttribute('height') || '250px'}; min-width:${this.getAttribute('min-width') || '360px'};display:flex; flex-direction:column;">
          <univer-sheet style="width:100%;height:100%;" id="sheet" data=${rawData}></univer-sheet>
        </div>
        <div>
          <button id="runCode" class="px-6 py-2.5" style="box-sizing: border-box;${this.getAttribute('isInteractif') === 'true' ? 'display:none;' : ''}">▶️ Vérifier</button>
          <div id="message-faux" style="box-sizing: border-box; margin: 10px 10px 10px 10px; font-weight: bold; color: red; font-size: 1.2em;"></div>
        </div>
      </div>
    `
    this.button = this.querySelector('#runCode')
    this.messageDiv = this.querySelector('#message-faux')
  }

  private customizeSheet() {
    const univerSheet = this.querySelector('univer-sheet') as any
    if (!univerSheet) return
    if (this.hasAttribute('data')) {
      let rawData = this.getAttribute('data')!
      // Nettoie les guillemets HTML si besoin
      rawData = rawData.replace(/&quot;/g, '"')
      try {
        univerSheet.data = JSON.parse(rawData)
      } catch (e) {
        // ignore
      }
    }
    const id = this.id
    if (id) {
      const sheetId = id.replace('SheetElement', 'univer')
      univerSheet.setAttribute('id', sheetId)
    }
  }

  private initListener() {
    if (this.button) {
      this.button.addEventListener('click', () => {
        const eventName = this.getAttribute('check') || 'sheet-check'
        this.dispatchEvent(
          new CustomEvent(eventName, {
            bubbles: true,
            composed: true,
            detail: {
              sheet: this,
              messageDiv: this.messageDiv,
            },
          }),
        )
      })
    }
  }
}

customElements.define('sheet-element', SheetElement)

export function addSheet({
  numeroExercice,
  question,
  data,
  styles,
  interactif,
  rowCount = 4,
  columnCount = 4,
  width = '100%',
  height = '250px',
  minWidth = '360px',
}: {
  numeroExercice: number | string
  question: number | string
  data: any
  styles: any
  interactif: boolean | string
  rowCount?: number
  columnCount?: number
  width?: string
  height?: string
  minWidth?: string
}): string {
  return `<sheet-element
    id="SheetElementEx${numeroExercice}Q${question}"
    data='${JSON.stringify({
      rowCount,
      columnCount,
      cellData: data,
      styles: styles,
    })}'
    isInteractif="${interactif}"
    check="checkEx${numeroExercice}Q${question}"
    width="${width}"
    height="${height}"
    min-width="${minWidth}"
  ></sheet-element>
  `
}
