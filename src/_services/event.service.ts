import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import * as moment from 'moment';

import { AlertController } from 'ionic-angular';
import { Database } from '@ionic/cloud-angular';
import { Subject } from 'rxjs/Subject';

import { ValidationResult, ValidationMessageTypes } from '../_services/_common/validation';
import { UtilityService } from '../_services/_common/utility.service';
import { ReplaySubject } from 'rxjs';

import { Event, EventStatuses, EventTypes } from '../_models/Event';
import { Activity } from '../_models/Activity';

@Injectable()
export class EventService {

    eventsDbCollection = this.db.collection("events");
    activeEvents: ReplaySubject<Event[]> = new ReplaySubject<Event[]>();
    draftEvents: ReplaySubject<Event[]> = new ReplaySubject<Event[]>();
    validationResult: ValidationResult = new ValidationResult();
    addedActivity: Activity;
    activityUpdated: boolean = false;

    // used in event-draft-schedule to update the activity list
    activityAddedSubject: Subject<Activity> = new Subject<Activity>();
    activityAdded$ = this.activityAddedSubject.asObservable();

    activityModifiedSubject: Subject<any> = new Subject<any>();
    activityModified$ = this.activityModifiedSubject.asObservable();

    dbStatus: string;

    constructor(
        private alertController: AlertController,
        private db: Database,
        private eventStatuses: EventStatuses,
        private eventTypes: EventTypes,
        private messageTypes: ValidationMessageTypes,
        private util: UtilityService
    ) {
        this.db.status().subscribe(status => {
            this.dbStatus = status.type;
            console.log("subscribe dbStatus: " + this.dbStatus);
            
            if (this.dbStatus !== "connected") {
                var milliseconds = 3000;
                setTimeout(() => {
                    console.log("doing dbStatus check after " + (milliseconds / 1000) + " seconds")
                    if (this.dbStatus !== "connected") {
                        this.showDbWakeUpPrompt();
                    }
                }, milliseconds);
            }
        });
        this.eventsDbCollection
            .findAll(
            { status: this.eventStatuses.active },
            { status: this.eventStatuses.draft },
            { status: this.eventStatuses.review })
            .watch()
            .subscribe(events => {
                this.activeEvents.next(_.filter(events, e => {
                    var event: Event = e;
                    return event.status === this.eventStatuses.active;
                }));
                this.draftEvents.next(_.filter(events, e => {
                    var event: Event = e;
                    var addToDraftList = (event.status === this.eventStatuses.draft || event.status === this.eventStatuses.review);
                    //addToDraftList = event.createdByUsername === 
                    return addToDraftList;
                }));
            });
    }

    saveEvent(event: Event, callback: any) {

        this.validationResult = new ValidationResult();

        // in case this does not default to zero
        if (this.util.isNullOrEmpty(event.lastActivityId)) {
            event.lastActivityId = 0;
        }

        //Convert Local Date to GMT datetime before saving
        event.startDateUtc = moment(event.startDateString).utc().toDate();
        event.startDateString = moment(event.startDateString).toISOString();
        event.endDateUtc = moment(event.endDateString).utc().toDate();
        event.endDateString = moment(event.endDateString).toISOString();

        if (event.activities) {
            _.each(event.activities, a => {
                var activity: Activity = a;
                activity.startDateUtc = moment(activity.startDateString).utc().toDate();
                activity.startDateString = moment(activity.startDateString).toISOString();
                activity.endDateUtc = moment(activity.endDateString).utc().toDate();
                activity.endDateString = moment(activity.endDateString).toISOString();
            })
        }

        this.validateEvent(event, () => {
            if (!this.validationResult.isSuccessful()) callback()
            else {
                try {
                    this.eventsDbCollection.store(event);
                    callback();
                } catch (exception) {
                    this.validationResult.addMessage('There was an error saving event', this.messageTypes.error);
                    callback();
                }
            }
        });

    }

    getEvent(eventId: string) {
        return this.eventsDbCollection.find({ id: eventId }).fetch();
    }

