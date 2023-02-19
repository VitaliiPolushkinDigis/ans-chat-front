/// <reference types="cypress" />

describe('test of teh home sceen', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it.skip('should display login form', () => {
    cy.get('[data-attr="form"]').should('have.length', 1)
  })

  it.skip('using correct login credentials redirect to conversations', () => {
    cy.get('[data-attr="email"]').type('vetal160199@gmail.com')
    cy.get('[data-attr="password"').type('Admin123')
    cy.get('[data-attr="submit"]').click()
    cy.contains('Select the chat to see the conversation')
  })

  it.skip('using correct login credentials redirect to conversations and then redirect to /test page', () => {
    cy.get('[data-attr="email"]').type('vetal160199@gmail.com')
    cy.get('[data-attr="password"').type('Admin123')
    cy.get('[data-attr="submit"]').click()
    cy.contains('Select the chat to see the conversation')

    cy.get('[data-attr="user-link"]').click()
  })

  it('pagination next click should display next items', () => {
    cy.get('[data-attr="email"]').type('vetal160199@gmail.com')
    cy.get('[data-attr="password"').type('Admin123')
    cy.get('[data-attr="submit"]').click()
    cy.contains('Select the chat to see the conversation')

    cy.get('[data-attr="user-link"]').click()

    cy.get('[data-attr="next"]').first().click()

    cy.get('.active').first().should('have.text', 2)
  })

  it.skip('using correct login credentials redirect to conversations and fetch messages', () => {
    cy.get('[data-attr="email"]').type('vetal160199@gmail.com')
    cy.get('[data-attr="password"').type('Admin123')
    cy.get('[data-attr="submit"]').click()
    cy.contains('Select the chat to see the conversation')

    cy.get('[data-attr="avatar"]').click()

    cy.get('[data-attr="messages-list"]').should('have.length.at.least', 1)
  })

  it.skip('should display error registering with existing email', () => {
    cy.get('[data-attr="register-link"]').click()
    cy.get('[data-attr="email"]').type('vetal160199@gmail.com')
    cy.get('[data-attr="password"]').type('Admin123')
    cy.get('[data-attr="password-repeat"]').type('Admin123')
    cy.get('[data-attr="firstName"]').type('fake')
    cy.get('[data-attr="lastName"]').type('user')
    cy.get('[data-attr="submit"]').click()
    cy.contains('User alreate exists')
  })
})
