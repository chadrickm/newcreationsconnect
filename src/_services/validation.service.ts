import { UtilityService } from '../_services/_common/utility.service';
import { ValidationResult } from '../_models/ValidationResult';

import { Event } from '../_models/Event';

export class ValidationMessageTypes {
    error: string = 'Error';
    info: string = 'Info';
    warning: string = 'Warning';
    success: string = 'Success';
}

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