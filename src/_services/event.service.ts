import { Injectable } from '@angular/core';

import { Database } from '@ionic/cloud-angular';

import { ValidationService, ValidationResult } from '../_services/_common/validation.service';

import { Event } from '../_models/Event';

@Injectable()
export class EventService {

    eventsDbCollection = this.db.collection("events");

    constructor(
        private db: Database,
        //private messageTypes: ValidationMessageTypes,
        private validationService: ValidationService
    ) { }

    saveEvent(event: Event, validationResult: ValidationResult): ValidationResult {

        validationResult = this.validationService.validateEvent(event, validationResult);
        if (!validationResult.isSuccessful()) return validationResult;
        
        this.eventsDbCollection.upsert(event);
        return validationResult;
    }
}