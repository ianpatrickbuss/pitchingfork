import type { AnswersCSV, ScoreCardType } from "../app.type";
import {baseRange, baseCorrect, subCorrect} from './ranges';

export const csvParser = (answers: ScoreCardType[]): string => {
  // Ranges
  let rangeHeader = ['Range','Range Start','Range End']
  let ranges = []
  for(const [key,val] of Object.entries(baseRange)){
    ranges.push([key,val[0],val[1]]);
  }
  // Answers
  let resultsHeader = ['Frequency (Hz)', 'Your Base Range Answer','Your Sub Range Answer','Base Correct','Sub Correct']
  let results = [];
  for(let a = 0; a<answers.length; a++) {
    let {Hz, baseAnswer, subAnswer} = answers[a];
    let isSubCorrect: boolean | string;
    if(!subAnswer[0]) {
      isSubCorrect = 'N/A'
    } else {
      isSubCorrect = subCorrect(Hz,subAnswer);
    }
    let row: AnswersCSV = [Hz,baseAnswer,subAnswer[0] ? subAnswer.join('-') : 'N/A', baseCorrect(Hz, baseAnswer),isSubCorrect];
    results.push(row);
  }
  
  // Parsing
  let csvContent = 'data:text/csv;charset=utf-8,'
  let rangeHeaderRow = rangeHeader.join(',') + "\r\n";
  let rangeRows = ranges.map(r => r.join(',')).join("\n")
  let headerRow = resultsHeader.join(',') + "\r\n";
  let resultsRows = results.map(r => r.join(',')).join("\n");
  csvContent += rangeHeaderRow + rangeRows + "\r\n\n" + headerRow + resultsRows;

  return csvContent;
}