import { Injectable } from '@angular/core';

import { Database } from '@ionic/cloud-angular';

import { ValidationResult, ValidationMessageTypes } from '../_services/_common/validation';
import { UtilityService } from '../_services/_common/utility.service';

import { Event } from '../_models/Event';

@Injectable()
export class EventService {

    eventsDbCollection = this.db.collection("events");

    constructor(
        private db: Database,
        private util: UtilityService,
        private messageTypes: ValidationMessageTypes,
        //private validationService: ValidationService
    ) { }

    saveEvent(event: Event, validationResult: ValidationResult): ValidationResult {

        this.validateEvent(event, validationResult);
        if (!validationResult.isSuccessful()) return validationResult;
        
        this.eventsDbCollection.upsert(event);
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