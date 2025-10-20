import { choice } from '../../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { creerNomDePolygone, sp } from '../../../lib/outils/outilString'
import Exercice from '../../Exercice'
import { listeQuestionsToContenu } from '../../../modules/outils'
import { propositionsQcm } from '../../../lib/interactif/qcm'
export const titre = 'Utiliser la relation de Chasles/réductions vectorielles'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '30/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '03/01/2022'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export const uuid = '26f3b'

export const refs = {
  'fr-fr': ['can2G10'],
  'fr-ch': ['NR'],
}
export default class RelationChasles1 extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1

    this.spacing = 2
  }

  nouvelleVersion() {
    let texte, texteCorr, props
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const nom = creerNomDePolygone(6, ['QD'])
      const choix = choice([1, 2, 3, 4, 5, 6])
      switch (choix) {
        case 1:
          texte = `$\\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[2]}${nom[5]}}=$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `$\\overrightarrow{${nom[2]}${nom[0]}}$ `,
                statut: true,
              },
              {
                texte: '$\\overrightarrow{0}$ ',
                statut: false,
              },
              {
                texte: `$\\overrightarrow{${nom[0]}${nom[5]}}$ `,
                statut: false,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Écrire à l'aide d'un seul vecteur : <br>
        $\\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[2]}${nom[5]}}=$`
          }
          this.canEnonce = "Écrire à l'aide d'un seul vecteur."
          this.canReponseACompleter = `$\\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[2]}${nom[5]}}=\\ldots$`
          texteCorr = `On utilise la relation de Chasles :<br>
        $\\begin{aligned}
        \\overrightarrow{${nom[5]}${nom[0]}}+\\overrightarrow{${nom[2]}${nom[5]}}
        &=\\underbrace{\\overrightarrow{${nom[2]}${miseEnEvidence(nom[5])}}+\\overrightarrow{${miseEnEvidence(nom[5])}${nom[0]}}}_{\\overrightarrow{${nom[2]}${nom[0]}}}\\\\
        &=\\overrightarrow{${nom[2]}${nom[0]}}
        \\end{aligned}$
        `

          break
        case 2:
          texte = `$\\overrightarrow{${nom[0]}${nom[1]}}-\\overrightarrow{${nom[1]}${nom[0]}}=$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                statut: true,
              },
              {
                texte: '$\\overrightarrow{0}$ ',
                statut: false,
              },
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[1]}${nom[0]}}$ `,
                statut: false,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Écrire à l'aide d'un seul vecteur : <br>
        $\\overrightarrow{${nom[0]}${nom[1]}}-\\overrightarrow{${nom[1]}${nom[0]}}=$`
          }
          this.canEnonce = "Écrire à l'aide d'un seul vecteur."
          this.canReponseACompleter = `$\\overrightarrow{${nom[0]}${nom[1]}}-\\overrightarrow{${nom[1]}${nom[0]}}=\\ldots$`
          texteCorr = `
            $\\begin{aligned}
            \\overrightarrow{${nom[0]}${nom[1]}}\\underbrace{-\\overrightarrow{${nom[1]}${nom[0]}}}_{+\\overrightarrow{${nom[0]}${nom[1]}}}
            &=\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}\\\\
            &=2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}
            \\end{aligned}$
            `

          break
        case 3:
          texte = `$-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[1]}${nom[0]}}$ `,
                statut: true,
              },
              {
                texte: '$\\overrightarrow{0}$ ',
                statut: false,
              },
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                statut: false,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Écrire à l'aide d'un seul vecteur : <br>
        $-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
          }
          this.canEnonce = "Écrire à l'aide d'un seul vecteur."
          this.canReponseACompleter = `$-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=\\ldots$`
          texteCorr = `
            $\\begin{aligned}
            \\underbrace{-\\overrightarrow{${nom[0]}${nom[1]}}}_{+\\overrightarrow{${nom[1]}${nom[0]}}}+\\overrightarrow{${nom[1]}${nom[0]}}
            &=\\overrightarrow{${nom[1]}${nom[0]}}+\\overrightarrow{${nom[1]}${nom[0]}}\\\\
            &=2${sp(1)}\\overrightarrow{${nom[1]}${nom[0]}}
            \\end{aligned}$
            `

          break
        case 4:
          texte = `$-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}=$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: '$\\overrightarrow{0}$ ',
                statut: true,
              },
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[1]}${nom[0]}}$ `,
                statut: false,
              },
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                statut: false,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Écrire à l'aide d'un seul vecteur : <br>
        $-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}=$`
          }
          this.canEnonce = "Écrire à l'aide d'un seul vecteur."
          this.canReponseACompleter = `$-\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[0]}${nom[1]}}=\\ldots$`
          texteCorr = `
                $\\begin{aligned}
                \\underbrace{-\\overrightarrow{${nom[0]}${nom[1]}}}_{+\\overrightarrow{${nom[1]}${nom[0]}}}+\\overrightarrow{${nom[0]}${nom[1]}}
                &=\\underbrace{\\overrightarrow{${nom[1]}${miseEnEvidence(nom[0])}}+\\overrightarrow{${miseEnEvidence(nom[0])}${nom[1]}}}_{\\overrightarrow{${nom[1]}${nom[1]}}}\\\\
                &=\\overrightarrow{0}
                \\end{aligned}$
                `

          break

        case 5:
          texte = `$\\overrightarrow{${nom[4]}${nom[1]}}-\\overrightarrow{${nom[4]}${nom[2]}}=$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `$\\overrightarrow{${nom[2]}${nom[1]}}$ `,
                statut: true,
              },
              {
                texte: '$\\overrightarrow{0}$ ',
                statut: false,
              },
              {
                texte: `$\\overrightarrow{${nom[1]}${nom[2]}}$ `,
                statut: false,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Écrire à l'aide d'un seul vecteur : <br>
        $\\overrightarrow{${nom[4]}${nom[1]}}-\\overrightarrow{${nom[4]}${nom[2]}}=$`
          }
          this.canEnonce = "Écrire à l'aide d'un seul vecteur."
          this.canReponseACompleter = `$\\overrightarrow{${nom[4]}${nom[1]}}-\\overrightarrow{${nom[4]}${nom[2]}}=\\ldots$`
          texteCorr = `On utilise la relation de Chasles :<br>
            $\\begin{aligned}
            \\overrightarrow{${nom[4]}${nom[1]}}\\underbrace{-\\overrightarrow{${nom[4]}${nom[2]}}}_{+\\overrightarrow{${nom[2]}${nom[4]}}}
            &=\\underbrace{\\overrightarrow{${nom[2]}${miseEnEvidence(nom[4])}}+\\overrightarrow{${miseEnEvidence(nom[4])}${nom[1]}}}_{\\overrightarrow{${nom[2]}${nom[1]}}}\\\\
            &=\\overrightarrow{${nom[2]}${nom[1]}}
            \\end{aligned}$
            `

          break
        case 6:
          texte = `$\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: '$\\overrightarrow{0}$ ',
                statut: true,
              },
              {
                texte: `$2${sp(1)}\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                statut: false,
              },
              {
                texte: `$\\overrightarrow{${nom[0]}${nom[1]}}$ `,
                statut: false,
              },
            ],
          }

          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Écrire à l'aide d'un seul vecteur : <br>
        $\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=$`
          }
          this.canEnonce = "Écrire à l'aide d'un seul vecteur."
          this.canReponseACompleter = ` $\\overrightarrow{${nom[0]}${nom[1]}}+\\overrightarrow{${nom[1]}${nom[0]}}=\\ldots$`
          texteCorr = `
                $\\begin{aligned}
                \\underbrace{\\overrightarrow{${nom[0]}${miseEnEvidence(nom[1])}}+\\overrightarrow{${miseEnEvidence(nom[1])}${nom[0]}}}_{\\overrightarrow{${nom[0]}${nom[0]}}}
                                &=\\overrightarrow{${nom[0]}${nom[0]}}\\\\
                                &=\\overrightarrow{0}
                \\end{aligned}$
                `

          break
      }
      if (this.questionJamaisPosee(i, nom, choix)) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.canEnonce = texte
        this.canReponseACompleter = props.texte
        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(this.canReponseACompleter)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
