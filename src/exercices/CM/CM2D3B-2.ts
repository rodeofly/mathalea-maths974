import { createList } from '../../lib/format/lists'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'

import { ajouteQuestionMathlive } from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { texNombre } from '../../lib/outils/texNombre'
import Hms from '../../modules/Hms'
import Operation from '../../modules/operations'
import Exercice from '../Exercice'

export const uuid = '64d46'
export const refs = {
  'fr-fr': ['CM2D3B-2', 'BP2AutoL11'],
  'fr-2016': ['c3C32-03', 'BP2AutoL11'],
  'fr-ch': ['9FA3-21'],
}
export const titre =
  'Savoir résoudre un problème de proportionnalité : Le sportif'
export const dateDePublication = '20/11/2024'
export const interactifType = 'mathLive'
export const interactifReady = true

/**
 * @Author Jean-Claude Lhote
 * Sources (eduscol) : https://eduscol.education.fr/ressources/numerique/2020/2020-exercices-mathematiques-6e
 * Ces exercices seront proposés systématiquement pour 3 niveaux de difficulté afin de différentier autour d'un même problème
 */
export default class ExerciceProbleme003 extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
    this.besoinFormulaireNumerique = [
      'niveau de difficulté',
      3,
      '1 : Élèves à besoin\n2 : Moyens\n3 : Avancés',
    ]
    this.sup = 1
    this.besoinFormulaire3CaseACocher = [
      'Opération posée dans la correction',
      false,
    ]
    this.sup3 = false

    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = true
  }

  nouvelleVersion() {
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const dureeBase = choice([20, 30, 40])
      const sportifs = [
        {
          nom: 'marcheur',
          verbe: 'marcher',
          distanceBase:
            dureeBase === 20
              ? choice([2, 4])
              : dureeBase === 30
                ? choice([2, 3, 6])
                : choice([4, 8]),
        },
        {
          nom: 'coureur',
          verbe: 'courir',
          distanceBase:
            dureeBase === 20
              ? choice([2, 4, 5])
              : dureeBase === 30
                ? choice([3, 6, 5])
                : choice([4, 8, 10]),
        },
        {
          nom: 'cycliste',
          verbe: 'rouler',
          distanceBase:
            dureeBase === 20
              ? choice([4, 5, 10])
              : dureeBase === 30
                ? choice([10, 15, 6])
                : choice([8, 10, 20]),
        },
      ]
      const sportif = choice(sportifs)

      const distanceBase = sportif.distanceBase
      const dureeKilometre = dureeBase / distanceBase
      let listeEnonce: string[]
      let listeCorrection: string[]

      let enonce = `Un ${sportif.nom} parcourt ${distanceBase} km en ${dureeBase} minutes.<br>`
      const nbFoisPlus = choice([2, 3, 4])

      const correction1 = `${this.correctionDetaillee ? `Comme il parcourt ${distanceBase} kilomètres en ${dureeBase} minutes, il parcourra $1$ kilomètre en ${distanceBase} fois moins de temps.<br>` : ''}
    ${this.sup3 ? Operation({ operande1: dureeBase, operande2: distanceBase, type: 'division' }) : ''}
      $${dureeBase}\\text{ min }\\div ${distanceBase} = ${texNombre(dureeKilometre, 0)}\\text{ min}$.<br>
      Ce ${sportif.nom} mettra ${dureeKilometre} minutes pour parcourir 1 kilomètre à la même vitesse.`

      const correction2 = `${this.correctionDetaillee ? `Comme il parcourt ${distanceBase} kilomètres en ${dureeBase} minutes, il parcourra ${nbFoisPlus} fois ${distanceBase} kilomètres en ${nbFoisPlus} fois ${dureeBase} minutes.<br>` : ''}
     ${this.sup3 ? Operation({ operande1: dureeKilometre * distanceBase, operande2: nbFoisPlus, type: 'multiplication' }) : ''}
      $${texNombre(dureeKilometre * distanceBase, 0)}\\times ${String(nbFoisPlus)}= ${texNombre(dureeBase * nbFoisPlus, 0)}$ minutes<br>
     Pour parcourir $${distanceBase * nbFoisPlus}$ km en continuant ${sportif.verbe} à la même vitesse, il mettra ${dureeBase * nbFoisPlus} minutes.`

      const correction3 = `${this.correctionDetaillee ? `Comme il parcourt ${distanceBase * nbFoisPlus} kilomètres en ${dureeBase * nbFoisPlus} minutes, il parcourra ${nbFoisPlus * distanceBase} km plus 1 km en ${nbFoisPlus * dureeBase} minutes plus ${dureeKilometre} minutes.<br>` : ''}
     ${this.sup3 ? Operation({ operande1: dureeBase * nbFoisPlus, operande2: dureeKilometre, type: 'addition' }) : ''}
      $${dureeBase * nbFoisPlus}+${dureeKilometre}=${dureeBase * nbFoisPlus + dureeKilometre}$ minutes<br>
     Pour parcourir $${distanceBase * nbFoisPlus + 1}$ km en continuant à ${sportif.verbe} à la même vitesse, il mettra ${dureeBase * nbFoisPlus + dureeKilometre} minutes.`

      const correction4 = `${this.correctionDetaillee ? `Comme il parcourt 1 kilomètre en ${dureeKilometre} minutes, il parcourra ${nbFoisPlus * distanceBase + 1} km en ${nbFoisPlus * distanceBase + 1} fois ${dureeKilometre} minutes.<br>` : ''}
${this.sup3 ? Operation({ operande1: distanceBase * nbFoisPlus + 1, operande2: dureeKilometre, type: 'multiplication' }) : ''}
$${nbFoisPlus * distanceBase + 1}\\times ${dureeKilometre} = ${dureeBase * nbFoisPlus + dureeKilometre}$ minutes<br>
Pour parcourir $${distanceBase * nbFoisPlus + 1}$ km en continuant à ${sportif.verbe} à la même vitesse, il mettra ${dureeBase * nbFoisPlus + dureeKilometre} minutes.`
      const dureeAvances = new Hms({
        minute: dureeBase * nbFoisPlus + dureeKilometre,
      })
        .normalize()
        .toString()
      const plurielHeure =
        dureeBase * nbFoisPlus + dureeKilometre > 119 ? 's' : ''
      const plurielMinute =
        (dureeBase * nbFoisPlus + dureeKilometre) % 60 > 1 ? 's' : ''
      const correction5 = `Calculons d'abord son allure en minutes par kilomètre :<br>
    ${this.correctionDetaillee ? `Comme il parcourt ${distanceBase} kilomètres en ${dureeBase} minutes, il parcourt 1 kilomètre en ${dureeBase} minutes divisé par ${distanceBase}.<br>` : ''}
     ${this.sup3 ? Operation({ operande1: dureeBase, operande2: distanceBase, type: 'division' }) : ''}
    $${dureeBase}\\div ${distanceBase} = ${dureeKilometre}$ minutes par kilomètre.<br>
      Ensuite, la durée totale :<br>
      ${this.correctionDetaillee ? `Comme il parcourt 1 kilomètre en ${dureeKilometre} minutes, il parcourra ${nbFoisPlus * distanceBase + 1} km en ${nbFoisPlus * distanceBase + 1} fois ${dureeKilometre} minutes.<br>` : ''}
${this.sup3 ? Operation({ operande1: distanceBase * nbFoisPlus + 1, operande2: dureeKilometre, type: 'multiplication' }) : ''}
      $${nbFoisPlus * distanceBase + 1}\\times ${dureeKilometre} = ${dureeBase * nbFoisPlus + dureeKilometre}$ minutes<br><br>
Pour parcourir $${distanceBase * nbFoisPlus + 1}$ km en continuant à ${sportif.verbe} à la même vitesse, il mettra ${dureeBase * nbFoisPlus + dureeKilometre} minutes, soit ${dureeAvances.replace('h', `heure${plurielHeure}`).replace('min', `minute${plurielMinute}`)}.`
      if (this.sup === 1) {
        listeEnonce = [
          'Combien de temps met-il pour parcourir 1 km à la même vitesse ?' +
            ajouteQuestionMathlive({
              exercice: this,
              question: 3 * i,
              objetReponse: { reponse: { value: String(dureeKilometre) } },
              typeInteractivite: 'mathlive',
              texteApres: ' min',
            }),
          `Combien de temps ce ${sportif.nom} mettra-t-il pour parcourir ${distanceBase * nbFoisPlus} km en continuant à ${sportif.verbe} à la même vitesse ?` +
            ajouteQuestionMathlive({
              exercice: this,
              question: 3 * i + 1,
              objetReponse: {
                reponse: { value: String(dureeBase * nbFoisPlus) },
              },
              typeInteractivite: 'mathlive',
              texteApres: ' min',
            }),
          `Combien de temps ce ${sportif.nom} mettra-t-il pour parcourir ${distanceBase * nbFoisPlus + 1} km en continuant à ${sportif.verbe} à la même vitesse ?` +
            ajouteQuestionMathlive({
              exercice: this,
              question: 3 * i + 2,
              objetReponse: {
                reponse: {
                  value: String(dureeBase * nbFoisPlus + dureeKilometre),
                },
              },
              typeInteractivite: 'mathlive',
              texteApres: ' min',
            }),
        ]
        listeCorrection = [correction1, correction2, correction3]
      } else if (this.sup === 2) {
        listeEnonce = [
          `Combien de temps met-il pour faire 1 km en continuant à ${sportif.verbe} à la même vitesse ?` +
            ajouteQuestionMathlive({
              exercice: this,
              question: 2 * i,
              objetReponse: { reponse: { value: String(dureeKilometre) } },
              typeInteractivite: 'mathlive',
              texteApres: ' min',
            }),
          `Combien de temps ce ${sportif.nom} mettra-t-il pour parcourir ${distanceBase * nbFoisPlus + 1} km en continuant à ${sportif.verbe} à la même vitesse ?` +
            ajouteQuestionMathlive({
              exercice: this,
              question: 2 * i + 1,
              objetReponse: {
                reponse: {
                  value: String(dureeBase * nbFoisPlus + dureeKilometre),
                },
              },
              typeInteractivite: 'mathlive',
              texteApres: ' min',
            }),
        ]
        listeCorrection = [correction1, correction4]
      } else {
        listeEnonce = [
          `Combien de temps ce ${sportif.nom} mettra-t-il pour parcourir ${distanceBase * nbFoisPlus + 1} km en continuant à ${sportif.verbe} à la même vitesse ?` +
            ajouteQuestionMathlive({
              exercice: this,
              question: i,
              objetReponse: {
                reponse: { value: dureeAvances, options: { HMS: true } },
              },
              typeInteractivite: 'mathlive',
              texteApres: '(en h et min)',
              classe: KeyboardType.clavierHms,
            }),
        ]
        listeCorrection = [correction5]
      }
      enonce +=
        listeEnonce.length > 1
          ? createList({
              items: listeEnonce,
              style: 'alpha',
            })
          : listeEnonce[0]
      const correction = createList({
        items: listeCorrection,
        style: 'alpha',
      })
      if (this.questionJamaisPosee(i, correction)) {
        this.listeQuestions[i] = enonce
        this.listeCorrections[i] = correction
        i++
      }
      cpt++
    }
  }
}
