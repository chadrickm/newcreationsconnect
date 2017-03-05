import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';

import { UtilityService } from '../_services/_common/utility.service';
import { EventService } from '../_services/event.service';
import { ValidationResult, ValidationMessageTypes } from '../_services/_common/validation';
import { EventTypes } from '../_models/Event';
import { ActivityTypes } from '../_models/Activity';

import { ValidationResults } from '../app/components/_common/validation-results/validation-results.component';
import { EventDetail } from '../pages/event-detail/event-detail';
import { EventDraftDetail } from '../pages/event-draft-detail/event-draft-detail';
import { EventDraftSchedule } from '../pages/event-draft-schedule/event-draft-schedule';
import { EventDraftList } from '../pages/event-draft-list/event-draft-list';
import { EventNew } from '../pages/event-new/event-new';
import { EventList } from '../pages/event-list/event-list';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';

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
    EventDetail,
    EventDraftDetail,
    EventDraftSchedule,
    EventDraftList,
    EventList,
    EventNew,
    Home,
    Login,
    MyApp,
    Register,
    ValidationResults
  ],
  imports: [
    CloudModule.forRoot(cloudSettings),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EventDetail,
    EventDraftDetail,
    EventDraftSchedule,
    EventDraftList,
    EventList,
    EventNew,
    Home,
    Login,
    Register,
    ValidationResults
  ],
  providers: [
    ActivityTypes,
    EventService,
    EventTypes,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilityService,
    ValidationMessageTypes,
    ValidationResult
  ]
})
export class AppModule {}
