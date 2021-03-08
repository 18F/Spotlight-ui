import FIELD_OPTIONS from '../../src/data/fields';
import { API_DOMAIN } from '../../src/data/api';

const testField = Object.values(FIELD_OPTIONS).filter(field => field.live && field.input === 'text')[0];

describe('Homepage', () => {
    describe('default state', () => {
        beforeEach(() => {
            cy.visit('http://localhost:8000/');
        });
        it('disables copy url button', () => {
            cy.get('button[title="copy url"]').eq(0).should('be.disabled');
        });
        it('shows all live text input filters', () => {
            const liveInputCount = Object.values(FIELD_OPTIONS).filter(field => field.live && field.input === 'text').length;

            cy.get('input.usa-input').should('have.length', liveInputCount);
        });
        it('shows all live select filters', () => {
            const liveSelectCount = Object.values(FIELD_OPTIONS).filter(field => field.live && field.input === 'select').length;

            cy.get('select.usa-select').should('have.length', liveSelectCount);
        });
    });
    describe('when user sets a filter', () => {
        beforeEach(() => {
            cy.visit('http://localhost:8000/');
            cy.get(`input[name="${testField.attribute}"]`).eq(0).type('foo');
        });
        it('displays api url', () => {
            cy.get('div#api-url-text').contains(API_DOMAIN);
        });
        it('enables copy url button', () => {
            cy.get('button[title="copy url"]').eq(0).should('not.be.disabled');
        });
        it('displays removeable filter selection', () => {
            cy.get(`button[title="Remove ${testField.title} filter"]`).should('have.length', 1);
        });
        it('displays clear all selections button', () => {
            cy.get('button[title="clear all selections"]').should('have.length', 1);
        });
    });
    describe('when user clicks copy url', () => {
        beforeEach(() => {
            cy.visit('http://localhost:8000/');
            cy.get(`input[name="${testField.attribute}"]`).eq(0).type('foo');
            cy.get('button[title="copy url"]').eq(0).click();
        });
        it('shows success message', () => {
            cy.get('span[role="alert"]').contains('Copied!').should('have.length', 1);
        });
        it('removes success message if query changes afterward', () => {
            cy.get(`button[title="Remove ${testField.title} filter"]`).eq(0).click();
            cy.get('span[role="alert"]').should('have.length', 0);
        });
    });
    describe('when user removes a filter', () => {
        beforeEach(() => {
            cy.visit('http://localhost:8000/');
            cy.get(`input[name="${testField.attribute}"]`).eq(0).type('foo');
            cy.get(`button[title="Remove ${testField.title} filter"]`).eq(0).click();
        });
        it('removes api url', () => {
            cy.get('div#api-url-text').should('have.length', 0);
        });
        it('disables copy url button', () => {
            cy.get('button[title="copy url"]').eq(0).should('be.disabled');
        });
        it('removes filter selection', () => {
            cy.get(`button[title="Remove ${testField.title} filter"]`).should('have.length', 0);
        });
        it('removes clear all selections button', () => {
            cy.get('button[title="clear all selections"]').should('have.length', 0);
        });
    });
});
