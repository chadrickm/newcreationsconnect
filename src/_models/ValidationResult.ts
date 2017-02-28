import { ValidationMessage } from '../_models/ValidationMessage';

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