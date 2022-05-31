/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { GASClient } from 'gas-client';

const { serverFunctions } = new GASClient({
  // this is necessary for local development but will be ignored in production
  allowedDevelopmentDomains: origin =>
    /https:\/\/.*\.googleusercontent\.com$/.test(origin),
});

export { serverFunctions };
