const welcomePage = require("../pageObjects/WelcomePage");
const shoppingCartPage = require("../pageObjects/ShoppingCartPage");

describe("Perform Search Functioanlity", function() {
    let expectedItemDetails = [];

    it("Step 01: Open the Fiori app", async function() {
        await welcomePage.openApplication();
        await welcomePage.waitForPageOpened();
    });

    it("Step 02: Add Promoted Items to Shopping Cart", async function() {
        const index = 1;
        await welcomePage.addPromoItemsToCartByIndex(index);
        expectedItemDetails.push(await welcomePage.getItemDetailsByIndex(index));
    });

    it("Step 03: Verify that the Shopping Cart contains only added items", async function() {
        await welcomePage.showCart();
        await welcomePage.waitForPageOpened();
        await browser.takeScreenshot();
        await shoppingCartPage.verifyCartItems(expectedItemDetails);
    });
})
