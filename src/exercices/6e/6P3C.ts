import { texPrix } from '../../lib/format/style'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { texteExposant } from '../../lib/outils/ecritures'
import {
  miseEnEvidence,
  texteEnCouleur,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import {
  arrondi,
  nombreDeChiffresDansLaPartieDecimale,
  nombreDeChiffresDansLaPartieEntiere,
  nombreDeChiffresDe,
  rangeMinMax,
} from '../../lib/outils/nombres'
import { numAlpha, sp } from '../../lib/outils/outilString'
import { prenomF, prenomM } from '../../lib/outils/Personne'
import { stringNombre } from '../../lib/outils/texNombre'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre =
  'Résoudre des problèmes de proportionnalité en utilisant la linéarité simple'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

/**
 * On donne une relation de proportionnalité du type n objets coûtent x€ et on demande le prix de y objets
 * et le nombre d'objets qu'on peut acheter avec z€.
 * @author Jean-Claude Lhote
 * 03/2021 : ajout de situations de proportionnalité : CGrolleau
 * 08/2021 : Ajout de la version simplifiée et de la possibilité de choisir le type de question : Guillaume Valmont
 * Relecture : Décembre 2021 par EE
 */

let versionSimplifiee = false
let indexN: number = 0
const couplePremiersEntreEux: [number, number][] = [
  [3, 4],
  [3, 5],
  [3, 7],
  [6, 7],
  [3, 8],
  [7, 8],
  [7, 9],
  [3, 10],
  [7, 10],
  [9, 10],
  [3, 11],
  [6, 11],
  [7, 11],
  [9, 11],
  [7, 12],
  [9, 12],
  [11, 12],
  [3, 13],
  [6, 13],
  [7, 13],
  [9, 13],
  [11, 13],
  [12, 13],
] // Couples de nombres premiers entre eux

function questionAchat(exo: Exercice, i: number) {
  // questions d'origine du 6P11 : achat.
  const listeDeLieux: string[] = [
    'dans un magasin de bricolage',
    'dans une animalerie',
    'au supermarché local',
    "à l'épicerie",
    'dans la boutique du musée',
  ]
  const listeDeChoses: string[][] = [[]]
  const listeDePrixUnit: number[][] = [[]]
  listeDeChoses[0] = [
    'articles',
    'outils',
    'accessoires',
    "pièces d'outillage",
    'pinceaux',
    'ampoules',
    'tournevis',
    'spatules',
    'raccords de tuyaux',
  ]
  listeDeChoses[1] = [
    'poissons rouges',
    'cannetons',
    'perruches',
    'phasmes',
    'colliers anti-puces',
    'souris',
    'lapereaux',
    'paquets de graines',
  ]
  listeDeChoses[2] = [
    'sets de tables',
    'verres',
    'assiettes',
    'os à macher',
    'dosettes de café',
    'packs de lait',
    'paquets de pâtes',
  ]
  listeDeChoses[3] = [
    'mangues',
    'ananas',
    'fruits de la passion',
    'melons',
    'paquets de madeleines de Commercy',
    'bergamottes',
    'bredeles',
    'pots de cancoillotte',
  ]
  listeDeChoses[4] = [
    'cartes',
    'livres',
    'gravures',
    'puzzles',
    'maquettes',
    'roches',
    'jeux de société',
  ]
  listeDePrixUnit[0] = [5, 4, 1.25, 3, 0.5, 1.5, 2, 6, 4.5]
  listeDePrixUnit[1] = [1.5, 7, 20, 2.5, 25, 2, 15, 8]
  listeDePrixUnit[2] = [1.25, 1.5, 2, 0.5, 5, 4.5, 3]
  listeDePrixUnit[3] = [2, 2.5, 1.25, 1.5, 4, 7, 12, 3]
  listeDePrixUnit[4] = [0.5, 5, 7, 13.5, 10, 15, 20]
  const index1 = randint(0, 4)
  const prenoms = [prenomF(), prenomM()]
  const index2 = randint(0, listeDeChoses[index1].length - 1)
  const objet = listeDeChoses[index1][index2]
  const pu =
    listeDePrixUnit[index1][index2] * (1 + randint(1, 2) * 0.2 * randint(-1, 1))
  let n, x, y
  if (versionSimplifiee) {
    n = couplePremiersEntreEux[indexN][0]
    x = couplePremiersEntreEux[indexN][1]
    y = n * randint(2, 5)
  } else {
    n = randint(3, 6)
    x = n * pu
    y = n * randint(2, 5)
  }
  let met = false
  let p = null
  let z
  do {
    p = n * randint(2, 5)
    if (p !== y) {
      met = true
    }
  } while (met === false)
  if (versionSimplifiee) {
    z = x * randint(2, 5)
  } else {
    z = p * pu
  }
  let enonceAMC1 =
    `${numAlpha(0)} ${prenoms[0]} a repéré, ${listeDeLieux[index1]}, des ${objet} qui l'intéressent. ` +
    `Elle lit que ${n} ${objet} coûtent $${texPrix(x)}$${sp()}€. `
  let texte = enonceAMC1
  enonceAMC1 += `Elle veut en acheter ${y}.<br> Combien d'euros va-t-elle dépenser${sp()}? `
  texte += `Elle veut en acheter ${y}.<br> Combien va-t-elle dépenser${sp()}? `
  texte += ajouteChampTexteMathLive(exo, i, '', { texteApres: `${sp()}€` })
  let texteCorr =
    `${numAlpha(0)} ${y} ${objet}, c'est ${texteEnCouleur(
      stringNombre(y / n),
    )} fois ${texteEnCouleur(
      String(n),
      'blue',
    )} ${objet}.<br> Si ${texteEnCouleur(
      String(n),
      'blue',
    )} ${objet} coûtent $${texPrix(x)}$${sp()}€, alors ${texteEnCouleur(
      stringNombre(y / n),
    )} fois ${texteEnCouleur(
      String(n),
      'blue',
    )} ${objet} coûtent ${texteEnCouleur(
      stringNombre(y / n),
    )} fois $${texPrix(x)}$${sp()}€.<br>` +
    `${texteEnCouleur(
      stringNombre(y / n),
    )} $\\times$ ${texteEnCouleur(`$${texPrix(x)}$`, 'blue')}${sp()}€ = ${stringNombre((y * x) / n)}${sp()}€<br>` +
    `Conclusion : ${prenoms[0]} dépensera $${miseEnEvidence(texPrix((y * x) / n))}$${sp()}€.` +
    '<br>'
  const enonceAMC2 = `${numAlpha(1)} ${
    prenoms[1]
  } veut lui aussi acheter ces ${objet}. Il dispose de $${texPrix(z)}$${sp()}€.<br> Combien peut-il en acheter${sp()}?<br>`
  texte +=
    '<br>' +
    enonceAMC2 +
    ajouteChampTexteMathLive(exo, i + 1, '', { texteApres: ' ' + objet })
  texteCorr += `${numAlpha(1)} $${texPrix(z)}$${sp()}€, c'est ${texteEnCouleur(
    stringNombre(z / x),
  )} fois $${texPrix(x)}$${sp()}€.<br> Si avec $${texPrix(x)}$${sp()}€ on peut acheter ${texteEnCouleur(
    String(n),
    'blue',
  )} ${objet}, alors avec ${texteEnCouleur(
    stringNombre(z / x),
  )} fois $${texPrix(x)}$${sp()}€, on peut acheter ${texteEnCouleur(
    stringNombre(z / x),
  )} fois ${texteEnCouleur(String(n), 'blue')} ${objet}.<br>`
  texteCorr += `${texteEnCouleur(
    stringNombre(z / x),
  )} $\\times$ ${texteEnCouleur(String(n), 'blue')} = ${stringNombre((z * n) / x)}<br>`
  texteCorr +=
    `Conclusion : ${prenoms[1]} pourra acheter ${texteEnCouleurEtGras(stringNombre((z * n) / x))} ${objet}.` +
    '<br>'
  if (!context.isAmc) {
    setReponse(exo, i, ((y * x) / n).toFixed(2))
    setReponse(exo, i + 1, ((z * n) / x).toFixed(2))
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      options: { multicols: true, barreseparation: true },
      propositions: [
        {
          type: 'AMCNum',

          propositions: [
            {
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: enonceAMC1,
                valeur: [arrondi((y * x) / n, 2)],
                param: {
                  digits: nombreDeChiffresDe(arrondi((y * x) / n, 2)),
                  decimals: nombreDeChiffresDansLaPartieDecimale(
                    arrondi((y * x) / n, 2),
                  ),
                  signe: false,
                  approx: 0,
                },
              },
            },
          ],
        },
        {
          type: 'AMCNum',

          propositions: [
            {
              texte: '',
              statut: '',
              reponse: {
                texte: enonceAMC2,
                valeur: [arrondi((z * n) / x, 0)],
                param: {
                  digits: nombreDeChiffresDansLaPartieEntiere((z * n) / x, 0),
                  decimals: 0,
                  signe: false,
                  approx: 0,
                },
              },
            },
          ],
        },
      ],
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr,
  }
}

