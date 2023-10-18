const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1437890',
  database: 'jntugv',
});

app.use(express.json());
app.use(cors());

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/insert', (req, res) => {
  const data = req.body;
  const sql = 'INSERT INTO colleges_list (logo, college_name, college_address,college_link) VALUES (?, ?, ?, ?)';

  connection.query(sql, [data.logo, data.college_name, data.college_address, data.college_link], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    console.log('Data inserted successfully');
    res.json({ message: 'Data inserted successfully' });
  });
});


app.delete('/delete/:college_name', (req, res) => {
const collegeName = req.params.college_name;
const sql = 'DELETE FROM colleges_list WHERE college_name = ?';

connection.query(sql, collegeName, (err, result) => {
  if (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Error deleting data' });
    return;
  }
  console.log('Data deleted successfully');
  res.json({ message: 'Data deleted successfully' });
});
});

app.get('/api/colleges', (req, res) => {
  const sql = 'SELECT * FROM colleges_list';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: 'Error retrieving data' });
      return;
    }
    console.log('Data retrieved successfully');
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});