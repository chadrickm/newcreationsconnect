import { Injectable } from '@angular/core';
import * as _ from 'underscore';
import * as moment from 'moment';

import { Database } from '@ionic/cloud-angular';
import { Subject } from 'rxjs/Subject';

import { ValidationResult, ValidationMessageTypes } from '../_services/_common/validation';
import { UtilityService } from '../_services/_common/utility.service';
import { ReplaySubject } from 'rxjs';

import { Event } from '../_models/Event';
import { Activity } from '../_models/Activity';

@Injectable()
export class EventService {

    eventsDbCollection = this.db.collection("events");
    activeEvents: ReplaySubject<Event[]> = new ReplaySubject<Event[]>();
    draftEvents: ReplaySubject<Event[]> = new ReplaySubject<Event[]>();
    validationResult: ValidationResult = new ValidationResult();
    addedActivity: Activity;
    private activityAddedSubject: Subject<Activity> = new Subject<Activity>();
    addedActivity$ = this.activityAddedSubject.asObservable();

    constructor(
        private db: Database,
        private util: UtilityService,
        private messageTypes: ValidationMessageTypes
    ) {
        this.db.status().subscribe(status => console.log(status));
        this.eventsDbCollection
            .findAll({ status: "Active" }, { status: "Draft" })
            .watch()
            .subscribe(events => {
                this.activeEvents.next(_.filter(events, event => {
                    return event.status === 'Active';
                }));
                this.draftEvents.next(_.filter(events, event => {
                    return event.status === 'Draft';
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

        if (this.util.isNullOrEmpty(event.address)) {
            this.validationResult.addMessage("Address is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.city)) {
            this.validationResult.addMessage("City is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.state)) {
            this.validationResult.addMessage("State is Required", this.messageTypes.error);
        }

        callback();
    }

    saveActivity(_eventId: string, _activity: Activity, callback: any) {
        try {
            this.getEvent(_eventId).subscribe(event => {
                if (!this.validationResult) this.validationResult = new ValidationResult();
                this.validateActivity(event, _activity, () => {
                    if (!this.validationResult.isSuccessful()) callback()
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
}