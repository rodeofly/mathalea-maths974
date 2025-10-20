import Decimal from 'decimal.js'
import { texTexte } from '../../lib/format/texTexte'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { propositionsQcm } from '../../lib/interactif/qcm'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { sp } from '../../lib/outils/outilString'
import { texNombre } from '../../lib/outils/texNombre'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { getDigitFromNumber } from '../6e/_ExerciceConversionsLongueurs'
import Exercice from '../Exercice'

export const titre = 'Convertir des volumes'
export const amcReady = true
export const amcType = 'qcmMono'
export const interactifReady = true
export const interactifType = ['qcm', 'mathLive']

export const dateDeModifImportante = '03/06/2024'

/**
 * Conversions de volumes.
 *
 * Dans la correction, on ne voit qu`une multiplication ou qu`une division pour obtenir le résultat
 *
 * * 1 : Conversions en mètres-cubes avec des multiplications
 * * 2 : Conversions en mètres-cubes avec des divisions
 * * 3 : Conversions en mètres-cubes avec des multiplications ou divisions
 * * 4 : Conversions avec des multiplications ou divisions
 * * Paramètre supplémentaire : utiliser des nombres décimaux (par défaut tous les nombres sont entiers)
 * @author Rémi Angot
 * Amélioration de l'interactivité (mathLive maintenant inline) par Guillaume Valmont le 14/05/2022
 */
export const uuid = '33ac2'

export const refs = {
  'fr-fr': ['5N21', '3AutoG06-4'],
  'fr-2016': ['6M31'],
  'fr-ch': ['9GM2-3'],
}

