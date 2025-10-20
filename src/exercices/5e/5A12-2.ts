import { combinaisonListes, shuffle } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import {
  contraindreValeur,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import {
  listeNombresPremiersStrictJusqua,
  obtenirListeNombresPremiers,
  premiersEntreBornes,
} from '../../lib/outils/primalite'
import { egalOuApprox, lister } from '../../lib/outils/ecritures'
import { texNombre } from '../../lib/outils/texNombre'
import { propositionsQcm } from '../../lib/interactif/qcm'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

export const titre = 'Reconnaitre un nombre premier'
export const dateDePublication = '11/07/2022'
export const dateDeModifImportante = '06/12/2024'

/**
 * Verifier qu'un nombre est premier par divisions succesives des premiers nombres premiers
 * ou connaisance des nombres premiers inférieurs à 30
 * @author Guillaume Valmont ; Olivier Mimeau : Interactivité
 */

export const uuid = '03d65'
export const refs = {
  'fr-fr': ['5A12-2'],
  'fr-ch': ['9NO4-14'],
}
export default class ReconnaitreNombrePremier extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 4
    this.besoinFormulaireNumerique = ['Maximum', 10000] // 10000 car listeNombresPremiersStrictJusqua renvoie un tableau de premiers inférieurs à 10000
    this.sup = 500
    this.besoinFormulaire2CaseACocher = ['Avec calcul de la racine carrée']
    this.sup2 = false
    this.comment =
      "Maximum : Il s'agit du nombre maximum utilisé dans les questions. Si il est trop petit, ce nombre est adapté au nombre de questions."
  }

  nouvelleVersion() {
    const typeQuestionsDisponibles = ['premier', 'non premier']
    const listeTypeQuestions = combinaisonListes(
      typeQuestionsDisponibles,
      this.nbQuestions,
    )
    // Il faut qu'il y ait nbQuestions / 2 nombres premiers strictement inférieurs au max
    const premiers = obtenirListeNombresPremiers() // (this.nbQuestions) inutile la function revoit de toute facon la liste jusqu'à 297
    const max = contraindreValeur(
      premiers[Math.floor((this.nbQuestions + 1) / 2)],
      10000,
      this.sup,
      500,
    ) /* Math.max(maxp, 11) */
    // on est certain qu'il y a  la moitié des questions qui sont de type 'premier', le but est d'eviter le randint de a = listePremiers...
    const listePremiersDansLordre = listeNombresPremiersStrictJusqua(max + 1)
    const listePremiers = shuffle(listePremiersDansLordre)
    let indexPremiers = 0
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texteCorr = ''
      let texte = ''
      let a = 0
      switch (listeTypeQuestions[i]) {
        case 'premier':
          // a = listePremiers[randint(0, listePremiers.length - 1)]
          a = listePremiers[indexPremiers]
          indexPremiers++
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce =
            `Le nombre $${texNombre(a)}$ est-il un nombre premier ?`
          this.autoCorrection[i].propositions = [
            {
              texte: 'Oui',
              statut: true,
            },
            {
              texte: 'Non',
              statut: false,
            },
          ]
          break
        case 'non premier':
          a = randint(1, max - 1, listePremiers)
          this.autoCorrection[i] = {}
          this.autoCorrection[i].enonce =
            `Le nombre $${texNombre(a)}$ est-il un nombre premier ?`
          this.autoCorrection[i].propositions = [
            {
              texte: 'Oui',
              statut: false,
            },
            {
              texte: 'Non',
              statut: true,
            },
          ]
          break
      }
      this.autoCorrection[i].options = {
        ordered: true,
        radio: true,
      }
      texte += this.interactif
        ? `Le nombre $${texNombre(a)}$ est-il un nombre premier ?`
        : `Vérifier si $${texNombre(a)}$ est un nombre premier.`
      texteCorr = rediger(a, this.sup2)
      const monQcm = propositionsQcm(this, i)
      if (this.interactif) {
        texte += monQcm.texte
        texteCorr += monQcm.texteCorr
      }

      if (this.questionJamaisPosee(i, a)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}

function rediger(a: number, avecCalculDeRacine: boolean): string {
  if (a === 1) {
    return "1 n'est pas un nombre premier (il n'a qu'un seul diviseur)."
  }
  if (premiersEntreBornes(2, 30).includes(a)) {
    return `$${texNombre(a)}$ est un nombre premier. Il fait partie des nombres premiers à connaitre : ${lister(premiersEntreBornes(2, 30).map((t) => `$${t}$`))}.`
  }
  const premiersATester = premiersEntreBornes(2, Math.floor(Math.sqrt(a)))
  let redaction = ''
  if (avecCalculDeRacine) {
    redaction = `$\\sqrt{${a}} \\approx ${texNombre(Math.sqrt(a), 2)}$<br>
    On vérifie si $${texNombre(a)}$ est divisible par tous les nombres premiers inférieurs ou égaux à $${Math.floor(Math.sqrt(a))}$, c'est-à-dire ${lister(premiersATester.map((t) => `$${t}$`))}.<br>`
  } else {
    redaction = `On essaie de diviser $${texNombre(a)}$ par tous les nombres premiers jusqu'à ce que le quotient soit inférieur au diviseur.<br>`
  }
  let i = 0
  while (i < premiersATester.length && a % premiersATester[i] !== 0) {
    redaction += `$${a} \\div ${premiersATester[i]} ${egalOuApprox(a / premiersATester[i], 2)} ${texNombre(a / premiersATester[i], 2)}$<br>`
    i++
  }
  if (a % premiersATester[i] === 0) {
    redaction += `$${a} \\div ${premiersATester[i]} = ${texNombre(a / premiersATester[i], 2)}$<br>`
    redaction += `$${texNombre(a)}$ est divisible par $${premiersATester[i]}$, donc $${texNombre(a)}$ n'est pas un nombre premier.`
  } else {
    if (avecCalculDeRacine) {
      redaction += `$${texNombre(a)}$ n'est divisible par aucun des nombres premiers inférieurs ou égaux à $${Math.floor(Math.sqrt(a))}$, donc $${texNombre(a)}$ est un nombre premier.`
    } else {
      const premierSuivant = premiersEntreBornes(2, a * 2).slice(
        premiersATester.length,
      )[0]
      redaction += `$${a} \\div ${premierSuivant} ${egalOuApprox(a / premierSuivant, 2)} ${texNombre(a / premierSuivant, 2)}$<br>`
      redaction += `$${texNombre(a / premierSuivant, 2)} < ${premierSuivant}$, donc peut s'arrêter.<br>`
      redaction += `$${texNombre(a)}$ est un nombre premier.`
    }
  }
  return redaction
}
