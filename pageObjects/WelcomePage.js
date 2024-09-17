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

    itemsSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.ObjectIdentifier",
            "bindingContextPath": "*"
        }    
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

    async getItemDetailsByIndex(indexes) {
        const itemDetails = [];
        const itemTitles = await ui5.element.getAllDisplayed(this.itemsTitleSelector);
        const itemPrices = await ui5.element.getAllDisplayed(this.itemsPriceSelector);

        for (let i = 0; i < indexes.length; i++){
            const index = indexes[i];

            if (index >= itemTitles.length || index >= itemPrices.length) {
                console.log('Invalid Index, exceeds the number of available items.')
                return
            }

            const title = await ui5.element.getPropertyValue(this.itemsTitleSelector, "title", index);
            let price = await ui5.element.getPropertyValue(this.itemsPriceSelector, "number", index);

            if (price.charAt(price.length - 3) === ',') {
                price = price.replace(',', '.');
            }

            if (!title || !price) {
                console.log ('Item Details mismatch')
                return
            }

            itemDetails.push({
                title,
                price
            });
        }
        console.log(itemDetails)
        return itemDetails;
    }
    async addPromoItemsToCartByIndex(indexes) {
        const itemElements = await ui5.element.getAllDisplayed(this.addItemToCartButtonSelector);
        
        for (let i = 0; i < indexes.length; i++){
            const index = indexes[i];
            if (index >= itemElements.length) {
                console.log('Invalid Index, exceeds the number of available items.')
                return
            }
            const addItemToCartButtonSelector = {
                "elementProperties": {
                    "viewName": "sap.ui.demo.cart.view.Welcome",
                    "metadata": "sap.m.Button",
                    "bindingContextPath": `/Promoted/${index}`
                }
            }
            await ui5.userInteraction.click(addItemToCartButtonSelector);
        }
    };

    async addItemToCartByName(itemName) {
        const items = await ui5.element.getAllDisplayed(this.itemsSelector);
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