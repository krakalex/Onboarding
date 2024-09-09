const BasePage = require("./BasePage");

class ProductCatalog extends BasePage {
    
    searchFieldSelector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Home",
                "metadata": "sap.m.SearchField",
                "id": "*searchField"
            }
    };

    async waitForPageOpened() {
        await browser.waitUntil(
            async () => {
            return (await ui5.element.isVisible(this.searchFieldSelector));
            }, {
            timeout: 50,
            timeoutMsg: 'Next step button is not visible.'
            }
        )
    }

    async inputSearchQuery(searchValue) {
        await ui5.userInteraction.click(this.searchFieldSelector);
        await ui5.userInteraction.clearAndFill(this.searchFieldSelector, searchValue);
    };

    itemsSelector = {
            "elementProperties": {
                    "viewName": "sap.ui.demo.cart.view.Home",
                    "metadata": "sap.m.ObjectListItem",
                    "bindingContextPath": "/Products*'*'"
            },
            "descendantProperties": {
                    "viewName": "sap.ui.demo.cart.view.Home",
                    "metadata": "sap.m.ObjectAttribute"
            }
// "elementProperties": {
    // "viewName": "sap.ui.demo.cart.view.Home",
    // "metadata": "sap.m.List",
    // "id": "*productList"

    "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Text",
        "bindingContextPath": "/Products*'*')"

         "elementProperties": {
        "viewName": "sap.ui.demo.cart.view.Home",
        "metadata": "sap.m.Text",
        "bindingContextPath": "/Products*'*')"
        },
        "siblingProperties": {
    	    "metadata": "sap.m.ObjectAttribute"
        }   
    };

    async getiItemElements() {
        return await ui5.element.getAllDisplayed(this.itemsSelector);
    };

    async verifyItemTitlesContainsSought(searchValue) {
        const itemElements = await this.getiItemElements();
        const itemElementsCount = (itemElements.length);
        for (let index = 0; index < itemElementsCount; index++) {
            await ui5.assertion.expectAttributeToContain(this.itemsSelector, "title", searchValue, index);
        }
    };

    async verifyItemTitlesContainText(searchValue) {
        const itemElements = await this.getiItemElements();
        for (const itemElement of itemElements) {
            const titleValue = await ui5.control.getProperty(itemElement, "title");
            expect(titleValue).toContain(searchValue);
        }
    }
}    

module.exports = new ProductCatalog();