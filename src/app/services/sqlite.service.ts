import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import * as bcrypt from 'bcryptjs';


@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private sqlite: SQLiteConnection | null = null;
  private database: SQLiteDBConnection | null = null;

  constructor() {
    this.initializeSQLite();
  }

  // Initialize SQLite connection
  private initializeSQLite() {
    if (Capacitor.isNativePlatform()) {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
    }
  }

  // Create the database and table if not exists
  async initializeDatabase(): Promise<void> {
    if (!this.sqlite) {
      console.error('SQLite plugin is not available on this platform.');
      return;
    }

    try {
      this.database = await this.sqlite.createConnection(
        'usersDB',
        false,
        'no-encryption',
        1,
        false
      );
      await this.database.open();

      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL
        );
      `;
      await this.database.execute(createTableQuery);
      console.log('Database initialized and table created successfully.');
    } catch (error) {
      console.error('Error initializing database:', error);
    }

    console.log('Database is open:', this.database !== null);

  }

  

  // Add a new user to the database
  async addUser(username: string, email: string, password: string): Promise<void> {
    if (!this.database) {
      console.error('Database connection is not initialized.');
      return;
    }
  
    // Hash the password before inserting
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const insertQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    const values = [username, email, hashedPassword];
  
    // Log the values before running the query
    console.log('Inserting values:', values);
  
    try {
      await this.database.run(insertQuery, values);
      console.log('User added successfully.');
  
      // Log the database contents after adding a user
      await this.logDatabaseContents();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
  

  async validateLogin(username: string, password: string): Promise<boolean> {
    if (!this.database) {
      console.error('Database connection is not initialized.');
      return false;
    }
  
    const selectQuery = `SELECT * FROM users WHERE username = ?`;
    const result = await this.database.query(selectQuery, [username]);
  
    if (result && result.values && result.values.length > 0) {
      // Get the stored hashed password from the database
      const storedHashedPassword = result.values[0].password;
  
      // Compare the entered password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);
  
      if (isPasswordValid) {
        console.log('Login successful');
        return true;
      } else {
        console.error('Invalid password');
        return false;
      }
    } else {
      console.error('No matching user found');
      return false;
    }
  }

  async logDatabaseContents(): Promise<void> {
    if (!this.database) {
      console.error('Database connection is not initialized.');
      return;
    }

    const selectQuery = `SELECT * FROM users`;
    const result = await this.database.query(selectQuery);
    console.log('Database contents:', result.values); // Log all user records
  }

  // Close the database connection
  async closeConnection(): Promise<void> {
    if (this.database) {
      try {
        await this.sqlite?.closeConnection('usersDB', false);
        this.database = null;
        console.log('Database connection closed.');
      } catch (error) {
        console.error('Error closing the database connection:', error);
      }
    }
  }

  // Login function to validate credentials
  async login(username: string, password: string): Promise<void> {
    const isValid = await this.validateLogin(username, password);
    console.log('Login valid:', isValid); // Log whether the credentials are valid or not
    if (isValid) {
      alert('Login successful!');
      // Proceed to the next page or logic
    } else {
      alert('Invalid username or password');
    }
  }

  // Add a test user (useful for testing)
  async addTestUser() {
    await this.addUser('testUser', 'testEmail@example.com', 'testPassword');
    console.log('Test user added.');
  }
}
