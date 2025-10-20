import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

import { simplify } from 'mathjs'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { shuffle } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { sp } from '../../lib/outils/outilString'
import { calculer, toTex } from '../../modules/outilsMathjs'

export const titre =
  "Calculer la valeur d'une expression littérale à une variable pour une valeur donnée"
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '4/5/2024'
export const uuid = '76926'

export const refs = {
  'fr-fr': ['2N40-10'],
  'fr-ch': ['11FA1-5b'],
}

/**
 * Modifie aléatoirement un nombre de valeurs positives en négatives dans un tableau
 *
 * @param {...number} args - Liste de nombres à traiter
 * @description
 * Cette fonction :
 * 1. Identifie les positions des nombres positifs dans le tableau
 * 2. Sélectionne aléatoirement entre 1 et N positions (N = nombre de positifs)
 * 3. Inverse le signe des valeurs aux positions sélectionnées
 *
 * @returns {number[]} Tableau avec certaines valeurs rendues négatives
 *
 * @example
 * garantirUnNegatif(1, 2, 3)    // Peut retourner [-1, 2, 3] ou [1, -2, -3] etc.
 * garantirUnNegatif(1, -2, 3)   // Peut retourner [-1, -2, 3] ou [1, -2, -3]
 * garantirUnNegatif(-1, -2, -3) // Retourne [-1, -2, -3] (déjà tous négatifs)
 *
 * @requires randint - Fonction qui retourne un entier aléatoire entre min et max inclus
 */
function garantirUnNegatif(...args: number[]) {
  const indexPositifs = shuffle(
    args
      .map((val, index) => (val > 0 ? index : -1))
      .filter((val) => val !== -1),
  )
  const nbNegatifs = randint(1, indexPositifs.length)
  for (let i = 0; i < nbNegatifs; i++) {
    args[indexPositifs[i]] *= -1
  }
  return args
}
export default class SubstituerDansUneExpressionLitterale extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 5

    this.besoinFormulaireTexte = [
      "Type d'expression",
      'Nombres séparés par des tirets :\n1: a+bx\n2: (a+cx)b\n3: ax^2+bx+c\n4: Mélange',
    ]
    this.besoinFormulaire2Texte = [
      'Type de nombres',
      'Nombres séparés par des tirets :\n1: Entiers positifs\n2: Entiers relatifs (au moins 1 coeff/x négatifs)\n3: Mélange',
    ]
    this.besoinFormulaire3CaseACocher = ['Rendre les questions plus variées']
    this.sup = 4
    this.sup2 = 1
    this.sup3 = true
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions === 1
        ? "Calculer, pour la valeur donnée de $x$, le résultat de l'expression suivante"
        : 'Calculer, pour les valeurs données de $x$, le résultat des expressions suivantes'

    const typeExpression = ['a+b*x', 'b*(a+c*x)', 'a*x^2+b*x+c']
    const typeDeNombres = ['entiers positifs', 'entiers relatifs']

    const listeTypeExpression = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 3,
      defaut: 1,
      listeOfCase: typeExpression,
      nbQuestions: this.nbQuestions,
      melange: 4,
    })

    const listeTypeDeNombres = gestionnaireFormulaireTexte({
      saisie: this.sup2,
      min: 1,
      max: 2,
      defaut: 1,
      listeOfCase: typeDeNombres,
      nbQuestions: this.nbQuestions,
      melange: 3,
    })

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      let [a, b, x, c]: number[] = []
      let expressionABCX = listeTypeExpression[i] as string
      let max
      let diversificationListe: string[]

      switch (listeTypeExpression[i]) {
        case 'a+b*x':
          if (this.sup3) {
            diversificationListe = ['a+b*x', 'x*b+a', 'b*x+a', 'a+x*b']
            expressionABCX =
              diversificationListe[randint(0, diversificationListe.length - 1)]
          }
          max = 10
          a = randint(1, max)
          b = randint(2, max, [0])
          x = randint(1, max)
          c = 0
          break
        case 'b*(a+c*x)':
          if (this.sup3) {
            diversificationListe = [
              'b*(a+c*x)',
              'b*(c*x+a)',
              'b*(a+x*c)',
              'b*(x*c+a)',
              'b*(c*x+a)',
              'b*(a+c*x)',
              '(a+c*x)*b',
              '(c*x+a)*b',
              '(a+x*c)*b',
              '(x*c+a)*b',
              '(c*x+a)*b',
              '(a+c*x)*b',
            ]
            expressionABCX =
              diversificationListe[randint(0, diversificationListe.length - 1)]
          }
          max = 5
          a = randint(1, max)
          b = randint(1, max, [0])
          x = randint(1, max)
          c = randint(2, max, [0, 1])
          break
        case 'a*x^2+b*x+c':
          if (this.sup3) {
            diversificationListe = [
              'a*x^2+b*x+c',
              'a*x^2+c+b*x',
              'b*x+a*x^2+c',
              'b*x+c+a*x^2',
              'c+a*x^2+b*x',
              'c+b*x+a*x^2',
              'a*x^2+b*x+c',
              'a*x^2+c+b*x',
              'b*x+a*x^2+c',
              'b*x+c+a*x^2',
              'c+a*x^2+b*x',
              'c+b*x+a*x^2',
              'x^2*a+x*b+c',
              'x^2*a+c+b*x',
              'b*x+x^2*a+c',
              'b*x+c+x^2*a',
              'c+x^2*a+b*x',
              'c+b*x+x^2*a',
              'a*x^2+x*b+c',
              'a*x^2+c+b*x',
              'b*x+a*x^2+c',
              'b*x+c+a*x^2',
              'c+a*x^2+x*b',
              'c+b*x+a*x^2',
            ]
            expressionABCX =
              diversificationListe[randint(0, diversificationListe.length - 1)]
          }
          max = 5
          a = randint(1, max, [0])
          b = randint(2, max, [0])
          x = randint(1, 3)
          c = randint(1, max)
          break
      }

      if (listeTypeDeNombres[i] === 'entiers relatifs') {
        ;[a, b, x, c] = garantirUnNegatif(a, b, x, c)
        if (x === 1) x = -1
      }

      const expressionX = simplify(expressionABCX, [], { a, b, c }).toString()
      const expression = simplify(expressionX, [], { x }).toString()

      texte = `Pour $x=${x}$,${sp(1)} calculer : $${toTex(expressionX, { rearrangeCoefficient: false })}$.`
      if (this.interactif) {
        texte = `Pour $x=${x}$,${sp(1)} $${toTex(expressionX, { rearrangeCoefficient: false })} = $`
        texte += ajouteChampTexteMathLive(this, i, KeyboardType.clavierDeBase)
      }

      const corrDetails = calculer(expression, {
        removeImplicit: false,
        removeMultiplicationByNegativeOne: false,
      })
      texteCorr = corrDetails.texteCorr + '<br>'
      texteCorr += `Le  résultat est donc : $${miseEnEvidence(corrDetails.result)}$.`

      handleAnswers(this, i, {
        reponse: {
          value: corrDetails.result,
        },
      })

      if (this.questionJamaisPosee(i, a, b, x, c)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
