import { browser } from 'k6/browser';
import { check, sleep } from 'k6';

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
      executor: 'constant-vus',
      vus: 1,
      duration: '2s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    const submitButton = await page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    const headerText = await page.locator('h2').textContent();
    check(headerText, {
      header: headerText === 'Welcome, admin!',
    });
  } finally {
    await page.close();
  }
  sleep(1);
}