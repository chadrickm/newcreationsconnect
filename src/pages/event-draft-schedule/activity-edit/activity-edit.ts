import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

import { ValidationResult } from '../../../_services/_common/validation';
import { EventService } from '../../../_services/event.service';
import { Activity, ActivityTypes } from '../../../_models/Activity';

import { ValidationResults } from '../../../app/components/_common/validation-results/validation-results.component';

@Component({
    selector: 'activity-edit',
    templateUrl: 'activity-edit.html'
})
export class ActivityEdit {

    eventId: string;
    eventDate: string;
    activity: Activity = new Activity();
    startYearRange: number = moment().year();
    endYearRange: number = moment().year() + 2;
    validationResult: ValidationResult;

    constructor(
        public activityTypes: ActivityTypes,
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
            var isoMoment = moment(eventDate.toISOString());
            this.activity.startDateTimeUtc = isoMoment.toDate();
            this.activity.startDateTimeString = isoMoment.format();
            this.activity.endDateTimeUtc = isoMoment.toDate();
            this.activity.endDateTimeString = isoMoment.format();
            this.eventDate = isoMoment.format('ddd, MMMM Do');
        }
    }

    saveActivity() {
        var validationResult = new ValidationResult();
        this.validationResult = this.eventService.saveActivity(this.eventId, this.activity, validationResult);
        if (!this.validationResult.isSuccessful()) {
            let modal = this.modalController.create(
                ValidationResults,
                { messages: this.validationResult.messages, title: 'Errors Saving Activity' });
            modal.present();
        } else {
            this.navController.pop();
        }
    }

    startDateChanged() {
        this.activity.endDateTimeString = moment(this.activity.startDateTimeString).add(1, 'hour').format();
    }

    typeChanged() {
        this.clearActivityFields();
        if (this.activity.type === this.activityTypes.registration) {
            this.activity.name = this.activityTypes.registration;
        }
    }

    private clearActivityFields() {
        this.activity.description = "";
        this.activity.name = "";
        this.activity.speaker = "";
    }
}