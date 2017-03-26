import { Component } from '@angular/core';
import * as _ from 'underscore';

import { NavController } from 'ionic-angular';

import { EventService } from '../../_services/event.service';

import { Event } from '../../_models/Event';

import { EventDetail } from '../event-detail/event-detail';
import { EventNew } from '../event-new/event-new';
import { ComingSoon } from '../coming-soon/coming-soon';
import { ReviewDrafts } from '../event-draft/review-drafts/review-drafts';

@Component({
  selector: 'event-list',
  templateUrl: 'event-list.html'
})
export class EventList {

  eventFilter: string = "global-church";
  events: Event[] = [];

  constructor(
    public navController: NavController, 
    private eventService: EventService
  ) {
    this.eventService.activeEvents.subscribe(events => {
      this.events = _.sortBy(events, e => {
        var event: Event = e;
        var dateTime: Date = event.startDateUtc;
        return dateTime;
      });
    });
  }

  navEventDetails(eventId) {
    this.navController.push(EventDetail, { id: eventId });
  }

  goToEventNewPage() {
    this.navController.push(EventNew, { id: "new" });
  }

  gotoReviewEventDrafts() {
    this.navController.push(ReviewDrafts);
  }

  eventFilterChanged() {
    if (this.eventFilter === "local-church") {
      this.eventFilter = "global-church";
      this.navController.push(ComingSoon, { 
        featureTitle: "Local Church Events",
        featureDescription: "You will be able to subscribe to specific local churches events and they will show up in your feed."
      });
    }
  }
}
