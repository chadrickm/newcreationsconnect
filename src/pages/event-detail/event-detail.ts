import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventService } from '../../_services/event.service';

import { Event } from '../../_models/Event';

@Component({
  selector: 'event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetail {

  event: Event = new Event();

  constructor(
    private eventService: EventService,
    public navController: NavController, 
    private navParams: NavParams
  ) {
    var id = this.navParams.get('id');
    this.eventService.getEvent(id).subscribe(event => {
      this.event = event
    });
  }
}
