import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class UserInfo {

	public constructor(init?: Partial<UserInfo>) {
		Object.assign(this, init);
	}

	name: string;
	reader: boolean;
	editor: boolean;
	token: string;

	get canEdit() {
		return this.editor;
	}

	get canRead() {
		return this.reader || this.editor;
	}
}

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private url = 'api/account/';
	private _userInfo: UserInfo;

	constructor(private httpClient: HttpClient) {
        this._userInfo = new UserInfo();   
    }

	get userInfo(): UserInfo {
		// if (!this._userInfo) {
		// 	this._userInfo = this.restoreUserInfo();
		// }
		return this._userInfo;
	}

	set userInfo(value: UserInfo) {
		this._userInfo = value;
		//this.saveUserInfo(value);
	}

	get isLogged(): boolean {
		// const now = new Date().toISOString();
		// return this.userInfo.expirationTimeStamp > now;
		return this._userInfo && !!this._userInfo.token; 
    }

	login(userId: string, password: string): Observable<any> {
		return this.httpClient
			.post<UserInfo>(this.url + 'login', {
				userId: userId,
				password: password
			})
			.pipe(tap(u => this.userInfo = new UserInfo(u)));
	}

	logout(): Observable<any> {
        this.userInfo = undefined;
        return of(null);
		// return this.httpClient
		// 	.post(this.url + 'logout', {})
		// 	.pipe(tap(x => {
		// 		this.userInfo = undefined;
		// 	}));
	}

    // private restoreUserInfo(): UserInfo {
	// 	const json = localStorage.getItem('UserInfo');
	// 	return json ? new UserInfo(JSON.parse(json)) : null;
	// }

	// private saveUserInfo(userInfo: UserInfo): void {
	// 	const value = userInfo ? JSON.stringify(userInfo) : null;
	// 	localStorage.setItem('UserInfo', value);
	// }
}
