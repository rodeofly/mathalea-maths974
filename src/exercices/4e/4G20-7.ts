import { codageAngleDroit } from '../../lib/2d/angles'
import { afficheLongueurSegment } from '../../lib/2d/codages'
import { point } from '../../lib/2d/points'
import { nommePolygone, polygone } from '../../lib/2d/polygones'
import { longueur } from '../../lib/2d/segmentsVecteurs'
import { rotation, similitude } from '../../lib/2d/transformations'
import { combinaisonListesSansChangerOrdre } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import { mathalea2d, ObjetMathalea2D } from '../../modules/2dGeneralites'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ajouteFeedback } from '../../lib/interactif/questionMathLive'
import { RedactionPythagore } from './_pythagore'
import * as Blockly from 'blockly/core'
import { init } from '../../lib/blockly/blocks'
import * as En from 'blockly/msg/en'
import blocklypyt from '../../lib/blockly/blocklypyt.json'
import { stringNombre } from '../../lib/outils/texNombre'
import { context } from '../../modules/context'

export const titre =
  'Calculer une longueur avec le théorème de Pythagore (blockly)'
export const interactifReady = true
export const interactifType = 'custom'

/**
 * Exercices sur le théorème de Pythagore
 * @author Mickael Guironnet (ajout de blockly)
 * 4G20
 */
export const uuid = 'c0f90'

export const refs = {
  'fr-fr': [],
  'fr-ch': [],
}

Blockly.setLocale(En as unknown as { [key: string]: string })

export default class Pythagore2DBlockly extends Exercice {
  typeDeQuestion: string
  saveArguments: {
    nomDuPolygone: string
    longueurBC: number
    longueurAC: number
    longueurAB: number
    listeTypeDeQuestion: string
    key: string
  }[]
  constructor() {
    super()

    this.nbQuestions = 2
    this.sup = 3
    this.sup2 = 3
    this.typeDeQuestion = 'Calculer :'
    this.besoinFormulaire2Numerique = [
      'Recherche de côtés ',
      3,
      "1 : Hypoténuse\n2 : Côtés de l'angle droit\n3: Mélange",
    ]
    this.saveArguments = []
  }

