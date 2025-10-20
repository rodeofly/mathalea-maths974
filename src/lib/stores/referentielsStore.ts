// Ce store est dédié au stockage des référentiels et des outils de leur évolution
import { get, writable } from 'svelte/store'
import referentielAleaCH from '../../json/referentiel2022CH.json'
import referentielAlea from '../../json/referentiel2022FR.json'
import referentielBibliotheque from '../../json/referentielBibliotheque.json'
import referentielGeometrieDynamique from '../../json/referentielGeometrieDynamique.json'
import referentielProfs from '../../json/referentielProfs.json'
import referentielRessources from '../../json/referentielRessources.json'
import referentielsActivation from '../../json/referentielsActivation.json'
import referentielExamsCH from '../../json/referentielStaticCH.json'
import referentielExams from '../../json/referentielStaticFR.json'
import {
  buildReferentiel,
  getAllEndings,
  getRecentExercices,
} from '../components/refUtils'
import {
  sortArrayOfResourcesBasedOnProp,
  triAnnales,
} from '../components/sorting'
import type { Language } from '../types/languages'
import type {
  ActivationName,
  JSONReferentielObject,
  ReferentielInMenu,
  ResourceAndItsPath,
} from '../types/referentiels'

function createoriginalReferentielsFR() {
  /**
   * Constitutions des référentiels français
   */
  // on trie les examens dans l'ordre inverse des années/mois
  const examsReferentiel: JSONReferentielObject = { ...referentielExams }
  const activations: Record<ActivationName, boolean> = {
    ...referentielsActivation,
  }
  const examens = getAllEndings(examsReferentiel)
  // MGu: c'est trié dans ReferentielNode
  // examens = triAnnales(examens, 'ascStringdescNumber')
  const orderedExamsReferentiel = buildReferentiel(examens)
  const baseReferentiel: JSONReferentielObject = { ...referentielAlea }
  const referentielOutils: JSONReferentielObject = { ...referentielProfs }
  const referentielHtml: JSONReferentielObject = { ...referentielRessources }
  const biblioReferentiel: JSONReferentielObject = {
    ...referentielBibliotheque,
  }
  const baseGeometrieDynamiqueReferentiel: JSONReferentielObject = {
    ...referentielGeometrieDynamique,
  }
  // on ajoute les nouveautés
  const newExercises: ResourceAndItsPath[] = getRecentExercices(baseReferentiel)
  const newExercisesReferentiel: JSONReferentielObject = {}
  for (const item of newExercises) {
    newExercisesReferentiel[
      item.pathToResource[item.pathToResource.length - 1]
    ] = { ...item.resource }
  }

  // on trie les exercice aléatoires par ID ('4-C10' < '4-C10-1' <'4-C10-10')
  // EE : Puisqu'on a déjà le référentiel, je ne comprends pas à quoi cela sert
  // d'autant que cela change les ordres alphabétiques pour les terminales.
  // Bon, j'ai compris mais comme les exos de terminales n'ont pas une entête cohérente alphabétiquement, on n'a pas le choix
  // que d'enlever ces lignes.

  const baseAndNewsReferentiel: JSONReferentielObject = {
    Nouveautés: { ...newExercisesReferentiel },
    ...baseReferentiel,
  }
  let exercices = getAllEndings(baseAndNewsReferentiel)
  exercices = [...sortArrayOfResourcesBasedOnProp(exercices, 'id')]

  const aleaReferentiel = buildReferentiel(exercices)

  const exercicesGeometrieDynamique = getAllEndings(
    baseGeometrieDynamiqueReferentiel,
  )
  const geometrieDynamiqueReferentiel = buildReferentiel(
    exercicesGeometrieDynamique,
  )
  // référentiel original
  const allReferentielsInMenus: ReferentielInMenu[] = [
    {
      title: 'Exercices aléatoires',
      name: 'aleatoires',
      searchable: true,
      referentiel: aleaReferentiel,
    },
    {
      title: 'Annales examens',
      name: 'examens',
      searchable: true,
      referentiel: orderedExamsReferentiel,
    },
    {
      title: 'Géométrie dynamique',
      name: 'geometrieDynamique',
      searchable: false,
      referentiel: geometrieDynamiqueReferentiel,
    },
    {
      title: 'Outils',
      name: 'outils',
      searchable: false,
      referentiel: referentielOutils,
    },
    {
      title: 'Vos ressources',
      name: 'ressources',
      searchable: false,
      referentiel: referentielHtml,
    },
    {
      title: 'Bibliothèque',
      name: 'statiques',
      searchable: false,
      referentiel: biblioReferentiel,
    },
  ]
  const activatedReferentielsInMenu: ReferentielInMenu[] = []
  for (const ref of allReferentielsInMenus) {
    if (activations[ref.name]) {
      activatedReferentielsInMenu.push(ref)
    }
  }
  const originalReferentiels = [...activatedReferentielsInMenu]
  return originalReferentiels
}

