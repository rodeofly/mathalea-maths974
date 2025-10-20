import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import {
  listeDeNotes,
  tirerLesDes,
  unMoisDeTemperature,
} from '../../lib/outils/aleatoires'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  arrondi,
  nombreDeChiffresDansLaPartieDecimale,
  nombreDeChiffresDe,
} from '../../lib/outils/nombres'
import { numAlpha } from '../../lib/outils/outilString'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import { OutilsStats } from '../../modules/outilsStat'
import Exercice from '../Exercice'

export const titre = "Calculer des caractéristiques d'une série"
export const interactifReady = true
export const interactifType = 'mathLive'

export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModifImportante = '19/08/2023'

/**
 * Calculer des caractéristiques d'une série (moyenne, médiane ou étendue)
 *
 * @author Mickael Guironnet
 */
export const uuid = 'b8afd'

export const refs = {
  'fr-fr': ['3S14'],
  'fr-ch': ['11NO2-11'],
}

export default class CalculerCaracteristiques extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Type de séries',
      'Nombres séparés par des tirets :\n1 : Lancers de dés\n2 : Notes\n3 : Températures\n4 : Salaires\n5 : Pointures\n6 : Notes avec coefficients\n7 : Mélange',
    ]
    this.besoinFormulaire2Texte = [
      'Choix des questions',
      'Nombres séparés par des tirets :\n1 : Moyenne\n2 : Médiane\n3 : Étendue\n4 : Toutes',
    ]
    this.besoinFormulaire3CaseACocher = ['Avec du vocabulaire explicatif']

    this.nbQuestions = 4

    this.sup = 7
    this.sup2 = 4
    this.sup3 = true
  }

  nouvelleVersion() {
    const questionsDisponibles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 6,
      melange: 7,
      defaut: 7,
      nbQuestions: this.nbQuestions,
    }).map(Number)
    const typeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup2,
      min: 1,
      max: 3,
      melange: 4,
      defaut: 4,
      nbQuestions: 3,
      enleveDoublons: true,
    }).map(Number)
    const listePairOuImpair = combinaisonListes(
      ['pair', 'impair'],
      this.nbQuestions,
    )

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; cpt++) {
      const nbReponse = typeQuestions.length
      let texte = ''
      let texteCorr = ''
      let initAMC = ''
      const texteAMC = []
      const reponsesAMC = []
      const approxAMC = []
      let repMoyenne, repMediane, repEtendue
      switch (questionsDisponibles[i]) {
        case 1: {
          // un dé ou des dés
          // on alterne 1 dé puis 2 dés
          const nombreDes =
            questionsDisponibles.reduce(
              (accumulator, currentValue, currentIndex) => {
                if (currentValue === 1 && currentIndex <= i) {
                  return accumulator + 1
                } else {
                  return accumulator
                }
              },
              0,
            ) %
              2 ===
            1
              ? 1
              : 2
          const nombreFaces = choice([4, 6, 8, 10]) as 4 | 6 | 8 | 10
          let nombreTirages
          if (listePairOuImpair[i] === 'pair') {
            nombreTirages = choice([50, 100, 200, 500, 1000, 2000])
          } else {
            nombreTirages = choice([49, 99, 199, 299, 999, 1999])
          }
          const tirages = tirerLesDes(nombreTirages, nombreFaces, nombreDes) // on récupère une série rangée dans l'ordre croissant avec les effectifs correspondants
          initAMC =
            OutilsStats.texteTirages2D(
              nombreDes,
              nombreTirages,
              nombreFaces,
              tirages,
              this.sup3,
            ) + '<br>' // on récupère une série rangée dans l'ordre croissant avec les effectifs correspondants
          texte += initAMC + '<br>'
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            approxAMC[questind] = 0
            if (typeQuestions[k] === 1) {
              // moyenne
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la moyenne des lancers arrondie au dixième.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]
              const [, somme] = OutilsStats.computeMoyenneTirages2D(tirages)
              repMoyenne = arrondi(somme / nombreTirages, 1)
              setReponse(this, i * nbReponse + questind, repMoyenne, {
                formatInteractif: 'calcul',
              })
              reponsesAMC[questind] = repMoyenne
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMoyenneNotes(
                  tirages,
                  somme,
                  nombreTirages,
                  'lancers',
                )
            } else if (typeQuestions[k] === 2) {
              // médiane
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la médiane des lancers.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]
              const [scoresMedians, medianeCorr] =
                OutilsStats.computeMedianeTirages2D(nombreTirages, tirages)
              if (scoresMedians.length === 1) {
                repMediane = medianeCorr
                setReponse(this, i * nbReponse + questind, repMediane, {
                  formatInteractif: 'calcul',
                })
                reponsesAMC[questind] = repMediane
              } else {
                if (scoresMedians[0] === scoresMedians[1]) {
                  repMediane = scoresMedians[0]
                  setReponse(this, i * nbReponse + questind, repMediane, {
                    formatInteractif: 'calcul',
                  })
                  reponsesAMC[questind] = repMediane
                } else {
                  repMediane = [...scoresMedians]
                  setReponse(
                    this,
                    i * nbReponse + questind,
                    [repMediane[0], repMediane[1]],
                    { formatInteractif: 'intervalleStrict' },
                  )
                  reponsesAMC[questind] = arrondi(
                    (repMediane[0] + repMediane[1]) / 2,
                    1,
                  )
                  approxAMC[questind] =
                    arrondi((10 * (repMediane[1] - repMediane[0])) / 2, 0) - 0.1
                }
              }
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMedianeTirages2D(
                  nombreTirages,
                  medianeCorr,
                  scoresMedians,
                  tirages,
                )
            } else {
              // étendue
              texteAMC[questind] =
                numAlpha(questind) +
                "Calculer l'étendue des lancers." +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]
              const [min, max] = [tirages[0][0], tirages[tirages.length - 1][0]]
              repEtendue = max - min
              reponsesAMC[questind] = repEtendue
              setReponse(this, i * nbReponse + questind, repEtendue, {
                formatInteractif: 'calcul',
              })
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrEtendueNotes(min, max, 'lancer')
            }
          }
          break
        }
        case 2: {
          // des notes
          let nombreNotes
          if (listePairOuImpair[i] === 'pair') {
            nombreNotes = choice([8, 10, 12])
          } else {
            nombreNotes = choice([7, 9, 11])
          }
          const notes = listeDeNotes(
            nombreNotes,
            randint(0, 7),
            randint(13, 20),
          ) // on récupère une liste de notes (série brute)
          initAMC = OutilsStats.texteNotes(notes) + '<br>'
          texte += initAMC + '<br>'
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            approxAMC[questind] = 0
            if (typeQuestions[k] === 1) {
              // moyenne
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la moyenne de ces notes arrondie au dixième.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [, somme] = OutilsStats.computeMoyenne(notes)
              repMoyenne = arrondi(somme / nombreNotes, 1)
              setReponse(this, i * nbReponse + questind, repMoyenne, {
                formatInteractif: 'calcul',
              })
              reponsesAMC[questind] = repMoyenne
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMoyenneNotes(notes, somme, nombreNotes)
            } else if (typeQuestions[k] === 2) {
              // médiane
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la médiane de ces notes.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [mediane, medianeCorr] = OutilsStats.computeMediane(notes)
              if (!Array.isArray(mediane)) {
                repMediane = mediane
                setReponse(this, i * nbReponse + questind, repMediane, {
                  formatInteractif: 'calcul',
                })
                reponsesAMC[questind] = repMediane
              } else {
                if (mediane[0] === mediane[1]) {
                  repMediane = mediane[0]
                  setReponse(this, i * nbReponse + questind, repMediane, {
                    formatInteractif: 'calcul',
                  })
                  reponsesAMC[questind] = repMediane
                } else {
                  repMediane = [...mediane]
                  setReponse(
                    this,
                    i * nbReponse + questind,
                    [repMediane[0], repMediane[1]],
                    { formatInteractif: 'intervalleStrict' },
                  )
                  reponsesAMC[questind] = arrondi(
                    (repMediane[0] + repMediane[1]) / 2,
                    1,
                  )
                  approxAMC[questind] =
                    arrondi((10 * (repMediane[1] - repMediane[0])) / 2, 0) - 0.1
                }
              }
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMedianeNotes(notes, medianeCorr, mediane)
            } else {
              // étendue
              texteAMC[questind] =
                numAlpha(questind) +
                "Calculer l'étendue de ces notes." +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [min, max] = OutilsStats.computeEtendue(notes)
              repEtendue = max - min
              reponsesAMC[questind] = repEtendue
              setReponse(this, i * nbReponse + questind, repEtendue, {
                formatInteractif: 'calcul',
              })
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrEtendueNotes(min, max)
            }
          }
          break
        }
        case 3: {
          // des températures
          const annee = randint(1980, 2019)
          let listeMois
          if (listePairOuImpair[i] === 'pair') {
            listeMois = [4, 6, 9, 11]
          } else {
            listeMois = [1, 3, 5, 7, 8, 10, 12]
          }
          if (
            ((annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0) &&
            listePairOuImpair[i] === 'impair'
          ) {
            // Si l'année est bissextile et qu'on veut une liste impair
            listeMois.push(2)
          } else if (
            !((annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0) &&
            listePairOuImpair[i] === 'pair'
          ) {
            // Si l'année n'est pas bissextile et qu'on veut une liste paire
            listeMois.push(2)
          }
          const mois = listeMois[randint(0, listeMois.length - 1)]
          const temperaturesDeBase = [
            3, 5, 9, 13, 19, 24, 26, 25, 23, 18, 10, 5,
          ]
          const temperatures = unMoisDeTemperature(
            temperaturesDeBase[mois - 1],
            mois,
            annee,
          ) // on récupère une série de température correspondant à 1 mois d'une année (série brute)
          initAMC = OutilsStats.texteTemperatures(annee, mois, temperatures)
          texte += initAMC + '<br>'
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            if (typeQuestions[k] === 1) {
              // moyenne
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la moyenne des températures arrondie au dixième.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [, somme] = OutilsStats.computeMoyenne(temperatures)
              repMoyenne = arrondi(somme / temperatures.length, 1)
              setReponse(this, i * nbReponse + questind, repMoyenne, {
                formatInteractif: 'calcul',
              })
              reponsesAMC[questind] = repMoyenne
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMoyenneNotes(
                  temperatures,
                  somme,
                  temperatures.length,
                  'températures',
                )
            } else if (typeQuestions[k] === 2) {
              // médiane
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la médiane des températures.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [mediane, medianeCorr] =
                OutilsStats.computeMediane(temperatures)
              if (!Array.isArray(mediane)) {
                repMediane = mediane
                setReponse(this, i * nbReponse + questind, repMediane, {
                  formatInteractif: 'calcul',
                })
                reponsesAMC[questind] = repMediane
              } else {
                if (mediane[0] === mediane[1]) {
                  repMediane = mediane[0]
                  setReponse(this, i * nbReponse + questind, repMediane, {
                    formatInteractif: 'calcul',
                  })
                  reponsesAMC[questind] = repMediane
                } else {
                  repMediane = [...mediane]
                  setReponse(
                    this,
                    i * nbReponse + questind,
                    [repMediane[0], repMediane[1]],
                    { formatInteractif: 'intervalleStrict' },
                  )
                  reponsesAMC[questind] = arrondi(
                    (repMediane[0] + repMediane[1]) / 2,
                    1,
                  )
                  approxAMC[questind] =
                    arrondi((10 * (repMediane[1] - repMediane[0])) / 2, 0) - 0.1
                }
              }
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMedianeTemperatures(
                  temperatures,
                  medianeCorr,
                  mediane,
                )
            } else {
              // étendue
              texteAMC[questind] =
                numAlpha(questind) +
                "Calculer l'étendue des températures." +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [min, max] = OutilsStats.computeEtendue(temperatures)
              repEtendue = max - min
              reponsesAMC[questind] = repEtendue
              setReponse(this, i * nbReponse + questind, repEtendue, {
                formatInteractif: 'calcul',
              })
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrEtendueNotes(min, max, 'température')
            }
          }
          break
        }
        case 4: {
          // les salaires
          /* let salaires = [
                      [1250 + randint(2, 8) * 10, randint(30, 50)], // 'Ouvrier'
                      [1450 + randint(2, 8) * 10, randint(21, 29)], // 'Ouvrier qualifié'
                      [1700 + randint(2, 8) * 10, randint(15, 20)], // 'Cadre'
                      [3500 + randint(2, 8) * 10, randint(5, 10)], // 'Cadre supérieur'
                      [8000 + randint(2, 8) * 100, 1]] // 'Dirigeant' */
          const total = randint(80, 99)
          let effectifHasard = []
          switch (randint(1, 3)) {
            case 1:
              effectifHasard = [
                arrondi(total / 2, 0) + randint(2, 5),
                arrondi(total / 5, 0) + randint(2, 5),
                arrondi(total / 6, 0) - randint(2, 5),
              ]
              break
            case 2:
              effectifHasard = [
                arrondi(total / 3, 0) + randint(2, 5),
                arrondi(total / 4, 0) + randint(2, 5),
                arrondi(total / 6, 0) - randint(2, 5),
              ]
              break
            case 3:
              effectifHasard = [
                arrondi(total / 4, 0),
                arrondi(total / 5, 0),
                arrondi(total / 5, 0) - randint(2, 5),
              ]
              break
          }
          effectifHasard = [
            arrondi(total / 4, 0),
            arrondi(total / 5, 0),
            arrondi(total / 5, 0) - randint(2, 5),
          ]

          const salaires = [
            [1250 + randint(2, 8) * 10, effectifHasard[0]], // 'Ouvrier'
            [1450 + randint(2, 8) * 10, effectifHasard[1]], // 'Ouvrier qualifié'
            [1700 + randint(2, 8) * 10, effectifHasard[2]], // 'Cadre'
            [
              3500 + randint(2, 8) * 10,
              total -
                1 -
                effectifHasard[0] -
                effectifHasard[1] -
                effectifHasard[2],
            ], // 'Cadre supérieur'
            [8000 + randint(2, 8) * 100, 1],
          ] // 'Dirigeant'
          const effectifTotal = salaires.reduce((accumulator, currentValue) => {
            return accumulator + currentValue[1]
          }, 0)
          if (listePairOuImpair[i] === 'pair' && effectifTotal % 2 === 1) {
            salaires[0][1]++
          }
          if (listePairOuImpair[i] === 'impair' && effectifTotal % 2 === 0) {
            salaires[0][1]++
          }
          initAMC = OutilsStats.texteSalaires(salaires, [
            '\\hspace{0.3cm}Ouvrier\\hspace{0.3cm}',
            'Ouvrier qualifié',
            '\\hspace{0.5cm}Cadre\\hspace{0.5cm}',
            'Cadre supérieur',
            'Dirigeant',
          ])
          texte += initAMC + '<br>'
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            if (typeQuestions[k] === 1) {
              // moyenne
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer le salaire moyen arrondi au dixième.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [, somme, effectif] =
                OutilsStats.computeMoyenneTirages2D(salaires)
              repMoyenne = arrondi(somme / effectif, 1)
              setReponse(this, i * nbReponse + questind, repMoyenne, {
                formatInteractif: 'calcul',
              })
              reponsesAMC[questind] = repMoyenne
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMoyenneNotes(
                  salaires,
                  somme,
                  effectif,
                  'salaires',
                )
            } else if (typeQuestions[k] === 2) {
              // médiane
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer le salaire médian.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [, , effectif] =
                OutilsStats.computeMoyenneTirages2D(salaires)
              const [scoresMedians, medianeCorr] =
                OutilsStats.computeMedianeTirages2D(effectif, salaires)
              if (scoresMedians.length === 1) {
                repMediane = medianeCorr
                setReponse(this, i * nbReponse + questind, repMediane, {
                  formatInteractif: 'calcul',
                })
                reponsesAMC[questind] = repMediane
              } else {
                if (scoresMedians[0] === scoresMedians[1]) {
                  repMediane = scoresMedians[0]
                  setReponse(this, i * nbReponse + questind, repMediane, {
                    formatInteractif: 'calcul',
                  })
                  reponsesAMC[questind] = repMediane
                } else {
                  repMediane = [...scoresMedians]
                  setReponse(
                    this,
                    i * nbReponse + questind,
                    [repMediane[0], repMediane[1]],
                    { formatInteractif: 'intervalleStrict' },
                  )
                  reponsesAMC[questind] = arrondi(
                    (repMediane[0] + repMediane[1]) / 2,
                    1,
                  )
                  approxAMC[questind] =
                    arrondi((10 * (repMediane[1] - repMediane[0])) / 2, 0) - 0.1
                }
              }
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMedianeTirages2DSalaires(
                  effectif,
                  medianeCorr,
                  scoresMedians,
                  salaires,
                  [
                    '\\hspace{0.3cm}Ouvrier\\hspace{0.3cm}',
                    'Ouvrier qualifié',
                    '\\hspace{0.5cm}Cadre\\hspace{0.5cm}',
                    'Cadre supérieur',
                    'Dirigeant',
                  ],
                )
            } else {
              // étendue
              texteAMC[questind] =
                numAlpha(questind) +
                "Calculer l'étendue des salaires." +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [min, max] = [
                salaires[0][0],
                salaires[salaires.length - 1][0],
              ]
              repEtendue = max - min
              reponsesAMC[questind] = repEtendue
              setReponse(this, i * nbReponse + questind, repEtendue, {
                formatInteractif: 'calcul',
              })
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrEtendueNotes(min, max, 'salaire')
            }
          }
          break
        }
        case 5: {
          // les pointures de chaussures
          const nombreNotes = randint(5, 8) // colonnes
          const min = randint(33, 35)
          const max = randint(min + nombreNotes, min + nombreNotes + 3)
          const notes = listeDeNotes(nombreNotes, min, max, true).sort() // on récupère une série de notes (pointures) distinctes et ordonnées
          const effectifs = listeDeNotes(
            nombreNotes,
            randint(2, 4),
            randint(8, 12),
          ) // on récupère une liste d'effectifs
          const pointures = Array.from(notes, (x, i) => [x, effectifs[i]])
          const effectifTotal = pointures.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue[1]
            },
            0,
          )
          if (listePairOuImpair[i] === 'pair' && effectifTotal % 2 === 1) {
            pointures[0][1]++
          }
          if (listePairOuImpair[i] === 'impair' && effectifTotal % 2 === 0) {
            pointures[0][1]++
          }
          initAMC = OutilsStats.texteSalaires(pointures, [], 'pointures')
          texte += initAMC + '<br>'
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            if (typeQuestions[k] === 1) {
              // moyenne
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la moyenne de ces pointures arrondie au dixième.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [, somme, effectif] =
                OutilsStats.computeMoyenneTirages2D(pointures)
              repMoyenne = arrondi(somme / effectif, 1)
              setReponse(this, i * nbReponse + questind, repMoyenne, {
                formatInteractif: 'calcul',
              })
              reponsesAMC[questind] = repMoyenne
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMoyenneNotes(
                  pointures,
                  somme,
                  effectif,
                  'pointures',
                )
            } else if (typeQuestions[k] === 2) {
              // médiane
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la médiane de ces pointures.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [, , effectif] =
                OutilsStats.computeMoyenneTirages2D(pointures)
              const [scoresMedians, medianeCorr] =
                OutilsStats.computeMedianeTirages2D(effectif, pointures)
              if (scoresMedians.length === 1) {
                repMediane = medianeCorr
                setReponse(this, i * nbReponse + questind, repMediane, {
                  formatInteractif: 'calcul',
                })
                reponsesAMC[questind] = repMediane
              } else {
                if (scoresMedians[0] === scoresMedians[1]) {
                  repMediane = scoresMedians[0]
                  setReponse(this, i * nbReponse + questind, repMediane, {
                    formatInteractif: 'calcul',
                  })
                  reponsesAMC[questind] = repMediane
                } else {
                  repMediane = [...scoresMedians]
                  setReponse(
                    this,
                    i * nbReponse + questind,
                    [repMediane[0], repMediane[1]],
                    { formatInteractif: 'intervalleStrict' },
                  )
                  reponsesAMC[questind] = arrondi(
                    (repMediane[0] + repMediane[1]) / 2,
                    1,
                  )
                  approxAMC[questind] =
                    arrondi((10 * (repMediane[1] - repMediane[0])) / 2, 0) - 0.1
                }
              }
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMedianeTirages2DSalaires(
                  effectif,
                  medianeCorr,
                  scoresMedians,
                  pointures,
                  [],
                  'pointure',
                )
            } else {
              // étendue
              texteAMC[questind] =
                numAlpha(questind) +
                "Calculer l'étendue de ces pointures." +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [min, max] = [
                pointures[0][0],
                pointures[pointures.length - 1][0],
              ]
              repEtendue = max - min
              reponsesAMC[questind] = repEtendue
              setReponse(this, i * nbReponse + questind, repEtendue, {
                formatInteractif: 'calcul',
              })
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrEtendueNotes(min, max, 'pointure')
            }
          }
          break
        }
        case 6:
        default: {
          // les notes avec effectifs
          const notes = [
            [5 + randint(0, 2), randint(1, 3)],
            [8 + randint(0, 2), randint(1, 3)],
            [11 + randint(0, 2), randint(1, 4)],
            [14 + randint(0, 2), randint(1, 3)],
            [18 + randint(0, 2), randint(1, 3)],
          ] //
          const effectifTotal = notes.reduce((accumulator, currentValue) => {
            return accumulator + currentValue[1]
          }, 0)
          if (listePairOuImpair[i] === 'pair' && effectifTotal % 2 === 1) {
            notes[0][1]++
          }
          if (listePairOuImpair[i] === 'impair' && effectifTotal % 2 === 0) {
            notes[0][1]++
          }
          initAMC = OutilsStats.texteSalaires(notes, [], 'notes')
          texte += initAMC + '<br>'
          let questind = 0
          for (let k = 0; k < typeQuestions.length; k++) {
            if (typeQuestions[k] === 1) {
              // moyenne
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la moyenne de ces notes arrondie au dixième.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [, somme, effectif] =
                OutilsStats.computeMoyenneTirages2D(notes)
              repMoyenne = arrondi(somme / effectif, 1)
              setReponse(this, i * nbReponse + questind, repMoyenne, {
                formatInteractif: 'calcul',
              })
              reponsesAMC[questind] = repMoyenne
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMoyenneNotes(
                  notes,
                  somme,
                  effectif,
                  'notes',
                )
            } else if (typeQuestions[k] === 2) {
              // médiane
              texteAMC[questind] =
                numAlpha(questind) +
                'Calculer la médiane de ces notes.' +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [, , effectif] = OutilsStats.computeMoyenneTirages2D(notes)
              const [scoresMedians, medianeCorr] =
                OutilsStats.computeMedianeTirages2D(effectif, notes)
              if (scoresMedians.length === 1) {
                repMediane = medianeCorr
                setReponse(this, i * nbReponse + questind, repMediane, {
                  formatInteractif: 'calcul',
                })
                reponsesAMC[questind] = repMediane
              } else {
                if (scoresMedians[0] === scoresMedians[1]) {
                  repMediane = scoresMedians[0]
                  setReponse(this, i * nbReponse + questind, repMediane, {
                    formatInteractif: 'calcul',
                  })
                  reponsesAMC[questind] = repMediane
                } else {
                  repMediane = [...scoresMedians]
                  setReponse(
                    this,
                    i * nbReponse + questind,
                    [repMediane[0], repMediane[1]],
                    { formatInteractif: 'intervalleStrict' },
                  )
                  reponsesAMC[questind] = arrondi(
                    (repMediane[0] + repMediane[1]) / 2,
                    1,
                  )
                  approxAMC[questind] =
                    arrondi((10 * (repMediane[1] - repMediane[0])) / 2, 0) - 0.1
                }
              }
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrMedianeTirages2DSalaires(
                  effectif,
                  medianeCorr,
                  scoresMedians,
                  notes,
                  [],
                  'note',
                )
            } else {
              // étendue
              texteAMC[questind] =
                numAlpha(questind) +
                "Calculer l'étendue de ces notes." +
                ajouteChampTexteMathLive(this, i * nbReponse + questind, '') +
                '<br>'
              texte += texteAMC[questind]

              const [min, max] = [notes[0][0], notes[notes.length - 1][0]]
              repEtendue = max - min
              reponsesAMC[questind] = repEtendue
              setReponse(this, i * nbReponse + questind, repEtendue, {
                formatInteractif: 'calcul',
              })
              texteCorr +=
                numAlpha(questind++) +
                OutilsStats.texteCorrEtendueNotes(min, max, 'note')
            }
          }
          break
        }
      }

      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: initAMC,
          options: {
            multicols: true,
            barreseparation: true,
            numerotationEnonce: true,
          },
          propositions: [],
        }
        for (let ee = 0; ee < typeQuestions.length; ee++) {
          this.autoCorrection[i].propositions!.push({
            type: 'AMCNum',
            propositions: [
              {
                texte: '',
                statut: '',
                reponse: {
                  texte: texteAMC[ee],
                  valeur: reponsesAMC[ee],
                  param: {
                    digits: nombreDeChiffresDe(reponsesAMC[ee]),
                    decimals: nombreDeChiffresDansLaPartieDecimale(
                      reponsesAMC[ee],
                    ),
                    signe: false,
                    approx: approxAMC[ee],
                  },
                },
              },
            ],
          })
        }
      }

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
    }
    listeQuestionsToContenu(this)
  }
}
