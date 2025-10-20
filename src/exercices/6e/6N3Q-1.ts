import { texPrix } from '../../lib/format/style'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { texFractionFromString } from '../../lib/outils/deprecatedFractions'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { sp } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const amcReady = true
export const titre = 'Résoudre des problèmes avec des calculs de pourcentages'

/**
 * Calculer le montant d'une réduction donnée en pourcentage d'un prix initial
 * @author Jean-Claude Lhote
 */
export const uuid = 'd67e9'

export const refs = {
  'fr-fr': ['BP2AutoB6', '6N3Q-1'],
  'fr-2016': ['6N33-3', 'BP2AutoB6'],
  'fr-ch': ['9NO15-2'],
}
export default class AppliquerUnPourcentage6N3Q extends Exercice {
  onlyMoney = false
  constructor() {
    super()

    this.nbQuestions = 1
    this.consigne = 'Calculer.'
    this.spacing = 2
    this.spacingCorr = 2
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = this.onlyMoney ? [1] : [1, 2]
    const choix = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    const listePourcentages = [10, 20, 30, 40, 50]
    const article = [
      ['Un pull', 20, 40],
      ['Une chemise', 15, 35],
      ['Un pantalon', 30, 60],
      ['Un T-shirt', 15, 25],
      ['Une jupe', 20, 40],
    ]
    const legume = [
      ['Une aubergine', 100, 200],
      ['Un melon', 200, 300],
      ['Une tomate', 50, 100],
      ['Une betterave', 75, 100],
      ['Une carotte', 30, 50],
    ]
    const listeIndex = [0, 1, 2, 3, 4]
    const prix = []
    const pourcent = []
    const masse = []
    const index = combinaisonListes(listeIndex, this.nbQuestions)
    for (
      let i = 0, texte, texteCorr, montant, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      pourcent[i] = choice(listePourcentages)
      switch (choix[i]) {
        case 1:
          prix[i] = randint(
            article[index[i]][1] as number,
            article[index[i]][2] as number,
          )
          montant = (pourcent[i] * prix[i]) / 100
          texte = `${article[index[i]][0]} coûtant $${prix[i]}$${sp()}€ bénéficie d'une réduction de $${pourcent[i]} ${sp()}${sp()}\\%$.<br>`
          texte += 'Quel est le montant en euro de cette réduction ?'
          texte += ajouteChampTexteMathLive(this, i, '', { texteApres: ' €' })
          texteCorr = `On doit calculer $${pourcent[i]}${sp()}\\%$ de $${prix[i]}$${sp()}€ :<br>`
          texteCorr += `$${pourcent[i]}${sp()}\\%\\text{ de }${prix[i]}=${texFractionFromString(pourcent[i], 100)}\\times${prix[i]}=(${pourcent[i]}\\times${prix[i]})\\div100=${texNombre(pourcent[i] * prix[i])}\\div100=${texNombre(montant)}$<br>`
          texteCorr += `Le montant de la réduction est de $${miseEnEvidence(texPrix(montant))}$${sp()}€.`
          setReponse(this, i, montant, {
            formatInteractif: 'calcul',
            digits: 5,
            decimals: 2,
            signe: false,
          })
          break
        case 2:
        default:
          masse[i] = randint(
            legume[index[i]][1] as number,
            article[index[i]][2] as number,
          )
          montant = (masse[i] * pourcent[i]) / 100
          texte = `${legume[index[i]][0]} pesant $${masse[i]}$ grammes a eu une croissance de $${pourcent[i]} ${sp()}\\%$.<br>`
          texte +=
            'Quelle est la masse supplémentaire en grammes correspondant à cette croissance ?'
          texte += ajouteChampTexteMathLive(this, i, '', { texteApres: ' g' })
          texteCorr = `On doit calculer $${pourcent[i]}${sp()}\\%$ de $${masse[i]}$ grammes :<br>`
          texteCorr += `$${pourcent[i]}${sp()}\\%\\text{ de }${masse[i]}=${texFractionFromString(pourcent[i], 100)}\\times${masse[i]}=(${pourcent[i]}\\times${masse[i]})\\div100=${texNombre(pourcent[i] * masse[i])}\\div100=${texNombre(montant)}$<br>`
          texteCorr += `La masse a augmenté de $${miseEnEvidence(texNombre(montant))}$ g.`
          setReponse(this, i, montant, {
            formatInteractif: 'calcul',
            digits: 4,
            decimals: 2,
            signe: false,
          })
          break
      }
      if (this.questionJamaisPosee(i, pourcent[i], choix[i], montant)) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
