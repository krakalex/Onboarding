describe("Place a new Order", function(){

    it("Step 01: Open the Fiori app", async function(){
        await ui5.navigation.navigateToApplication("");
        // await util.browser.sleep(5000);
    });

    it("Step 02: Click Add to Shopping Cart", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Welcome",
                "metadata": "sap.ui.core.Icon",
                "bindingContextPath": "/Promoted/0"
            }
        };
        await ui5.userInteraction.click(selector);
    });
    it("Step 03: Click Show Shopping Cart", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Welcome",
                "metadata": "sap.ui.core.Icon",
                "src": "sap-icon://cart"
            }
        };
        await ui5.userInteraction.click(selector);
    });
    it("Step 04: Click Process button", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Cart",
                "metadata": "sap.m.Button",
                "id": "*proceedButton"
            }
        };
        await ui5.userInteraction.click(selector);
    });
    it("Step 05: Click Step 2 button", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*contentsStep-nextButton"
            }
        };
        await ui5.userInteraction.click(selector);
    });
    it("Step 06: Choose Bank transfer", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*payViaBank-button"
            }
        };
        await ui5.userInteraction.click(selector);
    });
    it("Step 07: Proceed to Step 3", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*paymentTypeStep-nextButton"
            }
        };
        await ui5.userInteraction.click(selector);
    })
    it("Step 07: Proceed to Step 4", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*bankAccountStep-nextButton"
            }
        };
        await ui5.userInteraction.click(selector);
    })
    it("Step 08: Input address", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Input",
                "id": "*invoiceAddressAddress"
            }
        };
        await ui5.userInteraction.click(selector);
        await ui5.userInteraction.clearAndFill(selector, "My Value");
        await common.userInteraction.pressTab();
        await common.userInteraction.clearAndFillActive("My Value");
        await common.userInteraction.pressTab();
        await common.userInteraction.clearAndFillActive("220022");
        await common.userInteraction.pressTab();
        await common.userInteraction.clearAndFillActive("Neverland");
        await common.userInteraction.pressEnter();
    })
    it("Step 09: Proceed to Step 5", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*invoiceStep-nextButton"
            }
        };
        await ui5.userInteraction.click(selector);
    })
    it("Step 10: Proceed to the Order Summary", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*deliveryTypeStep-nextButton"
            }
        };
        await ui5.userInteraction.click(selector);
    })
    it("Step 11: Submit the Order", async function(){
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.Checkout",
                "metadata": "sap.m.Button",
                "id": "*submitOrder"
            }
        };
        await ui5.userInteraction.click(selector);
        await util.browser.sleep(1000);
        await common.userInteraction.pressEnter();
        // await common.userInteraction.pressEnter();
        // await common.userInteraction.pressEnter();
        await util.browser.sleep(5000);
    })
    it("Step 12: Get newly created Order ID", async function() {
        const selector = {
            "elementProperties": {
                "viewName": "sap.ui.demo.cart.view.OrderCompleted",
                "metadata": "sap.m.FormattedText"
            }
        };
        const rawConfText = await ui5.element.getPropertyValue(selector, "htmlText");

        let orderID = rawConfText.substring(
            rawConfText.indexOf("Your order number: ") + 19, 
            rawConfText.lastIndexOf("</strong>")
        );

        util.console.log(orderID);
        const userData = {
            "orderConfirmation": orderID
        };
     
        browser.config.params.export.orderConfirmation = userData;

        const references = browser.config.params.import.data["references"];
        references.orderConfirmation = orderID;
        
    })
})
