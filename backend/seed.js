const bcrypt = require('bcrypt');
const db = require('./database');

const email = 'test@example.com';
const password = 'password123';

bcrypt.hash(password, 10).then((hash) => {
  db.run(
    `INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)`,
    [email, hash],
    () => {
      console.log('User seeded');
    }
  );

  db.run(
    `INSERT OR IGNORE INTO conversations (id, title) VALUES (1, 'General Chat')`,
    [],
    () => {
      console.log('Conversation seeded');
    }
  );

});
