import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-acc-info',
  templateUrl: 'acc-info.page.html',
  styleUrls: ['acc-info.page.scss']
})
export class AccInfoPage {
  username: string = 'primemart';
  email: string = 'primemart@example.com';
  phone: string = '+63 123 456 789';
  password: string = ''; // Initially blank password for user to edit
  passwordVisible: boolean = false; // Toggle for password visibility

  // Track edit state for fields
  isEditing: { [key in 'username' | 'email' | 'phone' | 'password']: boolean } = {
    username: false,
    email: false,
    phone: false,
    password: false
  };

  constructor(private alertController: AlertController) {}

  // Toggle edit mode for the fields (username, email, phone, password)
  async toggleEdit(field: 'username' | 'email' | 'phone' | 'password') {
    if (field === 'password' && this.isEditing[field]) {
      // Confirm password change before saving
      const alert = await this.alertController.create({
        header: 'Confirm Password Change',
        message: 'Are you sure you want to change your password?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.isEditing.password = false; // Cancel editing
              console.log('Password change canceled');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              // Save the password here (e.g., to a database or local storage)
              console.log('Password updated:', this.password);
              this.isEditing.password = false; // Exit edit mode after saving
            }
          }
        ]
      });

      await alert.present();
    } else {
      // For other fields (username, email, phone), just toggle edit mode
      this.isEditing[field] = !this.isEditing[field];
      if (!this.isEditing[field]) {
        console.log(`${field} updated to:`, this[field]);
      }
    }
  }

  // Toggle visibility of password
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
