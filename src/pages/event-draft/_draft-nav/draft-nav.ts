import { Component, Input } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';

import { EventService } from '../../../_services/event.service';

import { Event } from '../../../_models/Event';
import { ValidationResults } from '../../../app/components/_common/validation-results/validation-results.component';
import { EventDraftSchedule } from '../event-draft-schedule/event-draft-schedule';
import { EventDraftDetail } from '../event-draft-detail/event-draft-detail';

@Component({
    selector: 'draft-nav',
    templateUrl: 'draft-nav.html'
})
export class DraftNav {

    @Input()
    event: Event;
    @Input()
    activePage: string;

    constructor(
        private eventService: EventService,
        private modalController: ModalController,
        public navController: NavController,
        private toastController: ToastController,
    ) {
    }

    saveAndNavToEventDetail() {
        this.saveEvent();
        this.navController.push(EventDraftDetail, { id: this.event.id })
            .then(() => {
                const index = this.navController.getActive().index;
                this.navController.remove(index - 1);
            });
    }

    saveAndNavToEventSchedule() {
        this.saveEvent();
        this.navController.push(EventDraftSchedule, { id: this.event.id })
            .then(() => {
                const index = this.navController.getActive().index;
                this.navController.remove(index - 1);
            });
    }

    saveAndNavToEventTeam(event: Event) {

    }

    saveEvent() {
        this.eventService.saveEvent(this.event, () => {
            if (!this.eventService.validationResult.isSuccessful()) {
                let modal = this.modalController.create(
                    ValidationResults,
                    { messages: this.eventService.validationResult.messages, title: 'Errors Saving Event' });
                modal.present();
            } else {
                this.presentToast('Event Saved');
            }
        });
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
}