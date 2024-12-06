import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  order: any = null; // Initialize as null to handle loading state
  orderId: string = ''; // Store the ID to log it or handle debugging

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the 'id' from the route parameters
    const orderId = this.route.snapshot.paramMap.get('id');

    if (orderId) {
      this.orderId = orderId;
      this.fetchOrderDetails(orderId);
    } else {
      console.error('No order ID found!');
    }
  }

  fetchOrderDetails(orderId: string): void {
    // Simulate fetching the order details based on the ID
    // (Replace with real API call or service call)
    if (orderId === 'ORD12345') {
      this.order = {
        id: orderId,
        items: ['Apples', 'Bananas', 'Oranges'],
        status: 'Shipped',
        date: '2024-12-06',
        totalPrice: '₱205',
        deliveryDate: '2024-12-07',
      };
    } else if (orderId === 'ORD12346') {
      this.order = {
        id: orderId,
        items: ['Tomatoes', 'Cucumbers'],
        status: 'Delivered',
        date: '2024-12-05',
        totalPrice: '₱120',
        deliveryDate: '2024-12-06',
      };
    } else if (orderId === 'ORD12347') {
      this.order = {
        id: orderId,
        items: ['Milk', 'Bread'],
        status: 'Pending',
        date: '2024-12-04',
        totalPrice: '₱150',
        deliveryDate: '2024-12-08',
      };
    } else {
      console.error('Order not found!');
    }
  }

  cancelOrder(): void {
    console.log(`Order ${this.order.id} has been cancelled.`);
    // Implement cancellation logic (API call, etc.)
  }
}
