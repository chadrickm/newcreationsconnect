import { Injectable } from '@angular/core';
import { UtilityService } from '../_common/utility.service';

import { Event } from '../../_models/Event';

export class ValidationResult {
    messages: ValidationMessage[];

    addMessage(messageText: string, messageType: string) {
        this.messages.push(new ValidationMessage(messageText, messageType))
    }

    isSuccessful(): boolean {
        if (this.messages !== undefined && this.messages.length > 0) {
            return false;
        }
    }
}

export class ValidationMessage {
    messageText: string;
    messageType: string;

    constructor(messageText: string, messageType: string) {
        this.messageText = messageText;
        this.messageType = messageType;
    }
}

export class ValidationMessageTypes {
    error: string = 'Error';
    info: string = 'Info';
    warning: string = 'Warning';
    success: string = 'Success';
}

@Injectable()
export class ValidationService {

    constructor( private utility: UtilityService, private types: ValidationMessageTypes ) { }

    validateEvent(event: Event, validationResult: ValidationResult): ValidationResult {
        
        if (this.utility.isNullOrEmpty(event.status)) {
            validationResult.addMessage("Status is Required", this.types.error);
        }
        
        if (this.utility.isNullOrEmpty(event.name)) {
            validationResult.addMessage("Name is Required", this.types.error);
        }

        if (this.utility.isNullOrEmpty(event.startDate)) {
            validationResult.addMessage("Start Date is Required", this.types.error);
        }

        if (this.utility.isNullOrEmpty(event.endDate)) {
            validationResult.addMessage("End Date is Required", this.types.error);
        }
        
        if (this.utility.isNullOrEmpty(event.address)) {
            validationResult.addMessage("Address is Required", this.types.error);
        }
        
        if (this.utility.isNullOrEmpty(event.city)) {
            validationResult.addMessage("City is Required", this.types.error);
        }
        
        if (this.utility.isNullOrEmpty(event.state)) {
            validationResult.addMessage("State is Required", this.types.error);
        }

        return validationResult;
    }
}