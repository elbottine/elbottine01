// import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
// import { DialogService } from '../shared/dialog.service';
// import { AccountService } from './account.service';

// @Component({
// 	selector: 'tlx-change-password',
// 	template: `
// <form #form="ngForm">
// 	<div class="card" style="margin: auto; width: 300px;">
// 		<div class="card-body">
//             <h5 class="card-title">Identification</h5>
//             <div class="form-group">
//                 <label>Compte</label>
//                 <input
//                     type="text"
//                     class="form-control"
//                     [(ngModel)]="userId"
//                 />
//             </div>
//             <div class="form-group">
//                 <label>Mot de passe</label>
//                 <input
//                     type="password"
//                     class="form-control"
//                     [(ngModel)]="password"
//                 />
//             </div>
//             <button type="submit" class="btn btn-primary" (click)="tryLogin()">
//                 Login
//             </button>
// 		</div>
// 	</div>
// </form>
// 	`
// })
// export class ChangePasswordComponent {

// 	oldPassword: string;
// 	newPassword1: string;
// 	newPassword2: string;

// 	@Output() closeComponent = new EventEmitter<any>();
// 	@ViewChild('form', { static: true }) form: any;

// 	constructor(
// 		public accountService: AccountService,
// 		private dialogService: DialogService
// 	) {}

// 	update(): void {
// 		this.accountService.changePassword(this.oldPassword, this.newPassword1).subscribe(
// 			r => {
// 				this.dialogService.success('Mot de passe changé');
// 				this.close();
// 			},
// 			r => {
// 				this.dialogService.error('Error lors du changement du mot de passe');
// 				this.oldPassword = null;
// 			}
// 		);
// 	}

// 	close(): void {
// 		this.form.reset();
// 		this.closeComponent.emit();
// 	}

// 	escapeRegExp(text: string): string {
// 		return text && text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
// 	}
// }
