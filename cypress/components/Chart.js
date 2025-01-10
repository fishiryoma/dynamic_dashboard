import ConfirmDialog from "./ConfirmDialog";

export default class Chart {
    static getElement(path) {
        return cy.get(`[data-testid=${path}]`);
    }
    static checkInvisible(path) {
        this.getElement(path).should("be.visible");
    }
    static confirm(action) {
        ConfirmDialog.clickButton(action);
    }
    static drag(path, x, y) {
        this.getElement(path)
            .trigger("mousedown", { which: 1 })
            .trigger("mousemove", {
                clientX: x,
                clientY: y,
            })
            .wait(200)
            .trigger("mouseup", { force: true });
    }
    static resize(path, deltaX, deltaY) {
        this.getElement(path).then((el) => {
            const rect = el[0].getBoundingClientRect();
            const startX = rect.right;
            const startY = rect.bottom;
            cy.wrap(el)
                .trigger("mousedown", {
                    which: 1,
                    position: "bottomRight",
                })
                .trigger("mousemove", {
                    clientX: startX + deltaX,
                    clientY: startY + deltaY,
                })
                .trigger("mouseup");
        });
    }
}
