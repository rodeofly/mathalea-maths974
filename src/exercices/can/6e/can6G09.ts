import Exercice from '../../Exercice'
import { listeQuestionsToContenu } from '../../../modules/outils'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { briqueLego } from '../../../lib/2d/figures2d/legos'
import {
  aileDelta,
  pacman,
  cerfVolant,
  etoile5Branches,
  hexagoneNonRegulier,
  pentagoneRegulier,
  trapezeIsocele,
  triangleQuelconque1,
  ovale,
} from '../../../lib/2d/figures2d/geometrie'
import {
  panneauArretInterdit,
  panneauCederLePassage,
  panneauCroisementPrioriteADroite,
  panneauDoubleSens,
  panneauFeuTricolore,
  panneauFinDeRoutePrioritaire,
  panneauInterdictionDeCirculer,
  panneauParking,
  panneauRetrecissementChaussee1,
  panneauRetrecissementChaussee2,
  panneauRoutePrioritaire,
  panneauSensInterdit,
  panneauStationnementInterdit,
  panneauStop,
  panneauVoieSansIssue,
} from '../../../lib/2d/figures2d/panneaux'

export const titre = 'Identifier des figures symétriques'
export const dateDePublication = '10/05/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * symétrie ou pas ?
 * Ref can6G09
 * @author Jean-Claude Lhote
 * Publié le 18/12/2021
 */
export const uuid = '85dfd'

export const refs = {
  'fr-fr': [''],
  'fr-ch': [],
}
export default class SymetriqueOuPas extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    for (let i = 0; i < this.nbQuestions; ) {
      const pac = pacman({ fillStyle: 'red' }).translate(15, 0)
      const sensI = panneauSensInterdit()
        .translate(6, 0)
        .dilatationAnimee({
          duration: '3s',
          repeatCount: 'indefinite',
          loop: true,
          factorXStart: 1,
          factorXEnd: 1,
          factorYStart: 1,
          factorYEnd: -1,
        })
      const arrInter = panneauArretInterdit()
      const rp = panneauRoutePrioritaire()
      const fdrp = panneauFinDeRoutePrioritaire()
      const ov = ovale({ fillStyle: 'blue' })
      const statInter = panneauStationnementInterdit()
        .translate(6, -3)
        .rotationAnimee({
          angleStart: 0,
          angleEnd: 360,
          duration: '3s',
          repeatCount: 'indefinite',
          loop: true,
        })

      const ps = panneauStop()
      const prioriteAD = panneauCroisementPrioriteADroite()
      const pRC = panneauRetrecissementChaussee1()
      const pRC2 = panneauRetrecissementChaussee2()
      const pFT = panneauFeuTricolore()
      const pVSI = panneauVoieSansIssue()
      const lego1 = briqueLego({
        nx: 6,
        ny: 2,
        fillStyle: 'red',
        studFillStyle: 'red',
      })
      const lego2 = briqueLego({
        nx: 3,
        ny: 2,
        fillStyle: 'green',
        studFillStyle: 'green',
      })
      const lego3 = briqueLego({
        nx: 4,
        ny: 2,
        fillStyle: 'gray',
        studFillStyle: 'gray',
      })
      const lego4 = briqueLego({
        nx: 5,
        ny: 4,
        fillStyle: 'yellow',
        studFillStyle: 'yellow',
      })
      const lego5 = briqueLego({
        nx: 4,
        ny: 1,
        fillStyle: 'white',
        studFillStyle: 'white',
      })
      const lego6 = briqueLego({
        nx: 4,
        ny: 3,
        fillStyle: 'orange',
        studFillStyle: 'orange',
      })
      const lego7 = briqueLego({
        nx: 4,
        ny: 4,
        fillStyle: 'pink',
        studFillStyle: 'pink',
      })
      const lego8 = briqueLego({
        nx: 2,
        ny: 2,
        fillStyle: 'lightgray',
        studFillStyle: 'lightgray',
      })
      const lego9 = briqueLego({
        nx: 2,
        ny: 1,
        fillStyle: 'brown',
        studFillStyle: 'brown',
      })
      const interCircu = panneauInterdictionDeCirculer()
      const park = panneauParking().translate(0, -8)
      const hexa = hexagoneNonRegulier({
        rayonHorizontal: 20,
        rayonVertical: 10,
      }).translate(3, -8)
      const trap = trapezeIsocele({
        baseInferieure: 38,
        baseSuperieure: 25,
        hauteur: 32,
      }).translate(6, -8)
      const ad = aileDelta({ base: 40, hauteur: 20 }).translate(9, -8)
      const cv = cerfVolant({ hauteur: 30, largeur: 30 }).translate(12, -8)
      const penta = pentagoneRegulier({ rayon: 20 }).translate(15, -8)
      const etoile = etoile5Branches({
        rayonInterieur: 10,
        rayonExterieur: 20,
      }).translate(15, -10)
      const tri1 = triangleQuelconque1().translate(15, -3)
      interCircu.translate(0, -3)

      lego2.translate(3, -6)
      lego1.translate(0, -6)
      lego3.translate(6, -6)
      lego4.translate(9, -6)
      lego5.translate(12, -6)
      lego6.translate(15, -6)
      lego7.translate(0, -12)
      lego8.translate(3, -12)
      lego9.translate(6, -12)
      pVSI.translate(9, 0).rotate(30)
      pFT.translate(3, -10)
      const pFT2 = pFT.translationAnimee({
        dx: -100,
        dy: -30,
        duration: '3s',
        repeatCount: 'indefinite',
        loop: true,
      })
      pRC2.translate(9, -10)
      pRC.translate(0, -10)
      prioriteAD.translate(6, -10)
      ps.translate(3, -3).rotate(45)
      fdrp.translate(9, -3)
      const danger = panneauCederLePassage()
      const doubleSens = panneauDoubleSens()
      doubleSens.translate(12, -10)
      danger.translate(12, -3)
      ov.translate(0, -3)
      rp.translate(3, 0)
      arrInter.translate(12, 0)
      const objets = [
        park,
        penta,
        etoile,
        pac,
        tri1,
        trap,
        hexa,
        ad,
        cv,
        sensI,
        arrInter,
        rp,
        statInter,
        danger,
        fdrp,
        ps,
        doubleSens,
        prioriteAD,
        pRC,
        pRC2,
        pFT,
        pVSI,
        lego1,
        lego2,
        lego3,
        lego4,
        lego5,
        lego6,
        lego7,
        lego8,
        lego9,
        interCircu,
        pFT2,
      ]
      const texte = `On considère les figures suivantes :<br>
  ${mathalea2d(Object.assign({ scale: 0.5 }, fixeBordures(objets)), objets)}

  On dit que deux figures sont symétriques si l'on peut les superposer par pliage.<br>
  Est-ce que les figures ci-dessus sont symétriques ?<br>`

      this.listeQuestions[i] = texte
      this.listeCorrections[i] = ''
      i++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Type d\'axes', 4, '1 : Axe vertical\n2 : Axe horizontal\n3 : Axe oblique\n4 : Mélange']
  // this.besoinFormulaire2Numerique = ['Type de papier pointé', 4, '1 : Carrés\n2 : Hexagones\n3 : Triangles équilatéraux\n4 : Mélange']
}
