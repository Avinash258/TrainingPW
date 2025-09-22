import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly cartItems: Locator;
    readonly cartTotal: Locator;
    readonly shoppingCartTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('.ico-cart');
        this.cartItems = page.locator('.cart-item-row');
        this.cartTotal = page.locator('.cart-total .product-price');
        this.shoppingCartTable = page.locator('.cart');
    }

    async openCart() {
        await this.cartLink.first().click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.shoppingCartTable).toBeVisible();
    }

    async getCartItems() {
        await expect(this.shoppingCartTable).toBeVisible();
        return await this.cartItems.count();
    }

    async getCartTotal() {
        await expect(this.cartTotal).toBeVisible();
        return await this.cartTotal.innerText();
    }
}