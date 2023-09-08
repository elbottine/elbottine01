import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toasts-container.component';
import { HtmlContentComponent } from './html-content.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'team',  component: HtmlContentComponent, data: {path: 'assets/html/team.html'} },
    { path: 'store', component: HtmlContentComponent, data: {path: 'assets/html/store.html'} },
    { path: 'contact', component: HtmlContentComponent, data: {path: 'assets/html/contact.html'} },
    { path: 'register', component: HtmlContentComponent, data: {path: 'assets/html/register.html'} }
];

@NgModule({
	declarations: [
		ConfirmationDialogComponent,
        HtmlContentComponent
	],
	imports: [
		CommonModule,
		FormsModule,
        CommonModule,
        NgbModule,
        ToastsContainer,
        RouterModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        ToastsContainer,
        RouterModule
	]
})
export class SharedModule {}
