class BasePage {
    
    async openApplication() {
        await ui5.navigation.navigateToApplication("");
    }
    
    async setOrderID(orderNumber) {

        const orderData = {
            "orderNumber": orderNumber
        };
    browser.config.params.export.orderConfirmation = orderData;
    }
}

module.exports = BasePage;