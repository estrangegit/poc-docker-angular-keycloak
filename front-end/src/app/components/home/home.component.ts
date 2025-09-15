import { Component, inject, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        PanelModule
    ],
    standalone: true
})
export class HomeComponent implements OnInit {
    private readonly keycloak: KeycloakService = inject(KeycloakService);
    login: string = null;

    async ngOnInit() {
        await this.keycloak.loadUserProfile();
        this.login = this.keycloak.getUsername();
    }
 }
