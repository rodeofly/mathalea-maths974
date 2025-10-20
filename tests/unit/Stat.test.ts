// src/lib/mathFonctions/Stat.test.ts
import { describe, expect, test } from 'vitest'
import Stat from '../../src/lib/mathFonctions/Stat'

describe('Stat', () => {
  test('constructor with number array and basic properties', () => {
    const s = new Stat([1, 2, 3, 4])
    expect(s.moyenne()).toBe(2.5)
    expect(s.min()).toBe(1)
    expect(s.max()).toBe(4)
    expect(s.etendue()).toBe(3)
  })

  test('constructor with frequency pairs expands properly', () => {
    const s = new Stat([
      [1, 2],
      [3, 1],
      [5, 4],
    ]) // expands to [1,1,3]
    expect(s.moyenne()).toBeCloseTo(25 / 7)
    expect(s.mediane()).toBe(5)
    expect(s.mode()).toEqual([5])
  })

  test('empty series throws', () => {
    expect(() => new Stat([] as any)).toThrow()
  })

  test('variance, ecartType and coefVariation on known series', () => {
    const s = new Stat([1, 2, 3, 4])
    expect(s.moyenne()).toBeCloseTo(2.5)
    expect(s.variance()).toBeCloseTo(1.25)
    expect(s.ecartType()).toBeCloseTo(Math.sqrt(1.25))
    expect(s.mediane()).toBeCloseTo(2.5)
    expect(s.min()).toBe(1)
    expect(s.max()).toBe(4)
    expect(s.etendue()).toBe(3)
    expect(s.coefVariation()).toBeCloseTo(s.ecartType() / s.moyenne())
  })

  test('mediane for odd-length series', () => {
    const s = new Stat([5, 1, 3])
    expect(s.mediane()).toBe(3)
  })

  test('mode single and multiple modes', () => {
    const single = new Stat([1, 2, 2, 3])
    expect(single.mode()).toEqual([2])

    const multiple = new Stat([1, 1, 2, 2, 3])
    const modes = multiple
      .mode()
      .slice()
      .sort((a, b) => a - b)
    expect(modes).toEqual([1, 2])
  })

  test('static methods match instance methods', () => {
    const tableau = [2, 4, 4, 6]
    const instance = new Stat(tableau)

    expect(Stat.moyenne(tableau)).toBeCloseTo(instance.moyenne())
    expect(Stat.variance(tableau)).toBeCloseTo(instance.variance())
    expect(Stat.ecartType(tableau)).toBeCloseTo(instance.ecartType())
    expect(Stat.mediane(tableau)).toBeCloseTo(instance.mediane())
    // compare modes sorted for determinism
    expect(
      Stat.mode(tableau)
        .slice()
        .sort((a, b) => a - b),
    ).toEqual(
      instance
        .mode()
        .slice()
        .sort((a, b) => a - b),
    )
    expect(Stat.min(tableau)).toBe(instance.min())
    expect(Stat.max(tableau)).toBe(instance.max())
    expect(Stat.etendue(tableau)).toBe(instance.etendue())
    expect(Stat.coefVariation(tableau)).toBeCloseTo(instance.coefVariation())
  })
})
