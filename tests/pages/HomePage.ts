import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly loginLink: Locator;
    readonly registerLink: Locator;
    readonly logoutLink: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    

    // Define XPath selectors with dynamic capabilities
    private readonly xpathSelectors = {
        link: (type: string) => `//a[contains(@class,'ico-${type}')]`,
        search: {
            input: (id: string = 'small-searchterms') => `//input[@id='${id}']`,
            button: "//button[contains(@class,'search-box-button')]"
        }
    };



    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.locator(this.xpathSelectors.link('login'));
        this.registerLink = page.locator(this.xpathSelectors.link('register'));
        this.logoutLink = page.locator(this.xpathSelectors.link('logout'));
        this.searchInput = page.locator(this.xpathSelectors.search.input());
        this.searchButton = page.locator('//input[@value="Search"]');
     
       
    }




    async clickDynamicMenu(text: string) {
        const menuItem = this.page.locator(this.xpathSelectors.link(text));
        await menuItem.click();
        await this.page.waitForLoadState('networkidle');
  }





    async goto() {
        await this.page.goto('/');
    }

    async clickLoginLink() {
        await this.loginLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickRegisterLink() {
        await this.registerLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickLogoutLink() {
        await this.logoutLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async searchProduct(keyword: string) {
        await this.searchInput.fill(keyword);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async isLogoutVisible() {
        return await this.logoutLink.isVisible();
    }

    async isLoginVisible() {
        return await this.loginLink.isVisible();
    }
}