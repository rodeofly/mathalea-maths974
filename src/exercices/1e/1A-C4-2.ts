import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { sp } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import { randint } from '../../modules/outils'
// import ExerciceQcmA from '../../ExerciceQcmA'
import ExerciceQcmA from '../ExerciceQcmA'

export const uuid = 'a3996'
export const refs = {
  'fr-fr': ['1A-C4-2'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer avec inverse, double, carré, ...'
export const dateDePublication = '29/09/2025'
// Ceci est un exemple de QCM avec version originale et version aléatoire
/**
 *
 * @author Gilles Mora
 *
 */
export default class AutoC4b extends ExerciceQcmA {
  
   versionOriginale: () => void = () => {
    this.enonce = `L'inverse du double de $5$ est égal à  : `
    this.correction = ` Le double de $5$ est $10$. <br>
    L'inverse de $10$ est $\\dfrac{1}{10}$.<br>
    L'inverse du double de $5$ est donc égal à  $${miseEnEvidence('\\dfrac{1}{10}')}$.
  `
    
    this.reponses = [
      '$\\dfrac{1}{10}$',
      '$10$',
      `$\\dfrac{1}{5}$`,
      '$\\dfrac{5}{2}$'
    ]
  }


  versionAleatoire: () => void = () => { 
    
          switch (randint(1,7)) {
         case 1:
           {
             const a = 2*randint(2, 10)+1
              this.enonce = `L'inverse du double de $${a}$ est égal à   : `
    this.correction = ` Le double de $${a}$ est $${2*a}$. <br>
    L'inverse de $${2*a}$ est $\\dfrac{1}{${2*a}}$.<br>
    L'inverse du double de $${a}$ est donc égal à   $${miseEnEvidence(`\\dfrac{1}{${2*a}}`)}$.
  `
    
    this.reponses = [
      `$\\dfrac{1}{${2*a}}$`,
      `$${2*a}$`,
      `$\\dfrac{2}{${a}}$`,
      `$\\dfrac{${a}}{2}$`
    ]
           }
           break
       case 2:
           {
             const a = 2*randint(2, 10)+1
              this.enonce = `Le double de l'inverse  de $${a}$ est égal à   : `
    this.correction = ` L'inverse de $${a}$ est $\\dfrac{1}{${a}}$. <br>
    Le double  de $\\dfrac{1}{${a}}$ est $\\dfrac{2}{${a}}$.<br>
    Le double de l'inverse  de $${a}$ est égal à    $${miseEnEvidence(`\\dfrac{2}{${a}}`)}$.
  `
    
    this.reponses = [
      `$\\dfrac{2}{${a}}$`,
      `$${2*a}$`,
      `$\\dfrac{1}{${2*a}}$`,
      `$\\dfrac{${a}}{2}$`
    ]
           }
           break
       case 3:
           {
             const a = randint(3, 10)
              this.enonce = `L'inverse du carré de $${a}$ est égal à   : `
    this.correction = ` Le carré de $${a}$ est $${a}^2 = ${a*a}$. <br>
    L'inverse de $${a*a}$ est $\\dfrac{1}{${a*a}}$.<br>
    L'inverse du carré de $${a}$ est donc égal à   $${miseEnEvidence(`\\dfrac{1}{${a*a}}`)}$.
  `
    
    this.reponses = [
      `$\\dfrac{1}{${a*a}}$`,
      `$${a*a}$`,
      `$\\dfrac{1}{${2*a}}$`,
      `$\\dfrac{2}{${a*a}}$`
    ]
           }
           break
       
       case 4:
           {
             const a = randint(2, 8)
              this.enonce = `Le double du carré de $${a}$ est égal à   : `
    this.correction = ` Le carré de $${a}$ est $${a}^2 = ${a*a}$. <br>
    Le double de $${a*a}$ est $2 \\times ${a*a} = ${2*a*a}$.<br>
    Le double du carré de $${a}$ est égal à    $${miseEnEvidence(`${2*a*a}`)}$.
  `
    
    this.reponses = [
      `$${2*a*a}$`,
      `$${a*a}$`,
      `$${2*a}^2$`,
      `$2${a}$`
    ]
           }
           break
       case 5:
           {
             const a = randint(3, 6)
              this.enonce = `Le carré du double de $${a}$ est égal à   : `
    this.correction = ` Le double de $${a}$ est $2 \\times ${a} = ${2*a}$. <br>
    Le carré de $${2*a}$ est $${2*a}^2 = ${4*a*a}$.<br>
    Le carré du double de $${a}$ est égal à    $${miseEnEvidence(`${4*a*a}`)}$.
  `
    
    this.reponses = [
      `$${4*a*a}$`,
      `$${2*a*a}$`,
      `$${4*a}$`,
      `$${a*a}$`
    ]
           }
           break
       case 6:
           {
             const a = 2*randint(2, 10)
              this.enonce = `L'inverse de la moitié de $${a}$ est égal à   : `
    this.correction = ` La moitié de $${a}$ est $\\dfrac{${a}}{2} = ${a/2}$. <br>
    L'inverse de $${a/2}$ est $\\dfrac{1}{${a/2}}$.<br>
    L'inverse de la moitié de $${a}$ est donc égal à   $${miseEnEvidence(`\\dfrac{1}{${a/2}}`)}$.
  `
    
    this.reponses = [
         `$\\dfrac{1}{${a/2}}$`,
    `$\\dfrac{1}{${2*a}}$`,
      `$\\dfrac{2}{${a}}$`,
      `$${a/2}$`
    ]
           }
           break
       case 7:
        default:
           {
             const a = 2*randint(2, 10)
              this.enonce = `La moitié de l'inverse de $${a}$ est égale à   : `
    this.correction = ` L'inverse de $${a}$ est $\\dfrac{1}{${a}}$. <br>
    La moitié de $\\dfrac{1}{${a}}$ est $\\dfrac{1}{2} \\times \\dfrac{1}{${a}} = \\dfrac{1}{${2*a}}$.<br>
    La moitié de l'inverse de $${a}$ est égale à    $${miseEnEvidence(`\\dfrac{1}{${2*a}}`)}$.
  `
    
    this.reponses = [
      `$\\dfrac{1}{${2*a}}$`,
      `$\\dfrac{2}{${a}}$`,
      `$\\dfrac{${a}}{2}$`,
      `$\\dfrac{1}{${a}}$`
    ]
           }
           break
       }
     }
   
     constructor() {
       super()
       this.versionAleatoire()
     }
   }