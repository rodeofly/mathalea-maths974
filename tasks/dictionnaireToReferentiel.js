/**
 * L'exécuter avec node tasks/dictionnaireToReferentiel.js
 * Ce script met à jour le référentiel des exercices statiques en récupérant les mots clé et les url
 * dans les différents dictionnaires qu'il faut mettre à jour au préalable.
 */

import fs from 'fs'
import { dictionnaireBAC } from '../src/json/dictionnaireBAC.js'
import { dictionnaireCrpeCoop } from '../src/json/dictionnaireCrpeCoop.js'
import { dictionnaireDNB } from '../src/json/dictionnaireDNB.js'
import { dictionnaireDNBPRO } from '../src/json/dictionnaireDNBPRO.js'
import { dictionnaireE3C } from '../src/json/dictionnaireE3C.js'
import { dictionnaireEVACOM } from '../src/json/dictionnaireEVACOM.js'
import { dictionnaireSTI2D } from '../src/json/dictionnaireSTI2D.js'
import { dictionnaireSTL } from '../src/json/dictionnaireSTL.js'

const referentielFR = {}
const referentielCH = {}

// Gestion du DNB
referentielFR.Brevet = {}
referentielFR.BrevetTags = {}
const setTagsDNB = new Set()

for (const ex in dictionnaireDNB) {
  dictionnaireDNB[ex].tags.forEach((e) => {
    setTagsDNB.add(e)
  })
}

for (const ex in dictionnaireDNBPRO) {
  dictionnaireDNBPRO[ex].tags.forEach((e) => {
    setTagsDNB.add(e)
  })
}

const tagsDNB = [...setTagsDNB].sort((a, b) => {
  return a.localeCompare(b)
})
for (const annee of [
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
]) {
  referentielFR.Brevet[annee] = {}
  for (const ex in dictionnaireDNB) {
    if (dictionnaireDNB[ex].annee === annee) {
      referentielFR.Brevet[annee][ex] = { uuid: ex, ...dictionnaireDNB[ex] }
    }
  }
}

for (const annee of [
  '2030',
  '2029',
  '2028',
  '2027',
  '2026',
  '2025',
  '2024',
  '2023',
]) {
  for (const ex in dictionnaireDNBPRO) {
    if (dictionnaireDNBPRO[ex].annee === annee) {
      referentielFR.Brevet[annee][ex] = { uuid: ex, ...dictionnaireDNBPRO[ex] }
    }
  }
}

for (const tag of tagsDNB) {
  referentielFR.BrevetTags[tag] = {}
  for (const ex in dictionnaireDNB) {
    if (dictionnaireDNB[ex].tags.includes(tag)) {
      referentielFR.BrevetTags[tag][ex] = { uuid: ex, ...dictionnaireDNB[ex] }
    }
  }
  for (const ex in dictionnaireDNBPRO) {
    if (dictionnaireDNBPRO[ex].tags.includes(tag)) {
      referentielFR.BrevetTags[tag][ex] = {
        uuid: ex,
        ...dictionnaireDNBPRO[ex],
      }
    }
  }
}

// Gestion des épreuves de 1re
referentielFR['30_Épreuves de Première - Par année'] = {}
referentielFR['30_Épreuves de Première - Par année']['E3C - Général'] = {}
referentielFR['30_Épreuves de Première - Par année']['EAM - Spécialité'] = {}
referentielFR['30_Épreuves de Première - Par année']['EAM - Spécifique'] = {}
referentielFR['30_Épreuves de Première - Par année']['EAM - Technologique'] = {}
referentielFR['40_Épreuves de Première - Par thème'] = {}
referentielFR['40_Épreuves de Première - Par thème']['E3C - Général'] = {}
referentielFR['40_Épreuves de Première - Par thème']['EAM - Spécialité'] = {}
referentielFR['40_Épreuves de Première - Par thème']['EAM - Spécifique'] = {}
referentielFR['40_Épreuves de Première - Par thème']['EAM - Technologique'] = {}
referentielFR['50_Baccalauréat - Par année'] = {}
referentielFR['50_Baccalauréat - Par année']['00_Général'] = {}
referentielFR['50_Baccalauréat - Par année']['10_STI2D'] = {}
referentielFR['50_Baccalauréat - Par année']['20_STL'] = {}
referentielFR['60_Baccalauréat - Par thème'] = {}
referentielFR['60_Baccalauréat - Par thème']['00_Général'] = {}
referentielFR['60_Baccalauréat - Par thème']['10_STI2D'] = {}
referentielFR['60_Baccalauréat - Par thème']['20_STL'] = {}

