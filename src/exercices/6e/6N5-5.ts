import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'

import { propositionsQcm } from '../../lib/interactif/qcm'
import { stringNombre, texNombre } from '../../lib/outils/texNombre'
export const titre = 'Résoudre des problèmes (ordre de grandeurs)'
export const amcReady = true
export const interactifReady = true
export const interactifType = 'qcm'
export const amcType = 'qcmMono'
export const dateDeModifImportante = '23/06/2024'

/**
 * Résoudre des problèmes en choisissant la bonne réponse
 * @author Jean-Claude Lhote
 * 6C12-5
 */
export const uuid = '103a2'

export const refs = {
  'fr-fr': ['BP2AutoU5', '6N5-5'],
  'fr-2016': ['6C12-5', 'BP2AutoU5'],
  'fr-ch': ['9QCM-4', '10QCM-2'],
}

function piqueNique() {
  const a = choice([9, 11, 15, 5, 19, 21])
  const produit = choice(['sandwichs', 'boissons', 'fruits'])
  const s = randint(3, 6)
  const b = randint(3, 8, s)
  const f = randint(3, 10, [s, b])
  const [nbSandwichs, nbBoissons, nbFruits] = [s, b, f].map((n) => n * a)
  const nbProduit = produit === 'sandwichs' ? s : produit === 'boissons' ? b : f
  const [mr1, mr2, mr3, mr4] = [
    nbProduit + 4,
    nbProduit - 2,
    nbProduit + 6,
    nbProduit + 2,
  ]

  return {
    contexte: `Un groupe de ${a} amis décide de faire un pique-nique.<br>`,
    question: `Ils achètent ${nbSandwichs} sandwichs, ${nbBoissons} boissons et ${nbFruits} fruits.<br><br>Combien de ${produit} chaque ami aura-t-il en moyenne ?<br>`,
    reponses: [nbProduit, mr1, mr2, mr3, mr4],
    reponseRedigee: `En moyenne chaque ami aura ${nbProduit} ${produit}, car $${a}\\times ${nbProduit}=${a * nbProduit}$<br>`,
  }
}

function carrelage() {
  const L = randint(8, 15)
  const l = randint(6, L - 1)
  const s = L * l
  const [mr1, mr2, mr3, mr4] = [l + L, (l + L) * 2, s * 2, s * 10]

  return {
    contexte: `Une salle de classe mesure ${L} mètres de long et ${l} mètres de large.<br>Les élèves veulent poser du carrelage au sol.<br>`,
    question:
      'Si un carreau mesure 1 mètre carré, combien de carreaux leur faudra-t-il pour couvrir toute la surface ?<br>',
    reponses: [s, mr1, mr2, mr3, mr4],
    reponseRedigee: `Il faudra ${s} carreaux, car la surface de la salle est de $${l}\\times ${L}=${s}m^2$.<br>`,
  }
}

function bibliotheque() {
  const nbEtageres = randint(5, 15) * 10
  const nbLivresParEtagere = choice([50, 75, 100, 150])
  const nbLivres = nbEtageres * nbLivresParEtagere
  const [mr1, mr2, mr3, mr4] = [
    nbEtageres * 10,
    nbEtageres * 5,
    nbEtageres / 10,
    nbEtageres / 5,
  ]

  return {
    contexte: `Une bibliothèque a ${nbLivres} livres. Chaque étagère peut contenir ${nbLivresParEtagere} livres.<br>`,
    question:
      "Combien d'étagères sont nécessaires pour ranger tous les livres ?<br>",
    reponses: [nbEtageres, mr1, mr2, mr3, mr4],
    reponseRedigee: `Il faudra ${nbEtageres} étagères, car $${nbEtageres}\\times ${nbLivresParEtagere}=${nbLivres}$.<br>`,
  }
}
function camion() {
  const masseParCaisse = randint(2, 10) * 2
  const chargeMaxi = choice([1000, 2000, 4000, 10000])
  const nbCaisses = Math.floor(chargeMaxi / masseParCaisse / 10) * 10
  const [mr1, mr2, mr3, mr4] = [
    Math.round(nbCaisses / 100) * 10,
    Math.round(nbCaisses / 200) * 10,
    nbCaisses * 10,
    nbCaisses * 100,
  ]

  return {
    contexte: `Un camion transporte des caisses de fruits.<br>Chaque caisse pèse environ ${masseParCaisse} kg.<br>Le camion peut transporter un maximum de ${chargeMaxi} kg.<br>`,
    question:
      'Combien de caisses de fruits le camion peut-il transporter au maximum ?<br>',
    reponses: [nbCaisses, mr1, mr2, mr3, mr4],
    reponseRedigee: `Le camion pourra transporter environ ${nbCaisses} caisses, car  $${nbCaisses}\\times ${masseParCaisse}=${nbCaisses * masseParCaisse}$ et $${nbCaisses * masseParCaisse}<${chargeMaxi}$.<br>`,
  }
}

