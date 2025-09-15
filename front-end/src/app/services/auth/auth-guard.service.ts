import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuardService {
    private readonly keycloak: KeycloakService = inject(KeycloakService);

    async canActivate(): Promise<boolean> {
        const isLoggedIn = this.keycloak.isLoggedIn();
        if (isLoggedIn) {
            return true;
        }
        return false;
    }
}
