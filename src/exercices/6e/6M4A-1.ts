import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { minToHoraire, minToHour } from '../../lib/outils/dateEtHoraires'
import { prenom, prenomF } from '../../lib/outils/Personne'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { context } from '../../modules/context'
import Hms from '../../modules/Hms'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'

export const titre = 'Calculer des durées ou déterminer un horaire'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'

export const dateDeModifImportante = '09/10/2023' // Correction détaillée

/**
 * Problèmes où il faut calculer la durée d'un évènement ou un horaire.
 * Paramétrage possible :
 * * 1 : calculs de durées
 * * 2 : calculer l'heure de début
 * * 3 : calculer l'heure de fin
 * * 4 : mélange des 3 types précédents
 * @author Rémi Angot
 */
export const uuid = 'e960d'

export const refs = {
  'fr-fr': ['6M4A-1'],
  'fr-2016': ['6D12'],
  'fr-ch': ['10GM3-4'],
}
export default class CalculsDeDureesOuHoraires extends Exercice {
  constructor() {
    super()
    this.sup = 4
    this.spacing = 2
    this.nbQuestions = 3

    this.spacingCorr = 2
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      4,
      "1 : Calcul de durées\n2 : Calcul de l'horaire de fin\n3 : Calcul de l'horaire de début\n4 : Mélange",
    ]
  }

  nouvelleVersion() {
    const typeDeContexte = combinaisonListes([1, 2, 3, 4, 5], this.nbQuestions)
    let typesDeQuestions // 1 : calcul de durées // 2 : calcul de l'horaire de début // 3 : calcul de l'horaire de fin // 4 : mélange

    if (this.sup < 4) {
      // que des questions de niveau 1 ou que des questions de niveau 2
      typesDeQuestions = combinaisonListes([this.sup], this.nbQuestions)
    } else {
      // un mélange équilibré de questions
      typesDeQuestions = combinaisonListes([1, 2, 3], this.nbQuestions)
    }

    for (
      let i = 0,
        d1,
        h1,
        m1,
        d2,
        h2,
        m2,
        d,
        h,
        m,
        texte,
        texteCorr,
        texteInteractif,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // d1 : heure de début (h1 heures m1 min)
      // d2 : heure de fin (h2 heures m2 min)
      // d : durée
      h1 = 0
      h2 = 0
      m1 = 0
      m2 = 0
      d1 = 0
      d2 = 0
      let reponse: Hms
      if (typeDeContexte[i] === 1) {
        h1 = randint(20, 22)
        m1 = randint(35, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + 2
        m2 = randint(1, m1 - 1) // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = Math.floor(d / 60)
        m = d % 60
        d = minToHour(d)
        if (typesDeQuestions[i] === 1) {
          texte = `La diffusion d'un film commence à ${d1} et se termine à ${d2}. Combien de temps dure ce film ?`
          texteCorr = `${d1}$~\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${(h2 - h1 - 1) % 24}~\\text{h}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `Le film dure ${texteEnCouleurEtGras(d)}.`
          texteInteractif = 'Le film dure'
          reponse = Hms.fromString(d)
        } else if (typesDeQuestions[i] === 2) {
          texte = `Un film dure ${d} et commence à ${d1}. À quelle heure termine-t-il ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += ` = ${d2}`
          texteCorr += '<br>'
          texteCorr += `Le film termine à ${texteEnCouleurEtGras(d2)}.`
          texteInteractif = 'Le film termine à'
          reponse = Hms.fromString(d2)
        } else {
          texte = `Un film de ${d} termine à ${d2}. À quelle heure commence-t-il ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0)
            texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `Le film commence à ${texteEnCouleurEtGras(d1)}.`
          texteInteractif = 'Le film commencé à'
          reponse = Hms.fromString(d1)
        }
      } else if (typeDeContexte[i] === 2) {
        h1 = randint(20, 23)
        m1 = randint(35, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + 1
        m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        while (d < 27 || d > 75 || d === 60) {
          h1 = randint(20, 23)
          m1 = randint(35, 58)
          d1 = h1 * 60 + m1
          h2 = h1 + 2
          m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2
          d = d2 - d1
        }
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = Math.floor(d / 60)
        m = d % 60
        d = minToHour(d)

        if (typesDeQuestions[i] === 1) {
          texte = `Sur son service de streaming favori, ${prenom()} commence à regarder une série à ${d1} et celle-ci se termine à ${d2}. Combien de temps dure l'épisode ?`
          texteCorr = `${d1}$~\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${h2 - h1 - 1 > 0 ? `${(h2 - h1 - 1) % 24}~\\text{h}` : ''}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `L'épisode dure ${texteEnCouleurEtGras(d)}. `
          reponse = Hms.fromString(d)
          texteInteractif = "L'épisode dure"
        } else if (typesDeQuestions[i] === 2) {
          texte = `${prenom()} allume son ordinateur à ${d1} pour regarder une série de ${d}. À quelle heure la série s'achève-t-elle ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += ` = ${d2}`
          texteCorr += '<br>'
          texteCorr += `La série s'achève à ${texteEnCouleurEtGras(d2)}. `
          reponse = Hms.fromString(d2)
          texteInteractif = "La série s'achève à"
        } else {
          texte = `${prenom()} termine de regarder une série de ${d} à ${d2}. À quelle heure la série commence-t-elle ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0)
            texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `La série commence à ${texteEnCouleurEtGras(d1)}. `
          reponse = Hms.fromString(d1)
          texteInteractif = 'La série commence à'
        }
      } else if (typeDeContexte[i] === 3) {
        h1 = randint(8, 21)
        m1 = randint(1, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + randint(1, 2)
        m2 = randint(1, 59) // pas forcément de retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = Math.floor(d / 60)
        m = d % 60
        d = minToHour(d)

        if (typesDeQuestions[i] === 1) {
          texte = `Une émission télévisée est diffusée de ${d1} à ${d2}. Combien de temps dure-t-elle ?`
          texteCorr = `${d1}$~\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${h2 - h1 - 1 > 0 ? `${(h2 - h1 - 1) % 24}~\\text{h}` : ''}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `L'émission dure ${texteEnCouleurEtGras(d)}. `
          reponse = Hms.fromString(d)
          texteInteractif = "L'émission dure"
        } else if (typesDeQuestions[i] === 2) {
          texte = `Une émission télévisée de ${d} commence à ${d1}. À quelle heure s'achèvera-t-elle ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += ` = ${d2}`
          texteCorr += '<br>'
          texteCorr += `L'émission s'achèvera à ${texteEnCouleurEtGras(d2)}. `
          reponse = Hms.fromString(d2)
          texteInteractif = "L'émission s'achèvera à"
        } else {
          texte = `À ${d2}, ${prenom()} termine de regarder une émission de ${d}. À quelle heure l'émission commence-t-elle ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0)
            texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `L'émission commence à ${texteEnCouleurEtGras(d1)}. `
          reponse = Hms.fromString(d1)
          texteInteractif = "L'émission commence à"
        }
      } else if (typeDeContexte[i] === 4) {
        h1 = randint(13, 16)
        m1 = randint(1, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + randint(1, 2)
        m2 = randint(1, 58) // pas forcément de retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        while (d < 27 || d > 75 || d === 60) {
          h1 = randint(13, 16)
          m1 = randint(35, 58)
          d1 = h1 * 60 + m1
          h2 = h1 + randint(1, 2)
          m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2
          d = d2 - d1
        }
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = Math.floor(d / 60)
        m = d % 60
        d = minToHour(d)

        if (typesDeQuestions[i] === 1) {
          texte = `Un papa regarde la compétition de gymnastique de sa fille  de ${d1} à ${d2}. Quelle est la durée de cette compétition ?`
          texteCorr = `${d1}$~\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${h2 - h1 - 1 > 0 ? `${(h2 - h1 - 1) % 24}~\\text{h}` : ''}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `La compétition dure ${texteEnCouleurEtGras(d)}. `
          reponse = Hms.fromString(d)
          texteInteractif = 'La compétition dure'
        } else if (typesDeQuestions[i] === 2) {
          texte = `Une compétition de gymnastique commence à ${d1} et dure ${d}. À quelle heure termine-t-elle ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += ` = ${d2}`
          texteCorr += '<br>'
          texteCorr += `La compétition termine à ${texteEnCouleurEtGras(d2)}. `
          reponse = Hms.fromString(d2)
          texteInteractif = 'La compétition termine à'
        } else {
          texte = `Une compétition de gymnastique qui termine à ${d2} dure ${d}. À quelle heure commence-t-elle ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0)
            texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `La compétition commence à ${texteEnCouleurEtGras(d1)}. `
          reponse = Hms.fromString(d1)
          texteInteractif = 'La compétition commence à'
        }
      } else {
        h1 = randint(8, 15)
        m1 = randint(25, 58)
        d1 = h1 * 60 + m1
        h2 = h1 + randint(2, 5)
        m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
        d2 = h2 * 60 + m2
        d = d2 - d1
        while (d < 27 || d > 75 || d === 60) {
          h1 = randint(20, 23)
          m1 = randint(35, 58)
          d1 = h1 * 60 + m1
          h2 = h1 + 2
          m2 = randint(1, m1) // pour s'assurer qu'il y a une retenue dans d2-d1
          d2 = h2 * 60 + m2
          d = d2 - d1
        }
        d1 = minToHoraire(d1)
        d2 = minToHoraire(d2)
        h = Math.floor(d / 60)
        m = d % 60
        d = minToHour(d)

        if (typesDeQuestions[i] === 1) {
          texte = `Un train part à ${d1} et arrive à destination à ${d2}. Quelle est la durée du trajet ?`
          texteCorr = `${d1}$~\\xrightarrow{+${60 - m1}~\\text{min}}${(h1 + 1) % 24}~\\text{h} \\xrightarrow{+${h2 - h1 - 1 > 0 ? `${(h2 - h1 - 1) % 24}~\\text{h}` : ''}~${m2}~\\min}${h2 % 24}~\\text{h}~${m2}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d1} = ${d}`
          texteCorr += '<br>'
          texteCorr += `Le trajet dure ${texteEnCouleurEtGras(d)}. `
          reponse = Hms.fromString(d)
          texteInteractif = 'Le trajet dure'
        } else if (typesDeQuestions[i] === 2) {
          const prenom = prenomF()
          texte = `${prenom} monte dans le train à ${d1} pour un trajet qui doit durer ${d}. À quelle heure arrive-t-elle ?`
          texteCorr = `${d1} + ${d} = ${h1 + h} h ${m1 + m} min`
          if (m1 + m > 59) texteCorr += ` = ${d2}`
          texteCorr += '<br>'
          texteCorr += `${prenom} arrive à ${texteEnCouleurEtGras(d2)}. `
          reponse = Hms.fromString(d2)
          texteInteractif = `${prenom} arrive à`
        } else {
          texte = `Un train arrive en gare à ${d2} après un trajet de ${d}. À quelle heure le voyage commence-t-il ?`
          texteCorr = `$${h2 % 24}~\\text{h}~${m2}~\\text{min}`
          if (h > 0)
            texteCorr += `\\xrightarrow{-${h}~\\text{h}} ${h2 - h}~\\text{h}~${m2}~\\text{min}`
          texteCorr += `\\xrightarrow{-${m2}~\\text{min}} ${(h2 - h) % 24}~\\text{h} \\xrightarrow{-${Math.abs(m - m2)}~\\text{min}} ${h1}~\\text{h}~${m1}~\\text{min}$`
          texteCorr += `<br>${d2} $-$ ${d} = ${d1}`
          texteCorr += '<br>'
          texteCorr += `Le voyage commencé à ${texteEnCouleurEtGras(d1)}. `
          reponse = Hms.fromString(d1)
          texteInteractif = 'Le voyage commencé à'
        }
      }
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce:
            'Dans chacun des encadrés, montrer une démarche ou un calcul et répondre par une phrase.<br>',
          enonceAvant: false,
          enonceAvantUneFois: true,
          melange: false,
          propositions: [
            {
              type: 'AMCOpen',
              propositions: [
                {
                  texte: ' ',
                  statut: 3, // (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                  feedback: '',
                  enonce: texte + '<br>', // EE : ce champ est facultatif et fonctionnel qu'en mode hybride (en mode normal, il n'y a pas d'intérêt)
                  sanscadre: false, // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
                },
              ],
            },
          ],
        }
      }
      if (this.interactif) {
        texte += '<br>'
        texte += ajouteChampTexteMathLive(this, i, KeyboardType.clavierHms, {
          texteAvant: texteInteractif + ' : ',
        })
        handleAnswers(this, i, {
          reponse: { value: reponse.toString(), options: { HMS: true } },
        })
      }

      if (this.questionJamaisPosee(i, m1, d1, h1, m2, d2, h2)) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
