import { writable } from 'svelte/store'
import type { CanOptions } from '../types/can'
export const canOptions = writable<CanOptions>({
  durationInMinutes: 4,
  subTitle: new Date().getFullYear().toString(),
  isChoosen: false,
  solutionsAccess: false,
  solutionsMode: 'gathered',
  isInteractive: false,
  remainingTimeInSeconds: 0,
  questionGetAnswer: [],
  state: 'start',
})
