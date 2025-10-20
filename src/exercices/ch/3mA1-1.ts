import { Polynome } from '../../lib/mathFonctions/Polynome'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { ecritureAlgebrique } from '../../lib/outils/ecritures'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import FractionEtendue from '../../modules/FractionEtendue'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const titre =
  "Calculer une limite d'une fonction rationnelle sans indétermination ou avec une indétermination de type 1/0 ou 0/0"
export const dateDePublication = '17/09/2025'
export const interactifReady = false
export const uuid = '04b1e'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['3mA1-1'],
}

/**
 * Calculer une limite d'une fonction rationnelle type 1/0 ou 0/0
 * @author Nathan Scheinmann
 */

export default class ExerciceTangenteCourbe extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 3
    this.sup = 7
    this.sup2 = true
    this.sup3 = false
    this.sup4 = false
    this.besoinFormulaireTexte = [
      'Type de questions',
      [
        'Nombres séparés par des tirets  :',
        '1 : 1/0 avec limite infinie',
        "2 : 1/0 avec limite qui n'existe pas",
        "3 : 0/0 avec limite qui n'existe pas",
        '4 : 0/0 avec limite finie',
        '5 : 0/0 avec limite infinie',
        '6 : Sans indétermination',
        '7 : Mélange',
      ].join('\n'),
    ]
    this.besoinFormulaire2CaseACocher = ['Degré des polynômes bas', false]
    this.besoinFormulaire3CaseACocher = ['Forme factorisée', false]
    this.besoinFormulaire4CaseACocher = [
      'Coefficients dominants égaux à 1',
      false,
    ]
  }

  nouvelleVersion() {
    const typesDeQuestionsDisponibles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 6,
      melange: 7,
      defaut: 7,
      nbQuestions: this.nbQuestions,
    })
    const listeTypeDeQuestions = combinaisonListes(
      typesDeQuestionsDisponibles,
      this.nbQuestions,
    )
    function construireFractionRestante(
      limite: number,
      ajoutNum: number,
      ajoutDen: number,
    ) {
      const listeRacinesNum = []
      const listeRacinesDen = []
      for (let i = 0; i < ajoutNum; i++) {
        listeRacinesNum.push(randint(-3, 3, [limite]))
      }
      for (let i = 0; i < ajoutDen; i++) {
        listeRacinesDen.push(randint(-3, 3, [limite]))
      }
      return [listeRacinesNum, listeRacinesDen]
    }
    function produitLatex(coeff: number, liste: Polynome[]) {
      let texte = ''
      let coefficient = coeff

      // Compter les multiplicités de chaque facteur
      const factorCount = new Map<string, number>()

      for (let i = 0; i < liste.length; i++) {
        const factorLatex = liste[i].toLatex()
        factorCount.set(factorLatex, (factorCount.get(factorLatex) || 0) + 1)
        // compte le nombre de '-x' dans la liste et multiplique le coeff par -1 si ce nombre est impair
        if (factorLatex === '-x') coefficient = -coefficient
      }

      // Construire le texte avec les multiplicités
      const factorEntries = Array.from(factorCount.entries()).filter(
        ([factorLatex]) => factorLatex !== '-x',
      )

      for (const [factorLatex, count] of factorEntries) {
        // Seulement enlever les parenthèses pour 'x' simple
        const factorText = factorLatex === 'x' ? 'x' : `(${factorLatex})`

        if (count === 1) {
          texte += factorText
        } else {
          texte += `${factorText}^{${count}}`
        }
      }

      texte =
        (coefficient === 1 ? '' : coefficient === -1 ? '-' : coefficient) +
        texte
      texte = texte === '' ? '1' : texte
      texte = texte === '-' ? '-1' : texte
      return texte
    }

    function formatFactorizedPolynomial(
      racines: number[],
      limite: number,
      coefficient: number,
      sup3?: boolean,
    ): string {
      // When sup3 is true, return factored expression using produitLatex
      if (sup3) {
        const listeFacteurs = []
        for (let i = 0; i < racines.length; i++) {
          listeFacteurs.push(Polynome.fromRoots([racines[i]]))
        }
        return produitLatex(coefficient, listeFacteurs)
      }

      const multipliciteFacteurLimite = racines.filter(
        (r) => r === limite,
      ).length
      const racinesSansLimites = racines.filter((r) => r !== limite)
      let result = ''

      // Ajouter le coefficient si différent de 1
      if (coefficient !== 1) {
        result += coefficient === -1 ? '-' : coefficient.toString()
      }

      // Ajouter le facteur (x - limite)^multiplicité si la multiplicité > 0
      if (multipliciteFacteurLimite > 0) {
        const facteurLimite =
          limite === 0 ? 'x' : `(x${limite > 0 ? '-' : '+'}${Math.abs(limite)})`
        if (multipliciteFacteurLimite === 1) {
          result += facteurLimite
        } else {
          result += `${facteurLimite}^{${multipliciteFacteurLimite}}`
        }
      }

      // Ajouter le polynôme restant si il y a d'autres racines
      if (racinesSansLimites.length > 0) {
        const polynomeRestant = Polynome.fromRoots(racinesSansLimites)
        const polynomeRestantLatex = polynomeRestant.toLatex()

        // Si le polynôme restant est juste 'x' ou un monôme simple
        if (
          polynomeRestantLatex === 'x' ||
          polynomeRestantLatex === '-x' ||
          (polynomeRestantLatex.match(/^-?\d*x(\^{?\d+}?)?$/) &&
            !polynomeRestantLatex.includes('+'))
        ) {
          result += polynomeRestantLatex
        } else {
          result += `(${polynomeRestantLatex})`
        }
      }

      return result || '1'
    }
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''
      const coeffNum = this.sup4 ? 1 : randint(-3, 3, [0])
      const coeffDen = this.sup4 ? 1 : randint(-3, 3, [0])
      const limite = randint(-4, 4)
      let listeRacinesNum = <number[]>[]
      let listeRacinesDen = <number[]>[]
      texte += 'Calculer '
      const typeDeQuestion = listeTypeDeQuestions[i]
      switch (typeDeQuestion) {
        case 1:
          {
            // 1/0 avec limite infinie
            const degreNum = this.sup2 ? randint(0, 1) : randint(2, 4)
            const degreDen = this.sup2 ? 2 : randint(2, 4)
            const listeRacines = construireFractionRestante(
              limite,
              degreNum,
              degreDen - 2,
            )
            listeRacinesNum = listeRacines[0]
            listeRacinesDen = listeRacines[1]
            listeRacinesDen.push(limite, limite)
          }
          break
        case 2:
          {
            // 1/0 avec limite qui n'existe pas
            const degreNum = this.sup2 ? randint(0, 1) : randint(2, 4)
            const degreDen = this.sup2 ? 1 : randint(2, 4)
            const listeRacines = construireFractionRestante(
              limite,
              degreNum,
              degreDen - 1,
            )
            listeRacinesNum = listeRacines[0]
            listeRacinesDen = listeRacines[1]
            listeRacinesDen.push(limite)
          }
          break
        case 3:
          {
            // 0/0 avec limite qui n'existe pas
            const degreNum = this.sup2 ? 1 : randint(2, 4)
            const degreDen = this.sup2 ? 2 : randint(2, 4)
            const listeRacines = construireFractionRestante(
              limite,
              degreNum - 1,
              degreDen - 2,
            )
            listeRacinesNum = listeRacines[0]
            listeRacinesDen = listeRacines[1]
            listeRacinesNum.push(limite)
            listeRacinesDen.push(limite, limite)
          }
          break
        case 4:
          {
            // 0/0 avec limite finie
            const degreNum = this.sup2 ? 1 : randint(2, 4)
            const degreDen = this.sup2 ? 2 : randint(2, 4)
            const listeRacines = construireFractionRestante(
              limite,
              degreNum - 1,
              degreDen - 1,
            )
            listeRacinesNum = listeRacines[0]
            listeRacinesDen = listeRacines[1]
            listeRacinesNum.push(limite)
            listeRacinesDen.push(limite)
          }
          break
        case 5:
          {
            // 0/0 avec limite infinie
            const degreNum = this.sup2 ? 1 : randint(2, 4)
            const degreDen = this.sup2 ? 3 : randint(3, 4)
            const listeRacines = construireFractionRestante(
              limite,
              degreNum - 1,
              degreDen - 3,
            )
            listeRacinesNum = listeRacines[0]
            listeRacinesDen = listeRacines[1]
            listeRacinesNum.push(limite)
            listeRacinesDen.push(limite, limite, limite)
          }
          break
        case 6:
          {
            // Sans indétermination
            const degreNum = this.sup2 ? randint(1, 2) : randint(1, 4)
            const degreDen = this.sup2 ? randint(1, 2) : randint(1, 4)
            const listeRacines = construireFractionRestante(
              limite,
              degreNum,
              degreDen,
            )
            listeRacinesNum = listeRacines[0]
            listeRacinesDen = listeRacines[1]
          }
          break
      }
      function removeFirst<T>(arr: T[], value: T): T[] {
        const index = arr.indexOf(value)
        if (index === -1) {
          return arr.slice() // return a shallow copy
        }
        return arr.slice(0, index).concat(arr.slice(index + 1))
      }
      const listeNumSansUneRacineLimite = removeFirst(listeRacinesNum, limite)
      const listeDenSansUneRacineLimite = removeFirst(listeRacinesDen, limite)
      const polyNum = Polynome.fromRoots(listeRacinesNum).multiply(coeffNum)
      const polyDen = Polynome.fromRoots(listeRacinesDen).multiply(coeffDen)
      let numerateurTex = polyNum.toLatex()
      let denominateurTex = polyDen.toLatex()
      if (this.sup3) {
        const listeFacteursNum = []
        for (let i = 0; i < listeRacinesNum.length; i++) {
          listeFacteursNum.push(Polynome.fromRoots([listeRacinesNum[i]]))
        }
        const listeFacteursDen = []
        for (let i = 0; i < listeRacinesDen.length; i++) {
          listeFacteursDen.push(Polynome.fromRoots([listeRacinesDen[i]]))
        }
        numerateurTex = produitLatex(coeffNum, listeFacteursNum)
        denominateurTex = produitLatex(coeffDen, listeFacteursDen)
      }
      texte = 'Calculer $\\displaystyle\\lim_{x \\to ' + limite + '}'
      texte += `\\dfrac{${numerateurTex}}{${denominateurTex}}$`
      texteCorr += `On commence par vérifier si la limite est indéterminée et si c'est le cas, de quel type d'indétermination il s'agit.<br> Notons la fraction rationnelle $\\dfrac{P(x)}{Q(x)}=\\dfrac{${numerateurTex}}{${denominateurTex}}$. On évalue le dénominateur en $x=${limite}$. On a $Q(${limite})=${polyDen.image(limite)}$.<br>`
      switch (typeDeQuestion) {
        case 1:
        case 2:
          texteCorr += `La limite est n'est pas finie.<br> Puisque $P(${limite})=${polyNum.image(
            limite,
          )}\\neq 0$, on a une limite du type « $\\dfrac{1}{0}$ ».<br>`
          if (!this.sup3) {
            if (listeRacinesDen.length > 1) {
              texteCorr += `On met autant que possible en évidence au dénominateur le facteur $x${ecritureAlgebrique(-limite)}$ (en utilisant la division polynomiale ou les identités remarquables).<br> On obtient $Q(x)=${formatFactorizedPolynomial(listeRacinesDen, limite, coeffDen, this.sup3)}$.<br>`
            }
          }
          break
        case 3:
        case 4:
        case 5:
          texteCorr += `La limite est indéterminée.<br> Puisque $P(${limite})=${polyNum.image(
            limite,
          )}$, l'indétermination est du type « $\\dfrac{0}{0}$ ».<br>`
          if (!this.sup3) {
            if (listeRacinesDen.length > 1 && listeRacinesNum.length > 1) {
              texteCorr += `On met autant que possible en évidence au numérateur et au dénominateur le facteur $x${ecritureAlgebrique(-limite)}$ (en utilisant la division polynomiale ou les identités remarquables).<br>`
              texteCorr += `$P(x)=${formatFactorizedPolynomial(listeRacinesNum, limite, coeffNum, this.sup3)}$<br>`
              texteCorr += `$Q(x)=${formatFactorizedPolynomial(listeRacinesDen, limite, coeffDen, this.sup3)}$<br>`
            } else if (listeRacinesDen.length > 1) {
              texteCorr += `On met autant que possible en évidence au dénominateur le facteur $x${ecritureAlgebrique(-limite)}$ (en utilisant la division polynomiale ou les identités remarquables).<br>`
              texteCorr += `$Q(x)=${formatFactorizedPolynomial(listeRacinesDen, limite, coeffDen, this.sup3)}$<br>`
            } else if (listeRacinesNum.length > 1) {
              texteCorr += `On met autant que possible en évidence au numérateur le facteur $x${ecritureAlgebrique(-limite)}$ (en utilisant la division polynomiale ou les identités remarquables).<br>`
              texteCorr += `$P(x)=${formatFactorizedPolynomial(listeRacinesNum, limite, coeffNum, this.sup3)}$<br>`
            }
          }
          break
        case 6:
          texteCorr += `La limite n'est pas indéterminée.<br> Ainsi, 
          $\\displaystyle\\lim_{x \\to ${limite}} \\dfrac{P(x)}{Q(x)} = \\dfrac{\\displaystyle\\lim_{x \\to ${limite}} P(x)}{\\displaystyle\\lim_{x \\to ${limite}}Q(x)} = \\dfrac{P(${limite})}{Q(${limite})} = ${miseEnEvidence(`${new FractionEtendue(polyNum.image(limite), polyDen.image(limite)).texFractionSimplifiee}`)}$.`
      }
      switch (typeDeQuestion) {
        case 3:
        case 4:
        case 5:
          texteCorr += `On a $\\dfrac{P(x)}{Q(x)} = \\dfrac{${formatFactorizedPolynomial(listeRacinesNum, limite, coeffNum, this.sup3)}}{${formatFactorizedPolynomial(listeRacinesDen, limite, coeffDen, this.sup3)}} \\stackrel{x\\neq ${limite}}{=}\\dfrac{${formatFactorizedPolynomial(listeNumSansUneRacineLimite, limite, coeffNum, this.sup3)}}{${formatFactorizedPolynomial(listeDenSansUneRacineLimite, limite, coeffDen, this.sup3)}}$.<br>`
          break
      }
      switch (typeDeQuestion) {
        case 1:
        case 2:
          {
            const signeDenDroite = polyDen.image(limite + 0.01) < 0 ? -1 : 1
            const signeDenGauche = polyDen.image(limite - 0.01) < 0 ? -1 : 1
            const signeNum = polyNum.image(limite) < 0 ? -1 : 1
            texteCorr += `On calcule les limites à droite et à gauche pour déterminer l'existence de la limite. <br> On calcule la limite à droite <br>
            $\\begin{aligned}
            \\displaystyle\\lim_{x \\to ${limite}^+} \\dfrac{P(x)}{Q(x)} &= \\dfrac{\\displaystyle\\lim_{x \\to ${limite}^+} P(x)}{\\displaystyle\\lim_{x \\to ${limite}^+}Q(x)} \\\\
            &=\\dfrac{\\displaystyle\\lim_{x \\to ${limite}^+} ${numerateurTex}}{\\displaystyle\\lim_{x \\to ${limite}^+}${denominateurTex}}.\\end{aligned}$<br>
            On a 
            $\\displaystyle\\lim_{x \\to ${limite}^+} ${numerateurTex}= ${polyNum.image(limite)}$
            et  
            $ \\displaystyle\\lim_{x \\to ${limite}^+}${denominateurTex}=0^${signeDenDroite < 0 ? '-' : '+'}$.<br> D'où $\\displaystyle\\lim_{x \\to ${limite}^+} \\dfrac{P(x)}{Q(x)}=${signeDenDroite * signeNum < 0 ? '-' : '+'}\\infty$<br> On calcule la limite à gauche :<br>
            $\\begin{aligned}
            \\displaystyle\\lim_{x \\to ${limite}^-} \\dfrac{P(x)}{Q(x)} &= \\dfrac{\\displaystyle\\lim_{x \\to ${limite}^- } P(x)}{\\displaystyle\\lim_{x \\to ${limite}^-}Q(x)} \\\\
            &= \\dfrac{\\displaystyle\\lim_{x \\to ${limite}^- } ${numerateurTex}}{\\displaystyle\\lim_{x \\to ${limite}^-}${denominateurTex}}.\\end{aligned}$
            <br>
            On a
            $\\displaystyle\\lim_{x \\to ${limite}^- } ${numerateurTex}= ${polyNum.image(limite)}$
            et 
            $\\displaystyle\\lim_{x \\to ${limite}^-}${denominateurTex}=0^${signeDenGauche < 0 ? '-' : '+'}$.<br>
            D'où $\\displaystyle\\lim_{x \\to ${limite}^-} \\dfrac{P(x)}{Q(x)} = ${signeDenGauche * signeNum < 0 ? '-' : '+'}\\infty.$<br>`
            if (signeDenDroite !== signeDenGauche) {
              texteCorr += `${texteEnCouleurEtGras("La limite n'existe donc pas")}.`
            } else {
              texteCorr += ` La limite vaut donc $${miseEnEvidence(
                `${signeDenDroite * signeNum < 0 ? '-' : '+'}\\infty`,
              )}.$`
            }
          }
          break
        case 3:
        case 5:
          {
            const polyDenSimplifie = Polynome.fromRoots(
              listeDenSansUneRacineLimite,
            ).multiply(coeffDen)
            const polyNumSimplifie = Polynome.fromRoots(
              listeNumSansUneRacineLimite,
            ).multiply(coeffNum)
            const signeDenDroite =
              polyDenSimplifie.image(limite + 0.01) < 0 ? -1 : 1
            const signeDenGauche =
              polyDenSimplifie.image(limite - 0.01) < 0 ? -1 : 1
            const signeNum = polyNumSimplifie.image(limite) < 0 ? -1 : 1
            texteCorr += `On se retrouve à présent dans le cas d'une limite infinie du type «$\\,\\dfrac{1}{0}\\,$». On calcule les limites à droite et à gauche pour déterminer l'existence de la limite. <br> On calcule la limite à droite :<br>
            $\\begin{aligned}
            \\displaystyle\\lim_{x \\to ${limite}^+} \\dfrac{P(x)}{Q(x)} &= \\displaystyle\\lim_{x \\to ${limite}^+}\\dfrac{${formatFactorizedPolynomial(listeNumSansUneRacineLimite, limite, coeffNum, this.sup3)}}{${formatFactorizedPolynomial(listeDenSansUneRacineLimite, limite, coeffDen, this.sup3)}} \\\\
            &= \\dfrac{\\displaystyle\\lim_{x \\to ${limite}^+}${formatFactorizedPolynomial(listeNumSansUneRacineLimite, limite, coeffNum, this.sup3)}}{\\displaystyle\\lim_{x \\to ${limite}^+}${formatFactorizedPolynomial(listeDenSansUneRacineLimite, limite, coeffDen, this.sup3)}}. \\end{aligned}$<br>
            On a 
            $\\displaystyle\\lim_{x \\to ${limite}^+}${formatFactorizedPolynomial(listeNumSansUneRacineLimite, limite, coeffNum, this.sup3)}=${polyNumSimplifie.image(limite)}$
            et 
            $\\displaystyle\\lim_{x \\to ${limite}^+}${formatFactorizedPolynomial(listeDenSansUneRacineLimite, limite, coeffDen, this.sup3)}=0^${signeDenDroite < 0 ? '-' : '+'}$.<br>
            D'où $ \\displaystyle\\lim_{x \\to ${limite}^+} \\dfrac{P(x)}{Q(x)} = ${signeDenDroite * signeNum < 0 ? '-' : '+'}\\infty.$<br>
            On calcule la limite à gauche : <br>$\\begin{aligned}
            \\displaystyle\\lim_{x \\to ${limite}^-} \\dfrac{P(x)}{Q(x)} &= \\displaystyle\\lim_{x \\to ${limite}^-}\\dfrac{${formatFactorizedPolynomial(listeNumSansUneRacineLimite, limite, coeffNum, this.sup3)}}{${formatFactorizedPolynomial(listeDenSansUneRacineLimite, limite, coeffDen, this.sup3)}} \\\\
            &=\\dfrac{\\displaystyle\\lim_{x \\to ${limite}^-}${formatFactorizedPolynomial(listeNumSansUneRacineLimite, limite, coeffNum, this.sup3)}}{\\displaystyle\\lim_{x \\to ${limite}^-}${formatFactorizedPolynomial(listeDenSansUneRacineLimite, limite, coeffDen, this.sup3)}}. \\end{aligned}$<br>
            
            On a 
            <br>$\\displaystyle\\lim_{x \\to ${limite}^-}${formatFactorizedPolynomial(listeNumSansUneRacineLimite, limite, coeffNum, this.sup3)}=${polyNumSimplifie.image(limite)}$
             et 
            $\\displaystyle\\lim_{x \\to ${limite}^-}${formatFactorizedPolynomial(listeDenSansUneRacineLimite, limite, coeffDen, this.sup3)}=0^${signeDenGauche < 0 ? '-' : '+'}$.<br>
            D'où  $\\displaystyle\\lim_{x \\to ${limite}^-} \\dfrac{P(x)}{Q(x)}=${signeDenGauche * signeNum < 0 ? '-' : '+'}\\infty.$<br>`
            if (signeDenDroite !== signeDenGauche) {
              texteCorr += `${texteEnCouleurEtGras("La limite n'existe donc pas")}.`
            } else {
              texteCorr += ` La limite vaut donc $${miseEnEvidence(
                `${signeDenDroite * signeNum < 0 ? '-' : '+'}\\infty`,
              )}.$`
            }
          }
          break
        case 4:
          texteCorr += `Cette nouvelle expression ne contient plus d'indétermination en $x=${limite}$.<br> On a donc $\\displaystyle\\lim_{x \\to ${limite}} \\dfrac{P(x)}{Q(x)} = \\displaystyle\\lim_{x \\to ${limite}} \\dfrac{${formatFactorizedPolynomial(listeNumSansUneRacineLimite, limite, coeffNum, this.sup3)}}{${formatFactorizedPolynomial(listeDenSansUneRacineLimite, limite, coeffDen, this.sup3)}}=\\dfrac{\\displaystyle\\lim_{x \\to ${limite}}${formatFactorizedPolynomial(listeNumSansUneRacineLimite, limite, coeffNum, this.sup3)}}{\\displaystyle\\lim_{x \\to ${limite}}${formatFactorizedPolynomial(listeDenSansUneRacineLimite, limite, coeffDen, this.sup3)}}=\\dfrac{${Polynome.fromRoots(listeNumSansUneRacineLimite).multiply(coeffNum).image(limite)}}{${Polynome.fromRoots(listeDenSansUneRacineLimite).multiply(coeffDen).image(limite)}}=${miseEnEvidence(`${new FractionEtendue(Polynome.fromRoots(listeNumSansUneRacineLimite).multiply(coeffNum).image(limite), Polynome.fromRoots(listeDenSansUneRacineLimite).multiply(coeffDen).image(limite)).texFractionSimplifiee}`)}$.`
          break
      }
      if (
        this.questionJamaisPosee(
          i,
          listeRacinesDen[0],
          listeRacinesNum[0],
          listeRacinesDen[-1],
          limite,
        )
      ) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
