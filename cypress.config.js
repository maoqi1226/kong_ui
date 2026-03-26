const { defineConfig } = require("cypress");
const installLogsPrinter = require("cypress-terminal-report/src/installLogsPrinter");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  viewportWidth: 1500,
  viewportHeight: 1200,

  screenshotsFolder: "results/screenshots",
  videosFolder: "results/videos",

  video: false,
  videoCompression: 32,
  trashAssetsBeforeRuns: true,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "results/reports",
    overwrite: true,
    html: true,
    json: false,
    embeddedScreenshots: true, // screenshot embedded in report html
    inlineAssets: true, // report html can be opened independently
  },

  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: `${process.env.KONG_HOST}:${process.env.KONG_PORT}`,
    allowCypressEnv: true,

    setupNodeEvents(on, config) {
      require("@cypress/grep/src/plugin")(config); // grep plugin for filter test
      installLogsPrinter(on, { printLogsToConsole: "onFail" }); // show log
      require("cypress-mochawesome-reporter/plugin")(on);
      // browser launch config
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push(
            `--window-size=${config.viewportWidth},${config.viewportHeight}`,
          );
        }
        return launchOptions;
      });

      return config;
    },
  },
});
