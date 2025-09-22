import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {}

    async navigateTo(path: string) {
        await this.page.goto(`/${path}`);
    }

    async getElement(selector: string) {
        return this.page.locator(selector);
    }

    async clickElement(selector: string) {
        await this.page.click(selector);
    }

    async fillInput(selector: string, value: string) {
        await this.page.fill(selector, value);
    }

    async getText(selector: string) {
        return await this.page.locator(selector).innerText();
    }
}