// Gestion du BAC, des STI2D et des STL
const setThemesBAC = new Set()
const setThemeSTI2D = new Set()
const setThemeSTL = new Set()

for (const ex in dictionnaireBAC) {
  dictionnaireBAC[ex].tags.forEach((e) => {
    setThemesBAC.add(e)
  })
}

for (const ex in dictionnaireSTI2D) {
  dictionnaireSTI2D[ex].tags.forEach((e) => {
    setThemeSTI2D.add(e)
  })
}

for (const ex in dictionnaireSTL) {
  dictionnaireSTL[ex].tags.forEach((e) => {
    setThemeSTL.add(e)
  })
}

for (const annee of [
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
]) {
  referentielFR['50_Baccalauréat - Par année']['00_Général'][annee] = {}
  for (const ex in dictionnaireBAC) {
    if (dictionnaireBAC[ex].annee === annee) {
      referentielFR['50_Baccalauréat - Par année']['00_Général'][annee][ex] = {
        uuid: ex,
        ...dictionnaireBAC[ex],
      }
    }
  }
}

for (const annee of [
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
]) {
  referentielFR['50_Baccalauréat - Par année']['10_STI2D'][annee] = {}
  for (const ex in dictionnaireSTI2D) {
    if (dictionnaireSTI2D[ex].annee === annee) {
      referentielFR['50_Baccalauréat - Par année']['10_STI2D'][annee][ex] = {
        uuid: ex,
        ...dictionnaireSTI2D[ex],
      }
    }
  }
  referentielFR['50_Baccalauréat - Par année']['20_STL'][annee] = {}
  for (const ex in dictionnaireSTL) {
    if (dictionnaireSTL[ex].annee === annee) {
      referentielFR['50_Baccalauréat - Par année']['20_STL'][annee][ex] = {
        uuid: ex,
        ...dictionnaireSTL[ex],
      }
    }
  }
}

const tagsBAC = [...setThemesBAC].sort((a, b) => {
  return a.localeCompare(b)
})
referentielFR['60_Baccalauréat - Par thème']['00_Général'] = {}

const tagsSTI2D = [...setThemeSTI2D].sort((a, b) => {
  return a.localeCompare(b)
})
referentielFR['60_Baccalauréat - Par thème']['10_STI2D'] = {}

const tagsSTL = [...setThemeSTL].sort((a, b) => {
  return a.localeCompare(b)
})
referentielFR['60_Baccalauréat - Par thème']['20_STL'] = {}

for (const tag of tagsBAC) {
  referentielFR['60_Baccalauréat - Par thème']['00_Général'][tag] = {}
  for (const ex in dictionnaireBAC) {
    if (dictionnaireBAC[ex].tags.includes(tag)) {
      referentielFR['60_Baccalauréat - Par thème']['00_Général'][tag][ex] = {
        uuid: ex,
        ...dictionnaireBAC[ex],
      }
    }
  }
}

for (const tag of tagsSTI2D) {
  referentielFR['60_Baccalauréat - Par thème']['10_STI2D'][tag] = {}
  for (const ex in dictionnaireSTI2D) {
    if (dictionnaireSTI2D[ex].tags.includes(tag)) {
      referentielFR['60_Baccalauréat - Par thème']['10_STI2D'][tag][ex] = {
        uuid: ex,
        ...dictionnaireSTI2D[ex],
      }
    }
  }
}

for (const tag of tagsSTL) {
  referentielFR['60_Baccalauréat - Par thème']['20_STL'][tag] = {}
  for (const ex in dictionnaireSTL) {
    if (dictionnaireSTL[ex].tags.includes(tag)) {
      referentielFR['60_Baccalauréat - Par thème']['20_STL'][tag][ex] = {
        uuid: ex,
        ...dictionnaireSTL[ex],
      }
    }
  }
}

