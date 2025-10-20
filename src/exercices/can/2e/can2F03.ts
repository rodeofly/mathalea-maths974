import { choice } from '../../../lib/outils/arrayOutils'
import {
  texteEnCouleur,
  texteEnCouleurEtGras,
  miseEnEvidence,
} from '../../../lib/outils/embellissements'
import {
  ecritureParentheseSiNegatif,
  reduireAxPlusB,
  rienSi1,
} from '../../../lib/outils/ecritures'
import { sp } from '../../../lib/outils/outilString'
import { fraction } from '../../../modules/fractions'
import Exercice from '../../Exercice'
import {
  randint,
  listeQuestionsToContenuSansNumero,
} from '../../../modules/outils'
import { propositionsQcm } from '../../../lib/interactif/qcm'
export const titre = 'Déterminer le signe d’une fonction affine (V/F)'
export const interactifReady = true
export const interactifType = 'qcm'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication 24/10/2021
*/
export const uuid = '03b1d'

export const refs = {
  'fr-fr': ['can2F03'],
  'fr-ch': ['1mQCM-4'],
}
export default class SigneFonctionAffine extends Exercice {
  constructor() {
    super()

    this.date = 1635094684684
    this.nbQuestions = 1

    this.listeAvecNumerotation = true
  }

  nouvelleVersion() {
    let texte, texteCorr, a, b, n, maFraction, monQcm
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      switch (
        choice(['a', 'b']) //, 'b'
      ) {
        case 'a':
          a = randint(-5, 5, 0)
          n = randint(2, 7) * choice([-1, 1])
          b = n * a
          maFraction = fraction(-b, a)
          texte = `$${reduireAxPlusB(a, b)}$ est strictement positif pour $x>${maFraction.texFractionSimplifiee}$.`
          this.canEnonce = texte
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                texte: 'Vrai',
                statut: a > 0,
              },
              {
                texte: 'Faux',
                statut: a < 0,
              },
            ],
            options: { ordered: true, radio: true },
          }
          monQcm = propositionsQcm(this, i)
          texte += monQcm.texte
          if (a > 0) {
            texteCorr =
              monQcm.texteCorr +
              `<br>$${reduireAxPlusB(a, b)}>0$.<br>
            En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
            $${rienSi1(a)}x>${-b}$<br>
            En divisant par $${a}$ dans chaque membre, on obtient :<br>
            $x>${maFraction.texFractionSimplifiee}$.<br><br>
            $${reduireAxPlusB(a, b)}$ est strictement positif pour $x>${maFraction.texFractionSimplifiee}$, il fallait donc cocher "${texteEnCouleurEtGras('Vrai')}".`
          } else {
            texteCorr =
              monQcm.texteCorr +
              `<br>$${reduireAxPlusB(a, b)}>0$.<br>
            En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
            $${rienSi1(a)}x>${-b}$<br>
            En divisant par $(${a})$ dans chaque membre, on obtient :<br>
            $x$ $${miseEnEvidence('<', 'blue')}$ $${maFraction.texFractionSimplifiee}$ ${sp(3)}
            ${texteEnCouleur('(quand on divise par un nombre strictement négatif, on change le sens de l’inégalité).', 'blue')}<br><br>
            $${reduireAxPlusB(a, b)}$ est strictement positif pour $x<${maFraction.texFractionSimplifiee}$, il fallait donc cocher "${texteEnCouleurEtGras('Faux')}".`
          }

          break
        case 'b':
          a = randint(-5, 5, 0)
          n = randint(2, 7) * choice([-1, 1])
          b = n * a
          maFraction = fraction(-b, a)
          texte = `$${reduireAxPlusB(a, b)}$ est strictement positif pour $x<${maFraction.texFractionSimplifiee}$.`
          this.canEnonce = texte
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              {
                texte: 'Vrai',
                statut: a < 0,
              },
              {
                texte: 'Faux',
                statut: a > 0,
              },
            ],
            options: { ordered: true },
          }
          monQcm = propositionsQcm(this, i)
          texte += monQcm.texte
          if (a < 0) {
            texteCorr =
              monQcm.texteCorr +
              `<br>$${reduireAxPlusB(a, b)}>0$.<br>
              En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
              $${rienSi1(a)}x>${-b}$<br>
              En divisant par $(${a})$ dans chaque membre, on obtient :<br>
              $x$ $${miseEnEvidence('<', 'blue')}$ $${maFraction.texFractionSimplifiee}$ ${sp(3)}
              ${texteEnCouleur('(quand on divise par un nombre strictement négatif, on change le sens de l’inégalité).', 'blue')}<br><br>
              $${reduireAxPlusB(a, b)}$ est strictement positif pour $x<${maFraction.texFractionSimplifiee}$, il fallait donc cocher "${texteEnCouleurEtGras('Vrai')}".`
          } else {
            texteCorr =
              monQcm.texteCorr +
              `<br>$${reduireAxPlusB(a, b)}>0$.<br>
              En ajoutant $${ecritureParentheseSiNegatif(-b)}$ dans chaque membre, on obtient :<br>
              $${rienSi1(a)}x>${-b}$<br>
              En divisant par $${a}$ dans chaque membre, on obtient :<br>
              $x>${maFraction.texFractionSimplifiee}$.<br><br>
              $${reduireAxPlusB(a, b)}$ est strictement positif pour $x>${maFraction.texFractionSimplifiee}$, il fallait donc cocher "${texteEnCouleurEtGras('Faux')}".`
          }

          break
      }
      if (this.questionJamaisPosee(i, a, b, n)) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.canReponseACompleter = monQcm.texte
        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(this.canReponseACompleter)
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
}
