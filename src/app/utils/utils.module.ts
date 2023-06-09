import { NgModule } from '@angular/core';
import { StringToDatePipe } from './string-to-date.pipe';
import { DateValidator } from './date-validator.directive';
import { SortableTableHeaderDirective } from './sortable-table-header.directive';
import { NumberValidatorDirective } from './number-validator.directive';
import { NumberFormatPipe } from './number-format.pipe';
import { NumbersOnlyDirective } from './numbers-only.directive';

@NgModule({
	declarations: [
		StringToDatePipe,
		DateValidator,
		NumberValidatorDirective,
		NumberFormatPipe,
		SortableTableHeaderDirective,
		NumbersOnlyDirective
	],
	exports: [
		StringToDatePipe,
		DateValidator,
		NumberValidatorDirective,
		NumberFormatPipe,
		SortableTableHeaderDirective,
		NumbersOnlyDirective
	]
})
export class UtilsModule {}
