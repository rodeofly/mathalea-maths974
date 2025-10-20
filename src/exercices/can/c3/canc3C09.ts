import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice, shuffle } from '../../../lib/outils/arrayOutils'
import { range1 } from '../../../lib/outils/nombres'
import { prenomF, prenomM } from '../../../lib/outils/Personne'
import SchemaEnBoite from '../../../lib/outils/SchemaEnBoite'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Résoudre un problème avec "fois plus", "fois moins"'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '23/07/2022'

/**
 * @author Gilles Mora
 *
 */
export const uuid = 'a8e75'

export const refs = {
  'fr-fr': ['canc3C09', 'auto6P3B-flash1'],
  'fr-ch': [],
}
const listeObjets = ['biscuits', 'billes', 'bonbons', 'ballons', 'vis', 'clous']
const listeClubs = [
  'judo',
  'tennis',
  'tennis de table',
  'musique',
  'théâtre',
  'danse',
]
function schema(
  entete1: string,
  entete2: string,
  valeur1: number,
  valeur2: number,
  facteur: number,
) {
  return new SchemaEnBoite({
    lignes: [
      {
        entete: {
          content: entete1,
          longueur: 3,
        },
        barres:
          valeur1 === facteur * valeur2
            ? [
                {
                  content: `${valeur1}`,
                  length: 2 * facteur,
                  color: 'lightgray',
                },
              ]
            : range1(facteur).map((index) =>
                Object.assign(
                  { color: index === 1 ? 'lightgray' : 'white', length: 2 },
                  { content: `${valeur1}` },
                ),
              ),
      },
      {
        entete: {
          content: entete2,
          longueur: 3,
        },
        barres:
          valeur1 === facteur * valeur2
            ? range1(facteur).map((index) =>
                Object.assign(
                  { color: index === 1 ? 'lightgray' : 'white', length: 2 },
                  {
                    content: `${valeur2}`,
                  },
                ),
              )
            : [
                {
                  content: `${valeur2}`,
                  length: 2 * facteur,
                  color: 'lightgray',
                },
              ],
      },
    ],
  })
}
export default class FoisPlusFoisMoins extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierNumbers
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = false
  }

  nouvelleVersion() {
    const plusOuMoins = choice(['plus', 'moins'])
    const [sexe1, sexe2] = shuffle(['filles', 'garçons'])
    const objet = choice(listeObjets)
    const club = choice(listeClubs)
    const prenom1 = prenomM() as string
    const prenom2 = prenomF() as string
    const quantité1 = randint(3, 12)
    const facteur = choice([3, 4, 5, 6])
    const quantité2 = quantité1 * facteur
    this.optionsChampTexte = { texteApres: ` ${objet}` }
    switch (
      choice([1, 2, 3]) // 1, 2
    ) {
      case 1:
        this.reponse = plusOuMoins ? quantité2 : quantité1
        this.question = choice([true, false])
          ? `${prenom1} a $${facteur}$ fois  ${plusOuMoins}  de ${objet} que ${prenom2} qui en a ${plusOuMoins === 'plus' ? `$${quantité1}$` : ` $${quantité2}$`}.<br>`
          : `${prenom2} a ${plusOuMoins === 'plus' ? `$${quantité1}$` : ` $${quantité2}$ `} ${objet}. ${prenom1} en a $${facteur}$ fois ${plusOuMoins}.<br>`
        this.question += `Combien de ${objet} a  ${prenom1} ? `
        this.correction = `${prenom2}  a ${plusOuMoins === 'plus' ? `$${quantité1}$` : ` $${quantité2}$ `}  ${objet}.<br>
        ${prenom1} en a $${facteur}$ fois  ${plusOuMoins} ; il en a donc ${plusOuMoins === 'plus' ? `$${facteur}\\times ${quantité1}$` : ` $${quantité2}\\div ${facteur}$ `}, soit ${plusOuMoins === 'plus' ? `$${quantité2}$` : ` $${quantité1}$`}.<br>`
        if (this.correctionDetaillee) {
          this.correction += schema(
            prenom1,
            prenom2,
            plusOuMoins === 'plus' ? quantité2 : quantité1,
            plusOuMoins === 'plus' ? quantité1 : quantité2,
            facteur,
          ).display()
        }
        break
      case 2:
        this.reponse = plusOuMoins ? quantité1 : quantité2
        this.question = choice([true, false])
          ? `${prenom1} a ${plusOuMoins === 'plus' ? `$${quantité2}$` : ` $${quantité1}$`} ${objet}. Il en a $${facteur}$ fois ${plusOuMoins}  que ${prenom2}.<br>C`
          : `${prenom1} a  $${facteur}$ fois ${plusOuMoins} de ${objet} que ${prenom2}.<br>Sachant qu'il a ${plusOuMoins === 'plus' ? `$${quantité2}$` : ` $${quantité1}$`} ${objet}, c`
        this.question += `ombien de ${objet} a  ${prenom2} ? `
        this.correction = `Puisque   ${prenom1} a ${plusOuMoins === 'plus' ? `$${quantité2}$` : ` $${quantité1}$ `} ${objet} et qu'il en a $${facteur}$ fois ${plusOuMoins}  que ${prenom2}, ${prenom2} en a $${facteur}$ fois ${plusOuMoins === 'plus' ? 'moins' : 'plus'}.<br>
          Elle en a donc ${plusOuMoins === 'plus' ? `$${quantité2}\\div ${facteur}$` : ` $${facteur}\\times ${quantité1}$ `}, soit ${plusOuMoins === 'plus' ? `$${quantité1}$` : ` $${quantité2}$ `} ${objet}.<br>`
        if (this.correctionDetaillee) {
          this.correction += schema(
            prenom1,
            prenom2,
            plusOuMoins === 'plus' ? quantité2 : quantité1,
            plusOuMoins === 'plus' ? quantité1 : quantité2,
            facteur,
          ).display()
        }
        break

      case 3:
        this.reponse = plusOuMoins ? quantité2 : quantité1
        this.question = choice([true, false])
          ? `Dans un club de ${club}, il y a ${plusOuMoins === 'plus' ? `$${quantité1}$` : ` $${quantité2}$ `} ${sexe1} et
          $${facteur}$ fois  ${plusOuMoins} de ${sexe2}.<br>C`
          : `Dans un club de ${club}, il y a $${facteur}$ fois ${plusOuMoins} de ${sexe2} que de ${sexe1}. <br>
          Sachant qu'il y a ${plusOuMoins === 'plus' ? `$${quantité1}$` : ` $${quantité2}$ `} ${sexe1}, c`
        this.question += `ombien y a-t-il de ${sexe2} ? `
        this.correction = `Puisqu'il y a  $${facteur}$ fois  ${plusOuMoins} de ${sexe2} que de ${sexe1},
          le nombre de  ${sexe2} est : ${plusOuMoins === 'plus' ? `$${facteur}\\times ${quantité1}$` : ` $${quantité2}\\div ${facteur}$`}, soit ${plusOuMoins === 'plus' ? `$${quantité2}$` : ` $${quantité1}$`}.<br>`
        if (this.correctionDetaillee) {
          this.correction += schema(
            sexe1,
            sexe2,
            plusOuMoins === 'plus' ? quantité1 : quantité2,
            plusOuMoins === 'plus' ? quantité2 : quantité1,
            facteur,
          ).display()
        }
        // On écrase les options par défaut
        this.optionsChampTexte = {
          texteApres: ` ${sexe2}`,
        }

        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
