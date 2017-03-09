import { Component } from '@angular/core';

import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

import { EventService } from '../../_services/event.service';
import { ValidationResult } from '../../_services/_common/validation';
import { UtilityService } from '../../_services/_common/utility.service';
import { Event } from '../../_models/Event';

import { ValidationResults } from '../../app/components/_common/validation-results/validation-results.component';
import { ActivityEdit } from './activity-edit/activity-edit';
import { EventDraftDetail } from '../event-draft-detail/event-draft-detail';

import { EventSchedule } from '../../_models/_view-models/EventSchedule';

@Component({
    selector: 'event-draft-schedule',
    templateUrl: 'event-draft-schedule.html'
})
export class EventDraftSchedule {

    event: Event = new Event();
    eventSchedule: EventSchedule;
    validationResult: ValidationResult;

    constructor(
        private eventService: EventService,
        private modalController: ModalController,
        private navController: NavController,
        private navParams: NavParams,
        private toastController: ToastController,
        private utilityService: UtilityService
    ) {
        var id = this.navParams.get('id');
        this.eventService.getEvent(id).subscribe(e => {
            var event = this.utilityService.convertEventUtcDatesToTimezoneOffset(e);
            if (event.activities == undefined) event.activities = [];
            this.event = event
            this.eventSchedule = new EventSchedule(this.event);
        });
    }

    saveEvent() {
        var validationResult = new ValidationResult();
        this.validationResult = this.eventService.saveEvent(this.event, validationResult);
        if (!this.validationResult.isSuccessful()) {
            let modal = this.modalController.create(
                ValidationResults,
                { messages: this.validationResult.messages, title: 'Errors Saving Event' });
            modal.present();
        } else {
            this.presentToast('Event Saved');
        }
    }

    saveAndNavToEventDetails() {
        this.saveEvent();
        this.navController.push(EventDraftDetail, { id: this.event.id })
            .then(() => {
                const index = this.navController.getActive().index;
                this.navController.remove(index - 1);
            });
    }

    saveAndNavToEventTeam() {
        alert('TODO: save and navigate to Team');
    }

    presentToast(_message: string) {
        let toast = this.toastController.create({
            message: _message,
            duration: 3000,
            position: "bottom",
            cssClass: "text-center"
        });
        toast.present();
    }

    openAddActivityDialog(date: Date) {
        console.log(date);
        let modal = this.modalController.create(
            ActivityEdit, 
            { 
                eventId: this.event.id,
                eventDate: date.toISOString(),
                activityId: 'new' 
            });
        modal.present();
    }
}