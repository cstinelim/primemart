import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-payment-method',
  templateUrl: 'payment-method.page.html',
  styleUrls: ['payment-method.page.scss']
})
export class PaymentMethodPage {
  // Number values for payment methods
  creditCardNumber: string = '1'; // Default number
  paypalNumber: string = '2'; // Default number
  gcashNumber: string = '3'; // Default number
  bankTransferNumber: string = '4'; // Default number

  // Track edit state for each payment method
  isEditing: { [key in 'creditCard' | 'paypal' | 'gcash' | 'bankTransfer']: boolean } = {
    creditCard: false,
    paypal: false,
    gcash: false,
    bankTransfer: false
  };

  // Keep track of the previous values for comparison
  previousValues: { [key in 'creditCard' | 'paypal' | 'gcash' | 'bankTransfer']: string } = {
    creditCard: '1',
    paypal: '2',
    gcash: '3',
    bankTransfer: '4'
  };

  constructor(private alertController: AlertController) {}

  // Toggle edit mode for each payment method
  async toggleEdit(paymentMethod: 'creditCard' | 'paypal' | 'gcash' | 'bankTransfer') {
    // If the user is in edit mode and wants to save
    if (this.isEditing[paymentMethod]) {
      // If value changed, prompt confirmation
      if (this[`${paymentMethod}Number`] !== this.previousValues[paymentMethod]) {
        const alert = await this.alertController.create({
          header: 'Confirm Save',
          message: `Do you want to save changes to ${paymentMethod}?`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                // Revert to the original value if canceled
                this[`${paymentMethod}Number`] = this.previousValues[paymentMethod];
                this.isEditing[paymentMethod] = false; // Exit edit mode
                console.log(`${paymentMethod} changes canceled`);
              }
            },
            {
              text: 'Save',
              handler: () => {
                // Save the new value and exit edit mode
                this.previousValues[paymentMethod] = this[`${paymentMethod}Number`];
                this.isEditing[paymentMethod] = false;
                console.log(`${paymentMethod} updated to:`, this[`${paymentMethod}Number`]);
              }
            }
          ]
        });
        await alert.present();
      } else {
        // If no changes, exit edit mode directly
        this.isEditing[paymentMethod] = false;
      }
    } else {
      // Switch to edit mode if not in editing mode
      this.isEditing[paymentMethod] = true;
    }
  }
}
