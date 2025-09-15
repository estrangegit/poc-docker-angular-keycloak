import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { Location } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from '@app/app.routes';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { MessageService } from 'primeng/api';
import { initializeKeycloak } from 'src/keycloak-init';
import { ErrorInterceptor } from './interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService]
        },
        importProvidersFrom(KeycloakAngularModule),
        Location,
        MessageService,
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withHashLocation()),
        provideAnimations(),
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        provideHttpClient(withInterceptorsFromDi()),
    ]
};
