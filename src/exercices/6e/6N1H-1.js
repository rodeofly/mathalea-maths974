import { droiteGraduee } from '../../lib/2d/reperes'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { arrondi } from '../../lib/outils/nombres'
import { lettreIndiceeDepuisChiffre } from '../../lib/outils/outilString'
import { stringNombre } from '../../lib/outils/texNombre'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = "Lire l'abscisse décimale d'un point (niveau 2)"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'
export const dateDeModifImportante = '01/02/2022'

/**
 * Exercice calqué sur lire abscisse fractionnaire sauf que le résultat attendu est en écriture décimale.
 * demis, quart, cinquièmes dixièmes et centièmes
 * @author Jean-Claude Lhote

 */
export const uuid = '8418e'

export const refs = {
  'fr-fr': ['6N1H-1'],
  'fr-2016': ['6N30-1'],
  'fr-ch': ['9NO7-2'],
}
export default class LireAbscisseDecimaleBis2d extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Choix des subdivisions',
      'Nombres séparés par des tirets :\n1 : Dixièmes\n2 : Centièmes\n3 : Demis\n4 : Quarts\n5 : Cinquièmes\n6 : Huitièmes\n7 : Mélange',
    ]
    this.consigne =
      "Lire l'abscisse de chacun des points suivants et donner le résultat sous la forme d'un nombre en écriture décimale."
    this.nbQuestions = 3

    this.sup = 7
    this.interactif = false
    this.niveau = 6
  }

  nouvelleVersion() {
    // numeroExercice est 0 pour l'exercice 1
    /*
        let QuestionsDisponibles
        if (!this.sup) { // Si aucune liste n'est saisie
          QuestionsDisponibles = [1, 2, 3, 4, 5, 6]
        } else {
          if (typeof (this.sup) === 'number') { // Si c'est un nombre c'est que le nombre a été saisi dans la barre d'adresses
            QuestionsDisponibles = [contraindreValeur(1, 6, this.sup, randint(1, 6))]
          } else {
            QuestionsDisponibles = this.sup.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
            for (let i = 0; i < QuestionsDisponibles.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
              QuestionsDisponibles[i] = contraindreValeur(1, 6, parseInt(QuestionsDisponibles[i]), randint(1, 6)) // parseInt en fait un entiers
            }
          }
        }
        const typesDeQuestions = combinaisonListes(QuestionsDisponibles, this.nbQuestions)
        */

    const typesDeQuestions = gestionnaireFormulaireTexte({
      max: 6,
      defaut: 7,
      melange: 7,
      nbQuestions: this.nbQuestions,
      saisie: this.sup,
    })

    const d = []
    this.contenu = this.consigne
    for (
      let i = 0,
        abs0,
        l1,
        l2,
        l3,
        x1,
        x2,
        x3,
        x11,
        x22,
        x33,
        xA,
        xB,
        xC,
        pas1,
        pas2,
        thick1,
        thick2,
        texte = '',
        texteCorr = '',
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      l1 = lettreIndiceeDepuisChiffre(i * 3 + 1)
      l2 = lettreIndiceeDepuisChiffre(i * 3 + 2)
      l3 = lettreIndiceeDepuisChiffre(i * 3 + 3)
      if (context.isAmc) {
        this.autoCorrection[i] = { propositions: [{ statut: 4, feedback: '' }] }
      }
      switch (typesDeQuestions[i]) {
        case 3:
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 2
          break
        case 4: // Placer des quarts sur un axe
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 4
          break

        case 5: // Placer des cinquièmes
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 5
          break

        case 6: // Placer des huitièmes
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 8
          break

        case 1: // Placer des
          abs0 = this.niveau === 2 ? randint(-8, 8) : randint(0, 5)
          pas1 = 1
          pas2 = 10
          break
        case 2: // Placer des centièmes
          abs0 =
            this.niveau === 2
              ? arrondi(randint(-80, 80) / 10, 1)
              : arrondi(randint(0, 50) / 10, 1)
          pas1 = 10
          pas2 = 10
          break
      }
      x1 = randint(0, 1)
      x2 = randint(2, 3)
      x3 = randint(4, 5)
      x11 = randint(1, pas2 - 1)
      x22 = randint(1, pas2 - 1)
      x33 = randint(1, pas2 - 1)

      xA = arrondi(x1 + x11 / pas2)
      xB = arrondi(x2 + x22 / pas2)
      xC = arrondi(x3 + x33 / pas2)

      thick1 = randint(0, 2)
      thick2 = randint(2, 6, thick1)

      d[2 * i] = droiteGraduee({
        Unite: 4,
        Min: 0,
        Max: 7.1,
        axeStyle: '->',
        pointTaille: 5,
        pointStyle: 'x',
        labelsPrincipaux: false,
        thickSec: true,
        thickSecDist: 1 / pas2,
        labelListe: [
          [thick1, `${stringNombre(arrondi(abs0 + thick1 / pas1))}`],
          [thick2, `${stringNombre(arrondi(abs0 + thick2 / pas1))}`],
        ],
        pointListe: [
          [xA, l1],
          [xB, l2],
          [xC, l3],
        ],
      })
      d[2 * i + 1] = droiteGraduee({
        Unite: 4,
        Min: 0,
        Max: 7.1,
        axeStyle: '->',
        pointTaille: 5,
        pointStyle: 'x',
        labelsPrincipaux: false,
        thickSec: true,
        thickSecDist: 1 / pas2,
        labelListe: [
          [0, `${stringNombre(abs0)}`],
          [xA, stringNombre(arrondi(xA / pas1 + abs0))],
          [xB, stringNombre(arrondi(xB / pas1 + abs0))],
          [xC, stringNombre(arrondi(xC / pas1 + abs0))],
        ],
        pointListe: [
          [xA, l1],
          [xB, l2],
          [xC, l3],
        ],
      })

      texte = mathalea2d(
        { xmin: -2, ymin: -1, xmax: 30, ymax: 2, pixelsParCm: 20, scale: 0.5 },
        d[2 * i],
      )
      texteCorr = mathalea2d(
        { xmin: -2, ymin: -1, xmax: 30, ymax: 2, pixelsParCm: 20, scale: 0.5 },
        d[2 * i + 1],
      )

      if (this.interactif && context.isHtml) {
        setReponse(this, 3 * i, arrondi(xA / pas1 + abs0))
        setReponse(this, 3 * i + 1, arrondi(xB / pas1 + abs0))
        setReponse(this, 3 * i + 2, arrondi(xC / pas1 + abs0))
        texte += l1 + ajouteChampTexteMathLive(this, 3 * i)
        texte += l2 + ajouteChampTexteMathLive(this, 3 * i + 1)
        texte += l3 + ajouteChampTexteMathLive(this, 3 * i + 2)
      } else {
        if (context.isAmc) {
          this.autoCorrection[i] = {
            enonce: texte,
            propositions: [
              { texte: texteCorr, statut: 0, feedback: '', sanscadre: true },
            ],
          }
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
