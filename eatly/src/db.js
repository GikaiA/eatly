import Database from 'better-sqlite3';
const db = new Database('app.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS moods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood TEXT NOT NULL,
    cuisine_weight TEXT NOT NULL
  );
`);

export default db;