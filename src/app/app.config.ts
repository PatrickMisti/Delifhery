import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from '../core/utilities/auth-interceptor';
import {baseUrlInterceptor} from '../core/utilities/baseurl-interceptor';
import {provideKeycloak} from 'keycloak-angular';
import {keyCloakInit} from '../core/utilities/key-cloak-init';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([baseUrlInterceptor, authInterceptor])
    ),
    provideKeycloak(keyCloakInit)
  ]
};
