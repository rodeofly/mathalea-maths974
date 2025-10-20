import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  miseEnEvidence,
  texteEnCouleur,
} from '../../lib/outils/embellissements'
import { texFractionReduite } from '../../lib/outils/deprecatedFractions'
import { reduireAxPlusB } from '../../lib/outils/ecritures'
import { numAlpha, sp } from '../../lib/outils/outilString'
import { prenom } from '../../lib/outils/Personne'
import { texteGras } from '../../lib/format/style'
import { texNombre } from '../../lib/outils/texNombre'
import { fraction } from '../../modules/fractions'
import Exercice from '../Exercice'
import { randint, itemize, listeQuestionsToContenu } from '../../modules/outils'

export const titre = "Modéliser une situation à l'aide d'une équation"
export const dateDePublication = '16/12/2021'
/**
 * @author Gilles Mora
 */
export const uuid = '846b8'

export const refs = {
  'fr-fr': ['2N50-3', 'BP2RES23'],
  'fr-ch': ['10FA3-12', '11FA6-8'],
}
export default class ModeliserEquations extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Choix des questions',
      3,
      '1 : Situations concrètes\n2 : Programmes de calculs\n3 : Mélange',
    ]

    this.nbQuestions = 1
    // this.nbQuestionsModifiable = false
    this.nbCols = 2 // Uniquement pour la sortie LaTeX
    this.nbColsCorr = 2 // Uniquement pour la sortie LaTeX
    this.sup = 3
  }

  nouvelleVersion() {
    let typeDeQuestionsDisponibles
    if (this.sup === 1) {
      typeDeQuestionsDisponibles = ['typeE1', 'typeE2', 'typeE3', 'typeE4']
    } else if (this.sup === 2) {
      typeDeQuestionsDisponibles = ['typeE5', 'typeE6', 'typeE7', 'typeE8']
    } else {
      typeDeQuestionsDisponibles = [
        'typeE1',
        'typeE2',
        'typeE3',
        'typeE4',
        'typeE5',
        'typeE6',
        'typeE7',
        'typeE8',
      ]
    }
    //
    const listeTypeQuestions = combinaisonListes(
      typeDeQuestionsDisponibles,
      this.nbQuestions,
    ) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      // Boucle principale où i+1 correspond au numéro de la question
      let texte = ''
      let texteCorr = ''
      const variables: number[] = []
      switch (
        listeTypeQuestions[i] // Suivant le type de question, le contenu sera différent
      ) {
        case 'typeE1':
          {
            const j = randint(10, 20) * 10 // prime janvier
            const f = randint(15, 20) * 10 // prime fevrier
            const b = randint(6, 9) * 10
            const a = f - j + b // augmentation
            const t = randint(3, 6)
            const taux = fraction(t, 100)
            texte = `  Le salaire mensuel d'un commercial est composé d'un salaire fixe auquel
                  s'ajoute une prime suivant ses objectifs.<br>
                   Au mois de janvier, son salaire fixe est $x$ € et sa prime a été de $${j}$ €.  <br>
                  Au mois de février son salaire fixe a augmenté de $${t}~\\%$ et il reçoit une prime de $${f}$ €. <br>
                  Globalement, son salaire au mois
                  de février a augmenté de $${a}$ € par rapport à celui du mois de janvier. <br>
                  ${numAlpha(0)} Exprimer en fonction de $x$ son salaire au mois de janvier, puis celui du mois de février.<br>
                  ${numAlpha(1)} Déterminer le salaire du commercial au mois de janvier (arrondir à l'euro près).<br>
              `

            texteCorr = `${numAlpha(0)} Le salaire du mois de janvier en fonction de $x$ est : $x+${j}$.<br>
            Le salaire du mois de février en fonction de $x$ est : $\\left(1+${taux.texFraction}\\right)x+${f}=${texNombre(1 + t / 100)}x+${f}$.<br>
            ${numAlpha(1)} Globalement, le salaire au mois
                  de février a augmenté de $${a}$ € par rapport à celui du mois de janvier, cela signifie que le salaire du
                   mois de janvier augmenté de $${a}$ € est donc égal au salaire du mois de février.<br>
            Ainsi, $(x+${j})+${a}=${texNombre(1 + t / 100)}x+${f}$<br>
            On résout l'équation :<br>
          ${sp(8)} $ \\begin{aligned}
                        x+${texNombre(j + a)}&=(1+${texNombre(t / 100)})x+${f}\\\\
                       x+${texNombre(j + a)}&=${texNombre(1 + t / 100)}x+${f}\\\\
                       x+${texNombre(j + a)}-${miseEnEvidence(texNombre(j + a))}&=${texNombre(1 + t / 100)}x+${f}-${miseEnEvidence(texNombre(j + a))}\\\\
            x&=${texNombre(1 + t / 100)}x${texNombre(f - j - a)}\\\\
            x-${miseEnEvidence(texNombre(1 + t / 100))}${miseEnEvidence('\\textit{x}')}&=${texNombre(1 + t / 100)}x${texNombre(f - j - a)}-${miseEnEvidence(texNombre(1 + t / 100))}${miseEnEvidence('\\textit{x}')}\\\\
            \\dfrac{${texNombre(-t / 100)}x}{${miseEnEvidence(texNombre(-t / 100))}}&=\\dfrac{${texNombre(f - j - a)}}{${miseEnEvidence(texNombre(-t / 100))}}\\\\
            x&=\\dfrac{${texNombre(f - j - a)}}{${texNombre(-t / 100)}}
            \\end{aligned}$<br>`
            if (
              Math.round((f - j - a) / (-t / 100)) ===
              (f - j - a) / (-t / 100)
            ) {
              texteCorr += ` ${sp(40)}$ \\begin{aligned}
            x&= ${Math.round((f - j - a) / (-t / 100))}
            \\end{aligned}$<br>`
            } else {
              texteCorr += ` ${sp(40)}$ \\begin{aligned}
            x&\\simeq ${Math.round((f - j - a) / (-t / 100))}
            \\end{aligned}$<br>`
            }

            texteCorr += `Puisque le salaire est composé du fixe et de la prime, le salaire de ce commercial au mois de janvier a été de :
      $${Math.round((f - j - a) / (-t / 100))}+${j}$ €, soit  $${Math.round((f - j - a) / (-t / 100) + j)}$ €.`
            variables.push(a, b, f, j, t)
          }
          break
        case 'typeE2':
          {
            const a = randint(20, 30) //
            const b = randint(a + 5, 50) //
            let c = randint(20, 35)
            const d = randint(15, c - 1) / 100
            c = c / 100
            texte = `  Une société de location de véhicules propose deux tarifs :<br>
                $\\bullet$ Tarif A : un forfait de $${a}$ € et $${texNombre(c)}$ € par km parcouru ;<br>
                $\\bullet$  Tarif B : un forfait de $${b}$ € et $${texNombre(d)}$ € par km parcouru ;<br>
          
                       Pour quelle distance (arrondie au km près), les deux tarifs sont-ils égaux ?<br>
                                      `
            texteCorr = `En notant $x$, le nombre de km parcourus, on a :<br>
                $\\bullet$ Avec le tarif A, le prix à payer est : $${reduireAxPlusB(c, a)}$ ;<br>
                $\\bullet$  Avec le tarif B, le prix à payer est : $${reduireAxPlusB(d, b)}$ ;<br>
                          Les deux tarifs sont identiques lorsque : $${reduireAxPlusB(c, a)}=${reduireAxPlusB(d, b)}$.<br>
                On résout l'équation :<br>
                $\\begin{aligned}
                ${texNombre(c)}x+${a}&=${texNombre(d)}x+${b}\\\\
                 ${texNombre(c)}x-${miseEnEvidence(texNombre(d))}${miseEnEvidence('\\textit{x}')}+${a}&=${texNombre(d)}x+${b}-${miseEnEvidence(texNombre(d))}${miseEnEvidence('\\textit{x}')}\\\\
                       ${texNombre(c - d)}x+${a}&=${b}\\\\
                ${texNombre(c - d)}x+${a}-${miseEnEvidence(texNombre(a))}&=${b}-${a}\\\\
                ${texNombre(c - d)}x&=${b - a}\\\\
        \\dfrac{${texNombre(c - d)}x}{${miseEnEvidence(texNombre(c - d))}}&=\\dfrac{${b - a}}{${miseEnEvidence(texNombre(c - d))}}\\\\
        \\end{aligned}$<br>`
            if (Math.round((b - a) / (c - d)) === (b - a) / (c - d)) {
              texteCorr += ` ${sp(40)}$ \\begin{aligned}
                            x&= ${Math.round((b - a) / (c - d))}
                            \\end{aligned}$<br>
                                            C'est pour une distance de $${Math.round((b - a) / (c - d))}$ km que les deux tarifs sont identiques.
               `
            } else {
              texteCorr += ` ${sp(40)}$ \\begin{aligned}
                            x&\\simeq ${Math.round((b - a) / (c - d))}
                            \\end{aligned}$<br>
                                         C'est pour une distance d'environ $${Math.round((b - a) / (c - d))}$ km que les deux tarifs sont identiques.
                                `
            }
            variables.push(a, b, c, d)
          }
          break
        case 'typeE3':
          {
            const a = randint(4, 10) / 100 //
            const b = randint(300, 400) //
            const c = randint(Math.floor((a + 1) * 100), 12)
            texte = `  Une usine fabrique des bouteilles en verre. <br>
            En notant $x$ le nombre de bouteilles fabriquées dans une journée, les coûts de fabrication en euros, sont donnés par :
            $${texNombre(a)}x+${texNombre(b)}$.<br>
            Ces bouteilles sont toutes revendues au tarif unitaire de $${texNombre(c)}$ €.<br>
            On appelle recette le produit du nombre de bouteilles vendues par le prix unitaire.<br>
            On appelle résultat net de l'entreprise (lorsqu'elle produit et vend $x$ bouteilles), la différence entre la recette et les coûts de fabrication.<br>
      
      Combien de bouteilles l'entreprise doit-elle produire et vendre pour que le résultat net soit nul ?
            <br>
                          `
            texteCorr = `
      $\\bullet$ La recette est donnée par : $${texNombre(c)}\\times x=${texNombre(c)}x$ ;<br>
      $\\bullet$ Les coûts de fabrication sont donnés par : $${texNombre(a)}x+${texNombre(b)}$ ;<br>
      $\\bullet$ Le résultat net est donné par la différence entre la recette et les coûts, donc par :<br>
       $${texNombre(c)}x-(${texNombre(a)}x+${texNombre(b)})=${texNombre(c)}x-${texNombre(a)}x-${texNombre(b)}=${texNombre(c - a)}x-${texNombre(b)}$.<br>
            Le résultat est nul lorsque  : $${texNombre(c - a)}x-${texNombre(b)}=0$<br>
            On résout l'équation :<br>
           $\\begin{aligned}
                  ${texNombre(c - a)}x-${texNombre(b)}+${miseEnEvidence(texNombre(b))}&=0+${miseEnEvidence(texNombre(b))}\\\\
            ${texNombre(c - a)}x&=${texNombre(b)}\\\\
            \\dfrac{${texNombre(c - a)}x}{${miseEnEvidence(texNombre(c - a))}}&=\\dfrac{${texNombre(b)}}{${miseEnEvidence(texNombre(c - a))}}\\\\
                 \\end{aligned}$<br>`
            if (Math.round(b / (c - a)) === b / (c - a)) {
              texteCorr += `${sp(37)} $\\begin{aligned}
         x&=${Math.round(b / (c - a))}
         \\end{aligned}$<br>
            C'est pour une production de $${Math.round(b / (c - a))}$ bouteilles  que le résultat net de l'entreprise est nul.
        `
            } else {
              texteCorr += `${sp(37)} $\\begin{aligned}
        x&\\simeq${Math.round(b / (c - a))}
        \\end{aligned}$<br>
           C'est pour une production d'environ $${Math.round(b / (c - a))}$ bouteilles  que le résultat net de l'entreprise est nul.
       `
            }
            variables.push(a, b, c)
          }
          break
        case 'typeE4':
          {
            const a = randint(48, 55) //
            const b = randint(3, 6) //
            const N = randint(12, 25)
            const d = randint(3, 5)
            const c = N * (a + b) - d * a

            texte = `  $${a}$ élèves  d'un lycée font une sortie théâtre. Ils sont accompagnés de $${b}$ adultes. <br>
            Les élèves bénéficient d'un tarif réduit. Ils paient $${d}$ € de moins que les adultes. <br>
            Le coût total de cette sortie (élèves $+$ adultes) est de $${c}$ €. <br>
            En notant $x$ le tarif pour un adulte, modéliser la situation à l'aide d'une équation puis déterminer le prix de la place pour un adulte.
      
              `

            texteCorr = `En notant $x$ le tarif pour un adulte,  celui d'un élève est $(x-${d})$ €. <br>
            Puisque le coût total est de $${c}$ €, on obtient l'équation : <br>
            $\\begin{aligned}
            ${a}\\times (x-${d})+${b}\\times x &=${c}\\\\
                        ${texNombre(a)}x-${texNombre(a * d)}+${b} x &=${c}\\\\
            ${texNombre(a + b)}x-${texNombre(a * d)} &=${c}\\\\
            ${texNombre(a + b)}x-${texNombre(a * d)}+${miseEnEvidence(texNombre(a * d))} &=${c}+${miseEnEvidence(texNombre(a * d))}\\\\
            ${texNombre(a + b)}x &=${texNombre(c + a * d)}\\\\
            \\dfrac{${texNombre(a + b)}x}{${miseEnEvidence(texNombre(a + b))}} &= \\dfrac{${texNombre(c + a * d)}}{${miseEnEvidence(texNombre(a + b))}}\\\\
            x &= ${texNombre((c + a * d) / (a + b))}\\end{aligned}$<br>
      Le prix de la place de théâtre pour un adulte est : $${texNombre((c + a * d) / (a + b))}$ €.
              `
            variables.push(a, b, c, d)
          }
          break
        case 'typeE5':
          {
            const a = randint(4, 10)
            const b = randint(2, 10)
            const c = randint(2, 10)
            const res = randint(-5, 5)
            texte = ` ${texteGras('Voici un programme de calcul :')} `
            texte += itemize([
              'Choisir un nombre',
              `Multiplier ce nombre par $${a}$`,
              `Ajouter $${b}$`,
              `Multiplier le résultat par $${c}$`,
            ])
            texte += `Quel nombre doit-on choisir au départ pour obtenir $${res}$ comme résultat final ?<br>
               On donnera le résultat sous la forme d'une fraction irréductible ou d'un nombre entier le cas échéant.`

            texteCorr = `En notant $x$ le nombre choisi au départ, on obtient  :<br>
          $\\bullet$ Multiplier ce nombre par $${a}$ : ${sp(6)}$${a}\\times x=${a}x$ ;<br>
          $\\bullet$ Ajouter $${b}$ : ${sp(6)}$${a}x+${b}$ ; <br>
          $\\bullet$ Multiplier le résultat par $${c}$ :${sp(6)}$${c}\\times (${a}x+${b})=${texNombre(c * a)}x+${texNombre(b * c)}$.<br>
          <br>
          On cherche $x$ tel que : <br>
          $\\begin{aligned}
          ${texNombre(c * a)}x+${texNombre(b * c)}&=${texNombre(res)}\\\\
         ${texNombre(c * a)}x+${texNombre(b * c)}-${miseEnEvidence(texNombre(b * c))}&=${texNombre(res)}-${miseEnEvidence(texNombre(b * c))}\\\\
         ${texNombre(c * a)}x&=${texNombre(res - b * c)}\\\\
         \\dfrac{${texNombre(c * a)}x}{${miseEnEvidence(texNombre(c * a))}}&=\\dfrac{${texNombre(res - b * c)}}{${miseEnEvidence(texNombre(c * a))}}\\\\
         x&=${texFractionReduite(res - b * c, c * a)}
         \\end{aligned}$<br>
           Le nombre que l'on doit choisir pour obtenir $${res}$ à la fin du programme est :  $${texFractionReduite(res - b * c, c * a)}$.
                     `
            variables.push(a, b, c, res)
          }

          break
        case 'typeE6':
          {
            const a = randint(2, 10)
            const b = randint(2, 10)
            const c = randint(2, 10, [a])
            const d = prenom()
            const e = prenom()

            texte = `${d} choisit un nombre, le multiplie par $${a}$ puis ajoute $${b}$.  <br>
           ${e} choisit le même nombre, lui ajoute $${c}$, multiplie le résultat par le nombre de départ, puis soustrait le carré du nombre de départ.<br>
            Quel nombre doivent-ils choisir au départ pour obtenir le même résultat ?`

            texteCorr = `En notant $x$ le nombre choisi au départ, on obtient :<br>
          $\\bullet$  avec le calcul de ${d} :
      $${a}\\times x+${b}=${a}x+${b}$ ;<br>
              $\\bullet$ avec celui de ${e}, on obtient : <br>
      $(x+${c})\\times x-x^2=\\cancel{x^2}+${c}x-\\cancel{x^2}=${c}x$.<br>
      <br>
      On cherche donc $x$ tel que : <br>
      $\\begin{aligned}
      ${a}x+${b}&=${c}x\\\\
      ${a}x+${b}-${miseEnEvidence(texNombre(c))}${miseEnEvidence('\\textit{x}')}&=${c}x-${miseEnEvidence(texNombre(c))}${miseEnEvidence('\\textit{x}')}\\\\
      ${reduireAxPlusB(a - c, 0)}+${b}&=0\\\\
      ${reduireAxPlusB(a - c, 0)}+${b}-${miseEnEvidence(b)}&=0-${miseEnEvidence(b)}
      \\end{aligned}$<br>`
            if (a - c === 1) {
              texteCorr += `${sp(25)}$x=-${b}$<br>
           Le nombre commun que ${d} et ${e} doivent choisir au départ pour obtenir le même résultat est : $-${b}$.
                  `
            } else {
              texteCorr += `
            ${sp(20)}$ \\begin{aligned}
           \\dfrac{${a - c}x}{${miseEnEvidence(a - c)}}&=\\dfrac{${-b}}{${miseEnEvidence(a - c)}}\\\\
           x&=${texFractionReduite(-b, a - c)}
           \\end{aligned}$<br>
          Le nombre commun que ${d} et ${e} doivent choisir au départ pour obtenir le même résultat est : $${texFractionReduite(-b, a - c)}$.`
            }
            variables.push(a, b, c)
          }
          break

        case 'typeE7':
          {
            const a = randint(2, 8)

            const b = randint(10, 100)

            texte = `On donne les deux programmes de calcul suivants :<br>
          ${texteGras('Programme 1 :')}<br>
                 `
            texte += itemize([
              'Choisir un nombre',
              `Ajouter $${a}$`,
              'Prendre le carré du résultat',
            ])

            texte += `<br>
          ${texteGras('Programme 2 :')}<br>
                      `
            texte += itemize([
              'Choisir un nombre',
              `Multiplier par $${texNombre(2 * a)}$ `,
              `Ajouter $${b}$`,
            ])
            texte +=
              "<br>Déterminer les nombres éventuels que l'on peut entrer dans ces deux programmes pour qu'au final ils donnent le même résultat.<br><br>"
            texteCorr = `En notant $x$ le nombre choisi au départ : <br>
                 
                 On obtient avec le ${texteGras('programme 1 :')} <br>
      $\\bullet$ Ajouter $${a}$ :${sp(5)} $x+${a}$ ;<br>
      $\\bullet$ Prendre le carré du résultat :${sp(5)} $(x+${a})^2=x^2+2\\times x\\times ${a}+${a}^2=x^2+${texNombre(2 * a)}x+${texNombre(a * a)}$ ;<br>
                  <br> On obtient avec le ${texteGras('programme 2 :')} <br>
      $\\bullet$ Multiplier par $${texNombre(2 * a)}$ :${sp(5)} $x\\times ${texNombre(2 * a)}=${texNombre(2 * a)}x$ ;<br>
      $\\bullet$ Ajouter $${b}$ : ${sp(5)} $${texNombre(2 * a)}x+${b}$.<br><br>
      Les deux programmes donnent le même résultat lorsque : <br>
      $\\begin{aligned}
      x^2+${texNombre(2 * a)}x+${texNombre(a * a)}&=${texNombre(2 * a)}x+${b}\\\\
      x^2+${texNombre(2 * a)}x+${texNombre(a * a)}-${miseEnEvidence(texNombre(2 * a))}${miseEnEvidence('\\textit{x}')}&=${texNombre(2 * a)}x+${b}-${miseEnEvidence(texNombre(2 * a))}${miseEnEvidence('\\textit{x}')}\\\\
      x^2+${texNombre(a * a)}&=${b}\\\\
      x^2+${texNombre(a * a)}-${miseEnEvidence(texNombre(a * a))}&=${b}-${miseEnEvidence(texNombre(a * a))}\\\\
      x^2&=${texNombre(b - a * a)}
      \\end{aligned}$
      <br>
            `
            if (b < a * a) {
              texteCorr += `
           L'équation n'a pas de solution car $${texNombre(b - a * a)}<0$. <br>Par conséquent il n'existe pas de nombre qui donne le même résultat avec les deux programmes.
                  `
            } else {
              if (b === a * a) {
                texteCorr += `${sp(8)}$\\begin{aligned}x&=-${b}\\\\
              x&=0
              \\end{aligned}<br>
           Quand on entre $0$, les deux programmes donnent le même résultat.
                  `
              } else {
                if (
                  b - a * a === 1 ||
                  b - a * a === 4 ||
                  b - a * a === 9 ||
                  b - a * a === 16 ||
                  b - a * a === 25 ||
                  b - a * a === 36 ||
                  b - a * a === 49 ||
                  b - a * a === 64 ||
                  b - a * a === 81 ||
                  b - a * a === 100
                ) {
                  texteCorr += `${sp(10)}$x=-${Math.sqrt(b - a * a)}$ ou $x=${Math.sqrt(b - a * a)}$.<br>
              Quand on entre $-${Math.sqrt(b - a * a)}$ ou $-${Math.sqrt(b - a * a)}$, on obtient le même résultat avec les deux programmes.
                  `
                } else {
                  texteCorr += `${sp(10)}$x=-\\sqrt{${b - a * a}}$ ou $x=\\sqrt{${b - a * a}}$.<br>
              Quand on entre   $-\\sqrt{${b - a * a}}$ ou $\\sqrt{${b - a * a}}$, on obtient le même résultat avec les deux programmes.
            `
                }
              }
            }
            variables.push(a, b)
          }
          break
        case 'typeE8':
        default:
          {
            const a = randint(2, 10)
            const b = randint(2, 10)
            const c = randint(2, 10)
            const d = randint(2, 10)
            texte = `On donne les deux programmes de calcul suivants :<br>
          ${texteGras('Programme 1 :')}<br>
                   `
            texte += itemize([
              'Choisir un nombre',
              "Prendre l'opposé de ce nombre",
              `Multiplier par $${b}$`,
              `Ajouter $${a}$`,
            ])

            texte += `<br>
          ${texteGras('Programme 2 :')}<br>
                        `
            texte += itemize([
              'Choisir un nombre',
              `Multiplier par $${c}$ `,
              `Ajouter $${d}$`,
            ])
            texte += `<br>On entre le même nombre dans chacun des deux programmes de calcul et on effectue le produit de ces deux nombres. <br>
              Quel(s) nombre(s) doit-on entrer pour que ce produit soit nul ?<br><br>`
            texteCorr = `En notant $x$ le nombre choisi au départ : <br>
                   
                   On obtient avec le ${texteGras('programme 1 :')} :<br>
        $\\bullet$ Prendre l'opposé de ce nombre :${sp(10)} $-x$ <br>
        $\\bullet$ Multiplier par $${b}$ :${sp(10)} $${b}\\times (-x)= -${b}x$ <br>
        $\\bullet$ Ajouter $${a}$ :${sp(10)} $-${b}x+${a}$ <br>
                <br> On obtient avec le ${texteGras('programme 1 :')} :<br>
        $\\bullet$ Multiplier par $${c}$ :${sp(10)} $x\\times ${c}=${c}x$ <br>
        $\\bullet$ Ajouter $${d}$ : ${sp(10)} $${c}x+${d}$<br>
        
        Le produit des deux nombres obtenu à l'issue de ces deux programmes est  : $(-${b}x+${a})(${c}x+${d})$<br>
        On cherche les valeurs de $x$ pour que ce produit soit nul c'est-à-dire les solutions de l'équation : $(-${b}x+${a})(${c}x+${d})=0$.<br>
        
        On reconnaît une équation produit nul.<br>
        ${texteEnCouleur('Un produit est nul si et seulement si au moins un de ses facteurs est nul.')}<br>
        
        $\\begin{aligned}
        -${b}x+${a}=0  &${sp(2)}\\text{ou}${sp(2)}  ${c}x+${d}=0\\\\
                -${b}x+${a}-${miseEnEvidence(a)}=0-${miseEnEvidence(a)}&${sp(2)}\\text{ou}${sp(2)} ${c}x+${d}-${miseEnEvidence(d)}=0-${miseEnEvidence(d)}\\\\
        -${b}x=-${a}&${sp(2)}\\text{ou}${sp(2)}${c}x=${-d}\\\\
        \\dfrac{-${b}x}{${miseEnEvidence(-b)}}=\\dfrac{-${a}}{${miseEnEvidence(-b)}} &${sp(2)}\\text{ou} ${sp(2)}\\dfrac{-${d}x}{${miseEnEvidence(c)}}=\\dfrac{-${d}}{${miseEnEvidence(c)}}\\\\
        x=${texFractionReduite(-a, -b)}&${sp(2)}\\text{ou}${sp(2)}x=${texFractionReduite(-d, c)}\\end{aligned}$<br>
              On obtient $0$ en faisant le produit des deux résultats de ces programmes en choisissant comme nombres au départ : $${texFractionReduite(-a, -b)}$ ou $${texFractionReduite(-d, c)}$.
              `
            variables.push(a, b, c, d)
          }
          break
      }
      if (this.questionJamaisPosee(i, variables.map(String).join())) {
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
