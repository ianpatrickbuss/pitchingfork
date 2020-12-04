import type { AnswerType } from '../app.type';
import { baseRange } from './ranges';
import { between } from './math'

export const baseRangeData = (answers: AnswerType[]): [number[],string[]] => {

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
  let ratio: string[] = []
  for (let [key, value] of Object.entries(calc)) {
    let len = value.length;
    if (value.length > 0) {
      let numCorrect = value.reduce((acc, curr) => acc + curr);
      let d = Math.round((numCorrect / len) * 100);
      ratio.push(`${numCorrect}/${len}`)
      data.push(d);
    } else {
      ratio.push(`0/${len}`)
      data.push(0);
    }
  }
  return [data, ratio];
}

export const subRangeData = (answers: AnswerType[]): [number[],string[]] => {
  let calc: {
    [key: string]: number[];
  } = {};

  let data: number[] = [];

  answers = answers.filter(({subAnswer}) => subAnswer[0]);
  for (let [key] of Object.entries(baseRange)) {
    calc[key] = [];
  }

  for (let a = 0; a < answers.length; a++) {
    let {Hz, baseAnswer, subAnswer} = answers[a];
    let val = between(Hz,subAnswer) ? 1 : 0;
    calc[baseAnswer].push(val)
  }
  let ratio: string[] = [];
  for (let [key, value] of Object.entries(calc)) {
    let len = value.length;
    if (value.length > 0) {
      let numCorrect = value.reduce((acc, curr) => acc + curr);
      let d = Math.round((numCorrect / len) * 100);
      ratio.push(`${numCorrect}/${len}`)
      data.push(d);
    } else {
      ratio.push(`0/${len}`)
      data.push(0);
    }

  }
  return [data,ratio];
}