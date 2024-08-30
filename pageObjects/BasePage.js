class BasePage {
    
    async openApplication() {
        await ui5.navigation.navigateToApplication("");
    }

//     async setReferenceValue(valueName, value) {
//         const references = await browser.config.params.import.references;
//         await common.assertion.expectDefined(references);
//         await common.assertion.expectDefined(references[valueName]);
        
//         references[valueName] = value;
//         browser.config.params.export.references = references;
//     }

//     async getReferenceValue(valueName) {
//         const references = await browser.config.params.import.references;
//         await common.assertion.expectDefined(references);
//         await common.assertion.expectDefined(references[valueName]);
        
//         return references[valueName];
//     }
}

module.exports = BasePage;