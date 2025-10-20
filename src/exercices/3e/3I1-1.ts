import { point } from '../../lib/2d/points'
import { repere } from '../../lib/2d/reperes'
import { traceGraphiqueCartesien } from '../../lib/2d/diagrammes'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { texteParPosition } from '../../lib/2d/textes'
import { combinaisonListesSansChangerOrdre } from '../../lib/outils/arrayOutils'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'
import { lampeMessage } from '../../lib/format/message'
import { texteGras } from '../../lib/format/style'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'

export const titre = 'Conjecture de Syracuse'

/**
 * @class Syracuse
 * @classdesc Outils pour les suites de Syracuse
 * @author Sébastien Lozano (Olivier Mimeau Passage TS et Class)
 */

class Syracuse {
  N: number
  suiteDeSyracuse: number[]
  coordonneesSuiteDeSyracuse: any
  altitudeMaximale: number
  tempsDeVol: number
  tempsDeVolEnAltitude: number

  constructor(Num: number) {
    this.N = Num
    this.suiteDeSyracuse = this.fctSuiteDeSyracuse()
    this.coordonneesSuiteDeSyracuse = this.fctCoordonneesSuiteDeSyracuse(
      this.suiteDeSyracuse,
    )
    this.altitudeMaximale = this.fctAltitudeMaximale(this.suiteDeSyracuse)
    this.tempsDeVol = this.fctTempsDeVol(this.suiteDeSyracuse)
    this.tempsDeVolEnAltitude = this.fctTempsDeVolEnAltitude(
      this.suiteDeSyracuse,
    )
  }

  // Pour déterminer les éléments de la suite de Syracuse jusqu'au premier 1
  fctSuiteDeSyracuse(): number[] {
    let sortie = [this.N]
    let u = this.N
    if (this.N === 1) {
      sortie = [1, 4, 2, 1]
    } else {
      while (u !== 1) {
        if (u % 2 === 0) {
          u = u / 2
        } else {
          u = 3 * u + 1
        }
        sortie.push(u)
      }
    }
    return sortie
  }

  // Pour créer les coordonées à placer dans un graphique cartésien d'une suite de Syracuse
  fctCoordonneesSuiteDeSyracuse = function (suite: number[]) {
    const sortie = []
    for (let i = 0; i < suite.length; i++) {
      sortie.push([i, suite[i]])
    }
    return sortie
  }

  // Pour déterminer la valeur maximale de la suite jusqu'au premier 1
  fctAltitudeMaximale = function (suite: number[]) {
    return Math.max(...suite)
  }

  // Pour déterminer le nombre d'éléments de la suite de Syracuse jusqu'au premier 1
  // sans compter la valeur initiale
  fctTempsDeVol = function (suite: number[]) {
    return suite.length - 1
  }

  // Pour déterminer le nombre d'éléments de la suite de Syracuse jusqu'au premier 1
  // qui sont strictement supérieurs à la valeur initiale sans la compter !
  fctTempsDeVolEnAltitude = function (suite: number[]) {
    let compteur = 1
    while (suite[compteur] > suite[0]) {
      compteur += 1
    }
    return compteur - 1
  }
}

function syracuse(N = 1) {
  return new Syracuse(N)
}

export const uuid = '9ff49'