function agriculteur() {
  const nbRangees = randint(8, 15) * 2
  const nbArbresParRangee = randint(2, 4) * 10 - randint(1, 2)
  const nbArbres = nbRangees * nbArbresParRangee
  const [mr1, mr2, mr3, mr4] = [
    nbRangees + nbArbresParRangee,
    (nbRangees + nbArbresParRangee) * 2,
    nbRangees ** 2,
    nbArbresParRangee ** 2,
  ]

  return {
    contexte: `Un agriculteur plante des arbres en rangées.<br>Il plante ${nbRangees} rangées d'arbres avec ${nbArbresParRangee} arbres par rangée.<br>`,
    question: "Combien d'arbres a-t-il plantés au total ?<br>",
    reponses: [nbArbres, mr1, mr2, mr3, mr4],
    reponseRedigee: `L'agriculteur a planté ${nbArbres} arbres, car  $${nbRangees}\\times ${nbArbresParRangee}=${nbArbres}$.<br>`,
  }
}
function fleurs() {
  const largeur = randint(2, 5)
  const longueur = randint(largeur + 1, largeur + 5)
  const aire = largeur * longueur
  const fleursParM2 = randint(3, 5) * 2
  const nbFleurs = aire * fleursParM2
  const [mr1, mr2, mr3, mr4] = [
    (longueur + largeur) * fleursParM2,
    (longueur + largeur) * 2 * fleursParM2,
    nbFleurs / 2,
    nbFleurs * 2,
  ]

  return {
    contexte: `Un jardinier doit planter des fleurs dans un jardin rectangulaire de ${longueur} mètres de long et ${largeur} mètres de large.<br>Chaque mètre carré doit contenir ${fleursParM2} fleurs.<br>`,
    question: 'Combien de fleurs le jardinier doit-il planer au total ?<br>',
    reponses: [nbFleurs, mr1, mr2, mr3, mr4],
    reponseRedigee: `Le jardinier a planté ${nbFleurs} fleurs, car  la surface du jardin est de $${longueur}\\times ${largeur}=${aire}m^2$ et $${aire}\\times ${fleursParM2}=${nbFleurs}$.<br>`,
  }
}

function magasin() {
  const nbBouteillesParPack = choice([2, 4, 6, 8])
  const nbPacks = randint(5, 10)
  const masseParBouteille = choice([0.5, 0.75, 1.5])
  const nbBouteilles = nbPacks * nbBouteillesParPack
  const masseTotale = Math.round(nbBouteilles * masseParBouteille)
  const [mr1, mr2, mr3, mr4] = [
    nbBouteilles,
    nbBouteilles * 2,
    nbBouteilles / 4,
    masseTotale * 2,
  ]

  return {
    contexte: `Un magasin vend des packs de bouteilles d'eau.<br>Chaque pack contient ${nbBouteillesParPack} bouteilles de ${stringNombre(masseParBouteille, 2)}L.<br>Un client achète ${nbPacks} packs.<br>`,
    question: 'Quel volume de liquide le client a-til acheté ?<br>',
    reponses: [masseTotale, mr1, mr2, mr3, mr4].map((el) => el + 'L'),
    reponseRedigee: `Le client a acheté ${masseTotale} litres de liquide, car il a acheté $${nbPacks}\\times ${nbBouteillesParPack}=${nbBouteilles}$ bouteilles et $${nbBouteilles}\\times ${texNombre(masseParBouteille, 2)}=${masseTotale}$.<br>`,
  }
}

function livre() {
  const nbPagesParJour = randint(5, 15)
  const nbJours = randint(5, 10) * 4
  const nbPagesTotal = nbJours * nbPagesParJour
  const [mr1, mr2, mr3, mr4] = [
    nbJours / 2,
    nbJours - 8,
    nbJours + 8,
    nbJours + 16,
  ]

  return {
    contexte: `Un élève lit ${nbPagesParJour} pages de son livre chaque jour. Le livre contient ${nbPagesTotal} pages.<br>`,
    question: 'Combien de jours lui faudra-t-il pour lire tout le livre ?<br>',
    reponses: [nbJours, mr1, mr2, mr3, mr4],
    reponseRedigee: `L'élève aura fini de lire son livre au bout de ${nbJours} jours, car $${nbJours}\\times ${nbPagesParJour}=${nbPagesTotal}$.<br>`,
  }
}

