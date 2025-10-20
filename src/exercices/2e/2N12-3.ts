import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
} from '../../lib/outils/ecritures'
import { texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { setReponse } from '../../lib/interactif/gestionInteractif'

export const titre = 'Encadrer avec les racines carrées'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '28/09/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
/**
 *
 * @author Gilles Mora
 */

export const uuid = 'ed2ee'

export const refs = {
  'fr-fr': ['2N12-3'],
  'fr-ch': ['10NO3-5'],
}
export default class EncadrerRacineCarreeEntre2Entiers extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Choix des questions',
      4,
      '1 : Encadrer sqrt(a)\n2 : Encadrer a+b*sqrt(c) avec des entiers\n3 : Encadrer a+b*sqrt(c) avec des décimaux\n4 : Mélange',
    ]

    this.nbQuestions = 2

    this.sup = 1
  }

  nouvelleVersion() {
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['Encadrer1']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['Encadrer2']
    } else if (this.sup === 3) {
      typeDeQuestionsDisponibles = ['Encadrer3']
    } else {
      typeDeQuestionsDisponibles = ['Encadrer1', 'Encadrer2', 'Encadrer3']
    }

    const listeTypeQuestions = combinaisonListes(
      typeDeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      let a: number = 0
      let b: number = 0
      let c: number = 0
      let reponse = 0
      switch (listeTypeQuestions[i]) {
        case 'Encadrer1':
          a = randint(3, 143, [4, 9, 16, 25, 36, 49, 64, 81, 100, 121])
          reponse = Math.floor(Math.sqrt(a))
          texte = `Encadrer $\\sqrt{${a}}$ par deux entiers consécutifs.<br>`
          if (this.interactif) {
            texte +=
              ajouteChampTexteMathLive(this, 2 * i, '') +
              `$< \\sqrt{${a}} <$` +
              ajouteChampTexteMathLive(this, 2 * i + 1, ' ')
          }
          texteCorr = `Comme $${a}$ n'est pas le carré d'un nombre entier, on encadre $${a}$ par deux carrés d'entiers : <br>
          $${Math.floor(Math.sqrt(a)) ** 2} < ${a} < ${(Math.floor(Math.sqrt(a)) + 1) ** 2}$, soit $${Math.floor(Math.sqrt(a))}^2 < ${a} < ${Math.floor(Math.sqrt(a)) + 1}^2$.<br><br>
          En prenant la racine carrée de chacun de ces nombres, on obtient : <br>$\\sqrt{${Math.floor(Math.sqrt(a))}^2} < \\sqrt{${a}} < \\sqrt{${Math.floor(Math.sqrt(a)) + 1}^2}$
        (on ne change pas le sens des inégalités en prenant les racines carrées. Ce résultat admis sera démontré dans le chapitre sur les variations). <br><br>
        Finalement, on obtient l'encadrement de  $\\sqrt{${a}}$ par deux entiers consécutifs   : $${Math.floor(Math.sqrt(a))}< \\sqrt{${a}} < ${Math.floor(Math.sqrt(a)) + 1}$.
   `
          setReponse(this, 2 * i, reponse)
          setReponse(this, 2 * i + 1, reponse + 1)
          break
        case 'Encadrer2':
          {
            a = randint(3, 143, [4, 9, 16, 25, 36, 49, 64, 81, 100, 121])
            b = randint(-9, 9, 0)
            c = randint(-9, 9, [0, 1])
            const reponse1 = b + c * Math.floor(Math.sqrt(a))
            const reponse2 = b + c * Math.floor(Math.sqrt(a) + 1)
            texte = `En utilisant un encadrement  de $\\sqrt{${a}}$ par  deux entiers consécutifs, donner un encadrement de $${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}}$ le plus précis possible.<br>`
            if (this.interactif) {
              texte +=
                ajouteChampTexteMathLive(this, 2 * i, '') +
                `$< ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} <$` +
                ajouteChampTexteMathLive(this, 2 * i + 1, ' ')
            }
            texteCorr = `Comme $${a}$ n'est pas le carré d'un nombre entier, on encadre $${a}$ par deux carrés d'entiers : <br>
          $${Math.floor(Math.sqrt(a)) ** 2} < ${a} < ${(Math.floor(Math.sqrt(a)) + 1) ** 2}$, soit $${Math.floor(Math.sqrt(a))}^2 < ${a} < ${Math.floor(Math.sqrt(a)) + 1}^2$.<br><br>
          En prenant la racine carrée de chacun de ces nombres, on obtient : <br>$\\sqrt{${Math.floor(Math.sqrt(a))}^2} < \\sqrt{${a}} < \\sqrt{${Math.floor(Math.sqrt(a)) + 1}^2}$
        (on ne change pas le sens des inégalités en prenant les racines carrées. Ce résultat admis sera démontré dans le chapitre sur les variations). <br><br>
        Finalement, on obtient l'encadrement de  $\\sqrt{${a}}$ par deux entiers consécutifs   : $${Math.floor(Math.sqrt(a))}< \\sqrt{${a}} < ${Math.floor(Math.sqrt(a)) + 1}$. <br><br>
        En partant de cet encadrement, on obbtient successivement :<br>`
            if (c > 0) {
              texteCorr += `$\\begin{aligned}
        ${Math.floor(Math.sqrt(a))} &< \\sqrt{${a}} < ${Math.floor(Math.sqrt(a)) + 1}\\\\
        ${miseEnEvidence(c)}\\times ${Math.floor(Math.sqrt(a))}&< ${miseEnEvidence(c)}\\times \\sqrt{${a}} < ${miseEnEvidence(c)}\\times ${Math.floor(Math.sqrt(a)) + 1}{\\text{ (On multiplie par un nombre strictement positif)}}\\\\
        ${c * Math.floor(Math.sqrt(a))}&< ${c}\\sqrt{${a}} < ${c * (Math.floor(Math.sqrt(a)) + 1)}\\\\
        ${miseEnEvidence(b)}${ecritureAlgebrique(c * Math.floor(Math.sqrt(a)))}&< ${miseEnEvidence(b)}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} < ${miseEnEvidence(b)}${ecritureAlgebrique(c * (Math.floor(Math.sqrt(a)) + 1))}\\\\
        ${b + c * Math.floor(Math.sqrt(a))}&< ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} < ${b + c * (Math.floor(Math.sqrt(a)) + 1)}
                       \\end{aligned}$<br>
                       L'encadrement demandé est donc : $ ${b + c * Math.floor(Math.sqrt(a))}< ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} < ${b + c * (Math.floor(Math.sqrt(a)) + 1)}$.`
              setReponse(this, 2 * i, reponse1)
              setReponse(this, 2 * i + 1, reponse2)
            } else {
              texteCorr += `$\\begin{aligned}
                       ${Math.floor(Math.sqrt(a))} &< \\sqrt{${a}} < ${Math.floor(Math.sqrt(a)) + 1}\\\\
                       ${miseEnEvidence(c)}\\times ${Math.floor(Math.sqrt(a))}&> ${miseEnEvidence(c)}\\times \\sqrt{${a}} > ${miseEnEvidence(c)}\\times ${Math.floor(Math.sqrt(a)) + 1}{\\text{ (On multiplie par un nombre strictement négatif)}}\\\\
                       ${c * Math.floor(Math.sqrt(a))}&> ${c}\\sqrt{${a}} > ${c * (Math.floor(Math.sqrt(a)) + 1)}\\\\
                       ${miseEnEvidence(b)}${ecritureAlgebrique(c * Math.floor(Math.sqrt(a)))}&> ${miseEnEvidence(b)}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} > ${miseEnEvidence(b)}${ecritureAlgebrique(c * (Math.floor(Math.sqrt(a)) + 1))}\\\\
                       ${b + c * Math.floor(Math.sqrt(a))}&> ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} > ${b + c * (Math.floor(Math.sqrt(a)) + 1)}
                                      \\end{aligned}$<br>
                                      L'encadrement demandé est donc : $ ${b + c * (Math.floor(Math.sqrt(a)) + 1)}< ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} < ${b + c * Math.floor(Math.sqrt(a))}$.`
              setReponse(this, 2 * i, reponse2)
              setReponse(this, 2 * i + 1, reponse1)
            }
          }
          break

        case 'Encadrer3':
          {
            a = randint(3, 143, [4, 9, 16, 25, 36, 49, 64, 81, 100, 121])
            b = randint(-9, 9, 0)
            c = randint(-9, 9, [0, 1])
            const r1 = Math.sqrt(a) - 0.05
            const r1c = r1 * c
            const r1b = r1c + b
            const r2 = Math.sqrt(a) + 0.05
            const r2c = r2 * c
            const r2b = r2c + b
            texte = `En utilisant l'encadrement $${texNombre(r1, 1)}<\\sqrt{${a}}<${texNombre(r2, 1)}$, donner un encadrement de $${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}}$ le plus précis possible.<br>`
            if (this.interactif) {
              texte +=
                ajouteChampTexteMathLive(this, 2 * i, '') +
                `$< ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} <$` +
                ajouteChampTexteMathLive(this, 2 * i + 1, ' ')
            }
            texteCorr = `À partir de l'encadrement $${texNombre(r1, 1)}<\\sqrt{${a}}<${texNombre(r2, 1)}$, on obtient successivement :<br>`
            if (c > 0) {
              texteCorr += `$\\begin{aligned}
            ${texNombre(r1, 1)} &< \\sqrt{${a}} < ${texNombre(r2, 1)}\\\\
        ${miseEnEvidence(c)}\\times ${texNombre(r1, 1)}&< ${miseEnEvidence(c)}\\times \\sqrt{${a}} < ${miseEnEvidence(c)}\\times ${texNombre(r2, 1)}{\\text{ (On multiplie par un nombre strictement positif)}}\\\\
        ${texNombre(r1c, 1)}&< ${c}\\sqrt{${a}} <${texNombre(r2c, 1)}\\\\
        ${miseEnEvidence(b)}+${texNombre(r1c, 1)}&< ${miseEnEvidence(b)}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} < ${miseEnEvidence(b)}+${texNombre(r2c, 1)}\\\\
        ${texNombre(r1b, 1)}&< ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} < ${texNombre(r2b, 1)}
                       \\end{aligned}$<br>
                       L'encadrement demandé est donc : $ ${texNombre(r1b, 1)}< ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} < ${texNombre(r2b, 1)}$.`
              setReponse(this, 2 * i, r1b)
              setReponse(this, 2 * i + 1, r2b)
            } else {
              texteCorr += `$\\begin{aligned}
            ${texNombre(r1, 1)} &< \\sqrt{${a}} < ${texNombre(r2, 1)}\\\\
        ${miseEnEvidence(c)}\\times ${texNombre(r1, 1)}&> ${miseEnEvidence(c)}\\times \\sqrt{${a}} > ${miseEnEvidence(c)}\\times ${texNombre(r2, 1)}{\\text{ (On multiplie par un nombre strictement négatif)}}\\\\
        ${texNombre(r1c, 1)}&> ${c}\\sqrt{${a}} >${texNombre(r2c, 1)}\\\\
        ${miseEnEvidence(b)}${texNombre(r1c, 1)}&> ${miseEnEvidence(b)}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} > ${miseEnEvidence(b)}${texNombre(r2c, 1)}\\\\
        ${texNombre(r1b, 1)}&> ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} > ${texNombre(r2b, 1)}
                       \\end{aligned}$<br>
                       L'encadrement demandé est donc : $ ${texNombre(r2b, 1)}< ${b}${ecritureAlgebriqueSauf1(c)}\\sqrt{${a}} < ${texNombre(r1b, 1)}$.`
              setReponse(this, 2 * i, r2b)
              setReponse(this, 2 * i + 1, r1b)
            }
          }
          break
      }

      if (this.questionJamaisPosee(i, a, b, c, listeTypeQuestions[i])) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
