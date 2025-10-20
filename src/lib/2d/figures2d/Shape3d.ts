import { ObjetMathalea2D } from '../../../modules/2dGeneralites'
import { context } from '../../../modules/context'
import { VisualPattern } from '../patterns/VisualPattern'
import type { VisualPattern3D } from '../patterns/VisualPattern3D'
// Fonction dupliquée de ../Figures2D.ts pour éviter les dépendances circulaires
function rotatedBoundingBoxWithCenter(
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
  alpha: number,
  cx: number,
  cy: number,
): [number, number, number, number] {
  const w2 = (xmax - xmin) / 2
  const h2 = (ymax - ymin) / 2

  const cosA = Math.cos(alpha)
  const sinA = Math.sin(alpha)

  const dx = Math.abs(w2 * cosA) + Math.abs(h2 * sinA)
  const dy = Math.abs(w2 * sinA) + Math.abs(h2 * cosA)

  const centerX = (xmin + xmax) / 2
  const centerY = (ymin + ymax) / 2

  const rotatedCenterX = cosA * (centerX - cx) - sinA * (centerY - cy) + cx
  const rotatedCenterY = sinA * (centerX - cx) + cosA * (centerY - cy) + cy

  return [
    rotatedCenterX - dx,
    rotatedCenterY - dy,
    rotatedCenterX + dx,
    rotatedCenterY + dy,
  ]
}

// Classe de base pour les formes 2D sans les méthodes de transformation et d'animation de Figure2D
export class Shape3D extends ObjetMathalea2D {
  shapeId: string
  codeSvg: string
  codeTikz: string
  x: number
  y: number
  angle: number
  scale: number
  width: number // laargeur en cm
  height: number // hauteur en cm
  pixelsParCm: number
  bordures: [number, number, number, number] // [xmin, ymin, xmax, ymax]
  opacite = 1
  constructor({
    name = '',
    codeSvg,
    codeTikz,
    x = 0,
    y = 0,
    angle = 0,
    scale = 1,
    width,
    height,
    pixelsParCm = context.pixelsParCm,
    opacite = 1,
    bordures,
    shapeId = 'cubeIso',
  }: {
    name?: string
    codeSvg: string
    codeTikz: string
    x?: number
    y?: number
    angle?: number
    scale?: number
    width: number
    height: number
    pixelsParCm?: number
    opacite?: number
    bordures?: [number, number, number, number]
    shapeIso?: string
    shapeId?: string
  }) {
    super()
    this.name = name
    this.codeSvg = codeSvg
    this.codeTikz = codeTikz
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.angle = angle
    this.scale = scale
    this.shapeId = shapeId

    this.pixelsParCm = pixelsParCm
    this.opacite = opacite
    this.bordures = bordures ?? [
      this.x,
      this.y,
      this.x + this.width,
      this.y + this.height,
    ]
  }

  svg(coeff: number) {
    return `<g opacity=${this.opacite} transform="translate(${this.x * coeff}, ${-this.y * coeff}) ${this.scale !== 1 || this.scale !== 1 || coeff !== 20 ? `scale(${(this.scale * coeff) / 20},${(this.scale * coeff) / 20})` : ''} ${this.angle !== 0 ? `rotate(${-this.angle})` : ''}">${this.codeSvg}</g>`
  }

  tikz() {
    // const tikzCenterX = this.width / 2
    // const tikzCenterY = this.height / 2
    return `\\begin{scope}[fill opacity=${this.opacite}, shift={(${this.x.toFixed(3)},${this.y.toFixed(3)})}${this.scale !== 1 ? `, xscale=${this.scale}` : ''}${this.scale !== 1 ? `, yscale=${this.scale}` : ''}${this.angle !== 0 ? `, rotate around={${this.angle}:(0,0)}` : ''}]
    ${this.codeTikz}
    \\end{scope}`
  }

  updateBordures() {
    this.bordures = [this.x, this.y, this.x + this.width, this.y + this.height]
    if (this.angle !== 0) {
      this.bordures = rotatedBoundingBoxWithCenter(
        this.bordures[0],
        this.bordures[1],
        this.bordures[2],
        this.bordures[3],
        (this.angle * Math.PI) / 180,
        this.x,
        this.y,
      )
    }
  }

  dilate(factor: number) {
    const lastScale = this.scale
    this.scale = lastScale
    this.width *= factor
    this.heigth *= factor
  }