function questionRecette(exo: Exercice, i: number) {
  // questions avec des masses pour un nombre de personne dans des recettes correction : passage à l'unité
  let texte, texteCorr
  const liste = [
    // liste des ingrédients avec différentes recettes associées et masses
    {
      ingredient: 'farine',
      recettes: ['gâteau au citron', 'gaufres', 'crêpes', 'cake'],
      quantites_par_pers: [20, 25, 30, 35, 40, 50], // A voir pour l'instant quantités "simples".
    },
    {
      ingredient: 'sucre',
      recettes: ['gâteau', 'mousse au chocolat', 'pain perdu', 'riz au lait'],
      quantites_par_pers: [15, 20, 25, 30, 35],
    },
    {
      ingredient: 'chocolat',
      recettes: ['gâteau', 'mousse au chocolat', 'flan', 'riz au lait'],
      quantites_par_pers: [10, 15, 20, 25, 30, 35],
    },
    {
      ingredient: 'beurre',
      recettes: ['gâteau', 'mousse au chocolat'],
      quantites_par_pers: [10, 12, 15, 18],
    },
  ]
  const nbPersonneInit = randint(2, 6) // nombre de personnes indiqué dans la recette.
  const alea4 = randint(2, 5)
  const nbPersonneFinal = nbPersonneInit * alea4 // nombre de personnes pour lequel on veut cuisiner
  const alea1 = randint(0, 3) // pour le choix de l'ingredient
  const alea2 = randint(0, liste[alea1].recettes.length - 1) // pour le choix de la recette
  const alea3 = randint(0, liste[alea1].quantites_par_pers.length - 1) // pour le choix de la quantité par personne.
  const quantite = liste[alea1].quantites_par_pers[alea3] * nbPersonneInit // Calcul de la quantité dans la recette à partir de la qtt/personne et du nb de personnes
  const quantite2 = quantite * randint(2, 5, [alea4])
  const quantiteReponse =
    liste[alea1].quantites_par_pers[alea3] * nbPersonneFinal // Pour la correction
  const prenoms = [prenomF(), prenomM()] // Choix de prénoms pour l'énoncé
  let enonceAMC1 =
    `${numAlpha(0)} ${prenoms[0]} lit sur sa recette de ${liste[alea1].recettes[alea2]} pour ${nbPersonneInit} personnes qu'il faut ${quantite}${sp()}g de ${liste[alea1].ingredient}. ` +
    `Elle veut adapter sa recette pour ${nbPersonneFinal} personnes.`
  texte = enonceAMC1
  enonceAMC1 += `<br> Quelle masse, en${sp()}g, de ${liste[alea1].ingredient} doit-elle prévoir${sp()}? `
  texte += `<br> Quelle masse de ${liste[alea1].ingredient} doit-elle prévoir${sp()}? `
  texte += ajouteChampTexteMathLive(exo, i, '', { texteApres: ' g' })
  texteCorr =
    `${numAlpha(0)} ${nbPersonneFinal} personnes, c'est ${texteEnCouleur(String(nbPersonneFinal / nbPersonneInit))} fois ${nbPersonneInit} personnes. ` +
    `Il faut donc ${texteEnCouleur(String(nbPersonneFinal / nbPersonneInit))} fois plus de ${liste[alea1].ingredient}.<br>` +
    `${quantite}${sp()}g $\\times $ ${texteEnCouleur(String(nbPersonneFinal / nbPersonneInit))} = ${quantiteReponse}${sp()}g. <br>` +
    `Conclusion : ${prenoms[0]} doit utiliser ${texteEnCouleurEtGras(quantiteReponse)}${sp()}g de ${liste[alea1].ingredient} pour ${nbPersonneFinal} personnes.<br>`
  const enonceAMC2 = `${numAlpha(1)} ${prenoms[1]} utilise la même recette de ${liste[alea1].recettes[alea2]}. Il dispose de ${quantite2}${sp()}g de ${liste[alea1].ingredient}.
  Pour combien de personnes au maximum peut-il cuisiner${sp()}?`
  texte +=
    '<br> ' +
    enonceAMC2 +
    ajouteChampTexteMathLive(exo, i + 1, '', { texteApres: ' personnes' })
  texteCorr +=
    `${numAlpha(1)} ${quantite2}${sp()}g, c'est ${texteEnCouleur(String(quantite2 / quantite))} fois ${quantite}${sp()}g. ` +
    `${prenoms[1]} peut donc cuisiner pour ${texteEnCouleur(String(quantite2 / quantite))} fois plus de personnes.<br>` +
    `${nbPersonneInit}${sp()}g $\\times $ ${texteEnCouleur(String(quantite2 / quantite))} = ${(nbPersonneInit * quantite2) / quantite}. <br>` +
    `Conclusion : ${prenoms[1]} peut donc préparer sa recette pour ${texteEnCouleurEtGras((nbPersonneInit * quantite2) / quantite)} personnes.`
  if (!context.isAmc) {
    setReponse(exo, i, quantiteReponse)
    setReponse(exo, i + 1, ((nbPersonneInit * quantite2) / quantite).toFixed(3))
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      options: { multicols: true, barreseparation: true },
      propositions: [
        {
          type: 'AMCNum',

          propositions: [
            {
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: enonceAMC1,
                valeur: [quantiteReponse],
                param: {
                  digits: nombreDeChiffresDe(quantiteReponse),
                  decimals:
                    nombreDeChiffresDansLaPartieDecimale(quantiteReponse),
                  signe: false,
                  approx: 0,
                },
              },
            },
          ],
        },
        {
          type: 'AMCNum',

          propositions: [
            {
              texte: '',
              statut: '',
              reponse: {
                texte: enonceAMC2,
                valeur: [((nbPersonneInit * quantite2) / quantite).toFixed(3)],
                param: {
                  digits: nombreDeChiffresDansLaPartieEntiere(
                    (nbPersonneInit * quantite2) / quantite,
                  ),
                  decimals: 0,
                  signe: false,
                  approx: 0,
                },
              },
            },
          ],
        },
      ],
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr,
  }
}
/*
function questionDillution (exo:Exercice, i:number) { // questions de mélange de volumes
  let uniteSolvantVolumeFinal
  const liste = [
    {
      solute: 'sirop',
      volumeUnitaire: [12, 15, 18, 20],
      unite_solute: 'cL',
      unite_solvant: ['L', 'L'] // liste pour [0] singulier [1] pluriel
    },
    {
      solute: 'nettoyant pour sol',
      volumeUnitaire: [5, 8, 10, 12],
      unite_solute: 'cL',
      unite_solvant: ['L', 'L']
    },
    {
      solute: 'médicament',
      volumeUnitaire: [3, 3.5, 4, 4.5, 5, 7.5],
      unite_solute: 'mL',
      unite_solvant: ['dL', 'dL']
    },
    {
      solute: 'produit pour piscine',
      volumeUnitaire: [1, 1.2, 0.8, 1.5],
      unite_solute: 'L',
      unite_solvant: ['dizaine de mètres cubes', 'dizaines de mètres cubes']
    }
  ]
  const alea1 = randint(0, 3) // pour le choix du soluté
  const alea2 = randint(0, liste[alea1].volumeUnitaire.length - 1) // pour le choix du volume pour une unité de solvant
  let volumeInitial, quantite
  if (versionSimplifiee) {
    volumeInitial = couplePremiersEntreEux[indexN][0]
    quantite = couplePremiersEntreEux[indexN][1]
  } else {
    volumeInitial = randint(1, 5) + (randint(1, 5)) * 0.1 * randint(-1, 1, [0]) // volume d'eau pour la préparation
    quantite = liste[alea1].volumeUnitaire[alea2] * volumeInitial
  }
  const volumeFinal = volumeInitial * randint(2, 5)
  if (volumeFinal < 2) {
    uniteSolvantVolumeFinal = liste[alea1].unite_solvant[0]
  } else {
    uniteSolvantVolumeFinal = liste[alea1].unite_solvant[1]
  }
  const volumeFinalAff = stringNombre(volumeFinal) // pour affichage avec bon séparateur.
  const volumeInitialAff = stringNombre(volumeInitial) // pour affichage avec bon séparateur.
  let enonceAMC = `Il est indiqué sur la bouteille de ${liste[alea1].solute}  qu'il faut ` +
        ` ${stringNombre(quantite)}${sp()}${liste[alea1].unite_solute} de  ${liste[alea1].solute} pour $${volumeInitialAff}$ `
  enonceAMC += volumeInitial < 2 ? `${liste[alea1].unite_solvant[0]} d'eau.<br> ` : `${liste[alea1].unite_solvant[1]} d'eau.<br>`
  enonceAMC += `On veut utiliser $${volumeFinalAff}$ ${uniteSolvantVolumeFinal} d'eau. `
  let texte = enonceAMC
  enonceAMC += `Quel volume, en${sp()}${liste[alea1].unite_solute}, de ${liste[alea1].solute} doit-on prévoir${sp()}? `
  texte += `Quel volume de ${liste[alea1].solute} doit-on prévoir${sp()}? `
  texte += ajouteChampTexteMathLive(exo, i, '', { texteApres: ' ' + liste[alea1].unite_solute })
  const texteCorr = `Le volume de ${liste[alea1].solute} est proportionnel au volume d'eau. <br> ` +
        ` ${texteEnCouleur(volumeFinalAff)} ${uniteSolvantVolumeFinal} d'eau, c'est ${texteEnCouleur(stringNombre(volumeFinal / volumeInitial))} fois ${volumeInitialAff} ${liste[alea1].unite_solvant[0]} d'eau. <br> ` +
        `Il faut donc ${texteEnCouleur(stringNombre(volumeFinal / volumeInitial))} fois plus que ${texteEnCouleur(stringNombre(quantite), 'blue')}${sp()}${liste[alea1].unite_solute} de ${liste[alea1].solute}. <br>` +
        `${texteEnCouleur(stringNombre(quantite), 'blue')}${sp()}${liste[alea1].unite_solute} $\\times $ ${texteEnCouleur(stringNombre(volumeFinal / volumeInitial))} = ${stringNombre(quantite * volumeFinal / volumeInitial)}${sp()}${liste[alea1].unite_solute}  <br>` +
        `Conclusion : Il faut donc prévoir ${texteEnCouleurEtGras(stringNombre(quantite * volumeFinal / volumeInitial))}${sp()}${liste[alea1].unite_solute} de ${liste[alea1].solute}.`
  if (!context.isAmc) {
    setReponse(exo, i, (quantite * volumeFinal / volumeInitial).toFixed(3))
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      // options: { multicols: true, barreseparation: true },
      propositions: [
        {
          type: 'AMCNum',

          propositions: [{
            texte: texteCorr,
            statut: '',
            reponse: {
              texte: enonceAMC,
              valeur: [(quantite * volumeFinal / volumeInitial).toFixed(3)],
              param: {
                digits: nombreDeChiffresDe(arrondi(quantite * volumeFinal / volumeInitial, 3)),
                decimals: nombreDeChiffresDansLaPartieDecimale((quantite * volumeFinal / volumeInitial).toFixed(3)),
                signe: false,
                approx: 0
              }
            }
          }]
        }
      ]
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr
  }
}
*/
function questionDistance(exo: Exercice, i: number) {
  // questions de distance parcourue à une vitesse moyenne donnée
  let texte, texteCorr
  const liste = [
    // liste des "moyens de locomotion" et vitesses associées
    {
      locomotion: 'piéton',
      vitesse: [3, 3.5, 4, 4.5],
    },
    {
      locomotion: 'cycliste',
      vitesse: [12, 15, 16, 17, 18, 20, 22],
    },
    {
      locomotion: 'camion',
      vitesse: [75, 77.5, 80, 82.5, 85],
    },
    {
      locomotion: 'train',
      vitesse: [125, 150, 175, 185, 195],
    },
  ]
  const alea1 = randint(0, 3) // pour le choix de locomotion
  const duree = [
    {
      temps: '15 minutes',
      rapport: 0.25,
    },
    {
      temps: '30 minutes',
      rapport: 0.5,
    },
    {
      temps: '45 minutes',
      rapport: 0.75,
    },
    {
      temps: '1 heure et demie',
      rapport: 1.5,
    },
    {
      temps: '2 heures',
      rapport: 2,
    },
    {
      temps: '2 heures et demie',
      rapport: 2.5,
    },
    {
      temps: '3 heures',
      rapport: 3,
    },
  ]
  /* if (versionSimplifiee) {
    const alea1 = randint(0, 3) // pour le choix de locomotion
    let dureeQ, distance
    if (alea1 === 0) { // Si piéton
      const indice = randint(0, 3)
      dureeQ = couplePremiersEntreEux[indice][0]
      distance = couplePremiersEntreEux[indice][1] * (couplePremiersEntreEux[indice][0] + 1)
    } else {
      dureeQ = couplePremiersEntreEux[indexN][0]
      distance = couplePremiersEntreEux[indexN][1] * 2 * alea1 * alea1 * (couplePremiersEntreEux[indexN][0] + 1)
    }
    const dureeR = dureeQ * randint(2, 5)
    let enonceAMC = `Un ${liste[alea1].locomotion} parcourt en moyenne ${stringNombre(distance)}${sp()}km en ${dureeQ} heures.`
    texte = enonceAMC
    enonceAMC += `<br> Quelle distance, en${sp()}km, va-t-il parcourir, à la même vitesse en ${dureeR} heures${sp()}?`
    texte += `<br> Quelle distance va-t-il parcourir, à la même vitesse en ${dureeR} heures${sp()}?` + ajouteChampTexteMathLive(exo, i, '', { texteApres: ' km' })
    texteCorr = `${texteEnCouleur(String(dureeR))} heures, c'est ${texteEnCouleur(String(dureeR / dureeQ))} fois ${dureeQ} heures.<br> ` +
            `Le ${liste[alea1].locomotion} parcourra donc ${texteEnCouleur(String(dureeR / dureeQ))} fois plus de distance qu'en ${dureeQ} heures.<br>` +
            `${stringNombre(distance)}${sp()}km $\\times $ ${texteEnCouleur(String(dureeR / dureeQ))} = ${stringNombre(distance * dureeR / dureeQ)}${sp()}km.<br>` +
    `Conclusion : Le ${liste[alea1].locomotion} parcourra ${texteEnCouleurEtGras(stringNombre(distance * dureeR / dureeQ))}${sp()}km à la même vitesse en ${dureeR} heures.`
    if (!context.isAmc) {
      setReponse(exo, i, (distance * dureeR / dureeQ).toFixed(3))
    } else {
      exo.autoCorrection[i] = {
        enonce: '',
        enonceAvant: false,
        propositions: [
          {
            type: 'AMCNum',

            propositions: [{
              texte: texteCorr,
              statut: '',
              reponse: {
                texte,
                valeur: [arrondi(distance * dureeR / dureeQ, 3)],
                param: {
                  digits: nombreDeChiffresDe(arrondi(distance * dureeR / dureeQ, 3)),
                  decimals: nombreDeChiffresDansLaPartieDecimale((distance * dureeR / dureeQ).toFixed(3)),
                  signe: false,
                  approx: 0
                }
              }
            }]
          }
        ]
      }
    }
  } else {
   */
  const alea2 = randint(0, liste[alea1].vitesse.length - 1) // pour le choix du temps passé
  const rapportQuestion2 = versionSimplifiee
    ? rangeMinMax(2, 5)
    : [0.25, 0.5, 0.75, 1.25, 1.5, 2]
  let alea3 = randint(0, rapportQuestion2.length - 1)
  while (duree[alea2].rapport === rapportQuestion2[alea3]) {
    alea3 = randint(0, rapportQuestion2.length - 1)
  }
  const reponseQ1 = duree[alea2].rapport * liste[alea1].vitesse[alea2]
  const distance = stringNombre(
    rapportQuestion2[alea3] * liste[alea1].vitesse[alea2],
  ) // pour question 2
  let enonceAMC1 = `${numAlpha(0)} Un ${liste[alea1].locomotion} parcourt en moyenne ${stringNombre(liste[alea1].vitesse[alea2])}${sp()}km en une heure.<br>`
  texte = enonceAMC1
  enonceAMC1 += `Quelle distance, en${sp()}km, va-t-il parcourir, à la même vitesse, en ${duree[alea2].temps}${sp()}? `
  texte += `Quelle distance va-t-il parcourir, à la même vitesse, en ${duree[alea2].temps}${sp()}? `
  texte += ajouteChampTexteMathLive(exo, i, '', { texteApres: ' km' })
  texteCorr =
    `${numAlpha(0)} ${duree[alea2].temps}, c'est ${texteEnCouleur(stringNombre(duree[alea2].rapport))} fois une heure.<br> ` +
    `En une heure, le ${liste[alea1].locomotion} parcourt ${texteEnCouleur(stringNombre(liste[alea1].vitesse[alea2]), 'blue')}${sp()}km donc en ${duree[alea2].temps}, il va parcourir ${texteEnCouleur(stringNombre(duree[alea2].rapport))} fois ${texteEnCouleur(stringNombre(liste[alea1].vitesse[alea2]), 'blue')}${sp()}km. <br>` +
    `${texteEnCouleur(stringNombre(duree[alea2].rapport))} $\\times$ ${texteEnCouleur(stringNombre(liste[alea1].vitesse[alea2]), 'blue')}${sp()}km = ${stringNombre(reponseQ1)}${sp()}km <br>` +
    ` Conclusion : Le ${liste[alea1].locomotion} va donc parcourir ${texteEnCouleurEtGras(stringNombre(reponseQ1))}${sp()}km.` +
    '<br>'
  const enonceAMC2 = `${numAlpha(1)} Combien de temps, en minutes, va-t-il mettre pour parcourir ${distance}${sp()}km à cette même vitesse${sp()}? `
  texte +=
    `<br> ${numAlpha(1)} Combien de temps va-t-il mettre pour parcourir ${distance}${sp()}km à cette même vitesse${sp()}? ` +
    ajouteChampTexteMathLive(exo, i + 1, '', { texteApres: ' minutes' })
  texteCorr +=
    `${numAlpha(1)} ${distance}${sp()}km, c'est ${texteEnCouleur(stringNombre(rapportQuestion2[alea3]))} fois ${stringNombre(liste[alea1].vitesse[alea2])}${sp()}km.
      Le ${liste[alea1].locomotion} parcourt ${stringNombre(liste[alea1].vitesse[alea2])}${sp()}km en une heure. <br>` +
    `Il va mettre donc ${texteEnCouleur(stringNombre(rapportQuestion2[alea3]))} fois une heure à parcourir ${distance}${sp()}km. <br>` +
    `Conclusion : Le ${liste[alea1].locomotion} va donc mettre  ${stringNombre(rapportQuestion2[alea3])} heure${rapportQuestion2[alea3] >= 2 ? 's' : ''} à parcourir ${distance}${sp()}km,  ce qui fait ${texteEnCouleurEtGras(rapportQuestion2[alea3] * 60)} minutes (${stringNombre(rapportQuestion2[alea3])} $\\times$ 60 minutes).`
  if (!context.isAmc) {
    setReponse(exo, i, reponseQ1)
    setReponse(exo, i + 1, (rapportQuestion2[alea3] * 60).toFixed(2))
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      options: { multicols: true, barreseparation: true },
      propositions: [
        {
          type: 'AMCNum',

          propositions: [
            {
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: enonceAMC1,
                valeur: [reponseQ1],
                param: {
                  digits: nombreDeChiffresDe(reponseQ1),
                  decimals: nombreDeChiffresDansLaPartieDecimale(reponseQ1),
                  signe: false,
                  approx: 0,
                },
              },
            },
          ],
        },
        {
          type: 'AMCNum',

          propositions: [
            {
              texte: '',
              statut: '',
              reponse: {
                texte: enonceAMC2,
                valeur: [arrondi(rapportQuestion2[alea3] * 60, 2)],
                param: {
                  digits: nombreDeChiffresDe(
                    arrondi(rapportQuestion2[alea3] * 60, 2),
                  ),
                  decimals: nombreDeChiffresDansLaPartieDecimale(
                    arrondi(rapportQuestion2[alea3] * 60, 2),
                  ),
                  signe: false,
                  approx: 0,
                },
              },
            },
          ],
        },
      ],
    }
  }
  // }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr,
  }
}

