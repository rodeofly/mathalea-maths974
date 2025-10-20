
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import ExerciceQcmA from '../../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '41fa7'
/** @author Stéphane Guyon */
export const refs = {
  'fr-fr': ['canTEC1-04'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer les puissances de $i$'
export default class Complexes1 extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce =
      '$i^{4}$ est égal à '
    this.correction =
      `On sait que $i^{2}=-1$ donc $i^{4}=\\left(-1\\right)^{2}=${miseEnEvidence('1')}.$`

    this.reponses = [
      '$1 $',
      '$-1$ ',
      '$i $',
      '$-i$ ',
    ]
  }

  versionAleatoire = () => {
    const k = randint(3,15)

const moins = randint(1, 2)

          switch(moins) {
    case 1: 
     this.enonce =
        `$i^{${k}}$ est égal à `
this.correction =
        `Par définition, on sait que $i^{2}=-1$. `
    
    if (k%4===0) {
      if (k===4) {this.correction += ` donc $i^{4}=${miseEnEvidence('1')}$ .`}
      else {
        this.correction +=
        ` donc $i^{4}=1$ .<br>$\\begin{aligned}i^{${k}}&=\\left(i^{4}\\right)^{${k/4}}\\\\
        &=${miseEnEvidence('1')}.
        \\end{aligned}$`
        }
       this.reponses = [
          '$1 $',
          '$-1$ ',
          '$i $',
      '$-i$ ',
    ]}
     if (k===7) {
       this.correction +=
         ` donc $i^{4}=1$, <br> 
         $\\begin{aligned}
         i^{7}&=i^{4}\\times i^{3}\\\\
          &=i^{3}\\\\
         &=i^{2}\\timesi\\\\
          &=${miseEnEvidence('-i.')}
         \\end{aligned}$`
       this.reponses = [
           '$-i $',
           '$1 $',
           '$-1$ ',
           '$i$ ',
       ]
    }
     if (k===3) {
      this.correction +=
         `  <br> 
         $\\begin{aligned}
         i^{3}&=i^{2}\\times i\\\\
         &=${miseEnEvidence('-i.')}
         \\end{aligned}$`
      this.reponses = [
           '$-i $',
           '$1 $',
           '$-1$ ',
           '$i$ ',
       ]
    }
      if (k%4===2) {
        this.correction +=
         ` donc $i^{4}=1$, <br>  
         $\\begin{aligned}
         i^{${k}}&=i^{${k-2}}\\times i^{2}\\\\
         &=\\left(i^{4}\\right)^{${(k-2)/4}}\\times i^{2}\\\\
         &=${miseEnEvidence('-1.')}
         \\end{aligned}$`
         this.reponses = [
           '$-1$ ',
           '$-i$ ',
           '$1 $',
           '$i $',
       ]
    }
     if (k%4===1) {
         this.correction +=
         ` donc $i^{4}=1$, <br>  
         $\\begin{aligned}
         i^{${k}}&=i^{${k-1}}\\timesi\\\\
         &=\\left(i^{4}\\right)^{${(k-1)/4}}\\timesi\\\\
         &=${miseEnEvidence('i.')}
         \\end{aligned}$`
         this.reponses = [
            '$i$ ',
            '$1 $',
            '$-1$ ',
            '-$i $'
       ]
     }
     break
    case 2:
      this.enonce =
        `$\\left(\\mathrm{-i}\\right)^{${k}}$ est égal à `
      this.correction =
        `On sait que $\\left(\\mathrm{-i}\\right)^{${k}}=\\left(\\mathrm{-1}\\right)^{${k}}\\times i^{${k}}$. <br>`
     this.correction +=
        'Par définition, on a $i^{2}=-1$ '

    if (k%4===0) {
      if (k===4) {this.correction += ` donc $i^{4}=1$ et finalement $\\left(\\mathrm{-i}\\right)^{4}=${miseEnEvidence('1')}$ .`}
      else {
        this.correction +=
        ` donc $i^{4}=1$ .<br>
        $\\begin{aligned}\\left(\\mathrm{-i}\\right)^{${k}}
        &=\\mathrm{-i}^{${k}}\\\\
        &=\\left(i^{4}\\right)^{${k/4}}\\\\
        &=${miseEnEvidence('1')}.
        \\end{aligned}$`
        }
       this.reponses = [
          '$1 $',
          '$-1$ ',
          '$i $',
      '$-i$ ',
    ]}
     if (k===7) {
       this.correction +=
         ` donc $i^{4}=1$, <br> 
         $\\begin{aligned}
         \\left(\\mathrm{-i}\\right)^{7}&=\\left(-1\\right)^{7}\\times i^{7}\\\\
         &=-i^{4}\\times i^{3}\\\\
         &=-i^{3}\\\\
         &=-i^{2}\\timesi\\\\
          &=${miseEnEvidence('i.')}
         \\end{aligned}$`
       this.reponses = [
           '$i $',
           '$1 $',
           '$-1$ ',
           '$-i$ ',
       ]
    }
     if (k===3) {
      this.correction +=
         `  <br> 
         $\\begin{aligned}
         \\left(\\mathrm{-i}\\right)^{3}&= -i^{3}\\\\
         &=-i^{2}\\times i\\\\
         &=${miseEnEvidence('i.')}
         \\end{aligned}$`
      this.reponses = [
           '$i $',
           '$1 $',
           '$-1$ ',
           '$-i$ ',
       ]
    }
      if (k%4===2) {
        this.correction +=
         ` donc $i^{4}=1$, <br>  
         $\\begin{aligned}
         \\left(\\mathrm{-i}\\right)^{${k}}&=\\left(-1\\right)^{${k}}\\times i^{${k-2}}\\times i^{2}\\\\
         &=i^{${k-2}}\\times i^{2}\\\\
         &=\\left(i^{4}\\right)^{${(k-2)/4}}\\times i^{2}\\\\
         &=${miseEnEvidence('-1.')}
         \\end{aligned}$`
         this.reponses = [
           '$-1$ ',
           '$-i$ ',
           '$1 $',
           '$i $',
       ]
    }
     if (k%4===1) {
         this.correction +=
         ` donc $i^{4}=1$, <br>  
         $\\begin{aligned}
         \\left(\\mathrm{-i}\\right)^{${k}}&=(-1)^{${k}}\\timesi^{${k-1}}\\timesi\\\\
         &=-i^{${k-1}}\\timesi\\\\
         &=${miseEnEvidence('-i.')}
         \\end{aligned}$`
         this.reponses = [
            '$-i$ ',
            '$1 $',
            '$-1$ ',
            '$i $'
       ]
    
     
      break
      }
}}
  constructor() {
    super()
    this.versionAleatoire()
  }
}
