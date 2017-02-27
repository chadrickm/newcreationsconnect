import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Event } from '../../_models/Event';

@Component({
  selector: 'event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetail implements OnInit {

  id: string;
  newEvent: Event;

  constructor(public navCtrl: NavController, private navParams: NavParams) { }

  ngOnInit() {
    this.id = this.navParams.get('id');
    if (this.id === 'new') {
      this.newEvent = new Event();
      this.newEvent.status = 'Draft';
    }
  }
}
