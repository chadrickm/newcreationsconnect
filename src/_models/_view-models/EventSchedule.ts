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

        // var activityDateTimes = _.pluck(event.activities, 'startDateUtc');
        // var activityDates = _.each(activityDateTimes, activityDateTime => {
        //     return moment(activityDateTime).utc();
        // });
        // var distinctDays = _.uniq(activityDates);
        // _.each(distinctDays, day => {
        //     var newDay = new EventScheduleDay();
        //     newDay.day = day; // this is a js Date - is that what typescript and angular expects?
        //     newDay.activities = _.filter(event.activities, activity => {
        //         var firstSecondOfTomorrow = this.addDays(newDay.day, 1);
        //         return activity.startDateTimeGmt >= newDay.day && activity.startDateTimeGmt < firstSecondOfTomorrow;
        //     });
        //     this.days.push(newDay);
        // });

        var dateToken: Date = moment(event.startDateUtc.toISOString()).startOf('day').toDate();
        //var dateStringToken: string = moment(event.startDateUtc.toISOString()).format('dddd, MMM Do');
        var endDateToken = moment(event.endDateUtc.toISOString()).toDate();
        while(dateToken <= endDateToken) {
            var newDay = new EventScheduleDay();
            newDay.dayString = moment(dateToken.toISOString()).format('ddd, MMMM Do');
            newDay.dayDate = dateToken;
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