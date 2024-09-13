const BasePage = require("./BasePage");

class WelcomePage extends BasePage {

    addItemToCartButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.Button",
            "bindingContextPath": "/Promoted/*"
        },
    }
    async waitForPageOpened() {
        await browser.waitUntil(
            async () => {
            return (await ui5.element.isVisible(this.addItemToCartButtonSelector));
            }, {
            timeout: 5000,
            timeoutMsg: 'Add to Shopping Cart button is not visible.'
            }
        )
    }

    itemsTitleSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.ObjectIdentifier",
            "bindingContextPath": "/Promoted/*"
        }    
    }
    itemsPriceSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.ObjectListItem",
            "bindingContextPath": "/Promoted/*"
        }
    }

    async getItemDetails() {
        const itemDetails = [];
        const itemTitles = await ui5.element.getAllDisplayed(this.itemsTitleSelector);
        const itemPrices = await ui5.element.getAllDisplayed(this.itemsPriceSelector);

        for (let i = 0; i < itemPrices.length; i++) {
            const title = await ui5.control.getProperty(itemTitles[i], "title");
            const price = await ui5.control.getProperty(itemPrices[i], "number");

            itemDetails.push({
                title,
                price
            });
        }
        return itemDetails;
    }

    async addItemsToCart() {
        await ui5.userInteraction.click(this.addItemToCartButtonSelector, 0);
        await ui5.userInteraction.click(this.addItemToCartButtonSelector, 1);
    };

    async addItemToCartByName(itemName) {
        const items = await ui5.element.getAllDisplayed(this.itemsTitleSelector);
        for (const item of items) {
            const title = await ui5.control.getProperty(item, "title");
            const bindingContextPath = await ui5.control.getBindingContextPathProperty(item);
            if (title === itemName) {
                const addItemToCartButtonSelector = {
                    "elementProperties": {
                        "viewName": "sap.ui.demo.cart.view.Welcome",
                        "metadata": "sap.m.Button",
                        "bindingContextPath": bindingContextPath
                    }
                }
                await ui5.userInteraction.click(addItemToCartButtonSelector)
            }
        }
    }

    showCartButtonSelector = {
       "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Welcome",
                "metadata": "sap.ui.core.Icon",
                "src": "sap-icon://cart"
            } 
    }
    async showCart() {
        await ui5.userInteraction.click(this.showCartButtonSelector);
    };
}

module.exports = new WelcomePage();