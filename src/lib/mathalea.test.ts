import Decimal from 'decimal.js'
import { describe, expect, it, vi } from 'vitest'
import ExerciceSimple from '../../src/exercices/ExerciceSimple'
import FractionEtendue from '../modules/FractionEtendue'
import Grandeur from '../modules/Grandeur'
import Hms from '../modules/Hms'
import { getDistracteurs } from './mathalea'

// Mock avant l'import
vi.mock('../../src/lib/renderScratch', () => ({
  renderScratch: vi.fn(() => 'mocked value'),
}))

vi.mock('../../src/lib/components/version', () => ({
  checkForServerUpdate: vi.fn(() => 'mocked value'),
}))

describe('getDistracteurs', () => {
  it('retourne 3 distracteurs différents de la réponse (cas simple)', () => {
    const exo = new ExerciceSimple()
    exo.distracteurs = [1, 2, 3, 4, 5]
    exo.reponse = 2
    const distracteurs = getDistracteurs(exo)
    expect(distracteurs).toHaveLength(3)
    expect(distracteurs).not.toContain(2)
    distracteurs.forEach((d) => expect([1, 3, 4, 5]).toContain(d))
  })

  it('retourne tous les distracteurs si pas de réponse', () => {
    const exo = new ExerciceSimple()
    exo.distracteurs = ['a', 'b', 'c']
    exo.reponse = undefined
    const distracteurs = getDistracteurs(exo)
    expect(distracteurs.length).toEqual(3)
    distracteurs.forEach((d) => expect(['a', 'b', 'c']).toContain(d))
  })

  it('retourne les distracteurs qui ne sont pas dans un tableau de strings', () => {
    const exo = new ExerciceSimple()
    exo.distracteurs = ['a', 'b', 'c', 'd']
    exo.reponse = ['b', 'c']
    const distracteurs = getDistracteurs(exo)
    expect(distracteurs).not.toContain('b')
    expect(distracteurs).not.toContain('c')
    distracteurs.forEach((d) => expect(['a', 'd']).toContain(d))
  })

  it('retourne les distracteurs qui ne sont pas dans un tableau de nombres', () => {
    const exo = new ExerciceSimple()
    exo.distracteurs = [1, 2, 3, 4]
    exo.reponse = [2, 3]
    const distracteurs = getDistracteurs(exo)
    expect(distracteurs).not.toContain(2)
    expect(distracteurs).not.toContain(3)
    distracteurs.forEach((d) => expect([1, 4]).toContain(d))
  })

  it('retourne les distracteurs qui ne sont pas dans un tableau de FractionEtendues', () => {
    const fraction1 = new FractionEtendue(1, 2)
    const fraction2 = new FractionEtendue(2, 3)
    const fraction3 = new FractionEtendue(3, 4)
    const fraction4 = new FractionEtendue(4, 5)
    const exo = new ExerciceSimple()
    exo.distracteurs = [
      fraction1.texFraction,
      fraction2.texFraction,
      fraction3.texFraction,
      fraction4.texFraction,
    ]
    exo.reponse = [fraction1, fraction2]
    const distracteurs = getDistracteurs(exo)
    expect(distracteurs).not.toContain(fraction1.texFraction)
    expect(distracteurs).not.toContain(fraction2.texFraction)
    distracteurs.forEach((d) =>
      expect([fraction3.texFraction, fraction4.texFraction]).toContain(d),
    )
  })

  it('retourne les distracteurs qui ne sont pas dans un tableau de Decimal sous forme de nombre', () => {
    const decimal1 = new Decimal(1).div(10)
    const decimal2 = new Decimal(2).div(10)
    const decimal3 = new Decimal(3).div(10)
    const decimal4 = new Decimal(4).div(10)
    const exo = new ExerciceSimple()
    exo.distracteurs = [
      decimal1.toNumber(),
      decimal2.toNumber(),
      decimal3.toNumber(),
      decimal4.toNumber(),
    ]
    exo.reponse = [decimal2.toNumber(), decimal3.toNumber()]
    const distracteurs = getDistracteurs(exo)
    expect(distracteurs).not.toContain(decimal2.toNumber())
    expect(distracteurs).not.toContain(decimal3.toNumber())
    distracteurs.forEach((d) =>
      expect([decimal1.toNumber(), decimal4.toNumber()]).toContain(d),
    )
  })

  it('retourne les distracteurs qui ne sont pas dans un tableau de Decimal sous forme de string', () => {
    const decimal1 = new Decimal(1).div(10)
    const decimal2 = new Decimal(2).div(10)
    const decimal3 = new Decimal(3).div(10)
    const decimal4 = new Decimal(4).div(10)
    const exo = new ExerciceSimple()
    exo.distracteurs = [
      decimal1.toString(),
      decimal2.toString(),
      decimal3.toString(),
      decimal4.toString(),
    ]
    exo.reponse = [decimal2.toString(), decimal3.toString()]
    const distracteurs = getDistracteurs(exo)
    expect(distracteurs).not.toContain(decimal2.toString())
    expect(distracteurs).not.toContain(decimal3.toString())
    distracteurs.forEach((d) =>
      expect([decimal1.toString(), decimal4.toString()]).toContain(d),
    )
  })

  it('retourne les distracteurs qui ne sont pas dans un tableau de Grandeurs', () => {
    const grandeur1 = new Grandeur(1, 'm')
    const grandeur2 = new Grandeur(2, 'm')
    const grandeur3 = new Grandeur(3, 'm')
    const grandeur4 = new Grandeur(4, 'm')
    const exo = new ExerciceSimple()
    exo.distracteurs = [
      grandeur1.toTex(),
      grandeur2.toTex(),
      grandeur3.toTex(),
      grandeur4.toTex(),
    ]
    exo.reponse = [grandeur2, grandeur3]
    const distracteurs = getDistracteurs(exo)
    expect(distracteurs).not.toContain(grandeur2.toTex())
    expect(distracteurs).not.toContain(grandeur3.toTex())
    distracteurs.forEach((d) =>
      expect([grandeur1.toTex(), grandeur4.toTex()]).toContain(d),
    )
  })

  it('retourne les distracteurs qui ne sont pas dans un tableau de Hms', () => {
    const hms1 = new Hms({ hour: 1, minute: 30, second: 45 })
    const hms2 = new Hms({ hour: 2, minute: 15, second: 30 })
    const hms3 = new Hms({ hour: 3, minute: 45, second: 15 })
    const hms4 = new Hms({ hour: 4, minute: 0, second: 0 })
    const exo = new ExerciceSimple()
    exo.distracteurs = [
      hms1.toString(),
      hms2.toString(),
      hms3.toString(),
      hms4.toString(),
    ]
    exo.reponse = [hms2, hms3]
    const distracteurs = getDistracteurs(exo)
    expect(distracteurs).not.toContain(hms2.toString())
    expect(distracteurs).not.toContain(hms3.toString())
    distracteurs.forEach((d) =>
      expect([hms1.toString(), hms4.toString()]).toContain(d),
    )
  })
})
