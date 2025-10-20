import { point } from '../../lib/2d/points'
import { createList } from '../../lib/format/lists'
import { shuffle } from '../../lib/outils/arrayOutils'
import { texteGras, texteItalique } from '../../lib/outils/embellissements'
import { texNombre, texPrix } from '../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { randint } from '../../modules/outils'
import ExerciceBrevetA from '../ExerciceBrevetA'
import { latex2d, texteParPosition } from '../../lib/2d/textes'
import { premierMultipleSuperieur } from '../../lib/outils/primalite'
import { nombreEnLettres } from '../../modules/nombreEnLettres'
import { droite } from '../../lib/2d/droites'
import RepereBuilder from '../../lib/2d/RepereBuilder'
import { lettreMinusculeDepuisChiffre } from '../../lib/outils/outilString'
import { lectureAntecedent } from '../../lib/2d/courbes'

export const uuid = 'fb6ad'
export const refs = {
  'fr-fr': ['3Z1DNB-12'],
  'fr-ch': ['11FA8-22', '1mF1-15'],
}
export const titre = 'Préparation DNB : Fonctions affines, lecture graphique'
export const dateDePublication = '12/04/2025'

/**
 * @Author Jean-Claude Lhote
 * Cet exerice exploite la nouvelle classe d'exercice que j'ai conçue pour les sujets de brevet
 * Il s'agit d'un exercice de type Brevet Aléatoirisé
 * La méthode privée appliquerLesValeurs permet de générer les valeurs aléatoires et de construire l'énoncé et la correction
 * La méthode versionOriginale permet de générer les valeurs de l'exercice telles qu'elles sont dans le sujet original
 * La méthode versionAleatoire permet de générer des valeurs aléatoires pour l'exercice
 */
export default class ExerciceAmeriqueNord392024 extends ExerciceBrevetA {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Sujet original', false]
    this.sup = false
    this.introduction = texteItalique(
      "D'après l'exercice 3 du brevet Amérique du Nord 2024.<br>",
    )

