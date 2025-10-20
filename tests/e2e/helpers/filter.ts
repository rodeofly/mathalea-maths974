import referentielStaticFR from '../../../src/json/referentielStaticFR.json'
import referentielStaticCH from '../../../src/json/referentielStaticCH.json'
import { type JSONReferentielObject } from '../../../src/lib/types/referentiels'
import uuidToUrl from '../../../src/json/uuidsToUrlFR.json'

// add all static referentiels FR and CH
const allStaticReferentiels: JSONReferentielObject = {
  ...referentielStaticFR,
  ...referentielStaticCH,
}

// on supprime les entrées par thème qui entraîne des doublons
delete allStaticReferentiels['Brevet des collèges par thème - APMEP']
delete allStaticReferentiels['BAC par thème - APMEP']
delete allStaticReferentiels['CRPE par thème']
delete allStaticReferentiels['E3C par thème - APMEP']
delete allStaticReferentiels['EVACOM par thème']

export async function findUuid(filter: string) {
  const uuids = Object.entries(uuidToUrl)
  const filters = filter.split('^')
  const uuidsFilter: [string, string][] = []
  filters.forEach((e) => {
    uuidsFilter.push(
      ...uuids.filter(function (uuid) {
        return uuid[1].startsWith(e)
      }),
    )
  })
  return uuidsFilter
}

export async function findStatic(filter: string) {
  const uuids = Object.entries(allStaticReferentiels)
  // les clés de allStaticReferentiels sont les thèmes (types)
  // [
  // 0 = ['Brevet', {…}]
  // 1 = ['BrevetTags', {…}]
  // 2 = ['E3C', {…}]
  // 3 ['E3CTags', {…}]
  // 4 ['crpe', {…}]
  // 5 ['crpeTags', {…}]
  // 6 ['Bac', {…}]
  // 7 ['EVACOM', {…}]
  // 8 ['EVACOMTags', {…}]
  // ]
  const uuidsDNB = uuids[0][1]
  const uuidsE3C = uuids[2][1]
  const uuidsBAC = (uuids[6][1] as JSONReferentielObject)
    .Bac99TerminaleSpecialite
  const uuidsSTI2D = (uuids[6][1] as JSONReferentielObject).Bac89STI2D
  const uuidsCRPE = uuids[3][1]
  const uuidsFound: [string, string][] = []
  const filters = filter.split('^')
  filters.forEach((e) => {
    Object.entries(uuidsDNB).forEach(([, value]) => {
      // les keys sont les années, elles ne nous intéressent pas ici!
      const values = Object.values(value)
      values.forEach((val) => {
        if (
          val !== null &&
          typeof val === 'object' &&
          'uuid' in val &&
          typeof val.uuid === 'string' &&
          val.uuid.startsWith(e)
        ) {
          uuidsFound.push([val.uuid, val.uuid])
        }
      })
    })
    Object.entries(uuidsCRPE).forEach(([, value]) => {
      // les keys sont les années, elles ne nous intéressent pas ici!
      const values = Object.values(value)
      values.forEach((val) => {
        if (
          val !== null &&
          typeof val === 'object' &&
          'uuid' in val &&
          typeof val.uuid === 'string' &&
          val.uuid.startsWith(e)
        ) {
          uuidsFound.push([val.uuid, val.uuid])
        }
      })
    })
    Object.entries(uuidsBAC).forEach(([, value]) => {
      // les keys sont les années, elles ne nous intéressent pas ici!
      const values = Object.values(value)
      values.forEach((val) => {
        if (
          val !== null &&
          typeof val === 'object' &&
          'uuid' in val &&
          typeof val.uuid === 'string' &&
          val.uuid.startsWith(e)
        ) {
          uuidsFound.push([val.uuid, val.uuid])
        }
      })
    })
    Object.entries(uuidsSTI2D).forEach(([, value]) => {
      // les keys sont les années, elles ne nous intéressent pas ici!
      const values = Object.values(value)
      values.forEach((val) => {
        if (
          val !== null &&
          typeof val === 'object' &&
          'uuid' in val &&
          typeof val.uuid === 'string' &&
          val.uuid.startsWith(e)
        ) {
          uuidsFound.push([val.uuid, val.uuid])
        }
      })
    })
    Object.entries(uuidsE3C).forEach(([, value]) => {
      // les keys sont les années, elles ne nous intéressent pas ici!
      const values = Object.values(value)
      values.forEach((val) => {
        if (
          val !== null &&
          typeof val === 'object' &&
          'uuid' in val &&
          typeof val.uuid === 'string' &&
          val.uuid.startsWith(e)
        ) {
          uuidsFound.push([val.uuid, val.uuid])
        }
      })
    })
  })
  return uuidsFound
}
