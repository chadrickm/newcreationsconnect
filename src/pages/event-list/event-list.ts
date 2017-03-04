import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EventService } from '../../_services/event.service';

import { Event } from '../../_models/Event';

@Component({
  selector: 'event-list',
  templateUrl: 'event-list.html'
})
export class EventList {

  events: Event[] = [];

  constructor(public navCtrl: NavController, private eventService: EventService) {
    this.eventService.activeEvents.subscribe(events => {
      this.events = events;
    });
  }
}
