const welcomePage = require("../pageObjects/WelcomePage");
const shoppingCartPage = require("../pageObjects/ShoppingCartPage");

describe("Perform Search Functioanlity", function() {

    it("Step 01: Open the Fiori app", async function() {
        await welcomePage.openApplication();
        await welcomePage.waitForPageOpened();
    });

    it("Step 02: Add Items to Shopping Cart", async function() {
        await welcomePage.addItemsToCart();
    });

    it("Step 03: Show Shopping Cart", async function() {
        await welcomePage.showCart();
        await browser.takeScreenshot();
    });

    it("Step 04: Verify that the Shopping Cart contains only added items", async function() {
        const expectedItemDetails = await welcomePage.getItemDetails();
        await shoppingCartPage.verifyCartItems(expectedItemDetails);
    });
})
