import { lampeMessage } from '../../lib/format/message'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'
import { rangeMinMax } from '../../lib/outils/nombres'
import { lettreDepuisChiffre, numAlpha } from '../../lib/outils/outilString'
import { context } from '../../modules/context'
import {
  contraindreValeur,
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import { scratchblock } from '../../modules/scratchblock'
import Exercice from '../Exercice'
export const titre = 'Comprendre un script Scratch - 1'
export const amcReady = true
export const amcType = 'AMCHybride'

export const dateDePublication = '20/09/2022'
export const dateDeModifImportante = '08/05/2023' // par EE : Le nb de questions peut être supérieur à 1.

/**
 * Comprendre un script sur les multiples et diviseurs
 * @author Eric Elter
 */
export const uuid = 'defeb'

export const refs = {
  'fr-fr': ['3I12-2'],
  'fr-ch': [],
}
export default class ComprendreScriptMultiples extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Question(s) à sélectionner',
      "Nombres séparés par des tirets :\n1 : Nombre de variables\n2 : Nom de variables\n3 : Description du script\n4 : Test du script avec deux nombres multiples\n5 : Test du script avec deux nombres non multiples\n6 : Action initiale\n   ------------   \n7 : Une seule question parmi celles choisies\n8 : Deux questions parmi celles choisies\n9 : Trois questions parmi celles choisies\n10 : Quatre questions parmi celles choisies\n11 : Cinq questions parmi celles choisies\n12 : L'ensemble des six questions",
    ]
    this.besoinFormulaire2Texte = [
      'Choix sur la brique intiale',
      'Nombres séparés par des tirets :\n1 : La brique initiale est un clic sur drapeau vert.\n2 : La brique initiale est un clic sur lutin.\n3 : La brique initiale est un appui sur touche imposée\n4 : La brique initiale est un appui sur touche non imposée\n5 : Une des possiblités précédentes choisie au hasard',
    ]
    this.besoinFormulaire3Texte = [
      'Choix sur une des phrases finales',
      'Nombres séparés par des tirets :\n1 : Une phrase finale contient : ... est un multiple de ...\n2 : Une phrase finale contient : ... divise ...\n3 : Une phrase finale contient : ... est un diviseur de ...\n4 : Une des possiblités précédentes choisie au hasard',
    ]
    this.besoinFormulaire4Numerique = [
      "Choix de l'ordre sur la brique modulo",
      3,
      '1 : Premier entier demandé modulo le second\n2 : Second entier demandé modulo le premier \n3 : Une des possiblités précédentes choisie au hasard',
    ]

    this.sup = 9
    this.sup2 = 5
    this.sup3 = 4
    this.sup4 = 3
    this.spacing = 2
    this.spacingCorr = 2
    this.nbQuestions = 1
    this.typeExercice = 'Scratch'
  }

  nouvelleVersion() {
    /*
    let optionsBriques = []

    if (!this.sup2) { // Si aucune liste n'est saisie
      optionsBriques = [randint(1, 4)]
    } else {
      if (typeof (this.sup2) === 'number') {
        this.sup2 = contraindreValeur(1, 5, this.sup2, 5)
        optionsBriques = [this.sup2 === 5 ? randint(1, 4) : this.sup2]
      } else {
        optionsBriques = this.sup2.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsBriques.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          optionsBriques[i] = contraindreValeur(1, 5, parseInt(optionsBriques[i]), 5)
        }
        if (compteOccurences(optionsBriques, 5) > 0) optionsBriques = [randint(1, 4)]
        else optionsBriques = combinaisonListes(optionsBriques, optionsBriques.length)
      }
    }
    const briqueInitiale = optionsBriques[0]
    */

    const briqueInitiale = gestionnaireFormulaireTexte({
      max: 4,
      defaut: 5,
      melange: 5,
      nbQuestions: this.nbQuestions,
      saisie: this.sup2,
    })

    /*
    optionsBriques = []
    if (!this.sup3) { // Si aucune liste n'est saisie
      optionsBriques = [randint(1, 3)]
    } else {
      if (typeof (this.sup3) === 'number') {
        this.sup3 = contraindreValeur(1, 4, this.sup3, 4)
        optionsBriques = [this.sup3 === 4 ? randint(1, 3) : this.sup3]
      } else {
        optionsBriques = this.sup3.split('-')// Sinon on créé un tableau à partir des valeurs séparées par des -
        for (let i = 0; i < optionsBriques.length; i++) { // on a un tableau avec des strings : ['1', '1', '2']
          optionsBriques[i] = contraindreValeur(1, 4, parseInt(optionsBriques[i]), 4)
        }
        if (compteOccurences(optionsBriques, 4) > 0) optionsBriques = [randint(1, 3)]
        else optionsBriques = combinaisonListes(optionsBriques, optionsBriques.length)
      }
    }
    const choixScript = optionsBriques[0]
    */

    const choixScript = gestionnaireFormulaireTexte({
      max: 3,
      defaut: 4,
      melange: 4,
      nbQuestions: this.nbQuestions,
      saisie: this.sup3,
    })

    const diviseurEnPremier =
      this.sup4 === 3 ? choice([true, false]) : this.sup4 === 2

    for (
      let i = 0, texte, texteCorr, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      const tableauTouches = []
      for (let i = 1; i < 27; i++)
        tableauTouches.push(String.fromCharCode(64 + i).toLowerCase())
      for (let i = 0; i < 10; i++) tableauTouches.push(i)
      tableauTouches.push('espace')
      tableauTouches.push('flèche haut')
      tableauTouches.push('flèche bas')
      tableauTouches.push('flèche droite')
      tableauTouches.push('flèche gauche')
      const touchePressee = choice(tableauTouches)

      const nb1 = randint(1, 26, [23, 9, 15, 17]) // Pour éviter I,O,Q et W
      const nb2 = randint(1, 26, [23, 9, 15, 17, nb1]) // Pour éviter I,O,Q et W
      let var1 = lettreDepuisChiffre(nb1)
      let var2 = lettreDepuisChiffre(nb2)
      let colonne1 = '\\begin{scratch}[print,fill,blocks,scale=1]\n'
      const choixBriqueInitiale = [
        [
          '\\blockinit{quand \\greenflag est cliqué}\n',
          'Quand le drapeau vert est cliqué',
        ],
        [
          '\\blockinit{quand ce sprite est cliqué}\n',
          'Quand ce sprite est cliqué',
        ],
        [
          `\\blockinit{quand la touche \\selectmenu{${touchePressee}} est pressée}\n`,
          `Quand la touche ${touchePressee} est pressée`,
        ],
        [
          "\\blockinit{quand la touche \\selectmenu{n'importe laquelle} est pressée}\n",
          "Quand n'importe quelle touche est pressée",
        ],
      ]
      const nbBriqueInitiale = briqueInitiale[i]
      colonne1 +=
        typeof nbBriqueInitiale === 'number'
          ? choixBriqueInitiale[nbBriqueInitiale - 1][0]
          : ''
      colonne1 +=
        '\\blockmove{demander \\ovalnum{Donne-moi un nombre entier.} et attendre}\n'
      colonne1 += `\\blockvariable{mettre \\selectmenu{${var1}} à \\ovalsensing{réponse}}\n`
      colonne1 +=
        '\\blockmove{demander \\ovalnum{Donne-moi un second nombre entier.} et attendre}\n'
      colonne1 += `\\blockvariable{mettre \\selectmenu{${var2}} à \\ovalsensing{réponse}}\n`
      const var3 = lettreDepuisChiffre(nb1)
      var1 = diviseurEnPremier ? var2 : var1
      var2 = diviseurEnPremier ? var3 : var2
      colonne1 += `\\blockifelse{si \\booloperator{\\ovaloperator{\\ovalmove{${var1}} modulo \\ovalmove{${var2}}} = \\ovalnum{0}} alors}\n`
      switch (choixScript[i]) {
        case 1: // .... est un multiple de ....
          colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{ est un multiple de } et \\ovalmove{${var2}}}} et \\ovalnum{.}}}\n}\n`
          colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var1}} et \\ovaloperator{regrouper \\ovalnum{ n'est pas un multiple de } et \\ovalmove{${var2}}}} et \\ovalnum{.}}}\n}\n`
          break
        case 2: // .... divise ....
          colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{ divise } et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`
          colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{ ne divise pas } et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`
          break
        case 3: // .... est un diviseur de  ....
          colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{ est un diviseur de } et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`
          colonne1 += `{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${var2}} et \\ovaloperator{regrouper \\ovalnum{ n'est pas un diviseur de } et \\ovalmove{${var1}}}} et \\ovalnum{.}}}\n}\n`
          break
      }
      colonne1 += '\\end{scratch}'
      const colonne1SuivantContexte = scratchblock(colonne1)
      colonne1 =
        typeof colonne1SuivantContexte === 'string'
          ? colonne1SuivantContexte
          : 'problème avec scratchblock'

      const nb02 = choice([2, 3, 5, 9, 10])
      const nb01 = choice(rangeMinMax(5, 15)) * nb02
      const nb03 = nb01 + randint(1, nb02 - 1)
      const listeQuestions = [
        // [Questions, Reponses, Nb de lignes pour le réponse AMC]
        [
          'Combien ce script comporte-t-il de variables ?',
          `Ce script comporte ${texteEnCouleurEtGras(2)} variables.`,
          1,
        ],
        [
          'Comment se nomment les variables dans ce script ?',
          `Les variables de ce script se nomment ${texteEnCouleurEtGras(var1)} et ${texteEnCouleurEtGras(var2)}.`,
          1,
        ],
        [
          'Que fait ce script ?',
          `Ce script demande deux nombres entiers à l'utilisateur, calcule le reste de la division euclidienne du
      ${diviseurEnPremier ? ' second nombre fourni par le premier ' : ' premier nombre fourni par le second '}
      puis indique si
      ${choixScript[i] === 1 ? (diviseurEnPremier ? ' le second nombre ' : ' le premier nombre ') : diviseurEnPremier ? ' le premier nombre ' : ' le second nombre '} ${choixScript[i] === 1 ? ' est un multiple ou pas du ' : choixScript[i] === 2 ? ' divise ou pas le ' : ' est un diviseur ou pas du '} ${choixScript[i] === 1 ? (diviseurEnPremier ? 'premier' : 'second') : diviseurEnPremier ? 'second' : 'premier'} nombre.`,
          3,
        ],
        [
          `Si les nombres saisis sont d'abord ${diviseurEnPremier ? nb02 : nb01} puis ensuite ${diviseurEnPremier ? nb01 : nb02}, que dit précisément le lutin au final ?`,
          `${choixScript[i] === 1 ? nb01 + ' est un multiple de ' + nb02 : choixScript[i] === 2 ? nb02 + ' divise ' + nb01 : nb02 + ' est un diviseur de ' + nb01}.`,
          1,
        ],
        [
          `Si les nombres saisis sont d'abord ${diviseurEnPremier ? nb02 : nb03} puis ensuite ${diviseurEnPremier ? nb03 : nb02}, que dit précisément le lutin au final ?`,
          `${choixScript[i] === 1 ? nb03 + " n'est pas un multiple de " + nb02 : choixScript[i] === 2 ? nb02 + ' ne divise pas ' + nb03 : nb02 + " n'est pas un diviseur de " + nb03}.`,
          1,
        ],
        [
          'Quelle action initiale permet de déclencher ce script ?',
          typeof nbBriqueInitiale === 'number'
            ? choixBriqueInitiale[nbBriqueInitiale - 1][1]
            : '' + '.',
          1,
        ],
      ]

      let choixQuestions = []
      let nbDeQuestions = [6]
      if (!this.sup) {
        // Si aucune liste n'est saisie
        choixQuestions = listeQuestions
      } else {
        if (typeof this.sup === 'number') {
          this.sup = contraindreValeur(1, 12, this.sup, 12)
          if (this.sup < 7) choixQuestions = [listeQuestions[this.sup]]
          else
            choixQuestions = combinaisonListes(listeQuestions, 6).slice(
              0,
              this.sup - 6,
            )
        } else {
          const optionsQuestions = this.sup.split('-') // Sinon on créé un tableau à partir des valeurs séparées par des -
          for (let i = 0; i < optionsQuestions.length; i++) {
            // on a un tableau avec des strings : ['1', '1', '2']
            optionsQuestions[i] = contraindreValeur(
              1,
              12,
              parseInt(optionsQuestions[i]),
              12,
            )
            if (optionsQuestions[i] < 7)
              choixQuestions.push(listeQuestions[optionsQuestions[i] - 1])
            else nbDeQuestions = [optionsQuestions[i] - 6]
          }
          if (choixQuestions.length === 0) {
            choixQuestions = combinaisonListes(listeQuestions, 6).slice(
              0,
              nbDeQuestions[0],
            )
          }
        }
      }
      choixQuestions = combinaisonListes(choixQuestions, choixQuestions.length)

      this.introduction = lampeMessage({
        titre: context.isHtml
          ? `${scratchblock('\\begin{scratch}[print,fill,blocks,scale=0.5]\n\\ovaloperator{\\ovalnum{ } modulo \\ovalnum{ }}\\end{scratch}')}`
          : 'Information',
        texte:
          (context.isHtml
            ? ''
            : '$\\setscratch{print}\\ovaloperator{\\ovalnum{ } modulo \\ovalnum{ }}$<br>') +
          'Cette brique donne le reste de la division euclidienne du nombre de gauche par le nombre de droite.',
        couleur: 'nombres',
      })
      if (context.isAmc) {
        this.autoCorrection[0] = {
          enonce: '',
          enonceAvant: false, // EE : ce champ est facultatif et permet (si false) de supprimer l'énoncé ci-dessus avant la numérotation de chaque question.
          propositions: [],
        }
      }
      this.consigne =
        'Lire ce script Scratch associé à un lutin et répondre ensuite'
      this.consigne +=
        Math.min(choixQuestions.length, nbDeQuestions[0]) > 1
          ? ' aux questions.'
          : ' à la question.'
      let colonne2 = ''
      texteCorr = ''
      let enonceAMC = ''
      for (
        let i = 0;
        i < Math.min(choixQuestions.length, nbDeQuestions[0]);
        i++
      ) {
        if (Math.min(choixQuestions.length, nbDeQuestions[0]) === 1) {
          enonceAMC = choixQuestions[0][0] + '<br>'
          texteCorr = choixQuestions[0][1] + '<br>'
        } else {
          enonceAMC = numAlpha(i) + choixQuestions[i][0] + '<br>'
          texteCorr += numAlpha(i) + choixQuestions[i][1] + '<br>'
        }
        if (context.isAmc) {
          // @ts-expect-error
          this.autoCorrection[0].propositions[i] = {
            type: 'AMCOpen',
            propositions: [
              {
                enonce: (i === 0 ? colonne1 + '<br><br>' : '') + enonceAMC,
                texte: '',
                statut: choixQuestions[i][2], // OBLIGATOIRE (ici c'est le nombre de lignes du cadre pour la réponse de l'élève sur AMC)
                pointilles: false, // EE : ce champ est facultatif et permet (si false) d'enlever les pointillés sur chaque ligne.
              },
            ],
          }
        }
        colonne2 += '<br>' + enonceAMC
      }
      // Multicolonnage abandonné à cause de la non-optimation de la fonction deuxColonnes() (septembre 2022) sur SmartPhone
      // const texte = deuxColonnes(colonne1, colonne2)
      texte = colonne1 + colonne2

      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
