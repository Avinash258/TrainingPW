import { expect, type Locator, type Page } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly genderMaleRadio: Locator;
    readonly genderFemaleRadio: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly successMessage: Locator;

    // Define XPath selectors with dynamic capabilities
    private readonly xpathSelectors = {
        gender: (type: 'male' | 'female') => `//input[@id='gender-${type}']`,
        input: (id: string) => `//input[@id='${id}']`,
        button: (id: string) => `//input[@id='${id}']`,
        message: "//div[contains(@class,'result')]"
    };

    constructor(page: Page) {
        this.page = page;
        this.genderMaleRadio = page.locator(this.xpathSelectors.gender('male'));
        this.genderFemaleRadio = page.locator(this.xpathSelectors.gender('female'));
        this.firstNameInput = page.locator(this.xpathSelectors.input('FirstName'));
        this.lastNameInput = page.locator(this.xpathSelectors.input('LastName'));
        this.emailInput = page.locator(this.xpathSelectors.input('Email'));
        this.passwordInput = page.locator(this.xpathSelectors.input('Password'));
        this.confirmPasswordInput = page.locator(this.xpathSelectors.input('ConfirmPassword'));
        this.registerButton = page.locator(this.xpathSelectors.button('register-button'));
        this.successMessage = page.locator(this.xpathSelectors.message);
    }

    async selectGender(gender: 'male' | 'female') {
        const radioButton = gender === 'male' ? this.genderMaleRadio : this.genderFemaleRadio;
        await radioButton.click();
    }

    async fillRegistrationForm(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.emailInput.fill(userData.email);
        await this.passwordInput.fill(userData.password);
        await this.confirmPasswordInput.fill(userData.password);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getSuccessMessage() {
        await expect(this.successMessage).toBeVisible();
        return await this.successMessage.innerText();
    }
}