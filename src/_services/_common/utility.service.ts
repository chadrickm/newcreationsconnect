import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {
    isNullOrEmpty(value: any): boolean {
        var isNullOrEmpty = false;
        if (value === undefined) isNullOrEmpty = true;
        if (value === null) isNullOrEmpty = true;
        if (value === '') isNullOrEmpty = true;
        return isNullOrEmpty;
    }

    addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }
}