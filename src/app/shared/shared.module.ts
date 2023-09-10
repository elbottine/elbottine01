import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toasts-container.component';
import { HtmlContentComponent } from './html-content.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CustomAdapter, CustomDateParserFormatter, DateFormatPipe } from './date';

const routes: Routes = [
    { path: 'team',  component: HtmlContentComponent, data: {path: 'assets/html/team.html'} },
    { path: 'store', component: HtmlContentComponent, data: {path: 'assets/html/store.html'} },
    { path: 'contact', component: HtmlContentComponent, data: {path: 'assets/html/contact.html'} },
    { path: 'register', component: HtmlContentComponent, data: {path: 'assets/html/register.html'} }
];

@NgModule({
	declarations: [
		ConfirmationDialogComponent,
        HtmlContentComponent,
        DateFormatPipe
	],
	imports: [
		CommonModule,
		FormsModule,
        NgbModule,
        ToastsContainer,
        RouterModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        ToastsContainer,
        RouterModule,
        DateFormatPipe
	],
    providers: [
        { provide: NgbDateAdapter, useClass: CustomAdapter },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
    ],
})
export class SharedModule {}
