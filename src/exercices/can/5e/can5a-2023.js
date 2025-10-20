import { codageAngle, codageAngleDroit } from '../../../lib/2d/angles'
import { droite } from '../../../lib/2d/droites'
import { milieu, point, tracePoint } from '../../../lib/2d/points'
import { polygone } from '../../../lib/2d/polygones'
import { pave } from '../../../lib/2d/projections3d'
import { droiteGraduee } from '../../../lib/2d/reperes'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { texteParPosition } from '../../../lib/2d/textes'
import { rotation } from '../../../lib/2d/transformations'
import { paveLPH3d } from '../../../lib/3d/3dProjectionMathalea2d/solides'
import { texPrix } from '../../../lib/format/style'
import { choice, shuffle } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { arrondi } from '../../../lib/outils/nombres'
import { sp } from '../../../lib/outils/outilString'
import { prenomF } from '../../../lib/outils/Personne'
import {
  formatMinute,
  stringNombre,
  texNombre,
} from '../../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { context } from '../../../modules/context'
import FractionEtendue from '../../../modules/FractionEtendue'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'

import Decimal from 'decimal.js'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import {
  handleAnswers,
  setReponse,
} from '../../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../../lib/interactif/questionMathLive'
import Hms from '../../../modules/Hms'

export const titre = 'CAN 5e sujet 2023'
export const interactifReady = true
export const interactifType = 'mathLive'
// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '03/04/2023' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const uuid = '312eb'

export const refs = {
  'fr-fr': ['can5a-2023'],
  'fr-ch': [],
}

/**
 * Aléatoirisation du sujet 2023 de CAN 5e
 * Gilles Mora

 */

function compareNombres(a, b) {
  return a - b
}

