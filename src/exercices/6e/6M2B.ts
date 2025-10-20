import type { AllChoicesType } from '../../lib/interactif/listeDeroulante/ListeDeroulante'
import { choixDeroulant } from '../../lib/interactif/questionListeDeroulante'
import { ajouteFeedback } from '../../lib/interactif/questionMathLive'
import { shuffle } from '../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre =
  'Connaître la formule de l’aire d’un carré ou d’un rectangle'
export const interactifReady = true
export const interactifType = 'custom'
export const dateDePublication = '03/08/2025'

/**
 * Connaître la formule de l’aire d’un carré ou d’un rectangle
 * @author Eric Elter
 */

export const uuid = 'f36f3'

export const refs = {
  'fr-fr': ['6M2B'],
  'fr-2016': ['6M25-3'],
  'fr-ch': [''],
}

export default class FormulesAireCarreRectangle extends Exercice {
  listeReponses: string[][]
  typeDeQuestions: ('mots' | 'operation')[]
  constructor() {
    super()

    this.nbQuestions = 2
    this.besoinFormulaireTexte = [
      'Type de questions',
      [
        'Nombres séparés par des tirets  :',
        '1 : Aire de carré (avec que des mots)',
        '2 : Aire de carré (avec signe et mots)',
        '3 : Aire de carré (avec des lettres)',
        '4 : Aire de rectangle (avec que des mots)',
        '5 : Aire de rectangle (avec signe et mots)',
        '6 : Aire de rectangle (avec des lettres)',
        '7 : Mélange',
      ].join('\n'),
    ]
    this.sup = 7

    this.listeReponses = []
    this.typeDeQuestions = []
  }

