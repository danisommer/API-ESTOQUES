const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const secret = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNTcyODMzOCwiaWF0IjoxNzE1NzI4MzM4fQ.OP1f7kz85baW6MKly6l4cBmRBEvN6X-A5YK1O48jxfE';

const app = express();
const saltRounds = 10;

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const port = 3001;

app.listen(port, 'localhost', () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dzs2102',
  database: 'sistema_estoque',
  insecureAuth: true
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
  console.log("Connected to database!");
});


function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}

app.post('/registrar', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Verificar se o email já está registrado
  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], function(err, rows) {
    if (err) {
      return res.status(500).json({ message: 'Error querying database', error: err });
    }

    if (rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Se o email não estiver registrado, prosseguir com o registro
    bcrypt.hash(senha, saltRounds, function(err, hash) {
      if (err) {
        return res.status(500).json({ message: 'Error hashing password', error: err });
      }
      connection.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash], function(err, result) {
        if (err) {
          return res.status(500).json({ message: 'Error inserting user into database', error: err });
        }
        const userId = result.insertId;
        const token = jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
        res.json({ token });
      });
    });
  });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], function(err, rows) {
    if (err) {
      return res.status(500).json({ message: 'Error querying database', error: err });
    }
    const user = rows[0];
    if (user) {
      bcrypt.compare(senha, user.senha, function(err, result) {
        if (err) {
          return res.status(500).json({ message: 'Error comparing passwords', error: err });
        }
        if (result) {
          const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

app.get('/materiais', verifyToken, (req, res) => {
  const usuario_id = req.userId;
  connection.query('SELECT * FROM materiais WHERE usuario_id = ?', [usuario_id], function(err, rows) {
    if (err) {
      return res.status(500).json({ message: 'Error querying database', error: err });
    }
    res.json(rows);
  });
});

app.post('/materiais', verifyToken, (req, res) => {
  const { nome, quantidade } = req.body;
  const usuario_id = req.userId;

  if (!nome || !quantidade) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  connection.query('INSERT INTO materiais (nome, quantidade, usuario_id) VALUES (?, ?, ?)', [nome, quantidade, usuario_id], function(err, result) {
    if (err) {
      return res.status(500).json({ message: 'Error inserting material into database', error: err });
    }
    res.json({ id: result.insertId, nome, quantidade });
  });
});

app.put('/materiais', verifyToken, (req, res) => {
  const { id, nome, quantidade } = req.body;
  const usuario_id = req.userId;

  if (!id || !nome || !quantidade) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  connection.query('UPDATE materiais SET nome = ?, quantidade = ? WHERE id = ? AND usuario_id = ?', [nome, quantidade, id, usuario_id], function(err, result) {
    if (err) {
      return res.status(500).json({ message: 'Error updating material in database', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Material not found or user not authorized' });
    }
    res.json({ id, nome, quantidade });
  });
});

app.delete('/materiais', verifyToken, (req, res) => {
  const { id } = req.body;
  const usuario_id = req.userId;

  if (!id) {
    return res.status(400).json({ message: 'Missing required field: id' });
  }

  connection.query('DELETE FROM materiais WHERE id = ? AND usuario_id = ?', [id, usuario_id], function(err, result) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting material from database', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Material not found or user not authorized' });
    }
    res.json({ message: 'Material deleted' });
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!', error: err });
});

