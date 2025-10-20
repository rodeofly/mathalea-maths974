import { index, range } from 'mathjs'
import { matrice } from '../../lib/mathFonctions/Matrice'
import { choice } from '../../lib/outils/arrayOutils'
import { ecritureParentheseSiMoins } from '../../lib/outils/ecritures'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Produit de matrices'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '25/10/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '04/03/2025' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Maxime Nguyen
 * Référence HPC103
 * Multiplication de matrices : on teste les produits possibles ou non et on réalise le calcul.
 */
export const uuid = 'a868f'
export const ref = 'HPC103'
export const refs = {
  'fr-fr': ['HPC103'],
  'fr-ch': [],
}
export default class nomExercice extends Exercice {
  constructor() {
    super()
    this.titre = titre
    this.consigne =
      'On définit deux matrices $A$ et $B$. Si le produit $A \\times B$ est possible, effectuer le calcul. Faire de même pour $B \\times A$.'
    this.nbQuestions = 3 // Nombre de questions par défaut
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.tailleDiaporama = 3 // Pour les exercices chronométrés. 50 par défaut pour les exercices avec du texte
    this.video = '' // Id YouTube ou url
  }

  nouvelleVersion() {
    this.autoCorrection = []

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      // Boucle principale où i+1 correspond au numéro de la question
      const matrices = [] // vecteur qui stocke les matrices
      const matricesprint = [] // vecteur qui stocke les matrices écrites en LaTeX
      const nbmatrice = 2
      let n = randint(1, 4)
      let m = randint(1, 4)
      while ((n === m) & (n === 1)) {
        m = randint(2, 4)
      }
      const nblignes = [] // vecteur qui stocke le nombre de lignes de chaque matrice
      nblignes.push(n)
      const nbcolonnes = [] // vecteur qui stocke le nombre de colonnes de chaque matrice
      nbcolonnes.push(m)
      n = choice([m, m, m, 1, 2, 3, 4]) // on favorise la compatibilité de la deuxieme matrices
      nblignes.push(n)
      m = choice([n, n, n, 1, 2, 3, 4])
      while ((n === m) & (n === 1)) {
        m = choice([2, 3, 4])
      }
      nbcolonnes.push(m)
      const texteligne = [] // texte pour la correction
      const textecolonne = [] // texte pour la correction
      for (let compteur = 0; compteur < nbmatrice; compteur++) {
        let ligne
        const table = []
        n = nblignes[compteur]
        if (n === 1) {
          texteligne.push('$1$ ligne ')
        } else {
          texteligne.push(`$${n}$ lignes `)
        }
        m = nbcolonnes[compteur]
        if (m === 1) {
          textecolonne.push('$1$ colonne ')
        } else {
          textecolonne.push(`$${m}$ colonnes `)
        }
        for (let i = 0; i < n; i++) {
          ligne = []
          for (let j = 0; j < m; j++) {
            const coef = choice([
              -6, -5, -4, -3, -2, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
              1, 1, 2, 2, 2, 3, 3, 3, 4, 5, 6,
            ])
            ligne.push(coef)
          }
          table.push(ligne)
        }
        const maMatrice = matrice(table)
        matrices.push(maMatrice)
        const texMatrice = maMatrice.toTex()
        matricesprint.push(texMatrice)
      }

      texte = `Soient $A=${matricesprint[0]}$ et $B = ${matricesprint[1]}$.` // Le LateX entre deux symboles $, les variables dans des ${ }
      texteCorr =
        'La matrice $A$ a ' + texteligne[0] + 'et ' + textecolonne[0] + '. '
      texteCorr +=
        'La matrice $B$ a ' + texteligne[1] + 'et ' + textecolonne[1] + '. '
      if (nbcolonnes[0] === nblignes[1]) {
        const produit = matrices[0].multiply(matrices[1])
        const produitprint = produit.toTex()
        texteCorr += `<br><br> Le produit $A \\times B$ est possible et c'est une matrice qui a ${nblignes[0]} lignes et ${nbcolonnes[1]} colonnes. `
        texteCorr += `<br><br> $ \\begin{array}{rccl} && \\textcolor{blue}{${matricesprint[1]}}& =\\textcolor{blue}{B} \\\\ \\textcolor{red}{A} = &\\textcolor{red}{${matricesprint[0]}} & ${produitprint} & = AB \\end{array} $`
        // texteCorr += `Par exemple, on obtient $${math.parse(matrices[0].subset(index(nblignes[0], range(0, nbcolonnes[0]))).toString()).toTex().replaceAll('bmatrix', 'pmatrix')} $ `
        const l1 = matrices[0].subset(nblignes[0] - 1, range(0, nbcolonnes[0]))
        const c1 = matrices[1].subset(range(0, nblignes[1]), nbcolonnes[1] - 1)
        let detail = `c_{${nblignes[0]}, ${nbcolonnes[1]}}  = `
        // Vérification si l1 est un nombre ou un objet sans dimension
        if (
          typeof l1 === 'number' ||
          l1.size === undefined ||
          l1.size()[0] === undefined
        ) {
          // Cas où l1 est un nombre scalaire
          for (let i = 0; i < nbcolonnes[0]; i++) {
            const valeurL1 = typeof l1 === 'number' ? l1 : l1.subset(0, 0)
            const valeurC1 = typeof c1 === 'number' ? c1 : c1.subset(i, 0)
            detail +=
              '\\textcolor{red}{' +
              ecritureParentheseSiMoins(valeurL1.toString()) +
              '} \\times \\textcolor{blue}{' +
              ecritureParentheseSiMoins(valeurC1.toString()) +
              '}'
            if (i < nbcolonnes[0] - 1) {
              detail += '+'
            } else {
              detail += ' = '
            }
          }
        } else {
          // Cas normal où l1 est un vecteur ou une matrice
          for (let i = 0; i < nbcolonnes[0]; i++) {
            detail +=
              '\\textcolor{red}{' +
              ecritureParentheseSiMoins(l1.subset(0, i).toString()) +
              '} \\times \\textcolor{blue}{' +
              ecritureParentheseSiMoins(c1.subset(i, 0).toString()) +
              '}'
            if (i < nbcolonnes[0] - 1) {
              detail += '+'
            } else {
              detail += ' = '
            }
          }
        }
        detail += `${produit.subset(nblignes[0] - 1, nbcolonnes[1] - 1)}`
        texteCorr += `<br> Le détail du calcul de $c_{${nblignes[0]}, ${nbcolonnes[1]}}$ où $c_{${nblignes[0]}, ${nbcolonnes[1]}}$ est le coefficient de la $${nblignes[0]}$-ème ligne et de la $${nbcolonnes[1]}$-ème colonne de la matrice $C = AB$ donne : <br> $${detail}$.`
        texteCorr += `<br> On trouve $A \\times B =  ${produitprint}$.`
      } else {
        texteCorr +=
          "<br><br> Le produit $A \\times B$ n'est pas possible car le nombre de colonnes de $A$ n'est pas égal au nombre de lignes de $B$."
      }
      if (nbcolonnes[1] === nblignes[0]) {
        const produit = matrices[1].multiply(matrices[0])
        const produitprint = produit.toTex()
        texteCorr += `<br><br> Le produit $B \\times A$ est possible et c'est une matrice qui a ${nblignes[1]} lignes et ${nbcolonnes[0]} colonnes. `
        texteCorr += `<br><br> $ \\begin{array}{rccl} && \\textcolor{red}{${matricesprint[0]}}& =\\textcolor{red}{A} \\\\ \\textcolor{blue}{B} = &\\textcolor{blue}{${matricesprint[1]}} & ${produitprint} & = BA \\end{array} $`
        const l1 = matrices[1].subset(nblignes[1] - 1, range(0, nbcolonnes[1]))
        const c1 = matrices[0].subset(range(0, nblignes[0]), nbcolonnes[0] - 1)
        let detail = `c_{${nblignes[1]}, ${nbcolonnes[0]}} = `
        // Vérification si l1 est un nombre ou un objet sans dimension
        if (
          typeof l1 === 'number' ||
          l1.size === undefined ||
          l1.size()[0] === undefined
        ) {
          // Cas où l1 est un nombre scalaire
          for (let i = 0; i < nbcolonnes[1]; i++) {
            const valeurL1 = typeof l1 === 'number' ? l1 : l1.subset(0, 0)
            const valeurC1 = typeof c1 === 'number' ? c1 : c1.subset(i, 0)
            detail +=
              '\\textcolor{blue}{' +
              ecritureParentheseSiMoins(valeurL1.toString()) +
              '} \\times \\textcolor{red}{' +
              ecritureParentheseSiMoins(valeurC1.toString()) +
              '}'
            if (i < nbcolonnes[1] - 1) {
              detail += '+'
            } else {
              detail += ' = '
            }
          }
        } else {
          // Cas normal où l1 est un vecteur ou une matrice
          for (let i = 0; i < nbcolonnes[1]; i++) {
            detail +=
              '\\textcolor{blue}{' +
              ecritureParentheseSiMoins(l1.subset(index(0, i)).toString()) +
              '} \\times \\textcolor{red}{' +
              ecritureParentheseSiMoins(c1.subset(index(i, 0)).toString()) +
              '}'
            if (i < nbcolonnes[1] - 1) {
              detail += '+'
            } else {
              detail += ' = '
            }
          }
        }
        detail += `${produit.subset(nblignes[1] - 1, nbcolonnes[0] - 1)}`
        texteCorr += `<br> Le détail du calcul de $c_{${nblignes[1]}, ${nbcolonnes[0]}}$ où $c_{${nblignes[1]}, ${nbcolonnes[0]}}$ est le coefficient de la $${nblignes[1]}$-ème ligne et de la $${nbcolonnes[0]}$-ème colonne de la matrice $C = BA$ donne : <br> $${detail}$.`
        texteCorr += `<br> On trouve $B \\times A =  ${produitprint}$.`
      } else {
        texteCorr +=
          "<br><br> Le produit $B \\times A$ n'est pas possible car le nombre de colonnes de $B$ n'est pas égal au nombre de lignes de $A$."
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, matrices)) {
        // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c, d...)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
