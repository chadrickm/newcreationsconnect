import * as _ from 'underscore';

//import {UtilityService} from '../../_services/_common/utility.service';
import { Activity } from '../Activity';

export class EventSchedule {
    days: EventScheduleDay[]

    constructor(event) {
        this.days = [];

        var activityDateTimes = _.pluck(event.activities, 'startDateTimeGmt');
        var activityDates = _.each(activityDateTimes, activityDateTime => {
            return new Date(activityDateTime.toLocalDateString());
        });
        var distinctDays = _.uniq(activityDates);
        _.each(distinctDays, day => {
            var newDay = new EventScheduleDay();
            newDay.day = day; // this is a js Date - is that what typescript and angular expects?
            newDay.activities = _.filter(event.activities, activity => {
                var firstSecondOfTomorrow = this.addDays(newDay.day, 1);
                return activity.startDateTimeGmt >= newDay.day && activity.startDateTimeGmt < firstSecondOfTomorrow;
            });
            this.days.push(newDay);
        });

        var dateToken: Date = new Date(event.startDate);
        var endDate = new Date(event.endDate);
        while(dateToken <= endDate) {
            var foundEventScheduleDate = _.find(this.days, day => {return new Date(day.day) === dateToken});
            if (!foundEventScheduleDate) {
                var newDay = new EventScheduleDay();
                newDay.day = new Date(dateToken);
                this.days.push(newDay);
            }
            dateToken = this.addDays(dateToken, 1);
        }

        console.log(this.days);
    }

    //TODO: find out how to get the UtilityService.
    private addDays(date: Date, days: number): Date {
        console.log('dateBefore', date)
        date.setDate(date.getDate() + days);
        console.log('dateAfter', date);
        return date;
    }
}

export class EventScheduleDay {
    day: Date;
    activities: Activity[];
}