function boulangerie() {
  const nbLots = randint(1, 3) * 10
  const nbCroissantParLot = choice([3, 4, 5, 7, 10])
  const nbCroissants = nbLots * nbCroissantParLot
  const [mr1, mr2, mr3, mr4] = [
    nbCroissants,
    nbCroissants - 10,
    nbCroissants - 5,
    nbCroissants + 5,
    nbCroissants + 10,
  ]

  return {
    contexte: `Une boulangerie vend des lots de ${nbCroissantParLot}.<br> Un client achète ${nbLots} lots.<br>`,
    question: 'Combien ce client a-t-il acheté des croissants ?<br>',
    reponses: [nbCroissants, mr1, mr2, mr3, mr4],
    reponseRedigee: `Le client a acheté $${nbCroissants}$, car $${nbLots}\\times ${nbCroissantParLot}=${nbCroissants}$.<br>`,
  }
}

function bus() {
  const nbEleves = 200 + randint(1, 8) * 20
  const nbPlaces = choice([30, 30, 50])
  const nbAccompagnateurs = Math.floor(nbEleves / 20)
  const nbBus = Math.ceil((nbEleves + nbAccompagnateurs) / nbPlaces)
  const nbPlacesDispo = nbPlaces * nbBus
  const [mr1, mr2, mr3, mr4] = [nbBus - 4, nbBus + 5, nbBus - 2, nbBus + 3]

  return {
    contexte: `Un collège organise une sortie scolaire pour ${nbEleves} élèves.<br>Les élèves doivent être répartis dans des bus de ${nbPlaces} places.<br>`,
    question: `Combien de bus faudra-t-il sachant qu'il y a ${nbAccompagnateurs} accompagnateurs adultes ?`,
    reponses: [nbBus, mr1, mr2, mr3, mr4],
    reponseRedigee: `Il faudra ${nbBus} pour transporter les ${nbEleves} élèves et les ${nbAccompagnateurs} accompagnateurs, soit ${nbEleves + nbAccompagnateurs} passagers, car cela fait $${nbBus}\\times ${nbPlaces} = ${nbPlacesDispo}$ places disponibles et $${nbEleves + nbAccompagnateurs} \\leq ${nbPlacesDispo}$.<br>`,
  }
}
const listePb = [
  piqueNique,
  carrelage,
  bibliotheque,
  camion,
  agriculteur,
  fleurs,
  magasin,
  livre,
  boulangerie,
  bus,
]
export default class RepresenterUneFraction extends Exercice {
  constructor() {
    super()
    this.consigne =
      'Trouver la bonne réponse en utilisant les ordres de grandeurs.'
    this.nbQuestions = 4

    // this.sup = 3
    // this.besoinFormulaireNumerique = ['Type de problèmes']
  }

  nouvelleVersion() {
    const listeDeProblemes = combinaisonListes(listePb, this.nbQuestions)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const probleme = listeDeProblemes[i]
      const { contexte, question, reponses, reponseRedigee } = probleme()
      let texte = `${contexte}<br>${question}`
      this.autoCorrection[i] = {
        enonce: '',
        propositions: [
          {
            texte: reponses[0].toString(),
            statut: true,
          },
          {
            texte: reponses[1].toString(),
            statut: false,
          },
          {
            texte: reponses[2].toString(),
            statut: false,
          },
          {
            texte: reponses[3].toString(),
            statut: false,
          },
          {
            texte: reponses[4].toString(),
            statut: false,
          },
        ],
        options: { ordered: false },
      }
      const monQcm = propositionsQcm(this, i)
      texte += monQcm.texte
      const texteCorr = reponseRedigee + monQcm.texteCorr
      if (this.questionJamaisPosee(i, ...reponses)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
/*

A) 10
B) 12 (Correct)
C) 14
D) 16
Situation-Problème 9
Contexte :
  Une boulangerie vend des lots de 4 croissants pour 5 euros. Un client achète 5 lots.

  Question :
Combien de croissants le client achète-t-il en tout ?

  Réponse attendue :
Le client achète
5
×
4
  =
  20
5×4=20 croissants.

  QCM :

A) 16
B) 18
C) 20 (Correct)
D) 22
Situation-Problème 10
Contexte :
  Une école organise une sortie pour 120 élèves. Ils doivent être répartis dans des bus, chaque bus pouvant transporter 30 élèves.

  Question :
Combien de bus sont nécessaires pour transporter tous les élèves ?

  Réponse attendue :
Il faut
120
30
  =
  4
30
120

 =4 bus pour transporter tous les élèves.

  QCM :

A) 3
B) 4 (Correct)
C) 5
D) 6
*/
