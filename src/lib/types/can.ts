export type CanState =
  | 'start'
  | 'countdown'
  | 'race'
  | 'end'
  | 'solutions'
  | 'canHomeScreen'
export type CanSolutionsMode = 'gathered' | 'split'
export type CanOptions = {
  durationInMinutes: number
  subTitle: string
  isChoosen: boolean
  solutionsAccess: boolean
  solutionsMode: CanSolutionsMode
  isInteractive: boolean
  remainingTimeInSeconds: number
  questionGetAnswer: boolean[]
  state: CanState
}
