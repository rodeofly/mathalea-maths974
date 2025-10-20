import { choice } from '../../../lib/outils/arrayOutils'
import { ecritureAlgebrique } from '../../../lib/outils/ecritures'
import { sp } from '../../../lib/outils/outilString'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
export const titre = 'Donner le résultat d’un programme Python'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '21/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '14/02/2022' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export const uuid = '0f014'

export const refs = {
  'fr-fr': ['can1S11'],
  'fr-ch': ['autres-7'],
}
export default class CalculSuitePython extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, b, k, u, r, q
    let n = 0
    switch (
    choice(['a', 'b', 'c']) //
    ) {
      case 'a': // u=u+r
        a = randint(2, 5)
        u = randint(1, 8) * choice([-1, 1])
        r = randint(1, 9) * choice([-1, 1])
        k = a
        this.question = `Que renvoie l'instruction $\\texttt{suite(${a})}$ ?<br>
        
        $\\begin{array}{|l|}\n`
        this.question += '\\hline\n'
        this.question += '\\\n \\texttt{def suite(n) :}  \\\n '
        this.question += `\\\\\n ${sp(6)} \\texttt{u = ${u}}\\\n `
        this.question += `\\\\\n ${sp(6)} \\texttt{for i in range(n) :}\\\n `
        this.question += `\\\\\n ${sp(12)} \\texttt{u = u${ecritureAlgebrique(r)}}\\\n `
        this.question += `\\\\\n ${sp(6)} \\texttt{return u}\\\\\n `
        this.question += '\\hline\n'
        this.question += '\\end{array}\n$'
        this.question += `
        
        `
        this.correction = ` L'instruction $\\texttt{for i in range(n)}$ signifie : pour i allant de $0$ à $${a - 1}$.<br>
      On calcule les valeurs successives de la variable u :
           `

        for (let indice = 0; indice < k; indice++) {
          this.correction += `<br>Pour i=${indice},  u = $${u} ${ecritureAlgebrique(r)} = ${u + r}$`
          u = u + r
        }
        this.reponse = u
        break

      case 'b': // suite u=u+i
        a = randint(3, 4)
        u = randint(1, 8) * choice([-1, 1])
        k = a
        this.question = `Que renvoie l'instruction $\\texttt{suite(${a})}$ ?<br>
        
        $\\begin{array}{|l|}\n`
        this.question += '\\hline\n'
        this.question += '\\\n \\texttt{def suite(n) :}  \\\n '
        this.question += `\\\\\n ${sp(6)} \\texttt{u = ${u}}\\\n `
        this.question += `\\\\\n ${sp(6)} \\texttt{for i in range(1,n) :}\\\n `
        this.question += `\\\\\n ${sp(12)} \\texttt{u = u+i}\\\n `
        this.question += `\\\\\n ${sp(6)} \\texttt{return u}\\\\\n `
        this.question += '\\hline\n'
        this.question += '\\end{array}\n$'
        this.question += `
        
        `
        this.correction = ` L'instruction $\\texttt{for i in range(1,n)}$ signifie : pour i allant de 1 à $${a - 1}$.<br>
        
        On calcule les valeurs successives de la variable u :`

        for (let indice = 1; indice < k; indice++) {
          this.correction += `<br>Pour i=${indice}, u = $${u} +${indice} = ${u + indice}$`
          u = u + indice
        }
        this.reponse = u
        break

      case 'c': // suite u=u+i
        a = randint(1, 5)
        b = randint(6, 80)
        q = randint(2, 3)
        k = a
        this.question = `Que renvoie l'instruction $\\texttt{suite(${a})}$ ?<br>
        
        $\\begin{array}{|l|}\n`
        this.question += '\\hline\n'
        this.question += '\\\n \\texttt{def suite(u) :}  \\\n '
        this.question += `\\\\\n ${sp(6)} \\texttt{u=${a}}\\\n `
        this.question += `\\\\\n ${sp(6)} \\texttt{n=0}\\\n `
        this.question += `\\\\\n ${sp(6)} \\texttt{while u<${b}:}\\\n `
        this.question += `\\\\\n ${sp(12)} \\texttt{u = u*${q}}\\\n `
        this.question += `\\\\\n ${sp(12)} \\texttt{n = n+1}\\\n `
        this.question += `\\\\\n ${sp(6)} \\texttt{return n}\\\\\n `
        this.question += '\\hline\n'
        this.question += '\\end{array}\n$'
        this.question += `
        
        `
        this.correction = ` L'instruction $\\texttt{while u<${b}}$ signifie : tant que u<${b}.<br>

        On calcule les valeurs successives des  variables u et n. On s'arrête dès que u dépasse ${b} :<br>
        On a au départ, u=${a} et n=0, puis, <br>`

        while (a < b) {
          this.correction += `<br>n=${n + 1} et u=${a}$\\times$ ${q} = ${a * q} `
          n = n + 1
          a = q * a
        }
        this.correction += `$> ${b}$. Donc l'algorithme retourne $${n}$.`
        this.reponse = n
        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
