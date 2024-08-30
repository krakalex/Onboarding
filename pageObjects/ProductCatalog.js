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

    itemTitlesSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Home",
            "metadata": "sap.m.ObjectListItem",
            "bindingContextPath": "/Products*'*')"
        }
    }

    async getItemsTitles() {
        const itemResultTitles = await ui5.element.getAllDisplayed(this.itemTitlesSelector);
        return itemResultTitles;
    }

    async verifyTitleContainsText(itemTitleElement, searchValue) {
        const titleText = await itemTitleElement.getText();
        return titleText
        await ui5.assertion.expectAttributeToContain(titleText, searchValue);
    }
}

module.exports = new ProductCatalog();