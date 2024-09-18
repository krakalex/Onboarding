const QmateService = require("@sap_oss/wdio-qmate-service");
const allure = require('allure-commandline')

exports.config = {

  baseUrl: "https://sapui5.hana.ondemand.com/test-resources/sap/m/demokit/cart/webapp/index.html",
    
  maxInstances: 3,

  logLevel: 'warn',
  
  specs: [
    [
      "./specs/01_createNewPO.spec.js",
      "./specs/02_searchByTitle.spec.js",
      "./specs/03_addSevItemsToCart.js"
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

  reporters: [['allure', {
    outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
  },

  onComplete: function() {
    const reportError = new Error('Could not generate Allure report')
    const generation = allure(['generate', 'allure-results', '--clean'])
    return new Promise((resolve, reject) => {
        const generationTimeout = setTimeout(
            () => reject(reportError),
            5000)

        generation.on('exit', function(exitCode) {
            clearTimeout(generationTimeout)

            if (exitCode !== 0) {
                return reject(reportError)
            }

            console.log('Allure report successfully generated')
            resolve()
        })
    })
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