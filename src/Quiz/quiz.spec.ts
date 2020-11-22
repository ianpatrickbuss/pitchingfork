import Question from './Question.svelte';
import {mount} from 'cypress-svelte-unit-test';
import {baseRange, subRange, rangeKeys} from '../lib/ranges';
import { rand } from '../lib/math';
var ranges = rangeKeys;
describe("Question: All Ranges Selected", () => {
  it("The user can play the frequency", () => {
    mount(Question, {
      props: {
        Hz: rand(0,600),
        ranges: rangeKeys,
        page: [0,12]
      }
    })
    cy.get('header').contains('button','Play Frequency').click();
    cy.wait(100);
    cy.get('header').contains('button','Stop Sound').click();
  })
  it("All Ranges: When the user selects a range they can select bonus options", () => {
    cy.get('fieldset').children('div').each(($label,idx) => {
      cy.wrap($label).contains(ranges[idx]).click();
      cy.get('fieldset>legend').contains(ranges[idx]);
      cy.get('footer').contains('button','Bonus Points!').click();
      cy.get('footer').contains('button','Submit Answer').should('not.exist')
      cy.get('input[name="sub-question"][type="radio"]').should('have.length',5);
      cy.get('input[name="sub-question"]').eq(rand(0,4)).click();
      cy.get('fieldset').contains('b',`Guess which band of ${ranges[idx]}`)
      cy.get('footer').contains('button','Submit Answer');
      cy.get('footer').contains('button','Withdrawl Bonus').click();
    });
  });
});
describe("Question: Some ranges selected", () => {
  let random = rand(2,ranges.length-1);
  let localRanges = rangeKeys.slice(0,random);
  it("When no range is selected then no subranges will show and the submitting is not possible and you cannot select a subrange", () => {
    mount(Question, {
      props: {
        Hz: rand(0,600),
        ranges: localRanges,
        page: [0,12]
      }
    })
    cy.get('footer').contains('button','Submit Answer').should('not.exist')
    cy.get('footer').contains('button','Bonus Points!').should('not.exist');
    cy.get("input[name='question']").should('have.length',localRanges.length)
  });
  it("When you iterate through each range you can select a frequency and sub frequencies", () => {
    cy.get('fieldset').children('div').each(($label,idx) => {
      cy.wrap($label).contains(localRanges[idx]).click();
      cy.get('fieldset>legend').contains(localRanges[idx]);
      cy.get('footer').contains('button','Bonus Points!').click();
      cy.get('footer').contains('button','Submit Answer').should('not.exist')
      cy.get('input[name="sub-question"][type="radio"]').should('have.length',5);
      cy.get('input[name="sub-question"]').eq(rand(0,4)).click();
      cy.get('fieldset').contains('b',`Guess which band of ${localRanges[idx]}`)
      cy.get('footer').contains('button','Submit Answer');
      cy.get('footer').contains('button','Withdrawl Bonus').click();
    })
  })
})
for(let i = 0; i<8; i++) {
describe("Question: When one Range is selected: (Take " + (i+1) + ")", () => {
    let selectedKey = rand(0,ranges.length-1)
    let localRanges = rangeKeys.slice(selectedKey,selectedKey+1);
    it("A user cannot submit answer if no answer is selected", () => {
      mount(Question, {
        props: {
          Hz: rand(0,600),
          ranges: localRanges,
          page: [0,12]
        }
      })
      cy.get('fieldset>legend').contains(localRanges[0]);
      cy.get('footer').contains('button','Submit Answer').should('not.exist')
    })
    it("There is no withdrawl bonus button", () => {
      cy.get('footer').contains('button','Withdrawl Bonus').should('not.exist');
    })
    it("Each range should be able to be selected and contain the correct sub range.  Since one range is selected, no withdrawl bonus button should be displayed", () => {
      let sRanges = subRange(baseRange[localRanges[0]])
      cy.get('fieldset').children('div').should('have.length',5).each(($div,idx) => {
        cy.wrap($div).children('label').click()
        cy.get('footer').contains('button','Withdrawl Bonus').should('not.exist');
        cy.wrap($div).children('label').contains('label',`${sRanges[idx][0]}Hz-${sRanges[idx][1]}Hz`);
        cy.get('footer').contains('button','Submit Answer');
      });
    })
  })
}