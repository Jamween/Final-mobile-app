import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { Chart } from 'chart.js/auto';

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

  @ViewChild('pieCanvas') pieCanvas!: ElementRef;
  pieChart: any;

  constructor() {}

  ionViewWillEnter() {
    this.loadSubscriptions();
  }

  async loadSubscriptions() {
    const { value } = await Preferences.get({ key: 'subscriptions' });
    this.subscriptions = value ? JSON.parse(value) : [];
    this.calculateTotals();
    this.createPieChart();
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

  async deleteSubscription(index: number) {
    this.subscriptions.splice(index, 1);

    await Preferences.set({
      key: 'subscriptions',
      value: JSON.stringify(this.subscriptions),
    });

    this.calculateTotals();
    this.createPieChart();
  }

  generateColors(count: number) {
    const colors = [];
    const baseColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF8C00', '#00C49F'];
    
    for (let i = 0; i < count; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }
  
    return colors;
  }
  

  createPieChart() {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  
    const subscriptionNames = this.subscriptions.map(sub => sub.name);
    const subscriptionAmounts = this.subscriptions.map(sub => parseFloat(sub.amount));
  
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: subscriptionNames,
        datasets: [{
          label: 'Subscriptions',
          data: subscriptionAmounts,
          backgroundColor: this.generateColors(subscriptionAmounts.length),
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }  
}
