import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import * as moment from 'moment';

//import { ValidationResult } from '../../_services/_common/validation';

import { EventService } from '../../_services/event.service';

import { Event, EventStatuses, EventTypes } from '../../_models/Event';
import { Login } from '../login/login';
import { ValidationResults } from '../../app/components/_common/validation-results/validation-results.component';

@Component({
  selector: 'event-new',
  templateUrl: 'event-new.html'
})
export class EventNew implements OnInit {

  id: string;
  newEvent: Event;
  startYearRange: number = moment().year();
  endYearRange: number = moment().year() + 2;

  constructor(
    public auth: Auth,
    private eventService: EventService,
    private eventStatuses: EventStatuses,
    private eventTypes: EventTypes,
    private modalController: ModalController,
    public navController: NavController,
    private navParams: NavParams,
    private user: User
  ) { }

  ngOnInit() {
    this.id = this.navParams.get('id');

    if (this.id === 'new') {
      this.newEvent = new Event();
      this.newEvent.eventType = this.eventTypes.onLocation;
      this.newEvent.status = this.eventStatuses.draft;
      this.newEvent.startDateString = moment(new Date().toISOString()).add(1, 'day').add(1, 'hour').startOf('day').format();
      this.newEvent.endDateString = moment(new Date().toISOString()).add(1, 'day').add(1, 'hour').startOf('day').format();
      this.newEvent.timezoneOffset = ((moment().toDate().getTimezoneOffset() / 60) * -1);

      if (this.auth.isAuthenticated()) {
        this.newEvent.createdByUsername = this.user.details.username;
        this.newEvent.createdByDisplayName = this.user.details.name;
      }
      if (!this.auth.isAuthenticated()) {
        this.navController.push(Login);
      }
    } else {

    }
  }

  saveEvent() {
    this.eventService.saveEvent(this.newEvent, () => {
      if (!this.eventService.validationResult.isSuccessful()) {
        let modal = this.modalController.create(
          ValidationResults, 
          { messages: this.eventService.validationResult.messages, title: 'Errors Saving Event' });
        modal.present();
      } else {
        this.navController.pop();
      }
    });
  }
}
