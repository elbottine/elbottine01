import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
//import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  // { path:'login', component:LoginComponent },
];

@NgModule({
    imports: [
        FormsModule,
        //SocialLoginModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        LoginComponent
    ],  
    exports: [
        RouterModule,
        LoginComponent
    ],
})
export class AuthModule { }
