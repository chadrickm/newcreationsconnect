import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import * as _ from 'underscore';
//import { Observable } from 'rxjs';

import { EventService } from '../../_services/event.service';

import { EventList } from '../event-list/event-list';
import { EventDraftList } from '../event-draft/event-draft-list/event-draft-list';
import { EventNew } from '../event-new/event-new';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home implements OnInit {

  eventCount: number;
  draftCount: number;

  constructor(
    private auth: Auth,
    private eventService: EventService,
    private navController: NavController,
    private user: User) { }

  ngOnInit() {
    this.eventService.activeEvents.subscribe(events => {
      this.eventCount = events.length;
    });
    if (this.auth.isAuthenticated()) {
      this.eventService.draftEvents.subscribe(events => {
        var usersDraftEvents = _.filter(events, event => {
          return event.createdByUsername == this.user.details.username
        });
        this.draftCount = usersDraftEvents.length;
      });
    } else {
      this.draftCount = 0;
    }
  }

  goToEventListPage() {
    this.navController.push(EventList);
  }

  goToEventDraftListPage() {
    this.navController.push(EventDraftList);
  }

  goToNewEventDetailPage() {
    this.navController.push(EventNew, { id: "new" });
  }
}