function questionEchelle(exo: Exercice, i: number) {
  // X cm sur une carte correspond à x km dans la réalité...
  let texte, texteCorr
  const distanceCarte = couplePremiersEntreEux[indexN][0] // Choix d'un nombre de cm sur la carte
  const distanceReel = couplePremiersEntreEux[indexN][1] // Choix d'un nombre de km dans la réalité (on évite d'avoir 1cm pour 1km)
  const rapport = [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4, 5] // rapport entre la référence et la question (rapports simples car niveau 6eme)
  const alea1 = randint(0, rapport.length - 1)
  const alea2 = randint(0, rapport.length - 1, [alea1])
  if (versionSimplifiee) {
    rapport[alea1] = randint(2, 5)
    rapport[alea2] = randint(2, 5, [rapport[alea1]])
  }
  const distanceCarte2 = stringNombre(rapport[alea1] * distanceCarte, 2)
  const distanceReelQ2 = stringNombre(rapport[alea2] * distanceReel, 2)
  const prenoms = [prenomF(), prenomM()]
  texte = `${numAlpha(0)} Sur une carte sur laquelle ${distanceCarte} cm représente ${distanceReel}${sp()}km dans la réalité,
${prenoms[0]} mesure son trajet et elle trouve une distance de ${distanceCarte2} cm. <br>`
  const enonceAMC1 =
    texte +
    `À quelle distance, en${sp()}km, cela correspond dans la réalité${sp()}?`
  texte +=
    `À quelle distance cela correspond dans la réalité${sp()}? ` +
    ajouteChampTexteMathLive(exo, i, '', { texteApres: ' km' })
  texteCorr =
    `${numAlpha(0)} ${distanceCarte2} cm, c'est ${texteEnCouleur(stringNombre(rapport[alea1]))} fois ${distanceCarte} cm. <br>
Dans la réalité, ${distanceCarte} cm correspond à ${texteEnCouleur(String(distanceReel), 'blue')}${sp()}km donc` +
    `  ${distanceCarte2} cm va correspondre à ${texteEnCouleur(stringNombre(rapport[alea1]))} fois ${texteEnCouleur(String(distanceReel), 'blue')}${sp()}km.  <br>` +
    `${texteEnCouleur(stringNombre(rapport[alea1]))} $\\times$ ${texteEnCouleur(String(distanceReel), 'blue')}${sp()}km = ${stringNombre(rapport[alea1] * distanceReel, 2)}${sp()}km <br>` +
    `Conclusion : Le trajet de ${prenoms[0]} est de ${texteEnCouleurEtGras(stringNombre(rapport[alea1] * distanceReel, 2))}${sp()}km.<br>`
  let enonceAMC2 = `${numAlpha(1)} Deux villes sont distantes de ${distanceReelQ2}${sp()}km. `
  texte += '<br> ' + enonceAMC2
  enonceAMC2 += `Quelle distance, en cm, va-t-on mesurer sur la carte entre ces deux villes${sp()}?`
  texte +=
    `Quelle distance va-t-on mesurer sur la carte entre ces deux villes${sp()}?` +
    ajouteChampTexteMathLive(exo, i + 1, '', { texteApres: ' cm' })
  texteCorr +=
    `${numAlpha(1)} ${distanceReelQ2}${sp()}km, c'est ${texteEnCouleur(stringNombre(rapport[alea2]))} fois ${distanceReel}${sp()}km.
Or ${distanceReel}${sp()}km est représenté par ${texteEnCouleur(String(distanceCarte), 'blue')} cm sur la carte. <br>` +
    `Donc ${distanceReelQ2}${sp()}km est représenté par ${texteEnCouleur(stringNombre(rapport[alea2]))} fois ${texteEnCouleur(String(distanceCarte), 'blue')} cm sur la carte. <br>` +
    `${texteEnCouleur(stringNombre(rapport[alea2]))} $\\times$ ${texteEnCouleur(String(distanceCarte), 'blue')} cm = ${stringNombre(rapport[alea2] * distanceCarte, 2)} cm <br>` +
    `Conclusion : Les deux villes sont séparées de ${texteEnCouleurEtGras(stringNombre(rapport[alea2] * distanceCarte, 2))} cm sur la carte.`
  if (!context.isAmc) {
    setReponse(exo, i, (rapport[alea1] * distanceReel).toFixed(2))
    setReponse(exo, i + 1, (rapport[alea2] * distanceCarte).toFixed(2))
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      options: { multicols: true, barreseparation: true },
      propositions: [
        {
          type: 'AMCNum',

          propositions: [
            {
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: enonceAMC1,
                valeur: [arrondi(rapport[alea1] * distanceReel, 2)],
                param: {
                  digits: nombreDeChiffresDe(
                    arrondi(rapport[alea1] * distanceReel, 2),
                  ),
                  decimals: nombreDeChiffresDansLaPartieDecimale(
                    arrondi(rapport[alea1] * distanceReel, 2),
                  ),
                  signe: false,
                  approx: 0,
                },
              },
            },
          ],
        },
        {
          type: 'AMCNum',

          propositions: [
            {
              texte: '',
              statut: '',
              reponse: {
                texte: enonceAMC2,
                valeur: [arrondi(rapport[alea2] * distanceCarte, 2)],
                param: {
                  digits: nombreDeChiffresDe(
                    arrondi(rapport[alea2] * distanceCarte, 2),
                  ),
                  decimals: nombreDeChiffresDansLaPartieDecimale(
                    arrondi(rapport[alea2] * distanceCarte, 2),
                  ),
                  signe: false,
                  approx: 0,
                },
              },
            },
          ],
        },
      ],
    }
  }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr,
  }
}

