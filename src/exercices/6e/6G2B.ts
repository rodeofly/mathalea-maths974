import Figure from 'apigeom'
import checkCircle from 'apigeom/src/check/checkCircleRadius'
import type Point from 'apigeom/src/elements/points/Point'
import Decimal from 'decimal.js'
import figureApigeom from '../../lib/figureApigeom'
import { choisitLettresDifferentes } from '../../lib/outils/aleatoires'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { texteGras } from '../../lib/outils/embellissements'
import { numAlpha, sp } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Utiliser la définition du cercle et du disque'

export const dateDePublication = '15/01/2025'
export const interactifReady = true
export const interactifType = 'custom'

export const uuid = 'f8dee'
export const refs = {
  'fr-fr': ['6G2B'],
  'fr-2016': ['6G10-8'],
  'fr-ch': ['9ES1-10'],
}
/**
 * Utiliser la définition du cercle et du disque
 * @author Eric Elter
 */
export default class nomExercice extends Exercice {
  figuresApiGeom!: Figure[]
  figuresApiGeomCorr!: Figure[]
  lesPoints!: Point[][]
  lesPointsCorr!: Point[][]
  choixRayon!: number[][]
  choixCouleur!: string[][][]
  estUnCercle!: boolean[][]
  constructor() {
    super()
    this.nbQuestions = 1
    this.besoinFormulaireNumerique = [
      'Type de Questions',
      3,
      '1 : Que des cercles\n2 : Que des disques\n3 : Mélange',
    ]
    this.besoinFormulaire2Numerique = [
      'Nombre de points par question (4 maximum)',
      4,
    ]
    this.sup = 3
    this.sup2 = 2
    this.exoCustomResultat = true
    this.interactif = true
    this.correctionDetaillee = false
    this.correctionDetailleeDisponible = true
  }

