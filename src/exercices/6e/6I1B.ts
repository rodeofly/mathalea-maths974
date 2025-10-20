import { point } from '../../lib/2d/points'
import { polygone } from '../../lib/2d/polygones'
import { grille } from '../../lib/2d/reperes'
import { texteParPosition } from '../../lib/2d/textes'
import { choice } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import {
  mathalea2d,
  colorToLatexOrHTML,
  ObjetMathalea2D,
} from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu } from '../../modules/outils'
import { lettreDepuisChiffre, numAlphaNum } from '../../lib/outils/outilString'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { texteSansCasseCompare } from '../../lib/interactif/comparisonFunctions'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'

export const amcReady = true
export const amcType = 'AMCOpen'
export const titre = 'Programmer des déplacements absolus (Scratch)'
export const dateDeModifImportante = '09/06/2025'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * * Colorier le déplacement d'un lutin
 * @author Erwan Duplessy // (Ajout paramètre 3 par EE)
 * Ajout AMC : Janvier 2022 par EE
 * Ajout interactivité : Juin 2025 par Guillaume Valmont
 */
export const uuid = 'c8fe9'

export const refs = {
  'fr-fr': ['6I1B'],
  'fr-2016': ['6I10'],
  'fr-ch': [],
}
export default class ColorierDeplacement extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      "Nombre d'instructions de déplacements",
      3,
      '1 : 3 instructions\n2 : 4 instructions\n3 : 5 instructions',
    ]
    this.besoinFormulaire2CaseACocher = ['Avec une boucle']
    this.besoinFormulaire3CaseACocher = ['Sans retour sur ses pas']
    this.typeExercice = 'Scratch'
    this.sup = 1 // nombre de commandes = this.sup + 2
    this.sup2 = false // 1 : sans boucle ; true : avec boucle
    this.sup3 = false
    this.nbQuestions = 1
    this.nbQuestionsModifiable = false

    this.consigne = 'Dans le quadrillage, effectuer le programme.'

    this.nbQuestionsModifiable = false
    context.isHtml ? (this.spacing = 2) : (this.spacing = 1)
    context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
  }

  nouvelleVersion() {
    function scratchblocksTikz(codeSvg: string, codeTikz: string) {
      // c'est une ancienne façon de faire. Maintenant il existe une fonction scratchblock() qui effectue la conversion scratch Latex -> scratchblock
      if (context.isHtml) {
        return codeSvg
      } else {
        return codeTikz
      }
    }

    let texte = '' // texte de l'énoncé
    let texteCorr = '' // texte du corrigé
    let codeTikz = '' // code pour dessiner les blocs en tikz
    let codeSvg = '' // code pour dessiner les blocs en svg
    const nbCommandes = this.sup + 2 // nombre de commandes de déplacement dans un script
    let nbRepetition = 1 // Nombre de fois où la boucle est répétée.
    if (this.sup2) {
      nbRepetition = 3
    }
    let positionApresPremierDeplacement = 'A1'
    let positionApresDernierDeplacement = 'A1'
    // 0 : gauche, 1 : droite, 2 : haut, 3 : bas, 4 : colorier.
    const mvtOppose = [1, 0, 3, 2, 4]
    const lstCommandesTikz = [
      '\\blockmove{Aller à gauche}',
      '\\blockmove{Aller à droite}',
      '\\blockmove{Aller en haut}',
      '\\blockmove{Aller en bas}',
      '\\blockmove{Colorier la case}',
    ]
    const lstCommandesSVG = [
      'Aller à gauche :: motion stack',
      'Aller à droite :: motion stack',
      'Aller en haut :: motion stack',
      'Aller en bas :: motion stack',
      'Colorier',
    ]
    const lstAjoutXY = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
      [0, 0],
    ]
    codeTikz += '\\medskip \\begin{scratch}[print,fill blocks] <br>'
    codeSvg += "<pre class='blocks'>"
    let n = 0 // variable temporaire pour stocker le numéro de la commande
    const lstNumCommande = [] // liste des commandes successives
    const lstX = [0] // liste des abscisses successives
    const lstY = [0] // liste des ordonnées successives
    if (this.sup2) {
      codeSvg += `répéter (${nbRepetition}) fois <br>`
      codeTikz += `\\blockrepeat{répéter \\ovalnum{${nbRepetition}} fois} {`
    }
    n = 4
    for (let i = 0; i < nbCommandes; i++) {
      n = this.sup3
        ? choice([0, 1, 2, 3], [mvtOppose[n]])
        : choice([0, 1, 2, 3]) // choix d'un déplacement
      codeTikz += lstCommandesTikz[n] // ajout d'un déplacement
      codeSvg += lstCommandesSVG[n] + '<br>' // ajout d'un déplacement
      codeTikz += lstCommandesTikz[4] // ajout de l'instruction "Colorier"
      codeSvg += lstCommandesSVG[4] + '<br>' // ajout de l'instruction "Colorier"
      lstNumCommande.push(n) // ajout d'un déplacement
      lstNumCommande.push(4) // ajout de l'instruction "Colorier"
      lstX.push(lstX[lstX.length - 1] + lstAjoutXY[n][0]) // calcul de la nouvelle abscisse
      lstY.push(lstY[lstY.length - 1] + lstAjoutXY[n][1]) // calcul de la nouvelle ordonnée
    }
    for (let j = 0; j < nbRepetition - 1; j++) {
      for (let i = 0; i < 2 * nbCommandes; i++) {
        lstX.push(lstX[lstX.length - 1] + lstAjoutXY[lstNumCommande[i]][0])
        lstY.push(lstY[lstY.length - 1] + lstAjoutXY[lstNumCommande[i]][1])
      }
    }
    if (this.sup2) {
      codeSvg += 'fin <br>'
      codeTikz += '}'
    }
    codeSvg += '</pre>'
    codeTikz += '\\end{scratch}'

    const xLutinMin = Math.min(...lstX)
    const xLutinMax = Math.max(...lstX)
    const yLutinMin = Math.min(...lstY)
    const yLutinMax = Math.max(...lstY)

    if (context.isHtml) {
      texte += '<table style="width: 100%"><tr><td>'
    } else {
      texte += '\\begin{minipage}[t]{.25\\textwidth}'
    }

    texte += scratchblocksTikz(codeSvg, codeTikz)

    if (context.isHtml) {
      texte += '</td><td>'
      texte += '             '
      texte += '</td><td style="vertical-align: top; text-align: center">'
    } else {
      texte += '\\end{minipage} '
      texte += '\\hfill \\begin{minipage}[t]{.74\\textwidth}'
    }

    const xGrilleMin = xLutinMin - 1
    const xGrilleMax = xLutinMax + 2
    const yGrilleMin = yLutinMin - 2
    const yGrilleMax = yLutinMax + 1

    const r2 = grille(
      xGrilleMin,
      yGrilleMin,
      xGrilleMax,
      yGrilleMax,
      'black',
      0.8,
      1,
    )
    const lstObjet: ObjetMathalea2D[] = [r2] // liste de tous les objets Mathalea2d

    let p // carré gris représentant le lutin en position de départ
    p = polygone(
      point(lstX[0], lstY[0]),
      point(lstX[0] + 1, lstY[0]),
      point(lstX[0] + 1, lstY[0] - 1),
      point(lstX[0], lstY[0] - 1),
    )
    p.opacite = 0.5
    p.couleurDeRemplissage = colorToLatexOrHTML('black')
    p.opaciteDeRemplissage = 0.5
    p.epaisseur = 0
    lstObjet.push(p)
    let txt = '' // variable temporaire
    for (let j = 0; j < xGrilleMax - xGrilleMin; j++) {
      txt = lettreDepuisChiffre(j + 1) // ascii 65 = A
      lstObjet.push(
        texteParPosition(
          txt,
          xGrilleMin + j + 0.5,
          yGrilleMax + 0.5,
          0,
          'black',
          1,
        ),
      ) // affiche de A à J... en haut de la grille
    }
    for (let i = 0; i < yGrilleMax - yGrilleMin; i++) {
      lstObjet.push(
        texteParPosition(
          String(i + 1),
          xGrilleMin - 0.25,
          yGrilleMax - i - 0.5,
          0,
          'black',
          1,
          'droite',
        ),
      ) // affiche de 0 à 9... à gauche de la grille
    }
    const mathalea2dEnonce = mathalea2d(
      {
        xmin: xGrilleMin - 3,
        xmax: xGrilleMax + 1,
        ymin: yGrilleMin - 1,
        ymax: yGrilleMax + 1,
        pixelsParCm: 20,
        scale: 0.5,
      },
      lstObjet,
    )

    // CORRECTION
    // 0 : gauche, 1 : droite, 2 : haut, 3 : bas, 4 : colorier.
    let xLutin = 0 // position initiale du carré
    let yLutin = 0 // position initiale du carré
    const couleur = 'red'

    // on fait un dessin par passage dans la boucle
    if (context.isHtml) {
      texteCorr +=
        '<table style="width:100%"><tr><td style="text-align:center">'
    } else {
      texteCorr += '\\begin{minipage}{.49\\textwidth}'
    }
    for (let k = 0; k < nbRepetition; k++) {
      for (
        let i = k * lstNumCommande.length;
        i < (k + 1) * lstNumCommande.length;
        i++
      ) {
        switch (lstNumCommande[i % lstNumCommande.length]) {
          case 0:
            xLutin += -1
            break
          case 1:
            xLutin += 1
            break
          case 2:
            yLutin += 1
            break
          case 3:
            yLutin += -1
            break
          case 4:
            p = polygone(
              point(xLutin, yLutin),
              point(xLutin + 1, yLutin),
              point(xLutin + 1, yLutin - 1),
              point(xLutin, yLutin - 1),
            )
            p.couleurDeRemplissage = colorToLatexOrHTML(couleur)
            p.opaciteDeRemplissage = 0.25
            p.epaisseur = 0
            lstObjet.push(p)
        }
        if (i === 0) {
          positionApresPremierDeplacement =
            lettreDepuisChiffre(xLutin - xGrilleMin + 1) +
            (yGrilleMax - yLutin + 1) // position finale du lutin
        }
      }
      positionApresDernierDeplacement =
        lettreDepuisChiffre(xLutin - xGrilleMin + 1) + (yGrilleMax - yLutin + 1) // position finale du lutin
      if (this.sup2) {
        texteCorr += `Passage n° ${k + 1} dans la boucle : <br>`
      }
      texteCorr += mathalea2d(
        {
          xmin: xGrilleMin - 3,
          xmax: xGrilleMax + 1,
          ymin: yGrilleMin - 1,
          ymax: yGrilleMax + 1,
          pixelsParCm: 20,
          scale: 0.4,
        },
        lstObjet,
      )
      if (context.isHtml) {
        if (k % 3 === 2) {
          texteCorr += '</td></tr><tr><td style="text-align:center">' // retour à la ligne après 3 grilles dessinées en HTML
        } else {
          texteCorr += '</td><td></td><td style="text-align:center">'
        }
      } else {
        texteCorr += '\\end{minipage}'
        if (k % 2 === 1) {
          texteCorr += '\\\\ '
        } // retour à la ligne après 2 grilles dessinées en LaTeX
        texteCorr += '\\begin{minipage}{.49\\textwidth}'
      }
    }
    context.isHtml
      ? (texteCorr += '</td></tr></table>')
      : (texteCorr += '\\end{minipage}')

    if (context.isAmc) {
      this.autoCorrection = [
        { propositions: [{ texte: '', statut: 3, sanscadre: true }] },
      ]
    }

    texte +=
      'Au départ, le lutin est situé dans la case grisée. Chaque déplacement se fait dans une case adjacente. Exécuter le programme.'

    texte += '<br><br>'
    if (!context.isHtml) {
      texte += '\\begin{center}'
    }
    texte += mathalea2dEnonce
    if (context.isHtml) {
      texte += '</td></tr></table>'
    } else {
      texte += '\\end{center}\\end{minipage} '
      texte += '\\hfill \\null'
    }

    if (this.interactif && context.isHtml) {
      texte += `<br>
      ${numAlphaNum(0)} Quelle est la première case coloriée par le lutin ? ${ajouteChampTexteMathLive(this, 0, 'alphanumeric', { placeholder: 'A1' })}`
      handleAnswers(this, 0, {
        reponse: {
          value: positionApresPremierDeplacement,
          compare: texteSansCasseCompare,
        },
      })
      texte += `<br>
      ${numAlphaNum(1)} Quelle est la dernière case coloriée par le lutin ? ${ajouteChampTexteMathLive(this, 1, 'alphanumeric', { placeholder: 'A1' })}`
      handleAnswers(this, 1, {
        reponse: {
          value: positionApresDernierDeplacement,
          compare: texteSansCasseCompare,
        },
      })
      texteCorr += `<br>
      La première case coloriée par le lutin est ${texteEnCouleurEtGras(positionApresPremierDeplacement)}.<br>
      La dernière case coloriée par le lutin est ${texteEnCouleurEtGras(positionApresDernierDeplacement)}.`
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
