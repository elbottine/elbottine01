import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';
import { SocialLoginModule } from '@abacritt/angularx-social-login';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'profile', component:ProfileComponent }
];

@NgModule({
  imports: [
    SocialLoginModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AuthModule { }