// Gestion des E3C
referentielFR['30_Épreuves de Première - Par année']['E3C - Général'] = {}
const setThemesE3C = new Set()

for (const ex in dictionnaireE3C) {
  dictionnaireE3C[ex].tags.forEach((e) => {
    setThemesE3C.add(e)
  })
}

for (const annee of ['2020', '2021']) {
  referentielFR['30_Épreuves de Première - Par année']['E3C - Général'][annee] =
    {}
  for (const ex in dictionnaireE3C) {
    if (dictionnaireE3C[ex].annee === annee) {
      referentielFR['30_Épreuves de Première - Par année']['E3C - Général'][
        annee
      ][ex] = { uuid: ex, ...dictionnaireE3C[ex] }
    }
  }
}

const tagsE3C = [...setThemesE3C].sort((a, b) => {
  return a.localeCompare(b)
})
referentielFR['40_Épreuves de Première - Par thème']['E3C - Général'] = {}

for (const tag of tagsE3C) {
  referentielFR['40_Épreuves de Première - Par thème']['E3C - Général'][tag] =
    {}
  for (const ex in dictionnaireE3C) {
    if (dictionnaireE3C[ex].tags.includes(tag)) {
      referentielFR['40_Épreuves de Première - Par thème']['E3C - Général'][
        tag
      ][ex] = { uuid: ex, ...dictionnaireE3C[ex] }
    }
  }
}

// Gestion du CRPE version Coopmaths ET COPIRELEM maintenant (05/06/2024)
referentielFR.crpe = {}
const setThemesCrpe = new Set()

for (const ex in dictionnaireCrpeCoop) {
  dictionnaireCrpeCoop[ex].tags.forEach((e) => {
    setThemesCrpe.add(e)
  })
}

for (const annee of ['2019', '2018', '2017', '2016', '2015', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']) {
  referentielFR.crpe[annee] = {}
  for (const ex in dictionnaireCrpeCoop) {
    if (dictionnaireCrpeCoop[ex].annee === annee) {
      referentielFR.crpe[annee][ex] = { uuid: ex, ...dictionnaireCrpeCoop[ex] }
    }
  }
}

const tagsCrpe = [...setThemesCrpe].sort((a, b) => {
  return a.localeCompare(b)
})
referentielFR.crpeTags = {}

for (const tag of tagsCrpe) {
  referentielFR.crpeTags[tag] = {}
  for (const ex in dictionnaireCrpeCoop) {
    if (dictionnaireCrpeCoop[ex].tags.includes(tag)) {
      referentielFR.crpeTags[tag][ex] = {
        uuid: ex,
        ...dictionnaireCrpeCoop[ex],
      }
    }
  }
}

// Gestion du ref EVACOM
referentielCH.EVACOM = {}
referentielCH.EVACOMTags = {}
const setTagsEVACOM = new Set()

for (const ex in dictionnaireEVACOM) {
  dictionnaireEVACOM[ex].tags.forEach((e) => {
    setTagsEVACOM.add(e)
  })
}

const tagsEVACOM = [...setTagsEVACOM].sort((a, b) => {
  return a.localeCompare(b)
})
for (const annee of [
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
]) {
  referentielCH.EVACOM[annee] = {}
  for (const ex in dictionnaireEVACOM) {
    if (dictionnaireEVACOM[ex].annee === annee) {
      referentielCH.EVACOM[annee][ex] = { uuid: ex, ...dictionnaireEVACOM[ex] }
    }
  }
}

for (const tag of tagsEVACOM) {
  referentielCH.EVACOMTags[tag] = {}
  for (const ex in dictionnaireEVACOM) {
    if (dictionnaireEVACOM[ex].tags.includes(tag)) {
      referentielCH.EVACOMTags[tag][ex] = {
        uuid: ex,
        ...dictionnaireEVACOM[ex],
      }
    }
  }
}

const dataFR = JSON.stringify(referentielFR, null, 2)
fs.writeFileSync('src/json/referentielStaticFR.json', dataFR)

const dataCH = JSON.stringify(referentielCH, null, 2)
fs.writeFileSync('src/json/referentielStaticCH.json', dataCH)
