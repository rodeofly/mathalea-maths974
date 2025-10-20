import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'
import { ecritureNombreRelatif } from '../../lib/outils/ecritures'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import { Relatif } from '../../modules/Relatif'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { propositionsQcm } from '../../lib/interactif/qcm'
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'
export const titre =
  'Multiplications et quotients de relatifs : signe avec une lettre'
export const dateDeModifImportante = '18/09/2024'

/**
 * Effectuer des multiplications de relatifs dans un tableau à double entrée
 *
 * @author Cédric GROLLEAU
 */
export const uuid = '73187'

export const refs = {
  'fr-fr': ['4C10-6'],
  'fr-ch': ['10NO4-8'],
}
export default class ExerciceTableauMultiplicationsRelatifs extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      5,
      '1 : Multiplications\n2 : Quotients \n3 : Multiplications et quotients \n4 : Multiplications avec plusieurs fois la lettre (dont puissances) \n5 : Mélange ',
    ]
    this.sup = 3
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = false
    this.spacing = 2
    this.nbQuestions = 3
  }

  nouvelleVersion() {
    let typesDeQuestionsDisponibles
    switch (this.sup) {
      case 1: // multiplications
        typesDeQuestionsDisponibles = [1]
        break
      case 2: // Quotient
        typesDeQuestionsDisponibles = [2]
        break
      case 3: // multiplications et quotients
        typesDeQuestionsDisponibles = [1, 2]
        break
      case 4: // produit avec plusieurs fois la lettre
        typesDeQuestionsDisponibles = [3, 4]
        break
      case 5: // mélange
      default:
        typesDeQuestionsDisponibles = [1, 2, 3, 4]
        break
    }
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    for (
      let i = 0,
        texte,
        texteCorr,
        nbLettres,
        nbNum,
        expLettre,
        reponse,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      this.autoCorrection[i] = {}
      // on ne choisit que des nombres compris entre 1 et 20
      const nbMax = 20
      // Le tableau des relatifs nécessaires, il m'en faut max 5 !
      const num = new Relatif(
        randint(-1, 1, [0]) * randint(1, nbMax),
        randint(-1, 1, [0]) * randint(1, nbMax),
        randint(-1, 1, [0]) * randint(1, nbMax),
        randint(-1, 1, [0]) * randint(1, nbMax),
        randint(-1, 1, [0]) * randint(1, nbMax),
      )
      const lettreTab = ['n', 'x', 'y', 'a', 'm']
      const lettre = lettreTab[randint(0, lettreTab.length - 1)]
      const nomExpression = lettreDepuisChiffre(i + 1)
      const signeExpression = randint(-1, 1, [0])
      const nbTermes =
        listeTypeDeQuestions[i] === 1 ? randint(3, 5) : randint(4, 6)
      let placeLettre = randint(0, nbTermes - 1)
      const listeNombres = num.relatifs.slice(0, nbTermes - 1)
      const listeTermes = []
      for (let indice = 0; indice < listeNombres.length; indice++) {
        listeTermes.push(ecritureNombreRelatif(listeNombres[indice]))
      }
      listeTermes.splice(placeLettre, 0, lettre)
      let calcul = ''
      let signeLettre, calculNombres
      texte = `Donne le signe de $ ${lettre} $ pour que ${nomExpression} soit ${signeExpression === -1 ? 'négatif' : 'positif'}. <br>`
      texteCorr = `${texteEnCouleurEtGras('Supposons que ' + lettre + ' soit positif : ', 'blue')}`

      switch (listeTypeDeQuestions[i]) {
        case 1: // multiplications
          calcul += `${listeTermes[0]} `
          for (let k = 1; k < nbTermes; k++) {
            calcul += `\\times ${listeTermes[k]}`
          }
          texte += ` ${nomExpression} = $ ${calcul} $ <br>`
          reponse =
            signeExpression === num.getSigneProduitNumber(...listeNombres)
              ? 'positif'
              : 'négatif'
          if (this.correctionDetaillee) {
            texteCorr += `<br> ${num.setRegleSigneProduit(...listeNombres)}`
            texteCorr += `<br><br> Donc si ${texteEnCouleurEtGras(lettre + ' est positif', 'black')} $ ${calcul} $ est ${texteEnCouleurEtGras(num.getSigneProduitString(...listeNombres), 'black')}.`
            texteCorr += `<br><br> ${texteEnCouleurEtGras('Supposons maintenant que ' + lettre + ' soit négatif : ', 'blue')}`
            listeNombres.push(-1)
            texteCorr += `<br><br> ${num.setRegleSigneProduit(...listeNombres, -1)}`
            texteCorr += `<br><br> Donc si ${texteEnCouleurEtGras(lettre + ' est négatif', 'black')} $ ${calcul} $ est ${texteEnCouleurEtGras(num.getSigneProduitString(...listeNombres), 'black')}.`
            texteCorr +=
              `<br><br> ${texteEnCouleurEtGras('Conclusion :', 'blue')} <br>` +
              texteEnCouleurEtGras(
                `Il faut donc que $ ${lettre} $ soit ${signeExpression === num.getSigneProduitNumber(...listeNombres) ? 'négatif' : 'positif'} pour que ${nomExpression} soit ${signeExpression === -1 ? 'négatif' : 'positif'}.`,
              )
          } else {
            texteCorr = `Il faut que $ ${lettre} $ soit ${signeExpression === num.getSigneProduitNumber(...listeNombres) ? 'positif' : 'négatif'} pour que ${nomExpression} soit ${signeExpression === -1 ? 'négatif' : 'positif'}.`
          }
          break
        case 2: // quotient de 2 produits
          calcul += '\\dfrac {' + listeTermes[0]
          nbNum = randint(2, nbTermes - 2)
          for (let k = 1; k < nbNum + 1; k++) {
            calcul += `\\times ${listeTermes[k]}`
          }
          calcul += '}{' + listeTermes[nbNum + 1]
          for (let denom = nbNum + 2; denom < nbTermes; denom++) {
            calcul += `\\times ${listeTermes[denom]}`
          }
          calcul += '}'
          texte += ` ${nomExpression} = $ ${calcul} $ <br>`
          reponse =
            signeExpression === num.getSigneProduitNumber(...listeNombres)
              ? 'positif'
              : 'négatif'
          if (this.correctionDetaillee) {
            texteCorr += `<br> ${num.setRegleSigneQuotient(...listeNombres)}`
            texteCorr += `<br><br> Donc si ${texteEnCouleurEtGras(lettre + ' est positif', 'black')} $ ${calcul} $ est ${texteEnCouleurEtGras(num.getSigneProduitString(...listeNombres), 'black')}.`
            texteCorr += `<br><br> ${texteEnCouleurEtGras('Supposons maintenant que ' + lettre + ' soit négatif : ', 'blue')}`
            listeNombres.push(-1)
            texteCorr += `<br> ${num.setRegleSigneQuotient(...listeNombres)}`
            texteCorr += `<br><br> Donc si ${texteEnCouleurEtGras(lettre + ' est négatif', 'black')} $ ${calcul} $ est ${texteEnCouleurEtGras(num.getSigneProduitString(...listeNombres), 'black')}.`
            texteCorr +=
              `<br><br> ${texteEnCouleurEtGras('Conclusion :', 'blue')} <br>` +
              texteEnCouleurEtGras(
                `Il faut donc que $ ${lettre} $ soit ${signeExpression === num.getSigneProduitNumber(...listeNombres) ? 'négatif' : 'positif'} pour que ${nomExpression} soit ${signeExpression === -1 ? 'négatif' : 'positif'}.`,
              )
          } else {
            texteCorr = `Il faut que $ ${lettre} $ soit ${signeExpression === num.getSigneProduitNumber(...listeNombres) ? 'positif' : 'négatif'} pour que ${nomExpression} soit ${signeExpression === -1 ? 'négatif' : 'positif'}.`
          }

          break
        case 3: // produit avec plusieurs fois la lettre
          signeLettre = randint(-1, 1, [0])
          texte = `Donne le signe de ${nomExpression} si $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}. <br>`
          texteCorr = ''
          nbLettres = randint(1, 3)
          placeLettre = randint(0, nbTermes - 1)
          for (let k = 0; k < nbLettres; k++) {
            listeTermes.splice(placeLettre, 0, lettre)
          }
          calcul += `${listeTermes[0]} `
          for (let k = 1; k < nbTermes + nbLettres; k++) {
            calcul += `\\times ${listeTermes[k]}`
          }
          calculNombres = `${listeNombres[0]} `
          for (let k = 1; k < nbTermes - 1; k++) {
            calculNombres += `\\times ${listeNombres[k]}`
          }
          texte += ` ${nomExpression} = $ ${calcul} $ <br>`
          if (this.correctionDetaillee) {
            if (nbLettres === 1 || nbLettres === 3) {
              texteCorr += `On trouve ${nbLettres + 1} fois le facteur $ ${lettre} $.<br> Or ${nbLettres + 1} est pair donc leur produit sera positif.`
              texteCorr += `<br>Le signe de l'expression a donc le signe de : $ ${calculNombres} $`
              texteCorr += `<br><br> ${num.setRegleSigneProduit(...listeNombres)}`
              texteCorr +=
                '<br><br>' +
                texteEnCouleurEtGras(
                  `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quel que soit le signe de $ ${lettre} $.`,
                )
            } else {
              texteCorr += `On trouve ${nbLettres + 1} fois le facteur $ ${lettre} $. <br> Or ${nbLettres + 1} est impair donc leur produit est du signe de $ ${lettre} $ soit ${signeLettre === -1 ? 'négatif' : 'positif'}.`
              if (signeLettre === -1) {
                texteCorr += `<br>Le signe de l'expression a donc le signe opposé à : $ ${calculNombres} $`
                texteCorr += `<br><br> ${num.setRegleSigneProduit(...listeNombres)}`
                listeNombres.push(-1)
                texteCorr +=
                  '<br><br>' +
                  texteEnCouleurEtGras(
                    `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quand $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}.`,
                  )
              } else {
                texteCorr += `<br>Le signe de l'expression a donc le signe opposé à : $ ${calculNombres} $`
                texteCorr += `<br><br> ${num.setRegleSigneProduit(...listeNombres)}`
                texteCorr +=
                  '<br><br>' +
                  texteEnCouleurEtGras(
                    `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quand $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}.`,
                  )
              }
            }
            reponse = num.getSigneProduitString(...listeNombres)
          } else {
            if (nbLettres === 1 || nbLettres === 3) {
              texteCorr = texteEnCouleurEtGras(
                `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quel que soit le signe de $ ${lettre} $.`,
              )
            } else {
              if (signeLettre === -1) {
                listeNombres.push(-1)
                texteCorr = texteEnCouleurEtGras(
                  `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quand $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}.`,
                )
              } else {
                texteCorr = texteEnCouleurEtGras(
                  `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quand $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}.`,
                )
              }
            }
            reponse = num.getSigneProduitString(...listeNombres)
          }
          break
        case 4: // puissance
          signeLettre = randint(-1, 1, [0])
          texte = `Donne le signe de ${nomExpression} si $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}. <br>`
          texteCorr = ''
          expLettre = randint(2, 7)
          if (placeLettre === 0) {
            calcul += listeTermes[0] + '^{' + expLettre + '}'
          } else {
            calcul += listeTermes[0]
          }
          for (let k = 1; k < nbTermes; k++) {
            if (k === placeLettre) {
              calcul += '\\times ' + listeTermes[k] + '^{' + expLettre + '}'
            } else {
              calcul += '\\times ' + listeTermes[k]
            }
          }
          calculNombres = `${listeNombres[0]} `
          for (let k = 1; k < nbTermes - 1; k++) {
            calculNombres += `\\times ${listeNombres[k]}`
          }
          texte += ` ${nomExpression} = $ ${calcul} $ <br>`
          if (this.correctionDetaillee) {
            if (expLettre % 2 === 0) {
              texteCorr += `On trouve ${expLettre} fois le facteur $ ${lettre} $.<br> Or ${expLettre} est pair donc leur produit sera positif.`
              texteCorr += `<br>Le signe de l'expression a donc le signe de : $ ${calculNombres} $`
              texteCorr += `<br><br> ${num.setRegleSigneProduit(...listeNombres)}`
              texteCorr +=
                '<br><br>' +
                texteEnCouleurEtGras(
                  `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quel que soit le signe de $ ${lettre} $.`,
                )
              reponse = num.getSigneProduitString(...listeNombres)
            } else {
              texteCorr += `On trouve ${expLettre} fois le facteur $ ${lettre} $. <br> Or ${expLettre} est impair donc leur produit est du signe de $ ${lettre} $ soit ${signeLettre === -1 ? 'négatif' : 'positif'}.`
              if (signeLettre === -1) {
                texteCorr += `<br>Le signe de l'expression a donc le signe opposé à : $ ${calculNombres} $`
                texteCorr += `<br><br> ${num.setRegleSigneProduit(...listeNombres)}`
                listeNombres.push(-1)
                texteCorr +=
                  '<br><br>' +
                  texteEnCouleurEtGras(
                    `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quand $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}.`,
                  )
              } else {
                texteCorr += `<br>Le signe de l'expression a donc le signe opposé à : $ ${calculNombres} $`
                texteCorr += `<br><br> ${num.setRegleSigneProduit(...listeNombres)}`
                texteCorr +=
                  '<br><br>' +
                  texteEnCouleurEtGras(
                    `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quand $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}.`,
                  )
              }
              reponse = num.getSigneProduitString(...listeNombres)
            }
          } else {
            if (expLettre % 2 === 0) {
              texteCorr += texteEnCouleurEtGras(
                `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quel que soit le signe de $ ${lettre} $.`,
              )
            } else {
              if (signeLettre === -1) {
                listeNombres.push(-1)
                texteCorr = texteEnCouleurEtGras(
                  `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quand $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}.`,
                )
              } else {
                texteCorr = texteEnCouleurEtGras(
                  `Donc ${nomExpression} est ${num.getSigneProduitString(...listeNombres)} quand $ ${lettre} $ est ${signeLettre === -1 ? 'négatif' : 'positif'}.`,
                )
              }
            }
            reponse = num.getSigneProduitString(...listeNombres)
          }
          break
      }
      this.autoCorrection[i] = {
        enonce: texte,
        options: { ordered: true },
        propositions: [
          {
            texte: 'négatif',
            statut: reponse === 'négatif',
          },
          /* {
            texte: 'nul',
            statut: false
          }, */
          {
            texte: 'positif',
            statut: reponse === 'positif',
          },
        ],
      }

      texte += propositionsQcm(this, i).texte
      if (
        this.questionJamaisPosee(i, listeTypeDeQuestions[i], ...listeNombres)
      ) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
