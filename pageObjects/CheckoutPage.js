const BasePage = require("./BasePage");

class CheckoutPage extends BasePage {

    step2ButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*contentsStep-nextButton"
        }
    }
    async moveToPmtTypeStep() {
        await ui5.userInteraction.click(this.step2ButtonSelector);
    };

    payViaBankPanelButtonSelector = {
        "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*payViaBank-button"
        }
    }
    async selectPayViaBank() {
        await ui5.userInteraction.click(this.payViaBankPanelButtonSelector);
    };

    step3ButtonSelector = {
        "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*paymentTypeStep-nextButton"
        }
    }
    async moveToAccDetailsStep() {
        await ui5.userInteraction.click(this.step3ButtonSelector);
    };

    step4ButtonSelector = {
        "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*bankAccountStep-nextButton"
        }
    }
    async moveToInvAddressStep() {
        await ui5.userInteraction.click(this.step4ButtonSelector);
    };

    addressFieldSelector = {
        "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Input",
                "id": "*invoiceAddressAddress"
        }
    }
    async enterAddress(address) {
        await ui5.userInteraction.click(this.addressFieldSelector);
        await ui5.userInteraction.clearAndFill(this.addressFieldSelector, address);
    };

    cityFieldSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressCity"
        }
    }
    async enterCity(city) {
        await ui5.userInteraction.click(this.cityFieldSelector);
        await ui5.userInteraction.clearAndFill(this.cityFieldSelector, city);
    };

    zipFieldSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressZip"
        }
    }
    async enterZipCode(zipCode) {
        await ui5.userInteraction.click(this.zipFieldSelector);
        await ui5.userInteraction.clearAndFill(this.zipFieldSelector, zipCode);
    };

    countryFieldSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Input",
            "id": "*invoiceAddressCountry"
        }
    }
    async enterCountry(country) {
        await ui5.userInteraction.click(this.countryFieldSelector);
        await ui5.userInteraction.clearAndFill(this.countryFieldSelector, country);
        await common.userInteraction.pressEnter();
    };

    step5ButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*invoiceStep-nextButton"
        }
    }
    async moveToDlvTypeStep() {
        await ui5.userInteraction.click(this.step5ButtonSelector);
    };

    orderSummaryButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*deliveryTypeStep-nextButton"
        }
    }
    async moveToOrderSummary() {
        await ui5.userInteraction.click(this.orderSummaryButtonSelector);
    };

    submitButtonSelector = {
        "elementProperties": {
            "viewName": "sap.ui.demo.cart.view.Checkout",
            "metadata": "sap.m.Button",
            "id": "*submitOrder"
        }
    }
    yesConfirmationButtonSelector = {
        "elementProperties": {
            "metadata": "sap.m.Button",
            "text": "Yes"
        }
    }
    async submitOrder() {
        await ui5.userInteraction.click(this.submitButtonSelector);
        await ui5.userInteraction.click(this.yesConfirmationButtonSelector);
    };
}    
module.exports = new CheckoutPage();