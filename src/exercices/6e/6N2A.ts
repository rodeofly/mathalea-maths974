import { grille, seyes } from '../../lib/2d/reperes'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  arrondi,
  nombreDeChiffresDansLaPartieDecimale,
  nombreDeChiffresDansLaPartieEntiere,
} from '../../lib/outils/nombres'
import { texNombre } from '../../lib/outils/texNombre'
import Operation from '../../modules/operations'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { mathalea2d, vide2d } from '../../modules/2dGeneralites'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import Exercice from '../Exercice'

export const amcReady = true
export const amcType = 'AMCNum'
export const interactifType = 'mathLive'
export const interactifReady = true

export const titre = 'Effectuer additions et soustractions de nombres décimaux'
export const dateDeModifImportante = '01/04/2023'

/**
 * Additions et soustractions de nombres décimaux
 * * xxx-xx,x
 * * xxx-xx,xx
 * * xxx,x-xxx
 * * x0x-xx9,x
 * * xxx+xx,x
 * * xxx+xx,xx
 * * xxx,x+xxx
 * * x0x+xx9,x
 * @author Rémi Angot (Modifié par EE pour modifier le nb de décimales des termes)

 */
export const uuid = '01873'

export const refs = {
  'fr-fr': ['6N2A'],
  'fr-2016': ['6C20'],
  'fr-ch': ['9NO8-1'],
}
export default class AdditionnerSoustrairesDecimaux extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      4,
      '1 : Additions de décimaux\n2 : Soustractions de décimaux\n3 : Mélange (additions en premier)\n4: Mélange (additions et soustractions en alternance)',
    ]
    this.besoinFormulaire2Numerique = [
      'Type de cahier',
      3,
      ' 1 : Cahier à petits carreaux\n 2 : Cahier à gros carreaux (Seyes)\n 3 : Feuille blanche',
    ]
    this.besoinFormulaire3Numerique = [
      'Type de termes',
      4,
      "1 : Un entier et un décimal\n2 : Deux décimaux ayant même nombre de décimales\n3 : Deux décimaux n'ayant pas le même nombre de décimales\n4 : Au hasard",
    ]

    this.consigne = 'Poser et effectuer les calculs suivants.'
    this.spacing = 2
    context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1) // Important sinon les opérations posées ne sont pas jolies
    this.nbQuestions = 4
    this.sup = 3
    this.sup2 = 3
    this.sup3 = 4
  }

  nouvelleVersion() {
    let typesDeQuestions, reponse
    const typesAdditions = combinaisonListes([5, 6, 7, 8], this.nbQuestions)
    const typesSoustractions = combinaisonListes([1, 2, 3, 4], this.nbQuestions)
    let listeTypeDeQuestions = []
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes([5, 6, 7, 8], this.nbQuestions)
    } else if (this.sup === 2) {
      listeTypeDeQuestions = combinaisonListes([1, 2, 3, 4], this.nbQuestions)
    } else if (this.sup === 3) {
      for (let i = 0; i < this.nbQuestions; i++) {
        this.autoCorrection[i] = {}
        if (i + 1 <= this.nbQuestions / 2) {
          // première moitié sont des additions mais si c'est impair on prendra plus de soustractions
          listeTypeDeQuestions.push(typesAdditions[i])
        } else {
          listeTypeDeQuestions.push(typesSoustractions[i])
        }
      }
    } else {
      for (let i = 0; i < this.nbQuestions; i++) {
        this.autoCorrection[i] = {}
        if (i % 2 === 0) {
          // première moitié sont des additions mais si c'est impair on prendra plus de soustractions
          listeTypeDeQuestions.push(typesAdditions[Math.round(i / 2)])
        } else {
          listeTypeDeQuestions.push(typesSoustractions[Math.round(i / 2)])
        }
      }
    }

    let grilletxt
    if (this.sup2 < 3) {
      const g = this.sup2 < 3 ? grille(0, 0, 5, 5, 'gray', 0.7) : vide2d()
      const carreaux = this.sup2 === 2 ? seyes(0, 0, 5, 5) : vide2d()
      const sc = this.sup2 === 2 ? 0.8 : 0.5
      const params = {
        xmin: 0,
        ymin: 0,
        xmax: 5,
        ymax: 5,
        pixelsParCm: 20,
        scale: sc,
      }
      grilletxt = '<br>' + mathalea2d(params, g, carreaux)
    } else {
      grilletxt = ''
    }
    for (
      let i = 0, aleaTermes, texte, texteCorr, cpt = 0, a, b;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      aleaTermes = this.sup3 < 4 ? this.sup3 : randint(1, 3)
      switch (typesDeQuestions) {
        case 1: // xxx-xx,x ou xx,x-xx,x ou xx,x-x,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          if (aleaTermes > 1) a = arrondi(a / 10)
          b = arrondi(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10)
          if (aleaTermes > 2) b = arrondi(b / 10)
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          texte += grilletxt
          reponse = arrondi(a - b)
          texteCorr = Operation({
            operande1: a,
            operande2: b,
            type: 'soustraction',
            style: 'display: inline-block',
          })
          texteCorr += Operation({
            operande1: a,
            operande2: b,
            type: 'soustraction',
            style: 'display: inline-block',
            methodeParCompensation: false,
          })
          break
        case 2: // xxx-xx,xx ou xx,xx-xx,xx ou xx,xx-x,xxx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          if (aleaTermes > 1) a = arrondi((a + randint(1, 4) * 1000) / 100)
          b = arrondi(
            randint(5, 9) * 10 +
              randint(6, 9) +
              randint(1, 9) / 10 +
              randint(1, 9) / 100,
          )
          if (aleaTermes > 2) b = arrondi(b / 10)
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          texte += grilletxt
          reponse = arrondi(a - b)
          texteCorr = Operation({
            operande1: a,
            operande2: b,
            type: 'soustraction',
            style: 'display: inline-block',
          })
          texteCorr += Operation({
            operande1: a,
            operande2: b,
            type: 'soustraction',
            style: 'display: inline-block',
            methodeParCompensation: false,
          })
          break
        case 3: // xxx,x-xxx ou xxx,x-xxx,x ou xxx,x-xx,xx
          a = arrondi(
            randint(5, 9) * 100 +
              randint(2, 5) * 10 +
              randint(1, 9) +
              randint(1, 9) / 10,
          )
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9)
          if (aleaTermes > 1)
            b = arrondi(
              (b + randint(1, 4) * 1000) / Math.pow(10, aleaTermes - 1),
            )
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          texte += grilletxt
          reponse = arrondi(a - b)
          texteCorr = Operation({
            operande1: a,
            operande2: b,
            type: 'soustraction',
            style: 'display: inline-block',
          })
          texteCorr += Operation({
            operande1: a,
            operande2: b,
            type: 'soustraction',
            style: 'display: inline-block',
            methodeParCompensation: false,
          })
          break
        case 4: // x0x-xx9,x ou x0x,x-xx9,x ou x0x,x-x9,xx
          a = arrondi(randint(5, 9) * 100 + randint(1, 5))
          if (aleaTermes > 1) a = arrondi(a + randint(1, 9) / 10)
          b = arrondi(
            randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10,
          )
          if (aleaTermes > 2)
            b = arrondi(
              randint(1, 9) * 10 + 9 + randint(1, 9) / 10 + randint(1, 9) / 100,
            )
          texte = `$${texNombre(a)}-${texNombre(b)}$`
          texte += grilletxt
          reponse = arrondi(a - b)
          texteCorr = Operation({
            operande1: a,
            operande2: b,
            type: 'soustraction',
            style: 'display: inline-block',
          })
          texteCorr += Operation({
            operande1: a,
            operande2: b,
            type: 'soustraction',
            style: 'display: inline-block',
            methodeParCompensation: false,
          })
          break
        case 5: // xxx+xx,x ou xx,x+xx,x ou xx,x+x,xx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          if (aleaTermes > 1) a = arrondi(a / 10)
          b = arrondi(randint(5, 9) * 10 + randint(6, 9) + randint(1, 9) / 10)
          if (aleaTermes > 2) b = arrondi(b / 10)
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          texte += grilletxt
          reponse = arrondi(a + b)
          texteCorr = Operation({
            operande1: a,
            operande2: b,
            type: 'addition',
            style: 'display: inline-block',
          })
          break
        case 6: // xxx+xx,xx ou xx,xx+xx,xx ou xx,xx+x,xxx
          a = randint(1, 4) * 100 + randint(2, 5) * 10 + randint(1, 9)
          if (aleaTermes > 1) a = arrondi((a + randint(1, 4) * 1000) / 100)
          b = arrondi(
            randint(5, 9) * 10 +
              randint(6, 9) +
              randint(1, 9) / 10 +
              randint(1, 9) / 100,
          )
          if (aleaTermes > 2) b = arrondi(b / 10)
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          texte += grilletxt
          reponse = arrondi(a + b)
          texteCorr = Operation({
            operande1: a,
            operande2: b,
            type: 'addition',
            style: 'display: inline-block',
          })
          break
        case 7: // xxx,x+xxx ou xxx,x+xxx,x ou xxx,x+xx,xx
          a = arrondi(
            randint(5, 9) * 100 +
              randint(2, 5) * 10 +
              randint(1, 9) +
              randint(1, 9) / 10,
          )
          b = randint(1, 4) * 100 + randint(6, 9) * 10 + randint(1, 9)
          if (aleaTermes > 1)
            b = arrondi(
              (b + randint(1, 4) * 1000) / Math.pow(10, aleaTermes - 1),
            )
          if (a < b) {
            const temp = a
            a = b
            b = temp
          }
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          texte += grilletxt
          reponse = arrondi(a + b)
          texteCorr = Operation({
            operande1: a,
            operande2: b,
            type: 'addition',
            style: 'display: inline-block',
          })
          break
        case 8: // x0x+xx9,x ou x0x,x+xx9,x ou x0x,x+x9,xx
        default:
          a = arrondi(randint(5, 9) * 100 + randint(1, 5))
          if (aleaTermes > 1) a = arrondi(a + randint(1, 9) / 10)
          b = arrondi(
            randint(1, 4) * 100 + randint(1, 9) * 10 + 9 + randint(1, 9) / 10,
          )
          if (aleaTermes > 2)
            b = arrondi(
              randint(1, 9) * 10 + 9 + randint(1, 9) / 10 + randint(1, 9) / 100,
            )
          texte = `$${texNombre(a)}+${texNombre(b)}$`
          texte += grilletxt
          reponse = arrondi(a + b)
          texteCorr = Operation({
            operande1: a,
            operande2: b,
            type: 'addition',
            style: 'display: inline-block',
          })
          break
      }
      setReponse(this, i, reponse)
      if (this.interactif && context.isHtml)
        texte += '$~=$' + ajouteChampTexteMathLive(this, i, '')
      if (context.isAmc) {
        this.autoCorrection[i].enonce = texte
        this.autoCorrection[i].propositions = [{ texte: texteCorr }]
        // @ts-expect-error Trop compliqué à typer
        this.autoCorrection[i].reponse.param = {
          digits:
            nombreDeChiffresDansLaPartieEntiere(reponse) +
            nombreDeChiffresDansLaPartieDecimale(reponse) +
            2,
          decimals: nombreDeChiffresDansLaPartieDecimale(reponse) + 1,
          signe: false,
          exposantNbChiffres: 0,
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
