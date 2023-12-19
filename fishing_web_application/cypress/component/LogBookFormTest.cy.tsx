import LogBookForm from "@/components/form/LogBookForm"
describe('<LogBook />', () => { 
  it('should render and display expected content', () => {
    cy.setCookie("next-auth.session-token", "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..bvvTKAQ_lvIRJLj_.C-w_SXnXFA_dmJP1h8fSuWYtXllif8_vRIm_3z_dwttOZGIUO0a1C24mDgMZKqcyMsYXAXQkdF9-HehWm-N7cgA0M4_Ls-UykzuWkvzyOz5QWIXPNqBMx2xGUmsurhTdaP9ehW53SGQNugKHuYOZ6I-36vHZuzRfDBqLTqN-V2mcGvLctUu9APCIjoMEZ37xuIdcAva9fM0aFSnAqb3WoWIt3NwqYy90ZTM7ClFg3fMYsue0Ee7UXeSHX3q01TdnrH4b3uWyzAR5KcvvUmeGHKKv.v5dikibckDonUdVyP-tdWw")
    cy.request('http://localhost:3000/api/currencyHandler').as('currencies')
    cy.intercept('GET', '/api/currencyHandler', {
      statusCode: 201,
      body: {
        "currencies": [
          {"currencyId":"clp6w8g1104m7v1kcaytopzif","currencyName":"magyar forint","currencyAcronyms":"huf"},
          {"currencyId":"clp6w8g1104m8v1kct8ytgxl3","currencyName":"euro","currencyAcronyms":"eur"}
        ]
      },
    })
    cy.mount(<LogBookForm/>)
    cy.get('input[name="userFirstName"]').type("Jhon")
    cy.get('input[name="userLastName"]').type("Doe")
    cy.get('input[name="baseFee"]').type("5500")
    cy.get('input[name="eszh"]').type("500")
    cy.get('#birthDate').click()
  })
})