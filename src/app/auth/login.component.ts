import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast-service';
import { AccountService } from './account.service';

@Component({
    selector: 'xyz-login',
	template: `
<div class="card" style="width: 200px;">
    <div class="card-body">
        <h5 class="card-title">Identification</h5>
        <div class="form-group m-2">
            <label>Compte</label>
            <input
                type="text"
                class="form-control"
                [(ngModel)]="userId"
            />
        </div>
        <div class="form-group m-2">
            <label>Mot de passe</label>
            <input
                type="password"
                class="form-control"
                [(ngModel)]="password"
            />
        </div>
        <div class="form-group m-2">
            <button type="submit" class="btn btn-primary" (click)="tryLogin()">
                Login
            </button>
        </div>
    </div>
</div>`
})
export class LoginComponent {

	userId: string;
	password: string;

	constructor(
		private accountService: AccountService,
		private toastService: ToastService,
		private router: Router
	) {}

    @Output() closeComponent = new EventEmitter<any>();
    
	tryLogin() {
		this.accountService.login(this.userId, this.password).subscribe(
			r => {
                this.close();
				this.router.navigateByUrl('/');
			},
			e => {
                this.close();
				this.toastService.error('Compte ou mot de passe incorrect');
			}
		);
	}

    close(): void {
		this.closeComponent.emit();
	}
}
