import Decimal from 'decimal.js'
import { codageAngleDroit } from '../../../lib/2d/angles'
import { codageSegments } from '../../../lib/2d/codages'
import { milieu, point } from '../../../lib/2d/points'
import { segment } from '../../../lib/2d/segmentsVecteurs'
import { texteParPosition } from '../../../lib/2d/textes'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { stringNombre, texNombre } from '../../../lib/outils/texNombre'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Calculer une longueur/un périmètre (avec des décimaux)'
export const dateDePublication = '27/08/2022'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * @author Gilles Mora
 * Créé le 03/08/2022

 */
export const uuid = '08764'

export const refs = {
  'fr-fr': ['can6M12', 'CM1M1I-flash2'],
  'fr-ch': ['NR'],
}
export default class ProblemesDeLongueursEtPerimetre extends ExerciceSimple {
  constructor() {
    super()
    this.nbQuestions = 1
    this.typeExercice = 'simple'

    this.optionsChampTexte = { texteApres: ' cm' }
  }

  nouvelleVersion() {
    let choix
    let a
    let a2
    let b2
    let b
    let A
    let B
    let C
    let D
    let objets = []
    let s1
    let s2
    let s3
    let s4
    switch (
      choice([1, 2, 3, 4]) //, 2, 3, 4
    ) {
      case 1: // périmètre
        choix = choice([true, false])
        objets = []
        a = randint(11, 49, [20, 30, 40]) / 10
        A = point(0, 0, 'A', 'below')
        B = point(6, 0, 'B', 'below')
        C = point(6, 6, 'C', 'below')
        D = point(0, 6, 'D', 'below')
        s1 = segment(A, B)
        s2 = segment(B, C)
        s3 = segment(C, D)
        s4 = segment(A, D)
        if (choice([true, false])) {
          objets.push(
            codageSegments('||', 'blue', A, B),
            codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, D),
            codageSegments('||', 'blue', A, D),
            texteParPosition(
              `${stringNombre(a)} cm`,
              milieu(A, B).x,
              milieu(A, B).y - 0.8,
            ),
            codageAngleDroit(D, A, B),
            codageAngleDroit(A, B, C),
            codageAngleDroit(B, C, D),
            codageAngleDroit(C, D, A),
            s1,
            s2,
            s3,
            s4,
          )
          this.question = `Quel est le périmètre de ce carré ?<br>`
          this.question += mathalea2d(
            {
              xmin: -0.5,
              ymin: -1.4,
              xmax: 7.5,
              ymax: 7,
              scale: 0.5,
              style: 'margin: auto',
            },
            objets,
          )

          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = new Decimal(a).mul(4)
          this.correction = `Il s'agit d'un carré. <br>
          Son périmètre est donc
          $4$ fois la longueur de son côté, soit $4\\times ${texNombre(a, 1)}=${miseEnEvidence(texNombre(4 * a, 1))}$ cm.`
        } else {
          objets.push(
            codageSegments('||', 'blue', A, B),
            codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, D),
            codageSegments('||', 'blue', A, D),
            texteParPosition('?', milieu(A, B).x, milieu(A, B).y - 0.8),
            codageAngleDroit(D, A, B),
            codageAngleDroit(A, B, C),
            codageAngleDroit(B, C, D),
            codageAngleDroit(C, D, A),
            s1,
            s2,
            s3,
            s4,
          )
          this.question = `Le périmètre  de ce carré est $${texNombre(4 * a, 1)}$ cm.<br>
            Quelle est la longueur de son côté ? <br>`
          this.question += mathalea2d(
            {
              xmin: -0.5,
              ymin: -1.4,
              xmax: 7.5,
              ymax: 7,
              scale: 0.5,
              style: 'margin: auto',
            },
            objets,
          )
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = a
          this.correction = `Il s'agit d'un carré. <br>
            Son côté est donc le quart de son périmètre, soit $${texNombre(4 * a, 1)}\\div 4=${miseEnEvidence(texNombre(a, 1))}$ cm.`
        }
        break

