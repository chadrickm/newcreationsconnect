import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { ValidationResult } from '../../../_services/_common/validation';
import { EventService } from '../../../_services/event.service';
import { Activity } from '../../../_models/Activity';

import { ValidationResults } from '../../../app/components/_common/validation-results';

@Component({
    selector: 'activity-edit',
    templateUrl: 'activity-edit.html'
})
export class ActivityEdit {

    eventId: number;
    activity: Activity = new Activity();
    validationResult: ValidationResult;

    constructor(
        private eventService: EventService,
        private modalController: ModalController,
        private navController: NavController,
        private navParams: NavParams
    ) {
        // if we have an eventId it's a new activity
        this.eventId = this.navParams.get('eventId');
        var activityId = this.navParams.get('activityId');

        if (activityId === 'new') {
            var eventDateString = this.navParams.get('eventDate');
            var eventDate = moment(eventDateString);
            this.activity = new Activity();
            this.activity.startDateTimeUtc = moment(eventDate.toISODateString()).toDate();
            this.activity.endDateTimeUtc = moment(eventDate.toISODateString()).toDate();
        }
    }

    saveActivity() {
        var validationResult = new ValidationResult();
        this.validationResult = this.eventService.saveActivity(this.eventId, this.activity);
        if (!this.validationResult.isSuccessful()) {
        let modal = this.modalController.create(ValidationResults, {messages: this.validationResult.messages, title: 'Errors Saving Activity'});
            modal.present();
        } else {
            this.navController.pop();
        }
    }
}