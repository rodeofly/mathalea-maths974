import { createList } from '../../lib/format/lists'
import { ajouteQuestionMathlive } from '../../lib/interactif/questionMathLive'
import { shuffle } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { gestionnaireFormulaireTexte, randint } from '../../modules/outils'
import Exercice from '../Exercice'
// import type { VisualPattern } from '../../lib/2d/patterns/VisualPattern'
import { listePattern3d } from '../../lib/2d/patterns/patternsPreDef'
import { VisualPattern3D } from '../../lib/2d/patterns/VisualPattern3D'
import { range } from '../../lib/outils/nombres'
import { context } from '../../modules/context'

export const titre = 'Comprendre un algorithme itératif'
export const interactifReady = true
export const interactifType = 'mathLive'

// Gestion de la date de publication initiale
export const dateDePublication = '10/06/2025'

/**
 * Étudier les premiers termes d'une série de motifs afin de donner le nombre de formes ${['e','a','é','i','o','u','y','è','ê'].includes(pattern.shapes[0][0]) ? 'd\'':'de'}${pattern.shapes[0]} du motif suivant.
 * Les patterns sont des motifs figuratifs qui évoluent selon des règles définies.
 * Cet exercice contient des patterns issus de l'excellent site : https://www.visualpatterns.org/
 * @author Jean-Claude Lhote
 */
export const uuid = '328b7'

export const refs = {
  'fr-fr': ['6I13-2'],
  'fr-ch': ['autres-15'],
}

export default class PaternNum0 extends Exercice {
  canvas3ds: any[][] = []
  constructor() {
    super()
    this.nbQuestions = 1
    this.comment = `Étudier les premiers termes d'une série de motifs afin de donner le nombre de formes du motif suivant.\n
 Les patterns sont des motifs figuratifs qui évoluent selon des règles définies.\n
 Cet exercice contient des patterns issus de l'excellent site : https://www.visualpatterns.org/`
    this.besoinFormulaireNumerique = ['Nombre de figures par question', 4]
    this.sup = 3
    this.besoinFormulaire4Texte = [
      'Types de questions',
      'Nombres séparés par des tirets :\n1: Motif suivant à dessiner\n2 : Motif suivant (nombre)\n3 : Motif 10 (nombre)\n4 : Numéro du motif\n5 : Motif 100 (nombre)\n6 : Question au hasard parmi les 5 précédentes',
    ]
    this.sup4 = '6'
  }