  clone(x: number, y: number, z: number, angle: number): Shape3D {
    const codeTikz = String(this.codeTikz)
    const codeSvg = String(this.codeSvg)
    const [px, py] = project3dIso(x, y, z, angle ?? Math.PI / 6).map(
      (n) => n / 20,
    )
    const scale = this.scale
    const width = Number(this.width)
    const height = Number(this.height)
    const pixelsParCm = Number(this.pixelsParCm)
    return new Shape3D({
      codeSvg,
      codeTikz,
      x: px,
      y: py,
      angle,
      scale,
      width,
      height,
      pixelsParCm,
      opacite: this.opacite,
      bordures: this.bordures,
    })
  }
}

export function project3dIso(
  x: number,
  y: number,
  z: number,
  angle: number = Math.PI / 6,
): [number, number] {
  const cosA = Math.cos(angle)
  const sinA = Math.sin(angle)
  const px = context.isHtml
    ? (x * sinA + y * cosA) * 20
    : (x * sinA + y * cosA) * 20
  const py = context.isHtml
    ? (x * cosA - y * sinA) * 10 - z * 20
    : z * 20 - (x * cosA - y * sinA) * 10
  return [px, py]
}
export function faceTop(angle: number): string {
  const topPoints = [
    project3dIso(0, 0, 1, angle),
    project3dIso(0, 1, 1, angle),
    project3dIso(1, 1, 1, angle),
    project3dIso(1, 0, 1, angle),
  ]
  return `<polygon points="${topPoints.map((p) => p.join(',')).join(' ')}" fill="green" stroke="black" stroke-width="1" />`
}
export function faceLeft(angle: number): string {
  const leftPoints = [
    project3dIso(0, 0, 1, angle),
    project3dIso(1, 0, 1, angle),
    project3dIso(1, 0, 0, angle),
    project3dIso(0, 0, 0, angle),
  ]
  return `<polygon points="${leftPoints.map((p) => p.join(',')).join(' ')}
" fill="yellow" stroke="black" stroke-width="1" />`
}
export function faceRight(angle: number): string {
  const rightPoints = [
    project3dIso(1, 0, 1, angle),
    project3dIso(1, 1, 1, angle),
    project3dIso(1, 1, 0, angle),
    project3dIso(1, 0, 0, angle),
  ]
  return `<polygon points="${rightPoints.map((p) => p.join(',')).join(' ')}" fill="red" stroke="black" stroke-width="1" />`
}

export function cubeDef(shapeId?: string, scale?: number): ObjetMathalea2D {
  const cube = new ObjetMathalea2D()
  cube.bordures = [0, -0.5, 1, 1]
  cube.svg = function (coeff: number): string {
    return `
  <defs>
    <g id="${shapeId ?? 'cubeIso'}" transform="scale(${scale ?? 1},${scale ?? 1})">
      ${faceTop(Math.PI / 6)}
      ${faceLeft(Math.PI / 6)}
      ${faceRight(Math.PI / 6)}
    </g>
  </defs>`
  }
  cube.tikz = function (): string {
    return `
  \\tikzset{
   cubeIso/.pic = {
    % Cube en projection axonométrique
    \\draw[fill=yellow, draw=darkgray, line width=0.5pt] -- (0,1) -- (0.5,0.567) -- (0.5,-0.433) -- (0,0) -- cycle;
    \\draw[fill=red, draw=darkgray, line width=0.5pt] (0.5,0.567) -- (1.366,0.817) -- (1.366,-0.183) -- (0.5,-0.433) -- cycle;
    \\draw[fill=green, draw=darkgray, line width=0.5pt]  (0,1) -- (0.5,0.567) -- (1.366,0.817) -- (0.866,1.25) -- cycle;
   }
  }`.trim()
  }

  return cube
}

/**
 * Génère une figure représentant un cube en projection axonométrique centré en (0,0), taille 1x1.
 * @param options Options pour personnaliser le style du cube.
 * @returns Une instance de Shape2D représentant un cube.
 */
