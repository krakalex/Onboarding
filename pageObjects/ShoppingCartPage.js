const BasePage = require("./BasePage");

class ShoppingCartPage extends BasePage {

    proceedButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Cart",
            "metadata": "sap.m.Button",
            "id": "*proceedButton"
        }
    }
    async proceedToCOut() {
        await ui5.userInteraction.click(this.proceedButtonSelector);
    };

    sCartItemsSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Cart",
            "metadata": "sap.m.ObjectListItem",
            "bindingContextPath": "/cartEntries/*"
        }
    };

    async getCartItemDetails() {
        const sCartItemElements = await ui5.element.getAllDisplayed(this.sCartItemsSelector);
        const sCartItemsCount = (sCartItemElements.length);
        const cartItems = [];
        for (let i = 0; i < sCartItemsCount; i++) {
            const isItemVisible = await ui5.element.isVisible(this.sCartItemsSelector, i);
            if (isItemVisible === false) {
                break;
            }
            const title = await ui5.element.getPropertyValue(this.sCartItemsSelector, "title", i);
            const price = await ui5.element.getPropertyValue(this.sCartItemsSelector, "number", i);
            cartItems.push({
                title,
                price
            });
            return cartItems
        }
    };

    async verifyCartItems(expectedItemDetails) {
        const cartItems = await this.getCartItemDetails();

        for (let i = 0; i < expectedItemDetails.length; i++) {
            expect(cartItems[i].title).toBe(expectedItemDetails[i].title);
            expect(cartItems[i].price).toBe(expectedItemDetails[i].price);
        }
    }
}

module.exports = new ShoppingCartPage();