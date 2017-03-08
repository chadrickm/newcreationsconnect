import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';

import { ValidationResult } from '../../_services/_common/validation';
import { UtilityService } from '../../_services/_common/utility.service';

import { EventService } from '../../_services/event.service';

import { Event } from '../../_models/Event';
import { ValidationResults } from '../../app/components/_common/validation-results/validation-results.component';
import {EventDraftSchedule} from '../event-draft-schedule/event-draft-schedule';

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
    private utilityService: UtilityService,
    private validationResult: ValidationResult
  ) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.eventService.getEvent(this.id).subscribe(e => {
      var event = this.utilityService.convertEventUtcDatesToTimezoneOffset(e);
      return this.event = e;
    });
  }

  saveEvent() {
    var validationResult = new ValidationResult();
    this.validationResult = this.eventService.saveEvent(this.event, validationResult);
    if (!this.validationResult.isSuccessful()) {
      let modal = this.modalController.create(ValidationResults, {messages: this.validationResult.messages, title: 'Errors Saving Event'});
      modal.present();
    } else {
      this.presentToast('Event Saved');
    }
  }

  saveAndNavToEventSchedule() {
    this.saveEvent();
    this.navController.push(EventDraftSchedule, {id: this.event.id})
      .then(() => {
        const index = this.navController.getActive().index;
        this.navController.remove(index-1);
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
}
