import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EventService } from '../../../_services/event.service';

import { Event } from '../../../_models/Event';

import { EventNew } from '../../event-new/event-new';

@Component({
    selector: 'review-drafts',
    templateUrl: 'review-drafts.html'
})
export class ReviewDrafts {

    events: Event[] = [];

    constructor(public navController: NavController, private eventService: EventService) {
        this.eventService.draftEvents.subscribe(events => {
            this.events = events;
        });
    }

    gotoEventNew() {
        this.navController.push(EventNew, { id: "new" })
            .then(() => {
                const index = this.navController.getActive().index;
                this.navController.remove(index - 1);
            });
    }
}