function nombreAleatoire(nbChiffres: number) {
  // retourne un entier aléatoire à n chiffres sous la forme d'un Decimal
  let a = new Decimal(0)
  for (let i = 0; i < nbChiffres; i++) {
    a = a.add(randint(1, 9) * 10 ** i)
  }
  return a
}
export default class ExerciceConversionsVolumes extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Niveau de difficulté',
      5,
      '1 : Conversions en mètres-cubes avec des multiplications\n2 : Conversions en mètres-cubes avec des divisions\n3 : Conversions en mètres-cubes avec des multiplications ou divisions\n4 : Conversions avec des multiplications ou divisions\n5 : Mélange',
    ]
    this.besoinFormulaire2CaseACocher = ['Avec des nombres décimaux']
    this.besoinFormulaire4CaseACocher = ['Avec tableau', false]

    this.sup = 1 // Niveau de difficulté de l`exercice
    this.sup2 = false // Avec des nombres décimaux ou pas
    this.sup3 = 1 // interactifType Qcm
    this.spacing = 2
  }

  nouvelleVersion() {
    if (context.isHtml && !(context.vue === 'diap'))
      this.besoinFormulaire3Numerique = [
        'Exercice interactif',
        2,
        '1 : QCM\n2 : Numérique',
      ] // Texte, tooltip
    this.consigne =
      this.interactif && this.sup3 === 1
        ? 'Cocher la bonne réponse.'
        : 'Compléter.'
    this.interactifType = this.sup3 === 2 ? 'mathLive' : 'qcm'

    Decimal.set({ toExpNeg: -20, toExpPos: 20 }) // pour éviter la conversion en notation scientifique on va jusqu'à 20 décimales (-7 est la valeur par défaut)
    const prefixeMulti = [
      [' da', '\\times1000', 1000],
      [' h', '\\times1000\\times1000', 1000000],
      [' k', '\\times1000\\times1000\\times1000', 1000000000],
    ]
    const prefixeDiv = [
      [' d', '\\div1000', 1000],
      [' c', '\\div1000\\div1000', 1000000],
      [' m', '\\div1000\\div1000\\div1000', 1000000000],
    ]

    const unite = 'm'
    const listeUnite = ['mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km']
    for (
      let i = 0,
        a,
        k,
        div,
        resultat,
        resultatFaux,
        typesDeQuestions,
        texte,
        texteCorr,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      this.autoCorrection[i] = {}
      // On limite le nombre d`essais pour chercher des valeurs nouvelles
      typesDeQuestions = this.sup < 5 ? this.sup : randint(1, 4)
      k = randint(0, 2) // Choix du préfixe
      if (typesDeQuestions === 1) {
        // niveau 1
        div = false // Il n`y aura pas de division
      } else if (typesDeQuestions === 2) {
        // niveau 2
        div = true // Avec des divisions
      } else if (typesDeQuestions === 3) {
        div = choice([true, false]) // Avec des multiplications ou des divisions
      } else {
        div = choice([true, false]) // Avec des multiplications ou des divisions sans toujours revenir au m^3
      }

      if (this.sup2) {
        // Si la case pour les nombres décimaux est cochée
        a = choice([
          new Decimal(randint(10, 199)).div(10),
          nombreAleatoire(1).div(10),
          nombreAleatoire(1).div(100),
          nombreAleatoire(3).div(100),
        ])
        // XX,X 0,X 0,0X X,XX
      } else {
        a = choice([
          nombreAleatoire(1),
          nombreAleatoire(1).mul(10),
          nombreAleatoire(1).mul(100),
          nombreAleatoire(2),
        ])
        // X, X0, X00, XX
      }

      if (!div && typesDeQuestions < 4) {
        // S'il faut multiplier pour convertir

        resultat = a.mul(prefixeMulti[k][2])
        texte =
          '$ ' +
          texNombre(a, 3) +
          texTexte(prefixeMulti[k][0] + unite) +
          '^3' +
          ' = \\dotfill ' +
          texTexte(unite) +
          '^3' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 3) +
          texTexte(prefixeMulti[k][0] + unite) +
          '^3' +
          ' =  ' +
          texNombre(a, 3) +
          prefixeMulti[k][1] +
          texTexte(unite) +
          '^3' +
          ' = ' +
          texNombre(resultat, 20) +
          texTexte(unite) +
          '^3' +
          '$'
        texteCorr +=
          '<br>' +
          buildTab(
            a.toNumber(),
            prefixeMulti[k][0] + 'm',
            resultat.toNumber(),
            unite,
            2,
            true,
          )
      } else if (div && typesDeQuestions < 4) {
        k = randint(0, 1) // Pas de conversions de mm^3 en m^3 avec des nombres décimaux car résultat inférieur à 10e-8
        // Le commentaire précédent est sans objet avec Decimal, on peut afficher ici 20 chiffres après la virgule sans passer en notation scientifique !
        resultat = a.div(prefixeMulti[k][2])
        texte =
          '$ ' +
          texNombre(a, 3) +
          texTexte(prefixeDiv[k][0] + unite) +
          '^3' +
          ' = \\dotfill ' +
          texTexte(unite) +
          '^3' +
          '$'
        texteCorr =
          '$ ' +
          texNombre(a, 3) +
          texTexte(prefixeDiv[k][0] + unite) +
          '^3' +
          ' =  ' +
          texNombre(a, 3) +
          prefixeDiv[k][1] +
          texTexte(unite) +
          '^3' +
          ' = ' +
          texNombre(resultat, 20) + // avec les Decimaux, on peut demander une telle précision, texNombre n'affichera que ce qui est utile (sauf à mettre force, le troisième paramètre à true)
          texTexte(unite) +
          '^3' +
          '$'
        texteCorr +=
          '<br>' +
          buildTab(
            a.toNumber(),
            prefixeDiv[k][0] + 'm',
            resultat.toNumber(),
            unite,
            2,
            true,
          )
      } else {
        const unite1 = randint(0, 3)
        let ecart = randint(1, 2) // nombre de multiplication par 10 pour passer de l`un à l`autre
        if (ecart > 4 - unite1) {
          ecart = 4 - unite1
        }
        const unite2 = unite1 + ecart
        let multiplicationsPar1000 = ''

        if (randint(0, 1) > 0) {
          switch (ecart) {
            case 1:
              multiplicationsPar1000 = `\\times 1${sp()}000`
              break
            case 2:
              multiplicationsPar1000 = `\\times 1${sp()}000 \\times 1${sp()}000`
              break
            case 3:
              multiplicationsPar1000 = `\\times 1${sp()}000 \\times 1${sp()}000 \\times 1${sp()}000`
              break
          }
          resultat = a.mul(10 ** (3 * ecart))
          texte =
            '$ ' +
            texNombre(a, 3) +
            texTexte(listeUnite[unite2]) +
            '^3' +
            ' = \\dotfill ' +
            texTexte(listeUnite[unite1]) +
            '^3' +
            '$'
          texteCorr =
            '$ ' +
            texNombre(a, 3) +
            texTexte(listeUnite[unite2]) +
            '^3' +
            ' =  ' +
            texNombre(a, 3) +
            multiplicationsPar1000 +
            texTexte(listeUnite[unite1]) +
            '^3' +
            ' = ' +
            texNombre(resultat, 20) + // avec les Decimaux, on peut demander une telle précision, texNombre n'affichera que ce qui est utile (sauf à mettre force, le troisième paramètre à true)
            texTexte(listeUnite[unite1]) +
            '^3' +
            '$'
          texteCorr +=
            '<br>' +
            buildTab(
              a.toNumber(),
              listeUnite[unite2],
              resultat.toNumber(),
              listeUnite[unite1],
              2,
              true,
            )
        } else {
          switch (ecart) {
            case 1:
              multiplicationsPar1000 = `\\div 1${sp()}000`
              break
            case 2:
              multiplicationsPar1000 = `\\div 1${sp()}000 \\div 1${sp()}000`
              break
            case 3:
            default:
              multiplicationsPar1000 = `\\div 1${sp()}000 \\div 1${sp()}000 \\div 1${sp()}000`
              break
          }
          resultat = a.div(10 ** (3 * ecart))
          texte =
            '$ ' +
            texNombre(a, 3) +
            texTexte(listeUnite[unite1]) +
            '^3' +
            ' = \\dotfill ' +
            texTexte(listeUnite[unite2]) +
            '^3' +
            '$'
          texteCorr =
            '$ ' +
            texNombre(a, 3) +
            texTexte(listeUnite[unite1]) +
            '^3' +
            ' =  ' +
            texNombre(a, 3) +
            multiplicationsPar1000 +
            texTexte(listeUnite[unite2]) +
            '^3' +
            ' = ' +
            texNombre(resultat, 20) +
            texTexte(listeUnite[unite2]) +
            '^3' +
            '$'
          texteCorr +=
            '<br>' +
            buildTab(
              a.toNumber(),
              listeUnite[unite1],
              resultat.toNumber(),
              listeUnite[unite2],
              2,
              true,
            )
        }
      }

      this.autoCorrection[i].enonce = `${texte}\n`
      resultatFaux = combinaisonListes(
        [
          resultat.div(10),
          resultat.div(100),
          resultat.div(1000),
          resultat.mul(10),
          resultat.mul(100),
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
        texte = texte.replace(
          '\\dotfill',
          `$${ajouteChampTexteMathLive(this, i, 'longueur ')}$`,
        )
        setReponse(this, i, resultat)
      }
      if (this.listeQuestions.indexOf(texte) === -1) {
        // Si la question n`a jamais été posée, on en crée une autre
        if (context.vue === 'diap') {
          texte = texte.replace('= \\dotfill', '\\text{ en }')
        }
        if (context.isHtml) {
          texte = texte.replace(
            '\\dotfill',
            '................................................',
          )
        }
        if (this.sup4 && i === this.nbQuestions - 1) {
          texte +=
            '<br><br>' +
            buildTab(0, '', 0, '', Math.min(10, this.nbQuestions), true, true)
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
  force = false,
  correction = false,
) {
  const tabRep = function (nbre: number, uniteNbre: string) {
    const res = []
    let caseARemplir
    for (let ee = 0; ee < 33; ee++) res.push('')
    switch (uniteNbre.replaceAll(' ', '')) {
      case 'km':
        for (let i = 0; i < 33; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(nbre, 10 ** (8 - i)) !== ''
                ? '\\hspace*{0.1cm}' +
                  getDigitFromNumber(nbre, 10 ** (8 - i)) +
                  '\\hspace*{0.1cm}'
                : '\\hspace*{0.4cm}'
              : getDigitFromNumber(nbre, 10 ** (8 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(nbre, 10 ** (8 - i))
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
      case 'hm':
        for (let i = 0; i < 33; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(nbre, 10 ** (11 - i)) !== ''
                ? '\\hspace*{0.1cm}' +
                  getDigitFromNumber(nbre, 10 ** (11 - i)) +
                  '\\hspace*{0.1cm}'
                : '\\hspace*{0.4cm}'
              : getDigitFromNumber(nbre, 10 ** (11 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(nbre, 10 ** (11 - i))
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
      case 'dam':
        for (let i = 0; i < 33; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(nbre, 10 ** (14 - i)) !== ''
                ? '\\hspace*{0.1cm}' +
                  getDigitFromNumber(nbre, 10 ** (14 - i)) +
                  '\\hspace*{0.1cm}'
                : '\\hspace*{0.4cm}'
              : getDigitFromNumber(nbre, 10 ** (14 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(nbre, 10 ** (14 - i))
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
      case 'm':
        for (let i = 0; i < 33; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(nbre, 10 ** (17 - i)) !== ''
                ? '\\hspace*{0.1cm}' +
                  getDigitFromNumber(nbre, 10 ** (17 - i)) +
                  '\\hspace*{0.1cm}'
                : '\\hspace*{0.4cm}'
              : getDigitFromNumber(nbre, 10 ** (17 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(nbre, 10 ** (17 - i))
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
      case 'dm':
        for (let i = 0; i < 33; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(nbre, 10 ** (20 - i)) !== ''
                ? '\\hspace*{0.1cm}' +
                  getDigitFromNumber(nbre, 10 ** (20 - i)) +
                  '\\hspace*{0.1cm}'
                : '\\hspace*{0.4cm}'
              : getDigitFromNumber(nbre, 10 ** (20 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(nbre, 10 ** (20 - i))
          res[i] =
            (20 - i === 0 ? '\\color{red}{' : '') +
            caseARemplir +
            (20 - i === 0
              ? new Decimal(nbre).decimalPlaces() === 0
                ? '}'
                : ',}'
              : '')
        }
        break
      case 'cm':
        for (let i = 0; i < 33; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(nbre, 10 ** (23 - i)) !== ''
                ? '\\hspace*{0.1cm}' +
                  getDigitFromNumber(nbre, 10 ** (23 - i)) +
                  '\\hspace*{0.1cm}'
                : '\\hspace*{0.4cm}'
              : getDigitFromNumber(nbre, 10 ** (23 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(nbre, 10 ** (23 - i))
          res[i] =
            (23 - i === 0 ? '\\color{red}{' : '') +
            caseARemplir +
            (23 - i === 0
              ? new Decimal(nbre).decimalPlaces() === 0
                ? '}'
                : ',}'
              : '')
        }
        break
      case 'mm':
        for (let i = 0; i < 33; i++) {
          caseARemplir =
            i % 3 === 1
              ? getDigitFromNumber(nbre, 10 ** (26 - i)) !== ''
                ? '\\hspace*{0.1cm}' +
                  getDigitFromNumber(nbre, 10 ** (26 - i)) +
                  '\\hspace*{0.1cm}'
                : '\\hspace*{0.4cm}'
              : getDigitFromNumber(nbre, 10 ** (26 - i)) === ''
                ? '\\hspace*{0.2cm}'
                : getDigitFromNumber(nbre, 10 ** (26 - i))
          res[i] =
            (26 - i === 0 ? '\\color{red}{' : '') +
            caseARemplir +
            (26 - i === 0
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
      '\\hspace*{0.4cm}',
      '\\text{km}^3',
      '\\text{hm}^3',
      '\\text{dam}^3',
      '\\text{m}^3',
      '\\text{dm}^3',
      '\\text{cm}^3',
      '\\text{mm}^3',
      '\\hspace*{0.4cm}',
      '\\hspace*{0.4cm}',
    ]
    texte += '\\hline '
    for (let i = first; i < end; i++) {
      texte += `${headers2[i]} ${i < end - 1 ? ' &' : ' \\\\'}`
    }
    texte += ' \\hline '

    for (let i = first; i < end; i++) {
      texte += '\\begin{array}{c|c|c}'
      texte += `${aT[3 * i]} & ${aT[3 * i + 1]}& ${aT[3 * i + 2]}  \\\\`
      texte += !correction
        ? ` ${rT[3 * i]} & ${rT[3 * i + 1]}& ${rT[3 * i + 2]}  \\\\`
        : ''
      texte += '\\end{array}'
      texte += i !== end - 1 ? ' & ' : ''
    }
    for (let k = 3; k <= ligne; k++) {
      texte += '\\\\ \\hline '
      for (let i = first; i < end; i++) {
        texte += '\\begin{array}{c|c|c}'
        texte += ' & & \\\\'
        texte += '\\end{array}'
        texte += i !== end - 1 ? ' & ' : ''
      }
    }
    texte += '\\\\ \\hline '

    texte += ' \\end{array}$'
    return texte
  }
  const aTab = tabRep(a, uniteA)
  const rTab = tabRep(r, uniteR)
  const minTab1 =
    aTab[0] !== '' || aTab[1] !== '' || aTab[2] !== ''
      ? 0
      : aTab[3] !== '' || aTab[4] !== '' || aTab[5] !== '' || force
        ? 3
        : 6
  const minTab2 =
    rTab[0] !== '' || rTab[1] !== '' || rTab[2] !== ''
      ? 0
      : rTab[3] !== '' || rTab[4] !== '' || rTab[5] !== '' || force
        ? 3
        : 6
  const maxTab1 =
    aTab[32] !== '' || aTab[31] !== '' || aTab[30] !== ''
      ? 33
      : aTab[29] !== '' || aTab[28] !== '' || aTab[27] !== '' || force
        ? 30
        : 27
  const maxTab2 =
    rTab[32] !== '' || rTab[31] !== '' || rTab[30] !== ''
      ? 33
      : rTab[29] !== '' || rTab[28] !== '' || rTab[27] !== '' || force
        ? 30
        : 27
  return createTab(
    aTab,
    rTab,
    Math.min(minTab1, minTab2) / 3,
    Math.max(maxTab1, maxTab2) / 3,
    ligne,
    correction,
  )
}
