import { propositionsQcm } from '../../lib/interactif/qcm'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Comparer deux nombres entiers'

export const dateDePublication = '07/08/2022'
export const dateDeModifImportante = '14/10/2024'
export const interactifReady = true
export const interactifType = 'qcm'

/**
 * Comparaison de deux nombres entiers avec deux niveaux de difficulté : avec un nombre de chiffres différents et avec le même nombre de chiffres
 * Dans le cas où les nombres ont le même nombre de chiffres, ils ont entre 1 et (max - 1) chiffres identiques
 * @author Guillaume Valmont
 * Mise en interactif par Jean-Claude Lhote
 */
export const uuid = 'a7aa7'

export const refs = {
  'fr-fr': ['6N0A-11'],
  'fr-2016': ['6N11-5'],
  'fr-ch': ['9NO2-5'],
}
export default class ComparerDeuxNombresEntiers extends Exercice {
  constructor() {
    super()
    this.consigne = 'Comparer :'
    this.nbQuestions = 5

    this.besoinFormulaireNumerique = [
      'Difficulté',
      3,
      '1 : Avec un nombre de chiffres différents\n2 : Avec le même nombre de chiffres\n3 : Mélange',
    ]
    this.sup = 3

    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = true

    this.spacingCorr = 1.5
  }

