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

    cartItemsSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Cart",
            "metadata": "sap.m.ObjectListItem",
            "bindingContextPath": "/cartEntries/*"
        }
    }
    async waitForPageOpened() {
        await browser.waitUntil(
            async () => {
            return (await ui5.element.isVisible(this.cartItemsSelector));
            }, {
            timeout: 5000,
            timeoutMsg: 'Shopping Cart Items are not visible.'
            }
        )
    }

    async getCartItemDetails() {
        const cartItemElements = await ui5.element.getAllDisplayed(this.cartItemsSelector);
        const cartItemsCount = (cartItemElements.length);
        const cartItems = [];
        for (let i = 0; i < cartItemsCount; i++) {
            const title = await ui5.element.getPropertyValue(this.cartItemsSelector, "title", i);
            let price = await ui5.element.getPropertyValue(this.cartItemsSelector, "number", i);

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
            throw new Error('Item Details are not equal');
        }

        for (let i = 0; i < expectedItemDetails.length; i++) {
            const expectedItem = expectedItemDetails[i];
            const matchingItem = cartItemDetails.find((cartItem) =>
                cartItem.title === expectedItem.title &&
                cartItem.price === expectedItem.price
            );

            if (!matchingItem) {
                throw new Error('No matching item is found');
            }
        }
    }
}

module.exports = new ShoppingCartPage();