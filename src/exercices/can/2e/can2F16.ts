import { repere } from '../../../lib/2d/reperes'
import { texteParPosition } from '../../../lib/2d/textes'
import {
  Spline,
  spline,
  type NoeudSpline,
} from '../../../lib/mathFonctions/Spline'
import { choice } from '../../../lib/outils/arrayOutils'
import { mathalea2d } from '../../../modules/2dGeneralites'
import { randint } from '../../../modules/outils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceSimple from '../../ExerciceSimple'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'

export const dateDePublication = '27/10/2023'
export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = 'Résoudre une équation graphiquement'

/**
 * @author Gilles Mora
 */
export const uuid = '9d293'

export const refs = {
  'fr-fr': ['can2F16'],
  'fr-ch': [],
}
export default class EquationsGSpline extends ExerciceSimple {
  compteur = 0
  spline?: Spline
  constructor() {
    super()

    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierEnsemble
    this.optionsDeComparaison = { ensembleDeNombres: true }
  }

  nouvelleVersion() {
    const noeuds1 = [
      { x: -4, y: -1, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: -3, y: 0, deriveeGauche: 1, deriveeDroit: 1, isVisible: true },
      { x: -2, y: 1, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: -1, y: 0, deriveeGauche: -1, deriveeDroit: -1, isVisible: true },
      { x: 0, y: -1, deriveeGauche: -1, deriveeDroit: -1, isVisible: true },
      { x: 2, y: -2, deriveeGauche: -1, deriveeDroit: -1, isVisible: true },
      { x: 3, y: -3, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: 4, y: -2, deriveeGauche: 1, deriveeDroit: 1, isVisible: true },
      { x: 5, y: -1, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
    ]
    const noeuds2 = [
      { x: -4, y: 0, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: -3, y: 1, deriveeGauche: 1, deriveeDroit: 1, isVisible: true },
      { x: -2, y: 2, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: -1, y: 1, deriveeGauche: -1, deriveeDroit: -1, isVisible: true },
      { x: 0, y: 0, deriveeGauche: -1, deriveeDroit: -1, isVisible: true },
      { x: 2, y: -1, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: 3, y: 0, deriveeGauche: 2, deriveeDroit: 2, isVisible: true },
      { x: 4, y: 1, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: 5, y: 0, deriveeGauche: -1, deriveeDroit: -1, isVisible: true },
      { x: 6, y: -1, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
    ]
    const noeuds3 = [
      { x: -4, y: -3, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: -3, y: -2, deriveeGauche: 1, deriveeDroit: 1, isVisible: true },
      { x: -2, y: 0, deriveeGauche: 2, deriveeDroit: 2, isVisible: true },
      { x: -1, y: 2, deriveeGauche: 1, deriveeDroit: 1, isVisible: true },
      { x: 0, y: 3, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: 2, y: 2, deriveeGauche: -1, deriveeDroit: -1, isVisible: true },
      { x: 4, y: 0, deriveeGauche: 0, deriveeDroit: 0, isVisible: true },
      { x: 5, y: 2, deriveeGauche: 2, deriveeDroit: 2, isVisible: true },
    ]
    const mesFonctions = [noeuds3, noeuds1, noeuds2] //
    function aleatoiriseCourbe(listeFonctions: NoeudSpline[][]) {
      const coeffX = choice([-1, 1]) // symétries ou pas
      const coeffY = choice([-1, 1])
      const deltaX = randint(-2, +2) // translations
      const deltaY = randint(-1, 1) // randint(-2, +2)
      const choix = choice(listeFonctions)
      return choix.map((noeud: NoeudSpline) =>
        Object({
          x: (noeud.x + deltaX) * coeffX,
          y: (noeud.y + deltaY) * coeffY,
          deriveeGauche: noeud.deriveeGauche * coeffX * coeffY,
          deriveeDroit: noeud.deriveeDroit * coeffX * coeffY,
          isVisible: noeud.isVisible,
        }),
      )
    }
    const o = texteParPosition('O', -0.3, -0.3, 0, 'black', 1)
    const nuage = aleatoiriseCourbe(mesFonctions)
    const theSpline = spline(nuage)
    this.spline = theSpline
    const bornes = theSpline.trouveMaxes()
    const repere1 = repere({
      xMin: bornes.xMin - 1,
      xMax: bornes.xMax + 1,
      yMin: bornes.yMin - 1,
      yMax: bornes.yMax + 1,
      grilleX: false,
      grilleY: false,
      grilleSecondaire: true,
      grilleSecondaireYDistance: 1,
      grilleSecondaireXDistance: 1,
      grilleSecondaireYMin: bornes.yMin - 1,
      grilleSecondaireYMax: bornes.yMax + 1,
      grilleSecondaireXMin: bornes.xMin - 1,
      grilleSecondaireXMax: bornes.xMax + 1,
    })
    const courbe1 = theSpline.courbe({
      repere: repere1,
      epaisseur: 1.5,
      ajouteNoeuds: true,
      optionsNoeuds: { color: 'blue', taille: 2, style: 'x', epaisseur: 2 },
      color: 'blue',
    })
    const objetsEnonce = [repere1, courbe1]
    const nbAntecedentsEntiersMaximum = theSpline.nombreAntecedentsMaximum(
      bornes.yMin,
      bornes.yMax,
      true,
      true,
    )

    const nombreAntecedentCherches1 = choice([
      randint(1, nbAntecedentsEntiersMaximum),
      randint(0, nbAntecedentsEntiersMaximum),
      randint(1, nbAntecedentsEntiersMaximum),
    ])
    const y1 = theSpline.trouveYPourNAntecedents(
      nombreAntecedentCherches1,
      bornes.yMin - 1,
      bornes.yMax + 1,
      true,
      true,
    )
    if (y1 === false) {
      this.compteur++
      if (this.compteur > 10) {
        window.notify(
          "Erreur dans la génération de l'exercice : y1 === false",
          {
            spline: theSpline,
            nombreAntecedentCherches1,
            nbAntecedentsEntiersMaximum,
            bornes,
          },
        )
        return
      }
      this.nouvelleVersion()
      return
    }
    this.compteur = 0
    const solutions1 = theSpline.solve(y1) ?? []
    const reponse1 =
      solutions1.length === 0 ? '\\emptyset' : `${solutions1.join(';')}`
    this.reponse = reponse1
    this.question =
      `On donne la représentation graphique d'une fonction $f$. <br>
    Résoudre l'équation  $f(x)=${y1}$.<br>` +
      mathalea2d(
        Object.assign(
          { pixelsParCm: 30, scale: 0.65, style: 'margin: auto' },
          {
            xmin: bornes.xMin - 1,
            ymin: bornes.yMin - 1,
            xmax: bornes.xMax + 1,
            ymax: bornes.yMax + 1,
          },
        ),
        objetsEnonce,
        o,
      ) // fixeBordures(objetsEnonce))
    if (this.interactif) {
      this.question +=
        "<br>Écrire l'ensemble de solution(s) (séparées par des points-virgules). Saisir $\\emptyset$ s'il n'y en a pas.<br>"
      this.question += 'Ensemble de solution(s) : '
    }

    this.correction = `Résoudre l'équation $f(x)=${y1}$ graphiquement revient à lire les abscisses des points d'intersection entre $\\mathscr{C}_f$ et ${y1 === 0 ? "l'axe des abscisses." : `la droite  d'équation $y = ${y1}$ (parallèle à l'axe des abscisses).`}<br>
    On en déduit : ${solutions1.length === 0 ? `$S=${miseEnEvidence('\\emptyset')}$.` : `$S=\\{${miseEnEvidence(solutions1.join('\\,;\\,'))}\\}$.`}<br>`
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
