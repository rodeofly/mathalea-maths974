import { codageAngleDroit } from '../../../lib/2d/angles'
import { milieu, point, tracePoint } from '../../../lib/2d/points'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { labelPoint, texteParPosition } from '../../../lib/2d/textes'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { functionCompare } from '../../../lib/interactif/comparisonFunctions'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'
import { propositionsQcm } from '../../../lib/interactif/qcm'
import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'
import { choice } from '../../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../../lib/outils/embellissements'
import { stringNombre, texNombre } from '../../../lib/outils/texNombre'
import { mathalea2d } from '../../../modules/2dGeneralites'
import FractionEtendue from '../../../modules/FractionEtendue'
import { fraction } from '../../../modules/fractions'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Calculer une aire, un périmètre ou une longueur'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModifImportante = '23/11/2024'
/**
 * @author Gilles Mora

 * Date de publication septembre 2021
*/
export const uuid = 'b1a48'

export const refs = {
  'fr-fr': ['can4G08'],
  'fr-ch': [],
}
export default class QuestionsAiresEtPerimetres extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1
  }

  nouvelleVersion() {
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let a,
        b,
        c,
        n,
        d,
        A,
        B,
        C,
        D,
        N,
        a1,
        maFraction,
        texte,
        texteCorr,
        reponse
      const objets = []

      switch (
        choice([1, 2, 3, 4, 5, 6, 7]) //
      ) {
        case 1: //
          {
            this.formatInteractif = 'qcm'
            reponse = 'Vrai ou Faux'
            a = randint(3, 9)
            b = randint(0, 1)
            texte = `Un carré de côté $${a}$ cm a le même périmètre qu'un rectangle de largeur $${a - b}$ cm et de longueur $${a + 1}$ cm ?`
            if (b !== 1) {
              texteCorr = `${texteEnCouleurEtGras('Faux')} car $4\\times ${a}$ cm$\\neq 2\\times ${a}$ cm$ + 2\\times ${a + 1}$ cm.`
            } else {
              texteCorr = `${texteEnCouleurEtGras('Vrai')} car $4\\times ${a}$ cm $= 2\\times ${a - 1}$ cm $ + 2\\times ${a + 1}$ cm$= ${4 * a}$ cm.`
            }

            this.autoCorrection[i] = {
              enonce: texte,
              options: { ordered: true, radio: true },
              propositions: [
                {
                  texte: 'Vrai',
                  statut: b !== 0,
                },
                {
                  texte: 'Faux',
                  statut: b === 0,
                },
              ],
            }
            const monQcm = propositionsQcm(this, i)
            if (this.interactif) texte += monQcm.texte

            this.canEnonce = texte // 'Compléter'
            this.canReponseACompleter =
              '\\faSquare[regular] Vrai <br>\\faSquare[regular] Faux'
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          }
          break
        case 2: // aire d'un carré connaissant son perimètre
          a = randint(2, 10)
          reponse = a * a
          texte = `Quelle est l'aire d'un carré  dont le périmètre est $${4 * a}$ cm ? `
          texteCorr = `Le côté du carré est $${4 * a}\\div 4=${a}$, donc son aire est : $${a}\\times ${a}=${miseEnEvidence(a ** 2)}$ cm$^2$.`
          handleAnswers(this, i, {
            reponse: { value: reponse, compare: functionCompare },
          })
          texte +=
            '<br>' +
            ajouteChampTexteMathLive(this, i, ' ', { texteApres: 'cm$^2$' })
          this.canEnonce = texte // 'Compléter'
          this.canReponseACompleter = '$\\ldots$ cm$^2$'
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          break
        case 3: // perimètre d'un carré connaissant son aire
          a = randint(1, 10)
          c = a * a
          reponse = 4 * a

          texte = `Déterminer le périmètre  d'un carré d'aire $${c}$ cm$^2$. `
          texteCorr = `Le côté du carré est $\\sqrt{${c}}=${a}$.<br>
         Son périmètre est donc $4\\times ${a}=${miseEnEvidence(4 * a)}$ cm.`
          handleAnswers(this, i, {
            reponse: { value: reponse, compare: functionCompare },
          })
          texte +=
            '<br>' +
            ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.clavierDeBaseAvecFraction,
              { texteApres: 'cm' },
            )
          this.canEnonce = texte // 'Compléter'
          this.canReponseACompleter = '$\\ldots$ cm'
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          break

        case 4: // côté d'un carré connaissant son perimètre
          a1 = randint(5, 20)
          a = a1 * 4
          reponse = a1

          texte = `Le périmètre d'un carré est $${a}$ cm. <br>Quelle est la longueur du côté du carré ? `
          texteCorr = `Le côté du carré est $${a}\\div 4=${miseEnEvidence(a1)}$ cm.`
          handleAnswers(this, i, {
            reponse: { value: reponse, compare: functionCompare },
          })
          texte +=
            '<br>' +
            ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.clavierDeBaseAvecFraction,
              { texteApres: 'cm' },
            )
          this.canEnonce = texte // 'Compléter'
          this.canReponseACompleter = '$\\ldots$ cm'
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          break
        case 5: // périmètre d'une figure
          a = randint(1, 3) //
          b = randint(4, 7) //
          n = randint(7, 12)
          c = randint(1, 6) + randint(3, 9) / 10
          d = n - c
          A = point(0, 0, 'P')
          B = point(7, 1, 'Q', 'below')
          C = point(6.5, 4, 'R')
          D = point(2, 5, 'R')

          objets.push(
            segment(A, B),
            segment(B, C),
            segment(C, D),
            segment(D, A),
            tracePoint(A, B, C, D),
          )
          objets.push(
            texteParPosition(
              `${texNombre(b)} m`,
              milieu(A, D).x - 0.8,
              milieu(A, D).y,
            ),
            texteParPosition(
              `${stringNombre(a)} m`,
              milieu(B, C).x + 0.7,
              milieu(B, C).y,
            ),
            texteParPosition(
              `${stringNombre(c)} m`,
              milieu(A, B).x,
              milieu(A, B).y - 0.5,
            ),
            texteParPosition(
              `${stringNombre(d)} m`,
              milieu(C, D).x,
              milieu(C, D).y + 0.5,
            ),
          )
          texte = 'Quel est le périmètre de cette figure (en m) ?<br>'
          texte += mathalea2d(
            {
              xmin: -1,
              ymin: -1,
              xmax: 8,
              ymax: 6,
              pixelsParCm: 20,
              mainlevee: true,
              amplitude: 0.5,
              scale: 0.7,
              style: 'margin: auto',
            },
            objets,
          )
          texteCorr = ` Le périmètre est donné par : $${texNombre(a)}+${texNombre(b)}+${texNombre(c)}+${texNombre(d)}=${miseEnEvidence(a + b + c + d)}$ m.<br>`
          reponse = a + b + c + d
          handleAnswers(this, i, {
            reponse: { value: reponse, compare: functionCompare },
          })
          texte +=
            '<br>' +
            ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.clavierDeBaseAvecFraction,
              { texteApres: 'm' },
            )
          this.canEnonce = texte // 'Compléter'
          this.canReponseACompleter = '$\\ldots$ m'
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          break
        case 6: // agrandissement/réduction
          a = 0
          N = choice(['a', 'b', 'c'])
          if (N === 'a') {
            a = randint(2, 7) // aire
            c = randint(2, 4) // coefficient
            texte = `Les longueurs d'un rectangle de $${a}$ cm$^2$  sont multipliées par $${c}$.<br>
          Quelle est l'aire du rectangle ainsi obtenu ?`

            texteCorr = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$, soit ici par $${c}^2=${c ** 2}$.<br>
          Ainsi, l'aire du nouveau rectangle est : $${a}\\times ${c * c}=${miseEnEvidence(a * c * c)}$ cm$^2$.
      <br>`

            reponse = a * c * c
            handleAnswers(this, i, {
              reponse: { value: reponse, compare: functionCompare },
            })
            texte +=
              '<br>' +
              ajouteChampTexteMathLive(
                this,
                i,
                KeyboardType.clavierDeBaseAvecFraction,
                { texteApres: 'cm$^2$' },
              )
            this.canEnonce = texte // 'Compléter'
            this.canReponseACompleter = '$\\ldots$ cm$^2$'
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          } else if (N === 'b') {
            n = randint(1, 3)
            d = randint(n + 1, 10)
            maFraction = fraction(n, d).simplifie()
            reponse = maFraction.puissanceFraction(2).texFSD
            texte = `Les longueurs d'un triangle sont multipliées par $${maFraction.texFraction}$.<br>
          Par combien est multipliée son aire  ?  `

            texteCorr = ` Si les longueurs sont multiplées par $k$, les aires sont multipliées par $k^2$.<br>
          Ainsi, l'aire a été multipliée par : $\\left(${maFraction.texFraction}\\right)^2=${miseEnEvidence(reponse)}$.
      <br>`

            handleAnswers(this, i, {
              reponse: { value: reponse, compare: functionCompare },
            })
            texte +=
              '<br>' +
              ajouteChampTexteMathLive(
                this,
                i,
                KeyboardType.clavierDeBaseAvecFraction,
                { texteApres: '' },
              )
            this.canEnonce = texte // 'Compléter'
            this.canReponseACompleter = ''
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          } else {
            // N === 'c'
            n = randint(1, 3)
            d = randint(n + 1, 10)
            maFraction = fraction(n, d).simplifie()
            const maFractionAuCarre =
              maFraction.puissanceFraction(2).texFraction
            reponse = maFraction.texFSD
            texte = `L'aire d'un parallélogramme a été multipliée par $${maFractionAuCarre}$.<br>
          Par combien ont été multipliées les longueurs de ses côtés ?
          `
            texteCorr = ` Si les aires sont multiplées par $k$, les longueurs sont multipliées par $\\sqrt{k}$.<br>
          Ainsi, les longueurs ont été multipliées par : $\\sqrt{${maFractionAuCarre}}=${miseEnEvidence(reponse)}$.
      <br>`
            handleAnswers(this, i, {
              reponse: { value: reponse, compare: functionCompare },
            })
            texte +=
              '<br>' +
              ajouteChampTexteMathLive(
                this,
                i,
                KeyboardType.clavierDeBaseAvecFraction,
                { texteApres: '' },
              )
            this.canEnonce = texte // 'Compléter'
            this.canReponseACompleter = ''
            this.listeCanEnonces.push(this.canEnonce)
            this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          }
          break
        case 7: // longueur à trouver à partir d'une aire triangle rectangle
        default:
          a = randint(2, 10) //
          b = randint(1, 5) * a
          A = point(0, 0, 'A', 'below')
          B = point(8, 0, 'B', 'below')
          C = point(6, 3.46, 'C')

          objets.push(
            segment(A, B),
            segment(B, C),
            segment(C, A),
            labelPoint(A, B, C),
            tracePoint(A, B, C),
            codageAngleDroit(A, C, B),
          )
          objets.push(
            texteParPosition(
              `${texNombre(a)} m`,
              milieu(B, C).x + 0.5,
              milieu(B, C).y + 0.5,
            ),
          )
          texte = ` L'aire du triangle $ABC$ est $${b}$ m$^2$. <br>
        Donner la longueur $AC$.<br>`
          texte += mathalea2d(
            {
              xmin: -1,
              ymin: -1,
              xmax: 9,
              ymax: 4.5,
              pixelsParCm: 20,
              mainlevee: true,
              amplitude: 0.5,
              scale: 0.7,
              style: 'margin: auto',
            },
            objets,
          )
          texteCorr = ` L'aire de ce triangle rectangle est donnée par : $\\dfrac{BC\\times AC}{2}$.<br>
          On cherche $AC$ telle que $\\dfrac{${a}\\times AC}{2}=${b}$. <br>
          $AC=\\dfrac{2\\times ${b}}{${a}}=${miseEnEvidence(new FractionEtendue(2 * b, a).simplifie().texFraction)}$ m.
      <br>`
          reponse = (2 * b) / a

          handleAnswers(this, i, {
            reponse: { value: reponse, compare: functionCompare },
          })
          this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
          texte +=
            '<br>' +
            ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.clavierDeBaseAvecFraction,
              { texteApres: 'm' },
            )
          this.canEnonce = texte // 'Compléter'
          this.canReponseACompleter = '$\\ldots$ m'
          this.listeCanEnonces.push(this.canEnonce)
          this.listeCanReponsesACompleter.push(this.canReponseACompleter)
          break
      }

      if (this.questionJamaisPosee(i, a, reponse)) {
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
