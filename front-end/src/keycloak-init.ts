import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: '/auth',
                realm: 'oauth2-keycloak-angular',
                clientId: 'oauth2-keycloak-angular-client',
            },
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: false,
            },
            enableBearerInterceptor: true
        });
}
