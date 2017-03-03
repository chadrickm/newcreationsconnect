import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EventService } from '../../_services/event.service';

import { EventList } from '../event-list/event-list';
import { EventDetail } from '../event-detail/event-detail';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home implements OnInit {

  eventCount: number;

  constructor(public navCtrl: NavController, private eventService: EventService) { }

  ngOnInit() {
    this.eventService.activeEvents.subscribe(events => {
      console.log(events)
      // if (events == undefined) this.eventCount = 0;
      // if (events != undefined) this.eventCount = events.count;
    });
  }

  goToEventListPage() {
    this.navCtrl.push(EventList);
  }

  goToNewEventDetailPage() {
    this.navCtrl.push(EventDetail, {id: "new"});
  }
}
