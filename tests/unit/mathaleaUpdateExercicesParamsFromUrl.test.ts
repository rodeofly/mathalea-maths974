import { describe, it, expect, vi } from 'vitest'

import { exercicesParams, freezeUrl } from '../../src/lib/stores/generalStore'
import { get } from 'svelte/store'

// Mock avant l'import
vi.mock('../../src/lib/renderScratch', () => ({
  renderScratch: vi.fn(() => 'mocked value'),
}))

vi.mock('../../src/lib/components/version', () => ({
  checkForServerUpdate: vi.fn(() => 'mocked value'),
}))

describe('mathaleaUpdateExercicesParamsFromUrl', () => {
  it('should update exercicesParams from URL', async () => {
    const url =
      'http://localhost?uuid=test-uuid&id=test-id&n=5&d=10&s=test-sup&s2=test-sup2&s3=test-sup3&s4=test-sup4&s5=test-sup5&alea=test-alea&cols=2&i=1&cd=1&v=eleve&z=2'
    const { mathaleaUpdateExercicesParamsFromUrl } = await import(
      '../../src/lib/mathalea'
    )
    const result = mathaleaUpdateExercicesParamsFromUrl(url)
    const expectedParams = [
      {
        uuid: 'test-uuid',
        id: undefined, // id est chargé à partir de l'uuid
        nbQuestions: 5,
        duration: 10,
        sup: 'test-sup',
        sup2: 'test-sup2',
        sup3: 'test-sup3',
        sup4: 'test-sup4',
        sup5: 'test-sup5',
        alea: 'test-alea',
        cols: 2,
        interactif: '1',
        cd: '1',
      },
    ]

    // console.log(result)
    expect(get(exercicesParams)).toEqual(expectedParams)
    expect(get(freezeUrl)).toBe(false)
    expect(result).toMatchObject({
      v: 'eleve',
      z: '2',
      durationGlobal: 0,
      ds: undefined,
      nbVues: 1,
      flow: 0,
      screenBetweenSlides: undefined,
      pauseAfterEachQuestion: undefined,
      isImagesOnSides: false,
      sound: 0,
      shuffle: false,
      manualMode: undefined,
      select: [],
      order: [],
      title: '',
      presMode: 'liste_exos',
      setInteractive: '2',
      isSolutionAccessible: true,
      isInteractiveFree: true,
      oneShot: false,
      twoColumns: false,
      isTitleDisplayed: true,
      recorder: undefined,
      done: undefined,
      beta: false,
      iframe: '',
      answers: '',
    })
  })

  it('should update exercicesParams V2 from URL', async () => {
    const url =
      'https://coopmaths.fr/alea/?uuid=edb61&id=5P13&alea=Wm22&uuid=46234&id=5L12-1&n=6&d=10&s=3&cd=1&alea=iDSe&uuid=b87a5&id=4L10b&n=2&d=10&s=1-2&s2=1&s3=3&s4=1&cd=1&cols=2&alea=G6FS&uuid=71dd8&id=4L10&n=3&d=10&s=3&s2=1&s3=7&s4=false&cd=1&cols=3&alea=4nBh&uuid=&alea=fE6p'
    const { mathaleaUpdateExercicesParamsFromUrl } = await import(
      '../../src/lib/mathalea'
    )
    const result = mathaleaUpdateExercicesParamsFromUrl(url)
    const expectedParams = [
      {
        uuid: 'edb61',
        id: '5P13',
        interactif: '0',
        alea: 'Wm22',
      },
      {
        uuid: '46234',
        id: '5L12-1',
        interactif: '0',
        nbQuestions: 6,
        duration: 10,
        sup: '3',
        cd: '1',
        alea: 'iDSe',
      },
      {
        uuid: 'b87a5',
        id: '4L10b',
        interactif: '0',
        nbQuestions: 2,
        duration: 10,
        sup: '1-2',
        sup2: '1',
        sup3: '3',
        sup4: '1',
        cd: '1',
        cols: 2,
        alea: 'G6FS',
      },
      {
        uuid: '71dd8',
        id: '4L10',
        interactif: '0',
        nbQuestions: 3,
        duration: 10,
        sup: '3',
        sup2: '1',
        sup3: '7',
        sup4: 'false',
        cd: '1',
        cols: 3,
        alea: '4nBh',
      },
    ]

    // console.log(get(exercicesParams))
    expect(get(exercicesParams)).toEqual(expectedParams)
    expect(get(freezeUrl)).toBe(false)
    expect(result).toMatchObject({
      v: '',
      z: '1',
      durationGlobal: 0,
      ds: undefined,
      nbVues: 1,
      flow: 0,
      screenBetweenSlides: undefined,
      pauseAfterEachQuestion: undefined,
      isImagesOnSides: false,
      sound: 0,
      shuffle: false,
      manualMode: undefined,
      select: [],
      order: [],
      title: '',
      presMode: 'liste_exos',
      setInteractive: '2',
      isSolutionAccessible: true,
      isInteractiveFree: true,
      oneShot: false,
      twoColumns: false,
      isTitleDisplayed: true,
      recorder: undefined,
      done: undefined,
      beta: false,
      iframe: '',
      answers: '',
    })
  })
})
