export default class ConfirmDialog {
    static clickButton(action) {
        cy.get("[data-testid=confirm-dialog]")
            .should("be.visible")
            .find("button")
            .contains(action)
            .click();
    }
}
