const welcomePage = require("../pageObjects/WelcomePage");
const productCatalog = require("../pageObjects/ProductCatalog");
const searchData = require("../data/searchData.json");

describe("Perform Search Functioanlity", function() {

    it("Step 01: Open the Fiori app", async function() {
        await welcomePage.openApplication();
    });

    it("Step 02: Enter a value into the Search field", async function() {
        await productCatalog.inputSearchQuery(searchData.searchValue);
    });

    it("Step 03: Verify that the search result contains only searched items", async function() {
        await productCatalog.verifySearchResults(searchData.searchValue);
        await productCatalog.logItemTitles();
    });
})
