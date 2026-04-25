import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MAT_BUTTON_CONFIG } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from './shared/message-service/message-service';
import { catchError, throwError } from 'rxjs';
import { ConsoleGreetingsService } from './easter-eggs/console-greetings-service/console-greetings-service';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((err) => {

      if (err.status === 422) {
        messageService.showError(err.error?.errorMessage ?? 'Unkown exception');
      }

      return throwError(() => err);
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([apiErrorInterceptor])
    ),
    {
      provide: MAT_BUTTON_CONFIG,
      useValue: {
        defaultAppearance: 'filled',
      }
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      }
    },
    provideAppInitializer(() => {
      const service = inject(ConsoleGreetingsService);
      return service.init();
    })
  ]
};
