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
            timeout: 5000,
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
            }
    };

    itemsTitlesSelector = {
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

    async verifyItemTitlesContainText(searchValue) {
        const itemElements = await this.getiItemElements();
        const itemElementsCount = (itemElements.length);
        for (let index = 0; index < itemElementsCount; index++) {
            await ui5.assertion.expectAttributeToContain(this.itemsSelector, "title", searchValue, index);
        }
    };

    async verifyItemTitlesContainText2(searchValue) {
        const itemElements = await this.getiItemElements();
        for (const itemElement of itemElements) {
            const titleValue = await ui5.control.getProperty(itemElement, "title");
            expect(titleValue).toContain(searchValue);
        }
    };

    async verifyItemsTitlesContainText(searchValue) {
        const itemTitles = await ui5.element.getAllDisplayed(this.itemsTitlesSelector);
        const itemTitlesCount = (itemTitles.length);
        for (let index = 0; index < itemTitlesCount; index++) {
            await ui5.assertion.expectAttributeToContain(this.itemsTitlesSelector, "text", searchValue, index);
        }
    }
}    

module.exports = new ProductCatalog();