  nouvelleVersion(): void {
    if (this.nbQuestions > 25) this.nbQuestions = 25
    // on ne conserve que les linéaires et les affines.
    const listePreDef = shuffle(listePattern3d)
    const nbFigures = Math.max(1, this.sup)
    const typesQuestions = Array.from(
      new Set(
        gestionnaireFormulaireTexte({
          saisie: this.sup4,
          min: 1,
          max: 5,
          defaut: 1,
          melange: 6,
          nbQuestions: 5,
          shuffle: false,
        }).map(Number),
      ),
    )
    let indexInteractif = 0
    for (let i = 0; i < this.nbQuestions; ) {
      const canvas3d: any[] = []
      const popped = listePreDef.pop()
      if (!popped) {
        continue
      }

      const delta = popped.fonctionNb(2) - popped.fonctionNb(1)
      const b = popped.fonctionNb(1) - delta
      const explain =
        popped.type === 'linéaire'
          ? `On constate que le nombre de formes augmente de $${delta}$ à chaque étape.<br>
        Et que c'est aussi le nombre de formes à l'étape 1. Par conséquent, pour trouver le nombre de formes d'un motif il faut simplement multiplier par ${delta} le numéro du motif.`
          : `On constate que le nombre de formes augmente de $${delta}$ à chaque étape.<br>
        Cependant, il n'y a pas ${delta} formes sur le motif 1, mais ${popped.fonctionNb(1)}. Par conséquent, il faut multiplier le numéro du motif par ${delta} et ${b < 0 ? `retirer ${-b}` : `ajouter ${b}`}.`
      const pattern = new VisualPattern3D({
        initialCells: [],
        prefixId: '',
        shapes: ['cube-trois-couleurs'],
        type: 'full3D',
      })
      pattern.shapes = [
        ...(popped.shapes ?? ['cube-trois-couleurs-tube-edges']),
      ].slice(0, 11) as unknown as typeof pattern.shapes
      pattern.iterate3d = popped.iterate3d

      let texte = `Voici les ${nbFigures} premiers motifs d'une série de motifs figuratifs. Ils évoluent selon des règles définies.<br><br>`

      for (let j = 0; j < nbFigures + 1; j++) {
        pattern.prefixId = `Serie${i}F${j}`
        const c3d = pattern.render3d(j + 1)
        canvas3d.push(c3d)
      }
      texte += `${range(nbFigures - 1)
        .map(
          (j) =>
            `<div style="display: inline-block; width: 250px; height: 250px; margin-right: 10px;">${canvas3d[j]}<h1>motif ${j + 1}</h1></div>`,
        )
        .join('\n')}`

      let texteCorr = ''
      const listeQuestions: string[] = []
      const listeCorrections: string[] = []
      const deMotif = 'de cubes'
      for (const q of typesQuestions) {
        switch (q) {
          case 1:
            listeQuestions.push(`\nDessiner le motif $${nbFigures + 1}$.<br>`)
            canvas3d[nbFigures + 1] = pattern.render3d(nbFigures + 1)
            listeCorrections.push(`Voici le motif $${nbFigures + 1}$ :<br>
              ${
                context.isHtml
                  ? `<div style="display: inline-block; width: 250px; height: 250px; margin-right: 10px;">${canvas3d[nbFigures + 1]}</div>`
                  : ''
              }`)
            break
          case 2:
            {
              const nbFormes = popped.fonctionNb(nbFigures + 1)
              const nbTex = texNombre(nbFormes, 0)

              listeQuestions.push(
                `\nQuel sera le nombre ${deMotif} dans le motif $${nbFigures + 1}$ ?<br>${ajouteQuestionMathlive(
                  {
                    exercice: this,
                    question: indexInteractif++,
                    objetReponse: { reponse: { value: nbTex } },
                    typeInteractivite: 'mathlive',
                  },
                )}`,
              )
              listeCorrections.push(
                `Le motif $${nbFigures + 1}$ contient $${miseEnEvidence(texNombre(nbFormes, 0))}$ formes ${deMotif}.<br>`,
              )
            }
            break
          case 3:
            {
              const nbFormes = popped.fonctionNb(10)
              const nbTex = texNombre(nbFormes, 0)
              listeQuestions.push(`\nQuel sera le nombre ${deMotif} pour le motif $10$ ?<br>${ajouteQuestionMathlive(
                {
                  exercice: this,
                  question: indexInteractif++,
                  objetReponse: { reponse: { value: nbTex } },
                  typeInteractivite: 'mathlive',
                },
              )}
            `)
              listeCorrections.push(`Le motif $10$ contient $${miseEnEvidence(nbTex)}$ formes ${deMotif}.<br>
            En effet, la formule pour trouver le nombre ${deMotif} est : $${miseEnEvidence(popped.formule.replaceAll('n', '10'))}$.<br>
            ${explain}`)
            }
            break
          case 4:
            {
              const etape = randint(20, 80)
              const nbFormes = popped.fonctionNb(etape)
              const nbTex = texNombre(nbFormes, 0)
              listeQuestions.push(`\nUn motif de cette série contient $${nbTex}$ ${deMotif.replace('de ', '')}. À quel numéro de motif cela correspond-il ?<br>${ajouteQuestionMathlive(
                {
                  exercice: this,
                  question: indexInteractif++,
                  objetReponse: { reponse: { value: etape.toString() } },
                  typeInteractivite: 'mathlive',
                },
              )}
            `)

              const explain2 =
                popped.type === 'linéaire'
                  ? `On constate que le nombre de formes  augmente de $${delta}$ à chaque étape.<br>
        Et que c'est aussi le nombre de formes à l'étape 1. Par conséquent, pour trouver le numéro d'un motif dont on connait le nombre de formes, il faut simplement diviser ce nombre par ${delta} pour trouver le numéro.`
                  : `On constate que le nombre de formes augmente de $${delta}$ à chaque étape.<br>
        Cependant, il n'y a pas ${delta} formes sur le motif 1, mais ${popped.fonctionNb(1)}. Par conséquent, il faut ${b < 0 ? `ajouter ${-b}` : `retirer ${b}`} au nombre de formes puis diviser le résultat par ${delta} : <br>
        $\\dfrac{${nbTex} ${b < 0 ? '+' : '-'} ${Math.abs(b)}}{${delta}}=${miseEnEvidence(etape)}$.`
              listeCorrections.push(`C'est le motif numéro $${miseEnEvidence(etape.toString())}$ qui contient $${miseEnEvidence(texNombre(nbFormes, 0))}$ ${pattern.shapes[0]}s.<br>
            ${explain2}`)
            }
            break
          case 5:
            {
              const nbFormes = popped.fonctionNb(100)
              const nbTex = texNombre(nbFormes, 0)
              listeQuestions.push(`\nQuel sera le nombre ${deMotif} pour le motif $100$ ?<br>${ajouteQuestionMathlive(
                {
                  exercice: this,
                  question: indexInteractif++,
                  objetReponse: { reponse: { value: nbTex } },
                  typeInteractivite: 'mathlive',
                },
              )}
            `)
              listeCorrections.push(`Le motif $100$ contient $${miseEnEvidence(nbTex)}$ formes ${deMotif}.<br>
            En effet, la formule pour trouver le nombre ${deMotif} est : $${miseEnEvidence(popped.formule.replaceAll('n', '100'))}$.<br>
            ${explain}`)
            }
            break
        }
      }
      texte +=
        listeQuestions.length === 1
          ? listeQuestions[0]
          : createList({
              items: listeQuestions,
              style: 'alpha',
            })
      texteCorr +=
        listeCorrections.length === 1
          ? listeCorrections[0]
          : createList({
              items: listeCorrections,
              style: 'alpha',
            })
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      i++
    }
  }
}
