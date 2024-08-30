const BasePage = require("./BasePage");

class OrderCompletedPage extends BasePage {

    orderConfirmationSelector = {
        "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.OrderCompleted",
                "metadata": "sap.m.FormattedText"
        }
    }
    async verifyOrderPlacedSuccessfully() {
        await ui5.assertion.expectAttributeToContain(this.orderConfirmationSelector, "htmlText", "You will receive an e-mail confirmation shortly.")
    };
    async getOrderID() {
        const rawConfText = await ui5.element.getPropertyValue(this.orderConfirmationSelector, "htmlText");
    
        let orderID = rawConfText.substring(
            rawConfText.indexOf("Your order number: ") + 19,
            rawConfText.lastIndexOf("</strong>")
        );

    
    
        // util.console.log(orderID);
        // const userData = {
        //     "orderConfirmation": orderID
    
        // };
        
        // browser.config.params.export.orderConfirmation = userData;

        return orderID;
    }
}

module.exports = new OrderCompletedPage();