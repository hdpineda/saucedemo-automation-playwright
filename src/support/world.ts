import { setWorldConstructor, World, IWorldOptions, setDefaultTimeout } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';

// Configuramos el timeout global de Cucumber (ej. 30 segundos) 
setDefaultTimeout(30000);

export class CustomWorld extends World {
  debug = false;
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);