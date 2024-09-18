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

    async getItemDetailsByIndex(index) {
        const itemTitles = await ui5.element.getAllDisplayed(this.itemsTitleSelector);
        const itemPrices = await ui5.element.getAllDisplayed(this.itemsPriceSelector);
            
        if (index >= itemTitles.length || index >= itemPrices.length) {
            throw new Error('Invalid Index, exceeds the number of available items.')
        }

        const title = await ui5.element.getPropertyValue(this.itemsTitleSelector, "title", index);
        let price = await ui5.element.getPropertyValue(this.itemsPriceSelector, "number", index);

        if (price.charAt(price.length - 3) === ',') {
            price = price.replace(',', '.');
        }

        const itemDetail = {
            title,
            price
        };

        console.log(itemDetail)
        return itemDetail;
    }
    async addPromoItemsToCartByIndex(index) {
        const itemElements = await ui5.element.getAllDisplayed(this.addItemToCartButtonSelector);
        
        if (index >= itemElements.length) {
            throw new Error('Invalid Index, exceeds the number of available items.')
        }

        await ui5.userInteraction.click(this.addItemToCartButtonSelector, index);
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