import {ProvideKeycloakOptions} from 'keycloak-angular';
import {environment} from '../../environments/environment';


export const keyCloakInit: ProvideKeycloakOptions = {
  config: {
    url: environment.keycloakApiUrl,
    realm: environment.keycloakRealm,
    clientId: environment.keycloakClientId,
  },
  initOptions: {
    onLoad: 'check-sso',
    checkLoginIframe: false,
    pkceMethod: 'S256',
    // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
  }
};
