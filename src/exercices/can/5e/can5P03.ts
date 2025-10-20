import { texPrix } from '../../../lib/format/style'
import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import { context } from '../../../modules/context'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Résoudre un problème de proportionnalité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '28/10/2021'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication
*/
export const uuid = '57777'

export const refs = {
  'fr-fr': ['can5P03'],
  'fr-ch': ['11FA11-5'],
}
export default class PoucentageP2 extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, b, c, d, n, u
    const fruits = [
      ['pêches', 3.5, 10, 30],
      ['noix', 4.5, 4, 13],
      ['cerises', 5.5, 11, 20],
      ['pommes', 2.5, 20, 40],
      ['framboises', 6.5, 1, 5],
      ['fraises', 4.5, 5, 10],
      ['citrons', 1.5, 15, 30],
      ['bananes', 2.5, 15, 25],
    ]
    const plat = [
      ['nems'],
      ['samossas'],
      ['parts de quiches'],
      ['parts de pizzas'],
      ['beignets'],
    ]
    switch (
      choice([1, 2, 3, 4, 5]) //
    ) {
      case 1: // proportionnalité avec fruits
        a = randint(0, 7) // index du fruit
        b = Number(fruits[a][1]) + choice([-1, 1]) // prix au kg
        c = randint(2, 8) // nombre de kg première valeur
        d = randint(3, 6, c) // nombre de kg supplémentaires
        this.reponse = d * b
        this.question = `$${c}$ kg de ${fruits[a][0]} coûtent $${texPrix(c * b)}$ €.<br>        
        $${c + d}$ kg de ces mêmes ${fruits[a][0]} coûtent $${texPrix((c + d) * b)}$ €.<br>        
        Combien coûtent ${d} kg de ces ${fruits[a][0]} ?`
        this.correction = `$${texPrix((c + d) * b)} € - ${texPrix(c * b)} € =${texPrix(this.reponse)} €$`
        if (this.interactif) {
          this.optionsChampTexte = { texteApres: '€' }
        }
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = '$\\ldots$ €'
        break

      case 2: // proportionnalité débit
        a = choice([50, 100])
        b = choice([10, 20, 30])
        c = choice([150, 250, 300, 350])
        this.reponse = (c / a) * b
        this.question = `Le débit d’un robinet est de $${a}$ L en $${b}$ min.<br>        
        Combien de temps (en minutes) faut-il pour remplir un réservoir de $${c}$ L ?`
        this.correction = `$\\dfrac{${c}}{${a}}\\times ${b}=${this.reponse}$. Il faut donc $${this.reponse}$ minutes pour remplir le réservoir.`
        if (this.interactif) {
          this.optionsChampTexte = { texteApres: 'min' }
        }
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = '$\\ldots$ min'
        break

      case 3: // proportionnalité plats
        c = randint(0, 4) // index du plat
        b = randint(12, 15)
        u = randint(2, 5)
        n = randint(3, 6)
        a = randint(2, 6)
        this.reponse = n * u * a
        this.question = `$${a}$ ${plat[c]} coûtent $${u * a}$ €, combien coûtent $${n * a}$ ${plat[c]} ?`
        this.correction = `$${n * a}$ ${plat[c]} coûtent $${u}\\times ${n * a}$ €, soit $${this.reponse}$ €.`
        if (this.interactif) {
          this.optionsChampTexte = { texteApres: '€' }
        }
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = '$\\ldots$ €'
        break

      case 4: // proportionnalité 4ième proportionnelle
        if (choice([true, false])) {
          a = randint(1, 4) //
          n = randint(3, 7)
          c = a * n
          b = randint(2, 5, a) * n
          c = a * n
          this.reponse = b / n
          this.question =
            'Déterminer la valeur qui manque dans ce tableau de proportionnalité : <br>'
          this.question += context.isHtml
            ? ''
            : '\\renewcommand{\\arraystretch}{1}'
          this.question += `$\\begin{array}{|l|c|}
      \\hline
       ? & ${a}  ${context.isHtml ? '\\\\' : '\\tabularnewline'}
          \\hline
        ${b} & ${c} ${context.isHtml ? '\\\\' : '\\tabularnewline'}
         \\hline
        \\end{array}$`
          this.correction = `On passe de la première ligne à la deuxième en multipliant par $${n}$, ainsi, ?$=\\dfrac{${b}}{${n}}=${b / n}$`
        } else {
          a = randint(1, 9)
          b = randint(1, 9, a)
          n = randint(2, 9, 5) / 10
          d = b * n
          c = a * n

          this.reponse = a + b
          this.question =
            'Déterminer la valeur qui manque dans ce tableau de proportionnalité : <br>'
          this.question += context.isHtml
            ? ''
            : '\\renewcommand{\\arraystretch}{1}'
          this.question += `$\\begin{array}{|l|c|c|}
          \\hline
          ${texNombre(a)} & ${texNombre(b)} & ? ${context.isHtml ? '\\\\' : '\\tabularnewline'}
          \\hline
        ${texNombre(c)} &${texNombre(d)} & ${texNombre(c + d)} ${context.isHtml ? '\\\\' : '\\tabularnewline'}
         \\hline
         \\end{array}$`
          this.correction = `La valeur cherchée est donnée par la somme $${a}+${b}=${a + b}$.`
        }
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = ''
        break

      case 5: // proportionnalité 6iemJC
        a = choice([2, 3, 4, 5]) // choix du coefficient
        b = randint(3, 10) // donnée 1
        c = randint(2, 10, b) // donnée 2
        d = choice([
          ['un train électrique', 'il'],
          ['une voiture électrique', 'elle'],
          ['un manège', 'il'],
        ])
        this.question = `En ${a * b} minutes, ${d[0]} fait ${a * c} tours.<br>        
        En ${b} minutes ${d[1]} fait ${this.interactif ? '' : '$\\ldots \\ldots$ tours.'}`
        this.correction = `En ${a} fois moins de temps, ${d[1]} fait ${a} fois moins de tours, soit : $${a * c} \\div ${a}=${c}$ tours.`
        this.optionsChampTexte = { texteApres: ' tours.' }
        this.reponse = c
        this.canEnonce = 'Compléter.'
        this.canReponseACompleter = this.question
        break
    }
  }
}
