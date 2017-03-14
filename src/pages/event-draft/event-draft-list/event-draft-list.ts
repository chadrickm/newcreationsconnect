import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EventService } from '../../../_services/event.service';

import { Event } from '../../../_models/Event';

import { EventDraftDetail } from '../event-draft-detail/event-draft-detail';

@Component({
  selector: 'event-draft-list',
  templateUrl: 'event-draft-list.html'
})
export class EventDraftList {

  events: Event[] = [];

  constructor(public navController: NavController, private eventService: EventService) {
    this.eventService.draftEvents.subscribe(events => {
      this.events = events;
    });
  }

  navEventDraftDetails(eventId) {
    this.navController.push(EventDraftDetail, {id: eventId});
  }
}
