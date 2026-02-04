@saucedemo
Feature: Automatización de flujos en SauceDemo
  Como un usuario de la plataforma SauceDemo
  Quiero realizar compras y validar el acceso
  Para asegurar la calidad del proceso de checkout

  Background: Navegación a la página principal
    Given que el usuario navega a la página de inicio de SauceDemo

  @smoke 
  Scenario: Login válido y compra exitosa
    When ingresa el usuario "standard_user" y la contraseña "secret_sauce"
    And agrega el producto "Sauce Labs Backpack" al carrito
    And completa el proceso de checkout con los datos "Harold", "QA" y "110111"
    Then el sistema debería mostrar el mensaje de confirmación "Thank you for your order!"

  