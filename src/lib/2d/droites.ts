import {
  colorToLatexOrHTML,
  ObjetMathalea2D,
  vide2d,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { egal } from '../../modules/outils'
import { arrondi } from '../outils/nombres'
import { angleOriente } from './angles'
import { traceCompas } from './cercle'
import { codageBissectrice, codageMediatrice, codageSegments } from './codages'
import { milieu, Point, point, pointSurDroite, pointSurSegment } from './points'
import { PointAbstrait } from './points-abstraits'
import {
  DemiDroite,
  demiDroite,
  longueur,
  norme,
  segment,
  Vecteur,
  vecteur,
} from './segmentsVecteurs'
import {
  Latex2d,
  latex2d,
  TexteParPoint,
  texteParPosition,
  type LetterSizeType,
} from './textes'
import {
  homothetie,
  projectionOrtho,
  rotation,
  symetrieAxiale,
  translation,
} from './transformations'

/**
 * Ajouter une étiquette sur une droite.
 * @param {*} droite La droite où on va rajouter une étiquette
 * @param {*} nom Le nom de la droite doit être en latex et sera rendu avec Latex2d (donc en mode math) : Ne pas mettre de $ $ !
 * @param {*} options Les options permettant de personnaliser la position de l'étiquette et la mise en forme
 *  options.preferedPosition La position à privilégier si possible sur le bord de l'image ('left', 'right', 'above', 'below')
 *  options.usedPosition Un tableau des anciennes positions déjà allouées pour éviter les colisions avec des étiquettes d'autres droites
 *  options.taille La taille de la police de l'étiquette par défaut 6
 *  options.color La couleur de l'étiquette par défaut 'red'
 * @returns {Latex2d} L'étiquette
 *
 * Exemple :
 *   context.fenetreMathalea2d = [xmin + 0.2, ymin, xmax, ymax] // important pour la position des labels
 *   const d3nom = labelOnLine(d3, '$' + noms[3] + '$', { color: 'blue', taille: 8, preferedPosition: 'left' })
 *   const d0nom = labelOnLine(d0, '$' + noms[0] + '$', { color: 'red', taille: 8, usedPosition: [d3nom] })
 *
 * @author Mickael Guironnet
 * Modifications par Jean-Claude Lhote : factorisation dans droites.ts, passage en typescript et utilisation de latex2d à la place de LAtexParCoordonneesBox
 */
export function labelOnLine(
  droite: Droite,
  nom: string,
  {
    preferedPosition = 'auto',
    usedPosition = [],
    letterSize = 'footnotesize',
    color = 'red',
    backgroundColor = 'white',
  }: {
    preferedPosition?: 'left' | 'right' | 'above' | 'below' | 'auto'
    usedPosition?: Latex2d[]
    letterSize?: LetterSizeType
    color?: string
    backgroundColor?: string
  } = {},
): Latex2d | ObjetMathalea2D {
  const debug = false
  const largeur = 30
  const hauteur = 20
  let absNom, ordNom, leNom, anchor
  let oneUsedPosition
  const positions: {
    label: Latex2d
    position: string
    anch: string
    colision: [number, boolean][]
  }[] = []
  if (nom !== '') {
    if (egal(droite.b, 0, 0.05)) {
      // ax+c=0 x=-c/a est l'équation de la droite
      // droite quasi verticale
      absNom =
        -droite.c / droite.a +
        (largeur * 0.5) / context.pixelsParCm +
        2 / context.pixelsParCm
      ordNom = context.fenetreMathalea2d[1] + 1 // l'ordonnée du label est ymin +1
      anchor = 'right'
      oneUsedPosition = 'below'
      leNom = latex2d(nom, absNom, ordNom, {
        color,
        backgroundColor: 'white',
        letterSize,
      })
      positions.push({
        label: leNom,
        position: oneUsedPosition,
        anch: anchor,
        colision: [],
      })
    } else if (egal(droite.a, 0, 0.05)) {
      // by+c=0 y=-c/b est l'équation de la droite
      // droite quasi horizontale
      absNom = context.fenetreMathalea2d[0] + 1 // l'abscisse du label est xmin +1
      ordNom = -droite.c / droite.b + (hauteur * 0.5) / context.pixelsParCm
      anchor = 'above'
      oneUsedPosition = 'left'
      leNom = latex2d(nom, absNom, ordNom, {
        color,
        backgroundColor: 'white',
        letterSize,
      })
      positions.push({
        label: leNom,
        position: oneUsedPosition,
        anch: anchor,
        colision: [],
      })
    } else {
      // a et b sont différents de 0 ax+by+c=0 est l'équation
      // y=(-a.x-c)/b est l'equation cartésienne et x=(-by-c)/a
      const y0 =
        (-droite.a * (context.fenetreMathalea2d[0] + 1) - droite.c) / droite.b
      const y1 =
        (-droite.a * (context.fenetreMathalea2d[2] - 1) - droite.c) / droite.b
      const x0 =
        (-droite.b * (context.fenetreMathalea2d[1] + 1) - droite.c) / droite.a
      const x1 =
        (-droite.b * (context.fenetreMathalea2d[3] - 1) - droite.c) / droite.a
      if (
        y0 > context.fenetreMathalea2d[1] &&
        y0 < context.fenetreMathalea2d[3]
      ) {
        // à gauche : soit en dessous ou en dessous
        absNom = context.fenetreMathalea2d[0] + 1
        ordNom =
          y0 -
          droite.pente * ((largeur * 0.5) / context.pixelsParCm) +
          ((droite.pente > 0 ? -1 : 1) * hauteur * 0.5) / context.pixelsParCm
        anchor = droite.pente > 0 ? 'below' : 'above'
        oneUsedPosition = 'left'
        if (
          ordNom < context.fenetreMathalea2d[1] + 1 ||
          ordNom > context.fenetreMathalea2d[3] - 1
        ) {
          if (debug)
            console.info(
              'probl:nom:' +
                nom +
                ':position:' +
                oneUsedPosition +
                (context.fenetreMathalea2d[1] + 1) +
                '<' +
                ordNom +
                '<' +
                (context.fenetreMathalea2d[3] - 1),
            )
        } else {
          leNom = latex2d(nom, absNom, ordNom, {
            color,
            backgroundColor: 'white',
            letterSize,
          })
          positions.push({
            label: leNom,
            position: oneUsedPosition,
            anch: anchor,
            colision: [],
          })
        }
        // à gauche : soit en dessous ou en dessous
        absNom = context.fenetreMathalea2d[0] + 1
        ordNom =
          y0 +
          droite.pente * ((largeur * 0.5) / context.pixelsParCm) -
          ((droite.pente > 0 ? -1 : 1) * hauteur * 0.5) / context.pixelsParCm
        anchor = droite.pente > 0 ? 'above' : 'below'
        oneUsedPosition = 'left'
        if (
          ordNom < context.fenetreMathalea2d[1] + 1 ||
          ordNom > context.fenetreMathalea2d[3] - 1
        ) {
          if (debug)
            console.info(
              'probl:nom:' +
                nom +
                ':position:' +
                oneUsedPosition +
                (context.fenetreMathalea2d[1] + 1) +
                '<' +
                ordNom +
                '<' +
                (context.fenetreMathalea2d[3] - 1),
            )
        } else {
          leNom = latex2d(nom, absNom, ordNom, {
            color,
            backgroundColor: 'white',
            letterSize,
          })
          positions.push({
            label: leNom,
            position: oneUsedPosition,
            anch: anchor,
            colision: [],
          })
        }
      }
      if (
        y1 > context.fenetreMathalea2d[1] &&
        y1 < context.fenetreMathalea2d[3]
      ) {
        // à droite
        absNom = context.fenetreMathalea2d[2] - 1
        ordNom =
          y1 -
          droite.pente * ((largeur * 0.5) / context.pixelsParCm) +
          ((droite.pente > 0 ? -1 : 1) * hauteur * 0.5) / context.pixelsParCm
        anchor = droite.pente > 0 ? 'below' : 'above'
        oneUsedPosition = 'right'
        if (
          ordNom < context.fenetreMathalea2d[1] + 1 ||
          ordNom > context.fenetreMathalea2d[3] - 1
        ) {
          if (debug)
            console.info(
              'probl:nom:' +
                nom +
                ':position:' +
                oneUsedPosition +
                (context.fenetreMathalea2d[1] + 1) +
                '<' +
                ordNom +
                '<' +
                (context.fenetreMathalea2d[3] - 1),
            )
        } else {
          leNom = latex2d(nom, absNom, ordNom, {
            color,
            backgroundColor: 'white',
            letterSize,
          })
          positions.push({
            label: leNom,
            position: oneUsedPosition,
            anch: anchor,
            colision: [],
          })
        }
      }
      if (
        x0 > context.fenetreMathalea2d[0] &&
        x0 < context.fenetreMathalea2d[2]
      ) {
        // en bas : soit à gauche ou à droite
        absNom =
          x0 +
          ((droite.pente > 0 ? -1 : 1) * largeur * 0.5) / context.pixelsParCm -
          ((droite.pente > 0 ? 1 : 1) *
            ((hauteur * 0.5) / context.pixelsParCm)) /
            droite.pente -
          ((droite.pente > 0 ? 1 : -1) * 2) / context.pixelsParCm
        ordNom = context.fenetreMathalea2d[1] + 1
        anchor = droite.pente > 0 ? 'left' : 'right'
        oneUsedPosition = 'below'
        if (
          absNom < context.fenetreMathalea2d[0] + 1 ||
          absNom > context.fenetreMathalea2d[2] - 1
        ) {
          if (debug)
            console.info(
              'problème:nom:' +
                nom +
                ':position:' +
                oneUsedPosition +
                (context.fenetreMathalea2d[0] + 1) +
                '<' +
                absNom +
                '<' +
                (context.fenetreMathalea2d[2] - 1),
            )
        } else {
          leNom = latex2d(nom, absNom, ordNom, {
            color,
            backgroundColor: 'white',
            letterSize,
          })
          positions.push({
            label: leNom,
            position: oneUsedPosition,
            anch: anchor,
            colision: [],
          })
        }
        // en bas de l'autre côté
        absNom =
          x0 -
          ((droite.pente > 0 ? -1 : 1) * largeur * 0.5) / context.pixelsParCm +
          ((droite.pente > 0 ? 1 : 1) *
            ((hauteur * 0.5) / context.pixelsParCm)) /
            droite.pente +
          ((droite.pente > 0 ? 1 : -1) * 2) / context.pixelsParCm
        ordNom = context.fenetreMathalea2d[1] + 1
        anchor = droite.pente > 0 ? 'right' : 'left'
        oneUsedPosition = 'below'
        if (
          absNom < context.fenetreMathalea2d[0] + 1 ||
          absNom > context.fenetreMathalea2d[2] - 1
        ) {
          if (debug)
            console.info(
              'problème:nom:' +
                nom +
                ':position:' +
                oneUsedPosition +
                (context.fenetreMathalea2d[0] + 1) +
                '<' +
                absNom +
                '<' +
                (context.fenetreMathalea2d[2] - 1),
            )
        } else {
          leNom = latex2d(nom, absNom, ordNom, {
            color,
            backgroundColor: 'white',
            letterSize,
          })
          positions.push({
            label: leNom,
            position: oneUsedPosition,
            anch: anchor,
            colision: [],
          })
        }
      }
      if (
        x1 > context.fenetreMathalea2d[0] &&
        x1 < context.fenetreMathalea2d[2]
      ) {
        // au haut : soit à gauche ou à droite
        absNom =
          x1 +
          ((droite.pente > 0 ? -1 : 1) * largeur * 0.5) / context.pixelsParCm -
          ((droite.pente > 0 ? 1 : 1) *
            ((hauteur * 0.5) / context.pixelsParCm)) /
            droite.pente -
          ((droite.pente > 0 ? 1 : -1) * 2) / context.pixelsParCm
        ordNom = context.fenetreMathalea2d[3] - 1
        anchor = droite.pente > 0 ? 'left' : 'right'
        oneUsedPosition = 'above'
        if (
          absNom < context.fenetreMathalea2d[0] + 1 ||
          absNom > context.fenetreMathalea2d[2] - 1
        ) {
          if (debug)
            console.info(
              'problème:nom:' +
                nom +
                ':position:' +
                oneUsedPosition +
                (context.fenetreMathalea2d[0] + 1) +
                '<' +
                absNom +
                '<' +
                (context.fenetreMathalea2d[2] - 1),
            )
        } else {
          leNom = latex2d(nom, absNom, ordNom, {
            color,
            backgroundColor: 'white',
            letterSize,
          })
          positions.push({
            label: leNom,
            position: oneUsedPosition,
            anch: anchor,
            colision: [],
          })
        }
        // au haut de l'autre côté
        absNom =
          x1 -
          ((droite.pente > 0 ? -1 : 1) * largeur * 0.5) / context.pixelsParCm +
          ((droite.pente > 0 ? 1 : 1) *
            ((hauteur * 0.5) / context.pixelsParCm)) /
            droite.pente +
          ((droite.pente > 0 ? 1 : -1) * 2) / context.pixelsParCm
        ordNom = context.fenetreMathalea2d[3] - 1
        anchor = droite.pente > 0 ? 'right' : 'left'
        oneUsedPosition = 'above'
        if (
          absNom < context.fenetreMathalea2d[0] + 1 ||
          absNom > context.fenetreMathalea2d[2] - 1
        ) {
          if (debug)
            console.info(
              'problème:nom:' +
                nom +
                ':position:' +
                oneUsedPosition +
                (context.fenetreMathalea2d[0] + 1) +
                '<' +
                absNom +
                '<' +
                (context.fenetreMathalea2d[2] - 1),
            )
        } else {
          leNom = latex2d(nom, absNom, ordNom, {
            color,
            backgroundColor: 'white',
            letterSize,
          })
          positions.push({
            label: leNom,
            position: oneUsedPosition,
            anch: anchor,
            colision: [],
          })
        }
      }
      let xgauche, xdroite
      if (
        y0 > context.fenetreMathalea2d[1] &&
        y0 < context.fenetreMathalea2d[3]
      ) {
        xgauche = context.fenetreMathalea2d[0]
      } else {
        xgauche = Math.min(x0, x1)
      }
      if (
        y1 > context.fenetreMathalea2d[1] &&
        y1 < context.fenetreMathalea2d[3]
      ) {
        xdroite = context.fenetreMathalea2d[2]
      } else {
        xdroite = Math.max(x0, x1)
      }
      // au milieu
      absNom = (xgauche + xdroite) / 2
      ordNom = pointSurDroite(droite, absNom, '').y
      anchor = droite.pente > 0 ? 'left' : 'right'
      oneUsedPosition = 'middle'
      leNom = latex2d(nom, absNom, ordNom, {
        color,
        backgroundColor: 'white',
        letterSize,
      })
      positions.push({
        label: leNom,
        position: oneUsedPosition,
        anch: anchor,
        colision: [],
      })
    }
    leNom = latex2d(nom, absNom, ordNom, {
      color,
      backgroundColor: 'white',
      letterSize,
    })

    // vérifie s'il y a des colisions entre labels
    for (let i = 0; i < positions.length; i++) {
      if (positions[i].position === 'middle') continue
      const coli: [number, boolean][] = []
      for (let j = 0; j < usedPosition.length; j++) {
        const label = usedPosition[j]
        const dis =
          segment(
            point(label.x, label.y),
            point(positions[i].label.x, positions[i].label.y),
          ).longueur * context.pixelsParCm
        // colision deux rectangles
        const XYlabel = [
          label.x * context.pixelsParCm - largeur / 2,
          label.x * context.pixelsParCm + largeur / 2,
          label.y * context.pixelsParCm - hauteur / 2,
          label.y * context.pixelsParCm + hauteur / 2,
        ]
        const XYlabel2 = [
          positions[i].label.x * context.pixelsParCm - largeur / 2,
          positions[i].label.x * context.pixelsParCm + largeur / 2,
          positions[i].label.y * context.pixelsParCm - hauteur / 2,
          positions[i].label.y * context.pixelsParCm + hauteur / 2,
        ]
        if (debug)
          console.info(
            'coli:nom:' +
              nom +
              ':position:' +
              positions[i].position +
              ':i:' +
              i +
              ':j:' +
              j +
              ':dis:' +
              dis.toFixed(2) +
              ':texte:' +
              label.latex +
              ':XYlabel:' +
              XYlabel[0].toFixed(1) +
              ',' +
              XYlabel[1].toFixed(1) +
              ',' +
              XYlabel[2].toFixed(1) +
              ',' +
              XYlabel[3].toFixed(1) +
              ':XYlabel2:' +
              XYlabel2[0].toFixed(1) +
              ',' +
              XYlabel2[1].toFixed(1) +
              ',' +
              XYlabel2[2].toFixed(1) +
              ',' +
              XYlabel2[3].toFixed(1),
          )
        const colision =
          XYlabel[0] < XYlabel2[1] &&
          XYlabel[1] > XYlabel2[0] &&
          XYlabel[2] < XYlabel2[3] &&
          XYlabel[3] > XYlabel2[2]
        // colision deux cercles
        const r0 = Math.max(largeur / 2, hauteur / 2)
        const r1 = Math.max(largeur / 2, hauteur / 2)
        let colision2 = true
        if (dis > r0 + r1 || dis < Math.abs(r0 - r1)) colision2 = false
        coli[j] = [dis, colision]
        if (debug)
          console.info(
            'coli:nom:' +
              nom +
              ':position:' +
              positions[i].position +
              ':anchor:' +
              positions[i].anch +
              ':i:' +
              i +
              ':j:' +
              j +
              ':dis:' +
              dis.toFixed(2) +
              'texte:' +
              label.latex +
              ':colision:' +
              (colision ? '1' : '0') +
              ':coli_cer:' +
              (colision2 ? '1' : '0'),
          )
      }
      positions[i].colision = [...coli]
    }
    // 1ere stratégie : la préférence de l'utilisateur
    // on vérifie seulement s'il y a une colision
    const found: [boolean, number] = [false, 0]
    for (let i = 0; i < positions.length && !found[0]; i++) {
      if (positions[i].position === 'middle') continue
      if (positions[i].position === preferedPosition) {
        found[0] = true
        for (let j = 0; j < usedPosition.length; j++) {
          if (positions[i].colision[j][1]) found[0] = false
          if (debug)
            console.info(
              '1er:nom:' +
                nom +
                ':position:' +
                positions[i].position +
                ':i:' +
                i +
                ':j:' +
                j +
                ':colision:' +
                positions[i].colision[j][1] +
                ':preferedPosition:' +
                preferedPosition,
            )
        }
        found[1] = i
      }
    }

    // 2e stratégie : le plus loin en terme de distance!
    let disMax = [0, 0, 0]
    for (
      let i = 0;
      i < positions.length && !found[0] && usedPosition.length > 0;
      i++
    ) {
      if (positions[i].position === 'middle') continue
      let dis = [1000, 0, 0]
      for (let j = 0; j < usedPosition.length; j++) {
        if (positions[i].colision[j][0] < dis[0]) {
          dis = [positions[i].colision[j][0], i, j]
          if (debug)
            console.info(
              '2e:nom:' +
                nom +
                ':position:' +
                positions[i].position +
                ':anchor:' +
                positions[i].anch +
                ':i:' +
                i +
                ':j:' +
                j +
                'dis:' +
                dis[0].toFixed(2) +
                ':colision:' +
                positions[i].colision[j][1],
            )
        }
      }
      if (dis[0] > disMax[0]) {
        disMax = dis
        if (debug)
          console.info(
            'Max 2e:nom:' +
              nom +
              ':position:' +
              positions[i].position +
              ':anchor:' +
              positions[i].anch +
              ':i:' +
              i +
              'dis:' +
              dis[0].toFixed(2),
          )
      }
    }
    let colision = false
    if (disMax[0] > 0) {
      colision = positions[disMax[1]].colision[disMax[2]][1]
      if (debug)
        console.info(
          'Max fin : 2e:nom:' +
            nom +
            ':position:' +
            positions[disMax[1]].position +
            ':anchor:' +
            positions[disMax[1]].anch +
            ':i:' +
            disMax[1] +
            ':j:' +
            disMax[2] +
            'disMax:' +
            disMax[0] +
            ':colision:' +
            positions[disMax[1]].colision[disMax[2]][1],
        )
    }
    // 1er : si préférence alors Ok sinon distance la plus loin sans chevauchement sinon la première solution si pas de comparaison sinon la dernière milieu
    leNom = found[0]
      ? positions[found[1]].label
      : disMax[0] > 0 && !colision
        ? positions[disMax[1]].label
        : positions[usedPosition.length === 0 ? 0 : positions.length - 1].label
  } else {
    leNom = vide2d()
  }
  return leNom
}

/**
 * Afin de régler le problème des noms de droites en latex qui ne peuvent se fondre dans le svg, cette fonction retourne un Array de deux objets :
 * Le premier est la droite (avec toutes ses propriétés et méthodes)
 * Le deuxième est un objet latexParCoordonnees
 * @param {Droite} d
 * @param {string} nom
 * @param {string} color
 * @returns {[Droite, LatexParCoordonnees|Vide2d]}
 */
export function droiteAvecNomLatex(d: Droite, nom: string, color = 'black') {
  // nom est un latexParCoordonnees
  d.color = colorToLatexOrHTML(color ?? 'black')
  let absNom, ordNom
  d.epaisseur = 1
  d.opacite = 1
  if (egal(d.b, 0, 0.05)) {
    // ax+c=0 x=-c/a est l'équation de la droite
    absNom = -d.c / d.a + 0.8 // l'abscisse du label est décalé de 0.8
    ordNom = context.fenetreMathalea2d[1] + 1 // l'ordonnée du label est ymin +1
  } else if (egal(d.a, 0, 0.05)) {
    // by+c=0 y=-c/b est l'équation de la droite
    absNom = context.fenetreMathalea2d[0] + 0.8 // l'abscisse du label est xmin +1
    ordNom = -d.c / d.b + 0.8 // l'ordonnée du label est décalée de 0.8
  } else {
    // a et b sont différents de 0 ax+by+c=0 est l'équation
    // y=(-a.x-c)/b est l'aquation cartésienne et x=(-by-c)/a
    const y0 = (-d.a * (context.fenetreMathalea2d[0] + 1) - d.c) / d.b
    const y1 = (-d.a * (context.fenetreMathalea2d[2] - 1) - d.c) / d.b
    const x0 = (-d.b * (context.fenetreMathalea2d[1] + 1) - d.c) / d.a
    const x1 = (-d.b * (context.fenetreMathalea2d[3] - 1) - d.c) / d.a
    if (
      y0 > context.fenetreMathalea2d[1] &&
      y0 < context.fenetreMathalea2d[3]
    ) {
      absNom = context.fenetreMathalea2d[0] + 1
      ordNom = y0 + d.pente
    } else {
      if (
        y1 > context.fenetreMathalea2d[1] &&
        y1 < context.fenetreMathalea2d[3]
      ) {
        absNom = context.fenetreMathalea2d[2] - 1
        ordNom = y1 - d.pente
      } else {
        if (
          x0 > context.fenetreMathalea2d[0] &&
          x0 < context.fenetreMathalea2d[2]
        ) {
          absNom = x0
          ordNom = context.fenetreMathalea2d[1] + Math.abs(d.pente)
        } else {
          if (
            x1 > context.fenetreMathalea2d[0] &&
            x1 < context.fenetreMathalea2d[2]
          ) {
            absNom = x1
            ordNom = context.fenetreMathalea2d[3] + d.pente
          } else {
            absNom =
              (context.fenetreMathalea2d[0] + context.fenetreMathalea2d[2]) / 2
            ordNom = pointSurDroite(d, absNom, '').y
          }
        }
      }
    }
  }
  const leNom = latex2d(nom, absNom, ordNom, {
    color,
  })
  return [d, leNom]
}

/**  Trace une droite
 * @param {Point | number} arg1 Premier point de la droite OU BIEN coefficient a de l'équation de la droite ax+by+c=0
 * @param {Point | number} arg2 Deuxième point de la droite OU BIEN coefficient b de l'équation de la droite ax+by+c=0
 * @param {string | number} arg3 Nom affiché de la droite OU BIEN coefficient c de l'équation de la droite ax+by+c=0
 * @param {string} arg4 Couleur de la droite : du type 'blue' ou du type '#f15929' OU BIEN Nom affiché de la droite si arg1 est un nombre
 * @param {string} arg5 Couleur de la droite : du type 'blue' ou du type '#f15929' si arg1 est un nombre
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {number} a Coefficient a de l'équation de la droite ax+by+c=0
 * @property {number} b Coefficient b de l'équation de la droite ax+by+c=0
 * @property {number} c Coefficient c de l'équation de la droite ax+by+c=0
 * @property {number} x1 Abscisse de arg1 (si ce point existe)
 * @property {number} y1 Ordonnée de arg1 (si ce point existe)
 * @property {number} x2 Abscisse de arg2 (si ce point existe)
 * @property {number} y2 Ordonnée de arg2 (si ce point existe)
 * @property {string} nom Nom affiché de la droite
 * @property {string} color Couleur de la droite. À associer obligatoirement à colorToLatexOrHTML().
 * @property {Vecteur} normal Vecteur normal de la droite
 * @property {Vecteur} directeur Vecteur directeur de la droite
 * @property {number} angleAvecHorizontale Valeur de l'angle orienté entre la droite et l'horizontale
 * @property {number} epaisseur
 * @property {number} pointilles
 * @property {number} opacite
 * @author Jean-Claude Lhote
 * @class
 */
// JSDOC Validee par EE Aout 2022
export class Droite extends ObjetMathalea2D {
  x1: number
  x2: number
  y1: number
  y2: number
  a: number
  b: number
  c: number
  pente: number
  angleAvecHorizontale: number
  nom: string
  normal: Vecteur
  directeur: Vecteur
  stringColor: string
  leNom?: TexteParPoint
  constructor(
    arg1: number | PointAbstrait,
    arg2: number | PointAbstrait,
    arg3?: number | string,
    arg4?: number | string,
    arg5?: string,
  ) {
    super()
    let a, b, c
    this.stringColor = 'black'

    if (arguments.length === 2) {
      if (arg1 instanceof PointAbstrait && arg2 instanceof PointAbstrait) {
        this.x1 = arg1.x
        this.x2 = arg2.x
        this.y1 = arg1.y
        this.y2 = arg2.y
      } else {
        window.notify(
          'Droite : (attendus : A et B) les arguments de sont pas des points valides',
          {
            arg1,
            arg2,
          },
        )
        this.x1 = 0
        this.x2 = 0
        this.y1 = 0
        this.y2 = 0
      }
      this.nom = ''
      this.pointilles = 0
      this.opacite = 1
      this.epaisseur = 1
      this.a = this.y1 - this.y2
      this.b = this.x2 - this.x1
      this.c = (this.x1 - this.x2) * this.y1 + (this.y2 - this.y1) * this.x1
      this.pente = NaN
    } else if (arguments.length === 3) {
      if (typeof arg1 === 'number') {
        if (isNaN(arg1) || Number.isNaN(arg2) || Number.isNaN(arg3)) {
          window.notify(
            'Droite : (attendus : a, b et c) les arguments de sont pas des nombres valides',
            {
              arg1,
              arg2,
              arg3,
            },
          )
        }

        // droite d'équation ax +by +c =0
        this.nom = ''
        this.a = Number(arg1)
        this.b = Number(arg2)
        this.c = Number(arg3)
        a = Number(arg1)
        b = Number(arg2)
        c = Number(arg3)
        if (egal(a, 0)) {
          this.x1 = 0
          this.x2 = 1
          this.y1 = -c / b
          this.y2 = -c / b
        } else if (egal(b, 0)) {
          this.y1 = 0
          this.y2 = 1
          this.x1 = -c / a
          this.x2 = -c / a
        } else {
          this.x1 = 0
          this.y1 = -c / b
          this.x2 = 1
          this.y2 = (-c - a) / b
        }
      } else {
        if (
          isNaN(arg1.x) ||
          isNaN(arg1.y) ||
          isNaN((arg2 as Point).x) ||
          isNaN((arg2 as Point).y)
        ) {
          window.notify(
            'Droite : (attendus : A, B et "nom") les arguments de sont pas des points valides',
            {
              arg1,
              arg2,
            },
          )
        }
        this.x1 = arg1.x
        this.y1 = arg1.y
        this.x2 = (arg2 as Point).x
        this.y2 = (arg2 as Point).y
        this.a = this.y1 - this.y2
        this.b = this.x2 - this.x1
        this.c = (this.x1 - this.x2) * this.y1 + (this.y2 - this.y1) * this.x1
        this.nom = String(arg3)
      }
    } else if (arguments.length === 4) {
      if (typeof arg1 === 'number') {
        if (isNaN(arg1) || Number.isNaN(arg2) || Number.isNaN(arg3)) {
          window.notify(
            'Droite : (attendus : a, b, c et "nom") les arguments de sont pas des nombres valides',
            {
              arg1,
              arg2,
              arg3,
            },
          )
        }
        this.a = Number(arg1)
        this.b = Number(arg2)
        this.c = Number(arg3)
        a = Number(arg1)
        b = Number(arg2)
        c = Number(arg3)
        this.nom = String(arg4)
        if (egal(a, 0)) {
          this.x1 = 0
          this.x2 = 1
          this.y1 = -c / b
          this.y2 = -c / b
        } else if (egal(b, 0)) {
          this.y1 = 0
          this.y2 = 1
          this.x1 = -c / a
          this.x2 = -c / a
        } else {
          this.x1 = 0
          this.y1 = -c / b
          this.x2 = 1
          this.y2 = (-c - a) / b
        }
      } else {
        if (
          isNaN(arg1.x) ||
          isNaN(arg1.y) ||
          isNaN((arg2 as Point).x) ||
          isNaN((arg2 as Point).y)
        ) {
          window.notify(
            'Droite : (attendus : A, B, "nom" et "couleur") les arguments de sont pas des points valides',
            {
              arg1,
              arg2,
            },
          )
        }
        this.x1 = arg1.x
        this.y1 = arg1.y
        this.x2 = (arg2 as Point).x
        this.y2 = (arg2 as Point).y
        this.a = this.y1 - this.y2
        this.b = this.x2 - this.x1
        this.c = (this.x1 - this.x2) * this.y1 + (this.y2 - this.y1) * this.x1
        this.nom = String(arg3)
        this.color = colorToLatexOrHTML(String(arg4))
        this.stringColor = String(arg4)
      }
    } else {
      // arguments.length === 5
      if (Number.isNaN(arg1) || Number.isNaN(arg2) || Number.isNaN(arg3)) {
        window.notify(
          'Droite : (attendus : a, b, c et "nom") les arguments de sont pas des nombres valides',
          {
            arg1,
            arg2,
            arg3,
          },
        )
      }
      this.a = Number(arg1)
      this.b = Number(arg2)
      this.c = Number(arg3)
      a = Number(arg1)
      b = Number(arg2)
      c = Number(arg3)
      this.nom = String(arg4)
      this.color = colorToLatexOrHTML(String(arg5))
      this.stringColor = String(arg5)
      if (egal(a, 0)) {
        this.x1 = 0
        this.x2 = 1
        this.y1 = -c / b
        this.y2 = -c / b
      } else if (egal(b, 0)) {
        this.y1 = 0
        this.y2 = 1
        this.x1 = -c / a
        this.x2 = -c / a
      } else {
        this.x1 = 0
        this.y1 = -c / b
        this.x2 = 1
        this.y2 = (-c - a) / b
      }
    }
    if (this.b !== 0) this.pente = -this.a / this.b
    else this.pente = NaN
    let xsav, ysav
    if (this.x1 > this.x2) {
      xsav = this.x1
      ysav = this.y1
      this.x1 = this.x2 + 0
      this.y1 = this.y2 + 0
      this.x2 = xsav
      this.y2 = ysav
    }
    // Limiter la taille des coordonnées à 2 décimales amplement suffisantes
    this.x1 = arrondi(this.x1, 2)
    this.y1 = arrondi(this.y1, 2)
    this.x2 = arrondi(this.x2, 2)
    this.y2 = arrondi(this.y2, 2)

    this.normal = vecteur(this.a, this.b)
    this.directeur = vecteur(this.b, -this.a)
    this.angleAvecHorizontale = angleOriente(
      point(1, 0),
      point(0, 0),
      point(this.directeur.x, this.directeur.y),
    )
    this.bordures = [
      Math.min(this.x1, this.x2),
      Math.min(this.y1, this.y2),
      Math.max(this.x1, this.x2),
      Math.max(this.y1, this.y2),
    ]
    let absNom: number
    let ordNom: number
    if (this.nom !== '') {
      if (egal(this.b, 0, 0.05)) {
        // ax+c=0 x=-c/a est l'équation de la droite
        absNom = -this.c / this.a + 0.8 // l'abscisse du label est décalé de 0.8
        ordNom = context.fenetreMathalea2d[1] + 1 // l'ordonnée du label est ymin +1
      } else if (egal(this.a, 0, 0.05)) {
        // by+c=0 y=-c/b est l'équation de la droite
        absNom = context.fenetreMathalea2d[0] + 0.8 // l'abscisse du label est xmin +1
        ordNom = -this.c / this.b + 0.8 // l'ordonnée du label est décalée de 0.8
      } else {
        // a et b sont différents de 0 ax+by+c=0 est l'équation
        // y=(-a.x-c)/b est l'aquation cartésienne et x=(-by-c)/a
        const y0 =
          (-this.a * (context.fenetreMathalea2d[0] + 1) - this.c) / this.b
        const y1 =
          (-this.a * (context.fenetreMathalea2d[2] - 1) - this.c) / this.b
        const x0 =
          (-this.b * (context.fenetreMathalea2d[1] + 1) - this.c) / this.a
        const x1 =
          (-this.b * (context.fenetreMathalea2d[3] - 1) - this.c) / this.a
        if (
          y0 > context.fenetreMathalea2d[1] &&
          y0 < context.fenetreMathalea2d[3]
        ) {
          absNom = context.fenetreMathalea2d[0] + 1
          ordNom = y0 + this.pente
        } else {
          if (
            y1 > context.fenetreMathalea2d[1] &&
            y1 < context.fenetreMathalea2d[3]
          ) {
            absNom = context.fenetreMathalea2d[2] - 1
            ordNom = y1 - this.pente
          } else {
            if (
              x0 > context.fenetreMathalea2d[0] &&
              x0 < context.fenetreMathalea2d[2]
            ) {
              absNom = x0
              ordNom = context.fenetreMathalea2d[1] + Math.abs(this.pente)
            } else {
              if (
                x1 > context.fenetreMathalea2d[0] &&
                x1 < context.fenetreMathalea2d[2]
              ) {
                absNom = x1
                ordNom = context.fenetreMathalea2d[3] + this.pente
              } else {
                absNom =
                  (context.fenetreMathalea2d[0] +
                    context.fenetreMathalea2d[2]) /
                  2
                ordNom = pointSurDroite(this, absNom, '').y
              }
            }
          }
        }
      }
      // if (this.nom.includes('$')) {
      //   this.leNom = latex2d(this.nom.replaceAll('$', ''), absNom, ordNom, { color: this.stringColor })
      // } else {
      this.leNom = texteParPosition(
        this.nom,
        absNom,
        ordNom,
        0,
        this.stringColor,
        1,
        'milieu',
        true,
      ) as TexteParPoint
      //  }
    }

    if (this.nom.includes('$')) {
      // On a du Latex, donc on ne peut pas utiliser droite() tel quel.
      window.notify(
        "Droite() appelé avec un nom contenant du Latex... utiliser droiteAvecNom() à la place !\nOn va retourner un array contenant la droite et un latexParCoordonnees dans un proche avenir !\nIl faut donc adapter l'exo qui a provoqué ça.\n Pour l'instant on retourne une droite sans nom.",
        { nom: this.nom },
      )
      // On retourne une droite sans nom accompagnée de son nom Latex
      // return droiteAvecNomLAtex(new Droite(point(this.x1, this.y1), point(this.x2, this.y2)), leNom)
      // @fixme la ligne suivante sera à retirer lorsque les exos concernés auront été repérés. Et la précédente à utiliser.
      return new Droite(point(this.x1, this.y1), point(this.x2, this.y2)) // On retourne une droite sans nom en attendant que quelqu'un adapte l'exo et utilise droiteAvecNom() à la place de droite.
    }
  }

  svg(coeff: number) {
    if (this.epaisseur !== 1) {
      this.style += ` stroke-width="${this.epaisseur}" `
    }
    switch (this.pointilles) {
      case 1:
        this.style += ' stroke-dasharray="6 10" '
        break
      case 2:
        this.style += ' stroke-dasharray="6 3" '
        break
      case 3:
        this.style += ' stroke-dasharray="3 2 6 2 " '
        break
      case 4:
        this.style += ' stroke-dasharray="1 2" '
        break
      case 5:
        this.style += ' stroke-dasharray="5 5" '
        break
    }
    if (this.opacite !== 1) {
      this.style += ` stroke-opacity="${this.opacite}" `
    }
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const A1 = pointSurSegment(A, B, -50)
    const B1 = pointSurSegment(B, A, -50)
    if (this.nom === '') {
      return `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${B1.xSVG(
        coeff,
      )}" y2="${B1.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style} id ="${this.id}" />`
    } else {
      return (
        `<line x1="${A1.xSVG(coeff)}" y1="${A1.ySVG(coeff)}" x2="${B1.xSVG(
          coeff,
        )}" y2="${B1.ySVG(coeff)}" stroke="${this.color[0]}" ${this.style} id ="${this.id}" />` +
        (this.leNom != null ? (this.leNom?.svg(coeff) ?? '') : '')
      )
    }
  }

  tikz() {
    const tableauOptions = []
    if (this.color[1].length > 1 && this.color[1] !== 'black') {
      tableauOptions.push(`color=${this.color[1]}`)
    }
    if (this.epaisseur !== 1) {
      tableauOptions.push(`line width = ${this.epaisseur}`)
    }
    switch (this.pointilles) {
      case 1:
        tableauOptions.push(' dash dot ')
        break
      case 2:
        tableauOptions.push(' densely dash dot dot ')
        break
      case 3:
        tableauOptions.push(' dash dot dot ')
        break
      case 4:
        tableauOptions.push(' dotted ')
        break
      case 5:
        tableauOptions.push(' dashed ')
        break
    }

    if (this.opacite !== 1) {
      tableauOptions.push(`opacity = ${this.opacite}`)
    }

    let optionsDraw = ''
    if (tableauOptions.length > 0) {
      optionsDraw = '[' + tableauOptions.join(',') + ']'
    }
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const A1 = pointSurSegment(A, B, -50)
    const B1 = pointSurSegment(B, A, -50)

    if (this.nom !== '') {
      return (
        `\\draw${optionsDraw} (${A1.x},${A1.y})--(${B1.x},${B1.y});` +
        (this.leNom != null ? (this.leNom?.tikz() ?? '') : '')
      )
    } else {
      return `\\draw${optionsDraw} (${A1.x},${A1.y})--(${B1.x},${B1.y});`
    }
  }

  svgml(coeff: number, amp: number) {
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const A1 = pointSurSegment(A, B, -50)
    const B1 = pointSurSegment(B, A, -50)
    const s = segment(A1, B1, this.color[0])
    return s.svgml(coeff, amp)
  }

  tikzml(amp: number) {
    const A = point(this.x1, this.y1)
    const B = point(this.x2, this.y2)
    const A1 = pointSurSegment(A, B, -50)
    const B1 = pointSurSegment(B, A, -50)
    const s = segment(A1, B1, this.color[1])
    return s.tikzml(amp)
  }
}

/**  Trace une droite définie par 2 points OU BIEN par les coefficients de son équation
 * @property {number} epaisseur
 * @param {PointAbstrait | number} arg1 Premier point de la droite OU BIEN coefficient a de l'équation de la droite ax+by+c=0 avec (a,b)!=(0,0)
 * @param {PointAbstrait | number} arg2 Deuxième point de la droite OU BIEN coefficient b de l'équation de la droite ax+by+c=0 avec (a,b)!=(0,0)
 * @param {string | number} arg3 Nom affiché de la droite OU BIEN coefficient c de l'équation de la droite ax+by+c=0
 * @param {string} arg4 Couleur de la droite : du type 'blue' ou du type '#f15929' OU BIEN nom affiché de la droite si arg1 est un nombre
 * @param {string} arg5 Couleur de la droite : du type 'blue' ou du type '#f15929' si arg1 est un nombre
 * @example droite(M, N, '(d1)') // Trace la droite passant par M et N se nommant (d1) et de couleur noire
 * @example droite(M, N, '(d1)','blue') // Trace la droite passant par M et N se nommant (d1) et de couleur bleue
 * @example droite(m, n, p) // Trace la droite définie par les coefficients de mx+ny+p=0 et de couleur noire
 * @example droite(m, n, p, '(d1)', 'red') // Trace la droite définie par les coefficients de mx+ny+p=0, se nommant (d1) et de couleur rouge
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
export function droite(
  arg1: number | PointAbstrait,
  arg2: number | PointAbstrait,
  arg3?: number | string,
  arg4?: number | string,
  arg5?: string,
) {
  if (arguments.length === 2) return new Droite(arg1, arg2)
  if (arguments.length === 3) return new Droite(arg1, arg2, arg3)
  if (arguments.length === 4) return new Droite(arg1, arg2, arg3, arg4)
  return new Droite(arg1, arg2, arg3, arg4, arg5)
}

/**  Donne la position du point A par rapport à la droite d
 * @param {Droite} d
 * @param {Point} A
 * @param {number} [tolerance = 0.0001] Seuil de tolérance pour évaluer la proximité entre d et A.
 * @example dessousDessus(d1, M) // Renvoie la position de M par rapport à d1 parmi ces 5 possibilités : 'sur', 'droite', 'gauche', 'dessous', 'dessus'
 * @example dessousDessus(d1, M, 0.005) // Renvoie la position de M par rapport à d1 parmi ces 5 possibilités : 'sur', 'droite', 'gauche', 'dessous', 'dessus' (avec une tolérance de 0,005)
 * @return {'sur' | 'droite' | 'gauche' | 'dessous' | 'dessus'}
 */
// JSDOC Validee par EE Aout 2022

export function dessousDessus(d: Droite, A: Point, tolerance = 0.0001) {
  if (egal(d.a * A.x + d.b * A.y + d.c, 0, tolerance)) return 'sur'
  if (egal(d.b, 0)) {
    if (A.x < -d.c / d.a) return 'gauche'
    else return 'droite'
  } else {
    if (d.a * A.x + d.b * A.y + d.c < 0) return 'dessous'
    else return 'dessus'
  }
}

/**
 *
 * @param {Droite} d
 * @param {object} param1 les bordures de la fenêtre
 * @param {number} param1.xmin
 * @param {number} param1.xmax
 * @param {number} param1.ymin
 * @param {number} param1.ymax
 * @return {Point} le point qui servira à placer le label.
 */
export function positionLabelDroite(
  d: Droite,
  { xmin = 0, ymin = 0, xmax = 10, ymax = 10 },
) {
  let xLab, yLab
  let fXmax, fYmax, fXmin, fYmin
  if (d.b === 0) {
    // Si la droite est verticale son équation est x = -d.c/d.a on choisit un label au Nord.
    xLab = -d.b / d.c - 0.5
    yLab = ymax - 0.5
  } else {
    // la droite n'étant pas verticale, on peut chercher ses intersections avec les différents bords.
    const f = (x: number) => (-d.c - d.a * x) / d.b
    fXmax = f(xmax)
    if (fXmax <= ymax && fXmax >= ymin) {
      // la droite coupe le bord Est entre ymin+1 et ymax-1
      xLab = xmax - 0.8
      yLab = f(xLab)
    } else {
      fXmin = f(xmin)
      if (fXmin <= ymax && fXmin >= ymin) {
        xLab = xmin + 0.8
        yLab = f(xLab)
      } else {
        // la droite ne coupe ni la bordue Est ni la bordure Ouest elle coupe donc les bordures Nord et Sud
        const g = (y: number) => (-d.c - d.b * y) / d.a
        fYmax = g(ymax)
        if (fYmax <= xmax && fYmax >= xmin) {
          yLab = ymax - 0.8
          xLab = g(yLab)
        } else {
          fYmin = g(ymin)
          if (fYmin <= xmax && fYmin >= xmin) {
            yLab = ymin + 0.8
            xLab = g(yLab)
          } else {
            // La droite ne passe pas dans la fenêtre on retourne un objet vide
            return vide2d()
          }
        }
      }
    }
  }
  const position = translation(
    point(xLab, yLab),
    homothetie(
      vecteur(d.a, d.b),
      point(0, 0),
      0.5 / norme(vecteur(d.a, d.b)),
    ) as Vecteur,
  )
  return position
}

/**  Trace la droite passant par le point A et de vecteur directeur v
 * @param {PointAbstrait} A Point de la droite
 * @param {Vecteur} v Vecteur directeur de la droite
 * @param {string} [nom = ''] Nom affiché de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteParPointEtVecteur(M, v1) // Trace la droite passant par le point M et de vecteur directeur v1
 * @example droiteParPointEtVecteur(M, v1, 'd1', 'red') // Trace, en rouge, la droite d1 passant par le point M et de vecteur directeur v1
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function droiteParPointEtVecteur(
  A: PointAbstrait,
  v: Vecteur,
  nom = '',
  color = 'black',
) {
  const B = point(A.x + v.x, A.y + v.y)
  return new Droite(A, B, nom, color)
}

/**  Trace la droite parallèle à d passant par le point A
 * @param {PointAbstrait} A Point de la droite
 * @param {Droite} d Droite
 * @param {string} [nom = ''] Nom affiché de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteParPointEtParallele(M, d2) // Trace la droite parallèle à d2 passant par le point M
 * @example droiteParPointEtParallele(M, d2, 'd1', 'red') // Trace, en rouge, la droite d1 parallèle à d2 passant par le point M
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function droiteParPointEtParallele(
  A: PointAbstrait,
  d: Droite,
  nom = '',
  color = 'black',
) {
  return droiteParPointEtVecteur(A, d.directeur, nom, color)
}

/**  Trace la droite perpendiculaire à d passant par le point A
 * @param {PointAbstrait} A Point de la droite
 * @param {Droite} d Droite
 * @param {string} [nom = ''] Nom affiché de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteParPointEtPerpendiculaire(M, d2) // Trace la droite perpendiculaire à d2 passant par le point M
 * @example droiteParPointEtPerpendiculaire(M, d2, 'd1', 'red') // Trace, en rouge, la droite d1 perpendiculaire à d2 passant par le point M
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function droiteParPointEtPerpendiculaire(
  A: PointAbstrait,
  d: Droite,
  nom = '',
  color = 'black',
) {
  return droiteParPointEtVecteur(A, d.normal, nom, color)
}

/**  Trace la droite horizontale passant par le point A
 * @param {Point} A Point de la droite
 * @param {string} [nom = ''] Nom affiché de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteHorizontaleParPoint(M) // Trace la droite horizontale passant par le point M
 * @example droiteHorizontaleParPoint(M, 'd1', 'red') // Trace, en rouge, la droite horizontale d1 passant par le point M
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function droiteHorizontaleParPoint(A: Point, nom = '', color = 'black') {
  return droiteParPointEtPente(A, 0, nom, color)
}

/**  Trace la droite verticale passant par le point A
 * @param {Point} A Point de la droite
 * @param {string} [nom = ''] Nom affiché de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteVerticaleParPoint(M) // Trace la droite verticale passant par le point M
 * @example droiteVerticaleParPoint(M, 'd1', 'red') // Trace, en rouge, la droite verticale d1 passant par le point M
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function droiteVerticaleParPoint(A: Point, nom = '', color = 'black') {
  return droiteParPointEtVecteur(A, vecteur(0, 1), nom, color)
}

/**  Trace la droite passant par le point A et de pente k
 * @param {Point} A Point de la droite
 * @param {number} k Pente de la droite
 * @param {string} [nom = ''] Nom affiché de la droite
 * @param {string} [color = 'black'] Couleur de la droite : du type 'blue' ou du type '#f15929'
 * @example droiteParPointEtPente(M, p) // Trace la droite passant par le point M et de pente p
 * @example droiteParPointEtPente(M, p, 'd1', 'red') // Trace, en rouge, la droite d1 passant par le point M et de pente p
 * @author Jean-Claude Lhote
 * @return {Droite}
 */
// JSDOC Validee par EE Aout 2022
export function droiteParPointEtPente(
  A: Point,
  k: number,
  nom = '',
  color = 'black',
) {
  const B = point(A.x + 1, A.y + k)
  return new Droite(A, B, nom, color)
}

/**
 * Trace la médiatrice d'un segment, en laissant éventuellement apparents les traits de construction au compas
 * @param {PointAbstrait} A Première extrémité du segment
 * @param {PointAbstrait} B Seconde extrémité du segment
 * @param {string} [nom = ''] Nom affiché de la droite
 * @param {string} [couleurMediatrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'
 * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [couleurConstruction = 'black'] Couleur des traits de construction : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [construction = false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
 * @param {boolean} [detail = false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
 * @param {string} [markmilieu = 'x'] Symbole posé sur les deux parties du segment
 * @param {string} [markrayons = '||'] Symbole posé sur les quatre rayons (si détail est true)
 * @param {number} [epaisseurMediatrice = 1] Epaisseur de la médiatrice
 * @param {number} [opaciteMediatrice = 1] Taux d'opacité de la médiatrice
 * @param {number} [pointillesMediatrice = 0] Si cette valeur est entre 1 et 5, la médiatrice est en pointillés
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} svgml Sortie, à main levée, au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} tikzml Sortie, à main levée, au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurMediatrice Couleur de la médiatrice : du type 'blue' ou du type '#f15929'
 * @property {number} epaisseurMediatrice Epaisseur de la médiatrice
 * @property {number} opaciteMediatrice Taux d'opacité de la médiatrice
 * @property {number} pointillesMediatrice Si cette valeur est entre 1 et 5, la médiatrice est en pointillés
 * @property {string} couleurConstruction Couleur des traits de construction : du type 'blue' ou du type '#f15929'.
 * @return {Mediatrice|Droite}
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class Mediatrice extends ObjetMathalea2D {
  couleurMediatrice?: string
  epaisseurMediatrice?: number
  opaciteMediatrice?: number
  pointillesMediatrice?: number
  couleurConstruction?: string

  constructor(
    A: PointAbstrait,
    B: PointAbstrait,
    nom = '',
    couleurMediatrice = 'red',
    color = 'blue',
    couleurConstruction = 'black',
    construction = false,
    detail = false,
    markmilieu = '×',
    markrayons = '||',
    epaisseurMediatrice = 1,
    opaciteMediatrice = 1,
    pointillesMediatrice = 0,
  ) {
    super()
    const O = milieu(A, B)
    const m = rotation(A, O, 90)
    const n = rotation(A, O, -90)
    const M = pointSurSegment(O, m, longueur(A, B) * 0.785)
    const N = pointSurSegment(O, n, longueur(A, B) * 0.785)
    const d = new Droite(M, N, nom, couleurMediatrice)
    if (arguments.length < 5) {
      // Si on n'a que 2 arguments, on retourne juste une Droite
      this.color = colorToLatexOrHTML(couleurMediatrice)
      this.pointilles = pointillesMediatrice
      this.opacite = opaciteMediatrice
      this.epaisseur = epaisseurMediatrice
      return d // Si il n'y a pas s'objets supplémentaires, il faut créer un objet Droite
    } else {
      if (longueur(A, B) < 0.1) {
        window.notify(
          'ConstructionMediatrice : Points trop rapprochés pour créer cet objet',
          {
            A,
            B,
          },
        )
      }
      this.color = colorToLatexOrHTML(color)
      this.couleurMediatrice = couleurMediatrice
      this.epaisseurMediatrice = epaisseurMediatrice
      this.opaciteMediatrice = opaciteMediatrice
      this.pointillesMediatrice = pointillesMediatrice
      this.couleurConstruction = couleurConstruction
      this.epaisseur = 1
      d.epaisseur = this.epaisseurMediatrice
      d.opacite = this.opaciteMediatrice
      d.pointilles = this.pointillesMediatrice
      if (!construction && !detail) return d // Si il n'y a pas s'objets supplémentaires, il faut créer un objet Droite
      this.objets = [d]
      if (construction) {
        const arcm1 = traceCompas(A, M, 20, this.couleurConstruction)
        const arcm2 = traceCompas(B, M, 20, this.couleurConstruction)
        const arcn1 = traceCompas(A, N, 20, this.couleurConstruction)
        const arcn2 = traceCompas(B, N, 20, this.couleurConstruction)
        const codage = codageMediatrice(
          A,
          B,
          this.couleurMediatrice,
          markmilieu,
        )
        this.objets.push(arcm1, arcm2, arcn1, arcn2, d, codage)
      }
      if (detail) {
        const sAM = segment(A, M, this.couleurConstruction)
        sAM.pointilles = 5
        const sBM = segment(B, M, this.couleurConstruction)
        sBM.pointilles = 5
        const sAN = segment(A, N, this.couleurConstruction)
        sAN.pointilles = 5
        const sBN = segment(B, N, this.couleurConstruction)
        sBN.pointilles = 5
        const codes = codageSegments(
          markrayons,
          this.couleurConstruction,
          A,
          M,
          B,
          M,
          A,
          N,
          B,
          N,
        )
        this.objets.push(sAM, sBM, sAN, sBN, codes)
      }
    }
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    code = `<g id="${this.id}">${code}</g>`
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }

  svgml(coeff: number, amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (typeof objet.svgml === 'undefined') code += '\n\t' + objet.svg(coeff)
      else code += '\n\t' + objet.svgml(coeff, amp)
    }
    return code
  }

  tikzml(amp: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      if (typeof objet.tikzml === 'undefined') code += '\n\t' + objet.tikz()
      else code += '\n\t' + objet.tikzml(amp)
    }
    return code
  }
}

/**
 * Trace la médiatrice d'un segment, en laissant éventuellement apparents les traits de construction au compas
 * @param {Point} A Première extrémité du segment
 * @param {Point} B Seconde extrémité du segment
 * @param {string} [nom=''] Nom affiché de la droite
 * @param {string} [couleurMediatrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'
 * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [couleurConstruction='black'] Couleur des traits de construction : du type 'blue' ou du type '#f15929'.
 * @param {boolean} [construction=false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
 * @param {boolean} [detail=false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
 * @param {string} [markmilieu='x'] Symbole posé sur les deux parties du segment
 * @param {string} [markrayons='||'] Symbole posé sur les quatre rayons (si détail est true)
 * @param {number} [epaisseurMediatrice = 1] Epaisseur de la médiatrice
 * @param {number} [opaciteMediatrice = 1] Taux d'opacité de la médiatrice
 * @param {number} [pointillesMediatrice = 0] Si cette valeur est entre 1 et 5, la médiatrice est en pointillés
 * @example mediatrice(M,N)
 * // Trace, en rouge, la médiatrice du segment[MN], d'épaisseur 1, avec une opacité de 100 % sans autre option
 * @example mediatrice(M,N,'d','blue')
 * // Trace, en bleu, la médiatrice du segment[MN], d'épaisseur 1, avec une opacité de 100 % et qui s'appelle 'd'
 * @example mediatrice(M,N,'','blue','red','green',true,true,'OO','XX',2,0.5,3)
 * // Trace, en bleu, la médiatrice du segment[MN], d'épaisseur 2, avec une opacité de 50 % sans nom
 * // Les traits de construction sont dessinés en vert avec la marque 'OO' pour le segment initial et la marque 'XX' pour les rayons, toutes ces marques étant rouge.
 * @author Rémi Angot {amendée par Eric Elter en juin 2022}
 * @return {Mediatrice|Droite}
 */
// JSDOC Validee par EE Juin 2022
export function mediatrice(
  A: PointAbstrait,
  B: PointAbstrait,
  nom = '',
  couleurMediatrice = 'red',
  color = 'blue',
  couleurConstruction = 'black',
  construction = false,
  detail = false,
  markmilieu = '×',
  markrayons = '||',
  epaisseurMediatrice = 1,
  opaciteMediatrice = 1,
  pointillesMediatrice = 0,
) {
  if (arguments.length < 5) return new Mediatrice(A, B, nom, couleurMediatrice)
  else
    return new Mediatrice(
      A,
      B,
      nom,
      couleurMediatrice,
      color,
      couleurConstruction,
      construction,
      detail,
      markmilieu,
      markrayons,
      epaisseurMediatrice,
      opaciteMediatrice,
      pointillesMediatrice,
    )
}

/**
 * Trace la bissectrice d'un angle, en laissant éventuellement apparents les traits de construction au compas
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {Point} B Point sur l'autre côté de l'angle
 * @param {string} [couleurBissectrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'. Si 'none' ou '', pas de hachures.
 * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [couleurConstruction = 'black'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929'. Si 'none' ou '', pas de hachures.
 * @param {boolean} [construction=false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
 * @param {boolean} [detail=false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
 * @param {string} [mark='×'] Symbole posé sur les arcs
 * @param {number} [tailleLosange = 5] Longueur d'un côté du losange de construction
 * @param {number} [epaisseurBissectrice = 1] Epaisseur de la bissectrice
 * @param {number} [opaciteBissectrice = 1] Taux d'opacité de la bissectrice
 * @param {number} [pointillesBissectrice = 0] Si cette valeur est entre 1 et 5, la bissectrice est en pointillés
 * @property {string} svg Sortie au format vectoriel (SVG) que l’on peut afficher dans un navigateur
 * @property {string} tikz Sortie au format TikZ que l’on peut utiliser dans un fichier LaTeX
 * @property {string} couleurBissectrice Couleur de la médiatrice : du type 'blue' ou du type '#f15929'. Si 'none' ou '', pas de hachures.
 * @property {string} color Couleur du codage. À associer obligatoirement à colorToLatexOrHTML().
 * @property {string} couleurConstruction Couleur de la médiatrice. À associer obligatoirement à colorToLatexOrHTML(). Si 'none' ou '', pas de hachures.
 * @property {string} mark Symbole posé sur les arcs
 * @property {number} tailleLosange Longueur d'un côté du losange de construction
 * @property {number} epaisseurBissectrice Epaisseur de la bissectrice
 * @property {number} opaciteBissectrice Taux d'opacité de la bissectrice
 * @property {number} pointillesBissectrice Si cette valeur est entre 1 et 5, la bissectrice est en pointillés
 * @author Rémi Angot (amendée par Eric Elter en juin 2022)
 * @class
 */
// JSDOC Validee par EE Juin 2022
export class Bissectrice extends DemiDroite {
  tailleLosange?: number
  mark?: string
  couleurBissectrice?: string
  epaisseurBissectrice?: number
  opaciteBissectrice?: number
  pointillesBissectrice?: number
  couleurConstruction?: string

  constructor(
    A: PointAbstrait,
    O: PointAbstrait,
    B: PointAbstrait,
    couleurBissectrice = 'red',
    color = 'blue',
    couleurConstruction = 'black',
    construction = false,
    detail = false,
    mark = '×',
    tailleLosange = 5,
    epaisseurBissectrice = 1,
    opaciteBissectrice = 1,
    pointillesBissectrice = 0,
  ) {
    const demiangle = angleOriente(A, O, B) / 2
    const m = pointSurSegment(O, A, 3)
    const X = rotation(m, O, demiangle)
    super(O, X, couleurBissectrice)
    this.color = colorToLatexOrHTML(color)
    this.tailleLosange = tailleLosange
    this.mark = mark
    this.couleurBissectrice = couleurBissectrice
    this.epaisseurBissectrice = epaisseurBissectrice
    this.couleurConstruction = couleurConstruction
    this.opaciteBissectrice = opaciteBissectrice
    this.pointillesBissectrice = pointillesBissectrice
    if (longueur(A, O) < 0.001 || longueur(O, B) < 0.001)
      window.notify('Bissectrice : points confondus', { A, O, B })
    // Construction de la bissectrice
    const d = demiDroite(O, X, couleurBissectrice)
    d.epaisseur = epaisseurBissectrice
    d.opacite = opaciteBissectrice
    d.pointilles = pointillesBissectrice
    this.objets = [d]
    const M = pointSurSegment(O, A, this.tailleLosange)
    const N = pointSurSegment(O, B, this.tailleLosange)
    const dMN = droite(M, N)
    const P = symetrieAxiale(O, dMN) as Point
    if (construction || detail) {
      if (!M.estSur(segment(O, A))) {
        const sOM = segment(O, M, this.couleurConstruction)
        this.objets.push(sOM)
      }
      if (!N.estSur(segment(O, B))) {
        const sON = segment(O, N, this.couleurConstruction)
        this.objets.push(sON)
      }
      if (construction) {
        const codage = codageBissectrice(A, O, B, color, mark)
        const tNP = traceCompas(N, P, 20, this.couleurConstruction)
        const tMP = traceCompas(M, P, 20, this.couleurConstruction)
        const tOM = traceCompas(O, M, 20, this.couleurConstruction)
        const tON = traceCompas(O, N, 20, this.couleurConstruction)
        this.objets.push(codage, tNP, tMP, tOM, tON)
      }
      if (detail) {
        const sMP = segment(M, P, this.couleurConstruction)
        const sNP = segment(N, P, this.couleurConstruction)
        sMP.pointilles = 5
        sNP.pointilles = 5
        const codes = codageSegments(this.mark, color, O, M, M, P, O, N, N, P)
        this.objets.push(sMP, sNP, codes)
      }
    }
  }

  svg(coeff: number) {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.svg(coeff)
    }
    return code
  }

  tikz() {
    let code = ''
    if (this.objets == null) return code
    for (const objet of this.objets) {
      code += '\n\t' + objet.tikz()
    }
    return code
  }
}

