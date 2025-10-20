import { codageAngleDroit } from '../../lib/2d/angles'
import { afficheLongueurSegment } from '../../lib/2d/codages'
import { droite } from '../../lib/2d/droites'
import { milieu, point, pointAdistance } from '../../lib/2d/points'
import { parallelogramme2points1hauteur } from '../../lib/2d/polygones'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { projectionOrtho } from '../../lib/2d/transformations'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import { creerNomDePolygone, sp } from '../../lib/outils/outilString'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import Grandeur from '../../modules/Grandeur'

export const titre = 'Aire du parallélogramme'

export const dateDeModifImportante = '05/05/2025'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Des parallélogrammes sont tracés, on connaît les 2 côtés et une hauteur.
 * Il faut calculer leurs aires.
 *
 * @author Rémi Angot
 * Ajout de la possibilité de choisir le nombre de questions par Guillaume Valmont le 08/05/2022
 * Ajout de l'interactif par Eric Elter le 05/05/2025
 **/
export const uuid = 'd6cd1'

export const refs = {
  'fr-fr': ['5M10', 'BP2AutoV1'],
  'fr-ch': ['9GM1-5'],
}
export default class AireDuParallelogramme extends Exercice {
  constructor() {
    super()

    this.spacing = 2
    this.spacingCorr = 2
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    if (this.nbQuestions === 1)
      this.consigne = "Calculer l'aire du parallélogramme suivant."
    else this.consigne = "Calculer l'aire des parallélogrammes suivants."

    const typeQuestionsDisponibles = ['type1', 'type2', 'type3'] // On créé 3 types de questions
    const nom = creerNomDePolygone(this.nbQuestions * 4, 'QD')

    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (
      let i = 0, texte, texteCorr, c, h, A, B, P, C, I, H, s, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      texteCorr = `Dans chaque parallélogramme, le segment en pointillés est ${texteEnCouleurEtGras('perpendiculaire', 'blue')} à deux côtés opposés, c'est donc une ${texteEnCouleurEtGras('hauteur', 'blue')}.<br>`
      texteCorr += `Pour obtenir l'aire, il faut multiplier cette ${texteEnCouleurEtGras('hauteur', 'blue')} par la longueur de la ${texteEnCouleurEtGras('base', 'blue')} correspondante.`
      switch (listeTypeQuestions[i]) {
        case 'type1':
          c = randint(3, 7)
          h = randint(3, 5)
          A = point(0, 0, nom[i * 4])
          B = pointAdistance(A, c, randint(-20, 20), nom[i * 4 + 1])
          P = parallelogramme2points1hauteur(
            nom.slice(i * 4, i * 4 + 4),
            A,
            B,
            h,
          )
          I = milieu(A, B)
          break
        case 'type2':
          c = randint(3, 7)
          h = randint(3, 7)
          A = point(0, 0)
          B = pointAdistance(A, c, randint(-20, 20), nom[i * 4 + 1])
          P = parallelogramme2points1hauteur(
            nom.slice(i * 4, i * 4 + 4),
            A,
            B,
            h,
          )
          I = milieu(A, B)
          break
        case 'type3':
        default:
          c = randint(3, 10)
          h = randint(3, 5)
          A = point(0, 0)
          B = pointAdistance(A, c, randint(-20, 20), nom[i * 4 + 1])
          P = parallelogramme2points1hauteur(
            nom.slice(i * 4, i * 4 + 4),
            A,
            B,
            h,
          )
          I = milieu(A, B)
          break
      }
      H = projectionOrtho(I, droite(P[0].listePoints[3], P[0].listePoints[2]))
      s = segment(I, H)
      s.pointilles = 2
      texteCorr += `<br>$\\mathcal{A}_{${nom.slice(i * 4, i * 4 + 4)}}=${c}~\\text{cm}\\times  ${h}~\\text{cm}=${c * h}~\\text{cm}^2$`

      C = P[0].listePoints[2]
      const D = P[0].listePoints[3]

      const objets = [
        P[0],
        P[1],
        afficheLongueurSegment(B, A),
        afficheLongueurSegment(C, B),
        afficheLongueurSegment(I, H),
        s,
        codageAngleDroit(B, I, H),
        codageAngleDroit(D, H, I),
      ]
      texte = mathalea2d(Object.assign({}, fixeBordures(objets)), objets)
      texte += ajouteChampTexteMathLive(this, i, KeyboardType.aire, {
        texteAvant: `Aire de $${nom.slice(i * 4, i * 4 + 4)}$ : `,
        texteApres:
          sp(5) + "  Il faut penser à préciser l'unité dans la réponse.",
      })
      handleAnswers(this, i, {
        reponse: {
          value: new Grandeur(c * h, 'cm^2'),
          options: { unite: true },
        },
      })
      // Uniformisation : Mise en place de la réponse attendue en interactif en orange et gras
      const textCorrSplit = texteCorr.split('=')
      let aRemplacer = textCorrSplit[textCorrSplit.length - 1]
      aRemplacer = aRemplacer.replace('$', '').replace('<br>', '')

      texteCorr = ''
      for (let ee = 0; ee < textCorrSplit.length - 1; ee++) {
        texteCorr += textCorrSplit[ee] + '='
      }
      texteCorr += `$ $${miseEnEvidence(aRemplacer)}$`
      // Fin de cette uniformisation

      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, c, h)) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
