import { test, expect } from '@playwright/test';

var id: string;

test.describe.serial('API CRUD', () => {
  test('API Test - Get', async ({ request }) => {
    const response = await request.get('https://api.restful-api.dev/objects');
    await expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);
  });

  test('API Test - Post', async ({ request }) => {
    const response = await request.post('https://api.restful-api.dev/objects', {
      data: {
        name: "Avinash",
        data: {
          year: 2019,
          price: 1849.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB"
        }
      }
    });
    const responseBody = await response.json();
    id = responseBody.id;
    console.log('id:-', id);
    await expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);
  });

  test('API Test - Put', async ({ request }) => {
    console.log('id:-', id);
    const requestURL = 'https://api.restful-api.dev/objects/' + id;
    console.log('requestURL:-', requestURL);
    const data = {
      name: "Avinash ",
      data: {
        year: 2025,
        price: 2049.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
        color: "silver",
      },
    };
    const response = await request.put(requestURL, { data });
    await expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);
  });

  test('API Test - Patch', async ({ request }) => {
    const requestURL = 'https://api.restful-api.dev/objects/' + id;
    const data = { name: "Avinash Update " };
    const response = await request.patch(requestURL, { data });
    await expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);
  });

  test('API Test - Delete', async ({ request }) => {
    const requestURL = 'https://api.restful-api.dev/objects/' + id;
    const response = await request.delete(requestURL);
    await expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);
  });
});