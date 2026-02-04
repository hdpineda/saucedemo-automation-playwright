import { When, Then } from '@cucumber/cucumber';
import { InventoryPage } from '../pages/inventory.page';
import { CheckoutPage } from '../pages/checkout.page';
import { CustomWorld } from '../support/world';

When('agrega el producto {string} al carrito', async function (this: CustomWorld, productName: string) {
    const inventoryPage = new InventoryPage(this.page!);
    await inventoryPage.addToCart(productName);
    await inventoryPage.goToCart();
});

When('completa el proceso de checkout con los datos {string}, {string} y {string}', 
async function (this: CustomWorld, first: string, last: string, zip: string) {
    const checkoutPage = new CheckoutPage(this.page!);
    await checkoutPage.startCheckout();
    await checkoutPage.fillInformation(first, last, zip);
    await checkoutPage.finishOrder();
});

Then('el sistema debería mostrar el mensaje de confirmación {string}', async function (this: CustomWorld, message: string) {
    const checkoutPage = new CheckoutPage(this.page!);
    await checkoutPage.validateConfirmation(message);
});