import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { AddSubscriptionPage } from './add-subscription/add-subscription.page';
import { SettingsPage } from './settings/settings.page';
import { CalendarPage } from './calendar/calendar.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'add-subscription',
    component: AddSubscriptionPage,
  },
  {
    path: 'settings',
    component: SettingsPage,
  },
  {
    path: 'calendar',
    component: CalendarPage,
  }
];
