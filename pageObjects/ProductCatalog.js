const BasePage = require("./BasePage");

class ProductCatalog extends BasePage {

    searchFieldSelector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Home",
                "metadata": "sap.m.SearchField",
                "id": "*searchField"
            }
    };

    async inputSearchQuery(searchValue) {
        await ui5.userInteraction.click(this.searchFieldSelector);
        await ui5.userInteraction.clearAndFill(this.searchFieldSelector, searchValue);
    };

    itemSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.m.ObjectListItem",
            "bindingContextPath": "/Products*'*')"
        }
    }

    async getItemsTitles() {
        const itemResultTitles = await ui5.element.getAllDisplayed(this.itemSelector);
        return itemResultTitles;
    }

    async verifyTitleContainsText(titleElement, searchValue) {
        const titleText = await titleElement.getText();
        expect(titleText).toContain(searchValue);
    }
}

module.exports = new ProductCatalog();