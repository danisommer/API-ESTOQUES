const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNTcyODMzOCwiaWF0IjoxNzE1NzI4MzM4fQ.OP1f7kz85baW6MKly6l4cBmRBEvN6X-A5YK1O48jxfE';

const app = express();
const saltRounds = 10;

const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'DZS2102',
  database: 'sistema_estoque',
  insecureAuth : true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({ message: 'Token não fornecido' });
  jwt.verify(token, secret, function(err, decoded) {
    if (err) return res.status(500).json({ message: 'Falha ao autenticar o token' });
    req.userId = decoded.id;
    next();
  });
}

app.post('/registrar', (req, res) => {
  const { nome, email, senha } = req.body;
  bcrypt.hash(senha, saltRounds, function(err, hash) {
    if (err) throw err;
    connection.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hash], function(err, rows) {
      if (err) throw err;
      res.json(rows);
    });
  });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  connection.query('SELECT * FROM usuarios WHERE email = ?', [email], function(err, rows) {
    if (err) throw err;
    const user = rows[0];
    if (user) {
      bcrypt.compare(senha, user.senha, function(err, result) {
        if (result) {
          const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ message: 'Senha incorreta' });
        }
      });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
});
app.get('/materiais/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const usuario_id = req.userId;
  connection.query('SELECT * FROM materiais WHERE id = ? AND usuario_id = ?', [id, usuario_id], function(err, rows) {
    if (err) throw err;
    res.json(rows);
  });
});

app.post('/materiais', verifyToken, (req, res) => {
  const { nome, quantidade } = req.body;
  const usuario_id = req.userId;
  connection.query('INSERT INTO materiais (nome, quantidade, usuario_id) VALUES (?, ?, ?)', [nome, quantidade, usuario_id], function(err, rows) {
    if (err) throw err;
    res.json(rows);
  });
});

app.delete('/materiais/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const usuario_id = req.userId;
  connection.query('DELETE FROM materiais WHERE id = ? AND usuario_id = ?', [id, usuario_id], function(err, rows) {
    if (err) throw err;
    res.json(rows);
  });
});

app.put('/materiais/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { nome, quantidade } = req.body;
  const usuario_id = req.userId;
  connection.query('UPDATE materiais SET nome = ?, quantidade = ? WHERE id = ? AND usuario_id = ?', [nome, quantidade, id, usuario_id], function(err, rows) {
    if (err) throw err;
    res.json(rows);
  });
});