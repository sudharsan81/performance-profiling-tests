import { browser } from 'k6/browser';
import { checks } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import { sleep } from 'k6';

const getCloudConfig = () => {
  // If k6 cloud api token is set in the Env Var K6_CLOUD_API_TOKEN
  // then output will be sent to cloud. Else output to console
  const k6CloudApiToken = __ENV.K6_CLOUD_API_TOKEN;
  let config = undefined;

  if (k6CloudApiToken) {
    config = {
      projectID: 3747395,
      name: 'k6.io basic load test - ci',
    }
  }
  return config;
};
const SAUCE_DEMOPAGE_URL = 'https://www.saucedemo.com/';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 10,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
  cloud: getCloudConfig(),
};

export default async function() {
    const context = await browser.newContext(); 
    const page = await context.newPage();
    console.log('Browser and page created successfully.');

    try {
        await page.goto(SAUCE_DEMOPAGE_URL);

        console.log('Navigated to the login page.');
        await page.locator('input[name="user-name"]').type("standard_user");
        await page.locator('input[name="password"]').type("secret_sauce"); // publicly available. So no harm in using it as 

        console.log('Login into the account.');
        await Promise.all([
            page.waitForNavigation(),
            page.locator('input[type="submit"]').click(),
        ]);

        console.log('Add product to the basket.');
        await sleep(1);
    } catch (error) {
        console.error('An error occurred:', JSON.stringify(error));
    } finally {
        await page.close();
        await context.close();
        console.log('Closed the page and context.');
    }
}