function questionRecouvrirSurface(exo: Exercice, i: number) {
  // peinture, gazon, carrelage pour une surface donnée.
  let texte, texteCorr
  const liste = [
    {
      matiere: 'de la peinture',
      unite: 'L',
      qtt_matiere_unitaire: [0.5, 1, 1.5, 2], // quantité au m²
      qtt_surface: [10, 25, 15], // nombre de m² indiqués sur l'emballage
    },
    {
      matiere: 'du gazon',
      unite: 'kg',
      qtt_matiere_unitaire: [2.5, 3, 5, 10],
      qtt_surface: [200, 175, 150],
    },
    {
      matiere: 'du carrelage',
      unite: 'carreaux',
      qtt_matiere_unitaire: [24, 40, 60, 100],
      qtt_surface: [10, 20, 5],
    },
  ]
  const prenoms = [prenomF(), prenomM()]
  /* if (versionSimplifiee) {
    const alea1 = 2 // Pour avoir un coef entier, qtt_matiere_unitaire doit être plus grand que qtt_surface, ce qui n'est possible qu'avec les carreaux
    const quantiteD = couplePremiersEntreEux[indexN][1]
    const surfaceD = couplePremiersEntreEux[indexN][0]
    const coef = randint(2, 5)
    const quantiteF = quantiteD * coef
    const surfaceF = surfaceD * coef
    const enonceAMC = `${prenoms[0]} doit acheter ${liste[alea1].matiere}. ` +
            `Sur la notice, il est indiqué de prévoir ${quantiteD}${sp()}${liste[alea1].unite} pour ${surfaceD}${sp()}m${texteExposant(2)}. <br> ` +
            `Combien de${sp()}${liste[alea1].unite} doit-elle en acheter pour une surface de ${surfaceF}${sp()}m${texteExposant(2)}${sp()}?`
    texte = enonceAMC + ajouteChampTexteMathLive(exo, i, '', { texteApres: ' ' + liste[alea1].unite })
    texteCorr = `${stringNombre(surfaceF)}${sp()}m${texteExposant(2)}, c'est ${texteEnCouleur(String(coef))} fois ${surfaceD}${sp()}m${texteExposant(2)} <br>` +
            `Il va donc falloir ${texteEnCouleur(String(coef))} fois ${texteEnCouleur(String(quantiteD), 'blue')}${sp()}${liste[alea1].unite} pour ${stringNombre(surfaceF)}${sp()}m${texteExposant(2)}. <br>` +
            `${texteEnCouleur(String(coef))} $\\times$ ${texteEnCouleur(String(quantiteD), 'blue')}${sp()}${liste[alea1].unite} = ${stringNombre(quantiteF)}${sp()}${liste[alea1].unite}<br>` +
            `Conclusion : ${prenoms[0]} doit en acheter ${texteEnCouleurEtGras(quantiteF)}${sp()}${liste[alea1].unite}.` + '<br>  '
    if (!context.isAmc) {
      setReponse(exo, i, quantiteF)
    } else {
      exo.autoCorrection[i] = {
        enonce: '',
        enonceAvant: false,
        propositions: [
          {
            type: 'AMCNum',

            propositions: [{
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: enonceAMC,
                valeur: [quantiteF],
                param: {
                  digits: nombreDeChiffresDe(quantiteF),
                  decimals: nombreDeChiffresDansLaPartieDecimale(quantiteF),
                  signe: false,
                  approx: 0
                }
              }
            }]
          }
        ]
      }
    }
  } else {
   */
  const alea1 = randint(0, liste.length - 1)
  const alea2 = randint(0, liste[alea1].qtt_matiere_unitaire.length - 1)
  const alea3 = randint(0, liste[alea1].qtt_surface.length - 1)
  const rapport = versionSimplifiee
    ? rangeMinMax(2, 5)
    : [0.25, 0.5, 0.75, 1.25, 1.5, 2, 3, 4, 5] // choix parmi des rapports simples (en 6eme cela paraît suffisant)
  const quantite = liste[alea1].qtt_matiere_unitaire[alea2]
  const alea4 = randint(0, rapport.length - 1)
  const surfaceFinale = rapport[alea4] * liste[alea1].qtt_surface[alea3]
  const alea5 = randint(0, rapport.length - 1, [alea4])
  const quantite2 = rapport[alea5] * liste[alea1].qtt_matiere_unitaire[alea2]
  const alea6 = randint(-2, 2, [0])
  const surfaceFinale2 =
    rapport[alea5] * liste[alea1].qtt_surface[alea3] + alea6
  const qttaffichage = stringNombre(quantite) // Pour affichage avec virgule en séparateur.
  const enonceAMC1 =
    `${numAlpha(0)} ${prenoms[0]} doit acheter ${liste[alea1].matiere}. ` +
    `Sur la notice, il est indiqué de prévoir ${qttaffichage}${sp()}${liste[alea1].unite} pour ${liste[alea1].qtt_surface[alea3]}${sp()}m${texteExposant(2)}. <br> ` +
    `Combien de${sp()}${liste[alea1].unite} doit-elle en acheter pour une surface de ${stringNombre(surfaceFinale)}${sp()}m${texteExposant(2)}${sp()}?`
  texte =
    enonceAMC1 +
    ajouteChampTexteMathLive(exo, i, '', {
      texteApres: ' ' + liste[alea1].unite,
    })
  texteCorr =
    `${numAlpha(0)} ${stringNombre(surfaceFinale)}${sp()}m${texteExposant(2)}, c'est ${texteEnCouleur(stringNombre(rapport[alea4]))} fois ${liste[alea1].qtt_surface[alea3]}${sp()}m${texteExposant(2)}. <br>` +
    `Il va donc falloir ${texteEnCouleur(stringNombre(rapport[alea4]))} fois ${texteEnCouleur(qttaffichage, 'blue')}${sp()}${liste[alea1].unite} pour ${stringNombre(surfaceFinale)}${sp()}m${texteExposant(2)}. <br>` +
    `${texteEnCouleur(stringNombre(rapport[alea4]))} $\\times$ ${texteEnCouleur(qttaffichage, 'blue')}${sp()}${liste[alea1].unite} = ${stringNombre(rapport[alea4] * quantite, 3)}${sp()}${liste[alea1].unite}<br>` +
    `Conclusion : ${prenoms[0]} doit acheter ${texteEnCouleurEtGras(stringNombre(rapport[alea4] * quantite, 3))}${sp()}${liste[alea1].unite}.` +
    '<br>  '
  const enonceAMC2 =
    `${numAlpha(1)} ${prenoms[1]} a acheté ${liste[alea1].matiere}. Il lui en reste ${stringNombre(quantite2)}${sp()}${liste[alea1].unite}. Sur la notice, il est aussi indiqué de prévoir ${qttaffichage}${sp()}${liste[alea1].unite} pour ${stringNombre(liste[alea1].qtt_surface[alea3])}${sp()}m${texteExposant(2)}. <br>` +
    `En a-t-il suffisamment pour la surface de ${stringNombre(surfaceFinale2)}${sp()}m${texteExposant(2)} qu'il lui reste à faire${sp()}?<br>`
  texte +=
    '<br>' +
    enonceAMC2 +
    ajouteChampTexteMathLive(exo, i + 1, '', { texteApres: ' (oui ou non)' })
  texteCorr +=
    `${numAlpha(1)} ${stringNombre(quantite2)}${sp()}${liste[alea1].unite}, c'est ${texteEnCouleur(stringNombre(rapport[alea5]))} fois ${qttaffichage}${sp()}${liste[alea1].unite}. <br>` +
    `Avec ${stringNombre(quantite2)}${sp()}${liste[alea1].unite} on peut donc traiter une surface de ${texteEnCouleur(stringNombre(rapport[alea5]))}
fois ${texteEnCouleur(stringNombre(liste[alea1].qtt_surface[alea3]), 'blue')}${sp()}m${texteExposant(2)}. <br>` +
    `${texteEnCouleur(stringNombre(rapport[alea5]))} $\\times$ ${texteEnCouleur(stringNombre(liste[alea1].qtt_surface[alea3]), 'blue')}${sp()}m${texteExposant(2)} = ${stringNombre(rapport[alea5] * liste[alea1].qtt_surface[alea3], 3)}${sp()}m${texteExposant(2)}<br>`
  texteCorr +=
    rapport[alea5] * liste[alea1].qtt_surface[alea3] < surfaceFinale2
      ? `Conclusion : ${stringNombre(rapport[alea5] * liste[alea1].qtt_surface[alea3], 3)}${sp()}m${texteExposant(2)} < ${stringNombre(surfaceFinale2)}${sp()}m${texteExposant(2)} donc ${texteEnCouleurEtGras('non')}, ${prenoms[1]} n'en a pas assez pour ${stringNombre(surfaceFinale2)}${sp()}m${texteExposant(2)}.` +
        ' <br>'
      : `Conclusion : ${stringNombre(rapport[alea5] * liste[alea1].qtt_surface[alea3], 3)}${sp()}m${texteExposant(2)} > ${stringNombre(surfaceFinale2)}${sp()}m${texteExposant(2)} donc ${texteEnCouleurEtGras('oui')}, ${prenoms[1]} en a suffisamment pour ${stringNombre(surfaceFinale2)}${sp()}m${texteExposant(2)}.` +
        ' <br>'

  if (!context.isAmc) {
    setReponse(exo, i, (rapport[alea4] * quantite).toFixed(3))
    setReponse(
      exo,
      i + 1,
      rapport[alea5] * liste[alea1].qtt_surface[alea3] > surfaceFinale2
        ? 'oui'
        : 'non',
    )
  } else {
    exo.autoCorrection[i] = {
      enonce: '',
      enonceAvant: false,
      propositions: [
        {
          type: 'AMCNum',

          propositions: [
            {
              texte: texteCorr,
              statut: '',
              reponse: {
                texte: enonceAMC1,
                valeur: [arrondi(rapport[alea4] * quantite, 3)],
                param: {
                  digits: nombreDeChiffresDe(
                    arrondi(rapport[alea4] * quantite, 3),
                  ),
                  decimals: nombreDeChiffresDansLaPartieDecimale(
                    arrondi(rapport[alea4] * quantite, 3),
                  ),
                  signe: false,
                  approx: 0,
                },
              },
            },
          ],
        },
        {
          type: 'AMCOpen',

          propositions: [
            {
              enonce: enonceAMC2,
              statut: 2,
            },
          ],
        },
      ],
    }
  }
  // }
  return {
    qtexte: texte,
    qtexteCorr: texteCorr,
  }
}

