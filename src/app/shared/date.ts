import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable({ providedIn: 'root' })
export class CustomAdapter extends NgbDateAdapter<string> {
    readonly DELIMITER = '-';

    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            let date = new Date(value);
            return {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            };
        }
        return null;
    }

    toModel(date: NgbDateStruct | null): string | null {
        if (date) {
            let dateObj = new Date(date.year, date.month - 1, date.day);
            return dateObj.toISOString();
        }

        return null;
    }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable({ providedIn: 'root' })
export class CustomDateParserFormatter extends NgbDateParserFormatter {
    readonly DELIMITER = '/';

    parse(value: string): NgbDateStruct | null {
        if (value) {
            let date = new Date(value);
            return {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            };
        }
        return null;
    }

    format(date: NgbDateStruct | null): string {
        return date
            ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
            : '';
    }
}

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe extends DatePipe implements PipeTransform {
    override transform(value: any, args?: any): any {
        if (!value) {
            return '';
        }
        if (args === 'dt' ) {
            return value.replace(/^(\d{4})-(\d{2})-(\d{2})T(.{8}).{5}/, '$3/$2/$1 $4');;
        }
        return value.replace(/^(\d{4})-(\d{2})-(\d{2})T(.{13})/, '$3/$2/$1');;
    }
}

@Pipe({ name: 'dateTimeFormat' })
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
    override transform(value: any, args?: any): any {
        if (!value) {
            return '';
        }
        return value.replace(/^(\d{4})-(\d{2})-(\d{2})T(.{8}).{5}/, '$3/$2/$1 $4');;
    }
}
