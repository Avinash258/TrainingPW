import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { CartPage } from './pages/CartPage';
import { generateUserData, PRODUCTS } from './utils/test-data';


const testUser = generateUserData();
const TEST_PRODUCT = PRODUCTS.HEALTH_BOOK;


test.describe.serial('Demo Web Shop E2E Test Suite', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let homePage: HomePage;
    let registerPage: RegisterPage;
    let loginPage: LoginPage;
    let searchResultsPage: SearchResultsPage;
    let cartPage: CartPage;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
        page = await context.newPage();
        homePage = new HomePage(page);
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage(page);
        searchResultsPage = new SearchResultsPage(page);
        cartPage = new CartPage(page);
        await homePage.goto();
    });

    // Remove beforeEach since we're reusing the same page
    test('TC_REG_001: User Registration', async () => {
        await homePage.clickRegisterLink();
        await registerPage.selectGender(testUser.gender);
        await registerPage.fillRegistrationForm(testUser);
        await registerPage.clickRegisterButton();
        
        //const successMessage = await registerPage.getSuccessMessage();
      //  expect(successMessage).toContain('Your registration completed');
        //expect(await homePage.isLogoutVisible()).toBeTruthy();
        
        // Logout after registration to prepare for next test
        await homePage.clickLogoutLink();
    });

    test('TC_LOG_001: User Login', async () => {
        //await homePage.clickLoginLink();

        await homePage.clickDynamicMenu('login');//click on login link
      //  await homePage.clickDynamicMenu('register');//click on register link
        await loginPage.login(testUser.email, testUser.password);
        
        expect(await homePage.isLogoutVisible()).toBeTruthy();
        await homePage.clickLogoutLink();
    });

    test('TC_SEARCH_001: Product Search', async () => {
        await homePage.searchProduct(TEST_PRODUCT.name);
        
        const resultsCount = await searchResultsPage.getSearchResults();
        expect(resultsCount).toBeGreaterThan(0);
    });

    test('TC_CART_001: Add Product to Cart', async () => {
        // Login first
        await homePage.clickLoginLink();
        await loginPage.login(testUser.email, testUser.password);
        
        // Search and add to cart
        await homePage.searchProduct(TEST_PRODUCT.name);
        await searchResultsPage.addProductToCart(0);
        await cartPage.openCart();
        
        const cartItemsCount = await cartPage.getCartItems();
        expect(cartItemsCount).toBeGreaterThan(0);
    });

    test('TC_LOGOUT_001: User Logout', async () => {
        // We should already be logged in from previous test
        await homePage.clickLogoutLink();
        expect(await homePage.isLoginVisible()).toBeTruthy();
    });

    test.afterAll(async () => {
        await context.close();
        await browser.close();
    });
});