      case 2: // périmètre rectangle
        choix = choice([true, false])
        objets = []
        a = randint(31, 49, [30, 40]) / 10
        a2 = new Decimal(a).mul(2)
        b = randint(15, 29, 20) / 10
        b2 = new Decimal(b).mul(2)
        A = point(0, 0, 'A', 'below')
        B = point(8, 0, 'B', 'below')
        C = point(8, 6, 'C', 'below')
        D = point(0, 6, 'D', 'below')
        s1 = segment(A, B)
        s2 = segment(B, C)
        s3 = segment(C, D)
        s4 = segment(A, D)

        objets.push(
          codageSegments('||', 'blue', A, B),
          codageSegments('|', 'blue', B, C),
          codageSegments('||', 'blue', C, D),
          codageSegments('|', 'blue', A, D),
          texteParPosition(
            `${stringNombre(a)} cm`,
            milieu(A, B).x,
            milieu(A, B).y - 0.8,
          ),
          texteParPosition(
            `${stringNombre(b)} cm`,
            milieu(B, C).x + 1.7,
            milieu(B, C).y,
          ),
          codageAngleDroit(D, A, B),
          codageAngleDroit(A, B, C),
          codageAngleDroit(B, C, D),
          codageAngleDroit(C, D, A),
          s1,
          s2,
          s3,
          s4,
        )
        this.question = `Quel est le périmètre de ce rectangle ? <br>
        La figure n'est pas à l'échelle. <br>
        `
        this.question += mathalea2d(
          {
            xmin: -0.5,
            ymin: -1.4,
            xmax: 11,
            ymax: 7,
            scale: 0.5,
            style: 'margin: auto',
          },
          objets,
        )

        this.optionsChampTexte = { texteApres: ' cm' }

        this.reponse = new Decimal(a2).add(b2)
        this.correction = `Il s'agit d'un rectangle. <br>
        Son périmètre est donc
       $2$ fois la longueur de son demi-périmètre, soit
       $2\\times (${texNombre(a, 1)}+${texNombre(b, 1)})= 2\\times ${texNombre(new Decimal(a).add(b), 1)}=${miseEnEvidence(texNombre(2 * a + 2 * b, 1))}$ cm.`
        break

      case 3: // périmètre/longueur triangle équi
        objets = []
        a = randint(16, 39, [20, 30]) / 10
        A = point(0, 0, 'A', 'below')
        B = point(6, 0, 'B', 'below')
        C = point(3, 5.2, 'C', 'below')
        s1 = segment(A, B)
        s2 = segment(B, C)
        s3 = segment(A, C)

        if (choice([true, false])) {
          objets.push(
            codageSegments('||', 'blue', A, B),
            codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition(
              `${stringNombre(a)} cm`,
              milieu(A, B).x,
              milieu(A, B).y - 0.8,
            ),
            s1,
            s2,
            s3,
          )
          this.question = `Quel est  le périmètre de ce triangle ? <br>`
          this.question += mathalea2d(
            {
              xmin: -0.5,
              ymin: -1.4,
              xmax: 7,
              ymax: 6,
              scale: 0.5,
              style: 'margin: auto',
            },
            objets,
          )
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = new Decimal(a).mul(3)
          this.correction = `Le triangle est équilatéral.<br>
        Son périmètre est $3$ fois la longueur de son côté, soit $3\\times ${texNombre(a, 1)}=${miseEnEvidence(texNombre(3 * a, 1))}$ cm.`
        } else {
          objets.push(
            codageSegments('||', 'blue', A, B),
            codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition('?', milieu(A, B).x, milieu(A, B).y - 0.8),
            s1,
            s2,
            s3,
          )
          this.question = `Le périmètre de ce triangle est  $${texNombre(3 * a, 1)}$ cm, quelle est la longueur de son côté ?<br> `
          this.question += mathalea2d(
            {
              xmin: -0.5,
              ymin: -1.2,
              xmax: 7,
              ymax: 6,
              scale: 0.5,
              style: 'margin: auto',
            },
            objets,
          )
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = a
          this.correction = `Puisque le triangle est équilatéral, la longueur de son côté est le tiers de son périmètre, soit $${texNombre(3 * a)}\\div ${3}=${miseEnEvidence(texNombre(a, 1))}$ cm. `
        }
        break

