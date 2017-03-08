import { Injectable } from '@angular/core';
import * as moment from 'moment';

import {Event} from '../../_models/Event';

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

    convertEventUtcDatesToTimezoneOffset(event: Event) : Event {
        event.startDateString = moment(event.startDateUtc.toISOString()).format();
        event.endDateString = moment(event.endDateUtc.toISOString()).format();
        return event;
    }
}