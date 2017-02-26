import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Event } from '../../_models/Event';

@Component({
  selector: 'event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetail implements OnInit {

  newEvent: Event;

  constructor(public navCtrl: NavController) {
    
  }

  ngOnInit() {
    this.newEvent = new Event();
  }

}
