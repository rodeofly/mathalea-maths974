import Exercice from '../Exercice'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import { choixDeroulant } from '../../lib/interactif/questionListeDeroulante'
import {
  combinaisonListes,
  enleveDoublonNum,
  shuffle,
} from '../../lib/outils/arrayOutils'
import type { AllChoicesType } from '../../lib/interactif/listeDeroulante/ListeDeroulante'
import { ajouteFeedback } from '../../lib/interactif/questionMathLive'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'

export const titre = "Connaître la définition d'une unité de volume"
export const interactifReady = true
export const interactifType = 'custom'
export const dateDePublication = '04/08/2025'

/**
 * Connaître la définition d'une unité de volume
 * @author Eric Elter (sur la base du 6M25-4)

 */
export const uuid = 'fa88c'

export const refs = {
  'fr-fr': ['5M21'],
  'fr-ch': [''],
}

export default class DefinitionUnitesVolumes extends Exercice {
  listeReponses: string[][]
  tabIndiceInteractif: number[]
  constructor() {
    super()

    this.nbQuestions = 2
    this.besoinFormulaireTexte = [
      'Nombre de listes déroulantes par question',
      [
        'Nombres séparés par des tirets  :',
        '1 : Une seule liste déroulante',
        '2 : Deux listes déroulantes',
        '3 : Trois listes déroulantes',
        '4 : Mélange',
      ].join('\n'),
    ]
    this.sup = '4'

    this.besoinFormulaire2Texte = [
      'Unités désirées',
      [
        'Nombres séparés par des tirets  :',
        '1 : cm³',
        '2 : dm³',
        '3 : m³',
        '4 : Mélange',
      ].join('\n'),
    ]
    this.sup2 = '4'

    this.listeReponses = []
    this.tabIndiceInteractif = []
  }

