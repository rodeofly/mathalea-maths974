import { milieu, point } from '../../lib/2d/points'
import { repere } from '../../lib/2d/reperes'
import {
  longueur,
  nomVecteurParPosition,
  vecteur,
} from '../../lib/2d/segmentsVecteurs'
import {
  labelPoint,
  latex2d,
  latexParPoint,
  TexteParPoint,
  texteParPosition,
} from '../../lib/2d/textes'
import { homothetie } from '../../lib/2d/transformations'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import { mathalea2d, colorToLatexOrHTML } from '../../modules/2dGeneralites'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Figure from 'apigeom'
import figureApigeom from '../../lib/figureApigeom'
import { orangeMathalea } from 'apigeom/src/elements/defaultValues'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import type VectorByPoints from 'apigeom/src/elements/vector/VectorByPoints'

export const titre =
  'Représenter un vecteur dans un repère, à partir de ses coordonnées'
export const interactifReady = true
export const interactifType = 'custom'
export const dateDeModifImportante = '06/08/2024'

// Changer couleur dans la correction

/**
 * Tracer un vecteur dont on connait les coordonnées dans un repère.
 * @author Stéphane Guyon légèrement modifié par Jean-Claude Lhote, rendu interactif par Eric Elter
 */
export const uuid = '3a3ec'

export const refs = {
  'fr-fr': ['2G22-1'],
  'fr-ch': [],
}

export default class RepresenterUnVecteur extends Exercice {
  figures: Figure[]
  longueur?: number
  largeur?: number
  xA: number[]
  xB: number[]
  yA: number[]
  yB: number[]

  constructor() {
    super()
    this.nbQuestions = 2

    this.sup = 1 //
    this.besoinFormulaireNumerique = [
      'Situations différentes',
      3,
      '1 : Avec un point origine\n2 : Avec un point extrémité\n3 : Mélange',
    ]
    this.figures = []
    this.xA = []
    this.xB = []
    this.yA = []
    this.yB = []
  }