export default class SujetCAN2023Cinquieme extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 30
    this.comment = `Cet exercice fait partie des annales des Courses Aux Nombres.<br>
  Il est composé de 30 questions réparties de la façon suivante :<br>
  Les 10 premières questions, parfois communes à plusieurs niveaux, font appel à des questions élémentaires et les 20 suivantes (qui ne sont pas rangées dans un ordre de difficulté) sont un peu plus « coûteuses » cognitivement.<br>
  Par défaut, les questions sont rangées dans le même ordre que le sujet officiel avec des données aléatoires. Ainsi, en cliquant sur « Nouvelles données », on obtient une nouvelle Course Aux Nombres avec des données différentes.
  En choisissant un nombre de questions inférieur à 30, on fabrique une « mini » Course Aux Nombres qui respecte la proportion de nombre de questions élémentaires par rapport aux autres.
  Par exemple, en choisissant 20 questions, la course aux nombres sera composée de 7 ou 8 questions élémentaires choisies aléatoirement dans les 10 premières questions du sujet officiel puis de 12 ou 13 autres questions choisies aléatoirement parmi les 20 autres questions du sujet officiel.`
  }

  nouvelleVersion() {
    const nbQ1 = Math.min(arrondi((this.nbQuestions * 10) / 30), 10) // Choisir d'un nb de questions de niveau 1 parmi les 8 possibles.
    const nbQ2 = Math.min(this.nbQuestions - nbQ1, 20)
    const typeQuestionsDisponiblesNiv1 = shuffle([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ])
      .slice(-nbQ1)
      .sort(compareNombres) // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    const typeQuestionsDisponiblesNiv2 = shuffle([
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
      29, 30,
    ])
      .slice(-nbQ2)
      .sort(compareNombres) // 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    const typeQuestionsDisponibles = typeQuestionsDisponiblesNiv1.concat(
      typeQuestionsDisponiblesNiv2,
    )

    for (
      let i = 0,
        index = 0,
        nbChamps,
        m,
        n,
        h,
        pav,
        num,
        den,
        params,
        origine,
        traceA,
        traceD,
        traceB,
        traceorigine,
        labA,
        labB,
        lab1,
        lab2,
        lab3,
        ang1,
        s3,
        K,
        I,
        J,
        texte,
        texteCorr,
        reponse,
        prenom1,
        pol,
        L,
        l,
        E,
        F,
        G,
        H,
        propositions,
        choix,
        a,
        b,
        c,
        d,
        e,
        f,
        k,
        s1,
        s2,
        A,
        B,
        C,
        D,
        xmin,
        xmax,
        ymin,
        ymax,
        objets,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (typeQuestionsDisponibles[i]) {
        case 1:
          a = randint(4, 9)
          b = randint(4, 9)
          texte = `$${a} \\times ${b}$ `
          texteCorr = `$${a} \\times ${b}=${miseEnEvidence(a * b)}$`
          reponse = a * b
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          this.listeCanEnonces.push(texte)
          if (this.interactif) {
            texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
          } else {
            texte += ''
          }
          nbChamps = 1

          break
        case 2:
          a = randint(1, 3)
          b = randint(1, 9, a)
          c = randint(1, 9, [a, b])
          d = randint(1, 9, [a, b, c])
          e = randint(1, 9, [a, b, c, d])
          f = randint(1, 9, [a, b, c, d, e])
          n = new Decimal(a * 100 + b * 10 + c + d * 0.1 + e * 0.01 + f * 0.001)
          m = choice([
            'centaines',
            'dizaines',
            'dixièmes',
            'centièmes',
            'millièmes',
          ])
          texte = `Dans $${texNombre(n, 3)}$ quel est le chiffre des ${m} ? `
          switch (m) {
            case 'centaines':
              reponse = a
              break
            case 'dizaines':
              reponse = b
              break
            case 'dixièmes':
              reponse = d
              break
            case 'centièmes':
              reponse = e
              break
            case 'millièmes':
              reponse = f
              break
          }

          texteCorr = `Le chiffre des ${m} est $${miseEnEvidence(reponse)}$.<br>$
              \\begin{array}{|c|c|c|c|c|c|c|}
              \\hline
              \\text{\\small{Centaines}} &  \\text{\\small{Dizaines}} & \\text{\\small{Unités}}&  \\Large{\\textbf{,}}& \\text{\\small{Dixièmes}} & \\text{\\small{Centièmes}} & \\text{\\small{Millièmes}}${context.isHtml ? '\\\\' : '\\tabularnewline'}
              \\hline
              ${a}&${b}&${c} & \\Large{\\textbf{,}}& ${d}&${e}& ${f}${context.isHtml ? '\\\\' : '\\tabularnewline'}
              \\hline
              \\end{array}
              $<br>
              `
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          }
          this.listeCanEnonces.push(texte)
          nbChamps = 1

          break
        case 3:
          a = randint(14, 19)
          b = choice([20, 25, 35, 45, 55])

          d = choice([10, 30, 40, 50])
          reponse = 60 - b + d
          prenom1 = prenomF()
          texte = `${prenom1} part à  $${a}$ h $${b}$ min et${context.isHtml ? '' : '<br>'} arrive à  $${a + 1}$ h $${d}$ min.<br>
            Quelle est la durée de son trajet en minutes ?`
          texteCorr = `Pour atteindre $${a + 1}$ h, il faut $${60 - b}$ min, puis il faut ajouter encore $${d}$
             min pour atteindre $${a + 1}$ h $${d}$ min. Son trajet aura  duré  $${miseEnEvidence(formatMinute(60 - b + d))}$ min.`

          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '', {
              texteApres: sp(5) + 'min',
            })
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '\\dots{} min'
          break

        case 4:
          if (choice([true, false])) {
            k = randint(12, 18)
            reponse = 3 * k
            texte = `Le triple de $${k}$ est :`
            texteCorr = `Le triple de $${k}$ est : $${k}\\times 3=${miseEnEvidence(reponse)}$.`

            reponse = 3 * k
          } else {
            k = randint(21, 29)
            reponse = 2 * k
            texte = `Le double de $${k}$ est :`
            texteCorr = `Le double de $${k}$ est : $${k}\\times 2=${miseEnEvidence(reponse)}$.`
          }

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          break

        case 5:
          if (choice([true, false])) {
            ang1 = choice([
              20, 30, 40, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160,
            ])
            A = point(0, 0, 'A', 'below')
            B = point(6, 0, 'B', 'below')
            origine = point(3, 0, 'O', 'below')
            C = rotation(B, origine, ang1)
            s1 = segment(A, B)
            s1.epaisseur = 1.5
            s2 = segment(origine, C)
            s2.epaisseur = 1.5
            traceA = tracePoint(A)
            traceA.taille = context.isHtml ? 2 : 1.5
            traceB = tracePoint(B)
            traceB.taille = context.isHtml ? 2 : 1.5
            traceorigine = tracePoint(origine)
            traceorigine.taille = context.isHtml ? 2 : 1.5
            xmin = -1
            ymin = -1.3
            xmax = 6.5
            ymax = 2.5
            objets = []
            reponse = 180 - ang1
            objets.push(
              texteParPosition(
                '$A$',
                0,
                context.isHtml ? -0.7 : -0.4,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                '$B$',
                6,
                context.isHtml ? -0.7 : -0.4,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                '$O$',
                3,
                context.isHtml ? -0.7 : -0.4,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              s1,
              s2,
              traceA,
              traceorigine,
              traceB,
              codageAngle(C, origine, A, 0.6),
              codageAngle(B, origine, C, 0.5),
            )
            if (ang1 < 50) {
              objets.push(
                texteParPosition(
                  '?',
                  2.2,
                  0.6,
                  'milieu',
                  'black',
                  context.isHtml ? 1 : 0.7,
                ),
                texteParPosition(
                  `${stringNombre(ang1)}°`,
                  3.8,
                  0.2,
                  'milieu',
                  'black',
                  context.isHtml ? 1 : 0.7,
                ),
              )
            } else {
              objets.push(
                texteParPosition(
                  '?',
                  2.2,
                  0.2,
                  'milieu',
                  'black',
                  context.isHtml ? 1 : 0.7,
                ),
                texteParPosition(
                  `${stringNombre(ang1)}°`,
                  3.8,
                  0.5,
                  'milieu',
                  'black',
                  context.isHtml ? 1 : 0.7,
                ),
              )
            }
            reponse = 180 - ang1
            texte = '$A$, $O$ et $B$ sont alignés.<br>'
            texte += mathalea2d(
              {
                xmin,
                ymin,
                xmax,
                ymax,
                pixelsParCm: 40,
                mainlevee: false,
                amplitude: 0.5,
                scale: 1,
                style: 'margin: auto',
              },
              objets,
            )
            texte += context.isHtml ? '<br>? $=$' : ''
            texteCorr = `Un angle plat a une mesure de  $180^\\circ$.<br>
                 Ainsi, ? $=180-${ang1}=${miseEnEvidence(180 - ang1)}^\\circ$.`
          } else {
            ang1 = choice([30, 40, 60, 70, 110, 120, 130, 140, 150, 160])
            A = point(0, 0, 'A', 'below')
            B = point(2, 0, 'B', 'below')
            origine = point(0, 0, 'O', 'below')
            D = point(0, 2, 'D', 'right')
            C = rotation(B, origine, ang1)
            traceD = tracePoint(D)
            traceD.taille = context.isHtml ? 2 : 1.5
            traceB = tracePoint(B)
            traceB.taille = context.isHtml ? 2 : 1.5
            traceorigine = tracePoint(origine)
            traceorigine.taille = context.isHtml ? 2 : 1.5
            s1 = segment(origine, B)
            s1.epaisseur = 1.5
            s2 = segment(origine, C)
            s2.epaisseur = 1.5
            s3 = segment(origine, D)
            s3.epaisseur = 1.5
            xmin = -2
            ymin = -1
            xmax = 4
            ymax = 2.5
            objets = []
            reponse = 180 - ang1
            objets.push(
              traceD,
              traceB,
              texteParPosition(
                '$D$',
                0.3,
                2,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                '$B$',
                2,
                context.isHtml ? -0.6 : -0.4,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                '$O$',
                0,
                context.isHtml ? -0.6 : -0.4,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              s1,
              s2,
              s3,
              traceorigine,
              codageAngleDroit(B, origine, D, 'black', 0.3),
              codageAngle(B, origine, C, 0.8),
              codageAngle(D, origine, C, 0.4),
            )

            if (ang1 < 90) {
              objets.push(
                texteParPosition(
                  '?',
                  0.2,
                  0.8,
                  'milieu',
                  'black',
                  context.isHtml ? 1 : 0.7,
                ),
                texteParPosition(
                  `${stringNombre(ang1)}°`,
                  1.2,
                  0.3,
                  'milieu',
                  'black',
                  context.isHtml ? 1 : 0.5,
                ),
              )

              reponse = 90 - ang1
              texte = "L'angle $\\widehat{BOD}$ est un angle droit.<br>"
              texte += mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 40,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 1,
                  style: 'margin: auto',
                },
                objets,
              )
              texte += context.isHtml ? '<br>? $=$' : ''
              texteCorr = `
                   ?$=90-${ang1}=${miseEnEvidence(90 - ang1)}°$.`
            } else {
              objets.push(
                texteParPosition(
                  '?',
                  -0.15,
                  0.6,
                  'milieu',
                  'black',
                  context.isHtml ? 1 : 0.7,
                ),
                texteParPosition(
                  `${stringNombre(ang1)}°`,
                  1,
                  0.8,
                  'milieu',
                  'black',
                  context.isHtml ? 1 : 0.7,
                ),
              )

              reponse = ang1 - 90
              texte = "L'angle $\\widehat{BOD}$ est un angle droit.<br>"
              texte += mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 40,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 1,
                  style: 'margin: auto',
                },
                objets,
              )
              texte += context.isHtml ? '<br>? $=$' : ''
              texteCorr = `? $=${ang1}-90=${miseEnEvidence(ang1 - 90)}°$.  `
            }
          }
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '? $=\\ldots ^\\circ$'
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '') + '°'
          } else {
            texte += context.isHtml ? ' $\\ldots °$' : ''
          }

          nbChamps = 1

          break
        case 6:
          if (choice([true, false])) {
            a = new Decimal(randint(101, 199)).div(10)
            reponse = new Decimal(a).mul(100)
            texte = `$${texNombre(a, 1)}$ m$^2$  $=$`

            texteCorr = `
        Comme $1$ m$^2$ $=100$ dm$^2$, alors $${texNombre(a, 1)}$ m$^2$  $=${texNombre(a, 1)}\\times 100$ dm$^2=${miseEnEvidence(texNombre(reponse, 0))}$ dm$^2$. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '') + 'dm$^2$'
            } else {
              texte += context.isHtml ? '  $\\ldots$ dm$^2$' : ''
            }
            this.listeCanEnonces.push(`$${texNombre(a, 1)}$ m$^2$  $=$`)
            this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
              '$\\ldots\\Aire[dm]{}$'
          } else {
            a = new Decimal(randint(101, 199)).div(10)
            reponse = new Decimal(a).div(100)
            texte = `$${texNombre(a, 1)}$ dm$^2$  $=$`

            texteCorr = `
        Comme $1$ dm$^2$ $=0,01$ m$^2$, alors $${texNombre(a, 1)}$ dm$^2$  $=${texNombre(a, 1)}\\times 0,01$ m$^2=${miseEnEvidence(texNombre(reponse, 3))}$ m$^2$. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '') + 'm$^2$'
            } else {
              texte += context.isHtml ? '  $\\ldots$ m$^2$' : ''
            }
            this.listeCanEnonces.push(`$${texNombre(a, 1)}$ dm$^2$  $=$`)
            this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
              '$\\ldots\\Aire[m]{}$'
          }

          break

        case 7:
          if (choice([true, false])) {
            a = randint(2, 6)
            k = randint(2, 4)
            b = k * a
            reponse = k * b
            texte = `$${a}$ classeurs identiques coûtent $${b}$ €. ${context.isHtml ? '' : '<br>'} Combien coûtent $${b}$ classeurs ? `

            texteCorr = `$${a}$ classeurs coûtent $${b}$ €.<br>
            $${k}\\times${a}=${k * a}$ classeurs coûtent $${k}\\times${b}=${miseEnEvidence(k * b)}$ €.`
          } else {
            a = randint(1, 4) * 2
            k = choice([new Decimal('1.5'), new Decimal('2.5')])
            b = k * a
            reponse = new Decimal(b).mul(k)
            texte = `$${a}$ classeurs identiques coûtent $${b}$ €. ${context.isHtml ? '' : '<br>'} Combien coûtent $${b}$ classeurs ? `

            texteCorr = `$${a}$ classeurs coûtent $${b}$ €.<br>
              $${a / 2}$ ${a / 2 === 1 ? 'classeur coûte' : 'classeurs coûtent'}  $${texPrix(b / 2)}$ €.<br>
              Ainsi,   $${b}$ classeurs coûtent ${k > 2 ? `$2\\times ${b}+ ${texPrix(b / 2)} =${miseEnEvidence(texPrix(reponse))}$ €.` : `$${b}+ ${texPrix(b / 2)} =${miseEnEvidence(texPrix(reponse))}$ €.`}`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '') + '€'
          }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '$\\ldots €$'
          break

        case 8:
          den = randint(5, 7)
          num = randint(1, 4)
          params = {
            xmin: -4,
            ymin: -3,
            xmax: 4,
            ymax: 4,
            pixelsParCm: 20,
            scale: 1,
            style: 'margin: auto',
          }
          f = new FractionEtendue(num, den)
          reponse = f
          texte = `Quelle fraction du disque représente ${context.isHtml ? '' : '<br>'}l'aire grisée ?<br>`
          texte += context.isHtml ? '' : '\\begin{center}'
          texte += context.isHtml
            ? mathalea2d(
                params,
                f.representation(
                  0,
                  0,
                  3,
                  randint(0, den - 1),
                  'gateau',
                  'gray',
                ),
              )
            : `\\Fraction[Reponse,Couleur=LightGray,Rayon=1.2cm]{${num}/${den}}`
          texte += context.isHtml ? '' : '\\end{center}'
          texteCorr = `L'aire grisée représente $${f.texFraction}$ de l'aire du disque.`

          setReponse(this, index, reponse, {
            formatInteractif: 'fractionEgale',
          })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          this.listeCanEnonces.push(texte)
          break

        case 9:
          a = new Decimal(randint(41, 61, [50, 60])).div(10)
          b = new Decimal(randint(111, 149, [120, 130, 140])).div(100)
          reponse = new Decimal(a).add(b)
          texte = `$${texNombre(a, 1)}+${texNombre(b, 2)}$ `
          texteCorr = `$${texNombre(a, 1)}+${texNombre(b, 2)}=${miseEnEvidence(texNombre(reponse, 2))}$`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          this.listeCanEnonces.push(texte)
          if (this.interactif) {
            texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
          }
          nbChamps = 1

          break

        case 10:
          a = randint(1, 20)
          b = randint(0, 9, 5)
          c = randint(1, 9, b)
          e = randint(1, 9)
          f = randint(1, 9)
          d = new Decimal(a + b * 0.1 + c * 0.01 + e * 0.001 + f * 0.0001)
          if (choice([true, false])) {
            texte = `Quel est l'arrondi au dixième de $${texNombre(d, 4)}$ ?`
            if (c > 4) {
              texteCorr = `Pour arrondir au dixième, on regarde le chiffre des centièmes : $${c}$.<br>
             Comme $${c}\\geqslant 5$, alors l'arrondi au dixième de $${texNombre(d, 4)}$ est $${miseEnEvidence(texNombre(arrondi(d, 1)))}$.`
              reponse = arrondi(d, 1)
            } else {
              texteCorr = `Pour arrondir au dixième, on regarde le chiffre des centièmes : $${c}$.<br>
                Comme $${c}< 5$, alors l'arrondi au dixième de $${texNombre(d, 4)}$  est $${miseEnEvidence(texNombre(arrondi(d, 1)))}$.`
              reponse = arrondi(d, 1)
            }
          } else {
            texte = `Quel est l'arrondi au centième de $${texNombre(d, 4)}$ ?`
            if (e > 4) {
              texteCorr = `Pour arrondir au centième, on regarde le chiffre des millièmes : $${e}$.<br>
             Comme $${e}\\geqslant 5$, alors l'arrondi au centième de $${texNombre(d, 4)}$ est $${miseEnEvidence(texNombre(arrondi(d, 2)))}$.`
              reponse = arrondi(d, 2)
            } else {
              texteCorr = `Pour arrondir au centième, on regarde le chiffre des millièmes : $${e}$.<br>
                Comme $${e}< 5$, alors l'arrondi au centième de $${texNombre(d, 4)}$ est $${miseEnEvidence(texNombre(arrondi(d, 2)))}$.`
              reponse = arrondi(d, 2)
            }
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          break
        case 11:
          a = randint(-6, -2)
          d = droiteGraduee({
            Unite: 1.5,
            Min: -7,
            Max: 2,
            x: 0,
            y: 0,
            thickDistance: 1,
            thickSec: false,
            // thickSecDist: 0.5,
            // thickOffset: 0,
            axeStyle: '->',
            pointListe: [[a, '']],
            labelListe: [
              [1, `${stringNombre(1)}`],
              [0, `${stringNombre(0)}`],
            ],
            pointCouleur: 'blue',
            pointStyle: 'x',
            labelsPrincipaux: false,
          })

          reponse = a
          texte =
            'Le point $A$ est repéré par le nombre :<br>' +
            mathalea2d(
              {
                xmin: -2,
                ymin: -1,
                xmax: 20,
                ymax: 1.5,
                scale: 0.5,
                style: 'margin: auto',
              },
              d,
              texteParPosition(
                'A',
                1.5 * a + 7 * 1.5,
                0.9,
                'milieu',
                'blue',
                context.isHtml ? 2 : 1.5,
              ),
            ) +
            '<br>'
          texteCorr = `Le point $A$ est repéré par le nombre : $${miseEnEvidence(texNombre(a, 2))}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          nbChamps = 1
          this.listeCanEnonces.push(texte)
          break

        case 12:
          a = choice([
            ['les trois cinquièmes', 3, 5, 2, 5],
            ['les trois quart', 3, 4, 1, 4],
            ['les deux cinquièmes', 2, 5, 3, 5],
            ['le tiers', 1, 3, 2, 3],
            ['les deux tiers', 2, 3, 1, 3],
            ['les quatre cinquièmes', 4, 5, 1, 5],
            ['les cinq sixièmes', 5, 6, 1, 6],
            ['les deux septièmes', 2, 7, 5, 7],
            ['les trois septièmes', 3, 7, 4, 7],
            ['les cinq septièmes', 5, 7, 2, 7],
            ['les trois dixièmes', 3, 10, 7, 10],
            ['les sept dixièmes', 7, 10, 3, 10],
            ['les neuf dixièmes', 9, 10, 1, 10],
          ])

          reponse = new FractionEtendue(a[3], a[4])
          texte = `On vide ${a[0]} d'une bouteille d'eau. <br>
            Quelle fraction de la bouteille est encore remplie ?`
          texteCorr = `La fraction de la bouteille encore remplie est donnée par : $1-\\dfrac{${a[1]}}{${a[2]}}=${miseEnEvidence(reponse.texFraction)}$.`

          setReponse(this, index, reponse, {
            formatInteractif: 'fractionEgale',
          })
          this.listeCanEnonces.push(texte)
          if (this.interactif) {
            texte += '<br><br>' + ajouteChampTexteMathLive(this, index, '')
          }
          nbChamps = 1
          break

        case 13:
          if (choice([true, true])) {
            a = new Decimal(randint(101, 199)).div(100)

            reponse = a.mul(-1)
            texte = `L'opposé de $${texNombre(a, 2)}$ est :`
            texteCorr = `Deux nombres sont opposés lorsque leur somme est nulle. <br>
            Ainsi, l'opposé de $${texNombre(a, 2)}$ est : $${miseEnEvidence(texNombre(reponse, 2))}$ car $${texNombre(a, 2)}+(${texNombre(reponse, 2)})=0$.`
          } else {
            a = new Decimal(randint(-199, -101)).div(100)

            reponse = a.mul(-1)
            texte = `L'opposé de  $${texNombre(a, 2)}$ est :`
            texteCorr = `Deux nombres sont opposés lorsque leur somme est nulle. <br>
            Ainsi, l'opposé de $${texNombre(a, 2)}$ est : $${miseEnEvidence(texNombre(reponse, 2))}$ car $${texNombre(a, 2)}+${texNombre(reponse, 2)}=0$.`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          this.listeCanEnonces.push(texte)
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          nbChamps = 1
          break

        case 14:
          if (choice([true, false])) {
            a = randint(1, 10)

            reponse = a + 1
            texte = `$${a}+${a}\\div ${a}$`
            texteCorr = `$${a}+${a}\\div ${a}=${a}+1=${miseEnEvidence(a + 1)}$`
          } else {
            a = randint(1, 10)

            reponse = a - 1
            texte = `$${a}-${a}\\div ${a}$`
            texteCorr = `$${a}-${a}\\div ${a}=${a}-1=${miseEnEvidence(a - 1)}$`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          this.listeCanEnonces.push(texte)
          if (this.interactif) {
            texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
          }
          nbChamps = 1

          break

        case 15:
          if (choice([true, false])) {
            a = randint(2, 10)
            reponse = a * 60
            texte = `$${a}$ min  $=$`

            texteCorr = `
        Comme $1$ min $=60$ secondes, alors $${a}$ min  $=${a}\\times 60$ secondes $=${miseEnEvidence(reponse)}$ secondes. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            this.listeCanEnonces.push(texte)
            this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
              '  $\\ldots$ secondes'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '') + 'secondes'
            } else {
              texte += '  $\\ldots$ secondes'
            }
          } else {
            a = randint(2, 6)
            reponse = a
            texte = `$${a * 60}$ secondes  $=$`

            texteCorr = `
        Comme $60$ secondes $=1$ minute, alors $${a * 60}$ secondes  $=${a * 60}\\div 60$ secondes  $=${miseEnEvidence(reponse)}$ minutes. `
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            this.listeCanEnonces.push(texte)
            this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
              '  $\\ldots$ minutes'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '') + 'minutes'
            } else {
              texte += '  $\\ldots$ minutes'
            }
          }

          nbChamps = 1
          break

        case 16:
          a = new Decimal(
            randint(7, 10) + randint(1, 4) * 0.1 + randint(1, 9) * 0.01,
          )
          b = new Decimal(randint(2, 6) + randint(5, 9) * 0.1)
          reponse = arrondi(new Decimal(a).sub(b), 2)
          texte = `$${texNombre(a, 2)}-${texNombre(b, 1)}$`
          texteCorr = `$${texNombre(a, 2)}-${texNombre(b, 1)}=${miseEnEvidence(texNombre(reponse, 3))}$`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          this.listeCanEnonces.push(texte)
          if (this.interactif) {
            texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
          }
          nbChamps = 1
          break
        case 17:
          a = randint(2, 4)
          b = new Decimal(randint(11, 14)).div(10)
          c = new Decimal(randint(21, 28)).div(10)
          reponse = new Decimal(a).mul(b).add(c)
          texte = `J'achète $${a}$ croissants à $${texPrix(b)}$ € l'unité et un pain à $${texPrix(c)}$ €. <br>
          Combien cela me coûte-t-il ?`
          texteCorr = `$${a}$ croissants à $${texPrix(b)}$ € l'unité coûtent $${a}\\times ${texPrix(b)}\\text{ € }=${texPrix(new Decimal(a).mul(b))}\\text{ € }$.<br>
          En ajoutant le prix du pain, on obtient :
          ${
            context.isHtml
              ? `$${texPrix(new Decimal(a).mul(b))}\\text{ €}+ ${texPrix(c)}\\text{ € }= ${texPrix(reponse)}\\text{ € }$.<br>`
              : `$\\Prix{${new Decimal(a).mul(b)}}+ \\Prix{${c}}= \\Prix{${reponse}}$.<br>`
          }`

          texteCorr += `L'ensemble coûte donc $${miseEnEvidence(texPrix(reponse))}\\text{ € }$.
          
          `
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '  $\\ldots$ €'
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '') + '€'
          }
          nbChamps = 1
          break
        case 18:
          a = randint(1, 6)
          k = randint(3, 9)
          b = a * k
          c = randint(1, 9, a)
          reponse = c * k

          texte = 'Complète ce tableau de proportionnalité :'
          texte += context.isHtml ? '<br>' : '\\\\\\smallskip'
          texte += context.isHtml ? '' : '{\\renewcommand{\\arraystretch}{1}'
          texte += `$\\begin{array}{|c|c|}
          \\hline
          ${a}&${b}${context.isHtml ? '\\\\' : '\\tabularnewline'}
          \\hline
          ${c}&${context.isHtml ? '\\\\' : '?\\tabularnewline'}
          \\hline
          \\end{array}$`
          texte += context.isHtml ? '' : '}\\medskip'
          texteCorr = `On constate que $${b}$ s'obtient en multipliant $${a}$ par $${k}$.
            Ainsi, on obtient la quatrième proportionnelle en multipliant $${c}$ par $${k}$.<br>
            La valeur cherchée est donc $${c}\\times ${k}=${miseEnEvidence(k * c)}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '? $=\\ldots$'
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }

          nbChamps = 1

          break

        case 19:
          if (choice([true, false])) {
            b = randint(1, 10)
            k = randint(1, 10)
            a = b + 4 * k
            reponse = k
            texte = `Le quart de la différence entre $${a}$ et $${b}$ est : `

            texteCorr = `La différence entre $${a}$ et $${b}$ est : $${a}-${b}=${a - b}$.<br>
            Le quart de cette différence est : $\\dfrac{1}{4}\\times ${a - b}=\\dfrac{${a - b}}{4}=${miseEnEvidence(reponse)}$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '')
            }
          } else {
            b = randint(1, 10)
            k = randint(1, 10)
            a = b + 3 * k
            reponse = k
            texte = `Le tiers de la différence entre $${a}$ et $${b}$ est : `

            texteCorr = `La différence entre $${a}$ et $${b}$ est : $${a}-${b}=${a - b}$.<br>
            Le tiers de cette différence est : $\\dfrac{1}{3}\\times ${a - b}=\\dfrac{${a - b}}{3}=${miseEnEvidence(reponse)}$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '')
            }
          }
          this.listeCanEnonces.push(texte)
          nbChamps = 1
          break
        case 20:
          if (choice([true, false])) {
            b = randint(11, 18)
            a = choice([115, 120, 125, 130, 135]) - b
            A = point(0, 0)
            B = point(6, 0)
            C = point(4, 2)
            s1 = segment(A, B)
            s2 = segment(A, C)
            s3 = segment(B, C)

            xmin = -1
            ymin = -1
            xmax = 6.5
            ymax = 2.5
            objets = []
            objets.push(
              texteParPosition(
                `${stringNombre(a)}°`,
                3.8,
                1.4,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                `${stringNombre(b)}°`,
                1,
                0.2,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                '?',
                5.3,
                0.3,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              s1,
              s2,
              s3,
              codageAngle(B, C, A, 0.3),
              codageAngle(C, A, B, 0.5),
            ) //
          } else {
            b = randint(41, 45)
            a = choice([140, 145, 150, 155, 160]) - b
            // a = choice([100, 110, 120])
            // b = choice([45, 50, 55])
            A = point(0, 0)
            B = point(6, 0)
            C = point(2, 2)
            s1 = segment(A, B)
            s2 = segment(A, C)
            s3 = segment(B, C)

            xmin = -1
            ymin = -1
            xmax = 6.5
            ymax = 2.5
            objets = []
            objets.push(
              texteParPosition(
                `${stringNombre(a)}°`,
                2.1,
                1.4,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                `${stringNombre(b)}°`,
                1,
                0.2,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              texteParPosition(
                '?',
                5,
                0.3,
                'milieu',
                'black',
                context.isHtml ? 1 : 0.7,
              ),
              s1,
              s2,
              s3,
              codageAngle(B, C, A, 0.3),
              codageAngle(C, A, B, 0.5),
            )
          }
          reponse = 180 - a - b
          texte = 'On donne la figure suivante :<br>'
          texte += mathalea2d(
            {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 40,
              mainlevee: false,
              amplitude: 0.5,
              scale: 0.6,
              style: 'margin: auto',
            },
            objets,
          )
          texte += '? $=$'
          texteCorr = `Dans un triangle, la somme des angles vaut $180°$.<br>
         ?$=180-${a}-${b}=${miseEnEvidence(180 - a - b)}^\\circ$.`
          this.listeCanEnonces.push(
            'On donne la figure suivante :<br>' +
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 40,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.6,
                  style: 'margin: auto',
                },
                objets,
              ),
          )
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '? $=\\ldots ^\\circ$'
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })

          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '') + '°'
          } else {
            texte += ' $\\ldots ^\\circ$'
          }
          nbChamps = 1
          break

        case 21:
          a = randint(11, 69, [20, 30, 40, 50, 60])

          reponse = new Decimal(a).div(10)
          texte = `$10\\,\\%$ de $${a}$`

          texteCorr = `Prendre $10\\,\\%$ d'une quantité revient à la diviser par $10$. <br>
            Ainsi,
           $10\\,\\%$ de $${a}=  ${a}\\div 10 =${miseEnEvidence(texNombre(reponse, 1))}$.`

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ' $=$' + ajouteChampTexteMathLive(this, index, '')
          }
          this.listeCanEnonces.push(texte)
          nbChamps = 1
          break

        case 22:
          b = choice([20, 25, 30, 35, 40, 45]) / 10
          a = choice([-20, -25, -30, -35, -40, -45]) / 10
          d = droiteGraduee({
            Unite: 1,
            Min: -5,
            Max: 5,
            x: 0,
            y: 0,
            thickDistance: 1,
            thickSec: false,
            axeStyle: '->',
            pointListe: [
              [b, ''],
              [a, ''],
            ],
            labelListe: [
              [a, ''],
              [b, ''],
              [0, ''],
            ],
            pointCouleur: 'blue',
            pointStyle: 'x',
            thickEpaisseur: 1,
            axeEpaisseur: 2.5,
            pointTaille: context.isHtml ? 5 : 3,

            // labelPointLargeur:context.isHtml ? 10 : 5,
            // labelPointTaille: context.isHtml ? 10 : 2,
            // pointEpaisseur: context.isHtml ? 2 : 1,
            labelsPrincipaux: false,
          })
          labA = texteParPosition(
            'A',
            a + 5,
            0.6,
            'milieu',
            'blue',
            context.isHtml ? 2 : 1,
          )
          labB = texteParPosition(
            'B',
            b + 5,
            0.6,
            'milieu',
            'blue',
            context.isHtml ? 2 : 1,
          )
          lab1 = texteParPosition(
            `$${stringNombre(a, 1)}$`,
            a + 5,
            -0.9,
            'milieu',
            'blue',
            context.isHtml ? 1.5 : 1,
          )
          lab2 = texteParPosition(
            `$${stringNombre(b, 1)}$`,
            b + 5,
            -0.9,
            'milieu',
            'blue',
            context.isHtml ? 1.5 : 1,
          )
          lab3 = texteParPosition(
            `$${stringNombre(0)}$`,
            5,
            -0.9,
            'milieu',
            'black',
            context.isHtml ? 2 : 1,
          )
          reponse = arrondi(b - a, 1)

          texteCorr = `$AB=${b}-(${a})=${miseEnEvidence(texNombre(b - a, 1))}$.`
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte = '$AB=$' + ajouteChampTexteMathLive(this, index, '')
          } else {
            texte = '$AB=\\ldots$<br>'
          }
          texte += mathalea2d(
            {
              xmin: -1,
              ymin: -1.5,
              xmax: 15,
              ymax: 1.2,
              pixelsParCm: 30,
              scale: 0.6,
              style: 'margin: auto',
            },
            d,
            labA,
            labB,
            lab1,
            lab2,
            lab3,
          )
          this.listeCanEnonces.push(
            mathalea2d(
              {
                xmin: -1,
                ymin: -1.5,
                xmax: 15,
                ymax: 1.2,
                pixelsParCm: 25,
                scale: 0.6,
                style: 'margin: auto',
              },
              d,
              labA,
              labB,
              lab1,
              lab2,
              lab3,
            ),
          )
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '$AB=\\ldots$'
          nbChamps = 1

          break

        case 23:
          m = choice([1, 2, 3, 4, 5])
          if (m === 1) {
            a = new Decimal(randint(21, 89, [30, 40, 50, 60, 70, 80])).div(10)
            b = new Decimal('0.5')
            reponse = new Decimal(a).mul(10)
            texte = `$20\\times${texNombre(a, 1)}\\times ${texNombre(b, 1)}$`
            texteCorr = `$20\\times${texNombre(a, 1)}\\times ${texNombre(b, 1)}=\\underbrace{20\\times ${texNombre(b, 2)}}_{=10}\\times${texNombre(a, 1)}=${miseEnEvidence(texNombre(10 * a, 0))}$`
          }
          if (m === 2) {
            a = new Decimal(randint(21, 89, [30, 40, 50, 60, 70, 80])).div(10)
            b = new Decimal('0.1')
            reponse = new Decimal(a)
            texte = `$10\\times${texNombre(a, 1)}\\times ${texNombre(b, 1)}$`
            texteCorr = `$10\\times${texNombre(a, 1)}\\times ${texNombre(b, 1)}=\\underbrace{10\\times ${texNombre(b, 2)}}_{=1}\\times${texNombre(a, 1)}=${miseEnEvidence(texNombre(a, 1))}$`
          }
          if (m === 3) {
            a = new Decimal(randint(21, 89, [30, 40, 50, 60, 70, 80])).div(10)
            b = new Decimal('0.1')
            reponse = new Decimal(a).mul(10)
            texte = `$100\\times${texNombre(a, 1)}\\times ${texNombre(b, 1)}$`
            texteCorr = `$100\\times${texNombre(a, 1)}\\times ${texNombre(b, 1)}=\\underbrace{100\\times ${texNombre(b, 2)}}_{=10}\\times${texNombre(a, 1)}=${miseEnEvidence(texNombre(a * 10, 0))}$`
          }
          if (m === 4) {
            a = new Decimal(randint(21, 89, [30, 40, 50, 60, 70, 80])).div(10)
            b = new Decimal('0.25')
            reponse = new Decimal(a).mul(10)
            texte = `$40\\times${texNombre(a, 1)}\\times ${texNombre(b, 2)}$`
            texteCorr = `$40\\times${texNombre(a, 1)}\\times ${texNombre(b, 2)}=\\underbrace{100\\times ${texNombre(b, 2)}}_{=10}\\times${texNombre(a, 1)}=${miseEnEvidence(texNombre(a * 10, 0))}$`
          }
          if (m === 5) {
            a = new Decimal(
              randint(211, 989, [300, 400, 500, 600, 700, 800, 900]),
            ).div(100)
            b = new Decimal('0.5')
            reponse = new Decimal(a).mul(10)
            texte = `$20\\times${texNombre(a, 2)}\\times ${texNombre(b, 1)}$`
            texteCorr = `$20\\times${texNombre(a, 2)}\\times ${texNombre(b, 1)}=\\underbrace{20\\times ${texNombre(b, 2)}}_{=10}\\times${texNombre(a, 2)}=${miseEnEvidence(texNombre(10 * a, 1))}$`
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          this.listeCanEnonces.push(texte)
          nbChamps = 1

          break

        case 24:
          choix = choice(['a', 'b', 'c'])
          if (choix === 'a') {
            A = point(0, 0)
            B = point(-1, 0)
            C = point(-1, -1)
            D = point(0, -1)
            E = point(0, -2)
            F = point(1, -2)
            G = point(1, -1)
            H = point(2, -1)
            I = point(2, 0)
            J = point(1, 0)
            K = point(1, 1)
            L = point(0, 1)
            a = droite(J, D)
            b = droite(A, G)
            c = droite(milieu(E, F), milieu(L, K))
            d = droite(milieu(B, C), milieu(H, I))
            pol = polygone([A, B, C, D, E, F, G, H, I, J, K, L], 'black')
            xmin = -2
            ymin = -2.1
            xmax = 3
            ymax = 1.2

            reponse = 4
            texte = "Quel est le nombre d'axe(s) de symétrie  ?<br>"
            texte += mathalea2d(
              {
                xmin,
                ymin,
                xmax,
                ymax,
                pixelsParCm: 40,
                mainlevee: false,
                amplitude: 0.5,
                scale: 0.4,
                style: 'margin: auto',
              },
              pol,
            )
            texteCorr =
              `La figure a $${miseEnEvidence(4)}$ axes de symétrie. <br> ` +
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 40,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.4,
                  style: 'margin: auto',
                },
                pol,
                a,
                b,
                c,
                d,
              )
          }
          if (choix === 'b') {
            A = point(0, 0)
            E = point(3, -1)
            D = point(4.73, 0)
            C = point(3, 1)
            a = droite(A, D)
            pol = polygone([A, E, D, C], 'black')
            xmin = -1
            ymin = -1.5
            xmax = 5.5
            ymax = 1.5

            reponse = 1
            texte = "Quel est le nombre d'axe(s) de symétrie  ?<br>"
            texte += mathalea2d(
              {
                xmin,
                ymin,
                xmax,
                ymax,
                pixelsParCm: 40,
                mainlevee: false,
                amplitude: 0.5,
                scale: 0.4,
                style: 'margin: auto',
              },
              pol,
            )
            texteCorr =
              `La figure a $${miseEnEvidence(1)}$ axe de symétrie. <br> ` +
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 40,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.4,
                  style: 'margin: auto',
                },
                pol,
                a,
              )
          }

          if (choix === 'c') {
            A = point(0, 0)
            B = point(-0.5, -1)
            C = point(1.75, -0.5)
            D = point(4, -1)
            E = point(3.5, 0)
            F = point(4, 1)
            G = point(1.75, 0.5)
            H = point(-0.5, 1)

            a = droite(A, E)
            b = droite(C, G)

            pol = polygone([A, B, C, D, E, F, G, H], 'black')
            xmin = -2
            ymin = -2.1
            xmax = 4.5
            ymax = 1.2

            reponse = 2
            texte = "Quel est le nombre d'axe(s) de symétrie  ?<br>"
            texte += mathalea2d(
              {
                xmin,
                ymin,
                xmax,
                ymax,
                pixelsParCm: 40,
                mainlevee: false,
                amplitude: 0.5,
                scale: 0.4,
                style: 'margin: auto',
              },
              pol,
            )
            texteCorr =
              `La figure a $${miseEnEvidence(2)}$ axes de symétrie. <br> ` +
              mathalea2d(
                {
                  xmin,
                  ymin,
                  xmax,
                  ymax,
                  pixelsParCm: 40,
                  mainlevee: false,
                  amplitude: 0.5,
                  scale: 0.4,
                  style: 'margin: auto',
                },
                pol,
                a,
                b,
              )
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += '<br>' + ajouteChampTexteMathLive(this, index, '')
          }
          this.listeCanEnonces.push(texte)
          nbChamps = 1
          break
        case 25:
          choix = choice(['a', 'b', 'c']) //, 'b'
          if (choix === 'a') {
            a = randint(45, 49) + randint(1, 9) / 10
            b = randint(2, 5) + randint(1, 9) / 10

            propositions = shuffle([
              `$${texNombre((a * b) / 10, 3)}$`,
              `$${texNombre(a * b * 10, 1)}$`,
              `$${texNombre(a * b, 2)}$`,
            ])
            reponse = arrondi(a * b, 3)
            texte = `Recopie  le résultat de  :
            $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$<br>
            
            `

            texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
            texteCorr = `En prenant un ordre de grandeur pour chacun des deux nombres, on obtient  $50\\times ${Math.round(b)}=${50 * Math.round(b)}$.<br>
            Ainsi, $${texNombre(a, 1)}\\times ${texNombre(b, 1)}=${miseEnEvidence(texNombre(a * b, 2))}$. `
          }
          if (choix === 'b') {
            a = randint(3, 9) + randint(1, 9) / 10
            b = randint(2, 5) + randint(1, 9) / 10
            propositions = shuffle([
              `$${texNombre((a * b) / 10, 3)}$`,
              `$${texNombre(a * b * 10, 1)}$`,
              `$${texNombre(a * b, 2)}$`,
            ])
            reponse = arrondi(a * b, 3)
            texte = `Recopie  le résultat de  :
                $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$<br>
                
                `

            texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
            texteCorr = `En prenant un ordre de grandeur pour chacun des deux nombres, on obtient  $${Math.round(a)}\\times ${Math.round(b)}=${Math.round(a) * Math.round(b)}$.<br>
            Ainsi, $${texNombre(a, 1)}\\times ${texNombre(b, 1)}=${miseEnEvidence(texNombre(a * b, 2))}$. `
          }
          if (choix === 'c') {
            a = randint(45, 49) + randint(1, 9) / 10
            b = randint(25, 29) + randint(1, 9) / 10
            propositions = shuffle([
              `$${texNombre((a * b) / 10, 3)}$`,
              `$${texNombre(a * b * 10, 1)}$`,
              `$${texNombre(a * b, 2)}$`,
            ])
            reponse = arrondi(a * b, 3)
            texte = `Recopie  le résultat de  :
                    $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$<br>
                    
                    `

            texte += `${propositions[0]} ${sp(4)} ${propositions[1]} ${sp(4)} ${propositions[2]}`
            texteCorr = `En prenant un ordre de grandeur pour chacun des deux nombres, on obtient  $30\\times 50=1500$.<br>
           Ainsi, $${texNombre(a, 1)}\\times ${texNombre(b, 1)}=${miseEnEvidence(texNombre(a * b, 2))}$. `
          }
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          this.listeCanEnonces.push(
            `Entoure le résultat de $${texNombre(a, 1)}\\times ${texNombre(b, 1)}$`,
          )
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            `${propositions[0]} ${sp(6)} ${propositions[1]} ${sp(6)} ${propositions[2]}`
          nbChamps = 1
          break
        case 26:
          m = choice([1, 2])
          if (m === 1) {
            b = randint(10, 22) * 100

            texte = `Un avion parcourt $${texNombre(b)}$ km en $3$ h. <br>
            Quelle durée met-il pour parcourir ${context.isHtml ? `$${texNombre(1.5 * b, 0)}$ km` : `\\Lg[km]{${texNombre(1.5 * b, 0)}}`} ?`
            texteCorr = `En 1h 30 min, l'avion parcourt $${texNombre(0.5 * b, 0)}$ km.<br>
            Comme il met $3$ h pour parcourir $${texNombre(b)}$ km,  il mettra $${miseEnEvidence(4)}$ h $${miseEnEvidence(30)}$ min pour parcourir $${texNombre(1.5 * b, 0)}$ km. `
            handleAnswers(this, index, {
              reponse: {
                value: new Hms({ hour: 4, minute: 30 }).toString(),
                options: { HMS: true },
              },
            })
            texte += ajouteChampTexteMathLive(
              this,
              index,
              KeyboardType.clavierHms,
            )
          }
          if (m === 2) {
            b = choice([900, 1200, 1500, 1800, 2100, 2400])

            texte = `Un avion parcourt $${texNombre(b)}$ km en $3$ h. <br>
            Quelle durée met-il pour parcourir ${context.isHtml ? `$${texNombre(b + b / 6, 0)}$ km` : `\\Lg[km]{${texNombre(b + b / 6, 0)}}`} ? `
            texteCorr = `En $1$ h , l'avion parcourt $${texNombre(b / 3, 0)}$ km, donc en $30$ min, il parcourt  $${texNombre(b / 6, 0)}$ km. <br>
            Ainsi, il met $${miseEnEvidence(3)}$ h $${miseEnEvidence(30)}$ min pour parcourir $${texNombre(b + b / 6, 0)}$ km`
            handleAnswers(this, index, {
              reponse: {
                value: new Hms({ hour: 3, minute: 30 }).toString(),
                options: { HMS: true },
              },
            })
            texte += ajouteChampTexteMathLive(
              this,
              index,
              KeyboardType.clavierHms,
            )
          }
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '$\\ldots\\text{ h }\\ldots\\text{ min}$'
          nbChamps = 1

          break

        case 27:
          a = randint(5, 9)
          b = randint(2, 6)
          c = choice([2, 4, 5])
          d = paveLPH3d(0, 0, 0, 1, a, c, b, 'black')
          texte = 'Combien y a-t-il de petits cubes ?'
          texte += `<br>${mathalea2d(
            Object.assign(fixeBordures(d.c2d), {
              pixelsParCm: 20,
              scale: 0.4,
            }),
            d.c2d,
          )}`

          texteCorr = `Le nombre de petits cubes est donné par le produit :<br>
        $${a}\\times ${b}\\times ${c} = ${miseEnEvidence(a * b * c)}$
        `

          reponse = a * b * c
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '$\\ldots$ cubes'
          nbChamps = 1
          break

        case 28:
          if (choice([true, false])) {
            l = randint(2, 3)
            L = randint(2, 5)
            h = randint(2, 5, [l, L])
            pav = pave(L, l, h)
            texte = `Quel est le volume du pavé droit ci-dessous ?<br>
        ${mathalea2d({ xmin: -2, ymin: -2, xmax: 10, ymax: 0.5 * h + l, scale: 0.6 }, pav)}`
            reponse = L * l * h
            texteCorr = `Le volume de ce pavé droit est : $${L}\\text{ cm}\\times ${l} \\text{ cm}\\times ${h}\\text{ cm}=${reponse}$ cm$^3$.`
          } else {
            l = randint(2, 5)
            L = l
            h = l
            pav = pave(l, l, l)
            texte = `Quel est le volume de ce cube ?<br>
          ${mathalea2d({ xmin: -2, ymin: -2, xmax: 10, ymax: 0.5 * h + l, scale: 0.6 }, pav)}`
            reponse = L * l * h
            texteCorr = `Le volume de ce cube est : $${L}\\text{ cm}\\times ${l} \\text{ cm}\\times ${h}\\text{ cm}=${reponse}$ cm$^3$.`
          }

          texte += ajouteChampTexteMathLive(this, index, '', {
            texteApres: ' cm$^3$',
          })
          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          this.listeCanEnonces.push(texte)
          this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
            '$\\mathscr{V}=\\ldots$ cm$^3$'
          nbChamps = 1
          break

        case 29:
          a = randint(2, 50)
          choix = choice(['a', 'b'])

          if (choix === 'a') {
            reponse = a
            texte = `$${a}$ dm$^3=$`
            texteCorr = `$1$ dm$^3= 1$ L, donc $${a}$ dm$^3=${a}$ L.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            this.listeCanEnonces.push(`$${a}$ dm$^3=$`)
            this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
              '$\\ldots$ L'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '') + 'L'
            } else {
              texte += ' $\\ldots$ L'
            }
          }
          if (choix === 'b') {
            reponse = a
            texte = `$${a}$ L $=$`
            texteCorr = `$1$ dm$^3= 1$ L, donc $${a}$ L $=${a}$ dm$^3$.`
            setReponse(this, index, reponse, { formatInteractif: 'calcul' })
            this.listeCanEnonces.push(`$${a}$ L $=$`)
            this.listeCanReponsesACompleter[this.listeCanEnonces.length - 1] =
              '$\\ldots$ dm$^3$'
            if (this.interactif) {
              texte += ajouteChampTexteMathLive(this, index, '') + 'dm$^3$'
            } else {
              texte += ' $\\ldots$ dm$^3$'
            }
          }
          nbChamps = 1

          break
        case 30:
          a = randint(2, 4)
          b = randint(1, 2)
          c = randint(1, 2)
          d = a * 100 + b * 10 + c

          reponse = a * 100 + b * 10 + c + 9 - a - b - c
          texte = `Trouver le plus petit nombre supérieur à $${d}$ qui soit divisible par $9$.`
          texteCorr = `La somme des chiffres est $${a + b + c}$. Pour obtenir un multiple de $9$ il faut que la somme des chiffres soit $9$, il faut donc ajouter $${9 - a - b - c}$ au nombre $${d}$.<br>
            Ainsi, le plus petit nombre supérieur à $${d}$ qui soit divisible par $9$ est $${a * 100 + b * 10 + c}+${9 - a - b - c}=${miseEnEvidence(reponse)}$. `

          setReponse(this, index, reponse, { formatInteractif: 'calcul' })
          this.listeCanEnonces.push(texte)
          if (this.interactif) {
            texte += ajouteChampTexteMathLive(this, index, '')
          }
          nbChamps = 1
          break
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
        index += nbChamps
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
