import { point } from '../../lib/2d/points'
import { createList } from '../../lib/format/lists'
import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence, texteItalique } from '../../lib/outils/embellissements'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import ExerciceBrevetA from '../ExerciceBrevetA'
import {
  decompositionFacteursPremiers,
  ppcm,
  texFactorisation,
} from '../../lib/outils/primalite'
import { deuxColonnesResp } from '../../lib/format/miseEnPage'
import { polygoneRegulierParCentreEtRayon } from '../../lib/2d/polygones'
import { cercle } from '../../lib/2d/cercle'
import { prenomF, prenomM } from '../../lib/outils/Personne'
import { texteParPosition } from '../../lib/2d/textes'
import { randint } from '../../modules/outils'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { rotation } from '../../lib/2d/transformations'
import Hms from '../../modules/Hms'
import { texNombre } from '../../lib/outils/texNombre'

export const uuid = 'ec6ad'
export const refs = {
  'fr-fr': ['3Z1DNB-20'],
  'fr-ch': [],
}
export const titre =
  "Préparation DNB : arithmétique, prise d'initiatives et nombres premiers"
export const dateDePublication = '14/04/2025'

/**
 * @Author Jean-Claude Lhote
 * Cet exerice exploite la nouvelle classe d'exercice que j'ai conçue pour les sujets de brevet
 * Il s'agit d'un exercice de type Brevet Aléatoirisé
 * La méthode privée appliquerLesValeurs permet de générer les valeurs aléatoires et de construire l'énoncé et la correction
 * La méthode versionOriginale permet de générer les valeurs de l'exercice telles qu'elles sont dans le sujet original
 * La méthode versionAleatoire permet de générer des valeurs aléatoires pour l'exercice
 */
export default class ExerciceCentresEtrangers262024 extends ExerciceBrevetA {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Sujet original', false]
    this.sup = false
    this.introduction = texteItalique(
      "D'après l'exercice 2 du brevet Centres étrangers Juin 2024.<br>",
    )