    this.versionAleatoire()
  }

  private appliquerLesValeurs(
    classique: number,
    essentielAbo: number,
    essentielUnitaire: number,
    liberteAbo: number,
    nbClassique: number,
    nbEssentiel: number,
    prixEssentiel: number,
    budgetMax: number,
  ): void {
    const f2 = (x: number) => essentielAbo + essentielUnitaire * x
    const yMax = liberteAbo + 30
    const yMin = 0
    const xMin = 0
    const xMax = Math.round((liberteAbo - essentielAbo) / essentielUnitaire) + 5
    const pointF2D =
      f2(xMax) < yMax
        ? point(xMax, f2(xMax) / 10)
        : point((yMax - essentielAbo) / essentielUnitaire, yMax / 10)
    const pointF2G = point(0, essentielAbo / 10)
    const pointF3G = point(0, liberteAbo / 10)
    const pointF3D = point(xMax, liberteAbo / 10)
    const pointF1G = point(0, 0)
    const pointF1D = point(yMax / classique, yMax / 10)
    const d1 = droite(pointF1G, pointF1D, '', 'red')
    const d2 = droite(pointF2G, pointF2D, '', 'green')
    const d3 = droite(pointF3G, pointF3D, '', 'blue')
    const n1 = latex2d('(d_1)', pointF1D.x - 1, pointF1D.y + 0.4, {
      color: 'red',
    })
    const n2 = latex2d('(d_2)', pointF2D.x - 1, pointF2D.y + 0.4, {
      color: 'green',
    })
    const n3 = latex2d('(d_3)', pointF3D.x, pointF3D.y - 0.5, { color: 'blue' })
    const legendY = texteParPosition('Prix à payer en €', 4.5, yMax / 10)
    const legendX = texteParPosition("Nombre d'entrees", xMax - 2, 1)

    const rep = new RepereBuilder({ xMin, xMax, yMin, yMax })
      .setGrille({ grilleX: { dx: 5 }, grilleY: { dy: 50 } })
      .setGrilleSecondaire({ grilleX: { dx: 1 }, grilleY: { dy: 1 } })
      .setLabelX({ dx: 5 })
      .setLabelY({ dy: 50 })
      .setUniteX(1)
      .setUniteY(0.1)
      .setThickX({ xMin, xMax, dx: 5 })
      .setThickY({ yMin, yMax, dy: 50 })

    rep.yLabelEcart = 1
    rep.xLabelEcart = 1
    const objets = [rep.buildCustom(), d1, d2, d3, n1, n2, n3, legendY, legendX]
    const figure = mathalea2d(
      Object.assign({ pixelsParCm: 15, scale: 0.35 }, fixeBordures(objets)),
      objets,
    )
    const lectureA = lectureAntecedent(
      (prixEssentiel - essentielAbo) / essentielUnitaire,
      prixEssentiel / 10,
      1,
      1,
      'purple',
      prixEssentiel % 50 === 0 ? '' : String(prixEssentiel),
      '',
    )
    const libInt = (liberteAbo - essentielAbo) / essentielUnitaire
    const entreeMax =
      Math.floor(budgetMax / classique) >
      Math.floor((budgetMax - essentielAbo) / essentielUnitaire)
        ? [budgetMax / classique, 'Classique']
        : [(budgetMax - essentielAbo) / essentielUnitaire, 'Essentiel']
    const lectureC = lectureAntecedent(
      Number(entreeMax[0]),
      budgetMax / 10,
      1,
      1,
      'orange',
      budgetMax % 50 === 0 ? '' : String(budgetMax),
      '',
    )
    const lectureB = lectureAntecedent(
      libInt,
      liberteAbo / 10,
      1,
      1,
      'pink',
      liberteAbo % 50 === 0 ? '' : String(liberteAbo),
      '',
    )
    const objets2 = [...objets, lectureA, lectureB, lectureC]
    const figureCorr = mathalea2d(
      Object.assign({ pixelsParCm: 15, scale: 0.35 }, fixeBordures(objets2)),
      objets2,
    )
    const fonctions = shuffle([
      { name: 'Classique', expr: `x \\longmapsto ${texPrix(classique)} x` },
      {
        name: 'Essentiel',
        expr: `x \\longmapsto ${texPrix(essentielAbo)} + ${texPrix(essentielUnitaire)}x`,
      },
      { name: 'Liberté', expr: `x \\longmapsto ${texPrix(liberteAbo)}` },
    ])
    this.enonce = `Un cinéma propose trois tarifs :<br>
  ${texteGras('Tarif "Classique"')} : La personne paye chaque entrée $${texPrix(classique)}$€.<br>
  ${texteGras('Tarif "Essentiel"')} : La personne paye un abonnement annuel de $${texPrix(essentielAbo)}$€ puis chaque entrée coûte $${texPrix(essentielUnitaire)}$€.<br>
  ${texteGras('Tarif "Liberté"')} : La personne paye un abonnement annuel de $${liberteAbo}$€ avec un nombre d'entrées illimité.<br>`
    const question1 = `Avec le tarif "Classique", une personne souhaite acheter ${nombreEnLettres(nbClassique)} entrées au cinéma.<br>Combien va-t-elle payer ?`
    const correction1 = `Au tarif "Classique", ${nombreEnLettres(nbClassique)} entrées coûtent : $${nbClassique}\\times ${texPrix(classique)}=${texPrix(nbClassique * classique)}$€.`
    const question2 = `Avec le tarif "Essentiel", une personne souhaite aller ${nombreEnLettres(nbEssentiel)} fois au cinéma.<br>Montrer qu'elle va payer $${texPrix(essentielAbo + nbEssentiel * essentielUnitaire)}$€.`
    const correction2 = `Avec Le tarif "Essentiel", ${nombreEnLettres(nbEssentiel)} entrées coûtent : $${nbEssentiel}\\times ${texPrix(essentielUnitaire)}+${texPrix(essentielAbo)}=${texPrix(nbEssentiel * essentielUnitaire)}+${texPrix(essentielAbo)}=${texPrix(f2(nbEssentiel))}$€.`
    const question3 = `Dans la suite, $x$ désigne le nombre d'entrées au cinéma.<br>
On considère les trois fonctions $f, g$ et $h$ suivantes :<br>
$f: ${fonctions[0].expr} \\quad g: ${fonctions[1].expr} \\quad h: ${fonctions[2].expr}$<br>
Associer, sans justifier, chacune de ces fonctions au tarif correspondant.<br>
Le graphique ci-dessous représente le prix à payer en fonction du nombre d'entrées pour chacun de ces trois tarifs.<br>
${figure}
La droite ($d_{1}$) représente la fonction correspondant au tarif "Classique".<br>
La droite ($d_{2}$) représente la fonction correspondant au tarif "Essentiel".<br>
La droite ($d_{3}$) représente la fonction correspondant au tarif "Liberté".<br>`
    const correction3 = `$f: ${fonctions[0].expr} \\quad g: ${fonctions[1].expr} \\quad h: ${fonctions[2].expr}$<br>
$f$ correspond au tarif "${fonctions[0].name}".<br>
$g$ correspond au tarif "${fonctions[1].name}".<br>
$h$ correspond au tarif "${fonctions[2].name}".<br>`
    const question5a = `Avec $${texPrix(prixEssentiel)}$€, combien peut-on acheter d'entrées au maximum avec le tarif "Essentiel" ?`
    const xA = (prixEssentiel - essentielAbo) / essentielUnitaire
    const correction5a = `Avec $${texPrix(prixEssentiel)}$€, Il peut acheter $${Math.floor(xA)}$ entrées.<br>
    La droite horizontale d'équation $y=${prixEssentiel}$ coupe la droite $d_2$ au point d'abscisse $${texNombre(xA, 1)}$.`
    const xB = (liberteAbo - essentielAbo) / essentielUnitaire
    const correction5b = `La droite horizontale d'équation $y=${liberteAbo}$ coupe la droite $d_2$ au point d'abscisse $${texNombre(xB, 1)}$.<br>
    À partir de $${Math.ceil(xB)}$ entrées, le tarif "liberté" devient plus intéressant.`
    const question5b =
      'À partir de combien d\'entrées, le tarif "Liberté" devient-il le tarif le plus intéressant ?'

    const question5c = `Si on décide de ne pas dépasser un budget de $${texPrix(budgetMax)}$€, quel est le tarif qui permet d'acheter le plus grand nombre d'entrées ?`
    const correction5c = `La droite horizontale d'équation $y=${budgetMax}$ coupe en dernier ${entreeMax[1] === 'Classique' ? 'la droite $(d_1)$' : 'la droite $(d_2)$'} au point d'abscisse $${texNombre(Number(entreeMax[0]), 1)}$.<br>
    Pour $${budgetMax}$€, c'est le tarif ${entreeMax[1]} qui donne le plus d'entrées.`
    const listeQuestions5 = createList({
      items: [question5a, question5b, question5c],
      style: 'alpha',
    })
    const correction5 = createList({
      items: [correction5a, correction5b, correction5c],
      style: 'alpha',
    })
    const question4 =
      "Quel tarif propose un prix proportionnel au nombre d'entrées ?"
    const fClass = fonctions.findIndex(
      (el) => el.expr === `x \\longmapsto ${texPrix(classique)} x`,
    )
    const correction4 = `C'est le tarif "Classique" qui propose un prix proportionnel au nombre d'entrées (la fonction $${lettreMinusculeDepuisChiffre(fClass + 6)}$ est linéaire).<br>
    ${figureCorr}`
    const question5 = `Pour les questions suivantes, aucune justification n'est attendue.<br>
    ${listeQuestions5}`
    const listeQuestions = createList({
      items: [question1, question2, question3, question4, question5],
      style: 'nombres',
    })
    this.enonce += listeQuestions
    const listeCorrections = createList({
      items: [correction1, correction2, correction3, correction4, correction5],
      style: 'nombres',
    })
    this.correction = listeCorrections
  }

  versionOriginale: () => void = () => {
    this.appliquerLesValeurs(11, 50, 5, 240, 3, 8, 150, 200)
  }

  versionAleatoire: () => void = () => {
    let classique: number
    let essentielUnitaire: number
    let essentielAbo: number
    let liberteAbo: number
    do {
      classique = (5 * randint(16, 23)) / 10
      essentielUnitaire = randint(
        Math.floor(classique * 0.5),
        Math.floor(classique * 0.8),
      )
      essentielAbo = (classique - essentielUnitaire) * randint(7, 12)
      liberteAbo = premierMultipleSuperieur(
        10,
        30 * essentielUnitaire + essentielAbo,
      )
    } while (essentielAbo < 30 || !Number.isInteger(essentielAbo))
    const nbClassique = randint(3, 6)
    const nbEssentiel = randint(8, 11)
    const prixEssentiel = premierMultipleSuperieur(
      10,
      randint(20, 30) * essentielUnitaire + essentielAbo,
    )
    const budgetMax =
      randint(Math.floor(liberteAbo / 20), liberteAbo / 10 - 2) * 10

    this.appliquerLesValeurs(
      classique,
      essentielAbo,
      essentielUnitaire,
      liberteAbo,
      nbClassique,
      nbEssentiel,
      prixEssentiel,
      budgetMax,
    )
  }
}
