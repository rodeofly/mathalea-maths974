import { codageAngleDroit } from '../../lib/2d/angles'
import { codageSegments } from '../../lib/2d/codages'
import { point, pointAdistance } from '../../lib/2d/points'
import { polygone } from '../../lib/2d/polygones'
import { segment, vecteur } from '../../lib/2d/segmentsVecteurs'
import { texteParPosition } from '../../lib/2d/textes'
import { rotation, similitude, translation } from '../../lib/2d/transformations'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
export const titre =
  "Donner l'expression littérale d'un périmètre et d'une aire de quadrilatère"

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '08/03/2022'
export const dateDeModifImportante = '11/05/2024'

/**
 *
 * @author Mireille Gain
 */
export const uuid = 'af8bb'

export const refs = {
  'fr-fr': ['4L10-2'],
  'fr-ch': ['10FA2-3'],
}
export default class AirePerimetrePolygone extends Exercice {
  constructor() {
    super()

    this.consigne =
      "Exprimer le périmètre et l'aire des rectangles et carrés suivants par une expression littérale réduite."
    this.nbQuestions = 4 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
  }

  nouvelleVersion() {
    // on choisit un nom pour les variables 1 et 2
    const variable1 = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      't',
      'u',
      'v',
      'w',
      'y',
      'z',
    ]
    const indiceVariable = randint(0, 10, 5)
    const inc1 = variable1[indiceVariable]
    const inc2 = variable1[indiceVariable + 1]
    const l = randint(2, 4)
    const L = randint(5, 8)

