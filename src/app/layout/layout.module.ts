import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '../auth/module';

@NgModule({
	imports: [
        CommonModule,
        AuthModule,
        RouterModule,
        NgbModule
    ],
	declarations: [
        HeaderComponent,
    ],
	exports: [
        HeaderComponent
    ]
})
export class LayoutModule {}
