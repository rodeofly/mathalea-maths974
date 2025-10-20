import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { texNombre2 } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import {
  listeQuestionsToContenuSansNumero,
  listeQuestionsToContenu,
} from '../../modules/outils'
import { propositionsQcm } from '../../lib/interactif/qcm'
export const amcReady = true
export const amcType = 'qcmMult'
export const interactifReady = true
export const interactifType = 'qcm'

export const titre =
  'Utiliser les critères de divisibilité (plusieurs possibles)'

/**
 * Un nombre est-il divisible par 2, 3, 5, 9 ?
 *
 *
 * @author Rémi Angot
 * 6N43-2
 */
export const uuid = 'fa2eb'

export const refs = {
  'fr-fr': ['5A11-4'],
  'fr-2016': ['6N43-2'],
  'fr-ch': ['9NO4-5'],
}
export default class TableauCriteresDeDivisibilite extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = ['Gros nombres', false]

    this.nbQuestions = 5

    this.sup = false
    this.listeAvecNumerotation = false
  }

  nouvelleVersion() {
    if (!this.interactif) {
      this.consigne =
        'Compléter le tableau en mettant oui ou non dans chaque case.'
    } else {
      this.consigne =
        'Mettre une croix dans la case qui convient (ou les cases qui conviennent).'
    }

    const listeDesNombresPossibles = [
      'div2', // Divisible uniquement par 2
      'div3',
      'div39', // Divisible par 3 et 9
      'div5',
      'div25',
      'div23',
      'div239', // Divisible par 2, 3 et 9
      'div35',
      'div2359', // Divisible par 2, 3, 5 et 9
      'divrien', // Divisible ni par 2, ni par 3 ni par 5 ni par 9
    ]
    // divisible par 2, divisible par 3, divisible par 3 et 9...

    const listeDesTypesDeNombres = combinaisonListes(
      listeDesNombresPossibles,
      this.nbQuestions,
    )
    const tableauDeNombres = []
    let texte
    let texteCorr
    const tableauDeNombresAvecCorrection = []
    const listeDeFacteurs = [
      7, 13, 17, 19, 23, 29, 37, 43, 47, 53, 59, 67, 73, 79, 83, 89, 97, 103,
      107, 109, 113, 127, 137, 139, 149, 157, 163, 167, 173, 179, 193, 197, 199,
      223, 227, 229, 233, 239, 257, 263, 269, 277, 281, 283, 293,
    ]
    texteCorr = ''
    texte = ''
    for (let i = 0; i < this.nbQuestions; i++) {
      this.autoCorrection[i] = {}
      this.autoCorrection[i].options = {}
      switch (listeDesTypesDeNombres[i]) {
        case 'div2':
          tableauDeNombres[i] =
            2 *
            (this.sup
              ? choice(listeDeFacteurs.slice(30))
              : choice(listeDeFacteurs)) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\color{blue}{\\text{oui}} & \\text{non} & \\text{non} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '3',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 3.",
            },
            {
              texte: '5',
              statut: false,
              feedback: "Le chiffre des unités n'est ni 0, ni 5.",
            },
            {
              texte: '9',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 9.",
            },
            {
              texte: 'aucun de ces nombres',
              statut: false,
              feedback:
                'Le chiffre des unités est 0, 2, 4, 6 ou 8, il est donc divisible par 2.',
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`

          break
        case 'div3':
          tableauDeNombres[i] =
            3 *
            (this.sup
              ? choice(listeDeFacteurs.slice(30))
              : choice(listeDeFacteurs)) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\text{non} & \\color{blue}{\\text{oui}} & \\text{non} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: false,
              feedback:
                "Le chiffre des unités n'est ni 0, ni 2, ni 4, ni 6, ni 8. Il n'est pas divisible par 2.",
            },
            {
              texte: '3',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '5',
              statut: false,
              feedback: "Le chiffre des unités n'est ni 0, ni 5.",
            },
            {
              texte: '9',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 9.",
            },
            {
              texte: 'aucun de ces nombres',
              statut: false,
              feedback:
                'Ce nombre est divisible par 3 car la somme de ses chiffres est divisible par 3.',
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`
          break
        case 'div39':
          tableauDeNombres[i] =
            9 *
            (this.sup
              ? choice(listeDeFacteurs.slice(30))
              : choice(listeDeFacteurs)) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\text{non} & \\color{blue}{\\text{oui}} & \\text{non} & \\color{blue}{\\text{oui}} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: false,
              feedback:
                "Le chiffre des unités n'est ni 0, ni 2, ni 4, ni 6, ni 8. Il n'est pas divisible par 2.",
            },
            {
              texte: '3',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '5',
              statut: false,
              feedback: "Le chiffre des unités n'est ni 0, ni 5.",
            },
            {
              texte: '9',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: 'aucun de ces nombres',
              statut: false,
              feedback:
                'Ce nombre est divisible par 9 et par 3 car la somme de ses chiffres est divisible par 9.',
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`
          break
        case 'div5':
          tableauDeNombres[i] =
            5 *
            (this.sup
              ? choice(listeDeFacteurs.slice(30))
              : choice(listeDeFacteurs)) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\text{non} & \\text{non} & \\color{blue}{\\text{oui}} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: false,
              feedback:
                "Le chiffre des unités n'est ni 0, ni 2, ni 4, ni 6, ni 8. Il n'est pas divisible par 2.",
            },
            {
              texte: '3',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 3.",
            },
            {
              texte: '5',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '9',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 9.",
            },
            {
              texte: 'aucun de ces nombres',
              statut: false,
              feedback: `Ce nombre est divisible par 5 car son chiffre des unités est $${tableauDeNombres[i].toString().charAt(tableauDeNombres[i].toString().length - 1)}$.`,
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`
          break
        case 'div25':
          tableauDeNombres[i] =
            10 *
            (this.sup
              ? choice(listeDeFacteurs.slice(30))
              : choice(listeDeFacteurs)) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\color{blue}{\\text{oui}} & \\text{non} & \\color{blue}{\\text{oui}} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '3',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 3.",
            },
            {
              texte: '5',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '9',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 9.",
            },
            {
              texte: 'aucun de ces nombres',
              statut: false,
              feedback:
                'Ce nombre est un multiple de 10. Il est donc divisible par 2 et par 5.',
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`
          break
        case 'div23':
          tableauDeNombres[i] =
            6 *
            (this.sup
              ? choice(listeDeFacteurs.slice(30))
              : choice(listeDeFacteurs)) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\color{blue}{\\text{oui}} & \\color{blue}{\\text{oui}} & \\text{non} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '3',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '5',
              statut: false,
              feedback: "Le chiffre des unités n'est ni 0, ni 5.",
            },
            {
              texte: '9',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 9.",
            },
            {
              texte: 'aucun de ces nombres',
              statut: false,
              feedback:
                'Ce nombre est un nombre pair. Il est donc divisible par 2.',
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`
          break
        case 'div239':
          tableauDeNombres[i] =
            18 *
            (this.sup
              ? choice(listeDeFacteurs.slice(30))
              : choice(listeDeFacteurs)) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\color{blue}{\\text{oui}} & \\color{blue}{\\text{oui}} & \\text{non} & \\color{blue}{\\text{oui}} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '3',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '5',
              statut: false,
              feedback: "Le chiffre des unités n'est ni 0, ni 5.",
            },
            {
              texte: '9',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: 'aucun de ces nombres',
              statut: false,
              feedback:
                'Ce nombre est un nombre pair. Il est donc divisible par 2.',
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`
          break
        case 'div35':
          tableauDeNombres[i] =
            15 *
            (this.sup
              ? choice(listeDeFacteurs.slice(30))
              : choice(listeDeFacteurs)) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\text{non} & \\color{blue}{\\text{oui}} & \\color{blue}{\\text{oui}} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: false,
              feedback:
                "Le chiffre des unités n'est ni 0, ni 2, ni 4, ni 6, ni 8. Il n'est pas divisible par 2.",
            },
            {
              texte: '3',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '5',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '9',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 9.",
            },
            {
              texte: 'aucun de ces nombres',
              statut: false,
              feedback:
                'Ce nombre est un nombre pair. Il est donc divisible par 2.',
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`
          break
        case 'div2359':
          tableauDeNombres[i] =
            90 *
            (this.sup
              ? choice(listeDeFacteurs.slice(30))
              : choice(listeDeFacteurs)) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\color{blue}{\\text{oui}} & \\color{blue}{\\text{oui}} & \\color{blue}{\\text{oui}} & \\color{blue}{\\text{oui}} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '3',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '5',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: '9',
              statut: true,
              feedback: 'Correct !',
            },
            {
              texte: 'aucun de ces nombres',
              statut: false,
              feedback:
                'Ce nombre est un nombre pair. Il est donc divisible par 2.',
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`
          break
        case 'divrien':
          tableauDeNombres[i] =
            choice(listeDeFacteurs) *
            (this.sup ? choice(listeDeFacteurs.slice(30)) : 1)
          tableauDeNombresAvecCorrection[i] = `${texNombre2(
            tableauDeNombres[i],
          )} & \\text{non} & \\text{non} & \\text{non} & \\text{non} \\\\`
          this.autoCorrection[i].propositions = [
            {
              texte: '2',
              statut: false,
              feedback:
                "Ce nombre est un nombre impair. Il ,'est pas divisible par 2.",
            },
            {
              texte: '3',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 3.",
            },
            {
              texte: '5',
              statut: false,
              feedback: "Le chiffre des unités n'est ni 0, ni 5.",
            },
            {
              texte: '9',
              statut: false,
              feedback: "La somme des chiffres n'est pas divisible par 9.",
            },
            {
              texte: 'aucun de ces nombres',
              statut: true,
              feedback: 'Correct !',
            },
          ]
          this.autoCorrection[i].enonce =
            `$${texNombre2(tableauDeNombres[i])}$ est divisible par\n`
          break
      }
      this.autoCorrection[i].options = {
        ordered: true,
        lastChoice: 4,
      }
      const props = propositionsQcm(this, i)

      if (!context.isAmc && this.interactif) {
        texte += `$${texNombre2(tableauDeNombres[i])}$ est divisible par : `
        texte += props.texte
        texte += '<br>'
      }
    } // fin de boucle de préparation des question
    // mise en forme selon les cas de figures
    // l'enoncé
    if (context.isHtml && !this.interactif) {
      texte = '$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|c|}\n'
    }
    if (!context.isHtml && !this.interactif) {
      texte = '\n\n$\\begin{array}{|l|c|c|c|c|}\n'
    }
    if (!context.isAmc && !this.interactif) {
      texte += '\\hline\n'
      texte +=
        '\\text{... est divisible} & \\text{par }2 & \\text{par }3 & \\text{par }5 & \\text{par }9\\\\\n'
      texte += '\\hline\n'
      for (let k = 0; k < this.nbQuestions; k++) {
        texte += `${texNombre2(tableauDeNombres[k])} & & & & \\\\\n`
        texte += '\\hline\n'
      }
      texte += '\\end{array}\n$'
    }

    // la correction
    if (context.isHtml) {
      texteCorr = '$\\def\\arraystretch{2.5}\\begin{array}{|l|c|c|c|c|}\n'
    }
    if (!context.isHtml && !context.isAmc) {
      texteCorr = '$\\begin{array}{|l|c|c|c|c|}\n'
    }

    if (!context.isAmc) {
      texteCorr += '\\hline\n'
      texteCorr +=
        '\\text{... est divisible} & \\text{par }2 & \\text{par }3 & \\text{par }5 & \\text{par }9\\\\\n'
      texteCorr += '\\hline\n'
      for (let l = 0; l < this.nbQuestions; l++) {
        texteCorr += tableauDeNombresAvecCorrection[l]
        texteCorr += '\\hline\n'
      }
      texteCorr += '\\end{array}$\n'
    }
    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    if (!context.isAmc) {
      if (this.interactif) {
        listeQuestionsToContenu(this)
      } else {
        listeQuestionsToContenuSansNumero(this)
      }
    }
  }
}
