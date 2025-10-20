import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
  reduireAxPlusB,
  rienSi1,
} from '../../lib/outils/ecritures'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { context } from '../../modules/context'

export const titre = 'Réduire une expression de la forme $ax+bx$ '
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'

/**
 * Réduire des expressions de la forme ax+bx
 *
 * @author Rémi Angot
 */
export const uuid = '1bce3'

export const refs = {
  'fr-fr': ['5L13', 'BP2AutoI15'],
  'fr-ch': ['10FA1-11'],
}
export default class Reductionaxbx extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Avec des nombres relatifs']

    this.nbQuestions = 5

    this.sup = true
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions !== 1
        ? 'Réduire les expressions suivantes.'
        : "Réduire l'expression suivante."
    const variables = ['x', 'y', 'z', 'a', 'b', 'c']

    const typesDeQuestionsDisponibles = [
      'ax+bx',
      'ax+bx',
      'ax+bx',
      'ax+bx',
      'ax+x',
    ]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, reponse, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const x = variables[randint(0, 5)]
      a = randint(-11, 11, 0)
      a = this.sup ? randint(-11, 11, 0) : randint(2, 11, 0)
      b = this.sup ? randint(-11, 11, [0, a, -a]) : randint(-a, a, 0)
      switch (listeTypeDeQuestions[i]) {
        case 'ax+bx':
          texte = `$${lettreDepuisChiffre(i + 1)}=${rienSi1(a)}${x}${ecritureAlgebriqueSauf1(b)}${x}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${rienSi1(a)}${x}${ecritureAlgebriqueSauf1(b)}${x}=(${a}${ecritureAlgebrique(b)})\\times ${x}=${rienSi1(a + b)}${x}$`
          reponse = reduireAxPlusB(a + b, 0, x)
          break
        case 'ax+x':
        default:
          texte = `$${lettreDepuisChiffre(i + 1)}=${rienSi1(a)}${x}+${x}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)}=${rienSi1(a)}${x}+${x}=(${a}+1)\\times ${x}=${rienSi1(a + 1)}${x}$`
          reponse = reduireAxPlusB(a + 1, 0, x)
          break
      }

      handleAnswers(this, i, { reponse: { value: reponse } })
      texte += ajouteChampTexteMathLive(this, i, ' ', { texteAvant: ' $=$' })
      if (this.questionJamaisPosee(i, x, a, b)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        if (context.isAmc) {
          this.autoCorrection[i] = {
            // enonce: 'Réduire l\'expression ' + '$' + texte.split('=')[1] + '.',
            enonce: "Réduire l'expression " + texte + '.',
            propositions: [
              {
                texte: texteCorr,
                statut: 1, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                sanscadre: false, // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                // @ts-expect-error
                pointilles: false, // EE : ce champ est facultatif et permet (si false) d'enlever les pointillés sur chaque ligne.
              },
            ],
          }
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