  nouvelleVersion() {
    this.figuresApiGeom = []
    this.figuresApiGeomCorr = []
    this.lesPoints = []
    this.lesPointsCorr = []
    this.choixRayon = []
    this.choixCouleur = []
    this.estUnCercle = []
    let typeDeQuestions = []
    switch (this.sup) {
      case 1:
        typeDeQuestions = [true]
        break
      case 2:
        typeDeQuestions = [false]
        break
      default:
        typeDeQuestions = [true, false]
        break
    }
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      this.lesPoints[i] = []
      this.lesPointsCorr[i] = []
      this.choixRayon[i] = []
      this.choixCouleur[i] = combinaisonListes([
        ['rouge', 'red'],
        ['bleu', 'blue'],
        ['orange', 'orange'],
        ['vert', 'green'],
      ])
      this.estUnCercle[i] = combinaisonListes(typeDeQuestions, this.sup2)
      const nomDesCentres = choisitLettresDifferentes(4, 'OQW')
      let texte = ''
      let texteCorr = ''
      if (this.correctionDetaillee) {
        texteCorr += texteGras('Rappel : ') + '<br>'
        texteCorr +=
          sp(5) +
          "L'ensemble des points à une distance fixée d'un autre point est un cercle (dont le centre est cet autre point et le rayon est cette distance fixée).<br>"
        texteCorr +=
          sp(5) +
          "L'ensemble des points à une distance inférieure ou égale à une distance fixée d'un autre point est un disque (dont le centre est cet autre point et le rayon est cette distance fixée).<br><br>"
      }
      const coordonnes: number[][] = []

      this.figuresApiGeom[i] = new Figure({
        xMin: -5.5,
        yMin: -5.5,
        width: 330,
        height: 330,
        border: true,
      })
      this.figuresApiGeomCorr[i] = new Figure({
        xMin: -5.5,
        yMin: -5.5,
        width: 330,
        height: 330,
        border: true,
      })
      let isDuplicate = true // Pour ne pas créer deux points l'un sur l'autre
      let newElement: number[] = []
      for (let ee = 0; ee < this.sup2; ee++) {
        do {
          newElement = [randint(-4, 4), randint(-4, 4)]

          // Vérifie si le nouvel élément est déjà dans le tableau
          isDuplicate = coordonnes.some(
            (el) => el[0] === newElement[0] && el[1] === newElement[1],
          )
        } while (isDuplicate)
        coordonnes[ee] = newElement
        this.lesPoints[i][ee] = this.figuresApiGeom[i].create('Point', {
          x: newElement[0],
          y: newElement[1],
          shape: 'x',
          label: nomDesCentres[ee],
          labelDxInPixels: 10,
          labelDyInPixels: 20,
        })
        this.lesPoints[i][ee].isDeletable = false
        this.lesPointsCorr[i][ee] = this.figuresApiGeomCorr[i].create('Point', {
          x: newElement[0],
          y: newElement[1],
          shape: 'x',
          label: nomDesCentres[ee],
          labelDxInPixels: 10,
          labelDyInPixels: 20,
        })
        this.choixRayon[i][ee] = randint(20, 50, this.choixRayon[i])
        texte +=
          numAlpha(ee) + `Construire, en ${this.choixCouleur[i][ee][0]}, l`
        let texteCommun =
          "'ensemble des points, du cadre ci-dessous, à une distance"
        texteCommun += this.estUnCercle[i][ee]
          ? ' de '
          : ' inférieure ou égale à '
        texteCommun += `$${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités du point ${nomDesCentres[ee]}`
        texte += texteCommun + '.<br>'
        this.figuresApiGeomCorr[i].create('Circle', {
          center: this.lesPointsCorr[i][ee],
          radius: new Decimal(this.choixRayon[i][ee]).div(10).toNumber(),
          fillColor: this.estUnCercle[i][ee]
            ? 'none'
            : this.choixCouleur[i][ee][1],
          color: this.choixCouleur[i][ee][1],
          fillOpacity: 0.2,
          isSelectable: false,
        })
        // J'ai enlevé cette partie car ce qui est tracé n'est pas un cercle mais un arc de cercle.
        // texteCorr += numAlpha(ee) + 'L' + texteCommun + ' est le ' + (this.estUnCercle[i][ee] ? 'cercle' : 'disque') + ` de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités.<br>`
      }
      this.figuresApiGeom[i].setToolbar({
        tools: [
          'CIRCLE_CENTER_POINT',
          'CIRCLE_RADIUS',
          'DISC_CENTER_POINT',
          'DISC_RADIUS',
          'POINT',
          'LINE',
          'DRAG',
          'REMOVE',
          'FILL',
          'SET_OPTIONS',
        ],
      })
      this.figuresApiGeom[i].options.fillColorAndBorderColorAreSame = true
      this.figuresApiGeom[i].options.changeColorChangeActionToSetOptions = true

      this.figuresApiGeomCorr[i].isDynamic = false
      this.figuresApiGeomCorr[i].divButtons.style.display = 'none'
      this.figuresApiGeomCorr[i].divUserMessage.style.display = 'none'

      texte += context.isHtml
        ? figureApigeom({
            exercice: this,
            i,
            figure: this.figuresApiGeom[i],
            idAddendum: '6GXX' + i,
            defaultAction: 'DRAG',
          })
        : '<br>' + this.figuresApiGeom[i].latex({ includePreambule: false })

      texteCorr += context.isHtml
        ? figureApigeom({
            exercice: this,
            i,
            figure: this.figuresApiGeomCorr[i],
            idAddendum: '6GXXCor' + i,
          })
        : this.figuresApiGeomCorr[i].latex({ includePreambule: false })

      if (this.questionJamaisPosee(i, texte)) {
        if (!this.interactif) {
          texte = texte.replaceAll('unités', 'cm')
          texteCorr = texteCorr.replaceAll('unités', 'cm')
        }
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
    this.answers[this.figuresApiGeom[i].id] = this.figuresApiGeom[i].json
    const resultat = []
    const divFeedback = document.querySelector(
      `#feedbackEx${this.numeroExercice}Q${i}`,
    ) as HTMLDivElement
    let feedback = ''

    for (let ee = 0; ee < this.sup2; ee++) {
      feedback += numAlpha(ee)
      const verif = checkCircle({
        figure: this.figuresApiGeom[i],
        center: this.lesPoints[i][ee],
        radius: new Decimal(this.choixRayon[i][ee]).div(10).toNumber(),
      })
      if (this.estUnCercle[i][ee]) {
        // SI C'EST UN CERCLE
        if (
          verif.isValid &&
          verif.element?.color === this.choixCouleur[i][ee][1] &&
          verif.element?.fillColor === 'none'
        ) {
          resultat.push('OK')
          feedback += `Bravo. Le cercle de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités a bien été tracé en ${this.choixCouleur[i][ee][0]}.<br>`
        } else {
          resultat.push('KO')
          if (!verif.isValid) {
            feedback += `Aucun cercle de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités n'est tracé.<br>`
          } else if (verif.element?.fillColor !== 'none') {
            feedback += `Un disque a été tracé mais c'est un cercle de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités qui était attendu.<br>`
          } else {
            // if (verif.element?.color !== this.choixCouleur[i][ee][1]) {
            feedback += `Le cercle de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités n'est pas tracé en ${this.choixCouleur[i][ee][0]}.<br>`
          }
        }
      } else {
        // SI C'EST UN DISQUE
        if (
          verif.isValid &&
          verif.element?.color === this.choixCouleur[i][ee][1] &&
          verif.element?.fillColor === this.choixCouleur[i][ee][1]
        ) {
          resultat.push('OK')
          feedback += `Bravo. Le disque de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités a bien été tracé en ${this.choixCouleur[i][ee][0]}.<br>`
        } else {
          resultat.push('KO')
          if (!verif.isValid) {
            feedback += `Aucun disque de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités n'est tracé.<br>`
          } else if (verif.element?.fillColor === 'none') {
            feedback += `Un cercle a été tracé mais c'est un disque de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités qui était attendu.<br>`
          } else {
            feedback += `Le disque de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités n'est pas tracé en ${this.choixCouleur[i][ee][0]}.<br>`
          }
        }
      }
    }
    let toutBon = true
    for (let ee = 0; ee < this.sup2; ee++) {
      toutBon &&= resultat[ee] === 'OK'
    }
    if (toutBon) feedback = '' // Inutile d'afficher de feedback si tout est bon.
    if (divFeedback) divFeedback.innerHTML = feedback
    this.figuresApiGeom[i].isDynamic = false
    this.figuresApiGeom[i].divButtons.style.display = 'none'
    this.figuresApiGeom[i].divUserMessage.style.display = 'none'
    return resultat
  }
}
