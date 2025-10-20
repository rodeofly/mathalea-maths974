import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { nombreDeChiffresDansLaPartieEntiere } from '../../lib/outils/nombres'
import { sp } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { context } from '../../modules/context'
import { setReponse } from '../../lib/interactif/gestionInteractif'

export const titre =
  'Multiplier ou diviser un entier par 10, 100, 1 000... (résultat entier)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const dateDeModifImportante = '09/08/2022'

/**
 * Un nombre à 2 chiffres (non multiple de 10) + 9
 * @author Rémi Angot

 * Ajout de la division par Guillaume Valmont le 09/08/2022
 */
export const uuid = 'bb9d8'

export const refs = {
  'fr-fr': ['6N2C-1'],
  'fr-2016': ['6N12'],
  'fr-ch': ['9NO3-2'],
}
export default class MultiplierEntierPar101001000 extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      2,
      '1 : Multiplication ou division par 10, 100 ou 1 000\n2 : Multiplication ou division par 10, 100, 1 000, 10 000 ou 100 000',
    ]
    this.besoinFormulaire2Numerique = [
      'Multiplication ou division',
      3,
      '1 : Multiplication\n2 : Division\n3 : Mélange',
    ]
    this.consigne = 'Calculer.'
    this.nbQuestions = 8
    this.nbCols = 2
    this.nbColsCorr = 2
    this.sup = 2
    this.sup2 = 1
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, choice([5, 6]), 7, 8, 9]
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    let listeDeB = []
    if (parseInt(this.sup) === 2) {
      listeDeB = combinaisonListes(
        [10, 100, 1000, 10000, 100000],
        this.nbQuestions,
      )
    } else {
      listeDeB = combinaisonListes([10, 100, 1000], this.nbQuestions)
    }
    let typeQuestionsDisponibles = ['multiplication', 'division']
    if (this.sup2 === 1) typeQuestionsDisponibles = ['multiplication']
    else if (this.sup2 === 2) typeQuestionsDisponibles = ['division']
    else typeQuestionsDisponibles = ['multiplication', 'division']
    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1:
          a = randint(1, 9)
          break
        case 2:
          a = randint(2, 9) * 10
          break
        case 3:
          a = randint(2, 9) * 100
          break
        case 4:
          a = randint(2, 9) * 1000
          break
        case 5:
          a = randint(1, 9) * 100 + randint(1, 9)
          break
        case 6:
          a = randint(1, 9) * 1000 + randint(1, 9)
          break
        case 7:
          a = randint(1, 9) * 100 + randint(1, 9) * 10 + randint(1, 9)
          break
        case 8:
          a = randint(1, 9) * 10000 + randint(1, 9) * 100
          break
        case 9:
        default:
          a = randint(1, 9) * 10 + randint(1, 9)
          break
      }

      b = listeDeB[i]
      switch (listeTypeQuestions[i]) {
        case 'multiplication':
          if (choice([true, false])) {
            const c = a
            a = b
            b = c
          }
          texte = `$${texNombre(a)}\\times${texNombre(b)}$`
          setReponse(this, i, [texNombre(a * b), a * b])
          texteCorr = `$${texNombre(a)}\\times${texNombre(b)}=${texNombre(a * b)}$`
          break
        case 'division':
        default:
          texte = `$${texNombre(a * b)}\\div${texNombre(b)}$`
          setReponse(this, i, a)
          texteCorr = `$${texNombre(a * b)}\\div${texNombre(b)}=${texNombre(a)}$`
          break
      }
      texte += ajouteChampTexteMathLive(this, i, ' college6eme', {
        texteAvant: `${sp(2)}=`,
      })
      if (context.isAmc) {
        const nbDigitsSupplementaires = randint(0, 2)
        this.autoCorrection[i] = {
          enonce: texte, // Si vide, l'énoncé est celui de l'exercice.
          propositions: [
            {
              texte: texteCorr, // Si vide, le texte est la correction de l'exercice.
            },
          ],
          reponse: {
            texte:
              'le texte affiché au dessus du formulaire numerique dans AMC', // facultatif
            // valeur: [a * b], // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9. Cette valeur doit être passée dans un tableau d'où la nécessité des crochets.
            // @ts-expect-error
            valeur: [listeTypeQuestions[i] === 'division' ? a : a * b], // obligatoire (la réponse numérique à comparer à celle de l'élève), NE PAS METTRE DE STRING à virgule ! 4.9 et non pas 4,9. Cette valeur doit être passée dans un tableau d'où la nécessité des crochets.
            alignement: 'flushleft', // EE : ce champ est facultatif et n'est fonctionnel que pour l'hybride. Il permet de choisir où les cases sont disposées sur la feuille. Par défaut, c'est comme le texte qui le précède. Pour mettre à gauche, au centre ou à droite, choisir parmi ('flushleft', 'center', 'flushright').
            param: {
              digits:
                nbDigitsSupplementaires +
                nombreDeChiffresDansLaPartieEntiere(
                  listeTypeQuestions[i] === 'division' ? a : a * b,
                ), // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
              // digits: 7, // obligatoire pour AMC (le nombre de chiffres pour AMC, si digits est mis à 0, alors il sera déterminé pour coller au nombre décimal demandé)
              decimals: 0, // facultatif. S'il n'est pas mis, il sera mis à 0 et sera déterminé automatiquement comme décrit ci-dessus
              signe: false, // (présence d'une case + ou - pour AMC)
              approx: 0, // (0 = valeur exacte attendue, sinon valeur de tolérance... voir plus bas pour un point technique non intuitif)
            },
          },
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
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
