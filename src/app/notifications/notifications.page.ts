import { Component } from '@angular/core';

interface Notification {
  title: string;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss']
})
export class NotificationsPage {
  notifications: Notification[] = [
    {
      title: 'New Discount Available!',
      message: 'Get 20% off on your next grocery purchase. Hurry up, limited time offer!',
      time: '10 minutes ago',
      read: false
    },
    {
      title: 'Item Back in Stock',
      message: 'The Organic Apple you wanted is now back in stock. Order now!',
      time: '1 hour ago',
      read: false
    },
    {
      title: 'Order Shipped',
      message: 'Your grocery order has been shipped and will arrive soon.',
      time: '3 hours ago',
      read: false
    }
  ];

  // Mark notification as read
  markAsRead(notification: Notification): void {
    notification.read = true;  // Set read to true
    console.log('Notification marked as read:', notification);
  }
}
