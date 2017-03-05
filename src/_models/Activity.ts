export class Activity {
    startDateTimeGmt: Date;
    endDateTimeGmt: Date;
    type: string;
    name: string;
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