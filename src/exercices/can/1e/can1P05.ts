import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import Exercice from '../../Exercice'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import Decimal from 'decimal.js'
import { Arbre } from '../../../modules/arbres'

import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'

import { setReponse } from '../../../lib/interactif/gestionInteractif'

export const titre =
  'Utiliser la formule des probabilités totales dans un arbre'
export const dateDePublication = '05/07/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 *
 * @author Gilles Mora

 */
export const uuid = 'ee478'

export const refs = {
  'fr-fr': ['can1P05'],
  'fr-ch': [],
}
export default class CalculProbaFormuleProbaTotale extends Exercice {
  constructor() {
    super()

    this.sup = true
    this.keyboard = [
      'numbers',
      'fullOperations',
      'variables',
      'trigo',
      'advanced',
    ]

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    for (
      let i = 0,
        cpt = 0,
        reponse1,
        reponse2,
        pA,
        pBsachantA,
        pBbarresachantAbarre,
        pBbarresachantA,
        pAbarre,
        pBsachantAbarre,
        omega,
        texte,
        texteCorr,
        objets;
      i < this.nbQuestions && cpt < 50;

    ) {
      objets = []
      // On choisit les probas de l'arbre
      pA = new Decimal(randint(1, 9, 5)).div(10)
      pAbarre = new Decimal(pA).mul(-1).add(1)
      pBsachantA = new Decimal(randint(1, 9, 5)).div(10)
      pBbarresachantA = new Decimal(pBsachantA).mul(-1).add(1)
      pBsachantAbarre = new Decimal(randint(1, 9, 5)).div(10)
      pBbarresachantAbarre = new Decimal(pBsachantAbarre).mul(-1).add(1)
      reponse1 = new Decimal(pA)
        .mul(pBsachantA)
        .add(new Decimal(pAbarre).mul(pBsachantAbarre))
      reponse2 = new Decimal(pA)
        .mul(pBbarresachantA)
        .add(new Decimal(pAbarre).mul(pBbarresachantAbarre))
      switch (
        choice([1, 2]) //
      ) {
        case 1:
          // On définit l'arbre complet
          omega = new Arbre({
            racine: true,
            rationnel: false,
            nom: '',
            proba: 1,
            visible: false,
            alter: '',
            enfants: [
              new Arbre({
                rationnel: false,
                nom: 'A',
                proba: pA,
                alter: '',
                enfants: [
                  new Arbre({
                    rationnel: false,
                    nom: 'B',
                    proba: pBsachantA,
                    alter: '',
                  }),
                  new Arbre({
                    rationnel: false,
                    nom: '\\overline{B}',
                    proba: pBbarresachantA,
                  }),
                ],
              }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: pAbarre,
                enfants: [
                  new Arbre({
                    rationnel: false,
                    nom: 'B',
                    proba: pBsachantAbarre,
                  }),
                  new Arbre({
                    rationnel: false,
                    nom: '\\overline{B}',
                    proba: pBbarresachantAbarre,
                  }),
                ],
              }),
            ],
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = `On donne l'arbre de probabilités ci-dessous :<br>
          
          `
          texte += mathalea2d(
            {
              xmin: -0.1,
              xmax: 14,
              ymin: 0,
              ymax: 7,
              style: 'inline',
              scale: 0.5,
            },
            ...objets,
          )

          if (this.interactif) {
            texte += '<br>$P(B)=$ '
            texte += ajouteChampTexteMathLive(this, i, ' lycee')
          } else {
            texte += `<br>
          
          Calculer $P(B)$. `
          }

          texteCorr = ` D'après la formule des probabilités totales, <br>
         $\\begin{aligned}
      P(B)&=P(A\\cap B)+P(\\overline{A}\\cap B)\\\\
      &= P(A)\\times P_{A}(B)+P(\\overline{A})\\times P_{\\overline{A}}(B)\\\\
      &=${texNombre(pA, 1)}\\times ${texNombre(pBsachantA, 1)}+${texNombre(pAbarre, 1)}\\times ${texNombre(pBsachantAbarre, 1)}\\\\
      &=${texNombre(reponse1, 2)}
      \\end{aligned}$
      `
          setReponse(this, i, reponse1)
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break
        case 2:
          // On définit l'arbre complet
          omega = new Arbre({
            racine: true,
            rationnel: false,
            nom: '',
            proba: 1,
            visible: false,
            alter: '',
            enfants: [
              new Arbre({
                rationnel: false,
                nom: 'A',
                proba: pA,
                alter: '',
                enfants: [
                  new Arbre({
                    rationnel: false,
                    nom: 'B',
                    proba: pBsachantA,
                    alter: '',
                  }),
                  new Arbre({
                    rationnel: false,
                    nom: '\\overline{B}',
                    proba: pBbarresachantA,
                  }),
                ],
              }),
              new Arbre({
                rationnel: false,
                nom: '\\overline{A}',
                proba: pAbarre,
                enfants: [
                  new Arbre({
                    rationnel: false,
                    nom: 'B',
                    proba: pBsachantAbarre,
                  }),
                  new Arbre({
                    rationnel: false,
                    nom: '\\overline{B}',
                    proba: pBbarresachantAbarre,
                  }),
                ],
              }),
            ],
          })

          omega.setTailles() // On calcule les tailles des arbres.
          objets = omega.represente(0, 7, 0, 1.5, true, 1) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
          texte = `On donne l’arbre de probabilités ci-dessous :<br>

         `
          texte += mathalea2d(
            {
              xmin: -0.1,
              xmax: 14,
              ymin: 0,
              ymax: 7,
              style: 'inline',
              scale: 0.5,
            },
            ...objets,
          )

          if (this.interactif) {
            texte += '<br> $P(\\overline{B})=$ '
            texte += ajouteChampTexteMathLive(this, i, ' lycee')
          } else {
            texte += `<br>
          
          Calculer $P(\\overline{B})$. `
          }

          texteCorr = ` D'après la formule des probabilités totales, <br>
           $\\begin{aligned}
        P(\\overline{B})&=P(A\\cap \\overline{B})+P(\\overline{A}\\cap \\overline{B})\\\\
        &= P(A)\\times P_{A}(\\overline{B})+P(\\overline{A})\\times P_{\\overline{A}}(\\overline{B})\\\\
        &=${texNombre(pA, 1)}\\times ${texNombre(pBbarresachantA, 1)}+${texNombre(pAbarre, 1)}\\times ${texNombre(pBbarresachantAbarre, 1)}\\\\
        &=${texNombre(reponse2, 2)}
        \\end{aligned}$
        `
          setReponse(this, i, reponse2)
          this.canEnonce = texte
          this.canReponseACompleter = ''
          break
      }
      if (this.questionJamaisPosee(i, pA, pBsachantA, pBsachantAbarre)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
