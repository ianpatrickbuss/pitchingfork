import type { ScoreCardType } from '../app.type';
import {baseRange } from './ranges';
import {between} from './math'

export const baseRangeData = (answers: ScoreCardType[]): number[] => {

  let calc: {
    [key: string]: number[];
  } = {};

  let data: number[] = [];


  for (let [key] of Object.entries(baseRange)) {
    calc[key] = [];
  }
  for (let a = 0; a < answers.length; a++) {
    let {Hz, baseAnswer} = answers[a];
    let val = between(Hz, baseRange[baseAnswer]) ? 1 : 0;
    calc[baseAnswer].push(val);
  }
  for (let [key, value] of Object.entries(calc)) {
    let len = value.length;
    if (value.length > 0) {
      let d = Math.round(
        (value.reduce((acc, curr) => acc + curr) / len) * 100
      );
      data.push(d);
    } else {
      data.push(0);
    }
  }
  return data;
}

export const subRangeData = (answers: ScoreCardType[]): number[] => {
  let calc: {
    [key: string]: number[];
  } = {};

  let data: number[] = [];


  for (let [key] of Object.entries(baseRange)) {
    calc[key] = [];
  }

  for (let a = 0; a < answers.length; a++) {

    let {Hz, baseAnswer, subAnswer} = answers[a];
    let val = between(Hz,[...subAnswer]) ? 1 : 0;
    calc[baseAnswer].push(val)
  } 
  for (let [key, value] of Object.entries(calc)) {
    let len = value.length;
    if (value.length > 0) {
      let d = Math.round(
        (value.reduce((acc, curr) => acc + curr) / len) * 100
      );
      data.push(d);
    } else {
      data.push(0);
    }
  }
  return data;
}