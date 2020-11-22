// Types
import type { ScoreCardType } from "../app.type";
// Components
import Layout from './Layout.svelte';
// Dependencies
import {mount} from 'cypress-svelte-unit-test';
// Libs
import {baseRange, subRange} from '../lib/ranges';
import {rand} from '../lib/math';

var ranges = Object.keys(baseRange)

const createAnswers = (n: number): ScoreCardType[] => {
  let c = 0;
  let data = [];
  ranges = Object.keys(baseRange).slice(0, rand(0, rand(1, 4)));
  console.log(ranges);
  while (c < n) {
    let key = rand(0, ranges.length - 1);
    let baseAnswer = ranges[key];
    let real = rand(0, 20) < 17;
    let Hz = real ? rand(...baseRange[baseAnswer]) : rand(60, 20000);
    data.push({
      Hz,
      baseAnswer,
      subAnswer: subRange(baseRange[baseAnswer])[rand(0, 4)],
    });
    c++;
  }
  return data;
};

describe("Testing suites", () => {
  it("Does something", () => {
    mount(Layout, {
      props: {
        answers: createAnswers(12),
        ranges
      }
    })
  })
})