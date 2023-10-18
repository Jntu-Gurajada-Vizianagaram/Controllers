const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const connection = require('../config')

const app = express();
const port = 9090;

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "mohan123",
//   database: "university_events",
//   port: "3306",
// });
if(connection){
  console.log("UCEV EST")
}
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
  const { data } = req.body;

  const sql = 'INSERT INTO events (title, date, time, location, description) VALUES (?, ?, ?, ?, ?)';
  const values = [data.title, data.date, data.time, data.location, data.description];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    console.log('Data inserted successfully');
    res.json({ message: 'Data inserted successfully' });
  });
});


app.delete('/delete/title', (req, res) => {
const title = req.params.title;
const sql = 'DELETE FROM events WHERE title = ?';

connection.query(sql, title, (err, result) => {
  if (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Error deleting data' });
    return;
  }
  console.log('Data deleted successfully');
  res.json({ message: 'Data deleted successfully' });
});
});

app.get('/api/updates', (req, res) => {
  const sql = 'SELECT * FROM events';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: `Error retrieving data${err} `});
      return;
    }
    console.log('Data retrieved successfully');
    res.json(results);
  });
});


app.put('/update/:id', (req, res) => {
  const eventId = req.params.id;
  const { data } = req.body;

  const sql = 'UPDATE events SET title=?, date=?, time=?, location=?, description=? WHERE id=?';
  const values = [data.title, data.date, data.time, data.location, data.description, eventId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Error updating data' });
      return;
    }
    console.log('Data updated successfully');
    res.json({ message: 'Data updated successfully' });
  });
});

app.listen(8081, () => { 
  console.log(`Server is running on port ${port}`);
});