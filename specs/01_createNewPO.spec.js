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
        await shoppingCartPage.proceedToCOut();
    });

    it("Step 05: Complete the Payment Type step", async function() {
        await checkoutPage.moveToPmtTypeStep();
        await checkoutPage.selectPayViaBank();
        await checkoutPage.moveToAccDetailsStep();
    });

    it("Step 06: Proceed to the Invoice Address step", async function() {
        await checkoutPage.moveToInvAddressStep();
    });

    it("Step 07: Fill the Invoice Address data in", async function() {
        await checkoutPage.enterAddress(checkoutData.invoiceAddress.address);
        await checkoutPage.enterCity(checkoutData.invoiceAddress.city);
        await checkoutPage.enterZipCode(checkoutData.invoiceAddress.zipCode);
        await checkoutPage.enterCountry(checkoutData.invoiceAddress.country);
    });

    it("Step 08: Proceed to the Order Summary", async function() {
        await checkoutPage.moveToDlvTypeStep();
        await checkoutPage.moveToOrderSummary();
    });

    it("Step 09: Submit the Order", async function() {
        await checkoutPage.clckSubmitOrder();
    });

    it("Step 10: Verify that the order has been placed successfully", async function() {
        await orderCompletedPage.verifyOrderPlacedSuccessfully();
    });

    it("Step 11: Get newly created Order ID", async function() {
        const orderID = await orderCompletedPage.getOrderID();
        await orderCompletedPage.setReferenceValue("orderID", orderID); 
    })
})