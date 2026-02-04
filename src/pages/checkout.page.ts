import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    private readonly page: Page;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly completeHeader: Locator;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('.complete-header');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async startCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async fillInformation(first: string, last: string, zip: string): Promise<void> {
        await this.firstNameInput.fill(first);
        await this.lastNameInput.fill(last);
        await this.zipCodeInput.fill(zip);
        await this.continueButton.click();
    }

    async finishOrder(): Promise<void> {
        await this.finishButton.click();
    }

    async validateConfirmation(message: string): Promise<void> {
        await expect(this.completeHeader).toHaveText(message);
    }
}