import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MAT_BUTTON_CONFIG } from '@angular/material/button';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: MAT_BUTTON_CONFIG,
      useValue: {
        defaultAppearance: 'filled'
      }
    }
  ]
};
