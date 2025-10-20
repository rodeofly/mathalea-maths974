import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { remplisLesBlancs } from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { nombreDeChiffresDansLaPartieEntiere } from '../../lib/outils/nombres'
import { texNombre } from '../../lib/outils/texNombre'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Effectuer addition de deux entiers'
export const amcReady = true
export const amcType = 'AMCNum'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModifImportante = '22/08/2024'

/**
 * Additionner deux entiers
 * @author Rémi Angot

 */
export const uuid = 'ace0a'

export const refs = {
  'fr-fr': ['6N0A-1'],
  'fr-2016': ['6C10-4'],
  'fr-ch': ['9NO3-16'],
}
export default class ExerciceTablesAdditions extends Exercice {
  constructor(max = 20) {
    super()
    this.consigne = 'Calculer.'
    this.sup2 = '1'
    this.sup = max // Le paramètre accessible à l'utilisateur sera la valeur maximale
    this.spacing = 2

    this.besoinFormulaireNumerique = ['Valeur maximale', 99999]
    this.besoinFormulaire2Texte = [
      'Type de questions',
      'Nombres séparés par des tirets :\n1: Calculer la somme\n2: Calculer un terme manquant\n3: Mélange',
    ]
  }

  nouvelleVersion() {
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup2,
      min: 1,
      max: 2,
      defaut: 1,
      melange: 3,
      shuffle: true,
      listeOfCase: ['somme', 'terme'],
      nbQuestions: this.nbQuestions,
    })
    for (
      let i = 0, a, b, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      this.autoCorrection[i] = {}
      a = randint(2, this.sup)
      b = randint(2, this.sup)
      const choix = choice([false, true])
      texte =
        listeTypeDeQuestions[i] === 'somme'
          ? remplisLesBlancs(
              this,
              i,
              `${texNombre(a, 0)} + ${texNombre(b, 0)} = %{champ1}`,
              'fillInTheBlank',
            )
          : choix
            ? remplisLesBlancs(
                this,
                i,
                `${texNombre(a, 0)} + %{champ1} = ${texNombre(a + b, 0)}`,
                'fillInTheBlank',
              )
            : remplisLesBlancs(
                this,
                i,
                `%{champ1} + ${texNombre(a, 0)} = ${texNombre(a + b, 0)}`,
                'fillInTheBlank',
              )

      texteCorr =
        listeTypeDeQuestions[i] !== 'somme'
          ? choix
            ? `$ ${texNombre(a, 0)} + ${miseEnEvidence(texNombre(b, 0))} = ${texNombre(a + b, 0)} $`
            : `$ ${miseEnEvidence(texNombre(b, 0))} + ${texNombre(a, 0)} = ${texNombre(a + b, 0)} $`
          : `$ ${texNombre(a, 0)} + ${texNombre(b, 0)} = ${miseEnEvidence(texNombre(a + b, 0))} $`

      if (this.interactif) {
        handleAnswers(this, i, {
          champ1: {
            value: String(listeTypeDeQuestions[i] === 'somme' ? a + b : b),
          },
        })
      }

      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
        this.autoCorrection[i].propositions = [{ texte: texteCorr, statut: '' }]
        // @ts-expect-error
        this.autoCorrection[i].reponse.param = {
          digits: Math.max(2, nombreDeChiffresDansLaPartieEntiere(a + b)),
          decimals: 0,
          exposantNbChiffres: 0,
          signe: false,
        }
      }
      if (this.questionJamaisPosee(i, a, b)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
