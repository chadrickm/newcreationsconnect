import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';

import { UtilityService } from '../_services/_common/utility.service';
import { EventService } from '../_services/event.service';
import { ValidationResult, ValidationMessageTypes } from '../_services/_common/validation';
import { EventTypes, EventStatuses } from '../_models/Event';
import { ActivityTypes } from '../_models/Activity';

import { ActivityEdit } from '../pages/event-draft/event-draft-schedule/activity-edit/activity-edit';
import { CheckForUpdates } from '../pages/check-for-updates/check-for-updates';
import { ComingSoon } from '../pages/coming-soon/coming-soon';
import { DraftNav } from '../pages/event-draft/_draft-nav/draft-nav';
import { EventDetail } from '../pages/event-detail/event-detail';
import { EventDraftDetail } from '../pages/event-draft/event-draft-detail/event-draft-detail';
import { EventDraftSchedule } from '../pages/event-draft/event-draft-schedule/event-draft-schedule';
import { EventDraftList } from '../pages/event-draft/event-draft-list/event-draft-list';
import { EventNew } from '../pages/event-new/event-new';
import { EventList } from '../pages/event-list/event-list';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { ReviewDrafts } from '../pages/event-draft/review-drafts/review-drafts';
import { ValidationResults } from '../app/components/_common/validation-results/validation-results.component';

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
    ActivityEdit,
    CheckForUpdates,
    ComingSoon,
    DraftNav,
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
    ReviewDrafts,
    ValidationResults
  ],
  imports: [
    CloudModule.forRoot(cloudSettings),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ActivityEdit,
    CheckForUpdates,
    ComingSoon,
    DraftNav,
    EventDetail,
    EventDraftDetail,
    EventDraftSchedule,
    EventDraftList,
    EventList,
    EventNew,
    Home,
    Login,
    Register,
    ReviewDrafts,
    ValidationResults
  ],
  providers: [
    ActivityTypes,
    EventService,
    EventStatuses,
    EventTypes,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilityService,
    ValidationMessageTypes,
    ValidationResult
  ]
})
export class AppModule {}
