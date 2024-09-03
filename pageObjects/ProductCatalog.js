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

    itemsSelector = {

            "elementProperties": {
                    "viewName": "sap.ui.demo.cart.view.Home",
                    "metadata": "sap.m.ObjectListItem",
                    "bindingContextPath": "/Products*'*'"
            }
    };

    async verifySearchResults(searchValue) {
        const itemElements = await ui5.element.getAllDisplayed(this.itemsSelector);
        const maxElements = (itemElements.length);
        for (let index = 0; index < maxElements; index++) {
            await ui5.assertion.expectAttributeToContain(this.itemsSelector, "title", searchValue, index);
        }
    };

    async logItemTitles() {
        const itemElements = await ui5.element.getAllDisplayed(this.itemsSelector);
        for (const itemElement of itemElements) {
            const titleValue = await ui5.control.getProperty(itemElement, "title");
            console.log(titleValue)
        }
    }
}    

module.exports = new ProductCatalog();