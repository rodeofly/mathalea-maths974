import {
  choice,
  combinaisonListes,
  compteOccurences,
} from '../../lib/outils/arrayOutils'
import { texFractionFromString } from '../../lib/outils/deprecatedFractions'
import { arrondi } from '../../lib/outils/nombres'
import { pgcd } from '../../lib/outils/primalite'
import { stringNombre, texNombre } from '../../lib/outils/texNombre'
import Exercice from '../Exercice'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'

import { fraction } from '../../modules/fractions'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { miseEnEvidence } from '../../lib/outils/embellissements'

export const titre = "Calculer la fraction d'une quantité"
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * Calculer la fraction d'une quantité avec ou sans dessin.
 * @author Jean-Claude Lhote
 */
export const uuid = 'a168c'

export const refs = {
  'fr-fr': ['6N3M-1'],
  'fr-2016': ['6N33-0'],
  'fr-ch': ['9NO14-2'],
}
export default class FractionDuneQuantite extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Type de questions',
      5,
      "1 : Heures & minutes (inférieur à 1h)\n2 : Heures & minutes (jusqu'à 3h)\n3 : Tablettes de chocolat\n4 : Bâton cassé\n5 : Mélange",
    ]
    this.besoinFormulaire2CaseACocher = ['Avec dessin', true]
    this.nbQuestions = 5
    context.isHtml ? (this.spacingCorr = 3.5) : (this.spacingCorr = 2)
    context.isHtml ? (this.spacing = 2) : (this.spacing = 2)
    this.sup = 1
    this.sup2 = true
  }

  nouvelleVersion() {
    let typesDeQuestionsDisponibles
    let listeTypeDeQuestions = []
    const choixdenh = combinaisonListes(
      [3, 4, 5, 10, 12, 20, 30],
      this.nbQuestions,
    )
    const choixdent = combinaisonListes([20, 24, 30], this.nbQuestions)
    const choixdenb = combinaisonListes([4, 5, 10, 12], this.nbQuestions)

    if (this.sup < 5) {
      if (!context.isAmc) typesDeQuestionsDisponibles = [parseInt(this.sup)]
      else typesDeQuestionsDisponibles = [Math.min(parseInt(this.sup), 3)]
    } else {
      if (!context.isAmc) typesDeQuestionsDisponibles = [1, 2, 3, 4]
      else typesDeQuestionsDisponibles = [1, 2, 3]
    }
    listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    const nbQuestions3 = combinaisonListes(
      [1, 2],
      compteOccurences(listeTypeDeQuestions, 3),
    )
    let indiceNbQuestions3 = 0
    for (
      let i = 0,
        den,
        num,
        choix,
        longueur,
        numIrred,
        denIrred,
        k,
        masse,
        frac,
        frac2,
        texte,
        texteCorr,
        index = 0,
        nbreponse,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      switch (listeTypeDeQuestions[i]) {
        case 1:
          nbreponse = 1
          den = choixdenh[i]
          num = randint(2, den - 1)
          frac = fraction(num, den)
          texte = `À combien de minutes correspondent $${frac.texFraction}$ d'heure ? ${ajouteChampTexteMathLive(this, index, ' college6eme', { texteApres: ' minutes' })}<br>`
          if (this.sup2) {
            texte += 'Cette fraction est représentée ci-dessous :<br>'
            const figure = frac.representation(2.5, 2.5, 2, 0, 'gateau', 'blue')
            texte += mathalea2d(Object.assign({}, fixeBordures(figure)), figure)
          }
          texteCorr = `Comme l'heure est partagée en ${den} parts égales, chaque part représente $${texFractionFromString(1, den)}$ d'heure, soit $${60 / den}$ minutes.<br>`
          texteCorr += `Ici, il y a $${texFractionFromString(num, den)}$ d'heure, ce qui représente $${num}$ fois plus, soit $${num}\\times${60 / den}=${(num * 60) / den}$.<br>`
          texteCorr += `$${frac.texFraction}$ d'heure correspond donc à $${miseEnEvidence((num * 60) / den)}$ minutes.`
          setReponse(this, index, Math.round((num * 60) / den))
          break
        case 2:
          nbreponse = 1
          den = choixdenh[i]
          num = randint(2, 3 * den, den)
          frac = fraction(num, den)
          texte = `À combien de minutes correspondent $${frac.texFraction}$ d'heure ? ${ajouteChampTexteMathLive(this, index, ' college6eme', { texteApres: ' minutes' })}<br>`
          if (this.sup2) {
            texte += 'Cette fraction est représentée ci-dessous :<br>'
            const figure = frac.representation(2.5, 2.5, 2, 0, 'gateau', 'blue')
            texte += mathalea2d(Object.assign({}, fixeBordures(figure)), figure)
          }
          texteCorr = `Comme l'heure est partagée en ${den} parts égales, chaque part représente $${texFractionFromString(1, den)}$ d'heure, soit $${60 / den}$ minutes.<br>`
          texteCorr += `Ici, il y a $${texFractionFromString(num, den)}$ d'heure, ce qui représente $${num}$ fois plus, soit $${num}\\times${60 / den}=${(num * 60) / den}$.<br>`
          texteCorr += `$${frac.texFraction}$ d'heure correspond donc à $${miseEnEvidence((num * 60) / den)}$ minutes.`
          setReponse(this, index, Math.round((num * 60) / den))
          break
        case 3:
          nbreponse = 1
          masse = choice([120, 180, 240, 300])
          denIrred = choixdent[i]
          numIrred = (i * randint(1, denIrred - 1)) % denIrred
          while (pgcd(denIrred, numIrred) !== 1 || denIrred / numIrred === 2) {
            denIrred = choixdent[i]
            numIrred = randint(2, denIrred - 1)
          }
          frac = fraction(numIrred, denIrred)
          frac2 = frac.entierMoinsFraction(1)
          texte = `Une tablette de chocolat a une masse totale de $${masse}$ grammes. Quelqu'un en a déjà consommé les $${frac.texFractionSimplifiee}$.<br>`
          choix = nbQuestions3[indiceNbQuestions3]
          if (choix === 1) {
            texte += `Quelle masse de chocolat a été consommée ? ${ajouteChampTexteMathLive(this, index, ' college6eme', { texteApres: ' g' })}<br>`
            texteCorr = `Comme la tablette a une masse de $${masse}$ grammes, $${texFractionFromString(1, denIrred)}$ de la tablette représente une masse de $${texNombre(masse / denIrred, 2)}$ grammes.<br>`
            texteCorr += `Ici, il y a $${frac.texFractionSimplifiee}$ de la tablette qui a été consommé, ce qui représente $${numIrred}$ fois plus, soit $${numIrred}\\times${texNombre(masse / denIrred, 2)}=${texNombre((numIrred * masse) / denIrred, 2)}$.<br>`
            texteCorr += `La masse de chocolat consommée est $${miseEnEvidence(texNombre((numIrred * masse) / denIrred, 2))}$ grammes.`
            setReponse(this, index, arrondi((numIrred * masse) / denIrred, 2))
          } else {
            texte += `Quelle masse de chocolat reste-t-il ? ${ajouteChampTexteMathLive(this, index, ' college6eme', { texteApres: ' g' })}<br>`
            texteCorr = `Comme la tablette a une masse de $${masse}$ grammes, $${texFractionFromString(1, denIrred)}$ de la tablette représente une masse de $${texNombre(masse / denIrred, 2)}$ grammes.<br>`
            texteCorr += `Ici, il y a $${frac.texFractionSimplifiee}$ de la tablette qui a été consommé, ce qui représente $${numIrred}$ fois plus, soit $${numIrred}\\times${texNombre(masse / denIrred, 2)}=${texNombre((numIrred * masse) / denIrred, 2)}$.<br>`
            texteCorr += `La masse de chocolat consommée est $${texNombre((numIrred * masse) / denIrred, 2)}$ grammes.<br>`
            texteCorr += `Il reste donc : $${masse}-${texNombre((numIrred * masse) / denIrred, 2)}=${miseEnEvidence(texNombre(masse - (numIrred * masse) / denIrred, 2))}$ grammes de chocolat.<br>`
            texteCorr += `une autre façon de faire est d'utiliser la fraction restante : $${texFractionFromString(denIrred, denIrred)}-${frac.texFractionSimplifiee}=${texFractionFromString(denIrred - numIrred, denIrred)}$.<br>`
            texteCorr += `$${texFractionFromString(denIrred - numIrred, denIrred)}$ de $${masse}$ grammes c'est $${denIrred - numIrred}$ fois $${masse / denIrred}$ grammes.<br>`
            texteCorr += `Il reste donc : $${denIrred - numIrred}\\times${texNombre(masse / denIrred, 2)}=${miseEnEvidence(texNombre(((denIrred - numIrred) * masse) / denIrred, 2))}$ grammes de chocolat.`
            setReponse(
              this,
              index,
              arrondi(((denIrred - numIrred) * masse) / denIrred, 2),
            )
          }
          indiceNbQuestions3++
          if (this.sup2) {
            texte += 'La tablette de chocolat est représentée ci-dessous :<br>'
            const figure = frac2.representationIrred(
              0,
              0,
              4,
              0,
              'barre',
              'brown',
            )
            texte += mathalea2d(Object.assign({}, fixeBordures(figure)), figure)
          }
          break
        case 4:
        default:
          nbreponse = 2
          longueur = choice([120, 180, 240, 300])
          denIrred = choixdenb[i]
          numIrred = randint(1, denIrred - 1)
          while (pgcd(denIrred, numIrred) !== 1 || denIrred / numIrred === 2) {
            denIrred = choice([2, 3, 4, 5, 10])
            numIrred = randint(1, denIrred - 1)
          }
          k = 300 / denIrred
          den = denIrred * k
          num = numIrred * k
          frac = fraction(num, den)
          texte = `Un bâton de $${texNombre(longueur / 100)}$ mètre`
          if (longueur >= 200) texte += 's'
          texte += ` de longueur est coupé à $${frac.texFractionSimplifiee}$ de sa longueur.<br>`
          texte += 'Calculer la longueur de chacun des morceaux en mètres.<br>'
          texte +=
            ajouteChampTexteMathLive(this, index, '  college6eme', {
              texteAvant: 'Morceau le plus long : ',
              texteApres: ' m',
            }) + '<br>'
          texte +=
            ajouteChampTexteMathLive(this, index + 1, '  college6eme', {
              texteAvant: 'Morceau le plus court : ',
              texteApres: ' m',
            }) + '<br>'

          setReponse(
            this,
            index,
            Math.max(
              arrondi((numIrred * longueur) / 100 / denIrred, 3),
              arrondi(
                longueur / 100 - (numIrred * longueur) / 100 / denIrred,
                3,
              ),
            ),
          )
          setReponse(
            this,
            index + 1,
            Math.min(
              arrondi((numIrred * longueur) / 100 / denIrred, 3),
              arrondi(
                longueur / 100 - (numIrred * longueur) / 100 / denIrred,
                3,
              ),
            ),
          )
          if (this.sup2) {
            texte += 'Ce bâton est représenté ci-dessous :<br>'
            const figure = frac.representationIrred(
              0,
              1,
              8,
              0,
              'segment',
              'blue',
              '0',
              `${stringNombre(longueur / 100)}`,
            )
            texte += mathalea2d(Object.assign({}, fixeBordures(figure)), figure)
          }
          texteCorr = `$${texFractionFromString(1, denIrred)}$ de $${texNombre(longueur / 100, 1)}$ représente $${texNombre(longueur / 100, 1)} \\div ${denIrred} = ${texNombre(longueur / 100 / denIrred, 3)}$.<br>`
          texteCorr += `Le premier morceau du bâton correspondant à $${frac.texFractionSimplifiee}$ du bâton mesure : $${numIrred} \\times ${texNombre(longueur / 100 / denIrred, 3)}=${miseEnEvidence(texNombre((numIrred * longueur) / 100 / denIrred, 3))}$ m.<br>`
          texteCorr += `Le deuxième morceau mesure donc : $${texNombre(longueur / 100, 1)}-${texNombre((numIrred * longueur) / 100 / denIrred, 3)}=${miseEnEvidence(texNombre(longueur / 100 - (numIrred * longueur) / 100 / denIrred, 3))}$ m.`

          break
      }

      if (this.listeCorrections.indexOf(texteCorr) === -1) {
        index += nbreponse
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
