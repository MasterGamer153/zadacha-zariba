const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;
const SECRET = 'dev_secret_key';

app.use(cors());
app.use(express.json());

// Middleware to authenticate JWT token

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

//login

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    async (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token });
    }
  );
});

//get conversations

app.get('/conversations', authenticateToken, (req, res) => {
  db.all(
    `SELECT * FROM conversations ORDER BY created_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(rows);
    }
  );
});

//get messages for conversation

app.get('/messages/:conversationId', authenticateToken, (req, res) => {
  const { conversationId } = req.params;

  db.all(
    `
    SELECT messages.*, users.email as sender_email
    FROM messages
    JOIN users ON messages.sender_id = users.id
    WHERE conversation_id = ?
    ORDER BY created_at ASC
    `,
    [conversationId],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(rows);
    }
  );
});

//send message

app.post('/messages', authenticateToken, (req, res) => {
  const { conversationId, content } = req.body;
  const userId = req.user.userId;

  db.run(
    `
    INSERT INTO messages (conversation_id, sender_id, content)
    VALUES (?, ?, ?)
    `,
    [conversationId, userId, content],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.json({
        id: this.lastID,
        conversationId,
        senderId: userId,
        content,
      });
    }
  );
});

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('sendMessage', (message) => {
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