    const typeQuestionsDisponibles = ['r1', 'r2', 'r3', 'c'] // On crée 4 types de questions

    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        M,
        N,
        P,
        o,
        quad,
        params,
        texte,
        texteCorr,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // Boucle principale où i+1 correspond au numéro de la question
      texte = ''
      texteCorr = ''
      switch (
        listeTypeQuestions[i] // Suivant le type de question, le contenu sera différent
      ) {
        case 'c': // Carré de côté une lettre
          A = point(0, 0)
          B = pointAdistance(A, 4, 0)
          C = rotation(A, B, -90)
          D = rotation(B, A, 90)
          quad = polygone(A, B, C, D)
          quad.epaisseur = 2
          params = fixeBordures([quad, texteParPosition(`$${inc1}$`, 2, 4.7)])
          texte += mathalea2d(
            Object.assign(params, {
              optionsTikz:
                'baseline={([yshift={-\\ht\\strutbox}]current bounding box.north)}',
            }),
            quad,
            codageAngleDroit(A, B, C),
            codageAngleDroit(A, D, C),
            codageAngleDroit(D, C, B),
            codageAngleDroit(B, A, D),
            codageSegments('//', 'blue', A, B, B, C, C, D, D, A),
            texteParPosition(`$${inc1}$`, 2, 4.7),
          )
          texteCorr += 'Périmètre :'
          texteCorr += `<br>$\\mathcal{P} =${inc1}+${inc1}+${inc1}+${inc1}$`
          texteCorr += `<br>$\\mathcal{P} =${miseEnEvidence(`4${inc1}`)}$`
          texteCorr += '<br>Aire :'
          texteCorr += `<br>$\\mathcal{A} =${inc1}\\times ${inc1}$`
          texteCorr += `<br>$\\mathcal{A} =${miseEnEvidence(`${inc1}^2`)}$`
          break

        case 'r1': { // Rectangle ayant une lettre pour Longueur et une autre lettre pour largeur, ou bien une lettre pour Longueur et un nombre pour largeur
          E = point(0, 0)
          F = pointAdistance(E, 6, 0)
          G = similitude(E, F, -90, 2 / 3)
          H = translation(G, vecteur(F, E))
          quad = polygone(E, F, G, H)
          quad.epaisseur = 2
          o = choice([1, 2])
          const inc = o === 1 ? inc1 : L
          params = fixeBordures([
            quad,
            texteParPosition(`$${inc}$`, 3, 4.7),
            texteParPosition(`$${inc2}$`, -0.7, 2),
          ])
          texte += mathalea2d(
            Object.assign(params, {
              optionsTikz:
                'baseline={([yshift={-\\ht\\strutbox}]current bounding box.north)}',
            }),
            quad,
            codageAngleDroit(E, F, G),
            codageAngleDroit(F, G, H),
            codageAngleDroit(G, H, E),
            codageAngleDroit(H, E, F),
            codageSegments('/', 'red', E, F, G, H),
            codageSegments('||', 'blue', F, G, H, E),
            texteParPosition(`$${inc}$`, 3, 4.7),
            texteParPosition(`$${inc2}$`, -0.7, 2),
          )
          texteCorr += 'Périmètre :'
          texteCorr += `<br>$\\mathcal{P} =${inc}+${inc2}+${inc}+${inc2}$`
          texteCorr += `<br>$\\mathcal{P} =${miseEnEvidence(o === 1 ? `2${inc}+2${inc2}` : `${2 * Number(inc)}+2${inc2}`)}$`
          texteCorr += '<br>Aire :'
          texteCorr += `<br>$\\mathcal{A} =${inc}\\times ${inc2}$`
          texteCorr += `<br>$\\mathcal{A} =${miseEnEvidence(`${inc}${inc2}`)}$`
          break
        }
        case 'r2': {
          // Rectangle ayant le triple d'une mesure en longueur, et un nombre ou cette mesure en largeur
          E = point(0, 0)
          F = pointAdistance(E, 6, 0)
          G = similitude(E, F, -90, 1 / 3)
          H = translation(G, vecteur(F, E))
          I = point(2, 1.7)
          J = point(2, 2.3)
          K = point(4, 1.7)
          M = point(4, 2.3)
          N = point(2, 2)
          P = point(4, 2)
          quad = polygone(E, F, G, H)
          quad.epaisseur = 2
          o = choice([1, 2])
          const inc = o === 1 ? inc1 : inc2
          params = fixeBordures([
            quad,
            texteParPosition(`$${inc1}$`, 1, 2.7),
            texteParPosition(`$${inc}$`, -0.7, 1),
          ])
          const objets = [
            quad,
            codageAngleDroit(E, F, G),
            codageAngleDroit(F, G, H),
            codageAngleDroit(G, H, E),
            codageAngleDroit(H, E, F),
            segment(I, J),
            segment(K, M),
            codageSegments('/', 'red', [H, N, P, G]),
            texteParPosition(`$${inc}$`, -0.7, 1),
            texteParPosition(`$${inc1}$`, 1, 2.7),
          ]
          objets.push(
            o === 1
              ? codageSegments('/', 'red', F, G, H, E)
              : codageSegments('||', 'blue', F, G, H, E),
          )
          texte += mathalea2d(
            Object.assign(params, {
              optionsTikz:
                'baseline={([yshift={-\\ht\\strutbox}]current bounding box.north)}',
            }),
            objets,
          )
          texteCorr += 'Périmètre :'
          texteCorr += `<br>$\\mathcal{P} =${inc1}+${inc1}+${inc1}+${inc}+${inc1}+${inc1}+${inc1}+${inc}$`
          texteCorr +=
            o === 1
              ? `<br>$\\mathcal{P} =${miseEnEvidence(`8${inc1}`)}$`
              : `<br>$\\mathcal{P} =${miseEnEvidence(`6${inc1}+2${inc2}`)}$`
          texteCorr += '<br>Aire :'
          texteCorr += `<br>$\\mathcal{A} =${inc1}\\times ${inc}+${inc1}\\times ${inc}+${inc1}\\times ${inc}$`
          texteCorr +=
            o === 1
              ? `<br>$\\mathcal{A} =${miseEnEvidence(`3${inc1}^2`)}$`
              : `<br>$\\mathcal{A} =${miseEnEvidence(`3${inc1}${inc2}`)}$`
          break
        }
        case 'r3': // Rectangle ayant un nombre pour largeur et une somme de lettres pour Longueur
          E = point(0, 0)
          F = pointAdistance(E, 6, 0)
          G = similitude(E, F, -90, 2 / 3)
          H = translation(G, vecteur(F, E))
          I = point(l, 3.7)
          J = point(l, 4.3)
          quad = polygone(E, F, G, H)
          quad.epaisseur = 2
          params = fixeBordures([
            quad,
            texteParPosition(`$${inc1}$`, l / 2, 4.7),
            texteParPosition(`$${inc2}$`, 3 + l / 2, 4.7),
            texteParPosition(l, -0.7, 2),
          ])
          texte += mathalea2d(
            Object.assign(params, {
              optionsTikz:
                'baseline={([yshift={-\\ht\\strutbox}]current bounding box.north)}',
            }),
            quad,
            codageAngleDroit(E, F, G),
            codageAngleDroit(F, G, H),
            codageAngleDroit(G, H, E),
            codageAngleDroit(H, E, F),
            codageSegments('||', 'blue', F, G, H, E),
            segment(I, J),
            texteParPosition(`$${inc1}$`, l / 2, 4.7),
            texteParPosition(`$${inc2}$`, 3 + l / 2, 4.7),
            texteParPosition(l, -0.7, 2),
          )
          texteCorr += 'Périmètre :'
          texteCorr += `<br>$\\mathcal{P} =${l} + ${inc1} + ${inc2} + ${l} + ${inc1} + ${inc2}$`
          texteCorr += `<br>$\\mathcal{P} =2\\times${l}+2\\times ${inc1}+2\\times ${inc2}$`
          texteCorr += `<br>$\\mathcal{P} =${miseEnEvidence(`2${inc1}+2${inc2}+${2 * l}`)}$`
          texteCorr += '<br>Aire :'
          texteCorr += `<br>$\\mathcal{A} =${l}\\times (${inc1}+${inc2})$`
          texteCorr += `<br>$\\mathcal{A} =${l}\\times ${inc1}+${l}\\times ${inc2}$`
          texteCorr += `<br>$\\mathcal{A} =${miseEnEvidence(`${l}${inc1}+${l}${inc2}`)}$`
          break
      }
      //  params.

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