function createoriginalReferentielsCH() {
  /**
   * Constitutions des référentiels suisses
   */
  // on trie les examens dans l'ordre inverse des années/mois
  const examsReferentielCH: JSONReferentielObject = { ...referentielExamsCH }
  const activations: Record<ActivationName, boolean> = {
    ...referentielsActivation,
  }
  let examensCH = getAllEndings(examsReferentielCH)
  examensCH = [...triAnnales(examensCH, 'desc')]
  const referentielHtml: JSONReferentielObject = { ...referentielRessources }
  const referentielOutils: JSONReferentielObject = { ...referentielProfs }
  const baseGeometrieDynamiqueReferentiel: JSONReferentielObject = {
    ...referentielGeometrieDynamique,
  }
  const exercicesGeometrieDynamique = getAllEndings(
    baseGeometrieDynamiqueReferentiel,
  )
  const geometrieDynamiqueReferentiel = buildReferentiel(
    exercicesGeometrieDynamique,
  )

  const orderedExamsReferentielCH = buildReferentiel(examensCH)
  const baseReferentielCH: JSONReferentielObject = { ...referentielAleaCH }
  const newExercisesCH: ResourceAndItsPath[] =
    getRecentExercices(baseReferentielCH)
  const newExercisesReferentielCH: JSONReferentielObject = {}
  for (const item of newExercisesCH) {
    newExercisesReferentielCH[
      item.pathToResource[item.pathToResource.length - 1]
    ] = { ...item.resource }
  }
  const baseAndNewsReferentielCH: JSONReferentielObject = {
    Nouveautés: { ...newExercisesReferentielCH },
    ...baseReferentielCH,
  }
  // on trie les exercice aléatoires par ID ('4-C10' < '4-C10-1' <'4-C10-10')
  let exercicesCH = getAllEndings(baseAndNewsReferentielCH)
  exercicesCH = [...sortArrayOfResourcesBasedOnProp(exercicesCH, 'id')]
  const aleaReferentielCH = buildReferentiel(exercicesCH)
  const allReferentielsInMenusCH: ReferentielInMenu[] = [
    {
      title: 'Exercices aléatoires',
      name: 'aleatoires',
      searchable: true,
      referentiel: aleaReferentielCH,
    },
    //    {
    //     title: 'EVACOM et TAF',
    //  name: 'examens',
    // searchable: true,
    // referentiel: orderedExamsReferentielCH,
    // },
    {
      title: 'Géométrie dynamique',
      name: 'geometrieDynamique',
      searchable: false,
      referentiel: geometrieDynamiqueReferentiel,
    },
    {
      title: 'Outils',
      name: 'outils',
      searchable: false,
      referentiel: referentielOutils,
    },
    {
      title: 'Vos ressources',
      name: 'ressources',
      searchable: false,
      referentiel: referentielHtml,
    },
  ]
  const activatedReferentielsInMenuCH: ReferentielInMenu[] = []
  for (const ref of allReferentielsInMenusCH) {
    if (activations[ref.name]) {
      activatedReferentielsInMenuCH.push(ref)
    }
  }
  const originalReferentielsCH = [...activatedReferentielsInMenuCH]

  return originalReferentielsCH
}

/**
 * Fabrique une liste de _vraies_ copies d'objets représentant les référentiels dans le menu.
 * Ces objet sont passés en paramètres sous la forme d'un tableau.
 * @param {ReferentielInMenu[]} originals liste de référentiels
 * @returns {ReferentielInMenu[]} liste des copies des référentiels
 */
export const deepReferentielInMenuCopy = (
  originals: ReferentielInMenu[],
): ReferentielInMenu[] => {
  const copy: ReferentielInMenu[] = []
  for (const item of originals) {
    const ref: ReferentielInMenu = {
      title: item.title,
      name: item.name,
      searchable: item.searchable,
      referentiel: { ...item.referentiel },
    }
    copy.push(ref)
  }
  return copy
}
// référentiel mutable utilisé par les composants
// MGu ne surtout pas le charger au départ, car c'est une variable globale,
// et donc l'arbre va être chargé quelque soit la page demandée...
// alors que c'est utile seulement pour menuside de la vue prof
// MGu pourquoi le mettre en storer, alors que finalement personne y souscrit ?
// Une variable globale aurait le même effet.
const referentiels = writable<ReferentielInMenu[]>([])

let localeLangLoaded: Language

export const getReferentiels = (lang: Language) => {
  // console.log('getReferentiels', lang)
  if (lang === 'fr-FR' && localeLangLoaded !== 'fr-FR') {
    referentiels.set(createoriginalReferentielsFR())
    localeLangLoaded = lang
    // console.log('getReferentiels loaded', lang)
  } else if (lang === 'fr-CH' && localeLangLoaded !== 'fr-CH') {
    referentiels.set(createoriginalReferentielsCH())
    localeLangLoaded = lang
    // console.log('getReferentiels loaded', lang)
  }
  return deepReferentielInMenuCopy(get(referentiels))
}
