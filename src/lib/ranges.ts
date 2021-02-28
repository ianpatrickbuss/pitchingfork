import type { AnswerType, ScoreCardResults } from '../app.type';
import {between, rand} from './math';
export const baseRange: {[key: string]: [number,number]} = {
  Bass: [60, 249],
  "Low Midrange": [250, 499],
  Midrange: [500, 1999],
  "Upper Midrange": [2000, 3999],
  Presence: [4000, 5999],
  Brilliance: [6000, 20000],
};

export const subRange = (range: [number,number]): number[][] => {
  let diff = Math.round((range[1]-range[0])/5);
  return Array(5).fill(0).map((n,i) => {
    return [range[0]+diff *i,range[0] + diff * (i+1)-1]
  })
}

export const baseCorrect = (Hz: number, baseAnswer: string): boolean => {
  return between(Hz, baseRange[baseAnswer]);
}

export const rangeKeys = Object.keys(baseRange);

export const subCorrect = (Hz: number, subAnswer: number[]): boolean => {
  if(!subAnswer[0]){
    throw new Error('Sub answer does not contain a set of numbers to compare against');
  }
  return between(Hz,subAnswer);
}

export const checkAnswers = (answers: AnswerType[]): ScoreCardResults => {
  let subAttempted = 0;
  let correct: AnswerType[] = [];
  let partial: AnswerType[] = [];
  let incorrect: AnswerType[] = [];
  for (let a = 0; a < answers.length; a++) {
    let answer = answers[a];
    answer.k = a;
    let { Hz, baseAnswer, subAnswer } = answer;
    let isBaseCorrect = baseCorrect(Hz, baseAnswer);
    if (!subAnswer[0]) {
      if (isBaseCorrect) {
        correct.push(answer);
      } else {
        incorrect.push(answer);
      }
    } else {
      subAttempted++;
      let isSubCorrect: boolean = subCorrect(Hz, subAnswer);
      if (isBaseCorrect && isSubCorrect) {
        correct.push(answer);
      } else if (isBaseCorrect && !isSubCorrect) {
        partial.push(answer);
      } else if (!isBaseCorrect && !isSubCorrect) {
        incorrect.push(answer);
      }
    }
  }
  return {
    correct,
    incorrect,
    partial,
    subAttempted
  }
}


export const createAnswers = (n: number, ranges: string[], attemptSubRange: boolean = true): AnswerType[] => {
  let c = 0;
  let data = [];
  while (c < n) {
    let key = rand(0, ranges.length - 1);
    let baseAnswer = ranges[key];
    let real = rand(0, 20) < 17;
    let Hz = real ? rand(...baseRange[baseAnswer]) : rand(60, 20000);
    data.push({
      Hz,
      baseAnswer,
      subAnswer: attemptSubRange ? subRange(baseRange[baseAnswer])[rand(0, 4)] : [],
    });
    c++;
  }
  return data;
};