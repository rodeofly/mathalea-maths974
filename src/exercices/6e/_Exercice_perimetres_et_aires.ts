import { codageAngleDroit } from '../../lib/2d/angles'
import { arc, cercle } from '../../lib/2d/cercle'
import {
  afficheLongueurSegment,
  codageSegments,
  texteSurSegment,
} from '../../lib/2d/codages'
import { droite, droiteParPointEtPerpendiculaire } from '../../lib/2d/droites'
import {
  Point,
  point,
  pointAdistance,
  pointIntersectionCC,
  pointIntersectionLC,
  pointSurCercle,
  pointSurSegment,
  tracePoint,
} from '../../lib/2d/points'
import { Polygone, polygone, polygoneRegulier } from '../../lib/2d/polygones'
import { segment } from '../../lib/2d/segmentsVecteurs'
import { labelPoint, TexteParPoint } from '../../lib/2d/textes'
import { texTexte } from '../../lib/format/texTexte'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import {
  arrondi,
  nombreDeChiffresDansLaPartieDecimale,
  nombreDeChiffresDe,
  troncature,
} from '../../lib/outils/nombres'
import { creerNomDePolygone, sp } from '../../lib/outils/outilString'
import { stringNombre, texNombre } from '../../lib/outils/texNombre'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import {
  contraindreValeur,
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCHybride'
export const dateDeModifImportante = '11/04/2023'
export const titre = "Calculs de périmètres et d'aires"

/**
 * Déterminer le périmètre et l'aire d'un carré, d'un rectangle, d'un triangle rectangle, d'un disque
 *
 * * 1 : Carré, rectangle et triangle rectangle
 * * 2 : Uniquement des disques
 * * 3 : Les 4 sont demandés
 * @author Rémi Angot// modifié par Mireille Gain pour le support des décimaux // modifié par EE : Correction de nombreuses coquilles
 * * Relecture EE : Décembre 2021
 */
export default class ExercicePerimetresEtAires extends Exercice {
  exo: string
  constructor() {
    super()
    // Calculer le périmètre et l'aire de figures
    this.sup = '1-2'
    this.nbQuestions = 4
    this.sup2 = false // décimaux ou pas
    this.sup3 = false // avec figure
    this.sup4 = false // Avec une approximation de π
    this.exo = 'NoDisk'
    this.besoinFormulaireTexte = [
      'Type de figures',
      'Valeurs séparées par des tirets :\n1 : Carré\n2 : Rectangle\n3 : Triangle rectangle\n4 : Mélange',
    ]
    this.besoinFormulaire2CaseACocher = ['Avec des décimaux', false]
    this.besoinFormulaire3CaseACocher = ['Avec figure']
    this.besoinFormulaire4CaseACocher = ['Avec une approximation de π']
    this.besoinFormulaire5Numerique = [
      'Choix du calcul',
      3,
      '1 : Périmètre\n2 : Aire\n3 : Les deux',
    ]
    this.sup5 = 3
  }

  nouvelleVersion() {
    this.sup5 = contraindreValeur(1, 3, this.sup5, 3)
    let resultat1
    let resultat2
    const tripletsPythagoriciens = [
      [3, 4, 5],
      [6, 8, 10],
      [15, 8, 17],
      [24, 10, 26],
      [5, 12, 13],
      [12, 16, 20],
      [21, 20, 29],
      [9, 40, 41],
    ]
    const typesDeQuestionsDisponibles = [
      'carre',
      'rectangle',
      'triangle_rectangle',
      'cercle',
      'demi-disque',
    ]

    const typesDeQuestions = gestionnaireFormulaireTexte({
      min: this.exo === 'NoDisk' ? 1 : 4,
      max: this.exo === 'NoDisk' ? 3 : 5,
      defaut: this.exo === 'NoDisk' ? 2 : 4,
      nbQuestions: this.nbQuestions,
      melange: this.exo === 'NoDisk' ? 4 : 6,
      shuffle: false,
      saisie: this.sup,
    })
    let listeDeNomsDePolygones: string[] = []
    let indiceInteractif = 0

    for (
      let i = 0,
        texte,
        texteCorr,
        cote,
        nomCarre,
        L,
        l,
        nomRectangle,
        a,
        b,
        c,
        nomTriangle,
        triplet,
        R,
        donneLeDiametre,
        cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      texteCorr = ''
      if (i % 4 === 0) listeDeNomsDePolygones = ['QD']
      let partieDecimale1, partieDecimale2
      if (this.sup2) {
        partieDecimale1 = randint(1, 9)
        partieDecimale2 = randint(1, 9, [partieDecimale1])
        partieDecimale1 = partieDecimale1 / 10
        partieDecimale2 = partieDecimale2 / 10
      } else {
        partieDecimale1 = 0
        partieDecimale2 = 0
      }
      texte =
        this.sup5 === 3
          ? "Calculer le périmètre et l'aire "
          : this.sup5 === 1
            ? 'Calculer le périmètre '
            : "Calculer l'aire "

      switch (typesDeQuestionsDisponibles[Number(typesDeQuestions[i]) - 1]) {
        case 'carre':
          cote = randint(2, 8) + partieDecimale1
          nomCarre = creerNomDePolygone(4, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(nomCarre)
          if (this.sup3) {
            texte += 'de ce carré.'
            const A = point(0, 0, nomCarre.charAt(0), 'below left')
            const B = pointAdistance(
              A,
              cote,
              randint(-5, 5, [0]),
              nomCarre.charAt(1),
              'below right',
            )
            const figure = polygoneRegulier(A, B, 4) as Polygone
            const C = point(
              figure.listePoints[2].x,
              figure.listePoints[2].y,
              nomCarre.charAt(2),
              'above right',
            )
            const D = point(
              figure.listePoints[3].x,
              figure.listePoints[3].y,
              nomCarre.charAt(3),
              'above left',
            )

            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x, B.x, C.x, D.x) - 2
            const xmax = Math.max(A.x, B.x, C.x, D.x) + 2
            const ymin = Math.min(A.y, B.y, C.y, D.y) - 2
            const ymax = Math.max(A.y, B.y, C.y, D.y) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              scale: 0.8,
            }
            // On ajoute au texte de la correction, la figure de la correction
            // const traces = tracePoint(A, B, C, D)
            const labels = labelPoint(A, B, C, D)
            figure.epaisseur = 2
            const objets = []
            objets.push(
              labels,
              codageAngleDroit(A, B, C, 'blue', 0.5, 1, 0.5, 'blue', 0.5),
              codageAngleDroit(A, D, C, 'blue', 0.5, 1, 0.5, 'blue', 0.5),
              codageAngleDroit(D, C, B, 'blue', 0.5, 1, 0.5, 'blue', 0.5),
              codageAngleDroit(B, A, D, 'blue', 0.5, 1, 0.5, 'blue', 0.5),
              codageSegments('//', 'blue', [A, B, C, D]),
              afficheLongueurSegment(B, A, 'black', 0.7),
              figure,
            )
            texte += '<br>' + mathalea2d(params, objets)
          } else {
            if (choice([true, false])) {
              // 2 énoncés possibles équiprobables
              texte += `d'un carré $${nomCarre}$ de $${texNombre(cote)}$ cm de côté.<br>`
            } else {
              texte +=
                `d'un carré $${nomCarre}$ tel que $${nomCarre[0] + nomCarre[1]} = ${texNombre(cote)}$ cm.` +
                '<br>'
            }
          }
          if (this.sup5 !== 2)
            texteCorr = `$\\mathcal{P}_{${nomCarre}}=4\\times${texNombre(cote)}${sp()}\\text{cm}=${miseEnEvidence(texNombre(4 * cote))}${sp()}\\text{cm}$<br>`

          if (this.sup5 !== 1)
            texteCorr += `$\\mathcal{A}_{${nomCarre}}=${texNombre(cote)}${sp()}\\text{cm}\\times${texNombre(cote)}${sp()}\\text{cm}=${miseEnEvidence(texNombre(cote * cote))}${sp()}\\text{cm}^2$`

          resultat1 = 4 * cote
          resultat2 = cote * cote
          break
        case 'rectangle':
          L = randint(3, 11)
          l = randint(2, L - 1)
          L += partieDecimale1
          l += partieDecimale2
          nomRectangle = creerNomDePolygone(4, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(nomRectangle)
          if (this.sup3) {
            texte += 'de ce rectangle.'
            const A = point(0, 0, nomRectangle.charAt(0), 'below left')
            const B = pointAdistance(
              A,
              L,
              randint(-5, 5, [0]),
              nomRectangle.charAt(1),
              'below right',
            )
            const C = pointIntersectionLC(
              droiteParPointEtPerpendiculaire(B, droite(A, B)),
              cercle(B, l),
              nomRectangle.charAt(2),
              1,
            ) as Point
            C.positionLabel = 'above right'
            const D = pointIntersectionLC(
              droiteParPointEtPerpendiculaire(A, droite(A, B)),
              cercle(A, l),
              nomRectangle.charAt(3),
              1,
            ) as Point
            D.positionLabel = 'above left'
            const figure = polygone(A, B, C, D)

            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x, B.x, C.x, D.x) - 2
            const xmax = Math.max(A.x, B.x, C.x, D.x) + 2
            const ymin = Math.min(A.y, B.y, C.y, D.y) - 2
            const ymax = Math.max(A.y, B.y, C.y, D.y) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              scale: 0.8,
            }
            // On ajoute au texte de la correction, la figure de la correction
            const labels = labelPoint(A, B, C, D)
            figure.epaisseur = 2
            const objets = []
            objets.push(
              labels,
              codageAngleDroit(A, B, C, 'blue', 0.5, 1, 0.5, 'blue', 0.5),
              codageAngleDroit(A, D, C, 'blue', 0.5, 1, 0.5, 'blue', 0.5),
              codageAngleDroit(D, C, B, 'blue', 0.5, 1, 0.5, 'blue', 0.5),
              codageAngleDroit(B, A, D, 'blue', 0.5, 1, 0.5, 'blue', 0.5),
              codageSegments('//', 'blue', [A, B]),
              codageSegments('//', 'blue', [C, D]),
              codageSegments('/', 'red', [B, C]),
              codageSegments('/', 'red', [D, A]),
              afficheLongueurSegment(B, A, 'black', 0.7),
              afficheLongueurSegment(C, B, 'black', 0.7),
              figure,
            )
            texte += '<br>' + mathalea2d(params, objets)
          } else {
            if (choice([true, false])) {
              // 2 énoncés possibles équiprobables
              texte += `d'un rectangle $${nomRectangle}$ de $${texNombre(L)}$ cm de longueur et de $${l}$ cm de largeur.<br>`
            } else {
              texte +=
                `d'un rectangle $${nomRectangle}$ tel que $${nomRectangle[0] + nomRectangle[1] + ' = ' + texNombre(L)}$ cm et $${nomRectangle[1] + nomRectangle[2] + ' = ' + l}$ cm.` +
                '<br>'
            }
          }
          if (this.sup5 !== 2)
            texteCorr = `$\\mathcal{P}_{${nomRectangle}}=(${texNombre(L)}${sp()}\\text{cm}+${l}${sp()}\\text{cm})\\times2=${miseEnEvidence(texNombre((L + l) * 2))}${sp()}\\text{cm}$<br>`

          if (this.sup5 !== 1)
            texteCorr += `$\\mathcal{A}_{${nomRectangle}}=${texNombre(L)}${sp()}\\text{cm}\\times${l}${sp()}\\text{cm}=${miseEnEvidence(texNombre(L * l))}${sp()}\\text{cm}^2$`

          resultat1 = 2 * L + 2 * l
          resultat2 = L * l
          break
        case 'triangle_rectangle': {
          triplet = choice(tripletsPythagoriciens)
          // enleveElement(tripletsPythagoriciens, triplet)
          const adjust = this.sup2
            ? Math.floor(
                (10 * (randint(6, 15) + randint(4, 8) * 0.1)) /
                  Math.max(...triplet),
              ) * 0.1
            : 1
          a = triplet[0] * adjust
          b = triplet[1] * adjust
          c = triplet[2] * adjust
          nomTriangle = creerNomDePolygone(3, listeDeNomsDePolygones)
          listeDeNomsDePolygones.push(nomTriangle)
          if (this.sup3) {
            texte += 'de ce triangle rectangle.'
            const zoom =
              (randint(4, 8) + randint(4, 8) * 0.1) / Math.max(a, b, c)
            const A = point(0, 0, nomTriangle.charAt(0), 'below left')
            const B = pointAdistance(
              A,
              a * zoom,
              randint(-5, 5, [0]),
              nomTriangle.charAt(1),
              'below right',
            )
            // const B = point(a * zoom, 0, nomTriangle.charAt(1), 'below right')
            // const C = point(0, b * zoom, nomTriangle.charAt(2), 'above left')
            const C = pointIntersectionCC(
              cercle(A, b * zoom),
              cercle(B, c * zoom),
              nomTriangle.charAt(2),
            ) as Point
            const figure = polygone(A, B, C)
            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x) - 2
            const xmax = Math.max(B.x) + 2
            const ymin = Math.min(A.y) - 2
            const ymax = Math.max(C.y) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              scale: 0.8,
              zoom: 1,
            }
            // On ajoute au texte de la correction, la figure de la correction
            const labels = labelPoint(A, B, C)
            /* const segT = [
              texteSurSegment(nomTriangle.charAt(1) + nomTriangle.charAt(2) + '=' + stringNombre(c, 1) + ' cm', C, B, 'black', 1),
              texteSurSegment(nomTriangle.charAt(0) + nomTriangle.charAt(1) + '=' + stringNombre(a, 1) + ' cm', B, A, 'black', 1),
              texteSurSegment(nomTriangle.charAt(2) + nomTriangle.charAt(0) + '=' + stringNombre(b, 1) + ' cm', A, C, 'black', 1)] as TexteParPoint[]
            */
            const segT = [
              texteSurSegment(stringNombre(c, 1) + ' cm', C, B, 'black', 1),
              texteSurSegment(stringNombre(a, 1) + ' cm', B, A, 'black', 1),
              texteSurSegment(stringNombre(b, 1) + ' cm', A, C, 'black', 1),
            ] as TexteParPoint[]
            segT.forEach((element: TexteParPoint) => {
              element.mathOn = false
              element.scale = 1
            })
            figure.epaisseur = 2
            const objets = []
            objets.push(
              labels,
              codageAngleDroit(B, A, C, 'blue', 0.8, 1, 0.5, 'blue', 0.5),
              figure,
              ...segT,
            )
            texte += '<br>' + mathalea2d(params, objets)
            texteCorr = ''
          } else {
            if (choice([true, false])) {
              texte +=
                `d'un triangle $${nomTriangle}$ rectangle en $${nomTriangle[1]}$ tel que $${nomTriangle[0] + nomTriangle[1] + ' = ' + texNombre(a)}$ cm, $${nomTriangle[1] + nomTriangle[2] + ' = ' + texNombre(b)}$ cm\
   et $${nomTriangle[0] + nomTriangle[2] + ' = ' + texNombre(c)}$ cm.` + '<br>'
            } else {
              texte +=
                `d'un triangle rectangle $${nomTriangle}$ qui a pour côtés : $${texNombre(a)}$ cm, $${texNombre(c)}$ cm et $${texNombre(b)}$ cm.` +
                '<br>'
            }
          }

          if (this.sup5 !== 2) {
            texteCorr = `$\\mathcal{P}_{${nomTriangle}}=${texNombre(a)}${sp()}\\text{cm}+${texNombre(b)}
          ${sp()}\\text{cm}+${texNombre(c)}${sp()}\\text{cm}=${miseEnEvidence(texNombre(a + b + c))}${sp()}\\text{cm}$<br>`
          }
          if (this.sup5 !== 1)
            texteCorr += `$\\mathcal{A}_{${nomTriangle}}=${texNombre(a)}${sp()}\\text{cm}\\times${texNombre(b)}${sp()}\\text{cm}\\div2=${miseEnEvidence(texNombre((a * b) / 2))}${sp()}\\text{cm}^2$`
          resultat1 = a + b + c
          resultat2 = (a * b) / 2
          break
        }
        case 'cercle':
          R = this.sup2 ? randint(2, 4) + randint(1, 9) / 10 : randint(2, 5)
          if (this.sup3) {
            texte +=
              "de ce disque. Donner une valeur approchée au dixième de cm pour l'un et au dixième de cm$^2$ pour l'autre."
            const nomCercle = creerNomDePolygone(4, listeDeNomsDePolygones)
            listeDeNomsDePolygones.push(nomCercle)
            const A = point(0, 0, nomCercle.charAt(0), 'below left')
            const Rd = 3
            const figure = cercle(A, Rd)
            const B = pointSurCercle(
              figure,
              10,
              nomCercle.charAt(1),
              'above right',
            )
            const C = pointSurCercle(
              figure,
              190,
              nomCercle.charAt(2),
              'above left',
            )
            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x - Rd) - 2
            const xmax = Math.max(A.x + Rd) + 2
            const ymin = Math.min(A.y - Rd) - 2
            const ymax = Math.max(A.y + Rd) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              scale: 0.6,
              zoom: 1,
            }
            // On ajoute au texte de la correction, la figure de la correction
            const traces = tracePoint(A, B, C)
            const labels = labelPoint(A, B, C)
            const segT = texteSurSegment(
              nomCercle.charAt(1) +
                nomCercle.charAt(2) +
                '=' +
                stringNombre(R * 2, 1) +
                ' cm',
              C,
              B,
              'red',
              1,
            ) as TexteParPoint
            segT.mathOn = false
            segT.scale = 1.5
            figure.epaisseur = 2
            const objets = []
            objets.push(labels, traces, figure, segment(B, C), segT)
            texte += '<br>' + mathalea2d(params, objets)
            texteCorr = ''
          } else {
            donneLeDiametre = choice([true, false])
            if (donneLeDiametre) {
              texte += `d'un disque de $${texNombre(2 * R)}$ cm de diamètre. Donner une valeur approchée au dixième de cm pour l'un et au dixième de cm$^2$ pour l'autre.`
              texteCorr = `Le diamètre est de $${texNombre(2 * R)}$ cm donc le rayon est de $${texNombre(R)}$ cm.<br>`
            } else {
              texte += `d'un disque de $${texNombre(R)}$ cm de rayon. Donner une valeur approchée au dixième de cm pour l'un et au dixième de cm$^2$ pour l'autre.`
              texteCorr = ''
            }
          }

          if (this.sup4) {
            if (this.sup5 !== 2)
              texteCorr += `<br>Si on utilise $\\pi \\approx 3,14$, alors <br> $\\mathcal{P}\\approx 2 \\times ${texNombre(R)} \\times 3,14 \\approx ${texNombre(2 * R * (this.sup4 ? 3.14 : Math.PI), 3)}${sp()}${texTexte('cm')}$.<br>`
            if (this.sup5 !== 1)
              texteCorr += `$\\mathcal{A}\\approx ${texNombre(R)}\\times${texNombre(R)}\\times 3,14\\approx ${texNombre(R * R * (this.sup4 ? 3.14 : Math.PI), 3)}${sp()}${texTexte('cm')}^2$.`
          } else {
            if (this.sup5 !== 2) {
              texteCorr += `$\\mathcal{P}=2\\times${texNombre(R)}\\times\\pi${sp()}\\text{cm}=${texNombre(2 * R)}\\pi${sp()}\\text{cm}\\approx${texNombre(
                2 * R * (this.sup4 ? 3.14 : Math.PI),
                3,
              )}${sp()}\\text{cm}$<br>`
            }
            if (this.sup5 !== 1) {
              texteCorr += `$\\mathcal{A}=${texNombre(R)}\\times${texNombre(R)}\\times\\pi${sp()}\\text{cm}^2=${texNombre(R * R)}\\pi${sp()}\\text{cm}^2\\approx${texNombre(
                R * R * (this.sup4 ? 3.14 : Math.PI),
                3,
              )}${sp()}\\text{cm}^2$`
            }
          }
          if (this.sup5 !== 2)
            texteCorr += `<br>Les deux valeurs approchées au dixième de cm du périmètre de ce disque sont donc  $${miseEnEvidence(texNombre(troncature(2 * R * (this.sup4 ? 3.14 : Math.PI), 1)))}$ $${miseEnEvidence('cm')}$ et $${miseEnEvidence(texNombre(0.1 + troncature(2 * R * (this.sup4 ? 3.14 : Math.PI), 1)))}$ $${miseEnEvidence('cm')}$, sachant que la valeur la plus proche ($${miseEnEvidence(texNombre(2 * R * (this.sup4 ? 3.14 : Math.PI), 1))}$ $${miseEnEvidence('cm')}$) est la valeur arrondie.`
          if (this.sup5 !== 1)
            texteCorr += `<br>Les deux valeurs approchées au dixième de cm$^2$ de l'aire de ce disque sont donc  $${miseEnEvidence(texNombre(troncature(R * R * (this.sup4 ? 3.14 : Math.PI), 1)))}$ $${miseEnEvidence('cm^2')}$ et $${miseEnEvidence(texNombre(0.1 + troncature(R * R * (this.sup4 ? 3.14 : Math.PI), 1)))}$ $${miseEnEvidence('cm^2')}$, sachant que la valeur la plus proche ($${miseEnEvidence(texNombre(R * R * (this.sup4 ? 3.14 : Math.PI), 1))}$ $${miseEnEvidence('cm^2')}$) est la valeur arrondie.<br>`
          resultat1 = arrondi(2 * R * (this.sup4 ? 3.14 : Math.PI), 1)
          resultat2 = arrondi(R * R * (this.sup4 ? 3.14 : Math.PI), 1)
          break
        case 'demi-disque':
        default:
          R = this.sup2 ? randint(2, 4) + randint(1, 9) / 10 : randint(2, 5)
          if (this.sup3) {
            texte +=
              "de ce demi-disque. Donner une valeur approchée au dixième de cm pour l'un et au dixième de cm$^2$ pour l'autre."
            const nomCercle = creerNomDePolygone(4, listeDeNomsDePolygones)
            listeDeNomsDePolygones.push(nomCercle)
            const A = point(0, 0, nomCercle.charAt(0), 'below left')
            const Rd = 3
            const B = pointAdistance(
              A,
              Rd,
              randint(-5, 5, [0]),
              nomCercle.charAt(1),
              'above right',
            )
            const figure = arc(B, A, 180, true, 'white', 'black', 0.2)
            const C = pointSurSegment(
              A,
              B,
              -Rd,
              nomCercle.charAt(2),
              'above left',
            )
            // Les lignes ci-dessous permettent d'avoir un affichage aux dimensions optimisées
            const xmin = Math.min(A.x - Rd) - 2
            const xmax = Math.max(A.x + Rd) + 2
            const ymin = -1
            const ymax = Math.max(A.y + Rd) + 2
            // paramètres de la fenêtre Mathalea2d pour l'énoncé normal
            const params = {
              xmin,
              ymin,
              xmax,
              ymax,
              pixelsParCm: 20,
              scale: 0.6,
              zoom: 1,
            }
            // On ajoute au texte de la correction, la figure de la correction
            const traces = tracePoint(A, B, C)
            const labels = labelPoint(A, B, C)
            const segT = texteSurSegment(
              nomCercle.charAt(1) +
                nomCercle.charAt(2) +
                '=' +
                stringNombre(R * 2, 1) +
                ' cm',
              C,
              B,
              'red',
              1,
            ) as TexteParPoint
            segT.mathOn = false
            segT.scale = 1.5
            figure.epaisseur = 2
            const objets = []
            objets.push(labels, traces, figure, segment(B, C), segT)
            texte += '<br>' + mathalea2d(params, objets)
            texteCorr = ''
          } else {
            donneLeDiametre = choice([true, false])
            if (donneLeDiametre) {
              texte +=
                `d'un demi-disque de $${texNombre(2 * R)}$ cm de diamètre. Donner une valeur approchée au dixième de cm pour l'un et au dixième de cm$^2$ pour l'autre.` +
                '<br>'
              texteCorr = `Le diamètre est de $${texNombre(2 * R)}$ cm donc le rayon est de $${texNombre(R)}$ cm.<br>`
            } else {
              texte += `d'un demi-disque de $${texNombre(R)}$ cm de rayon. Donner une valeur approchée au dixième de cm pour l'un et au dixième de cm$^2$ pour l'autre.`
              texteCorr = ''
            }
          }
          if (this.sup5 !== 2)
            texteCorr +=
              "Pour le périmètre, à la moitié d'un cercle, il faut penser à ajouter le diamètre du demi-cercle, pour fermer la figure.<br>"

          if (this.sup4) {
            if (this.sup5 !== 2)
              texteCorr += `<br>Si on utilise $\\pi \\approx 3,14$, alors <br> $\\mathcal{P}\\approx (2 \\times ${texNombre(R)} \\times 3,14 \\div 2) + (2 \\times ${texNombre(R)}) \\approx ${texNombre((2 * R * (this.sup4 ? 3.14 : Math.PI)) / 2 + 2 * R, 3)}${sp()}${texTexte('cm')}$.<br>`
            if (this.sup5 !== 1)
              texteCorr += `$\\mathcal{A}\\approx ${texNombre(R)}\\times${texNombre(R)}\\times 3,14 \\div 2\\approx ${texNombre((R * R * (this.sup4 ? 3.14 : Math.PI)) / 2, 3)}${sp()}${texTexte('cm')}^2$.`
          } else {
            if (this.sup5 !== 2)
              texteCorr += `$\\mathcal{P}=(2\\times${texNombre(R)}\\times\\pi\\div 2) + (2\\times${texNombre(R)})${sp()}\\approx${texNombre((2 * R * (this.sup4 ? 3.14 : Math.PI)) / 2 + 2 * R, 3)}${sp()}\\text{cm}$<br>`
            if (this.sup5 !== 1)
              texteCorr += `$\\mathcal{A}=${texNombre(R)}\\times${texNombre(R)}\\times\\pi \\div 2${sp()}\\approx${texNombre((R * R * (this.sup4 ? 3.14 : Math.PI)) / 2, 3)}${sp()}\\text{cm}^2$`
          }
          if (this.sup5 !== 2)
            texteCorr += `<br>Les deux valeurs approchées au dixième de cm du périmètre de ce disque sont donc  $${miseEnEvidence(texNombre(troncature((2 * R * (this.sup4 ? 3.14 : Math.PI)) / 2 + 2 * R, 1)))}$ $${miseEnEvidence('cm')}$ et $${miseEnEvidence(texNombre(0.1 + troncature((2 * R * (this.sup4 ? 3.14 : Math.PI)) / 2 + 2 * R, 1)))}$ $${miseEnEvidence('cm')}$, sachant que la valeur la plus proche ($${miseEnEvidence(texNombre((2 * R * (this.sup4 ? 3.14 : Math.PI)) / 2 + 2 * R, 1))}$ $${miseEnEvidence('cm')}$) est la valeur arrondie.`
          if (this.sup5 !== 1)
            texteCorr += `<br>Les deux valeurs approchées au dixième de cm$^2$ de l'aire de ce disque sont donc  $${miseEnEvidence(texNombre(troncature((R * R * (this.sup4 ? 3.14 : Math.PI)) / 2, 1)))}$ $${miseEnEvidence('cm^2')}$ et $${miseEnEvidence(texNombre(0.1 + troncature((R * R * (this.sup4 ? 3.14 : Math.PI)) / 2, 1)))}$ $${miseEnEvidence('cm^2')}$, sachant que la valeur la plus proche ($${miseEnEvidence(texNombre((R * R * (this.sup4 ? 3.14 : Math.PI)) / 2, 1))}$ $${miseEnEvidence('cm^2')}$) est la valeur arrondie.<br>`

          resultat1 = arrondi(
            (2 * R * (this.sup4 ? 3.14 : Math.PI)) / 2 + 2 * R,
            1,
          )
          resultat2 = arrondi((R * R * (this.sup4 ? 3.14 : Math.PI)) / 2, 1)
          break
      }
      if (this.sup5 !== 2) {
        texte += ajouteChampTexteMathLive(
          this,
          indiceInteractif,
          ' unites[longueurs,aires]',
          {
            texteAvant: '<br>Périmètre : ',
            texteApres: '<em class="ml-2">(Une unité est attendue.)</em>',
          },
        )
      }
      if (this.sup5 !== 1) {
        texte +=
          (this.interactif ? '<br>' : '') +
          ajouteChampTexteMathLive(
            this,
            indiceInteractif + (this.sup5 === 3 ? 1 : 0),
            ' unites[longueurs,aires]',
            {
              texteAvant: '<br>' + sp(13) + 'Aire : ',
              texteApres: '<em class="ml-2">(Une unité est attendue.)</em>',
            },
          )
      }

      if (this.questionJamaisPosee(i, String(resultat1), String(resultat2))) {
        if (!context.isAmc) {
          if (this.sup5 !== 2)
            handleAnswers(this, indiceInteractif, {
              reponse: {
                value: `${resultat1}cm`,
                options: { unite: true, precisionUnite: 0.1 },
              },
            })
          if (this.sup5 !== 1)
            handleAnswers(this, indiceInteractif + (this.sup5 === 3 ? 1 : 0), {
              reponse: {
                value: `${resultat2}cm^2`,
                options: { unite: true, precisionUnite: 0.1 },
              },
            })
        } else {
          this.autoCorrection[i] = {
            enonce: texte,
            options: { barreseparation: true, numerotationEnonce: true },
            propositions: [
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: texteCorr,
                    statut: '',
                    multicolsBegin: true,
                    reponse: {
                      texte: 'Périmètre en cm :',
                      valeur: resultat1,
                      alignement: 'center',
                      param: {
                        digits: nombreDeChiffresDe(resultat1),
                        decimals:
                          nombreDeChiffresDansLaPartieDecimale(resultat1),
                        signe: false,
                        approx: 1,
                      },
                    },
                  },
                ],
              },
              {
                type: 'AMCNum',
                propositions: [
                  {
                    texte: '',
                    statut: '',
                    multicolsEnd: true,
                    reponse: {
                      texte: 'Aire en cm$^2$ :',
                      valeur: resultat2,
                      alignement: 'center',
                      param: {
                        digits: nombreDeChiffresDe(resultat2),
                        decimals:
                          nombreDeChiffresDansLaPartieDecimale(resultat2),
                        signe: false,
                        approx: 1,
                      },
                    },
                  },
                ],
              },
            ],
          }
        }
        // Si la question n'a jamais été posée, on en crée une autre
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
        if (this.sup5 !== 3) indiceInteractif++
        else indiceInteractif += 2
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
