import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Database } from '@ionic/cloud-angular';

import { EventList } from '../event-list/event-list';
import { EventDetail } from '../event-detail/event-detail';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home implements OnInit {

  eventsDbCollection = this.db.collection("events");
  eventCount: any;
  //events = this.db.collection("events");

  constructor(public navCtrl: NavController, public db: Database) { }

  ngOnInit() {
    this.db.connect();
    this.eventsDbCollection
      .findAll({status: "Active"})
      .fetch()
      .subscribe(events => {
        if (events === undefined) this.eventCount = 0;
        if (events !== undefined) this.eventCount = events.length;
      });
  }

  goToEventListPage() {
    this.navCtrl.push(EventList);
  }

  goToNewEventDetailPage() {
    this.navCtrl.push(EventDetail, {id: "new"});
  }
}