export const refs = {
  'fr-fr': ['3I1-1'],
  'fr-ch': [],
}
export default class ConjectureDeSyracuse extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 5
    this.nbQuestionsModifiable = false
    this.correctionDetailleeDisponible = true
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = [1, 2, 3, 4, 5] // tableau à compléter par valeurs possibles des types de questions
    const listeTypeDeQuestions = combinaisonListesSansChangerOrdre(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    let entier = randint(1, 200)
    let uneSuite = syracuse(entier)
    while (
      uneSuite.tempsDeVol > 25 ||
      uneSuite.tempsDeVol < 5 ||
      uneSuite.altitudeMaximale > 100
    ) {
      entier = randint(1, 200)
      uneSuite = syracuse(entier)
    }

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      // Petite intro connaissances
      let texte = ''
      let texteCorr = ''
      let stringIntro = `En mathématiques, on appelle conjecture une proposition qui n'est pas encore démontrée.
        On a éventuellement vérifié cette proposition sur beaucoup d'exemples mais cela ne garantit pas qu'elle soit toujours vraie.<br>
        Nous allons nous intéresser à la ${texteGras('conjecture de Syracuse')} découverte par le mathématicien allemand ${texteGras('Lothar Collatz')} en 1930
        à l'université de Syracuse.`
      if (context.isHtml) {
        stringIntro += '<br><br>'
      } else {
        stringIntro += '\\par\\vspace{0.5cm}'
      }
      stringIntro += `${texteGras('Algorithme de Syracuse :')}<br>`
      stringIntro += `
          On choisit un nombre entier strictement positif<br>
          $\\leadsto$ Si l'entier choisi est pair on le divise par 2.<br>
          $\\leadsto$ Si l'entier choisi est impair on le multiplie par 3 et on ajoute 1.<br>
          On recommence avec le nouvel entier trouvé tant qu'il ne vaut pas 1.<br>
        `

      stringIntro += `<br>${texteGras('Conjecture de Syracuse :')}<br>`
      stringIntro += `Encore appelée conjecture de ${texteGras('Collatz')}, conjecture ${texteGras("d'Ulam")},
        conjecture ${texteGras('tchèque')} ou ${texteGras('problème 3x + 1')}, est l'hypothèse mathématique selon laquelle
        la suite de Syracuse de n'importe quel entier strictement positif atteint 1.<br><br>
        En dépit de la simplicité de son énoncé, cette conjecture défie depuis de nombreuses années les mathématiciens.
        `

      this.introduction = lampeMessage({
        titre: 'Introduction',
        texte: stringIntro,
        couleur: 'nombres',
      })

      // Pour les objets de mathALEA2D
      const objetsCorrection = []
      const objetsCorrectionPlus = []
      let paramsCorrection = {}
      // On crée la liste de coordonnées de la suite de Syracuse
      const coordSyracuse = uneSuite.coordonneesSuiteDeSyracuse

      // Pour ajouter le graphique et le repère
      const yCoeff = 5
      const xCoeff = 2

      // Le repère
      const r2 = repere({
        axesEpaisseur: 2,
        grille: false,
        xMin: -1,
        yMin: -1,
        xMax: uneSuite.tempsDeVol + 1,
        yMax: uneSuite.altitudeMaximale + 5,
        yThickMin: 0,
        yThickDistance: 1 * yCoeff,
        yUnite: 1 / yCoeff,
        xUnite: 1 / xCoeff,
        xThickMin: 0,
        xThickDistance: 1 * xCoeff,
        xLegende: "Applications de l'algorithme",
        xLegendePosition: [(uneSuite.tempsDeVol + 2) / xCoeff, -1],
        yLegende: 'Altitude',
        yLegendePosition: [0.5, (uneSuite.altitudeMaximale + 7) / yCoeff],
      })

      // Le graphique cartésien
      const g = traceGraphiqueCartesien(coordSyracuse, r2, {})

      // On pousse tout ça dans les objets, le repère aussi coño !!!
      objetsCorrection.push(r2, g)

      const A = point(0, uneSuite.suiteDeSyracuse[0] / yCoeff)
      const B = point(
        uneSuite.tempsDeVol / xCoeff,
        uneSuite.suiteDeSyracuse[0] / yCoeff,
      )
      const s = segment(A, B, 'red')
      // let t = texteParPoint('mon texte',B);
      const t = texteParPosition(
        'Altitude initiale',
        uneSuite.tempsDeVol / xCoeff,
        uneSuite.suiteDeSyracuse[0] / yCoeff + 0.2,
        0,
        'red',
        1,
        'milieu',
        true,
      )

      objetsCorrectionPlus.push(r2, g, s, t)

      // On fixe la fenetre pour le SVG/Tikz
      paramsCorrection = {
        xmin: -2,
        ymin: -2,
        xmax: (uneSuite.tempsDeVol + 20) / xCoeff,
        ymax: (uneSuite.altitudeMaximale + 10) / yCoeff,
        pixelsParCm: 30,
        // scale: 0.7,
        //       optionsTikz: [`xscale=${18 / (uneSuite.tempsDeVol + 20) / xCoeff}`, `yscale=${7 / ((uneSuite.altitudeMaximale + 10) / yCoeff)}`],
        mainlevee: false,
      }

      const stringConnaissance = {
        cas1: {
          titre: 'Cycle trivial',
          texte: `Après que le nombre 1 a été atteint, la suite des valeurs (4,2,1) se répète indéfiniment.
            C'est pourquoi on ne s'intéresse qu'à la liste des entiers jusqu'au premier 1.`,
        },
        cas2: {
          titre: `Vol de la suite de Syracuse ${entier}`,
          texte: `Les graphiques font penser à la chute chaotique d'un grêlon ou bien à la trajectoire d'une feuille emportée par le vent.
            Sur le graphique ci-dessous, on peut observer le vol de la suite de Syracuse ${entier}.`,
        },
        cas3: {
          titre: `Altitude maximale de la suite de Syracuse ${entier}`,
          texte:
            "Si on file la métaphore, la valeur maximale atteinte par les valeurs trouvées serait désignée par l'altitude maximale du vol. ",
        },
        cas4: {
          titre: `Temps de vol de la suite de Syracuse ${entier}`,
          texte:
            "C'est le plus petit nombre de fois qu'il faut appliquer l'algorithme pour atteindre la valeur 1 pour la première fois.",
        },
        cas5: {
          titre: `Temps de vol en altitude de la suite de Syracuse ${entier}`,
          texte: `C'est le plus petit nombre de fois qu'il faut appliquer l'algorithme avant que la valeur suivante soit strictement inférieure
            à la valeur initiale. ${texteGras('Attention')} cela ne signifie pas que l'on ne repassera jamais au dessus de la valeur initiale.
            `,
        },
      }

      switch (
        listeTypeDeQuestions[i] // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
      ) {
        case 1: // étude du cas N = 1
          texte =
            'On choisit le nombre entier 1. Quels sont tous les entiers déterminés par cet algorithme ?'
          texteCorr = `Si on choisit le nombre 1 au départ la suite de Syracuse est : ${texteGras(ecritListe(syracuse().suiteDeSyracuse))}.<br><br>`
          texteCorr +=
            texteEnCouleurEtGras(
              'Remarque - ' + stringConnaissance.cas1.titre,
            ) +
            ' : ' +
            stringConnaissance.cas1.texte
          break
        case 2: // suite de Syracuse pour un entier aléatoire
          texte = `Déterminer tous les entiers issus de cet algorithme lorsqu'on choisit ${entier}.`
          texteCorr = `La suite de Syracuse du nombre ${entier} est : <br>
            ${texteGras(ecritListe(uneSuite.suiteDeSyracuse))}.<br><br>`
          texteCorr +=
            texteEnCouleurEtGras(
              'Remarque - ' + stringConnaissance.cas2.titre,
            ) +
            ' : ' +
            stringConnaissance.cas2.texte +
            '<br><br>'

          if (this.correctionDetaillee) {
            texteCorr += mathalea2d(paramsCorrection, objetsCorrection)
          }
          break
        case 3: // altitude max
          texte = "Quelle est la valeur maximale de cette liste d'entiers ?"
          texteCorr = `La valeur maximale atteinte vaut : ${texteGras(uneSuite.altitudeMaximale)}<br><br>`
          texteCorr +=
            texteEnCouleurEtGras(
              'Remarque - ' + stringConnaissance.cas3.titre,
            ) +
            ' : ' +
            stringConnaissance.cas3.texte
          break
        case 4: // temps de vol
          texte =
            "Combien de fois au minimum faut-il appliquer l'algorithme pour trouver la valeur 1 ?"
          texteCorr = `Il faut  appliquer au minimum ${texteGras(uneSuite.tempsDeVol)} fois l'algorithme pour trouver la valeur 1.<br><br>`
          texteCorr +=
            texteEnCouleurEtGras(
              'Remarque - ' + stringConnaissance.cas4.titre,
            ) +
            ' : ' +
            stringConnaissance.cas4.texte
          break
        case 5: // temps de vol en altitude
          texte =
            "Au bout de combien d'application minimum de l'algorithme la valeur calculée suivante sera-t-elle strictement inférieure à la valeur initiale ?"
          // `Quelle est le nombre d'éléments de cette liste d'entiers qui sont strictement supérieurs à la valeur initiale, sans compter cette valeur initiale ?`;
          if (uneSuite.tempsDeVolEnAltitude === 0) {
            texteCorr =
              "Dès la première application de l'algorithme la valer trouvée est inférieure à la valeur initiale."
          } else {
            texteCorr = `Il faut appliquer au minimum ${texteGras(uneSuite.tempsDeVolEnAltitude)} fois l'algorithme pour que la valeur calculée suivante soit strictement inférieure à la valeur initiale.`
          }
          texteCorr += '<br><br>'
          // texteCorr += `${syracuse({N:entier}).tempsDeVolEnAltitude}<br><br>`;
          texteCorr +=
            texteEnCouleurEtGras(
              'Remarque - ' + stringConnaissance.cas5.titre,
            ) +
            ' : ' +
            stringConnaissance.cas5.texte +
            '<br><br>'

          if (this.correctionDetaillee) {
            texteCorr += mathalea2d(paramsCorrection, objetsCorrectionPlus)
          }
          break
      }

      //      if (this.listeQuestions.indexOf(texte) === -1) {
      if (this.questionJamaisPosee(i, entier, listeTypeDeQuestions[i])) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}

function ecritListe(liste: number[]): string {
  let sortie = ''
  for (let i = 0; i < liste.length; i++) {
    if (i === liste.length - 1) {
      sortie += liste[i]
    } else {
      sortie += liste[i] + ', '
    }
  }
  return sortie
} // fin de la fonction ecritListe