export function shapeCubeIso(
  shapeId?: string,
  x?: number,
  y?: number,
  options?: {
    fillStyle?: string
    strokeStyle?: string
    lineWidth?: number
    opacite?: number
    scale?: number
  },
): Shape3D {
  const codeSvg = `<use href="#${shapeId}" transform="translate(${x ?? 0},${y ?? 0})"></use>`
  const codeTikz = '\\pic at (0,0) {cubeIso};'
  return new Shape3D({
    codeSvg,
    codeTikz,
    width: 1.732,
    height: 2,
    opacite: 1,
    name: 'cube',
    scale: options?.scale ?? 1,
  })
}
/*
  MGu refactoring pour gérer les eventsListeners
*/
export function updateCubeIso({
  pattern,
  i,
  j,
  angle,
  newScale,
  inCorrectionMode,
}: {
  pattern: VisualPattern3D
  i: number
  j: number
  angle: number
  newScale?: number
  inCorrectionMode?: boolean
}): void | (() => void) {
  if (pattern instanceof VisualPattern) return
  let dragging = false
  let lastX = 0
  const motifId = `Motif${i}F${j}`

  function mouseMoveAction(e: MouseEvent) {
    if (!dragging) return
    const dx = e.clientX - lastX
    lastX = e.clientX
    angle += dx * 0.02
    angle = Math.max(0.1, Math.min(1.4, angle))
    renderScene()
  }

  function mouseupAction() {
    dragging = false
  }

  function destroyListeners() {
    window.removeEventListener('mousemove', mouseMoveAction)
    window.removeEventListener('mouseup', mouseupAction)
    document.removeEventListener('correctionsAffichees', setup)
    document.removeEventListener('exercicesAffiches', setup)
  }

  window.addEventListener('mousemove', mouseMoveAction)
  window.addEventListener('mouseup', mouseupAction)

  function renderScene() {
    const svg = document.querySelector(`svg#${motifId}`) as
      | (SVGSVGElement & { _eventsBound?: boolean })
      | null
    if (!svg) return
    // Sélectionne la balise <defs> qui contient un <g> dont l'id commence par "cubeIso"
    const defs = Array.from(svg.querySelectorAll('defs')).find((defsEl) =>
      defsEl.querySelector('g[id^="cubeIso"]'),
    ) as SVGDefsElement | undefined
    if (!defs) return

    // Recalculate face coordinates based on angle
    // Example: update faceTop, faceLeft, faceRight
    // (Assume faceTop, faceLeft, faceRight are functions that accept angle)
    const top = faceTop(angle)
    const left = faceLeft(angle)
    const right = faceRight(angle)

    // Update the <g> content in <defs>
    const g = defs.querySelector(`#cubeIsoQ${i}F${j}`)
    if (g) {
      g.innerHTML = `${top}\n${left}\n${right}\n`
    }
    // Sélectionne tous les <g> qui suivent <defs> et qui sont enfants directs de <svg>
    const svgGroups = Array.from(svg.children).filter(
      (el) => el.tagName === 'g',
    ) as SVGGElement[]
    // Supprimer tous les groupes enfants directs de <svg>
    svgGroups.forEach((group) => group.remove())

    // Recalculer chaque polygone avec pattern.render(j, angle)
    const cells = (pattern as VisualPattern3D).update3DCells(j + 1)
    // Ajouter les SVG générés par svg() de chaque objet
    cells.forEach((cell) => {
      const [px, py] = project3dIso(cell[0], cell[1], cell[2], angle)
      const obj = shapeCubeIso(`cubeIsoQ${i}F${j}`, px, py, {
        scale: 1,
      })
      if (typeof obj.svg === 'function') {
        const temp = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        // temp.setAttribute('transform', `translate(${px}, ${py})`)
        temp.innerHTML = obj.svg(20)
        svg.appendChild(temp)
      }
    })
  }

  function setup() {
    const svg = document.querySelector(`svg#${motifId}`) as
      | (SVGSVGElement & { _eventsBound?: boolean })
      | null
    if (svg && !svg._eventsBound) {
      // console.log(motifId)
      svg._eventsBound = true

      svg.addEventListener('mouseover', () => {
        svg.style.cursor = 'grab'
      })

      svg.addEventListener('mousedown', (e) => {
        dragging = true
        lastX = e.clientX
      })
      renderScene()
    }
  }
  if (inCorrectionMode) {
    // MGu Jean-Claude a raison , il faut cette évent pour savoir quand la correction est affichée
    document.addEventListener('correctionsAffichees', setup)
  } else {
    // Listen for the 'exercicesAffiches' event to re-render the scene
    document.addEventListener('exercicesAffiches', setup)
  }
  return destroyListeners
}