  nouvelleVersion() {
    this.consigne = this.interactif
      ? 'Choisir la bonne comparaison.'
      : 'Comparer :'

    let typeDeQuestionsDisponibles
    switch (this.sup) {
      case 1:
        typeDeQuestionsDisponibles = ['differentNbDeChiffres']
        break
      case 2:
        typeDeQuestionsDisponibles = ['memeNbDeChiffres']
        break
      default:
        typeDeQuestionsDisponibles = [
          'memeNbDeChiffres',
          'differentNbDeChiffres',
        ]
        break
    }

    const typesDeQuestions = combinaisonListes(
      typeDeQuestionsDisponibles,
      this.nbQuestions,
    )
    const nombreDeChiffres = combinaisonListes([3, 4, 5, 8], this.nbQuestions)
    for (
      let i = 0, texte: string, texteCorr: string, a, b, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (typesDeQuestions[i]) {
        case 'differentNbDeChiffres': {
          a = randint(
            10 ** (nombreDeChiffres[i] - 1),
            10 ** nombreDeChiffres[i] - 1,
          )
          b = a
          const enleveOuAjoute = choice(['enleve', 'ajoute'])
          const indexEnleveOuAjoute = randint(
            Math.floor(nombreDeChiffres[i] / 2),
            nombreDeChiffres[i],
          )
          const premiereMoitie = b.toString().slice(0, indexEnleveOuAjoute)
          const deuxiemeMoitie = b.toString().slice(indexEnleveOuAjoute)
          const chiffreInsere = (
            (Number.parseInt(
              b.toString().slice(indexEnleveOuAjoute - 1, indexEnleveOuAjoute),
            ) +
              9) %
            10
          ).toString()
          b = Number.parseInt(premiereMoitie + chiffreInsere + deuxiemeMoitie)
          if (enleveOuAjoute === 'enleve') {
            const c = a
            a = b
            b = c
          }
          break
        }
        case 'memeNbDeChiffres':
        default: {
          const nbChiffresIdentiques = randint(1, nombreDeChiffres[i] - 1)
          const partieIdentique = randint(
            10 ** (nbChiffresIdentiques - 1),
            10 ** nbChiffresIdentiques - 1,
          )
          const nbChiffresDifferentsPremierNombre =
            nombreDeChiffres[i] - nbChiffresIdentiques
          const nbChiffresDifferentsDeuxiemeNombre =
            nombreDeChiffres[i] - nbChiffresIdentiques
          a =
            partieIdentique * 10 ** nbChiffresDifferentsPremierNombre +
            randint(
              10 ** (nbChiffresDifferentsPremierNombre - 1),
              10 ** nbChiffresDifferentsPremierNombre - 1,
            )
          b =
            partieIdentique * 10 ** nbChiffresDifferentsDeuxiemeNombre +
            randint(
              10 ** (nbChiffresDifferentsDeuxiemeNombre - 1),
              10 ** nbChiffresDifferentsDeuxiemeNombre - 1,
            )
          while (b % 10 === a % 10) {
            b = b - (b % 10) + randint(0, 9)
          }
          break
        }
      }
      texte = `$${texNombre(a, 0)}$ et $${texNombre(b, 0)}$`
      this.autoCorrection[i] = {
        propositions: [
          {
            texte: `$${texNombre(a)}$ > $${texNombre(b)}$`,
            statut: a > b,
          },
          {
            texte: `$${texNombre(a)}$ < $${texNombre(b)}$`,
            statut: a < b,
          },
        ],
        options: {
          ordered: true,
        },
      }
      const leQcm = propositionsQcm(this, i)
      if (this.interactif) texte += `<br>${leQcm.texte}`
      texteCorr = ''
      switch (typesDeQuestions[i]) {
        case 'differentNbDeChiffres':
          if (this.correctionDetaillee) {
            texteCorr += `$${texNombre(a)}$ compte $${a.toString().length}$ chiffres alors que $${texNombre(b)}$ en compte $${b.toString().length}$.<br>`
            if (a > b) {
              texteCorr += `Comme $${texNombre(a)}$ compte plus de chiffres que $${texNombre(b)}$, alors $${texNombre(a)}$ est plus grand que $${texNombre(b)}$.<br>`
            } else {
              texteCorr += `Comme $${texNombre(a)}$ compte moins de chiffres que $${texNombre(b)}$, alors $${texNombre(a)}$ est plus petit que $${texNombre(b)}$.<br>`
            }
            texteCorr += "On peut l'écrire en langage mathématique :<br>"
          }
          break
        case 'memeNbDeChiffres':
          if (this.correctionDetaillee) {
            const miseEnEvidenceDesChiffresEnCommun = (
              premierChiffre: number,
              deuxiemeChiffre: number,
            ) => {
              let dernierChiffreCommunTrouve = false
              let dernierChiffreCommun
              for (let j = 0; j < premierChiffre.toString().length; j++) {
                if (
                  premierChiffre.toString()[j] ===
                    deuxiemeChiffre.toString()[j] &&
                  !dernierChiffreCommunTrouve
                ) {
                  texteCorr += `$${miseEnEvidence(premierChiffre.toString()[j])}$`
                } else {
                  if (!dernierChiffreCommunTrouve) {
                    dernierChiffreCommun = premierChiffre.toString()[j]
                  }
                  dernierChiffreCommunTrouve = true
                  texteCorr += `$${premierChiffre.toString()[j]}$`
                }
              }
              texteCorr += '<br>'
              return dernierChiffreCommun
            }
            texteCorr += `$${texNombre(a)}$ et $${texNombre(b)}$ comptent le même nombre de chiffres.<br>`
            texteCorr +=
              'On cherche le premier chiffre différent à partir de la gauche :<br>'
            const dernierChiffreEnCommunPremierNombre =
              miseEnEvidenceDesChiffresEnCommun(a, b)
            const dernierChiffreEnCommunDeuxiemeNombre =
              miseEnEvidenceDesChiffresEnCommun(b, a)
            if (a > b) {
              texteCorr += `Comme $${dernierChiffreEnCommunPremierNombre}$ est plus grand que $${dernierChiffreEnCommunDeuxiemeNombre}$, alors $${texNombre(a)}$ est plus grand que $${texNombre(b)}$.<br>`
            } else {
              texteCorr += `Comme $${dernierChiffreEnCommunPremierNombre}$ est plus petit que $${dernierChiffreEnCommunDeuxiemeNombre}$, alors $${texNombre(a)}$ est plus petit que $${texNombre(b)}$.<br>`
            }

            texteCorr += "On peut l'écrire en langage mathématique :<br>"
          }
          break
      }
      if (a > b) {
        texteCorr += `$${texNombre(a)}$ > $${texNombre(b)}$`
      } else {
        texteCorr += `$${texNombre(a)}$ < $${texNombre(b)}$`
      }
      if (this.correctionDetaillee) texteCorr += '.'
      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
