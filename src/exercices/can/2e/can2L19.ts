import { texteCentre } from '../../../lib/format/miseEnPage'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceSimple from '../../ExerciceSimple'
export const titre = 'Exprimer une variable en fonction des autres (formules)'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '06/07/2025' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
// export const dateDeModifImportante = '24/10/2021' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export const uuid = 'c42f7'

export const refs = {
  'fr-fr': ['can2L19'],
  'fr-ch': [],
}
export default class ExprimerEnFonction extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.versionQcmDisponible = true
    this.formatChampTexte = KeyboardType.alphanumeric
    this.optionsChampTexte = { texteAvant: '<br> ', texteApres: ' ' }
  }

  nouvelleVersion() {
    const choixQ = choice([true, false])

    switch (choice([1, 2])) {
      case 1:
        this.question = `Lorsqu’un point mobile suit une trajectoire circulaire de rayon $R$, 
  en mètre (m), son accélération centripète $a$ (en m/s$^2$) 
  et sa vitesse $v$ (en m/s) sont liées par la relation : <br>
  ${choixQ ? `${texteCentre('$a=\\dfrac{v^2}{R}$')}` : `${texteCentre('$v=\\sqrt{aR}$')}`}`

        this.question += choixQ
          ? `L'expression permettant, à partir de cette formule, d'exprimer la vitesse $v$ est : ${this.interactif ? '' : ' $\\ldots$'}`
          : `L'expression permettant, à partir de cette formule, d'exprimer l'accélération $a$ est : ${this.interactif ? '' : ' $\\ldots$'}`
        this.reponse = choixQ ? '$v=\\sqrt{aR}$' : '$a=\\dfrac{v^2}{R}$'
        this.distracteurs = choixQ
          ? ['$v=aR^2$', '$v=\\sqrt{\\dfrac{a}{R}}$', '$v=\\dfrac{a^2}{R}$']
          : ['$a=v^2R$', '$a=\\dfrac{v}{\\sqrt{R}}$', '$a=\\dfrac{R}{v^2}$']

        this.correction = choixQ
          ? `Puisque $a=\\dfrac{v^2}{R}$, alors $v^2 = a \\times R$. <br>Comme $a \\times R\\geqslant 0$, $${miseEnEvidence('v = \\sqrt{aR}')}$.`
          : `On part de la formule $v = \\sqrt{aR}$.<br>
On élève les deux membres au carré : $v^2 = aR$<br>
Puis on isole $a$ : $${miseEnEvidence('a = \\dfrac{v^2}{R}')}$.`
        break
      case 2:
      default:
        this.question =
          'On considère $x$, $y$ et $v$ des nombres réels positifs non nuls liés par la relation : <br>'
        this.question += choixQ
          ? `${texteCentre('$v=\\sqrt{\\dfrac{x}{y}}$')}`
          : `${texteCentre('$y=(1+vx)^2$')}`
        this.question += choixQ
          ? `L'expression permettant, à partir de cette formule, d'exprimer  $y$ est : ${this.interactif ? '' : ' $\\ldots$'}`
          : `L'expression permettant, à partir de cette formule, d'exprimer $v$ est : ${this.interactif ? '' : ' $\\ldots$'}`
        this.reponse = choixQ
          ? '$y=\\dfrac{x}{v^2}$'
          : '$v=\\dfrac{\\sqrt{y}-1}{x}$'
        this.distracteurs = choixQ
          ? ['$y=\\sqrt{xv}$', '$y=x \\times v^2$', '$y=\\dfrac{v^2}{x}$']
          : [
              '$v=\\dfrac{y-1}{x}$',
              '$v=\\sqrt{y} \\times x - 1$',
              '$v=\\dfrac{1}{x \\times \\sqrt{y}}$',
            ]
        if (choixQ) {
          this.correction = `On part de la relation : $v = \\sqrt{\\dfrac{x}{y}}$<br>
On élève les deux membres au carré : $v^2 = \\dfrac{x}{y}$<br>
Puis on isole $y$ : $${miseEnEvidence('y = \\dfrac{x}{v^2}')}$.`
        } else {
          this.correction = `On part de la formule : $y = (1 + vx)^2$<br>
Comme les deux membres sont positifs, on peut prendre la racine carrée  : $\\sqrt{y} = 1 + vx$<br>
On isole $v$ : $vx = \\sqrt{y} - 1$<br>
Donc : $${miseEnEvidence('v = \\dfrac{\\sqrt{y} - 1}{x}')}$.`
        }

        break
    }
    this.canEnonce = this.question
    this.canReponseACompleter = ''
  }
}
