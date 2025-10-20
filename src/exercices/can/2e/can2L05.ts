import { choice, shuffle } from '../../../lib/outils/arrayOutils'
import { miseEnCouleur, texteEnCouleur } from '../../../lib/outils/embellissements'
import {
	reduireAxPlusB,
} from '../../../lib/outils/ecritures'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'

import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Résoudre une inéquation'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDeModifImportante = '21/05/2023'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 * Date de publication 24/10/2021 modifié le 21/05/23 interactif n'est plus un qcm
*/
export const uuid = '96a78'

export const refs = {
	'fr-fr': ['can2L05'],
	'fr-ch': [],
}
export default class SolutionInequation extends ExerciceSimple {
	constructor() {
		super()

		this.typeExercice = 'simple'
		this.nbQuestions = 1

		this.spacing = 3
		this.formatChampTexte = KeyboardType.clavierEnsemble
		this.optionsDeComparaison = { texteSansCasse: true, intervalle: true }
		this.versionQcmDisponible = true
	}

	nouvelleVersion() {
		let a: number, b: number, racine: number, n: number

		switch (
		choice([1])
		) {
			case 1: {
				a = randint(-6, 6, [-1, 0, 1])
				n = randint(2, 7) * choice([-1, 1])
				b = n * a
				racine = -n
				const symbols = ['\\leqslant', '<', '\\geqslant', '>']
				const [INF, STRINF, SUP, STRSUP] = symbols
				const index = randint(0, 3)
				const symbol = symbols[index]
				const symbolInverse = [SUP, STRSUP, INF, STRINF][index]
				const symbolFinal = a < 0 ? symbolInverse : symbol
				const estStrict = [STRINF, STRSUP].includes(symbol)
				// Construction de la reponse
				const makeIntervalle = (borne_gauche: string, gauche: string, droite: string, borne_droite: string) => borne_gauche + gauche + "~;~" + droite + borne_droite
				function makeReponse(bigg = false) {
					const biggCmd = bigg ? '\\bigg' : ''
					if ([INF, STRINF].includes(symbolFinal)) {
						const left = biggCmd + ']'
						const right = biggCmd + (estStrict ? '[' : ']')
						return makeIntervalle(left, "-\\infty", racine.toString(), right)
					} else {
						const left = biggCmd + (estStrict ? ']' : '[')
						const right = biggCmd + '['
						return makeIntervalle(left, racine.toString(), "+\\infty", right)
					}
				}

				const inequationLaTeX = (align = false) => `${reduireAxPlusB(a, b)}${align ? '&' : ''}${symbol}0`
				this.question = `Quel est l'ensemble des solutions de l'inéquation $${inequationLaTeX()}$ ?`
				if (this.interactif && this.versionQcm === false) {
					this.question += '<br>$S=$'
				}
				this.correction = `\\[
\\begin{aligned}
${inequationLaTeX(true)}\\\\
${a}x&${symbol}${-b}\\\\
x&${a < 0 ? miseEnCouleur(symbolFinal) : symbolFinal}\\dfrac{${-b}}{${a}}\\\\
x&${symbolFinal}${racine}
\\end{aligned}
\\]`

				this.correction += `L'ensemble de solutions est : ${texteEnCouleur(` $${makeReponse(true)}$`)}.<br>`
				this.reponse = makeReponse()
				let tableau = [
					`$[${racine}~;~+\\infty[$`,
					`$[${-racine}~;~+\\infty[$`,
					`$]-\\infty~;~${racine}[$`,
					`$]-\\infty~;~${-racine}[$`,
				]
				tableau = shuffle(tableau)
				this.distracteurs = [tableau[0], tableau[1], tableau[2], tableau[3]]
				break
			}
		}
		if (this.versionQcm) {
			this.reponse = `$${this.reponse}$`
		}
		this.canEnonce = this.question // 'Compléter'
		this.canReponseACompleter = ''
	}
}
