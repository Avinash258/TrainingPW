import { expect, type Locator, type Page } from '@playwright/test';

export class SearchResultsPage {
    readonly page: Page;
    readonly productItems: Locator;
    readonly addToCartButtons: Locator;
    readonly searchResultMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productItems = page.locator('.product-item');
        this.addToCartButtons = page.locator('.button-2.product-box-add-to-cart-button');
        this.searchResultMessage = page.locator('.search-results .products-wrapper');
    }

    async getSearchResults() {
        await expect(this.productItems).toBeVisible();
        return await this.productItems.count();
    }

    async addProductToCart(index: number = 0) {
        const buttons = await this.addToCartButtons.all();
        if (buttons.length > index) {
            await expect(buttons[index]).toBeVisible();
            await buttons[index].click();
            await this.page.waitForLoadState('networkidle');
        }
    }
}