  nouvelleVersion() {
    this.consigne = this.interactif
      ? 'Choisir les bonnes propositions'
      : 'Compléter'
    this.consigne += " afin d'obtenir "
    this.consigne +=
      this.nbQuestions === 1 ? ' une définition.' : ' des définitions.'
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      max: 6,
      defaut: 7,
      melange: 7,
      nbQuestions: this.nbQuestions,
      saisie: this.sup,
    }).map(Number)

    const choixListeDeroulante: AllChoicesType[] = [
      [
        { label: 'au produit', value: 'produit' },
        { label: 'à la somme', value: 'somme' },
        { label: 'au quotient', value: 'quotient' },
        { label: 'à la différence', value: 'difference' },
      ],
      [
        { label: 'son côté', value: 'cote' },
        { label: 'sa longueur', value: 'longueur' },
        { label: 'sa largeur', value: 'largeur' },
        { label: 'sa diagonale', value: 'diagonale' },
        { label: 'quatre', value: 'quatre' },
      ],
      [
        { latex: '\\times', value: 'produit' },
        { latex: '+', value: 'somme' },
        { latex: '\\div', value: 'quotient' },
        { latex: '-', value: 'difference' },
      ],
      [
        { latex: 'c', value: 'cote' },
        { latex: 'p', value: 'perimetre' },
        { latex: 'L', value: 'longueur' },
        { latex: 'l', value: 'largeur' },
      ],
    ]

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      if (this.questionJamaisPosee(i, listeTypeDeQuestions[i])) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        let texte = ''
        let texteCorr = ''
        const texteFixe = []
        const choixListeDeroulantePourCeCas: AllChoicesType[] = []
        switch (listeTypeDeQuestions[i]) {
          case 1:
            texteFixe.push("L'aire d'un carré est égale ")
            texteFixe.push(' de ')
            texteFixe.push(' par ')
            this.listeReponses[i] = ['produit', 'cote', 'cote']
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[0]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[1]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[1]),
            ])
            this.typeDeQuestions[i] = 'mots'
            texteCorr = `L'aire d'un carré est égale au ${texteEnCouleurEtGras('produit')} de ${texteEnCouleurEtGras('son côté')} par ${texteEnCouleurEtGras('son côté')}.`
            break
          case 2:
            texteFixe.push("Aire d'un carré = ")
            texteFixe.push('')
            texteFixe.push('')
            this.listeReponses[i] = ['cote', 'produit', 'cote']
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[1]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[2]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[1]),
            ])
            this.typeDeQuestions[i] = 'operation'
            texteCorr = `Aire d'un carré =  ${texteEnCouleurEtGras('son côté')} $${miseEnEvidence('\\times')}$ ${texteEnCouleurEtGras('son côté')}`
            break
          case 3:
            texteFixe.push(`On a un carré dont on connaît la longueur d'un de ses côtés (notée $c$) et dont on peut trouver le périmètre $p$.<br>
            On peut alors donner l'aire du carré ainsi : `)
            texteFixe.push('')
            texteFixe.push('')
            this.listeReponses[i] = ['cote', 'produit', 'cote']
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[3]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[2]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[3]),
            ])
            this.typeDeQuestions[i] = 'operation'
            texteCorr = `Aire d'un carré =  ${texteEnCouleurEtGras('c')} $${miseEnEvidence('\\times')}$ ${texteEnCouleurEtGras('c')}`
            break
          case 4:
            texteFixe.push("L'aire d'un rectangle est égale ")
            texteFixe.push(' de ')
            texteFixe.push(' par ')
            this.listeReponses[i] = ['produit', 'longueur', 'largeur']
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[0]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[1]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[1]),
            ])
            this.typeDeQuestions[i] = 'mots'
            texteCorr = `L'aire d'un rectangle est égale au ${texteEnCouleurEtGras('produit')} de ${texteEnCouleurEtGras('sa longueur')} par ${texteEnCouleurEtGras('sa largeur')}.`
            break
          case 5:
            texteFixe.push("Aire d'un rectangle = ")
            texteFixe.push('')
            texteFixe.push('')
            this.listeReponses[i] = ['longueur', 'produit', 'largeur']
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[1]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[2]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[1]),
            ])
            this.typeDeQuestions[i] = 'operation'
            texteCorr = `Aire d'un rectangle =  ${texteEnCouleurEtGras('sa longueur')} $${miseEnEvidence('\\times')}$ ${texteEnCouleurEtGras('sa largeur')}`
            break
          case 6:
            texteFixe.push(`On a un rectangle dont on connaît la longueur et la largeur (notée respectivement $L$ et $l$) et dont on peut trouver le périmètre $p$.<br>
            On peut alors donner l'aire du rectangle ainsi : `)
            texteFixe.push('')
            texteFixe.push('')
            this.listeReponses[i] = ['longueur', 'produit', 'largeur']
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[3]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[2]),
            ])
            choixListeDeroulantePourCeCas.push([
              { label: 'Choisir une proposition', value: '' },
              ...shuffle(choixListeDeroulante[3]),
            ])
            this.typeDeQuestions[i] = 'operation'
            texteCorr = `Aire d'un rectangle =  ${texteEnCouleurEtGras('L')} $${miseEnEvidence('\\times')}$ ${texteEnCouleurEtGras('l')}`
            break
        }

        texte = texteFixe[0]
        texte += this.interactif
          ? choixDeroulant(this, 3 * i, choixListeDeroulantePourCeCas[0])
          : '$\\ldots\\ldots\\ldots$'
        texte += texteFixe[1]
        texte += this.interactif
          ? choixDeroulant(this, 3 * i + 1, choixListeDeroulantePourCeCas[1])
          : '$\\ldots\\ldots\\ldots$'
        texte += texteFixe[2]
        texte += this.interactif
          ? choixDeroulant(this, 3 * i + 2, choixListeDeroulantePourCeCas[2]) +
            '.'
          : '$\\ldots\\ldots\\ldots$'
        texte += ajouteFeedback(this, i)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        if (i < 5) i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  correctionInteractive = (i: number) => {
    const select1 = document.querySelector(
      `#ex${this.numeroExercice}Q${3 * i}`,
    ) as HTMLSelectElement
    const select2 = document.querySelector(
      `#ex${this.numeroExercice}Q${3 * i + 1}`,
    ) as HTMLSelectElement
    const select3 = document.querySelector(
      `#ex${this.numeroExercice}Q${3 * i + 2}`,
    ) as HTMLSelectElement
    let isOk = false
    let isOk1 = false
    let isOk23 = false
    let feedback = ''
    if (
      select1?.value != null &&
      select2.value != null &&
      select3.value != null
    ) {
      const choix1 = select1.value
      const choix2 = select2.value
      const choix3 = select3.value
      if (this.typeDeQuestions[i] === 'mots') {
        isOk1 = choix1 === this.listeReponses[i][0]
        isOk23 =
          (choix2 === this.listeReponses[i][1] &&
            choix3 === this.listeReponses[i][2]) ||
          (choix2 === this.listeReponses[i][2] &&
            choix3 === this.listeReponses[i][1])
        isOk = isOk1 && isOk23

        if (!isOk1) {
          const pronom = choix1[choix1.length - 1] === 't' ? 'au' : 'à la'
          feedback = `Non, par définition, cette aire n'est pas égale ${pronom} ${choix1} de deux éléments.`
        } else if (!isOk) {
          feedback =
            'Cette aire est bien un produit mais pas des éléments choisis.'
        }
      } else {
        // operation
        isOk1 = choix2 === this.listeReponses[i][1]
        isOk23 =
          (choix1 === this.listeReponses[i][0] &&
            choix3 === this.listeReponses[i][2]) ||
          (choix1 === this.listeReponses[i][2] &&
            choix3 === this.listeReponses[i][0])
        isOk = isOk1 && isOk23

        if (!isOk1) {
          const pronom = choix2[choix2.length - 1] === 't' ? 'au' : 'à la'
          feedback = `Non, par définition, cette aire n'est pas égale ${pronom} ${choix2} de deux éléments.`
        } else if (!isOk) {
          feedback =
            'Cette aire est bien un produit mais pas des éléments choisis.'
        }
      }
    } else {
      isOk = false
    }
    if (i < 6) {
      // Pour éviter la création d'un champ impossible nb de questions > 6
      const spanReponseLigne = document.querySelector(
        `#resultatCheckEx${this.numeroExercice}Q${3 * i + 2}`,
      )
      if (spanReponseLigne == null)
        window.notify(
          `Pas trouvé le spanReponseLigne dans 6M25-3 pour i=${i}`,
          {},
        )
      if (spanReponseLigne) {
        if (isOk) {
          spanReponseLigne.innerHTML = '😎'
        } else {
          spanReponseLigne.innerHTML = '☹️'
        }
      }

      if (feedback !== '') {
        const divFeedback = document.querySelector(
          `div#feedbackEx${this.numeroExercice}Q${i}`,
        )
        if (divFeedback instanceof HTMLElement) {
          divFeedback.innerHTML = feedback
          divFeedback.style.display = 'block'
        }
      }
    }
    return isOk ? 'OK' : 'KO'
  }
}
