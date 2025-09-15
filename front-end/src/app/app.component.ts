import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '@app/components/spinner/spinner.component';
import { KeycloakService } from 'keycloak-angular';
import { MenuItem, PrimeIcons, PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { PocRole } from './models/auth/poc-role';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        SpinnerComponent,
        ToastModule,
        RouterOutlet,
        MenubarModule,
        PrimeTemplate,
        Button,
        NgIf
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    private readonly keycloak: KeycloakService = inject(KeycloakService);
    private readonly router = inject(Router);

    isAuthSub: Subscription;
    items: MenuItem[] | undefined;
    showMenuBar: boolean;

    homeMenuItem: MenuItem = {
        label: 'home',
        icon: PrimeIcons.HOME,
        routerLink: ['/home'],
        visible: true
    };
    role1MenuItem: MenuItem = {
        label: 'role1',
        icon: PrimeIcons.CARET_UP,
        routerLink: ['/role1'],
        visible: true
    };
    role2MenuItem: MenuItem = {
        label: 'role2',
        icon: PrimeIcons.CHEVRON_CIRCLE_UP,
        routerLink: ['/role2'],
        visible: true
    };
    vehicleMenuItem: MenuItem = {
        label: 'vehicle',
        icon: PrimeIcons.CAR,
        routerLink: ['/vehicles'],
        visible: true
    };

    ngOnInit() {
        this.role1MenuItem.visible = this.keycloak.getUserRoles().indexOf(PocRole.ROLE1) >= 0;
        this.role2MenuItem.visible = this.keycloak.getUserRoles().indexOf(PocRole.ROLE2) >= 0;
        this.vehicleMenuItem.visible = this.keycloak.getUserRoles().indexOf(PocRole.ROLE1) >= 0;
        this.items = [this.homeMenuItem, this.role1MenuItem, this.role2MenuItem, this.vehicleMenuItem];
    }

    logout() {
        this.keycloak.logout();
    }
}
