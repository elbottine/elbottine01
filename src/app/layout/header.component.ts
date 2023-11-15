import { Component, ViewChild } from '@angular/core';
import { AccountService } from '../auth/account.service';

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

<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark stipes">
    <a class="XXXnavbar-brand" href="#">
        <img src="/assets/logo.png" class="mx-2" style="width:50px;">
        <img src="/assets/logo-text.png" class="mx-2" style="width:200px;">
    </a>
    <!-- <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto"> -->

    <button type="button" class="navbar-toggler m-2" (click)="collapsed = !collapsed">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse colapse" [class.collapse]="collapsed" id="navbarContent">
        <ul class="navbar-nav ms-auto">

            <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <a class="nav-link m-2" routerLink="home" routerLinkActive="active">Accueil</a>
            </li>

            <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                <a class="nav-link m-2" routerLink="blogpost/search" routerLinkActive="active">Evénements</a>
            </li>

            <li class="nav-item" ngbDropdown data-toggle="collapse" data-target=".navbar-collapse.show">
                <a class="nav-link m-2" ngbDropdownToggle role="button" routerLinkActive="active">Notre CLUB</a>
                <ul ngbDropdownMenu>
                    <li><a ngbDropdownItem routerLink="club-activity/search" routerLinkActive="active">Activités</a></li>
                    <li><a ngbDropdownItem routerLink="photo-album/search" routerLinkActive="active">Photos</a></li>
                    <li><a ngbDropdownItem routerLink="team" routerLinkActive="active">L'équipe</a></li>
                    <li><a ngbDropdownItem routerLink="store" routerLinkActive="active">Boutique</a></li>
                    <li><a ngbDropdownItem routerLink="register" routerLinkActive="active">Inscription</a></li>
                    <li><a ngbDropdownItem routerLink="contact" routerLinkActive="active">Nous Contacter</a></li>
                    <li><a ngbDropdownItem href="https://www.facebook.com/groups/373720320310075/"><i class="bi bi-facebook"></i> Facebook</a></li>
                </ul>                
            </li>

<!-- 
* Accueil
* Agenda/Programmes
* Souvenirs
* Notre CLUB
	* Notre Equipe
	* Dans la rubrique :Nous contacter
	* formulaire d’inscription
	* Notre boutique
	* Liens utiles
		FFBMP
		ADEPS
		Wandelsport Vlanderen
		Météo

	Clubs amis
	Suivez l’actualité sur facebook
-->

            <!-- <li class="nav-item" *ngIf="!isLogged">
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
            </li> -->

			<li class="nav-item" *ngIf="!isLogged">
				<div class="d-inline-block" ngbDropdown display="dynamic" placement="bottom-right" #dropdown="ngbDropdown">
					<a class="nav-link m-2" ngbDropdownAnchor (click)="dropdown.toggle();">
                        <i class="bi bi-box-arrow-in-right"></i>
						Se connecter
					</a>
					<div class="p-0" ngbDropdownMenu>
						<xyz-login (closeComponent)="dropdown.close()">
						</xyz-login>
					</div>
				</div>
			</li>

			<li class="nav-item" *ngIf="isLogged">
				<a class="nav-link m-2" routerLink="" (click)="logout()" ngbTooltip="Déconnexion" placement="bottom">
                    <i class="bi bi-person-circle"></i>
                    {{ userName }}
                    &nbsp;
                    <i class="bi bi-box-arrow-right"></i>
				</a>
			</li>
		</ul>
    </div>
</nav>
	`
})
export class HeaderComponent {

    constructor(private accountService: AccountService) {}

    collapsed = true;

    @ViewChild('dropdown', { static: true }) dropdown: any;

    get isLogged(): boolean {
        return this.accountService.isLogged;
    }

    get userName(): string {
        return this.accountService.userInfo ? this.accountService.userInfo.name : "";
    }

    // login() {
    //     this.accountService.login();
    // }

    logout() {
        this.accountService.logout();
    }

    close() {
        this.dropdown.close();
    }
}
