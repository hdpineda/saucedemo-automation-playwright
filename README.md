# SauceDemo Automation - Playwright & Cucumber (TS)

Este repositorio contiene la solución a la prueba técnica para el cargo de **Automatizador E2E**. Se implementó una suite de pruebas robusta para el sitio [SauceDemo](https://www.saucedemo.com/) y una serie de consultas relacionales para un sistema de gestión de gimnasios.

## Stack Tecnológico

* **Lenguaje:** TypeScript (Strict Mode)
* **Framework E2E:** [Playwright](https://playwright.dev/)
* **BDD:** [Cucumber.js](https://cucumber.io/)
* **Patrón de Diseño:** Page Object Model (POM)
* **Base de Datos:** SQL (PostgreSQL/MySQL Compatible)

---

## Configuración y Requerimientos

### Gestión de Timeouts y Evidencias
De acuerdo con los requerimientos del reto:
- **Timeouts Globales:** Se configuraron centralizadamente en el objeto `World` mediante `setDefaultTimeout()` y `setDefaultNavigationTimeout()`. No se utilizan esperas fijas (`hard-coded`) en los Page Objects.
- **Video:** Grabación habilitada para el 100% de los escenarios ejecutados, almacenados en `reports/videos/`.
- **Screenshots:** Captura automática **únicamente ante fallos**, con nombres de archivo sanitizados para evitar conflictos de sistema, almacenados en `reports/screenshots/`.

### Calidad de Código
- **TypeScript Estricto:** Tipado completo de parámetros en Steps y Page Objects. Uso nulo de `any`.
- **Selectores:** Uso prioritario de atributos `data-test` para garantizar la estabilidad de los tests.

---

## Escenarios Automatizados

Se implementaron los escenarios bajo el estándar Gherkin con los tags solicitados:

| Tag | Escenario | Descripción |
| :--- | :--- | :--- |
| `@smoke` | Happy Path | Compra completa desde Login hasta Checkout. |
| `@negative @regression` | Login Fallido | Validación de mensaje de error para `locked_out_user`. |
| `@regression` | Data Driven | Uso de `Scenario Outline` para probar con múltiples perfiles de usuario. |

---

## Parte 2: Base de Datos (SQL)

Dentro de la carpeta `/dataBase` se encuentran los scripts de resolución:
1. **DDL:** Creación de tablas con integridad referencial (PKs y FKs).
2. **Queries:** Consultas de negocio que incluyen:
   - Filtros por fechas relativas (`INTERVAL`).
   - Operaciones de conjuntos (`EXCEPT`) para comparar disponibilidad entre ciudades.
   - Manejo de nulos mediante `COALESCE` para reportes de visitas.

---

## Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install

2. **Instalar navegadores de Playwright:**
    ```bash
    npx playwright install chromium

3. **Ejecutar todos los tests:**
    ```bash
    npm test

4. **Ejecutar por tags (ejemplo Smoke):**
    ```bash
    npx cucumber-js --tags "@smoke"

5. **el reporte HTML se genera automáticamente en:**
    reports/cucumber-report.html

## Estructura del Proyecto

El proyecto sigue una arquitectura modular para facilitar el mantenimiento y la escalabilidad:

**features/:** Contiene los archivos .feature escritos en lenguaje Gherkin. Define el comportamiento del sistema desde una perspectiva de negocio.

**src/pages/:** Implementación del patrón Page Object Model (POM). Aquí se centralizan los selectores (usando data-test) y los métodos de interacción con la interfaz de usuario.

**src/steps/:** Definiciones de los pasos. Actúan como puente entre el lenguaje Gherkin y la lógica de los Page Objects. Están organizados por dominio (Login, Checkout).

**src/support/:** Configuración core del framework:

**world.ts:** Gestión de timeouts globales y estado de la prueba.

**hooks.ts:** Ciclo de vida de las pruebas (Setup/Teardown), manejo de evidencias (videos) y lógica de screenshots ante fallos.

**dataBase/:** Contiene los scripts SQL para la creación del esquema (DDL) y las consultas de negocio (DML) solicitadas en la Parte 2 del reto.

**reports/:** Directorio autogenerado que almacena los reportes HTML, capturas de pantalla de errores y grabaciones de video de las ejecuciones.