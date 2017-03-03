export class ValidationResult {
    messages: ValidationMessage[] = [];

    addMessage(messageText: string, messageType: string) {
        this.messages.push(new ValidationMessage(messageText, messageType))
    }

    isSuccessful(): boolean {
        var isSuccessful = true;
        if (this.messages !== undefined && this.messages.length > 0) {
            isSuccessful = false;
        }

        return isSuccessful;
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