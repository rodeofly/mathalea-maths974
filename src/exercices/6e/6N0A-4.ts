import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { propositionsQcm } from '../../lib/interactif/qcm'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { creerCouples, shuffle } from '../../lib/outils/arrayOutils'
import { arrondi } from '../../lib/outils/nombres'
import { texNombre, texNombre2 } from '../../lib/outils/texNombre'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const amcReady = true
export const amcType = 'qcmMono'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

export const titre =
  'Utiliser tables de multiplication pour effectuer produits avec multiple de 10'

/**
 * Les 2 facteurs peuvent terminer par aucun, 1, 2 ou 3 zéros
 * @author Rémi Angot

 */
export const uuid = '23bc8'

export const refs = {
  'fr-fr': ['6N0A-4'],
  'fr-2016': ['6C10-2'],
  'fr-ch': ['9NO3-15'],
}
export default class ExerciceTablesMultiplicationsEtMultiplesDe10 extends Exercice {
  constructor(tablesParDefaut = '2-3-4-5-6-7-8-9') {
    super()
    // Multiplier deux nombres
    this.sup = tablesParDefaut
    this.sup2 = 1
    this.consigne = 'Calculer.'
    this.spacing = 2

    this.besoinFormulaireTexte = [
      'Choix des tables (entre 2 et 9)',
      'Nombres séparés par des tirets :',
    ] // Texte, tooltip
    if (context.isHtml) {
      this.besoinFormulaire2Numerique = [
        'Exercice interactif',
        2,
        '1 : QCM\n2 : Numérique',
      ]
    }
    this.sup3 = 5
    this.besoinFormulaire3Texte = [
      'types de questions',
      "Nombres séparés par des tirets :\n1 : un facteur à 1 chiffre l'autre à 2 chiffres\n2 : Un facteur à 1 chiffre l'autre à 3 chiffres\n3 : Deux facteurs à 2chiffres\n4 : Un facteur à 2 chiffres l'autre à 3 chiffres\n5 : Mélange",
    ]
  }

  nouvelleVersion() {
    const typesDeQuestions = gestionnaireFormulaireTexte({
      min: 1,
      max: 4,
      defaut: 5,
      nbQuestions: this.nbQuestions,
      saisie: this.sup3,
      melange: 5,
    }).map(Number)
    if (context.isHtml)
      this.besoinFormulaire2Numerique = [
        'Exercice interactif',
        2,
        '1 : QCM\n2 : Numérique',
      ]
    // Texte, tooltip
    else this.besoinFormulaire2Numerique = false

    this.interactifType = this.sup2 === 2 ? 'mathLive' : 'qcm'

    const tables = gestionnaireFormulaireTexte({
      min: 2,
      max: 9,
      defaut: randint(2, 9),
      nbQuestions: this.nbQuestions,
      saisie: this.sup,
      melange: 11,
    })

    const couples = creerCouples(
      tables.map(Number),
      [2, 3, 4, 5, 6, 7, 8, 9],
      this.nbQuestions,
    ) // Liste tous les couples possibles (2,3)≠(3,2)
    for (
      let i = 0, cpt = 0, a, b, texte, texteCorr, melange;
      i < this.nbQuestions && cpt < 100;

    ) {
      this.autoCorrection[i] = {}
      const [k1, k2] = shuffle(
        typesDeQuestions[i] === 1
          ? [1, 10] // un facteur à 1 chiffre l'autre à 2 chiffres
          : typesDeQuestions[i] === 2
            ? [1, 100] // Un facteur à 1 chiffre l'autre à 3 chiffres
            : typesDeQuestions[i] === 3
              ? [10, 10] // Deux facteurs à 2chiffres
              : [10, 100], // Un facteur à 2 chiffres l'autre à 3 chiffres
      )
      a = couples[i][0]
      b = couples[i][1]
      a = k1 * a
      b = k2 * b
      melange = randint(0, 1)
      if (melange === 1) {
        // échange a et b pour que les multiplications ne soient pas toujours dans le même ordre (surtout lorsque tables n'a qu'un seul élément)
        const c = a
        a = b
        b = c
      }
      texte = '$ ' + texNombre(a) + ' \\times ' + texNombre(b) + ' =  $'
      texteCorr =
        '$ ' +
        texNombre(a) +
        ' \\times ' +
        texNombre(b) +
        ' = ' +
        texNombre(a * b) +
        ' $'

      this.autoCorrection[i].enonce = `${texte}\n`
      this.autoCorrection[i].propositions = [
        {
          texte: `$${texNombre2(a * b)}$`,
          statut: true,
          feedback: 'Correct !',
        },
        {
          texte: `$${texNombre2(arrondi((a * b) / 10))}$`,
          statut: false,
          feedback: 'Compte le nombre de zéros dans chaque facteur',
        },
        {
          texte: `$${texNombre2(arrondi(a * b * 10))}$`,
          statut: false,
          feedback: 'Compte le nombre de zéros dans chaque facteur',
        },
        {
          texte: `$${texNombre2(arrondi((a * b) / 100))}$`,
          statut: false,
          feedback: 'Compte le nombre de zéros dans chaque facteur',
        },
        {
          texte: `$${texNombre2(arrondi(a * b * 100))}$`,
          statut: false,
          feedback: 'Compte le nombre de zéros dans chaque facteur',
        },
      ]
      this.autoCorrection[i].options = {
        ordered: false,
        lastChoice: 5,
      }
      const props = propositionsQcm(this, i)

      if (this.interactif && this.interactifType === 'qcm') {
        texte += props.texte
      } else {
        texte += ajouteChampTexteMathLive(this, i, KeyboardType.clavierDeBase)
        setReponse(this, i, a * b)
      }
      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      } else {
        cpt++
      }
    }
    listeQuestionsToContenu(this)
  }
}
