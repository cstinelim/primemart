import { Component } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  passwordError = '';
  passwordMismatchError = '';
  showPassword = false;
  showPassword2 = false;

  constructor(private sqliteService: SqliteService, private router: Router) {
    this.sqliteService.initializeDatabase();
  }

  // Validate password length
  validatePassword() {
    if (this.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters long';
    } else {
      this.passwordError = '';  // Clear error if valid
    }
  }

  // Check if password and confirm password match
  checkPasswordMatch() {
    if (this.password !== this.confirmPassword) {
      this.passwordMismatchError = 'Passwords do not match';
    } else {
      this.passwordMismatchError = '';  // Clear error if they match
    }
  }

  // Sign up logic
  async signUp() {
    // Step 1: Validate passwords
    this.validatePassword();
    this.checkPasswordMatch();

    // Step 2: Check for empty fields and errors
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    // Step 3: If there are any password errors, do not proceed
    if (this.passwordError || this.passwordMismatchError) {
      alert('Please fix the errors before submitting');
      return;
    }

    // Step 4: Proceed to add user to SQLite
    try {
      await this.sqliteService.addUser(this.username, this.email, this.password);
      alert('User signed up successfully!');
      
      // Navigate to profile page
      this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during sign-up. Please try again.');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }
}
