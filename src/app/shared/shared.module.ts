import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toasts-container.component';

@NgModule({
	declarations: [
		ConfirmationDialogComponent, 
	],
	imports: [
        CommonModule,
        NgbModule,
        ToastsContainer
    ],
    exports: [
        ToastsContainer
	]
})
export class SharedModule {}
