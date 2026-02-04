import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login.page';
import { CustomWorld } from '../support/world';

// Step definition para la navegación inicial.
 Given('que el usuario navega a la página de inicio de SauceDemo', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.navigate();
});

//Step parametrizado para el ingreso de credenciales. 
When('ingresa el usuario {string} y la contraseña {string}', async function (this: CustomWorld, user: string, pass: string) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.login(user, pass);
});

//Validación de redirección exitosa. 
Then('el usuario debería ser redirigido a la página de inventario {string}', async function (this: CustomWorld, expectedPath: string) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.validateRedirection(expectedPath);
});

//Validación de mensajes de error para escenarios negativos.
Then('debería visualizarse el mensaje de error {string}', async function (this: CustomWorld, expectedError: string) {
    const loginPage = new LoginPage(this.page!);
    await loginPage.validateErrorMessage(expectedError);
});