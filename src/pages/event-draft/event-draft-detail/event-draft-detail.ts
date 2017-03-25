import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';

//import { ValidationResult } from '../../_services/_common/validation';
import { UtilityService } from '../../../_services/_common/utility.service';

import { EventService } from '../../../_services/event.service';

import { Event } from '../../../_models/Event';
import { ValidationResults } from '../../../app/components/_common/validation-results/validation-results.component';

@Component({
  selector: 'event-draft-detail',
  templateUrl: 'event-draft-detail.html'
})
export class EventDraftDetail implements OnInit {

  id: string;
  event: Event = new Event();

  constructor(
    public auth: Auth,
    private eventService: EventService,
    private modalController: ModalController,
    public navController: NavController,
    private navParams: NavParams,
    private toastController: ToastController,
    private user: User,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.eventService.getEvent(this.id).subscribe(e => {
      var event = e;
      event.startDateString = moment(event.startDateUtc.toISOString()).format();
      event.endDateString = moment(event.endDateUtc.toISOString()).format();
      return this.event = event;
    });
  }

  saveEvent() {
    this.eventService.saveEvent(this.event, () => {
      if (!this.eventService.validationResult.isSuccessful()) {
        let modal = this.modalController.create(ValidationResults, { messages: this.eventService.validationResult.messages, title: 'Errors Saving Event' });
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