  nouvelleVersion() {
    this.longueur = 10
    this.largeur = 10
    this.figures = []
    this.xA = []
    this.xB = []
    this.yA = []
    this.yB = []
    let listeQuestions = []
    if (this.sup === 1)
      listeQuestions = combinaisonListes([1], this.nbQuestions)
    else if (this.sup === 2)
      listeQuestions = combinaisonListes([2], this.nbQuestions)
    else listeQuestions = combinaisonListes([1, 2], this.nbQuestions)

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      this.figures[i] = new Figure({
        xMin: -this.longueur - 0.25, // On enlève 0.25 unités
        yMin: -this.largeur - 0.25,
        width: 0.65 * (this.longueur * 2 * 30 + 20), // On ajoute 20 pixels
        height: 0.65 * (this.largeur * 2 * 30 + 20),
        border: false,
        scale: 0.65,
      })

      const OVecteur = this.figures[i].create('Point', {
        x: 0,
        y: 0,
        isVisible: false,
      })
      const IVecteur = this.figures[i].create('Point', {
        x: 1,
        y: 0,
        isVisible: false,
      })
      const JVecteur = this.figures[i].create('Point', {
        x: 0,
        y: 1,
        isVisible: false,
      })
      this.figures[i].create('TextByPosition', {
        text: '$O$',
        x: -0.15,
        y: -0.15,
        anchor: 'topRight',
        color: orangeMathalea,
        fontSize: '8pt',
      })
      this.figures[i].create('Grid', {
        strokeWidthGrid: 1,
        color: 'black',
        yMin: -this.largeur + 0.1,
        yMax: this.largeur - 0.1,
        xMax: this.longueur - 0.1,
        xMin: -this.longueur + 0.1,
        axeX: true,
        axeY: true,
        labelX: true,
        labelY: true,
      })
      this.figures[i].create('TextByPosition', {
        text: '$\\vec \\imath$',
        x: 0.5,
        y: 0,
        anchor: 'topRight',
        color: orangeMathalea,
        fontSize: '1.5em',
      })
      this.figures[i].create('TextByPosition', {
        text: '$\\vec \\jmath$',
        x: -0.5,
        y: 0,
        anchor: 'bottomRight',
        color: orangeMathalea,
        fontSize: '1.5em',
      })
      this.figures[i].create('VectorByPoints', {
        point1: OVecteur,
        point2: IVecteur,
        color: orangeMathalea,
        thickness: 3,
        isSelectable: false,
      })
      this.figures[i].create('VectorByPoints', {
        point1: OVecteur,
        point2: JVecteur,
        color: orangeMathalea,
        thickness: 3,
        isSelectable: false,
      })
      this.figures[i].snapGrid = true
      this.figures[i].setToolbar({
        tools: ['DRAG', 'REMOVE', 'VECTOR', 'POINT', 'SET_OPTIONS'],
        // position: 'top'
      })
      this.figures[i].options.thickness = 3

      this.xA.push(randint(2, 8) * choice([-1, 1]))
      this.yA.push(randint(2, 8) * choice([-1, 1]))
      let ux = randint(3, 8) * choice([-1, 1])
      let uy = randint(3, 8) * choice([-1, 1])
      this.xB.push(this.xA[i] + ux)
      this.yB.push(this.yA[i] + uy)
      while (Math.abs(this.xB[i]) < 2 || Math.abs(this.xB[i]) > 8) {
        // On s'assure de choisir des points bien placés dans le repère.
        this.xA[i] = randint(3, 8) * choice([-1, 1])
        ux = randint(3, 8) * choice([-1, 1])
        this.xB[i] = this.xA[i] + ux
      }
      while (Math.abs(this.yB[i]) < 2 || Math.abs(this.yB[i]) > 8) {
        // Idem pour les ordonnées
        this.yA[i] = randint(3, 8) * choice([-1, 1])
        uy = randint(3, 8) * choice([-1, 1])
        this.yB[i] = this.yA[i] + uy
      }
      const A = point(this.xA[i], this.yA[i])
      const B = point(this.xB[i], this.yB[i])
      const AB = vecteur(A, B)
      const r = repere({ axesEpaisseur: 1 }) // On définit le repère
      const posLabelA = homothetie(B, A, -0.7 / longueur(A, B), '', 'center') // pour positionner les noms des points aux extrémités proprement
      const posLabelB = homothetie(A, B, -0.7 / longueur(A, B), '', 'center')
      const numeroPoint1 = randint(1, 26, [15]) // 15 : Pour éviter le point O
      const nomPoint1 = lettreDepuisChiffre(numeroPoint1)
      const numeroPoint2 = randint(1, 26, [15, numeroPoint1])
      const nomPoint2 = lettreDepuisChiffre(numeroPoint2)
      const labelA = latexParPoint(nomPoint1, posLabelA, 'red', 10, 12, '')
      const labelB = latexParPoint(nomPoint2, posLabelB, 'red', 10, 12, '')

      const H = point(this.xA[i] + ux, this.yA[i])
      const s = AB.representant(A) // On trace en rouge [AB]
      const h1 = vecteur(A, H).representant(A, 'blue')
      const h2 = vecteur(H, B).representant(H, 'blue')
      const longueurAH = latex2d(
        String(ux),
        milieu(A, H).x,
        milieu(A, H).y + 0.5,
        { color: 'blue', letterSize: 'footnotesize' },
      )
      const longueurBH = latex2d(
        String(uy),
        milieu(B, H).x + 0.5,
        milieu(B, H).y,
        { color: 'blue', letterSize: 'footnotesize' },
      )
      const O = point(0, 0) // On définit et on trace le point O
      const o = texteParPosition(
        'O',
        -0.3,
        -0.3,
        0,
        'blue',
        0.75,
        'milieu',
        true,
      )
      const I = point(1, 0) // On définit sans tracer le point I
      const J = point(0, 1) // On définit sans tracer le point J
      const k = vecteur(O, I).representant(O, 'blue') // Variable qui trace [OI] en bleu
      const j = vecteur(O, J).representant(O, 'blue') // Variable qui trace [OJ] en bleu
      s.epaisseur = 1.5 // Variable qui grossit le tracé du vecteur AB
      s.color = colorToLatexOrHTML(orangeMathalea)
      k.epaisseur = 1.1 // Variable qui grossit le tracé du vecteur OI
      j.epaisseur = 1.1 // Variable qui grossit le tracé du vecteur OJ
      h1.epaisseur = 1.5 // Variable qui grossit le tracé bleu
      h2.epaisseur = 1.5 // Variable qui grossit le tracé bleu
      const nomi = nomVecteurParPosition('i', 0.5, -0.7, 0.7, 0, 'blue')
      const nomj = nomVecteurParPosition('j', -0.7, 0.5, 0.7, 0, 'blue')
      const nomAB = AB.representantNomme(A, 'u', 0.7, 'red')
      let l: TexteParPoint[]
      if (listeQuestions[i] === 1) {
        l = labelPoint(A, 'red') as TexteParPoint[] // Variable qui trace les nom s A et B

        // texte = ` Dans un repère orthonormé $\\big(O ; \\vec i,\\vec j\\big)$, représenter le vecteur $\\vec{u}\\begin{pmatrix}${ux} \\\\${uy}\\end{pmatrix}$, `
        texte = ` Dans un repère orthonormé $\\big(O ; \\vec i,\\vec j\\big)$, représenter le vecteur de coordonnées $\\begin{pmatrix}${ux} \\\\${uy}\\end{pmatrix}$, `
        texte += `ayant pour origine le point $${nomPoint1}\\left(${this.xA[i]};${this.yA[i]}\\right)$.`
        this.figures[i].create('Point', {
          x: this.xA[i],
          y: this.yA[i],
          label: nomPoint1,
          isFree: false,
          isSelectable: false,
        })
        this.figures[i].options.color = 'green'
        texteCorr = "On sait qu'un vecteur mesure un déplacement."
        texteCorr += `<br> À partir du point $${nomPoint1}$,  on trace donc le déplacement correspondant à $${ux}$ unités horizontalement puis $${uy}$ unités verticalement pour arriver au point $${nomPoint2}$, extrémité du vecteur $\\vec{u}$.`
      } else {
        // texte = ` Dans un repère orthonormé $\\big(O ; \\vec i,\\vec j\\big)$, représenter le vecteur $\\vec{u}\\begin{pmatrix}${ux} \\\\${uy}\\end{pmatrix}$, `
        texte = ` Dans un repère orthonormé $\\big(O ; \\vec i,\\vec j\\big)$, représenter le vecteur de coordonnées $\\begin{pmatrix}${ux} \\\\${uy}\\end{pmatrix}$, `
        texte += `ayant pour extrémité le point $${nomPoint2}\\left(${this.xB[i]};${this.yB[i]}\\right)$.`
        this.figures[i].create('Point', {
          x: this.xB[i],
          y: this.yB[i],
          label: nomPoint2,
          isFree: false,
          isSelectable: false,
        })
        texteCorr = "On sait qu'un vecteur mesure un déplacement."
        texteCorr += `<br> On cherche donc un point $${nomPoint1}$, à partir duquel en traçant le déplacement correspondant à $${ux}$ unités horizontalement puis $${uy}$ unités verticalement, on arrive au point $${nomPoint2}$.`
        l = labelPoint(A, B, 'red') as TexteParPoint[] // Variable qui trace les noms A et B
      }
      texteCorr += `<br> Voir les déplacements dans le repère ci-dessous et le tracé en orange du vecteur-solution $${miseEnEvidence('\\vec{u}')}$.<br>`
      texte += this.interactif
        ? `<br>Pour vous aider, vous pouvez créer autant de vecteurs que vous souhaitez mais pour valider votre réponse, ${texteEnCouleurEtGras('il faut que le vecteur-solution soit en vert')} et que seul ce vecteur-solution doit être en vert.`
        : ''
      texte += figureApigeom({
        exercice: this,
        figure: this.figures[i],
        i,
        defaultAction: 'VECTOR',
      })

      texteCorr += mathalea2d(
        {
          xmin: -10,
          ymin: -10,
          xmax: 10,
          ymax: 10,
          scale: 0.4,
        },
        r,
        l,
        k,
        j,
        s,
        o,
        nomi,
        nomj,
        nomAB,
        h1,
        h2,
        labelA,
        labelB,
        longueurAH,
        longueurBH,
      ) // On trace le graphique

      if (
        this.questionJamaisPosee(
          i,
          this.xA[i],
          this.yA[i],
          this.xB[i],
          this.yB[i],
        )
      ) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  correctionInteractive = (i: number) => {
    if (this.answers == null) this.answers = {}
    // Sauvegarde de la réponse pour Capytale
    this.answers[this.figures[i].id] = this.figures[i].json
    const divFeedback = document.querySelector(
      `#feedbackEx${this.numeroExercice}Q${i}`,
    ) as HTMLDivElement
    this.figures[i].isDynamic = false
    this.figures[i].divButtons.style.display = 'none'
    this.figures[i].divUserMessage.style.display = 'none'

    let { isValid, vectors } = this.figures[i].checkVector({
      color: 'green',
      xOrigin: this.xA[i],
      x: this.xB[i] - this.xA[i],
      yOrigin: this.yA[i],
      y: this.yB[i] - this.yA[i],
    })

    const nbVecteurs = [...this.figures[i].elements.values()].filter(
      (e) =>
        e.type === 'VectorByPoints' && (e as VectorByPoints).color === 'green',
    ).length

    isValid &&= nbVecteurs === 1

    if (isValid) {
      divFeedback.innerHTML = 'Bravo !'
      if (vectors[0] !== undefined) {
        vectors[0].color = 'green'
      }
      return 'OK'
    }

    const wrongVectors = [...this.figures[i].elements.values()].filter(
      (e) => e.type === 'VectorByPoints' && (e as VectorByPoints).isSelectable,
    ) as VectorByPoints[]
    for (const vector of wrongVectors) {
      vector.color = 'red'
    }

    let message
    if (nbVecteurs === 0) {
      message = "Aucun vecteur vert n'est tracé."
    } else if (nbVecteurs > 1) {
      message = 'Trop de vecteurs sont tracés.'
    } else {
      message = "Le vecteur tracé n'est pas celui qui est attendu."
    }
    divFeedback.innerHTML = message
    return 'KO'
  }
}
