import Sidebar from "../components/Sidebar";
import SelectDialog from "../components/SelectDialog";
import Chart from "../components/Chart";

describe("dashboard fn test", () => {
    before(() => {
        cy.visit("http://localhost:3000/");
    });

    it("chart operation", () => {
        Sidebar.clickAddButton("圓餅圖");
        SelectDialog.checkInvisible();
        SelectDialog.clickButton("確認");

        Chart.drag("pie", 500, 300);

        Chart.checkInvisible("pie");
        Chart.resize("pie", 60, 90);

        const winWidth = Cypress.config("viewportWidth");
        const winHeight = Cypress.config("viewportHeight");
        Chart.drag("pie", winWidth, winHeight);
        Chart.confirm("刪除");
    });
});
