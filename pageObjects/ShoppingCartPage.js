class ShoppingCartPage {

    proceedButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Cart",
            "metadata": "sap.m.Button",
            "id": "*proceedButton"
        }
    }
    async proceed() {
        await ui5.userInteraction.click(this.proceedButtonSelector);
    };
}

module.exports = new ShoppingCartPage();