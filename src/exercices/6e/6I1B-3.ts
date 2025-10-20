// on importe les fonctions nécessaires.
import { point, tracePoint } from '../../lib/2d/points'
import { grille } from '../../lib/2d/reperes'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { texteParPoint } from '../../lib/2d/textes'
import {
  combinaisonListesSansChangerOrdre,
  shuffle,
} from '../../lib/outils/arrayOutils'
import { texteGras } from '../../lib/format/style'
import Exercice from '../Exercice'
import { colorToLatexOrHTML, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import {
  contraindreValeur,
  listeQuestionsToContenuSansNumero,
  randint,
} from '../../modules/outils'
// Ici ce sont les fonctions de la librairie maison 2d.js qui gèrent tout ce qui est graphique (SVG/tikz) et en particulier ce qui est lié à l'objet lutin
import {
  allerA,
  angleScratchTo2d,
  avance,
  baisseCrayon,
  creerLutin,
  leveCrayon,
  orienter,
  tournerD,
  tournerG,
} from '../../modules/2dLutin'
import { scratchblock } from '../../modules/scratchblock'
import { ajouteFeedback } from '../../lib/interactif/questionMathLive'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'

interface Fig extends HTMLOrSVGElement {
  etat: boolean
}

export const interactifReady = true
// il y avait un fonctionnement avec amcType cf commit 3ae7c43
export const interactifType = 'custom'
export const amcReady = true
export const amcType = 'qcmMono'

export const titre = 'Trouver le bon tracé avec Scratch'
export const uuid = 'e9cac'

export const refs = {
  'fr-fr': ['6I1B-3'],
  'fr-2016': ['6I12'],
  'fr-ch': [],
}
export default class AlgoTortue extends Exercice {
  // ça c'est la classe qui permet de créer cet exercice
  indiceBonneFigure!: number
  constructor() {
    super()
    this.exoCustomResultat = false
    this.besoinFormulaireNumerique = [
      "Nombre d'instructions (entre 2 et 20)",
      20,
    ] // gestion des paramètres supplémentaires
    this.nbQuestions = 1
    this.nbQuestionsModifiable = false
    this.typeExercice = 'Scratch'
    this.sup = 9 // 7 instructions par défaut, paramètre réglable.
    this.sup2 = 1 // types d'instructionsde déplacement (ici seulement avancer et tourner)
    this.listeAvecNumerotation = false
  }

  nouvelleVersion(numeroExercice: number) {
    const angleDepart = 90 // On choisit l'orientation de départ (On pourrait en faire un paramètre de l'exo)
    // const xDepart = 0 // Le départ est en (0,0) pour avoir la même marge dans toutes les directions
    // const yDepart = 0
    const objetsCorrection = []
    let paramsCorrection
    let paramsEnonces
    const sequences = [
      // séquences d'intruction pré-établies, on en choisit une parmi celles-ci
      [
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
      ],
      [
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
      ],
      [
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerG',
        'avancer',
      ],
      [
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
      ],
      [
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
      ],
      [
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
      ],
      [
        'avancer',
        'tournerG',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
      ],
      [
        'avancer',
        'tournerG',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
      ],
      [
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
      ],
      [
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerG',
        'avancer',
      ],
      [
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerD',
        'avancer',
      ],
      [
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
        'tournerG',
        'avancer',
        'tournerG',
        'avancer',
        'tournerD',
        'avancer',
      ],
    ]
    let erreursDeDeplacement = [0, 1, 0]
    this.sup = contraindreValeur(2, 20, this.sup, 9)
    erreursDeDeplacement = combinaisonListesSansChangerOrdre(
      erreursDeDeplacement,
      this.sup,
    )
    const choix = randint(0, 11) // On va choisir une des 12 sequences
    const commandes = combinaisonListesSansChangerOrdre(
      sequences[choix],
      this.sup,
    ) // on crée la succession de commandes en répétant la séquence choisie si le nombre d'instructions demandées dépasse la longueur de la séquence
    const val = []
    const lutins = []

    // Ici on crée 5 instances de l'objet Lutin.
    for (let i = 0; i < 5; i++) {
      lutins[i] = creerLutin()
      lutins[i].color = colorToLatexOrHTML('green') // la couleur de la trace
      lutins[i].epaisseur = 3 // son epaisseur
    }
    context.unitesLutinParCm = 10 // avancer de 10 pour le lutin lui fait parcourir 1cm (en fait 0,5cm car j'ai ajouté un scale=0.5 pour la sortie latex)
    context.pixelsParCm = 20 // 20 pixels d'écran représentent 1cm (enfin ça dépend du zoom, donc c'est juste un réglage par défaut)

    let texte = '' // la chaine qui va contenir l'énoncé
    let texteCorr = '' // la chaine qui va contenir la correction
    // On écrit le début du programme dans l'attribut codeScratch du lutins[0][0]... cet attribut de type chaine contient le code du programme du lutin en Scratch Latex
    // A chaque instruction ajoutée dans le programme correspond une action à effectuée sur l'objet lutins[0]..
    lutins[0].codeScratch =
      '\\begin{scratch}[print,fill,blocks,scale=0.75]\n \\blockinit{quand \\greenflag est cliqué}\n '
    lutins[0].codeScratch += `\\blockmove{s'orienter à \\ovalnum{${angleDepart}}}\n`
    lutins[0].codeScratch += "\\blockpen{stylo en position d'écriture}\n"
    for (let i = 0; i < 5; i++) {
      allerA(0, 0, lutins[i]) // ça c'est pour faire bouger le lutin (écrire le programme ne le fait pas exécuter !)
      baisseCrayon(lutins[i])
      orienter(angleScratchTo2d(angleDepart), lutins[i]) // l'angle 2d est l'angle trigonométrique... Scratch est décallé de 90°, il faut donc convertir pour utiliser Orienter()
    }
    for (let i = 0; i < this.sup; i++) {
      // On va parcourir la listes des commandes de déplacement mais certains lutins font des erreurs
      switch (commandes[i]) {
        case 'avancer':
          val[i] = randint(1, 4) * 5 // La longueur du déplacement est 10, 20, 30 ou 40
          lutins[0].codeScratch += `\\blockmove{avancer de \\ovalnum{${val[i]}} pas}\n`
          avance(val[i], lutins[0])
          avance(val[i], lutins[1])
          avance(val[i], lutins[2])
          avance(val[i], lutins[3])
          avance(val[i] + 5 * erreursDeDeplacement[i], lutins[4]) // avance trop
          break
        case 'tournerD': // On peut difficilement choisir autre chose que de tourner de 90°...
          lutins[0].codeScratch +=
            '\\blockmove{tourner \\turnright{} de \\ovalnum{90} degrés}\n'
          tournerD(90, lutins[0])
          tournerD(90, lutins[2])
          orienter(90, lutins[4])
          tournerG(90, lutins[1]) // tournent dans le mauvais sens
          tournerG(90, lutins[3])
          break
        case 'tournerG':
          lutins[0].codeScratch +=
            '\\blockmove{tourner \\turnleft{} de \\ovalnum{90} degrés}\n'
          tournerG(90, lutins[0])
          tournerG(90, lutins[1])
          tournerG(90, lutins[4])
          tournerD(90, lutins[2]) // tournent dans le mauvais sens
          tournerD(90, lutins[3])
          break
      }
    }
    lutins[0].codeScratch += '\\blockpen{relever le stylo}\n'

    let largeur = 1
    let hauteur = 1
    for (let i = 0; i < 5; i++) {
      // on calcule la largeur et la hauteur maximale des parcours.
      leveCrayon(lutins[i])
      largeur = Math.max(largeur, lutins[i].xMax - lutins[i].xMin)
      hauteur = Math.max(hauteur, lutins[i].yMax - lutins[i].yMin)
    }
    largeur++
    lutins[0].codeScratch += '\\end{scratch}'
    texte =
      "Quelle figure est tracée par le stylo à l'exécution du programme ci-dessous ?<br>Un carreau représente 5 pas<br>Le tracé démarre à la croix bleue.<br>"
    texte +=
      "S'orienter à 90° signifie s'orienter vers la droite de l'écran.<br>"

    if (context.isHtml) {
      // On crée 2 colonnes selon le contexte html / Latex
      texte += '<table style="width: 100%"><tr><td>'
    } else {
      texte += '\\begin{minipage}[b]{.25\\textwidth}'
    }
    texte += scratchblock(lutins[0].codeScratch) // la fonction scratchblock va convertir le code Latex en code html si besoin.
    if (context.isHtml) {
      // on change de colonne...
      texte += '</td><td style="vertical-align: top; text-align: center">'
      texte += this.interactif
        ? `${texteGras('Cliquer sur la figure puis vérifier la réponse.')}<br><br>`
        : '<br><br>'
    } else {
      texte += '\\end{minipage} '
      texte += '\\hfill \\begin{minipage}[b]{.74\\textwidth}'
    }

    let ordreLutins = [0, 1, 2, 3, 4]
    ordreLutins = shuffle(ordreLutins) // On mélange les emplacements pour éviter d'avoir la bonne réponse au même endroit
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < lutins[i].listeTraces.length; j++) {
        // On recadre les traces des lutins...
        lutins[i].listeTraces[j][0] -= lutins[i].xMin
        lutins[i].listeTraces[j][2] -= lutins[i].xMin
        lutins[i].listeTraces[j][1] -= lutins[i].yMin
        lutins[i].listeTraces[j][3] -= lutins[i].yMin
      }
    }
    const depart = []
    for (let i = 0; i < 5; i++) {
      // ajouter le point de départ de chaque tracé
      depart[i] = tracePoint(
        point(lutins[i].listeTraces[0][0], lutins[i].listeTraces[0][1]),
      )
      depart[i].taille = 5
      depart[i].color = colorToLatexOrHTML('blue')
      depart[i].epaisseur = 2
      if (i === 0) {
        objetsCorrection.push(depart[0])
      }
    }
    const echelle = segment(0, hauteur + 0.5, 1, hauteur + 0.5)
    echelle.epaisseur = 2
    echelle.styleExtremites = '|-|'
    objetsCorrection.push(
      grille(-1, -1, largeur + 1, hauteur + 1, 'gray', 0.5, 0.5),
    )
    objetsCorrection.push(lutins[0])

    // mathalea2d() est la fonction qui ajoute soit une figure SVG (en html), soit une figure tikz en Latex. Ici, juste la grille est le point de départ.
    for (let i = 0; i < 5; i++) {
      paramsEnonces = {
        xmin: -0.5,
        ymin: -1.5,
        xmax: largeur,
        ymax: hauteur + 1,
        pixelsParCm: Math.round(200 / largeur),
        scale: 2 / largeur,
        style: '',
        id: `figure${i}exo${numeroExercice}`,
      }
      paramsCorrection = {
        xmin: -0.5,
        ymin: -0.5,
        xmax: largeur,
        ymax: hauteur + 1,
        pixelsParCm: Math.round(200 / largeur),
        scale: 2 / largeur,
      }
      texte += mathalea2d(
        paramsEnonces,
        lutins[ordreLutins[i]],
        depart[ordreLutins[i]],
        grille(-0.5, -0.5, largeur, hauteur + 1, 'gray', 0.5, 0.5),
        texteParPoint('10 pas', point(0.5, hauteur + 0.2), 0, 'black', 1),
        texteParPoint(
          `figure ${i + 1}`,
          point(
            (lutins[ordreLutins[i]].xMax - lutins[ordreLutins[i]].xMin) / 2,
            -0.8,
          ),
          0,
          'black',
          1,
        ),
        echelle,
      )
    }
    if (context.isHtml) {
      texte += '</td></tr></table>'
      texte += `<div id="resultatCheckEx${this.numeroExercice}Q${0}"></div>`
    } else {
      texte += '\\end{minipage} '
    }
    if (this.interactif) {
      texte += ajouteFeedback(this, 0)
    }
    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: texte,
        propositions: [
          {
            texte: 'figure 1',
            statut: false,
          },
          {
            texte: 'figure 2',
            statut: false,
          },
          {
            texte: 'figure 3',
            statut: false,
          },
          {
            texte: 'figure 4',
            statut: false,
          },
          {
            texte: 'figure 5',
            statut: false,
          },
        ],
        options: { ordered: true },
      }
      // @ts-expect-error
      this.autoCorrection[0].propositions[ordreLutins.indexOf(0)].statut = true
    }
    this.indiceBonneFigure = ordreLutins.indexOf(0)
    // Ici, la figure contient la grille, le point de départ et le lutin qui s'anime sur sa trace...
    texteCorr += `La bonne figure est la figure ${texteEnCouleurEtGras(this.indiceBonneFigure + 1)}.<br>`

    texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
    this.listeQuestions.push(texte) // on met à jour la liste des questions
    this.listeCorrections.push(texteCorr) // et la liste des corrections

    listeQuestionsToContenuSansNumero(this) // on envoie tout à la fonction qui va mettre en forme.

    // Gestion de la souris
    // ToFix si on passe de interactif à non interactif il y a toujours l'effet au survol

    document.addEventListener('exercicesAffiches', () => {
      // Dès que l'exercice est affiché, on rajoute des listenners sur chaque Svg.
      for (let i = 0; i < 5; i++) {
        const figSvg = document.getElementById(
          `figure${i}exo${this.numeroExercice}`,
        )
        if (figSvg) {
          const fig = figSvg as unknown as Fig
          if (this.interactif) {
            figSvg.addEventListener('mouseover', mouseOverSvgEffect)
            figSvg.addEventListener('mouseout', mouseOutSvgEffect)
            figSvg.addEventListener('click', mouseSvgClick)
            fig.etat = false
          } else {
            figSvg.removeEventListener('mouseover', mouseOverSvgEffect)
            figSvg.removeEventListener('mouseout', mouseOutSvgEffect)
            figSvg.removeEventListener('click', mouseSvgClick)
            fig.etat = true
          }
        }
      }
    })
  }

  // Pour pouvoir récupérer this dans la correction interactive
  // Pour distinguer les deux types de codage de recuperation des résultats

  // Gestion de la correction
  correctionInteractive = (i: number) => {
    let nbFiguresCliquees = 0
    const spanResultat = document.querySelector(
      `#resultatCheckEx${this.numeroExercice}Q${0}`,
    ) as HTMLSpanElement
    const divFeedback = document.querySelector(
      `#feedbackEx${this.numeroExercice}Q${0}`,
    ) as HTMLDivElement

    const figures = []
    for (let i = 0; i < 5; i++) {
      const figure = document.getElementById(
        `figure${i}exo${this.numeroExercice}`,
      )
      if (figure != null) {
        const fig = figure as unknown as Fig
        figures.push(figure)
        figure.removeEventListener('mouseover', mouseOverSvgEffect)
        figure.removeEventListener('mouseout', mouseOutSvgEffect)
        figure.removeEventListener('click', mouseSvgClick)
        if (fig.etat) nbFiguresCliquees++
      }
    }
    if (nbFiguresCliquees > 1) {
      divFeedback.innerHTML = "Vous ne pouvez choisir qu'une seule figure."
      divFeedback.style.display = 'block'
    }
    if (nbFiguresCliquees < 1) {
      divFeedback.innerHTML = 'Vous devez choisir une figure.'
      divFeedback.style.display = 'block'
    }
    if (
      nbFiguresCliquees === 1 &&
      (figures[this.indiceBonneFigure] as unknown as Fig).etat
    ) {
      spanResultat.innerHTML = '😎'
      // nbBonnesReponses++
      return 'OK'
    } else {
      spanResultat.innerHTML = '☹️'
      // nbMauvaisesReponses++
      return 'KO'
    }
    //    afficheScore(this, nbBonnesReponses, nbMauvaisesReponses)
  }
}

function mouseOverSvgEffect(this: any) {
  this.style.border = 'inset'
}

function mouseOutSvgEffect(this: any) {
  this.style.border = 'none'
}

function mouseSvgClick(this: any) {
  if (this.etat) {
    // Déja choisi, donc on le réinitialise
    this.style.border = 'none'
    this.addEventListener('mouseover', mouseOverSvgEffect)
    this.addEventListener('mouseout', mouseOutSvgEffect)
    this.addEventListener('click', mouseSvgClick)
    this.etat = false
  } else {
    // Passe à l'état choisi donc on désactive les listenners pour over et pour out
    this.removeEventListener('mouseover', mouseOverSvgEffect)
    this.removeEventListener('mouseout', mouseOutSvgEffect)
    this.style.border = 'solid #f15929'
    this.etat = true
  }
}
