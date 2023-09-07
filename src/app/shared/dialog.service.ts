import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ToastService } from './toast-service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

	constructor(private modalService: NgbModal, private toastService: ToastService) {}

	confirm(
		title: string,
		message: string,
		btnOkText: string = 'Oui',
		btnCancelText: string = 'Non',
		dialogSize: 'sm' | 'lg' = 'sm'
	): Promise<any> {
		const modalRef = this.modalService.open(ConfirmationDialogComponent, {
			size: dialogSize,
			backdrop: 'static'
		});
		modalRef.componentInstance.title = title;
		modalRef.componentInstance.message = message;
		modalRef.componentInstance.btnOkText = btnOkText;
		modalRef.componentInstance.btnCancelText = btnCancelText;
		return modalRef.result.catch((error) => {
			if (error) {
				console.error(error);
			}
			return false;
		});
	}

	// success(content: string, title: string = 'Info') {
	// 	//this.toastr.success(content, title);
    //     this.toastService.show(content, { classname: 'bg-success text-light', delay: 10000 });
	// }

	// error(content: string, title: string = 'Erreur') {
	// 	//this.toastr.error(content, title, { onActivateTick: true, enableHtml: true });
    //     this.toastService.show(content, { classname: 'bg-danger text-light', delay: 15000 });
	// }

	// warning(content: string, title: string = 'Info') {
    //     this.toastService.show(content, { classname: 'bg-danger text-light', delay: 15000 });
	// }

	// info(content: string, title: string = 'Info') {
    //     this.toastService.show(content, { classname: 'bg-danger text-light', delay: 15000 });
	// }
}
