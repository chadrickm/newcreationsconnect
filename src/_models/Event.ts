import {Activity} from './Activity';

export class Event {
    id: string;
    status: string;
    name: string;
    startDateUtc: Date;
    startDateString: string;
    endDateUtc: Date;
    endDateString: String;
    eventType: string;
    address: string;
    city: string;
    state: string;
    url: string;
    accessCode: string;
    costPerPersonOld: number;
    costPerPersonYoung: number;
    createdByUsername: string;
    createdByDisplayName: string;
    timezoneOffset: number;
    lastActivityId: number;

    activities: Activity[];
}

export class EventTypes {
    online: string = 'Online';
    conferenceCall: string = 'Conference Call'
    inPerson: string = 'In Person';
}