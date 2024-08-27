const checkoutData = require("../data/checkoutData.json");

class CheckoutPage {

    step2ButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*contentsStep-nextButton"
        }
    }
    async step2() {
        await ui5.userInteraction.click(this.step2ButtonSelector);
    };

    payViaBankPanelButtonSelector = {
        "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*payViaBank-button"
        }
    }
    async payViaBank() {
        await ui5.userInteraction.click(this.payViaBankPanelButtonSelector);
    };

    step3ButtonSelector = {
        "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*paymentTypeStep-nextButton"
        }
    }
    async step3() {
        await ui5.userInteraction.click(this.step3ButtonSelector);
    };

    step4ButtonSelector = {
        "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*bankAccountStep-nextButton"
        }
    }
    async step4() {
        await ui5.userInteraction.click(this.step4ButtonSelector);
    };

    addressFieldSelector = {
        "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Input",
                "id": "*invoiceAddressAddress"
        }
    }
    async enterAddress() {
        await ui5.userInteraction.click(this.addressFieldSelector);
        await ui5.userInteraction.clearAndFill(this.addressFieldSelector, checkoutData.invoiceAddress.address);
    };

    cityFieldSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressCity"
        }
    }
    async enterCity() {
        await ui5.userInteraction.click(this.cityFieldSelector);
        await ui5.userInteraction.clearAndFill(this.cityFieldSelector, checkoutData.invoiceAddress.city);
    };

    zipFieldSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressZip"
        }
    }
    async enterZipCode() {
        await ui5.userInteraction.click(this.zipFieldSelector);
        await ui5.userInteraction.clearAndFill(this.zipFieldSelector, checkoutData.invoiceAddress.zipCode);
    };

    countryFieldSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressCountry"
        }
    }
    async enterCountry() {
        await ui5.userInteraction.click(this.countryFieldSelector);
        await ui5.userInteraction.clearAndFill(this.countryFieldSelector, checkoutData.invoiceAddress.country);
        await common.userInteraction.pressEnter();
    };

    step5ButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*invoiceStep-nextButton"
        }
    }
    async step5() {
        await ui5.userInteraction.click(this.step5ButtonSelector);
    };

    orderSummaryButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*deliveryTypeStep-nextButton"
        }
    }
    async orderSummary() {
        await ui5.userInteraction.click(this.orderSummaryButtonSelector);
    };

    submitButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*submitOrder"
        }
    }
    async submitOrder() {
        await ui5.userInteraction.click(this.submitButtonSelector);
        await util.browser.sleep(1000);
        await common.userInteraction.pressEnter();
        await util.browser.sleep(5000);
    };
}    
module.exports = new CheckoutPage();