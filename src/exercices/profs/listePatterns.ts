import {
  cubeDef,
  faceLeft,
  faceRight,
  faceTop,
  project3dIso,
  shapeCubeIso,
  updateCubeIso,
} from '../../lib/2d/figures2d/Shape3d'
import {
  listeShapes2DInfos,
  shapeNames,
  type ShapeName,
} from '../../lib/2d/figures2d/shapes2d'
import { VisualPattern3D } from '../../lib/2d/patterns/VisualPattern3D'
import {
  listePatternsPreDef,
  type PatternRiche3D,
  type PatternRiche,
  listePatternsRepetition,
  listePatternsFor6I13,
  type PatternRicheRepetition,
  listePatternsFor6I131,
  listePattern3d,
  listePatternRatio,
} from '../../lib/2d/patterns/patternsPreDef'
import { point } from '../../lib/2d/points'
import { polygone } from '../../lib/2d/polygones'
import { texteParPosition } from '../../lib/2d/textes'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import { sp } from '../../lib/outils/outilString'
import {
  fixeBordures,
  mathalea2d,
  type NestedObjetMathalea2dArray,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { randint } from '../../modules/outils'
import Exercice from '../Exercice'
import { choice } from '../../lib/outils/arrayOutils'
import Decimal from 'decimal.js'
import { VisualPattern } from '../../lib/2d/patterns/VisualPattern'

export const titre =
  'Liste des patterns stockés dans Mathaléa avec leurs numéros de référence'

export const refs = {
  'fr-fr': ['P023'],
  'fr-ch': [],
}
export const uuid = '4c9ca'

/**
 * Dans le dossier src/lib/2d/patterns, on trouve un fichier patternsPreDef.ts
 * qui contient une liste de patterns stockés dans Mathaléa.
 * Ce fichier exporte une liste de patternsRiches.
 * Les patternsRiches sont des objets qui contiennent les propriétés suivantes:
 * shapeDefault: la fonction qui renvoie la Shape2D des éléments du pattern
 * fonction: la fonction qui permet de calculer le nombre d'éléments du pattern au rang x
* formule: la formule latex qui permet de calculer ce nombre en fonction du rang n
*   type: 'linéaire' | 'affine' | 'degré2' | 'degré3' | 'autre'
*   pattern: Un PatternNumerique initialisé avec ses cellules de rang 1
 *  iterate: la fonction qui permet de fabriquer les cellules au rang n
 * @author Jean-Claude Lhote

 */
export default class ListePatternsPreDef extends Exercice {
  destroyers: (() => void)[] = []

  constructor() {
    super()
    this.nbQuestions = 1
    this.listePackages = ['twemojis']
    this.nbQuestionsModifiable = false
    this.besoinFormulaireNumerique = [
      'Liste restreinte pour la référence',
      6,
      '1 : 6I13\n2 : 6I13-1\n3 : 6I13-2\n4 : 6I14\n5 : 5L10-5\n6 : 5P12-2',
    ]
    this.sup = 1
    this.besoinFormulaire3Numerique = ['Nombre de motifs par pattern', 6]
    this.sup3 = 4
    this.comment = `Affiche la liste des patterns stockés dans Mathaléa avec leurs numéros de référence.<br>
Vous pouvez choisir d'afficher un ou plusieurs patterns en indiquant leur numéro de référence dans le formulaire.<br>
Le nombre de motifs par pattern (3 par défaut) est aussi modifiable dans le formulaire.<br>
Le nombre de patterns à afficher est aussi modifiable dans le formulaire.<br>
Le nombre donné entre parenthèses est le nombre d'éléments au rang 43 de chaque pattern.<br>
L'expression donnée entre crochets est la formule qui permet de calculer le nombre d'éléments au rang n de chaque pattern.<br>`
  }

  destroy() {
    // MGu quan l'exercice est supprimé par svelte : bouton supprimé
    this.destroyers.forEach((destroy) => destroy())
    this.destroyers.length = 0
  }

  nouvelleVersion(): void {
    // MGu quand l'exercice est modifié, on détruit les anciens listeners
    this.destroyers.forEach((destroy) => destroy())
    this.sup3 = Math.max(2, this.sup3) // On ne peut pas afficher moins de 2 motifs
    let listePatterns: (
      | PatternRiche
      | PatternRicheRepetition
      | PatternRiche3D
    )[] = []
    switch (this.sup) {
      case 1:
        listePatterns = listePatternsFor6I13
        break
      case 2:
        listePatterns = listePatternsFor6I131
        break
      case 3:
        listePatterns = listePattern3d
        break
      case 4:
        listePatterns = listePatternsRepetition
        break
      case 5:
        listePatterns = listePatternsPreDef
        break
      case 6:
        listePatterns = listePatternRatio
        break
    }
    const listeShapes = Array.from(
      new Set(listePatterns.map((pat) => pat.shapes).flat()),
    )
    let texte = ''
    if (!context.isHtml) {
      texte += `${listeShapes.map((shape) => listeShapes2DInfos[shape].shapeDef.tikz()).join('\n')}\n`
    }
    if (listePatterns == null || listePatterns.length === 0) return
    for (let i = 0; i < listePatterns.length; i++) {
      const pat = listePatterns[i]
      if (pat == null) {
        texte += `\n${texteEnCouleurEtGras(`Pattern ${i + 1}`, 'red')}: ${texteEnCouleurEtGras('Pattern inexistant', 'red')}`
        continue
      }
      if ('nbMotifMin' in pat) {
        // On est en présence d'un motif répétitif
        const objets: NestedObjetMathalea2dArray = []
        for (const shape of pat.shapes) {
          if (shape in listeShapes2DInfos) {
            objets.push(listeShapes2DInfos[shape].shapeDef)
          }
        }
        for (let j = 0; j <= pat.nbMotifMin; j++) {
          const pattern = new VisualPattern([])
          pattern.shapes = pat.shapes
          pattern.iterate = pat.iterate
          objets.push(pattern.render(j, j + 1, 0))
        }
        texte += `\n${texteEnCouleurEtGras(`Pattern ${i + 1}`, 'blue')}:  <br>`
        texte += mathalea2d(
          Object.assign(
            fixeBordures(objets, { rxmin: 0, rymin: -1, rxmax: 0, rymax: 1 }),
            { pixelsParCm: 20, scale: 0.4, optionsTikz: 'transform shape' },
          ),
          objets,
        )
      } else {
        const n43 = !('nbMotifMin' in pat)
          ? new Decimal(pat.fonctionNb(43)).toString()
          : null
        const n43R = !('nbMotifMin' in pat)
          ? pat.fonctionRatio
            ? pat
                .fonctionRatio(43)
                .values.map((el) => new Decimal(el).toString())
                .join('~:~')
            : null
          : null
        const n43F = !('nbMotifMin' in pat)
          ? pat.fonctionFraction && pat.fonctionRatio
            ? `\\dfrac{${(pat.fonctionRatio(43).values[0] ?? 0).toString()}}{${new Decimal(pat.fonctionNb(43)).toString()}}`
            : null
          : null

        texte += `\n${texteEnCouleurEtGras(`Pattern ${i + 1}`, 'blue')}: Motif 43 : $\\left(${n43}\\right)$ ${n43F ? `; fraction : $${n43F}$ ` : ''} ${n43R ? `; ratio : $${n43R}$` : ''} ; formule : ${sp(6)}$\\left[${miseEnEvidence(pat.formule ?? '')}\\right]$ <br>`

        const patternRiche = pat
        if (context.isHtml)
          texte +=
            patternRiche.visualImg != null
              ? `<a href="${patternRiche.visualImg}" target="_blank">Image</a><br><br>`
              : ''
        const pattern =
          'iterate3d' in pat
            ? new VisualPattern3D({
                initialCells: [],
                type: 'iso',
                shapes: pat.shapes,
                prefixId: `Ex${this.numeroExercice}Q${i}`,
              })
            : new VisualPattern([])
        if ('iterate3d' in pattern) {
          pattern.shapes = ['cube']
          pattern.iterate3d = (patternRiche as PatternRiche3D).iterate3d
        } else {
          pattern.shapes =
            (patternRiche as PatternRiche).shapes ||
            (shapeNames[randint(0, shapeNames.length - 1)] as ShapeName)
          pattern.iterate = (patternRiche as PatternRiche).iterate
        }

        const angle = Math.PI / 2.5
        let yMax = 0
        let yMin = 0

        const figures: NestedObjetMathalea2dArray[] = []
        for (let j = 0; j < this.sup3; j++) {
          figures[j] = []
          let objets: NestedObjetMathalea2dArray = []
          let ymin = Infinity
          let ymax = -Infinity
          let xmin = Infinity
          let xmax = -Infinity
          if (context.isHtml) {
            for (let n = 0; n < pattern.shapes.length; n++) {
              let name = pattern.shapes[n]
              if (name in listeShapes2DInfos) {
                if (name === 'carré') {
                  const nom = String(choice(Object.keys(listeShapes2DInfos)))
                  name = nom
                  pattern.shapes[n] = nom
                }
                figures[j].push(listeShapes2DInfos[name].shapeDef)
              } else if (name === 'cube') {
                if ((pattern as VisualPattern3D).shape == null) {
                  ;(pattern as VisualPattern3D).shape = shapeCubeIso()
                }
                const cubeIsoDef = cubeDef(`cubeIsoQ${i}F${j}`, 1)
                cubeIsoDef.svg = function (coeff: number): string {
                  return `
          <defs>
            <g id="cubeIsoQ${i}F${j}">
              ${faceTop(angle)}
              ${faceLeft(angle)}
              ${faceRight(angle)}
            </g>
          </defs>`
                }
                figures[j].push(cubeIsoDef)
              } else {
                console.warn(
                  `Shape ${name} n'est pas dans listeShapesDef ou emojis et n'est pas un cube`,
                )
              }
            }
          }
          if ('iterate3d' in pattern) {
            if (pattern.shape == null) {
              pattern.shape = shapeCubeIso(`cubeIsoQ${i}F${j}`, 0, 0, {
                fillStyle: '#ffffff',
                strokeStyle: '#000000',
                lineWidth: 1,
                opacite: 1,
                scale: 1,
              })
            }
            if (context.isHtml) {
              const listeners = updateCubeIso({
                pattern,
                i,
                j,
                angle,
                inCorrectionMode: false,
              })
              if (listeners) this.destroyers.push(listeners)
              pattern.shape.codeSvg = `<use href="#cubeIsoQ${i}F${j}"></use>`
              const cells = (pattern as VisualPattern3D).update3DCells(j + 1)
              // Ajouter les SVG générés par svg() de chaque objet
              cells.forEach((cell) => {
                const [px, py] = project3dIso(cell[0], cell[1], cell[2], angle)
                const obj = shapeCubeIso(`cubeIsoQ${i}F${j}`, px, py, {
                  scale: 1,
                })
                obj.x = px / 20
                obj.y = -py / 20
                objets.push(obj)
                ymin = Math.min(ymin, obj.y)
                ymax = Math.max(ymax, obj.y + 1)
                xmin = Math.min(xmin, obj.x)
                xmax = Math.max(xmax, obj.x + 1)
              })
            } else {
              objets = [
                cubeDef(`cubeIsoQ${i}F${j}`),
                ...pattern.render(j + 1, 0, 0, Math.PI / 6),
              ]
              ;({ xmin, ymin, xmax, ymax } = fixeBordures(objets))
            }
          } else {
            objets = pattern.render(j + 1, 0, 0)
            ;({ xmin, ymin, xmax, ymax } = fixeBordures(objets))
          }
          figures[j].push(...objets)
          // const { xmax, ymax, xmin, ymin } = fixeBordures(objets, { rxmin: 0.5, rymin: 0, rxmax: 0.5, rymax: 0 })
          figures[j].push(
            texteParPosition(
              `Motif ${j + 1}`,
              (xmax + xmin) / 2,
              -1.5,
              0,
              'black',
              0.8,
              'milieu',
            ),
          )
          const cadre = polygone(
            point(xmin - 2, -2),
            point(xmax + 2, -2),
            point(xmax + 2, ymax + 2),
            point(xmin - 2, ymax + 2),
          )
          cadre.pointilles = 4
          figures[j].push(cadre)

          yMax = Math.max(yMax, ymax)
          yMin = Math.min(yMin, ymin)
        }
        texte +=
          figures
            .map((fig, index) =>
              mathalea2d(
                Object.assign(
                  fixeBordures(fig, {
                    rxmin: 0,
                    rymin: -1,
                    rxmax: 0,
                    rymax: 1,
                  }),
                  {
                    id: `Motif${i}F${index}`,
                    pixelsParCm: 20,
                    yMax,
                    yMin,
                    scale: 0.5,
                    style: 'display: inline-block',
                    optionsTikz: 'transform shape',
                  },
                ),
                fig,
              ),
            )
            .join('\n') + '<br>'
      }
    }
    this.listeQuestions = [texte]
  }
}
