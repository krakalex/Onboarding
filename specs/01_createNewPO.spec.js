const welcomePage = require("../pageObjects/WelcomePage");
const shoppingCartPage = require("../pageObjects/ShoppingCartPage");
const checkoutPage = require("../pageObjects/CheckoutPage");
const orderCompletedPage = require("../pageObjects/OrderCompletedPage")
const checkoutData = require("../data/checkoutData.json");

describe("Place a new Order", function() {

    it("Step 01: Open the Fiori app", async function() {
        await welcomePage.openApplication();
    });

    it("Step 02: Add Item to Shopping Cart", async function() {
        await welcomePage.addItemToCart();
    });

    it("Step 03: Show Shopping Cart", async function() {
        await welcomePage.showCart();
    });

    it("Step 04: Proceed to the Checkout Process", async function() {
        await shoppingCartPage.proceed();
        await checkoutPage.step2();
    });

    it("Step 05: Choose Bank transfer", async function() {
        await checkoutPage.payViaBank();
    });

    it("Step 06: Proceed to Step 4 - Invoice Address", async function() {
        await checkoutPage.step3();
        await checkoutPage.step4();
    });

    it("Step 07: Fill the Invoice Address in", async function() {
        await checkoutPage.enterAddress();
        await checkoutPage.enterCity();
        await checkoutPage.enterZipCode();
        await checkoutPage.enterCountry();
        
    });

    it("Step 08: Proceed to the Order Summary", async function() {
        await checkoutPage.step5();
        await checkoutPage.orderSummary();
    });

    it("Step 09: Submit the Order", async function() {
        await checkoutPage.submitOrder();
    });

    it("Step 10: Get newly created Order ID", async function() {
        await orderCompletedPage.getOrderID();

        // let orderID = rawConfText.substring(
        //     rawConfText.indexOf("Your order number: ") + 19,
        //     rawConfText.lastIndexOf("</strong>")
        // );

        // util.console.log(orderID);
        // const userData = {
        //     "orderConfirmation": orderID
        // };

        // browser.config.params.export.orderConfirmation = userData;

    })

})