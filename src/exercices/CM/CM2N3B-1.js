import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { arrondi, range1 } from '../../lib/outils/nombres'
import { texNombre } from '../../lib/outils/texNombre'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Calculer la moitié'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
/**
 * Calculer la moitié d'un nombre pair, d'un impair inférieur à 20, d'un multiple de 200, d'un nombre de la forme a00 avec a impair, d'un nombre de la forme
 *  a,b avec a et b pairs ou 1xx avec xx un nombre pair
 * @author Rémi Angot

 */
export const uuid = '14688'

export const refs = {
  'fr-fr': ['CM2N3B-1'],
  'fr-2016': ['CM009'],
  'fr-ch': ['PR-1'],
}
export default class Moitie extends Exercice {
  constructor() {
    super()

    this.consigne = 'Calculer.'

    this.nbCols = 2
    this.nbColsCorr = 2
    this.sup = 1 // niveau de difficulté
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = range1(6)
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1: // Table de 2
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${a * 2}$`
          texteCorr = `$\\text{La moitié de }${a * 2} \\text{ est } ${a}$`
          setReponse(this, i, a)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          break
        case 2: // Impair inférieur à 20
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${a * 2 + 1}$`
          texteCorr = `$\\text{La moitié de }${
            a * 2 + 1
          } \\text{ est } ${texNombre(a + 5 / 10)}$`
          setReponse(this, i, arrondi(a + 5 / 10))
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          break
        case 3: // Table de 200
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${texNombre(a * 2 * 100)}$`
          texteCorr = `$\\text{La moitié de }${texNombre(
            a * 2 * 100,
          )} \\text{ est } ${texNombre(a * 100)}$`
          setReponse(this, i, a * 100)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          break
        case 4: // a00 avec a impair
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${texNombre((a * 2 + 1) * 100)}$`
          texteCorr = `$\\text{La moitié de }${texNombre(
            (a * 2 + 1) * 100,
          )} \\text{ est } ${texNombre(a * 100 + 50)}$`
          setReponse(this, i, a * 100 + 50)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          break
        case 5: // a,b avec a et b pairs
          a = randint(2, 9)
          b = randint(2, 9)
          texte = `$\\text{La moitié de }${texNombre(a * 2 + (b * 2) / 100)}$`
          texteCorr = `$\\text{La moitié de }${texNombre(
            a * 2 + (b * 2) / 100,
          )} \\text{ est } ${texNombre(a + b / 100)}$`
          setReponse(this, i, arrondi(a + b / 100))
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          break
        case 6: // 1xx avec xx un nombre pair
          a = randint(2, 9)
          texte = `$\\text{La moitié de }${100 + a * 2}$`
          texteCorr = `$\\text{La moitié de }${100 + a * 2} \\text{ est } ${
            50 + a
          }$`
          setReponse(this, i, 50 + a)
          if (this.interactif) texte += ajouteChampTexteMathLive(this, i, '')
          break
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
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',3];
}
