import Exercice from '../Exercice'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import { texNombre } from '../../lib/outils/texNombre'
import { Arbre } from '../../modules/arbres'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { createList } from '../../lib/format/lists'
import { nombreEnLettres } from '../../modules/nombreEnLettres'
import { prenomM } from '../../lib/outils/Personne'
import { miseEnEvidence } from '../../lib/outils/embellissements'
export const titre = 'Résoudre des problèmes avec des probabilités (E3C)'
export const dateDePublication = '29/04/2025'

/**
 *
 * @author Gilles Mora
 */
export const uuid = '0e166'

export const refs = {
  'fr-fr': ['1P10-5'],
  'fr-ch': ['3mP1-6'],
}
export default class ProlemesE3CProbabiltesCond extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
    this.sup = 8
    this.spacing = 1.5
    this.spacingCorr = 1.5
    this.besoinFormulaireTexte = [
      'Type de questions',
      [
        'Nombres séparés par des tirets  :',
        '1 : Maladie/Vaccin',
        '2 : Sandwich/dessert',
        '3 : Jeu de fléchettes',
        '4 : Vacances au camping',
        "5 : L'agence de voyage",
        '6 : Le salon de coiffure',
        '7 : Le portique de sécurité',
        '8 : Mélange',
      ].join('\n'),
    ]
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 8,
      melange: 8,
      defaut: 8,
      nbQuestions: this.nbQuestions,
    })
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0,
        texte,
        texteCorr,
        cpt = 0,
        P,
        a,
        pA,
        pB,
        pBb,
        u1,
        u2,
        omega,
        omegaC,
        omega3,
        pAsachantB,
        pAbsachantB,
        pAsachantBb,
        pBsachantA,
        pAbinterBb,
        pAbinterB,
        pAinterBb,
        pAinterB,
        pBsachantAb,
        pAb,
        pBbsachantA,
        pBbsachantAb,
        objets,
        objetsC,
        objets3,
        listeEV,
        ev,
        textePAbinterB,
        textePAbinterBb,
        textePAinterBb,
        textePAsachantB,
        texteProbaTotaleB,
        textePAbsachantB,
        textePAsachantBb,
        textePAinterB;
      i < this.nbQuestions && cpt < 50;

    ) {
      listeEV =
        listeTypeDeQuestions[i] === 1
          ? [
              ['M', 'T'],
              ['A', 'S'],
              ['M', 'S'],
              ['A', 'T'],
            ]
          : listeTypeDeQuestions[i] === 2
            ? [
                ['S', 'D'],
                ['S', 'R'],
                ['A', 'T'],
                ['K', 'L'],
              ]
            : listeTypeDeQuestions[i] === 3
              ? [
                  ['C', 'G'],
                  ['F', 'G'],
                  ['E', 'G'],
                ]
              : listeTypeDeQuestions[i] === 4
                ? [
                    ['F', 'A'],
                    ['L', 'A'],
                    ['F', 'C'],
                  ]
                : listeTypeDeQuestions[i] === 5
                  ? [
                      ['A', 'V'],
                      ['A', 'G'],
                      ['I', 'G'],
                    ]
                  : listeTypeDeQuestions[i] === 6
                    ? [
                        ['C', 'E'],
                        ['C', 'F'],
                        ['S', 'E'],
                      ]
                    : listeTypeDeQuestions[i] === 7
                      ? [
                          ['M', 'S'],
                          ['T', 'S'],
                          ['L', 'S'],
                        ]
                      : [
                          ['C', 'G'],
                          ['F', 'G'],
                          ['E', 'G'],
                        ]
      ev = choice(listeEV)
      P = prenomM()
      u1 = randint(3, 7)
      u2 = randint(1, 9, u1)
      a = randint(1, 8)
      pA =
        listeTypeDeQuestions[i] === 1
          ? randint(3, 9) / 1000
          : listeTypeDeQuestions[i] === 2
            ? randint(60, 85) / 100
            : listeTypeDeQuestions[i] === 3
              ? randint(20, 40) / 100
              : listeTypeDeQuestions[i] === 4
                ? randint(51, 65) / 100
                : listeTypeDeQuestions[i] === 5
                  ? randint(2, 4) / 10
                  : listeTypeDeQuestions[i] === 6
                    ? randint(2, 4) / 10
                    : listeTypeDeQuestions[i] === 7
                      ? a / 500
                      : randint(2, 4) / 10
      pAb = 1 - pA
      pBsachantA =
        listeTypeDeQuestions[i] === 1
          ? randint(91, 95) / 100
          : listeTypeDeQuestions[i] === 2
            ? randint(20, 35) / 100
            : listeTypeDeQuestions[i] === 3
              ? u1 / 10
              : listeTypeDeQuestions[i] === 4
                ? randint(36, 45) / 100
                : listeTypeDeQuestions[i] === 5
                  ? randint(36, 45) / 100
                  : listeTypeDeQuestions[i] === 6
                    ? randint(40, 60) / 100
                    : listeTypeDeQuestions[i] === 7
                      ? randint(95, 99) / 100
                      : randint(2, 4) / 10
      pBbsachantA = 1 - pBsachantA
      pBsachantAb =
        listeTypeDeQuestions[i] === 1
          ? randint(1, 4) / 100
          : listeTypeDeQuestions[i] === 2
            ? randint(52, 65) / 100
            : listeTypeDeQuestions[i] === 3
              ? u2 / 10
              : listeTypeDeQuestions[i] === 4
                ? randint(25, 35) / 100
                : listeTypeDeQuestions[i] === 5
                  ? randint(60, 70) / 100
                  : listeTypeDeQuestions[i] === 6
                    ? randint(23, 45) / 100
                    : listeTypeDeQuestions[i] === 7
                      ? randint(6, 10) / 100
                      : randint(2, 4) / 10
      pBbsachantAb = 1 - pBsachantAb
      pAinterB = pA * pBsachantA
      pAinterBb = pA * pBbsachantA
      pAbinterB = pAb * pBsachantAb
      pAbinterBb = pAb * pBbsachantAb
      pB = pAinterB + pAbinterB
      pBb = pAinterBb + pAbinterBb
      pAsachantB = pAinterB / pB
      pAsachantBb = pAinterBb / pBb
      pAbsachantB = pAbinterB / pB
      // pAbsachantBb = pAbinterBb / pBb
      texteProbaTotaleB = `$${ev[0]}$ et $\\overline{${ev[0]}}$ forment une partition de l'univers. Donc, d'après la formule des probabilités totales  : <br>
                $\\begin{aligned}
                P(${ev[1]})&=P(${ev[0]}\\cap ${ev[1]})+P(\\overline{${ev[0]}}\\cap ${ev[1]})\\\\
                &=P(${ev[0]})\\times P_{${ev[0]}}(${ev[1]})+P(\\overline{${ev[0]}})\\times P_{\\overline{${ev[0]}}}(${ev[1]})\\\\
                &=${texNombre(pA, 5)}\\times ${texNombre(pBsachantA, 5)}+${texNombre(pAb, 5)}\\times ${texNombre(pBsachantAb, 5)}\\\\
                &=${miseEnEvidence(`${texNombre(pB, 5)}`)}
                \\end{aligned}$<br>`
      textePAinterB = `
                $\\begin{aligned}
              P(${ev[0]}\\cap ${ev[1]})&=P(${ev[0]})\\times P_{${ev[0]}}(${ev[1]})\\\\
              &=${texNombre(pA, 4)}\\times ${texNombre(pBsachantA, 4)}\\\\
              &=${miseEnEvidence(`${texNombre(pAinterB, 5)}`)}
              \\end{aligned}$<br>`
      textePAbinterB = `
              $\\begin{aligned}
            P(\\overline{${ev[0]}}\\cap ${ev[1]})&=P(\\overline{${ev[0]}})\\times P_{\\overline{${ev[0]}}}(${ev[1]})\\\\
            &=${texNombre(pAb, 4)}\\times ${texNombre(pBsachantAb, 4)}\\\\
            &=${miseEnEvidence(`${texNombre(pAbinterB, 5)}`)}
            \\end{aligned}$<br>`
      textePAbinterBb = `
            $\\begin{aligned}
          P(\\overline{${ev[0]}}\\cap \\overline{${ev[1]}})&=P(\\overline{${ev[0]}})\\times P_{\\overline{${ev[0]}}}(\\overline{${ev[1]}})\\\\
          &=${texNombre(pAb, 4)}\\times ${texNombre(pBbsachantAb, 4)}\\\\
          &=${miseEnEvidence(`${texNombre(pAbinterBb, 5)}`)}
          \\end{aligned}$<br>`

      textePAinterBb = `
              $\\begin{aligned}
            P(${ev[0]}\\cap \\overline{${ev[1]}})&=P(${ev[0]})\\times P_{${ev[0]}}(\\overline{${ev[1]}})\\\\
            &=${texNombre(pA, 4)}\\times ${texNombre(pBbsachantA, 4)}\\\\
            &=${miseEnEvidence(`${texNombre(pAinterBb, 5)}`)}
            \\end{aligned}$<br>`

      // texteProbaTotaleBb = `$${ev[0]}$ et $\\overline{${ev[0]}}$ forment une partition de l'univers, d'après la formule des probabilités totales  : <br>
      //    $\\begin{aligned}
      //    P(\\overline{${ev[1]}})&=P(${ev[0]}\\cap \\overline{${ev[1]}})+P(\\overline{${ev[0]}}\\cap \\overline{${ev[1]}})\\\\
      //    &=P(${ev[0]})\\times P_{${ev[0]}}(\\overline{${ev[1]}})+P(\\overline{${ev[0]}})\\times P_{\\overline{${ev[0]}}}(\\overline{${ev[1]}})\\\\
      //  &=${texNombre(pA, 5)}\\times ${texNombre(pBbsachantA, 5)}+${texNombre(pAb, 5)}\\times ${texNombre(pBbsachantAb, 5)}\\\\
      //  &=${texNombre(pBb, 5)}
      //    \\end{aligned}$<br>`
      textePAbsachantB = `
               $\\begin{aligned}
              P_${ev[1]}\\left(\\overline{${ev[0]}}\\right)&=\\dfrac{P(\\overline{${ev[0]}}\\cap ${ev[1]})}{P(${ev[1]})}\\\\
              &=\\dfrac{${texNombre(pAb, 5)}\\times ${texNombre(pBsachantAb, 5)}}{${texNombre(pB, 5)}}\\\\
              &=\\dfrac{${texNombre(pAbinterB, 5)}}{${texNombre(pB, 5)}}\\\\
              &\\approx ${this.sup === 1 ? `${miseEnEvidence(`${texNombre(pAbsachantB, 3, true)}`)}` : this.sup === 2 ? `${miseEnEvidence(`${texNombre(pAbsachantB, 2, true)}`)}` : `${miseEnEvidence(`${texNombre(pAbsachantB, 3)}`)}`}
              \\end{aligned}$<br>`
      textePAsachantB = `
               $\\begin{aligned}
              P_${ev[1]}\\left(${ev[0]}\\right)&=\\dfrac{P(${ev[0]}\\cap ${ev[1]})}{P(${ev[1]})}\\\\
              &=\\dfrac{${texNombre(pA, 5)}\\times ${texNombre(pBsachantA, 5)}}{${texNombre(pB, 5)}}\\\\
              &=\\dfrac{${texNombre(pAinterB, 5)}}{${texNombre(pB, 5)}}\\\\
              &\\approx  ${this.sup === 4 ? ` ${miseEnEvidence(`${texNombre(pAsachantB, 2, true)}`)}` : `${miseEnEvidence(`${texNombre(pAsachantB, 3, true)}`)}`}
              \\end{aligned}$<br>`
      textePAsachantBb = `
               $\\begin{aligned}
              P_{\\overline{${ev[1]}}}\\left(${ev[0]}\\right)&=\\dfrac{P(${ev[0]}\\cap \\overline{${ev[1]}})}{P(\\overline{${ev[1]}})}\\\\
              &=\\dfrac{${texNombre(pA, 5)}\\times ${texNombre(pBbsachantA, 5)}}{1-${texNombre(pB, 5)}}\\\\
              &=\\dfrac{${texNombre(pAinterBb, 5)}}{${texNombre(pBb, 5)}}\\\\
              &\\approx  ${miseEnEvidence(`${texNombre(pAsachantBb, 2, true)}`)}
              \\end{aligned}$<br>`
      // On définit l'arbre complet
      omegaC = new Arbre({
        racine: true,
        nom: '',
        proba: 1,
        visible: false,
        alter: '',
        enfants: [
          new Arbre({
            rationnel: false,
            nom: `${ev[0]}`,
            proba: pA,
            enfants: [
              new Arbre({
                rationnel: false,
                nom: `${ev[1]}`,
                proba: pBsachantA,
              }),
              new Arbre({
                rationnel: false,
                nom: `\\overline{${ev[1]}}`,
                proba: pBbsachantA,
              }),
            ],
          }),
          new Arbre({
            rationnel: false,
            nom: `\\overline{${ev[0]}}`,
            proba: pAb,
            enfants: [
              new Arbre({
                rationnel: false,
                nom: `${ev[1]}`,
                proba: pBsachantAb,
              }),
              new Arbre({
                rationnel: false,
                nom: `\\overline{${ev[1]}}`,
                proba: pBbsachantAb,
              }),
            ],
          }),
        ],
      })

      omegaC.setTailles() // On calcule les tailles des arbres.
      objetsC = omegaC.represente(0, 9, 0, 2, true, 1, 2) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite

      omega = new Arbre({
        racine: true,
        nom: '',
        proba: 1,
        visible: false,
        alter: '\\ldots',
        enfants: [
          new Arbre({
            rationnel: false,
            nom: `${ev[0]}`,
            proba: pA,
            visible: false,
            alter: '\\ldots',
            enfants: [
              new Arbre({
                rationnel: false,
                nom: `${ev[1]}`,
                proba: pBsachantA,
                visible: false,
                alter: '\\ldots',
              }),
              new Arbre({
                rationnel: false,
                nom: `\\overline{${ev[1]}}`,
                proba: pBbsachantA,
                visible: false,
                alter: '\\ldots',
              }),
            ],
          }),
          new Arbre({
            rationnel: false,
            nom: `\\overline{${ev[0]}}`,
            proba: pAb,
            visible: false,
            alter: '\\ldots',
            enfants: [
              new Arbre({
                rationnel: false,
                nom: `${ev[1]}`,
                proba: pBsachantA,
                visible: false,
                alter: '\\ldots',
              }),
              new Arbre({
                rationnel: false,
                nom: `\\overline{${ev[1]}}`,
                proba: pBbsachantAb,
                visible: false,
                alter: '\\ldots',
              }),
            ],
          }),
        ],
      })

      omega.setTailles() // On calcule les tailles des arbres.
      objets = omega.represente(0, 9, 0, 2, true, 1, 2) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite

      omega3 = new Arbre({
        racine: true,
        nom: '',
        proba: 1,
        visible: false,
        alter: '\\ldots',
        enfants: [
          new Arbre({
            rationnel: false,
            nom: `${ev[0]}`,
            proba: pA,
            visible: false,
            alter: '\\ldots',
            enfants: [
              new Arbre({
                rationnel: false,
                nom: `${ev[1]}`,
                proba: pBsachantA,
              }),
              new Arbre({
                rationnel: false,
                nom: `\\overline{${ev[1]}}`,
                proba: pBbsachantA,
                visible: false,
                alter: '\\ldots',
              }),
            ],
          }),
          new Arbre({
            rationnel: false,
            nom: `\\overline{${ev[0]}}`,
            proba: pAb,
            visible: false,
            alter: '\\ldots',
            enfants: [
              new Arbre({
                rationnel: false,
                nom: `${ev[1]}`,
                proba: pBsachantA,
                visible: false,
                alter: '\\ldots',
              }),
              new Arbre({
                rationnel: false,
                nom: `\\overline{${ev[1]}}`,
                proba: pBbsachantAb,
                visible: false,
                alter: '\\ldots',
              }),
            ],
          }),
        ],
      })

      omega3.setTailles() // On calcule les tailles des arbres.
      objets3 = omega3.represente(0, 9, 0, 2, true, 1, 2) // On crée l'arbre complet echelle 1.4 feuilles verticales sens gauche-droite
      switch (
        listeTypeDeQuestions[i] // listeTypeDeQuestions[i]
      ) {
        case 1: // Maladie/Vaccin
          texte = `Le dépistage d'une maladie particulière que l'on appelle $M$ s'effectue par un test basé sur le dosage d'une hormone particulière. <br>
          D'après une étude, cette maladie $M$ touche $${texNombre(pA * 100, 4)}\\,\\%$ de la population.<br>
Si une personne est atteinte par la maladie $M$, le test sera positif dans $${texNombre(pBsachantA * 100, 4)}\\,\\%$ des cas ; alors que si la personne n'est pas atteinte par la maladie $M$, le test sera négatif dans $${texNombre(pBbsachantAb * 100, 4)}\\,\\%$ des cas.<br>
On soumet à ce test une personne prise au hasard dans la population.<br>
On note :<br>`
          texte += createList({
            items: [
              `$${ev[0]}$ l'événement : « La personne est atteinte par la maladie $M$ »;`,
              `$${ev[1]}$ l'événement :  « Le test est positif ».`,
            ],
            style: 'fleches',
          })
          texte += createList({
            items: [
              "Traduire l'énoncé à l'aide d'un arbre pondéré.",
              'Déterminer la probabilité pour que le test soit positif et que la personne choisie ne soit pas malade.',
              'Déterminer la probabilité pour que le test soit positif.',
              ` Calculer $P_${ev[1]}\\left(\\overline{${ev[0]}}\\right)$ (Arrondir à $10^{-3}$ près). Interpréter ce résultat dans le contexte de l'exercice.`,
            ],
            style: 'nombres',
          })
          texteCorr = createList({
            items: [
              mathalea2d(
                Object.assign(
                  { scale: 0.7, style: 'inline' },
                  fixeBordures(objetsC),
                ),
                objetsC,
              ),
              `La probabilité pour que le test soit positif et que la personne choisie ne soit pas malade est donnée par $P(\\overline{${ev[0]}}\\cap ${ev[1]})$.<br>
              $\\begin{aligned}
              P(\\overline{${ev[0]}}\\cap ${ev[1]})&=P(\\overline{${ev[0]}})\\times P_{\\overline{${ev[0]}}}(${ev[1]})\\\\
              &=${texNombre(pAb, 4)}\\times ${texNombre(pBsachantAb, 4)}\\\\
              &=${miseEnEvidence(`${texNombre(pAbinterB, 5)}`)}
              \\end{aligned}$`,
              `${texteProbaTotaleB}`,
              `On a :<br>
               ${textePAbsachantB}
              La probabilité que la personne ne soit pas malade sachant que le test est positif est $${miseEnEvidence(`${texNombre(pAbsachantB, 3)}`)}$.`,
            ],
            style: 'nombres',
          })

          break

        case 2: // sandwichs/dessert
          texte = `Un snack propose deux types de plats : des sandwichs et des pizzas.<br>
Le snack propose également plusieurs desserts.<br>
La gérante constate que $${texNombre(pA * 100, 4)}\\,\\%$ des clients qui achètent un plat choisissent un sandwich et que parmi ceux-ci seulement $${texNombre(pBsachantA * 100, 4)}\\,\\%$ prennent également un dessert.<br>
Elle constate aussi que $${texNombre(pBbsachantAb * 100, 4)}\\,\\%$ des clients qui ont choisi une pizza comme plat ne prennent pas de dessert.<br>
On choisit au hasard un client ayant acheté un plat dans ce snack.<br>
On considère les événements suivants :`
          texte += createList({
            items: [
              `$${ev[0]}$ l'événement : « Le client interrogé a choisi un sandwich »;`,
              `$${ev[1]}$ l'événement : « Le client interrogé a choisi un dessert ».`,
            ],
            style: 'fleches',
          })
          texte += createList({
            items: [
              "Sans justifier, recopier puis compléter l'arbre pondéré suivant :<br>" +
                mathalea2d(
                  Object.assign(
                    { scale: 0.7, style: 'inline' },
                    fixeBordures(objets),
                  ),
                  objets,
                ),
              'Calculer la probabilité que le client ait choisi un sandwich et un dessert.',
              `Démontrer que $P(${ev[1]}) = ${texNombre(pB, 5)}$.`,
              " Sachant que le client a acheté un dessert, quelle est la probabilité, arrondie à $0,01$ près, qu'il ait acheté une pizza ?",
              `Les évènements $${ev[0]}$ et $${ev[1]}$ sont-ils indépendants ? Justifier.`,
            ],
            style: 'nombres',
          })
          texteCorr = createList({
            items: [
              mathalea2d(
                Object.assign(
                  { scale: 0.7, style: 'inline' },
                  fixeBordures(objetsC),
                ),
                objetsC,
              ),
              `La probabilité la probabilité que le client ait choisi un sandwich et un dessert est donnée par  $P(${ev[0]}\\cap ${ev[1]})$.<br>
            ${textePAinterB}`,
              `${texteProbaTotaleB}`,
              `La probabilité que le client ait acheté une pizza sachant qu'il a acheté un dessert est donnée par $P_${ev[1]}\\left(\\overline{${ev[0]}}\\right)$.<br>
            ${textePAbsachantB}`,
              `Comme  $P(${ev[0]}\\cap ${ev[1]})=${texNombre(pAinterB, 5)}$ et $P(${ev[0]})\\times P(${ev[1]})=${texNombre(pA, 5)}\\times ${texNombre(pB, 5)}=${texNombre(pA * pB, 5)}$, on en déduit que $P(${ev[0]}\\cap ${ev[1]})\\neq P(${ev[0]})\\times P(${ev[1]})$. <br>
            Les événements $${ev[0]}$ et $${ev[1]}$ ne sont donc pas indépendants.`,
            ],
            style: 'nombres',
          })
          break

        case 3: // jeu de fléchettes
          texte = `${P} joue à un jeu dont une partie est constituée d'un lancer d'une fléchette sur une cible suivi d'un tirage au sort dans deux urnes contenant des tickets marqués «  gagnant » ou
« perdant » indiscernables.<br>`
          texte += createList({
            items: [
              " S'il tire un ticket marqué « gagnant », il pourra recommencer une partie. ;",
              ` S'il atteint le centre de la cible, ${P} tire un ticket dans l'urne $U_1$ contenant exactement ${nombreEnLettres(u1)} ${u1 === 1 ? 'ticket marqué' : 'tickets marqués'}  « gagnant » et ${nombreEnLettres(10 - u1)}  ${10 - u1 === 1 ? 'ticket marqué' : 'tickets marqués'} « perdant »`,
              `S'il n'atteint pas le centre de la cible (donc même s'il n'atteint pas la cible), ${P} tire un ticket dans l'urne $U_2$ contenant exactement ${nombreEnLettres(u2)}  ${u2 === 1 ? 'ticket marqué' : 'tickets marqués'} « gagnant » et ${nombreEnLettres(10 - u2)}  ${10 - u2 === 1 ? 'ticket marqué' : 'tickets marqués'} « perdant ».`,
            ],
            style: 'fleches',
          })
          texte += `${P} atteint le centre de la cible avec une probabilité de $${texNombre(pA, 2)}$.<br>
On note les évènements suivants :<br>`
          texte += createList({
            items: [
              `$${ev[0]}$ l'événement : « ${P} atteint le centre de la cible »;`,
              `$${ev[1]}$ l'événement : « ${P} tire un ticket lui offrant une autre partie ».`,
            ],
            style: 'fleches',
          })

          texte += createList({
            items: [
              `Recopier et compléter l'arbre pondéré suivant en justifiant la valeur $${texNombre(pBsachantA, 2)}$ :<br>` +
                mathalea2d(
                  Object.assign(
                    { scale: 0.7, style: 'inline' },
                    fixeBordures(objets3),
                  ),
                  objets3,
                ),
              `Calculer la probabilité de l'événement $\\overline{${ev[0]}}\\cap ${ev[1]}$. Interpréter ce résultat.`,
              `Montrer que la probabilité qu'à l'issue d'une partie ${P} en gagne une nouvelle est égale à $${texNombre(pB, 5)}$.`,
              `Sachant que ${P} a gagné une nouvelle partie, quelle est la probabilité qu'il ait atteint le centre de la cible ? <br>Arrondir le résultat à $10^{-3}$.`,
            ],
            style: 'nombres',
          })
          texteCorr = createList({
            items: [
              mathalea2d(
                Object.assign(
                  { scale: 0.7, style: 'inline' },
                  fixeBordures(objetsC),
                ),
                objetsC,
              ) +
                `Quand ${P} atteint la cible, il tire un ticket dans l'urne $U_1$ qui contient ${nombreEnLettres(u1)} ${u1 === 1 ? 'ticket marqué' : 'tickets marqués'}  « gagnant » sur un total de $10$ tickets.<br>
                Ainsi, la probabilité d'obtenir un ticket  « gagnant » est $\\dfrac{${u1}}{10}=${miseEnEvidence(`${texNombre(pBsachantA, 2)}`)}$.`,
              `On a :<br>
              ${textePAbinterB}`,
              `${texteProbaTotaleB}`,
              `La probabilité que ${P} ait atteint le centre de la cible sachant qu'il a gagné une nouvelle partie est donnée par $P_${ev[1]}\\left(${ev[0]}\\right)$.<br>
              ${textePAsachantB}`,
            ],
            style: 'nombres',
          })
          break

        case 4: // vacances au camping
          texte =
            'Une enquête réalisée dans un camping a donné les résultats suivants :<br>'
          texte += createList({
            items: [
              ` $${texNombre(pA * 100, 2)}\\,\\%$ des campeurs viennent en famille, les autres viennent entre amis ;`,
              ` parmi ceux venant en famille, $${texNombre(pBsachantA * 100, 2)}\\,\\%$ profitent des activités du camping ;`,
              `parmi ceux venant entre amis, $${texNombre(pBsachantAb * 100, 2)}\\,\\%$ ne profitent pas des activités du camping.`,
            ],
            style: 'fleches',
          })
          texte +=
            'On choisit au hasard un client de ce camping et on considère les évènements suivants :'
          texte += createList({
            items: [
              `$${ev[0]}$ l'événement : « Le campeur choisi est venu en famille »;`,
              `$${ev[1]}$ l'événement : « Le campeur choisi profite des activités du camping ».`,
            ],
            style: 'fleches',
          })

          texte += createList({
            items: [
              "Recopier et compléter l'arbre pondéré suivant. <br>" +
                mathalea2d(
                  Object.assign(
                    { scale: 0.7, style: 'inline' },
                    fixeBordures(objets),
                  ),
                  objets,
                ),
              `Calculer $P(${ev[0]}\\cap \\overline{${ev[1]}})$. Interpréter ce résultat.`,
              `Montrer que $P(${ev[1]})=${texNombre(pB, 5)}$.`,
              `Sachant que le campeur choisi a profité des activités du camping, calculer la probabilité qu'il soit venu en famille. <br>
                  Arrondir le résultat au centième.`,
            ],
            style: 'nombres',
          })
          texteCorr = createList({
            items: [
              mathalea2d(
                Object.assign(
                  { scale: 0.7, style: 'inline' },
                  fixeBordures(objetsC),
                ),
                objetsC,
              ),
              `On a :<br>
                ${textePAinterBb}
                La probabilité de choisir un client qui vient en famille et qui ne profite pas des activités du camping est $${texNombre(pAinterBb, 5)}$.`,
              `${texteProbaTotaleB}`,
              `La probabilité que le campeur choisi soit venu en famille sachant qu'il a profité des activités du camping est donnée par  $P_${ev[1]}\\left(${ev[0]}\\right)$.<br>
                ${textePAsachantB}`,
            ],
            style: 'nombres',
          })
          break

        case 5: // L'agence de voyage
          texte = `Une agence de voyage propose deux formules week-end pour se rendre à Londres depuis Paris.<br>
            Les clients choisissent leur moyen de transport : train ou avion.<br>
            De plus, s'ils le souhaitent, ils peuvent compléter leur formule par l'option  « visites guidées ».<br>
            Une étude a produit les données suivantes :`
          texte += createList({
            items: [
              ` $${texNombre(pA * 100, 2)}\\,\\%$ des clients optent pour l'avion ;`,
              ` parmi les clients ayant choisi le train, $${texNombre(pBsachantAb * 100, 2)}\\,\\%$ choisissent aussi l'option  « visites guidées » ;`,
              ` $${texNombre(pAinterB * 100, 2)}\\,\\%$ des clients ont choisi à la fois l'avion et l'option  « visites guidées ».`,
            ],
            style: 'fleches',
          })
          texte +=
            "On interroge au hasard un client de l'agence ayant souscrit à une formule week-end à Londres et on considère les évènements suivants :"
          texte += createList({
            items: [
              `$${ev[0]}$ l'événement : « Le client a choisi l'avion » ;`,
              `$${ev[1]}$ l'événement : « Le client a choisi l'option  "visites guidées" ».`,
            ],
            style: 'fleches',
          })

          texte += createList({
            items: [
              "Écrire les trois probabilités, données dans l'énoncé, avec les notations qui conviennent.",
              'Réaliser un arbre pondéré modélisant la situation.',
              `Déterminer $P_{${ev[0]}}(${ev[1]})$.`,
              `Démontrer que la probabilité pour que le client interrogé ait choisi l'option  « visites guidées »  est  égale à $${texNombre(pB, 4)}$. `,
              `Calculer la probabilité pour que le client interrogé ait pris l'avion sachant qu'il n'a pas choisi l'option  visites guidées. <br>
                    Arrondir le résultat au centième.`,
              `On interroge au hasard deux clients de manière aléatoire et indépendante.<br> 
                    Quelle est la probabilité qu'aucun des deux ne prenne l'option  visites guidées ? <br>
                    On donnera le résultat sous forme d'une valeur approchée à $10^{-3}$ près.`,
            ],
            style: 'nombres',
          })
          texteCorr = createList({
            items: [
              `D'après l'énoncé, on a : <br>
                $P(${ev[0]})=${texNombre(pA, 2)}$,  $P_{\\overline{${ev[0]}}}(${ev[1]})=${texNombre(pBsachantAb, 2)}$ et $P(${ev[0]}\\cap ${ev[1]})=${texNombre(pAinterB, 3)}$.
                `,
              mathalea2d(
                Object.assign(
                  { scale: 0.7, style: 'inline' },
                  fixeBordures(objetsC),
                ),
                objetsC,
              ),
              `On a :<br>
                  $\\begin{aligned}
              P_${ev[0]}\\left(${ev[1]}\\right)&=\\dfrac{P(${ev[0]}\\cap ${ev[1]})}{P(${ev[0]})}\\\\
              &=\\dfrac{${texNombre(pAinterB, 5)}}{${texNombre(pA, 5)}}\\\\
              &=   ${miseEnEvidence(`${texNombre(pBsachantA, 2, true)}`)}
              \\end{aligned}$
                 `,
              `${texteProbaTotaleB}`,
              `La probabilité  que le client interrogé ait pris l'avion sachant qu'il n'a pas choisi l'option  « visites guidées » est $P_{\\overline{${ev[1]}}}(${ev[0]})$.<br>
                ${textePAsachantBb}  `,
              `En notant $\\overline {${ev[1]}}_1$ l'événement « le premier client n'a pas choisi  l'option   visites guidées  et $\\overline {${ev[1]}}_2$ l'événement « le second client n'a pas choisi  l'option  « visites guidées », et puisque ces deux événements sont indépendants, on a  : <br>
                $P(\\overline {${ev[1]}}_1\\cap\\overline {${ev[1]}}_2)=P(\\overline {${ev[1]}}_1)\\times P(\\overline {${ev[1]}}_2)$.<br>
                Or $P(\\overline {${ev[1]}}_1)=P(\\overline {${ev[1]}}_2)=1-${texNombre(pB, 5)}=${texNombre(pBb, 4)}$.<br>
                On en déduit : $P(\\overline {${ev[1]}}_1\\cap\\overline {${ev[1]}}_2)=${texNombre(pBb, 4)}\\times ${texNombre(pBb, 4)}\\approx${texNombre(pBb ** 2, 3, true)}$.<br>
                Ainsi, la probabilité qu'aucun des deux ne prenne l'option   visites guidées  est environ $${miseEnEvidence(`${texNombre(pBb ** 2, 3, true)}`)}$. `,
            ],
            style: 'nombres',
          })
          break

        case 6: // le salon de coiffure
          texte =
            'Une chaîne de salons de coiffure propose à ses clients qui viennent pour une coupe, deux prestations supplémentaires cumulables :<br>'
          texte += texte +=
            createList({
              items: [
                ' Une coloration naturelle à base de plantes appelée « couleur-soin » ;',
                ' Des mèches blondes pour donner du relief à la chevelure, appelées « effet coup de soleil ».',
              ],
              style: 'fleches',
            }) + 'Il apparaît que :'

          texte += createList({
            items: [
              ` $${texNombre(pA * 100, 2)}\\,\\%$ des clients demandent une « couleur-soin » ;`,
              ` parmi ceux qui ne veulent pas de « couleur-soin », $${texNombre(pBsachantAb * 100, 2)}\\,\\%$ des clients demandent un « effet coup de soleil »  ;`,
              ` par ailleurs, $${texNombre(pAinterB * 100, 2)}\\,\\%$ demandent une « couleur-soin » et un « effet coup de soleil ».`,
            ],
            style: 'fleches',
          })
          texte += 'On interroge un client au hasard. On notera :'
          texte += createList({
            items: [
              `$${ev[0]}$ l'événement : « Le client souhaite une "couleur-soin" »;`,
              `$${ev[1]}$ l'événement : « Le client souhaite un "effet coup de soleil" ».`,
            ],
            style: 'fleches',
          })

          texte += createList({
            items: [
              `Donner les valeurs de $P(${ev[0]})$, $P(${ev[0]}\\cap ${ev[1]})$ et $P_{\\overline{${ev[0]}}}(${ev[1]})$.`,
              'Calculer la probabilité que le client ne souhaite ni une « couleur-soin » , ni un « effet coup de soleil ».',
              "Calculer la probabilité qu'un client choisisse l'« effet coup de soleil » sachant qu'il a pris une « couleur-soin ». ",
              `Montrer que la probabilité de l'événement $${ev[1]}$ est $${texNombre(pB, 4)}$.`,
              `Les événements $${ev[0]}$ et $${ev[1]}$ sont-ils indépendants ? Justifier.`,
            ],
            style: 'nombres',
          })
          texteCorr = createList({
            items: [
              `D'après l'énoncé, on a : <br>
                  $P(${ev[0]})=${miseEnEvidence(`${texNombre(pA, 2)}`)}$,  $P(${ev[0]}\\cap ${ev[1]})=${miseEnEvidence(`${texNombre(pAinterB, 3)}`)}$ et $P_{\\overline{${ev[0]}}}(${ev[1]})=${miseEnEvidence(`${texNombre(pBsachantAb, 2)}`)}$.
                  `,
              'On peut réaliser un arbre pondéré qui sera complété au fur et à mesure des questions : ' +
                mathalea2d(
                  Object.assign(
                    { scale: 0.7, style: 'inline' },
                    fixeBordures(objetsC),
                  ),
                  objetsC,
                ) +
                `La probabilité que le client ne souhaite ni une « couleur-soin » , ni un « effet coup de soleil » est $P(\\overline{${ev[0]}}\\cap \\overline{${ev[1]}})$ :<br>
            ${textePAbinterBb}`,
              `On a :<br>
                    $\\begin{aligned}
                P_${ev[0]}\\left(${ev[1]}\\right)&=\\dfrac{P(${ev[0]}\\cap ${ev[1]})}{P(${ev[0]})}\\\\
                &=\\dfrac{${texNombre(pAinterB, 5)}}{${texNombre(pA, 5)}}\\\\
                &=   ${miseEnEvidence(`${texNombre(pBsachantA, 2, true)}`)}
                \\end{aligned}$
                   `,
              `${texteProbaTotaleB}`,
              `Comme  $P(${ev[0]}\\cap ${ev[1]})=${texNombre(pAinterB, 5)}$ et $P(${ev[0]})\\times P(${ev[1]})=${texNombre(pA, 5)}\\times ${texNombre(pB, 5)}=${texNombre(pA * pB, 5)}$, on en déduit que $P(${ev[0]}\\cap ${ev[1]})\\neq P(${ev[0]})\\times P(${ev[1]})$. <br>
            Les événements $${ev[0]}$ et $${ev[1]}$ ne sont donc pas indépendants.`,
            ],
            style: 'nombres',
          })
          break

        case 7: // portique
        default:
          texte = `Dans un aéroport, les portiques de sécurité servent à détecter les objets métalliques que peuvent emporter les voyageurs.<br>
On choisit au hasard un voyageur franchissant un portique. <br>
On note :`
          texte += createList({
            items: [
              `$${ev[1]}$ l'événement : « Le voyageur fait sonner le portique » ;`,
              `$${ev[0]}$ l'événement : « Le voyageur porte un objet métallique » .`,
            ],
            style: 'fleches',
          })
          texte +=
            `On considère   ${a === 1 ? `qu'${nombreEnLettres(a)} voyageur sur $500$ porte sur lui` : `que ${nombreEnLettres(a)} voyageurs sur $500$ portent sur eux`} un objet métallique. <br>
          On admet que : ` +
            createList({
              items: [
                ` Lorsqu'un voyageur franchit le portique avec un objet métallique, la probabilité que le portique sonne est égale à $${texNombre(pBsachantA, 4)}$ ;`,
                `Lorsqu'un voyageur franchit le portique sans objet métallique, la probabilité que le portique ne sonne pas est de $${texNombre(pBbsachantAb, 4)}$.`,
              ],
              style: 'fleches',
            })

          texte += createList({
            items: [
              `À l'aide des données de l'énoncé, préciser les valeurs de $P(${ev[0]})$, $P_{${ev[0]}}(${ev[1]})$ et $P_{\\overline{${ev[0]}}}(\\overline{${ev[1]}})$.`,

              "Recopier et compléter l'arbre pondéré ci-dessous, modélisant cette situation : <br>" +
                mathalea2d(
                  Object.assign(
                    { scale: 0.7, style: 'inline' },
                    fixeBordures(objets),
                  ),
                  objets,
                ),

              `Montrer que $P(${ev[1]})=${texNombre(pB, 5)}$.`,
              `En déduire la probabilité qu'un voyageur porte un objet métallique sachant qu'il a fait
sonner le portique en passant. On arrondira le résultat à $10^{-3}$. 
                  `,
              `Les événements $${ev[0]}$ et $${ev[1]}$ sont-ils indépendants ? Justifier.`,
            ],
            style: 'nombres',
          })
          texteCorr = createList({
            items: [
              `D'après l'énoncé, on a : <br>
                  $P(${ev[0]})=\\dfrac{${a}}{500}=${miseEnEvidence(`${texNombre(pA, 4)}`)}$,  $P_{${ev[0]}}(${ev[1]})=${miseEnEvidence(`${texNombre(pBsachantA, 4)}`)}$ et $P_{\\overline{${ev[0]}}}(\\overline{${ev[1]}})=${miseEnEvidence(`${texNombre(pBbsachantAb, 4)}`)}$.
                  `,

              mathalea2d(
                Object.assign(
                  { scale: 0.7, style: 'inline' },
                  fixeBordures(objetsC),
                ),
                objetsC,
              ),
              `${texteProbaTotaleB}`,
              `la probabilité qu'un voyageur porte un objet métallique sachant qu'il a fait
sonner le portique en passant $P_${ev[1]}\\left(${ev[0]}\\right)$.<br>
                ${textePAsachantB}`,
              `Comme  $P(${ev[0]}\\cap ${ev[1]})=${texNombre(pAinterB, 5)}$ et $P(${ev[0]})\\times P(${ev[1]})=${texNombre(pA, 5)}\\times ${texNombre(pB, 5)}\\approx${texNombre(pA * pB, 5)}$, on en déduit que $P(${ev[0]}\\cap ${ev[1]})\\neq P(${ev[0]})\\times P(${ev[1]})$. <br>
            Les événements $${ev[0]}$ et $${ev[1]}$ ne sont donc pas indépendants.`,
            ],
            style: 'nombres',
          })
          break
      }

      if (this.questionJamaisPosee(i, pA, pB, pAb)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