  nouvelleVersion(numeroExercice: number) {
    let listeTypeDeQuestions
    if (this.sup2 === 1) {
      listeTypeDeQuestions = ['BC']
    } else if (this.sup2 === 2) {
      listeTypeDeQuestions = ['AB', 'AC']
    } else {
      listeTypeDeQuestions = ['AB', 'BC', 'AC']
    }
    const listeDeNomsDePolygones = ['ABC', 'DEF']
    this.consigne =
      (this.nbQuestions > 1 ? 'Dans chaque cas, calculer' : 'Calculer') +
      " la longueur manquante (si nécessaire, l'arrondir au millimètre près)."

    listeTypeDeQuestions = combinaisonListesSansChangerOrdre(
      listeTypeDeQuestions,
      this.nbQuestions,
    )
    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      texte = ''
      texteCorr = ''
      const A1 = point(0, 0)
      const B1 = point(randint(22, 50) / 10, 0)
      const C1 = similitude(B1, A1, 90, randint(22, 50) / 10 / longueur(A1, B1))
      const p1 = polygone(A1, B1, C1)
      p1.isVisible = false
      const p2 = rotation(p1, A1, randint(0, 360))
      const A = p2.listePoints[0]
      const B = p2.listePoints[1]
      const C = p2.listePoints[2]
      const codage = codageAngleDroit(B, A, C)
      const xmin = Math.min(A.x, B.x, C.x) - 1
      const ymin = Math.min(A.y, B.y, C.y) - 1
      const xmax = Math.max(A.x, B.x, C.x) + 1
      const ymax = Math.max(A.y, B.y, C.y) + 1
      const nomDuPolygone = listeDeNomsDePolygones[i % 2]
      const nomme = nommePolygone(p2, nomDuPolygone)
      const affAB = afficheLongueurSegment(B, A)
      const affAC = afficheLongueurSegment(A, C)
      const affBC = afficheLongueurSegment(C, B)
      const longueurAB = longueur(A, B, 1)
      const longueurAC = longueur(A, C, 1)
      const longueurBC = longueur(B, C, 1)
      const mesObjetsATracer: ObjetMathalea2D[] = [codage, p2, nomme]

      if (
        this.typeDeQuestion === 'Calculer :' &&
        listeTypeDeQuestions[i] === 'AB'
      ) {
        mesObjetsATracer.push(affAC, affBC)
      } else if (
        this.typeDeQuestion === 'Calculer :' &&
        listeTypeDeQuestions[i] === 'BC'
      ) {
        mesObjetsATracer.push(affAC, affAB)
      } else if (
        this.typeDeQuestion === 'Calculer :' &&
        listeTypeDeQuestions[i] === 'AC'
      ) {
        mesObjetsATracer.push(affAB, affBC)
      }

      texte += mathalea2d(
        { xmin, xmax, ymin, ymax, scale: 0.6, style: 'display: block' },
        mesObjetsATracer,
      )

      if (this.typeDeQuestion === 'Calculer :') {
        let redaction
        if (listeTypeDeQuestions[i] === 'AB') {
          redaction = RedactionPythagore(
            A.nom,
            B.nom,
            C.nom,
            2,
            longueurAB,
            longueurAC,
            longueurBC,
          )
        } else if (listeTypeDeQuestions[i] === 'BC') {
          redaction = RedactionPythagore(
            A.nom,
            B.nom,
            C.nom,
            1,
            longueurAB,
            longueurAC,
            longueurBC,
          )
        } else {
          // listeTypeDeQuestions[i] === 'AC'
          redaction = RedactionPythagore(
            A.nom,
            C.nom,
            B.nom,
            2,
            longueurAC,
            longueurAB,
            longueurBC,
          )
        }
        texteCorr = redaction[0] ?? ''

        if (context.isHtml) {
          texte += `<div> 
  <table id="tableBlockly${numeroExercice}_${i}" style= "height: 100%;width: 100%;border: 0px solid black;border-collapse: collapse;min-height: 500px">
    <tr>
      <td id="blocklyArea${numeroExercice}_${i}"></td>
    </tr>
  </table></div>

  <div id="blocklyDiv${numeroExercice}_${i}" style="position: absolute"></div>
  `
          texteCorr = `<div>
  <table id="tableBlocklyCor${numeroExercice}_${i}" style= "height: 100%;width: 100%;border: 0px solid black;border-collapse: collapse;min-height: 500px">
    <tr>
      <td id="secondaryArea${numeroExercice}_${i}"></td>
    </tr>
    <tr>
    </tr>
  </table>
  <div id="secondaryDiv${numeroExercice}_${i}" style="position: absolute"></div>
  `
          texte += `<div class="ml-2 py-2" id="resultatCheckEx${this.numeroExercice}Q${i}"></div>`
          texte += ajouteFeedback(this, i)
        }
      }
      if (this.questionJamaisPosee(i, B1.x, B1.y, C1.x, C1.y)) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        const key =
          nomDuPolygone +
          longueurBC.toString() +
          longueurAC.toString() +
          longueurAB.toString()
        this.saveArguments[i] = {
          nomDuPolygone,
          longueurBC,
          longueurAC,
          longueurAB,
          listeTypeDeQuestion: listeTypeDeQuestions[i],
          key,
        }
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)

