import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'xyz-header',
    template: `
<!-- <nav class="navbar navbar-expand-md navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand abs" href="#">Navbar 1</a>
        <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="collapseNavbar">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="//codeply.com">Codeply</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#myAlert" data-bs-toggle="collapse">Link</a>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="" data-bs-target="#myModal" data-bs-toggle="modal">About</a>
                </li>
            </ul>
        </div>
    </div>
</nav> -->

<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark stipes">
    <a class="XXXnavbar-brand" href="#">
        <img src="/assets/logo.png" class="mx-2" style="width:50px;">
        <img src="/assets/logo-text.png" class="mx-2" style="width:200px;">
    </a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

            <li class="nav-item">
                <a class="nav-link m-2" routerLink="home" routerLinkActive="active">Accueil</a>
            </li>

            <li class="nav-item">
                <a class="nav-link m-2" routerLink="blogpost/search" routerLinkActive="active">Evénements</a>
            </li>

            <li class="nav-item">
                <a class="nav-link m-2" routerLink="team" routerLinkActive="active">Contacts</a>
            </li>

            <li class="nav-item" *ngIf="!isLogged">
                <a class="nav-link m-2 text-nowrap" routerLink="" (click)="login()" ngbTooltip="Connexion" placement="bottom">
                    <i class="bi bi-facebook"></i>
                    S'identifier
                </a>
            </li>

            <li class="nav-item" *ngIf="isLogged">
                <a class="nav-link m-2 text-nowrap" routerLink="" (click)="logout()" ngbTooltip="Déconnexion" placement="bottom">
                    <i class="bi bi-person-square"></i>
    	            {{ userName }}
                </a>
            </li>
      </ul>
    </div>
</nav>
	`
})
export class HeaderComponent {

    constructor(private authService: AuthService) {}

    @ViewChild('dropdown', { static: true }) dropdown: any;

    get isLogged(): boolean {
        return this.authService.isLogged;
    }

    get userName(): string {
        return this.authService.user ? this.authService.user.name : "";
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    close() {
        this.dropdown.close();
    }
}