      case 4: // périmètre/longueur triangle isocèle
        objets = []
        a = (randint(3, 9) * 2 + 1) / 2
        b = randint(8, 12)
        do {
          a = (randint(3, 9) * 2 + 1) / 2
          b = randint(5, 12)
        } while (2 * a <= b || b <= 0) //
        A = point(0, 0, 'A', 'below')
        B = point(5, 0, 'B', 'below')
        C = point(2.5, 2, 'C', 'below')
        s1 = segment(A, B)
        s2 = segment(B, C)
        s3 = segment(A, C)

        choix = choice(['a', 'b', 'c']) //
        if (choix === 'a') {
          objets.push(
            codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition(`${b} cm`, milieu(A, B).x, milieu(A, B).y - 0.8),
            texteParPosition(
              `${stringNombre(a)} cm`,
              milieu(B, C).x + 1,
              milieu(B, C).y + 0.5,
            ),
            s1,
            s2,
            s3,
          )
          this.question = `Quel est  le périmètre de ce triangle ? <br>
        La figure n'est pas à l'échelle. <br> `
          this.question += mathalea2d(
            {
              xmin: -0.5,
              ymin: -1.4,
              xmax: 6,
              ymax: 3,
              scale: 0.7,
              style: 'margin: auto',
            },
            objets,
          )
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = new Decimal(a).mul(2).add(b)
          this.correction = `Le triangle est isocèle.<br>
        Son périmètre est : $2\\times ${texNombre(a, 1)}+${b}=${miseEnEvidence(texNombre(2 * a + b, 1))}$ cm.`
        }
        if (choix === 'b') {
          objets.push(
            codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition(`${b} cm`, milieu(A, B).x, milieu(A, B).y - 0.7),
            texteParPosition('?', milieu(B, C).x + 1, milieu(B, C).y + 0.5),
            s1,
            s2,
            s3,
          )
          this.question = `Le périmètre de ce triangle est  $${2 * a + b}$ cm, quelle est la longueur manquante ?<br>
            La figure n'est pas à l'échelle. <br>
            `
          this.question += mathalea2d(
            {
              xmin: -0.5,
              ymin: -1.4,
              xmax: 6,
              ymax: 2.5,
              scale: 0.7,
              style: 'margin: auto',
            },
            objets,
          )

          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = a
          this.correction = `Le triangle est isocèle, il possède donc deux longueurs égales.<br>
            Puisque le périmètre est  $${2 * a + b}$ cm, on obtient la somme des deux longueurs égales  du triangle en effectuant la différence $${2 * a + b}-${b}=${2 * a}$ cm.<br>
            On obtient  la longueur cherchée en divisant par $2$, soit $${texNombre(2 * a, 1)}\\div 2=${miseEnEvidence(texNombre(a, 1))}$ cm.`
        }
        if (choix === 'c') {
          objets.push(
            codageSegments('||', 'blue', B, C),
            codageSegments('||', 'blue', C, A),
            texteParPosition('?', milieu(A, B).x, milieu(A, B).y - 0.7),
            texteParPosition(
              `${stringNombre(a)} cm`,
              milieu(B, C).x + 1,
              milieu(B, C).y + 0.5,
            ),
            s1,
            s2,
            s3,
          )
          this.question = `Le périmètre de ce triangle est  $${2 * a + b}$ cm, quelle est la longueur manquante ?<br>
                La figure n'est pas à l'échelle. <br> `
          this.question += mathalea2d(
            {
              xmin: -0.5,
              ymin: -1.4,
              xmax: 6,
              ymax: 2.5,
              scale: 0.75,
              style: 'margin: auto',
            },
            objets,
          )
          this.optionsChampTexte = { texteApres: ' cm' }

          this.reponse = b
          this.correction = `Le triangle est isocèle, il possède donc deux longueurs égales.<br>
                Puisque le périmètre est  $${texNombre(2 * a + b, 1)}$ cm, on obtient la longueur manquante par : 
                $${texNombre(2 * a + b, 1)}-2\\times ${texNombre(a, 1)}=${miseEnEvidence(b)}$ cm.`
        }
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\dots$ cm'
  }
}
