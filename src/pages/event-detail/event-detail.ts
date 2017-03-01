import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth } from '@ionic/cloud-angular';

import { ValidationResult } from '../../_services/_common/validation';

import { EventService } from '../../_services/event.service';

import { Event } from '../../_models/Event';
import { Login } from '../login/login';

@Component({
  selector: 'event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetail implements OnInit {

  id: string;
  newEvent: Event;
  validationResult: ValidationResult;

  constructor(
    public auth: Auth,
    private eventService: EventService,
    public navCtrl: NavController, 
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.id = this.navParams.get('id');

    if (this.id === 'new') {
      this.newEvent = new Event();
      this.newEvent.status = 'Draft';
      if (!this.auth.isAuthenticated()) {
        this.navCtrl.push(Login);
      }
    }
  }

  saveEvent() {
    var validationResult = new ValidationResult();
    this.validationResult = this.eventService.saveEvent(this.newEvent, validationResult);
  }
}
