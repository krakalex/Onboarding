// var BasePage = require("./BasePage");

// class WelcomePage extends BasePage {
class WelcomePage {

    async openApplication() {
        await ui5.navigation.navigateToApplication("");
    };

    addItemToCartButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Welcome",
            "metadata": "sap.ui.core.Icon",
            "bindingContextPath": "/Promoted/0"
        }
    }
    async addItemToCart() {
        await ui5.userInteraction.click(this.addItemToCartButtonSelector);
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