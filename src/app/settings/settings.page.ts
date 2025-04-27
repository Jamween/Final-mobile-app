import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class SettingsPage {
  currency: string = '€'; // Default currency

  constructor() {
    this.loadCurrency();
  }

  async loadCurrency() {
    const { value } = await Preferences.get({ key: 'currency' });
    if (value) {
      this.currency = value;
    }
  }

  async changeCurrency() {
    this.currency = this.currency === '€' ? '£' : '€';
    await Preferences.set({
      key: 'currency',
      value: this.currency
    });
    console.log('Currency changed to', this.currency);
  }

  async toggleNotifications() {
    const permission = await PushNotifications.checkPermissions();
    if (permission.receive === 'granted') {
      console.log('Notifications already enabled');
    } else {
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          console.log('Notifications enabled');
        } else {
          console.log('Notifications denied');
        }
      });
    }
  }

  async exportData() {
    const { value } = await Preferences.get({ key: 'subscriptions' });
    const subscriptions = value ? JSON.parse(value) : [];
  
    let textContent = 'My Subscriptions:\n\n';
    subscriptions.forEach((sub: any) => {
      textContent += `Name: ${sub.name}\n`;
      textContent += `Amount: €${sub.amount}\n`;
      textContent += `Billing Cycle: ${sub.billingCycle}\n`;
      textContent += `Renewal Date: ${sub.date}\n`;
      textContent += `Payment Method: ${sub.paymentMethod}\n\n`;
    });
  
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscriptions.txt'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
}