    init() // blockly initialisation
    const that = this
    const createAllBlockly = function () {
      const nbQ = that.nbQuestions
      const numExercice = numeroExercice
      // console log('nbQ:' + nbQ)
      for (let k = 0; k < nbQ; k++) {
        // console log('k:' + k)
        createBlockly(
          k,
          numExercice,
          that.saveArguments[k].nomDuPolygone,
          that.saveArguments[k].longueurBC,
          that.saveArguments[k].longueurAC,
          that.saveArguments[k].longueurAB,
          that.saveArguments[k].listeTypeDeQuestion,
          that.saveArguments[k].key,
        )
      }
    }
    const createBlockly = function (
      questId: number,
      numExercice: number,
      nomDuPolygone: string,
      longueurBC: number,
      longueurAC: number,
      longueurAB: number,
      listeTypeDeQuestion: string,
      key: string,
    ) {
      const toolbox = {
        kind: 'flyoutToolbox',
        contents: [
          {
            kind: 'block',
            type: 'start',
          },
          {
            kind: 'block',
            type: 'demonstration',
          },
          {
            kind: 'block',
            type: 'triangle_rect_iso',
          },
          {
            kind: 'block',
            type: 'secantes',
          },
          {
            kind: 'block',
            type: 'paralleles',
          },
          {
            kind: 'block',
            type: 'pythagore',
          },
          {
            kind: 'block',
            type: 'thales',
          },
          {
            kind: 'block',
            type: 'trigonometrie',
          },
          {
            kind: 'block',
            type: 'reciproque',
          },
          {
            kind: 'block',
            type: 'egale_comp',
          },
          {
            kind: 'block',
            type: 'longueur',
          },
          {
            kind: 'block',
            type: 'angle',
          },
          {
            kind: 'block',
            type: 'carre',
          },
          {
            kind: 'block',
            type: 'egale_comp',
            inputs: {
              op1: {
                block: {
                  type: 'carre',
                  inputs: {
                    value: {
                      block: {
                        type: 'longueur',
                      },
                    },
                  },
                },
              },
              op2: {
                block: {
                  type: 'operation',
                  inputs: {
                    op1: {
                      block: {
                        type: 'carre',
                      },
                    },
                    op2: {
                      block: {
                        type: 'carre',
                      },
                    },
                  },
                },
              },
            },
          },
          {
            kind: 'block',
            type: 'operation',
          },
          {
            kind: 'block',
            type: 'operation_square_trigo',
          },
          {
            kind: 'block',
            type: 'unite',
          },
          {
            kind: 'block',
            type: 'textinput',
          },
        ],
      }
      const secondaryArea = document.getElementById(
        'secondaryArea' + numExercice + '_' + questId,
      )
      const secondaryDiv = document.getElementById(
        'secondaryDiv' + numExercice + '_' + questId,
      )
      const workspaceExisting = retrieveWorkspace(
        'workspace_sol_' + numExercice + '_' + questId + '_' + key,
      )
      if (
        secondaryDiv !== null &&
        secondaryDiv.querySelector('.injectionDiv') &&
        workspaceExisting
      ) {
        // already loaded
        document.dispatchEvent(
          new window.Event('blocklyEvent', { bubbles: true }),
        )
      } else if (secondaryDiv !== null) {
        const workspaceExisting = retrieveWorkspace(
          'workspace_sol_' + numExercice + '_' + questId,
        )
        if (workspaceExisting) {
          // console log('dispatchEvent: dispose')
          workspaceExisting.dispose()
        }
        const secondaryWorkspace = Blockly.inject(secondaryDiv, {
          media: './node_modules/blockly/media/',
          readOnly: true,
          zoom: {
            controls: true,
            wheel: false,
            startScale: 0.8,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
            pinch: false,
          },
        })
        secondaryWorkspace.idkey =
          'workspace_sol_' + numExercice + '_' + questId + '_' + key
        const solution1 = JSON.parse(JSON.stringify(blocklypyt)) // POUR CLONER SINON BUG
        solution1.blocks.blocks[0].next.block.inputs.Condition.block.fields.prepoint =
          nomDuPolygone[0]
        solution1.blocks.blocks[0].next.block.inputs.Condition.block.fields.deuxpoint =
          nomDuPolygone[1]
        solution1.blocks.blocks[0].next.block.inputs.Condition.block.fields.troispoint =
          nomDuPolygone[2]
        solution1.blocks.blocks[0].next.block.inputs.Condition.block.fields.trisommet =
          nomDuPolygone[0]
        const egalitePytagore =
          solution1.blocks.blocks[0].next.block.inputs.Propriété.block.next
            .block
        egalitePytagore.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
          nomDuPolygone[1] + nomDuPolygone[2]
        egalitePytagore.inputs.op2.block.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
          nomDuPolygone[0] + nomDuPolygone[1]
        egalitePytagore.inputs.op2.block.inputs.op2.block.inputs.value.block.fields.Longueur_triangle =
          nomDuPolygone[2] + nomDuPolygone[0]
        const egalitePytagoreMoins = egalitePytagore.next.block
        const egalitePytagoreCalcul1 = egalitePytagoreMoins.next.block
        const egalitePytagoreCalcul2 = egalitePytagoreCalcul1.next.block
        const egalitePytagoreCalcul3 = egalitePytagoreCalcul2.next.block
        const egalitePytagoreCalcul4 = egalitePytagoreCalcul3.next.block
        if (listeTypeDeQuestion === 'AB') {
          egalitePytagoreMoins.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[0] + nomDuPolygone[1]
          egalitePytagoreMoins.inputs.op2.block.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[1] + nomDuPolygone[2]
          egalitePytagoreMoins.inputs.op2.block.inputs.op2.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[2] + nomDuPolygone[0]
          egalitePytagoreCalcul1.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[0] + nomDuPolygone[1]
          egalitePytagoreCalcul1.inputs.op2.block.inputs.op1.block.inputs.value.block.fields.NUM =
            stringNombre(longueurBC, 1)
          egalitePytagoreCalcul1.inputs.op2.block.inputs.op2.block.inputs.value.block.fields.NUM =
            stringNombre(longueurAC, 1)
          egalitePytagoreCalcul2.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[0] + nomDuPolygone[1]
          egalitePytagoreCalcul2.inputs.op2.block.inputs.op1.block.fields.NUM =
            stringNombre(longueurBC ** 2, 2)
          egalitePytagoreCalcul2.inputs.op2.block.inputs.op2.block.fields.NUM =
            stringNombre(longueurAC ** 2, 2)
          egalitePytagoreCalcul3.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[0] + nomDuPolygone[1]
          egalitePytagoreCalcul3.inputs.op2.block.fields.NUM = stringNombre(
            longueurBC ** 2 - longueurAC ** 2,
            2,
          )
          egalitePytagoreCalcul4.inputs.op1.block.fields.Longueur_triangle =
            nomDuPolygone[0] + nomDuPolygone[1]
          egalitePytagoreCalcul4.inputs.op2.block.inputs.value.block.fields.NUM =
            stringNombre(longueurBC ** 2 - longueurAC ** 2, 2)
          solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.inputs.op1.block.fields.Longueur_triangle =
            nomDuPolygone[0] + nomDuPolygone[1]
          solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.inputs.op2.block.inputs.value.block.fields.NUM =
            stringNombre(longueurAB, 2)
          if (
            stringNombre(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1) ===
            stringNombre(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 5)
          ) {
            solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.fields.op =
              'equal'
          } else {
            solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.fields.op =
              'approx'
          }
        } else if (listeTypeDeQuestion === 'AC') {
          egalitePytagoreMoins.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[2] + nomDuPolygone[0]
          egalitePytagoreMoins.inputs.op2.block.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[1] + nomDuPolygone[2]
          egalitePytagoreMoins.inputs.op2.block.inputs.op2.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[0] + nomDuPolygone[1]
          egalitePytagoreCalcul1.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[2] + nomDuPolygone[0]
          egalitePytagoreCalcul1.inputs.op2.block.inputs.op1.block.inputs.value.block.fields.NUM =
            stringNombre(longueurBC, 1)
          egalitePytagoreCalcul1.inputs.op2.block.inputs.op2.block.inputs.value.block.fields.NUM =
            stringNombre(longueurAB, 1)
          egalitePytagoreCalcul2.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[2] + nomDuPolygone[0]
          egalitePytagoreCalcul2.inputs.op2.block.inputs.op1.block.fields.NUM =
            stringNombre(longueurBC ** 2, 2)
          egalitePytagoreCalcul2.inputs.op2.block.inputs.op2.block.fields.NUM =
            stringNombre(longueurAB ** 2, 2)
          egalitePytagoreCalcul3.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[2] + nomDuPolygone[0]
          egalitePytagoreCalcul3.inputs.op2.block.fields.NUM = stringNombre(
            longueurBC ** 2 - longueurAB ** 2,
            2,
          )
          egalitePytagoreCalcul4.inputs.op1.block.fields.Longueur_triangle =
            nomDuPolygone[2] + nomDuPolygone[0]
          egalitePytagoreCalcul4.inputs.op2.block.inputs.value.block.fields.NUM =
            stringNombre(longueurBC ** 2 - longueurAB ** 2, 2)
          solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.inputs.op1.block.fields.Longueur_triangle =
            nomDuPolygone[2] + nomDuPolygone[0]
          solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.inputs.op2.block.inputs.value.block.fields.NUM =
            stringNombre(longueurAC, 2)
          if (
            stringNombre(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1) ===
            stringNombre(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 5)
          ) {
            solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.fields.op =
              'equal'
          } else {
            solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.fields.op =
              'approx'
          }
        } else {
          egalitePytagore.next.block = egalitePytagoreCalcul1
          egalitePytagoreCalcul1.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[1] + nomDuPolygone[2]
          egalitePytagoreCalcul1.inputs.op2.block.fields.op = 'plus'
          egalitePytagoreCalcul1.inputs.op2.block.inputs.op1.block.inputs.value.block.fields.NUM =
            stringNombre(longueurAB, 1)
          egalitePytagoreCalcul1.inputs.op2.block.inputs.op2.block.inputs.value.block.fields.NUM =
            stringNombre(longueurAC, 1)
          egalitePytagoreCalcul2.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[1] + nomDuPolygone[2]
          egalitePytagoreCalcul2.inputs.op2.block.fields.op = 'plus'
          egalitePytagoreCalcul2.inputs.op2.block.inputs.op1.block.fields.NUM =
            stringNombre(longueurAB ** 2, 2)
          egalitePytagoreCalcul2.inputs.op2.block.inputs.op2.block.fields.NUM =
            stringNombre(longueurAC ** 2, 2)
          egalitePytagoreCalcul3.inputs.op1.block.inputs.value.block.fields.Longueur_triangle =
            nomDuPolygone[1] + nomDuPolygone[2]
          egalitePytagoreCalcul3.inputs.op2.block.fields.NUM = stringNombre(
            longueurAB ** 2 + longueurAC ** 2,
            2,
          )
          egalitePytagoreCalcul4.inputs.op1.block.fields.Longueur_triangle =
            nomDuPolygone[1] + nomDuPolygone[2]
          egalitePytagoreCalcul4.inputs.op2.block.inputs.value.block.fields.NUM =
            stringNombre(longueurAB ** 2 + longueurAC ** 2, 2)
          solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.inputs.op1.block.fields.Longueur_triangle =
            nomDuPolygone[1] + nomDuPolygone[2]
          solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.inputs.op2.block.inputs.value.block.fields.NUM =
            stringNombre(longueurBC, 2)
          if (
            stringNombre(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1) ===
            stringNombre(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 5)
          ) {
            solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.fields.op =
              'equal'
          } else {
            solution1.blocks.blocks[0].next.block.inputs.Conclusion.block.fields.op =
              'approx'
          }
        }
        Blockly.serialization.workspaces.load(solution1, secondaryWorkspace)

        const onresize2 = function () {
          // Compute the absolute coordinates and dimensions of blocklyArea.
          if (secondaryArea === null) {
            return
          }
          let element = secondaryArea
          let x = 0
          let y = 0
          let nb = 0
          do {
            x += element.offsetLeft
            y += element.offsetTop
            element = element.offsetParent
            nb++
            // console log('Co:x:' + x + ';y=' + y)
          } while (element && nb < 2)
          // Position blocklyDiv over blocklyArea.
          secondaryDiv.style.left = x + 'px'
          secondaryDiv.style.top = y + 'px'
          secondaryDiv.style.width = secondaryArea.offsetWidth + 'px'
          secondaryDiv.style.height = secondaryArea.offsetHeight + 'px'
          Blockly.svgResize(secondaryWorkspace)
          // console log('resize2')
        }
        onresize2()
        window.addEventListener('resize', onresize2, false)
      }

      const blocklyArea = document.getElementById(
        'blocklyArea' + numExercice + '_' + questId,
      )
      const blocklyDiv = document.getElementById(
        'blocklyDiv' + numExercice + '_' + questId,
      )
      if (blocklyDiv !== null && blocklyDiv.querySelector('.injectionDiv')) {
        // already loaded
        setTimeout(function () {
          document.dispatchEvent(
            new window.Event('blocklyEvent', { bubbles: true }),
          )
        }, 1000)
      } else if (blocklyDiv !== null) {
        const workspaceExisting = retrieveWorkspace(
          'workspace_quest_' + numExercice + '_' + questId,
        )
        if (workspaceExisting) {
          // console log('dispatchEvent: dispose')
          workspaceExisting.dispose()
        }
        const demoWorkspace = Blockly.inject(blocklyDiv, {
          media: './node_modules/blockly/media/',
          toolbox,
          collapse: false,
          comments: false,
          disable: false,
          maxBlocks: Infinity,
          trashcan: false,
          horizontalLayout: false,
          toolboxPosition: 'start',
          css: true,
          rtl: false,
          scrollbars: false,
          sounds: false,
          oneBasedIndex: false,
          zoom: {
            controls: true,
            wheel: false,
            startScale: 0.8,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2,
            pinch: false,
          },
        })
        demoWorkspace.idkey =
          'workspace_quest_' + numExercice + '_' + questId + '_' + key
        // console log('blockly loaded nbr:' + Blockly.Workspace.getAll().length)
        // console log('demoWorkspace.idkey:' + demoWorkspace.idkey)

        const onresize = function () {
          // Compute the absolute coordinates and dimensions of blocklyArea.
          let element = blocklyArea
          let x = 0
          let y = 0
          let nb = 0
          do {
            x += element.offsetLeft
            y += element.offsetTop
            element = element.offsetParent
            nb++
          } while (element && nb < 2)
          // Position blocklyDiv over blocklyArea.
          blocklyDiv.style.left = x + 'px'
          blocklyDiv.style.top = y + 'px'
          blocklyDiv.style.width = blocklyArea.offsetWidth + 'px'
          blocklyDiv.style.height = blocklyArea.offsetHeight + 'px'
          Blockly.svgResize(demoWorkspace)
        }
        window.addEventListener('resize', onresize, false)
        document.addEventListener('blocklyEvent', onresize, false)
        onresize()
      }
    }
    document.addEventListener('exercicesAffiches', createAllBlockly)
  }

  correctionInteractive = (i: number) => {
    if (i === undefined) return ''
    if (this.answers === undefined) this.answers = {}
    let result = 'OK'
    const spanResultat = document.querySelector(
      `#resultatCheckEx${this.numeroExercice}Q${i}`,
    )
    const divFeedback = document.querySelector(
      `#feedbackEx${this.numeroExercice}Q${i}`,
    )
    spanResultat.innerHTML = ''
    let feedback = ''
    const workspaceExisting = retrieveWorkspace(
      'workspace_quest_' + this.numeroExercice + '_' + i,
    )
    const start = workspaceExisting.getBlocksByType('start')[0]
    if (!start) {
      feedback += 'Manque le bloc "démonstration"<br>'
      spanResultat.innerHTML = '☹️'
      result = 'KO'
      if (divFeedback) divFeedback.innerHTML = feedback
      return result
    }
    const demo = start.getNextBlock()
    if (!demo) {
      feedback += 'Manque le bloc "Condition Propriété Conclusion"<br>'
      spanResultat.innerHTML = '☹️'
      result = 'KO'
      if (divFeedback) divFeedback.innerHTML = feedback
      divFeedback.style.display = 'block'

      return result
    }

    const condition = demo.getInputTargetBlock('Condition')
    if (!condition) {
      feedback += 'Pas de condition définie<br>'
      spanResultat.innerHTML = '☹️'
      result = 'KO'
    } else {
      if (
        condition.type === 'triangle_rect_iso' &&
        condition.getFieldValue('tritype') === 'rect'
      ) {
        feedback += 'Condition: le bloc triangle rectangle défini<br>'
      } else {
        feedback += 'Condition: le bloc triangle rectangle mal défini<br>'
        spanResultat.innerHTML = '☹️'
        result = 'KO'
      }
      if (
        this.saveArguments[i].nomDuPolygone.includes(
          condition.getFieldValue('prepoint'),
        ) &&
        this.saveArguments[i].nomDuPolygone.includes(
          condition.getFieldValue('deuxpoint'),
        ) &&
        this.saveArguments[i].nomDuPolygone.includes(
          condition.getFieldValue('troispoint'),
        ) &&
        this.saveArguments[i].nomDuPolygone.includes(
          condition.getFieldValue('troispoint'),
        )
      ) {
        feedback += 'Condition: le bloc triangle rectangle bien défini<br>'
      } else {
        feedback +=
          'Condition: le bloc triangle rectangle avec des points mal définis<br>'
        spanResultat.innerHTML = '☹️'
        result[0] = 'KO'
      }
    }

    const longueurBC = this.saveArguments[i].longueurBC
    const longueurAB = this.saveArguments[i].longueurAB
    const longueurAC = this.saveArguments[i].longueurAC
    const nomDuPolygone = this.saveArguments[i].nomDuPolygone

    const prop = demo.getInputTargetBlock('Propriété')
    if (!prop) {
      feedback += 'Pas de propriété définie<br>'
      spanResultat.innerHTML = '☹️'
      result = 'KO'
    } else {
      if (prop.type === 'pythagore') {
        feedback += 'Propriété: le bloc Pythagore défini<br>'
      } else {
        feedback += 'Propriété: le bloc Pythagore absent<br>'
        spanResultat.innerHTML = '☹️'
        result = 'KO'
      }

      const egalitePyt = prop.getNextBlock() // égalité de Pythagore
      if (
        egalitePyt &&
        egalitePyt.type === 'egale_comp' &&
        egalitePyt.getFieldValue('op') === 'equal' &&
        egalitePyt.getInputTargetBlock('op1') &&
        egalitePyt.getInputTargetBlock('op1')?.type === 'carre' &&
        egalitePyt.getInputTargetBlock('op1')?.getInputTargetBlock('value') &&
        egalitePyt.getInputTargetBlock('op1')?.getInputTargetBlock('value')
          ?.type === 'longueur' &&
        egalitePyt
          .getInputTargetBlock('op1')
          ?.getInputTargetBlock('value')
          ?.getFieldValue('Longueur_triangle') ===
          nomDuPolygone[1] + nomDuPolygone[2]
      ) {
        feedback +=
          'Propriété: Egalité de Pythagore : bloc correct à gauche<br>'
      } else {
        feedback +=
          'Propriété: Egalité de Pythagore : bloc incorrecte à gauche<br>'
        spanResultat.innerHTML = '☹️'
        result = 'KO'
      }

      if (
        egalitePyt &&
        egalitePyt.type === 'egale_comp' &&
        egalitePyt.getFieldValue('op') === 'equal' &&
        egalitePyt.getInputTargetBlock('op2') &&
        egalitePyt.getInputTargetBlock('op2')?.type === 'operation' &&
        egalitePyt.getInputTargetBlock('op2')?.getFieldValue('op') === 'plus' &&
        egalitePyt.getInputTargetBlock('op2')?.getInputTargetBlock('op1') &&
        egalitePyt.getInputTargetBlock('op2')?.getInputTargetBlock('op1')
          ?.type === 'carre' &&
        egalitePyt
          .getInputTargetBlock('op2')
          ?.getInputTargetBlock('op1')
          ?.getInputTargetBlock('value') &&
        egalitePyt
          .getInputTargetBlock('op2')
          ?.getInputTargetBlock('op1')
          ?.getInputTargetBlock('value')?.type === 'longueur' &&
        (egalitePyt
          .getInputTargetBlock('op2')
          ?.getInputTargetBlock('op1')
          ?.getInputTargetBlock('value')
          ?.getFieldValue('Longueur_triangle') ===
          nomDuPolygone[0] + nomDuPolygone[1] ||
          egalitePyt
            .getInputTargetBlock('op2')
            ?.getInputTargetBlock('op1')
            ?.getInputTargetBlock('value')
            ?.getFieldValue('Longueur_triangle') ===
            nomDuPolygone[2] + nomDuPolygone[0]) &&
        egalitePyt.getInputTargetBlock('op2')?.getInputTargetBlock('op2') &&
        egalitePyt.getInputTargetBlock('op2')?.getInputTargetBlock('op2')
          ?.type === 'carre' &&
        egalitePyt
          .getInputTargetBlock('op2')
          ?.getInputTargetBlock('op2')
          ?.getInputTargetBlock('value') &&
        egalitePyt
          .getInputTargetBlock('op2')
          ?.getInputTargetBlock('op2')
          ?.getInputTargetBlock('value')?.type === 'longueur' &&
        (egalitePyt
          .getInputTargetBlock('op2')
          ?.getInputTargetBlock('op2')
          ?.getInputTargetBlock('value')
          ?.getFieldValue('Longueur_triangle') ===
          nomDuPolygone[0] + nomDuPolygone[1] ||
          egalitePyt
            .getInputTargetBlock('op2')
            ?.getInputTargetBlock('op2')
            ?.getInputTargetBlock('value')
            ?.getFieldValue('Longueur_triangle') ===
            nomDuPolygone[2] + nomDuPolygone[0])
      ) {
        feedback +=
          'Propriété: Egalité de Pythagore : bloc correct à droite<br>'
      } else {
        feedback +=
          'Propriété: Egalité de Pythagore : bloc incorrect à droite<br>'
      }
      let racineCarre = egalitePyt?.getNextBlock() // égalité de Pythagore
      while (racineCarre) {
        const [resu, feed] = this.racineCarreSearch(
          racineCarre,
          nomDuPolygone,
          this.saveArguments[i].listeTypeDeQuestion,
          longueurBC,
          longueurAC,
          longueurAB,
        )
        racineCarre = racineCarre.getNextBlock()
        if (resu) {
          feedback += feed
          break
        }
        if (!racineCarre) {
          feedback += feed
          spanResultat.innerHTML = '☹️'
          result = 'KO'
          break
        }
      }
    }

    const conclusion = demo.getInputTargetBlock('Conclusion')
    if (!conclusion) {
      feedback += 'Pas de conclusion définie<br>'
      spanResultat.innerHTML = '☹️'
      result = 'KO'
    } else {
      let equalOrApprox = ''
      let nomLongueur = ''
      let longueurCherche: string = longueurAB.toString()
      if (this.saveArguments[i].listeTypeDeQuestion === 'AB') {
        nomLongueur = nomDuPolygone[0] + nomDuPolygone[1]
        longueurCherche = stringNombre(longueurAB)
        if (
          stringNombre(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 1) ===
          stringNombre(Math.sqrt(longueurBC ** 2 - longueurAC ** 2), 5)
        ) {
          equalOrApprox = 'equal'
        } else {
          equalOrApprox = 'approx'
        }
      } else if (this.saveArguments[i].listeTypeDeQuestion === 'AC') {
        nomLongueur = nomDuPolygone[2] + nomDuPolygone[0]
        longueurCherche = stringNombre(longueurAC)
        if (
          stringNombre(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 1) ===
          stringNombre(Math.sqrt(longueurBC ** 2 - longueurAB ** 2), 5)
        ) {
          equalOrApprox = 'equal'
        } else {
          equalOrApprox = 'approx'
        }
      } else {
        nomLongueur = nomDuPolygone[1] + nomDuPolygone[2]
        longueurCherche = stringNombre(longueurBC)
        if (
          stringNombre(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 1) ===
          stringNombre(Math.sqrt(longueurAB ** 2 + longueurAC ** 2), 5)
        ) {
          equalOrApprox = 'equal'
        } else {
          equalOrApprox = 'approx'
        }
      }
      if (conclusion.type === 'egale_comp') {
        // feedback += 'Conclusion: le block conclusion défini<br>'
      } else {
        feedback += 'Conclusion: le bloc conclusion avec le mauvais block<br>'
        spanResultat.innerHTML = '☹️'
        result = 'KO'
      }
      if (
        conclusion.type === 'egale_comp' &&
        conclusion.getFieldValue('op') === equalOrApprox
      ) {
        feedback +=
          'Conclusion: le bloc conclusion défini avec le bon signe<br>'
      } else if (conclusion.type === 'egale_comp') {
        feedback +=
          'Conclusion: le bloc conclusion défini avec le mauvais signe<br>'
        spanResultat.innerHTML = '☹️'
        result = 'KO'
      }
      const op1 = conclusion.getInputTargetBlock('op1')
      if (
        op1 &&
        op1.type === 'longueur' &&
        op1.getFieldValue('Longueur_triangle') === nomLongueur
      ) {
        feedback +=
          'Conclusion: le bloc conclusion défini avec le bon segment<br>'
      } else {
        feedback +=
          'Conclusion: le bloc conclusion défini avec le mauvais segment<br>'
        spanResultat.innerHTML = '☹️'
        result = 'KO'
      }
      const op2 = conclusion.getInputTargetBlock('op2')
      if (op2 && op2.type === 'unite' && op2.getFieldValue('unite') === 'cm') {
        feedback +=
          'Conclusion: le bloc conclusion défini avec la bonne unité<br>'
      } else {
        feedback +=
          'Conclusion: le bloc conclusion défini avec la mauvaise unité<br>'
        spanResultat.innerHTML = '☹️'
        result[0] = 'KO'
      }
      if (
        op2 &&
        op2.getInputTargetBlock('value') &&
        op2.getInputTargetBlock('value').type === 'textinput' &&
        op2.getInputTargetBlock('value').getFieldValue('NUM') ===
          longueurCherche
      ) {
        feedback +=
          'Conclusion: le bloc conclusion défini avec la bonne longueur<br>'
      } else {
        feedback +=
          'Conclusion: le bloc conclusion défini avec la mauvaise longueur<br>'
        spanResultat.innerHTML = '☹️'
        result = 'KO'
      }
    }
    if (result === 'OK') spanResultat.innerHTML = '😎'
    if (divFeedback) divFeedback.innerHTML = feedback
    return result
  }

  racineCarreSearch(
    racineCarre: Blockly.Block,
    nomDuPolygone: string,
    listeTypeDeQuestion: string,
    longueurBC: number,
    longueurAC: number,
    longueurAB: number,
  ) {
    let feedback = ''
    let result = true
    let value = ''
    let nom = ''
    if (listeTypeDeQuestion === 'AB') {
      value = stringNombre(longueurBC ** 2 - longueurAC ** 2)
      nom = nomDuPolygone[0] + nomDuPolygone[1]
    } else if (listeTypeDeQuestion === 'BC') {
      value = stringNombre(longueurAC ** 2 + longueurAC ** 2)
      nom = nomDuPolygone[1] + nomDuPolygone[2]
    } else {
      value = stringNombre(longueurBC ** 2 - longueurAB ** 2)
      nom = nomDuPolygone[2] + nomDuPolygone[0]
    }

    if (
      racineCarre &&
      racineCarre.type === 'egale_comp' &&
      racineCarre.getFieldValue('op') === 'equal' &&
      racineCarre.getInputTargetBlock('op1')?.type === 'longueur' &&
      racineCarre
        .getInputTargetBlock('op1')
        ?.getFieldValue('Longueur_triangle') === nom
    ) {
      feedback += 'Propriété: bloc racine carré correct à gauche<br>'
    } else {
      result = false
      feedback += 'Propriété: bloc racine carré incorrect à gauche<br>'
    }

    if (
      racineCarre &&
      racineCarre.type === 'egale_comp' &&
      racineCarre.getFieldValue('op') === 'equal' &&
      racineCarre.getInputTargetBlock('op2')?.type ===
        'operation_square_trigo' &&
      racineCarre.getInputTargetBlock('op2')?.getFieldValue('op') ===
        'racine' &&
      racineCarre
        .getInputTargetBlock('op2')
        ?.getInputTargetBlock('value')
        ?.getFieldValue('NUM') === value
    ) {
      feedback += 'Propriété: bloc racine carré correct à droite<br>'
    } else {
      feedback += 'Propriété: bloc racine carré incorrect à droite<br>'
      result = false
    }
    return [result, feedback]
  }
}

function retrieveWorkspace(name: string) {
  const workspacesAll = Blockly.Workspace.getAll()
  for (let k = 0; k < workspacesAll.length; k++) {
    const ws = workspacesAll[k] as Blockly.Workspace & { idkey?: string }
    if (ws.idkey && ws.idkey.startsWith(name)) {
      return ws
    }
  }
  return null
}
