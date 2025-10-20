import type Exercice from '../exercices/Exercice'
import type { InterfaceParams } from './types'

interface Items {
  [key: string]: string
}

interface DocumentsEntity {
  title: string
  items: string[]
  number?: number
}

export interface UserSettings {
  items: Items
  documents: DocumentsEntity[]
}

export interface itemsWithExercises {
  [key: string]: Exercice[]
}

export function handleUrl(url: URL) {
  const entries = url.searchParams.entries()
  let indiceExercice = -1
  const newExercisesParams: InterfaceParams[] = []
  for (const entry of entries) {
    if (entry[0] === 'uuid') {
      indiceExercice++
      const uuid = entry[1]
      if (!newExercisesParams[indiceExercice])
        newExercisesParams[indiceExercice] = { uuid }
      newExercisesParams[indiceExercice].uuid = uuid // string
      newExercisesParams[indiceExercice].interactif = '0' // par défaut
    } else if (entry[0] === 'n') {
      newExercisesParams[indiceExercice].nbQuestions = parseInt(entry[1]) // int
    } else if (entry[0] === 's') {
      newExercisesParams[indiceExercice].sup = entry[1]
    } else if (entry[0] === 's2') {
      newExercisesParams[indiceExercice].sup2 = entry[1]
    } else if (entry[0] === 's3') {
      newExercisesParams[indiceExercice].sup3 = entry[1]
    } else if (entry[0] === 's4') {
      newExercisesParams[indiceExercice].sup4 = entry[1]
    } else if (entry[0] === 's5') {
      newExercisesParams[indiceExercice].sup5 = entry[1]
    } else if (entry[0] === 'alea') {
      newExercisesParams[indiceExercice].alea = entry[1]
    } else if (entry[0] === 'cols') {
      newExercisesParams[indiceExercice].cols = parseInt(entry[1])
    } else if (entry[0] === 'i' && (entry[1] === '0' || entry[1] === '1')) {
      newExercisesParams[indiceExercice].interactif = entry[1]
    } else if (entry[0] === 'cd' && (entry[1] === '0' || entry[1] === '1')) {
      newExercisesParams[indiceExercice].cd = entry[1]
    }
  }
  return newExercisesParams
}

export function generateLatex(
  userSettings: UserSettings,
  itemsWithExercises: itemsWithExercises,
) {
  let output = preambuleLight
  let outputCorr = '\n\n%%%%%%%%%%%%%%%%%%%%'
  outputCorr += '\n%%%  CORRECTION  %%%'
  outputCorr += '\n%%%%%%%%%%%%%%%%%%%%'
  outputCorr += '\n\n\\fancyhead[L]{Correction}'
  for (const document of userSettings.documents) {
    const numberOfVersions = document.number || 1
    for (let i = 0; i < numberOfVersions; i++) {
      const intro = `
  
  %%% ${document.title} %%%
  \\clearpage
  \\fancyhead[R]{${document.title}}
  \\setcounter{numexercice}{0}
  
  `
      output += intro
      outputCorr += intro

      for (const item of document.items) {
        if (itemsWithExercises[item]) {
          for (const exercise of itemsWithExercises[item]) {
            exercise.reinit()
            exercise.nouvelleVersion()
            output += '\n\n\\exercice{}\n' + exercise.contenu
            outputCorr += '\n\n\\exercice{}\n' + exercise.contenuCorrection
          }
        }
      }
    }
  }
  outputCorr += '\n\n\\end{document}'
  return output + outputCorr
}

const preambuleLight = `
\\documentclass[12pt]{article}
\\usepackage[left=1.5cm,right=1.5cm,top=2cm,bottom=2cm]{geometry}
\\usepackage[utf8]{inputenc}        
\\usepackage[T1]{fontenc}
\\usepackage[french]{babel}
\\usepackage{multicol} 
\\usepackage{calc} 
\\usepackage{enumerate}
\\usepackage{enumitem}
\\usepackage{graphicx}
\\usepackage{tabularx}
\\usepackage[autolanguage,np]{numprint}
\\usepackage{hyperref}
\\usepackage{amsmath,amsfonts,amssymb,mathrsfs} 
\\usepackage{cancel}
\\usepackage{textcomp}
\\usepackage{gensymb}
\\usepackage{eurosym}
\\usepackage{fancyhdr,lastpage}          
\\pagestyle{fancy}                      
\\usepackage{fancybox}
\\usepackage{setspace}
\\usepackage{colortbl}
\\usepackage{xcolor}
\\usepackage{qrcode}
\\usepackage{pgf,tikz}

\\setlength{\\parindent}{0mm}
\\renewcommand{\\arraystretch}{1.5}
\\renewcommand{\\labelenumi}{\\textbf{\\theenumi{}.}}
\\renewcommand{\\labelenumii}{\\textbf{\\theenumii{}.}}
\\newcommand{\\version}[1]{\\fancyhead[R]{Version #1}}
\\setlength{\\headheight}{14.5pt}

\\newcounter{numexercice}
\\setcounter{numexercice}{0}
\\newcommand{\\exercice}{
  \\stepcounter{numexercice}
  \\subsection*{Exercice \\thenumexercice}
}

\\fancyhead[C]{Évaluation à la carte}
\\fancyfoot{}
\\fancyhead[R]{}

\\renewcommand{\\headrulewidth}{0.4pt}

\\begin{document}
`
