import Exercice from '../Exercice'
import { combinaisonListes, choice } from '../../lib/outils/arrayOutils'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import { propositionsQcm } from '../../lib/interactif/qcm'
import { point } from '../../lib/2d/points'
import { grille } from '../../lib/2d/reperes'
import { segment, vecteur } from '../../lib/2d/segmentsVecteurs'
import { mathalea2d } from '../../modules/2dGeneralites'

export const titre = 'Reconnaitre des vecteurs égaux/opposés/colinéaires (QCM)'
export const interactifReady = true
export const interactifType = 'qcm'

export const dateDePublication = '31/03/2025'

export const uuid = '57d64'
export const refs = {
  'fr-fr': ['2G20-1'],
  'fr-ch': [],
}

/**
 * Reconnaitre des vecteurs égaux/opposés/colinéaires (QCM).
 * @author Stéphan Grignon
 * stephan.grignon@ac-strasbourg.fr
 */

export default class ReconnaitreVecteurs extends Exercice {
  constructor() {
    super()
    this.sup = 4
    this.nbQuestions = 1
    this.spacing = 1.5
    this.spacingCorr = 1.5
    this.besoinFormulaireTexte = [
      'Type de questions',
      [
        'Nombres séparés par des tirets  :',
        '1 : Vecteurs égaux',
        '2 : Vecteurs opposés',
        '3 : Vecteurs colinéaires',
        '4 : Mélange',
      ].join('\n'),
    ]
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 3,
      melange: 4,
      defaut: 4,
      nbQuestions: this.nbQuestions,
    })
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )

    // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"

    for (
      let i = 0, monQcm, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      let k1 = randint(-5, 5)
      let k2
      if (k1 === 0) {
        k2 = randint(-5, 5, 0)
      } else {
        k2 = randint(-5, 5)
      } // pas de vecteur nul
      const A = point(0, 0) // pt origine vecteur de base
      const B = point(A.x + k1, A.y + k2) // pt extrémité vecteur de base

      let xC = 0
      let yC = 0
      let d = Math.abs(k2 * xC - k1 * yC) / Math.sqrt(k1 ** 2 + k2 ** 2)
      while (d < 2 || d > 3) {
        // vecteurs colinaires : distance des directions entre 2 et 3
        xC = randint(-3, 3)
        yC = randint(-3, 3)
        d = Math.abs(k2 * xC - k1 * yC) / Math.sqrt(k1 ** 2 + k2 ** 2)
      }

      const C = point(xC, yC) // pt origine second vecteur
      const D = point(xC + k1, yC + k2) // pt extrémité vecteur égal
      const E = point(xC - k1, yC - k2) // pt extrémité vecteur opposé

      const k3 = choice([0.5, 0.75, 1.25, 1.5])
      const F = point(xC + k1 * k3, yC + k2 * k3) // pt extrémité vecteur colinéaire de même sens mais pas égal

      const k4 = choice([-k1, k1])
      let k5
      if (k4 === k1) {
        k5 = -k2
      } else {
        k5 = k2
      }
      const G = point(xC + k4, yC + k5) // pt extrémité vecteur quelconque avec norme égale et "même sens"

      const k6 = choice([-0.5, -0.75, -1.25, -1.5])
      const H = point(xC + k1 * k6, yC + k2 * k6) // pt extrémité vecteur colinéaire de sens contraire mais pas opposé

      const K = point(xC + k4 * k3, yC + k5 * k3) // pt extrémité vecteur quelconque avec norme différente et "même sens"

      const AB = segment(A, B, 'blue', '->') // vecteur de base
      AB.epaisseur = 2
      const vAB = vecteur(A, B)
      const nomvAB = vAB.representantNomme(A, 'u', 1.5, 'blue')

      const ptsExt = [D, E, F, H, G, K, G, K] // liste des pts d'extrémité
      let choixPtExt = choice(ptsExt) // choix du pt d'extrémité
      while ((choixPtExt === G || choixPtExt === K) && (k1 === 0 || k2 === 0)) {
        // pas de vecteur horizontal ou vertical dans ces cas sinon direction + sens changé
        choixPtExt = choice(ptsExt)
        k1 = 0
        k2 = 0
      }

      const CptExt = segment(C, choixPtExt, 'red', '->') // second vecteur
      CptExt.epaisseur = 2
      const vCptExt = vecteur(C, choixPtExt)
      const nomvCptExt = vCptExt.representantNomme(C, 'v', 1.5, 'red')

      // grille dépassant les vecteurs d'une unité
      const xmin = Math.floor(Math.min(A.x, B.x, C.x, choixPtExt.x) - 1)
      const ymin = Math.floor(Math.min(A.y, B.y, C.y, choixPtExt.y) - 1)
      const xmax = Math.ceil(Math.max(A.x, B.x, C.x, choixPtExt.x) + 1)
      const ymax = Math.ceil(Math.max(A.y, B.y, C.y, choixPtExt.y) + 1)
      const Grille = grille(xmin, ymin, xmax, ymax)

      switch (listeTypeDeQuestions[i]) {
        case 1: {
          // Vecteurs égaux
          texte = mathalea2d(
            {
              xmin,
              xmax,
              ymin,
              ymax,
              style: 'margin: auto',
              pixelsParCm: 30,
              scale: 0.75,
            },
            AB,
            nomvAB,
            CptExt,
            nomvCptExt,
            Grille,
          )
          texte += '<br>Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont-ils égaux ?'
          texteCorr = "Deux vecteurs sont égaux s'ils ont :"
          texteCorr += '<br>- la même direction,'
          texteCorr += '<br>- le même sens,'
          texteCorr += '<br>- la même norme.'

          let rep1, rep2, rep3, rep4
          if (choixPtExt === D) {
            ;[rep1, rep2, rep3, rep4] = [true, false, false, false]
          } else if (choixPtExt === G) {
            ;[rep1, rep2, rep3, rep4] = [false, true, false, false]
          } else if (choixPtExt === E) {
            ;[rep1, rep2, rep3, rep4] = [false, false, true, false]
          } else if (choixPtExt === F) {
            ;[rep1, rep2, rep3, rep4] = [false, false, false, true]
          } else if (choixPtExt === H) {
            ;[rep1, rep2, rep3, rep4] = [false, false, true, true]
          } else if (choixPtExt === K) {
            ;[rep1, rep2, rep3, rep4] = [false, true, false, true]
          }

          this.autoCorrection[i] = {
            enonce: texte,
            options: { ordered: true, vertical: true },
            propositions: [
              {
                texte: 'Oui.',
                statut: rep1,
              },
              {
                texte: "Non, les deux vecteurs n'ont pas la même direction.",
                statut: rep2,
              },
              {
                texte: "Non, les deux vecteurs n'ont pas le même sens.",
                statut: rep3,
              },
              {
                texte: "Non, les deux vecteurs n'ont pas la même norme.",
                statut: rep4,
              },
            ],
          }
          monQcm = propositionsQcm(this, i)
          texte = texte + monQcm.texte
          break
        }

        case 2: {
          // Vecteurs opposés
          texte = mathalea2d(
            {
              xmin,
              xmax,
              ymin,
              ymax,
              style: 'margin: auto',
              pixelsParCm: 30,
              scale: 0.75,
            },
            AB,
            nomvAB,
            CptExt,
            nomvCptExt,
            Grille,
          )
          texte +=
            '<br>Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont-ils opposés ?'
          texteCorr = "Deux vecteurs sont opposés s'ils ont :"
          texteCorr += '<br>- la même direction,'
          texteCorr += '<br>- des sens opposés,'
          texteCorr += '<br>- la même norme.'

          let rep1, rep2, rep3, rep4
          if (choixPtExt === E) {
            ;[rep1, rep2, rep3, rep4] = [true, false, false, false]
          } else if (choixPtExt === G) {
            ;[rep1, rep2, rep3, rep4] = [false, true, false, false]
          } else if (choixPtExt === D) {
            ;[rep1, rep2, rep3, rep4] = [false, false, true, false]
          } else if (choixPtExt === F) {
            ;[rep1, rep2, rep3, rep4] = [false, false, true, true]
          } else if (choixPtExt === H) {
            ;[rep1, rep2, rep3, rep4] = [false, false, false, true]
          } else if (choixPtExt === K) {
            ;[rep1, rep2, rep3, rep4] = [false, true, false, true]
          }

          this.autoCorrection[i] = {
            enonce: texte,
            options: { ordered: true, vertical: true },
            propositions: [
              {
                texte: 'Oui.',
                statut: rep1,
              },
              {
                texte: "Non, les deux vecteurs n'ont pas la même direction.",
                statut: rep2,
              },
              {
                texte: "Non, les deux vecteurs n'ont pas des sens opposés.",
                statut: rep3,
              },
              {
                texte: "Non, les deux vecteurs n'ont pas la même norme.",
                statut: rep4,
              },
            ],
          }
          monQcm = propositionsQcm(this, i)
          texte = texte + monQcm.texte
          break
        }

        case 3:
        default: {
          // Vecteurs colinéaires
          texte = mathalea2d(
            {
              xmin,
              xmax,
              ymin,
              ymax,
              style: 'margin: auto',
              pixelsParCm: 30,
              scale: 0.75,
            },
            AB,
            nomvAB,
            CptExt,
            nomvCptExt,
            Grille,
          )
          texte +=
            '<br>Les vecteurs $\\vec{u}$ et $\\vec{v}$ sont-ils colinéaires ?'
          texteCorr =
            "Deux vecteurs sont colinéaires s'ils ont la même direction."

          let rep1, rep2
          if (
            choixPtExt === D ||
            choixPtExt === E ||
            choixPtExt === F ||
            choixPtExt === H
          ) {
            ;[rep1, rep2] = [true, false]
          } else if (choixPtExt === G || choixPtExt === K) {
            ;[rep1, rep2] = [false, true]
          }

          this.autoCorrection[i] = {
            enonce: texte,
            options: { ordered: true, vertical: true },
            propositions: [
              {
                texte: 'Oui.',
                statut: rep1,
              },
              {
                texte: 'Non.',
                statut: rep2,
              },
            ],
          }
          monQcm = propositionsQcm(this, i)
          texte = texte + monQcm.texte
          break
        }
      }

      if (this.questionJamaisPosee(i, k1)) {
        // Si la question n'a jamais été posée, on en créé une autre.
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++ // On passe à la question suivante
      }
      cpt++ // Sinon on incrémente le compteur d'essai pour avoir une question nouvelle
    }
    listeQuestionsToContenu(this) // La liste de question et la liste de la correction
  }
}
