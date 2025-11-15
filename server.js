// server.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student_app'
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL (student_app)');
});

// GET all students
app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM students ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = rows.map(row => ({
      ...row,
      year_level: row.year_level,
      mobile_number: row.mobile_number
    }));
    res.json(formatted);
  });
});

// GET single student
app.get('/api/students/:id', (req, res) => {
  db.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const row = rows[0];
    res.json({
      ...row,
      year_level: row.year_level,
      mobile_number: row.mobile_number
    });
  });
});

// CREATE
app.post('/api/students', (req, res) => {
  const { name, age, yearLevel, grade, email, address, mobileNumber } = req.body;
  const sql = `INSERT INTO students 
               (name, age, year_level, grade, email, address, mobile_number)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, age, yearLevel, grade, email || null, address || null, mobileNumber], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Student added' });
  });
});

// UPDATE
app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, yearLevel, grade, email, address, mobileNumber } = req.body; // FIXED: mobileNumber
  const sql = `UPDATE students
               SET name = ?, age = ?, year_level = ?, grade = ?, 
                   email = ?, address = ?, mobile_number = ?
               WHERE id = ?`;
  db.query(sql, [name, age, yearLevel, grade, email || null, address || null, mobileNumber, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Student updated' });
  });
});

// DELETE
app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Student deleted' });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});