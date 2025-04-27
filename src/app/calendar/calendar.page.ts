import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class CalendarPage {
  selectedDate: string = new Date().toISOString();
  subscriptions: any[] = [];
  subscriptionsOnDate: any[] = [];
  allRenewals: any[] = [];

  constructor() {
    this.loadSubscriptions();
  }

  async loadSubscriptions() {
    const { value } = await Preferences.get({ key: 'subscriptions' });
    this.subscriptions = value ? JSON.parse(value) : [];
    this.prepareAllRenewals();
    this.filterSubscriptions();
  }

  dateSelected(event: any) {
    this.selectedDate = event.detail.value;
    this.filterSubscriptions();
  }

  filterSubscriptions() {
    const selectedDay = new Date(this.selectedDate).getDate();
    const selectedMonth = new Date(this.selectedDate).getMonth() + 1;
    const selectedYear = new Date(this.selectedDate).getFullYear();

    this.subscriptionsOnDate = this.subscriptions.filter(sub => {
      const renewal = new Date(sub.date);
      return (
        renewal.getDate() === selectedDay &&
        renewal.getMonth() + 1 === selectedMonth &&
        renewal.getFullYear() === selectedYear
      );
    });
  }

  prepareAllRenewals() {
    this.allRenewals = this.subscriptions.map(sub => {
      const dateObj = new Date(sub.date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
      const formattedDate = dateObj.toLocaleDateString(undefined, options);
      return {
        name: sub.name,
        amount: sub.amount,
        formattedDate: formattedDate,
        rawDate: sub.date,
      };
    }).sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime());
  }
}
