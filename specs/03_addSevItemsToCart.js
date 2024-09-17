const welcomePage = require("../pageObjects/WelcomePage");
const shoppingCartPage = require("../pageObjects/ShoppingCartPage");
const indexData = require("../data/indexData.json");

describe("Perform Search Functioanlity", function() {
    let expectedItemDetails;

    it("Step 01: Open the Fiori app", async function() {
        await welcomePage.openApplication();
        await welcomePage.waitForPageOpened();
    });

    it("Step 02: Add Promoted Items to Shopping Cart", async function() {
        await welcomePage.addPromoItemsToCartByIndex(indexData.indexes);
        expectedItemDetails = await welcomePage.getItemDetailsByIndex(indexData.indexes);
    });

    it("Step 03: Verify that the Shopping Cart contains only added items", async function() {
        await welcomePage.showCart();
        await welcomePage.waitForPageOpened();
        await browser.takeScreenshot();
        await shoppingCartPage.verifyCartItems(expectedItemDetails);
    });
})
