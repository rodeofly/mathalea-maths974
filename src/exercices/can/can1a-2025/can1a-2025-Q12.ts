import ExerciceSimple from '../../ExerciceSimple'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { randint } from '../../../modules/outils'
import { context } from '../../../modules/context'
import { sp } from '../../../lib/outils/outilString'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
} from '../../../lib/outils/ecritures'
export const titre = 'Utiliser un script Python'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '9e9fb'
export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export default class Can2025N5Q12 extends ExerciceSimple {
  constructor() {
    super()

    this.canOfficielle = true
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
  }

  nouvelleVersion() {
    const a = this.canOfficielle ? 3 : randint(-5, 5, [-1, 0, 1])
    const coeff = this.canOfficielle ? 2 : randint(-3, 3, [-1, 0, 1])
    this.question = 'Soit le script Python : <br><br>'
    if (context.isHtml) {
      this.question += '$\\begin{array}{|l|}\n'
      this.question += '\\hline\n'
      this.question += '\\\n \\texttt{def resultat(a) :}  \\\n '
      this.question += `\\\\\n${sp(9)} \\texttt{return (a**2${ecritureAlgebrique(coeff)}*a)} \\\\\n`
      this.question += '\\hline\n'
      this.question += '\\end{array}\n$'
      this.question += `<br><br>Que renvoie  $\\texttt{resultat(${a})}$ ?`
    } else {
      this.question += '\\medskip'
      this.question += '\\hspace*{10mm}\\fbox{'
      this.question += '\\parbox{0.5\\linewidth}{'
      this.question += '\\setlength{\\parskip}{.5cm}'
      this.question += ' \\texttt{def resultat(a) :}\\newline'
      this.question += ` \\hspace*{7mm}\\texttt{return (a**2${ecritureAlgebrique(coeff)}*a)}`
      this.question += '}'
      this.question += '}\\newline'
      this.question += '\\medskip'
      this.question += `<br>Que renvoie  $\\texttt{resultat(${a})}$ ?`
    }
    this.reponse = a ** 2 + coeff * a
    this.correction = ` L'algorithme retourne $${ecritureParentheseSiNegatif(a)}^2${ecritureAlgebrique(coeff)}\\times${ecritureParentheseSiNegatif(a)}=${miseEnEvidence(this.reponse)}$.`
    this.canEnonce = '\\hspace*{10mm}\\fbox{'
    this.canEnonce += '\\parbox{0.6\\linewidth}{'
    this.canEnonce += '\\setlength{\\parskip}{.5cm}'
    this.canEnonce += ' \\texttt{def resultat(a) :}\\newline'
    this.canEnonce += ` \\hspace*{7mm}\\texttt{return (a**2${ecritureAlgebrique(coeff)}*a)}`
    this.canEnonce += '}'
    this.canEnonce += '}'
    this.canReponseACompleter = `$\\texttt{resultat(${a})}$ renvoie <br> $\\ldots$`

    if (this.interactif) {
      this.question += '<br>'
    }
  }
}
