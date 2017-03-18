import * as _ from 'underscore';
import * as moment from 'moment';

//import {UtilityService} from '../../_services/_common/utility.service';
import { Activity } from '../Activity';
import { Event } from '../../_models/Event';

export class EventSchedule {
    isOneDayEvent: boolean;
    days: EventScheduleDay[];

    constructor(event: Event) {
        this.days = [];

        var dateToken: Date = moment(event.startDateUtc.toISOString()).startOf('day').toDate();
        var endDateToken = moment(event.endDateUtc.toISOString()).toDate();
        while (dateToken <= endDateToken) {

            var newDay = new EventScheduleDay();

            newDay.dayString = moment(dateToken.toISOString()).format('ddd, MMMM Do');
            newDay.dayDate = dateToken;

            var startOfDay = moment(dateToken).startOf('day');
            var endOfDay = moment(dateToken.toISOString()).endOf('day');

            newDay.activities = _.filter(event.activities, a => {
                var activity: Activity = a;
                var mActivityStartDate = moment(activity.startDateString);
                var greaterThanOrEqualToStartOfDay = mActivityStartDate >= startOfDay;
                var lessThanOrEqualToEndOfDay = mActivityStartDate <= endOfDay;
                if (greaterThanOrEqualToStartOfDay && lessThanOrEqualToEndOfDay) {
                    return activity;
                }
            });

            newDay.activities = _.sortBy(newDay.activities, a => {
                var activity: Activity = a;
                var dateTime: Date = activity.startDateUtc;
                return dateTime;
            });

            this.days.push(newDay);

            dateToken = moment(dateToken.toISOString()).add(1, 'day').toDate();
        }

        this.isOneDayEvent = this.days.length === 1;
    }
}

export class EventScheduleDay {
    dayString: string;
    dayDate: Date;
    activities: Activity[];
}