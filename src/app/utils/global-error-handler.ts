import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { ToastService } from '../shared/toast-service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {
	constructor(
		@Inject(Injector)
		private injector: Injector,
		private zone: NgZone
	) {
		super();
	}

	private get toastService(): ToastService {
		return this.injector.get(ToastService);
	}

	override handleError(error: any): void {
		error = error.error || error;
        const message = error.ExceptionMessage || error.message || error.Message;
		this.toastService.error(message, 'Erreur technique');
		super.handleError(error);
	}
}
