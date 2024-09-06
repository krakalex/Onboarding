const BasePage = require("./BasePage");

class WelcomePage extends BasePage {

    addItemToCartButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.ui.core.Icon",
            "bindingContextPath": "/Promoted/0"
        }
    }
    async addItemToCart() {
        await ui5.userInteraction.click(this.addItemToCartButtonSelector);
        await browser.takeScreenshot();
    };

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