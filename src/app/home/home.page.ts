import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class HomePage {
  subscriptions: any[] = [];
  totalMonthly: number = 0;
  totalYearly: number = 0;

  constructor() {}

  ionViewWillEnter() {
    this.loadSubscriptions();
  }

  async deleteSubscription(index: number) {
    this.subscriptions.splice(index, 1); // Remove from array
  
    await Preferences.set({
      key: 'subscriptions',
      value: JSON.stringify(this.subscriptions),
    });
  
    this.calculateTotals(); // Recalculate totals after deletion
  }  

  async loadSubscriptions() {
    const { value } = await Preferences.get({ key: 'subscriptions' });
    this.subscriptions = value ? JSON.parse(value) : [];

    this.calculateTotals();
  }

  calculateTotals() {
    this.totalMonthly = 0;
    this.totalYearly = 0;

    for (const sub of this.subscriptions) {
      if (sub.billingCycle === 'monthly') {
        this.totalMonthly += parseFloat(sub.amount);
        this.totalYearly += parseFloat(sub.amount) * 12;
      } else if (sub.billingCycle === 'yearly') {
        this.totalYearly += parseFloat(sub.amount);
        this.totalMonthly += parseFloat(sub.amount) / 12;
      }
    }
  }
}

