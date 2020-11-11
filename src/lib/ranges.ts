import {between} from './math';
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

export const subCorrect = (Hz: number, subAnswer: number[]): boolean => {
  if(!subAnswer[0]){
    throw new Error('Sub answer does not contain a set of numbers to compare against');
  }
  return between(Hz,subAnswer);
}