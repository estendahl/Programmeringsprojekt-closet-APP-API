const Database = require("better-sqlite3");
const db = new Database("clothes.db")

db.prepare(`
    CREATE TABLE IF NOT EXISTS clothes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        category TEXT,
        color TEXT,
        size TEXT,
        brand TEXT,
        material TEXT,
        image TEXT
    )
`).run();

module.exports = db;