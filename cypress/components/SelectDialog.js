export default class SelectDialog {
    static checkInvisible() {
        cy.get("[data-testid=select-dialog]").should("be.visible");
    }

    static clickButton(action) {
        cy.get("[data-testid=select-dialog]").within(() => {
            cy.get("button").contains(action).click();
        });
    }
}
