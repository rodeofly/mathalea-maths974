import { tableauColonneLigne } from '../../lib/2d/tableau'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { AddTabDbleEntryMathlive } from '../../lib/interactif/tableaux/AjouteTableauMathlive'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = "Trouver l'opposé d'un nombre relatif"
export const dateDeModifImportante = '24/11/2024'
export const interactifType = 'mathLive'
export const interactifReady = true

/**
 * * Remplir un tableau en utilisant la notion d'opposé
 * @author Sébastien Lozano - Eric Elter (pour la partie interactive)
 * Ajout d'un paramètre pour afficher quelques fois le signe des nombres positifs par Guillaume Valmont le 26/11/2021
 */

export const uuid = 'cab80'

export const refs = {
  'fr-fr': ['5R10'],
  'fr-ch': ['9NO9-3'],
}
export default class TrouverOppose extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireCaseACocher = [
      'Afficher quelques fois le signe des nombres positifs',
    ]
    this.besoinFormulaire2CaseACocher = ['Avec distance à zéro']
    this.sup = true
    this.sup2 = true
    this.nbQuestions = 1
    this.consigne = 'Compléter le tableau suivant.'
  }

  nouvelleVersion() {
    const listeSignesPositifs = combinaisonListes(
      ['+', ''],
      6 * this.nbQuestions,
    )
    const listeSignes = combinaisonListes(['+', '-'], 6 * this.nbQuestions)

    for (
      let i = 0, texte, texteCorr, indice = 0, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // une fonction pour générer un relatif et son opposé
      const nbRelatifEtSonOppose = function (signe: boolean) {
        const signePositif = signe ? listeSignesPositifs[indice] : ''
        const nbNum = randint(0, 9) + randint(0, 9) / 10
        if (listeSignes[indice] === '+') {
          indice++
          return {
            nb: signePositif + texNombre(nbNum),
            dz: texNombre(nbNum), // distance à zéro
            opp: texNombre(-nbNum),
          }
        } else {
          indice++
          return {
            nb: texNombre(-nbNum),
            dz: texNombre(nbNum),
            opp: signePositif + texNombre(nbNum),
          }
        }
      }
      const nbLigneNombres = []
      const nbLigneNombresCorr = []
      const nbLigneNombresCorrNu = []
      const nbLigneNombresOpp = []
      const nbLigneNombresOppCorr = []
      const nbLigneNombresOppCorrNu = []
      const nbLigneNombresDistZero = []
      const nbLigneNombresDistZeroCorr = []
      const nbLigneNombresDistZeroCorrNu = []
      for (let k = 0; k < 6; k++) {
        const nb = nbRelatifEtSonOppose(this.sup)
        const lig =
          this.sup2 && !this.interactif ? randint(0, 2) : randint(0, 1)
        if (lig === 0) {
          nbLigneNombres.push(this.interactif ? '' : '\\phantom{rrrrr}')
          nbLigneNombresCorr.push(miseEnEvidence(nb.nb))
          nbLigneNombresCorrNu.push(nb.nb)
          nbLigneNombresOpp.push(nb.opp)
          nbLigneNombresOppCorr.push(nb.opp)
          nbLigneNombresOppCorrNu.push(nb.opp)
          nbLigneNombresDistZero.push(this.interactif ? '' : '\\phantom{rrrrr}')
          nbLigneNombresDistZeroCorr.push(miseEnEvidence(nb.dz))
          nbLigneNombresDistZeroCorrNu.push(nb.dz)
        } else if (lig === 1) {
          nbLigneNombres.push(nb.nb)
          nbLigneNombresCorr.push(nb.nb)
          nbLigneNombresCorrNu.push(nb.nb)
          nbLigneNombresOpp.push(this.interactif ? '' : '\\phantom{rrrrr}')
          nbLigneNombresOppCorr.push(miseEnEvidence(nb.opp))
          nbLigneNombresOppCorrNu.push(nb.opp)
          nbLigneNombresDistZero.push(this.interactif ? '' : '\\phantom{rrrrr}')
          nbLigneNombresDistZeroCorr.push(miseEnEvidence(nb.dz))
          nbLigneNombresDistZeroCorrNu.push(nb.dz)
        } else {
          nbLigneNombresDistZero.push(nb.dz)
          nbLigneNombresDistZeroCorr.push(nb.dz)
          nbLigneNombresDistZeroCorrNu.push(nb.dz)
          if (choice([true, false])) {
            nbLigneNombres.push(nb.nb)
            nbLigneNombresCorr.push(nb.nb)
            nbLigneNombresCorrNu.push(nb.nb)
            nbLigneNombresOpp.push(this.interactif ? '' : '\\phantom{rrrrr}')
            nbLigneNombresOppCorr.push(miseEnEvidence(nb.opp))
            nbLigneNombresOppCorrNu.push(nb.opp)
          } else {
            nbLigneNombres.push(this.interactif ? '' : '\\phantom{rrrrr}')
            nbLigneNombresCorr.push(miseEnEvidence(nb.nb))
            nbLigneNombresCorrNu.push(nb.nb)
            nbLigneNombresOpp.push(nb.opp)
            nbLigneNombresOppCorr.push(nb.opp)
            nbLigneNombresOppCorrNu.push(nb.opp)
          }
        }
      }

      const enonces = []
      if (this.sup2) {
        enonces.push({
          tabEntetesColonnes: [],
          tabEntetesLignes: [
            '\\text{Nombre}',
            '\\text{Distance à zéro du nombre}',
            '\\text{Opposé du nombre}',
          ],
          tabLines: nbLigneNombres
            .concat(nbLigneNombresDistZero)
            .concat(nbLigneNombresOpp),
          tabLinesCorr: nbLigneNombresCorrNu
            .concat(nbLigneNombresDistZeroCorrNu)
            .concat(nbLigneNombresOppCorrNu),
          enonce: `${tableauColonneLigne([], ['\\text{Nombre}', '\\text{Distance à zéro du nombre}', '\\text{Opposé du nombre}'], nbLigneNombres.concat(nbLigneNombresDistZero).concat(nbLigneNombresOpp))}`,
          question: '',
          correction: `${tableauColonneLigne([], ['\\text{Nombre}', '\\text{Distance à zéro du nombre}', '\\text{Opposé du nombre}'], nbLigneNombresCorr.concat(nbLigneNombresDistZeroCorr).concat(nbLigneNombresOppCorr))}`,
        })
      } else {
        enonces.push({
          tabEntetesColonnes: [],
          tabEntetesLignes: ['\\text{Nombre}', '\\text{Opposé du nombre}'],
          tabLines: nbLigneNombres.concat(nbLigneNombresOpp),
          tabLinesCorr: nbLigneNombresCorrNu.concat(nbLigneNombresOppCorrNu),
          enonce: `${tableauColonneLigne([], ['\\text{Nombre}', '\\text{Opposé du nombre}'], nbLigneNombres.concat(nbLigneNombresOpp))}`,
          question: '',
          correction: `${tableauColonneLigne([], ['\\text{Nombre}', '\\text{Opposé du nombre}'], nbLigneNombresCorr.concat(nbLigneNombresOppCorr))}`,
        })
      }
      let objetReponse = {}
      for (let i = 0; i < enonces[0].tabLines.length; i++) {
        if (enonces[0].tabLines[i] === '') {
          const ligne = Math.floor(i / 6)
          const colonne = i % 6
          const ref = `L${ligne + 1}C${colonne + 1}`
          const valeur = Object.assign(
            {},
            { value: `${enonces[0].tabLinesCorr[i]}` },
          )
          const cellule = Object.fromEntries([[ref, valeur]])
          objetReponse = Object.assign(objetReponse, cellule)
        }
      }

      objetReponse = Object.assign(objetReponse, {
        bareme: (listePoints: number[]) => {
          return [
            Math.floor(listePoints.reduce((a, b) => a + b / 2, 0)),
            listePoints.length / 2,
          ]
        },
      })
      handleAnswers(this, i, objetReponse)

      if (this.interactif) {
        const tableau = AddTabDbleEntryMathlive.convertTclToTableauMathlive(
          enonces[0].tabEntetesColonnes,
          enonces[0].tabEntetesLignes,
          enonces[0].tabLines,
        )
        const leTableau = AddTabDbleEntryMathlive.create(
          this.numeroExercice ?? 0,
          i,
          tableau,
          'tableauMathlive',
          true,
          {},
        )
        texte = leTableau.output
      } else {
        texte = `
        
${enonces[0].enonce}`
      }
      texteCorr = `${enonces[0].correction}`

      if (this.questionJamaisPosee(i, JSON.stringify(objetReponse))) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
