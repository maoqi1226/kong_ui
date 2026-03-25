const { defineConfig } = require("cypress");
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

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "results/reports",
    overwrite: false,
    html: true,
    json: true,
  },

  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: `${process.env.KONG_HOST}:${process.env.KONG_PORT}`,
    allowCypressEnv: true,

    setupNodeEvents(on, config) {
      // const registerGrep = grepPlugin.default || grepPlugin;
      require("@cypress/grep/src/plugin")(config);

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
