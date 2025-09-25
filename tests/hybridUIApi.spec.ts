import { test, expect, Page, request as playwrightRequest } from '@playwright/test';

test.describe('Hybrid API-UI Tests for Demo Web Shop', () => {
    let testUser: any;
    test.beforeEach(async () => {
        testUser = {
            email: `test${Date.now()}@example.com`,
            password: 'Test@123',
            firstName: 'Test',
            lastName: 'User',
            gender: 'male'
        };
    });

    test('Register via API and Login via UI', async ({ browser }) => {
        // Create a new context and page for token and cookies
        const context = await browser.newContext();
        const page = await context.newPage();
        // Step 1: Get verification token and cookies
        await page.goto('https://demowebshop.tricentis.com/register');
        const verificationToken = await page.locator('input[name="__RequestVerificationToken"]').inputValue();
       // const cookies = await context.cookies();
      
      
        // Step 2: Register using API with cookies and headers
        const apiRequestContext = await playwrightRequest.newContext({
            baseURL: 'https://demowebshop.tricentis.com',
            extraHTTPHeaders: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Referer': 'https://demowebshop.tricentis.com/register',
              //  'Cookie': cookies.map(c => `${c.name}=${c.value}`).join('; ')
            }
        });
        const registerResponse = await apiRequestContext.post('/register', {
            form: {
                Gender: testUser.gender === 'male' ? 'M' : 'F',
                FirstName: testUser.firstName,
                LastName: testUser.lastName,
                Email: testUser.email,
                Password: testUser.password,
                ConfirmPassword: testUser.password,
                __RequestVerificationToken: verificationToken
            }
        });
        expect([200, 302]).toContain(registerResponse.status());
        console.log('API Response Status:', registerResponse.status());
        console.log('User Email:', testUser.email);
        console.log('User Password:', testUser.password);
        await page.waitForTimeout(5000);



        //================================================================
        // Step 3: Login using UI
        await page.goto('https://demowebshop.tricentis.com/login');
        await page.fill('#Email', testUser.email);
        await page.fill('#Password', testUser.password);
        await page.click('input.login-button');
await page.waitForTimeout(5000);
        // Verify successful login
        await expect(page.locator('.header .account')).toContainText(testUser.email);
        await expect(page.locator('.ico-logout')).toBeVisible();
await page.waitForTimeout(5000);
        await apiRequestContext.dispose();
        await context.close();
    });
});