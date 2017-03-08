export class Activity {
    startDateTimeUtc: Date;
    endDateTimeUtc: Date;
    type: string;
    name: string;
    speaker: string;
    description: string;
    url: string;
    accessCode: string;
}

export class ActivityTypes {
    speaker: string = 'Speaker Session';
    groupActivity: string = 'Group Activity';
    meal: string = 'Meal Time';
    registration: string = 'Registration/Check-In';
    break: string = 'Break Time'
}