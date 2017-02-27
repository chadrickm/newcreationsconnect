import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';

import { EventDetail } from '../pages/event-detail/event-detail';
import { EventList } from '../pages/event-list/event-list';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'f56ecf5f'
  },
  'auth': {
    'facebook': {
      'scope': ['email', 'public_profile', 'user_friends']
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    EventDetail,
    EventList,
    Home,
    Login
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventDetail,
    EventList,
    Home,
    Login
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