/**
 * Trace la bissectrice d'un angle, en laissant éventuellement apparents les traits de construction au compas
 * @param {Point} A Point sur un côté de l'angle
 * @param {Point} O Sommet de l'angle
 * @param {Point} B Point sur l'autre côté de l'angle
 * @param {string} [couleurBissectrice = 'red'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929' Si 'none' ou '', pas de hachures.
 * @param {string} [color='blue'] Couleur du codage : du type 'blue' ou du type '#f15929'.
 * @param {string} [couleurConstruction = 'black'] Couleur de la médiatrice : du type 'blue' ou du type '#f15929' Si 'none' ou '', pas de hachures.
 * @param {boolean} [construction=false] Si construction est true, alors on affiche le codage et aussi les coups de compas utiles à la construction.
 * @param {boolean} [detail=false] Si detail est true, alors on affiche aussi en pointillés les rayons utiles à la construction.
 * @param {string} [mark='×'] Symbole posé sur les arcs
 * @param {number} [tailleLosange = 5] Longueur d'un côté du losange de construction
 * @param {number} [epaisseurBissectrice = 1] Epaisseur de la bissectrice
 * @param {number} [opaciteBissectrice = 1] Taux d'opacité de la bissectrice
 * @param {number} [pointillesBissectrice = 0] Si cette valeur est entre 1 et 5, la bissectrice est en pointillés
 * @example bissectrice(N,R,J)
 * // Trace, en rouge, la bissectrice de l'angle NRJ, d'épaisseur 1 et d'opacité 100 %, sans autre option
 * @example bissectrice(N,R,J,'blue')
 * // Trace, en bleu, la bissectrice de l'angle NRJ, d'épaisseur 1 et d'opacité 100 %, sans autre option
 * @example bissectrice(N,R,J,'blue','red','green',true,true,'||',6,2,0.5,3)
 * // Trace, en rouge, la bissectrice de l'angle NRJ, d'épaisseur 1 et d'opacité 100 %. Les traits de construction sont dessinés en vert avec les marques '||' en rouge.
 * @author Rémi Angot (amendée par Eric Elter en juin 2022)
 * @return {Bissectrice}
 */
// JSDOC Validee par EE Juin 2022
export function bissectrice(
  A: Point | PointAbstrait,
  O: Point | PointAbstrait,
  B: Point | PointAbstrait,
  couleurBissectrice = 'red',
  color = 'blue',
  couleurConstruction = 'black',
  construction = false,
  detail = false,
  mark = '×',
  tailleLosange = 5,
  epaisseurBissectrice = 1,
  opaciteBissectrice = 1,
  pointillesBissectrice = 0,
) {
  return new Bissectrice(
    A,
    O,
    B,
    couleurBissectrice,
    color,
    couleurConstruction,
    construction,
    detail,
    mark,
    tailleLosange,
    epaisseurBissectrice,
    opaciteBissectrice,
    pointillesBissectrice,
  )
}

/**  Donne la distance entre le point A et la droite d
 * @param {Point} A
 * @param {Droite} d
 * @example distancePointDroite (M, d1) // Retourne la distance entre le point M et la droite d1
 * @author Jean-Claude Lhote
 * @return {number}
 */
// JSDOC Validee par EE Aout 2022
export function distancePointDroite(A: PointAbstrait, d: Droite) {
  const M = projectionOrtho(A, d)
  return longueur(A, M, 9)
}
