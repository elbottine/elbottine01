import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../auth/account.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService {

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean | Observable<boolean>{
    return this.accountService.isLogged;
  }
  
  constructor(private accountService: AccountService) { }
}
