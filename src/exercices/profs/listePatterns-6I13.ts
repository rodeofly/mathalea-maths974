import Decimal from 'decimal.js'
import { isNumber } from 'mathjs'
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
import { VisualPattern } from '../../lib/2d/patterns/VisualPattern'
import { VisualPattern3D } from '../../lib/2d/patterns/VisualPattern3D'
import {
  listePatternAffineOuLineaire,
  type PatternRiche,
  type PatternRiche3D,
} from '../../lib/2d/patterns/patternsPreDef'
import { point } from '../../lib/2d/points'
import { polygone } from '../../lib/2d/polygones'
import { texteParPosition } from '../../lib/2d/textes'
import { bleuMathalea } from '../../lib/colors'
import { choice } from '../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import {
  fixeBordures,
  mathalea2d,
  type NestedObjetMathalea2dArray,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = "Liste des patterns disponibles pour l'exercice 6I13"
export const dateDePublication = '23/07/2025'

export const refs = {
  'fr-fr': ['P023-6I13'],
  'fr-ch': [],
}
export const uuid = '71ff5'

/**
 * Affiche les patterns propres à l'exercice 6I13
 * @author Eric Elter (sur la base de listePatterns de Jean-Claude Lhote)

 */
export default class ListePatternsPreDef6I13 extends Exercice {
  destroyers: (() => void)[] = []

  constructor() {
    super()
    this.nbQuestions = 1
    this.listePackages = ['twemojis'] // this.listePackages est inutile mais la présence du mot "twemojis" est indispensable pour la sortie LaTeX.
    this.nbQuestionsModifiable = false
    this.besoinFormulaire3Numerique = ['Nombre de motifs par pattern', 6]
    this.sup3 = 4
    this.comment = `Cette page affiche la liste des patterns disponibles dans 6I13 avec leur numéro de référence et pour information, le nombre d'éléments 
    pour le motif 43 ainsi que le nombre d'éléments au rang n de chaque pattern.<br>`
  }

  destroy() {
    // MGu quan l'exercice est supprimé par svelte : bouton supprimé
    this.destroyers.forEach((destroy) => destroy())
    this.destroyers.length = 0
  }

  nouvelleVersion(): void {
    // MGu quand l'exercice est modifié, on détruit les anciens listeners
    this.destroyers.forEach((destroy) => destroy())
    this.destroyers.length = 0
    this.sup3 = Math.max(2, this.sup3) // On ne peut pas afficher moins de 2 motifs
    const listePatternReference = listePatternAffineOuLineaire.filter(
      (p) =>
        p.fonctionRatio == null &&
        p.fonctionFraction == null &&
        (!('shapes' in p) || p.shapes.length === 1),
    )
    const listeOfAll: (PatternRiche | PatternRiche3D)[] = [
      ...listePatternReference,
    ]

    let texte = ''
    // @todo ne pas coller toutes les def dans le fichier tex mais seulement celles utilisées !
    if (!context.isHtml) {
      texte += `${Object.values(listeShapes2DInfos)
        .map((shape) => shape.shapeDef.tikz())
        .join('\n')}\n`
    }
    if (listeOfAll == null || listeOfAll.length === 0) return
    for (let i = 0; i < listeOfAll.length; i++) {
      const pat = listeOfAll[i]
      if (pat == null) {
        texte += `\n${texteEnCouleurEtGras(`Pattern ${i + 1}`, 'red')}: ${texteEnCouleurEtGras('Pattern inexistant', 'red')}`
        continue
      }

      if ('nbMotifMin' in pat && isNumber(pat.nbMotifMin)) {
        // On est en présence d'un motif répétitif
        const objets: NestedObjetMathalea2dArray = []
        if ('shapes' in pat) {
          for (const shape of pat.shapes) {
            if (shape in listeShapes2DInfos) {
              objets.push(listeShapes2DInfos[shape].shapeDef)
            }
          }
        }

        for (let j = 0; j <= pat.nbMotifMin; j++) {
          const pattern = new VisualPattern([])

          if ('shapes' in pat) pattern.shapes = pat.shapes
          if ('iterate' in pat) pattern.iterate = pat.iterate
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
        const infosShape =
          pat.shapes[0] in listeShapes2DInfos
            ? listeShapes2DInfos[pat.shapes[0]]
            : { articleCourt: 'de ', nomPluriel: 'cubes' }

        const nom = infosShape.nomPluriel

        texte += `${texteEnCouleurEtGras(`Pattern ${i + 1}`, 'blue')}:<br> Pour le motif 43, il y a ${n43} ${nom}.<br>`
        texte += `Pour le motif $${miseEnEvidence('n', bleuMathalea)}$, il y a $${miseEnEvidence(pat.formule, bleuMathalea)}$ éléments.<br>`

        const patternRiche = pat
        const pattern =
          'iterate3d' in patternRiche
            ? new VisualPattern3D({
                initialCells: [],
                type: 'iso',
                prefixId: `Ex${this.numeroExercice}Q${i}`,
                shapes: ['cube'],
              })
            : new VisualPattern([])
        if (pattern instanceof VisualPattern3D) {
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
                  figures[j].push(listeShapes2DInfos[nom].shapeDef)
                } else figures[j].push(listeShapes2DInfos[name].shapeDef)
              } else if (name === 'cube') {
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
          if (pattern instanceof VisualPattern3D) {
            if (pattern.shape == null) {
              pattern.shape = shapeCubeIso(`cubeIsoQ${i}F${j}`, 1, 1, {
                scale: 1,
              })
            }
            if (context.isHtml) {
              const listeners = updateCubeIso({ pattern, i, j, angle })
              if (listeners) this.destroyers.push(listeners)
              pattern.shape.codeSvg = `<use href="#cubeIsoQ${i}F${j}"></use>`
              const cells = (pattern as VisualPattern3D).update3DCells(j + 1)
              // Ajouter les SVG générés par svg() de chaque objet
              cells.forEach((cell) => {
                const scale = 1
                const [px, py] = project3dIso(cell[0], cell[1], cell[2], angle)
                const obj = shapeCubeIso(`cubeIsoQ${i}F${j}`, px, py, { scale })
                obj.x = px / 20
                obj.y = -py / 20
                objets.push(obj)
                ymin = Math.min(ymin, obj.y * scale)
                ymax = Math.max(ymax, (obj.y + 1) * scale)
                xmin = Math.min(xmin, obj.x * scale)
                xmax = Math.max(xmax, (obj.x + 1) * scale)
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
