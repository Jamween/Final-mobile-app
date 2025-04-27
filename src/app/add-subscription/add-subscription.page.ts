import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.page.html',
  styleUrls: ['./add-subscription.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class AddSubscriptionPage {

  popularServices = [
    { name: 'Netflix', image: 'assets/logos/netflix.png' },
    { name: 'Spotify', image: 'assets/logos/spotify.png' },
    { name: 'Disney+', image: 'assets/logos/disney.png' },
    { name: 'Amazon Prime', image: 'assets/logos/prime.png' },
    { name: 'YouTube Premium', image: 'assets/logos/youtube.png' },
    { name: 'Apple Music', image: 'assets/logos/applemusic.png' },
  ];

  subscription = {
    name: '',
    amount: null,
    date: '',
    billingCycle: 'monthly',
    paymentMethod: ''
  };

  constructor(private router: Router) {}

  selectPopularService(service: any) {
    this.subscription.name = service.name;
    // Optional: you could auto-fill a default amount if you wanted
  }

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
