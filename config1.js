const QmateService = require("@sap_oss/wdio-qmate-service");

exports.config = {

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
    
  maxInstances: 3,

  logLevel: 'warn',
  
  specs: [
    [
      "./specs/01_createNewPO.spec.js",
      "./specs/02_searchByTitle.spec.js"
    ],
  ],

  framework: 'mocha',
    mochaOpts: {
      timeout: 40000,
      bail: true
    },
  services: [[QmateService], ['chromedriver']],
  
  params: {
    import: {
      data: "./data/",
      references: "./data/orderConfirmation.json"
    },
    export: {
      references: "./data/orderConfirmation.json"
    }
  },
  
  capabilities: [{
    browserName: "chrome",
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
      args: [
        "--output-/dev/null",
        "--log-level-3",
        "--no-sandbox",
        "--disable-search-engine-choice-screen",
        // "--incognito",
        "--ignore-certificate-errors",
        "--window-size-1920,1200",
        "--unftelisted-ios",
        "--disable-dev-shm-usage",
        // "--headless",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-infobars",
        "--disable-extensions",
        "--disable-logging",
        "--lang-en-US"
      ]
    }
  }]
}