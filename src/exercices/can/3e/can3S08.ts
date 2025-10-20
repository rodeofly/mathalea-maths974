import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice, shuffle } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import { fraction } from '../../../modules/fractions'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Calculer une probabilité'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * @author Jean-Claude Lhote

 * Date de publication
*/
export const uuid = 'd86bf'

export const refs = {
  'fr-fr': ['can3S08', '3AutoP01-1'],
  'fr-ch': [],
}
export default class CalculsProbabilite3 extends ExerciceSimple {
  constructor() {
    super()
    this.formatChampTexte = KeyboardType.clavierDeBaseAvecFraction
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.versionQcmDisponible = true
  }

  nouvelleVersion() {
    let a: number, b: number
    const choix = choice([true, false])

    // On choisit le "scénario" global : a (noire/blanche, fraction) ou b (bleue/rouge, décimal)
    const scenario = choice(['a', 'a', 'b'])
    const formatDecimal = scenario === 'b'

    // Pour le scénario b, on peut avoir un total à 10 ou 100 (comme dans l'ancien code)
    let denom = 0
    if (!formatDecimal) {
      // scénario a : fraction classique avec a in [2,9], b in [5,15]
      a = randint(2, 9)
      b = randint(5, 15)
      denom = a + b
    } else {
      // scénario b : total 10 ou 100
      if (choice([true, false])) {
        a = randint(2, 9)
        b = 10 - a
      } else {
        a = randint(10, 80)
        b = 100 - a
      }
      denom = a + b
    }

    // Choix des couleurs selon le scénario pour garder l'ancienne formulation
    const situations = [
      {
        start: 'On tire une boule au hasard dans une urne',
        itemSing: 'boule',
        itemPlur: 'boules',
        lab1Sing: 'noire',
        lab1Plur: 'noires',
        lab2Sing: 'blanche',
        lab2Plur: 'blanches',
      },
      {
        start: 'On tire une carte au hasard dans un paquet',
        itemSing: 'carte',
        itemPlur: 'cartes',
        lab1Sing: 'rouge',
        lab1Plur: 'rouges',
        lab2Sing: 'verte',
        lab2Plur: 'vertes',
      },
      {
        start: 'On prend au hasard un bonbon dans un bocal',
        itemSing: 'bonbon',
        itemPlur: 'bonbons',
        lab1Sing: 'bleu',
        lab1Plur: 'bleus',
        lab2Sing: 'jaune',
        lab2Plur: 'jaunes',
      },
      {
        start: 'On choisit au hasard un ticket parmi',
        itemSing: 'ticket',
        itemPlur: 'tickets',
        lab1Sing: 'gagnant',
        lab1Plur: 'gagnants',
        lab2Sing: 'perdant',
        lab2Plur: 'perdants',
      },
      {
        start: 'On tire au sort une bille dans un sac',
        itemSing: 'bille',
        itemPlur: 'billes',
        lab1Sing: 'claire',
        lab1Plur: 'claires',
        lab2Sing: 'foncée',
        lab2Plur: 'foncées',
      },
    ]

    const situ = choice(situations)
    const label1Plur = situ.lab1Plur
    const label2Plur = situ.lab2Plur
    const label1Sing = situ.lab1Sing
    const label2Sing = situ.lab2Sing
    const itemSing = situ.itemSing

    const couleur1Plur = label1Plur
    const couleur2Plur = label2Plur
    const couleur1Sing = label1Sing
    const couleur2Sing = label2Sing
    const couleurDemandee = choix ? couleur1Sing : couleur2Sing

    // Construction de l'énoncé (utilise les formes plurielles pour la description des quantités)
    this.question = `${situ.start} contenant $${a}$ ${situ.itemPlur} ${couleur1Plur} et $${b}$ ${situ.itemPlur} ${couleur2Plur}.<br>

             Quelle est la probabilité d'obtenir ${choix ? 'une' : 'une'} ${couleurDemandee} ${itemSing} ? <br>

             ${formatDecimal ? 'On donnera le résultat sous forme décimale.' : "(résultat sous  forme d'une fraction irréductible)"}`
    this.optionsChampTexte = { texteApres: '' }

    // Correction commune + partie spécifique selon format
    const correctionCommun = `Dans une situation d'équiprobabilité,
        on calcule la probabilité d'un événement par le quotient :
        $\\dfrac{\\text{Nombre d'issues favorables}}{\\text{Nombre total d'issue}}$. <br>
        La probabilité est donc donnée par : <br>`
    if (!formatDecimal) {
      // fraction
      this.correction = `${correctionCommun}
        $\\dfrac{\\text{Nombre de boules ${couleurDemandee}s}}{\\text{Nombre total de boules}}
             =${choix ? fraction(a, denom).texFraction : fraction(b, denom).texFraction}  ${choix ? fraction(a, denom).texSimplificationAvecEtapes() : fraction(b, denom).texSimplificationAvecEtapes()}$`
      this.reponse = choix
        ? `$${fraction(a, denom).texFractionSimplifiee}$`
        : `$${fraction(b, denom).texFractionSimplifiee}$`
    } else {
      // décimal
      this.correction = `${correctionCommun}
        $\\dfrac{\\text{Nombre de boules ${couleurDemandee}s}}{\\text{Nombre total de boules}}
             =${choix ? fraction(a, denom).texFraction : fraction(b, denom).texFraction} =${choix ? texNombre(a / denom) : texNombre(b / denom)}$`
      this.reponse = choix ? a / denom : b / denom
    }

    // Version QCM : proposer des distracteurs plausibles
    if (this.versionQcm) {
      const numCorrect = choix ? a : b
      const correctTex = formatDecimal
        ? texNombre(numCorrect / denom)
        : fraction(numCorrect, denom).texFractionSimplifiee

      const candidates: string[] = []

      if (!formatDecimal) {
        // erreurs typiques en fraction
        candidates.push(fraction(numCorrect, denom).texFraction) // éventuelle écriture non réduite
        candidates.push(fraction(denom - numCorrect, denom).texFraction) // complémentaire 1-p (non réduite)
        candidates.push(
          fraction(denom - numCorrect, denom).texFractionSimplifiee,
        ) // complémentaire réduite
        // mauvaise lecture: inverser num/den
        candidates.push(fraction(denom, numCorrect).texFraction)
        // confusion avec la partie non demandée
        const otherNum = choix ? b : a
        candidates.push(fraction(otherNum, denom).texFraction)
      } else {
        // erreurs typiques en décimal
        candidates.push(texNombre(numCorrect / denom)) // écriture correcte (peut être identique)
        candidates.push(texNombre((denom - numCorrect) / denom)) // complémentaire 1-p
        candidates.push(texNombre(numCorrect, 0)) // oublier le dénominateur
        // erreurs d'arrondi ou confusion entre 10/100
        candidates.push(texNombre(Math.round((numCorrect / denom) * 100) / 100))
        candidates.push(texNombre(Math.round((denom / numCorrect) * 100) / 100))
      }

      // filtrer, dédupliquer et retirer la bonne réponse
      const uniq = Array.from(
        new Set(candidates.filter((s) => s && s !== correctTex)),
      )
      const picked = shuffle(uniq).slice(0, 3)
      // formatage pour QCM : mettre entre $...$
      this.distracteurs = picked.map((n) => `$${n}$`)
    }

    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
