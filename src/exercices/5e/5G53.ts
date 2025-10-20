import { ajouteCanvas3d } from '../../lib/3d/3d_dynamique/Canvas3DElement'
import {
  createPrismWithWireframe,
  createPyramidWithWireframe,
  createTruncatedPyramidWithWireframe,
  createWireframeUnion,
} from '../../lib/3d/3d_dynamique/solidesThreeJs'
import {
  Point3d,
  point3d,
  polygone3d,
  vecteur3d,
} from '../../lib/3d/3dProjectionMathalea2d/elements'
import {
  prisme3d,
  pyramide3d,
  pyramideTronquee3d,
} from '../../lib/3d/3dProjectionMathalea2d/solides'
import {
  homothetie3d,
  translation3d,
} from '../../lib/3d/3dProjectionMathalea2d/tranformations'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = "Trouver le nombre de faces ou d'arêtes d'un solide"
export const dateDePublication = '7/11/2021'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
/**
 * @author Jean-Claude Lhote (Adapté par Eric Elter pour que les nouvelles fonctions 3d soient bien utilisées)
 */
export const uuid = 'da6a4'

export const refs = {
  'fr-fr': ['BP2G2', '5G53'],
  'fr-2016': ['6G44', 'BP2G2'],
  'fr-ch': ['9ES7-7'],
}
export default class NombreDeFacesEtDAretes extends Exercice {
  version: number
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Type de questions',
      3,
      "1 : Sur le nombre d'arêtes\n 2 : Sur le nombre de faces\n 3 : Mélange",
    ]
    this.besoinFormulaire2CaseACocher = ['3d dynamique', false]
    this.sup2 = false
    this.nbQuestions = 4

    this.sup = 3
    this.version = 6
  }

  nouvelleVersion() {
    if (this.version === 3) {
      this.sup = 3
    }

    let typeDeQuestion = []
    this.nbQuestions = Math.min(this.nbQuestions, 50) // Comme il n'y a que 70 questions différentes on limite pour éviter que la boucle ne cherche trop longtemps
    const choix1 = combinaisonListes([1, 3, 5, 7, 9, 11, 13], this.nbQuestions)
    const choix2 = combinaisonListes([2, 4, 6, 8, 10, 12, 14], this.nbQuestions)
    const nbAretes: number[] = combinaisonListes(
      [3, 4, 5, 6, 8],
      this.nbQuestions,
    )
    if (this.sup === 3) {
      for (let i = 0; i < this.nbQuestions; i++) {
        typeDeQuestion.push(choix1[i], choix2[i])
      }
    } else if (this.sup === 1) {
      typeDeQuestion = choix2.slice(0, this.nbQuestions)
    } else {
      typeDeQuestion = choix1.slice(0, this.nbQuestions)
    }

    for (let j = 0, choix; j < this.nbQuestions; ) {
      let correction = ''
      let reponse = 0
      let question = 'Voici un solide :<br>'
      const objects = []
      choix = typeDeQuestion[j]
      context.anglePerspective = 20
      const objets = []
      const points3D: Point3d[] = []
      const n = nbAretes[j]
      const rayon = 4
      const O = point3d(0, 0, 0)
      const k = vecteur3d(0, 0, 2)
      const k1 = homothetie3d(k, O, 2)
      const k2 = homothetie3d(k, O, -1)
      const s1 = translation3d(O, k1)
      const s2 = translation3d(O, k2)
      const alpha = (Math.PI * 2) / n
      const coeff = randint(5, 7) / 10
      for (let i = 0; i < n; i++) {
        points3D.push(
          point3d(
            rayon * Math.cos(alpha * i + (n > 5 ? 0.5 : 0)),
            rayon * Math.sin(alpha * i + (n > 5 ? 0.5 : 0)),
            0,
          ),
        )
      }
      // choix = j + 1
      const base = polygone3d(...points3D)
      const corps = prisme3d(base, vecteur3d(0, 0, -2))
      const base2 = translation3d(base, k)
      const chapeau1 =
        choix < 7
          ? pyramide3d(base2, s1)
          : choix < 9
            ? pyramide3d(base, s1)
            : choix < 13
              ? pyramideTronquee3d(base, s1, coeff)
              : pyramide3d(base, s1)
      const chapeau2 =
        choix < 9
          ? pyramide3d(base, s2)
          : choix < 11
            ? pyramideTronquee3d(base, s2, coeff)
            : choix < 13
              ? pyramide3d(base, s2)
              : pyramideTronquee3d(base, s2, coeff)

      // remplacement du switch(choix) par une factorisation en 2 étapes :
      // 1) construction / affichage du solide selon 7 types (baseIndex = ceil(choix/2))
      // 2) calcul de la réponse et de la correction selon choix (faces vs arêtes)
      {
        const baseIndex = Math.ceil(choix / 2) // 1..7

        switch (baseIndex) {
          case 1: // prisme + 2 pyramides (cas 1 et 2)
            if (this.sup2 && context.isHtml) {
              const geometries = [
                createPrismWithWireframe(n, 3, -0.5, 0.5, false, false),
                createPyramidWithWireframe(n, 3, 0.5, 2, false),
                createPyramidWithWireframe(n, 3, -0.5, -2, false),
              ]
              objects.push({
                type: 'bufferGeometry',
                geometry: createWireframeUnion(geometries),
              })
            } else {
              for (let i = 0; i < n; i++) {
                corps.base1.c2d[i].isVisible = false
                corps.base2.c2d[i].isVisible = false
              }
              objets.push(...corps.c2d, ...chapeau1.c2d, ...chapeau2.c2d)
            }

            if (choix % 2 === 1) {
              // faces
              reponse = 3 * n
              correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors le prisme et les deux pyramides possèdent aussi $${n}$ faces.<br>Ce solide est donc constitué de $3\\times ${n}$ faces, soit $${miseEnEvidence(3 * n)}$ faces.`
            } else {
              // arêtes
              reponse = 5 * n
              correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors le prisme et les deux pyramides possèdent aussi $${n}$ arêtes latérales.<br>On doit ajouter les $${n}$ arêtes de la base de chaque pyramide. Ce solide est donc constitué de $5\\times ${n}$ arêtes, soit $${miseEnEvidence(5 * n)}$ arêtes.`
            }
            break

          case 2: // prisme + 1 pyramide au dessus (cas 3 et 4)
            if (this.sup2 && context.isHtml) {
              const geometries = [
                createPrismWithWireframe(n, 3, -0.5, 0.5, true, false),
                createPyramidWithWireframe(n, 3, 0.5, 2),
              ]
              objects.push({
                type: 'bufferGeometry',
                geometry: createWireframeUnion(geometries),
              })
            } else {
              for (let i = 0; i < n; i++) {
                corps.base1.c2d[i].isVisible = false
              }
              objets.push(...corps.c2d, ...chapeau1.c2d)
            }

            if (choix % 2 === 1) {
              reponse = 2 * n + 1
              correction = `Comme le prisme a $${n}$ faces latérales, alors la pyramide en a $${n}$ aussi.<br>Si on ajoute la face du dessous, ce solide est donc constitué de $2\\times ${n}+1$ faces, soit $${miseEnEvidence(2 * n + 1)}$ faces.`
            } else {
              reponse = 4 * n
              correction = `Comme le prisme a $${n}$ arêtes latérales, alors la pyramide en a $${n}$ aussi.<br>En ajoutant les arêtes des deux bases du prisme, soit $2\\times ${n}$ arêtes, on obtient donc $4\\times ${n}$ arêtes, soit $${miseEnEvidence(4 * n)}$ arêtes.`
            }
            break

          case 3: // prisme + 1 pyramide en dessous (cas 5 et 6)
            if (this.sup2 && context.isHtml) {
              const geometries = [
                createPrismWithWireframe(n, 3, -0.5, 0.5, false, true),
                createPyramidWithWireframe(n, 3, -0.5, -2),
              ]
              objects.push({
                type: 'bufferGeometry',
                geometry: createWireframeUnion(geometries),
              })
            } else {
              for (let i = 0; i < n; i++) {
                corps.base1.c2d[i].isVisible = false
              }
              objets.push(...corps.c2d, ...chapeau2.c2d)
            }

            if (choix % 2 === 1) {
              reponse = 2 * n + 1
              correction = `Comme le prisme a $${n}$ faces latérales, alors la pyramide en a $${n}$ aussi.<br>Si on ajoute la face du dessus, ce solide est donc constitué de $2\\times ${n}+1$ faces, soit $${miseEnEvidence(2 * n + 1)}$ faces.`
            } else {
              reponse = 4 * n
              correction = `Comme le prisme a $${n}$ arêtes latérales, alors la pyramide en a $${n}$ aussi.<br>En ajoutant les arêtes des deux bases du prisme, soit $2\\times ${n}$ arêtes, on obtient donc $4\\times ${n}$ arêtes, soit $${miseEnEvidence(4 * n)}$ arêtes.`
            }
            break

          case 4: // 2 pyramides (cas 7 et 8)
            if (this.sup2 && context.isHtml) {
              const geometries = [
                createPyramidWithWireframe(n, 3, 0, 3),
                createPyramidWithWireframe(n, 3, 0, -2),
              ]
              objects.push({
                type: 'bufferGeometry',
                geometry: createWireframeUnion(geometries),
              })
            } else {
              objets.push(...chapeau1.c2d, ...chapeau2.c2d)
            }

            if (choix % 2 === 1) {
              reponse = 2 * n
              correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, elles ont aussi $${n}$ faces latérales.<br>Ce solide est donc constitué de $2\\times ${n}$ faces, soit $${miseEnEvidence(2 * n)}$ faces.`
            } else {
              reponse = 3 * n
              correction = `Comme chacune des pyramides possède une base à $${n}$ sommets, alors elles ont aussi $${n}$ arêtes latérales auxquelles on ajoute les $${n}$ arêtes de la base commune aux deux pyramide.<br>On obtient donc $3\\times ${n}$ arêtes, soit $${miseEnEvidence(3 * n)}$ arêtes.`
            }
            break

          case 5: // 2 troncs de pyramides (cas 9 et 10)
            if (this.sup2 && context.isHtml) {
              const geometries = [
                createTruncatedPyramidWithWireframe(
                  n,
                  3,
                  1,
                  0,
                  1.5,
                  false,
                  true,
                ),
                createTruncatedPyramidWithWireframe(
                  n,
                  1,
                  3,
                  -1.5,
                  0,
                  true,
                  false,
                ),
              ]
              objects.push({
                type: 'bufferGeometry',
                geometry: createWireframeUnion(geometries),
              })
            } else {
              for (let i = 0; i < n / 2; i++) {
                chapeau2.c2d[i + 2 * n].pointilles = 2
                chapeau1.c2d[i].pointilles = 2
                if (i !== 0) {
                  chapeau1.c2d[i + n].pointilles = 2
                }
              }
              objets.push(...chapeau1.c2d, ...chapeau2.c2d)
            }

            if (choix % 2 === 1) {
              reponse = 2 * n + 2
              correction = `Les deux pyramides tronquées ont une base commune à $${n}$ sommets, elles ont donc $${n}$ faces latérales chacune auxquelles il faut ajouter les deux faces parallèles du dessus et du dessous.<br>Ce solide est donc constitué de $2\\times ${n}+2$ faces, soit $${miseEnEvidence(2 * n + 2)}$ faces.`
            } else {
              reponse = 5 * n
              correction = `Les deux pyramides tronquées ont une base commune à $${n}$ sommets.<br>Donc elles ont aussi $${n}$ arêtes latérales chacune.<br>Il faut ajouter les $${n}$ arêtes de la base commune aux deux pyramides.<br>Enfin on ajoute les ${n} arêtes de la face du dessus et les ${n} arêtes de la face du dessous.<br>Au total, il y a $5\\times ${n}$ arêtes, soit $${miseEnEvidence(5 * n)}$ arêtes.`
            }
            break

          case 6: // tronc de pyramide + pyramide (cas 11 et 12)
            if (this.sup2 && context.isHtml) {
              const geometries = [
                createPyramidWithWireframe(n, 3, 0, -1.5, false),
                createTruncatedPyramidWithWireframe(n, 3, 1, 0, 2, false, true),
              ]
              objects.push({
                type: 'bufferGeometry',
                geometry: createWireframeUnion(geometries),
              })
            } else {
              for (let i = 0; i < n / 2; i++) {
                chapeau1.c2d[i].pointilles = 2
                if (i !== 0) {
                  chapeau1.c2d[i + n].pointilles = 2
                }
              }
              objets.push(...chapeau1.c2d, ...chapeau2.c2d)
            }

            if (choix % 2 === 1) {
              reponse = 2 * n + 1
              correction = `Le solide est composé d'une pyramide à $${n}$ faces latérales et d'un tronc de pyramide<br>qui possède autant de faces latérales plus une face au dessus<br>Ce solide est donc constitué de $2\\times ${n}+1$ faces, soit $${miseEnEvidence(2 * n + 1)}$ faces.`
            } else {
              reponse = 4 * n
              correction = `Le solide est composé d'une pyramide à $${n}$ arêtes latérales et d'un tronc de pyramide<br>qui possède aussi $${n}$ arêtes latérales.<br>Il faut ajouter les $${n}$ arêtes de chacune des bases du tronc de pyramide.<br>Au total, il y a $4\\times ${n}$ arêtes, soit $${miseEnEvidence(4 * n)}$ arêtes.`
            }
            break

          case 7: // tronc de pyramide en dessous + pyramide au dessus (cas 13 et 14)
          default:
            if (this.sup2 && context.isHtml) {
              const geometries = [
                createTruncatedPyramidWithWireframe(
                  n,
                  3,
                  1,
                  0,
                  -2,
                  false,
                  true,
                ),
                createPyramidWithWireframe(n, 3, 0, 2),
              ]
              objects.push({
                type: 'bufferGeometry',
                geometry: createWireframeUnion(geometries),
              })
            } else {
              for (let i = 0; i < n / 2; i++) {
                chapeau2.c2d[i].pointilles = 2
                if (i !== 0) {
                  chapeau2.c2d[i + n].pointilles = 2
                }
                chapeau2.c2d[i + 2 * n].pointilles = 2
              }
              objets.push(...chapeau1.c2d, ...chapeau2.c2d)
            }

            if (choix % 2 === 1) {
              reponse = 2 * n + 1
              correction = `Le solide est composé d'une pyramide à $${n}$ faces latérales et d'un tronc de pyramide<br>qui possède autant de faces latérales plus une face du dessous<br>Ce solide est donc constitué de $2\\times ${n}+1$ faces, soit $${miseEnEvidence(2 * n + 1)}$ faces.`
            } else {
              reponse = 4 * n
              correction = `Le solide est composé d'une pyramide à $${n}$ arêtes latérales et d'un tronc de pyramide<br>qui possède aussi $${n}$ arêtes latérales.<br>Il faut ajouter les $${n}$ arêtes de chacune des bases du tronc de pyramide.<br>Au total, il y a $4\\times ${n}$ arêtes, soit $${miseEnEvidence(4 * n)}$ arêtes.`
            }
            break
        }
      }
      // fin de la factorisation

      if (objects.length > 0) {
        const content = { objects: objects as any, autoCenterZoomMargin: 1 }
        question += ajouteCanvas3d({
          id: `canvas3d-Ex${this.numeroExercice}Q${j}`,
          content,
          width: 250,
          height: 250,
        })
      } else {
        question += mathalea2d(Object.assign({}, fixeBordures(objets)), objets)
      }
      if (choix % 2 === 1) {
        question += 'Quel est le nombre de faces de ce solide ?'
      } else {
        question += "Quel est le nombre d'arêtes de ce solide ?"
      }
      if (this.questionJamaisPosee(j, choix, n)) {
        handleAnswers(this, j, { reponse: { value: reponse } })
        question += ajouteChampTexteMathLive(this, j, '')
        this.listeQuestions[j] = question ?? ''
        this.listeCorrections[j] = correction
        j++
      }
    }
    listeQuestionsToContenu(this)
  }
}
