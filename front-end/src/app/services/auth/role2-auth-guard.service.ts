import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PocRole } from '@app/models/auth/poc-role';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class Role2AuthGuardService {
    private readonly keycloakService = inject(KeycloakService);
    private readonly router = inject(Router)

    async canActivate(): Promise<boolean> {
        const isLoggedIn = this.keycloakService.isLoggedIn();
        const roles: string[] = this.keycloakService.getUserRoles()

        if (isLoggedIn && roles.indexOf(PocRole.ROLE2) >= 0) {
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }
}
