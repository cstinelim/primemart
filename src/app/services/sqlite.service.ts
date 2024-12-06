import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private database!: SQLiteDBConnection;
  private isDbInitialized = false;

  // Initialize or get the database connection
  async initDb() {
    try {
      if (this.isDbInitialized) {
        console.log('Database already initialized.');
        return; // Don't initialize again
      }
  
      console.log('Initializing database...');
      // Create a new database connection (only if it's not already initialized)
      this.database = await this.sqlite.createConnection('usersDB', false, 'no-encryption', 1, false);
      await this.database.open(); // Open the database connection
      this.isDbInitialized = true; // Mark the DB as initialized
      console.log('Database initialized and open.');
  
      // Initialize the table if it doesn't exist
      await this.initTable();
    } catch (error) {
      console.error('Error initializing or opening database:', error);
    }
  }

  // Create the users table if it doesn't exist
  async initTable() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT NOT NULL,
          password TEXT NOT NULL
        )`;

      await this.database.execute(query);
      console.log('Table initialized or already exists.');
    } catch (error) {
      console.error('Error creating table:', error);
    }
  }

  // Check if the database is open
  async isDatabaseOpen() {
    try {
      return this.database && await this.database.isDBOpen();
    } catch (error) {
      console.error('Error checking database open status:', error);
      return false;
    }
  }

  // Create a new user
  async create(username: string, email: string, password: string) {
    if (!(await this.isDatabaseOpen())) {
      console.error('Database is not open');
      return;
    }

    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    try {
      await this.database.run(query, [username, email, password]);
      console.log('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  // Read all users from the database
  async read() {
    if (!(await this.isDatabaseOpen())) {
      console.error('Database is not open');
      return [];
    }

    const query = `SELECT * FROM users`;
    try {
      const result = await this.database.query(query);
      return result.values || [];
    } catch (error) {
      console.error('Error reading users:', error);
      return [];
    }
  }

  constructor() {}
}
