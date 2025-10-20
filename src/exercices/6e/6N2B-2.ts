import { propositionsQcm } from '../../lib/interactif/qcm'
import { choice } from '../../lib/outils/arrayOutils'
import { texFractionFromString } from '../../lib/outils/deprecatedFractions'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { sp } from '../../lib/outils/outilString'
import { texNombre2 } from '../../lib/outils/texNombre'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const dateDePublication = '20/02/2021'
export const dateDeModifImportante = '22/08/2024'

export const amcReady = true
export const amcType = 'qcmMono'
export const interactifReady = true
export const interactifType = 'qcm'

export const titre = 'Multiplier par 0,1 ; 0,01 ; 0,001 (QCM)'

/**
 * @author Jean-claude Lhote
 * Relecture : Décembre 2021 par EE
 */
export const uuid = '021f3'

export const refs = {
  'fr-fr': ['6N2B-2'],
  'fr-2016': ['6C30-5'],
  'fr-ch': ['9NO8-4'],
}
export default class MultiplierPar001 extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Nombres entiers', true]
    this.besoinFormulaire2Texte = [
      'Type de questions',
      'Nombres séparés par des tirets :\n1 : Résultat à calculer\n2 : Nombre à retrouver\n3 : Fraction décimale à retrouver\n4 : Mélange',
    ]

    this.nbQuestions = 4 // Ici le nombre de questions

    this.consigne = 'Choisir la bonne réponse pour compléter les pointillés.'

    this.sup = false
    this.sup2 = 4
  }

  // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  nouvelleVersion() {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page

    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup2,
      min: 1,
      max: 3,
      melange: 4,
      defaut: 4,
      nbQuestions: this.nbQuestions,
    })

    const rang = ['millièmes', 'centièmes', 'dixièmes']

    for (
      let i = 0,
        texte,
        texteCorr,
        coef,
        nombre,
        nombreentier,
        resultat,
        exposant,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      coef = -randint(1, 3)
      if (!this.sup) {
        exposant = -randint(1, 3)
      } else {
        exposant = 0
      }
      nombreentier = randint(10, 1000) + randint(10, 999) * choice([0, 1000])
      nombre = nombreentier * 10 ** exposant
      resultat = nombre * 10 ** coef

      switch (
        listeTypeDeQuestions[i] // Chaque question peut être d'un type différent, ici 4 cas sont prévus...
      ) {
        case 1:
          texte = `$${texNombre2(nombre)} \\times ${texNombre2(10 ** coef)}${sp(2)}=${sp(2)}\\ldots\\ldots\\ldots\\ldots$`
          texteCorr = `Quand on multiplie par $${texNombre2(10 ** coef)}=${texFractionFromString(1, 10 ** -coef)}$, chaque chiffre prend une valeur $${texNombre2(10 ** -coef)}$ fois plus petite.<br>`
          texteCorr += `Le chiffre des unités se positionne donc dans les ${rang[3 + coef]} :<br>`
          texteCorr += `$${texNombre2(nombre)} \\times ${texNombre2(10 ** coef)}${sp(2)}=${sp(2)}${miseEnEvidence(texNombre2(resultat))}$`

          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(resultat)}$`,
              statut: true,
            },
            {
              texte: `$${texNombre2(nombre * 10 ** -coef)}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(nombre * 10 ** (coef - 1))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(nombre * 10 ** (-coef + 1))}$`,
              statut: false,
            },
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5,
          }
          break

        case 3:
          texte = `$${texNombre2(nombre)} \\times \\ldots\\ldots\\ldots${sp(2)}=${sp(2)}${texNombre2(resultat)}$`
          texteCorr = `Quand on multiplie par $${texNombre2(10 ** coef)}=${texFractionFromString(1, 10 ** -coef)}$, chaque chiffre prend une valeur $${texNombre2(10 ** -coef)}$ fois plus petite.<br>`
          texteCorr += `Le chiffre des unités se positionne donc dans les ${rang[3 + coef]} :<br>`
          texteCorr += `$${texNombre2(nombre)} \\times ${miseEnEvidence(texNombre2(10 ** coef))}${sp(2)}=${sp(2)}${texNombre2(resultat)}$`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(10 ** coef)}$`,
              statut: true,
            },
            {
              texte: `$${texNombre2(10 ** (coef - 1))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(10 ** (coef - 2))}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(10 ** -coef)}$`,
              statut: false,
            },
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5,
          }
          break

        case 2:
          texte = `$\\ldots\\ldots\\ldots\\ldots \\times ${texNombre2(10 ** coef)}${sp(2)}=${sp(2)}${texNombre2(resultat)}$`
          texteCorr = `Quand on multiplie par $${texNombre2(10 ** coef)}=${texFractionFromString(1, 10 ** -coef)}$, chaque chiffre prend une valeur $${texNombre2(10 ** -coef)}$ fois plus petite.<br>`
          texteCorr += `Le chiffre des unités se positionne donc dans les ${rang[3 + coef]} :<br>`
          texteCorr += `$${miseEnEvidence(texNombre2(nombre))} \\times ${texNombre2(10 ** coef)}${sp(2)}=${sp(2)}${texNombre2(resultat)}$`
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce = `${texte}\n`
          this.autoCorrection[i].propositions = [
            {
              texte: `$${texNombre2(nombre)}$`,
              statut: true,
            },
            {
              texte: `$${texNombre2(nombre / 10)}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(nombre * 10)}$`,
              statut: false,
            },
            {
              texte: `$${texNombre2(nombre * 10 ** (-coef + 1))}$`,
              statut: false,
            },
          ]
          this.autoCorrection[i].options = {
            ordered: false,
            lastChoice: 5,
          }
          break
      }
      const props = propositionsQcm(this, i)
      texte += `<br>${props.texte}`

      if (this.questionJamaisPosee(i, texte)) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
