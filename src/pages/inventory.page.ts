import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    private readonly page: Page;
    private readonly cartBadge: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    /**
     * Agrega un producto al carrito por su nombre
     * @param productName Nombre exacto del producto
     */
    async addToCart(productName: string): Promise<void> {
        const productButton = this.page.locator(`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`);
        await productButton.click();
    }

    /**
     * Navega a la página del carrito
     */
    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }
}