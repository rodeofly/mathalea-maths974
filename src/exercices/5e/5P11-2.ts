import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence, texteEnCouleurEtGras } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import Grandeur from '../../modules/Grandeur'
import { listeQuestionsToContenu } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Convertir des vitesses entre m/s et km/h'
export const dateDePublication = '19/08/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'cv001'
export const refs = {
  'fr-ch': ['11FA11-3'],
  'fr-fr': ['5P11-2']
}

/**
 * Exercice de conversion de vitesses entre m/s et km/h utilisant la classe Grandeur
 * @author Nathan Scheinmann
 */
export default class ConvertirVitesse extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 5
    this.sup = 1 // Type de conversion (1: m/s→km/h, 2: km/h→m/s, 3: mélange)
    this.sup2 = false // Nombres décimaux
    this.besoinFormulaireNumerique = ['Type de conversions', 3, '1 : m/s vers km/h\n2 : km/h vers m/s\n3 : Mélange']
    this.besoinFormulaire2CaseACocher = ['Valeurs plus simples', false]
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = true
  }

  nouvelleVersion (): void {
    this.autoCorrection = []
    
    // Déterminer les types de questions disponibles
    let typesDeQuestionsDisponibles: number[]
    if (this.sup === 1) {
      typesDeQuestionsDisponibles = [1] // m/s → km/h
    } else if (this.sup === 2) {
      typesDeQuestionsDisponibles = [2] // km/h → m/s
    } else {
      typesDeQuestionsDisponibles = [1, 2] // Mélange
    }

    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)
    
    // Définir la consigne selon le nombre de questions
    if (this.nbQuestions === 1) {
      this.consigne = 'Convertir la vitesse donnée.'
    } else {
      this.consigne = 'Convertir les vitesses données.'
    }

    if (this.interactif) {
      this.consigne += ' Donner le résultat sous forme décimale avec au maximum 2 chiffres après la virgule.'
    }
    
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; i++) {
      let texte: string
      let texteCorr: string
      const typeDeQuestion = listeTypeDeQuestions[i]
      let valeur: number
      let uniteDepart: string
      let uniteArrivee: string
      let reponse: number
      
      // Déterminer les unités selon le type de question
      if (typeDeQuestion === 1) {
        uniteDepart = 'm/s'
        uniteArrivee = 'km/h'
      } else {
        uniteDepart = 'km/h'
        uniteArrivee = 'm/s'
      }
      
      // Générer une valeur selon l'option décimale
      if (this.sup2) {
        // Valeurs avec décimales (favoriser des résultats "propres")
        if (typeDeQuestion === 1) { // m/s → km/h
          valeur = choice([2.5, 5.5, 8.3, 10.2, 12.5, 15.8, 20.4, 25.0, 30.6, 33.3])
        } else { // km/h → m/s
          valeur = choice([18.0, 36.0, 54.0, 72.0, 90.0, 108.0, 126.0, 144.0, 162.0, 180.0])
        }
      } else {
        // Valeurs entières favorisant des calculs simples
        if (typeDeQuestion === 1) { // m/s → km/h
          valeur = choice([2, 5, 8, 10, 15, 20, 25, 30])
        } else { // km/h → m/s  
          valeur = choice([18, 36, 54, 72, 90, 108, 126, 144])
        }
      }
      
      // Utiliser la classe Grandeur pour effectuer la conversion
      const vitesse = new Grandeur(valeur, uniteDepart)
      const vitesseConvertie = vitesse.convertirEn(uniteArrivee)
      reponse = vitesseConvertie.mesure
      
      // Formater la question
      texte = `Convertir $${texNombre(valeur, 2)}\\text{\\,${uniteDepart}}$ en $\\text{${uniteArrivee}}$.`
      
      // Ajouter le champ de réponse si interactif
      if (this.interactif) {
        texte += '<br>' + ajouteChampTexteMathLive(this, i, KeyboardType.clavierNumbers, { texteAvant: ' ', texteApres: ` $\\text{${uniteArrivee}}$` })
      }
      
      // Préparer la correction détaillée
      if (this.correctionDetaillee) {
        if (typeDeQuestion === 1) {
          // m/s → km/h
          texteCorr = `Pour convertir des vitesses de $\\text{\\,m/s}$ en $\\text{\\,km/h}$, nous devons comprendre la relation entre ces deux unités.<br><br>`
          
          texteCorr += `${texteEnCouleurEtGras('Étape 1 : Analyser les unités')}<br>`
          texteCorr += ` Dans $1\\text{\\,m/s}$ : on parcourt $1$ mètre en $1$ seconde<br>`
          texteCorr += ` Dans $1\\text{\\,km/h}$ : on parcourt $1$ kilomètre en $1$ heure<br><br>`
          
          texteCorr += `${texteEnCouleurEtGras('Étape 2 : Établir les équivalences')}<br>`
          texteCorr += ` $1\\text{\\,km} = 1000\\text{\\,m}$<br>`
          texteCorr += ` $1\\text{\\,h} = 60\\text{\\,min} = 60 \\times 60\\text{\\,s} = 3600\\text{\\,s}$<br><br>`
          
          texteCorr += `${texteEnCouleurEtGras('Étape 3 : Calculer le facteur de conversion')}<br>`
          texteCorr += `Pour convertir $1\\text{\\,m/s}$ en $\\text{km/h}$ :<br>`
          texteCorr += `$1\\text{\\,m/s} = \\dfrac{1\\text{\\,m}}{1\\text{\\,s}}$<br><br>`
          texteCorr += `En convertissant les unités :<br>`
          texteCorr += `$\\dfrac{1\\text{\\,m}}{1\\text{\\,s}} = \\dfrac{1\\text{\\,m} \\times \\dfrac{1\\text{\\,km}}{1000\\text{\\,m}}}{1\\text{\\,s} \\times \\dfrac{1\\text{\\,h}}{3600\\text{\\,s}}} = \\dfrac{\\dfrac{1}{1000}\\text{\\,km}}{\\dfrac{1}{3600}\\text{\\,h}} = \\dfrac{1}{1000} \\times \\dfrac{3600}{1}\\,\\dfrac{\\text{km}}{\\text{h}} = \\dfrac{3600}{1000}\\,\\dfrac{\\text{km}}{\\text{h}} = 3{,}6\\text{\\,km/h}$<br><br>`
          
          texteCorr += `${texteEnCouleurEtGras('Règle : Pour convertir des m/s en km/h, on multiplie par 3,6')}<br><br>`
          
          texteCorr += `${texteEnCouleurEtGras('Étape 4 : Application numérique')}<br>`
          texteCorr += `$${texNombre(valeur, 2)}\\text{\\,m/s} = ${texNombre(valeur, 2)} \\times 3{,}6 = ${miseEnEvidence(`${texNombre(reponse, 2)}\\text{\\,km/h}`)}$`
        } else {
          // km/h → m/s
          texteCorr = `Pour convertir des vitesses de $\\text{\\,km/h}$ en $\\text{\\,m/s}$, nous devons établir la relation entre ces unités.<br><br>`
          
          texteCorr += `${texteEnCouleurEtGras('Étape 1 : Analyser les unités')}<br>`
          texteCorr += ` Dans $1\\text{\\,km/h}$ : on parcourt $1$ kilomètre en $1$ heure<br>`
          texteCorr += ` Dans $1\\text{\\,m/s}$ : on parcourt $1$ mètre en $1$ seconde<br><br>`
          
          texteCorr += `${texteEnCouleurEtGras('Étape 2 : Établir les équivalences')}<br>`
          texteCorr += ` $1\\text{\\,km} = 1000\\text{\\,m}$<br>`
          texteCorr += ` $1\\text{\\,h} = 60\\text{\\,min} = 60 \\times 60\\text{\\,s} = 3600\\text{\\,s}$<br><br>`
          
          texteCorr += `${texteEnCouleurEtGras('Étape 3 : Calculer le facteur de conversion')}<br>`
          texteCorr += `Pour convertir $1\\text{\\,km/h}$ en $\\text{\\,m/s}$ :<br>`
          texteCorr += `$1\\text{\\,km/h} = \\dfrac{1\\text{\\,km}}{1\\text{\\,h}}= \\dfrac{1000\\text{\\,m}}{3600\\text{\\,s}} =  1\\div 3{,}6\\text{\\,m/s}$<br><br>`
          texteCorr += `${texteEnCouleurEtGras('Règle : Pour convertir des km/h en m/s, on divise par 3,6')}<br><br>`
          
          texteCorr += `${texteEnCouleurEtGras('Étape 4 : Application numérique')}<br>`
          texteCorr += `$${texNombre(valeur, 2)}\\text{\\,km/h} = ${texNombre(valeur, 2)} \\div 3{,}6 = ${miseEnEvidence(`${texNombre(reponse, 2)}\\text{\\,m/s}`)}$`
        }
      } else {
        // Correction simple
        if (typeDeQuestion === 1) {
          texteCorr = `${texteEnCouleurEtGras('Conversion m/s → km/h : multiplier par 3,6')}<br><br>`
          texteCorr += `$${texNombre(valeur, 2)}\\text{\\,m/s} = ${texNombre(valeur, 2)} \\times 3{,}6 = ${miseEnEvidence(`${texNombre(reponse, 2)}\\text{\\,km/h}`)}$`
        } else {
          texteCorr = `${texteEnCouleurEtGras('Conversion km/h → m/s : diviser par 3,6')}<br><br>`
          texteCorr += `$${texNombre(valeur, 2)}\\text{\\,km/h} = ${texNombre(valeur, 2)} \\div 3{,}6 = ${miseEnEvidence(`${texNombre(reponse, 2)}\\text{\\,m/s}`)}$`
        }
      }

      // Ajouter la gestion pour l'interactivité
      if (this.interactif) {
        handleAnswers(this, i, { 
          reponse: { 
            value: reponse,
            options: { 
              nombreDecimalSeulement: true 
            } 
          } 
        })
      }
      
      if (this.questionJamaisPosee(i, valeur, typeDeQuestion)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        cpt++
      } else {
        cpt++
        i--
      }
    }
    
    listeQuestionsToContenu(this)
  }
}