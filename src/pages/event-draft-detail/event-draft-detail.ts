import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';

import { ValidationResult } from '../../_services/_common/validation';

import { EventService } from '../../_services/event.service';

import { Event } from '../../_models/Event';
import { Login } from '../login/login';
import { ValidationResults } from '../../app/components/_common/validation-results/validation-results.component';

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
    private user: User,
    private validationResult: ValidationResult
  ) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.eventService.getEvent(this.id).subscribe(event => this.event = event);
  }

  saveEvent() {
    var validationResult = new ValidationResult();
    this.validationResult = this.eventService.saveEvent(this.event, validationResult);
    if (!this.validationResult.isSuccessful()) {
      let modal = this.modalController.create(ValidationResults, {messages: this.validationResult.messages, title: 'Errors Saving Event'});
      modal.present();
    } else {
      alert('saved');
    }
  }
}
