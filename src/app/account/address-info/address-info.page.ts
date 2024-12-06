import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

type AddressKey = 'home' | 'office' | 'other'; // Defining the type of keys

@Component({
  selector: 'app-address-info',
  templateUrl: 'address-info.page.html',
  styleUrls: ['address-info.page.scss'],
})
export class AddressInfoPage {
  // Define the addresses
  savedAddresses: Record<AddressKey, string> = {
    home: 'NEUST, Sumacab',
    office: 'CICT Building',
    other: 'Room 303',
  };

  // List of new addresses added
  newAddresses: { addressName: string; addressValue: string }[] = [];

  // Define the edit state for each address
  isEditing = {
    home: false,
    office: false,
    other: false,
  };

  constructor(private alertController: AlertController) {}

  // Toggle edit mode for a specific address
  toggleEdit(address: AddressKey) {
    this.isEditing[address] = !this.isEditing[address];
  }

  // Save the edited address and exit edit mode
  async saveAddress(address: AddressKey) {
    const addressValue = this.savedAddresses[address];
    const alert = await this.alertController.create({
      header: 'Confirm Address Change',
      message: `Are you sure you want to change the ${address} address to ${addressValue}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.isEditing[address] = false; // Cancel editing
            console.log(`${address} change canceled`);
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log(`${address} updated to:`, this.savedAddresses[address]);
            this.isEditing[address] = false; // Exit edit mode after saving
          },
        },
      ],
    });

    await alert.present();
  }

  // Add New Address functionality
  async addNewAddress() {
    const alert = await this.alertController.create({
      header: 'Add New Address',
      message: 'Enter a new address name and value.',
      inputs: [
        {
          name: 'addressName',
          type: 'text',
          placeholder: 'Address Name (e.g., "New Address")',
        },
        {
          name: 'addressValue',
          type: 'text',
          placeholder: 'Address Value (e.g., "Street, City")',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('New address addition canceled');
          },
        },
        {
          text: 'Save',
          handler: (data) => {
            if (data.addressName && data.addressValue) {
              const addressName = data.addressName as string; // Get the name of the new address
              this.newAddresses.push({ addressName, addressValue: data.addressValue });
              console.log('New Address Added:', addressName, data.addressValue);
            } else {
              console.log('Incomplete address details');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Delete a specific new address
  deleteAddress(addressName: string) {
    this.newAddresses = this.newAddresses.filter(
      (address) => address.addressName !== addressName
    );
    console.log(`Address with name '${addressName}' deleted.`);
  }
}