    this.versionAleatoire()
  }

  private appliquerLesValeurs(
    nbEx1: number,
    nbEx2: number,
    dureeEx1: number,
    dureeEx2: number,
    repos1: number,
    repos2: number,
    duree3: number,
    prenom1: string,
    prenom2: string,
  ): void {
    const duree1 = dureeEx1 * nbEx1 + repos1 * nbEx1
    const duree2 = dureeEx2 * nbEx2 + repos2 * nbEx2
    const ppcM = ppcm(duree1, duree2)
    this.enonce = `Un entraîneur de sport prépare deux circuits d'entraînement contenant plusieurs exercices de cardio et de renforcement musculaire :<br>
  ${createList({
    items: [
      "Un circuit commence à l'exercice 1 et se termine en revenant à l'exercice 1.",
      `Le circuit 1 contient ${nbEx1} exercices. Chaque exercice dure ${dureeEx1} secondes et doit être suivi de ${repos1} secondes de repos permettant de se rendre à l'exercice suivant.`,
      `Le circuit 2 contient ${nbEx2} exercices. Chaque exercice dure ${dureeEx2} secondes et doit être suivi de ${repos2} secondes de repos permettant de se rendre à l'exercice suivant.`,
    ],
    style: 'fleches',
  })}`
    const depArr = texteParPosition('Départ / Arrivée', 0, 10)
    const fleche = segment(point(0, 9.5), point(0, 8.5))
    fleche.styleExtremites = '->'
    const centrum = point(0, 3)
    const poly1 = rotation(
      polygoneRegulierParCentreEtRayon(centrum, 3.5, nbEx1),
      centrum,
      90,
    )
    const exos1 = poly1.listePoints.map((el, i) => cercle(el, 0.5))
    const textEx1 = poly1.listePoints.map((el, i) =>
      texteParPosition(`Ex ${i + 1}`, el.x * 1.4, (el.y - 3) * 1.4 + 3),
    )
    const poly2 = rotation(
      polygoneRegulierParCentreEtRayon(centrum, 3.5, nbEx2),
      centrum,
      90,
    )
    const exos2 = poly2.listePoints.map((el, i) => cercle(el, 0.5))
    const textEx2 = poly2.listePoints.map((el, i) =>
      texteParPosition(`Ex ${i + 1}`, el.x * 1.4, (el.y - 3) * 1.4 + 3),
    )
    const objets1 = [depArr, fleche, poly1, ...exos1, ...textEx1]
    const objets2 = [depArr, fleche, poly2, ...exos2, ...textEx2]
    const figure1 = mathalea2d(
      Object.assign(
        { pixelsParCm: 20, scale: 0.5, style: 'display: inline' },
        fixeBordures(objets1),
      ),
      objets1,
    )
    const figure2 = mathalea2d(
      Object.assign(
        { pixelsParCm: 20, scale: 0.5, style: 'display: inline' },
        fixeBordures(objets2),
      ),
      objets2,
    )
    this.enonce += `\n\n${deuxColonnesResp(figure1, figure2, { largeur1: 50, widthmincol1: '300px', widthmincol2: '300px' })}`
    const question1 = `Montrer que le circuit 1 s'effectue en $${duree1}$ secondes et que le circuit 2 s'effectue en $${duree2}$ secondes.`
    const correction1 = `Le circuit 1, c'est quand on enchaîne $${nbEx1}$ fois $${dureeEx1}$ secondes d'exercice et $${repos1}$ secondes de repos, soit $${nbEx1}$ fois  $${dureeEx1} + ${repos1}$ secondes.<br>
    On a donc bien besoin de : $${nbEx1} \\times ${dureeEx1 + repos1} = ${miseEnEvidence(texNombre(duree1, 0))}$ secondes pour effectuer le circuit 1.<br>
    Pour le circuit 2 : même principe, on enchaîne $${nbEx2}$ fois $${dureeEx2}$ secondes d'exercice et $${repos2}$ secondes de repos :<br>
    $${nbEx2} \\times (${dureeEx2} + ${repos2}) = ${nbEx2} \\times ${dureeEx2 + repos2} = ${duree2}$ secondes.<br>
    On a donc bien besoin de $${miseEnEvidence(texNombre(duree2, 0))}$ secondes pour effectuer le circuit 2.`
    const question2 = `Donner la décomposition en produit de facteurs premiers de $${duree1}$ et de $${duree2}$.`
    const correction2 = `$${duree1}=${decompositionFacteursPremiers(duree1)}$ soit $${miseEnEvidence(texFactorisation(duree1, true))}$<br>
    $${duree2}=${decompositionFacteursPremiers(duree2)}$ soit $${miseEnEvidence(texFactorisation(duree2, true))}$`
    const question3 = `Une séance d'entraînement est constituée de plusieurs tours du même circuit.<br>
    Au coup de sifflet de l'entraîneur, ${prenom1} commence une séance d'entraînement sur le circuit 1 et ${prenom2} sur le circuit 2.<br>
    ${createList({
      items: [
        `Expliquer pourquoi, lorsque $${texNombre(duree3, 0)}$ secondes se sont écoulées à partir du coup de sifflet, ${prenom1} se trouve de nouveau au départ du circuit 1.<br>
        Préciser où se trouve ${prenom2} sur le circuit 2 lorsque $${texNombre(duree3, 0)}$ secondes se sont écoulées.`,
        `Après le coup de sifflet, combien de temps faut-il à ${prenom1} et à ${prenom2} pour se retrouver en même temps pour la première fois au départ de leur circuit ? Exprimer cette durée en minutes et secondes.`,
      ],
      style: 'alpha',
    })}`
    const reste = duree3 % duree2
    const quotient = Math.floor(duree3 / duree2)
    const dureeEx2PlusRep2 = dureeEx2 + repos2
    const reste2 = reste % dureeEx2PlusRep2
    const quotient2 = Math.floor(reste / dureeEx2PlusRep2)

    const correction3aa = `Tout d'abord la division euclidienne de $${texNombre(duree3, 0)}$ par $${duree2}$ donne cette égalité : $${texNombre(duree3, 0)}=${duree2}\\times${quotient}+${reste}$.<br>
    Ensuite, pour passer d'un exercice du circuit 2 à l'autre, il faut : $${dureeEx2} + ${repos2}= ${dureeEx2PlusRep2}$ secondes.<br>
    Donc la division euclidienne de $${reste}$ par $${dureeEx2PlusRep2}$ donne cette égalité : $${reste}=${dureeEx2PlusRep2}\\times${quotient2}+${reste2}$.<br>
    Donc depuis le coup de sifflet, il s'est écoulé : $${texNombre(duree3, 0)}=${duree2}\\times${quotient}+${dureeEx2PlusRep2}\\times${quotient2}+${reste2}$ secondes.<br>
    ${prenom2} a donc effectué $${miseEnEvidence(quotient)}$ fois le circuit 2 complètement et ${quotient2 === 0 ? "n'a pas encore terminé le premier exercice." : `a fait ensuite $${miseEnEvidence(quotient2)}$ exercice${quotient2 > 1 ? 's' : ''} complètement avec le repos associé.`}<br>
    ${reste2 > dureeEx2 ? `Comme $${reste2}>${dureeEx2}$, ${prenom2} a fini l'exercice ${quotient2 + 1} et se dirige actuellement en se reposant vers l'exercice ${(quotient2 + 2) % nbEx2}` : reste2 === 0 ? `${prenom2} est alors au début de l'exercice ${quotient2 + 1} du circuit 2` : `Comme $${reste2} <${dureeEx2}$, ${prenom2} est donc à l'exercice ${quotient2 + 1} du circuit 2`}`
    const correction3a = `Lorsque $${texNombre(duree3, 0)}$ secondes se sont écoulées à partir du coup de sifflet, ${prenom1} se trouve de nouveau au départ du circuit 1 car $${duree3} = ${duree1}\\times${duree3 / duree1}$, donc comme $${duree3 / duree1}$ est un nombre entier, cela signifie que ${prenom1} a effectué $${duree3 / duree1}$ fois le circuit 1 complètement, et n'a pas encore commencé la $${duree3 / duree1 + 1}$e répétition : ${prenom1} est donc à nouveau au départ du circuit 1.<br>`
    const duree = new Hms({ second: ppcM }).normalize()

    const correction3b = `Pour que ${prenom1} et ${prenom2} se retrouvent en même temps au départ de leur circuit, il faut qu'il se soit écoulé une durée multiple de $${duree1}$ et de $${duree2}$.<br>
    Donc, il faut chercher le premier multiple commun entre $${duree1}$ et $${duree2}$.<br>
    En écrivant la liste des multiples de ces deux nombres, le premier multiple commun est $${texNombre(ppcM, 0)}$.<br>
    Nous pouvons aussi utiliser les décompositions en produit de facteurs premiers de $${duree1}$ et de $${duree2}$ pour trouver le PPCM.<br>
    Il suffit de prendre tous les facteurs présents dans les deux décomposition avec la puissance maximale rencontrée.<br>
    Soit : $${miseEnEvidence(`${texFactorisation(ppcM, true)}=${texNombre(ppcM, 0)}`)}$.<br>
    Nous avons : $${texNombre(ppcM, 0)}=60\\times${Math.floor(ppcM / 60)}${ppcM % 60 === 0 ? '' : `+${ppcM % 60}`}$.<br>
    Donc $${texNombre(ppcM, 0)}~\\text{s}=${miseEnEvidence(`${duree.minute}~\\text{min}${ppcM % 60 === 0 ? '' : `~${duree.second}~\\text{s}`}`)}$.<br>`
    const listeQuestions = createList({
      items: [question1, question2, question3],
      style: 'nombres',
    })
    this.enonce += `\n\n${listeQuestions}`
    this.correction = createList({
      items: [
        correction1,
        correction2,
        createList({
          items: [correction3a + correction3aa, correction3b],
          style: 'alpha',
        }),
      ],
      style: 'nombres',
    }).replaceAll('+0', '')
  }

  versionOriginale: () => void = () => {
    this.appliquerLesValeurs(5, 10, 40, 30, 16, 5, 2800, 'Camille', 'Dominique')
  }

  versionAleatoire: () => void = () => {
    let nbEx1: number
    let nbEx2: number
    let dureeEx1: number
    let dureeEx2: number
    let repos1: number
    let repos2: number
    let duree3: number
    let duree1: number
    let duree2: number
    let ppcM: number
    do {
      nbEx1 = choice([4, 6, 8])
      nbEx2 = choice([10, 12])
      dureeEx1 = randint(6, 10) * 5
      dureeEx2 = dureeEx1 - 10
      repos1 = randint(3, 5) * 4
      repos2 = randint(1, 3) * 5
      duree1 = dureeEx1 * nbEx1 + repos1 * nbEx1
      duree2 = dureeEx2 * nbEx2 + repos2 * nbEx2
      duree3 = duree1 * randint(1, 3) * 2
      ppcM = ppcm(duree1, duree2)
    } while (
      ppcM === duree1 ||
      ppcM === duree2 ||
      ppcM >= 3600 ||
      duree3 % duree2 === 0
    )
    const prenom1 = prenomF()
    const prenom2 = prenomM()

    this.appliquerLesValeurs(
      nbEx1,
      nbEx2,
      dureeEx1,
      dureeEx2,
      repos1,
      repos2,
      duree3,
      Array.isArray(prenom1) ? prenom1[0] : prenom1,
      Array.isArray(prenom2) ? prenom2[0] : prenom2,
    )
  }
}
