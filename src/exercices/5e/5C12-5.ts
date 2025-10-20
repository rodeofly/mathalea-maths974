import { bleuMathalea } from '../../lib/colors'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { arrondi } from '../../lib/outils/nombres'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Calculs avec des grands traits de fractions'
export const interactifReady = true
export const interactifType = 'mathlive'

export const dateDePublication = '23/11/2024'

export const uuid = '1cd63'
export const refs = {
  'fr-fr': ['5C12-5', 'BP2AutoH21'],
  'fr-ch': ['11NO5-13', '1mCN-16'],
}
/**
 * @author Rémi Angot
 */
export default class CalculsAvecGrandsTraitsDeFraction extends Exercice {
  constructor() {
    super()
    this.consigne = 'Calculer.'
    this.nbQuestions = 6
    this.comment =
      "6 types de calculs différents avec une division d'un entier par 10 et 5 quotients entiers."
    this.listeAvecNumerotation = false
  }

  nouvelleVersion() {
    const typeQuestionsDisponibles = [
      'a/b*c-d',
      '(a-b)/(c+d)+e',
      'a/b+c',
      'a/(b+c)+d',
      '(a+b)/10+c',
      'a+b*(c+d)/(e*f)',
    ]
    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      let answer = Number.NaN
      switch (listeTypeQuestions[i]) {
        case 'a/b*c-d': {
          const b = randint(2, 9)
          const a = b * randint(2, 9)
          const c = randint(2, 9, [a, b])
          const d = randint(2, Math.min((a / b) * c - 1, 11))
          texte = `$${lettreDepuisChiffre(i + 1)} = \\dfrac{${a}}{${b}} \\times ${c} - ${d}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`\\dfrac{${a}}{${b}}`)} \\times ${c} - ${d}$`
          answer = (a / b) * c - d
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`${a / b} \\times ${c}`)} - ${d}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`${(a / b) * c} - ${d}`)}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(answer.toString())}$`
          break
        }
        case '(a-b)/(c+d)+e': {
          const c = randint(2, 9)
          const d = randint(1, 11 - c)
          const numerateur = (c + d) * randint(2, 9)
          const b = randint(2, Math.min(numerateur - 1, 11))
          const a = numerateur + b
          const e = randint(2, 9)
          texte = `$${lettreDepuisChiffre(i + 1)} = \\dfrac{${a} - ${b}}{${c} + ${d}} + ${e}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = \\dfrac{${calculPrioritaire(`${a} - ${b}`)}}{${calculPrioritaire(`${c} + ${d}`)}} + ${e}$`
          answer = (a - b) / (c + d) + e
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`\\dfrac{${a - b}}{${c + d}}`)} + ${e}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`${(a - b) / (c + d)} + ${e}`)}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(answer.toString())}$`
          break
        }
        case 'a/b+c': {
          const b = randint(4, 9)
          const a = b * randint(2, 9)
          const c = randint(2, 9, [a, b])
          texte = `$${lettreDepuisChiffre(i + 1)} = \\dfrac{${a}}{${b}} + ${c}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`\\dfrac{${a}}{${b}}`)} + ${c}$`
          answer = a / b + c
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`${a / b} + ${c}`)}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(answer.toString())}$`
          break
        }
        case 'a/(b+c)+d': {
          const b = randint(1, 8)
          const c = randint(2, 11 - b, [b])
          const a = (b + c) * randint(2, 9)
          const d = randint(2, 9)
          texte = `$${lettreDepuisChiffre(i + 1)} = \\dfrac{${a}}{${b} + ${c}} + ${d}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = \\dfrac{${a}}{${calculPrioritaire(`${b} + ${c}`)}} + ${d}$`
          answer = a / (b + c) + d
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`\\dfrac{${a}}{${b + c}}`)}  +  ${d}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`${a / (b + c)} + ${d}`)}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(answer.toString())}$`
          break
        }
        case '(a+b)/10+c': {
          const a = randint(1, 9)
          const b = randint(1, 10 - a)
          const k = randint(1, 6)
          const d = 10 - k
          const c = randint(2, 9)
          answer = arrondi((a + b) / 10 + c, 1)
          texte = `$${lettreDepuisChiffre(i + 1)} = \\dfrac{${a} + ${b}}{${d} + ${k} } + ${c}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = \\dfrac{${calculPrioritaire(`${a} + ${b}`)}}{${calculPrioritaire(`${d} + ${k}`)}} + ${c}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`\\dfrac{${a + b}}{10} + ${c}`)}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${calculPrioritaire(`${texNombre(answer - c)} + ${c}`)}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(texNombre(answer))}$`
          break
        }
        case 'a+b*(c+d)/(e*f)': {
          const a = randint(1, 9)
          const b = randint(2, 10)
          const e = randint(2, 3)
          const f = randint(2, 3)
          const numerateur = e * f * randint(2, 9)
          const d = randint(1, Math.min(numerateur - 1, 11))
          const c = numerateur - d
          answer = a + (b * (c + d)) / (e * f)
          texte = `$${lettreDepuisChiffre(i + 1)} = ${a} + ${b} \\times \\dfrac{${c} + ${d}}{${e} \\times ${f}}$`
          texteCorr = `$${lettreDepuisChiffre(i + 1)} = ${a} + ${b} \\times \\dfrac{${calculPrioritaire(`${c} + ${d}`)}}{${calculPrioritaire(`${e} \\times ${f}`)}}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${a} + ${b} \\times ${calculPrioritaire(`\\dfrac{${c + d}}{${e * f}}`)}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${a} + ${calculPrioritaire(`${b} \\times ${(c + d) / (e * f)}`)}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} =  ${calculPrioritaire(`${a} +  ${(b * (c + d)) / (e * f)}`)}$`
          texteCorr += `<br><br>$${lettreDepuisChiffre(i + 1)} = ${miseEnEvidence(answer.toString())}$`
          break
        }
      }
      if (this.interactif) {
        texte +=
          '<br><br>' +
          ajouteChampTexteMathLive(this, i, KeyboardType.clavierDeBase, {
            texteAvant: `$${lettreDepuisChiffre(i + 1)} = $`,
          })
        // @ts-expect-error typage handleanswer
        handleAnswers(this, i, {
          reponse: {
            value: answer,
            options: { nombreDecimalSeulement: true },
          },
        })
      }
      if (this.questionJamaisPosee(i, answer)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}

function calculPrioritaire(text: string) {
  return miseEnEvidence(text, bleuMathalea)
}
