import { Before, After, Status } from '@cucumber/cucumber';
import { chromium, Browser } from '@playwright/test';
import { CustomWorld } from './world';

let browser: Browser;

Before(async function (this: CustomWorld) {

    // Inicialización del navegador
    browser = await chromium.launch({ headless: true });
    
    
    this.context = await browser.newContext({
        recordVideo: {
            dir: 'reports/videos/',
        }
    });
    
    this.page = await this.context.newPage();
    
    // Configuración de Timeouts de navegación globales
    this.page.setDefaultNavigationTimeout(30000);
});

After(async function (this: CustomWorld, scenario) {
    if (this.page && this.context) {
        // Evidencia: Screenshot automático solo si el test falla
        if (scenario.result?.status === Status.FAILED) {
            const scenarioName = scenario.pickle.name;
            const screenshotPath = `reports/screenshots/${sanitizeName(scenarioName)}.png`;
            
            const image = await this.page.screenshot({ 
                path: screenshotPath, 
                fullPage: true 
            });
            
            // Adjuntar al reporte de Cucumber
            await this.attach(image, 'image/png');
        }

        await this.page.close();
        await this.context.close();
    }
    await browser.close();
});

// Función de sanitización para nombres de archivos 
 
function sanitizeName(name: string): string {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}