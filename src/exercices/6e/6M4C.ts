// import { MathfieldElement } from 'mathlive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import Hms from '../../modules/Hms'
import Operation from '../../modules/operations'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Convertir des durées'
export const interactifReady = true
// export const interactifType = 'custom'
export const interactifType = 'mathLive'

/**
 * Conversions de durées.
 * * 1 : H vers min ou H ou min ou Hmin vers s
 * * 2 : h vers j-h
 * * 3 : s vers h min s
 * * 4 : h vers semaines j h
 * * 5 : toutes les conversions
 * @author Rémi Angot
 */
export const dateDeModifImportante = '10/11/2024'
export const uuid = '8b0f9'

export const refs = {
  'fr-fr': ['6M4C', '3AutoG06-5'],
  'fr-2016': ['6D10'],
  'fr-ch': ['10GM3-1'],
}
export default class ConversionsDeDurees extends Exercice {
  expectedAnswers: Hms[] = []
  constructor() {
    super()
    this.sup = 5
    this.consigne = 'Convertir.'
    this.spacing = 2
    this.nbQuestions = 5
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      5,
      '1 : Conversions en secondes ou minutes\n2 : Conversions en jours-heures\n3 : Conversions en heures-minutes-secondes\n4 : Conversions en semaines-jours-heures\n5 : Mélange',
    ]
  }

  nouvelleVersion() {
    const listeSousTypeDeQuestionV1 = combinaisonListes(
      [1, 2, 3, 4],
      this.nbQuestions,
    )
    const listeSousTypeDeQuestionV2 = combinaisonListes(
      [0, 1, 2],
      this.nbQuestions,
    )
    let typesDeQuestions = []
    if (this.sup < 5) {
      typesDeQuestions = combinaisonListes([this.sup], this.nbQuestions)
    }
    if (parseInt(this.sup) === 5) {
      typesDeQuestions = combinaisonListes([1, 2, 3, 4], this.nbQuestions)
    }
    let texte = ''
    let texteCorr = ''
    let h = 0
    let m = 0
    let s = 0
    let j = 0

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      if (typesDeQuestions[i] === 1) {
        const sousTypeDeQuestion = listeSousTypeDeQuestionV1[i]
        if (sousTypeDeQuestion === 1) {
          h = randint(2, 11)
          texte = `$${h}~\\text{h en minutes.}$`
          texteCorr = `$${h}~\\text{h} = ${h}\\times60~\\text{min} = `
          texteCorr += miseEnEvidence(`${texNombre(h * 60)}~\\text{min}`) + '$'
          this.expectedAnswers[i] = new Hms({ minute: 60 * h })
        }
        if (sousTypeDeQuestion === 2) {
          h = choice([1, 2, 10, 20])
          texte = `$${h}~\\text{h en secondes.}$`
          texteCorr = `$${h}~\\text{h} = ${h}\\times3~600~\\text{s} = `
          texteCorr += miseEnEvidence(`${texNombre(h * 3600)}~\\text{s}`) + '$'
          this.expectedAnswers[i] = new Hms({ second: h * 3600 })
        }
        if (sousTypeDeQuestion === 3) {
          m = randint(2, 59)
          texte = `$${m}~\\text{min en secondes.}$`
          texteCorr = `$${m}~\\text{min} = ${m}\\times60~\\text{s} = `
          texteCorr += miseEnEvidence(`${texNombre(m * 60)}~\\text{s}`) + '$'
          this.expectedAnswers[i] = new Hms({ second: m * 60 })
        }
        if (sousTypeDeQuestion === 4) {
          h = randint(1, 2)
          m = randint(2, 59)
          texte = `$${h}~\\text{h}~${m}~\\text{min en secondes.}$`
          texteCorr = `$${h}~\\text{h}~${m}~\\text{min} = ${h}\\times3~600~\\text{s} + ${m}\\times60~\\text{s} = ${texNombre(
            h * 3600,
          )}+${texNombre(m * 60)}~\\text{s} = `
          texteCorr +=
            miseEnEvidence(`${texNombre(h * 3600 + m * 60)}~\\text{s}`) + '$'
          this.expectedAnswers[i] = new Hms({ second: h * 3600 + m * 60 })
        }
      }
      if (typesDeQuestions[i] === 2) {
        j = randint(1, 6)
        h = randint(1, 23)
        texte = `$${texNombre(h + 24 * j)}~\\text{h en jours et heures.}$`
        texteCorr =
          Operation({
            operande1: h + 24 * j,
            operande2: 24,
            type: 'divisionE',
            style: 'margin-bottom: 1em',
          }) ?? ''
        texteCorr += `<br>$${texNombre(
          h + 24 * j,
        )}~\\text{h} = ${j}\\times24~\\text{h} + ${h}~\\text{h} = `
        texteCorr += miseEnEvidence(`${j}~\\text{j}~${h}~\\text{h}`) + '$'
        this.expectedAnswers[i] = new Hms({ day: j, hour: h })
      }

      if (typesDeQuestions[i] === 3) {
        h = listeSousTypeDeQuestionV2[i]
        m = randint(1, 59)
        s = randint(1, 59)
        if (h > 0) {
          texte = `$${texNombre(
            h * 3600 + m * 60 + s,
          )}~\\text{s en heures, minutes et secondes.}$`
          texteCorr =
            Operation({
              operande1: h * 3600 + m * 60 + s,
              operande2: 3600,
              type: 'divisionE',
              style: 'margin-bottom: 1em',
            }) ?? ''
          texteCorr +=
            Operation({
              operande1: m * 60 + s,
              operande2: 60,
              type: 'divisionE',
              style: 'margin-bottom: 1em',
            }) ?? ''
          texteCorr += `<br>$${texNombre(
            h * 3600 + m * 60 + s,
          )}~\\text{s} = ${texNombre(h * 3600)}~\\text{s}+${texNombre(
            m * 60 + s,
          )}~\\text{s} =${h}~\\text{h}+${m}\\times60~\\text{s}+${s}~\\text{s}= `
          texteCorr +=
            miseEnEvidence(`${h}~\\text{h}~${m}~\\text{min}~${s}~\\text{s}`) +
            '$'
          this.expectedAnswers[i] = new Hms({ hour: h, minute: m, second: s })
        } else {
          texte = `$${texNombre(m * 60 + s)}~\\text{s en heures, minutes et secondes.}$`
          texteCorr = `$${texNombre(
            m * 60 + s,
          )}~\\text{s} = ${m}\\times60~\\text{s}+${s}~\\text{s}=${m}~\\text{min}~${s}~\\text{s}$`
          this.expectedAnswers[i] = new Hms({ minute: m, second: s })
        }
      }
      if (typesDeQuestions[i] === 4) {
        s = randint(2, 9) // nombre de semaines
        j = randint(1, 6)
        h = randint(1, 23)
        texte = `$${texNombre(
          h + 24 * j + 24 * 7 * s,
        )}~\\text{h en semaines jours et heures.}$`
        if (s > 1) {
          // pour la gestion du pluriel de semaines
          texteCorr =
            Operation({
              operande1: h + 24 * j + 24 * 7 * s,
              operande2: 24,
              type: 'divisionE',
              style: 'margin-bottom: 1em',
            }) ?? ''
          texteCorr +=
            Operation({
              operande1: 7 * s + j,
              operande2: 7,
              type: 'divisionE',
              style: 'margin-bottom: 1em',
            }) ?? ''
          texteCorr += `<br>$${texNombre(h + 24 * j + 24 * 7 * s)}~\\text{h} = ${
            j + 7 * s
          }\\times24~\\text{h} + ${h}~\\text{h} = ${
            j + 7 * s
          }~\\text{j}~${h}~\\text{h} = ${s}\\times7~\\text{j} + ${j}~\\text{j}~${h}~\\text{h} = `
          texteCorr +=
            miseEnEvidence(
              `${s}~\\text{semaines}~${j}~\\text{j}~${h}~\\text{h}`,
            ) + '$'
          this.expectedAnswers[i] = new Hms({ week: s, day: j, hour: h })
        } else {
          // Plus utilisé pour ne pas avoir à gérer le pluriel de semaines dans le champ de réponse
          texteCorr = `$${texNombre(h + 24 * j + 24 * 7 * s)}~\\text{h} = ${
            j + 7 * s
          }\\times24~\\text{h} + ${h}~\\text{h} = ${
            j + 7 * s
          }~\\text{j}~${h}~\\text{h} = ${s}\\times7~\\text{j} + ${j}~\\text{j}~${h}~\\text{h} = `
          texteCorr +=
            miseEnEvidence(
              `${s}~\\text{semaine}~${j}~\\text{j}~${h}~\\text{h}`,
            ) + '$'
          this.expectedAnswers[i] = new Hms({ week: s, day: j, hour: h })
        }
      }

      if (this.interactif) {
        texte = texte.replace('.', ' : ')
        texte += ajouteChampTexteMathLive(this, i, KeyboardType.clavierHms)
        handleAnswers(this, i, {
          reponse: {
            value: this.expectedAnswers[i].toString(),
            options: { HMS: true },
          },
        })
      }
      // if (this.listeQuestions.indexOf(texte) === -1) {
      if (this.questionJamaisPosee(i, m, s, h, j)) {
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

  /*
  correctionInteractive = (i: number) => {
    const mf = document.querySelector(`math-field#champTexteEx${this.numeroExercice}Q${i}`)
    if (mf instanceof MathfieldElement === false) return 'KO'
    mf.readOnly = true
    // Sauvegarde de la réponse pour Capytale
    if (this.answers == null) this.answers = {}
    this.answers[`Ex${this.numeroExercice}Q${i}`] = mf.getValue()
    // Saisie fournie par l'utilisateur qu'on va comparer éventuellement avec la réponse attendue.
    const input = mf.value
    // Partie test de la saisie de l'utilisateur
    let feedback = ''
    const inputHms = Hms.fromString(input)
    let isEqual = false
    let isInGoodFormat = false
    if (inputHms.isEqual(this.expectedAnswers[i])) {
      isEqual = true
    }
    if (inputHms.isTheSame(this.expectedAnswers[i])) {
      isInGoodFormat = true
    }
    let smiley = ''
    let reponse = ''
    if (isEqual && isInGoodFormat) {
      smiley = '😎'
      reponse = 'OK'
    } else {
      smiley = '☹️'
      reponse = 'KO'
    }
    if (isEqual && !isInGoodFormat) {
      feedback = 'La durée est bien égale mais pas dans le format attendu.'
    }
    // Affichage du feedback
    const divFeedback = document.querySelector(`#feedbackEx${this.numeroExercice}Q${i}`)
    if (divFeedback && divFeedback instanceof HTMLElement) {
      divFeedback.innerHTML = feedback
      divFeedback.style.display = 'block'
    }
    // Affichage du smiley
    const divCheck = document.querySelector(`span#resultatCheckEx${this.numeroExercice}Q${i}`)
    if (divCheck) divCheck.innerHTML = smiley
    return reponse
  } */
}
