import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Encadrer avec des puissances de 10'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication 18/10/2021
*/
export const uuid = '3c064'

export const refs = {
  'fr-fr': ['can3C10'],
  'fr-ch': [],
}
export default class EncadrementAvecPuissancesDe10 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a
    const choix = choice(['$a$', '$b$'])
    switch (choice(['a', 'b', 'c', 'd', 'e'])) {
      case 'a':
        a =
          randint(2, 9) * 10 ** 4 +
          randint(1, 9) * 10 ** 3 +
          randint(1, 9) * 10 ** 2 +
          randint(1, 9) * 10 +
          randint(1, 9)
        this.question = `L'encadrement de $${texNombre(a)}$ par  deux puissances de $10$ d'exposants consécutifs est $10^a<${texNombre(a)}<10^b$.<br>
  
        Quelle est la valeur de ${choix} ?
  `
        if (choix === '$b$') {
          this.correction = `Comme $10000<${texNombre(a)}<100000$, alors :<br>
       $10^4<${texNombre(a)}<10^5$. On en déduit que $b=5$.`
          this.reponse = ['5']
        } else {
          this.correction = `Comme $10000<${texNombre(a)}<100000$, alors :<br>
           $10^4<${texNombre(a)}<10^5$. On en déduit que $a=4$.`
          this.reponse = ['4']
        }
        break

      case 'b':
        a =
          randint(2, 9) * 10 ** 5 +
          randint(1, 9) * 10 ** 4 +
          randint(1, 9) * 10 ** 3 +
          randint(1, 9) * 10 ** 2 +
          randint(1, 9) * 10 +
          randint(1, 9)
        this.question = `L'encadrement de $${texNombre(a)}$ par  deux puissances de $10$ d'exposants consécutifs est $10^a<${texNombre(a)}<10^b$.<br>
      
        Quelle est la valeur de ${choix} ?
      `
        if (choix === '$b$') {
          this.correction = `Comme $100000<${texNombre(a)}<1000000$, alors :<br>
       $10^5<${texNombre(a)}<10^6$. On en déduit $b=6$.`
          this.reponse = ['6']
        } else {
          this.correction = `Comme $100000<${texNombre(a)}<1000000$, alors :<br>
           $10^5<${texNombre(a)}<10^6$. On en déduit $a=5$.`
          this.reponse = ['5']
        }
        break

      case 'c':
        a = randint(2, 9) * 0.001 + randint(1, 9) * 0.01
        this.question = `L'encadrement de $${texNombre(a)}$ par  deux puissances de $10$ d'exposants consécutifs est $10^a<${texNombre(a)}<10^b$.<br>
        
        Quelle est la valeur de ${choix} ?
            `
        if (choix === '$b$') {
          this.correction = `Comme $0,01<${texNombre(a)}<0,1$, alors :<br>
       $10^{-2}<${texNombre(a)}<10^{-1}$. On en déduit : $b=-1$.`
          this.reponse = ['-1']
        } else {
          this.correction = `Comme $0,01<${texNombre(a)}<0,1$, alors :<br>
        $10^{-2}<${texNombre(a)}<10^{-1}$. On en déduit : $a=-2$.`
          this.reponse = ['-2']
        }
        break
      case 'd':
        a = randint(2, 9) * 0.001
        this.question = `L'encadrement de $${texNombre(a)}$ par  deux puissances de $10$ d'exposants consécutifs est $10^a<${texNombre(a)}<10^b$.<br>
        
        Quelle est la valeur de ${choix} ?
              `
        if (choix === '$a$') {
          this.correction = `Comme $0,001<${texNombre(a)}<0,01$, alors :<br>
       $10^{-3}<${texNombre(a)}<10^{-2}$, donc $a=-3$.`
          this.reponse = ['-3']
        } else {
          this.correction = `Comme $0,001<${texNombre(a)}<0,01$, alors :<br>
        $10^{-3}<${texNombre(a)}<10^{-2}$, donc $b=-2$.`
          this.reponse = ['-2']
        }
        break
      case 'e':
        a = randint(2, 9) * 0.01 + randint(1, 5) * 0.1

        this.question = `L'encadrement de $${texNombre(a)}$ par  deux puissances de $10$ d'exposants consécutifs est $10^a<${texNombre(a)}<10^b$.<br>
        
        Quelle est la valeur de ${choix} ?
                `
        if (choix === '$a$') {
          this.correction = `Comme $0,1<${texNombre(a)}<1$, alors :<br>
         $10^{-1}<${texNombre(a)}<10^{0}$, donc $a=-1$.`
          this.reponse = ['-1']
        } else {
          this.correction = `Comme $0,1<${texNombre(a)}<1$, alors :<br>
           $10^{-1}<${texNombre(a)}<10^{0}$, donc $b=0$.`
          this.reponse = ['0']
        }
        break
    }
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
