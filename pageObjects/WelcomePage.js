const BasePage = require("./BasePage");

class WelcomePage extends BasePage {

    addItemToCartButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.Button",
            "bindingContextPath": "/Promoted/*"
        },
    }
    async addItemToCart() {
        await ui5.userInteraction.click(this.addItemToCartButtonSelector, 1);
    };

    itemsSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.m.ObjectIdentifier",
            "bindingContextPath": "*"
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