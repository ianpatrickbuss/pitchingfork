export type ScoreCardType = {
  Hz: number;
  baseAnswer: string;
  subAnswer: number[];
  k?: number;
}

// Scaffold for Download Feature;
type Frequency = number;
type Range = string;
type rangeMin = number;
type rangeMax = number;
type baseCorrect = boolean;
type subCorrect = boolean;

export type ScoreCSV = [RangesCSV[],AnswersCSV[]]
export type RangesCSV = [Range,rangeMin,rangeMax];
export type AnswersCSV = [Frequency,Range,rangeMin,rangeMax,baseCorrect,subCorrect];