// _______ Fin des fonctions correspondants aux situations problèmes _____

export const uuid = 'f7a14'

export const refs = {
  'fr-fr': ['BP2AutoL5', '6P3C'],
  'fr-2016': ['6P11', 'BP2AutoL5'],
  'fr-ch': ['9FA3-9'],
}
export default class ProportionnaliteParLinearite extends Exercice {
  constructor() {
    super()
    context.isHtml ? (this.spacing = 2) : (this.spacing = 1)
    context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)
    this.nbQuestions = 6

    this.besoinFormulaireCaseACocher = [
      'Version simplifiée ne comportant que des nombres entiers',
    ]
    this.sup = false
    this.besoinFormulaire2Texte = [
      'Type de questions',
      'Nombres séparés par des tirets :\n1 : Achat\n2 : Recette\n3 : Distance\n4 : Échelle\n5 : Surface\n6 : Mélange',
    ]
    this.sup2 = 7
  }

  nouvelleVersion() {
    let question
    context.isHtml ? (this.spacing = 2) : (this.spacing = 1)
    context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1)

    if (this.interactif) {
      this.consigne = ''
    } else {
      this.consigne =
        this.nbQuestions === 1
          ? 'Répondre à la question posée en justifiant.'
          : 'Répondre aux questions posées en justifiant.'
    }
    let incrementInteractif = 0
    let indiceChampTexte = 0

    const listeIndexSituations = gestionnaireFormulaireTexte({
      max: 5,
      defaut: 6,
      melange: 6,
      nbQuestions: this.nbQuestions,
      saisie: this.sup2,
    }).map(Number)

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      indexN = randint(0, couplePremiersEntreEux.length - 1)
      if (this.sup) {
        versionSimplifiee = true
      } else {
        versionSimplifiee = false
      }
      switch (listeIndexSituations[i]) {
        case 1:
          question = questionAchat(this, indiceChampTexte)
          if (!context.isAmc) {
            incrementInteractif = 2
          } else {
            incrementInteractif = 1
          }
          break
        case 2:
          question = questionRecette(this, indiceChampTexte)
          if (!context.isAmc) {
            incrementInteractif = 2
          } else {
            incrementInteractif = 1
          }
          break
        /* case 3:
          question = questionDillution(this, indiceChampTexte)
          incrementInteractif = 1
          break
          */
        case 3:
          question = questionDistance(this, indiceChampTexte)
          if (versionSimplifiee) {
            incrementInteractif = 1
          } else {
            if (!context.isAmc) {
              incrementInteractif = 2
            } else {
              incrementInteractif = 1
            }
          }
          break
        case 4:
          question = questionEchelle(this, indiceChampTexte)
          if (!context.isAmc) {
            incrementInteractif = 2
          } else {
            incrementInteractif = 1
          }
          break
        case 5:
        default:
          question = questionRecouvrirSurface(this, indiceChampTexte)
          if (versionSimplifiee) {
            incrementInteractif = 1
          } else {
            if (!context.isAmc) {
              incrementInteractif = 2
            } else {
              incrementInteractif = 1
            }
          }
          break
      }
      if (this.questionJamaisPosee(i, indexN, question.qtexteCorr)) {
        // Si la question n'a jamais été posée, on la garde.
        this.listeQuestions[i] = question.qtexte
        this.listeCorrections[i] = question.qtexteCorr
        i++
        indiceChampTexte += incrementInteractif
      }
      cpt++
    }
    listeQuestionsToContenu(this) // Espacement de 2 em entre chaque questions.
  }
}
