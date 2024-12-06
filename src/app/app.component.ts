import { Component } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);

  constructor() {
    this.testDatabase();
  }

  async testDatabase() {
    try {
      const db = await this.sqlite.createConnection('testDB', false, 'no-encryption', 1, false);
      await db.open();

      const query = `CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY, name TEXT)`;
      await db.execute(query);
      console.log('Database and table created successfully.');
    } catch (err) {
      console.error('Error testing database:', err);
    }
  }
}
