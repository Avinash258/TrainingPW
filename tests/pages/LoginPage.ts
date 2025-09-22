import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginForm: Locator;

    // Define XPath selectors with dynamic capabilities
    private readonly xpathSelectors = {
        email: (id: string = 'Email') => `//input[@id='${id}']`,
        password: (id: string = 'Password') => `//input[@id='${id}']`,
        loginButton: "//input[contains(@class,'login-button')]",
        loginForm: "//form[@action='/login']"
    };

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator(this.xpathSelectors.email());
        this.passwordInput = page.locator(this.xpathSelectors.password());
        this.loginButton = page.locator(this.xpathSelectors.loginButton);
        this.loginForm = page.locator(this.xpathSelectors.loginForm);
    }

    // Get input field by dynamic ID
    private async getInputField(fieldType: 'email' | 'password', customId?: string): Promise<Locator> {
        const selector = fieldType === 'email' 
            ? this.xpathSelectors.email(customId)
            : this.xpathSelectors.password(customId);
        return this.page.locator(selector);
    }

    async login(email: string, password: string, customIds?: { emailId?: string; passwordId?: string }) {
        const emailField = await this.getInputField('email', customIds?.emailId);
        const passwordField = await this.getInputField('password', customIds?.passwordId);

        await emailField.fill(email);
        await passwordField.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}