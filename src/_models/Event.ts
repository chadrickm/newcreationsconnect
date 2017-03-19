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
    onLocation: string = 'On Location';

    all: string[] = [this.onLocation, this.online];
}

export class EventStatuses {
    draft: string = 'Draft';
    review: string = 'Review';
    active: string = 'Active';
    archived: string = 'Archived';
}