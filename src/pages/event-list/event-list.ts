import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EventService } from '../../_services/event.service';

import { Event } from '../../_models/Event';

import { EventDetail } from '../event-detail/event-detail';

@Component({
  selector: 'event-list',
  templateUrl: 'event-list.html'
})
export class EventList {

  events: Event[] = [];

  constructor(public navController: NavController, private eventService: EventService) {
    this.eventService.activeEvents.subscribe(events => {
      this.events = events;
      console.log(this.events);
    });
  }

  navEventDetails(eventId) {
    this.navController.push(EventDetail, {id: eventId});
  }
}
