import Exercice from '../../Exercice'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import { number } from 'mathjs'
import { Arbre, texProba } from '../../../modules/arbres'

import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'

import { context } from '../../../modules/context'
import { setReponse } from '../../../lib/interactif/gestionInteractif'

export const titre = 'Calculer des probabilités à partir d’un arbre'
export const dateDePublication = '25/12/2021'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * On donne un arbre de probabilité et on doit calculer une probabilité partielle manquante
 * @author Jean-Claude Lhote

 */
export const uuid = 'd15f3'

export const refs = {
  'fr-fr': ['can1P04'],
  'fr-ch': [],
}
export default class CalculProbaArbre2e extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Proba rationnelle', true]
    this.sup = true

    this.nbQuestions = 1

    // this.sup = 1; // Niveau de difficulté
  }

  nouvelleVersion() {
    const rationnel = this.sup
    for (
      let i = 0, cpt = 0, pA, pB, pAC, pBC, omega, texte, texteCorr, objets, pC;
      i < this.nbQuestions && cpt < 50;

    ) {
      objets = []
      // On choisit les probas de l'arbre
      pA = number(randint(2, 8) / 10)
      pB = number(1 - pA)
      pAC = number(randint(2, 8) / 10)
      pBC = number(randint(2, 8) / 10)
      // On définit l'arbre complet
      omega = new Arbre({
        racine: true,
        rationnel,
        nom: '',
        proba: 1,
        visible: false,
        alter: '',
        enfants: [
          new Arbre({
            rationnel,
            nom: 'A',
            proba: pA,
            enfants: [
              new Arbre({
                rationnel,
                nom: 'C',
                proba: pAC,
              }),
              new Arbre({
                rationnel,
                nom: '\\bar C',
                proba: number(1 - pAC),
              }),
            ],
          }),
          new Arbre({
            rationnel,
            nom: '\\bar A',
            proba: number(1 - pA),
            enfants: [
              new Arbre({
                rationnel,
                nom: 'C',
                proba: pBC,
                visible: false,
                alter: 'x',
              }),
              new Arbre({
                rationnel,
                nom: '\\bar C',
                proba: number(1 - pBC),
                visible: false,
                alter: '',
              }),
            ],
          }),
        ],
      })

      omega.setTailles() // On calcule les tailles des arbres.
      objets = omega.represente(0, 6, 0, rationnel ? 2 : 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
      pC = omega.getProba('C', false) // on calcule P(C) décimale.
      texte = `On donne l'arbre de probabilités ci-dessous et $P(C)=${texProba(pC)}$.<br><br> 
      `
      texte += mathalea2d(
        Object.assign({ style: 'inline' }, fixeBordures(objets)),
        objets,
      )
      texte += `<br>
      
      $x=$ ${this.interactif || !context.isHtml ? ajouteChampTexteMathLive(this, i, '') : '\\ldots'}`
      texteCorr =
        "Comme $A$ et $\\bar A$ forment une partition de l'univers, d'après la loi des probabilités totales :<br>"
      texteCorr += '$P(C)=P(A \\cap C)+P(\\bar{A} \\cap C)$.<br>'
      texteCorr += `Or $P(\\bar{A} \\cap C)=P(\\bar{A}) \\times P_{\\bar{A}}(C)=${texProba(pB, false)}x$.<br>`
      texteCorr += `Donc $${texProba(pB, false)}x=P(C)-P(A \\cap C)=${texProba(pC, false)}-${texProba(pA, false)}\\times ${texProba(pAC, false)}=${texProba(pC, false)}-${texProba(pA * pAC, false)}=${texProba(pC - pA * pAC, false)}$.<br>`
      texteCorr += `Donc $x=\\dfrac{${texProba(pC - pA * pAC, false)}}{${texProba(pB, false)}}=${texProba(pBC)}$`
      setReponse(this, i, pBC)
      this.canEnonce = `On donne l'arbre de probabilités ci-dessous et $P(C)=${texProba(pC)}$.<br>
      
      `
      this.canEnonce += mathalea2d(
        {
          xmin: -0.1,
          xmax: 14,
          ymin: 0,
          ymax: 6,
          style: 'inline',
          scale: 0.5,
        },
        objets,
      )
      this.canReponseACompleter = `   
      $x=\\ldots$ `
      if (this.questionJamaisPosee(i, pA, pAC, pBC)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(this.canReponseACompleter)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
