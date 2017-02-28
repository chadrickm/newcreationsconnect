export class ValidationMessage {
    messageText: string;
    messageType: string;

    constructor(messageText: string, messageType: string) {
        this.messageText = messageText;
        this.messageType = messageType;
    }
}