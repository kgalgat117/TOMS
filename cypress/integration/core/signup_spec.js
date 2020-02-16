/// <reference types="Cypress" />

describe('My First Test', function () {
    it('User Sign Up', function () {
        cy.visit('/signup')
        cy.get('#ownerName').type(`${randomWord()}  ${randomWord()}`)
        cy.get('#ownerEmail').type(`${randomWord()}@${randomWord()}.${randomWord()}`)
        cy.get('#ownerPhone').type(randomPhone())
        cy.get('#ownerPassword').type('password')
        cy.get('#ownerConfirmPassword').type('password')
        cy.get('#createUserButton').click().then(resp => {
            console.log('got response now')
        })
        // console.log('sdfsfsdfsd')
        cy.url().should('include', '/dashboard')
    })
})

function randomWord() {
    let randomWordLength = Math.floor(Math.random() * (5 - 2 + 1)) + 2
    let word = ''
    for (let i = 0; i < randomWordLength; i++) {
        let max = 90, min = 65
        if (parseInt(Math.random() * 2)) {
            max = 122
            min = 97
        }
        let randomCharCode = Math.floor(Math.random() * (max - min + 1) + min)
        word += String.fromCharCode(randomCharCode)
    }
    return word
}

function randomPhone() {
    let randomPhoneLength = 10
    let word = ''
    for (let i = 0; i < randomPhoneLength; i++) {
        let max = 9, min = 0
        let randomCharCode = Math.floor(Math.random() * (max - min + 1) + min)
        word += randomCharCode
    }
    return word
}
