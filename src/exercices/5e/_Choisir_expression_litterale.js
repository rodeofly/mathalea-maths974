import {
  texFractionFromString,
  simplificationDeFractionAvecEtapes,
} from '../../lib/outils/deprecatedFractions'
import { rienSi1 } from '../../lib/outils/ecritures'
import { arrondi } from '../../lib/outils/nombres'
import { nombreAvecEspace, texNombre } from '../../lib/outils/texNombre'
import { estentier, randint } from '../../modules/outils'
/**
 * Fork de la fonction de JC avec ajout de la dernière opération dans le tableau de sortie
 * @param {number} nbOperations
 * @param {number} decimal
 * @param {number} val1=1
 * @param {number} val2=2
 * @param {boolean} timesOn=true
 * @returns {string,string,string,number,string,string} [expf,expl,expc,nbval,lastOp, structureExpression]
 * @author Jean Claude Lhote forked by Sébastien LOZANO

 * Ajout de la structure de l'expression le 14/08/2021 : Guillaume Valmont
 */
export default function ChoisirExpressionLitterale(
  nbOperations,
  decimal,
  val1 = 1,
  val2 = 2,
  timesOn = true,
) {
  let expf
  let expl
  let expc
  const arrondir = Math.log10(decimal)
  let a = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir)
  let b = arrondi(
    randint(2 * decimal, 10 * decimal, [a * decimal]) / decimal,
    arrondir,
  )
  let c = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir)
  let d = arrondi(
    randint(2 * decimal, 10 * decimal, [c * decimal]) / decimal,
    arrondir,
  )
  let e = arrondi(randint(2 * decimal, 10 * decimal) / decimal, arrondir)
  let souscas
  const l1 = 'x'
  const l2 = 'y'
  let nbval
  let signex = ''
  let lastOp
  if (timesOn) signex = '\\times'
  switch (nbOperations) {
    case 1: // expressions de base (1 opération)
      nbval = 1
      souscas = randint(0, 3)
      switch (souscas) {
        case 0: // somme de deux nombres
          expf = `La somme de $${nombreAvecEspace(a)}$ et $${l1}$`
          expl = `$${texNombre(a)}+${l1}$`
          expc = `$${texNombre(a)}+${l1}=${texNombre(a)}+${texNombre(val1)}=${texNombre(a + val1)}$`
          lastOp = 'addition'
          break
        case 1: // différence de deux nombres
          if (val1 > b) {
            expf = `La différence de $${l1}$ et $${nombreAvecEspace(b)}$`
            expl = `$${l1}-${texNombre(b)}$`
            expc = `$${l1}-${texNombre(b)}=${texNombre(val1)}-${texNombre(b)}=${texNombre(val1 - b)}$`
          } else {
            expf = `La différence de $${nombreAvecEspace(b)}$ et $${l1}$`
            expl = `$${texNombre(b)}-${l1}$`
            expc = `$${texNombre(b)}-${l1}=${texNombre(b)}-${texNombre(val1)}=${texNombre(b - val1)}$`
          }
          lastOp = 'soustraction'
          break
        case 2: // produit de deux nombres
          expf = `Le produit de $${l1}$ par $${nombreAvecEspace(b)}$`
          expl = timesOn
            ? `$${l1}\\times ${texNombre(b)}$`
            : `$${texNombre(b)}${l1}$`
          expc = `$${texNombre(b)}${l1} = ${texNombre(b)}\\times ${val1}=${texNombre(b * val1)}$`
          lastOp = 'multiplication'
          break
        case 3: // quotient de deux nombres
          expf = `Le quotient de $${l1}$ par $${nombreAvecEspace(b)}$`
          expl = `$${l1}\\div ${texNombre(b)}$`
          if (estentier((val1 / b) * 1000))
            expc = `$${l1}\\div ${texNombre(b)} = ${val1}\\div ${texNombre(b)} = ${texNombre(val1 / b)}$`
          else
            expc = `$${l1}\\div ${texNombre(b)} = ${val1}\\div ${texNombre(b)}=${texFractionFromString(val1, texNombre(b))}${Number.isInteger(b) ? simplificationDeFractionAvecEtapes(val1, b) : ''}$`
          lastOp = 'division'
          break
      }
      break
    case 2: // expressions de niveau 1 (2 opérations)
      souscas = randint(0, 9)
      nbval = 1
      switch (souscas) {
        case 0: // a(b+c)
          expf = `Le produit de $${nombreAvecEspace(a)}$ par la somme de $${nombreAvecEspace(b)}$ et $${l1}$`
          expl = `$${texNombre(a)}${signex}(${texNombre(b)}+${l1})$`
          expc = `$${texNombre(a)}${signex}(${texNombre(b)}+${l1})=${texNombre(a)}${signex}(${texNombre(b)}+${val1})=${texNombre(a)}\\times ${texNombre(b + val1)} = ${texNombre(a * (b + val1))}$`
          lastOp = 'multiplication'
          break
        case 1: // a(b-c)
          if (b <= c) b = arrondi(b + c) // b-c positif
          expf = `Le produit de $${l1}$ par la différence de ${b} et $${nombreAvecEspace(c)}$`
          expl = `$${l1}${signex}(${texNombre(b)}-${texNombre(c)})=${l1}\\times ${texNombre(b - c)}=${rienSi1(b - c)}${l1}$`
          expc = `$${l1}${signex}(${texNombre(b)}-${texNombre(c)}) = ${texNombre(val1)}${signex}(${texNombre(b)}-${texNombre(c)})=${texNombre(val1)}\\times ${texNombre(b - c)}=${texNombre(val1 * (b - c))}$`
          lastOp = 'multiplication'
          break
        case 2: // a/(b+c)
          a = arrondi(a * (val1 + c)) // on s'assure que le quotient tombe juste...
          expf = `Le quotient de $${nombreAvecEspace(a)}$ par la somme de $${l1}$ et $${nombreAvecEspace(c)}$`
          expl = `$${texNombre(a)}\\div (${l1}+${texNombre(c)})$ ou $\\dfrac{${texNombre(a)}}{${l1}+${texNombre(c)}}$`
          expc = `$${texNombre(a)}\\div (${l1}+${texNombre(c)})=${texNombre(a)}\\div (${texNombre(val1)}+${texNombre(c)}) = ${texNombre(a)}\\div ${texNombre(val1 + c)}=${texNombre(a / (val1 + c))}$`
          lastOp = 'division'
          break
        case 3: // a/(b-c)
          if (b <= val1) b = arrondi(b + val1) // b-c positif
          a = arrondi(a * (b - val1)) // on s'assure que le quotient tombe juste
          expf = `Le quotient de $${nombreAvecEspace(a)}$ par la différence de $${nombreAvecEspace(b)}$ et $${l1}$`
          expl = `$${texNombre(a)}\\div (${b}-${l1})$ ou $\\dfrac{${texNombre(a)}}{${texNombre(b)}-${l1}}$`
          expc = `$${texNombre(a)}\\div (${b}-${l1})=${texNombre(a)}\\div (${b}-${val1})=${texNombre(a)}\\div ${texNombre(b - val1)}=${texNombre(a / (b - val1))}$`
          lastOp = 'division'
          break
        case 4: // (a+b)/c
          a = arrondi(a * val1)
          b = arrondi(b * val1) // on s'assure que le quotient tombe juste
          expf = `Le quotient de la somme de $${nombreAvecEspace(a)}$ et $${nombreAvecEspace(b)}$ par $${l1}$`
          expl = `$(${texNombre(a)}+${texNombre(b)})\\div  ${l1}$ ou $\\dfrac{${texNombre(a)}+${texNombre(b)}}{${l1}}$`
          expc = `$(${texNombre(a)}+${texNombre(b)})\\div  ${l1}=(${texNombre(a)}+${texNombre(b)})\\div ${val1}= ${texNombre(a + b)}\\div ${val1}=${texNombre((a + b) / val1)}$`
          lastOp = 'division'
          break
        case 5: // (a-b)/c
          a = arrondi(a * c) + val1 // on s'assure que le quotient tombe juste et que a-b>0
          expf = `Le quotient de la différence de $${nombreAvecEspace(a)}$ et $${l1}$ par $${nombreAvecEspace(c)}$`
          expl = `$(${texNombre(a)}-${l1})\\div ${texNombre(c)}$ ou $\\dfrac{${texNombre(a)}-${l1}}{${texNombre(c)}}$`
          expc = `$(${texNombre(a)}-${l1})\\div ${texNombre(c)}=(${texNombre(a)}-${val1})\\div ${texNombre(c)}= ${texNombre(a - val1)}\\div ${texNombre(c)}=${texNombre((a - val1) / c)}$`
          lastOp = 'division'
          break
        case 6: // a + bc
          expf = `La somme de $${nombreAvecEspace(a)}$ et du produit de $${nombreAvecEspace(b)}$ et $${l1}$`
          expl = `$${texNombre(a)}+${texNombre(b)}${l1}$`
          expc = `$${texNombre(a)}+${texNombre(b)}${l1}=${texNombre(a)}+${texNombre(b)}\\times ${val1}=${texNombre(a)}+${texNombre(b * val1)} = ${texNombre(a + b * val1)}$`
          lastOp = 'addition'
          break
        case 7: // a - bc
          a = arrondi(a + b * val1)
          expf = `La différence entre $${nombreAvecEspace(a)}$ et le produit de $${nombreAvecEspace(b)}$ et $${l1}$`
          expl = `$${texNombre(a)}-${texNombre(b)}${l1}$`
          expc = `$${texNombre(a)}-${texNombre(b)}${l1}=${texNombre(a)}-${texNombre(b)}\\times ${val1}=${texNombre(a)}-${texNombre(b * val1)} = ${texNombre(a - b * val1)}$`
          lastOp = 'soustraction'
          break
        case 8: // a + b/c
          b = arrondi(b * val1)
          expf = `La somme de $${nombreAvecEspace(a)}$ et du quotient de $${nombreAvecEspace(b)}$ par $${l1}$`
          expl = `$${texNombre(a)}+${texNombre(b)}\\div ${l1}$ ou $${texNombre(a)}+\\dfrac{${texNombre(b)}}{${l1}}$`
          expc = `$${texNombre(a)}+${texNombre(b)}\\div ${l1}=${texNombre(a)}+${texNombre(b)}\\div ${val1}=${texNombre(a)}+${texNombre(b / val1)} = ${texNombre(a + b / val1)}$`
          lastOp = 'addition'
          break
        case 9: // a - b/c
          b = arrondi(b * val1)
          a = arrondi(a + b / val1)
          expf = `La différence entre $${nombreAvecEspace(a)}$ et le quotient de $${nombreAvecEspace(b)}$ par $${l1}$`
          expl = `$${texNombre(a)}-${texNombre(b)}\\div ${l1}$ ou $${texNombre(a)}-\\dfrac{${texNombre(b)}}{${l1}}$`
          expc = `$${texNombre(a)}-${texNombre(b)}\\div ${l1}=${texNombre(a)}-${texNombre(b)}\\div ${val1}=${texNombre(a)}-${texNombre(b / val1)} = ${texNombre(a - b / val1)}$`
          lastOp = 'soustraction'
          break
      }
      break
    case 3: // expressions de niveau 2 (3 opérations)
      souscas = randint(0, 13)
      nbval = 2
      switch (souscas) {
        case 0: // (a+b)(c+d)
          a = val1
          d = val2
          expf = `Le produit de la somme de $${l1}$ et $${nombreAvecEspace(b)}$ par la somme de $${nombreAvecEspace(c)}$ et $${l2}$`
          expl = `$(${l1}+${texNombre(b)})${signex}(${texNombre(c)}+${l2})$`
          expc = `$(${l1}+${texNombre(b)})${signex}(${texNombre(c)}+${l2})=(${a}+${texNombre(b)})${signex}(${texNombre(c)}+${d})= ${texNombre(a + b)}\\times ${texNombre(c + d)} = ${texNombre((a + b) * (c + d))}$`
          lastOp = 'multiplication'
          break
        case 1: // (a+b)(c-d)
          d = val2
          b = val1
          if (c <= d) c = arrondi(c + d)
          expf = `Le produit de la somme de $${nombreAvecEspace(a)}$ et $${l1}$ par la différence de $${nombreAvecEspace(c)}$ et $${l2}$`
          expl = `$(${texNombre(a)}+${l1})${signex}(${texNombre(c)}-${l2})$`
          expc = `$(${texNombre(a)}+${l1})${signex}(${texNombre(c)}-${l2})=(${texNombre(a)}+${b})${signex}(${texNombre(c)}-${d})= ${texNombre(a + b)}\\times ${texNombre(c - d)} = ${texNombre((a + b) * (c - d))}$`
          lastOp = 'multiplication'
          break
        case 2: // (a-b)(c+d)
          b = val2
          c = val1
          if (a <= b) a = arrondi(a + b)
          expf = `Le produit de la différence de $${nombreAvecEspace(a)}$ et $${l2}$ par la somme de $${l1}$ et $${nombreAvecEspace(d)}$`
          expl = `$(${texNombre(a)}-${l2})${signex}(${l1}+${texNombre(d)})$`
          expc = `$(${texNombre(a)}-${l2})${signex}(${l1}+${texNombre(d)})=(${texNombre(a)}-${b})${signex}(${c}+${texNombre(d)})=${texNombre(a - b)}\\times ${texNombre(c + d)} = ${texNombre((a - b) * (c + d))}$`
          lastOp = 'multiplication'
          break
        case 3: // (a-b)(c-d)
          b = val1
          d = val2
          if (a <= b) a = arrondi(a + b)
          if (c <= d) c = arrondi(c + d)
          expf = `Le produit de la différence de $${nombreAvecEspace(a)}$ et $${l1}$ par la différence de $${nombreAvecEspace(c)}$ et $${l2}$`
          expl = `$(${texNombre(a)}-${l1})${signex}(${texNombre(c)}-${l2})$`
          expc = `$(${texNombre(a)}-${l1})${signex}(${texNombre(c)}-${l2})=(${texNombre(a)}-${b})${signex}(${texNombre(c)}-${d})= ${texNombre(a - b)}\\times ${texNombre(c - d)} = ${texNombre((a - b) * (c - d))}$`
          lastOp = 'multiplication'
          break
        case 4: // (a+b)/(c+d)
          d = val2
          b = val1
          if (!estentier((a + b) / (c + d))) a = arrondi(a * (c + d) - b)
          expf = `Le quotient de la somme de $${nombreAvecEspace(a)}$ et $${l1}$ par la somme de $${nombreAvecEspace(c)}$ et $${l2}$`
          expl = `$(${texNombre(a)}+${l1})\\div (${texNombre(c)}+${l2})$ ou $\\dfrac{${texNombre(a)}+${l1}}{${texNombre(c)}+${l2}}$`
          expc = `$(${texNombre(a)}+${l1})\\div (${texNombre(c)}+${l2})=(${texNombre(a)}+${texNombre(b)})\\div (${texNombre(c)}+${texNombre(d)}) = ${texNombre(a + b)}\\div ${texNombre(c + d)} = ${texNombre((a + b) / (c + d))}$`
          lastOp = 'division'
          break
        case 5: // (a-b)/(c+d)
          d = val1
          b = val2
          if (a - b <= 0 || !estentier((a - b) / (c + d)))
            a = arrondi(a * (c + d) + b)
          expf = `Le quotient de la différence de $${nombreAvecEspace(a)}$ et $${l2}$ par la somme de $${nombreAvecEspace(c)}$ et $${l1}$`
          expl = `$(${texNombre(a)}-${l2})\\div (${texNombre(c)}+${l1})$ ou $\\dfrac{${texNombre(a)}-${l2}}{${texNombre(c)}+${l1}}$`
          expc = `$(${texNombre(a)}-${l2})\\div (${texNombre(c)}+${l1})=(${texNombre(a)}-${texNombre(b)})\\div (${texNombre(c)}+${texNombre(d)}) = ${texNombre(a - b)}\\div ${texNombre(c + d)} = ${texNombre((a - b) / (c + d))}$`
          lastOp = 'division'
          break
        case 6: // (a+b)/(c-d)
          b = val1
          d = val2
          if (c <= d) c = arrondi(c + d)
          if (!estentier((a + b) / (c - d))) {
            if (a * (c - d) > b) a = arrondi(a * (c - d) - b)
            else a = arrondi((a + b) * (c - d) - b)
          }
          expf = `Le quotient de la somme de $${nombreAvecEspace(a)}$ et $${l1}$ par la différence de $${nombreAvecEspace(c)}$ et $${l2}$`
          expl = `$(${texNombre(a)}+${l1})\\div (${texNombre(c)}-${l2})$ ou $\\dfrac{${texNombre(a)}+${l1}}{${texNombre(c)}-${l2}}$`
          expc = `$(${texNombre(a)}+${l1})\\div (${texNombre(c)}-${l2})=(${texNombre(a)}+${texNombre(b)})\\div (${texNombre(c)}-${texNombre(d)}) = ${texNombre(a + b)}\\div ${texNombre(c - d)} = ${texNombre((a + b) / (c - d))}$`
          lastOp = 'division'
          break
        case 7: // (a-b)/(c-d)
          d = val2
          b = val1
          if (c <= d) c = arrondi(c + d)
          if (a <= b) a = arrondi(a + b)
          if (!estentier((a - b) / (c - d))) a = arrondi(a * (c - d) + b)
          expf = `Le quotient de la différence de $${nombreAvecEspace(a)}$ et $${l1}$ par la différence de $${nombreAvecEspace(c)}$ et $${l2}$`
          expl = `$(${texNombre(a)}-${l1})\\div (${texNombre(c)}-${l2})$ ou $\\dfrac{${texNombre(a)}-${l1}}{${texNombre(c)}-${l2}}$`
          expc = `$(${texNombre(a)}-${l1})\\div (${texNombre(c)}-${l2})=(${texNombre(a)}-${texNombre(b)})\\div (${texNombre(c)}-${texNombre(d)}) = ${texNombre(a - b)}\\div ${texNombre(c - d)} = ${texNombre((a - b) / (c - d))}$`
          lastOp = 'division'
          break
        case 8: // ab+cd
          b = val1
          d = val2
          expf = `La somme du produit de $${nombreAvecEspace(a)}$ par $${l1}$ et du produit de $${nombreAvecEspace(c)}$ par $${l2}$`
          expl = `$${texNombre(a)}${l1}+${texNombre(c)}${l2}$`
          expc = `$${texNombre(a)}${l1}+${texNombre(c)}${l2}=${texNombre(a)}\\times ${texNombre(b)}+${texNombre(c)}\\times ${texNombre(d)} = ${texNombre(a * b)}+${texNombre(c * d)} = ${texNombre(a * b + c * d)}$`
          lastOp = 'addition'
          break
        case 9: // ab-cd
          d = val2
          b = val1
          if (a * b < d * c) a = arrondi(a + c)
          while (a * b < d * c) a = arrondi(a + c)
          expf = `La différence du produit de $${nombreAvecEspace(a)}$ par $${l1}$ et du produit de $${nombreAvecEspace(c)}$ par $${l2}$`
          expl = `$${texNombre(a)}${l1}-${texNombre(c)}${l2}$`
          expc = `$${texNombre(a)}${l1}-${texNombre(c)}${l2}=${texNombre(a)}\\times ${texNombre(b)}-${texNombre(c)}\\times ${texNombre(d)} = ${texNombre(a * b)}-${texNombre(c * d)} = ${texNombre(a * b - c * d)}$`
          lastOp = 'soustraction'
          break
        case 10: // ab+c/d
          d = val1
          b = val2
          if (!estentier(c / d)) c = arrondi(c * d)
          expf = `La somme du produit de $${nombreAvecEspace(a)}$ par $${l2}$ et du quotient de $${nombreAvecEspace(c)}$ par $${l1}$`
          expl = `$${texNombre(a)}${l2}+${texNombre(c)}\\div ${l1}$ ou $${texNombre(a)}${l2}+\\dfrac{${texNombre(c)}}{${l1}}$`
          expc = `$${texNombre(a)}${l2}+${texNombre(c)}\\div ${l1}=${texNombre(a)}\\times ${texNombre(b)}+${texNombre(c)}\\div ${texNombre(d)} = ${texNombre(a * b)}+${texNombre(c / d)} = ${texNombre(a * b + c / d)}$`
          lastOp = 'addition'
          break
        case 11: // ab-c/d
          d = val2
          b = val1
          if (!estentier(c / d)) c = arrondi(c * d)
          while (a * b < c / d) a = arrondi(a * c)
          expf = `La différence du produit de $${nombreAvecEspace(a)}$ par $${l1}$ et du quotient de $${nombreAvecEspace(c)}$ par $${l2}$`
          expl = `$${texNombre(a)}${l1}-${texNombre(c)}\\div ${l2}$ ou $${texNombre(a)}\\times ${l1}-\\dfrac{${texNombre(c)}}{${l2}}$`
          expc = `$${texNombre(a)}${l1}-${texNombre(c)}\\div ${l2}=${texNombre(a)}\\times ${texNombre(b)}-${texNombre(c)}\\div ${texNombre(d)} = ${texNombre(a * b)}-${texNombre(c / d)} = ${texNombre(a * b - c / d)}$`
          lastOp = 'soustraction'
          break
        case 12: // a/b+c/d
          d = val1
          b = val2
          if (!estentier(a / b)) a = arrondi(a * b)
          if (!estentier(c / d)) c = arrondi(c * d)
          expf = `La somme du quotient de $${nombreAvecEspace(a)}$ par $${l2}$ et du quotient de $${nombreAvecEspace(c)}$ par $${l1}$`
          expl = `$${texNombre(a)}\\div ${l2}+${texNombre(c)}\\div ${l1}$ ou $\\dfrac{${texNombre(a)}}{${l2}}+\\dfrac{${texNombre(c)}}{${l1}}$`
          expc = `$${texNombre(a)}\\div ${l2}+${texNombre(c)}\\div ${l1}=${texNombre(a)}\\div ${texNombre(b)}+${texNombre(c)}\\div ${texNombre(d)} = ${texNombre(a / b)}+${texNombre(c / d)} = ${texNombre(a / b + c / d)}$`
          lastOp = 'addition'
          break
        case 13: // a/b-c/d
          d = val2
          b = val1
          if (!estentier(a / b)) a = arrondi(a * b)
          if (!estentier(c / d)) c = arrondi(c * d)
          while (a / b < c / d) a = arrondi(a * c)
          expf = `La différence du quotient de $${nombreAvecEspace(a)}$ par $${l1}$ et du quotient de $${nombreAvecEspace(c)}$ par $${l2}$`
          expl = `$${texNombre(a)}\\div ${l1}-${texNombre(c)}\\div ${l2}$ ou $\\dfrac{${texNombre(a)}}{${l1}}-\\dfrac{${texNombre(c)}}{${l2}}$`
          expc = `$${texNombre(a)}\\div ${l1}-${texNombre(c)}\\div ${l2}=${texNombre(a)}\\div ${texNombre(b)}-${texNombre(c)}\\div ${texNombre(d)} = ${texNombre(a / b)}-${texNombre(c / d)} = ${texNombre(a / b - c / d)}$`
          lastOp = 'soustraction'
          break
      }
      break
    case 5: // expressions complexes
      souscas = randint(0, 5)
      nbval = 2
      switch (souscas) {
        case 0: // 2(a+bc)
          a = val1
          c = val2
          expf = `Le double de la somme de $${l1}$ et du produit de $${nombreAvecEspace(b)}$ par $${l2}$`
          expl = `$2${signex}(${l1}+${texNombre(b)}${l2})$`
          expc = `$2${signex}(${l1}+${texNombre(b)}${l2})=2${signex}(${texNombre(a)}+${texNombre(b)}\\times ${texNombre(c)}) = 2${signex}(${texNombre(a)}+${texNombre(b * c)}) = 2\\times ${texNombre(a + b * c)}=${texNombre(2 * (a + b * c))}$`
          lastOp = 'multiplication'
          break
        case 1: // 3(a+b)/c
          b = val1
          c = val2
          if (!estentier((3 * (a + b)) / c)) a = arrondi(a * c - b)
          while (a < b) a = arrondi(a * c - b)
          expf = `Le triple du quotient de la somme de $${nombreAvecEspace(a)}$ et $${l1}$ par $${l2}$`
          expl = `$3${signex}(${texNombre(a)}+${l1})\\div ${l2}$ ou $3\\times \\dfrac{${texNombre(a)}+${l1}}{${l2}}$`
          expc = `$3${signex}(${texNombre(a)}+${l1})\\div ${l2}=3${signex}(${texNombre(a)}+${texNombre(b)})\\div ${texNombre(c)} = 3\\times  ${texNombre(a + b)}\\div ${texNombre(c)} = ${texNombre(3 * (a + b))}\\div ${texNombre(c)} = ${texNombre((3 * (a + b)) / c)}$`
          lastOp = 'division'
          break
        case 2: // (a-b)/3
          nbval = 1
          b = val1
          if (!estentier((a - b) / 3)) a = arrondi(3 * a + b)
          expf = `Le tiers de la différence de $${nombreAvecEspace(a)}$ et $${l1}$`
          expl = `$(${texNombre(a)}-${l1})\\div  3$ ou $\\dfrac{${texNombre(a)}-${l1}}{3}$`
          expc = `$(${texNombre(a)}-${l1})\\div  3=(${texNombre(a)}-${texNombre(b)})\\div  3 = ${texNombre(a - b)}\\div  3 = ${texNombre((a - b) / 3)}$`
          lastOp = 'division'
          break
        case 3: // (a-b)/3*2(c+d)
          c = val1
          b = val2
          if (a <= b) a = arrondi(a + b)
          if (!estentier((a - b) / 3)) a = arrondi(3 * a + b)
          expf = `Le produit du tiers de la différence de $${nombreAvecEspace(a)}$ et $${l2}$ par le double de la somme de $${l1}$ et $${nombreAvecEspace(d)}$`
          expl = `$\\left((${texNombre(a)}-${l2})\\div  3\\right)\\times  2${signex}(${l1}+${texNombre(d)})$`
          expc = `$\\left((${texNombre(a)}-${l2})\\div  3\\right)\\times  2${signex}(${l1}+${texNombre(d)})=\\left((${texNombre(a)}-${texNombre(b)})\\div  3\\right)\\times  2${signex}(${texNombre(c)}+${texNombre(d)}) = ${texNombre(a - b)}\\div  3 \\times  2 \\times ${texNombre(c + d)} = ${texNombre((a - b) / 3)} \\times  2 \\times  ${texNombre(c + d)} =  ${texNombre((2 * (a - b)) / 3)} \\times  ${texNombre(c + d)} = ${texNombre((2 * (c + d) * (a - b)) / 3)}$`
          lastOp = 'multiplication'
          break
        case 4: // 3(a+b)-2(c+d)
          b = val1
          c = val2
          if (3 * (a + b) < 2 * (c + d)) a = arrondi(a + c + d)
          expf = `La différence du triple de la somme de $${nombreAvecEspace(a)}$ et $${l1}$ et du double de la somme de $${l2}$ et $${nombreAvecEspace(d)}$`
          expl = `$3${signex}(${texNombre(a)}+${l1})-2${signex}(${l2}+${texNombre(d)})$`
          expc = `$3${signex}(${texNombre(a)}+${l1})-2${signex}(${l2}+${texNombre(d)})=3${signex}(${texNombre(a)}+${texNombre(b)})-2${signex}(${texNombre(c)}+${texNombre(d)}) = 3 \\times  ${texNombre(a + b)} - 2 \\times  ${texNombre(c + d)} = ${texNombre(3 * (a + b))} - ${texNombre(2 * (c + d))} = ${texNombre(3 * (a + b) - 2 * (c + d))}$`
          lastOp = 'soustraction'
          break
        case 5: // 2(a-b)+3(c+d)
          d = val2
          b = val1
          if (a <= b) a = arrondi(a + b)
          expf = `La somme du double de la différence de $${nombreAvecEspace(a)}$ et $${l1}$ et du triple de la somme de $${nombreAvecEspace(c)}$ et $${l2}$`
          expl = `$2${signex}(${texNombre(a)}-${l1})+3${signex}(${texNombre(c)}+${l2})$`
          expc = `$2${signex}(${texNombre(a)}-${l1})+3${signex}(${texNombre(c)}+${l2})=2${signex}(${texNombre(a)}-${texNombre(b)})+3${signex}(${texNombre(c)}+${texNombre(d)}) = 2 \\times  ${texNombre(a - b)} + 3 \\times  ${texNombre(c + d)} = ${texNombre(2 * (a - b))} + ${texNombre(3 * (c + d))} = ${texNombre(2 * (a - b) + 3 * (c + d))}$`
          lastOp = 'addition'
          break
      }
      break
    case 4: // 4 opérations
      souscas = randint(1, 3)
      nbval = 2
      switch (souscas) {
        case 1: // (a+b)/(c(d+e))
          b = val1
          e = val2
          if (!estentier((a + b) / (c * (d + e))))
            a = arrondi(a * c * (d + e) - b)
          expf = `Le quotient de la somme de $${nombreAvecEspace(a)}$ et $${l1}$ par le produit de $${nombreAvecEspace(c)}$ par la somme de $${nombreAvecEspace(d)}$ et $${l2}$`
          expl = `$(${texNombre(a)}+${l1})\\div (${texNombre(c)}${signex}(${texNombre(d)}+${l2}))$ ou $\\dfrac{${texNombre(a)}+${l1}}{${texNombre(c)}${signex}(${texNombre(d)}+${l2})}$`
          expc = `$(${texNombre(a)}+${l1})\\div (${texNombre(c)}${signex}(${texNombre(d)}+${l2}))=(${texNombre(a)}+${texNombre(b)})\\div (${texNombre(c)}${signex}(${texNombre(d)}+${texNombre(e)})) = ${texNombre(a + b)} \\div  (${texNombre(c)} \\times  ${texNombre(d + e)}) = ${texNombre(a + b)} \\div  ${texNombre(c * (d + e))} = ${texNombre((a + b) / (c * (d + e)))}$`
          lastOp = 'division'
          break
        case 2: // (a-b)*(c+de)
          e = val1
          b = val2
          if (a <= b) a = arrondi(a + b)
          expf = `Le produit de la différence de $${nombreAvecEspace(a)}$ et $${l2}$ par la somme de $${nombreAvecEspace(c)}$ et du produit de $${nombreAvecEspace(d)}$ par $${l1}$`
          expl = `$(${texNombre(a)}-${l2})${signex}(${texNombre(c)}+${texNombre(d)}${l1})$`
          expc = `$(${texNombre(a)}-${l2})${signex}(${texNombre(c)}+${texNombre(d)}${l1})=(${texNombre(a)}-${texNombre(b)})${signex}(${texNombre(c)}+${texNombre(d)}\\times ${texNombre(e)}) = ${texNombre(a - b)}(${texNombre(c)}+${texNombre(d * e)}) = ${texNombre(a - b)} \\times  ${texNombre(c + d * e)} = ${texNombre((a - b) * (c + d * e))}$`
          lastOp = 'multiplication'
          break
        case 3: // ab+cd/e
          d = val2
          b = val1
          if (!estentier((c * d) / e)) c = arrondi(c * e)
          expf = `La somme du produit de $${nombreAvecEspace(a)}$ par $${l1}$ et du quotient du produit de $${nombreAvecEspace(c)}$ et $${l2}$ par $${nombreAvecEspace(e)}$`
          expl = `$${texNombre(a)}${l1}+${texNombre(c)}${l2}\\div ${texNombre(e)}$ ou $${texNombre(a)}${l1}+\\dfrac{${texNombre(c)}${l2}}{${texNombre(e)}}$`
          expc = `$${texNombre(a)}${l1}+${texNombre(c)}${l2}\\div ${texNombre(e)}=${texNombre(a)}\\times ${texNombre(b)}+${texNombre(c)}\\times ${texNombre(d)}\\div ${texNombre(e)} = ${texNombre(a * b)} + ${texNombre(c * d)} \\div  ${texNombre(e)} = ${texNombre(a * b)} + ${texNombre((c * d) / e)} = ${texNombre(a * b + (c * d) / e)}$`
          lastOp = 'addition'
          break
      }
      break
  }
  let pos1 = 0
  for (; pos1 < expc.length; pos1++) {
    if (expc[pos1] === '=') break
  }
  let pos2 = pos1 + 1
  for (; pos2 < expc.length; pos2++) {
    if (expc[pos2] === '=') break
  }
  const expn = '$' + expc.substring(pos1 + 1, pos2 - 1) + '$'
  let structureExpression
  switch (lastOp) {
    case 'addition':
      structureExpression = 'une somme'
      break
    case 'soustraction':
      structureExpression = 'une différence'
      break
    case 'multiplication':
      structureExpression = 'un produit'
      break
    case 'division':
      structureExpression = 'un quotient'
      break
  }
  return [expf, expl, expc, nbval, lastOp, expn, structureExpression]
}
