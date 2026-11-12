import { defineConfig } from 'cypress';
import { setupNodeEvents } from './src/plugins/setupNodeEvents';

/**
 * Shared configuration. Environment-specific files (e.g. cypress.ci.config.ts)
 * import this object and override only what is different.
 */
export const baseConfig = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    // Only automated (@run) features are picked up; manual (@manual) ones live in src/e2e/features
    specPattern: 'src/e2e/automatedFeatures/**/*.feature',
    supportFile: 'src/support/e2e.ts',
    fixturesFolder: 'src/fixtures',
    screenshotsFolder: 'reports/screenshots',
    videosFolder: 'reports/videos',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents,
  },
});

export default baseConfig;
