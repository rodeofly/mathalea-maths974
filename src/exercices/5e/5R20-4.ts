import { choice } from '../../lib/outils/arrayOutils'
import { texteEnCouleur } from '../../lib/outils/embellissements'
import { numAlpha } from '../../lib/outils/outilString'
import { prenomF, prenomM } from '../../lib/outils/Personne'
import { texPrix, texteGras } from '../../lib/format/style'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { arrondi } from '../../lib/outils/nombres'

export const titre =
  'Résoudre un problème en utilisant une somme algébrique de relatifs'

/**
 * * résoudre un problème additif avec des relatifs
 * @author Sébastien Lozano
 */

export const uuid = '6667e'

export const refs = {
  'fr-fr': ['5R20-4'],
  'fr-ch': ['9NO9-9'],
}
export default class ProblemesAdditifsRelatifs5e extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
    this.spacing = context.isHtml ? 2 : 1
    this.spacingCorr = context.isHtml ? 2 : 0.5
  }

  nouvelleVersion() {
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      let gainPerteUnitaire // pour le gain/perte unitaire
      let gainMultiple // pour le gain multiple
      // on veut des multiples de 5 pour n'avoir que des demis entiers ou des entiers
      do {
        gainPerteUnitaire = randint(10, 30)
        gainMultiple = randint(10, 30)
      } while (
        gainPerteUnitaire % 5 !== 0 ||
        gainMultiple % 5 !== 0 ||
        gainMultiple <= gainPerteUnitaire
      )

      const nombreTotalDeLancers = randint(5, 10) // nombre totale de lancers
      let nombreDeGainsUnitaires // nb de gains untitaires
      let nombreDePertes // nb de pertes
      do {
        nombreDeGainsUnitaires = randint(2, 5)
        nombreDePertes = randint(2, 5)
      } while (nombreDeGainsUnitaires + nombreDePertes >= nombreTotalDeLancers)

      // on échange parfois le nombre de gain unitaire et le nombre de perte pour avoir un bilan négatif plus souvent
      if (nombreDePertes < nombreDeGainsUnitaires) {
        if (randint(0, 1) === 0) {
          const temp = nombreDePertes
          nombreDePertes = nombreDeGainsUnitaires
          nombreDeGainsUnitaires = temp
        }
      }

      const prenoms = [
        [prenomF(), 'Elle', 'elle'],
        [prenomM(), 'Il', 'il'],
      ]
      const currentPrenom = choice(prenoms)

      // une fonction pour écrire les chaine correctives
      const myGainPerteString = function (
        nb: number,
        type: 'gain' | 'perte',
        valeur: number,
      ) {
        let sortie = ''
        switch (type) {
          case 'gain':
            sortie = `(+${texPrix(valeur)}~$€$)`
            for (let m = 1; m < nb; m++) {
              sortie += `+(+${texPrix(valeur)}~$€$)`
            }
            break
          case 'perte':
            sortie = `(-${texPrix(valeur)}~$€$)`
            for (let m = 1; m < nb; m++) {
              sortie += `+(-${texPrix(valeur)}~$€$)`
            }
            break
        }
        return sortie
      }

      // une fonction pour dire si le bilan est positif ou négatif
      const isBilanPositif = function (tot: number) {
        if (tot >= 0) {
          return true
        } else {
          return false
        }
      }

      let bilan
      if (
        isBilanPositif(
          arrondi(
            (nombreTotalDeLancers - nombreDeGainsUnitaires - nombreDePertes) *
              arrondi(gainMultiple / 10),
          ) +
            arrondi(nombreDeGainsUnitaires * arrondi(gainPerteUnitaire / 10)) -
            arrondi(nombreDePertes * arrondi(gainPerteUnitaire / 10)),
        )
      ) {
        bilan = [
          'Globalement, le montant des gains',
          'est supérieur au montant des pertes',
          `${texteEnCouleur('Le bilan est donc positif.')}`,
          'a gagné',
          texPrix(
            arrondi(
              (nombreTotalDeLancers - nombreDeGainsUnitaires - nombreDePertes) *
                arrondi(gainMultiple / 10),
            ) +
              arrondi(
                nombreDeGainsUnitaires * arrondi(gainPerteUnitaire / 10),
              ) -
              arrondi(nombreDePertes * arrondi(gainPerteUnitaire / 10)),
          ),
        ]
      } else {
        bilan = [
          'Globalement, le montant des gains',
          'est inférieur au montant des pertes',
          `${texteEnCouleur('Le bilan est donc négatif.')}`,
          'a perdu',
          texPrix(
            -1 *
              (arrondi(
                (nombreTotalDeLancers -
                  nombreDeGainsUnitaires -
                  nombreDePertes) *
                  arrondi(gainMultiple / 10),
              ) +
                arrondi(
                  nombreDeGainsUnitaires * arrondi(gainPerteUnitaire / 10),
                ) -
                arrondi(nombreDePertes * arrondi(gainPerteUnitaire / 10))),
          ),
        ]
      }
      // pour les situations
      const situations = [
        {
          // case 0 --> les quilles
          nb_tot_lancers: nombreTotalDeLancers,
          nb_gains_unitaires: nombreDeGainsUnitaires,
          nb_pertes: nombreDePertes,
          nb_gains:
            nombreTotalDeLancers - nombreDeGainsUnitaires - nombreDePertes,
          perte: arrondi(gainPerteUnitaire / 10),
          gain_unitaire: arrondi(gainPerteUnitaire / 10),
          gain_multiple: arrondi(gainMultiple / 10),
          enonce_1: 'lancer une balle sur des quilles.',
          enonce_2: '- Si la balle touche plusieurs quilles, le joueur gagne ',
          enonce_3: "- Si la balle ne touche qu'une quille, le joueur gagne ",
          enonce_4: '- Si la balle ne touche aucune quille, le joueur perd ',
          enonce_5: 'a lancé',
          enonce_6: 'la balle',
          correction_1: 'touché plusieurs quilles',
          correction_2: "touché qu'une seule quille",
          prenom: currentPrenom[0], // prenoms[choice([0,1])][0],
          pronomMaj: currentPrenom[1], // prenoms[choice([0,1])][1],
          pronomMin: currentPrenom[2], // prenoms[choice([0,1])][2],
          bilan,
        },
      ]

      const enonces = []
      let indexSousQuestion
      let indexSousQuestionCorr
      for (let k = 0; k < situations.length; k++) {
        indexSousQuestion = 0
        indexSousQuestionCorr = 0
        enonces.push({
          enonce: `
Un jeu consiste à ${situations[k].enonce_1}<br>
${situations[0].enonce_2} $${texPrix(situations[0].gain_multiple)}~$€.<br>
${situations[0].enonce_3} $${texPrix(situations[0].gain_unitaire)}~$€.<br>
${situations[0].enonce_4} $${texPrix(situations[0].perte)}~$€.<br>
${situations[k].prenom} ${situations[k].enonce_5} $${situations[k].nb_tot_lancers}$ fois ${situations[k].enonce_6}.<br>
${situations[k].pronomMaj} a perdu de l'argent $${situations[k].nb_pertes}$ fois et a gagné $${situations[k].nb_gains_unitaires}$ fois $${texPrix(situations[k].gain_unitaire)}~$€.<br> 
${numAlpha(indexSousQuestion++)} A-t-${situations[k].pronomMin} globalement gagné ou perdu de l'argent ?<br> 
${numAlpha(indexSousQuestion++)} Combien a-t-${situations[k].pronomMin} globalement gagné ou perdu ?
`,
          question: '',
          correction: `
${situations[k].prenom} ${situations[k].enonce_5} $${situations[k].nb_tot_lancers}$ fois ${situations[k].enonce_6}.<br>
Sur les $${situations[k].nb_tot_lancers}$ lancers, on sait combien de fois ${situations[k].pronomMin} a perdu de l'argent et combien de fois ${situations[k].pronomMin} a gagné $${texPrix(situations[k].gain_unitaire)}~$€.<br>
Les autres lancers correspondent donc au nombre de fois où ${situations[k].pronomMin} a ${situations[k].correction_1} et gagné $${texPrix(situations[k].gain_multiple)}~$€.<br>
$${situations[k].nb_tot_lancers}-${situations[k].nb_pertes}-${situations[k].nb_gains_unitaires} = ${situations[k].nb_tot_lancers - situations[k].nb_pertes - situations[k].nb_gains_unitaires}$,
${situations[k].pronomMin} a donc ${situations[k].correction_1} $${situations[k].nb_gains}$ fois.<br>
${texteGras(`Gains lorsqu'${situations[k].pronomMin} a ${situations[k].correction_1} :`)}<br>
$${myGainPerteString(situations[k].nb_gains, 'gain', situations[k].gain_multiple)} = ${situations[k].nb_gains}\\times (+${texPrix(situations[k].gain_multiple)}~$€$) = (+${texPrix(situations[k].nb_gains * situations[k].gain_multiple)}~$€)<br>
${texteGras(`Gains lorsqu'${situations[k].pronomMin} n'a ${situations[k].correction_2} :`)}<br>
$${myGainPerteString(situations[k].nb_gains_unitaires, 'gain', situations[k].gain_unitaire)} = ${situations[k].nb_gains_unitaires}\\times (+${texPrix(situations[k].gain_unitaire)}~$€$) = (+${texPrix(situations[k].nb_gains_unitaires * situations[k].gain_unitaire)}~$€)<br>
${texteGras('Pertes :')}<br>
$${myGainPerteString(situations[k].nb_pertes, 'perte', situations[k].perte)} = ${situations[k].nb_pertes}\\times (-${texPrix(situations[k].perte)}~$€$) = (-${texPrix(situations[k].nb_pertes * situations[k].perte)}~$€)<br>
${numAlpha(indexSousQuestionCorr++)} ${situations[k].bilan[0]} ${situations[k].bilan[1]}.<br> 
${situations[k].bilan[2]}<br>
${numAlpha(indexSousQuestionCorr++)}
$(+${texPrix(situations[k].nb_gains * situations[k].gain_multiple)}~$€$)+(+${texPrix(situations[k].nb_gains_unitaires * situations[k].gain_unitaire)}~$€$)+(-${texPrix(situations[k].nb_pertes * situations[k].perte)}~$€$) = (${texPrix(situations[k].nb_gains * situations[k].gain_multiple + situations[k].nb_gains_unitaires * situations[k].gain_unitaire - situations[k].nb_pertes * situations[k].perte)}~$€$)$<br>
${texteEnCouleur(`Globalement, ${situations[k].prenom} ${situations[k].bilan[3]} $${situations[k].bilan[4]}~$€.`)}
`,
        })
      }

      texte = `${enonces[0].enonce}`
      texteCorr = `${enonces[0].correction}`

      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Niveau de difficulté',2,"1 : Entiers naturels\n2 : Entiers relatifs"];
  // this.besoinFormulaire2CaseACocher = ["Avec des expressions du second degré"];
}
