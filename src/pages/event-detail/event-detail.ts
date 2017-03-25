import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';

import { EventService } from '../../_services/event.service';

import { Event } from '../../_models/Event';
import { EventSchedule } from '../../_models/_view-models/EventSchedule';
import { EventDraftDetail } from '../../pages/event-draft/event-draft-detail/event-draft-detail';

@Component({
  selector: 'event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetail {

  event: Event = new Event();
  eventSchedule: EventSchedule;
  isAuthenticated: boolean;
  isCreator: boolean;

  constructor(
    private auth: Auth,
    private eventService: EventService,
    public navController: NavController, 
    private navParams: NavParams,
    public user: User
  ) {
    var id = this.navParams.get('id');
    this.eventService.getEvent(id).subscribe(event => {
      this.event = event
      this.eventSchedule = new EventSchedule(this.event);
      this.isAuthenticated = this.auth.isAuthenticated();
      console.log(this.isAuthenticated);
      console.log(this.user.details);
      console.log(this.event);
      this.isCreator = this.isAuthenticated && this.user.details.username === this.event.createdByUsername;
    });
  }

  openEventDraftDetail() {
    this.navController.push(EventDraftDetail, {id: this.event.id});
  }
}
