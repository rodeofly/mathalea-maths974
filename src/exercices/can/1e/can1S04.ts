import { choice } from '../../../lib/outils/arrayOutils'
import { ecritureAlgebrique } from '../../../lib/outils/ecritures'
import Exercice from '../../Exercice'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import { propositionsQcm } from '../../../lib/interactif/qcm'
export const titre = 'Donner la nature d’une suite (formule de récurrence)'
export const interactifReady = true
export const interactifType = 'qcm'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/02/2022' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export const uuid = 'b119b'

export const refs = {
  'fr-fr': ['can1S04'],
  'fr-ch': [],
}
export default class NatureSuiteRec extends Exercice {
  constructor() {
    super()

    this.nbQuestions = 1

    this.spacing = 1.5
  }

  nouvelleVersion() {
    let texte, texteCorr, a, b, u, props
    const nomSuite = ['u', 'v', 'w']
    const s = choice(nomSuite)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      switch (
        choice([1, 2, 3]) //
      ) {
        case 1: // suite arithmétique simple
          a = randint(1, 10) * choice([-1, 1])
          u = randint(1, 10) * choice([-1, 1])

          texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = ${s}_n ${ecritureAlgebrique(a)}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `arithmétique de raison $${a}$`,
                statut: true,
              },
              {
                texte: `arithmétique de raison $${u}$`,
                statut: false,
              },
              {
                texte: `géométrique de raison $${a}$`,
                statut: false,
              },
            ],
          }
          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = ${s}_n ${ecritureAlgebrique(a)}$.<br>
          
            Quelle est la nature de cette suite ? <br>
            
            Donner sa raison.`
          }

          texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=${s}_n+r$ avec $r=${a}$.<br>
        On en déduit que $(${s}_n)$ est une suite arithmétique de raison $${a}$ et de premier terme $${s}_0=${u}$.`

          break

        case 2: // suite géo simple
          a = randint(2, 10) * choice([-1, 1])
          u = randint(1, 10) * choice([-1, 1])

          texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = ${a}${s}_n $.<br>
          Alors, $(${s}_n)$ est une suite ...`
          this.autoCorrection[i] = {
            enonce: texte,
            options: { horizontal: true },
            propositions: [
              {
                texte: `géométrique de raison $${a}$`,
                statut: true,
              },
              {
                texte: `géométrique de raison $${u}$`,
                statut: false,
              },
              {
                texte: `arithmétique de raison $${a}$`,
                statut: false,
              },
            ],
          }
          props = propositionsQcm(this, i)
          if (this.interactif) texte += props.texte
          else {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = ${a}${s}_n $.<br>
          
            Quelle est la nature de cette suite ? <br>
            
            Donner sa raison.`
          }

          texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=q\\times ${s}_n$ avec $q=${a}$.<br>
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $${a}$ et de premier terme $${s}_0=${u}$.`

          break

        case 3: // suite géo u_n/a
          a = randint(2, 10)
          u = randint(1, 10) * choice([-1, 1])
          b = choice([-1, 1])
          if (b < 0) {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = -\\dfrac{${s}_{n}}{${a}}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `géométrique de raison $-\\dfrac{1}{${a}}$`,
                  statut: true,
                },
                {
                  texte: `géométrique de raison $-${a}$`,
                  statut: false,
                },
                {
                  texte: `arithmétique de raison $-${a}$`,
                  statut: false,
                },
              ],
            }
            props = propositionsQcm(this, i)
            if (this.interactif) texte += props.texte
            else {
              texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} =- \\dfrac{${s}_{n}}{${a}}$.<br>
              
              Quelle est la nature de cette suite ? <br>
              
              Donner sa raison.`
            }
            texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=q\\times ${s}_n$ avec $q=-\\dfrac{1}{${a}}$.<br>
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $-\\dfrac{1}{${a}}$ et de premier terme $${s}_0=${u}$.`
          } else {
            texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = \\dfrac{${s}_{n}}{${a}}$.<br>
          Alors, $(${s}_n)$ est une suite ...`
            this.autoCorrection[i] = {
              enonce: texte,
              options: { horizontal: true },
              propositions: [
                {
                  texte: `géométrique de raison $\\dfrac{1}{${a}}$`,
                  statut: true,
                },
                {
                  texte: `géométrique de raison $${a}$`,
                  statut: false,
                },
                {
                  texte: `arithmétique de raison $${a}$`,
                  statut: false,
                },
              ],
            }
            props = propositionsQcm(this, i)
            if (this.interactif) texte += props.texte
            else {
              texte = `Soit $(${s}_n)$ une suite définie par $${s}_0=${u}$ et pour tout  $n\\in\\mathbb{N}$ par $${s}_{n+1} = \\dfrac{${s}_{n}}{${a}}$.<br>
            
              Quelle est la nature de cette suite ? <br>
              
              Donner sa raison.`
            }
            texteCorr = `La formule de récurrence est de la forme $${s}_{n+1}=q\\times ${s}_n$ avec $q=\\dfrac{1}{${a}}$.<br>
        On en déduit que $(${s}_n)$ est une suite géométrique de raison $\\dfrac{1}{${a}}$ et de premier terme $${s}_0=${u}$.`
          }
          break
      }

      if (this.questionJamaisPosee(i, u, a)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.canEnonce = texte
        this.canReponseACompleter = `Nature de la suite : $\\ldots$\\\\
         Raison $=\\ldots$`
        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(this.canReponseACompleter)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
