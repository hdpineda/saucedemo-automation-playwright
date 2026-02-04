import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // Navega a la URL base de SauceDemo
    async navigate(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    //Realiza el proceso de login   
    async login(user: string, pass: string): Promise<void> {
        await this.usernameInput.fill(user);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
    }

    //Valida la redirección exitosa después del login
    async validateRedirection(expectedPath: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(expectedPath));
    }

    //Valida el mensaje de error de login fallido
    async validateErrorMessage(expectedError: string): Promise<void> {
        await expect(this.errorMessage).toContainText(expectedError);
    }
}