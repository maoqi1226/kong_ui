// cypress.config.ts
import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
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
    allowCypressEnv: false,

    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push(
            `--window-size=${this.viewportWidth},${this.viewportHeight}`,
          );
        }
        return launchOptions;
      });
    },
  },
});