import Exercice from '../Exercice'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { remplisLesBlancs } from '../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'
import { scratchblock } from '../../modules/scratchblock'

export const interactifReady = true
export const interactifType = 'mathLive'
export const titre =
  "Trouver la position d'un lutin grâce à des instructions conditionnelles (scratch)"
export const dateDePublication = '24/11/2020'
export const dateDeModifImportante = '02/01/2025'

/**
 * * Instructions conditionnelles
 * @author Erwan Duplessy (rendu interactif par Eric Elter)(TS et sortie PDF par Olivier Mimeau)
 */
export const uuid = '8cbd6'

export const refs = {
  'fr-fr': ['3I1'],
  'fr-ch': [],
}
export default class InstructionConditionnelle extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Variante',
      3,
      '1 : Sans condition imbriquée\n2 : Avec une condition imbriquée\n3 : Avec deux conditions imbriquées',
    ]
    this.sup = 1
    this.nbQuestions = 1
    this.consigne = 'Donner les coordonnées de la position finale du lutin.'
    this.typeExercice = 'Scratch'
    // this.nbCols = 2
    this.nbQuestionsModifiable = false
  }

  nouvelleVersion() {
    let txtintroscratch = ''
    txtintroscratch = `\\begin{scratch}[${context.issortieNB ? 'print,' : ''}fill blocks,scale=0.8]\n`
    txtintroscratch += '\\blockvariable{\\ovalvariable{var}}' // refuse d'afficher si '\\ovalvariable{var}' seul
    // txtintroscratch += '\\blockmoreblocks{\\ovalvariable{var}}'
    txtintroscratch += '\\end{scratch}'
    let texte =
      "La position initiale d'un lutin dans un repère est (0,0).<br> Dans le programme, x désigne l'abscisse, et y désigne l'ordonnée d'un lutin. <br>" // texte de l'énoncé
    texte += "Une variable a été créée, elle s'appelle"
    texte += scratchblock(txtintroscratch)
    texte += '. <br>'
    let texteCorr = ' ' // texte du corrigé
    let codeTikz = '' // code pour dessiner les blocs en tikz
    let xLutin = 0
    let yLutin = 0

    codeTikz += `\\begin{scratch}[${context.issortieNB ? 'print,' : ''}fill blocks,scale=0.8]\n` // \n est impératif pour l'affichage HTML

    const n1 = randint(1, 10)
    const n2 = randint(1, 10)
    const n3 = randint(1, 10)
    const n4 = randint(1, 10)
    const xLutin1 = randint(1, 10) * 10
    const xLutin2 = randint(1, 10) * 10
    const yLutin1 = randint(1, 10) * 10
    const yLutin2 = randint(1, 10) * 10

    codeTikz += '\\blockinit{quand \\greenflag est cliqué}\n' // \n est impératif pour l'affichage HTML
    codeTikz += '\\blockmove{aller à x: \\ovalnum{0} y: \\ovalnum{0}}\n'
    codeTikz += `\\blockvariable{mettre \\selectmenu{var} à \\ovalnum{${n1}}}\n`
    codeTikz += `\\blockifelse{si \\booloperator{\\ovalvariable{var} < \\ovalnum{${n2}}} alors}\n`
    codeTikz += `{\\blockmove{ajouter \\ovalnum{${xLutin1}} à x}\n`
    if (this.sup > 1) {
      codeTikz += `\\blockif{si \\booloperator{\\ovalvariable{var} > \\ovalnum{${n3}}} alors}\n`
      codeTikz += `{\\blockmove{ajouter \\ovalnum{${xLutin2}} à x}\n}\n` // attention aux /n qui marque la fin des chacun des blocs (blockmove et block si)
    }
    codeTikz += '}\n' // fin du si
    codeTikz += `{\\blockmove{ajouter \\ovalnum{${yLutin1}} à y}\n` // `{sinon \\blockmove{ajouter \\ovalnum{${yLutin1}} à y}\n`
    if (this.sup > 2) {
      codeTikz += `\\blockif{si \\booloperator{\\ovalvariable{var} > \\ovalnum{${n4}}} alors}\n`
      codeTikz += `{\\blockmove{ajouter \\ovalnum{${yLutin2}} à y}\n}\n` // attention aux /n qui marque la fin des chacun des blocs (blockmove et block si)
    }
    codeTikz += '}\n' // fin du sinon ?
    codeTikz += '\\end{scratch}'

    texte += scratchblock(codeTikz)
    if (n1 < n2) {
      texteCorr += `Comme l'inégalité "${n1} < ${n2}" est vraie, alors on ajoute ${xLutin1} à l'abscisse du lutin. <br>`
      xLutin += xLutin1
      if (this.sup > 1) {
        if (n1 > n3) {
          texteCorr += `Comme l'inégalité "${n1} > ${n3}" est vraie, alors on ajoute ${xLutin2} à l'abscisse du lutin. <br>`
          xLutin += xLutin2
        } else {
          texteCorr += `Comme l'inégalité "${n1} > ${n3}" est fausse, alors on ne change pas l'abscisse du lutin. <br>`
        }
      }
    } else {
      texteCorr += `Comme l'inégalité "${n1} < ${n2}" est fausse, alors on ajoute ${yLutin1} à l'ordonnée du lutin. <br>`
      yLutin += yLutin1
      if (this.sup > 2) {
        if (n1 > n4) {
          texteCorr += `Comme l'inégalité "${n1} > ${n4}" est vraie, on ajoute ${yLutin2} à l'ordonnée du lutin. <br>`
          yLutin += yLutin2
        } else {
          texteCorr += `Comme l'inégalité "${n1} > ${n4}" est fausse, alors on ne change pas l'ordonnée du lutin. <br>`
        }
      }
    }
    texteCorr += ` La position finale est donc : (${texteEnCouleurEtGras(xLutin)} ; ${texteEnCouleurEtGras(yLutin)}).`
    if (this.interactif) {
      texte +=
        '<br>La position finale du lutin est : ' +
        remplisLesBlancs(
          this,
          0,
          ' (~%{champ1}~;~%{champ2}~).',
          KeyboardType.clavierDeBase,
        )
    }
    handleAnswers(
      this,
      0,
      {
        // bareme: (listePoints: number[]) => [Math.min(listePoints[0], listePoints[1]), 1],
        champ1: { value: xLutin },
        champ2: { value: yLutin },
      },
      { formatInteractif: 'fillInTheBlank' },
    )

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)
    listeQuestionsToContenu(this)
  }
}
