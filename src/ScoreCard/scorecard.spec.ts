// Types
import type { ScoreCardResults, ScoreCardType } from "../app.type";
// Components
import Layout from './Layout.svelte';
// Dependencies
import {mount} from 'cypress-svelte-unit-test';
// Libs
import {baseRange, subRange, rangeKeys, checkAnswers} from '../lib/ranges';
import {rand, percentage} from '../lib/math';


const createAnswers = (n: number, ranges: string[], attemptSubRange: boolean = true): ScoreCardType[] => {
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


// Element Placement
describe("ScoreCard: Element Visibility, Responsiveness", () => {
  let ranges = rangeKeys;
  var answers = createAnswers(12, ranges);
  it("There should be a graph on the page", () => {
    mount(Layout, {
      props: {
        answers,
        ranges
      }
    })
    cy.get('canvas').should('exist');
  })

  it("On a mobile device the user can toggle the results to expand/contract.  This feature is not available on a larger device", () => {
    cy.get('#scorecard-results').children('div').each(($div) => {
      cy.viewport('iphone-7');
      cy.wrap($div).as('setOfAnswers');
      cy.get('@setOfAnswers').children('h3').should('not.have','+');
      cy.get('@setOfAnswers').children('h3').click();
      cy.get('@setOfAnswers').children('fieldset').should('not.exist');
      cy.get('@setOfAnswers').children('h3').contains('+');
      cy.viewport(1280,720);
      cy.get('@setOfAnswers').children('h3').should('not.have','+');
      cy.get('@setOfAnswers').children('fieldset').should('exist');
      cy.get('@setOfAnswers').children('h3').click();
      cy.get('@setOfAnswers').children('fieldset').should('exist');
    })
  })

  it("When the user presses the reset button it should pop up a modal that allows for the user to select which ranges they want to be tested on", () => {
    cy.get("#scorecard-results-footer").children('button.reset').as('resetButton')
    cy.get("@resetButton").should('exist');
    cy.get("@resetButton").click();
    cy.get('#modalBox').should('exist');
    cy.get('#landing-soundcheck').should('not.exist');
    cy.get('#modalBox-close').should('exist');
    cy.get('#modalBox-close').click();
    cy.get('#modalBox').should('not.exist');
  })

  it(`The "Footer" that contains the download/reset button should appear once on large screens at the bottom and twice on mobile devices.  Where the bar on the top has reset and download and the bar on the bottom just has reset`, () => {
    cy.viewport('iphone-7');
    cy.get("#scorecard-results-footer").children('button.reset').as('resetButton')
    cy.get('footer#scorecard-results-footer').should('have.length',2)
    cy.get('footer#scorecard-results-footer').eq(0).as('firstFooter')
    cy.get('@firstFooter').children('button.reset').should('exist')
    cy.get('@firstFooter').children('button.download').should('exist')
    cy.get('footer#scorecard-results-footer').eq(1).as('secondFooter')
    cy.get('@secondFooter').children('button.reset').should('exist')
    cy.get('@secondFooter').children('button.download').should('not.exist')
    cy.viewport(1280,720);
    cy.get('footer#scorecard-results-footer').should('have.length',1)
  })
})

describe("ScoreCard: All Ranges", () => {
  let ranges = rangeKeys;
  var answers = createAnswers(12, ranges);
  var {correct,incorrect,partial,subAttempted}: ScoreCardResults = checkAnswers(answers);

  // HEADER 
  it("Check that header data is correct", () => {
    mount(Layout, {
      props: {
        answers,
        ranges
      }
    })
    let correctPercentage = percentage(correct.length/answers.length)
    cy.get("#scorecard-header-total span").eq(0).contains('Total');
    cy.get("#scorecard-header-total").contains(correctPercentage);
    cy.get("#scorecard-header-total span").eq(1).contains(`${correct.length}/${answers.length}`);
  })

  it("If the user attempted to provide sub ranges it should provide the results.  Otherwise that column should not exist", () => {
    if(subAttempted > 0) {
      let bonusPercentage = percentage(partial.length/subAttempted)
      cy.get("#scorecard-header-bonus span").eq(0).contains('Bonus');
      cy.get("#scorecard-header-bonus").contains(bonusPercentage);
      cy.get("#scorecard-header-bonus span").eq(1).contains(`${partial.length}/${subAttempted}`);
    } else {
      cy.get('#scorecard-header').contains('div').should('not.exist')
      cy.get("#scorecard-header-bonus").should('not.exist');
    }
  })

  // Results: Correct
  it("It should show the correct amount of correct answers and not display if there are no answers to show.  The correct answer should contain the frequency and which question it was.  There should not be a button to play a sound.", () => {
    if(correct.length>0) {
      cy.get("#scorecard-correct-answers").should('exist');
      cy.get('#scorecard-correct-answers').children('fieldset').as('answers');
      cy.get('@answers').should('have.length',correct.length)
      cy.get('@answers').each(($answer, idx) => {
        cy.wrap($answer).as('answer');
        cy.get('@answer').contains('legend', `Frequency #${correct[idx].k+1} - ${correct[idx].Hz}`);
        cy.get('@answer').children('div').should('not.exist');
      })
    } else {
      cy.get("#scorecard-correct-answers").should('not.exist');
    }
  })


  // Results: Partial
  it("It should show the correct amount of (partial) answers and not display if there are no answers to show.  The (partial) answer should contain the frequency and which question it was.  There should be a button to play a sound and it should play", () => {
    if(partial.length>0) {
      cy.get("#scorecard-partial-answers").should('exist');
      cy.get('#scorecard-partial-answers').children('fieldset').as('answers');
      cy.get('@answers').should('have.length',partial.length)
      cy.get('@answers').each(($answer, idx) => {
        cy.wrap($answer).as('answer');
        cy.get('@answer').contains('legend', `Frequency #${partial[idx].k+1} - ${partial[idx].Hz}`);
        cy.get('@answer').children('div').should('exist');
        cy.get('@answer').children('div').contains('button','Play Sound').as('sound');
        cy.get('@sound').click();
        cy.wait(200);
        cy.get('@sound').click()
      })
    } else {
      cy.get("#scorecard-partial-answers").should('not.exist');
    }
  })

  // Results: Incorrect
  it("It should show the correct amount of (incorrect) answers and not display if there are no answers to show.  The (incorrect) answer should contain the frequency and which question it was.  There should be a button to play a sound and it should play", () => {
    if(incorrect.length>0) {
      cy.get("#scorecard-incorrect-answers").should('exist');
      cy.get('#scorecard-incorrect-answers').children('fieldset').as('answers');
      cy.get('@answers').should('have.length',incorrect.length)
      cy.get('@answers').each(($answer, idx) => {
        cy.wrap($answer).as('answer');
        cy.get('@answer').contains('legend', `Frequency #${incorrect[idx].k+1} - ${incorrect[idx].Hz}`);
        cy.get('@answer').children('div').should('exist');
        cy.get('@answer').children('div').contains('button','Play Sound').as('sound');
        cy.get('@sound').click();
        cy.wait(200);
        cy.get('@sound').click()
      })
    } else {
      cy.get("#scorecard-incorrect-answers").should('not.exist');
    }
  })
})

describe("ScoreCard: Some Ranges", () => {
  let ranges = rangeKeys.slice(0,rand(1,rangeKeys.length-1))
  var answers = createAnswers(12, ranges);
  var {correct,incorrect,partial,subAttempted}: ScoreCardResults = checkAnswers(answers);

  // HEADER 
  it("Check that header data is correct", () => {
    mount(Layout, {
      props: {
        answers,
        ranges
      }
    })
    let correctPercentage = percentage(correct.length/answers.length)
    cy.get("#scorecard-header-total span").eq(0).contains('Correct');
    cy.get("#scorecard-header-total").contains(correctPercentage);
    cy.get("#scorecard-header-incorrect span").eq(0).contains('Incorrect');
    cy.get("#scorecard-header-incorrect").contains(percentage([...partial,...incorrect].length/answers.length));
    cy.get("#scorecard-header-incorrect span").eq(1).contains(`${[...partial,...incorrect].length}/${answers.length}`);
  })

  it("If the user attempted to provide sub ranges it should provide the results.  Otherwise that column should not exist", () => {
    if(subAttempted > 0) {
      let bonusPercentage = percentage([...partial,...incorrect].length/subAttempted)
      cy.get("#scorecard-header-incorrect span").eq(0).contains('Incorrect');
      cy.get("#scorecard-header-incorrect").contains(bonusPercentage);
      cy.get("#scorecard-header-incorrect span").eq(1).contains(`${[...partial,...incorrect].length}/${subAttempted}`);
    } else {
      cy.get('#scorecard-header').contains('div').should('not.exist')
      cy.get("#scorecard-header-incorrect").should('not.exist');
    }
  })

  // Results: Correct
  it("It should show the correct amount of correct answers and not display if there are no answers to show.  The correct answer should contain the frequency and which question it was.  There should not be a button to play a sound.", () => {
    if(correct.length>0) {
      cy.get("#scorecard-correct-answers").should('exist');
      cy.get("#scorecard-correct-answers").children('h3').as('setTitle');
      cy.get('@setTitle').contains('Correct');
      cy.get('@setTitle').children('span').contains(`${percentage(correct.length/answers.length)} - ${[correct.length,'/',answers.length].join('')}`);
      cy.get('#scorecard-correct-answers').children('fieldset').as('answers');
      cy.get('@answers').should('have.length',correct.length)
      cy.get('@answers').each(($answer, idx) => {
        cy.wrap($answer).as('answer');
        cy.get('@answer').contains('legend', `Frequency #${correct[idx].k+1} - ${correct[idx].Hz}`);
        cy.get('@answer').children('div').should('not.exist');
      })
    } else {
      cy.get("#scorecard-correct-answers").should('not.exist');
    }
  })

  // Results: Partial
  it("It should show the correct amount of (partial) answers and not display if there are no answers to show.  The (partial) answer should contain the frequency and which question it was.  There should be a button to play a sound and it should play", () => {
    let selectedRangeIncorrectAnswers = [...partial,...incorrect];
    if(selectedRangeIncorrectAnswers.length>0) {
      cy.get("#scorecard-incorrect-answers").should('exist');
      cy.get('#scorecard-incorrect-answers').children('fieldset').as('answers');
      cy.get('@answers').should('have.length',selectedRangeIncorrectAnswers.length)
      cy.get('@answers').each(($answer, idx) => {
        cy.wrap($answer).as('answer');
        cy.get('@answer').contains('legend', `Frequency #${selectedRangeIncorrectAnswers[idx].k+1} - ${selectedRangeIncorrectAnswers[idx].Hz}`);
        cy.get('@answer').children('div').should('exist');
        cy.get('@answer').children('div').contains('button','Play Sound').as('sound');
        cy.get('@sound').click();
        cy.wait(200);
        cy.get('@sound').click()
      })
    } else {
      cy.get("#scorecard-incorrect-answers").should('not.exist');
    }
  })
})

describe("ScoreCard: One Range", () => {
  let selectedKey = rand(0,rangeKeys.length-1)
  let ranges = rangeKeys.slice(selectedKey,selectedKey+1);
  var answers = createAnswers(12, ranges);
  var {correct,incorrect,partial,subAttempted}: ScoreCardResults = checkAnswers(answers);

  it("Check the header contains the correct text and percentage values", () => {
    mount(Layout, {
      props: {
        answers,
        ranges
      }
    });
    let correctPercentage = percentage(correct.length/answers.length)
    cy.get("#scorecard-header-total span").eq(0).contains('Correct');
    cy.get("#scorecard-header-total").contains(correctPercentage);
    cy.get("#scorecard-header-incorrect span").eq(0).contains('Incorrect');
    cy.get("#scorecard-header-incorrect").contains(percentage([...partial,...incorrect].length/answers.length));
    cy.get("#scorecard-header-incorrect span").eq(1).contains(`${[...partial,...incorrect].length}/${answers.length}`);
  })

  it("If the user attempted to provide sub ranges it should provide the results.  Otherwise that column should not exist", () => {
    if(subAttempted > 0) {
      let bonusPercentage = percentage([...partial,...incorrect].length/subAttempted)
      cy.get("#scorecard-header-incorrect span").eq(0).contains('Incorrect');
      cy.get("#scorecard-header-incorrect").contains(bonusPercentage);
      cy.get("#scorecard-header-incorrect span").eq(1).contains(`${[...partial,...incorrect].length}/${subAttempted}`);
    } else {
      cy.get('#scorecard-header').contains('div').should('not.exist')
      cy.get("#scorecard-header-incorrect").should('not.exist');
    }
  })

  // Results: Correct
  it("It should show the correct amount of correct answers and not display if there are no answers to show.  The correct answer should contain the frequency and which question it was.  There should not be a button to play a sound.", () => {
    if(correct.length>0) {
      cy.get("#scorecard-correct-answers").should('exist');
      cy.get("#scorecard-correct-answers").children('h3').as('setTitle');
      cy.get('@setTitle').contains('Correct');
      cy.get('@setTitle').children('span').contains(`${percentage(correct.length/answers.length)} - ${[correct.length,'/',answers.length].join('')}`);
      cy.get('#scorecard-correct-answers').children('fieldset').as('answers');
      cy.get('@answers').should('have.length',correct.length)
      cy.get('@answers').each(($answer, idx) => {
        cy.wrap($answer).as('answer');
        cy.get('@answer').contains('legend', `Frequency #${correct[idx].k+1} - ${correct[idx].Hz}`);
        cy.get('@answer').children('div').should('not.exist');
      })
    } else {
      cy.get("#scorecard-correct-answers").should('not.exist');
    }
  })

  // Results: Partial
  it("It should show the correct amount of (partial) answers and not display if there are no answers to show.  The (partial) answer should contain the frequency and which question it was.  There should be a button to play a sound and it should play", () => {
    let selectedRangeIncorrectAnswers = [...partial,...incorrect];
    if(selectedRangeIncorrectAnswers.length>0) {
      cy.get("#scorecard-incorrect-answers").should('exist');
      cy.get('#scorecard-incorrect-answers').children('fieldset').as('answers');
      cy.get('@answers').should('have.length',selectedRangeIncorrectAnswers.length)
      cy.get('@answers').each(($answer, idx) => {
        cy.wrap($answer).as('answer');
        cy.get('@answer').contains('legend', `Frequency #${selectedRangeIncorrectAnswers[idx].k+1} - ${selectedRangeIncorrectAnswers[idx].Hz}`);
        cy.get('@answer').children('div').should('exist');
        cy.get('@answer').children('div').contains('button','Play Sound').as('sound');
        cy.get('@sound').click();
        cy.wait(200);
        cy.get('@sound').click()
      })
    } else {
      cy.get("#scorecard-incorrect-answers").should('not.exist');
    }
  })
})

describe("ScoreCard: One Range, no sub range attempts", () => {
  let selectedKey = rand(0,rangeKeys.length-1)
  let ranges = rangeKeys.slice(selectedKey,selectedKey+1);
  var answers = createAnswers(12, ranges, false);
  var {correct,incorrect,partial,subAttempted}: ScoreCardResults = checkAnswers(answers);

  it("Check the header contains the correct text and percentage values", () => {
    mount(Layout, {
      props: {
        answers,
        ranges
      }
    });
    let correctPercentage = percentage(correct.length/answers.length)
    cy.get("#scorecard-header-total span").eq(0).contains('Correct');
    cy.get("#scorecard-header-total").contains(correctPercentage);
    cy.get("#scorecard-header-incorrect span").eq(0).contains('Incorrect');
    cy.get("#scorecard-header-incorrect").contains(percentage([...partial,...incorrect].length/answers.length));
    cy.get("#scorecard-header-incorrect span").eq(1).contains(`${[...partial,...incorrect].length}/${answers.length}`);
  })

  it("If the user attempted to provide sub ranges it should provide the results.  Otherwise that column should not exist", () => {
    if(subAttempted > 0) {
      let bonusPercentage = percentage([...partial,...incorrect].length/subAttempted)
      cy.get("#scorecard-incorrect-answers").children('h3').as('setTitle');
      cy.get('@setTitle').contains('Incorrect');
      cy.get('@setTitle').children('span').contains(`${percentage([...partial,...incorrect].length/answers.length)} - ${[[...partial,...incorrect].length,'/',answers.length].join('')}`);
      cy.get("#scorecard-header-incorrect span").eq(0).contains('Incorrect');
      cy.get("#scorecard-header-incorrect").contains(bonusPercentage);
      cy.get("#scorecard-header-incorrect span").eq(1).contains(`${[...partial,...incorrect].length}/${subAttempted}`);
    } else {
      cy.get('#scorecard-header').contains('div').should('not.exist')
    }
  })

  // Results: Correct
  it("It should show the correct amount of correct answers and not display if there are no answers to show.  The correct answer should contain the frequency and which question it was.  There should not be a button to play a sound.", () => {
    if(correct.length>0) {
      cy.get("#scorecard-correct-answers").should('exist');
      cy.get("#scorecard-correct-answers").children('h3').as('setTitle');
      cy.get('@setTitle').contains('Correct');
      cy.get('@setTitle').children('span').contains(`${percentage(correct.length/answers.length)} - ${[correct.length,'/',answers.length].join('')}`);
      cy.get('#scorecard-correct-answers').children('fieldset').as('answers');
      cy.get('@answers').should('have.length',correct.length)
      cy.get('@answers').each(($answer, idx) => {
        cy.wrap($answer).as('answer');
        cy.get('@answer').contains('legend', `Frequency #${correct[idx].k+1} - ${correct[idx].Hz}`);
        cy.get('@answer').children('div').should('not.exist');
      })
    } else {
      cy.get("#scorecard-correct-answers").should('not.exist');
    }
  })

  // Results: Partial
  it("It should show the correct amount of (partial) answers and not display if there are no answers to show.  The (partial) answer should contain the frequency and which question it was.  There should be a button to play a sound and it should play", () => {
    let selectedRangeIncorrectAnswers = [...partial,...incorrect];
    if(selectedRangeIncorrectAnswers.length>0) {
      cy.get("#scorecard-incorrect-answers").should('exist');
      cy.get("#scorecard-incorrect-answers").children('h3').as('setTitle');
      cy.get('@setTitle').contains('Incorrect');
      cy.get('@setTitle').children('span').contains(`${percentage(selectedRangeIncorrectAnswers.length/answers.length)} - ${[selectedRangeIncorrectAnswers.length,'/',answers.length].join('')}`);
      cy.get('#scorecard-incorrect-answers').children('fieldset').as('answers');
      cy.get('@answers').should('have.length',selectedRangeIncorrectAnswers.length)
      cy.get('@answers').each(($answer, idx) => {
        cy.wrap($answer).as('answer');
        cy.get('@answer').contains('legend', `Frequency #${selectedRangeIncorrectAnswers[idx].k+1} - ${selectedRangeIncorrectAnswers[idx].Hz}`);
        cy.get('@answer').children('div').should('exist');
        cy.get('@answer').children('div').contains('button','Play Sound').as('sound');
        cy.get('@sound').click();
        cy.wait(200);
        cy.get('@sound').click()
      })
    } else {
      cy.get("#scorecard-incorrect-answers").should('not.exist');
    }
  })
})