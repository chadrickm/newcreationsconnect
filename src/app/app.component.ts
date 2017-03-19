import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { EventNew } from '../pages/event-new/event-new';
import { EventList } from '../pages/event-list/event-list';
import { EventDraftList } from '../pages/event-draft/event-draft-list/event-draft-list';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = EventList;

  pages: Array<{title: string, component: any, params: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      //{ title: 'New Creations Connect', component: Home, params: undefined },
      { title: 'New Event (Draft)', component: EventNew, params: {id: 'new'} },
      { title: 'Upcoming Events', component: EventList, params: undefined },
      { title: 'Event Drafts', component: EventDraftList, params: undefined },
      { title: 'Login/Register', component: Login, params: undefined }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component, page.params);
  }
}
