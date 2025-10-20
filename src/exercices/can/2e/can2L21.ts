
import { choice } from '../../../lib/outils/arrayOutils'
import {
	ecritureAlgebrique,
	ecritureParentheseSiNegatif,
} from '../../../lib/outils/ecritures'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { miseEnCouleur, miseEnEvidence } from '../../../lib/outils/embellissements'
export const titre = 'Résoudre une inéquation du type $\\dfrac{x+a}{b}\\le c$'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '05/10/2025'

/**
 * @author Jean-Léon HENRY
*/
export const uuid = '94237'

export const refs = {
	'fr-fr': ['can2L21'],
	'fr-ch': [],
}
export default class ResoudreInequationAvecQuotient extends ExerciceSimple {
	constructor() {
		super()

		this.typeExercice = 'simple'
		this.nbQuestions = 1
		this.formatChampTexte = KeyboardType.clavierEnsemble
		this.optionsDeComparaison = { intervalle: true }
	}

	nouvelleVersion() {
		const a = randint(-10, 10, 0)
		const b = randint(-10, 10, [-1, 0, 1])
		const c = randint(-10, 10, 0)
		const symbols = ['\\leqslant', '<', '\\geqslant', '>']
		const [INF, STRINF, SUP, STRSUP] = symbols
		const index = randint(0, 3)
		const symbol = symbols[index]
		const symbolInverse = [SUP, STRSUP, INF, STRINF][index]
		const symbolFinal = b < 0 ? symbolInverse : symbol
		const estStrict = [STRINF, STRSUP].includes(symbol)
		// Construction de la reponse
		let reponse
		if ([INF, STRINF].includes(symbolFinal)) {
			reponse = `]-\\infty\\,;\\,${c * b - a}${estStrict ? '[' : ']'}`
		} else {
			reponse = `${estStrict ? ']' : '['}${c * b - a}\\,;\\,+\\infty[`
		}

		const inequationLaTeX = (align = false) => `\\dfrac{x${ecritureAlgebrique(a)}}{${b}}${align ? '&' : ''}${symbol}${c}`
		switch (choice([1])) {
			case 1:
				if (!this.interactif) {
					this.question = ` Résoudre l'inéquation $${inequationLaTeX()}$.`
				} else {
					this.question = ` Donner la solution de l'inéquation $${inequationLaTeX()}$.<p>On attend une réponse sous forme d'intervalle.</p>`
				}
				this.correction = `\\[
\\begin{aligned}
${inequationLaTeX(true)}\\\\
x${ecritureAlgebrique(a)}&${b < 0 ? `\\,${miseEnCouleur(symbolFinal)}\\,` : symbolFinal}${c}\\times ${ecritureParentheseSiNegatif(b)}\\\\
x${ecritureAlgebrique(a)}&${symbolFinal}${c * b}\\\\
x&${symbolFinal}${c * b}${ecritureAlgebrique(-a)}\\\\
x&${symbolFinal}${c * b - a}\\\\
\\end{aligned}
\\]`

				this.correction += `L'ensemble des solutions est donc $${miseEnEvidence(reponse)}$.`

				this.reponse = reponse
				break
		}
		this.canEnonce = this.question // 'Compléter'
		this.canReponseACompleter = ''
	}
}
