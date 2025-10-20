import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { ecritureAlgebrique } from '../../lib/outils/ecritures'
import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { context } from '../../modules/context'
import { tableauColonneLigne } from '../../lib/2d/tableau'
import { AddTabDbleEntryMathlive } from '../../lib/interactif/tableaux/AjouteTableauMathlive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { miseEnEvidence } from '../../lib/outils/embellissements'

export const titre =
  'Additionner deux entiers relatifs dans un tableau à double entrée'
export const dateDeModifImportante = '07/06/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCOpen'

/**
 * Additionner deux entiers relatifs dans un tableau à double entrée
 * @author Rémi Angot
 * Passage en interactif, changement total du code pour les tableaux et amélioration de la consigne par Eric Elter le 07/06/2025
 */
export const uuid = '41254'

export const refs = {
  'fr-fr': ['5R20-5'],
  'fr-ch': ['9NO9-10'],
}
export default class ExerciceTableauAdditionsRelatifs extends Exercice {
  constructor() {
    super()
    this.consigne =
      "Compléter ce tableau de manière à ce que chaque case corresponde à la somme du nombre dans l'en-tête de la colonne associée et du nombre dans l'en-tête de la ligne associée."

    this.nbQuestions = 1
    this.nbQuestionsModifiable = false
  }

  nouvelleVersion() {
    const listeSignes1 = combinaisonListes([-1, 1], 4)

    const nombreSurLigne: number[] = []
    const nombreDansColonne: number[] = []
    const ligneEnt = []
    const colonneEnt = ['+']
    for (let i = 0; i < 4; i++) {
      // Génère un nombre entre 2 et 9, différent de ceux déjà choisis
      const dejaChoisisLigne = nombreSurLigne.map((n) => Math.abs(n))
      const a = randint(2, 9, dejaChoisisLigne)
      nombreSurLigne.push(a * listeSignes1[i])
      ligneEnt.push(`${ecritureAlgebrique(a * listeSignes1[i])}`)

      const dejaChoisisColonne = nombreDansColonne.map((n) => Math.abs(n))
      const b = randint(2, 9, dejaChoisisColonne)
      nombreDansColonne.push(b * listeSignes1[i])
      colonneEnt.push(`${ecritureAlgebrique(b * listeSignes1[i])}`)
    }

    const contenu = Array(16).fill('')
    const objetReponse1: { [key: string]: { value: number } } = {}

    const contenuCorr = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const somme = nombreSurLigne[i] + nombreDansColonne[j]
        const key = `L${i + 1}C${j + 1}`
        objetReponse1[key] = {
          value: somme,
        }
        contenuCorr.push(
          miseEnEvidence(somme === 0 ? somme : ecritureAlgebrique(somme)),
        )
      }
    }

    const tableau = tableauColonneLigne(colonneEnt, ligneEnt, contenu)
    const tableauInteractif = AddTabDbleEntryMathlive.create(
      this.numeroExercice ?? 0,
      0,
      AddTabDbleEntryMathlive.convertTclToTableauMathlive(
        colonneEnt,
        ligneEnt,
        contenu,
      ),
      '',
      true,
      {},
    )
    const texte = this.interactif ? tableauInteractif.output : tableau
    handleAnswers(this, 0, objetReponse1, { formatInteractif: 'mathlive' })

    const tableauCorr = tableauColonneLigne(colonneEnt, ligneEnt, contenuCorr)
    const texteCorr = `${tableauCorr}`

    this.listeQuestions.push(texte)
    this.listeCorrections.push(texteCorr)

    if (context.isAmc) {
      this.autoCorrection[0] = {
        enonce: this.question,
        propositions: [
          {
            texte: '',
            statut: 1, // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
            sanscadre: true, // EE : ce champ est facultatif et permet (si true) de cacher le cadre et les lignes acceptant la réponse de l'élève
          },
        ],
      }
    }
    listeQuestionsToContenu(this)
  }
}