  nouvelleVersion() {
    let nbDeListesDeroulantes = gestionnaireFormulaireTexte({
      max: 3,
      defaut: 4,
      melange: 4,
      nbQuestions: this.nbQuestions,
      saisie: this.sup,
    }).map(Number)
    nbDeListesDeroulantes = combinaisonListes(nbDeListesDeroulantes, 50)

    const uneSeuleListeDeroulante = enleveDoublonNum([...nbDeListesDeroulantes])

    let unitesChoisies = gestionnaireFormulaireTexte({
      max: 3,
      defaut: 4,
      melange: 4,
      nbQuestions: this.nbQuestions,
      saisie: this.sup2,
      listeOfCase: ['cm', 'dm', 'm'],
    }).map(String)
    unitesChoisies = combinaisonListes(unitesChoisies, 50)

    this.consigne = this.interactif
      ? 'Choisir ' +
        (uneSeuleListeDeroulante.length === 1 &&
        uneSeuleListeDeroulante[0] === 1
          ? 'la bonne proposition'
          : 'les bonnes propositions')
      : 'Compléter'
    this.consigne += " afin d'obtenir "
    this.consigne +=
      this.nbQuestions === 1 ? ' une définition.' : ' des définitions.'

    const choixListeDeroulante: AllChoicesType[] = [
      [
        { label: "l'aire", value: 'aire' },
        { label: 'le périmètre', value: 'perimetre' },
        { label: 'la longueur', value: 'longueur' },
        { label: 'le volume', value: 'volume' },
      ],
      [
        { label: 'carré', value: 'carre' },
        { label: 'rectangle', value: 'rectangle' },
        { label: 'pavé droit', value: 'pave' },
        { label: 'triangle', value: 'triangle' },
        { label: 'cube', value: 'cube' },
      ],
      [
        { label: '1 mm', value: 'mm' },
        { label: '1 cm', value: 'cm' },
        { label: '1 dm', value: 'dm' },
        { label: '1 m', value: 'm' },
      ],
      [
        { label: '1 mm³', value: 'mm3' },
        { label: '1 cm³', value: 'cm3' },
        { label: '1 dm³', value: 'dm3' },
        { label: '1 m³', value: 'm3' },
      ],
    ]
    let indiceInteractif = 0
    this.tabIndiceInteractif = [0]
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const unite = unitesChoisies[cpt] // cpt choisi ici et dans tous les tableaux comme indice par pas assez de questions sinon.

      let texte = ''
      let texteCorr = ''
      const texteFixe = []
      const choixListeDeroulantePourCeCas: AllChoicesType[] = []
      let choixPossibilites = 0

      switch (nbDeListesDeroulantes[cpt]) {
        case 1:
          choixPossibilites = randint(1, 4)
          switch (choixPossibilites) {
            case 1:
              texteFixe.push(`$1$ ${unite}$^3$ est `)
              texteFixe.push(` d'un cube de $1$ ${unite} de côté.`)
              this.listeReponses[i] = ['volume']
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[0]),
              ])
              texteCorr = `$1$ ${unite}$^3$ est ${texteEnCouleurEtGras('le volume')} d'un cube de $1$ ${unite} de côté.`
              break
            case 2:
              texteFixe.push(`$1$ ${unite}$^3$ est le volume d'un cube de `)
              texteFixe.push(' de côté.')
              this.listeReponses[i] = [unite]
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[2]),
              ])
              texteCorr = `$1$ ${unite}$^3$ est le volume d'un cube de ${texteEnCouleurEtGras('1 ' + unite)} de côté.`
              break
            case 3:
              texteFixe.push(`$1$ ${unite}$^3$ est le volume d'un `)
              texteFixe.push(` de $1$ ${unite} de côté.`)
              this.listeReponses[i] = ['cube']
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[1]),
              ])
              texteCorr = `$1$ ${unite}$^3$ est le volume d'un ${texteEnCouleurEtGras('cube')} de $1$ ${unite} de côté.`
              break
            case 4:
              texteFixe.push('$1$ ')
              texteFixe.push(
                ` est le volume d'un cube de $1$ ${unite} de côté.`,
              )
              this.listeReponses[i] = [unite + '2']
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[3]),
              ])
              texteCorr = `1 ${texteEnCouleurEtGras(unite)}$${miseEnEvidence('^3')}$ est ${texteEnCouleurEtGras('le volume')} d'un cube de $1$ ${unite} de côté.`
              break
          }
          texte = texteFixe[0]
          texte += this.interactif
            ? choixDeroulant(
                this,
                indiceInteractif,
                choixListeDeroulantePourCeCas[0],
              )
            : '$\\ldots\\ldots\\ldots$'
          texte += texteFixe[1]
          break
        case 2:
          choixPossibilites = randint(1, 5)
          switch (choixPossibilites) {
            case 1:
              texteFixe.push(`$1$ ${unite}$^3$ est `)
              texteFixe.push(" d'un ")
              texteFixe.push(` de $1$ ${unite} de côté.`)
              this.listeReponses[i] = ['volume', 'cube']
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[0]),
              ])
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[1]),
              ])
              texteCorr = `$1$ ${unite}$^3$ est ${texteEnCouleurEtGras('le volume')} d'un ${texteEnCouleurEtGras('cube')} de $1$ ${unite} de côté.`
              break
            case 2:
              texteFixe.push(`$1$ ${unite}$^3$ est `)
              texteFixe.push(" d'un cube de ")
              texteFixe.push(' de côté.')
              this.listeReponses[i] = ['volume', unite]
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[0]),
              ])
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[2]),
              ])
              texteCorr = `$1$ ${unite}$^3$ est ${texteEnCouleurEtGras('le volume')} d'un cube de ${texteEnCouleurEtGras('1 ' + unite)} de côté.`
              break
            case 3:
              texteFixe.push(`$1$ ${unite}$^3$ est le volume d'un `)
              texteFixe.push(' de ')
              texteFixe.push(' de côté.')
              this.listeReponses[i] = ['cube', unite]
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[1]),
              ])
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[2]),
              ])
              texteCorr = `$1$ ${unite}$^3$ est le volume d'un ${texteEnCouleurEtGras('cube')} de ${texteEnCouleurEtGras('1 ' + unite)} de côté.`
              break
            case 4:
              texteFixe.push('$1$ ')
              texteFixe.push(' est ')
              texteFixe.push(` d'un cube de $1$ ${unite} de côté.`)
              this.listeReponses[i] = [unite + '2', 'volume']
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[3]),
              ])
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[0]),
              ])
              texteCorr = `1 ${texteEnCouleurEtGras(unite)}$${miseEnEvidence('^3')}$ est ${texteEnCouleurEtGras('le volume')} d'un cube de $1$ ${unite} de côté.`
              break
            case 5:
              texteFixe.push('$1$ ')
              texteFixe.push(" est l'aire d'un ")
              texteFixe.push(` de $1$ ${unite} de côté.`)
              this.listeReponses[i] = [unite + '2', 'cube']
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[3]),
              ])
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[1]),
              ])
              texteCorr = `1 ${texteEnCouleurEtGras(unite)}$${miseEnEvidence('^3')}$ est le volume d'un ${texteEnCouleurEtGras('cube')} de $1$ ${unite} de côté.`
              break
          }
          texte = texteFixe[0]
          texte += this.interactif
            ? choixDeroulant(
                this,
                indiceInteractif,
                choixListeDeroulantePourCeCas[0],
              )
            : '$\\ldots\\ldots\\ldots$'
          texte += texteFixe[1]
          texte += this.interactif
            ? choixDeroulant(
                this,
                indiceInteractif + 1,
                choixListeDeroulantePourCeCas[1],
              )
            : '$\\ldots\\ldots\\ldots$'
          texte += texteFixe[2]
          break
        case 3:
          choixPossibilites = randint(1, 2)
          switch (choixPossibilites) {
            case 1:
              texteFixe.push(`$1$ ${unite}$^3$ est `)
              texteFixe.push(" d'un ")
              texteFixe.push(' de ')
              texteFixe.push(' de côté.')
              this.listeReponses[i] = ['volume', 'cube', unite]
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
                ...shuffle(choixListeDeroulante[2]),
              ])
              texteCorr = `1 ${unite}$^3$ est ${texteEnCouleurEtGras('le volume')} d'un ${texteEnCouleurEtGras('cube')} de ${texteEnCouleurEtGras('1 ' + unite)} de côté.`
              break
            case 2:
              texteFixe.push('$1$ ')
              texteFixe.push(' est ')
              texteFixe.push(" d'un ")
              texteFixe.push(` de $1$ ${unite} de côté.`)
              texteFixe.push('')
              this.listeReponses[i] = [unite + '2', 'volume', 'cube']
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[3]),
              ])
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[0]),
              ])
              choixListeDeroulantePourCeCas.push([
                { label: 'Choisir une proposition', value: '' },
                ...shuffle(choixListeDeroulante[1]),
              ])
              texteCorr = `1 ${texteEnCouleurEtGras(unite)}$^3$ est ${texteEnCouleurEtGras('le volume')} d'un ${texteEnCouleurEtGras('cube')} de $1$ ${unite} de côté.`
              break
          }

          texte = texteFixe[0]
          texte += this.interactif
            ? choixDeroulant(
                this,
                indiceInteractif,
                choixListeDeroulantePourCeCas[0],
              )
            : '$\\ldots\\ldots\\ldots$'
          texte += texteFixe[1]
          texte += this.interactif
            ? choixDeroulant(
                this,
                indiceInteractif + 1,
                choixListeDeroulantePourCeCas[1],
              )
            : '$\\ldots\\ldots\\ldots$'
          texte += texteFixe[2]
          texte += this.interactif
            ? choixDeroulant(
                this,
                indiceInteractif + 2,
                choixListeDeroulantePourCeCas[2],
              )
            : '$\\ldots\\ldots\\ldots$'
          texte += texteFixe[3]
          break
      }

      if (
        this.questionJamaisPosee(
          i,
          unite,
          choixPossibilites,
          this.listeReponses[i].length,
        )
      ) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        texte += ajouteFeedback(this, i)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        indiceInteractif += this.listeReponses[i].length
        this.tabIndiceInteractif.push(indiceInteractif)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  correctionInteractive = (i: number) => {
    let spanReponseLigne = document.querySelector(
      `#resultatCheckEx${this.numeroExercice}Q0`,
    )
    let isOk = false
    if (this.listeReponses[i].length === 3) {
      const select1 = document.querySelector(
        `#ex${this.numeroExercice}Q${this.tabIndiceInteractif[i]}`,
      ) as HTMLSelectElement
      const select2 = document.querySelector(
        `#ex${this.numeroExercice}Q${this.tabIndiceInteractif[i] + 1}`,
      ) as HTMLSelectElement
      const select3 = document.querySelector(
        `#ex${this.numeroExercice}Q${this.tabIndiceInteractif[i] + 2}`,
      ) as HTMLSelectElement
      let isOk1 = false
      let isOk23 = false
      if (
        select1?.value != null &&
        select2.value != null &&
        select3.value != null
      ) {
        const choix1 = select1.value
        const choix2 = select2.value
        const choix3 = select3.value
        isOk1 = choix1 === this.listeReponses[i][0]
        isOk23 =
          choix2 === this.listeReponses[i][1] &&
          choix3 === this.listeReponses[i][2]
        isOk = isOk1 && isOk23
      } else {
        isOk = false
      }
      spanReponseLigne = document.querySelector(
        `#resultatCheckEx${this.numeroExercice}Q${this.tabIndiceInteractif[i] + 2}`,
      )
    } else if (this.listeReponses[i].length === 2) {
      const select1 = document.querySelector(
        `#ex${this.numeroExercice}Q${this.tabIndiceInteractif[i]}`,
      ) as HTMLSelectElement
      const select2 = document.querySelector(
        `#ex${this.numeroExercice}Q${this.tabIndiceInteractif[i] + 1}`,
      ) as HTMLSelectElement
      let isOk1 = false
      let isOk2 = false
      if (select1?.value != null && select2.value != null) {
        const choix1 = select1.value
        const choix2 = select2.value
        isOk1 = choix1 === this.listeReponses[i][0]
        isOk2 = choix2 === this.listeReponses[i][1]
        isOk = isOk1 && isOk2
      } else {
        isOk = false
      }
      spanReponseLigne = document.querySelector(
        `#resultatCheckEx${this.numeroExercice}Q${this.tabIndiceInteractif[i] + 1}`,
      )
    } else {
      // if (this.listeReponses[i].length === 1) {
      const select1 = document.querySelector(
        `#ex${this.numeroExercice}Q${this.tabIndiceInteractif[i]}`,
      ) as HTMLSelectElement
      if (select1?.value != null) {
        const choix1 = select1.value
        isOk = choix1 === this.listeReponses[i][0]
      }
      spanReponseLigne = document.querySelector(
        `#resultatCheckEx${this.numeroExercice}Q${this.tabIndiceInteractif[i]}`,
      )
    }

    if (spanReponseLigne == null)
      window.notify(`Pas trouvé le spanReponseLigne dans 5M21 pour i=${i}`, {})
    if (spanReponseLigne) {
      if (isOk) {
        spanReponseLigne.innerHTML = '😎'
      } else {
        spanReponseLigne.innerHTML = '☹️'
      }
    }

    return isOk ? 'OK' : 'KO'
  }
}
