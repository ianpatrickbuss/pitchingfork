export type ScoreCardType = {
  Hz: number;
  baseAnswer: string;
  subAnswer: number[];
  k?: number;
}

export type ScoreCardResults = {
  correct: ScoreCardType[];
  incorrect: ScoreCardType[];
  partial: ScoreCardType[];
  subAttempted: number;
}

export type QuestionType = number[]

// Scaffold for Download Feature;
type Frequency = number;
type Range = string;
type rangeMin = number;
type rangeMax = number;
type baseCorrect = boolean;
type subCorrect = boolean | string;
type subAnswer = number[] | string;

export type ScoreCSV = [RangesCSV[],AnswersCSV[]]
export type RangesCSV = [Range,rangeMin,rangeMax];
export type AnswersCSV = [Frequency,Range,subAnswer, baseCorrect,subCorrect];