    validateEvent(event: Event, callback: any) {

        if (!this.validationResult) this.validationResult = new ValidationResult();

        if (this.util.isNullOrEmpty(event.status)) {
            this.validationResult.addMessage("Status is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.name)) {
            this.validationResult.addMessage("Name is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.startDateString)) {
            this.validationResult.addMessage("Start Date is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.endDateString)) {
            this.validationResult.addMessage("End Date is Required", this.messageTypes.error);
        }

        if (event.eventType === this.eventTypes.onLocation) {
            if (this.util.isNullOrEmpty(event.address)) {
                this.validationResult.addMessage("Address is Required", this.messageTypes.error);
            }

            if (this.util.isNullOrEmpty(event.city)) {
                this.validationResult.addMessage("City is Required", this.messageTypes.error);
            }

            if (this.util.isNullOrEmpty(event.state)) {
                this.validationResult.addMessage("State is Required", this.messageTypes.error);
            }
        }

        if (callback) {
            callback();
        }
    }

    saveActivity(_eventId: string, _activity: Activity, callback: any) {
        try {
            this.getEvent(_eventId).subscribe(event => {
                if (!this.validationResult) this.validationResult = new ValidationResult();
                this.validateActivity(event, _activity, () => {
                    if (!this.validationResult.isSuccessful()) callback();
                    else {
                        var eventToSave: Event = event;

                        // if activity is a new activity
                        if (this.util.isNullOrEmpty(_activity.activityId)) {
                            var newActivityId = eventToSave.lastActivityId + 1;
                            _activity.activityId = newActivityId;
                            eventToSave.lastActivityId = newActivityId;

                            if (!eventToSave.activities) eventToSave.activities = [];

                            eventToSave.activities.push(_activity);
                            this.addedActivity = _activity;
                        } else {
                            var foundActivity = _.find(eventToSave.activities, a => {
                                var dbActivity: Activity = a;
                                return dbActivity.activityId === _activity.activityId;
                            });

                            if (foundActivity) {
                                var indexOfFound = _.indexOf(eventToSave.activities, foundActivity);
                                eventToSave.activities[indexOfFound] = _activity;
                                this.activityUpdated = true;
                            } else {
                                this.validationResult.addMessage('Could not find Activity: ' + _activity.activityId, this.messageTypes.error);
                                callback();
                            }
                        }

                        this.validateEvent(eventToSave, () => {
                            if (!this.validationResult.isSuccessful()) callback()
                            else {
                                this.saveEvent(eventToSave, callback);
                                if (this.addedActivity) {
                                    this.activityAddedSubject.next(this.addedActivity);
                                }
                                if (this.activityUpdated) {
                                    this.activityModifiedSubject.next();
                                }
                            }
                        })

                    }
                });
            });
        } catch (exception) {
            this.validationResult.addMessage('There was an error saving Activity', this.messageTypes.error);
            callback();
        }
    }

    validateActivity(_event: Event, _activity: Activity, callback: any) {

        if (!this.validationResult) this.validationResult = new ValidationResult();

        if (this.util.isNullOrEmpty(_activity.name)) {
            this.validationResult.addMessage("Name is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(_activity.type)) {
            this.validationResult.addMessage("Type is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(_activity.startDateString)) {
            this.validationResult.addMessage("Start Date is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(_activity.endDateString)) {
            this.validationResult.addMessage("End Date is Required", this.messageTypes.error);
        }

        callback();
    }

    submitEventForReview(_event: Event, callback: any) {

        this.validateEvent(_event, undefined);
        console.log(this.validationResult);

        if (this.validationResult.isSuccessful()) {
            _event.status = this.eventStatuses.review;
            this.saveEvent(_event, callback);
        }

        callback();
    }

    showDbWakeUpPrompt() {
        let prompt = this.alertController.create({
            title: 'Test Database is Asleep',
            message: "The test database is asleep. Attempt to wake it up?",
            buttons: [
                {
                    text: 'Wake It Up',
                    handler: data => {
                        this.db.connect();
                    }
                }
            ]
        });
        prompt.present();
    }
}