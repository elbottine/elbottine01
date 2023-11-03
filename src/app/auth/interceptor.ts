import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, } from "@angular/common/http";
import { Observable } from "rxjs";
import { AccountService } from '../auth/account.service';

@Injectable({
    providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
    
    constructor(private accountService: AccountService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.accountService.isLogged) {
            const clonedRequest = req.clone({
                headers: req.headers
                .set("X-Custom-Authorization", this.accountService.userInfo.token)
            });
            return next.handle(clonedRequest);
        } else {
            return next.handle(req);
        }
    }
}
