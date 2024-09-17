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
    }
    async waitForPageOpened() {
        await browser.waitUntil(
            async () => {
            return (await ui5.element.isVisible(this.sCartItemsSelector));
            }, {
            timeout: 5000,
            timeoutMsg: 'Shopping Cart Items are not visible.'
            }
        )
    }

    async getCartItemDetails() {
        const sCartItemElements = await ui5.element.getAllDisplayed(this.sCartItemsSelector);
        const sCartItemsCount = (sCartItemElements.length);
        const cartItems = [];
        for (let i = 0; i < sCartItemsCount; i++) {
            const title = await ui5.element.getPropertyValue(this.sCartItemsSelector, "title", i);
            let price = await ui5.element.getPropertyValue(this.sCartItemsSelector, "number", i);

            if (price.charAt(price.length - 3) === ',') {
            price = price.replace(',', '.');
            }

            cartItems.push({
                title,
                price
            });
        }
        console.log(cartItems)
        return cartItems
    };

    async verifyCartItems(expectedItemDetails) {
        const cartItemDetails = await this.getCartItemDetails();
        
        if (expectedItemDetails.length !== cartItemDetails.length) {
            console.log ('Item Details are not equal')
            return
        }

        for (let i = 0; i < expectedItemDetails.length; i++) {
            const expectedItem = expectedItemDetails[i];
            const matchingItem = cartItemDetails.find((cartItem) =>
                cartItem.title === expectedItem.title &&
                cartItem.price === expectedItem.price
            );

            if (!matchingItem) {
                console.log ('No matching item is found')
                return
            }
        }
    }
}

module.exports = new ShoppingCartPage();