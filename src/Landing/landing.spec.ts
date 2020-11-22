import Landing from './Layout.svelte';
import {mount} from 'cypress-svelte-unit-test';
import { baseRange, rangeKeys} from '../lib/ranges';

describe('Landing Page Tests', () => {
  it("Should contain a message and list of instructions with a button to click and soundcheck", () => {
    mount(Landing);
    cy.contains('h3','Hey There!');
    cy.get('button').contains('Start Sound Check').click();
    cy.wait(250);
    cy.get('button').click();
  })
  
  it("After it has sound checked it will show a list of ranges that can be selected", () => {
    cy.get('#select-selectAll-range').should('not.have.attr','checked')
    cy.get('div.grid').contains('label','Select All Ranges').click();
    cy.get('footer').contains('button',`I'm Ready!`);
    let ranges = rangeKeys;
    cy.get('div.flex').children('label').should('have.length',6);
    cy.get('div.flex').children('label').each(($label,idx,$children) => {
      cy.get(`input#select-range-${idx}`).should('have.prop','checked')
      cy.wrap($label).contains(ranges[idx]).click();
      cy.get(`input#select-range-${idx}`).should('not.have.attr','checked')
    });
    cy.get('#select-selectAll-range').should('not.have.attr','checked');
    cy.get('footer').contains('button',`Check Again`);
    cy.get('footer').contains(`I'm Ready!`).should('not.exist');
  });
})  
