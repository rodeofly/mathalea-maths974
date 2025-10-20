import { base10VersBaseN } from '../exercices/PE/PEA13'
import { segment } from '../lib/2d/segmentsVecteurs'
import { texteParPosition } from '../lib/2d/textes'
import {
  nombreDeChiffresDansLaPartieEntiere,
  ordreDeGrandeur,
} from '../lib/outils/nombres'
import Decimal from 'decimal.js'
import { context } from './context'
import { fixeBordures, mathalea2d } from './2dGeneralites'
import { texNombre } from '../lib/outils/texNombre'
/**
 *
 * Pose une opération
 * @author Jean-Claude Lhote
 * les types possibles sont : addition, soustraction, multiplication, division, additiond, soustractiond, multiplicationd, divisiond
 * Le paramètre précision précise pour divisiond, le nombre de chiffres après la virgule dans le quotient.
 */

const espacement = 1
export default function Operation({
  operande1 = 1,
  operande2 = 2,
  type = 'addition',
  precision = 0,
  base = 10,
  retenuesOn = true,
  style = 'display: block',
  methodeParCompensation = true,
  options = { solution: true, colore: '' },
}) {
  // precision est pour le quotient décimal
  const calculer = options.solution
  let Code
  const nombreDeChiffresApresLaVirgule = function (x: Decimal) {
    const s = x.toString()
    const pe = x.floor().toString()
    if (pe.length === s.length) return 0
    return s.length - pe.length - 1
  }

  const cacherleszerosdevant = function (chaine: string) {
    let blancs = ''
    while (chaine[0] === '0') {
      chaine = chaine.substr(1)
      blancs += ' '
    }
    for (let i = 0; i < chaine.length; i++) {
      blancs += `${chaine[i]}`
    }
    return blancs
  }

  const DivisionPosee3d = function (
    divid: number | Decimal,
    divis: number | Decimal,
    precision = 0,
    calculer = true,
  ) {
    divid = new Decimal(divid)
    divis = new Decimal(divis)
    if (divis.equals(0)) {
      return 'On ne peut pas diviser par 0.'
    }
    if (divid.equals(0)) {
      return "Lorsqu'on divise 0 par un nombre, le quotient est 0."
    }
    if (divid.equals(divis)) {
      return "Lorsqu'on divise un nombre par lui-même, le quotient est 1."
    }
    if (divis.equals(1)) {
      return `Lorsqu'on divise un nombre par 1, le quotient est le nombre initial : $${texNombre(divid)}$.`
    }
    const objets = []
    let zeroutile = false
    const periode = 0 // EE : Pas compris à quoi servait cette variable ?
    precision = Math.min(
      precision,
      nombreDeChiffresApresLaVirgule(divid.div(divis)),
    )
    const decalage = nombreDeChiffresApresLaVirgule(divis)
    const dec1 = nombreDeChiffresApresLaVirgule(divid)
    zeroutile = divid.lt(divis)
    divis = divis.mul(10 ** decalage)
    divid = divid.mul(10 ** (decalage + dec1))
    let dec2 = nombreDeChiffresApresLaVirgule(divid)
    dec2 = precision - dec2 - dec1
    divid = divid.mul(10 ** dec2) // math.format(divid * 10 ** dec2, { notation: 'auto', lowerExp: -12, upperExp: 12, precision: 12 })
    const ecriresoustraction = function (upos: number, P: string) {
      objets.push(
        texteParPosition(
          '-',
          (upos - P.length - 0.5) * espacement,
          10 - i * 2,
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
      for (let k = 0; k < P.length; k++) {
        objets.push(
          texteParPosition(
            P[P.length - k - 1],
            (upos - k - 1) * espacement,
            10 - i * 2,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
      }
      objets.push(
        segment(
          (upos - P.length - 0.5) * espacement,
          9.6 - i * 2,
          (upos + 0.2 - 1) * espacement,
          9.6 - i * 2,
        ),
      )
    }
    const ecrirereste = function (upos: number, R: string) {
      for (let k = 0; k < R.length; k++) {
        objets.push(
          texteParPosition(
            R[R.length - k - 1],
            (upos - k - 1) * espacement,
            9 - i * 2,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
      }
    }
    const ecrirequotient = function (x: number, Q: string) {
      objets.push(
        texteParPosition(
          Q,
          (n + 1.5 + x) * espacement,
          10,
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
    }

    const divd: string[] = []
    const Q = []
    const R = []
    const P = []
    const ProduitPartiel = []
    let q
    const dividende = divid.toString()
    const diviseur = divis.toString()
    const n = Math.log10(ordreDeGrandeur(divid.toNumber(), 1)) // nombre de chiffres du dividende
    const m = Math.log10(ordreDeGrandeur(divis.toNumber(), 1)) // nombre de chiffre du diviseur
    let upos = m

    for (let i = 0; i < n; i++) {
      // on écrit le dividende
      objets.push(
        texteParPosition(
          dividende[i],
          i * espacement,
          11,
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
    }
    for (let i = 0; i < m; i++) {
      // on écrit le diviseur
      objets.push(
        texteParPosition(
          diviseur[i],
          (i + n + 1.5) * espacement,
          11,
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
    }
    if (dec1 + dec2 !== 0) {
      objets.push(
        texteParPosition(
          ',',
          (n - dec1 - dec2 - 1 + 0.5) * espacement,
          11,
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
    }
    const longueurPotence = nombreDeChiffresDansLaPartieEntiere(
      divid.toNumber() / divis.toNumber(),
    )
    objets.push(
      segment(n * espacement, 11.5, n * espacement, 10.5 - 2 * longueurPotence),
    ) // on trace le trait vertical
    let i = 0
    if (calculer) {
      divd.push(dividende.substr(0, m))
      if (parseInt(divd[0]) < divis.toNumber()) {
        divd[0] += dividende.substr(m, 1)
        if (divis.div(10 ** dec2).lt(divis) && zeroutile) {
          ecrirequotient(-1, '0')
        } else if (zeroutile) {
          ecrirequotient(-1, '0')
        }
        upos++
      } else if (zeroutile) {
        ecrirequotient(-1, '0')
      }
      while (upos <= n) {
        q = new Decimal(divd[i]).div(divis).floor()
        Q.push(q.toString())
        R.push(new Decimal(divd[i]).mod(divis).toString())
        ProduitPartiel.push(new Decimal(q).mul(divis).floor().toString())
        P.push('')
        if (Q[i] === '0') {
          for (let z = 0; z < m; z++) {
            P[i] += '0'
          }
        } else {
          for (
            let ee = 0;
            ee < divd[i].length - divis.mul(parseInt(Q[i])).toString().length;
            ee++
          ) {
            P[i] += '0'
          }
          P[i] += divis.mul(parseInt(Q[i])).toString()
        }
        // ecriresoustraction(upos, divd[i])
        ecriresoustraction(upos, ProduitPartiel[i])
        if (upos < n) {
          R[i] += dividende.substr(upos, 1)
          ecrirereste(upos + 1, R[i])
        } else {
          ecrirereste(upos, R[i])
        }
        divd.push(R[i])
        upos++
        ecrirequotient(i, Q[i])
        i++
      }
      if (precision > 0 && periode === 0) {
        objets.push(
          texteParPosition(
            ',',
            (n + 1 + i - dec2 - dec1) * espacement,
            10,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
      }
      /* else if (periode !== 0) {
        objets.push(texteParPosition(',', (2 * n - dec2 - dec1) * espacement, 10, 0, 'black', 1.2, 'milieu', false))
      } */
    }
    if (calculer)
      objets.push(segment(n * espacement, 10.5, (n + m + i) * espacement, 10.5)) // on trace le trait horizontal
    else
      objets.push(segment(n * espacement, 10.5, (n + m + 2) * espacement, 10.5)) // on trace le trait horizontal

    const code = mathalea2d(
      Object.assign(
        { pixelsParCm: 20, scale: 0.8, style },
        fixeBordures(objets),
      ),
      objets,
    )
    return code
  }

  const AdditionPosee3d = function (
    operande1: number | Decimal,
    operande2: number | Decimal,
    base: number,
    retenuesOn: boolean,
    calculer = true,
  ) {
    operande1 = new Decimal(operande1)
    operande2 = new Decimal(operande2)
    if (operande1.equals(0) || operande2.equals(0)) {
      return operande1.equals(0)
        ? `$${texNombre(operande1)}$ étant nul, l'addition est égale à $${texNombre(operande2)}$`
        : `$${texNombre(operande2)}$ étant nul, l'addition est égale à $${texNombre(operande1)}$`
    }
    const dec1 = nombreDeChiffresApresLaVirgule(operande1)
    const dec2 = nombreDeChiffresApresLaVirgule(operande2)
    const terme1 = operande1
    const terme2 = operande2
    const somme = terme1.plus(terme2)
    let code = ''
    const objets = []
    let sop1
    let sop2
    let sresultat
    let resultat
    let lresultat
    let decalage
    let chiffreop1, chiffreop2
    if (base ? base === 10 : true) {
      decalage = Math.max(dec1, dec2)
      sop1 = operande1.mul(10 ** dec1).toString()
      sop2 = operande2.mul(10 ** dec2).toString()
      operande1 = operande1.mul(10 ** decalage)
      operande2 = operande2.mul(10 ** decalage)
      if (dec1 > dec2)
        for (let j = 0; j < dec1 - dec2; j++) sop2 += ' ' // On complète par des espaces si besoin
      else for (let j = 0; j < dec2 - dec1; j++) sop1 += ' ' // On complète par des espaces si besoin
      for (
        let j = 0;
        j < Math.abs(Math.min(0, Math.floor(Math.log10(terme1.toNumber()))));
        j++
      )
        sop1 = '0' + sop1 // On complète par des zéros si besoin
      for (
        let j = 0;
        j < Math.abs(Math.min(0, Math.floor(Math.log10(terme2.toNumber()))));
        j++
      )
        sop2 = '0' + sop2 // On complète par des zéros si besoin
      resultat = operande1.plus(operande2)
      sresultat = resultat.toString()
      for (
        let j = 0;
        j < Math.abs(Math.min(0, Math.floor(Math.log10(somme.toNumber()))));
        j++
      )
        sresultat = '0' + sresultat // On complète par des zéros si besoin
      lresultat = sresultat.length
    } else {
      decalage = 0
      sop1 = base10VersBaseN(operande1, base)
      sop2 = base10VersBaseN(operande2, base)
      resultat = operande1.plus(operande2)
      sresultat = base10VersBaseN(resultat, base)
      lresultat = sresultat.length
    }
    const lop1 = sop1.length
    const lop2 = sop2.length
    const longueuroperandes = Math.max(lop1, lop2)
    let retenues = ' '
    if (lop1 > lop2) {
      // si op1 a plus de chiffres qu'op2, on complète op2 avec des espaces.
      for (let j = 0; j < lop1 - lop2; j++) {
        sop2 = ' ' + sop2
      }
    } else if (lop2 > lop1) {
      // on fait pareil pour op1 si c'est op2 le plus 'grand'
      for (let j = 0; j < lop2 - lop1; j++) {
        sop1 = ' ' + sop1
      }
    }
    // les deux opérandes ont le même nombre de chiffres
    for (let i = longueuroperandes - 1; i > 0; i--) {
      // on construit la chaine des retenues.
      chiffreop1 = isNaN(parseInt(sop1[i], base)) ? 0 : parseInt(sop1[i], base)
      chiffreop2 = isNaN(parseInt(sop2[i], base)) ? 0 : parseInt(sop2[i], base)
      if (
        chiffreop1 +
          chiffreop2 +
          parseInt(Number(retenues[0]) > 0 ? retenues[0] : '0') >
        base - 1
      ) {
        retenues = `1${retenues}`
      } else {
        retenues = ` ${retenues}`
      }
    }
    retenues = ' ' + retenues
    sop1 = ` ${sop1}`
    sop2 = `+${sop2}`

    for (let i = 0; i < longueuroperandes + 1 - lresultat; i++) {
      sresultat = ` ${sresultat}`
    }

    for (let i = 0; i < longueuroperandes + 1; i++) {
      if (sop1[i] !== ' ')
        objets.push(
          texteParPosition(
            sop1[i],
            i * espacement,
            4,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
      if (sop2[i] !== ' ')
        objets.push(
          texteParPosition(
            sop2[i],
            i * espacement,
            3,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
      objets.push(segment(0, 2, (longueuroperandes + 1) * espacement, 2))
      if (retenues[i] !== ' ' && retenuesOn && calculer)
        objets.push(
          texteParPosition(
            retenues[i],
            i * espacement,
            4.5,
            0,
            'red',
            0.8,
            'milieu',
            false,
          ),
        )
      if (sresultat[i] !== ' ' && calculer)
        objets.push(
          texteParPosition(
            sresultat[i],
            i * espacement,
            1,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
    }
    if (decalage !== 0) {
      objets.push(
        texteParPosition(
          ',',
          0.3 + espacement * (longueuroperandes - decalage),
          4,
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
      objets.push(
        texteParPosition(
          ',',
          0.3 + espacement * (longueuroperandes - decalage),
          3,
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
      if (calculer)
        objets.push(
          texteParPosition(
            ',',
            0.3 + espacement * (longueuroperandes - decalage),
            1,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
    }
    code += mathalea2d(
      Object.assign(
        { pixelsParCm: 20, scale: 0.8, style },
        fixeBordures(objets),
      ),
      objets,
    )
    return code
  }

  const SoustractionPosee3d = function (
    operande1: number | Decimal,
    operande2: number | Decimal,
    base: number,
    retenuesOn = true,
    methodeParCompensation = true,
    calculer = true,
  ) {
    operande1 = new Decimal(operande1)
    operande2 = new Decimal(operande2)
    if (operande1.lessThan(operande2)) {
      return `Je ne sais pas faire de soustraction avec un résultat négatif, or ici $${texNombre(operande1)} < ${texNombre(operande2)}$.`
    }
    if (operande2.equals(0))
      return `Lorsqu'on soustrait 0, le résultat est le nombre initial, ici $${texNombre(operande1)}$.`
    let code = ''
    const objets = []
    let sop1
    let sop2
    let sresultat
    let resultat
    let lresultat
    let decalage
    let chiffreop1, chiffreop2
    if (base ? base === 10 : true) {
      const dec1 = nombreDeChiffresApresLaVirgule(operande1)
      const dec2 = nombreDeChiffresApresLaVirgule(operande2)
      decalage = Math.max(dec1, dec2)
      operande1 = operande1.mul(10 ** decalage)
      operande2 = operande2.mul(10 ** decalage)
      resultat = operande1.sub(operande2)
      sresultat = resultat.toString()
      lresultat = sresultat.length
      if (operande1.lt(operande2)) {
        sop2 = operande1.toString()
        sop1 = operande2.toString()
      } else {
        sop1 = operande1.toString()
        sop2 = operande2.toString()
      }
    } else {
      decalage = 0
      sop1 = base10VersBaseN(operande1, base)
      sop2 = base10VersBaseN(operande2, base)
      resultat = operande1.sub(operande2)
      sresultat = base10VersBaseN(resultat, base)
      lresultat = sresultat.length
    }
    const lop1 = sop1.length
    const lop2 = sop2.length
    const longueuroperandes = lop1
    let retenues = '00'
    if (lop1 > lop2) {
      // si op1 a plus de chiffres qu'op2 on complète op2 avec des blancs.
      for (let j = 0; j < lop1 - lop2; j++) {
        sop2 = ' ' + sop2
      }
    }

    // les deux opérandes ont le même nombre de chiffres
    for (let i = longueuroperandes - 1; i >= lop1 - lop2; i--) {
      // on construit la chaine des retenues.
      chiffreop1 = isNaN(parseInt(sop1[i], base)) ? 0 : parseInt(sop1[i], base)
      chiffreop2 = isNaN(parseInt(sop2[i], base)) ? 0 : parseInt(sop2[i], base)
      if (chiffreop1 < chiffreop2 + parseInt(retenues.charAt(0), base)) {
        retenues = `1${retenues}`
      } else {
        retenues = `0${retenues}`
      }
    }
    sop1 = ` ${sop1}`
    sop2 = `-${sop2}`
    retenues = `0${retenues}`

    for (let i = 0; i < longueuroperandes + 1 - lresultat; i++) {
      sresultat = ` ${sresultat}`
    }
    if (methodeParCompensation || !calculer) {
      const offsetCarry = lop1 - lop2
      for (let i = 0; i < longueuroperandes + 1; i++) {
        if (retenues[i] !== '0' && retenuesOn && calculer)
          objets.push(
            texteParPosition(
              retenues[i],
              i * espacement - 0.25 + espacement * offsetCarry,
              4,
              0,
              'red',
              0.8,
              'milieu',
              false,
            ),
          )
        if (sop1[i] !== ' ')
          objets.push(
            texteParPosition(
              sop1[i],
              i * espacement,
              4,
              0,
              'black',
              1.2,
              'milieu',
              false,
            ),
          )
        if (sop2[i] !== ' ')
          objets.push(
            texteParPosition(
              sop2[i],
              i * espacement,
              3,
              0,
              'black',
              1.2,
              'milieu',
              false,
            ),
          )
        if (retenues[i] !== '0' && retenuesOn && calculer)
          objets.push(
            texteParPosition(
              `+${retenues[i]}`,
              (i + offsetCarry - 1) * espacement,
              2.5,
              0,
              'blue',
              0.6,
              'milieu',
              false,
            ),
          )
        if (sresultat[i] !== ' ' && calculer)
          objets.push(
            texteParPosition(
              sresultat[i],
              i * espacement,
              1,
              0,
              'black',
              1.2,
              'milieu',
              false,
            ),
          )
      }
    } else {
      const hauteur = Array.apply(null, Array(longueuroperandes + 1)).map(
        function () {
          return 0
        },
      )
      const ArrsOp1 = Array.apply(null, Array(sop1.length)).map(
        function (x, i) {
          return sop1[i]
        },
      )
      for (let i = longueuroperandes; i >= 0; i--) {
        chiffreop2 = isNaN(parseInt(sop2[i], base))
          ? 0
          : parseInt(sop2[i], base)
        const additOp1 = new Decimal(
          parseInt(sresultat[i] === ' ' ? '0' : sresultat[i], base) +
            chiffreop2,
        )
        if (ArrsOp1[i] !== ' ')
          objets.push(
            texteParPosition(
              ArrsOp1[i],
              i * espacement,
              4,
              0,
              'black',
              1.2,
              'milieu',
              false,
            ),
          )
        if (
          retenuesOn &&
          additOp1.sub(parseInt(ArrsOp1[i])).abs().greaterThan(0.5)
        ) {
          // retenu à mettre ou cassage
          for (let k = 0; k < 2; k++) {
            if (
              (additOp1.gte(10) &&
                additOp1
                  .sub(10)
                  .sub(parseInt(ArrsOp1[i]))
                  .abs()
                  .greaterThan(0.5)) || // addition >= 10 & unités différentes donc il faut casser si unité différente
              (additOp1.lt(10) &&
                additOp1.sub(parseInt(ArrsOp1[i])).abs().greaterThan(0.5))
            ) {
              // addition < 10 et chiffres différents donc il faut casser
              // on doit casser
              objets.push(
                segment(
                  i * espacement - 0.3,
                  4 + hauteur[i] - 0.3,
                  i * espacement + 0.3,
                  4 + hauteur[i] + 0.3,
                ),
              )
              if (parseInt(ArrsOp1[i]) > 0) {
                ArrsOp1[i] = (parseInt(ArrsOp1[i]) - 1).toString()
              } else {
                ArrsOp1[i] = '9'
                // On ajoute une retenue car on passe de 10 à 9
                objets.push(
                  texteParPosition(
                    '1',
                    i * espacement - 0.25,
                    4 + hauteur[i],
                    0,
                    'red',
                    0.8,
                    'milieu',
                    false,
                  ),
                )
              }
              hauteur[i]++
              objets.push(
                texteParPosition(
                  ArrsOp1[i],
                  i * espacement,
                  4 + hauteur[i],
                  0,
                  'black',
                  1.2,
                  'milieu',
                  false,
                ),
              )
            } else if (
              additOp1.gte(10) &&
              additOp1.sub(10).sub(parseInt(ArrsOp1[i])).abs().lessThan(0.5)
            ) {
              // addition >= 10 & unités différentes donc il faut mettre une retenue
              // addition >= 10 & et les unités sont les mêmes donc il faut mettre une retenue
              objets.push(
                texteParPosition(
                  '1',
                  i * espacement - 0.25,
                  4 + hauteur[i],
                  0,
                  'red',
                  0.8,
                  'milieu',
                  false,
                ),
              )
              break
            }
          }
        }
        if (sop2[i] !== ' ')
          objets.push(
            texteParPosition(
              sop2[i],
              i * espacement,
              3,
              0,
              'black',
              1.2,
              'milieu',
              false,
            ),
          )
        if (sresultat[i] !== ' ')
          objets.push(
            texteParPosition(
              sresultat[i],
              i * espacement,
              1,
              0,
              'black',
              1.2,
              'milieu',
              false,
            ),
          )
      }
    }

    objets.push(segment(0, 2, (longueuroperandes + 1) * espacement, 2))
    if (decalage !== 0) {
      objets.push(
        texteParPosition(
          ',',
          0.3 + espacement * (longueuroperandes - decalage),
          4 + (context.vue === 'latex' ? -0.2 : 0),
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
      objets.push(
        texteParPosition(
          ',',
          0.3 + espacement * (longueuroperandes - decalage),
          3 + (context.vue === 'latex' ? -0.2 : 0),
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
      if (calculer)
        objets.push(
          texteParPosition(
            ',',
            0.3 + espacement * (longueuroperandes - decalage),
            1 + (context.vue === 'latex' ? -0.2 : 0),
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
    }

    code += mathalea2d(
      Object.assign(
        { pixelsParCm: 20, scale: 0.8, style },
        fixeBordures(objets),
      ),
      objets,
    )
    return code
  }
  const MultiplicationPosee3d = function (
    operande1: number | Decimal,
    operande2: number | Decimal,
    base: number,
    calculer = true,
  ) {
    operande1 = new Decimal(operande1)
    operande2 = new Decimal(operande2)
    if (operande1.equals(0) || operande2.equals(0)) {
      return operande1.equals(0)
        ? `$${texNombre(operande1)}$ étant nul, le produit est nul.`
        : `$${texNombre(operande2)}$ étant nul, le produit est nul.`
    }
    if (operande1.equals(1) || operande2.equals(1)) {
      return operande1.equals(1)
        ? `Lorsqu'on multiplie par 1, le produit est le nombre initial, ici $${texNombre(operande2)}$.`
        : `Lorsqu'on multiplie par 1, le produit est le nombre initial, ici $${texNombre(operande1)}$.`
    }
    let sop1
    let sop2
    const objets = []
    let lignesinutiles = 0
    let zeroUtile1, zeroUtile2
    const produits = []
    let strprod = 0
    const sommes = []
    let dec1, dec2
    if (base ? base === 10 : true) {
      // on est en base 10, la multiplication peut être décimale, on gère
      zeroUtile1 = operande1.lt(1) // on gère les nombres en 0.xxx
      zeroUtile2 = operande2.lt(1)
      dec1 = nombreDeChiffresApresLaVirgule(operande1)
      dec2 = nombreDeChiffresApresLaVirgule(operande2)
      operande1 = operande1.mul(10 ** dec1)
      operande2 = operande2.mul(10 ** dec2)
      sop1 = (zeroUtile1 ? '0' : '') + Number(operande1).toString()
      sop2 = (zeroUtile2 ? '0' : '') + Number(operande2).toString()
    } else {
      // en base différente de 10, les opérandes sont entières
      dec1 = 0
      dec2 = 0
      sop1 = base10VersBaseN(operande1, base)
      sop2 = base10VersBaseN(operande2, base)
    }
    let sresultat
    const lop1 = sop1.length // nombre de chiffres de operande1
    const lop2 = sop2.length // nombre de chiffres de operande2
    const longueurtotale = lop1 + lop2 + 1
    const retenues = []
    for (let i = 0; i < lop2; i++) {
      // i est l'index de la ligne de produit (i est l'indice du chiffre de operande2 traité)
      retenues.push('0')
      produits.push('')
      for (let k = 0; k < i; k++) {
        // on remplit ses chaines avec des 0 pour les retenues et des ° pour les produits
        retenues[i] = `${retenues[i]}0` // non retenue
        produits[i] = `${produits[i]}°` // non présence de chiffre dans le produit (décalage = zéro non affiché)
      }
      if (sop2[lop2 - i - 1] !== '0') {
        // On évite la ligne de 0 si le chiffre de l'operande2 est 0 (0.xxx)
        for (let j = 0; j < lop1; j++) {
          // on effectue le produit du chiffre de l'operande2 par l'operande1 (j est l'indice du chiffre de operande1 traité)
          if (base ? base === 10 : true) {
            strprod =
              parseInt(sop1[lop1 - j - 1]) * parseInt(sop2[lop2 - i - 1]) +
              parseInt(retenues[i][0]) // retenues[i][0] est la retenue du produit précédent
            if (j !== lop1 - 1)
              retenues[i] =
                `${Number(Math.floor(strprod / 10)).toString()}${retenues[i]}` // la nouvelle retenue est stockée en début de chaine retenues[i]
            // il n'y a pas de retenues sur le dernier produit on ajoutera les dizaines dans la chaine produits[i] à la fin
            produits[i] = `${Number(strprod % 10).toString()}${produits[i]}` // le chiffre du produit courant est stocké en début de chaine produits[i]
          } else {
            // ici on gère le calcul dans les autres bases (note de relecture : si base = 10 ce code fait la même chose qu'au dessus on pourrait ne garder que ce code)
            strprod =
              parseInt(sop1[lop1 - j - 1], base) *
                parseInt(sop2[lop2 - i - 1], base) +
              parseInt(retenues[i][0], base)
            retenues[i] =
              `${Number(Math.floor(strprod / base)).toString()}${retenues[i]}`
            produits[i] = `${Number(strprod % base).toString()}${produits[i]}`
          }
        }
        produits[i] =
          `${Number(Math.floor(strprod / 10)).toString()}${produits[i]}` // on ajoute les dizaines du dernier produit en début de produits[i]
      } else {
        // ici on multiplie par 0 donc le produit est 0 et il n'y a pas de retenue ça ne sera pas affiché, mais on remplit les tableaux
        for (let j = 0; j < lop1; j++) {
          retenues[i] = `0${retenues[i]}`
          produits[i] = `°${produits[i]}`
        }
      }
    }
    // mise en page : on complète les chaines à la même longueur
    for (let i = lop2; i < longueurtotale; i++) {
      sop2 = ` ${sop2}`
    }
    for (let i = lop1; i <= longueurtotale; i++) {
      sop1 = ` ${sop1}`
    }
    for (let i = 0; i < lop2; i++) {
      for (let j = retenues[i].length; j <= longueurtotale; j++) {
        retenues[i] = `0${retenues[i]}`
      }
    }
    let resultat
    if (base ? base === 10 : true) {
      resultat = operande1.mul(operande2)
    } else {
      resultat = base10VersBaseN(operande1.mul(operande2), base)
    }
    sresultat = resultat.toString()
    if (dec1 + dec2 === sresultat.length) sresultat = '0' + sresultat
    const lresultat = sresultat.length
    for (let i = 0; i < lop2; i++) {
      for (let j = produits[i].length; j <= lresultat; j++) {
        produits[i] = `0${produits[i]}`
      }
    }
    // la dernière chaine de retenue sera celle de la somme, on la complète ici
    retenues.push('0')
    for (let i = 0; i < lresultat - 1; i++) {
      sommes.push(0)
      sommes[i] += parseInt(retenues[lop2][0])
      for (let j = 0; j < lop2; j++) {
        if (
          produits[j][lresultat - i] !== '0' &&
          produits[j][lresultat - i] !== '°'
        ) {
          sommes[i] += parseInt(produits[j][lresultat - i])
        }
      }
      retenues[lop2] =
        `${Number(Math.floor(sommes[i] / 10)).toString()}${retenues[lop2]}`
    }
    // on remplace les zéros dans les produits par des espaces
    for (let i = 0; i < lop2; i++) {
      produits[i] = cacherleszerosdevant(produits[i])
      for (let j = produits[i].length; j <= longueurtotale; j++) {
        produits[i] = ` ${produits[i]}`
      }
    }
    sop2 = `×${sop2}`
    for (let i = lresultat; i <= longueurtotale; i++) {
      sresultat = ` ${sresultat}`
    }
    // on complète la chaine de retenue à la taille de l'ensemble pour l'alignement
    for (let i = retenues[lop2].length; i <= longueurtotale; i++) {
      retenues[lop2] = `0${retenues[lop2]}`
    }
    // Ici commence la création des différents éléments affichés
    for (let i = 0; i <= longueurtotale; i++) {
      // d'abord les opérandes
      if (sop1[i] !== ' ')
        objets.push(
          texteParPosition(
            sop1[i],
            i * espacement,
            7,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
      if (sop2[i] !== ' ')
        objets.push(
          texteParPosition(
            sop2[i],
            i * espacement,
            6,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
    }
    // Les virgules éventuelles
    if (dec1 !== 0) {
      objets.push(
        texteParPosition(
          ',',
          0.3 + (longueurtotale - dec1) * espacement,
          7,
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
    }
    if (dec2 !== 0) {
      objets.push(
        texteParPosition(
          ',',
          0.3 + (longueurtotale - dec2) * espacement,
          6,
          0,
          'black',
          1.2,
          'milieu',
          false,
        ),
      )
    }
    // Les produits partiels
    if (calculer && lop2 !== 1) {
      for (let j = 0; j < lop2; j++) {
        if (sop2[longueurtotale - j] !== '0') {
          for (let i = 0; i <= longueurtotale; i++) {
            if (produits[j][i] !== ' ' && produits[j][i] !== '°')
              objets.push(
                texteParPosition(
                  produits[j][i],
                  i * espacement,
                  5 - j + lignesinutiles,
                  0,
                  'black',
                  1.2,
                  'milieu',
                  false,
                ),
              )
            // if (retenues[j][i] !== '0' && retenuesOn) objets.push(texteParPosition(`(${retenues[j][i]})`, i * espacement, 5.5 - j + lignesinutiles, 0, 'blue', 0.7, 'milieu', false))
          }
        } else {
          lignesinutiles++
        }
      }
      // Les retenues
      for (let i = 0; i <= longueurtotale; i++) {
        if (!(produits[lop2 - 1][2] === ' ' && i === 2)) {
          // on n'affiche pas la retenue si il n'y a pas autre chose dans la dernière colonne
          if (retenues[lop2][i] !== '0')
            objets.push(
              texteParPosition(
                retenues[lop2][i],
                i * espacement,
                5.5,
                0,
                'red',
                0.7,
                'milieu',
                false,
              ),
            )
        }
      }
    }
    // Les traits horizontaux
    if (calculer && lop2 !== 1)
      objets.push(
        segment(
          0,
          5.2 - lop2 + lignesinutiles,
          (longueurtotale + 1) * espacement,
          5.2 - lop2 + lignesinutiles,
        ),
      )
    objets.push(segment(0, 5.5, (longueurtotale + 1) * espacement, 5.5))
    if (calculer) {
      // Le résultat et sa virgule
      for (let i = 0; i <= longueurtotale; i++) {
        if (sresultat[i] !== ' ')
          objets.push(
            texteParPosition(
              sresultat[i],
              i * espacement,
              4.5 - (lop2 === 1 ? 0 : lop2) + lignesinutiles,
              0,
              'black',
              1.2,
              'milieu',
              false,
            ),
          )
      }
      if (dec1 + dec2 !== 0) {
        objets.push(
          texteParPosition(
            ',',
            0.3 + (longueurtotale - dec2 - dec1) * espacement,
            4.5 - (lop2 === 1 ? 0 : lop2) + lignesinutiles,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
      }
      for (let j = 1; j < lop2 - lignesinutiles; j++) {
        objets.push(
          texteParPosition(
            '+',
            0,
            5 + j - lop2 + lignesinutiles,
            0,
            'black',
            1.2,
            'milieu',
            false,
          ),
        )
      }
    }
    const code = mathalea2d(
      Object.assign(
        { pixelsParCm: 20, scale: 0.8, style },
        fixeBordures(objets),
      ),
      objets,
    )

    return code
  }
  let colore = ''
  if (options.colore != null) colore = options.colore
  const solution = options.solution ? 'Solution' : ''
  if (context.isHtml) {
    switch (type) {
      case 'soustraction':
        Code = SoustractionPosee3d(
          operande1,
          operande2,
          base,
          retenuesOn,
          methodeParCompensation,
          calculer,
        )
        break
      case 'multiplication':
        Code = MultiplicationPosee3d(operande1, operande2, base, calculer)
        break
      case 'division':
        Code = DivisionPosee3d(operande1, operande2, precision, calculer)
        break
      case 'divisionE':
        Code = DivisionPosee3d(operande1, operande2, 0, calculer)
        break
      case 'addition':
      default:
        Code = AdditionPosee3d(operande1, operande2, base, retenuesOn, calculer)
        break
    }
  } else {
    switch (type) {
      case 'soustraction':
        if (!methodeParCompensation) {
          Code = SoustractionPosee3d(
            operande1,
            operande2,
            base,
            retenuesOn,
            methodeParCompensation,
            calculer,
          )
        } else {
          Code = options.colore
            ? `Addition${colore}[${solution}]{${operande1}}{${operande2}}`
            : options.solution
              ? `\\opsub[lineheight=\\baselineskip,columnwidth=2ex,carrysub,lastcarry,decimalsepsymbol={,},voperator=bottom,voperation=top]{${operande1}}{${operande2}}`
              : `\\opsub[lineheight=\\baselineskip,columnwidth=2ex,displayshiftintermediary=none,resultstyle=\\white,intermediarystyle=\\white,remainderstyle=\\white,decimalsepsymbol={,},voperator=bottom,voperation=top]{${operande1}}{${operande2}}`
        } // { Code = `\\opsub[carrysub,lastcarry,decimalsepsymbol={,},voperator=bottom,voperation=top]{${operande1}}{${operande2}}` }
        break
      case 'multiplication':
        Code = options.colore
          ? `\\Multiplication${colore}[${solution}]{${operande1}}{${operande2}}`
          : options.solution
            ? `\\opmul[lineheight=\\baselineskip,columnwidth=2ex,displayshiftintermediary=all,decimalsepsymbol={,},voperator=bottom,voperation=top]{${operande1}}{${operande2}}`
            : `\\opmul[lineheight=\\baselineskip,columnwidth=2ex,displayshiftintermediary=none,resultstyle=\\white,intermediarystyle=\\white,remainderstyle=\\white,decimalsepsymbol={,},voperator=bottom,voperation=top]{${operande1}}{${operande2}}`
        break
      case 'division':
        Code = options.colore
          ? `\\Division${colore}[${solution}]{${operande1}}{${operande2}}`
          : options.solution
            ? `\\opdiv[lineheight=\\baselineskip,columnwidth=2ex,displayintermediary=all,voperation=top,period,decimalsepsymbol={,},shiftdecimalsep=none]{${operande1}}{${operande2}}`
            : `\\opdiv[lineheight=\\baselineskip,columnwidth=2ex,displayshiftintermediary=none,resultstyle=\\white,intermediarystyle=\\white,remainderstyle=\\white,voperation=top,period,decimalsepsymbol={,},shiftdecimalsep=none]{${operande1}}{${operande2}}`
        break
      case 'divisionE':
        Code = options.colore
          ? `\\Division${colore}{${operande1}}{${operande2}}`
          : options.solution
            ? `\\opidiv[lineheight=\\baselineskip,columnwidth=2ex,voperation=top]{${operande1}}{${operande2}}`
            : `\\opidiv[lineheight=\\baselineskip,columnwidth=2ex,displayshiftintermediary=none,resultstyle=\\white,intermediarystyle=\\white,remainderstyle=\\white,voperation=top]{${operande1}}{${operande2}}`
        break
      case 'addition':
      default:
        Code = options.colore
          ? `\\Addition${colore}[${solution}]{${operande1}}{${operande2}}`
          : options.solution
            ? `\\opadd[lineheight=\\baselineskip,columnwidth=2ex,decimalsepsymbol={,},voperator=bottom,voperation=top]{${operande1}}{${operande2}}`
            : `\\opadd[lineheight=\\baselineskip,columnwidth=2ex,displayshiftintermediary=none,resultstyle=\\white,intermediarystyle=\\white,remainderstyle=\\whitedecimalsepsymbol={,},voperator=bottom,voperation=top]{${operande1}}{${operande2}}`
        break
    }
  }

  return Code
}
