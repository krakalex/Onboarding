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
}

module.exports = new ShoppingCartPage();