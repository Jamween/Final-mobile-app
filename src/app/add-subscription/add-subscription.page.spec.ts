import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSubscriptionPage } from './add-subscription.page';

describe('AddSubscriptionPage', () => {
  let component: AddSubscriptionPage;
  let fixture: ComponentFixture<AddSubscriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
