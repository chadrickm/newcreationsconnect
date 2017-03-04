import { Injectable } from '@angular/core';

import { Database } from '@ionic/cloud-angular';
//import { Observable } from 'rxjs';

import { ValidationResult, ValidationMessageTypes } from '../_services/_common/validation';
import { UtilityService } from '../_services/_common/utility.service';
import { ReplaySubject } from 'rxjs';

import { Event } from '../_models/Event';

@Injectable()
export class EventService {

    eventsDbCollection = this.db.collection("events");
    activeEvents: ReplaySubject<Event[]> = new ReplaySubject<Event[]>();

    constructor(
        private db: Database,
        private util: UtilityService,
        private messageTypes: ValidationMessageTypes
    ) {
        this.db.status().subscribe(status => console.log(status));
        this.eventsDbCollection
            .findAll({ status: "Active" })
            .watch()
            .subscribe(activeEvents => {
                this.activeEvents.next(activeEvents);
            });
    }

    saveEvent(event: Event, validationResult: ValidationResult): ValidationResult {

        this.validateEvent(event, validationResult);
        if (!validationResult.isSuccessful()) return validationResult;

        try {
            this.eventsDbCollection.store(event);
        } catch (exception) {
            validationResult.addMessage('There was an error saving event', this.messageTypes.error);
        }

        return validationResult;
    }

    validateEvent(event: Event, validationResult: ValidationResult): ValidationResult {

        if (this.util.isNullOrEmpty(event.status)) {
            validationResult.addMessage("Status is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.name)) {
            validationResult.addMessage("Name is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.startDate)) {
            validationResult.addMessage("Start Date is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.endDate)) {
            validationResult.addMessage("End Date is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.address)) {
            validationResult.addMessage("Address is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.city)) {
            validationResult.addMessage("City is Required", this.messageTypes.error);
        }

        if (this.util.isNullOrEmpty(event.state)) {
            validationResult.addMessage("State is Required", this.messageTypes.error);
        }

        return validationResult;
    }
}