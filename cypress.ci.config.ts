import { defineConfig } from 'cypress';
import { baseConfig } from './cypress.config';

/**
 * CI configuration: same tests, CI-specific settings.
 * Add one file like this per environment (e.g. cypress.staging.config.ts)
 * and change baseUrl / env values there.
 */
export default defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    retries: {
      runMode: 1, // one retry in CI; retried tests are reviewed, not ignored
      openMode: 0,
    },
    numTestsKeptInMemory: 5,
    env: {
      environmentName: 'ci',
    },
  },
});
