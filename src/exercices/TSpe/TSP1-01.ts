import { miseEnEvidence } from '../../lib/outils/embellissements'
import { texNombre } from '../../lib/outils/texNombre'
import { randint } from '../../modules/outils'
import ExerciceQcm from '../ExerciceQcm'
/*
 @author Stéphane Guyon
*/
export const uuid = 'ed6a5'
export const refs = {
  'fr-fr': ['TSP1-01'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'QCM : Calculer une probabilité avec la loi binomiale'
export const dateDePublication = '15/03/2025'
/**
 * Ceci est un exo construit à partir d'une question de qcm de Bac.
 * Il utilise la classe ExerciceQcm qui définit les contours de l'exo (sans version aléatoire)
 * Ce moule à exo dispose d'une méthode qcmCamExport qui permet de récupérer le JSON de la question et de la reponse pour qcmCam.
 * Il est interactif et dispose d'un export AMC d'office
 */

export default class Binomiale extends ExerciceQcm {
  versionOriginale: () => void = () => {
    const n = randint(5, 20)
    const m = randint(n + 1, n + 20)
    const p = randint(10, 30) / 100
    const k = randint(2, n)
    this.reponses = [
      `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${n}}{${k}} \\times ${texNombre(p)}^{${k}} \\times ${texNombre(1 - p)}^{${n - k}}$`,
      `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${k}}{${n}} \\times ${texNombre(p)}^{${k}} \\times ${texNombre(1 - p)}^{${n - k}}$`,
      `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${m}}{${k}} \\times ${texNombre(p)}^{${n}} \\times ${texNombre(1 - p)}^{${n - k}}$`,
      `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${n}}{${k}} \\times ${texNombre(p)}^{${m}} \\times ${texNombre(1 - p)}^{${m - k}}$`,
      `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${m}}{${k}} \\times ${texNombre(p)}^{${m}} \\times ${texNombre(1 - p)}^{${m - k}}$`,
    ]
    let texte = `Nourou adore jouer aux fléchettes.<br> Il dispose de $${texNombre(m)}$ fléchettes et en lance successivement $${texNombre(n)}$ sur sa cible.<br>`
    texte += `D'après ses calculs et ses observations, la probabilité qu'une fléchette atteigne le centre de la cible est de $${texNombre(p)}$.<br>`
    texte +=
      "On estime que les lancers sont effectués dans des conditions identiques et qu'ils sont indépendants les uns des autres.<br>"
    texte += `Déterminer la probabilité qu'il place exactement $${texNombre(k)}$ fléchettes au centre de la cible.`
    this.enonce = texte

    let correction =
      'On note $X$ la variable aléatoire qui compte le nombre de fléchettes qui atteignent la cible.<br>'
    correction += `On sait que les lancers sont identiques et indépendants les uns
    des autres.<br>`
    correction += `On peut donc affirmer que $X$ suit une loi binomiale : $X \\sim \\mathcal B(${n};${texNombre(p)})$.<br>`

    correction +=
      "La probabilité qu'il place exactement $k$ fléchettes dans la cible est donnée par la relation :<br>"
    correction +=
      '$P(X=k)=\\displaystyle\\binom{n}{k} \\times p^k \\times (1-p)^{n-k}$<br>'
    correction += `Le nombre d'épreuves est donné par $n=${texNombre(n)} $ , la nombre de succès est $k=${texNombre(k)} $, la probabilité de succès est $p=${texNombre(p)} $.<br>`
    correction += `En appliquant à l'énoncé : <br>$P\\left(X=${k}\\right)=\\displaystyle\\binom{${n}}{${k}} \\times ${texNombre(p)}^{${texNombre(k)}} \\times (1-${texNombre(p)})^{${texNombre(n)}-${texNombre(k)}}$`
    correction += `<br>Il vient: <br>$P\\left(X=${k}\\right)=${miseEnEvidence(`\\displaystyle\\binom{${n}}{${k}} \\times ${texNombre(p)}^{${k}} \\times ${texNombre(1 - p)}^{${n - k}}`)}$`
    this.correction = correction
    this.enonce = texte
  }

  constructor() {
    super()
    this.options = { vertical: true, ordered: false }
    this.versionOriginale()
  }
}
