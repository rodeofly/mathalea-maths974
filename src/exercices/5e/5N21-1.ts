import Decimal from 'decimal.js'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { propositionsQcm } from '../../lib/interactif/qcm'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import {
  nombreDeChiffresDansLaPartieDecimale,
  nombreDeChiffresDe,
} from '../../lib/outils/nombres'
import { sp } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { getDigitFromNumber } from '../6e/_ExerciceConversionsLongueurs'
import Exercice from '../Exercice'

export const titre = 'Convertir des volumes ou des capacités'
export const amcReady = true
export const amcType = 'qcmMono'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']
export const dateDeModifImportante = '05/06/2023'

/**
 * Conversions d'unités de volumes vers les unités de capacité ou inversement.
 *
 * Dans la correction, on passe systématiquement par l'équivalence dm3 = L
 *
 * * 1 : Unités de volume vers litres
 * * 2 : Litres vers unités de volume
 * * 3 : Un mélange de toutes les conversions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @author Rémi Angot

 */
export const uuid = 'f4d29'

export const refs = {
  'fr-fr': ['5N21-1', '3AutoG06-2'],
  'fr-2016': ['6M31-2'],
  'fr-ch': ['10GM3-6'],
}
export default class UnitesDeVolumesEtDeCapacite extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      3,
      '1 : Unités de volume vers litres\n2 : Litres vers unités de volume\n3 : Mélange',
    ]
    this.besoinFormulaire2CaseACocher = ['Avec des nombres décimaux']
    this.besoinFormulaire3Numerique = [
      'Avec tableau',
      4,
      "Uniquement dans l'énoncé\nUniquement dans la correction\nDans l'énoncé et dans la correction\nNi dans l'enoncé, ni dans la correction",
    ]

    this.sup = 1 // Niveau de difficulté de l'exercice
    this.sup2 = false // Avec des nombres décimaux ou pas
    this.sup3 = 4
    this.sup4 = 2
    this.spacing = 2
    this.nbQuestions = 8
  }

  nouvelleVersion() {
    if (!(context.vue === 'diap'))
      this.besoinFormulaire4Numerique = [
        'Exercice interactif',
        2,
        '1 : QCM\n2 : Numérique',
      ]

    Decimal.set({ toExpNeg: -10 }) // Pour permettre aux petits nombres de s'afficher sans puissances de 10.

    this.consigne =
      this.interactif && this.sup4 === 1
        ? 'Cocher la bonne réponse.'
        : 'Compléter.'
    this.interactifType = this.sup4 === 2 ? 'mathLive' : 'qcm'
    let listeTypeDeQuestions
    if (this.sup === 1) {
      listeTypeDeQuestions = combinaisonListes(
        ['dam3toL', 'm3toL', 'dm3toL', 'cm3toL'],
        this.nbQuestions,
      )
    } else if (this.sup === 2) {
      listeTypeDeQuestions = combinaisonListes(
        ['Ltodm3', 'Ltocm3', 'Ltom3'],
        this.nbQuestions,
      )
    } else {
      listeTypeDeQuestions = combinaisonListes(
        [
          'dam3toL',
          'm3toL',
          'dm3toL',
          'cm3toL',
          'mm3toL',
          'Ltodm3',
          'Ltocm3',
          'Ltom3',
        ],
        this.nbQuestions,
      )
    }
    let listeDeN = []
    let bonusDecimalesAMC, resultat, resultatFaux
    if (this.sup2) {
      listeDeN = combinaisonListes([1, 2, 3, 4], this.nbQuestions)
    } else {
      listeDeN = combinaisonListes([1, 2, 3, 4, 5, 6], this.nbQuestions)
    }
    for (
      let i = 0, n, uniteFinale, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      if (this.sup2) {
        switch (listeDeN[i]) {
          case 1:
            n = new Decimal(randint(2, 9)).div(10)
            break
          case 2:
            n = new Decimal(randint(11, 99)).div(10)
            break
          case 3:
            n = new Decimal(randint(1, 9)).div(10).add(randint(1, 9) * 10)
            break
          case 4:
          default:
            n = new Decimal(
              randint(11, 99, [10, 20, 30, 40, 50, 60, 70, 80, 90]),
            ).div(100)
            break
        }
      } else {
        switch (listeDeN[i]) {
          case 1:
            n = new Decimal(randint(2, 9))
            break
          case 2:
            n = new Decimal(randint(11, 99))
            break
          case 3:
            n = new Decimal(randint(1, 9) * 10)
            break
          case 4:
            n = new Decimal(randint(1, 9) * 100)
            break
          case 5:
            n = new Decimal(randint(11, 99) * 100)
            break
          case 6:
          default:
            n = new Decimal(randint(1, 9) * 1000)
            break
        }
      }
      switch (listeTypeDeQuestions[i]) {
        case 'dam3toL':
          texte = `$${texNombre(n, 3)}${sp()}\\text{dam}^3=\\dotfill${sp()}\\text{L}$`
          bonusDecimalesAMC = n.toNumber() < 1000 ? randint(0, 1) : 0 // Sinon, cela fait trop de digits
          resultat = n.mul(1000000)
          setReponse(this, i, resultat, {
            digits: Math.min(
              nombreDeChiffresDe(resultat.toNumber()) +
                randint(0, 1) +
                bonusDecimalesAMC,
              10,
            ),
            decimals:
              nombreDeChiffresDansLaPartieDecimale(resultat.toNumber()) +
              bonusDecimalesAMC,
            signe: false,
          })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{dam}^3=${texNombre(n, 3)}\\times1${sp()}000\\times1${sp()}000${sp()}\\text{dm}^3=${texNombre(resultat, 0)}${sp()}\\text{L}$`
          texteCorr +=
            this.sup3 === 1 || this.sup3 === 4
              ? ''
              : '<br>' +
                buildTab(
                  n.toNumber(),
                  'dam',
                  resultat.toNumber(),
                  'dm',
                  2,
                  true,
                )

          break
        case 'm3toL':
          texte = `$${texNombre(n, 3)}${sp()}\\text{m}^3=\\dotfill${sp()}\\text{L}$`
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.mul(1000)
          setReponse(this, i, resultat, {
            digits:
              nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC,
            decimals:
              nombreDeChiffresDansLaPartieDecimale(resultat) +
              bonusDecimalesAMC,
            signe: false,
          })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{m}^3=${texNombre(n, 3)}\\times1${sp()}000${sp()}\\text{dm}^3=${texNombre(resultat, 0)}${sp()}\\text{L}$`
          texteCorr +=
            this.sup3 === 1 || this.sup3 === 4
              ? ''
              : '<br>' +
                buildTab(n.toNumber(), 'm', resultat.toNumber(), 'dm', 2, true)
          break
        case 'dm3toL':
          texte = `$${texNombre(n, 3)}${sp()}\\text{dm}^3=\\dotfill${sp()}\\text{L}$`
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.mul(1)
          setReponse(this, i, resultat, {
            digits:
              nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC,
            decimals:
              nombreDeChiffresDansLaPartieDecimale(resultat) +
              bonusDecimalesAMC,
            signe: false,
          })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{dm}^3=${texNombre(resultat, 3)}${sp()}\\text{L}$`
          texteCorr +=
            this.sup3 === 1 || this.sup3 === 4
              ? ''
              : '<br>' +
                buildTab(n.toNumber(), 'dm', resultat.toNumber(), 'dm', 2, true)
          break
        case 'cm3toL':
          texte = `$${texNombre(n, 3)}${sp()}\\text{cm}^3=\\dotfill${sp()}\\text{L}$`
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.div(1000)
          setReponse(this, i, resultat, {
            digits:
              nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC,
            decimals:
              nombreDeChiffresDansLaPartieDecimale(resultat) +
              bonusDecimalesAMC,
            signe: false,
          })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{cm}^3=${texNombre(n, 3)}\\div 1${sp()}000${sp()}\\text{dm}^3=${texNombre(resultat, 6)}${sp()}\\text{L}$`
          texteCorr +=
            this.sup3 === 1 || this.sup3 === 4
              ? ''
              : '<br>' +
                buildTab(n.toNumber(), 'cm', resultat.toNumber(), 'dm', 2, true)
          break
        case 'mm3toL':
          texte = `$${texNombre(n, 3)}${sp()}\\text{mm}^3=\\dotfill${sp()}\\text{L}$`
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.div(1000000)
          setReponse(this, i, resultat, {
            digits:
              nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC,
            decimals:
              nombreDeChiffresDansLaPartieDecimale(resultat) +
              bonusDecimalesAMC,
            signe: false,
          })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{mm}^3=${texNombre(n, 3)}\\div1${sp()}000\\div 1${sp()}000${sp()}\\text{dm}^3=${texNombre(resultat, 9)}${sp()}\\text{L}$`
          texteCorr +=
            this.sup3 === 1 || this.sup3 === 4
              ? ''
              : '<br>' +
                buildTab(n.toNumber(), 'mm', resultat.toNumber(), 'dm', 2, true)
          break
        case 'Ltodm3':
          texte = `$${texNombre(n, 3)}${sp()}\\text{L}=\\dotfill${sp()}\\text{dm}^3$`
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.mul(1)
          setReponse(this, i, resultat, {
            digits:
              nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC,
            decimals:
              nombreDeChiffresDansLaPartieDecimale(resultat) +
              bonusDecimalesAMC,
            signe: false,
          })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{L}=${texNombre(resultat, 3)}${sp()}\\text{dm}^3$`
          texteCorr +=
            this.sup3 === 1 || this.sup3 === 4
              ? ''
              : '<br>' +
                buildTab(n.toNumber(), 'dm', resultat.toNumber(), 'dm', 2, true)
          break
        case 'Ltocm3':
          texte = `$${texNombre(n, 3)}${sp()}\\text{L}=\\dotfill${sp()}\\text{cm}^3$`
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.mul(1000)
          setReponse(this, i, resultat, {
            digits:
              nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC,
            decimals:
              nombreDeChiffresDansLaPartieDecimale(resultat) +
              bonusDecimalesAMC,
            signe: false,
          })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{L}=${texNombre(n, 0)}${sp()}\\text{dm}^3=${texNombre(n, 0)}\\times1${sp()}000${sp()}\\text{cm}^3=${texNombre(n.mul(1000))}${sp()}\\text{cm}^3$`
          texteCorr +=
            this.sup3 === 1 || this.sup3 === 4
              ? ''
              : '<br>' +
                buildTab(n.toNumber(), 'dm', resultat.toNumber(), 'cm', 2, true)
          break
        case 'Ltom3':
        default:
          texte = `$${texNombre(n, 3)}${sp()}\\text{L}=\\dotfill${sp()}\\text{m}^3$`
          bonusDecimalesAMC = randint(0, 1)
          resultat = n.div(1000)
          setReponse(this, i, resultat, {
            digits:
              nombreDeChiffresDe(resultat) + randint(0, 1) + bonusDecimalesAMC,
            decimals:
              nombreDeChiffresDansLaPartieDecimale(resultat) +
              bonusDecimalesAMC,
            signe: false,
          })
          texteCorr = `$${texNombre(n, 3)}${sp()}\\text{L}=${texNombre(n, 3)}${sp()}\\text{dm}^3=${texNombre(n, 3)}\\div1${sp()}000${sp()}\\text{m}^3=${texNombre(resultat, 6)}${sp()}\\text{m}^3$`
          texteCorr +=
            this.sup3 === 1 || this.sup3 === 4
              ? ''
              : '<br>' +
                buildTab(n.toNumber(), 'dm', resultat.toNumber(), 'm', 2, true)
          break
      }

      this.autoCorrection[i].enonce = `${texte}\n`
      resultatFaux = combinaisonListes(
        [
          resultat.div(1000000),
          resultat.div(10000),
          resultat.div(1000),
          resultat.mul(1000000),
          resultat.mul(10000),
          resultat.mul(1000),
        ],
        6,
      )
      this.autoCorrection[i].propositions = [
        {
          texte: `$${texNombre(resultat, 20)}$`,
          statut: true,
        },
        {
          texte: `$${texNombre(resultatFaux[0], 20)}$`,
          statut: false,
        },
        {
          texte: `$${texNombre(resultatFaux[1], 20)}$`,
          statut: false,
        },
        {
          texte: `$${texNombre(resultatFaux[2], 20)}$`,
          statut: false,
        },
        {
          texte: `$${texNombre(resultatFaux[3], 20)}$`,
          statut: false,
        },
      ]

      const props = propositionsQcm(this, i)
      if (this.interactif && this.interactifType === 'qcm') {
        texte += props.texte
      } else if (this.interactif && this.interactifType === 'mathLive') {
        uniteFinale = listeTypeDeQuestions[i].split('to')[1]
        uniteFinale =
          uniteFinale === 'L'
            ? sp() + '$\\text{L}$'
            : sp() + `$ \\text{${uniteFinale.split('3')[0]}}^3$`
        // texte = texte.replace('\\dotfill', `$${ajouteChampTexteMathLive(this, i, '', {
        texte =
          texte.split('\\dotfill')[0] +
          `$${ajouteChampTexteMathLive(this, i, '', {
            texteApres: uniteFinale,
          })}`
        setReponse(this, i, resultat)
      }

      if ((this.sup3 === 1 || this.sup3 === 3) && i === this.nbQuestions - 1) {
        texte +=
          '<br><br>' +
          buildTab(0, '', 0, '', Math.min(8, this.nbQuestions), true)
      }

      if (this.questionJamaisPosee(i, uniteFinale ?? 'm', resultat)) {
        // Si la question n'a jamais été posée, on en crée une autre
        if (context.vue === 'diap') {
          texte = texte.replace('= \\dotfill', '\\text{ en }')
        }
        if (context.isHtml) {
          texte = texte.replace(
            '\\dotfill',
            '................................................',
          )
        }
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}

function buildTab(
  a: number,
  uniteA: string,
  r: number,
  uniteR: string,
  ligne = 2,
  correction = false,
) {
  const tabRep = function (nbre: number, uniteNbre: string): string[] {
    const res = []
    let caseARemplir
    // for (let ee = 0; ee < 21; ee++) res.push('\\hspace*{0.4cm}')
    for (let ee = 0; ee < 21; ee++) res.push('')
    switch (uniteNbre.replaceAll(' ', '')) {
      case 'dam':
        for (let i = 0; i < 21; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(String(nbre), 10 ** (5 - i)) !== ''
                ? '\\hspace*{0.2cm}' +
                  getDigitFromNumber(String(nbre), 10 ** (5 - i)) +
                  '\\hspace*{0.2cm}'
                : '\\hspace*{0.6cm}'
              : getDigitFromNumber(String(nbre), 10 ** (5 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(String(nbre), 10 ** (5 - i))
          res[i] =
            (5 - i === 0 ? '\\color{red}{' : '') +
            caseARemplir +
            (5 - i === 0
              ? new Decimal(nbre).decimalPlaces() === 0
                ? '}'
                : ',}'
              : '')
        }
        break
      case 'm':
        for (let i = 0; i < 21; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(String(nbre), 10 ** (8 - i)) !== ''
                ? '\\hspace*{0.2cm}' +
                  getDigitFromNumber(String(nbre), 10 ** (8 - i)) +
                  '\\hspace*{0.2cm}'
                : '\\hspace*{0.6cm}'
              : getDigitFromNumber(String(nbre), 10 ** (8 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(String(nbre), 10 ** (8 - i))
          res[i] =
            (8 - i === 0 ? '\\color{red}{' : '') +
            caseARemplir +
            (8 - i === 0
              ? new Decimal(nbre).decimalPlaces() === 0
                ? '}'
                : ',}'
              : '')
        }
        break
      case 'dm':
        for (let i = 0; i < 21; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(String(nbre), 10 ** (11 - i)) !== ''
                ? '\\hspace*{0.2cm}' +
                  getDigitFromNumber(String(nbre), 10 ** (11 - i)) +
                  '\\hspace*{0.2cm}'
                : '\\hspace*{0.6cm}'
              : getDigitFromNumber(String(nbre), 10 ** (11 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(String(nbre), 10 ** (11 - i))
          res[i] =
            (11 - i === 0 ? '\\color{red}{' : '') +
            caseARemplir +
            (11 - i === 0
              ? new Decimal(nbre).decimalPlaces() === 0
                ? '}'
                : ',}'
              : '')
        }
        break
      case 'cm':
        for (let i = 0; i < 21; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(String(nbre), 10 ** (14 - i)) !== ''
                ? '\\hspace*{0.2cm}' +
                  getDigitFromNumber(String(nbre), 10 ** (14 - i)) +
                  '\\hspace*{0.2cm}'
                : '\\hspace*{0.6cm}'
              : getDigitFromNumber(String(nbre), 10 ** (14 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(String(nbre), 10 ** (14 - i))
          res[i] =
            (14 - i === 0 ? '\\color{red}{' : '') +
            caseARemplir +
            (14 - i === 0
              ? new Decimal(nbre).decimalPlaces() === 0
                ? '}'
                : ',}'
              : '')
        }
        break
      case 'mm':
        for (let i = 0; i < 21; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(String(nbre), 10 ** (17 - i)) !== ''
                ? '\\hspace*{0.2cm}' +
                  getDigitFromNumber(String(nbre), 10 ** (17 - i)) +
                  '\\hspace*{0.2cm}'
                : '\\hspace*{0.6cm}'
              : getDigitFromNumber(String(nbre), 10 ** (17 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(String(nbre), 10 ** (17 - i))
          res[i] =
            (17 - i === 0 ? '\\color{red}{' : '') +
            caseARemplir +
            (17 - i === 0
              ? new Decimal(nbre).decimalPlaces() === 0
                ? '}'
                : ',}'
              : '')
        }
        break
    }
    return res
  }

  const createTab = function (
    aT: string[],
    rT: string[],
    first: number,
    end: number,
    ligne: number,
    correction = false,
  ) {
    let texte = '$\\def\\arraystretch{1.5}\\begin{array}{|'
    for (let i = first; i <= end; i++) {
      texte += 'c|'
    }
    texte += '}'
    const headers2 = [
      '\\hspace*{0.4cm}',
      '\\text{dam}^3',
      '\\text{m}^3',
      '\\text{dm}^3',
      '\\text{cm}^3',
      '\\text{mm}^3',
      '\\hspace*{0.4cm}',
    ]
    texte += '\\hline '
    for (let i = first; i < end; i++) {
      texte += `${headers2[i]} ${i < end - 1 ? ' &' : ' \\\\'}`
    }

    for (let i = first; i < first + 3; i++) {
      texte += '&'
    }
    texte += '\\begin{array}{c|c|c}'
    texte += '\\text{hL} & \\text{daL} & \\text{L}\\hspace*{0.2cm}\\\\'
    texte += '\\end{array}&'
    texte += '\\begin{array}{c|c|c}'
    texte +=
      '\\hspace*{0.1cm}\\text{dL} & \\hspace*{0.1cm}\\text{cL}\\hspace*{0.1cm} & \\text{mL}\\\\'
    texte += '\\end{array}&'

    for (let i = first + 5; i < end; i++) {
      texte += i !== end - 1 ? ' & ' : ''
    }
    if (correction) {
      texte += '\\\\'
      texte += '\\hline '
      for (let i = first; i < end; i++) {
        texte += '\\begin{array}{c|c|c}'
        texte += `${aT[3 * i]} & ${aT[3 * i + 1]}& ${aT[3 * i + 2]}  \\\\`
        texte += `${rT[3 * i]}  & ${rT[3 * i + 1]}& ${rT[3 * i + 2]}  \\\\`
        texte += !correction
          ? ` ${rT[3 * i]} & ${rT[3 * i + 1]}& ${rT[3 * i + 2]}  \\\\`
          : ''
        texte += '\\end{array}'
        texte += i !== end - 1 ? ' & ' : ''
      }
    } else {
      for (let k = 1; k <= ligne; k++) {
        texte += '\\\\ \\hline '
        for (let i = first; i < end; i++) {
          texte += '\\begin{array}{c|c|c}'
          texte += '\\hspace*{0.6cm} & \\hspace*{0.6cm} & \\hspace*{0.6cm} \\\\'
          texte += '\\end{array}'
          texte += i !== end - 1 ? ' & ' : ''
        }
      }
    }
    texte += '\\\\ \\hline '

    texte += ' \\end{array}$'
    return texte
  }
  const aTab = tabRep(a, uniteA)
  const rTab = tabRep(r, uniteR)
  const texte = createTab(aTab, rTab, 0, 6, ligne, correction)
  return texte
}
