import { choice } from '../../../lib/outils/arrayOutils'
import { ecritureParentheseSiNegatif } from '../../../lib/outils/ecritures'
import { abs } from '../../../lib/outils/nombres'
import { sp } from '../../../lib/outils/outilString'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
export const titre = 'Calculer avec  des puissances*'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gille Mora
 * Créé pendant l'été 2021

 * Date de publication
*/
export const uuid = 'b1517'

export const refs = {
  'fr-fr': ['can2C03'],
  'fr-ch': [],
}
export default class CalculPuissance1 extends ExerciceSimple {
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    let a, b, c, d
    switch (
      choice(['a', 'b', 'c', 'd', 'e', 'f']) //
    ) {
      case 'a':
        a = choice([0.25, 0.5])
        b = randint(2, 5)
        this.question = `Calculer sous la forme d'un nombre entier $4^{${b}} \\times ${texNombre(a)}^{${b}}$.`
        this.correction = `On utilise la formule $a^n\\times b^n=(a\\times b)^{n}$
         avec $a=4$,  $b=${texNombre(a)}$ et $n=${b}$.<br>
        $4^{${b}}\\times ${texNombre(a)}^{${b}}=(4\\times ${texNombre(a)})^{${b}}=
        ${4 * a}^${texNombre(b)}=${miseEnEvidence(texNombre(4 ** b * a ** b))} $`
        this.reponse = 4 ** b * a ** b
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = ''
        break
      case 'b':
        a = choice([0.2, 0.4])
        b = randint(2, 5)
        this.question = `Calculer sous la forme d'un nombre entier  $5^{${b}} \\times ${texNombre(a)}^{${b}}$.`
        this.correction = `On utilise la formule $a^n\\times b^n=(a\\times b)^{n}$
        avec $a=5$,  $b=${texNombre(a)}$ et $n=${b}$.<br>
       $5^{${b}}\\times ${texNombre(a)}^{${b}}=(5\\times ${texNombre(a)})^{${b}}=
       ${5 * a}^${texNombre(b)}=${miseEnEvidence(texNombre(5 ** b * a ** b))} $`
        this.reponse = 5 ** b * a ** b
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = ''
        break

      case 'c':
        a = randint(-3, -1)
        this.question = `Calculer sous la forme d'un nombre entier $2^{${a}} \\times 8$.`
        this.correction = `Comme $a^{-n}=\\dfrac{1}{a^n}$, ${sp(4)}  $2^{${a}}=\\dfrac{1}{2^{${-a}}}=\\dfrac{1}{${2 ** -a}}$. <br>

        
        $2^{${a}}\\times 8=\\dfrac{1}{${2 ** abs(a)}}\\times 8=${miseEnEvidence(texNombre((8 * 1) / 2 ** -a))} $`
        this.reponse = 2 ** a * 8
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = ''
        break
      case 'd':
        a = randint(-4, -1)
        this.question = `Calculer sous la forme d'un nombre entier $2^{${a}} \\times 16$.`
        this.correction = `Comme $a^{-n}=\\dfrac{1}{a^n}$, ${sp(4)}  $2^{${a}}=\\dfrac{1}{2^{${-a}}}=\\dfrac{1}{${2 ** -a}}$. <br>

        
        $2^{${a}}\\times 16=\\dfrac{1}{${2 ** abs(a)}}\\times 16=${miseEnEvidence(texNombre((16 * 1) / 2 ** -a))} $`
        this.reponse = 2 ** a * 16
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = ''
        break
      case 'e':
        a = randint(-5, -1)
        this.question = `Calculer sous la forme d'un nombre entier $2^{${a}} \\times 32$.`
        this.correction = `Comme $a^{-n}=\\dfrac{1}{a^n}$, ${sp(4)}  $2^{${a}}=\\dfrac{1}{2^{${-a}}}=\\dfrac{1}{${2 ** -a}}$. <br>

        
        $2^{${a}}\\times 32=\\dfrac{1}{${2 ** abs(a)}}\\times 32=${miseEnEvidence(texNombre((32 * 1) / 2 ** -a))} $`
        this.reponse = 2 ** a * 32
        this.canEnonce = this.question // 'Compléter'
        this.canReponseACompleter = ''
        break
      case 'f':
        a = randint(2, 10)
        c = randint(-5, 10, [0, 1])
        d = randint(2, 10)
        this.question = `Compléter :<br> $${a}^{...}\\times ${a}^{${c}}=${a}^{${-d}}$`
        this.correction = `On utilise la formule $a^n\\times a^m=a^{n+m}$.
        La somme des exposants doit donner $${-d}$.<br>
        On cherche donc le nombre qui, ajouté à $${c}$ donne $${-d}$.<br> Il s'agit de  :
$-${d}-${ecritureParentheseSiNegatif(c)}=${miseEnEvidence(-d - c)}$.`
        this.reponse = -d - c
        this.canEnonce = 'Compléter.'
        this.canReponseACompleter = `$${a}^{\\ldots}\\times ${a}^{${c}}=${a}^{${-d}}$`
        break
    }
  }
}
