import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
	toasts: any[] = [];

	private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
		this.toasts.push({ textOrTpl, ...options });
	}

	remove(toast: any) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}

    success(content: string, title: string = 'Info') {
        this.show(content, { classname: 'bg-success text-light', delay: 10000 });
	}

	error(content: string, title: string = 'Erreur') {
		//this.toastr.error(content, title, { onActivateTick: true, enableHtml: true });
        this.show(content, { classname: 'bg-danger text-light', delay: 15000 });
	}

	warning(content: string, title: string = 'Info') {
        this.show(content, { classname: 'bg-danger text-light', delay: 15000 });
	}

	info(content: string, title: string = 'Info') {
        this.show(content, { classname: 'bg-danger text-light', delay: 15000 });
	}
}