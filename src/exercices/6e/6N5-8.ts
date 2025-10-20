import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleur,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import { sp } from '../../lib/outils/outilString'
import { prenomF } from '../../lib/outils/Personne'
import { texPrix } from '../../lib/format/style'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { context } from '../../modules/context'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import {
  handleAnswers,
  setReponse,
} from '../../lib/interactif/gestionInteractif'

export const titre =
  'Résoudre des problèmes de type : ... de plus ou ... de moins'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const dateDePublication = '10/07/2021'
export const dateDeModifImportante = '11/12/2024'

/**
 *
 * @author Laurence CANDILLE, Olivier Mimeau (ajout d'un cas) et Rémi Angot (refactorisation)

 * Relecture : Novembre 2021 par EE
 */
export const uuid = '99522'

export const refs = {
  'fr-fr': ['6N5-8'],
  'fr-2016': ['6C22'],
  'fr-ch': ['9NO16-4'],
}
export default class ProblemesDePlusEtDeMoins extends Exercice {
  constructor() {
    super()
    this.consigne =
      'Résoudre les problèmes suivants au brouillon et écrire les réponses dans les cases, ne pas préciser "€" ni "euros" ...'
    this.nbQuestions = 4
    this.sup = 1 // Niveau de difficulté
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      3,
      '1 : Valeurs entières\n2 : Une décimale\n3 : Deux décimales',
    ]
  }

  nouvelleVersion() {
    const n = this.sup - 1
    if (this.interactif && context.isHtml) {
      this.consigne =
        this.nbQuestions > 1
          ? 'Résoudre les problèmes suivants au brouillon et écrire les réponses dans les cases, ne pas préciser "€" ni "euros" ...'
          : 'Résoudre le problème suivant au brouillon et écrire la réponse dans la case, ne pas préciser "€" ni "euros" ...'
    } else {
      this.consigne =
        this.nbQuestions > 1
          ? 'Résoudre les problèmes suivants.'
          : 'Résoudre le problème suivant.'
    }
    const typeQuestionsDisponibles = [
      'dePlusPourSoustraction',
      'deMoinsPourAddition',
      'dePlusPourAddition',
      'deMoinsPourSoustraction',
    ] // On créé 2 types de questions /// j'en ajoute deux et supprime la répition pour l'equilibrage
    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    )

    let r: number
    let e: number // argent de Romane et écart
    let m // argent de Malika
    let somme // argent total
    let prenom1, prenom2 // choix aleatoire des prenoms des filles
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // Boucle principale où i+1 correspond au numéro de la question
      prenom1 = prenomF()
      prenom2 = prenomF()
      while (prenom2 === prenom1) {
        prenom2 = prenomF()
      }
      ;[r, e] = nombreDecimales(n)
      switch (
        listeTypeQuestions[i] // Suivant le type de question, le contenu sera différent
      ) {
        case 'dePlusPourSoustraction':
          m = r - e
          somme = m + r

          texte = `${prenom2} dit à ${prenom1}  : «${sp()}J'ai $${texPrix(r)}$ €, soit $${texPrix(e)}$ € de plus que toi.${sp()}»<br>`
          if (this.interactif && !context.isAmc) {
            texte += "Combien d'argent,  en tout, possèdent les deux filles ?"
            texte += '<br>Les deux filles possèdent,  en tout, '
            texte += ajouteChampTexteMathLive(this, i, ' ', {
              texteApres: ' €',
            })
          } else {
            texte +=
              "Combien d'argent en euros possèdent,  en tout, les deux filles ?"
          }
          texteCorr = `D'après l'énoncé, ${prenom2} a $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ € `
          texteCorr += texteEnCouleurEtGras('de plus')
          texteCorr += ` que ${prenom1} signifie que ${prenom1} a $${texPrix(e)}$ € `
          texteCorr += texteEnCouleurEtGras('de moins')
          texteCorr += ` que ${prenom2}. <br>${prenom1} a donc : $${texPrix(r)}$ € - $${texPrix(e)}$ € = $${texPrix(m)}$ €.`
          texteCorr += `<br>$${texPrix(r)}$ € + $${texPrix(m)}$ € = $${texPrix(somme)}$ € `
          texteCorr += texteEnCouleur(
            `<br>Les deux filles possèdent,  en tout, $${miseEnEvidence(texPrix(somme))}$ €.`,
          )

          break
        case 'deMoinsPourAddition':
          m = r + e
          somme = m + r

          texte = `${prenom2} dit à ${prenom1} : «${sp()}J'ai $${texPrix(r)}$ €, soit $${texPrix(e)}$ € de moins que toi.${sp()}»<br>`
          if (this.interactif && !context.isAmc) {
            texte +=
              "Combien d'argent,  en tout, possèdent les deux filles ?<br>Les deux filles possèdent,  en tout, :"
            texte += ajouteChampTexteMathLive(this, i, ' ', {
              texteApres: ' €',
            })
          } else {
            texte +=
              "Combien d'argent en euros possèdent,  en tout, les deux filles ?"
          }
          texteCorr = `D'après l'énoncé, ${prenom2} a $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ € `
          texteCorr += texteEnCouleurEtGras('de moins')
          texteCorr += ` que ${prenom1} signifie que ${prenom1} a $${texPrix(e)}$ € `
          texteCorr += texteEnCouleurEtGras('de plus')
          texteCorr += ` que ${prenom2}. <br>${prenom1} a donc : $${texPrix(r)}$ € + $${texPrix(e)}$ € = $${texPrix(m)}$ €.`
          texteCorr += `<br>$${texPrix(r)}$ € + $${texPrix(m)}$ € = $${texPrix(somme)}$ € `
          texteCorr += texteEnCouleur(
            `<br>Les deux filles possèdent,  en tout, $${miseEnEvidence(texPrix(somme))}$ €.`,
          )

          break
        case 'dePlusPourAddition':
          m = r + e
          somme = m + r

          texte = `${prenom2} dit à ${prenom1} : «${sp()}Tu as $${texPrix(r)}$ €, j'ai $${texPrix(e)}$ € de plus que toi.${sp()}»<br>`
          if (this.interactif && !context.isAmc) {
            texte +=
              "Combien d'argent,  en tout, possèdent les deux filles ?<br>Les deux filles possèdent,  en tout, :"
            texte += ajouteChampTexteMathLive(this, i, ' ', {
              texteApres: ' €',
            })
          } else {
            texte +=
              "Combien d'argent en euros possèdent,  en tout, les deux filles ?"
          }
          texteCorr = `D'après l'énoncé, ${prenom1} a $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ € `
          texteCorr += texteEnCouleurEtGras('de plus')
          texteCorr += ` que ${prenom1}. <br>${prenom2} a donc : $${texPrix(r)}$ € + $${texPrix(e)}$ € = $${texPrix(m)}$ €.`
          texteCorr += `<br>$${texPrix(r)}$ € + $${texPrix(m)}$ € = $${texPrix(somme)}$ € `
          texteCorr += texteEnCouleur(
            `<br>Les deux filles possèdent,  en tout, $${miseEnEvidence(texPrix(somme))}$ €.`,
          )

          break
        case 'deMoinsPourSoustraction':
        default:
          m = r - e
          somme = m + r

          texte = `${prenom2} dit à ${prenom1} : «${sp()}Tu as $${texPrix(r)}$ €, j'ai $${texPrix(e)}$ € de moins que toi.${sp()}»<br>`
          if (this.interactif && !context.isAmc) {
            texte +=
              "Combien d'argent,  en tout, possèdent les deux filles ?<br>Les deux filles possèdent,  en tout, :"
            texte += ajouteChampTexteMathLive(this, i, ' ', {
              texteApres: ' €',
            })
          } else {
            texte +=
              "Combien d'argent en euros possèdent,  en tout, les deux filles ?"
          }
          texteCorr = `D'après l'énoncé, ${prenom1} a $${texPrix(r)}$ €.<br>${prenom2}  a $${texPrix(e)}$ € `
          texteCorr += texteEnCouleurEtGras('de moins')
          texteCorr += ` que ${prenom1}. <br>${prenom2} a donc : $${texPrix(r)}$ € - $${texPrix(e)}$ € = $${texPrix(m)}$ €.`
          texteCorr += `<br>$${texPrix(r)}$ € + $${texPrix(m)}$ € = $${texPrix(somme)}$ € `
          texteCorr += texteEnCouleur(
            `<br>Les deux filles possèdent,  en tout, $${miseEnEvidence(texPrix(somme))}$ €.`,
          )

          break
      }
      if (context.isAmc) setReponse(this, i, somme)
      else handleAnswers(this, i, { reponse: { value: texPrix(somme) } })

      if (this.questionJamaisPosee(i, m, somme)) {
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

function nombreDecimales(n: number): [number, number] {
  let r, e
  if (n === 0) {
    r = randint(40, 70)
    e = randint(10, 30)
    return [r, e]
  }
  if (n === 1) {
    r = (randint(40, 60) * 100 + randint(1, 9) * 10) / 100 // évite de retomber dans le cas n=0 par ex  4200/100
    e = (randint(10, 20) * 100 + randint(1, 9) * 10) / 100
    return [r, e]
  }
  r = (randint(40, 60) * 100 + randint(1, 9) * 10 + randint(1, 9)) / 100
  e = (randint(10, 20) * 100 + randint(1, 9) * 10 + randint(1, 9)) / 100
  return [r, e]
}
