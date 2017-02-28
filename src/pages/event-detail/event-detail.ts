import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, Database } from '@ionic/cloud-angular';

import { ValidationService } from '../../_services/validation.service';
import { ValidationResult } from '../../_models/ValidationResult';

import { Event } from '../../_models/Event';
import { Login } from '../login/login';

@Component({
  selector: 'event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetail implements OnInit {

  eventsDbCollection = this.db.collection("events");

  id: string;
  newEvent: Event;
  validationResult: ValidationResult;

  constructor(
    public auth: Auth,
    public db: Database,
    public navCtrl: NavController, 
    private navParams: NavParams,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.validationResult = new ValidationResult();

    if (this.id === 'new') {
      this.newEvent = new Event();
      this.newEvent.status = 'Draft';
      if (!this.auth.isAuthenticated()) {
        this.navCtrl.push(Login);
      }
    }
  }

  saveEvent() {
    this.validationResult = this.validationService.validateEvent(this.newEvent, this.validationResult);
    if (!this.validationResult.isSuccessful()) return;
    this.eventsDbCollection.upsert(this.newEvent);
  }
}
