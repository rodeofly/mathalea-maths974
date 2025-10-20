/**
 * Classe pour les statistiques descriptives
 * Accepte une série de nombres ou une série de paires [valeur, effectif]
 * Fournit des méthodes pour calculer la moyenne, la variance, l'écart-type, la médiane, le mode, le min, le max, l'étendue et le coefficient de variation
 * Inclut également des méthodes statiques pour effectuer les mêmes calculs sur un tableau de nombres
 * @author Jean-Claude Lhote (aidé par GPT-5 mini)
 */
export default class Stat {
  serie: number[]
  constructor(serie: number[] | [number, number][]) {
    if (serie.length === 0) {
      throw new Error('La série ne peut pas être vide')
    }
    if (typeof serie[0] === 'number') {
      this.serie = serie as number[]
    } else if (
      Array.isArray(serie[0]) &&
      (serie[0] as [number, number]).length === 2
    ) {
      this.serie = []
      for (const [valeur, frequence] of serie as [number, number][]) {
        for (let i = 0; i < frequence; i++) {
          this.serie.push(valeur)
        }
      }
    } else {
      throw new Error('Le format de la série est invalide')
    }
  }

  moyenne(): number {
    return Stat.moyenne(this.serie)
  }

  variance(): number {
    const moyenne = this.moyenne()
    const sommeDesCarres = this.serie.reduce(
      (acc, val) => acc + Math.pow(val - moyenne, 2),
      0,
    )
    return sommeDesCarres / this.serie.length
  }

  ecartType(): number {
    return Math.sqrt(this.variance())
  }

  mediane(): number {
    const sorted = [...this.serie].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2
    } else {
      return sorted[mid]
    }
  }

  mode(): number[] {
    const frequencyMap: { [key: number]: number } = {}
    for (const num of this.serie) {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1
    }
    const maxFrequency = Math.max(...Object.values(frequencyMap))
    return Object.keys(frequencyMap)
      .filter((key) => frequencyMap[Number(key)] === maxFrequency)
      .map(Number)
  }

  min(): number {
    return Math.min(...this.serie)
  }

  max(): number {
    return Math.max(...this.serie)
  }

  etendue(): number {
    return this.max() - this.min()
  }

  coefVariation(): number {
    return this.ecartType() / this.moyenne()
  }

  // Méthodes statiques
  // ex : const moy = Stat.moyenne([1,2,3])
  static moyenne(tableau: number[]): number {
    const somme = tableau.reduce((acc, val) => acc + val, 0)
    return somme / tableau.length
  }

  static variance(tableau: number[]): number {
    const moyenne = Stat.moyenne(tableau)
    const sommeDesCarres = tableau.reduce(
      (acc, val) => acc + Math.pow(val - moyenne, 2),
      0,
    )
    return sommeDesCarres / tableau.length
  }

  static ecartType(tableau: number[]): number {
    return Math.sqrt(Stat.variance(tableau))
  }

  static mediane(tableau: number[]): number {
    const sorted = [...tableau].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2
    } else {
      return sorted[mid]
    }
  }

  static mode(tableau: number[]): number[] {
    const frequencyMap: { [key: number]: number } = {}
    for (const num of tableau) {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1
    }
    const maxFrequency = Math.max(...Object.values(frequencyMap))
    return Object.keys(frequencyMap)
      .filter((key) => frequencyMap[Number(key)] === maxFrequency)
      .map(Number)
  }

  static min(tableau: number[]): number {
    return Math.min(...tableau)
  }

  static max(tableau: number[]): number {
    return Math.max(...tableau)
  }

  static etendue(tableau: number[]): number {
    return Stat.max(tableau) - Stat.min(tableau)
  }

  static coefVariation(tableau: number[]): number {
    return Stat.ecartType(tableau) / Stat.moyenne(tableau)
  }
}
