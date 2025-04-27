import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.page.html',
  styleUrls: ['./add-subscription.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule],
})
export class AddSubscriptionPage {
  subscription = {
    name: '',
    amount: null,
    date: '',
    billingCycle: 'monthly',
    paymentMethod: ''
  };

  constructor(private router: Router) {}

  async saveSubscription() {
    const { value } = await Preferences.get({ key: 'subscriptions' });
    const existingSubscriptions = value ? JSON.parse(value) : [];
  
    existingSubscriptions.push(this.subscription);
  
    await Preferences.set({
      key: 'subscriptions',
      value: JSON.stringify(existingSubscriptions),
    });
  
    console.log('Subscription saved!', existingSubscriptions);
    this.router.navigate(['/home']);
  }
  
}
