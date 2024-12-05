import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = ''; // Username field
  password: string = ''; // Password field
  showPassword: boolean = false; // Password visibility toggle
  loginError: string = ''; // Error message for invalid login

  constructor(private sqliteService: SqliteService) {}

  // Initialize the database when the page loads
  ngOnInit() {
    this.sqliteService.initializeDatabase(); // Ensure the database is ready before using
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Perform login validation
  async login() {
    if (!this.username || !this.password) {
      this.loginError = 'Please enter both username and password';
      return;
    }

    const isValidLogin = await this.sqliteService.validateLogin(
      this.username,
      this.password
    );

    if (isValidLogin) {
      console.log('Login successful');
      // Navigate to another page (profile, home, etc.) after successful login
      // For example: this.router.navigate(['/home']);
    } else {
      console.log('Login failed');
      // Optionally, log the database contents to check if the user exists
      await this.sqliteService.logDatabaseContents();
      this.loginError = 'Invalid username or password';
    }
  }
}
