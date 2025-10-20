import Decimal from 'decimal.js'
import {
  point3d,
  vecteur3d,
} from '../../lib/3d/3dProjectionMathalea2d/elements'
import {
  cylindre3d,
  sphere3d,
} from '../../lib/3d/3dProjectionMathalea2d/solides'
import { setReponse } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { texteExposant } from '../../lib/outils/ecritures'
import { texteEnCouleurEtGras } from '../../lib/outils/embellissements'
import {
  nombreDeChiffresDansLaPartieDecimale,
  nombreDeChiffresDe,
} from '../../lib/outils/nombres'
import { sp } from '../../lib/outils/outilString'
import { stringNombre, texNombre } from '../../lib/outils/texNombre'
import { mathalea2d } from '../../modules/2dGeneralites'
import Grandeur from '../../modules/Grandeur'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

export const titre = "Déterminer le volume d'une boule"
export const dateDePublication = '09/02/2021' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '05/11/2023' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Calculer le volume d'une boule
 * @author Erwan DUPLESSY (AMC par EE)
 */

export const uuid = '8c803'

export const refs = {
  'fr-fr': ['3G42', 'BP2G19'],
  'fr-ch': ['11GM2-3'],
}
export default class VolumeBoule extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireTexte = [
      'Choix des problèmes',
      "Nombres séparés par des tirets :\n1 : À partir du rayon\n2 : À partir du diamètre\n3 : À partir de l'aire\n4 : En résolvant un problème\n5 : Mélange",
    ]

    this.video = 'YQF7CBY-uEk'
    this.nbQuestions = 3 // Ici le nombre de questions
    this.sup = '1-2-4'

    // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  }

  nouvelleVersion() {
    // la variable numeroExercice peut être récupérée pour permettre de différentier deux copies d'un même exo
    // Par exemple, pour être certain de ne pas avoir les mêmes noms de points en appelant 2 fois cet exo dans la même page
    const unites = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm']
    const listeTypeDeQuestions = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 4,
      melange: 5,
      defaut: 5,
      nbQuestions: this.nbQuestions,
    })
    for (
      let i = 0,
        r,
        d,
        A,
        rayon,
        O,
        B,
        OO,
        o,
        R,
        s,
        c,
        texte,
        texteCorr,
        reponse,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      texte = '' // Nous utilisons souvent cette variable pour construire le texte de la question.
      texteCorr = '' // Idem pour le texte de la correction.
      const choixUnites = choice(unites)
      switch (listeTypeDeQuestions[i]) {
        case 1:
          r = randint(2, 30)
          reponse = new Decimal(r)
            .pow(3)
            .mul(Decimal.acos(-1))
            .mul(4)
            .div(3)
            .toDP(1)
          texte +=
            'Calculer le volume' +
            (context.isAmc
              ? `, en ${choixUnites}` + texteExposant(3) + ','
              : '') +
            ` d'une boule de rayon ${r} ${choixUnites}. Arrondir au dixième. `
          texteCorr +=
            "Le volume d'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>"
          texteCorr += `On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (${r} \\text{ ${choixUnites}})^3$. <br>`
          texteCorr +=
            'Le volume de la boule est donc environ : ' +
            texteEnCouleurEtGras(
              stringNombre(reponse, 1) + ` ${choixUnites}` + texteExposant(3),
            ) +
            '. <br>'
          break

        case 2:
          d = randint(2, 30)
          reponse = new Decimal(d)
            .pow(3)
            .mul(Decimal.acos(-1))
            .mul(4)
            .div(3)
            .toDP(1)
          texte +=
            'Calculer le volume' +
            (context.isAmc
              ? `, en ${choixUnites}` + texteExposant(3) + ','
              : '') +
            ` d'une boule de diamètre ${2 * d} ${choixUnites}. Arrondir au dixième. `
          texteCorr +=
            "Le volume d'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>"
          texteCorr += `Le rayon de la boule est la moitié de son diamètre, soit : ${d} ${choixUnites}. <br>`
          texteCorr += `On a donc : $V = \\dfrac{4}{3} \\times \\pi \\times (${d} \\text{ ${choixUnites}})^3$. <br>`
          texteCorr +=
            'Le volume de la boule est donc environ : ' +
            texteEnCouleurEtGras(
              stringNombre(reponse, 1) + ` ${choixUnites}` + texteExposant(3),
            ) +
            '. <br>'
          break

        case 3:
          A = randint(2, 30)
          texte +=
            'Calculer le volume' +
            (context.isAmc
              ? `, en ${choixUnites}` + texteExposant(3) + ','
              : '') +
            ` d'une boule d'aire ${A} cm$^2$. Arrondir au dixième.`
          texteCorr +=
            "Le volume d'une boule est donné par la formule : $V = \\dfrac{4}{3}\\pi r^3$. <br>"
          texteCorr += 'Il faut donc trouver le rayon de la boule. <br>'
          texteCorr +=
            "L'aire d'une boule est donnée par la formule : $A = 4\\pi r^2$. <br>"
          texteCorr += `On a donc l'égalité : $${A} = 4\\pi r^2$. `
          texteCorr += `On en déduit : $r^2 = \\dfrac{${A}}{4\\pi}$. <br>`
          texteCorr += `Et, comme $r$ est positif : $r=\\sqrt{\\dfrac{${A}}{4\\pi}}$. <br>`
          rayon = new Decimal(A).div(Decimal.acos(-1).mul(4)).sqrt()
          reponse = Decimal.acos(-1)
            .mul(4 * rayon ** 3)
            .div(3)
            .toDP(1)
          texteCorr +=
            'On obtient donc une valeur approchée de $r$ : $r \\approx ' +
            texNombre(rayon, 2) +
            `$ ${choixUnites}. <br>`
          texteCorr +=
            'On a donc : $V \\approx \\dfrac{4}{3} \\times \\pi \\times (' +
            texNombre(rayon, 2) +
            ` \\text{ ${choixUnites}})^3$. <br>`
          texteCorr +=
            'Le volume de la boule est donc environ : ' +
            texteEnCouleurEtGras(
              stringNombre(reponse, 1) + ` ${choixUnites}` + texteExposant(3),
            ) +
            '. <br>'
          break

        case 4:
          rayon = randint(2, 30)
          texte += `Une boîte cylindrique de ${2 * rayon} ${choixUnites} de diamètre et de ${2 * rayon} ${choixUnites} de hauteur contient une boule de diamètre ${2 * rayon} ${choixUnites}. <br>`
          texte +=
            'Calculer le volume' +
            (context.isAmc
              ? `, en ${choixUnites}` + texteExposant(3) + ','
              : '') +
            ' dans la boîte laissée libre par la boule. Arrondir au dixième.'

          texteCorr += 'Représentons la situation par un petit schéma : <br>'
          O = point3d(0, 0, 0)
          B = point3d(2.5, 0, 0)
          OO = point3d(0, 0, 5)
          o = point3d(0, 0, 2.5)
          R = vecteur3d(O, B)
          s = sphere3d(o, 2.5, 'blue', 'blue', 4, 'gray', 10, 'gray')
          c = cylindre3d(O, OO, R, R, 'black', false)
          reponse = Decimal.acos(-1)
            .mul(2 * rayon ** 3)
            .div(3)
            .toDP(1)
          texteCorr +=
            '<br>' +
            mathalea2d(
              {
                xmin: -5,
                max: 9,
                ymin: -1.5,
                ymax: 6,
                scale: 0.8,
              },
              ...s.c2d,
              ...c.c2d,
            ) +
            '<br>'
          texteCorr +=
            'Méthode : on calcule le volume du cylindre auquel on va retrancher le volume de la boule. <br>'
          texteCorr +=
            'Le volume du cylindre est : $V_c = \\pi r^2 h$ ; et celui de la boule est : $V_b = \\dfrac{4}{3}\\pi r^3$. <br>'
          texteCorr += `Le rayon du cylindre est la moitié de son diamètre, soit ${rayon} ${choixUnites}, et sa hauteur est ${2 * rayon} ${choixUnites}. <br>`
          texteCorr += `Le rayon de la boule est la moitié de son diamètre, soit : ${rayon} ${choixUnites}. <br>`
          texteCorr += `Ici, le volume du cylindre est donc : $V_c = \\pi \\times (${rayon} \\text{ ${choixUnites}})^2 \\times (${2 * rayon}\\text{ ${choixUnites}})$. <br>`
          texteCorr += `Le volume de la boule est : $V_b = \\dfrac{4}{3} \\times \\pi \\times (${rayon} \\text{ ${choixUnites}})^3$. <br>`
          texteCorr += `Le volume cherché est donc donné par : $\\pi \\times (${rayon} \\text{ ${choixUnites}})^2 \\times (${2 * rayon}\\text{ ${choixUnites}}) - \\dfrac{4}{3} \\times \\pi \\times (${rayon} \\text{ ${choixUnites}})^3$. <br>`
          texteCorr +=
            'Le volume cherché est environ : ' +
            texteEnCouleurEtGras(
              stringNombre(reponse, 1) + ` ${choixUnites}` + texteExposant(3),
            ) +
            '. <br>'
          break
      }
      setReponse(
        this,
        i,
        new Grandeur(reponse.toNumber(), `${choixUnites}^3`),
        { formatInteractif: 'unites' },
      )
      texte += ajouteChampTexteMathLive(
        this,
        i,
        ' unites[Longueurs,Aires,Volumes]',
        {
          texteAvant:
            '<br>' +
            sp(12) +
            "Il faut penser à préciser l'unité dans le volume-réponse : ",
        },
      )
      if (context.isAmc) {
        this.autoCorrection[i] = {
          enonce: texte,
          propositions: [{ texte: texteCorr, statut: 0 }],
          reponse: {
            texte: '',
            valeur: reponse.toNumber(),
            param: {
              digits: nombreDeChiffresDe(reponse.toNumber()),
              decimals: nombreDeChiffresDansLaPartieDecimale(
                reponse.toNumber(),
              ),
              signe: false,
              exposantNbChiffres: 0,
              exposantSigne: false,
              approx: 0,
            },
          },
        }
      }
      if (this.questionJamaisPosee(i, reponse)) {
        // Si la question n'a jamais été posée, on la stocke dans la liste des questions
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
} // Fin de l'exercice.
