import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { SpinnerModule } from './spinner/spinner.module';
import { GlobalErrorHandler } from './utils/global-error-handler';
import { NoCacheInterceptor } from './utils/no-cache-interceptor';
import { BlogpostModule } from './blogpost/module';
import { HomeModule } from './home/module';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { AuthModule } from './auth/module';
import { AuthInterceptorService } from './auth/interceptor';
import { ClubActivityModule } from './club-activity/module';
import { PhotoAlbumModule } from './photo-album/module';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    // { path: '**', redirectTo: 'main/home' }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        SocialLoginModule,
        AuthModule,
        HomeModule,
        BlogpostModule,
        ClubActivityModule,
        PhotoAlbumModule,
        LayoutModule,
        BrowserModule,
        HttpClientModule,
        SpinnerModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterModule,
        RouterModule.forRoot(routes, { useHash: true, enableTracing: false })
    ],
    exports: [
        RouterModule
    ],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: NoCacheInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('3421538238062227')
                    }
                ],
                onError: (err) => {
                    console.error(err);
                }
            } as SocialAuthServiceConfig,
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
        // Use a custom replacer to display function names in the route configs
        //const replacer = (key: any, value: any) => (typeof value === 'function') ? value.name : value;
        //console.log('>>> Routes: ', JSON.stringify(router.config, replacer, 2));
    }
}
