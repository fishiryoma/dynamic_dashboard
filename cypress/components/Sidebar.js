export default class Sidebar {
    static clickAddButton(path) {
        cy.get("#sidebar").within(() => {
            cy.log(`點擊:${path}`);
            cy.get("button").contains(path).click();
        });
    }
}
